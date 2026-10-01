import nodemailer from 'nodemailer';
import 'dotenv/config';

interface EmailParams {
  to: string;
  userName?: string;
  code: string;
  minutesValid?: number;
}

interface SmsParams {
  to: string;
  userName?: string;
  code: string;
  minutesValid?: number;
}

/**
 * Servicio para enviar correos electrónicos de recuperación vía Gmail / SMTP.
 */
export async function sendRecoveryEmail({ to, userName = 'Usuario', code, minutesValid = 15 }: EmailParams) {
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const fromAddress = process.env.SMTP_FROM || `"Macollo Invernadero" <${smtpUser || 'no-reply@macollo.com'}>`;

  if (!smtpUser || !smtpPass) {
    console.warn(`\n[Notificaciones - Correo] ⚠️ SMTP_USER o SMTP_PASS no están configurados en el archivo .env.`);
    console.warn(`[Notificaciones - Correo] Código para ${to}: ${code} (Válido por ${minutesValid} minutos)`);
    console.warn(`Para enviar correos reales por Gmail, añade SMTP_USER y SMTP_PASS (Contraseña de aplicación) a tu .env.\n`);
    return {
      sent: false,
      reason: 'MISSING_SMTP_CONFIG',
      message: 'Servicio SMTP no configurado en el servidor (.env).',
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true para 465, false para otros puertos
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
        .card { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .header { text-align: center; margin-bottom: 24px; }
        .logo-title { font-size: 22px; font-weight: 800; color: #d97706; margin: 0; letter-spacing: -0.5px; }
        .title { font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 12px; margin-bottom: 8px; }
        .text { font-size: 14px; line-height: 1.6; color: #475569; margin: 8px 0; }
        .code-box { background: #fffbeb; border: 2px dashed #f59e0b; border-radius: 12px; padding: 18px; text-align: center; margin: 24px 0; }
        .code-val { font-size: 34px; font-family: 'Courier New', Courier, monospace; font-weight: 800; color: #b45309; letter-spacing: 8px; margin: 0; }
        .expiry-badge { display: inline-block; background: #fef3c7; color: #92400e; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; margin-top: 8px; }
        .footer { font-size: 12px; color: #94a3b8; text-align: center; margin-top: 28px; border-top: 1px solid #f1f5f9; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 class="logo-title">🌿 MACOLLO</h1>
          <div class="title">Código para Recuperar tu Contraseña</div>
        </div>
        <p class="text">Hola <strong>${userName}</strong>,</p>
        <p class="text">Recibimos una solicitud para restablecer la contraseña de tu cuenta en la plataforma de monitoreo <strong>Macollo Invernadero</strong>.</p>
        <p class="text">Ingresa el siguiente código de seguridad en la aplicación para crear tu nueva contraseña:</p>
        
        <div class="code-box">
          <div class="code-val">${code}</div>
          <div class="expiry-badge">⏱️ Válido por ${minutesValid} minutos</div>
        </div>

        <p class="text" style="font-size: 13px; color: #64748b;">
          Si tú no realizaste esta solicitud, puedes ignorar este mensaje de manera segura; tu contraseña actual no será modificada.
        </p>
        
        <div class="footer">
          Proyecto Invernadero &copy; ${new Date().getFullYear()} — Sistema de Monitoreo Inteligente
        </div>
      </div>
    </body>
    </html>
    `;

    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      subject: `🌿 Tu código de seguridad: ${code} - Macollo Invernadero`,
      text: `Hola ${userName},\n\nTu código de seguridad para restablecer tu contraseña en Macollo Invernadero es: ${code}\n\nEste código es válido durante ${minutesValid} minutos.\n\nSi no realizaste esta solicitud, puedes ignorar este mensaje.`,
      html: htmlContent,
    });

    console.log(`[Notificaciones - Correo] Correo enviado exitosamente a ${to}. ID: ${info.messageId}`);
    return { sent: true, messageId: info.messageId };

  } catch (error: any) {
    console.error(`[Notificaciones - Correo] Error enviando correo a ${to}:`, error);
    return { sent: false, error: error.message };
  }
}

/**
 * Servicio para enviar mensajes SMS vía Twilio u otro proveedor REST.
 */
export async function sendRecoverySms({ to, userName = 'Usuario', code, minutesValid = 15 }: SmsParams) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromPhone) {
    console.warn(`\n[Notificaciones - SMS] ⚠️ Credenciales de SMS (Twilio) no configuradas en el archivo .env.`);
    console.warn(`[Notificaciones - SMS] Código para celular ${to}: ${code} (Válido por ${minutesValid} minutos)`);
    console.warn(`Para enviar SMS reales, añade TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN y TWILIO_PHONE_NUMBER a tu .env.\n`);
    return {
      sent: false,
      reason: 'MISSING_SMS_CONFIG',
      message: 'Servicio SMS no configurado en el servidor (.env).',
    };
  }

  try {
    const messageBody = `[Macollo Invernadero] Hola ${userName}, tu código de seguridad es: ${code}. Válido por ${minutesValid} min. No lo compartas.`;

    // Normalizar número telefónico (agregar prefijo si falta)
    let formattedTo = to.replace(/[\s\-\(\)]/g, '');
    if (!formattedTo.startsWith('+')) {
      // Si es número de 10 dígitos (Colombia), agregar +57
      if (formattedTo.length === 10) {
        formattedTo = `+57${formattedTo}`;
      } else {
        formattedTo = `+${formattedTo}`;
      }
    }

    const authHeader = 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const bodyParams = new URLSearchParams({
      From: fromPhone,
      To: formattedTo,
      Body: messageBody,
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams.toString(),
    });

    const result = await response.json() as any;

    if (!response.ok) {
      console.error(`[Notificaciones - SMS] Error de Twilio:`, result);
      return { sent: false, error: result.message || 'Error al enviar SMS' };
    }

    console.log(`[Notificaciones - SMS] SMS enviado exitosamente a ${formattedTo}. SID: ${result.sid}`);
    return { sent: true, sid: result.sid };

  } catch (error: any) {
    console.error(`[Notificaciones - SMS] Error al enviar SMS a ${to}:`, error);
    return { sent: false, error: error.message };
  }
}
