import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import { pool } from "../../../db/client";
import { json, parseJsonBody } from "../../../backend/services/authz";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await parseJsonBody(request);
    if (body === null) {
      return json({ message: "Cuerpo JSON inválido." }, 400);
    }
    const data = body as Record<string, unknown>;

    const identifier =
      typeof data.identifier === "string" ? data.identifier : "";
    const code = typeof data.code === "string" ? data.code : "";
    const newPassword =
      typeof data.newPassword === "string" ? data.newPassword : "";

    const cleanIdentifier = identifier.trim();
    const cleanCode = code.trim();

    if (!cleanIdentifier || !cleanCode || !newPassword) {
      return json({ message: "Todos los campos son obligatorios." }, 400);
    }

    if (newPassword.length < 8) {
      return json(
        { message: "La nueva contraseña debe tener al menos 8 caracteres." },
        400,
      );
    }

    const tokenResult = await pool.query(
      `SELECT * FROM verification_token
       WHERE identifier = $1 AND token = $2 AND expires > NOW()`,
      [cleanIdentifier, cleanCode],
    );

    if (tokenResult.rows.length === 0) {
      return json(
        {
          message: "El código de verificación es incorrecto o ya ha expirado.",
        },
        400,
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateResult = await pool.query(
      `UPDATE users
       SET password = $1, updated_at = NOW()
       WHERE LOWER(COALESCE(email, '')) = LOWER($2) OR phone = $2
       RETURNING id, name, email, phone, role`,
      [hashedPassword, cleanIdentifier],
    );

    if (updateResult.rows.length === 0) {
      return json(
        { message: "No se encontró el usuario para actualizar la contraseña." },
        404,
      );
    }

    await pool.query("DELETE FROM verification_token WHERE identifier = $1", [
      cleanIdentifier,
    ]);

    const updatedUser = updateResult.rows[0];
    console.log(
      `[ResetPassword] Contraseña actualizada para: ${updatedUser.name} (${updatedUser.email || updatedUser.phone})`,
    );

    return json({
      message:
        "¡Tu contraseña ha sido restablecida exitosamente! Ya puedes iniciar sesión con tu nueva contraseña.",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("[ResetPassword] Error:", error);
    return json(
      {
        message:
          "Error al restablecer la contraseña. Intenta de nuevo más tarde.",
      },
      500,
    );
  }
};
