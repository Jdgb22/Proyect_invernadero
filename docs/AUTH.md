# Autenticación y Autorización

> Implementación: `auth.config.ts` + `src/pages/api/auth/*` + páginas con `getSession` + `src/middleware.ts`.
> Proveedores: **Credentials** (email/celular + bcrypt en PG) y **Google OAuth**. Sesión **JWT**.
> Última revisión: octubre 2026.

---

## 1. Arquitectura

```
 Navegador ──/ (login)──▶ signIn('credentials' | 'google') ──▶ Auth.js ──▶ PostgreSQL
   │                                                                       users/accounts/
   │                                                                       verification_token
   └────────◀ JWT en cookie segura ────────────────────────────────────────┘
 Páginas (/ , /metrics, /history, /settings) leen getSession(Astro.request)
```

- `auth.config.ts`: `defineConfig({ adapter: PostgresAdapter(pool), providers: [Google, Credentials], session: { strategy: 'jwt' }, pages: { signIn: '/' } })`.
- `trustHost: true` + fix de proxy en `middleware.ts` (`x-forwarded-proto/host` → `AUTH_URL`) para Cloudflare/Vercel.
- `AUTH_SECRET` obligatorio en producción (lanza error si falta); en dev usa clave temporal con warning.
- Google con `allowDangerousEmailAccountLinking: true` (vincula OAuth a cuenta existente por email).
- **`accounts`/`sessions` nacen vacías**: con credenciales + estrategia JWT no se escribe en ellas (`accounts` solo se llena al usar Google OAuth; `sessions` queda sin uso). Es lo esperado, no un fallo (ver [DATABASE §2](./DATABASE.md)).

---

## 2. Login con credenciales

`authorize()` en `auth.config.ts`:

1. Busca `SELECT * FROM users WHERE LOWER(email)=$1 OR phone=$1`.
2. Compara con `bcrypt.compare(password, user.password)` (solo hashes `$2a$/$2b$`).
3. Éxito → `{ id, name, email (o phone@invernadero.local), image, role }`. Fallo → `null` → Auth.js responde `CredentialsSignin`.

En `/` (login/registro, antes `/signin`), el cliente llama `signIn('credentials', { callbackUrl: '/' }, { email, password })` y luego fuerza `window.location.href = '/'`. La ruta `/signin` se conserva solo como alias que redirige a `/` (conservando `?desde=` y `?code=`).

## 3. Login con Google

Botón `Continuar con Google` (`<SignIn provider="google">`). Requiere `GOOGLE_CLIENT_ID/SECRET` en `.env`. El callback crea/vincula `users` + `accounts` vía adaptador. Sin esas vars, el botón falla (ver [DEPLOYMENT](./DEPLOYMENT.md)).

## 4. Registro

`POST /api/auth/register` → valida (nombre, contacto, email/teléfono únicos, fecha real no futura, contraseña) → `bcrypt.genSalt(10)` + `hash` → `INSERT INTO users …` → `201` con usuario (sin contraseña). **El usuario elige el rol al registrarse** (`accountType` ∈ {`Campesino` def., `Agropecuario`}; el enum Zod impide pedir roles staff). Si es `Agropecuario` y envía `fincaNombre` (opcional), se crea su primera finca. Detalle de campos y errores en [ENDPOINTS](./ENDPOINTS.md).

## 5. Recuperación de contraseña (código 6 dígitos, 15 min)

1. `POST /api/auth/forgot-password { identifier }` → busca usuario → genera código → `DELETE` previos + `INSERT INTO verification_token` → envía email (`sendRecoveryEmail`, Nodemailer SMTP/Gmail) o SMS (`sendRecoverySms`) → responde con `maskedTarget` (privacidad, ej. `ju***@correo.com`) y `sent`.
2. Usuario recibe el código (HTML con estilos Macollo, validez indicada).
3. `POST /api/auth/reset-password { identifier, code, newPassword }` → verifica `token + expires > NOW()` → bcrypt nueva clave → `UPDATE users SET password…, updated_at=NOW()` → borra token → `200` listo para login.

Sin SMTP configurado (`SMTP_USER/SMTP_PASS`), el endpoint responde `sent: false` y el código queda visible en logs del servidor (modo dev). SMS requiere proveedor configurado en `notifications.ts`.

## 6. Sesión y roles

La sesión JWT caduca de forma **absoluta** a las `SESSION_MAX_AGE_HOURS` horas (por defecto **24 h**). Auth.js re-firma el token en cada lectura, así que además del `exp` se guarda `sessionStartedAt` en el JWT y `callbacks.jwt` devuelve `null` al superar ese límite, forzando el cierre de sesión.

Callbacks JWT:

```ts
jwt({ token, user }); // login: token.sub = user.id, token.role = user.role ?? 'Campesino'
session({ session, token }); // cada request: session.user.id = token.sub, session.user.role = token.role
```

Roles (`user_role_enum`): `Superadmin` · `Admin` · `Agropecuario` · `Campesino` (defecto).

