// POST /api/invitaciones/usar — canjear código de invitación (cualquier usuario autenticado)
import type { APIRoute } from "astro";
import { z } from "zod";
import {
  getAuthUser,
  json,
  unauthorized,
  setFincaCookie,
  parseJsonBody,
} from "../../../backend/services/authz";
import { redeemInvitacion, FincaError } from "../../../backend/services/fincas";

const Schema = z.object({
  codigo: z.string().trim().min(4, "Ingresa el código de invitación.").max(20),
});

export const POST: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const body = await parseJsonBody(request);
  if (body === null) return json({ message: "Cuerpo JSON inválido." }, 400);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return json(
      { message: parsed.error.issues[0]?.message || "Datos no válidos." },
      400,
    );
  }

  try {
    const result = await redeemInvitacion(user.id, parsed.data.codigo);
    const response = json({
      message: `Te uniste a "${result.fincaNombre}".`,
      fincaId: result.fincaId,
      fincaNombre: result.fincaNombre,
    });
    response.headers.append(
      "Set-Cookie",
      setFincaCookie(String(result.fincaId)),
    );
    return response;
  } catch (err) {
    if (err instanceof FincaError)
      return json({ message: err.message }, err.status);
    console.error("[Invitaciones] Error canjeando:", err);
    return json({ message: "Error al canjear el código." }, 500);
  }
};
