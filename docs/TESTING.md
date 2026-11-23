# Plan de Pruebas — Macollo

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-17**.
>
> **Estado explícito: NO existe suite automatizada.** A la fecha de verificación no hay archivos `*.test.*` / `*.spec.*` ni configuraciones `vitest.config.*` / `playwright.config.*` en el repositorio, y `package.json:8-15` no define los scripts `test`, `check` ni `e2e`. Lo único instalado con fines de comprobación es `@astrojs/check` (`package.json:48`), invocable con `pnpm exec astro check`. La automatización con Vitest está **pendiente** en `docs/ROADMAP.md:12`; este documento es, por tanto, un plan de regresión **manual y verificable** más un diseño de automatización no implementado. Requisitos en `docs/REQUIREMENTS.md`.

---

## 1. Estrategia y responsabilidades

| Nivel               | Qué cubre                                                                                             | Cómo se ejecuta hoy                                                              | Objetivo futuro                                 |
| :------------------ | :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- | :---------------------------------------------- |
| Estático            | Tipos, build SSR, secretos en el diff                                                                 | `pnpm build`; `pnpm exec astro check`; `git diff --check` y revisión de secretos | Pipeline de CI (no configurado en el repo)      |
| Unitario            | `resolvePlantCoordinates`, `parseCSV`, schemas Zod, `isValleDeAburra`, `getWeatherEmoji`, `rateLimit` | Manual / por inspección de código                                                | Vitest (`docs/ROADMAP.md:12`, **no instalado**) |
| Integración         | Endpoints con `curl`, headers, rate-limit, DB de prueba                                               | Manual con §§3–4                                                                 | DB efímera + aserciones SQL                     |
| E2E manual          | RF-01…RF-18 en navegador (§2)                                                                         | Checklist de release                                                             | No hay herramienta E2E en el repo               |
| Regresión de deploy | Verificación post-deploy de `docs/DEPLOYMENT.md` §6                                                   | `curl` + logs                                                                    | Repetir en cada preview                         |

**Regla de evidencia:** todo caso debe dejar rastro en el PR: ID del caso, entorno (local/preview/production), código HTTP observado y, si aplica, consulta SQL o salida de `curl`. Sin evidencia, el caso no cuenta como ejecutado.

---

## 2. Casos E2E manuales (navegador)

Los casos TEST-01…TEST-14 se conservan del plan anterior y se amplían con casos derivados del código verificado el 2026-11-23 (TEST-15 en adelante).

