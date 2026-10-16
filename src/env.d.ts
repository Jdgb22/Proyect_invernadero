/// <reference types="astro/client" />

type SystemRole = "Superadmin" | "Admin" | "Agropecuario" | "Campesino";

declare module "@auth/core/types" {
  interface Session {
    user: {
      role?: SystemRole;
    } & DefaultSession["user"];
  }

  interface User {
    role?: SystemRole;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: SystemRole;
  }
}
