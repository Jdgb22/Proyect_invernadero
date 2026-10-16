import type { APIRoute } from "astro";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { pool } from "../../../db/client";
import { createFinca } from "../../../backend/services/fincas";

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
      .min(8, "La contraseña debe tener al menos 8 caracteres."),
    accountType: z.enum(["Campesino", "Agropecuario"]).default("Campesino"),
    fincaNombre: z.string().trim().max(255).optional().or(z.literal("")),
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

    // El rol lo elige el usuario al registrarse: Campesino (trabaja en una finca)
    // o Agropecuario (administra la suya). El enum Zod impide pedir staff.
    const assignedRole = parsed.data.accountType;
    const fincaNombre =
      typeof parsed.data.fincaNombre === "string"
        ? parsed.data.fincaNombre.trim()
        : "";

    // Un Agropecuario debe registrar su propia finca al crear la cuenta.
    if (assignedRole === "Agropecuario" && !fincaNombre) {
      return new Response(
        JSON.stringify({ message: "Ingresa el nombre de tu finca." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

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

    // Si es Agropecuario, crear su finca. Un fallo aquí NO bloquea la cuenta: solo se informa.
    let fincaCreada: { id: number; nombre: string } | null = null;
    let avisoCreacion: string | null = null;
    if (newUser.role === "Agropecuario" && fincaNombre) {
      try {
        const finca = await createFinca(newUser.id, { nombre: fincaNombre });
        fincaCreada = { id: finca.id, nombre: finca.nombre };
      } catch (createErr: any) {
        console.warn("[Register] Finca no creada:", createErr?.message);
        avisoCreacion = `No se pudo crear la finca (${createErr?.message || "error"}). Podrás crearla desde Mis Fincas.`;
      }
    }

    return new Response(
      JSON.stringify({
        message: fincaCreada
          ? `Cuenta creada y finca "${fincaCreada.nombre}" lista.`
          : "Cuenta creada exitosamente.",
        user: newUser,
        fincaCreada,
        avisoCreacion,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: any) {
    console.error("[Register] Error en registro de usuario:", error);
    return new Response(
      JSON.stringify({
        message: "Error al registrar la cuenta. Intenta de nuevo más tarde.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
