// GET    /api/farms/:id/members            — listar miembros
// DELETE /api/farms/:id/members?userId=N   — expulsar a un miembro (dueño/Admin/Superadmin)
import type { APIRoute } from "astro";
import {
  getAuthUser,
  getFincaAccess,
  canManageFinca,
  json,
  unauthorized,
  forbidden,
  notFound,
  parseId,
} from "../../../../backend/services/authz";
import {
  listMembers,
  removeMember,
  FincaError,
} from "../../../../backend/services/farms";

export const GET: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const fincaId = parseId(params.id);
  if (!fincaId) return notFound("Finca no encontrada.");

  const access = await getFincaAccess(fincaId, user);
  if (!canManageFinca(access)) {
    return forbidden(
      "Solo el dueño, Admins o Superadmins pueden ver los miembros.",
    );
  }

  const miembros = await listMembers(fincaId);
  return json({ miembros });
};

export const DELETE: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const fincaId = parseId(params.id);
  if (!fincaId) return notFound("Finca no encontrada.");

  const access = await getFincaAccess(fincaId, user);
  if (!canManageFinca(access)) {
    return forbidden(
      "Solo el dueño, Admins o Superadmins pueden expulsar miembros.",
    );
  }

  const url = new URL(request.url);
  const targetId = parseId(url.searchParams.get("userId"));
  if (!targetId) return json({ message: "Falta el parámetro userId." }, 400);

  try {
    const removed = await removeMember(fincaId, targetId);
    if (!removed) return notFound("Ese usuario no es miembro de la finca.");
    return json({ message: "Miembro expulsado de la finca." });
  } catch (err) {
    if (err instanceof FincaError)
      return json({ message: err.message }, err.status);
    console.error("[Miembros] Error expulsando:", err);
    return json({ message: "Error al expulsar al miembro." }, 500);
  }
};
