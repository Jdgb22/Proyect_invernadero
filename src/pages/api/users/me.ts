import type { APIRoute } from "astro";
import { z } from "zod";
import {
  getAuthUser,
  json,
  unauthorized,
  parseJsonBody,
} from "../../../backend/services/authz";
import { updateOwnProfile } from "../../../backend/services/profile";

const IMAGE_PATTERN =
  /^(data:image\/(png|jpe?g|webp);base64,[A-Za-z0-9+/=]+|https?:\/\/\S+)$/;

const ProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "El nombre debe tener al menos 2 caracteres.")
      .max(255, "El nombre es demasiado largo.")
      .optional(),
    image: z
      .string()
      .max(400_000, "La imagen es demasiado grande.")
      .refine(
        (value) => value === "" || IMAGE_PATTERN.test(value),
        "Formato de imagen no válido.",
      )
      .optional(),
  })
  .refine((data) => data.name !== undefined || data.image !== undefined, {
    message: "No se enviaron cambios.",
  });

export const PATCH: APIRoute = async ({ request }) => {
  const user = await getAuthUser(request);
  if (!user) return unauthorized();

  const body = await parseJsonBody(request);
  if (body === null) return json({ message: "Cuerpo JSON inválido." }, 400);

  const parsed = ProfileSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { message: parsed.error.issues[0]?.message || "Datos no válidos." },
      400,
    );
  }

  try {
    const updated = await updateOwnProfile(user.id, parsed.data);
    if (!updated) return json({ message: "Usuario no encontrado." }, 404);
    return json({
      message: "Perfil actualizado.",
      user: { name: updated.name, image: updated.image },
    });
  } catch (err) {
    console.error("[Perfil] Error actualizando:", err);
    return json({ message: "No se pudo actualizar el perfil." }, 500);
  }
};
