import type { APIRoute } from "astro";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { pool } from "../../../db/client";
import { json, parseJsonBody } from "../../../backend/services/authz";
import { createFinca } from "../../../backend/services/farms";

const RegisterSchema = z
  .object({
    name: z.string().min(2, "El nombre completo es obligatorio."),
    email: z
      .email("El correo electrónico no es válido. Ejemplo: nombre@correo.com")
      .optional()
      .or(z.literal("")),
    phone: z.string().optional().or(z.literal("")),
    birthDate: z.string().optional().or(z.literal("")),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres."),
    accountType: z.enum(["Campesino", "Agropecuario"]).default("Campesino"),
    fincaNombre: z.string().trim().max(255).optional().or(z.literal("")),
  })
  .refine((data) => data.email || data.phone, {
    message:
      "Debes ingresar al menos un correo electrónico o un número de celular.",
    path: ["email"],
  });

function normalizePhone(phone: string): string | null {
  const normalized = phone.trim().replace(/[\s\-().]/g, "");
  if (!normalized) return null;
  if (!/^\+?\d{7,15}$/.test(normalized)) return null;
  return normalized;
}

function isValidBirthDate(raw: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const birth = new Date(year, month - 1, day);

  const isRealDate =
    birth.getFullYear() === year &&
    birth.getMonth() === month - 1 &&
    birth.getDate() === day;
  if (!isRealDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return birth <= today;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await parseJsonBody(request);
    if (body === null) {
      return json({ message: "Cuerpo JSON inválido." }, 400);
    }

    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return json(
        { message: parsed.error.issues[0]?.message || "Datos no válidos" },
        400,
      );
    }

    const { name, email, phone, birthDate, password, accountType } =
      parsed.data;

    const cleanName = name.trim();
    const cleanEmail = email ? email.trim().toLowerCase() : null;
    const cleanBirthDate = birthDate ? birthDate.trim() : null;
    const fincaNombre = parsed.data.fincaNombre?.trim() ?? "";

    let cleanPhone: string | null = null;
    if (phone) {
      cleanPhone = normalizePhone(phone);
      if (!cleanPhone) {
        return json(
          {
            message: "El número de celular no es válido. Ejemplo: 3001234567",
          },
          400,
        );
      }
    }

    if (cleanBirthDate && !isValidBirthDate(cleanBirthDate)) {
      return json({ message: "La fecha de nacimiento no es válida." }, 400);
    }

    if (cleanEmail) {
      const existingEmail = await pool.query(
        "SELECT id FROM users WHERE LOWER(email) = $1",
        [cleanEmail],
      );
      if (existingEmail.rows.length > 0) {
        return json(
          { message: "Este correo electrónico ya está registrado." },
          400,
        );
      }
    }

    if (cleanPhone) {
      const existingPhone = await pool.query(
        "SELECT id FROM users WHERE phone = $1",
        [cleanPhone],
      );
      if (existingPhone.rows.length > 0) {
        return json(
          { message: "Este número de celular ya está registrado." },
          400,
        );
      }
    }

    const assignedRole = accountType;
    if (assignedRole === "Agropecuario" && !fincaNombre) {
      return json({ message: "Ingresa el nombre de tu finca." }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, phone, birth_date, password, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, phone, birth_date, role`,
      [
        cleanName,
        cleanEmail || null,
        cleanPhone || null,
        cleanBirthDate || null,
        hashedPassword,
        assignedRole,
      ],
    );

    const newUser = result.rows[0];
    console.log(
      `[Register] Nuevo usuario creado: ${newUser.name} (${newUser.email || newUser.phone}) [Rol: ${newUser.role}]`,
    );

    let fincaCreada: { id: number; nombre: string } | null = null;
    let avisoCreacion: string | null = null;
    if (newUser.role === "Agropecuario" && fincaNombre) {
      try {
        const finca = await createFinca(newUser.id, { nombre: fincaNombre });
        fincaCreada = { id: finca.id, nombre: finca.nombre };
      } catch (createErr) {
        const motivo = createErr instanceof Error ? createErr.message : "error";
        console.warn("[Register] Finca no creada:", motivo);
        avisoCreacion = `No se pudo crear la finca (${motivo}). Podrás crearla desde Mis Fincas.`;
      }
    }

    return json(
      {
        message: fincaCreada
          ? `Cuenta creada y finca "${fincaCreada.nombre}" lista.`
          : "Cuenta creada exitosamente.",
        user: newUser,
        fincaCreada,
        avisoCreacion,
      },
      201,
    );
  } catch (error) {
    console.error("[Register] Error en registro de usuario:", error);
    return json(
      { message: "Error al registrar la cuenta. Intenta de nuevo más tarde." },
      500,
    );
  }
};
