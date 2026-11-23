> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-12**.

# Endpoints de la API de Macollo

## 1. Convenios generales

- **Base URL local:** `http://localhost:4321`. En producción el `site` configurado en `astro.config.mjs` es `https://macollo.tech`.
- **Implementación:** todos los manejadores residen bajo `src/pages/api/`; las respuestas JSON se construyen con `json()` de `src/backend/services/authz.ts` (`Content-Type: application/json`) o con `Response` directa cuando se documenta lo contrario.
- **Formatos:** JSON salvo `/api/export-excel` (`.xlsx`), `/api/export-csv` (`.csv`), `/api/gallery/:id/file` (imagen) y las respuestas de error en texto plano de la galería.
- **Autenticación en dos capas:** `src/middleware.ts` protege los prefijos `/api/farms`, `/api/farm`, `/api/invitations`, `/api/admin`, `/api/gallery`, `/api/sync-sheets` y `/api/export-excel` (`401` antes de entrar al handler). Otros endpoints **no** están en esa lista y exigen sesión únicamente dentro del manejador (`getAuthUser` o `resolveActiveFinca`); `weather` y `aqi` invocan `getSession` pero **ignoran el resultado**, por lo que son efectivamente públicos.
- **Autorización a finca:** `getFincaAccess` (`src/backend/services/authz.ts`) devuelve `"none" | "miembro" | "dueno" | "staff"`. Los predicados son `canViewFincaData` y `canWriteFincaData` (cualquier acceso distinto de `none`), `canManageFinca` (`dueno` o `staff`), `canConnectSheets` (`dueno`, `staff` **o `miembro`**) y `canHardDeleteFinca`/`canManageSystem` (solo `Superadmin`).
- **Finca activa:** cookie HttpOnly `finca_activa` (`src/backend/services/authz.ts`). `resolveActiveFinca` (`src/backend/services/farms.ts`) además la infiere automáticamente cuando el usuario tiene una sola finca visible.
- **CSRF:** `security.checkOrigin: true` en `astro.config.mjs`; las peticiones `multipart/form-data` procedentes de navegador deben conservar el `Origin` del sitio.
- **Límite de tasa:** en memoria, por IP, aplicado en middleware (`src/backend/services/rateLimit.ts`). Los excesos devuelven `429 { "message": "Demasiados intentos. Intenta de nuevo en unos segundos." }` con cabecera `Retry-After`. No es un límite distribuido entre instancias serverless.
- **Cuerpos:** `parseJsonBody` devuelve `null` ante JSON inválido; cada handler decide el mensaje de error (`400`). Las validaciones Zod devuelven el primer `issue` en `message`.

Inventario verificado: **29 archivos manejadores**, **29 rutas de API propias** (una de ellas alias) y **42 operaciones HTTP explícitas**, más la familia `/api/auth/*` gestionada por Auth.js.

---

## 2. Tabla maestra de endpoints (agrupada por dominio)

### 2.1 Autenticación y cuenta

| Ruta                           | Método   | Entrada                                                                  | Respuesta principal              | Autorización              | Archivo de implementación                  |
| :----------------------------- | :------- | :----------------------------------------------------------------------- | :------------------------------- | :------------------------ | :----------------------------------------- |
| `/api/auth/register`           | POST     | JSON: `name`, `email`/`phone`, `password`, `accountType`, `fincaNombre`… | `201` usuario + finca opcional   | Público (límite 10/300 s) | `src/pages/api/auth/register.ts`           |
| `/api/auth/check-availability` | POST     | JSON: `{ email?, phone? }`                                               | `200 { emailTaken, phoneTaken }` | Público                   | `src/pages/api/auth/check-availability.ts` |
| `/api/auth/forgot-password`    | POST     | JSON: `{ identifier }`                                                   | `200` código enviado/informativo | Público (límite 8/300 s)  | `src/pages/api/auth/forgot-password.ts`    |
| `/api/auth/reset-password`     | POST     | JSON: `{ identifier, code, newPassword }`                                | `200` usuario actualizado        | Público (límite 8/300 s)  | `src/pages/api/auth/reset-password.ts`     |
| `/api/auth/*`                  | GET/POST | acciones estándar Auth.js                                                | JSON/redirección según acción    | Público (según acción)    | `astro.config.mjs` + `auth.config.ts`      |

### 2.2 Fincas, miembros, lecturas e invitaciones de finca

| Ruta                                | Método | Entrada                                       | Respuesta principal                     | Autorización                | Archivo de implementación                                      |
| :---------------------------------- | :----- | :-------------------------------------------- | :-------------------------------------- | :-------------------------- | :------------------------------------------------------------- |
| `/api/farms`                        | GET    | —                                             | `200 { fincas }`                        | Sesión                      | `src/pages/api/farms/index.ts`                                 |
| `/api/farms`                        | POST   | JSON: `{ nombre, descripcion?, ubicacion? }`  | `201 { message, finca }`                | Sesión; no `Campesino`      | `src/pages/api/farms/index.ts`                                 |
| `/api/farms/:id`                    | GET    | Parámetro `id`                                | `200 { finca, miembros, access }`       | Miembro / dueño / staff     | `src/pages/api/farms/[id].ts`                                  |
| `/api/farms/:id`                    | PATCH  | JSON: `{ nombre?, descripcion?, ubicacion? }` | `200 { message }`                       | Dueño / staff               | `src/pages/api/farms/[id].ts`                                  |
| `/api/farms/:id`                    | DELETE | Parámetro `id`                                | `200 { message }`                       | **Solo Superadmin**         | `src/pages/api/farms/[id].ts`                                  |
| `/api/farms/active`                 | GET    | Cookie `finca_activa`                         | `200 { finca, fincas? }` + `Set-Cookie` | Sesión                      | `src/pages/api/farms/active.ts`                                |
| `/api/farms/active`                 | POST   | JSON: `{ fincaId }`                           | `200 { message, finca }` + `Set-Cookie` | Sesión + acceso a la finca  | `src/pages/api/farms/active.ts`                                |
| `/api/farm/active`                  | GET    | Igual que el canonical                        | Igual que el canonical                  | Igual que el canonical      | `src/pages/api/farm/active.ts` (alias, reexporta `GET`/`POST`) |
| `/api/farm/active`                  | POST   | Igual que el canonical                        | Igual que el canonical                  | Igual que el canonical      | `src/pages/api/farm/active.ts` (alias)                         |
| `/api/farms/leave`                  | POST   | JSON: `{ fincaId }`                           | `200 { message }`                       | Sesión + miembro (no dueño) | `src/pages/api/farms/leave.ts`                                 |
| `/api/farms/:id/archive`            | POST   | JSON: `{ activa: boolean }`                   | `200 { message }`                       | Dueño / staff               | `src/pages/api/farms/[id]/archive.ts`                          |
| `/api/farms/:id/members`            | GET    | Parámetro `id`                                | `200 { miembros }`                      | Dueño / staff               | `src/pages/api/farms/[id]/members.ts`                          |
| `/api/farms/:id/members`            | DELETE | Query `?userId=N`                             | `200 { message }`                       | Dueño / staff               | `src/pages/api/farms/[id]/members.ts`                          |
| `/api/farms/:id/readings`           | GET    | Parámetro `id`                                | `200 { records }`                       | Miembro / dueño / staff     | `src/pages/api/farms/[id]/readings.ts`                         |
| `/api/farms/:id/readings`           | POST   | JSON: `{ records: MetricRecord[] }`           | `200 { message, count }`                | Miembro / dueño / staff     | `src/pages/api/farms/[id]/readings.ts`                         |
| `/api/farms/:id/readings`           | DELETE | Parámetro `id`                                | `200 { message, count }`                | Dueño / staff               | `src/pages/api/farms/[id]/readings.ts`                         |
| `/api/farms/:id/invitations`        | GET    | Parámetro `id`                                | `200 { invitaciones }`                  | Dueño / staff               | `src/pages/api/farms/[id]/invitations.ts`                      |
| `/api/farms/:id/invitations`        | POST   | JSON: `{ expiraDias?, usosMaximos? }`         | `201 { message, invitacion }`           | Dueño / staff               | `src/pages/api/farms/[id]/invitations.ts`                      |
| `/api/farms/:id/invitations/:invId` | DELETE | Parámetros `id`, `invId`                      | `200 { message }`                       | Dueño / staff               | `src/pages/api/farms/[id]/invitations/[invId].ts`              |

### 2.3 Invitaciones globales

| Ruta                    | Método | Entrada              | Respuesta principal                                    | Autorización             | Archivo de implementación           |
| :---------------------- | :----- | :------------------- | :----------------------------------------------------- | :----------------------- | :---------------------------------- |
| `/api/invitations/peek` | GET    | Query `?code=CODIGO` | `200 { invitacion }`                                   | Sesión                   | `src/pages/api/invitations/peek.ts` |
| `/api/invitations/use`  | POST   | JSON: `{ code }`     | `200 { message, fincaId, fincaNombre }` + `Set-Cookie` | Sesión (límite 15/300 s) | `src/pages/api/invitations/use.ts`  |

