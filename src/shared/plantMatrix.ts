export const FILAS = ["t0", "t1", "t2", "t3"] as const;
export const COLUMNAS = ["Col 1", "Col 2", "Col 3", "Col 4", "Col 5"] as const;

export type Fila = (typeof FILAS)[number];
export type Columna = (typeof COLUMNAS)[number];

export const FILAS_POR_COLUMNA = COLUMNAS.length;
export const TOTAL_PLANTAS = FILAS.length * FILAS_POR_COLUMNA;

export type Productividad = "Alta" | "Media" | "Baja";
export type Sanidad = "Excelente" | "Saludable" | "Vulnerable" | "Crítica";

export interface MetricRecord {
  id: string;
  invernadero: string;
  fila: Fila;
  columna: Columna;
  plantId: string;
  code: string;
  fecha: string;
  hora: string;
  timestampTexto: string;
  phSuelo: number;
  tempInterna: number | null;
  tempInvernadero?: number;
  tempExterna: number | null;
  tempSuelo: number | null;
  humedad?: number;
  alturaCm?: number | null;
  crecimiento: number;
  faseCrecimiento: string;
  productividad: Productividad;
  sanidad: Sanidad;
  responsable: string;
  responsableRol: string;
  avatarColor: string;
  observaciones?: string;
}

export interface PlantMatrixItem {
  fila: Fila;
  columna: Columna;
  plantId: string;
  plantNumber: number;
  code: string;
  latestMetric: MetricRecord;
  history: MetricRecord[];
}

export interface PlantCoordinates {
  fila: Fila;
  columna: Columna;
  plantId: string;
  plantNumber: number;
  code: string;
}

export function plantIdFor(plantNumber: number): string {
  return `P-${plantNumber < 10 ? "0" + plantNumber : plantNumber}`;
}

export function codeFor(filaIndex: number, columnaIndex: number): string {
  return `T${filaIndex}-P${columnaIndex + 1}`;
}

export function resolvePlantCoordinates(
  plantIdRaw?: string,
  filaRaw?: string,
  colRaw?: string,
): PlantCoordinates {
  const pRaw = String(plantIdRaw || "").trim();
  const fRaw = String(filaRaw || "").trim();
  const cRaw = String(colRaw || "").trim();

  let filaIdx = -1;
  let colIdx = -1;

  const candidateTexts = [pRaw, fRaw, cRaw].filter(Boolean);
  for (const text of candidateTexts) {
    const compMatch = text.match(
      /(?:^|[^a-zA-Z])T([0-3O])[\s\-_/.]*(?:P|F|COL|PLANTA)?[\s\-_/.]*([1-5])\b/i,
    );
    if (compMatch) {
      const fChar = compMatch[1].toUpperCase() === "O" ? "0" : compMatch[1];
      filaIdx = parseInt(fChar, 10);
      colIdx = parseInt(compMatch[2], 10) - 1;
      break;
    }
  }

  if (filaIdx === -1 && fRaw) {
    const tratMatch = fRaw.match(
      /(?:TRATAMIENTO|FILA|CAMA|BLOQUE|SECCION)[\s\-_:]*T?([0-3O])\b/i,
    );
    if (tratMatch) {
      const fChar = tratMatch[1].toUpperCase() === "O" ? "0" : tratMatch[1];
      filaIdx = parseInt(fChar, 10);
    } else {
      const tMatch = fRaw.match(/(?:^|[^a-zA-Z])T([0-3O])(?:[^a-zA-Z0-9]|$)/i);
      if (tMatch) {
        const fChar = tMatch[1].toUpperCase() === "O" ? "0" : tMatch[1];
        filaIdx = parseInt(fChar, 10);
      } else {
        const dMatch = fRaw.match(/^([0-3])$/);
        if (dMatch) filaIdx = parseInt(dMatch[1], 10);
      }
    }
  }

  if (colIdx === -1) {
    for (const text of [cRaw, pRaw].filter(Boolean)) {
      const pMatch = text.match(
        /(?:^|[^a-zA-Z])P[\s\-_:]*0?([1-5])(?:[^a-zA-Z0-9]|$)/i,
      );
      if (pMatch) {
        colIdx = parseInt(pMatch[1], 10) - 1;
        break;
      }
      const namedColMatch = text.match(
        /(?:PLANTA|COL|COLUMNA|SITIO)[\s\-_:]*0?([1-5])\b/i,
      );
      if (namedColMatch) {
        colIdx = parseInt(namedColMatch[1], 10) - 1;
        break;
      }
      const numMatch = text.match(/^0?([1-5])$/);
      if (numMatch) {
        colIdx = parseInt(numMatch[1], 10) - 1;
        break;
      }
    }
  }

  if (filaIdx === -1) {
    const globalMatch =
      pRaw.match(/^P[-_\s]?0?([1-9]|1[0-9]|20)$/i) ||
      pRaw.match(/^0?([1-9]|1[0-9]|20)$/);
    if (globalMatch) {
      const num = parseInt(globalMatch[1], 10);
      filaIdx = Math.floor((num - 1) / FILAS_POR_COLUMNA);
      if (colIdx === -1) colIdx = (num - 1) % FILAS_POR_COLUMNA;
    }
  }

  if (filaIdx < 0 || filaIdx > 3) filaIdx = 0;
  if (colIdx < 0 || colIdx > 4) colIdx = 0;

  const plantNumber = filaIdx * FILAS_POR_COLUMNA + colIdx + 1;
  return {
    fila: FILAS[filaIdx],
    columna: COLUMNAS[colIdx],
    plantId: plantIdFor(plantNumber),
    plantNumber,
    code: codeFor(filaIdx, colIdx),
  };
}

