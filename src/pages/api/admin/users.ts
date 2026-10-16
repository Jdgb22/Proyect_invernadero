// GET /api/admin/users?q= — listar usuarios (SOLO Superadmin)
import type { APIRoute } from "astro";
import { pool } from "../../../db/client";
import {
  getAuthUser,
  canManageSystem,
  json,
  unauthorized,
  forbidden,
} from "../../../backend/services/authz";

export const GET: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();
  if (!canManageSystem(user.role))
    return forbidden("Solo un Superadmin gestiona usuarios.");

  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() || "";

  const res = await pool.query(
    `SELECT u.id, u.name, u.email, u.phone, u.role, u.created_at,
            (SELECT COUNT(*)::int FROM finca_miembros m WHERE m.user_id = u.id) AS fincas_count
     FROM users u
     WHERE ($1 = '' OR
            LOWER(COALESCE(u.name, ''))  ILIKE '%' || $1 || '%' OR
            LOWER(COALESCE(u.email, '')) ILIKE '%' || $1 || '%' OR
            COALESCE(u.phone, '')        ILIKE '%' || $1 || '%')
     ORDER BY u.role ASC, u.name ASC
     LIMIT 200`,
    [q],
  );

  return json({ users: res.rows });
};
