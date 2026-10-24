// DELETE /api/farms/:id/invitations/:invId — revocar una invitación
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
} from "../../../../../backend/services/authz";
import { revokeInvitacion } from "../../../../../backend/services/farms";

export const DELETE: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const fincaId = parseId(params.id);
  const invId = parseId(params.invId);
  if (!fincaId || !invId) return notFound("Invitación no encontrada.");

  const access = await getFincaAccess(fincaId, user);
  if (!canManageFinca(access)) {
    return forbidden(
      "Solo el dueño, Admins o Superadmins pueden revocar invitaciones.",
    );
  }

  const revoked = await revokeInvitacion(invId, fincaId);
  if (!revoked) return notFound("Invitación no encontrada.");
  return json({ message: "Invitación revocada." });
};