| Rol              | Alcance                                                                                                           |
| :--------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Superadmin**   | Control total: gestiona usuarios/roles, borra fincas (hard delete). Cuentas creadas con `scripts/seed-admin.mjs`. |
| **Admin**        | Ve todas las fincas, archiva/restaura y asiste en operación. **No** gestiona usuarios/roles ni borra fincas.      |
| **Agropecuario** | Dueño de finca(s): = Campesino + gestión (editar, invitar, expulsar) en SUS fincas.                               |
| **Campesino**    | Trabaja en las fincas a las que se une por invitación. Puede pertenecer a varias (N:N). No configura la finca.    |

> **El JWT no es fuente de verdad para el rol.** La autorización se relee de la BD en cada operación sensible vía `getAuthUser()` (`src/backend/services/authz.ts`). Así, un cambio de rol o la pérdida de membresía surte efecto aunque el token siga vigente. Las etiquetas visibles en `/metrics` y `/history` se generan desde el rol real.

### Fincas y membresías

- `fincas` (multi-tenant) con `dueno_id`; `finca_miembros` es la relación N:N usuario↔finca con `rol_finca ∈ {dueno, miembro}`.
- `plantas` y `lecturas` llevan `finca_id`: **los datos agronómicos están separados por finca**.
- La finca activa se guarda en la cookie httpOnly `finca_activa`; en cada API se valida contra la BD (membresía o staff). Ver `getFincaAccess`, `canManageFinca`, `canArchiveFinca`, `canViewFincaData`, `canWriteFincaData`.
- **Invitaciones** (`finca_invitaciones`): código de 8 caracteres (nanoid + `nanoid-dictionary`, sin prefijo; p.ej. `K7M4XP9Q`) + link `/invite/<code>`, con expiración, usos máximos y revocación. El canje (`redeemInvitacion`) es atómico (`FOR UPDATE`). Tope de **5 fincas creadas por usuario**.
- **Archivar**: el dueño o un Admin oculta la finca (restaurable). **Hard delete**: solo Superadmin.
- **Conectar/sincronizar Google Sheets**: exclusivo del **dueño** de la finca (`rol_finca = 'dueno'`). Los miembros (p. ej. un agronomo invitado) y el staff reciben `403` (`canConnectSheets`, `POST /api/sync-sheets`). La UI oculta el botón "Conectar Google Sheets" a quien no sea dueño; registrar mediciones manualmente (`.csv/.xlsx`) sigue permitido a cualquier miembro.

### Página de inicio (`/`) según rol

- **Staff (Superadmin/Admin) sin finca activa** → el "Inicio" los lleva al panel **`/admin`** (lista de fincas); desde ahí, la acción **Entrar** fija la finca activa (cookie `finca_activa`) y abre su tablero.
- **Agropecuario/Campesino** → `/` muestra el tablero (`Dashboard`) si tienen finca activa, o `NoFarm` (crear/unirse) si no.
- En el Navbar, el staff ve `Panel` + (`Tablero`/`Métricas`/`Historial` solo con finca activa) + `Fincas` + `Configuración`; el resto ve `Inicio`/`Métricas`/`Historial`/`Fincas`/`Configuración`.

## 7. Protección de rutas

| Capa                         | Qué protege                                                                                                                                                                                 | Estado                                               |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------- |
| `middleware.ts` (headers)    | **Toda respuesta**: `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, `HSTS`, `CSP`                                                                      | **Activa**.                                          |
| `middleware.ts` (rutas)      | Páginas `/metrics /history /settings /farms /admin` → redirect a `/` con `?desde=`; APIs `/api/farms /api/invitations /api/admin /api/farm /api/sync-sheets /api/export-excel` → `401` JSON | **Activa**.                                          |
| `middleware.ts` (rate-limit) | `register`, `forgot-password`, `reset-password`, `callback/credentials`, `invitations/use` (por IP)                                                                                         | **Activa** (`src/backend/services/rateLimit.ts`).    |
| Handlers API                 | Verificación de sesión + autorización de finca dentro de cada handler (`getAuthUser`, `getFincaAccess`)                                                                                     | **Activa**. Los endpoints de datos exigen membresía. |

> Defensa en profundidad: el middleware filtra el acceso grueso, pero cada handler de datos vuelve a validar sesión y permisos (Zero Trust).

## 8. Variables y archivos

| Var                                            | Uso                        | Obligatoria                 |
| :--------------------------------------------- | :------------------------- | :-------------------------- |
| `AUTH_SECRET`                                  | Firma JWT/cookies Auth.js  | Sí en prod (error si falta) |
| `AUTH_TRUST_HOST` / `trustHost`                | Confiar en host tras proxy | Sí tras proxy               |
| `GOOGLE_CLIENT_ID/SECRET`                      | OAuth Google               | Solo si se usa Google       |
| `SMTP_USER/SMTP_PASS` (+`SMTP_HOST/PORT/FROM`) | Correos de recuperación    | Solo recuperación por email |
| `DATABASE_URL` / `POSTGRES_*`                  | Pool `pg` + adaptador      | Sí                          |

Archivos: `auth.config.ts` · `src/db/client.ts` · `src/db/auth-schema.sql` · `src/backend/services/notifications.ts` · `src/pages/api/auth/*.ts` · `src/middleware.ts`.
