import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import { pool } from '../../../db/client';

/**
 * POST /api/auth/reset-password
 *
 * Verifica el código de 6 dígitos y actualiza la contraseña del usuario en PostgreSQL.
 *
 * Body esperado (JSON):
 *  - identifier:  string (correo o teléfono)
 *  - code:        string (código de 6 dígitos)
 *  - newPassword: string (mínimo 6 caracteres)
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json() as Record<string, unknown>;
    const rawIdentifier = typeof data.identifier === 'string' ? data.identifier : '';
    const rawCode = typeof data.code === 'string' ? data.code : '';
    const rawNewPassword = typeof data.newPassword === 'string' ? data.newPassword : '';

    const cleanIdentifier = rawIdentifier.trim();
    const cleanCode = rawCode.trim();
    const newPassword = rawNewPassword;

    if (!cleanIdentifier || !cleanCode || !newPassword) {
      return new Response(
        JSON.stringify({ message: 'Todos los campos son obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (newPassword.length < 6) {
      return new Response(
        JSON.stringify({ message: 'La nueva contraseña debe tener al menos 6 caracteres.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1. Verificar el código en la tabla verification_token
    const tokenResult = await pool.query(
      `SELECT * FROM verification_token 
       WHERE identifier = $1 AND token = $2 AND expires > NOW()`,
      [cleanIdentifier, cleanCode]
    );

    if (tokenResult.rows.length === 0) {
      return new Response(
        JSON.stringify({ message: 'El código de verificación es incorrecto o ya ha expirado.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Hashear la nueva contraseña con bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 3. Actualizar la contraseña en la tabla users
    const updateResult = await pool.query(
      `UPDATE users 
       SET password = $1, updated_at = NOW() 
       WHERE LOWER(COALESCE(email, '')) = LOWER($2) OR phone = $2
       RETURNING id, name, email, phone, role`,
      [hashedPassword, cleanIdentifier]
    );

    if (updateResult.rows.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No se encontró el usuario para actualizar la contraseña.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. Eliminar el token de verificación utilizado
    await pool.query('DELETE FROM verification_token WHERE identifier = $1', [cleanIdentifier]);

    const updatedUser = updateResult.rows[0];
    console.log(`[ResetPassword] Contraseña actualizada exitosamente para el usuario: ${updatedUser.name} (${updatedUser.email || updatedUser.phone})`);

    return new Response(
      JSON.stringify({
        message: '¡Tu contraseña ha sido restablecida exitosamente! Ya puedes iniciar sesión con tu nueva contraseña.',
        user: { id: updatedUser.id, name: updatedUser.name, role: updatedUser.role }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('[ResetPassword] Error:', error);
    return new Response(
      JSON.stringify({ message: 'Error al restablecer la contraseña.', error: errMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
