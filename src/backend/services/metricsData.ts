// src/backend/services/metricsData.ts
// Servicio y modelo de datos de Métricas Agronómicas para Invernadero Macollo.
// Matriz de 4 Filas (t0, t1, t2, t3) × 5 Columnas (Col 1, Col 2, Col 3, Col 4, Col 5) = 20 Plantas.
// Toma de datos reales iniciada el 2026-09-14 hasta la fecha actual (2026-09-30).
// Nota agronómica: La temperatura de la planta no se pudo tomar el 2026-09-29 ni el 2026-09-30 (tempInterna = null).

export interface MetricRecord {
  id: string;
  invernadero: string; // Invernadero Macollo
  fila: 't0' | 't1' | 't2' | 't3';
  columna: 'Col 1' | 'Col 2' | 'Col 3' | 'Col 4' | 'Col 5';
  plantId: string; // 'P-01' a 'P-20'
  code: string; // 'T0-P1', 'T1-P1', etc.
  fecha: string; // Formato YYYY-MM-DD (a partir de 2026-09-14)
  hora: string; // ej: '09:00 AM'
  timestampTexto: string; // ej: '2026-09-14, 09:00 AM'
  phSuelo: number; // Escala 0 - 14 (columna Ph)
  tempInterna: number | null; // °C (columna T_Int_C / temperatura dentro del invernadero)
  tempInvernadero?: number; // °C (columna T_Int_C / interna de la nave del invernadero)
  tempExterna: number; // °C (columna T_Ext_C / exterior del invernadero)
  tempSuelo: number | null; // °C (columna T_Planta_C / temperatura del piso donde está la planta, null el 2026-09-29 y 2026-09-30)
  humedad?: number; // % (columna humedad_Pct)
  alturaCm?: number | null; // cm (columna ALtura_cm)
  crecimiento: number; // % (0 a 100)
  faseCrecimiento: string; // 'Desarrollo Vegetativo', 'Floración', 'Llenado de Fruto', 'Maduración'
  productividad: 'Alta' | 'Media' | 'Baja';
  sanidad: 'Excelente' | 'Saludable' | 'Vulnerable' | 'Crítica';
  responsable: string;
  responsableRol: string;
  avatarColor: string;
  observaciones?: string;
}

export interface PlantMatrixItem {
  fila: 't0' | 't1' | 't2' | 't3';
  columna: 'Col 1' | 'Col 2' | 'Col 3' | 'Col 4' | 'Col 5';
  plantId: string;
  plantNumber: number;
  code: string; // 'T0-P1' a 'T3-P5'
  latestMetric: MetricRecord;
  history: MetricRecord[];
}

export const FILAS: ('t0' | 't1' | 't2' | 't3')[] = ['t0', 't1', 't2', 't3'];
export const COLUMNAS: ('Col 1' | 'Col 2' | 'Col 3' | 'Col 4' | 'Col 5')[] = [
  'Col 1',
  'Col 2',
  'Col 3',
  'Col 4',
  'Col 5'
];

/**
 * Normaliza y resuelve de forma unívoca la posición de una planta en la matriz (4 filas x 5 columnas).
 * Maneja todas las variantes de registro de campo:
 * - Compuestos: 'T0-P1', 'TO-P2' (letra O por 0), 'T1-P1', 'T2-P3', 'T3-P5', 'T1P4', 'T2_P3', 'T3.P5'
 * - Separados: Tratamiento ('T0'..'T3', 'TO', 'Tratamiento 0'..'Tratamiento 3', '0'..'3') y Planta ('P1'..'P5', '1'..'5', 'Col 1'..'Col 5')
 * - IDs globales de planta: 'P-01' a 'P-20' o números 1 a 20 (cuando no se especifica tratamiento)
 */
