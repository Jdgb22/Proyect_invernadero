// src/backend/services/metricsData.ts
// Servicio y modelo de datos de Métricas Agronómicas para Invernadero AquaSens (Invernadero Único).
// Matriz estricta de 4 Filas (t0, t1, t2, t3) × 5 Columnas (Col 1, Col 2, Col 3, Col 4, Col 5) = 20 Plantas.

export interface MetricRecord {
  id: string;
  invernadero: string; // Invernadero AquaSens (Único)
  fila: 't0' | 't1' | 't2' | 't3';
  columna: 'Col 1' | 'Col 2' | 'Col 3' | 'Col 4' | 'Col 5';
  plantId: string; // ej: 'P-01', 'P-02', ..., 'P-20'
  fecha: string; // Formato YYYY-MM-DD
  hora: string; // ej: '08:30 AM'
  timestampTexto: string; // ej: 'Hoy, 08:30 AM'
  phSuelo: number; // Escala 0 - 14
  tempInterna: number; // °C
  tempExterna: number; // °C
  tempSuelo: number; // °C
  crecimiento: number; // % (0 a 100)
  faseCrecimiento: string; // ej: 'Floración', 'Desarrollo Vegetativo', 'Maduración'
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

// Generar fecha actual en formato local ISO (YYYY-MM-DD)
function getTodayDateString(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().slice(0, 10);
}

const today = getTodayDateString(0);
const yesterday = getTodayDateString(1);
const twoDaysAgo = getTodayDateString(2);
const threeDaysAgo = getTodayDateString(3);

// Fases de cultivo
const fases = ['Desarrollo Vegetativo', 'Floración', 'Llenado de Fruto', 'Maduración'];

// Datos deterministas para cada una de las 20 plantas (4 filas x 5 columnas)
interface SeedData {
  ph: number;
  tin: number;
  tout: number;
  tsoil: number;
  growth: number;
  fase: string;
  prod: 'Alta' | 'Media' | 'Baja';
  sanidad: 'Excelente' | 'Saludable' | 'Vulnerable' | 'Crítica';
  resp: string;
  rol: string;
  avatar: string;
  obs: string;
}

const plantSeeds: Record<string, SeedData> = {
  't0-Col 1': { ph: 6.4, tin: 24.5, tout: 20.1, tsoil: 20.3, growth: 88, fase: 'Floración', prod: 'Alta', sanidad: 'Excelente', resp: 'Luis Manuel Florez', rol: 'Líder de Cultivo', avatar: 'bg-emerald-600', obs: 'Fila t0 Col 1 en óptimas condiciones fitosanitarias.' },
  't0-Col 2': { ph: 6.2, tin: 23.8, tout: 19.8, tsoil: 19.9, growth: 82, fase: 'Floración', prod: 'Alta', sanidad: 'Excelente', resp: 'Administrador', rol: 'Supervisor Técnico', avatar: 'bg-indigo-600', obs: 'Riego matutino verificado; vigor de hojas alto.' },
  't0-Col 3': { ph: 6.5, tin: 24.1, tout: 20.0, tsoil: 20.2, growth: 85, fase: 'Floración', prod: 'Alta', sanidad: 'Excelente', resp: 'Luis Manuel Florez', rol: 'Líder de Cultivo', avatar: 'bg-emerald-600', obs: 'Floración abundante con cuajado visible.' },
  't0-Col 4': { ph: 5.9, tin: 25.2, tout: 20.4, tsoil: 21.0, growth: 76, fase: 'Desarrollo Vegetativo', prod: 'Media', sanidad: 'Saludable', resp: 'Juan David Gómez', rol: 'Técnico Agrónomo', avatar: 'bg-blue-600', obs: 'pH levemente ácido; se recomienda monitoreo nutricional.' },
  't0-Col 5': { ph: 6.3, tin: 24.7, tout: 20.2, tsoil: 20.5, growth: 80, fase: 'Floración', prod: 'Alta', sanidad: 'Excelente', resp: 'Administrador', rol: 'Supervisor Técnico', avatar: 'bg-indigo-600', obs: 'Condiciones de luz y transpiración estables.' },

  't1-Col 1': { ph: 6.1, tin: 24.8, tout: 20.5, tsoil: 20.8, growth: 78, fase: 'Desarrollo Vegetativo', prod: 'Alta', sanidad: 'Saludable', resp: 'Juan David Gómez', rol: 'Técnico Agrónomo', avatar: 'bg-blue-600', obs: 'Crecimiento continuo en tallo principal.' },
  't1-Col 2': { ph: 6.6, tin: 25.0, tout: 20.3, tsoil: 20.9, growth: 81, fase: 'Floración', prod: 'Alta', sanidad: 'Excelente', resp: 'Luis Manuel Florez', rol: 'Líder de Cultivo', avatar: 'bg-emerald-600', obs: 'Excelente absorción de nutrientes radiculares.' },
  't1-Col 3': { ph: 5.7, tin: 26.5, tout: 21.2, tsoil: 22.4, growth: 68, fase: 'Desarrollo Vegetativo', prod: 'Media', sanidad: 'Vulnerable', resp: 'Sofía Mora', rol: 'Supervisora de Riego', avatar: 'bg-amber-600', obs: 'Suelo con menor retención de humedad; compensar riego.' },
  't1-Col 4': { ph: 6.3, tin: 24.4, tout: 20.1, tsoil: 20.4, growth: 79, fase: 'Desarrollo Vegetativo', prod: 'Alta', sanidad: 'Saludable', resp: 'Juan David Gómez', rol: 'Técnico Agrónomo', avatar: 'bg-blue-600', obs: 'Follaje verde intenso y buena aireación.' },
  't1-Col 5': { ph: 6.0, tin: 25.4, tout: 20.8, tsoil: 21.5, growth: 72, fase: 'Desarrollo Vegetativo', prod: 'Media', sanidad: 'Saludable', resp: 'Carlos Restrepo', rol: 'Auxiliar de Campo', avatar: 'bg-teal-600', obs: 'Sin plagas ni anomalías observadas.' },

  't2-Col 1': { ph: 7.2, tin: 27.8, tout: 22.1, tsoil: 23.5, growth: 52, fase: 'Desarrollo Vegetativo', prod: 'Baja', sanidad: 'Vulnerable', resp: 'Sofía Mora', rol: 'Supervisora de Riego', avatar: 'bg-amber-600', obs: 'pH alcalino. Programar aplicación de enmienda ácida.' },
  't2-Col 2': { ph: 6.5, tin: 24.6, tout: 20.3, tsoil: 20.6, growth: 84, fase: 'Floración', prod: 'Alta', sanidad: 'Excelente', resp: 'Luis Manuel Florez', rol: 'Líder de Cultivo', avatar: 'bg-emerald-600', obs: 'Excelente respuesta tras poda de mantenimiento.' },
  't2-Col 3': { ph: 6.4, tin: 24.3, tout: 20.0, tsoil: 20.4, growth: 86, fase: 'Llenado de Fruto', prod: 'Alta', sanidad: 'Excelente', resp: 'Administrador', rol: 'Supervisor Técnico', avatar: 'bg-indigo-600', obs: 'Frutos en engorde homogéneo sin manchas.' },
  't2-Col 4': { ph: 5.4, tin: 29.5, tout: 22.8, tsoil: 24.8, growth: 44, fase: 'Desarrollo Vegetativo', prod: 'Baja', sanidad: 'Crítica', resp: 'Carlos Restrepo', rol: 'Auxiliar de Campo', avatar: 'bg-rose-600', obs: 'Estrés hídrico y térmico focalizado; requiere revisión urgente.' },
  't2-Col 5': { ph: 6.2, tin: 24.9, tout: 20.5, tsoil: 21.1, growth: 75, fase: 'Desarrollo Vegetativo', prod: 'Media', sanidad: 'Saludable', resp: 'Juan David Gómez', rol: 'Técnico Agrónomo', avatar: 'bg-blue-600', obs: 'Evolución favorable en comparación al día previo.' },

  't3-Col 1': { ph: 6.4, tin: 24.2, tout: 20.1, tsoil: 20.3, growth: 90, fase: 'Maduración', prod: 'Alta', sanidad: 'Excelente', resp: 'Luis Manuel Florez', rol: 'Líder de Cultivo', avatar: 'bg-emerald-600', obs: 'Cultivo maduro listo para recolección en los próximos días.' },
  't3-Col 2': { ph: 6.3, tin: 24.5, tout: 20.2, tsoil: 20.7, growth: 87, fase: 'Maduración', prod: 'Alta', sanidad: 'Excelente', resp: 'Administrador', rol: 'Supervisor Técnico', avatar: 'bg-indigo-600', obs: 'Fila t3 con alto rendimiento de producción.' },
  't3-Col 3': { ph: 6.7, tin: 25.1, tout: 20.6, tsoil: 21.2, growth: 83, fase: 'Llenado de Fruto', prod: 'Alta', sanidad: 'Saludable', resp: 'Juan David Gómez', rol: 'Técnico Agrónomo', avatar: 'bg-blue-600', obs: 'Peso estimado de fruto dentro de los estándares deseados.' },
  't3-Col 4': { ph: 6.5, tin: 24.8, tout: 20.4, tsoil: 20.9, growth: 92, fase: 'Maduración', prod: 'Alta', sanidad: 'Excelente', resp: 'Luis Manuel Florez', rol: 'Líder de Cultivo', avatar: 'bg-emerald-600', obs: 'Calidad de fruto superior, color y firmeza excelentes.' },
  't3-Col 5': { ph: 6.1, tin: 25.0, tout: 20.5, tsoil: 21.0, growth: 85, fase: 'Llenado de Fruto', prod: 'Alta', sanidad: 'Excelente', resp: 'Carlos Restrepo', rol: 'Auxiliar de Campo', avatar: 'bg-teal-600', obs: 'Sistema radicular limpio y vigoroso.' }
};

// Generar dataset completo con tomas de hoy y tomas históricas para cada planta
export const initialMetricsData: MetricRecord[] = [];
export const plantsMatrixData: PlantMatrixItem[] = [];

let plantCounter = 1;
FILAS.forEach((fila) => {
  COLUMNAS.forEach((columna) => {
    const key = `${fila}-${columna}`;
    const seed = plantSeeds[key] || {
      ph: 6.3,
      tin: 24.5,
      tout: 20.0,
      tsoil: 20.5,
      growth: 75,
      fase: 'Desarrollo Vegetativo',
      prod: 'Alta',
      sanidad: 'Saludable',
      resp: 'Administrador',
      rol: 'Supervisor Técnico',
      avatar: 'bg-indigo-600',
      obs: 'Estado normal.'
    };

    const plantNumStr = plantCounter < 10 ? `0${plantCounter}` : `${plantCounter}`;
    const plantId = `P-${plantNumStr}`;
    const plantNumber = plantCounter;
    plantCounter++;

    // 1. Registro del día de hoy (Última medición)
    const todayRecord: MetricRecord = {
      id: `MET-${fila}-${columna.replace(' ', '')}-TODAY`,
      invernadero: 'Invernadero AquaSens',
      fila,
      columna,
      plantId,
      fecha: today,
      hora: '09:30 AM',
      timestampTexto: 'Hoy, 09:30 AM',
      phSuelo: seed.ph,
      tempInterna: seed.tin,
      tempExterna: seed.tout,
      tempSuelo: seed.tsoil,
      crecimiento: seed.growth,
      faseCrecimiento: seed.fase,
      productividad: seed.prod,
      sanidad: seed.sanidad,
      responsable: seed.resp,
      responsableRol: seed.rol,
      avatarColor: seed.avatar,
      observaciones: seed.obs
    };

    // 2. Histórico previo (3 días antes) para gráficos individuales ricos y reales
    const historyRecord1: MetricRecord = {
      id: `MET-${fila}-${columna.replace(' ', '')}-H1`,
      invernadero: 'Invernadero AquaSens',
      fila,
      columna,
      plantId,
      fecha: yesterday,
      hora: '03:15 PM',
      timestampTexto: `${yesterday}, 03:15 PM`,
      phSuelo: Number((seed.ph + (Math.sin(plantNumber) * 0.15)).toFixed(1)),
      tempInterna: Number((seed.tin + 1.2).toFixed(1)),
      tempExterna: Number((seed.tout + 0.8).toFixed(1)),
      tempSuelo: Number((seed.tsoil + 0.6).toFixed(1)),
      crecimiento: Math.max(10, seed.growth - 2),
      faseCrecimiento: seed.fase,
      productividad: seed.prod,
      sanidad: seed.sanidad,
      responsable: seed.resp,
      responsableRol: seed.rol,
      avatarColor: seed.avatar,
      observaciones: 'Lectura vespertina en monitoreo de rutina.'
    };

    const historyRecord2: MetricRecord = {
      id: `MET-${fila}-${columna.replace(' ', '')}-H2`,
      invernadero: 'Invernadero AquaSens',
      fila,
      columna,
      plantId,
      fecha: twoDaysAgo,
      hora: '10:00 AM',
      timestampTexto: `${twoDaysAgo}, 10:00 AM`,
      phSuelo: Number((seed.ph - 0.1).toFixed(1)),
      tempInterna: Number((seed.tin - 0.5).toFixed(1)),
      tempExterna: Number((seed.tout - 0.6).toFixed(1)),
      tempSuelo: Number((seed.tsoil - 0.4).toFixed(1)),
      crecimiento: Math.max(10, seed.growth - 5),
      faseCrecimiento: seed.fase,
      productividad: seed.prod,
      sanidad: seed.sanidad,
      responsable: 'Juan David Gómez',
      responsableRol: 'Técnico Agrónomo',
      avatarColor: 'bg-blue-600',
      observaciones: 'Calibración de sensores de humedad y temperatura.'
    };

    const historyRecord3: MetricRecord = {
      id: `MET-${fila}-${columna.replace(' ', '')}-H3`,
      invernadero: 'Invernadero AquaSens',
      fila,
      columna,
      plantId,
      fecha: threeDaysAgo,
      hora: '08:45 AM',
      timestampTexto: `${threeDaysAgo}, 08:45 AM`,
      phSuelo: Number((seed.ph + 0.1).toFixed(1)),
      tempInterna: Number((seed.tin - 0.9).toFixed(1)),
      tempExterna: Number((seed.tout - 1.1).toFixed(1)),
      tempSuelo: Number((seed.tsoil - 0.8).toFixed(1)),
      crecimiento: Math.max(10, seed.growth - 8),
      faseCrecimiento: seed.fase,
      productividad: seed.prod,
      sanidad: seed.sanidad,
      responsable: 'Luis Manuel Florez',
      responsableRol: 'Líder de Cultivo',
      avatarColor: 'bg-emerald-600',
      observaciones: 'Inicio de ciclo de fertirriego semanal.'
    };

    // Orden cronológico para el historial (antiguo a reciente)
    const plantHistory = [historyRecord3, historyRecord2, historyRecord1, todayRecord];

    plantsMatrixData.push({
      fila,
      columna,
      plantId,
      plantNumber,
      latestMetric: todayRecord,
      history: plantHistory
    });

    // Agregar todas a initialMetricsData (con las de hoy primero)
    initialMetricsData.push(todayRecord);
    initialMetricsData.push(historyRecord1);
    initialMetricsData.push(historyRecord2);
    initialMetricsData.push(historyRecord3);
  });
});

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

export function getLatestMetrics(limit = 5): MetricRecord[] {
  return initialMetricsData.slice(0, limit);
}

export function getAllMetrics(): MetricRecord[] {
  return initialMetricsData;
}