| ID      | RF / código                                                  | Pasos                                                                                                        | Esperado                                                                                                                                                                                                            |
| :------ | :----------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TEST-01 | RF-01 · `src/pages/api/auth/register.ts`                     | `/` → Registrarse: nombre + email nuevo + clave ≥ 8 → Crear Cuenta                                           | `201` y mensaje de cuenta creada; vuelve al login con email precargado (`docs/ENDPOINTS.md`)                                                                                                                        |
| TEST-02 | RF-01                                                        | Registrar el mismo email dos veces                                                                           | `400` con mensaje guiado (no filtra otros datos)                                                                                                                                                                    |
| TEST-03 | RF-02 · `auth.config.ts:69-168`                              | Login correcto / incorrecto con email y con teléfono                                                         | Entra a `/` / `Credenciales incorrectas…`. El login **no busca por nombre** (`auth.config.ts:93-103`)                                                                                                               |
| TEST-04 | RF-03 · `auth.config.ts:58-68`                               | Continuar con Google                                                                                         | Sesión creada y entra a `/`; callback autorizado en Google                                                                                                                                                          |
| TEST-05 | RF-05 · `notifications.ts:21-127`                            | Forgot con email válido → código de 6 dígitos → reset + login                                                | Código válido 15 min; mensaje enmascarado; `identifier` sin enmascarar; reúso del token falla                                                                                                                       |
| TEST-06 | RF-06/07                                                     | Dashboard: contar tarjetas y abrir `T0-C1`                                                                   | 20 tarjetas de la matriz 4×5; modal con pH, temperaturas, crecimiento, productividad y sanidad                                                                                                                      |
| TEST-07 | RF-06 · `docs/DEMO-DATA.md`                                  | Importar el CSV maestro de 20 plantas en Historial → volver a `/`                                            | Sin tarjetas grises; semáforo coherente con umbrales de pH                                                                                                                                                          |
| TEST-08 | RF-08/09                                                     | 3D + clima: rotar/zoom; denegar geolocalización                                                              | Escena activa; clima de Medellín y AQI visibles; sin error de permiso                                                                                                                                               |
| TEST-09 | RF-10 · `/metrics`                                           | Revisar promedios y badges                                                                                   | Rangos y peor fila coherentes con `lecturas` de la finca activa                                                                                                                                                     |
| TEST-10 | RF-11/13 · `/history`                                        | Como **dueño**: cambiar fecha y pegar URL de Sheets pública/privada. Como **miembro/staff**: buscar el botón | Dueño: conteo importado / error `422` guiado. Miembro/staff: botón oculto y `403` si llama a la API (`docs/CHANGELOG.md:31`)                                                                                        |
| TEST-11 | RF-14                                                        | Exportar desde Métricas e Historial                                                                          | `.xlsx` con hojas de promedios; abre en Excel/Sheets                                                                                                                                                                |
| TEST-12 | RF-15–18 · `/settings`                                       | Cambiar nombre/tema/frecuencia; provocar toast                                                               | Persiste el nombre; tema aplicado; toast visible                                                                                                                                                                    |
| TEST-13 | RNF-04 · `middleware.ts:9-27,129-159`                        | Sin sesión abrir `/metrics`, `/history`, `/settings`, `/farms`, `/gallery`, `/admin` y `/api/farms`          | Páginas → `3xx` a `/?desde=…`; APIs → `401 {"message":"No autenticado."}`                                                                                                                                           |
| TEST-14 | RNF-05                                                       | Bloquear `api.open-meteo.com` en DevTools y recargar                                                         | Widget con fallback offline `22 °C / 60 %` (`weather.ts:48-60`), sin error visible                                                                                                                                  |
| TEST-15 | `middleware.ts:39-74`                                        | `curl -I` a la portada en HTTPS                                                                              | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, CSP y `Strict-Transport-Security`                                                                      |
| TEST-16 | `astro.config.mjs:13`                                        | Enviar `POST /api/trips-diagnosis` con `multipart/form-data` sin `Origin` y luego con `Origin = $BASE`       | Sin `Origin` → `403`; con `Origin` y sin archivo → `400`. Si el navegador hace un POST legítimo y da `403`, revisar proxy/dominio                                                                                   |
| TEST-17 | `middleware.ts:29-37`; `rateLimit.ts:23-58`                  | En **preview**, 11 POST seguidos a `/api/auth/register` con body inválido                                    | Los primeros dan `400` (llegan al handler) y el 11.º da `429` con `Retry-After`                                                                                                                                     |
| TEST-18 | `trips-diagnosis.ts:175-230`                                 | `GET /api/trips-diagnosis` con Cloud Run en reposo                                                           | `200 {"status":"online",…}`; si `model_loaded === false` se intenta `/api/warmup` y `warming_triggered` es `true` solo si ese POST respondió `ok` (`:187-210`); si el servicio está caído, `503` con mensaje de URL |
| TEST-19 | `trips-diagnosis.ts:98-173`                                  | Subir imagen válida desde el modal «Escanear Trips»                                                          | `POST` reenvía `file`, `crop` y `profile` a Cloud Run; si hay `401`, renueva cookie y reintenta; si falla la conexión → `502` con mensaje claro. Sin 503 artificiales (`git log -1`: `4e977f5`)                     |
| TEST-20 | `astro.config.mjs:19`; `trips-diagnosis.ts:7,21-26`          | Revisar despliegue y logs de la función ML                                                                   | `maxDuration = 60` activo; la petición no debe morir antes por el límite de Vercel. Las constantes de 50/45 s **no** son timeouts aplicados a `/api/predict`                                                        |
| TEST-21 | `finca_miembros`, cookie `finca_activa` (`docs/DATABASE.md`) | Crear dos fincas con usuarios distintos, entrar con membresía en una sola y consultar métricas/export        | No se filtran `lecturas` ni fotos de la otra finca; cambiar de finca cambia el dataset                                                                                                                              |
| TEST-22 | `scripts/migrate-neon.mjs:133-141`; commit `03f8b97`         | Verificar columna `responsable` y hacer una importación/lectura con responsable                              | `SELECT responsable, responsable_id FROM lecturas LIMIT 5;` devuelve valores coherentes; la UI muestra el responsable cuando aplica                                                                                 |
| TEST-23 | `auth.config.ts:42-52,187-204`                               | En staging con `SESSION_MAX_AGE_HOURS=1`, iniciar sesión y esperar > 1 h                                     | La sesión se invalida de forma absoluta aunque se siga usando (no basta con refrescar el JWT). No apto para release de pocos minutos                                                                                |
| TEST-24 | `siata.ts:11-32`; `aqi.ts:32-39`                             | Llamar a `/api/siata` sin sesión y a `/api/aqi` con WAQI caído                                               | `401` / `200` con AQI 28; `/api/siata` con sesión falla en ≤ 3 s si el proveedor no responde                                                                                                                        |
| TEST-25 | `gallery/upload.ts:6,12-80`                                  | Subir foto con sesión y `Origin` válido; luego sin sesión                                                    | Con sesión: `photos` gana una fila y `url=/uploads/gallery/<uuid>.<ext>`. Sin sesión: `401`. Verificar persistencia del archivo en el entorno serverless                                                            |
| TEST-26 | `auth.config.ts:21-22`; `docs/CHANGELOG.md:33`               | Promover a un usuario con `UPDATE users SET role = 'Admin'…` y re-loguear                                    | El panel muestra el rol real; la autorización sensible se relee de BD                                                                                                                                               |
| TEST-27 | `seed-admin.mjs:15-26`; `seed-demo.mjs:15-20`                | Ejecutar `ADMIN_PASSWORD=corta node scripts/seed-admin.mjs` y `node scripts/seed-demo.mjs` en BD de prueba   | El primero termina con `ADMIN_PASSWORD debe tener al menos 8 caracteres`; el segundo genera y printa una contraseña aleatoria si no se provee                                                                       |
| TEST-28 | `scripts/migrate-neon.mjs:137`                               | Importar dos veces el mismo CSV con igual finca/planta/fecha/hora                                            | No hay duplicados: `SELECT … HAVING count(*) > 1` da 0 filas                                                                                                                                                        |
| TEST-29 | `package.json:11,48`                                         | `pnpm build` y `pnpm exec astro check`                                                                       | Build verde; cualquier error de tipos conocido se registra como issue, no se ignora en silencio                                                                                                                     |

