// POST /api/auth/check-availability — indica si un correo/celular ya está registrado
import type { APIRoute } from "astro";
import { z } from "zod";
import { pool } from "../../../db/client";
import { json } from "../../../backend/services/authz";

const Schema = z.object({
  email: z.string().trim().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const parsed = Schema.safeParse(await request.json());
    if (!parsed.success) {
      return json({ message: "Datos no válidos." }, 400);
    }

    const email = parsed.data.email?.trim().toLowerCase() || "";
    const phone = parsed.data.phone?.replace(/[\s\-().]/g, "") || "";

    let emailTaken = false;
    let phoneTaken = false;

    if (email) {
      const res = await pool.query(
        "SELECT 1 FROM users WHERE LOWER(email) = $1 LIMIT 1",
        [email],
      );
      emailTaken = (res.rowCount ?? 0) > 0;
    }

    if (phone && /^\+?\d{7,15}$/.test(phone)) {
      const res = await pool.query(
        "SELECT 1 FROM users WHERE phone = $1 LIMIT 1",
        [phone],
      );
      phoneTaken = (res.rowCount ?? 0) > 0;
    }

    return json({ emailTaken, phoneTaken });
  } catch (error) {
    console.error(
      "[CheckAvailability] Error al verificar disponibilidad:",
      error,
    );
    return json({ message: "No se pudo verificar. Intenta de nuevo." }, 500);
  }
};
