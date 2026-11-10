import { resolvePlantCoordinates, type MetricRecord } from "./plantMatrix";
import { avatarColorFor } from "./avatar";
import {
  deriveProductividad,
  deriveSanidad,
  extractDateAndHour,
  isNullCell,
  parseCsvNumber,
} from "./csv";

export interface HeaderIndex {
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

function normalizeHeader(h: string | undefined): string {
  if (!h) return "";
  return h
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_ ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function indexHeaders(rawHeaders: string[]): HeaderIndex {
  const headers = rawHeaders.map(normalizeHeader);

  // 1. ID Planta
  let idPlanta = headers.findIndex(
    (h) =>
      h === "id_planta" ||
      h === "id planta" ||
      h === "idplanta" ||
      h.startsWith("id_planta") ||
      h.endsWith("_id_planta") ||
      h === "id" ||
      h === "plant_id" ||
      h === "plant id" ||
      h === "codigo_planta" ||
      h === "codigo planta",
  );
  if (idPlanta === -1) {
    idPlanta = headers.findIndex(
      (h) => h.includes("id") && h.includes("plant"),
    );
  }

  // 2. Fecha
  const findIn = (keywords: string[]) =>
    headers.findIndex((h) => keywords.some((k) => h === k || h.includes(k)));

  const fecha = findIn(["fecha", "date", "dia", "registro"]);

  // 3. Responsable: priorizar coincidencia exacta de campo de responsable
  const exactRespKeywords = [
    "responsable",
    "responsables",
    "responsable de toma",
    "responsable toma",
    "responsable de la toma",
    "responsable de medicion",
    "responsable medicion",
    "responsable de campo",
    "responsable campo",
    "nombre responsable",
    "nombre del responsable",
    "tecnico responsable",
    "operario responsable",
    "operador",
    "operario",
    "tecnico",
    "encargado",
    "evaluador",
    "observador",
    "recolector",
    "registrado por",
    "tomado por",
    "quien registra",
    "responsible",
    "operator",
    "technician",
    "evaluator",
    "collector",
    "recorded by",
    "taken by",
  ];

  let responsable = headers.findIndex((h) => exactRespKeywords.includes(h));

  if (responsable === -1) {
    responsable = headers.findIndex(
      (h) =>
        h.includes("responsab") ||
        h.includes("operari") ||
        h.includes("operad") ||
        h.includes("tecnic") ||
        h.includes("evaluad") ||
        h.includes("encargad") ||
        h.includes("recolect") ||
        h.includes("observad") ||
        h.includes("tomado") ||
        h.includes("registrado") ||
        h.includes("quien registra"),
    );
  }

  // Fallback a 'nombre', 'usuario', 'persona', pero SOLO si no es nombre de planta/finca/cultivo
  if (responsable === -1) {
    responsable = headers.findIndex((h) => {
      const isPerson =
        h === "nombre" ||
        h === "persona" ||
        h === "usuario" ||
        h === "autor" ||
        h === "personal" ||
        h === "staff";
      const isNotPlant =
        !h.includes("plant") &&
        !h.includes("cultiv") &&
        !h.includes("finca") &&
        !h.includes("lote") &&
        !h.includes("especie") &&
        !h.includes("variedad") &&
        !h.includes("archivo") &&
        !h.includes("invernadero");
      return isPerson && isNotPlant;
    });
  }

  // 4. Temperaturas y demás variables agronómicas
  const tempExt = headers.findIndex(
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

  const tempInt = headers.findIndex(
    (h) =>
      h === "t_int_c" ||
      h === "t_int" ||
      h.includes("t_int") ||
      h.includes("temp_int") ||
      h.includes("t int") ||
      (h.includes("temp") && h.includes("int")) ||
      h.includes("invernadero"),
  );

  const humedad = headers.findIndex(
    (h) =>
      h === "humedad_pct" ||
      h === "humedad" ||
      h.includes("humedad") ||
      h.includes("humidity") ||
      h.includes("hum_") ||
      h.includes("hum pct"),
  );

  const tempSuelo = headers.findIndex(
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

  const ph = headers.findIndex(
    (h) =>
      h === "ph" ||
      h.startsWith("ph_") ||
      h.startsWith("ph ") ||
      h.includes("ph"),
  );

  const altura = headers.findIndex(
    (h) =>
      h === "altura_cm" ||
      h === "altura" ||
      h.includes("altura") ||
      h.includes("alt_") ||
      h.includes("alt ") ||
      h.includes("crecimiento") ||
      h.includes("growth"),
  );

  const fase = findIn(["fase", "etapa", "fenologia"]);
  const productividad = findIn([
    "productividad",
    "prod",
    "rendimiento",
    "frutos",
  ]);
  const sanidad = findIn([
    "sanidad",
    "salud",
    "fitosanitario",
    "estado",
    "vigor",
  ]);
  const observaciones = findIn([
    "observacion",
    "notas",
    "comentario",
    "obs",
    "detalles",
  ]);

  return {
    idPlanta,
    fecha,
    responsable,
    tempExt,
    tempInt,
    humedad,
    tempSuelo,
    ph,
    altura,
    fase,
    productividad,
    sanidad,
    observaciones,
  };
}

function cell(row: string[], index: number): string | undefined {
  return index >= 0 ? row[index] : undefined;
}

export function findHeaderRowIndex(rows: string[][]): number {
  for (let r = 0; r < Math.min(rows.length, 10); r++) {
    const row = rows[r];
    if (!row || row.length === 0) continue;
    const normalized = row.map(normalizeHeader);
    const hasPlantId = normalized.some(
      (c) =>
        c.includes("planta") ||
        c === "id" ||
        c === "codigo" ||
        c === "id_planta" ||
        c === "plant_id" ||
        c === "plant id",
    );
    const hasFecha = normalized.some(
      (c) => c.includes("fecha") || c.includes("date") || c.includes("dia"),
    );
    const hasPh = normalized.some((c) => c === "ph" || c.startsWith("ph"));
    const hasResp = normalized.some(
      (c) =>
        c.includes("responsab") ||
        c.includes("operar") ||
        c.includes("operad") ||
        c.includes("tecnic"),
    );
    if (
      (hasPlantId && (hasFecha || hasPh || hasResp)) ||
      (hasFecha && (hasPh || hasResp))
    ) {
      return r;
    }
  }
  return 0;
}

export function buildRecordsFromRows(rows: string[][]): MetricRecord[] {
  if (rows.length < 2) return [];

  const headerRowIdx = findHeaderRowIndex(rows);
  const idx = indexHeaders(rows[headerRowIdx]);
  const records: MetricRecord[] = [];

  for (let r = headerRowIdx + 1; r < rows.length; r++) {
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
    const responsable =
      responsableRaw && responsableRaw.length > 0 && !isNullCell(responsableRaw)
        ? responsableRaw
        : "Sin registrar";

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
      : `Medición de Google Sheets (${fecha}). Altura: ${alturaCm !== null ? alturaCm + "cm" : "N/D"}, Humedad: ${humedad}%.`;

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
      responsableRol: "",
      avatarColor: avatarColorFor(responsable),
      observaciones,
    });
  }

  return records;
}