### 2.4 Administración, perfil y notificaciones

| Ruta                                | Método | Entrada                   | Respuesta principal        | Autorización                                     | Archivo de implementación                       |
| :---------------------------------- | :----- | :------------------------ | :------------------------- | :----------------------------------------------- | :---------------------------------------------- |
| `/api/admin/users`                  | GET    | Query `?q=` (búsqueda)    | `200 { users }` (máx. 200) | Solo Superadmin                                  | `src/pages/api/admin/users/index.ts`            |
| `/api/admin/users/:id`              | PATCH  | JSON: `{ role }`          | `200 { message }`          | Solo Superadmin                                  | `src/pages/api/admin/users/[id].ts`             |
| `/api/admin/users/:id`              | DELETE | Parámetro `id`            | `200 { message }`          | Solo Superadmin                                  | `src/pages/api/admin/users/[id].ts`             |
| `/api/users/me`                     | PATCH  | JSON: `{ name?, image? }` | `200 { message, user }`    | Sesión (solo handler)                            | `src/pages/api/users/me.ts`                     |
| `/api/notifications/weekly-summary` | POST   | Sin body                  | `200 { sent, message }`    | Sesión + acceso a la finca activa (solo handler) | `src/pages/api/notifications/weekly-summary.ts` |

### 2.5 Datos, hojas de cálculo y exportación

| Ruta                | Método | Entrada                                            | Respuesta principal                                              | Autorización                                     | Archivo de implementación       |
| :------------------ | :----- | :------------------------------------------------- | :--------------------------------------------------------------- | :----------------------------------------------- | :------------------------------ |
| `/api/sync-sheets`  | GET    | —                                                  | `200 { success, sheetsUrl }`                                     | Sesión + finca activa                            | `src/pages/api/sync-sheets.ts`  |
| `/api/sync-sheets`  | POST   | JSON: `{ url? }` (opcional si ya hay `sheets_url`) | `200 { success, count, guardadas, records, sheetsUrl, message }` | Sesión + miembro/dueño/staff                     | `src/pages/api/sync-sheets.ts`  |
| `/api/export-excel` | GET    | —                                                  | `200` binario `.xlsx`                                            | Sesión + acceso a la finca activa                | `src/pages/api/export-excel.ts` |
| `/api/export-excel` | POST   | Body ignorado                                      | `200` binario `.xlsx`                                            | Sesión + acceso a la finca activa                | `src/pages/api/export-excel.ts` |
| `/api/export-csv`   | GET    | —                                                  | `200` binario `.csv`                                             | Sesión + acceso a la finca activa (solo handler) | `src/pages/api/export-csv.ts`   |

### 2.6 Integraciones climáticas y ambientales

| Ruta           | Método | Entrada                                 | Respuesta principal | Autorización                       | Archivo de implementación  |
| :------------- | :----- | :-------------------------------------- | :------------------ | :--------------------------------- | :------------------------- |
| `/api/weather` | GET    | `lat`, `lon`, `name`, `fallback=1`, `q` | `200 WeatherData`   | **Pública (sin control efectivo)** | `src/pages/api/weather.ts` |
| `/api/aqi`     | GET    | `lat`, `lon`                            | `200` payload WAQI  | **Pública (sin control efectivo)** | `src/pages/api/aqi.ts`     |
| `/api/siata`   | GET    | —                                       | `200` JSON SIATA    | Sesión (solo handler)              | `src/pages/api/siata.ts`   |

### 2.7 Galería

| Ruta                    | Método | Entrada                                                | Respuesta principal                | Autorización                                   | Archivo de implementación            |
| :---------------------- | :----- | :----------------------------------------------------- | :--------------------------------- | :--------------------------------------------- | :----------------------------------- |
| `/api/gallery/upload`   | POST   | `multipart/form-data`: `file`, `caption?`, `taken_at?` | `200 { ok, photo }`                | Sesión                                         | `src/pages/api/gallery/upload.ts`    |
| `/api/gallery/:id/file` | GET    | Parámetro `id`                                         | `200` imagen / `302` a URL externa | Sesión (**sin filtro de finca en el handler**) | `src/pages/api/gallery/[id]/file.ts` |

### 2.8 Diagnóstico de trips (IA)

| Ruta                   | Método | Entrada                                                              | Respuesta principal                | Autorización | Archivo de implementación          |
| :--------------------- | :----- | :------------------------------------------------------------------- | :--------------------------------- | :----------- | :--------------------------------- |
| `/api/trips-diagnosis` | GET    | —                                                                    | `200` health check o `503` offline | Pública      | `src/pages/api/trips-diagnosis.ts` |
| `/api/trips-diagnosis` | POST   | `multipart/form-data`: `file`, `temperature_c?`, `crop?`, `profile?` | `200` predicción del servicio ML   | Pública      | `src/pages/api/trips-diagnosis.ts` |

---

## 3. Matriz de autenticación y autorización por endpoint

**Leyenda:** `Público` = sin sesión requerida en middleware ni handler; `Sesión` = sesión válida; `Miembro` = acceso a finca `miembro | dueno | staff`; `Dueño` = `dueno | staff`; `Staff` = `Superadmin | Admin`; `Superadmin` = solo ese rol. `MW` indica si `src/middleware.ts` aplica el filtro antes del manejador.

| Operación                                  | MW  | Comprobación real en handler/servicio                                  | Nivel efectivo              |
| :----------------------------------------- | :-- | :--------------------------------------------------------------------- | :-------------------------- |
| `POST /api/auth/register`                  | No  | Ninguna (rate limit por IP)                                            | Público                     |
| `POST /api/auth/check-availability`        | No  | Ninguna                                                                | Público                     |
| `POST /api/auth/forgot-password`           | No  | Ninguna (rate limit por IP)                                            | Público                     |
| `POST /api/auth/reset-password`            | No  | Token `verification_token` vigente (rate limit por IP)                 | Público                     |
| `GET/POST /api/auth/*` (Auth.js)           | No  | Según proveedor/acción; `callback/credentials` con rate limit          | Público                     |
| `GET /api/farms`                           | Sí  | `getAuthUser`                                                          | Sesión                      |
| `POST /api/farms`                          | Sí  | `getAuthUser` + `user.role !== "Campesino"`                            | Sesión (no Campesino)       |
| `GET /api/farms/:id`                       | Sí  | `getFincaAccess !== "none"`                                            | Miembro                     |
| `PATCH /api/farms/:id`                     | Sí  | `canManageFinca`                                                       | Dueño / Staff               |
| `DELETE /api/farms/:id`                    | Sí  | `canHardDeleteFinca`                                                   | Superadmin                  |
| `GET /api/farms/active`                    | Sí  | `getAuthUser` + `userCanUseFinca` sobre la cookie                      | Sesión                      |
| `POST /api/farms/active`                   | Sí  | `getAuthUser` + `userCanUseFinca`                                      | Sesión + acceso a finca     |
| `GET /api/farm/active` (alias)             | Sí  | Idéntico al canonical                                                  | Sesión                      |
| `POST /api/farm/active` (alias)            | Sí  | Idéntico al canonical                                                  | Sesión + acceso a finca     |
| `POST /api/farms/leave`                    | Sí  | `getAuthUser`; `leaveFinca` rechaza al dueño                           | Sesión + Miembro            |
| `POST /api/farms/:id/archive`              | Sí  | `canManageFinca`                                                       | Dueño / Staff               |
| `GET /api/farms/:id/members`               | Sí  | `canManageFinca`                                                       | Dueño / Staff               |
| `DELETE /api/farms/:id/members`            | Sí  | `canManageFinca` + no expulsar al dueño                                | Dueño / Staff               |
| `GET /api/farms/:id/readings`              | Sí  | `canViewFincaData`                                                     | Miembro                     |
| `POST /api/farms/:id/readings`             | Sí  | `canWriteFincaData`                                                    | Miembro                     |
| `DELETE /api/farms/:id/readings`           | Sí  | `canManageFinca`                                                       | Dueño / Staff               |
| `GET /api/farms/:id/invitations`           | Sí  | `canManageFinca`                                                       | Dueño / Staff               |
| `POST /api/farms/:id/invitations`          | Sí  | `canManageFinca`                                                       | Dueño / Staff               |
| `DELETE /api/farms/:id/invitations/:invId` | Sí  | `canManageFinca` + pertenencia de la invitación a la finca             | Dueño / Staff               |
| `GET /api/invitations/peek`                | Sí  | `getAuthUser` + código vigente                                         | Sesión                      |
| `POST /api/invitations/use`                | Sí  | `getAuthUser` + transacción atómica (rate limit por IP)                | Sesión                      |
| `GET /api/admin/users`                     | Sí  | `canManageSystem`                                                      | Superadmin                  |
| `PATCH /api/admin/users/:id`               | Sí  | `canManageSystem` + regla del último Superadmin                        | Superadmin                  |
| `DELETE /api/admin/users/:id`              | Sí  | `canManageSystem` + no propio + último Superadmin + sin fincas propias | Superadmin                  |
| `PATCH /api/users/me`                      | No  | `getAuthUser`                                                          | Sesión                      |
| `POST /api/notifications/weekly-summary`   | No  | `resolveActiveFinca` + `canViewFincaData` + correo propio              | Sesión + Miembro            |
| `GET /api/sync-sheets`                     | Sí  | `resolveActiveFinca` (sin comprobación de rol adicional)               | Sesión + finca activa       |
| `POST /api/sync-sheets`                    | Sí  | `resolveActiveFinca` + `canConnectSheets`                              | **Miembro / Dueño / Staff** |
| `GET /api/export-excel`                    | Sí  | `resolveActiveFinca` + `canViewFincaData`                              | Sesión + Miembro            |
| `POST /api/export-excel`                   | Sí  | Igual que `GET` (body ignorado)                                        | Sesión + Miembro            |
| `GET /api/export-csv`                      | No  | `resolveActiveFinca` + `canViewFincaData`                              | Sesión + Miembro            |
| `GET /api/weather`                         | No  | `getSession` ignorado                                                  | **Público**                 |
| `GET /api/aqi`                             | No  | `getSession` ignorado                                                  | **Público**                 |
| `GET /api/siata`                           | No  | `getSession` con comprobación explícita                                | Sesión                      |
| `POST /api/gallery/upload`                 | Sí  | `getSession` + `getAuthUser`                                           | Sesión                      |
| `GET /api/gallery/:id/file`                | Sí  | `getSession`; **no valida `finca_id` ni autoría**                      | Sesión                      |
| `GET /api/trips-diagnosis`                 | No  | Ninguna                                                                | Público                     |
| `POST /api/trips-diagnosis`                | No  | Ninguna                                                                | Público                     |

