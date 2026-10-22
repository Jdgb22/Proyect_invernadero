// GET  /api/fincas/:id/lecturas — lecturas agronómicas de la finca (miembros/staff)
// POST /api/fincas/:id/lecturas — registra/actualiza lecturas (miembros/staff)
import type { APIRoute } from "astro";
import {
  getAuthUser,
  getFincaAccess,
  canViewFincaData,
  canWriteFincaData,
  canManageFinca,
  json,
  unauthorized,
  forbidden,
  notFound,
  parseId,
  parseJsonBody,
} from "../../../../backend/services/authz";
import {
  getLecturasByFinca,
  insertLecturas,
  deleteLecturasByFinca,
} from "../../../../backend/services/lecturas";
import type { MetricRecord } from "../../../../shared/plantMatrix";

export const GET: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const fincaId = parseId(params.id);
  if (!fincaId) return notFound("Finca no encontrada.");

  const access = await getFincaAccess(fincaId, user);
  if (!canViewFincaData(access)) {
    return forbidden("No tienes acceso a los datos de esta finca.");
  }

  const records = await getLecturasByFinca(fincaId);
  return json({ records });
};

export const POST: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const fincaId = parseId(params.id);
  if (!fincaId) return notFound("Finca no encontrada.");

  const access = await getFincaAccess(fincaId, user);
  if (!canWriteFincaData(access)) {
    return forbidden("No puedes registrar mediciones en esta finca.");
  }

  const body = await parseJsonBody(request);
  if (body === null) {
    return json({ message: "Cuerpo de la petición inválido." }, 400);
  }

  const records = Array.isArray((body as { records?: unknown })?.records)
    ? ((body as { records: unknown[] }).records as MetricRecord[])
    : [];
  if (records.length === 0) {
    return json({ message: "No se recibieron lecturas para guardar." }, 400);
  }

  try {
    const count = await insertLecturas(fincaId, records, user.id);
    return json({ message: `Se guardaron ${count} lecturas.`, count });
  } catch (err) {
    console.error("[Lecturas] Error guardando:", err);
    return json({ message: "Error al guardar las lecturas." }, 500);
  }
};

export const DELETE: APIRoute = async ({ request, params }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const fincaId = parseId(params.id);
  if (!fincaId) return notFound("Finca no encontrada.");

  const access = await getFincaAccess(fincaId, user);
  if (!canManageFinca(access)) {
    return forbidden(
      "Solo el dueño, Admins o Superadmins pueden restablecer la finca.",
    );
  }

  try {
    const count = await deleteLecturasByFinca(fincaId);
    return json({
      message: `Se eliminaron ${count} lectura(s) del historial.`,
      count,
    });
  } catch (err) {
    console.error("[Lecturas] Error restableciendo datos:", err);
    return json({ message: "Error al restablecer los datos." }, 500);
  }
};
