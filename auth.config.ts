import 'dotenv/config';
import { defineConfig } from 'auth-astro';
import Credentials from '@auth/core/providers/credentials';
import Google from '@auth/core/providers/google';
import PostgresAdapter from '@auth/pg-adapter';
import bcrypt from 'bcryptjs';
import { pool } from './src/db/client';

/**
 * Configuración de Auth.js para el Proyecto Invernadero.
 *
 * Proveedores:
 *  - Credentials: login con email + contraseña hasheada (bcrypt) en PostgreSQL
 *  - Google: OAuth con Google (requiere GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET)
 *
 * Roles disponibles: 'Super admin' | 'Admin' | 'Profesor' | 'Estudiante' | 'Usuario X'
 * Los roles se almacenan en la tabla `users` de pgAdmin.
 *
 * Estrategia de sesión: JWT (no requiere tabla `sessions` activa)
 *
 * @see db/auth-schema.sql para el esquema de tablas requerido en pgAdmin
 */
export default defineConfig({
  trustHost: true,
  adapter: PostgresAdapter(pool),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || (import.meta as any).env?.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || (import.meta as any).env?.GOOGLE_CLIENT_SECRET || '',
    }),
    Credentials({
      name: 'Credenciales',
      credentials: {
        email:    { label: 'Correo Electrónico', type: 'email' },
        password: { label: 'Contraseña',         type: 'password' },
      },
      async authorize(credentials) {
        const identifier = ((credentials?.email || (credentials as any)?.username) as string | undefined)?.trim();
        const password = credentials?.password as string | undefined;

        if (!identifier || !password) {
          console.warn('[Auth] Intento de login sin email/usuario o contraseña');
          return null;
        }

        try {
          console.log(`[Auth] Consultando usuario en PostgreSQL: ${identifier}`);
          const res = await pool.query(
            'SELECT * FROM users WHERE LOWER(email) = LOWER($1) OR LOWER(name) = LOWER($1)',
            [identifier]
          );
          const user = res.rows[0];

          if (!user) {
            console.warn(`[Auth] Usuario no encontrado: ${identifier}`);
            return null;
          }

          let isValidPassword = false;

          // Verificar contraseña hasheada con bcrypt
          try {
            if (
              user.password &&
              (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'))
            ) {
              isValidPassword = await bcrypt.compare(password, user.password);
            }
          } catch (bcryptErr) {
            console.warn('[Auth] Error comparando hash bcrypt:', bcryptErr);
          }

          // Fallback: comparación directa (para usuarios legacy sin hash)
          if (!isValidPassword && user.password === password) {
            isValidPassword = true;
          }

          if (isValidPassword) {
            console.log(`[Auth] Login exitoso: ${user.email} (Rol: ${user.role || 'Usuario X'})`);
            return {
              id:    user.id.toString(),
              name:  user.name || user.email.split('@')[0],
              email: user.email,
              image: user.image || null,
              role:  user.role  || 'Usuario X',
            };
          }

          console.warn(`[Auth] Contraseña incorrecta para: ${identifier}`);
          return null;
        } catch (error) {
          console.error('[Auth] Error al consultar PostgreSQL:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET || 'super-secret-key-for-development-only-1234567890',
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        (session.user as any).role = (token.role as string) || 'Usuario X';
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.sub  = user.id;
        token.role = (user as any).role || 'Usuario X';
      }
      return token;
    },
  },
});
