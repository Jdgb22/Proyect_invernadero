import { pool } from "../../db/client";

export type SystemRole = "Superadmin" | "Admin" | "Agropecuario" | "Campesino";
export type FincaRole = "dueno" | "miembro";

/** Nivel de acceso a una finca concreta. */
export type FincaAccess = "none" | "miembro" | "dueno" | "staff";

export interface AuthUser {
  id: number;
  role: SystemRole;
  name: string | null;
  email: string | null;
  image: string | null;
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function unauthorized(): Response {
  return json({ message: "No autenticado." }, 401);
}

export function forbidden(
  message = "No tienes permiso para esta acción.",
): Response {
  return json({ message }, 403);
}

export function notFound(message = "Recurso no encontrado."): Response {
  return json({ message }, 404);
}

export async function parseJsonBody(request: Request): Promise<unknown | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

/**
 * Obtiene el usuario autenticado con su rol ACTUAL de la BD.
 * Devuelve null si no hay sesión o el usuario ya no existe.
 */
export async function getAuthUser(request: Request): Promise<AuthUser | null> {
  const { getSession } = await import("auth-astro/server");
  const session = await getSession(request);
  const rawId = session?.user?.id;
  if (!rawId) return null;

  const userId = Number(rawId);
  if (!Number.isInteger(userId) || userId <= 0) return null;

  const res = await pool.query(
    "SELECT id, role, name, email, image FROM users WHERE id = $1",
    [userId],
  );
  const row = res.rows[0];
  if (!row) return null;

  return {
    id: row.id,
    role: (row.role as SystemRole) || "Campesino",
    name: row.name ?? null,
    email: row.email ?? null,
    image: row.image ?? null,
  };
}

function isStaff(role: SystemRole): boolean {
  return role === "Superadmin" || role === "Admin";
}

export function canManageSystem(role: SystemRole): boolean {
  return role === "Superadmin";
}

export function canHardDeleteFinca(role: SystemRole): boolean {
  return role === "Superadmin";
}

/**
 * Acceso efectivo del usuario a una finca.
 * staff (Superadmin/Admin) = acceso total a todas las fincas.
 */
export async function getFincaAccess(
  fincaId: number,
  user: AuthUser,
): Promise<FincaAccess> {
  if (isStaff(user.role)) return "staff";

  const res = await pool.query(
    `SELECT m.rol_finca
     FROM finca_miembros m
     JOIN fincas f ON f.id = m.finca_id
     WHERE m.finca_id = $1 AND m.user_id = $2 AND f.activa = TRUE`,
    [fincaId, user.id],
  );
  const row = res.rows[0];
  if (!row) return "none";
  return row.rol_finca === "dueno" ? "dueno" : "miembro";
}

export function canManageFinca(access: FincaAccess): boolean {
  return access === "staff" || access === "dueno";
}

/** Puede ver los datos agronómicos de la finca. */
export function canViewFincaData(access: FincaAccess): boolean {
  return access !== "none";
}

/** Puede registrar mediciones / sincronizar datos en la finca. */
export function canWriteFincaData(access: FincaAccess): boolean {
  return access !== "none";
}

/**
 * Puede conectar y sincronizar Google Sheets en la finca.
 * Regla de negocio: SOLO el dueño (rol_finca = 'dueno'). Los miembros
 * (p. ej. un agronomo invitado) y el staff NO pueden hacerlo.
 */
export function canConnectSheets(access: FincaAccess): boolean {
  return access === "dueno";
}

/** Parsea un id de ruta/parámetro a entero positivo o null. */
export function parseId(value: string | undefined | null): number | null {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

const FINCA_COOKIE = "finca_activa";

/** Cookie httpOnly de finca activa. */
export function setFincaCookie(value: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${FINCA_COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}${secure}`;
}

export function clearFincaCookie(): string {
  return `${FINCA_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

/** Lee la cookie de finca activa desde la petición. */
export function getFincaCookie(request: Request): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === FINCA_COOKIE) {
      const raw = rest.join("=");
      return raw ? decodeURIComponent(raw) : null;
    }
  }
  return null;
}
