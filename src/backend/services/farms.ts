// Lógica de negocio de fincas, membresías, invitaciones y plantas.

import { customAlphabet } from "nanoid";
import { nolookalikesSafe } from "nanoid-dictionary";
import { pool } from "../../db/client";
import { getAuthUser, getFincaCookie, type AuthUser } from "./authz";
import type { FincaRole, SystemRole } from "./authz";

interface FincaRow {
  id: number;
  nombre: string;
  descripcion: string | null;
  ubicacion: string | null;
  dueno_id: number;
  activa: boolean;
  created_at: string;
  rol_finca?: FincaRole;
  dueno_nombre?: string | null;
  miembros_count?: number;
}

const FILAS = ["t0", "t1", "t2", "t3"] as const;
const COLUMNAS = ["Col 1", "Col 2", "Col 3", "Col 4", "Col 5"] as const;

/** Máximo de fincas que un mismo usuario puede crear. */
const MAX_FINCAS_POR_USUARIO = 5;

// Alfabeto sin caracteres confusos (nanoid-dictionary), en MAYÚSCULAS para que
// coincida con el .toUpperCase() que aplican redeemInvitacion/peekInvitacion.
const INVITE_ALPHABET = [...new Set(nolookalikesSafe.toUpperCase())].join("");
const generarCodigoBase = customAlphabet(INVITE_ALPHABET, 8);

export class FincaError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Genera un código de invitación único. Reintenta si hay colisión. */
async function generarCodigoInvitacion(): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const codigo = generarCodigoBase();
    const res = await pool.query(
      "SELECT 1 FROM finca_invitaciones WHERE codigo = $1",
      [codigo],
    );
    if (res.rows.length === 0) return codigo;
  }
  throw new FincaError(
    500,
    "No se pudo generar un código de invitación único.",
  );
}

/** Siembra la matriz estándar de 20 plantas (4x5) en una finca. */
async function seedPlantas(
  fincaId: number,
  client?: import("pg").PoolClient,
): Promise<void> {
  const q = client ? client.query.bind(client) : pool.query.bind(pool);
  for (const fila of FILAS) {
    for (const columna of COLUMNAS) {
      const n = FILAS.indexOf(fila) * 5 + COLUMNAS.indexOf(columna) + 1;
      const plantId = `P-${n < 10 ? "0" + n : n}`;
      await q(
        `INSERT INTO plantas (finca_id, fila, columna, plant_id)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (finca_id, fila, columna) DO NOTHING`,
        [fincaId, fila, columna, plantId],
      );
    }
  }
}

