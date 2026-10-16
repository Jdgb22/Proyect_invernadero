// PATCH  /api/admin/users/[id] — cambiar rol { role } (SOLO Superadmin)
// DELETE /api/admin/users/[id] — eliminar cuenta (SOLO Superadmin)
import type { APIRoute } from "astro";
import { z } from "zod";
import { pool } from "../../../../db/client";
import {
  getAuthUser,
  canManageSystem,
  json,
  unauthorized,
  forbidden,
  notFound,
  parseId,
} from "../../../../backend/services/authz";

const ROLES = ["Superadmin", "Admin", "Agropecuario", "Campesino"] as const;
const PatchSchema = z.object({ role: z.enum(ROLES) });

async function countSuperadmins(): Promise<number> {
  const res = await pool.query(
    `SELECT COUNT(*)::int AS n FROM users WHERE role = 'Superadmin'`,
  );
  return res.rows[0]?.n ?? 0;
}

export const PATCH: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();
  if (!canManageSystem(user.role))
    return forbidden("Solo un Superadmin gestiona usuarios.");

  const targetId = parseId(params.id);
  if (!targetId) return notFound("Usuario no encontrado.");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ message: "Cuerpo JSON inválido." }, 400);
  }
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) return json({ message: "Rol no válido." }, 400);

  const targetRes = await pool.query(
    "SELECT id, name, role FROM users WHERE id = $1",
    [targetId],
  );
  const target = targetRes.rows[0];
  if (!target) return notFound("Usuario no encontrado.");

  if (target.role === "Superadmin" && parsed.data.role !== "Superadmin") {
    if ((await countSuperadmins()) <= 1) {
      return forbidden(
        "No se puede degradar al último Superadmin del sistema.",
      );
    }
  }

  await pool.query(
    "UPDATE users SET role = $2, updated_at = NOW() WHERE id = $1",
    [targetId, parsed.data.role],
  );

  console.log(
    `[Admin] ${user.id} cambió rol de ${target.name} (#${targetId}): ${target.role} → ${parsed.data.role}`,
  );
  return json({
    message: `Rol de ${target.name} actualizado a ${parsed.data.role}.`,
  });
};

export const DELETE: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();
  if (!canManageSystem(user.role))
    return forbidden("Solo un Superadmin gestiona usuarios.");

  const targetId = parseId(params.id);
  if (!targetId) return notFound("Usuario no encontrado.");

  if (targetId === user.id) {
    return forbidden("No puedes eliminar tu propia cuenta desde el panel.");
  }

  const targetRes = await pool.query(
    "SELECT id, name, role FROM users WHERE id = $1",
    [targetId],
  );
  const target = targetRes.rows[0];
  if (!target) return notFound("Usuario no encontrado.");

  if (target.role === "Superadmin" && (await countSuperadmins()) <= 1) {
    return forbidden("No se puede eliminar al último Superadmin del sistema.");
  }

  const owned = await pool.query(
    "SELECT COUNT(*)::int AS n FROM fincas WHERE dueno_id = $1",
    [targetId],
  );
  const ownedCount = owned.rows[0]?.n ?? 0;
  if (ownedCount > 0) {
    return json(
      {
        message: `No se puede eliminar a ${target.name}: es dueño de ${ownedCount} finca(s). Elimina o transfiere esas fincas primero (Fincas → Eliminar, solo Superadmin).`,
      },
      409,
    );
  }

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [targetId]);
  } catch (err) {
    if ((err as { code?: string }).code === "23503") {
      return json(
        {
          message: `No se puede eliminar a ${target.name}: tiene registros asociados (lecturas).`,
        },
        409,
      );
    }
    throw err;
  }
  console.log(
    `[Admin] ${user.id} eliminó la cuenta ${target.name} (#${targetId})`,
  );
  return json({ message: `Cuenta de ${target.name} eliminada.` });
};
