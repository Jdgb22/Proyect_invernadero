# Endpoints de la API

> Fuente de verdad: `src/pages/api/` + `auth.config.ts`.
> Última revisión: octubre 2026. Formato: JSON salvo `export-excel` (binario `.xlsx`).

Base URL local: `http://localhost:4321`. Todos responden `Content-Type: application/json` salvo indicación.

> **Auth**: las rutas de datos (`/api/farms*`, `/api/farm*`, `/api/invitations*`, `/api/admin*`, `/api/sync-sheets`, `/api/export-excel`, `/api/siata`) exigen sesión (middleware → `401`) **y** revalidan permisos de finca dentro del handler. Las rutas públicas se limitan a `/api/auth/*`. Ver [ROUTES](./ROUTES.md) y [AUTH](./AUTH.md).

---

## Auth — `POST /api/auth/register`

Crea un usuario con contraseña hasheada (bcrypt, salt 10 rondas). Validación **Zod Zero Trust** (`RegisterSchema`): `name` mín. 2, `email` formato válido (opcional), `phone` (opcional), `birthDate` (opcional), `password` **mín. 8**, `accountType` ∈ {`Campesino` (def.), `Agropecuario`}, `fincaNombre` opcional (**obligatorio en la práctica para Agropecuario**); `refine` exige al menos email o teléfono. Primer error Zod en `message` (400). **No acepta `fincaCode`**: las invitaciones solo se canjean por `POST /api/invitations/use`.

**Archivo:** `src/pages/api/auth/register.ts` · **Auth:** no requerida.

**Request body (JSON):**

```json
{
  "name": "Juan Pérez",
  "email": "juan@correo.com",
  "phone": "3001234567",
  "birthDate": "1990-05-01",
  "password": "secreto123",
  "accountType": "Agropecuario",
  "fincaNombre": "Finca La Esperanza"
}
```

| Campo         | Requerido                         | Reglas (Zod + lógica)                                                                  |
| :------------ | :-------------------------------- | :------------------------------------------------------------------------------------- |
| `name`        | Sí                                | Zod `min(2)` → `El nombre completo es obligatorio.`                                    |
| `email`       | Uno de `email`/`phone` (`refine`) | Zod `email()`; único case-insensitive. Acepta `""`.                                    |
| `phone`       | Uno de `email`/`phone`            | Dígitos `+?7–15` (normalizado); único. Acepta `""`.                                    |
| `birthDate`   | No                                | `YYYY-MM-DD` real, no futura. Acepta `""`.                                             |
| `password`    | Sí                                | Zod `min(8)` (servidor y cliente).                                                     |
| `accountType` | No                                | `Campesino` (def.) o `Agropecuario`. Determina el rol del usuario. Staff no permitido. |
| `fincaNombre` | Agropecuario (implícito)          | Nombre de su primera finca; obligatorio si `accountType=Agropecuario`.                 |
| `role`        | —                                 | **Ignorado**: usar `accountType`; nunca asigna roles staff.                            |

**Respuestas:**

- `201` → `{ "message": "Cuenta creada y finca \"X\" lista." | "Cuenta creada exitosamente.", "user": { id, name, email, phone, birth_date, role }, "fincaCreada": { id, nombre } | null, "avisoCreacion": "…no se pudo crear la finca…" | null }`
- `400` → `{ message }` (nombre obligatorio / contacto obligatorio / email o celular inválido o duplicado / fecha inválida / contraseña corta / Agropecuario sin `fincaNombre`).
- `500` → `{ message: "Error al registrar la cuenta. Intenta de nuevo más tarde." }`

```bash
curl -X POST http://localhost:4321/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Prueba","email":"prueba@correo.com","password":"secreto123"}'
```

---

## Auth — `POST /api/auth/check-availability`

Comprueba si un correo y/o celular ya están registrados, para que el asistente de registro (`Welcome.astro`) valide el paso 1 antes de continuar. No requiere sesión.

**Archivo:** `src/pages/api/auth/check-availability.ts` · **Auth:** no requerida.

**Request body (JSON):** `{ "email"?: string, "phone"?: string }` (Zod `Schema`: ambos opcionales, con tope de longitud).

**Respuestas:**

- `200` → `{ "emailTaken": boolean, "phoneTaken": boolean }`. `phoneTaken` solo se evalúa si el celular normalizado cumple `+?7–15` dígitos.
- `400` → `{ message: "Datos no válidos." }`
- `500` → `{ message: "No se pudo verificar. Intenta de nuevo." }`

