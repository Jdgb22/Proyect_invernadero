// GET /api/invitaciones/peek?codigo=ABC123XY — vista previa de una invitación válida
import type { APIRoute } from "astro";
import {
  getAuthUser,
  json,
  unauthorized,
} from "../../../backend/services/authz";
import { peekInvitacion } from "../../../backend/services/fincas";

export const GET: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const url = new URL(request.url);
  const codigo = url.searchParams.get("codigo")?.trim() || "";
  if (!codigo) return json({ message: "Falta el código." }, 400);

  const info = await peekInvitacion(codigo);
  if (!info) {
    return json(
      {
        message:
          "El código no es válido, expiró o ya no tiene usos disponibles.",
      },
      404,
    );
  }
  return json({ invitacion: info });
};
