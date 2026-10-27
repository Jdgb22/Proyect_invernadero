import type { MetricRecord } from "./plantMatrix";
import { getNotifyCritical, getNotifyMaintenance } from "./preferences";

export interface ReadingAlert {
  key: string;
  kind: "critical" | "maintenance";
  title: string;
  description: string;
}

const PH_MIN = 6;
const PH_MAX = 6.8;
const HUMEDAD_MIN = 30;
const ALERT_PREFIX = "macollo-alert";

function latestByPlant(records: MetricRecord[]): MetricRecord[] {
  const latest = new Map<string, MetricRecord>();
  for (const record of records) {
    const key = record.plantId || `${record.fila}|${record.columna}`;
    const current = latest.get(key);
    if (
      !current ||
      `${record.fecha} ${record.hora}` >= `${current.fecha} ${current.hora}`
    ) {
      latest.set(key, record);
    }
  }
  return Array.from(latest.values());
}

const plantLabel = (record: MetricRecord) =>
  record.code || record.plantId || `${record.fila}-${record.columna}`;

export function evaluateReadingAlerts(records: MetricRecord[]): ReadingAlert[] {
  if (records.length === 0) return [];
  const alerts: ReadingAlert[] = [];
  const latest = latestByPlant(records);

  if (getNotifyCritical()) {
    const phFuera = latest
      .filter((record) => {
        const ph = Number(record.phSuelo);
        return Number.isFinite(ph) && ph > 0 && (ph < PH_MIN || ph > PH_MAX);
      })
      .slice(0, 4);
    if (phFuera.length > 0) {
      alerts.push({
        key: `ph-${phFuera.map(plantLabel).join("-")}`,
        kind: "critical",
        title: "pH fuera del rango óptimo",
        description: phFuera
          .map(
            (record) =>
              `${plantLabel(record)}: ${Number(record.phSuelo).toFixed(1)}`,
          )
          .join(", "),
      });
    }

    const criticas = latest.filter((record) => record.sanidad === "Crítica");
    if (criticas.length > 0) {
      alerts.push({
        key: `sanidad-${criticas.map(plantLabel).join("-")}`,
        kind: "critical",
        title: "Plantas en estado crítico",
        description: `${criticas.length} planta(s): ${criticas
          .slice(0, 5)
          .map(plantLabel)
          .join(", ")}`,
      });
    }

    const sedientas = latest.filter((record) => {
      const humedad = Number(record.humedad);
      return Number.isFinite(humedad) && humedad > 0 && humedad < HUMEDAD_MIN;
    });
    if (sedientas.length > 0) {
      alerts.push({
        key: `humedad-${sedientas.map(plantLabel).join("-")}`,
        kind: "critical",
        title: "Humedad baja: revisa el riego",
        description: `${sedientas.length} planta(s) por debajo del ${HUMEDAD_MIN}% (${sedientas
          .slice(0, 5)
          .map(plantLabel)
          .join(", ")}).`,
      });
    }
  }

  if (getNotifyMaintenance()) {
    const sinPh = latest.filter((record) => Number(record.phSuelo) <= 0);
    const sinTemp = latest.filter(
      (record) =>
        record.tempSuelo === null ||
        record.tempSuelo === undefined ||
        Number.isNaN(Number(record.tempSuelo)),
    );
    if (sinPh.length > 0 || sinTemp.length > 0) {
      alerts.push({
        key: "mantenimiento-sensores",
        kind: "maintenance",
        title: "Calibración de sensores pendiente",
        description: `${sinPh.length} lectura(s) sin pH y ${sinTemp.length} sin temperatura de suelo. Revisa los sensores de campo.`,
      });
    }
  }

  return alerts;
}

function alertKey(key: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `${ALERT_PREFIX}:${today}:${key}`;
}

function getSileo(): any {
  return typeof window === "undefined" ? null : (window as any).sileo;
}

export function showReadingAlerts(records: MetricRecord[], attempt = 0): void {
  if (typeof window === "undefined") return;
  const sileo = getSileo();
  if (!sileo) {
    if (attempt < 3) {
      window.setTimeout(() => showReadingAlerts(records, attempt + 1), 900);
    }
    return;
  }

  let shown = 0;
  for (const alert of evaluateReadingAlerts(records)) {
    const key = alertKey(alert.key);
    try {
      if (sessionStorage.getItem(key)) continue;
      sessionStorage.setItem(key, "1");
    } catch {}
    const notify =
      alert.kind === "critical"
        ? sileo.error
        : (sileo.warning ?? sileo.info ?? sileo.error);
    notify?.({ title: alert.title, description: alert.description });
    shown += 1;
    if (shown >= 3) break;
  }
}
