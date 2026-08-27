import Credentials from '@auth/core/providers/credentials';
import { defineConfig } from 'auth-astro';

export default defineConfig({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin / user" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (credentials?.username === 'admin' && credentials?.password === 'admin') {
          return { id: '1', name: 'Administrador', email: 'admin@example.com', role: 'admin' };
        } else if (credentials?.username === 'user' && credentials?.password === 'user') {
          return { id: '2', name: 'Usuario Normal', email: 'user@example.com', role: 'user' };
        }
        return null; // Return null if user data could not be retrieved
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  secret: import.meta.env.AUTH_SECRET || 'super-secret-key-for-development-only-1234567890',
});