> TEST-17 satura un contador en memoria; ejecutarlo **solo en preview** y esperar 300 s antes de repetirlo desde la misma IP (`middleware.ts:31-36`).

---

## 3. Casos de API con `curl`

Base: usar la URL de preview. `$BASE` debe ser el origen exacto (sin barra final) para que `-H "Origin: $BASE"` coincida con `url.origin` en el control de Astro.

```bash
BASE=https://macollo-preview.vercel.app
EMAIL="qa+$(date +%s)@example.com"
export BASE EMAIL

# 1) Registro válido → 201; duplicado → 400
curl -sS -o /dev/null -w 'register-nuevo %{http_code}\n' -X POST -H "Origin: $BASE" \
  -H 'Content-Type: application/json' \
  -d "{\"name\":\"QA Macollo\",\"email\":\"$EMAIL\",\"password\":\"secreto123\"}" \
  "$BASE/api/auth/register"
curl -sS -o /dev/null -w 'register-dup %{http_code}\n' -X POST -H "Origin: $BASE" \
  -H 'Content-Type: application/json' \
  -d "{\"name\":\"QA Macollo\",\"email\":\"$EMAIL\",\"password\":\"secreto123\"}" \
  "$BASE/api/auth/register"

# 2) Disponibilidad de email → 200 con {emailTaken, phoneTaken}
curl -sS -w '\ncheck %{http_code}\n' -X POST -H "Origin: $BASE" \
  -H 'Content-Type: application/json' -d "{\"email\":\"$EMAIL\"}" \
  "$BASE/api/auth/check-availability"

# 3) Forgot con usuario inexistente → 404; body vacío → 400
curl -sS -o /dev/null -w 'forgot-404 %{http_code}\n' -X POST -H "Origin: $BASE" \
  -H 'Content-Type: application/json' -d '{"identifier":"nadie@example.com"}' \
  "$BASE/api/auth/forgot-password"
curl -sS -o /dev/null -w 'forgot-400 %{http_code}\n' -X POST -H "Origin: $BASE" \
  -H 'Content-Type: application/json' -d '{}' "$BASE/api/auth/forgot-password"

# 4) Rutas protegidas sin sesión → 401 (exportar y fincas)
curl -sS -o /dev/null -w 'export-anon %{http_code}\n' "$BASE/api/export-excel"
curl -sS -o /dev/null -w 'farms-anon %{http_code}\n' "$BASE/api/farms"

# 5) checkOrigin en multipart → 403 sin Origin / 400 con Origin y sin archivo
curl -sS -o /dev/null -w 'origin-out %{http_code}\n' -X POST -F 'dummy=1' "$BASE/api/trips-diagnosis"
curl -sS -o /dev/null -w 'origin-ok %{http_code}\n' -X POST -H "Origin: $BASE" -F 'dummy=1' "$BASE/api/trips-diagnosis"

# 6) Health ML → 200 online / 503 offline
curl -sS -w '\nml-health %{http_code}\n' "$BASE/api/trips-diagnosis"

# 7) Clima/AQI → 200, con fallback cuando el proveedor externo falla
curl -sS -o /dev/null -w 'weather %{http_code}\n' "$BASE/api/weather"
curl -sS -o /dev/null -w 'aqi %{http_code}\n' "$BASE/api/aqi"

# 8) SIATA: 401 sin sesión; con cookie de navegador, 200/500 en ≤3 s
curl -sS -o /dev/null -w 'siata-anon %{http_code}\n' "$BASE/api/siata"

# 9) Latencia de la portada
curl -sS -o /dev/null -w 'home %{http_code} %{time_total}s\n' "$BASE/"
```

