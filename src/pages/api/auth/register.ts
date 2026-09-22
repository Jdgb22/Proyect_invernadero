import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import { pool } from '../../../db/client';

/**
 * POST /api/auth/register
 *
 * Registra un nuevo usuario en PostgreSQL con contraseña hasheada (bcrypt).
 *
 * Body esperado (JSON):
 *  - name:     string (opcional)
 *  - email:    string (requerido)
 *  - password: string (requerido)
 *  - role:     'Super admin' | 'Admin' | 'Profesor' | 'Estudiante' | 'Usuario X'
 *
 * Respuestas:
 *  - 201: Usuario registrado exitosamente
 *  - 400: Email/contraseña faltantes o email ya registrado
 *  - 500: Error interno de base de datos
 */

const VALID_ROLES = ['Super admin', 'Admin', 'Profesor', 'Estudiante', 'Usuario X'] as const;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, password, role } = data;

    // Validación básica
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'El correo y la contraseña son obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const assignedRole = VALID_ROLES.includes(role) ? role : 'Usuario X';
    const cleanEmail   = (email as string).trim().toLowerCase();
    const cleanName    = (name as string)?.trim() || cleanEmail.split('@')[0];

    // Verificar si el email ya existe en PostgreSQL
    const existing = await pool.query(
      'SELECT id FROM users WHERE LOWER(email) = $1',
      [cleanEmail]
    );
    if (existing.rows.length > 0) {
      return new Response(
        JSON.stringify({ message: 'Este correo electrónico ya está registrado.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hash de contraseña con bcrypt (sal = 10 rondas)
    const salt           = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password as string, salt);

    // Insertar usuario con rol en PostgreSQL
    try {
      const result = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
        [cleanName, cleanEmail, hashedPassword, assignedRole]
      );

      const newUser = result.rows[0];
      console.log(`[Register] Usuario registrado: ${newUser.email} (Rol: ${newUser.role})`);

      return new Response(
        JSON.stringify({ message: 'Usuario registrado exitosamente.', user: newUser }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );

    } catch (insertError: any) {
      // Fallback: si la columna 'role' no existe aún en la tabla
      console.warn('[Register] Fallback: insertando sin columna role:', insertError.message);

      const fallback = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [cleanName, cleanEmail, hashedPassword]
      );

      const newUser = { ...fallback.rows[0], role: 'Usuario X' };
      return new Response(
        JSON.stringify({ message: 'Usuario registrado (sin columna role).', user: newUser }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }

  } catch (error: any) {
    console.error('[Register] Error crítico en PostgreSQL:', error);
    return new Response(
      JSON.stringify({ message: 'Error interno en la base de datos.', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