function pendingMetric(
  fila: Fila,
  columna: Columna,
  plantId: string,
  code: string,
): MetricRecord {
  return {
    id: `MET-${code}-PENDING`,
    invernadero: "Invernadero Macollo",
    fila,
    columna,
    plantId,
    code,
    fecha: "",
    hora: "",
    timestampTexto: "Sin mediciones",
    phSuelo: 0,
    tempInterna: null,
    tempExterna: null,
    tempSuelo: null,
    crecimiento: 0,
    faseCrecimiento: "Esperando datos",
    productividad: "Media",
    sanidad: "Saludable",
    responsable: "Sin registrar",
    responsableRol: "Sin registrar",
    avatarColor: "bg-stone-500",
    observaciones:
      "Esperando sincronización de datos reales desde Google Sheets.",
  };
}

export function buildPlantsGridFromRecords(
  records: MetricRecord[],
): PlantMatrixItem[] {
  const result: PlantMatrixItem[] = [];

  FILAS.forEach((fila, fIdx) => {
    COLUMNAS.forEach((columna, cIdx) => {
      const plantNumber = fIdx * FILAS_POR_COLUMNA + cIdx + 1;
      const plantId = plantIdFor(plantNumber);
      const code = codeFor(fIdx, cIdx);

      const history = (records || [])
        .filter((r) => {
          if (r.code && r.code === code) return true;
          if (r.fila === fila && r.columna === columna) return true;
          if (r.plantId === plantId) return true;
          const resolved = resolvePlantCoordinates(
            r.code || r.plantId,
            r.fila,
            r.columna,
          );
          return resolved.fila === fila && resolved.columna === columna;
        })
        .sort((a, b) => a.fecha.localeCompare(b.fecha));

      result.push({
        fila,
        columna,
        plantId,
        plantNumber,
        code,
        latestMetric:
          history.length > 0
            ? history[history.length - 1]
            : pendingMetric(fila, columna, plantId, code),
        history,
      });
    });
  });

  return result;
}

export function buildEmptyPlantsGrid(): PlantMatrixItem[] {
  return buildPlantsGridFromRecords([]);
}