**Matriz de códigos esperados**

| Petición                   | Esperado                       | Fuente                             |
| :------------------------- | :----------------------------- | :--------------------------------- |
| Registro nuevo / duplicado | `201` / `400`                  | `docs/ENDPOINTS.md`                |
| `check-availability`       | `200` / `400` si body inválido | `docs/ENDPOINTS.md`                |
| Forgot inexistente / vacío | `404` / `400`                  | `docs/ENDPOINTS.md`                |
| APIs protegidas anónimas   | `401`                          | `src/middleware.ts:19-27,137-147`  |
| Multiparts sin `Origin`    | `403`                          | `astro.config.mjs:13`              |
| `GET /api/trips-diagnosis` | `200` u `503`                  | `trips-diagnosis.ts:212-230`       |
| `weather` / `aqi`          | `200` (fallback incluido)      | `weather.ts:48-60`; `aqi.ts:32-39` |
| `siata` anónimo            | `401`                          | `siata.ts:5-9`                     |

> Las respuestas de `/api/export-excel`, `/api/export-csv`, `/api/sync-sheets`, `/api/invitations/*`, `/api/gallery/*` y `/api/admin/*` requieren sesión (y permisos de finca). Obtener la cookie desde un login real en el navegador; el repositorio no incluye un helper de autenticación para `curl`.

