// Persistencia y lectura de mediciones agronómicas por finca.
// Traduce entre las filas de `lecturas` (PostgreSQL) y el formato MetricRecord
// que consumen los componentes de tablero/historial.

import { pool } from "../../db/client";
import type { MetricRecord } from "../../shared/plantMatrix";
import { avatarColorFor } from "../../shared/avatar";

interface LecturaRow {
  id: string | number;
  finca_nombre: string;
  fila: string;
  columna: string;
  plant_id: string;
  fecha: string | Date;
  hora: string | null;
  ph_suelo: number | null;
  temp_interna: number | null;
  temp_externa: number | null;
  temp_suelo: number | null;
  humedad: number | null;
  altura_cm: number | null;
  crecimiento: number | null;
  fase: string | null;
  productividad: string | null;
  sanidad: string | null;
  observaciones: string | null;
  responsable: string | null;
}

function toISODate(value: string | Date): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function rowToRecord(row: LecturaRow): MetricRecord {
  const fecha = toISODate(row.fecha);
  const hora = row.hora || "";
  const n = Number(row.plant_id.replace(/\D/g, "")) || 0;
  const responsable = row.responsable || "Equipo de Campo";
  return {
    id: `LEC-${row.id}`,
    invernadero: row.finca_nombre,
    fila: row.fila as MetricRecord["fila"],
    columna: row.columna as MetricRecord["columna"],
    plantId: row.plant_id,
    code: `${row.fila.toUpperCase()}-P${((n - 1) % 5) + 1}`,
    fecha,
    hora,
    timestampTexto: hora ? `${fecha}, ${hora}` : fecha,
    phSuelo: row.ph_suelo ?? 0,
    tempInterna: row.temp_interna,
    tempInvernadero: row.temp_interna ?? undefined,
    tempExterna: row.temp_externa ?? null,
    tempSuelo: row.temp_suelo,
    humedad: row.humedad ?? undefined,
    alturaCm: row.altura_cm,
    crecimiento: row.crecimiento ?? 0,
    faseCrecimiento: row.fase || "Sin registrar",
    productividad:
      (row.productividad as MetricRecord["productividad"]) || "Media",
    sanidad: (row.sanidad as MetricRecord["sanidad"]) || "Saludable",
    responsable,
    responsableRol: "Registro de campo",
    avatarColor: avatarColorFor(responsable),
    observaciones: row.observaciones || undefined,
  };
}

/** Todas las lecturas de una finca, ordenadas por fecha ascendente. */
export async function getLecturasByFinca(
  fincaId: number,
): Promise<MetricRecord[]> {
  const res = await pool.query(
    `SELECT l.id, f.nombre AS finca_nombre, p.fila, p.columna, p.plant_id,
            l.fecha, l.hora, l.ph_suelo, l.temp_interna, l.temp_externa, l.temp_suelo,
            l.humedad, l.altura_cm, l.crecimiento, l.fase, l.productividad, l.sanidad,
            l.observaciones, u.name AS responsable
     FROM lecturas l
     JOIN plantas p ON p.id = l.planta_id
     JOIN fincas f ON f.id = l.finca_id
     LEFT JOIN users u ON u.id = l.responsable_id
     WHERE l.finca_id = $1
     ORDER BY l.fecha ASC, l.hora ASC`,
    [fincaId],
  );
  return res.rows.map(rowToRecord);
}

/** Plantas de la finca indexadas por (fila, columna). */
async function getPlantaMap(fincaId: number): Promise<Map<string, number>> {
  const res = await pool.query(
    "SELECT id, fila, columna FROM plantas WHERE finca_id = $1",
    [fincaId],
  );
  const map = new Map<string, number>();
  for (const row of res.rows) {
    map.set(`${row.fila}|${row.columna}`, row.id);
  }
  return map;
}

/**
 * Inserta/actualiza lecturas de una finca. Deduplica por (planta, fecha, hora).
 * Devuelve cuántas filas se escribieron.
 */
export async function insertLecturas(
  fincaId: number,
  records: MetricRecord[],
  responsableId: number | null,
): Promise<number> {
  const plantaMap = await getPlantaMap(fincaId);
  const client = await pool.connect();
  let escritas = 0;
  try {
    await client.query("BEGIN");
    for (const r of records) {
      if (!r.fecha || !/^\d{4}-\d{2}-\d{2}$/.test(r.fecha)) continue;
      const plantaId = plantaMap.get(`${r.fila}|${r.columna}`);
      if (!plantaId) continue;

      await client.query(
        `INSERT INTO lecturas
           (finca_id, planta_id, fecha, hora, ph_suelo, temp_interna, temp_externa,
            temp_suelo, humedad, altura_cm, crecimiento, fase, productividad, sanidad,
            responsable_id, observaciones)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
         ON CONFLICT (finca_id, planta_id, fecha, hora) DO UPDATE SET
           ph_suelo = EXCLUDED.ph_suelo,
           temp_interna = EXCLUDED.temp_interna,
           temp_externa = EXCLUDED.temp_externa,
           temp_suelo = EXCLUDED.temp_suelo,
           humedad = EXCLUDED.humedad,
           altura_cm = EXCLUDED.altura_cm,
           crecimiento = EXCLUDED.crecimiento,
           fase = EXCLUDED.fase,
           productividad = EXCLUDED.productividad,
           sanidad = EXCLUDED.sanidad,
           observaciones = EXCLUDED.observaciones`,
        [
          fincaId,
          plantaId,
          r.fecha,
          r.hora || "",
          r.phSuelo ?? null,
          r.tempInterna ?? null,
          r.tempExterna ?? null,
          r.tempSuelo ?? null,
          r.humedad ?? null,
          r.alturaCm ?? null,
          r.crecimiento ?? null,
          r.faseCrecimiento || null,
          r.productividad || null,
          r.sanidad || null,
          responsableId,
          r.observaciones || null,
        ],
      );
      escritas++;
    }
    await client.query("COMMIT");
    return escritas;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function deleteLecturasByFinca(fincaId: number): Promise<number> {
  const res = await pool.query("DELETE FROM lecturas WHERE finca_id = $1", [
    fincaId,
  ]);
  return res.rowCount ?? 0;
}