/** Crea una finca y su membresía de dueño en una transacción. */
export async function createFinca(
  duenoId: number,
  data: {
    nombre: string;
    descripcion?: string | null;
    ubicacion?: string | null;
  },
): Promise<FincaRow> {
  const countRes = await pool.query(
    "SELECT COUNT(*)::int AS total FROM fincas WHERE dueno_id = $1",
    [duenoId],
  );
  if ((countRes.rows[0]?.total ?? 0) >= MAX_FINCAS_POR_USUARIO) {
    throw new FincaError(
      409,
      `Límite alcanzado: máximo ${MAX_FINCAS_POR_USUARIO} fincas por usuario.`,
    );
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const fincaRes = await client.query(
      `INSERT INTO fincas (nombre, descripcion, ubicacion, dueno_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nombre, descripcion, ubicacion, dueno_id, activa, created_at`,
      [data.nombre, data.descripcion || null, data.ubicacion || null, duenoId],
    );
    const finca = fincaRes.rows[0];
    await client.query(
      `INSERT INTO finca_miembros (finca_id, user_id, rol_finca)
       VALUES ($1, $2, 'dueno')
       ON CONFLICT (finca_id, user_id) DO UPDATE SET rol_finca = 'dueno'`,
      [finca.id, duenoId],
    );
    await seedPlantas(finca.id, client);
    await client.query("COMMIT");
    return finca;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

/** Lista las fincas visibles para el usuario (las suyas + todas si es staff). */
export async function listFincasForUser(
  userId: number,
  role: SystemRole,
  { soloActivas = true }: { soloActivas?: boolean } = {},
): Promise<FincaRow[]> {
  const activaClause = soloActivas ? "AND f.activa = TRUE" : "";
  const staffClause =
    role === "Superadmin" || role === "Admin" ? "OR TRUE" : "";

  const res = await pool.query(
    `SELECT f.id, f.nombre, f.descripcion, f.ubicacion, f.dueno_id, f.activa, f.created_at,
            COALESCE(m.rol_finca,
              CASE WHEN f.dueno_id = $1 THEN 'dueno'::varchar ELSE NULL END) AS rol_finca,
            u.name AS dueno_nombre,
            (SELECT COUNT(*)::int FROM finca_miembros m2 WHERE m2.finca_id = f.id) AS miembros_count
     FROM fincas f
     JOIN users u ON u.id = f.dueno_id
     LEFT JOIN finca_miembros m ON m.finca_id = f.id AND m.user_id = $1
     WHERE (m.user_id IS NOT NULL OR f.dueno_id = $1 ${staffClause})
       ${activaClause}
     ORDER BY f.nombre ASC`,
    [userId],
  );
  return res.rows;
}

export async function getFincaById(fincaId: number): Promise<FincaRow | null> {
  const res = await pool.query(
    `SELECT f.id, f.nombre, f.descripcion, f.ubicacion, f.dueno_id, f.activa, f.created_at,
            u.name AS dueno_nombre,
            (SELECT COUNT(*)::int FROM finca_miembros m2 WHERE m2.finca_id = f.id) AS miembros_count
     FROM fincas f
     JOIN users u ON u.id = f.dueno_id
     WHERE f.id = $1`,
    [fincaId],
  );
  return res.rows[0] || null;
}

export async function updateFinca(
  fincaId: number,
  data: {
    nombre?: string;
    descripcion?: string | null;
    ubicacion?: string | null;
  },
): Promise<void> {
  await pool.query(
    `UPDATE fincas
     SET nombre = COALESCE($2, nombre),
         descripcion = $3,
         ubicacion = $4,
         updated_at = NOW()
     WHERE id = $1`,
    [
      fincaId,
      data.nombre ?? null,
      data.descripcion ?? null,
      data.ubicacion ?? null,
    ],
  );
}

export async function setFincaActiva(
  fincaId: number,
  activa: boolean,
): Promise<void> {
  await pool.query(
    "UPDATE fincas SET activa = $2, updated_at = NOW() WHERE id = $1",
    [fincaId, activa],
  );
}

export async function hardDeleteFinca(fincaId: number): Promise<void> {
  await pool.query("DELETE FROM fincas WHERE id = $1", [fincaId]);
}

// ------------------------- Miembros -------------------------

export async function listMembers(fincaId: number): Promise<
  {
    id: number;
    user_id: number;
    name: string;
    email: string | null;
    phone: string | null;
    rol_finca: FincaRole;
    created_at: string;
  }[]
> {
  const res = await pool.query(
    `SELECT m.id, m.user_id, u.name, u.email, u.phone, m.rol_finca, m.created_at
     FROM finca_miembros m
     JOIN users u ON u.id = m.user_id
     WHERE m.finca_id = $1
     ORDER BY m.rol_finca DESC, u.name ASC`,
    [fincaId],
  );
  return res.rows;
}

export async function removeMember(
  fincaId: number,
  userId: number,
): Promise<boolean> {
  const finca = await getFincaById(fincaId);
  if (finca && finca.dueno_id === userId) {
    throw new FincaError(400, "No se puede expulsar al dueño de la finca.");
  }
  const res = await pool.query(
    "DELETE FROM finca_miembros WHERE finca_id = $1 AND user_id = $2",
    [fincaId, userId],
  );
  return (res.rowCount ?? 0) > 0;
}

export async function leaveFinca(
  fincaId: number,
  userId: number,
): Promise<boolean> {
  return removeMember(fincaId, userId);
}

// ------------------------- Invitaciones -------------------------

interface InvitacionRow {
  id: number;
  finca_id: number;
  codigo: string;
  creado_por: number;
  expira_en: string;
  usos_maximos: number;
  usos_usados: number;
  activa: boolean;
  created_at: string;
  creador_nombre?: string | null;
}

export async function createInvitacion(
  fincaId: number,
  creadoPor: number,
  { expiraEn, usosMaximos }: { expiraEn: Date; usosMaximos: number },
): Promise<InvitacionRow> {
  const codigo = await generarCodigoInvitacion();
  const res = await pool.query(
    `INSERT INTO finca_invitaciones (finca_id, codigo, creado_por, expira_en, usos_maximos)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [fincaId, codigo, creadoPor, expiraEn.toISOString(), usosMaximos],
  );
  return res.rows[0];
}

export async function listInvitaciones(
  fincaId: number,
): Promise<InvitacionRow[]> {
  const res = await pool.query(
    `SELECT i.*, u.name AS creador_nombre
     FROM finca_invitaciones i
     JOIN users u ON u.id = i.creado_por
     WHERE i.finca_id = $1
     ORDER BY i.created_at DESC`,
    [fincaId],
  );
  return res.rows;
}

export async function revokeInvitacion(
  invitacionId: number,
  fincaId: number,
): Promise<boolean> {
  const res = await pool.query(
    "UPDATE finca_invitaciones SET activa = FALSE WHERE id = $1 AND finca_id = $2",
    [invitacionId, fincaId],
  );
  return (res.rowCount ?? 0) > 0;
}

/**
 * Canjea un código de invitación de forma atómica.
 * Valida vigencia, usos y que el usuario no sea ya miembro.
 */
export async function redeemInvitacion(
  userId: number,
  codigoRaw: string,
): Promise<{ fincaId: number; fincaNombre: string }> {
  const codigo = codigoRaw.trim().toUpperCase();

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const invRes = await client.query(
      `SELECT i.*, f.nombre AS finca_nombre, f.activa AS finca_activa
       FROM finca_invitaciones i
       JOIN fincas f ON f.id = i.finca_id
       WHERE i.codigo = $1
       FOR UPDATE OF i`,
      [codigo],
    );
    const inv = invRes.rows[0];

    if (!inv) throw new FincaError(404, "El código de invitación no existe.");
    if (!inv.activa) throw new FincaError(410, "Esta invitación fue revocada.");
    if (!inv.finca_activa)
      throw new FincaError(410, "La finca ya no está disponible.");
    if (new Date(inv.expira_en) < new Date()) {
      throw new FincaError(410, "Esta invitación ha expirado.");
    }
    if (inv.usos_usados >= inv.usos_maximos) {
      throw new FincaError(
        410,
        "Esta invitación ya no tiene usos disponibles.",
      );
    }

    const memberRes = await client.query(
      "SELECT 1 FROM finca_miembros WHERE finca_id = $1 AND user_id = $2",
      [inv.finca_id, userId],
    );
    if (memberRes.rows.length > 0) {
      throw new FincaError(409, "Ya formas parte de esta finca.");
    }

    await client.query(
      "UPDATE finca_invitaciones SET usos_usados = usos_usados + 1 WHERE id = $1",
      [inv.id],
    );
    await client.query(
      `INSERT INTO finca_miembros (finca_id, user_id, rol_finca)
       VALUES ($1, $2, 'miembro')
       ON CONFLICT (finca_id, user_id) DO NOTHING`,
      [inv.finca_id, userId],
    );

    await client.query("COMMIT");
    return { fincaId: inv.finca_id, fincaNombre: inv.finca_nombre };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

/** Valida un código sin canjearlo (para mostrar la vista previa de unión). */
export async function peekInvitacion(codigoRaw: string): Promise<{
  fincaId: number;
  fincaNombre: string;
  expiraEn: string;
  usosRestantes: number;
} | null> {
  const codigo = codigoRaw.trim().toUpperCase();
  const res = await pool.query(
    `SELECT i.*, f.nombre AS finca_nombre, f.activa AS finca_activa
     FROM finca_invitaciones i
     JOIN fincas f ON f.id = i.finca_id
     WHERE i.codigo = $1`,
    [codigo],
  );
  const inv = res.rows[0];
  if (!inv) return null;
  if (!inv.activa || !inv.finca_activa) return null;
  if (new Date(inv.expira_en) < new Date()) return null;
  const usosRestantes = inv.usos_maximos - inv.usos_usados;
  if (usosRestantes <= 0) return null;
  return {
    fincaId: inv.finca_id,
    fincaNombre: inv.finca_nombre,
    expiraEn: inv.expira_en,
    usosRestantes,
  };
}

// ------------------------- Finca activa -------------------------

interface ActiveFincaContext {
  user: AuthUser;
  fincas: FincaRow[];
  finca: FincaRow | null;
}

/**
 * Resuelve el usuario autenticado y su finca activa a partir de la cookie.
 * Si la cookie es inválida pero el usuario tiene una sola finca, la usa.
 * Devuelve null si no hay sesión.
 */
export async function resolveActiveFinca(
  request: Request,
): Promise<ActiveFincaContext | null> {
  const user = await getAuthUser(request);
  if (!user) return null;
  const fincas = await listFincasForUser(user.id, user.role);

  const cookieRaw = getFincaCookie(request);
  const cookieId = cookieRaw ? Number(cookieRaw) : NaN;
  let finca: FincaRow | null = null;
  if (Number.isInteger(cookieId)) {
    finca = fincas.find((f) => f.id === cookieId) ?? null;
  }
  if (!finca && fincas.length === 1) finca = fincas[0];

  return { user, fincas, finca };
}

/** Verifica que el usuario pueda activar esa finca (membresía o staff). */
export async function userCanUseFinca(
  userId: number,
  role: SystemRole,
  fincaId: number,
): Promise<boolean> {
  if (role === "Superadmin" || role === "Admin") return true;
  const res = await pool.query(
    `SELECT 1 FROM finca_miembros m
     JOIN fincas f ON f.id = m.finca_id
     WHERE m.finca_id = $1 AND m.user_id = $2 AND f.activa = TRUE`,
    [fincaId, userId],
  );
  return res.rows.length > 0;
}

/** Plantas de una finca (matriz). */
export async function listPlantas(
  fincaId: number,
): Promise<{ id: number; fila: string; columna: string; plant_id: string }[]> {
  const res = await pool.query(
    `SELECT id, fila, columna, plant_id FROM plantas WHERE finca_id = $1 ORDER BY fila, columna`,
    [fincaId],
  );
  return res.rows;
}