---

## 4. Aserciones de base de datos para el plan manual

Ejecutar contra la BD de preview antes y después de los casos §2–§3.

```sql
-- Registro (TEST-01/02): exactamente una fila para el correo de prueba
SELECT id, name, role, "emailVerified" FROM users WHERE email = 'qa+...';

-- Código de recuperación (TEST-05): se consume y no se reutiliza
SELECT identifier, expires FROM verification_token WHERE identifier = 'qa+...';

-- Importación idempotente (TEST-28): 0 filas duplicadas
SELECT finca_id, planta_id, fecha, hora, count(*)
FROM lecturas GROUP BY 1,2,3,4 HAVING count(*) > 1;

-- Multi-tenant (TEST-21): cada finca solo ve sus plantas
SELECT finca_id, count(*) FROM plantas GROUP BY finca_id ORDER BY finca_id;
SELECT finca_id, count(*) FROM lecturas GROUP BY finca_id ORDER BY finca_id;

-- Responsable (TEST-22)
SELECT id, fecha, responsable, responsable_id FROM lecturas ORDER BY id DESC LIMIT 5;

-- Galería (TEST-25)
SELECT id, url, finca_id, user_id, size_bytes FROM photos ORDER BY uploaded_at DESC LIMIT 5;

-- Roles (TEST-26)
SELECT id, email, role FROM users WHERE email = 'qa+...';
```

---

## 5. Automatización propuesta (NO implementada)

1. **Dependencia y script**: añadir `vitest` como devDependency y un script `"test": "vitest run"` a `package.json:8-15`. Hoy no existen (`docs/ROADMAP.md:12` lo marca como tarea abierta).
2. **Refactor previo necesario**: exportar `parseCSV`, `normalizeGoogleSheetUrl` y `extractDateAndHour` de `src/pages/api/sync-sheets.ts` y los schemas de `src/pages/api/auth/register.ts` (hoy privados) para poder probarlos sin montar la app.
3. **Primeros casos unitarios** (esqueleto ilustrativo, **no presente en el repo**):
   ```ts
   import { describe, expect, it } from "vitest";
   import { resolvePlantCoordinates } from "./plantMatrix";
   import { rateLimit } from "./rateLimit";

   describe("resolvePlantCoordinates", () => {
     it("acepta TO-P2 (letra O) como t0 columna 2", () => {
       expect(resolvePlantCoordinates("TO-P2")).toMatchObject({
         fila: "t0",
         columna: "Col 2",
         plantId: "P-02",
       });
     });
     it("mapea P-20 global a t3 columna 5", () => {
       expect(resolvePlantCoordinates("P-20")).toMatchObject({
         fila: "t3",
         columna: "Col 5",
       });
     });
   });

   describe("rateLimit", () => {
     it("devuelve 429 y Retry-After ≥ 1 al agotar la ventana", () => {
       const key = "test:127.0.0.1";
       for (let i = 0; i < 3; i++) expect(rateLimit(key, 3, 60).ok).toBe(true);
       const blocked = rateLimit(key, 3, 60);
       expect(blocked.ok).toBe(false);
       expect(blocked.retryAfterSeconds).toBeGreaterThanOrEqual(1);
     });
   });
   ```