```bash
curl -X POST http://localhost:4321/api/auth/check-availability \
  -H 'Content-Type: application/json' \
  -d '{"email":"prueba@correo.com"}'
```

---

## Auth — `POST /api/auth/forgot-password`

Genera un **código de 6 dígitos válido 15 minutos**, lo guarda en `verification_token` y lo envía por email (Nodemailer/SMTP) o SMS.

**Archivo:** `src/pages/api/auth/forgot-password.ts` · **Auth:** no requerida.

**Request body:**

```json
{ "identifier": "juan@correo.com" }
```

`identifier` = email o celular registrado (se busca por `LOWER(email)` o `phone` exacto).

**Respuestas:**

- `200` → `{ message, destinationType: "correo electrónico" | "número celular", maskedTarget, identifier, sent }`. Si SMTP no está configurado, `sent: false` pero el código queda guardado (ver logs del servidor en dev).
- `400` → `{ message: "Por favor ingresa tu correo electrónico o número de celular." }`
- `404` → `{ message: "No encontramos ninguna cuenta asociada…" }`
- `500` → `{ message: "Error interno al procesar la solicitud.", error }`

---

## Auth — `POST /api/auth/reset-password`

Valida el código y actualiza la contraseña (bcrypt), luego invalida el token.

**Archivo:** `src/pages/api/auth/reset-password.ts` · **Auth:** no requerida.

**Request body:**

```json
{
  "identifier": "juan@correo.com",
  "code": "482913",
  "newPassword": "nuevoSecreto123"
}
```

**Respuestas:**

- `200` → `{ message: "¡Tu contraseña ha sido restablecida…!", user: { id, name, role } }`
- `400` → campos obligatorios / `newPassword < 6` / código incorrecto o expirado (`expires > NOW()`).
- `404` → usuario no encontrado para actualizar.
- `500` → `{ message: "Error al restablecer la contraseña.", error }`

---

## Auth.js — `/api/auth/*`

Rutas automáticas de `auth-astro` (proveedores **Credentials** + **Google**, sesión **JWT**, adaptador Postgres). Ver [AUTH](./AUTH.md).

| Ruta                                  | Uso                                                                               |
| :------------------------------------ | :-------------------------------------------------------------------------------- |
| `GET /api/auth/signin`                | Página/flujo de login Auth.js                                                     |
| `POST /api/auth/callback/credentials` | Login email+contraseña (valida contra `users` con bcrypt; acepta email o celular) |
| `GET/POST /api/auth/callback/google`  | OAuth Google (`GOOGLE_CLIENT_ID/SECRET`)                                          |
| `GET /api/auth/session`               | Sesión actual (incluye `user.role` del JWT)                                       |
| `POST /api/auth/signout`              | Cierre de sesión                                                                  |

---

## Datos — `GET /api/siata` (proxy, actualmente sin consumidores internos)

Evita CORS consultando SIATA desde el servidor con timeout de 3 s.

**Archivo:** `src/pages/api/siata.ts` · **Auth:** sesión requerida (middleware → `401`) · **Query params:** ninguno.

> ⚠️ Desde `efed143`, `fetchWeatherData()` **ya no llama a este proxy** (SIATA fuera de línea; se usa Open-Meteo directo + fallback offline). El endpoint sigue vivo pero sin consumidores internos. Ver ADR-007.

- `200` → JSON tal cual de `http://siata.gov.co:8089/estacionesTemperatura/20` (+ `Access-Control-Allow-Origin: *`).
- `500` → `{ error: "No se pudo obtener la información del SIATA", details }` (caído, timeout/abort o HTTP ≠ 2xx).

```bash
curl http://localhost:4321/api/siata
```

---

## Datos — `POST /api/sync-sheets`

Sincroniza mediciones desde una URL pública de Google Sheets/CSV. **Parsea los registros y los persiste en `lecturas` de la finca activa** (además de devolverlos al cliente, que los usa para pintar el tablero).

**Archivo:** `src/pages/api/sync-sheets.ts` · **Auth:** sesión + **dueño de la finca activa** (`rol_finca = 'dueno'`; cookie `finca_activa`; middleware → `401`). Los miembros (p. ej. un agronomo invitado) y el staff reciben `403`. Sin finca activa → `400 { error }`. Body validado con **Zod** (`SyncRequestSchema`: `url` debe ser URL; si no, `400 { success:false, error, details }`). Tasa limitada por IP en el middleware.

**Request body:**

```json
{ "url": "https://docs.google.com/spreadsheets/d/TU_ID/edit#gid=0" }
```

