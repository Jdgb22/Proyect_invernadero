import "dotenv/config";
import { defineConfig } from "auth-astro";
import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import bcrypt from "bcryptjs";
import { pool } from "./src/db/client";

/**
 * Configuración de Auth.js para Macollo.
 *
 * Proveedores:
 *  - Credentials: login con email + contraseña hasheada (bcrypt) en PostgreSQL
 *  - Google: OAuth con Google (requiere GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET)
 *
 * Roles disponibles: 'Superadmin' | 'Admin' | 'Agropecuario' | 'Campesino'
 *  - Superadmin: control total del sistema (cuentas creadas manualmente).
 *  - Admin: asistente/operador; ve todas las fincas y archiva, no gestiona usuarios ni borra fincas.
 *  - Agropecuario: dueño de finca(s).
 *  - Campesino: trabaja en fincas a las que se une por invitación.
 * Los roles se almacenan en la tabla `users`; la autorización real se relee de la BD
 * en cada operación sensible (ver src/backend/services/authz.ts).
 *
 * Estrategia de sesión: JWT (no requiere tabla `sessions` activa)
 *
 * @see db/auth-schema.sql para el esquema de tablas requerido en pgAdmin
 */
const authSecret =
  process.env.AUTH_SECRET || (import.meta as any).env?.AUTH_SECRET;
if (!authSecret && process.env.NODE_ENV === "production") {
  throw new Error("[Auth] Falta AUTH_SECRET en variables de entorno (.env)");
}
if (!authSecret) {
  console.warn(
    "[Auth] AUTH_SECRET no definido. Usando clave temporal solo para desarrollo. Crea tu .env (ver .env.example).",
  );
}

// Duración de la sesión (por defecto 24 h). Se puede ajustar con
// SESSION_MAX_AGE_HOURS en .env. Al no refrescarse (updateAge === maxAge),
// la sesión expira de forma absoluta aunque el usuario siga activo.
const sessionMaxAgeHours = Number(process.env.SESSION_MAX_AGE_HOURS);
const sessionMaxAge = Math.max(
  1,
  Math.floor(
    (Number.isFinite(sessionMaxAgeHours) && sessionMaxAgeHours > 0
      ? sessionMaxAgeHours
      : 24) *
      60 *
      60,
  ),
);

export default defineConfig({
  trustHost: true,
  adapter: PostgresAdapter(pool),
  providers: [
    Google({
      clientId:
        process.env.GOOGLE_CLIENT_ID ||
        (import.meta as any).env?.GOOGLE_CLIENT_ID ||
        "",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        (import.meta as any).env?.GOOGLE_CLIENT_SECRET ||
        "",
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "Credenciales",
      credentials: {
        email: { label: "Correo Electrónico", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const identifier = (
          (credentials?.email || (credentials as any)?.username) as
            string | undefined
        )?.trim();
        const password = credentials?.password as string | undefined;

        if (!identifier || !password) {
          console.warn(
            "[Auth] Intento de login sin email/usuario o contraseña",
          );
          return null;
        }

        try {
          console.log(
            `[Auth] Consultando usuario en PostgreSQL: ${identifier}`,
          );
          const res = await pool.query(
            `SELECT * FROM users
             WHERE LOWER(COALESCE(email, '')) = LOWER($1)
                OR phone = $1
             ORDER BY CASE
               WHEN LOWER(COALESCE(email, '')) = LOWER($1) THEN 0
               ELSE 1
             END
             LIMIT 1`,
            [identifier],
          );
          const user = res.rows[0];

          if (!user) {
            console.warn(`[Auth] Usuario no encontrado: ${identifier}`);
            return null;
          }

          let isValidPassword = false;
          let needsRehash = false;

          try {
            if (user.password && /^\$2[aby]\$/.test(user.password)) {
              isValidPassword = await bcrypt.compare(password, user.password);
            } else if (user.password && user.password === password) {
              // Cuentas antiguas con contraseña en texto plano: se aceptan una
              // vez y se migran a bcrypt inmediatamente.
              isValidPassword = true;
              needsRehash = true;
            }
          } catch (bcryptErr) {
            console.warn("[Auth] Error comparando hash bcrypt:", bcryptErr);
          }

          if (isValidPassword) {
            if (needsRehash) {
              try {
                const hash = await bcrypt.hash(password, 10);
                await pool.query(
                  "UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2",
                  [hash, user.id],
                );
                console.log(
                  `[Auth] Contraseña migrada a bcrypt: ${user.email || user.phone || user.name}`,
                );
              } catch (rehashErr) {
                console.warn(
                  "[Auth] No se pudo migrar la contraseña:",
                  rehashErr,
                );
              }
            }
            console.log(
              `[Auth] Login exitoso: ${user.email || user.phone || user.name} (Rol: ${user.role || "Campesino"})`,
            );
            return {
              id: user.id.toString(),
              name:
                user.name ||
                (user.email
                  ? user.email.split("@")[0]
                  : user.phone || "Usuario"),
              email: user.email || `${user.phone || user.id}@invernadero.local`,
              image: user.image || null,
              role: user.role || "Campesino",
            };
          }

          console.warn(`[Auth] Contraseña incorrecta para: ${identifier}`);
          return null;
        } catch (error) {
          console.error("[Auth] Error al consultar PostgreSQL:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: sessionMaxAge,
    updateAge: sessionMaxAge,
  },
  secret: authSecret || "dev-only-insecure-key-do-not-use-in-production",
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        (session.user as any).role = (token.role as string) || "Campesino";
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.sub = user.id;
        token.role = (user as any).role || "Campesino";
        // Auth.js re-firma el JWT en cada lectura y renueva su `exp`, por lo que
        // sin este sello la sesión nunca caducaría. Guardamos el inicio de sesión
        // para aplicar una expiración absoluta.
        token.sessionStartedAt = Math.floor(Date.now() / 1000);
      }

      const nowSeconds = Math.floor(Date.now() / 1000);
      const startedAt = Number(token.sessionStartedAt);
      if (!Number.isFinite(startedAt) || startedAt <= 0) {
        // Sesiones emitidas antes de habilitar la expiración absoluta.
        token.sessionStartedAt = nowSeconds;
      } else if (nowSeconds - startedAt >= sessionMaxAge) {
        return null;
      }

      return token;
    },
  },
});