> Corrección relevante: la documentación anterior afirmaba que solo el **dueño** podía sincronizar Google Sheets. El predicado real `canConnectSheets` en `src/backend/services/authz.ts` incluye explícitamente a `miembro`, además de `dueno` y `staff`.

---

## 4. Fichas detalladas por endpoint

### 4.1 Autenticación y cuenta

#### `POST /api/auth/register`

**Archivo:** `src/pages/api/auth/register.ts` · **Autorización:** pública · **Rate limit:** 10 peticiones / 300 s por IP · **Body:** JSON.

Valida con `RegisterSchema` (Zod), hashea la contraseña con bcrypt (10 rondas), verifica unicidad de correo (case-insensitive) y teléfono normalizado, asigna el rol desde `accountType` y, si procede, crea la primera finca mediante `createFinca`.

| Campo         | Requerido         | Regla real                                                                  |
| :------------ | :---------------- | :-------------------------------------------------------------------------- |
| `name`        | Sí                | `min(2)`; se recorta.                                                       |
| `email`       | `email` o `phone` | Formato de correo o `""`; único en `LOWER(email)`.                          |
| `phone`       | `email` o `phone` | Dígitos `+?7–15` tras quitar espacios, guiones, paréntesis y puntos; único. |
| `birthDate`   | No                | `YYYY-MM-DD` real y no futura; `""` permitido.                              |
| `password`    | Sí                | `min(8)`.                                                                   |
| `accountType` | No                | `Campesino` (por defecto) o `Agropecuario`; **nunca** role staff.           |
| `fincaNombre` | Solo Agropecuario | Opcional en Zod, pero obligatorio en la lógica (`400` si falta).            |
| `role`        | —                 | Campo no reconocido: se ignora. Tampoco se acepta `fincaCode`.              |

**Respuestas:**

- `201` → `{ "message": "Cuenta creada y finca \"X\" lista." | "Cuenta creada exitosamente.", "user": { id, name, email, phone, birth_date, role }, "fincaCreada": { id, nombre } | null, "avisoCreacion": string | null }`.
- `400` → `{ message }`: JSON inválido, nombre corto, falta de contacto, correo/teléfono inválido o duplicado, fecha inválida, contraseña corta o Agropecuario sin `fincaNombre`.
- `429` → límite de tasa; `500` → error genérico de registro.

```bash
curl -X POST http://localhost:4321/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Juan Pérez","email":"juan@correo.com","password":"secreto123","accountType":"Agropecuario","fincaNombre":"Finca La Esperanza"}'
```

#### `POST /api/auth/check-availability`

**Archivo:** `src/pages/api/auth/check-availability.ts` · **Autorización:** pública · **Body:** JSON.

Esquema Zod: `email?: string` (máx. 255) y `phone?: string` (máx. 50), ambos opcionales o `""`. El celular se normaliza antes de consultar; `phoneTaken` solo se evalúa si cumple `+?\d{7,15}`.

- `200` → `{ "emailTaken": boolean, "phoneTaken": boolean }`.
- `400` → `{ message: "Datos no válidos." }`; `500` → `{ message: "No se pudo verificar. Intenta de nuevo." }`.

```bash
curl -X POST http://localhost:4321/api/auth/check-availability \
  -H 'Content-Type: application/json' -d '{"email":"juan@correo.com","phone":"3001234567"}'
```

#### `POST /api/auth/forgot-password`

**Archivo:** `src/pages/api/auth/forgot-password.ts` · **Autorización:** pública · **Rate limit:** 8/300 s · Servicios: `sendRecoveryEmail`/`sendRecoverySms` en `src/backend/services/notifications.ts`.

Busca por `LOWER(email)` o `phone`, genera un código numérico de 6 dígitos, lo almacena en `verification_token` con vigencia de 15 minutos y envía correo (SMTP/Gmail) o SMS (Twilio). La respuesta es **informativa por diseño**: el campo `message` muestra el destino enmascarado, pero el campo `identifier` devuelve el identificador canónico sin enmascarar (R-08).

- `200` → `{ message, destinationType: "correo electrónico" | "número celular", maskedTarget, identifier, sent }`. Si falta configuración SMTP/Twilio, `sent: false` y el código queda en logs del servidor.
- `400` → identificador ausente; `404` → cuenta no encontrada; `429` → límite; `500` → error interno.

```bash
curl -X POST http://localhost:4321/api/auth/forgot-password \
  -H 'Content-Type: application/json' -d '{"identifier":"juan@correo.com"}'
```

#### `POST /api/auth/reset-password`

**Archivo:** `src/pages/api/auth/reset-password.ts` · **Autorización:** pública · **Rate limit:** 8/300 s.

Valida `identifier`, `code` y `newPassword` contra `verification_token` (`expires > NOW()`), actualiza con bcrypt (10 rondas) y elimina el token.

- `200` → `{ message, user: { id, name, role } }`.
- `400` → campos obligatorios, **`newPassword` menor de 8 caracteres** o código incorrecto/expirado.
- `404` → usuario no encontrado al actualizar; `429` → límite; `500` → error interno.

> Corrección: versiones anteriores de este documento indicaban un mínimo de 6 caracteres; el código exige 8.

```bash
curl -X POST http://localhost:4321/api/auth/reset-password \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"juan@correo.com","code":"482913","newPassword":"nuevoSecreto123"}'
```

#### `/api/auth/*` — Auth.js

**Archivo de configuración:** `auth.config.ts`; integración registrada en `astro.config.mjs` (`integrations: [auth(), react()]`). `auth-astro` monta el catch-all `/api/auth/[...auth]`.

| Ruta                                  | Uso                                                                                                                     |
| :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------- |
| `GET /api/auth/signin`                | Flujo de inicio de sesión de Auth.js (la UI propia está en `/`).                                                        |
| `POST /api/auth/callback/credentials` | Login con email o celular + contraseña; bcrypt con migración de contraseñas antiguas en texto plano (`auth.config.ts`). |
| `GET/POST /api/auth/callback/google`  | OAuth de Google; requiere `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`.                                                  |
| `GET /api/auth/session`               | Sesión JWT actual; expone `user.id` y `user.role`.                                                                      |
| `POST /api/auth/signout`              | Cierre de sesión.                                                                                                       |

La sesión es JWT con `maxAge`/`updateAge` derivados de `SESSION_MAX_AGE_HOURS` (24 h por defecto) y expiración absoluta mediante `token.sessionStartedAt`. El resto de acciones estándar de `@auth/core` se sirven bajo el mismo prefijo; no son manejadores propios de este repositorio.

```bash
curl -i -c cookies.txt http://localhost:4321/api/auth/csrf
curl -i -b cookies.txt -c cookies.txt -X POST http://localhost:4321/api/auth/callback/credentials \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'email=juan@correo.com' --data-urlencode 'password=secreto123'
curl -i -b cookies.txt http://localhost:4321/api/auth/session
```

---

### 4.2 Fincas, miembros y lecturas

#### `GET /api/farms` y `POST /api/farms`

**Archivo:** `src/pages/api/farms/index.ts` · **Autorización:** sesión; creación vedada a `Campesino`.

