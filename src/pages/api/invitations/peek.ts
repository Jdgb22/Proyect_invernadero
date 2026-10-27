// GET /api/invitations/peek?code=ABC123XY — vista previa de una invitación válida
import type { APIRoute } from "astro";
import {
  getAuthUser,
  json,
  unauthorized,
} from "../../../backend/services/authz";
import { peekInvitacion } from "../../../backend/services/farms";

export const GET: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const url = new URL(request.url);
  const code = url.searchParams.get("code")?.trim() || "";
  if (!code) return json({ message: "Falta el código." }, 400);

  const info = await peekInvitacion(code);
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
