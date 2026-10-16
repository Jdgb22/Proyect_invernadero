// GET  /api/fincas/:id/lecturas — lecturas agronómicas de la finca (miembros/staff)
// POST /api/fincas/:id/lecturas — registra/actualiza lecturas (miembros/staff)
import type { APIRoute } from "astro";
import {
  getAuthUser,
  getFincaAccess,
  canViewFincaData,
  canWriteFincaData,
  json,
  unauthorized,
  forbidden,
  notFound,
  parseId,
} from "../../../../backend/services/authz";
import {
  getLecturasByFinca,
  insertLecturas,
} from "../../../../backend/services/lecturas";

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

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ message: "Cuerpo de la petición inválido." }, 400);
  }

  const records = Array.isArray(body?.records) ? body.records : [];
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
