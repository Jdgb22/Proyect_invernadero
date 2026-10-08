# ADR-003: Auth.js (Credentials + Google) con sesión JWT y rol

## Status
Accepted

## Date
2026-09-05

## Context
Se requiere login email/contraseña contra PG, registro con roles (Campesino/Agrónomo/Admin/Super admin), OAuth Google y recuperación de contraseña, funcionando tras proxy HTTPS (Vercel/Cloudflare) y en serverless sin sesiones pegajosas.

## Decision
Auth.js vía `auth-astro` (`auth.config.ts`): proveedores Credentials (bcrypt contra `users`, acepta email/nombre/teléfono) + Google (`allowDangerousEmailAccountLinking`), adaptador `PostgresAdapter`, `session.strategy: 'jwt'` con `role` en el token (`jwt`/`session` callbacks), `trustHost: true` + fix `x-forwarded-proto/host` en `middleware.ts`.

## Alternatives Considered

### Sesiones en BD (strategy database)
- Pros: revocación inmediata, inspección simple
- Cons: una lectura a `sessions` por request; en serverless suma latencia y el JWT ya cubre el caso
- Rejected: la tabla `sessions` queda creada pero con uso reducido; se acepta re-login tras cambio de rol

### Auth propia (cookies + JWT manual)
- Pros: control total, cero dependencias
- Cons: reimplementar OAuth, CSRF, expiración y rotación; alto riesgo de seguridad con equipo sin especialista
- Rejected: Auth.js ya resuelve OAuth/CSRF/cookies seguras

### Proveedor externo (Clerk/Auth0)
- Pros: UI y gestión listas
- Cons: costo, dependencia y datos de usuarios fuera de nuestra PG
- Rejected: el control de roles por enum propio y el costo no lo justifican

## Consequences
- Toda cuenta nace `Campesino` (el handler ignora el rol del formulario); promover con `UPDATE users`.
- Cambio de rol exige re-login (el JWT no se refresca solo).
- `AUTH_SECRET` obligatorio en prod; Google exige callback autorizado.
- Brecha: `middleware.ts` solo guarda `/dashboard` (inexistente); endurecer según AUTH.md §7.
