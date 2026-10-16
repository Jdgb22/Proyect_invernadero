// GET  /api/finca/activa — devolver la finca activa del usuario (cookie validada contra membresía)
// POST /api/finca/activa — activar una finca { fincaId }
import type { APIRoute } from "astro";
import { z } from "zod";
import {
  getAuthUser,
  getFincaCookie,
  setFincaCookie,
  clearFincaCookie,
  json,
  unauthorized,
  forbidden,
  notFound,
  parseId,
} from "../../../backend/services/authz";
import {
  getFincaById,
  userCanUseFinca,
  listFincasForUser,
} from "../../../backend/services/fincas";

export const GET: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const cookieFincaId = parseId(getFincaCookie(request));
  if (
    cookieFincaId &&
    (await userCanUseFinca(user.id, user.role, cookieFincaId))
  ) {
    const finca = await getFincaById(cookieFincaId);
    if (finca && finca.activa) {
      return json({ finca });
    }
  }

  // Sin cookie válida: si tiene una sola finca, esa es la activa
  const fincas = await listFincasForUser(user.id, user.role);
  if (fincas.length === 1) {
    const finca = fincas[0];
    const response = json({ finca });
    response.headers.append("Set-Cookie", setFincaCookie(String(finca.id)));
    return response;
  }

  const response = json({ finca: null, fincas });
  response.headers.append("Set-Cookie", clearFincaCookie());
  return response;
};

const PostSchema = z.object({ fincaId: z.number().int().positive() });

export const POST: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ message: "Cuerpo JSON inválido." }, 400);
  }
  const parsed = PostSchema.safeParse(body);
  if (!parsed.success) return json({ message: "Datos no válidos." }, 400);

  const fincaId = parsed.data.fincaId;
  if (!(await userCanUseFinca(user.id, user.role, fincaId))) {
    return forbidden("No formas parte de esa finca.");
  }

  const finca = await getFincaById(fincaId);
  if (!finca || !finca.activa) return notFound("Finca no encontrada.");

  const response = json({ message: "Finca activa actualizada.", finca });
  response.headers.append("Set-Cookie", setFincaCookie(String(fincaId)));
  return response;
};
