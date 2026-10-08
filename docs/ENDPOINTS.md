# Endpoints de la API

> Fuente de verdad: `src/pages/api/` + `auth.config.ts`.
> Última revisión: octubre 2026. Formato: JSON salvo `export-excel` (binario `.xlsx`).

Base URL local: `http://localhost:4321`. Todos responden `Content-Type: application/json` salvo indicación.

---

## Auth — `POST /api/auth/register`

Crea un usuario con contraseña hasheada (bcrypt, salt 10 rondas). Validación **Zod Zero Trust** (`RegisterSchema`): `name` mín. 2, `email` formato válido (opcional), `phone` (opcional), `birthDate` (opcional), `password` mín. 6 (mensaje dice 8); `refine` exige al menos email o teléfono. Primer error Zod en `message` (400).

**Archivo:** `src/pages/api/auth/register.ts` · **Auth:** no requerida.

**Request body (JSON):**

```json
{
  "name": "Juan Pérez",
  "email": "juan@correo.com",
  "phone": "3001234567",
  "birthDate": "1990-05-01",
  "password": "secreto123"
}
```

| Campo       | Requerido                         | Reglas (Zod + lógica)                                    |
| :---------- | :-------------------------------- | :------------------------------------------------------- |
| `name`      | Sí                                | Zod `min(2)` → `El nombre completo es obligatorio.`      |
| `email`     | Uno de `email`/`phone` (`refine`) | Zod `email()`; único case-insensitive. Acepta `""`.      |
| `phone`     | Uno de `email`/`phone`            | Dígitos `+?7–15` (normalizado); único. Acepta `""`.      |
| `birthDate` | No                                | `YYYY-MM-DD` real, no futura. Acepta `""`.               |
| `password`  | Sí                                | Zod `min(6)` (mensaje dice 8); cliente exige **≥ 8**.    |
| `role`      | —                                 | **Ignorado**: el servidor inserta siempre `'Campesino'`. |

**Respuestas:**

- `201` → `{ "message": "Cuenta creada exitosamente.", "user": { id, name, email, phone, birth_date, role } }`
- `400` → `{ message }` (nombre obligatorio / contacto obligatorio / email o celular inválido o duplicado / fecha inválida / contraseña corta).
- `500` → `{ message: "Error al registrar la cuenta en la base de datos.", error }`

```bash
curl -X POST http://localhost:4321/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Prueba","email":"prueba@correo.com","password":"secreto123"}'
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

| Ruta                                  | Uso                                                                                        |
| :------------------------------------ | :----------------------------------------------------------------------------------------- |
| `GET /api/auth/signin`                | Página/flujo de login Auth.js                                                              |
| `POST /api/auth/callback/credentials` | Login email+contraseña (valida contra `users` con bcrypt; acepta email, nombre o teléfono) |
| `GET/POST /api/auth/callback/google`  | OAuth Google (`GOOGLE_CLIENT_ID/SECRET`)                                                   |
| `GET /api/auth/session`               | Sesión actual (incluye `user.role` del JWT)                                                |
| `POST /api/auth/signout`              | Cierre de sesión                                                                           |

---

## Datos — `GET /api/siata` (proxy, actualmente sin consumidores internos)

Evita CORS consultando SIATA desde el servidor con timeout de 3 s.

**Archivo:** `src/pages/api/siata.ts` · **Auth:** no requerida · **Query params:** ninguno.

> ⚠️ Desde `efed143`, `fetchWeatherData()` **ya no llama a este proxy** (SIATA fuera de línea; se usa Open-Meteo directo + fallback offline). El endpoint sigue vivo pero sin consumidores internos. Ver ADR-007.

- `200` → JSON tal cual de `http://siata.gov.co:8089/estacionesTemperatura/20` (+ `Access-Control-Allow-Origin: *`).
- `500` → `{ error: "No se pudo obtener la información del SIATA", details }` (caído, timeout/abort o HTTP ≠ 2xx).

```bash
curl http://localhost:4321/api/siata
```

---

## Datos — `POST /api/sync-sheets`

Sincroniza mediciones desde una URL pública de Google Sheets/CSV. **Parsea y devuelve los registros; no los persiste en PostgreSQL** (el cliente los mantiene en memoria).