El servidor normaliza la URL a `export?format=csv` (soporta `/d/e/` publicados, `/edit#gid=`, `/pub`, `/export`), descarga con `User-Agent: Macollo-Greenhouse-Sync/2.0` y parsea CSV (delimitador auto: `,`/`;`/tab, comillas respetadas, decimales con coma).

**Columnas reconocidas** (búsqueda flexible, sin tildes): `ID_planta` (`T0-P1`, `TO-P2`… con `resolvePlantCoordinates`), `fecha` (YYYY-MM-DD, DD/MM/YYYY o serial Excel), `responsable`, `T_Ext_C`, `T_Int_C`, `humedad_Pct`, `T_Planta_C` (= temp suelo), `Ph`, `ALtura_cm`, + opcionales `fase`, `productividad`, `sanidad`, `observacion`.

**Defaults y reglas:** pH clamp 0–14 (def. 6.4); `tempInterna` = `T_Int_C`; humedad clamp 0–100 (def. 65); crecimiento derivado de altura; sanidad derivada de pH si no viene (`<5.2|>7.8` Crítica, `<5.8|>7.2` Vulnerable, `6.2–6.7` Excelente); `tempSuelo: null` cuando no se tomó la medida; responsable def. `Equipo de Campo`.

**Respuestas:**

- `200` → `{ success: true, count, guardadas, records: MetricRecord[], message }` (`guardadas` = filas insertadas/actualizadas en `lecturas`; deduplicadas por `(finca, planta, fecha, hora)`).
- `400` → `{ success: false, error }` (sin URL, o **sin finca activa**).
- `401/403` → sin sesión / sin permiso (solo el **dueño** de la finca puede conectar y sincronizar Sheets).
- `422` → HTTP externo ≠ 2xx (pide compartir como _"Cualquier persona con el enlace"_ o _"Publicado en la web como CSV"_) / CSV vacío / sin registros válidos.
- `500` → `{ success: false, error, details }`

---

## Galería

| Ruta                     | Método | Descripción                                                                                                                        | Auth   | Implementación                       |
| :----------------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------- | :----- | :----------------------------------- |
| `/api/gallery/upload`    | POST   | Sube foto (form-data `file`) a `public/uploads/gallery/`, crea registro en `photos` con `finca_id` de la finca activa y `user_id`. | Sesión | `src/pages/api/gallery/upload.ts`    |
| `/api/gallery/[id]/file` | GET    | Sirve imagen por ID. Solo accesible si la foto pertenece a la finca activa del usuario. Cache `immutable`.                         | Sesión | `src/pages/api/gallery/[id]/file.ts` |

## Diagnóstico Trips (IA)

Este proyecto consume la API externa [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api) (FastAPI + BioCLIP 2.5) para la detección de trips. Consultar su documentación para detalles de endpoints, modelos y despliegue.

| Ruta                   | Método | Descripción                                                                                                                                                                                                                                  | Auth            | Implementación                     |
| :--------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- | :--------------------------------- |
| `/api/trips-diagnosis` | GET    | Health check hacia `${ML_API_URL}/api/health` (servicio [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api)).                                                                                                                | Sesión opcional | `src/pages/api/trips-diagnosis.ts` |
| `/api/trips-diagnosis` | POST   | Reenvía imagen/form-data al servicio ML (`${ML_API_URL}/api/predict`) de [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api). Al capturar o subir desde el modal se guarda automáticamente en la galería de la finca activa. | Sesión opcional | `src/pages/api/trips-diagnosis.ts` |

## Datos — `GET | POST /api/export-excel`

Genera el reporte `.xlsx` con ExcelJS (3 hojas) de la **finca activa**.

**Archivo:** `src/pages/api/export-excel.ts` · **Auth:** sesión + miembro/staff de la finca activa (middleware → `401`; sin finca activa → `400`).

- `GET` / `POST /api/export-excel` → carga las lecturas de la finca activa desde PG (`getLecturasByFinca`) y arma `PlantMatrixItem[]` (`buildPlantsGridFromRecords`). El body se ignora (el servidor no acepta plantas enviadas por el cliente).

**Respuesta `200` (binario):**

```http
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="<Finca>_Mediciones_YYYY-MM-DD.xlsx"
```

Hojas: **1. Mediciones de Hoy** (16 columnas Fila→Observaciones, zebra, colores por sanidad, autofiltro, fila `PROMEDIO GENERAL` con fórmulas `AVERAGE`); **2. Historial Completo** (14 columnas, orden fecha desc); **3. Rangos Agronómicos** (pH 6.0–6.8, T_int 22–26 °C, T_ext 18–24 °C, T_suelo 19–22 °C, crecimiento 75–100 %, acciones recomendadas).