`GET` devuelve `{ fincas }` de `listFincasForUser(user.id, user.role)` (staff ve todas; solo activas por defecto). `POST` valida `nombre` (2–255), `descripcion` (≤2000) y `ubicacion` (≤500), crea la finca, la membresía de dueño y la matriz de 20 plantas en transacción (`src/backend/services/farms.ts`). Máximo **5 fincas por usuario** (`FincaError` → `409`).

- `201` → `{ message: "Finca creada.", finca }`.
- `400` → JSON/validación; `403` → Campesino; `409` → límite de fincas; `500` → error interno.

```bash
curl -b cookies.txt http://localhost:4321/api/farms
curl -X POST http://localhost:4321/api/farms -b cookies.txt \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Finca La Esperanza","ubicacion":"Rionegro, ANT","descripcion":"Invernadero principal"}'
```

#### `GET|PATCH|DELETE /api/farms/:id`

**Archivo:** `src/pages/api/farms/[id].ts` · **Autorización:** `GET` miembro/staff; `PATCH` dueño/staff; `DELETE` solo Superadmin. El parámetro `id` se normaliza con `parseId` (entero positivo).

- `GET` → `200 { finca, miembros, access }`, donde `access` es `"miembro" | "dueno" | "staff"`. `404` si el ID no es válido o la finca no existe; `403` si `access === "none"`.
- `PATCH` → cuerpo `{ nombre?, descripcion?, ubicacion? }`; `descripcion` y `ubicacion` admiten `null`. Devuelve `200 { message: "Finca actualizada." }`. `403` para miembros.
- `DELETE` → borrado físico (`hardDeleteFinca`), `200 { message }`. `403` para cualquier no Superadmin; `404` si no existe.

```bash
curl -b cookies.txt http://localhost:4321/api/farms/1
curl -X PATCH http://localhost:4321/api/farms/1 -b cookies.txt \
  -H 'Content-Type: application/json' -d '{"nombre":"Finca La Esperanza II","descripcion":null}'
curl -X DELETE http://localhost:4321/api/farms/1 -b cookies.txt
```

#### `GET|POST /api/farms/active` y alias `/api/farm/active`

**Archivos:** `src/pages/api/farms/active.ts` y `src/pages/api/farm/active.ts` (alias que reexporta ambos manejadores) · **Autorización:** sesión.

`GET` valida la cookie contra `userCanUseFinca` y el estado `finca.activa`; si no hay cookie válida y el usuario tiene una sola finca visible, la fija y devuelve `Set-Cookie`. Si hay varias sin selección, responde `{ finca: null, fincas }` y limpia la cookie. `POST` exige `{ fincaId: number > 0 }`, verifica `userCanUseFinca`, exige finca activa y devuelve `{ message, finca }` con cookie HttpOnly `finca_activa` (30 días, `SameSite=Lax`, `Secure` en producción).

- `200` → según lo anterior; `400` → JSON/cuerpo inválido; `403` → «No formas parte de esa finca.»; `404` → finca inexistente o archivada.

```bash
curl -b cookies.txt http://localhost:4321/api/farms/active
curl -X POST http://localhost:4321/api/farms/active -b cookies.txt -c cookies.txt \
  -H 'Content-Type: application/json' -d '{"fincaId":1}'
curl -i -b cookies.txt http://localhost:4321/api/farm/active
```

#### `POST /api/farms/leave`

**Archivo:** `src/pages/api/farms/leave.ts` · **Autorización:** sesión; el servicio `leaveFinca` rechaza al dueño (`400`).

Body `{ fincaId: number > 0 }`. Respuestas: `200 { message: "Saliste de la finca." }`; `400` JSON/formato o dueño; `404` si el usuario no era miembro; `500` error interno.

```bash
curl -X POST http://localhost:4321/api/farms/leave -b cookies.txt \
  -H 'Content-Type: application/json' -d '{"fincaId":1}'
```

#### `POST /api/farms/:id/archive`

**Archivo:** `src/pages/api/farms/[id]/archive.ts` · **Autorización:** dueño/staff.

Body exacto `{ "activa": boolean }`; `true` restaura, `false` archiva. Respuestas: `200 { message }`; `400` si falta o no es booleano; `403` sin permiso; `404` finca inexistente.

```bash
curl -X POST http://localhost:4321/api/farms/1/archive -b cookies.txt \
  -H 'Content-Type: application/json' -d '{"activa":false}'
```

#### `GET|DELETE /api/farms/:id/members`

**Archivo:** `src/pages/api/farms/[id]/members.ts` · **Autorización:** dueño/staff en ambos métodos.

`GET` → `200 { miembros }` (`user_id`, `name`, `email`, `phone`, `rol_finca`, `created_at`). `DELETE` usa **query string**, no body: `?userId=N`. No se puede expulsar al dueño (`400` desde `removeMember`); `404` si el objetivo no es miembro; `400` si falta `userId`.

```bash
curl -b cookies.txt http://localhost:4321/api/farms/1/members
curl -X DELETE 'http://localhost:4321/api/farms/1/members?userId=7' -b cookies.txt
```

#### `GET|POST|DELETE /api/farms/:id/readings`

**Archivo:** `src/pages/api/farms/[id]/readings.ts` · Servicios: `src/backend/services/readings.ts`.

- `GET` (miembro/staff) → `200 { records: MetricRecord[] }`, orden ascendente por `fecha, hora`. Cada registro incluye `id: "LEC-<id>"`, `code`, `fila`, `columna`, `plantId`, `fecha`, `hora`, `phSuelo`, `tempInterna`, `tempExterna`, `tempSuelo`, `humedad`, `alturaCm`, `crecimiento`, `faseCrecimiento`, `productividad`, `sanidad`, `responsable` (texto CSV o nombre del usuario), `responsableRol`, `avatarColor`, `observaciones`.
- `POST` (miembro/staff) → body `{ "records": [MetricRecord, …] }`. No hay esquema Zod para cada registro: `insertLecturas` omite los que no tengan `fecha` `YYYY-MM-DD` o cuya `(fila, columna)` no corresponda a una planta de la finca. Upsert por `(finca_id, planta_id, fecha, hora)`; el texto `responsable` se conserva si no viene y `responsable_id` se fija al usuario de la sesión. Respuesta `200 { message, count }`; `400` si `records` está vacío.
- `DELETE` (dueño/staff) → borra **todo** el historial de la finca: `200 { message, count }`.

```bash
curl -b cookies.txt http://localhost:4321/api/farms/1/readings
curl -X POST http://localhost:4321/api/farms/1/readings -b cookies.txt \
  -H 'Content-Type: application/json' \
  -d '{"records":[{"fila":"t0","columna":"Col 1","fecha":"2026-11-23","hora":"08:30","phSuelo":6.4,"tempInterna":24.5,"humedad":65,"responsable":"Equipo de Campo"}]}'
curl -X DELETE http://localhost:4321/api/farms/1/readings -b cookies.txt
```

#### `GET|POST /api/farms/:id/invitations` y `DELETE /api/farms/:id/invitations/:invId`

**Archivo:** `src/pages/api/farms/[id]/invitations.ts` y `src/pages/api/farms/[id]/invitations/[invId].ts` · **Autorización:** dueño/staff.

`GET` → `200 { invitaciones }`. `POST` acepta `{ expiraDias?, usosMaximos? }` con defaults **7** y **1** y rangos 1–90 y 1–500; el servidor calcula `expira_en` y genera un código `nanoid` de 8 caracteres del alfabeto `nolookalikesSafe` en mayúsculas. Devuelve `201 { message, invitacion }`.

> Corrección: el body es `expiraDias` (días), **no** `expiraEn` (fecha ISO). Documentaciones anteriores usaban el nombre incorrecto.

`DELETE` → `200 { message: "Invitación revocada." }`; valida que la invitación pertenezca a `:id`; `404` si no existe. Errores comunes: `400` validación, `403` permiso, `500` fallo de base de datos.

```bash
curl -X POST http://localhost:4321/api/farms/1/invitations -b cookies.txt \
  -H 'Content-Type: application/json' -d '{"expiraDias":7,"usosMaximos":5}'
curl -b cookies.txt http://localhost:4321/api/farms/1/invitations
curl -X DELETE http://localhost:4321/api/farms/1/invitations/12 -b cookies.txt
```

---

### 4.3 Invitaciones globales

#### `GET /api/invitations/peek`

**Archivo:** `src/pages/api/invitations/peek.ts` · **Autorización:** sesión · **Query:** `?code=CODIGO` (se normaliza a mayúsculas en el servicio).

- `200` → `{ invitacion: { fincaId, fincaNombre, expiraEn, usosRestantes } }`.
- `400` → `{ message: "Falta el código." }`; `404` → código inexistente, revocado, expirado, agotado o de finca archivada.

La página `/invite/[code]` usa `peekInvitacion` directamente en SSR; este endpoint está disponible para clientes externos.

```bash
curl -b cookies.txt 'http://localhost:4321/api/invitations/peek?code=K7M4XP9Q'
```