export function resolvePlantCoordinates(
  plantIdRaw?: string,
  filaRaw?: string,
  colRaw?: string
): {
  fila: 't0' | 't1' | 't2' | 't3';
  columna: 'Col 1' | 'Col 2' | 'Col 3' | 'Col 4' | 'Col 5';
  plantId: string;
  plantNumber: number;
  code: string;
} {
  const pRaw = String(plantIdRaw || '').trim();
  const fRaw = String(filaRaw || '').trim();
  const cRaw = String(colRaw || '').trim();

  let filaIdx = -1;
  let colIdx = -1;

  // 1. Buscar código compuesto T[0-3O]-P[1-5] en cualquiera de las cadenas
  const candidateTexts = [pRaw, fRaw, cRaw].filter(Boolean);
  for (const text of candidateTexts) {
    const compMatch = text.match(/(?:^|[^a-zA-Z])T([0-3O])[\s\-_/.]*(?:P|F|COL|PLANTA)?[\s\-_/.]*([1-5])\b/i);
    if (compMatch) {
      const fChar = compMatch[1].toUpperCase() === 'O' ? '0' : compMatch[1];
      filaIdx = parseInt(fChar, 10);
      colIdx = parseInt(compMatch[2], 10) - 1;
      break;
    }
  }

  // 2. Extraer tratamiento (fila) si aún no está determinado
  if (filaIdx === -1 && fRaw) {
    // Si contiene la palabra tratamiento/fila/cama seguida de dígito o letra O
    const tratMatch = fRaw.match(/(?:TRATAMIENTO|FILA|CAMA|BLOQUE|SECCION)[\s\-_:]*T?([0-3O])\b/i);
    if (tratMatch) {
      const fChar = tratMatch[1].toUpperCase() === 'O' ? '0' : tratMatch[1];
      filaIdx = parseInt(fChar, 10);
    } else {
      // Buscar T0, TO, T1, T2, T3 usando límites de palabra para NO confundir con el sufijo "to" de "tratamiento"
      const tMatch = fRaw.match(/(?:^|[^a-zA-Z])T([0-3O])(?:[^a-zA-Z0-9]|$)/i);
      if (tMatch) {
        const fChar = tMatch[1].toUpperCase() === 'O' ? '0' : tMatch[1];
        filaIdx = parseInt(fChar, 10);
      } else {
        // Dígito directo 0, 1, 2, 3 en la columna de fila
        const dMatch = fRaw.match(/^([0-3])$/);
        if (dMatch) {
          filaIdx = parseInt(dMatch[1], 10);
        }
      }
    }
  }

  // 3. Extraer columna/planta (1..5) si aún no está determinada
  const colCandidates = [cRaw, pRaw].filter(Boolean);
  if (colIdx === -1) {
    for (const text of colCandidates) {
      // Buscar patrón P1..P5 o P-01..P-05
      const pMatch = text.match(/(?:^|[^a-zA-Z])P[\s\-_:]*0?([1-5])(?:[^a-zA-Z0-9]|$)/i);
      if (pMatch) {
        colIdx = parseInt(pMatch[1], 10) - 1;
        break;
      }
      // Buscar Planta 1..5, Col 1..5
      const namedColMatch = text.match(/(?:PLANTA|COL|COLUMNA|SITIO)[\s\-_:]*0?([1-5])\b/i);
      if (namedColMatch) {
        colIdx = parseInt(namedColMatch[1], 10) - 1;
        break;
      }
      // Dígito directo 1..5
      const numMatch = text.match(/^0?([1-5])$/);
      if (numMatch) {
        colIdx = parseInt(numMatch[1], 10) - 1;
        break;
      }
    }
  }

  // 4. Si filaIdx aún no se resolvió pero plantIdRaw tiene código global 1..20 (P-01 a P-20)
  if (filaIdx === -1) {
    const globalMatch = pRaw.match(/^P[-_\s]?0?([1-9]|1[0-9]|20)$/i) || pRaw.match(/^0?([1-9]|1[0-9]|20)$/);
    if (globalMatch) {
      const num = parseInt(globalMatch[1], 10);
      filaIdx = Math.floor((num - 1) / 5);
      if (colIdx === -1) {
        colIdx = (num - 1) % 5;
      }
    }
  }

  // Valores predeterminados seguros dentro de los límites (4 filas x 5 columnas)
  if (filaIdx < 0 || filaIdx > 3) filaIdx = 0;
  if (colIdx < 0 || colIdx > 4) colIdx = 0;

  const fila = FILAS[filaIdx];
  const columna = COLUMNAS[colIdx];
  const plantNumber = filaIdx * 5 + colIdx + 1;
  const plantId = `P-${plantNumber < 10 ? '0' + plantNumber : plantNumber}`;
  const code = `T${filaIdx}-P${colIdx + 1}`;

  return { fila, columna, plantId, plantNumber, code };
}