- `500` → `{ error: "Error al exportar Excel", details }`

```bash
curl -OJ http://localhost:4321/api/export-excel
curl -X POST http://localhost:4321/api/export-excel \
  -H 'Content-Type: application/json' -d '{"plants":[]}' -o reporte.xlsx
```

---

## Fincas y invitaciones

Todas exigen sesión y revalidan membresía/rol dentro del handler. Niveles: `staff` (Superadmin/Admin, acceso total), `dueno`, `miembro`, `none`.

| Ruta                                | Método   | Descripción                                                                                | Nivel               |
| :---------------------------------- | :------- | :----------------------------------------------------------------------------------------- | :------------------ |
| `/api/farms`                        | GET      | Lista fincas visibles (staff: todas)                                                       | Sesión              |
| `/api/farms`                        | POST     | Crea finca `{ nombre, descripcion?, ubicacion? }` + matriz 20 plantas (máx. 5 por usuario) | Agropecuario/staff  |
| `/api/farms/:id`                    | GET      | Detalle (miembros, invitaciones, plantas)                                                  | Miembro/staff       |
| `/api/farms/:id`                    | PATCH    | Edita `{ nombre?, descripcion?, ubicacion? }`                                              | Dueño/staff         |
| `/api/farms/:id`                    | DELETE   | **Hard delete** (borra finca y lecturas)                                                   | **Solo Superadmin** |
| `/api/farms/:id/archive`            | POST     | `{ activa }` archiva/restaura                                                              | Dueño/staff         |
| `/api/farms/:id/members`            | GET      | Lista miembros                                                                             | Dueño/staff         |
| `/api/farms/:id/members?userId=N`   | DELETE   | Expulsa (no al dueño)                                                                      | Dueño/staff         |
| `/api/farms/:id/invitations`        | GET      | Lista invitaciones                                                                         | Dueño/staff         |
| `/api/farms/:id/invitations`        | POST     | Crea `{ expiraEn, usosMaximos }` → código nanoid de 8 chars (p.ej. `K7M4XP9Q`)             | Dueño/staff         |
| `/api/farms/:id/invitations/:invId` | DELETE   | Revoca                                                                                     | Dueño/staff         |
| `/api/farms/:id/readings`           | GET      | Lecturas de la finca (`MetricRecord[]`)                                                    | Miembro/staff       |
| `/api/farms/:id/readings`           | POST     | `{ records }` → upsert en `lecturas`                                                       | Miembro/staff       |
| `/api/farms/leave`                  | POST     | `{ fincaId }` abandona (si no eres dueño)                                                  | Miembro             |
| `/api/farms/active`                 | GET/POST | Lee/fija cookie `finca_activa` (alias retrocompatible `/api/farm/active`)                  | Sesión              |
| `/api/invitations/use`              | POST     | `{ code }` canjea (rate-limited, atómico)                                                  | Sesión              |
| `/api/invitations/peek`             | GET      | `?code=` vista previa (nombre, expiración, usos)                                           | Sesión              |
| `/api/admin/users`                  | GET      | `?q=` lista usuarios + `fincas_count`                                                      | Superadmin          |
| `/api/admin/users/:id`              | PATCH    | `{ role }` cambia rol                                                                      | Superadmin          |
| `/api/admin/users/:id`              | DELETE   | Elimina cuenta (no el último Superadmin, ni a uno mismo, ni a un dueño de finca)           | Superadmin          |
| `/api/export-csv`                   | GET      | Descarga archivo `.csv` con el historial agronómico de la finca activa                     | Miembro/staff       |
| `/api/weather`                      | GET      | `?lat=&lon=&fallback=` Proxy hacia Open-Meteo (pronóstico y condiciones actuales)          | Sesión              |
| `/api/aqi`                          | GET      | `?lat=&lon=` Proxy hacia WAQI (Índice de Calidad del Aire)                                 | Sesión              |

Códigos: `400` body/acción inválida · `403` sin permiso · `404` inexistente · `409` ya miembro · `410` invitación revocada/expirada/agotada.

---

## Códigos de error comunes

| Código | Significado en esta API                                                     |
| :----- | :-------------------------------------------------------------------------- |
| `400`  | Body inválido o validación (email/teléfono/fecha/contraseña/código).        |
| `404`  | Cuenta no encontrada (forgot/reset).                                        |
| `422`  | Sheets inaccesible o sin datos (revisar permisos de lectura del documento). |
| `500`  | Fallo interno (DB, SIATA, ExcelJS). Trae `details`/`error` para depurar.    |
