// src/backend/services/metricsData.ts
// Servicio y modelo de datos de Métricas Agronómicas para AquaSens.
// Diseñado para 1 solo invernadero con distribución por Filas (t0, t1, t2...) y Columnas (Col 1, Col 2...).
// Centraliza los datos para alimentar tanto el resumen en Dashboard como el panel profesional en Métricas.

export interface MetricRecord {
  id: string;
  invernadero: string; // Invernadero AquaSens (Único)
  fila: string; // 't0' | 't1' | 't2' | 't3' | 't4'
  columna: string; // 'Col 1' | 'Col 2' | 'Col 3' | 'Col 4' | 'Col 5'
  fecha: string; // Formato YYYY-MM-DD para filtrado exacto por fecha (ej: '2026-09-03')
  hora: string; // ej: '08:30 AM'
  timestampTexto: string; // ej: '03 Sep, 08:30 AM'
  phSuelo: number; // Escala 0 - 14
  tempInterna: number; // °C
  tempExterna: number; // °C
  tempSuelo: number; // °C
  crecimiento: number; // % (0 a 100)
  faseCrecimiento: string; // ej: 'Floración', 'Desarrollo Vegetativo', 'Maduración'
  productividad: 'Alta' | 'Media' | 'Baja';
  sanidad: 'Excelente' | 'Saludable' | 'Vulnerable' | 'Crítica';
  responsable: string; // Nombre detectado por sesión
  responsableRol: string;
  avatarColor: string;
  observaciones?: string;
}

// Datos de demostración iniciales (ordenados cronológicamente, los más recientes primero)
export const initialMetricsData: MetricRecord[] = [
  {
    id: "MET-001",
    invernadero: "Invernadero AquaSens",
    fila: "t0",
    columna: "Col 1",
    fecha: "2026-09-03",
    hora: "09:30 AM",
    timestampTexto: "Hoy, 09:30 AM",
    phSuelo: 6.4,
    tempInterna: 24.5,
    tempExterna: 20.1,
    tempSuelo: 20.3,
    crecimiento: 85,
    faseCrecimiento: "Floración",
    productividad: "Alta",
    sanidad: "Excelente",
    responsable: "Luis Manuel Florez",
    responsableRol: "Líder de Cultivo",
    avatarColor: "bg-emerald-600",
    observaciones: "Fila t0 en condiciones óptimas. Fruto cuajando vigorosamente."
  },
  {
    id: "MET-002",
    invernadero: "Invernadero AquaSens",
    fila: "t0",
    columna: "Col 2",
    fecha: "2026-09-03",
    hora: "08:15 AM",
    timestampTexto: "Hoy, 08:15 AM",
    phSuelo: 6.2,
    tempInterna: 23.8,
    tempExterna: 19.4,
    tempSuelo: 19.8,
    crecimiento: 80,
    faseCrecimiento: "Floración",
    productividad: "Alta",
    sanidad: "Excelente",
    responsable: "Administrador",
    responsableRol: "Supervisor Técnico",
    avatarColor: "bg-indigo-600",
    observaciones: "Riego por goteo matutino completado sin anomalías."
  },
  {
    id: "MET-003",
    invernadero: "Invernadero AquaSens",
    fila: "t1",
    columna: "Col 3",
    fecha: "2026-09-02",
    hora: "04:45 PM",
    timestampTexto: "02 Sep, 04:45 PM",
    phSuelo: 5.7,
    tempInterna: 27.2,
    tempExterna: 22.0,
    tempSuelo: 23.1,
    crecimiento: 66,
    faseCrecimiento: "Desarrollo Vegetativo",
    productividad: "Media",
    sanidad: "Saludable",
    responsable: "Juan David Gómez",
    responsableRol: "Técnico Agrónomo",
    avatarColor: "bg-blue-600",
    observaciones: "Elevada radiación solar vespertina. Suelo ligeramente seco."
  },
  {
    id: "MET-004",
    invernadero: "Invernadero AquaSens",
    fila: "t2",
    columna: "Col 1",
    fecha: "2026-09-02",
    hora: "10:20 AM",
    timestampTexto: "02 Sep, 10:20 AM",
    phSuelo: 7.2,
    tempInterna: 28.6,
    tempExterna: 21.8,
    tempSuelo: 24.0,
    crecimiento: 48,
    faseCrecimiento: "Brote Temprano",
    productividad: "Baja",
    sanidad: "Vulnerable",
    responsable: "Sofía Mora",
    responsableRol: "Supervisora de Riego",
    avatarColor: "bg-amber-600",
    observaciones: "pH alcalino en Fila t2. Requiere corrección en el tanque de fertilización."
  },
  {
    id: "MET-005",
    invernadero: "Invernadero AquaSens",
    fila: "t3",
    columna: "Col 4",
    fecha: "2026-09-01",
    hora: "03:10 PM",
    timestampTexto: "01 Sep, 03:10 PM",
    phSuelo: 6.5,
    tempInterna: 25.0,
    tempExterna: 20.5,
    tempSuelo: 21.2,
    crecimiento: 92,
    faseCrecimiento: "Maduración y Cosecha",
    productividad: "Alta",
    sanidad: "Excelente",
    responsable: "Luis Manuel Florez",
    responsableRol: "Líder de Cultivo",
    avatarColor: "bg-emerald-600",
    observaciones: "Plantas de Fila t3 listas para selección y recolección."
  },
  {
    id: "MET-006",
    invernadero: "Invernadero AquaSens",
    fila: "t4",
    columna: "Col 5",
    fecha: "2026-08-31",
    hora: "11:00 AM",
    timestampTexto: "31 Ago, 11:00 AM",
    phSuelo: 5.3,
    tempInterna: 30.8,
    tempExterna: 23.4,
    tempSuelo: 25.4,
    crecimiento: 38,
    faseCrecimiento: "Crecimiento Lento",
    productividad: "Baja",
    sanidad: "Crítica",
    responsable: "Carlos Restrepo",
    responsableRol: "Auxiliar de Campo",
    avatarColor: "bg-rose-600",
    observaciones: "Fila t4 presentó calor excesivo y acidez. Se activó ventilación cenital."
  }
];

export function getLatestMetrics(limit = 2): MetricRecord[] {
  return initialMetricsData.slice(0, limit);
}

export function getAllMetrics(): MetricRecord[] {
  return initialMetricsData;
}
