import type { APIRoute } from "astro";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { pool } from "../../../db/client";

// Schema Zero Trust para validar el registro
const RegisterSchema = z
  .object({
    name: z.string().min(2, "El nombre completo es obligatorio."),
    email: z
      .string()
      .email("El correo electrónico no es válido. Ejemplo: nombre@correo.com")
      .optional()
      .or(z.literal("")),
    phone: z.string().optional().or(z.literal("")),
    birthDate: z.string().optional().or(z.literal("")),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 8 caracteres."),
  })
  .refine((data) => data.email || data.phone, {
    message:
      "Debes ingresar al menos un correo electrónico o un número de celular.",
    path: ["email"],
  });

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawData = await request.json();

    const parsed = RegisterSchema.safeParse(rawData);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          message: parsed.error.issues[0]?.message || "Datos no válidos",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const { name, email, phone, birthDate, password } = parsed.data;

    const cleanName = name.trim();
    const cleanEmail = email ? email.trim().toLowerCase() : null;
    let cleanPhone = phone ? phone.trim() : null;
    const cleanBirthDate = birthDate ? birthDate.trim() : null;

    if (cleanPhone) {
      const phoneNormalized = cleanPhone.replace(/[\s\-().]/g, "");
      if (!/^\+?\d{7,15}$/.test(phoneNormalized)) {
        return new Response(
          JSON.stringify({
            message: "El número de celular no es válido. Ejemplo: 3001234567",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
      cleanPhone = phoneNormalized;
    }

    if (cleanBirthDate) {
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(cleanBirthDate);
      const year = match ? Number(match[1]) : 0;
      const month = match ? Number(match[2]) : 0;
      const day = match ? Number(match[3]) : 0;
      const birth = match ? new Date(year, month - 1, day) : null;
      const isRealDate =
        birth !== null &&
        birth.getFullYear() === year &&
        birth.getMonth() === month - 1 &&
        birth.getDate() === day;

      if (!birth || !isRealDate) {
        return new Response(
          JSON.stringify({ message: "La fecha de nacimiento no es válida." }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (birth > today) {
        return new Response(
          JSON.stringify({ message: "La fecha de nacimiento no es válida." }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
    }

    // Verificar si el email ya existe
    if (cleanEmail) {
      const existingEmail = await pool.query(
        "SELECT id FROM users WHERE LOWER(email) = $1",
        [cleanEmail],
      );
      if (existingEmail.rows.length > 0) {
        return new Response(
          JSON.stringify({
            message: "Este correo electrónico ya está registrado.",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
    }

    // Verificar si el celular ya existe
    if (cleanPhone) {
      const existingPhone = await pool.query(
        "SELECT id FROM users WHERE phone = $1",
        [cleanPhone],
      );
      if (existingPhone.rows.length > 0) {
        return new Response(
          JSON.stringify({
            message: "Este número de celular ya está registrado.",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
    }

    // Hash de contraseña con bcrypt (sal = 10 rondas)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password as string, salt);

    // Cada cuenta nueva creada se asigna con rol 'Campesino'
    const assignedRole = "Campesino";

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

    return new Response(
      JSON.stringify({ message: "Cuenta creada exitosamente.", user: newUser }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: any) {
    console.error("[Register] Error en registro de usuario:", error);
    return new Response(
      JSON.stringify({
        message: "Error al registrar la cuenta en la base de datos.",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
