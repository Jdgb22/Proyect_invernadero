import type { APIRoute } from "astro";
import {
  getFincaAccess,
  canViewFincaData,
  json,
  unauthorized,
  forbidden,
} from "../../../backend/services/authz";
import { resolveActiveFinca } from "../../../backend/services/fincas";
import { getLecturasByFinca } from "../../../backend/services/lecturas";
import { getOwnEmail } from "../../../backend/services/profile";
import type { MetricRecord } from "../../../shared/plantMatrix";
import { sendWeeklySummaryEmail } from "../../../services/notifications";

const PH_MIN = 6;
const PH_MAX = 6.8;

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

const label = (record: MetricRecord) =>
  record.code || record.plantId || `${record.fila}-${record.columna}`;

export const POST: APIRoute = async ({ request }) => {
  const ctx = await resolveActiveFinca(request);
  if (!ctx) return unauthorized();
  if (!ctx.finca) {
    return json(
      { sent: false, message: "Selecciona una finca activa para el resumen." },
      400,
    );
  }

  const access = await getFincaAccess(ctx.finca.id, ctx.user);
  if (!canViewFincaData(access)) {
    return forbidden("No tienes acceso a los datos de esta finca.");
  }

  const email = await getOwnEmail(ctx.user.id);
  if (!email) {
    return json(
      { sent: false, message: "Tu cuenta no tiene un correo configurado." },
      400,
    );
  }

  const records = await getLecturasByFinca(ctx.finca.id);
  const latest = latestByPlant(records);
  const phValidos = latest
    .map((record) => Number(record.phSuelo))
    .filter((value) => Number.isFinite(value) && value > 0);
  const temps = latest
    .map((record) => Number(record.tempInterna ?? record.tempInvernadero))
    .filter((value) => Number.isFinite(value) && value > 0);

  const detalles: string[] = [];
  const phFuera = latest.filter((record) => {
    const ph = Number(record.phSuelo);
    return Number.isFinite(ph) && ph > 0 && (ph < PH_MIN || ph > PH_MAX);
  });
  if (phFuera.length > 0) {
    detalles.push(
      `pH fuera de rango: ${phFuera
        .slice(0, 6)
        .map(
          (record) => `${label(record)} (${Number(record.phSuelo).toFixed(1)})`,
        )
        .join(", ")}.`,
    );
  }
  const criticas = latest.filter((record) => record.sanidad === "Crítica");
  if (criticas.length > 0) {
    detalles.push(
      `Plantas críticas: ${criticas.map(label).slice(0, 6).join(", ")}.`,
    );
  }

  const result = await sendWeeklySummaryEmail({
    to: email,
    userName: ctx.user.name || "Usuario",
    data: {
      fincaNombre: ctx.finca.nombre,
      totalLecturas: records.length,
      plantasConDatos: latest.length,
      phPromedio:
        phValidos.length > 0
          ? phValidos.reduce((sum, value) => sum + value, 0) / phValidos.length
          : null,
      tempInteriorPromedio:
        temps.length > 0
          ? temps.reduce((sum, value) => sum + value, 0) / temps.length
          : null,
      criticas: criticas.length,
      vulnerables: latest.filter((record) => record.sanidad === "Vulnerable")
        .length,
      ultimaFecha: records.at(-1)?.fecha ?? "",
      detalles,
    },
  });

  if (!result.sent) {
    return json(
      {
        sent: false,
        message: result.message || "No se pudo enviar el resumen por correo.",
      },
      502,
    );
  }
  return json({
    sent: true,
    message: `Resumen enviado a ${email}.`,
  });
};
