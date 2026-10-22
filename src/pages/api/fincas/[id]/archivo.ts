// POST /api/fincas/:id/archivo — archivar o restaurar finca
// Body: { activa: boolean }
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
} from "../../../../backend/services/authz";
import {
  getFincaById,
  setFincaActiva,
} from "../../../../backend/services/fincas";

const Schema = z.object({ activa: z.boolean() });

export const POST: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const fincaId = parseId(params.id);
  if (!fincaId) return notFound("Finca no encontrada.");

  const access = await getFincaAccess(fincaId, user);
  if (!canManageFinca(access)) {
    return forbidden(
      "Solo el dueño, Admins o Superadmins pueden archivar/restaurar la finca.",
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ message: "Cuerpo JSON inválido." }, 400);
  }
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return json({ message: "Se espera { activa: boolean }." }, 400);
  }

  const finca = await getFincaById(fincaId);
  if (!finca) return notFound("Finca no encontrada.");

  await setFincaActiva(fincaId, parsed.data.activa);
  return json({
    message: parsed.data.activa
      ? `Finca "${finca.nombre}" restaurada.`
      : `Finca "${finca.nombre}" archivada.`,
  });
};
