// GET  /api/farms/:id/invitations — listar invitaciones (dueño/Admin/Superadmin)
// POST /api/farms/:id/invitations — crear invitación { expiraDias, usosMaximos }
import type { APIRoute } from "astro";
import { z } from "zod";
import {
  getAuthUser,
  getFincaAccess,
  canManageFinca,
  json,
  unauthorized,
  forbidden,
  notFound,
  parseId,
  parseJsonBody,
} from "../../../../backend/services/authz";
import {
  createInvitacion,
  listInvitaciones,
  FincaError,
} from "../../../../backend/services/farms";

const CreateSchema = z.object({
  expiraDias: z.number().int().min(1).max(90).default(7),
  usosMaximos: z.number().int().min(1).max(500).default(1),
});

export const GET: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const fincaId = parseId(params.id);
  if (!fincaId) return notFound("Finca no encontrada.");

  const access = await getFincaAccess(fincaId, user);
  if (!canManageFinca(access)) {
    return forbidden(
      "Solo el dueño, Admins o Superadmins pueden ver las invitaciones.",
    );
  }

  const invitaciones = await listInvitaciones(fincaId);
  return json({ invitaciones });
};

export const POST: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const fincaId = parseId(params.id);
  if (!fincaId) return notFound("Finca no encontrada.");

  const access = await getFincaAccess(fincaId, user);
  if (!canManageFinca(access)) {
    return forbidden(
      "Solo el dueño, Admins o Superadmins pueden generar invitaciones.",
    );
  }

  const body = (await parseJsonBody(request)) ?? {};
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { message: parsed.error.issues[0]?.message || "Datos no válidos." },
      400,
    );
  }

  try {
    const expiraEn = new Date(
      Date.now() + parsed.data.expiraDias * 24 * 60 * 60 * 1000,
    );
    const invitacion = await createInvitacion(fincaId, user.id, {
      expiraEn,
      usosMaximos: parsed.data.usosMaximos,
    });
    return json({ message: "Invitación generada.", invitacion }, 201);
  } catch (err) {
    if (err instanceof FincaError)
      return json({ message: err.message }, err.status);
    console.error("[Invitaciones] Error creando:", err);
    return json({ message: "Error al crear la invitación." }, 500);
  }
};
