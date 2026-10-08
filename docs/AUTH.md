# Autenticación y Autorización

> Implementación: `auth.config.ts` + `src/pages/api/auth/*` + páginas con `getSession` + `src/middleware.ts`.
> Proveedores: **Credentials** (email/nombre/teléfono + bcrypt en PG) y **Google OAuth**. Sesión **JWT**.
> Última revisión: octubre 2026.

---

## 1. Arquitectura

```
 Navegador ──/signin──▶ signIn('credentials' | 'google') ──▶ Auth.js ──▶ PostgreSQL
   │                                                                     users/accounts/
   │                                                                     verification_token
   └────────◀ JWT en cookie segura ───────────────────────────────────────┘
 Páginas (/ , /metrics, /historial, /settings) leen getSession(Astro.request)
```

- `auth.config.ts`: `defineConfig({ adapter: PostgresAdapter(pool), providers: [Google, Credentials], session: { strategy: 'jwt' }, pages: { signIn: '/' } })`.
- `trustHost: true` + fix de proxy en `middleware.ts` (`x-forwarded-proto/host` → `AUTH_URL`) para Cloudflare/Vercel.
- `AUTH_SECRET` obligatorio en producción (lanza error si falta); en dev usa clave temporal con warning.
- Google con `allowDangerousEmailAccountLinking: true` (vincula OAuth a cuenta existente por email).

---

## 2. Login con credenciales

`authorize()` en `auth.config.ts`:

1. Busca `SELECT * FROM users WHERE LOWER(email)=$1 OR LOWER(name)=$1 OR phone=$1`.
2. Compara con `bcrypt.compare(password, user.password)` (solo hashes `$2a$/$2b$`).
3. Éxito → `{ id, name, email (o phone@invernadero.local), image, role }`. Fallo → `null` → Auth.js responde `CredentialsSignin`.

En `/signin`, el cliente llama `signIn('credentials', { callbackUrl: '/' }, { email, password })` y luego fuerza `window.location.href = '/'`.

## 3. Login con Google

Botón `Continuar con Google` (`<SignIn provider="google">`). Requiere `GOOGLE_CLIENT_ID/SECRET` en `.env`. El callback crea/vincula `users` + `accounts` vía adaptador. Sin esas vars, el botón falla (ver [DEPLOYMENT](./DEPLOYMENT.md)).

## 4. Registro

`POST /api/auth/register` → valida (nombre, contacto, email/teléfono únicos, fecha real no futura, contraseña) → `bcrypt.genSalt(10)` + `hash` → `INSERT INTO users … role='Campesino'` → `201` con usuario (sin contraseña). **El rol del formulario se ignora**: toda cuenta nace `Campesino`. Detalle de campos y errores en [ENDPOINTS](./ENDPOINTS.md).

## 5. Recuperación de contraseña (código 6 dígitos, 15 min)

1. `POST /api/auth/forgot-password { identifier }` → busca usuario → genera código → `DELETE` previos + `INSERT INTO verification_token` → envía email (`sendRecoveryEmail`, Nodemailer SMTP/Gmail) o SMS (`sendRecoverySms`) → responde con `maskedTarget` (privacidad, ej. `ju***@correo.com`) y `sent`.
2. Usuario recibe el código (HTML con estilos Macollo, validez indicada).
3. `POST /api/auth/reset-password { identifier, code, newPassword }` → verifica `token + expires > NOW()` → bcrypt nueva clave → `UPDATE users SET password…, updated_at=NOW()` → borra token → `200` listo para login.

Sin SMTP configurado (`SMTP_USER/SMTP_PASS`), el endpoint responde `sent: false` y el código queda visible en logs del servidor (modo dev). SMS requiere proveedor configurado en `notifications.ts`.

## 6. Sesión y roles

Callbacks JWT:

```ts
jwt({ token, user })     // login: token.sub = user.id, token.role = user.role ?? 'Campesino'
session({ session, token }) // cada request: session.user.id = token.sub, session.user.role = token.role
```

Roles (`user_role_enum`): `Campesino` (defecto) · `Agronomo` · `Admin` · `Super admin`.
El JWT **no se refresca solo** ante un cambio de rol en BD: el usuario debe **cerrar y volver a iniciar sesión**. Cambio de rol: `UPDATE users SET role='Admin' WHERE email='…'`.

Las páginas muestran el rol (`/metrics`, `/historial`: `Administrador de Cultivo` si `role==='admin'`, si no `Operario de Campo` — ojo: compara minúscula `'admin'`, nunca coincide con el enum `'Admin'`; las páginas siempre muestran *Operario de Campo*. Bug cosmético conocido).

## 7. Protección de rutas ⚠️ (leer antes de tocar)

| Capa | Qué protege | Estado |
| :--- | :--- | :--- |
| `middleware.ts` | Solo `pathname.startsWith('/dashboard')` → redirect `/` | **Muerta**: no existe `/dashboard`. No protege nada real. |
| Páginas (`index/metrics/historial/settings`) | `getSession` → sin sesión renderizan `Welcome` | **Activa**, pero es render-condicional, no redirect 302. |
| Handlers API (`export-excel`, `sync-sheets`, `siata`, `register/forgot/reset`) | Nada interno | Dependen de llamarse desde páginas con sesión. |

**Endurecimiento recomendado** (pendiente): en `middleware.ts` proteger `/metrics`, `/historial`, `/settings` (+ `/api/export-excel`, `/api/sync-sheets` salvo auth públicos) con `getSession` + `redirect('/signin')`, o verificar sesión dentro de cada handler sensible.

## 8. Variables y archivos

| Var | Uso | Obligatoria |
| :--- | :--- | :--- |
| `AUTH_SECRET` | Firma JWT/cookies Auth.js | Sí en prod (error si falta) |
| `AUTH_TRUST_HOST` / `trustHost` | Confiar en host tras proxy | Sí tras proxy |
| `GOOGLE_CLIENT_ID/SECRET` | OAuth Google | Solo si se usa Google |
| `SMTP_USER/SMTP_PASS` (+`SMTP_HOST/PORT/FROM`) | Correos de recuperación | Solo recuperación por email |
| `DATABASE_URL` / `POSTGRES_*` | Pool `pg` + adaptador | Sí |

Archivos: `auth.config.ts` · `src/db/client.ts` · `src/db/auth-schema.sql` · `src/services/notifications.ts` · `src/pages/api/auth/*.ts` · `src/middleware.ts`.
