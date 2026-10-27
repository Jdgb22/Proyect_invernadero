// POST /api/farms/leave — el usuario se sale de una finca (no puede salir de la que es dueño)
import type { APIRoute } from "astro";
import { z } from "zod";
import {
  getAuthUser,
  json,
  unauthorized,
  parseJsonBody,
} from "../../../backend/services/authz";
import { leaveFinca, FincaError } from "../../../backend/services/farms";

const Schema = z.object({ fincaId: z.number().int().positive() });

export const POST: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const body = await parseJsonBody(request);
  if (body === null) return json({ message: "Cuerpo JSON inválido." }, 400);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return json({ message: "Datos no válidos." }, 400);

  const fincaId = parsed.data.fincaId;
  try {
    const left = await leaveFinca(fincaId, user.id);
    if (!left) return json({ message: "No formas parte de esa finca." }, 404);
    return json({ message: "Saliste de la finca." });
  } catch (err) {
    if (err instanceof FincaError)
      return json({ message: err.message }, err.status);
    console.error("[Fincas] Error saliendo:", err);
    return json({ message: "Error al salir de la finca." }, 500);
  }
};