#### `POST /api/invitations/use`

**Archivo:** `src/pages/api/invitations/use.ts` · **Autorización:** sesión · **Rate limit:** 15/300 s · Servicio: `redeemInvitacion` (`src/backend/services/farms.ts`).

Body `{ code: string }` (4–20 caracteres; se recorta y convierte a mayúsculas). La operación es transaccional (`SELECT … FOR UPDATE`) y fija la cookie `finca_activa`.

- `200` → `{ message: "Te uniste a \"X\".", fincaId, fincaNombre }` + `Set-Cookie`.
- `400` → JSON/código corto; `404` → código inexistente; `409` → ya es miembro; `410` → revocada, expirada, agotada o finca no disponible; `429` límite; `500` error interno.

```bash
curl -X POST http://localhost:4321/api/invitations/use -b cookies.txt -c cookies.txt \
  -H 'Content-Type: application/json' -d '{"code":"K7M4XP9Q"}'
```

---

### 4.4 Administración, perfil y notificaciones

#### `GET /api/admin/users`

**Archivo:** `src/pages/api/admin/users/index.ts` · **Autorización:** solo Superadmin (`canManageSystem`).

Query opcional `?q=` buscando por `name`, `email` o `phone` con `ILIKE`. Devuelve hasta **200** filas ordenadas por rol y nombre: `{ users: [{ id, name, email, phone, role, created_at, fincas_count }] }`. `401` sin sesión, `403` si no es Superadmin.

```bash
curl -b cookies.txt 'http://localhost:4321/api/admin/users?q=juan'
```

#### `PATCH|DELETE /api/admin/users/:id`

**Archivo:** `src/pages/api/admin/users/[id].ts` · **Autorización:** solo Superadmin.

`PATCH` Body `{ role }` con `role ∈ {Superadmin, Admin, Agropecuario, Campesino}`. Devuelve `200 { message }`. Protege al último Superadmin (`403`). `400` rol inválido; `404` usuario inexistente.

`DELETE` sin body. Reglas: no eliminar la propia cuenta (`403`), no eliminar al último Superadmin (`403`), no eliminar a dueño de fincas (`409` con mensaje de transferencia/borrado previo), `409` si existen lecturas asociadas (violación FK `23503`). `200 { message }` en caso de éxito; las membresías se eliminan con el usuario.

```bash
curl -X PATCH http://localhost:4321/api/admin/users/7 -b cookies.txt \
  -H 'Content-Type: application/json' -d '{"role":"Admin"}'
curl -X DELETE http://localhost:4321/api/admin/users/7 -b cookies.txt
```

#### `PATCH /api/users/me`

**Archivo:** `src/pages/api/users/me.ts` · Servicio: `src/backend/services/profile.ts` · **Autorización:** sesión (solo handler; el middleware no cubre este prefijo).

| Campo   | Regla                                                                    |
| :------ | :----------------------------------------------------------------------- |
| `name`  | Opcional; 2–255 caracteres tras recortar.                                |
| `image` | Opcional; ≤400 000 caracteres; `""`, URL `http(s)://…` o `data:image/png | jpeg | jpg | webp;base64,…`. |

Se exige al menos uno de `name`/`image` (`refine` → `400 "No se enviaron cambios."`). `image: ""` se persiste como `NULL`.

- `200` → `{ message: "Perfil actualizado.", user: { name, image } }`.
- `400` → Body inválido o validación; `401` sin sesión; `404` usuario no encontrado; `500` fallo de actualización.

```bash
curl -X PATCH http://localhost:4321/api/users/me -b cookies.txt \
  -H 'Content-Type: application/json' -d '{"name":"Juan Pérez"}'
```

#### `POST /api/notifications/weekly-summary`

**Archivo:** `src/pages/api/notifications/weekly-summary.ts` · Servicios: `src/backend/services/readings.ts`, `profile.ts`, `notifications.ts` · **Autorización:** sesión + `canViewFincaData` de la finca activa (solo handler).

Sin body. Obtiene el correo propio (`getOwnEmail`), calcula la última lectura por planta, promedios de pH y temperatura interior, plantas `Crítica`/`Vulnerable`, pH fuera de 6.0–6.8 y envía el resumen con `sendWeeklySummaryEmail`.

- `200` → `{ sent: true, message: "Resumen enviado a <email>." }`.
- `400` → `{ sent: false, message }` si no hay finca activa o la cuenta no tiene correo.
- `401` sin sesión; `403` sin acceso a la finca; `502` → `{ sent: false, message }` si SMTP no está configurado o falla el envío.

Requiere `SMTP_USER`/`SMTP_PASS` o `GMAIL_USER`/`GMAIL_APP_PASSWORD`. **No** imprime el resumen en logs como sustituto del envío (eso ocurre solo con los códigos de recuperación).

```bash
curl -X POST http://localhost:4321/api/notifications/weekly-summary \
  -b cookies.txt -H 'Accept: application/json'
```

---

### 4.5 Sincronización y exportación

#### `GET /api/sync-sheets`

**Archivo:** `src/pages/api/sync-sheets.ts` · **Autorización:** sesión + finca activa (middleware + `resolveActiveFinca`). No aplica `canConnectSheets` en `GET`.

Lee la columna `fincas.sheets_url` (la columna se crea de forma idempotente con `ALTER TABLE … IF NOT EXISTS`). Responde `200 { success: true, sheetsUrl: string | null }`. Sin finca activa: `400 { success: false, error: "Sin finca activa" }`; sin sesión: `401`.

Es usada por `src/frontend/components/Dashboard.astro` y `Metrics.astro` para recuperar la URL guardada antes de sincronizar.

```bash
curl -b cookies.txt http://localhost:4321/api/sync-sheets
```

#### `POST /api/sync-sheets`

**Archivo:** `src/pages/api/sync-sheets.ts` · Servicios: `src/backend/services/sheetsSync.ts`, `src/shared/recordsParser.ts`, `src/backend/services/readings.ts` · **Autorización:** sesión + finca activa + `canConnectSheets` → **miembro, dueño o staff**.

**Request body:** `{ "url": "https://docs.google.com/spreadsheets/d/TU_ID/edit#gid=0" }`. El campo `url` es opcional: si se omite o es inválido, se reutiliza `fincas.sheets_url`. `normalizeGoogleSheetUrl` convierte enlaces `/file/d/…`, `drive.google.com/...?id=…`, `/spreadsheets/d/e/…/pubhtml` y `/spreadsheets/d/<id>/edit#gid=<gid>` a exportaciones CSV. La descarga usa `User-Agent: Macollo-Greenhouse-Sync/2.0`.

**Columnas reconocidas** (normalizadas: sin tildes, guiones bajos/espacios equivalentes): `ID_planta`, `fecha` (ISO, `DD/MM/YYYY` o serial Excel), `responsable` (con many alias: `operario`, `técnico`, `registrado por`, `nombre`, …), `T_Ext_C`, `T_Int_C`, `humedad_Pct`, `T_Planta_C` (temperatura de suelo), `Ph`, `ALtura_cm` y opcionales `fase`, `productividad`, `sanidad`, `observacion`. La fila de cabecera se detecta entre las 10 primeras filas.

**Reglas de normalización:** pH limitado a 0–14 (default `6.4`); temperatura interna default `24.5 °C`, externa `20.2 °C`; humedad 0–100 (default `65`); `tempSuelo: null` si no se midió; altura y crecimiento derivados; sanidad derivada del pH si no se informa; **responsable** por defecto `"Sin registrar"`; `observaciones` con detalle de la medición cuando falta.

**Persistencia:** se guarda `sheets_url` en la finca antes de insertar; `insertLecturas` realiza upsert por `(finca, planta, fecha, hora)`, conservando el texto `responsable` previo si la fila no trae uno y asignando `responsable_id = ctx.user.id`.

**Respuestas:**

- `200` → `{ success: true, count, guardadas, records: MetricRecord[], sheetsUrl, message }`. `guardadas` puede ser menor que `count` si hay deduplicación o filas omitidas; un fallo de persistencia se registra en logs sin fallar la petición.
- `400` → `{ success: false, error, needsUrl?: true }` (sin finca activa o sin URL configurada).
- `401/403` → sin sesión / sin acceso a la finca (el permiso se evalúa solo en `POST`).
- `422` → `SheetsSyncError`: HTTP externo ≠ 2xx (compartir como «Cualquier persona con el enlace» o publicar como CSV), CSV vacío o sin registros válidos.
- `500` → `{ success: false, error, details }`.

```bash
curl -X POST http://localhost:4321/api/sync-sheets -b cookies.txt \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://docs.google.com/spreadsheets/d/TU_ID/edit#gid=0"}'
```

#### `GET|POST /api/export-excel`

**Archivo:** `src/pages/api/export-excel.ts` · Servicio: `src/backend/services/excelExport.ts` · **Autorización:** sesión + `canViewFincaData` de la finca activa. Ambos métodos apuntan al mismo manejador; el body se ignora.

