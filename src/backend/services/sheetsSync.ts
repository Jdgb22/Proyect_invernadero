import {
  resolvePlantCoordinates,
  type MetricRecord,
} from "../../shared/plantMatrix";
import { avatarColorFor } from "../../shared/avatar";
import {
  deriveProductividad,
  deriveSanidad,
  extractDateAndHour,
  parseCSV,
  parseCsvNumber,
} from "../../shared/csv";

export function normalizeGoogleSheetUrl(inputUrl: string): string {
  const url = inputUrl.trim();

  if (url.includes("/spreadsheets/d/e/")) {
    if (url.includes("output=csv")) return url;
    if (url.includes("/pubhtml"))
      return url.replace("/pubhtml", "/pub?output=csv");
    if (url.includes("/pub"))
      return url.includes("?") ? `${url}&output=csv` : `${url}?output=csv`;
    return url;
  }

  const sheetMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (sheetMatch && sheetMatch[1] && sheetMatch[1] !== "e") {
    const sheetId = sheetMatch[1];

    let gid = "0";
    const gidMatch = url.match(/[#&?]gid=([0-9]+)/);
    if (gidMatch && gidMatch[1]) gid = gidMatch[1];

    if (url.includes("/pub") && url.includes("output=csv")) return url;
    if (url.includes("/export") && url.includes("format=csv")) return url;

    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  }

  return url;
}

interface HeaderIndex {
  idPlanta: number;
  fecha: number;
  responsable: number;
  tempExt: number;
  tempInt: number;
  humedad: number;
  tempSuelo: number;
  ph: number;
  altura: number;
  fase: number;
  productividad: number;
  sanidad: number;
  observaciones: number;
}

function indexHeaders(rawHeaders: string[]): HeaderIndex {
  const headers = rawHeaders.map((h) =>
    h
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim(),
  );

  const find = (keywords: string[]) =>
    headers.findIndex((h) => keywords.some((k) => h === k || h.includes(k)));

  let idPlanta = headers.findIndex(
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
  if (idPlanta === -1) {
    idPlanta = headers.findIndex(
      (h) => h.includes("id") && h.includes("plant"),
    );
  }

  return {
    idPlanta,
    fecha: find(["fecha", "date", "dia", "registro"]),
    responsable: find([
      "responsable",
      "operario",
      "tecnico",
      "encargado",
      "evaluador",
      "nombre",
    ]),
    tempExt: headers.findIndex(
      (h) =>
        h === "t_ext_c" ||
        h === "t_ext" ||
        h.includes("t_ext") ||
        h.includes("temp_ext") ||
        h.includes("t ext") ||
        h.includes("externa") ||
        h.includes("tout") ||
        h.includes("exterior"),
    ),
    tempInt: headers.findIndex(
      (h) =>
        h === "t_int_c" ||
        h === "t_int" ||
        h.includes("t_int") ||
        h.includes("temp_int") ||
        h.includes("t int") ||
        (h.includes("temp") && h.includes("int")) ||
        h.includes("invernadero"),
    ),
    humedad: headers.findIndex(
      (h) =>
        h === "humedad_pct" ||
        h === "humedad" ||
        h.includes("humedad") ||
        h.includes("humidity") ||
        h.includes("hum_") ||
        h.includes("hum pct"),
    ),
    tempSuelo: headers.findIndex(
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
    ),
    ph: headers.findIndex(
      (h) =>
        h === "ph" ||
        h.startsWith("ph_") ||
        h.startsWith("ph ") ||
        h.includes("ph"),
    ),
    altura: headers.findIndex(
      (h) =>
        h === "altura_cm" ||
        h === "altura" ||
        h.includes("altura") ||
        h.includes("alt_") ||
        h.includes("alt ") ||
        h.includes("crecimiento") ||
        h.includes("growth"),
    ),
    fase: find(["fase", "etapa", "fenologia"]),
    productividad: find(["productividad", "prod", "rendimiento", "frutos"]),
    sanidad: find(["sanidad", "salud", "fitosanitario", "estado", "vigor"]),
    observaciones: find([
      "observacion",
      "notas",
      "comentario",
      "obs",
      "detalles",
    ]),
  };
}

function cell(row: string[], index: number): string | undefined {
  return index >= 0 ? row[index] : undefined;
}

export function buildRecordsFromRows(rows: string[][]): MetricRecord[] {
  if (rows.length < 2) return [];

  const idx = indexHeaders(rows[0]);
  const records: MetricRecord[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.length === 0 || row.every((c) => !c)) continue;

    let plantIdRaw = cell(row, idx.idPlanta) ?? "";
    if (!plantIdRaw) {
      for (const value of row) {
        if (
          value &&
          /(?:^|[^a-zA-Z])T[0-3O][\s\-_/.]*(?:P|F|COL|PLANTA)?[\s\-_/.]*[1-5]/i.test(
            value,
          )
        ) {
          plantIdRaw = value;
          break;
        }
      }
    }
    if (!plantIdRaw) continue;

    const coords = resolvePlantCoordinates(plantIdRaw);
    const { fecha, hora } = extractDateAndHour(cell(row, idx.fecha));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) continue;

    const parsedPh = parseCsvNumber(cell(row, idx.ph));
    const phSuelo =
      parsedPh !== null ? +Math.min(14, Math.max(0, parsedPh)).toFixed(2) : 6.4;

    const parsedTempSuelo = parseCsvNumber(cell(row, idx.tempSuelo));
    const tempSuelo =
      parsedTempSuelo !== null ? +parsedTempSuelo.toFixed(1) : null;

    const parsedTempExt = parseCsvNumber(cell(row, idx.tempExt));
    const tempExterna =
      parsedTempExt !== null ? +parsedTempExt.toFixed(1) : 20.2;

    const parsedTempInt = parseCsvNumber(cell(row, idx.tempInt));
    const tempInterna =
      parsedTempInt !== null ? +parsedTempInt.toFixed(1) : 24.5;

    const parsedHumedad = parseCsvNumber(cell(row, idx.humedad));
    const humedad =
      parsedHumedad !== null
        ? Math.min(100, Math.max(0, Math.round(parsedHumedad)))
        : 65;

    const parsedAltura = parseCsvNumber(cell(row, idx.altura));
    const alturaCm = parsedAltura !== null ? +parsedAltura.toFixed(1) : null;

    let crecimiento = 75;
    if (alturaCm !== null) {
      crecimiento =
        alturaCm <= 100
          ? Math.round(alturaCm)
          : Math.min(100, Math.round((alturaCm / 150) * 100));
    }

    const responsableRaw = cell(row, idx.responsable)?.trim();
    const responsable = responsableRaw?.length
      ? responsableRaw
      : "Equipo de Campo";

    const faseRaw = cell(row, idx.fase)?.trim();
    const faseCrecimiento = faseRaw?.length
      ? faseRaw
      : alturaCm && alturaCm > 80
        ? "Llenado de Fruto"
        : alturaCm && alturaCm > 40
          ? "Floración"
          : "Desarrollo Vegetativo";

    const productividad = deriveProductividad(
      cell(row, idx.productividad) ?? "",
    );
    const sanidad = deriveSanidad(cell(row, idx.sanidad) ?? "", phSuelo);

    const obsRaw = cell(row, idx.observaciones)?.trim();
    const observaciones = obsRaw?.length
      ? obsRaw
      : `Medición real de Google Sheets (${fecha}). Altura: ${alturaCm !== null ? alturaCm + "cm" : "N/D"}, Humedad: ${humedad}%.`;

    records.push({
      id: `MET-GS-${coords.code}-${fecha}-${r}`,
      invernadero: "Invernadero Macollo",
      fila: coords.fila,
      columna: coords.columna,
      plantId: coords.plantId,
      code: coords.code,
      fecha,
      hora,
      timestampTexto: hora ? `${fecha}, ${hora}` : fecha,
      phSuelo,
      tempInterna,
      tempInvernadero: tempInterna,
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
      avatarColor: avatarColorFor(responsable),
      observaciones,
    });
  }

  return records;
}

export async function fetchSheetRecords(url: string): Promise<MetricRecord[]> {
  const targetUrl = normalizeGoogleSheetUrl(url);

  const response = await fetch(targetUrl, {
    headers: {
      "User-Agent": "Macollo-Greenhouse-Sync/2.0",
      Accept: "text/csv,text/plain,*/*",
    },
  });

  if (!response.ok) {
    throw new SheetsSyncError(
      `No se pudo acceder a Google Sheets (HTTP ${response.status}). Asegúrese de que el documento tenga permisos de lectura "Cualquier persona con el enlace puede ver" o esté "Publicado en la web como CSV".`,
      422,
    );
  }

  const rows = parseCSV(await response.text());
  if (rows.length < 2) {
    throw new SheetsSyncError(
      "El documento descargado está vacío o no contiene filas de datos.",
      422,
    );
  }

  const records = buildRecordsFromRows(rows);
  if (records.length === 0) {
    throw new SheetsSyncError(
      "No se pudieron extraer registros válidos del archivo de Google Sheets. Verifique las columnas del documento.",
      422,
    );
  }

  return records;
}

export class SheetsSyncError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "SheetsSyncError";
  }
}
