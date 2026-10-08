// src/pages/api/sync-sheets.ts
// Endpoint para sincronizar mediciones agronómicas directamente desde Google Sheets / Google Docs (publicado como CSV o enlace de exportación)
// Soporta los IDs en formatos como T0-P1, TO-P2, T1-P1, T2-P3, T3-P5 para llenar sin errores todas las filas (t0, t1, t2, t3).
// Toma de datos reales iniciada el 2026-09-14. Manejo de temperatura de planta no tomada el 2026-09-29 y 2026-09-30.

import type { APIRoute } from "astro";
import { z } from "zod";
import {
  resolvePlantCoordinates,
  type MetricRecord,
} from "../../backend/services/metricsData";

// Zod Schema para validación estricta de la petición (Zero Trust)
const SyncRequestSchema = z.object({
  url: z
    .string()
    .url("Debe ingresar una URL válida de Google Sheets o archivo CSV."),
});

// Convertir enlaces habituales de Google Sheets a la URL de descarga directa CSV
function normalizeGoogleSheetUrl(inputUrl: string): string {
  let url = inputUrl.trim();

  // Si es un enlace de Google Sheets publicado en la web con /d/e/2PACX-...
  if (url.includes("/spreadsheets/d/e/")) {
    if (url.includes("output=csv")) return url;
    if (url.includes("/pubhtml"))
      return url.replace("/pubhtml", "/pub?output=csv");
    if (url.includes("/pub"))
      return url.includes("?") ? `${url}&output=csv` : `${url}?output=csv`;
    return url;
  }

  // Si es un enlace estándar de edición de Google Sheets:
  // https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=SHEET_ID
  const sheetMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (sheetMatch && sheetMatch[1] && sheetMatch[1] !== "e") {
    const sheetId = sheetMatch[1];

    // Extraer gid si existe
    let gid = "0";
    const gidMatch = url.match(/[#&?]gid=([0-9]+)/);
    if (gidMatch && gidMatch[1]) {
      gid = gidMatch[1];
    }

    if (url.includes("/pub") && url.includes("output=csv")) {
      return url;
    }
    if (url.includes("/export") && url.includes("format=csv")) {
      return url;
    }

    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  }

  return url;
}

// Parser robusto de CSV respetando comillas y delimitadores (coma o punto y coma)
function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  const cleanText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const rawLines = cleanText.split("\n").filter((l) => l.trim().length > 0);

  if (rawLines.length === 0) return [];

  // Detectar delimitador según la primera línea
  const firstLine = rawLines[0];
  const commaCount = (firstLine.match(/,/g) || []).length;
  const semiCount = (firstLine.match(/;/g) || []).length;
  const tabCount = (firstLine.match(/\t/g) || []).length;
  let delimiter = ",";
  if (semiCount > commaCount && semiCount > tabCount) delimiter = ";";
  else if (tabCount > commaCount && tabCount > semiCount) delimiter = "\t";

  for (const line of rawLines) {
    const row: string[] = [];
    let inQuotes = false;
    let currentToken = "";

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          currentToken += '"';
          i++; // escapar comilla doble
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        row.push(currentToken.trim());
        currentToken = "";
      } else {
        currentToken += char;
      }
    }
    row.push(currentToken.trim());
    lines.push(row);
  }

  return lines;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.json();

    // Validación estricta con Zod
    const parsed = SyncRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: parsed.error.issues[0]?.message || "Datos no válidos",
          details: parsed.error.issues,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const { url } = parsed.data;

    const targetUrl = normalizeGoogleSheetUrl(url);

    // Petición al recurso externo desde el servidor
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Macollo-Greenhouse-Sync/2.0",
        Accept: "text/csv,text/plain,*/*",
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `No se pudo acceder a Google Sheets (HTTP ${response.status}). Asegúrese de que el documento tenga permisos de lectura "Cualquier persona con el enlace puede ver" o esté "Publicado en la web como CSV".`,
        }),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "El documento descargado está vacío o no contiene filas de datos.",
        }),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Normalizar cabeceras a minúsculas sin acentos ni caracteres especiales
    const rawHeaders = rows[0];
    const headers = rawHeaders.map((h) =>
      h
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim(),
    );

    // Función auxiliar para buscar índices por palabras clave
    const findIndex = (keywords: string[]) => {
      return headers.findIndex((h) =>
        keywords.some((k) => h === k || h.includes(k)),
      );
    };

    // 1. ID_planta: Columna principal que identifica la planta (T0-P1, TO-P2, T1-P1, etc.)
    // REGLA CRÍTICA: Las columnas 'fila' y 'planta' son auxiliares y NO deben seleccionarse como ID_planta.
    let idxIdPlanta = headers.findIndex(
      (h) =>
        h === "id_planta" ||
        h === "id planta" ||
        h === "idplanta" ||
        h.startsWith("id_planta") ||
        h.endsWith("_id_planta") ||
        h === "id" ||
        h === "plant_id" ||
        h === "codigo_planta",
    );
    if (idxIdPlanta === -1) {
      idxIdPlanta = headers.findIndex(
        (h) => h.includes("id") && h.includes("plant"),
      );
    }

    // 2. Fecha: Día de la medición
    const idxFecha = findIndex(["fecha", "date", "dia", "registro"]);

    // 3. Responsable: Nombre de quien tomó la medición
    const idxResp = findIndex([
      "responsable",
      "operario",
      "tecnico",
      "encargado",
      "evaluador",
      "nombre",
    ]);

    // 4. T_Ext_C: Temperatura externa del invernadero
    const idxText = headers.findIndex(
      (h) =>
        h === "t_ext_c" ||
        h === "t_ext" ||
        h.includes("t_ext") ||
        h.includes("temp_ext") ||
        h.includes("t ext") ||
        h.includes("externa") ||
        h.includes("tout") ||
        h.includes("exterior"),
    );

    // 5. T_Int_C: Temperatura interna dentro del invernadero
    const idxTint = headers.findIndex(
      (h) =>
        h === "t_int_c" ||
        h === "t_int" ||
        h.includes("t_int") ||
        h.includes("temp_int") ||
        h.includes("t int") ||
        (h.includes("temp") && h.includes("int")) ||
        h.includes("invernadero"),
    );

    // 6. humedad_Pct: Humedad relativa %
    const idxHumedad = headers.findIndex(
      (h) =>
        h === "humedad_pct" ||
        h === "humedad" ||
        h.includes("humedad") ||
        h.includes("humidity") ||
        h.includes("hum_") ||
        h.includes("hum pct"),
    );

    // 7. T_Planta_C: Temperatura del piso donde está la planta
    const idxTplanta = headers.findIndex(
      (h) =>
        h === "t_planta_c" ||
        h === "t_planta" ||
        h.includes("t_planta") ||
        h.includes("temp_planta") ||
        h.includes("t planta") ||
        h.includes("piso") ||
        h.includes("t_suelo") ||
        h.includes("suelo") ||
        h.includes("tsoil"),
    );

    // 8. Ph: pH del suelo
    const idxPh = headers.findIndex(
      (h) =>
        h === "ph" ||
        h.startsWith("ph_") ||
        h.startsWith("ph ") ||
        h.includes("ph"),
    );

    // 9. ALtura_cm: Altura de la planta en cm para evaluar su crecimiento
    const idxAltura = headers.findIndex(
      (h) =>
        h === "altura_cm" ||
        h === "altura" ||
        h.includes("altura") ||
        h.includes("alt_") ||
        h.includes("alt ") ||
        h.includes("crecimiento") ||
        h.includes("growth"),
    );

    // Columnas opcionales secundarias
    const idxFase = findIndex(["fase", "etapa", "fenologia"]);
    const idxProd = findIndex([
      "productividad",
      "prod",
      "rendimiento",
      "frutos",
    ]);
    const idxSanidad = findIndex([
      "sanidad",
      "salud",
      "fitosanitario",
      "estado",
      "vigor",
    ]);
    const idxObs = findIndex([
      "observacion",
      "notas",
      "comentario",
      "obs",
      "detalles",
    ]);

    const parsedRecords: MetricRecord[] = [];

    // Helper para interpretar números con coma decimal o caracteres adicionales
    const parseNum = (val: string | undefined): number | null => {
      if (!val) return null;
      const trimmed = val.trim().toLowerCase();
      if (
        [
          "nd",
          "n/d",
          "na",
          "n/a",
          "-",
          "--",
          "null",
          "no tomada",
          "no medido",
          "pendiente",
          "",
        ].includes(trimmed)
      ) {
        return null;
      }
      const cleaned = val.replace(",", ".").replace(/[^0-9.-]/g, "");
      const n = parseFloat(cleaned);
      return isNaN(n) ? null : n;
    };

    // Helper para normalizar fecha y hora preservando cada día específico sin colapsos
    const extractDateAndHour = (
      rawVal: string | undefined,
    ): { fecha: string; hora: string } => {
      if (!rawVal) return { fecha: "2026-09-14", hora: "09:00 AM" };
      const raw = rawVal.trim();

      let hora = "09:00 AM";
      const timeMatch = raw.match(
        /(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM|am|pm)?/i,
      );
      if (timeMatch) {
        let hh = parseInt(timeMatch[1], 10);
        const mm = timeMatch[2];
        const ampm = timeMatch[4]
          ? timeMatch[4].toUpperCase()
          : hh >= 12
            ? "PM"
            : "AM";
        if (hh > 12) hh -= 12;
        if (hh === 0) hh = 12;
        hora = `${String(hh).padStart(2, "0")}:${mm} ${ampm}`;
      }

      // YYYY-MM-DD o YYYY/MM/DD
      const ymdMatch = raw.match(/\b(202\d)[-/.](\d{1,2})[-/.](\d{1,2})\b/);
      if (ymdMatch) {
        return {
          fecha: `${ymdMatch[1]}-${ymdMatch[2].padStart(2, "0")}-${ymdMatch[3].padStart(2, "0")}`,
          hora,
        };
      }

      // DD/MM/YYYY o DD-MM-YYYY
      const dmyMatch = raw.match(/\b(\d{1,2})[-/.](\d{1,2})[-/.](202\d)\b/);
      if (dmyMatch) {
        return {
          fecha: `${dmyMatch[3]}-${dmyMatch[2].padStart(2, "0")}-${dmyMatch[1].padStart(2, "0")}`,
          hora,
        };
      }

      // Serial Excel/Google Sheets
      const numSerial = parseFloat(raw);
      if (!isNaN(numSerial) && numSerial > 40000 && numSerial < 60000) {
        const excelEpoch = new Date(1899, 11, 30);
        const dateObj = new Date(excelEpoch.getTime() + numSerial * 86400000);
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, "0");
        const d = String(dateObj.getDate()).padStart(2, "0");
        return { fecha: `${y}-${m}-${d}`, hora };
      }

      return { fecha: raw.slice(0, 10), hora };
    };

    const getAvatarColor = (name: string): string => {
      const colors = [
        "bg-emerald-600",
        "bg-teal-600",
        "bg-green-600",
        "bg-lime-600",
        "bg-cyan-600",
        "bg-blue-600",
        "bg-indigo-600",
      ];
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      return colors[Math.abs(hash) % colors.length];
    };

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length === 0 || row.every((c) => !c)) continue;

      // Extraer identificador de la planta desde ID_planta (ignorando fila y planta)
      let plantIdRaw = idxIdPlanta >= 0 ? row[idxIdPlanta] : "";

      // Si no vino en la columna ID_planta, escanear toda la fila buscando T0-P1, TO-P2, T1-P1...
      if (!plantIdRaw) {
        for (const cell of row) {
          if (
            cell &&
            /(?:^|[^a-zA-Z])T[0-3O][\s\-_/.]*(?:P|F|COL|PLANTA)?[\s\-_/.]*[1-5]/i.test(
              cell,
            )
          ) {
            plantIdRaw = cell;
            break;
          }
        }
      }

      // Resolver coordenadas unívocas de la planta en la matriz 4x5
      const coords = resolvePlantCoordinates(plantIdRaw);

      // Fecha y hora: conservar la fecha real de la toma
      const { fecha, hora } = extractDateAndHour(
        idxFecha >= 0 ? row[idxFecha] : undefined,
      );

      // pH del suelo (columna Ph)
      const parsedPh = parseNum(idxPh >= 0 ? row[idxPh] : undefined);
      const phSuelo =
        parsedPh !== null
          ? +Math.min(14, Math.max(0, parsedPh)).toFixed(2)
          : 6.4;

      // REGLA CRÍTICA: T_Planta_C es la temperatura del piso donde está la planta.
      // La temperatura del piso/planta NO se tomó el 2026-09-29 ni el 2026-09-30 (debe ser null / N/D, jamás 20.5).
      const isTempMissingDate =
        fecha === "2026-09-29" || fecha === "2026-09-30";

      // T_Planta_C: Temperatura del piso donde está la planta (null si no se tomó)
      const pTsoil = parseNum(idxTplanta >= 0 ? row[idxTplanta] : undefined);
      const tempSuelo: number | null =
        !isTempMissingDate && pTsoil !== null ? +pTsoil.toFixed(1) : null;

      // T_Ext_C: Temperatura externa del invernadero al momento de tomar la medida
      const pText = parseNum(idxText >= 0 ? row[idxText] : undefined);
      const tempExterna = pText !== null ? +pText.toFixed(1) : 20.2;

      // T_Int_C: Temperatura dentro del invernadero al momento de tomar la medida (SÍ se tomó hoy)
      const pTint = parseNum(idxTint >= 0 ? row[idxTint] : undefined);
      const tempInvernadero = pTint !== null ? +pTint.toFixed(1) : 24.5;

      // tempInterna: Corresponde a la Temperatura Interna del invernadero (T_Int_C)
      const tempInterna: number | null = tempInvernadero;

      // humedad_Pct: Humedad relativa al momento de tomar la medida
      const pHumedad = parseNum(idxHumedad >= 0 ? row[idxHumedad] : undefined);
      const humedad =
        pHumedad !== null
          ? Math.min(100, Math.max(0, Math.round(pHumedad)))
          : 65;

      // ALtura_cm: Altura de la planta en cm para evaluar su crecimiento
      const pAltura = parseNum(idxAltura >= 0 ? row[idxAltura] : undefined);
      const alturaCm = pAltura !== null ? +pAltura.toFixed(1) : null;

      // Crecimiento en % (calculado a partir de altura o valor base)
      let crecimiento = 75;
      if (alturaCm !== null) {
        crecimiento =
          alturaCm <= 100
            ? Math.round(alturaCm)
            : Math.min(100, Math.round((alturaCm / 150) * 100));
      }

      // Responsable: Nombre de quien tomó la medida ese día
      const responsable =
        idxResp >= 0 && row[idxResp] && row[idxResp].trim().length > 0
          ? row[idxResp].trim()
          : "Equipo de Campo";

      // Fase de crecimiento
      const faseCrecimiento =
        idxFase >= 0 && row[idxFase] && row[idxFase].trim().length > 0
          ? row[idxFase].trim()
          : alturaCm && alturaCm > 80
            ? "Llenado de Fruto"
            : alturaCm && alturaCm > 40
              ? "Floración"
              : "Desarrollo Vegetativo";

      // Productividad
      let productividad: "Alta" | "Media" | "Baja" = "Alta";
      const prodRaw =
        idxProd >= 0 && row[idxProd] ? row[idxProd].toLowerCase() : "";
      if (
        prodRaw.includes("baja") ||
        prodRaw.includes("low") ||
        prodRaw.includes("1")
      )
        productividad = "Baja";
      else if (
        prodRaw.includes("med") ||
        prodRaw.includes("mid") ||
        prodRaw.includes("2")
      )
        productividad = "Media";

      // Sanidad
      let sanidad: "Excelente" | "Saludable" | "Vulnerable" | "Crítica" =
        "Saludable";
      const sanRaw =
        idxSanidad >= 0 && row[idxSanidad] ? row[idxSanidad].toLowerCase() : "";
      if (
        sanRaw.includes("crit") ||
        sanRaw.includes("mala") ||
        sanRaw.includes("enferma") ||
        sanRaw.includes("rojo")
      )
        sanidad = "Crítica";
      else if (
        sanRaw.includes("vuln") ||
        sanRaw.includes("aten") ||
        sanRaw.includes("regular") ||
        sanRaw.includes("amarillo")
      )
        sanidad = "Vulnerable";
      else if (
        sanRaw.includes("excel") ||
        sanRaw.includes("opt") ||
        sanRaw.includes("muy buena")
      )
        sanidad = "Excelente";
      else {
        // Derivar de pH y condiciones
        if (phSuelo < 5.2 || phSuelo > 7.8) sanidad = "Crítica";
        else if (phSuelo < 5.8 || phSuelo > 7.2) sanidad = "Vulnerable";
        else if (phSuelo >= 6.2 && phSuelo <= 6.7) sanidad = "Excelente";
      }

      let observaciones =
        idxObs >= 0 && row[idxObs] && row[idxObs].trim().length > 0
          ? row[idxObs].trim()
          : `Medición real de Google Sheets (${fecha}). Altura: ${alturaCm !== null ? alturaCm + "cm" : "N/D"}, Humedad: ${humedad}%.`;

      if (isTempMissingDate) {
        observaciones = `Temperatura de planta no tomada el ${fecha} por falta temporal de sensor. ${observaciones}`;
      }

      parsedRecords.push({
        id: `MET-GS-${coords.code}-${fecha}-${r}`,
        invernadero: "Invernadero Macollo",
        fila: coords.fila,
        columna: coords.columna,
        plantId: coords.plantId,
        code: coords.code,
        fecha,
        hora,
        timestampTexto: `${fecha}, ${hora}`,
        phSuelo,
        tempInterna,
        tempInvernadero,
        tempExterna,
        tempSuelo,
        humedad,
        alturaCm,
        crecimiento,
        faseCrecimiento,
        productividad,
        sanidad,
        responsable,
        responsableRol: "Registro Google Sheets",
        avatarColor: getAvatarColor(responsable),
        observaciones,
      });
    }

    if (parsedRecords.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "No se pudieron extraer registros válidos del archivo de Google Sheets. Verifique las columnas del documento.",
        }),
        {
          status: 422,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        count: parsedRecords.length,
        records: parsedRecords,
        message: `Se importaron exitosamente ${parsedRecords.length} mediciones reales desde Google Sheets.`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error:
          "Ocurrió un error inesperado al procesar la sincronización con Google Sheets.",
        details: err.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