Carga `getLecturasByFinca`, construye `PlantMatrixItem[]` con `buildPlantsGridFromRecords` y genera un libro de tres hojas: **Mediciones de Hoy** (matriz con formato, colores por sanidad, fila `PROMEDIO GENERAL`), **Historial Completo** y **Rangos Agronómicos**.

**Respuesta `200` (binaria):**

```http
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="<Finca>_Mediciones_YYYY-MM-DD.xlsx"
Cache-Control: no-cache, no-store, must-revalidate
```

> Corrección: el nombre real es `<nombre de finca sanitizado>_Mediciones_YYYY-MM-DD.xlsx`, no `Macollo_Mediciones_…`.

`500` → `{ error: "Error al exportar Excel", details }`.

```bash
curl -OJ -b cookies.txt http://localhost:4321/api/export-excel
curl -X POST -b cookies.txt http://localhost:4321/api/export-excel \
  -H 'Content-Type: application/json' -d '{}' -o reporte.xlsx
```

#### `GET /api/export-csv`

**Archivo:** `src/pages/api/export-csv.ts` · Servicio: `src/backend/services/csvExport.ts` · **Autorización:** sesión + `canViewFincaData` (solo handler; no cubierto por middleware).

Cabeceras: `Planta, Fila, Columna, Fecha, Hora, pH_Suelo, Temp_Interna_C, Temp_Externa_C, Temp_Suelo_C, Humedad_Pct, Altura_cm, Crecimiento_Pct, Fase, Productividad, Sanidad, Responsable, Observaciones`. BOM UTF-8 y separador CRLF. Nombre: `<Finca>_Historial_YYYY-MM-DD.csv`.

- `200` → `text/csv; charset=utf-8` con `Content-Disposition: attachment`.
- `400` sin finca activa; `401` sin sesión; `403` sin acceso; `500` → `{ error: "Error al exportar CSV" }`.

```bash
curl -OJ -b cookies.txt http://localhost:4321/api/export-csv
```

---

### 4.6 Integraciones climáticas

#### `GET /api/weather`

**Archivo:** `src/pages/api/weather.ts` · Servicios: `src/backend/services/weather.ts` y `serverFetch.ts` · **Autorización:** pública en la práctica.

| Parámetro    | Uso                                                     |
| :----------- | :------------------------------------------------------ |
| `lat`, `lon` | Coordenadas; si faltan o no son finitas se intenta `q`. |
| `q`          | Consulta textual geocodificada (`geocodeQuery`).        |
| `name`       | Etiqueta de ubicación preferida.                        |
| `fallback=1` | Fuerza etiqueta `Medellín, ANT` como fallback.          |

Si no hay coordenadas válidas se usan `6.2442, -75.5812` (Medellín). La respuesta es `WeatherData`: `{ temperature, humidity, rainProbability, weatherCode, windSpeed, isFallback, locationName, source }`, con `source: "Open-Meteo (Global)"` o `"Offline Fallback"`. Incluso en fallo externo el handler devuelve **`200`** con valores por defecto (`22 °C`, `60 %`, `isFallback: true`).

> Corrección: el handler invoca `getSession(request)` dentro de un `try/catch` y descarta el valor; no hay `401`. El middleware tampoco protege `/api/weather`. Debe considerarse información no sensible y no usarla como barrera de autorización.

```bash
curl 'http://localhost:4321/api/weather?lat=6.2442&lon=-75.5812'
curl 'http://localhost:4321/api/weather?q=Rionegro%2C%20Antioquia'
```

#### `GET /api/aqi`

**Archivo:** `src/pages/api/aqi.ts` · **Autorización:** pública en la práctica (mismo patrón `getSession` ignorado que `/api/weather`).

Parámetros `lat`, `lon` (default Medellín). Consulta WAQI con `WAQI_TOKEN` (valor por entorno o fallback en código) mediante `serverFetch` y timeout de 8 s. Respuesta normal: el JSON tal cual de WAQI (`{ status, data }`). Ante error externo devuelve **`200`** con `{ status: "ok", data: { aqi: 28, city: { name: "Medellín" } } }`.

```bash
curl 'http://localhost:4321/api/aqi?lat=6.2442&lon=-75.5812'
```

#### `GET /api/siata`

**Archivo:** `src/pages/api/siata.ts` · **Autorización:** sesión (comprobación explícita en el handler; el middleware no cubre el prefijo). Sin parámetros.

Consulta `http://siata.gov.co:8089/estacionesTemperatura/20` con abort a los 3 s. Respuestas:

- `200` → JSON devuelto por SIATA.
- `401` → `{ error: "No autenticado." }`.
- `500` → `{ error: "No se pudo obtener la información del SIATA" }` (caída, timeout o HTTP ≠ 2xx).

> Correcciones: no se añade la cabecera `Access-Control-Allow-Origin: *` y el error `500` no incluye campo `details`. El servicio `fetchWeatherData` ya no consume este proxy (ADR-007): el endpoint permanece operativo pero sin consumidores internos.

```bash
curl -i -b cookies.txt http://localhost:4321/api/siata
```

---

### 4.7 Galería

#### `POST /api/gallery/upload`

**Archivo:** `src/pages/api/gallery/upload.ts` · **Autorización:** sesión (middleware + doble comprobación `getSession`/`getAuthUser`).

`multipart/form-data` con `file` (obligatorio, `Blob`), `caption` y `taken_at` opcionales. Guarda el archivo en `public/uploads/gallery/<uuid>.<ext>` (extensión inferida del MIME: `png`, `webp`, `gif`, `avif` o `jpg`) e inserta en `photos` con `finca_id` tomado **directamente de la cookie `finca_activa`**, `user_id` de la sesión y `taken_at` o `NOW()`.

- `200` → `{ ok: true, photo: { id, url, filename } }`, con `url = /uploads/gallery/<uuid>.<ext>`.
- `400` → `{ error: "No se proporcionó ningún archivo válido." }`; `401` → `{ error: "No autorizado" }`; `500` → `{ error: "Error al guardar la foto en la galería." }`.

> Precisión de seguridad: el handler **no valida membresía** entre el usuario y la finca de la cookie; únicamente usa el valor entero positivo de la cookie. No hay validación de tamaño ni de tipo MIME más allá de `instanceof Blob`.

```bash
curl -X POST http://localhost:4321/api/gallery/upload -b cookies.txt \
  -H 'Origin: http://localhost:4321' \
  -F 'file=@/ruta/foto.jpg;type=image/jpeg' \
  -F 'caption=Planta T0-P1' -F 'taken_at=2026-11-23T09:00:00Z'
```

#### `GET /api/gallery/:id/file`

**Archivo:** `src/pages/api/gallery/[id]/file.ts` · **Autorización:** sesión (middleware + `getSession`). `prerender = false`.

Busca la fila en `photos` por ID y prueba rutas candidatas (`public` + `photo.url`, `public/uploads`, `public/uploads/gallery`, `public/uploads/galeria`, `uploads`). Sirve el buffer con `Content-Type` derivado del MIME, `Content-Length` y `Cache-Control: public, max-age=31536000, immutable`; si `photo.url` es HTTP remoto y no hay archivo local, redirige `302`.

- `200` imagen; `302` URL remota; `400` «ID requerido»; `401` «No autorizado»; `404` «Foto no encontrada» / «Archivo no disponible»; `500` «Error interno». Todas estas respuestas de error son **texto plano**, no JSON.

> Corrección: el endpoint **no** verifica que la foto pertenezca a la finca activa. El filtrado existe en las páginas `src/frontend/components/Gallery.astro` y `GalleryDetail.astro`, pero un cliente con sesión podría solicitar el ID de una foto de otra finca.

```bash
curl -i -b cookies.txt http://localhost:4321/api/gallery/12/file -o foto.bin
```

---

### 4.8 Diagnóstico de trips (proxy ML)

**Archivo:** `src/pages/api/trips-diagnosis.ts` · **Autorización:** pública · `prerender = false` · `maxDuration = 60` · Destino: `${ML_API_URL}/api/{health,warmup,predict}` del servicio [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api).

#### `GET /api/trips-diagnosis`

Consulta `${ML_API_URL}/api/health` con timeout de 25 s. Si `model_loaded === false`, lanza `POST /api/warmup` en segundo plano (timeout 10 s; reintento único tras renovar sesión si responde `401`).

- `200` → `{ status: "online", ml_service: <JSON de /api/health>, warming_triggered: boolean }`.
- `503` → `{ status: "offline", message: "El servidor de Machine Learning en Google Cloud Run no está activo o no responde en <URL>" }`.

#### `POST /api/trips-diagnosis`

`multipart/form-data` con `file` (obligatorio y no vacío), `temperature_c` (opcional), `crop` (default `gulupa`) y `profile` (default `auto`). Reenvía el archivo a `${ML_API_URL}/api/predict` con cabeceras `X-API-Key` y, si está disponible, la cookie `macollo_session` obtenida de `/api/auth/login`. Si la API responde `401`, renueva la sesión y **realiza un único reintento inmediato**.

