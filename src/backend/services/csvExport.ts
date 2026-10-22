import type { MetricRecord } from "../../shared/plantMatrix";

const HEADERS = [
  "Planta",
  "Fila",
  "Columna",
  "Fecha",
  "Hora",
  "pH_Suelo",
  "Temp_Interna_C",
  "Temp_Externa_C",
  "Temp_Suelo_C",
  "Humedad_Pct",
  "Altura_cm",
  "Crecimiento_Pct",
  "Fase",
  "Productividad",
  "Sanidad",
  "Responsable",
  "Observaciones",
];

function cell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const text = String(value);
  return /[",\r\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const numberOrBlank = (value: number | null | undefined) =>
  value === null || value === undefined || Number.isNaN(Number(value))
    ? ""
    : String(value);

export function generateCsv(records: MetricRecord[]): string {
  const lines = [HEADERS.join(",")];
  for (const record of records) {
    lines.push(
      [
        cell(record.plantId),
        cell(record.fila),
        cell(record.columna),
        cell(record.fecha),
        cell(record.hora),
        numberOrBlank(record.phSuelo),
        numberOrBlank(record.tempInterna),
        numberOrBlank(record.tempExterna),
        numberOrBlank(record.tempSuelo),
        numberOrBlank(record.humedad),
        numberOrBlank(record.alturaCm),
        numberOrBlank(record.crecimiento),
        cell(record.faseCrecimiento),
        cell(record.productividad),
        cell(record.sanidad),
        cell(record.responsable),
        cell(record.observaciones),
      ].join(","),
    );
  }
  return `\uFEFF${lines.join("\r\n")}\r\n`;
}
