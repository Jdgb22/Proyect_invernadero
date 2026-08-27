/// <reference types="astro/client" />

declare module '@auth/core/types' {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    role?: string;
  }
}