- `200` → JSON de predicción del servicio ML (taxonomía, estadio, confianza, urgencia, etc.).
- `400` → `{ error: "No se proporcionó ningún archivo de imagen válido." }`.
- Cualquier estado no 2xx del servicio ML se propaga **tal cual** (por ejemplo `503` si el modelo está cargando), con `{ error: "Error desde la API de Machine Learning (<status>): <texto>" }`.
- `502` → `{ error: "No se pudo conectar con el servidor de Machine Learning en Google Cloud Run (…)" }` u error interno del proxy.

Estado verificado tras el commit `4e977f5` (**`fix(trips): direct fast inference without artificial 503 retry delays`**): se eliminaron el bucle de reintentos por `503 warming`, las esperas de 2/5/8 s, el presupuesto de 50 s y la respuesta sintética `{ status: "warming", retry: true, retry_after_seconds: 10, ... }` con cabecera `Retry-After`. Las constantes `TOTAL_BUDGET_MS` y `ATTEMPT_TIMEOUT_MS` permanecen declaradas pero ya no intervienen en `POST`; `safeJson` tampoco se usa. La inferencia es directa: una llamada, con la única excepción de la renovación automática ante `401`. La modal `TripsDiagnosticModal.astro` guarda la foto en la galería (`POST /api/gallery/upload`) de forma independiente al diagnóstico.

```bash
curl -i http://localhost:4321/api/trips-diagnosis
curl -X POST http://localhost:4321/api/trips-diagnosis \
  -H 'Origin: http://localhost:4321' \
  -F 'file=@/ruta/hoja.jpg;type=image/jpeg' \
  -F 'temperature_c=22.0' -F 'crop=gulupa' -F 'profile=auto'
```

---

## 5. Códigos de estado y errores comunes