// Fechas del registro real: desde 2026-09-14 hasta 2026-09-30
export const REAL_DATES: string[] = [
  '2026-09-14',
  '2026-09-15',
  '2026-09-16',
  '2026-09-17',
  '2026-09-18',
  '2026-09-19',
  '2026-09-20',
  '2026-09-21',
  '2026-09-22',
  '2026-09-23',
  '2026-09-24',
  '2026-09-25',
  '2026-09-26',
  '2026-09-27',
  '2026-09-28',
  '2026-09-29', // Temperatura de planta no tomada
  '2026-09-30', // Temperatura de planta no tomada
];

// Dataset inicial vacío: esperando sincronización con Google Sheets
export const initialMetricsData: MetricRecord[] = [];

/**
 * Agrupa una lista de registros en la matriz de 20 plantas (4 filas x 5 columnas),
 * identificando su última medición registrada y su historial cronológico.
 */
export function buildPlantsGridFromRecords(records: MetricRecord[]): PlantMatrixItem[] {
  const result: PlantMatrixItem[] = [];

  FILAS.forEach((fila, fIdx) => {
    COLUMNAS.forEach((columna, cIdx) => {
      const plantNumber = fIdx * 5 + cIdx + 1;
      const plantId = `P-${plantNumber < 10 ? '0' + plantNumber : plantNumber}`;
      const code = `T${fIdx}-P${cIdx + 1}`;

      // Filtrar registros que pertenezcan a esta planta
      const plantHistory = (records || []).filter(r => {
        if (r.code && (r.code === code || (r.code === `TO-P${cIdx + 1}` && fIdx === 0))) return true;
        if (r.fila === fila && r.columna === columna) return true;
        if (r.plantId === plantId) return true;
        const resolved = resolvePlantCoordinates(r.code || r.plantId, r.fila, r.columna);
        return resolved.fila === fila && resolved.columna === columna;
      }).sort((a, b) => a.fecha.localeCompare(b.fecha)); // Orden antiguo a reciente

      const latestMetric: MetricRecord = plantHistory.length > 0
        ? plantHistory[plantHistory.length - 1]
        : {
            id: `MET-${code}-PENDING`,
            invernadero: 'Invernadero Macollo',
            fila,
            columna,
            plantId,
            code,
            fecha: '',
            hora: '',
            timestampTexto: 'Sin mediciones',
            phSuelo: 0,
            tempInterna: null,
            tempExterna: 0,
            tempSuelo: null,
            crecimiento: 0,
            faseCrecimiento: 'Esperando datos',
            productividad: 'Media',
            sanidad: 'Saludable',
            responsable: 'Sin registrar',
            responsableRol: 'Sin registrar',
            avatarColor: 'bg-stone-500',
            observaciones: 'Esperando sincronización de datos reales desde Google Sheets.'
          };

      result.push({
        fila,
        columna,
        plantId,
        plantNumber,
        code,
        latestMetric,
        history: plantHistory
      });
    });
  });

  return result;
}

export const plantsMatrixData: PlantMatrixItem[] = buildPlantsGridFromRecords(initialMetricsData);

export function getAllPlantsGrid(): PlantMatrixItem[] {
  return plantsMatrixData;
}

export function getTodayPlantMetrics(): MetricRecord[] {
  return plantsMatrixData.map(p => p.latestMetric);
}

export function getPlantHistory(fila: string, columna: string): MetricRecord[] {
  const item = plantsMatrixData.find(p => p.fila === fila && p.columna === columna);
  return item ? item.history : [];
}

export function getLatestMetrics(limit = 20): MetricRecord[] {
  return [...initialMetricsData].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, limit);
}

export function getAllMetrics(): MetricRecord[] {
  return initialMetricsData;
}