**Archivo:** `src/pages/api/sync-sheets.ts` · **Auth:** no verificada en el handler (llamar solo desde páginas con sesión). Body validado con **Zod** (`SyncRequestSchema`: `url` debe ser URL; si no, `400 { success:false, error, details }`).

**Request body:**

```json
{ "url": "https://docs.google.com/spreadsheets/d/TU_ID/edit#gid=0" }
```

El servidor normaliza la URL a `export?format=csv` (soporta `/d/e/` publicados, `/edit#gid=`, `/pub`, `/export`), descarga con `User-Agent: Macollo-Greenhouse-Sync/2.0` y parsea CSV (delimitador auto: `,`/`;`/tab, comillas respetadas, decimales con coma).

**Columnas reconocidas** (búsqueda flexible, sin tildes): `ID_planta` (`T0-P1`, `TO-P2`… con `resolvePlantCoordinates`), `fecha` (YYYY-MM-DD, DD/MM/YYYY o serial Excel), `responsable`, `T_Ext_C`, `T_Int_C`, `humedad_Pct`, `T_Planta_C` (= temp suelo), `Ph`, `ALtura_cm`, + opcionales `fase`, `productividad`, `sanidad`, `observacion`.

**Defaults y reglas:** pH clamp 0–14 (def. 6.4); `tempInterna` = `T_Int_C`; humedad clamp 0–100 (def. 65); crecimiento derivado de altura; sanidad derivada de pH si no viene (`<5.2|>7.8` Crítica, `<5.8|>7.2` Vulnerable, `6.2–6.7` Excelente); **2026-09-29/30 → `tempSuelo: null`** (sensor no tomado); responsable def. `Equipo de Campo`.

**Respuestas:**

- `200` → `{ success: true, count, records: MetricRecord[], message }`
- `400` → `{ success: false, error }` (sin URL).
- `422` → HTTP externo ≠ 2xx (pide compartir como _"Cualquier persona con el enlace"_ o _"Publicado en la web como CSV"_) / CSV vacío / sin registros válidos.
- `500` → `{ success: false, error, details }`

---

## Datos — `GET | POST /api/export-excel`

Genera el reporte `.xlsx` con ExcelJS (3 hojas). **Auth:** no verificada en el handler (llamar solo desde páginas con sesión).

**Archivo:** `src/pages/api/export-excel.ts`.

- `GET /api/export-excel` → usa la matriz del servidor (`getAllPlantsGrid()`).
- `POST /api/export-excel` → body validado con **Zod** (`ExportRequestSchema`: `plants` array no vacío); si inválido o vacío, igual que GET (fallback a matriz del servidor, no 400).

**Respuesta `200` (binario):**

```http
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="Macollo_Mediciones_Invernadero_YYYY-MM-DD.xlsx"
```

Hojas: **1. Mediciones de Hoy** (16 columnas Fila→Observaciones, zebra, colores por sanidad, autofiltro, fila `PROMEDIO GENERAL` con fórmulas `AVERAGE`); **2. Historial Completo** (14 columnas, orden fecha desc); **3. Rangos Agronómicos** (pH 6.0–6.8, T_int 22–26 °C, T_ext 18–24 °C, T_suelo 19–22 °C, crecimiento 75–100 %, acciones recomendadas).

- `500` → `{ error: "Error al exportar Excel", details }`

```bash
curl -OJ http://localhost:4321/api/export-excel
curl -X POST http://localhost:4321/api/export-excel \
  -H 'Content-Type: application/json' -d '{"plants":[]}' -o reporte.xlsx
```

---

## Códigos de error comunes

| Código | Significado en esta API                                                     |
| :----- | :-------------------------------------------------------------------------- |
| `400`  | Body inválido o validación (email/teléfono/fecha/contraseña/código).        |
| `404`  | Cuenta no encontrada (forgot/reset).                                        |
| `422`  | Sheets inaccesible o sin datos (revisar permisos de lectura del documento). |
| `500`  | Fallo interno (DB, SIATA, ExcelJS). Trae `details`/`error` para depurar.    |