4. **Casos semilla**: IDs compuestos/globales (`TO-P2`, `P-20`), clamp de pH 0–14, fechas `YYYY-MM-DD` y seriales Excel, bbox del Valle de Aburrá (`6.2442,-75.5812` dentro; `4.71,-74.07` fuera), WMO `0 → ☀️` / `95+ → ⛈️`, email/teléfono duplicados (con BD de prueba), ventanas de `rateLimit` y precedencia de `ML_API_URL` sobre `PUBLIC_API_URL` (`trips-diagnosis.ts:10-13`).
5. **Integración**: repetir §3 contra una BD efímera, aplicando `src/db/auth-schema.sql`, `src/db/greenhouse-schema.sql` y `src/db/migrations/*.sql` antes de cada corrida.
6. **No hay CI configurada** en el repositorio (sin workflows en `.github/`): la ejecución debe hacerse manualmente hasta que se añada. No se instala ni se invoca ninguna herramienta nueva en esta auditoría.

---

## 6. Checklist de release

- [ ] `pnpm build` y `pnpm exec astro check` ejecutados; resultados registrados (TEST-29).
- [ ] TEST-01 → TEST-29 ejecutados en la URL de preview, con IDs y evidencia en el PR.
- [ ] `curl` de §3 con los códigos de la matriz; comprobados `checkOrigin` y `401`.
- [ ] Aserciones SQL de §4 sin duplicados ni fugas entre fincas.
- [ ] Verificación post-deploy completa de `docs/DEPLOYMENT.md` §6 si el cambio toca infraestructura.
- [ ] `git diff` sin secretos; pre-commit de Husky respetado (`.husky/pre-commit:5-11`).
- [ ] `docs/CHANGELOG.md` actualizado y ADR nuevo si hubo decisión arquitectónica (`docs/CONTRIBUTING.md` §4).
- [ ] Si el cambio invalidó un caso, actualizar este documento en el mismo PR (trazabilidad §7).

---

## Trazabilidad

| Tema                  | Archivo de configuración / código                                                | Doc relacionado                                                | Verificación                                           |
| :-------------------- | :------------------------------------------------------------------------------- | :------------------------------------------------------------- | :----------------------------------------------------- |
| Ausencia de suite     | `package.json:8-15,47-59`; búsqueda de `*.test.*` / `*.spec.*` sin resultados    | `docs/ROADMAP.md:12`                                           | No hay script `test` ni archivos de test al 2026-11-23 |
| Auth y sesión         | `auth.config.ts:28-68,93-103,170-208`; `src/pages/api/auth/*.ts`                 | `docs/AUTH.md`, `docs/ENDPOINTS.md`                            | TEST-01…05, TEST-23, TEST-26                           |
| Rutas y headers       | `src/middleware.ts:9-74,100-164`; `astro.config.mjs:13`                          | `docs/ROUTES.md`, `docs/SECURITY.md`                           | TEST-13, TEST-15, TEST-16; `curl -I`                   |
| Rate-limit            | `src/middleware.ts:29-37`; `src/backend/services/rateLimit.ts:9-65`              | `docs/SECURITY.md` (SEC-05/07)                                 | TEST-17; `429` + `Retry-After`                         |
| ML y timeouts         | `src/pages/api/trips-diagnosis.ts:4-26,50-88,98-230`; `git log -1` (`4e977f5`)   | `docs/CAMERA-ML.md`, `docs/DEPLOYMENT.md`                      | TEST-18…20; health `200/503`                           |
| Multi-tenant y datos  | `scripts/migrate-neon.mjs:62-161`; `docs/DATABASE.md`; `gallery/upload.ts:12-80` | `docs/DATABASE.md`, `docs/DATA-DICTIONARY.md`                  | TEST-21, TEST-22, TEST-25, TEST-28; SQL §4             |
| Fallbacks externos    | `siata.ts:11-32`; `weather.ts:32-60`; `aqi.ts:25-39`                             | `docs/TROUBLESHOOTING.md`, `docs/ROADMAP.md:19`                | TEST-14, TEST-24                                       |
| Convención documental | `docs/README.md`, el generador de documentación (no incluido)                    | [PDF unificado](./UNIFIED/Macollo-Documentacion-Unificada.pdf) | Regeneración y `pdfinfo`                               |
