import type { APIRoute } from 'astro';
import { pool } from '../../../db/client';
import { sendRecoveryEmail, sendRecoverySms } from '../../../services/notifications';

/**
 * Función auxiliar para enmascarar correos o teléfonos por privacidad
 */
function maskIdentifier(id: string, isEmail: boolean): string {
  if (isEmail) {
    const parts = id.split('@');
    const user = parts[0] || '';
    const domain = parts[1] || '';
    const maskedUser = user.length <= 2
      ? `${user}***`
      : `${user.slice(0, 2)}${'*'.repeat(Math.min(user.length - 2, 5))}`;
    return `${maskedUser}@${domain}`;
  } else {
    if (id.length <= 5) return `${id.slice(0, 2)}***`;
    const start = id.slice(0, 3);
    const end = id.slice(-2);
    const middleLength = Math.max(id.length - 5, 3);
    return `${start}${'*'.repeat(middleLength)}${end}`;
  }
}

/**
 * POST /api/auth/forgot-password
 *
 * Genera un código de 6 dígitos para recuperación de contraseña por correo o SMS (celular).
 *
 * Body esperado (JSON):
 *  - identifier: string (correo electrónico o número celular)
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json() as Record<string, unknown>;
    const rawIdentifier = typeof data.identifier === 'string' ? data.identifier : '';
    const identifier = rawIdentifier.trim();

    if (!identifier) {
      return new Response(
        JSON.stringify({ message: 'Por favor ingresa tu correo electrónico o número de celular.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cleanIdentifier = identifier.toLowerCase();

    // 1. Buscar si el usuario existe por email o teléfono
    const userResult = await pool.query(
      `SELECT id, name, email, phone FROM users 
       WHERE LOWER(COALESCE(email, '')) = $1 OR phone = $2`,
      [cleanIdentifier, identifier]
    );

    if (userResult.rows.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No encontramos ninguna cuenta asociada a este correo o celular.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = userResult.rows[0];

    // 2. Generar código de 6 dígitos numéricos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos de validez

    // Usar identificador canónico (email si existe, sino phone)
    const canonicalId: string = identifier.includes('@')
      ? (user.email || identifier)
      : (user.phone || identifier);

    // 3. Guardar código en la tabla verification_token
    await pool.query('DELETE FROM verification_token WHERE identifier = $1', [canonicalId]);
    await pool.query(
      'INSERT INTO verification_token (identifier, token, expires) VALUES ($1, $2, $3)',
      [canonicalId, code, expires]
    );

    const isEmail = canonicalId.includes('@');
    const destinationType = isEmail ? 'correo electrónico' : 'número celular';
    const maskedTarget = maskIdentifier(canonicalId, isEmail);

    // 4. Enviar notificación real por Correo (Gmail) o SMS (Twilio)
    let sendResult: { sent: boolean; reason?: string; messageId?: string; sid?: string; error?: string };
    if (isEmail) {
      sendResult = await sendRecoveryEmail({
        to: canonicalId,
        userName: user.name || 'Usuario',
        code,
        minutesValid: 15,
      });
    } else {
      sendResult = await sendRecoverySms({
        to: canonicalId,
        userName: user.name || 'Usuario',
        code,
        minutesValid: 15,
      });
    }

    return new Response(
      JSON.stringify({
        message: sendResult.sent
          ? `Se ha enviado un código de 6 dígitos a tu ${destinationType} (${maskedTarget}). Válido por 15 minutos.`
          : `No se pudo enviar el código a tu ${destinationType} (${maskedTarget}). Intenta nuevamente.`,
        destinationType,
        maskedTarget,
        identifier: canonicalId,
        sent: sendResult.sent,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('[ForgotPassword] Error:', error);
    return new Response(
      JSON.stringify({ message: 'Error interno al procesar la solicitud.', error: errMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