| Código | Significado en esta API                                                                                                                                                          |
| :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200`  | Éxito. También lo devuelven `/api/weather` y `/api/aqi` cuando entregan datos de fallback.                                                                                       |
| `201`  | Recurso creado: registro, finca o invitación.                                                                                                                                    |
| `400`  | JSON inválido, validación Zod, parámetro ausente, sin finca activa, Agropecuario sin `fincaNombre`, intento de expulsar al dueño, contraseña corta o código inválido.            |
| `401`  | Sin sesión. Lo produce el middleware para prefijos protegidos o el handler (`unauthorized()`, `getSession`, `resolveActiveFinca`).                                               |
| `403`  | Sin permiso: `Campesino` creando fincas, miembro editando/archivando, no Superadmin en administración o hard delete, acceso `none` a la finca, sincronización Sheets sin acceso. |
| `404`  | Finca/usuario/foto/invitación inexistente; cuenta no encontrada en recuperación; código de invitación inexistente.                                                               |
| `409`  | Límite de 5 fincas, ya miembro de la finca, usuario dueño de fincas al eliminar cuenta o violación de clave foránea.                                                             |
| `410`  | Invitación revocada, expirada, agotada o finca no disponible.                                                                                                                    |
| `422`  | Google Sheets/Drive inaccesible, CSV vacío o sin registros válidos (`SheetsSyncError`).                                                                                          |
| `429`  | Límite de tasa por IP; incluye `Retry-After`.                                                                                                                                    |
| `500`  | Fallo interno (base de datos, ExcelJS, envío de correo, persistencia de lecturas).                                                                                               |
| `502`  | Fallo de conexión con la API de ML o SMTP no configurado/fallido en el resumen semanal.                                                                                          |
| `503`  | Solo en `/api/trips-diagnosis` `GET` (servicio ML caído) o propagado desde `/api/predict`. Ya no se genera artificialmente en `POST`.                                            |

---

## 6. Límites de tasa (middleware)

| Prefijo                          | Límite | Ventana | Fuente              |
| :------------------------------- | :----- | :------ | :------------------ |
| `/api/auth/register`             | 10     | 300 s   | `src/middleware.ts` |
| `/api/auth/forgot-password`      | 8      | 300 s   | `src/middleware.ts` |
| `/api/auth/reset-password`       | 8      | 300 s   | `src/middleware.ts` |
| `/api/auth/callback/credentials` | 20     | 300 s   | `src/middleware.ts` |
| `/api/invitations/use`           | 15     | 300 s   | `src/middleware.ts` |

La IP se obtiene de `x-forwarded-for` (primer valor) o `x-real-ip` (`src/backend/services/rateLimit.ts`). En Vercel el mapa es por instancia: no constituye un límite global.

---

## 7. Rutas que NO existen y correcciones aplicadas

| Elemento                                                             | Situación real                                                                    |
| :------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| `/api/metrics`                                                       | No existe. Usar `GET /api/farms/:id/readings`.                                    |
| `/api/export/excel`, `/api/export/csv`                               | No existen. Los correctos son `/api/export-excel` y `/api/export-csv`.            |
| `PUT` en cualquier ruta                                              | No hay manejadores `PUT`; se usa `PATCH` o `POST`.                                |
| `POST /api/sync-sheets` solo para dueño                              | Incorrecto: `canConnectSheets` admite `miembro`, `dueno` y `staff`.               |
| `expiraEn` en el body de invitaciones                                | Incorrecto: el campo real es `expiraDias` (1–90, default 7).                      |
| `newPassword` de 6 caracteres                                        | Incorrecto: `/api/auth/reset-password` exige 8.                                   |
| `GET /api/gallery/:id/file` filtrado por finca                       | Incorrecto: el handler solo exige sesión; el filtro vive en la página de detalle. |
| `Access-Control-Allow-Origin: *` en `/api/siata`                     | No se emite. Los errores son `{ error }` sin `details`.                           |
| Filename `Macollo_Mediciones_*.xlsx`                                 | Incorrecto: `<Finca>_Mediciones_YYYY-MM-DD.xlsx`.                                 |
| `/api/predict`, `/api/health`, `/api/warmup`, `/api/auth/login` (ML) | Pertenecen a `macollo-trips-api`; localmente solo existe `/api/trips-diagnosis`.  |
| Reintentos artificiales `503` en trips                               | eliminados en `4e977f5`; no hay `Retry-After` sintético en `POST`.                |
| `/signin`, `/api/farm/active`                                        | **Sí existen** como alias retrocompatibles; no eliminarlos de enlaces antiguos.   |
| `/api/sync-sheets` `GET`                                             | **Sí existe** y devuelve `sheetsUrl`; no estaba documentado.                      |

---

## Trazabilidad

| Ruta                                | Archivo                                           | Método    | Autorización          | Doc relacionado                                    | Verificación curl                                                                                                        |
| :---------------------------------- | :------------------------------------------------ | :-------- | :-------------------- | :------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `/api/auth/register`                | `src/pages/api/auth/register.ts`                  | POST      | Público               | [AUTH](./AUTH.md)                                  | `curl -X POST localhost:4321/api/auth/register -H 'Content-Type: application/json' -d '{...}'`                           |
| `/api/auth/check-availability`      | `src/pages/api/auth/check-availability.ts`        | POST      | Público               | [AUTH](./AUTH.md)                                  | `curl -X POST localhost:4321/api/auth/check-availability -H 'Content-Type: application/json' -d '{"email":"a@b.com"}'`   |
| `/api/auth/forgot-password`         | `src/pages/api/auth/forgot-password.ts`           | POST      | Público               | [AUTH](./AUTH.md)                                  | `curl -X POST localhost:4321/api/auth/forgot-password -H 'Content-Type: application/json' -d '{"identifier":"a@b.com"}'` |
| `/api/auth/reset-password`          | `src/pages/api/auth/reset-password.ts`            | POST      | Público               | [AUTH](./AUTH.md)                                  | `curl -X POST localhost:4321/api/auth/reset-password -H 'Content-Type: application/json' -d '{...}'`                     |
| `/api/auth/*`                       | `auth.config.ts`, `astro.config.mjs`              | GET/POST  | Público               | [AUTH](./AUTH.md)                                  | `curl -i localhost:4321/api/auth/session`                                                                                |
| `/api/farms`                        | `src/pages/api/farms/index.ts`                    | GET       | Sesión                | [ROUTES](./ROUTES.md)                              | `curl -b cookies.txt localhost:4321/api/farms`                                                                           |
| `/api/farms`                        | `src/pages/api/farms/index.ts`                    | POST      | Sesión (no Campesino) | [ROUTES](./ROUTES.md)                              | `curl -X POST -b cookies.txt localhost:4321/api/farms -d '{"nombre":"Finca X"}'`                                         |
| `/api/farms/:id`                    | `src/pages/api/farms/[id].ts`                     | GET       | Miembro               | [AUTH](./AUTH.md)                                  | `curl -b cookies.txt localhost:4321/api/farms/1`                                                                         |
| `/api/farms/:id`                    | `src/pages/api/farms/[id].ts`                     | PATCH     | Dueño/staff           | [AUTH](./AUTH.md)                                  | `curl -X PATCH -b cookies.txt localhost:4321/api/farms/1 -d '{"nombre":"Finca Y"}'`                                      |
| `/api/farms/:id`                    | `src/pages/api/farms/[id].ts`                     | DELETE    | Superadmin            | [AUTH](./AUTH.md)                                  | `curl -X DELETE -b cookies.txt localhost:4321/api/farms/1`                                                               |
| `/api/farms/active`                 | `src/pages/api/farms/active.ts`                   | GET       | Sesión                | [ROUTES](./ROUTES.md)                              | `curl -b cookies.txt localhost:4321/api/farms/active`                                                                    |
| `/api/farms/active`                 | `src/pages/api/farms/active.ts`                   | POST      | Sesión + acceso       | [ROUTES](./ROUTES.md)                              | `curl -X POST -b cookies.txt localhost:4321/api/farms/active -d '{"fincaId":1}'`                                         |
| `/api/farm/active`                  | `src/pages/api/farm/active.ts`                    | GET, POST | Igual que canonical   | [ROUTES](./ROUTES.md)                              | `curl -b cookies.txt localhost:4321/api/farm/active`                                                                     |
| `/api/farms/leave`                  | `src/pages/api/farms/leave.ts`                    | POST      | Sesión + miembro      | [AUTH](./AUTH.md)                                  | `curl -X POST -b cookies.txt localhost:4321/api/farms/leave -d '{"fincaId":1}'`                                          |
| `/api/farms/:id/archive`            | `src/pages/api/farms/[id]/archive.ts`             | POST      | Dueño/staff           | [ROUTES](./ROUTES.md)                              | `curl -X POST -b cookies.txt localhost:4321/api/farms/1/archive -d '{"activa":false}'`                                   |
| `/api/farms/:id/members`            | `src/pages/api/farms/[id]/members.ts`             | GET       | Dueño/staff           | [AUTH](./AUTH.md)                                  | `curl -b cookies.txt localhost:4321/api/farms/1/members`                                                                 |
| `/api/farms/:id/members`            | `src/pages/api/farms/[id]/members.ts`             | DELETE    | Dueño/staff           | [AUTH](./AUTH.md)                                  | `curl -X DELETE -b cookies.txt 'localhost:4321/api/farms/1/members?userId=7'`                                            |
| `/api/farms/:id/readings`           | `src/pages/api/farms/[id]/readings.ts`            | GET       | Miembro               | [DATA-DICTIONARY](./DATA-DICTIONARY.md)            | `curl -b cookies.txt localhost:4321/api/farms/1/readings`                                                                |
| `/api/farms/:id/readings`           | `src/pages/api/farms/[id]/readings.ts`            | POST      | Miembro               | [DATA-DICTIONARY](./DATA-DICTIONARY.md)            | `curl -X POST -b cookies.txt localhost:4321/api/farms/1/readings -d '{"records":[...]}'`                                 |
| `/api/farms/:id/readings`           | `src/pages/api/farms/[id]/readings.ts`            | DELETE    | Dueño/staff           | [ROUTES](./ROUTES.md)                              | `curl -X DELETE -b cookies.txt localhost:4321/api/farms/1/readings`                                                      |
| `/api/farms/:id/invitations`        | `src/pages/api/farms/[id]/invitations.ts`         | GET       | Dueño/staff           | [AUTH](./AUTH.md)                                  | `curl -b cookies.txt localhost:4321/api/farms/1/invitations`                                                             |
| `/api/farms/:id/invitations`        | `src/pages/api/farms/[id]/invitations.ts`         | POST      | Dueño/staff           | [AUTH](./AUTH.md)                                  | `curl -X POST -b cookies.txt localhost:4321/api/farms/1/invitations -d '{"expiraDias":7}'`                               |
| `/api/farms/:id/invitations/:invId` | `src/pages/api/farms/[id]/invitations/[invId].ts` | DELETE    | Dueño/staff           | [AUTH](./AUTH.md)                                  | `curl -X DELETE -b cookies.txt localhost:4321/api/farms/1/invitations/12`                                                |
| `/api/invitations/peek`             | `src/pages/api/invitations/peek.ts`               | GET       | Sesión                | [ROUTES](./ROUTES.md)                              | `curl -b cookies.txt 'localhost:4321/api/invitations/peek?code=K7M4XP9Q'`                                                |
| `/api/invitations/use`              | `src/pages/api/invitations/use.ts`                | POST      | Sesión                | [ROUTES](./ROUTES.md)                              | `curl -X POST -b cookies.txt localhost:4321/api/invitations/use -d '{"code":"K7M4XP9Q"}'`                                |
| `/api/admin/users`                  | `src/pages/api/admin/users/index.ts`              | GET       | Superadmin            | [AUTH](./AUTH.md)                                  | `curl -b cookies.txt 'localhost:4321/api/admin/users?q=juan'`                                                            |
| `/api/admin/users/:id`              | `src/pages/api/admin/users/[id].ts`               | PATCH     | Superadmin            | [AUTH](./AUTH.md)                                  | `curl -X PATCH -b cookies.txt localhost:4321/api/admin/users/7 -d '{"role":"Admin"}'`                                    |
| `/api/admin/users/:id`              | `src/pages/api/admin/users/[id].ts`               | DELETE    | Superadmin            | [AUTH](./AUTH.md)                                  | `curl -X DELETE -b cookies.txt localhost:4321/api/admin/users/7`                                                         |
| `/api/users/me`                     | `src/pages/api/users/me.ts`                       | PATCH     | Sesión                | [AUTH](./AUTH.md)                                  | `curl -X PATCH -b cookies.txt localhost:4321/api/users/me -d '{"name":"Juan"}'`                                          |
| `/api/notifications/weekly-summary` | `src/pages/api/notifications/weekly-summary.ts`   | POST      | Sesión + miembro      | [AUTH](./AUTH.md)                                  | `curl -X POST -b cookies.txt localhost:4321/api/notifications/weekly-summary`                                            |
| `/api/sync-sheets`                  | `src/pages/api/sync-sheets.ts`                    | GET       | Sesión + finca activa | [ADR-005](./decisions/ADR-005-sheets-csv.md)       | `curl -b cookies.txt localhost:4321/api/sync-sheets`                                                                     |
| `/api/sync-sheets`                  | `src/pages/api/sync-sheets.ts`                    | POST      | Miembro/dueño/staff   | [ADR-005](./decisions/ADR-005-sheets-csv.md)       | `curl -X POST -b cookies.txt localhost:4321/api/sync-sheets -d '{"url":"..."}'`                                          |
| `/api/export-excel`                 | `src/pages/api/export-excel.ts`                   | GET, POST | Sesión + miembro      | [DATA-DICTIONARY](./DATA-DICTIONARY.md)            | `curl -OJ -b cookies.txt localhost:4321/api/export-excel`                                                                |
| `/api/export-csv`                   | `src/pages/api/export-csv.ts`                     | GET       | Sesión + miembro      | [DATA-DICTIONARY](./DATA-DICTIONARY.md)            | `curl -OJ -b cookies.txt localhost:4321/api/export-csv`                                                                  |
| `/api/weather`                      | `src/pages/api/weather.ts`                        | GET       | Pública               | [ADR-007](./decisions/ADR-007-bypass-siata.md)     | `curl 'localhost:4321/api/weather?lat=6.2442&lon=-75.5812'`                                                              |
| `/api/aqi`                          | `src/pages/api/aqi.ts`                            | GET       | Pública               | [ARCHITECTURE](./ARCHITECTURE.md)                  | `curl 'localhost:4321/api/aqi?lat=6.2442&lon=-75.5812'`                                                                  |
| `/api/siata`                        | `src/pages/api/siata.ts`                          | GET       | Sesión                | [ADR-004](./decisions/ADR-004-proxy-siata-dual.md) | `curl -b cookies.txt localhost:4321/api/siata`                                                                           |
| `/api/gallery/upload`               | `src/pages/api/gallery/upload.ts`                 | POST      | Sesión                | [COMPONENTS](./COMPONENTS.md)                      | `curl -X POST -b cookies.txt -F 'file=@foto.jpg' localhost:4321/api/gallery/upload`                                      |
| `/api/gallery/:id/file`             | `src/pages/api/gallery/[id]/file.ts`              | GET       | Sesión                | [COMPONENTS](./COMPONENTS.md)                      | `curl -i -b cookies.txt localhost:4321/api/gallery/12/file`                                                              |
| `/api/trips-diagnosis`              | `src/pages/api/trips-diagnosis.ts`                | GET       | Pública               | [CAMERA-ML](./CAMERA-ML.md)                        | `curl -i localhost:4321/api/trips-diagnosis`                                                                             |
| `/api/trips-diagnosis`              | `src/pages/api/trips-diagnosis.ts`                | POST      | Pública               | [CAMERA-ML](./CAMERA-ML.md)                        | `curl -X POST -F 'file=@hoja.jpg' localhost:4321/api/trips-diagnosis`                                                    |
