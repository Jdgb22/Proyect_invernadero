// GET    /api/farms/:id  — detalle (miembro, dueño o staff)
// PATCH  /api/farms/:id  — editar datos (dueño, Admin, Superadmin)
// DELETE /api/farms/:id  — borrado físico (SOLO Superadmin)
import type { APIRoute } from "astro";
import { z } from "zod";
import {
  getAuthUser,
  getFincaAccess,
  canManageFinca,
  canHardDeleteFinca,
  json,
  unauthorized,
  forbidden,
  notFound,
  parseId,
  parseJsonBody,
} from "../../../backend/services/authz";
import {
  getFincaById,
  updateFinca,
  hardDeleteFinca,
  listMembers,
  FincaError,
} from "../../../backend/services/farms";

const PatchSchema = z.object({
  nombre: z.string().trim().min(2).max(255).optional(),
  descripcion: z.string().trim().max(2000).nullable().optional(),
  ubicacion: z.string().trim().max(500).nullable().optional(),
});

export const GET: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const fincaId = parseId(params.id);
  if (!fincaId) return notFound("Finca no encontrada.");

  const access = await getFincaAccess(fincaId, user);
  if (access === "none") return forbidden();

  const finca = await getFincaById(fincaId);
  if (!finca) return notFound("Finca no encontrada.");

  const miembros = await listMembers(fincaId);
  return json({ finca, miembros, access });
};

export const PATCH: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const fincaId = parseId(params.id);
  if (!fincaId) return notFound("Finca no encontrada.");

  const access = await getFincaAccess(fincaId, user);
  if (!canManageFinca(access)) {
    return forbidden(
      "Solo el dueño, Admins o Superadmins pueden editar la finca.",
    );
  }

  const body = await parseJsonBody(request);
  if (body === null) return json({ message: "Cuerpo JSON inválido." }, 400);
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { message: parsed.error.issues[0]?.message || "Datos no válidos." },
      400,
    );
  }

  const finca = await getFincaById(fincaId);
  if (!finca) return notFound("Finca no encontrada.");

  await updateFinca(fincaId, {
    nombre: parsed.data.nombre,
    descripcion:
      parsed.data.descripcion === undefined
        ? finca.descripcion
        : parsed.data.descripcion,
    ubicacion:
      parsed.data.ubicacion === undefined
        ? finca.ubicacion
        : parsed.data.ubicacion,
  });
  return json({ message: "Finca actualizada." });
};

export const DELETE: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  if (!canHardDeleteFinca(user.role)) {
    return forbidden(
      "Solo un Superadmin puede eliminar fincas definitivamente.",
    );
  }

  const fincaId = parseId(params.id);
  if (!fincaId) return notFound("Finca no encontrada.");

  const finca = await getFincaById(fincaId);
  if (!finca) return notFound("Finca no encontrada.");

  try {
    await hardDeleteFinca(fincaId);
    return json({
      message: `Finca "${finca.nombre}" eliminada definitivamente.`,
    });
  } catch (err) {
    if (err instanceof FincaError)
      return json({ message: err.message }, err.status);
    console.error("[Fincas] Error borrando finca:", err);
    return json({ message: "Error al eliminar la finca." }, 500);
  }
};
