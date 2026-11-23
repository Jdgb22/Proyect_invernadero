# Cámara y Machine Learning — Detección de Trips (BioCLIP 2.5)

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-26**.

## Alcance y estado de la documentación

Este documento describe **únicamente la integración implementada en este repositorio** entre Macollo (Astro SSR) y el servicio externo [`macollo-trips-api`](https://github.com/VoctorMCL/macollo-trips-api) (FastAPI + BioCLIP 2.5). El modelo, el entrenamiento, los esquemas de respuesta y el despliegue del servicio pertenecen al repositorio externo y no se reproducen aquí como verdad verificada.

**Corrección de deriva:** la versión anterior de este documento encabezaba la sección con «ADR-008». En ese momento no existía tal ADR: el directorio `docs/decisions/` contenía solo ADR-001…ADR-007. Actualmente ADR-008 existe, pero decide la **publicación de la landing en `/landing`** ([ADR-008](./decisions/ADR-008-landing-subdominio.md)), no la integración ML. La integración de cámara/ML **no tiene ADR propio**; este documento es una guía de integración, no una decisión arquitectónica registrada.

## Contexto

El cultivo de gulupa (_Passiflora edulis_) en invernadero requiere monitoreo de trips (_Thysanoptera: Thripidae_), plaga asociada al cacarizado/roña de fruto y al rechazo para exportación. Macollo ofrece al operario un botón flotante de cámara que captura o selecciona una imagen, solicita una inferencia al servicio ML y muestra el diagnóstico (taxón, estadio, urgencia térmica y plan de manejo integrado) dentro del propio modal.

La separación de responsabilidades es efectiva en el código:

1. El modelo no se ejecuta en este repositorio: el proxy solo reenvía `multipart/form-data` a `${ML_API_URL}/api/predict` (`src/pages/api/trips-diagnosis.ts:110-159`).
2. La clave de la API ML se mantiene en el servidor: se envía como cabecera `X-API-Key` en `buildHeaders()` (`src/pages/api/trips-diagnosis.ts:79-88`); el navegador nunca la recibe.
3. El servicio puede estar en Google Cloud Run o en otra URL accesible; la URL se resuelve desde variables de entorno al cargar el módulo (`src/pages/api/trips-diagnosis.ts:10-13`).

## Arquitectura de la integración

```text
Navegador (modal .astro, sin isla React)
  │ POST /api/trips-diagnosis   multipart: file, temperature_c, crop, profile
  │ GET  /api/trips-diagnosis   health (al abrir el modal)
  │ POST /api/gallery/upload    copia de la foto (fire-and-forget)
  ▼
Astro SSR — src/pages/api/trips-diagnosis.ts  (prerender = false, maxDuration = 60)
  │ X-API-Key (+ Cookie macollo_session si hay sesión renovada)
  ├─ POST ${ML_API_URL}/api/predict
  ├─ GET  ${ML_API_URL}/api/health
  └─ POST ${ML_API_URL}/api/warmup  (best-effort si model_loaded === false)
  ▼
macollo-trips-api (FastAPI + BioCLIP 2.5)
```

Rutas implicadas y responsables:

| Etapa                                                    | Archivo                                              | Referencia           |
| :------------------------------------------------------- | :--------------------------------------------------- | :------------------- |
| Botón flotante, cámara, compresión, render de resultados | `src/frontend/components/TripsDiagnosticModal.astro` | líneas 7-18, 210-632 |
| Proxy SSR de inferencia y health                         | `src/pages/api/trips-diagnosis.ts`                   | líneas 3-7, 98-231   |
| Guardado de la captura en la galería                     | `src/pages/api/gallery/upload.ts`                    | líneas 12-100        |
| Entrega autenticada del archivo                          | `src/pages/api/gallery/[id]/file.ts`                 | líneas 9-74          |
| Montaje del modal solo en la portada autenticada         | `src/pages/index.astro`                              | líneas 29-43         |

## Configuración real de variables de entorno

`.env.example:30-32` declara las variables ML; las demás variables del entorno se enumeran para evitar confusiones con nombres usados en versiones anteriores de la documentación.

| Variable                                                                                     | Obligatoria                     | Origen / default efectivo                                                                                                                                                | Uso verificado                                                                       |
| :------------------------------------------------------------------------------------------- | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `ML_API_URL`                                                                                 | No                              | `process.env.ML_API_URL` → `PUBLIC_API_URL` → `https://macollo-trips-api-961314735418.us-central1.run.app` (`src/pages/api/trips-diagnosis.ts:10-13`; `.env.example:31`) | Base para `/api/predict`, `/api/health`, `/api/warmup` y `/api/auth/login`           |
| `ML_API_KEY`                                                                                 | Recomendada en producción       | `ML_API_KEY` → `API_KEY` → `ML_X_API_KEY` → valor literal de respaldo en `src/pages/api/trips-diagnosis.ts:15-19`                                                        | Cabecera `X-API-Key` del proxy (`trips-diagnosis.ts:79-88`)                          |
| `ML_ADMIN_USER`                                                                              | No                              | Default `admin` (`trips-diagnosis.ts:54`)                                                                                                                                | Usuario para renovar la cookie del panel ML                                          |
| `ML_ADMIN_PASSWORD`                                                                          | No                              | Default `macollo2026` (`trips-diagnosis.ts:55`)                                                                                                                          | Contraseña para `POST ${ML_API_URL}/api/auth/login` (`trips-diagnosis.ts:57-62`)     |
| `PORT`                                                                                       | No                              | `4321` en `scripts/run-lan.sh:11`                                                                                                                                        | Puerto del servidor de desarrollo en LAN                                             |
| `AUTH_TRUST_HOST`                                                                            | No en local; sí detrás de proxy | Exportado como `true` por `scripts/run-lan.sh:35`; `.env.example:16`                                                                                                     | Auth.js detrás de IP/HTTPS proxy                                                     |
| `DATABASE_URL`                                                                               | Sí en producción                | `.env.example:2`                                                                                                                                                         | Cadena de conexión usada por la aplicación y por los seeders (ver `docs/SCRIPTS.md`) |
| `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DATABASE`  | Sí si no hay `DATABASE_URL`     | `.env.example:3-7`; `POSTGRES_DATABASE=invernadero`                                                                                                                      | Conexión local alternativa                                                           |
| `AUTH_SECRET`, `SESSION_MAX_AGE_HOURS`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `SMTP_*` | Según despliegue                | `.env.example:9-28`                                                                                                                                                      | Autenticación y correo; ajenas al proxy ML                                           |
| `SITE`                                                                                       | No                              | `astro.config.mjs:12`, default `https://macollo.tech`                                                                                                                    | URL canónica de Astro; no aparece en `.env.example`                                  |

> Los alias `PUBLIC_API_URL`, `API_KEY` y `ML_X_API_KEY` siguen siendo aceptados por el código (`src/pages/api/trips-diagnosis.ts:11-18`), pero la configuración recomendada y la declarada en `.env.example` son `ML_API_URL` y `ML_API_KEY`. El valor de respaldo de la clave está codificado en el propio archivo: en producción debe definirse explícitamente.

## Comportamiento real del proxy

### `POST /api/trips-diagnosis`

`prerender = false` y `maxDuration = 60` (`src/pages/api/trips-diagnosis.ts:3-7`); el adaptador de Vercel también fija 60 s (`astro.config.mjs:19`). La petición entrante se convierte en `FormData` y se valida `file` como `Blob` no vacío (`trips-diagnosis.ts:100-108`).

| Campo           | Tipo            | Obligatorio | Valor por defecto | Observación                                                                         |
| :-------------- | :-------------- | :---------- | :---------------- | :---------------------------------------------------------------------------------- |
| `file`          | `Blob`/`File`   | Sí          | —                 | Nombre reenviado: `file.name` o `muestra_gulupa.jpg` (`trips-diagnosis.ts:111-116`) |
| `temperature_c` | cadena numérica | No          | no se envía       | El modal siempre lo calcula en °C (`TripsDiagnosticModal.astro:515-529`)            |
| `crop`          | cadena          | No          | `gulupa`          | `trips-diagnosis.ts:123-124`                                                        |
| `profile`       | cadena          | No          | `auto`            | `trips-diagnosis.ts:126-127`; el modal envía `auto`                                 |

Flujo de reenvío y errores (`src/pages/api/trips-diagnosis.ts:129-173`):

| Situación                                              | Comportamiento                                                                                                                       | Código devuelto al navegador         |
| :----------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| Archivo ausente, no `Blob` o de tamaño 0               | `{ error: "No se proporcionó ningún archivo de imagen válido." }`                                                                    | `400`                                |
| El ML responde correctamente                           | JSON del servicio ML, sin transformación                                                                                             | `200`                                |
| El ML responde `401`                                   | Se obtiene/renueva la cookie `macollo_session` y se reintenta **una sola vez** (`trips-diagnosis.ts:136-146`)                        | `200` o el error del segundo intento |
| El ML responde `503` (incluido «warming») u otro error | Se reenvía el texto de error con el **mismo código**; no hay espera ni reintento por temperatura/frío (`trips-diagnosis.ts:148-156`) | Código del ML                        |
| `fetch` falla con `ECONNREFUSED` o «fetch failed»      | Mensaje de conexión con `ML_API_URL`                                                                                                 | `502`                                |
| Cualquier otra excepción                               | `{ error: "Error interno al procesar diagnóstico: …" }`                                                                              | `502`                                |

**Deriva corregida (commit `4e977f5`, 2026-11-11, `fix(trips): direct fast inference without artificial 503 retry delays`):** el proxy **ya no** genera respuestas propias `503` con `Retry-After`, **ya no** duerme entre intentos ni aplica un presupuesto de 50 s con reintentos por cold start. La inferencia es directa: una llamada a `/api/predict` y, como único reintento posible, la renovación de sesión tras un `401`. En el archivo permanecen declaradas, sin uso, las constantes `TOTAL_BUDGET_MS = 50_000` y `ATTEMPT_TIMEOUT_MS = 45_000` y las funciones `sleep()` y `safeJson()` (`trips-diagnosis.ts:21-31, 90-96`): **no deben interpretarse como timeouts activos**. Tampoco hay `AbortSignal.timeout` en la llamada de inferencia de `POST`; el límite superior es el `maxDuration = 60` de la plataforma.

Si el modelo está cargando, sintomático es que el ML devuelva `503`; ese código llega al modal y se muestra mediante `alert("❌ " + err.message)` (`TripsDiagnosticModal.astro:545-552`). La estrategia de calentamiento se trasladó al health check (`GET`) y al sondeo del modal, no al `POST`.

### `GET /api/trips-diagnosis` (health y calentamiento)

| Paso                                                                                                                                                     | Implementación                                                                                                             |
| :------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| Consulta `GET ${ML_API_URL}/api/health` con timeout de `AbortSignal.timeout(25000)`                                                                      | `trips-diagnosis.ts:175-184`                                                                                               |
| Si `model_loaded === false`, llama `POST ${ML_API_URL}/api/warmup` (timeout 10 s) con la cookie cacheada; ante `401`, renueva sesión y reintenta una vez | `trips-diagnosis.ts:187-210`; el fallo del warm-up se ignora (`best-effort`)                                               |
| Respuesta correcta                                                                                                                                       | `200` con `{ status: "online", ml_service: <JSON del ML>, warming_triggered: boolean }` (`trips-diagnosis.ts:212-219`)     |
| Cualquier error de red/HTTP del health                                                                                                                   | `503` con `{ status: "offline", message: "…no está activo o no responde en <ML_API_URL>" }` (`trips-diagnosis.ts:220-230`) |

La cookie se guarda en memoria del proceso (`cachedSessionCookie`, validez de 6 días; `trips-diagnosis.ts:28-29, 64-70`). En serverless, cada instancia puede tener su propia caché: la renovación ante `401` cubre reinicios del contenedor ML, no garantiza una sesión compartida entre instancias de Vercel.

### Estados que muestra el modal

`checkMlHealth()` (`TripsDiagnosticModal.astro:403-430`) interpreta la respuesta del `GET`:

| Respuesta                                                  | Indicador            | Texto                                                   |
| :--------------------------------------------------------- | :------------------- | :------------------------------------------------------ |
| `status === "online"` y `ml_service.model_loaded === true` | punto verde          | «IA BioCLIP 2.5 Conectada (Google Cloud)» + dispositivo |
| `status === "online"` y modelo cargando                    | punto ámbar pulsante | «Calentando IA BioCLIP 2.5 (Cloud Run)...»              |
| `status === "offline"` o error de red                      | punto rojo           | «Servidor IA offline (Google Cloud Run)»                |

Mientras el modelo carga, el modal reprograma la comprobación cada 12 s hasta un máximo de 12 sondeos (`TripsDiagnosticModal.astro:432-445`); al volver a abrir el modal se reinicia el contador y se ejecuta un health check inmediato (`TripsDiagnosticModal.astro:248-261`). Este sondeo es propio del cliente: no existe un bucle de reintentos en `POST`.

## Flujo en el navegador

`TripsDiagnosticModal.astro` es un componente **Astro** (no `.tsx`, no isla React): todo su comportamiento está en el `<script>` de la sección 210-632 del propio archivo. No recibe props.

1. **Apertura:** botón flotante `📸` con `id="open-trips-scanner-btn"` (`TripsDiagnosticModal.astro:7-18`); cierre por botón o backdrop (`:263-275`).
2. **Cámara:** si `window.isSecureContext` es falso (HTTP por IP), se muestra una alerta y se dispara el `<input type="file" accept="image/*" capture="environment">` para abrir la cámara nativa (`:280-292, 137-143`). En contexto seguro se intenta `getUserMedia` con `facingMode: { exact: "environment" }` y se hace fallback a `ideal` (`:300-313`). Cualquier error vuelve al input de archivo (`:326-329`).
3. **Captura:** se dibuja el frame del `<video>` en un `<canvas>` y se exporta a JPEG con calidad `0.92` (`:364-385`).
4. **Compresión previa a inferencia:** `compressImageClient()` limita la dimensión mayor a 1024 px y re codifica a JPEG `0.82`; si la imagen ya es pequeña o falla la decodificación, envía el blob original (`:447-484`).
5. **Temperatura:** el campo es de solo lectura; se toma de `window.__MACOLLO_WEATHER__.temperatureC`, publicado por `Dashboard.astro:625-638`, y se convierte a °F solo para mostrarlo. Antes de enviar, se reconvierte F→C; si no hay valor válido se usa `22.0` (`TripsDiagnosticModal.astro:234-245, 515-521`).
6. **Inferencia:** `FormData` con `file=muestra.jpg`, `temperature_c`, `crop=gulupa`, `profile=auto`, enviado a `POST /api/trips-diagnosis` (`:526-541`). Durante la espera se muestra un overlay con cronómetro (`:486-511`).
7. **Resultado:** `renderResultados()` admite tanto el formato `detection.*` (nuevo) como `is_thrips`/`thrips_confidence` (heredado); pinta confianza, estadio, ciclo térmico, urgencia y recomendaciones MIP (`TripsDiagnosticModal.astro:558-631`).
8. **Galería:** la misma imagen se envía a `POST /api/gallery/upload` con nombre `trips-diagnostico.jpg` y caption `Diagnóstico de trips - Escáner BioCLIP 2.5` (`:351-362`). Es una petición _fire-and-forget_: no se comprueba `res.ok` y los errores se silencian; un fallo de guardado **no impide** la inferencia (`:382, 398-399`).

## Guardado en galería por finca

La atribución a la finca no la decide el modal: la resuelve el endpoint a partir de la cookie `finca_activa` (`HttpOnly`, `SameSite=Lax`, definida en `src/backend/services/authz.ts:137-155`).

| Paso                        | Implementación                                                                                                                                                                                                                      |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito de sesión Auth.js | `getSession(request)` y `getAuthUser(request)`; sin sesión, `401` (`src/pages/api/gallery/upload.ts:14-28`)                                                                                                                         |
| Finca activa                | `Number(getFincaCookie(request))`, válida solo si es entero > 0; si no hay cookie, `finca_id = null` (`upload.ts:46-50`)                                                                                                            |
| Archivo                     | `public/uploads/gallery/<UUID>.<ext>`, con extensión derivada del MIME (`png`/`webp`/`gif`/`avif`/`jpg`) (`upload.ts:52-68`)                                                                                                        |
| Registro                    | `INSERT INTO photos (filename, url, mime_type, size_bytes, caption, finca_id, user_id, taken_at …)`; `taken_at` usa `COALESCE($8::timestamptz, NOW())` (`upload.ts:72-86`)                                                          |
| Respuesta                   | `{ ok: true, photo: { id, url, filename } }` (`upload.ts:88-91`)                                                                                                                                                                    |
| Servicio de archivo         | `GET /api/gallery/:id/file` exige sesión, busca rutas alternativas bajo `public/`, fija `Cache-Control: public, max-age=31536000, immutable` y redirige a una URL externa si la hubiera (`src/pages/api/gallery/[id]/file.ts:9-71`) |
| Listado/detalle             | `Gallery.astro` filtra `WHERE p.finca_id = $1` (`src/frontend/components/Gallery.astro:27-42`); `GalleryDetail.astro` exige `p.id = $1 AND p.finca_id = $2` (`src/frontend/components/GalleryDetail.astro:31-53`)                   |

En consecuencia, la galería es **compartida por finca** entre sus miembros: al cambiar de finca desde la navbar se cambia el valor de la cookie y, tras recargar, cambia el listado (`src/frontend/components/Navbar.astro:300-326`). El diagnóstico en sí no exige sesión en el proxy (`src/pages/api/trips-diagnosis.ts` no invoca `getSession`), pero el guardado en galería sí: sin sesión la foto no se conserva aunque el diagnóstico se muestre.

## Desarrollo local y acceso desde el celular

| Servicio            | Forma de arranque en este repositorio                              | Dirección                                  |
| :------------------ | :----------------------------------------------------------------- | :----------------------------------------- |
| Macollo (Astro SSR) | `pnpm dev` (`package.json:9`)                                      | `http://localhost:4321`                    |
| Macollo en LAN      | `pnpm run dev:lan` → `bash scripts/run-lan.sh` (`package.json:10`) | `http://<IP_LOCAL>:4321`                   |
| API ML              | No hay script en este repositorio; véase el README externo         | `ML_API_URL` (por defecto Cloud Run HTTPS) |

`scripts/run-lan.sh` **ya no apunta al puerto 8000 local**: exporta `ML_API_URL` con el valor de Cloud Run si no está definida (`scripts/run-lan.sh:37-38`), rechaza explícitamente `PORT=8000` (`:13-17`) y solo comprueba el health de ML con `curl --max-time 6` a modo de aviso no bloqueante (`:49-56`). Para probar contra una API ML local, hay que exportar `ML_API_URL=http://<IP>:8000` antes de arrancar.

### Limitación de cámara en HTTP

Los navegadores restringen `getUserMedia` a contextos seguros. El modal comprueba `window.isSecureContext`, protocolo y host (`localhost`, `127.0.0.1`, `[::1]`): si entró por `http://IP`, abre la cámara nativa con `capture="environment"` (`TripsDiagnosticModal.astro:280-292, 137-143`). El botón «Subir Foto» ofrece el mismo mecanismo. Para `getUserMedia` real desde el celular se necesita HTTPS (túnel o certificado local); mixed content también obliga a que el servicio ML sea HTTPS cuando la web lo es.

### Comprobaciones rápidas

```bash
# 1. Health del proxy (debe devolver online/offline y warming_triggered)
curl -sS http://localhost:4321/api/trips-diagnosis | jq .

# 2. Inferencia directa: no hay cerrar sesión ni reintentos artificiales 503
curl -sS -F 'file=@muestra.jpg' \
  -F 'temperature_c=24.5' -F 'crop=gulupa' -F 'profile=auto' \
  http://localhost:4321/api/trips-diagnosis | jq .

# 3. Galería: requiere cookie de sesión Auth.js y cookie finca_activa
curl -sS -b 'finca_activa=1; <cookie-de-sesion-authjs>' \
  -F 'file=@muestra.jpg' -F 'caption=Prueba de cámara' \
  http://localhost:4321/api/gallery/upload | jq .
```

## Requisitos de infraestructura del servicio ML

El repositorio no contiene el despliegue del modelo, por lo que los requisitos de RAM/versión de Python deben tomarse del README de `macollo-trips-api`; la documentación anterior citaba ~4 GB por worker de uvicorn y un único worker, y un servidor con ≥8 GB RAM. Esa información **no es verificable desde este repositorio** y se conserva solo como referencia histórica. Lo que sí se verifica aquí es el límite de 60 s de la función serverless (`src/pages/api/trips-diagnosis.ts:7`, `astro.config.mjs:19`), el timeout de 25 s del health (`trips-diagnosis.ts:182`) y el calentamiento best-effort del modelo (`trips-diagnosis.ts:187-210`).

## Estado de la integración

- ✅ Modal Astro con cámara nativa en HTTP por IP y `getUserMedia` en contexto seguro.
- ✅ Proxy SSR con `X-API-Key`, renovación de sesión ante `401` y health con warm-up.
- ✅ Inferencia directa sin reintentos artificiales ni `Retry-After` propios (commit `4e977f5`).
- ✅ Guardado de la imagen en `photos` con `finca_id` de la finca activa y `user_id` de la sesión.
- ✅ Listado y detalle de galería restringidos a la finca activa.
- ⚠️ `ML_ADMIN_USER`/`ML_ADMIN_PASSWORD` tienen valores por defecto inseguros en el código; describirlos explícitamente en despliegues reales.
- ⚠️ El despliegue del servicio ML, su HTTPS y su CORS se gestionan fuera de este repositorio; no se puede afirmar su estado desde aquí.

## Trazabilidad

| Tema                                                        | Archivo de código                                                                   | Doc relacionada                                                        | Verificación                                      |
| :---------------------------------------------------------- | :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------- | :------------------------------------------------ |
| Reenvío de inferencia, errores y ausencia de reintentos 503 | `src/pages/api/trips-diagnosis.ts:98-173`                                           | `docs/ENDPOINTS.md:193-200`                                            | Lectura directa + `git show 4e977f5` (2026-11-23) |
| Health, warm-up y timeouts                                  | `src/pages/api/trips-diagnosis.ts:175-231`                                          | `docs/ENDPOINTS.md:199`                                                | Lectura directa (2026-11-23)                      |
| Variables ML y alias                                        | `src/pages/api/trips-diagnosis.ts:10-19`; `.env.example:30-32`                      | `docs/DEPLOYMENT.md:25`                                                | Comparación con `.env.example` (2026-11-23)       |
| Modal (cámara, compresión, temperatura, resultados)         | `src/frontend/components/TripsDiagnosticModal.astro:210-632`                        | `docs/COMPONENTS.md`                                                   | Lectura directa del `.astro` (2026-11-23)         |
| Galería por finca                                           | `src/pages/api/gallery/upload.ts:12-100`; `src/pages/api/gallery/[id]/file.ts:9-74` | `docs/ENDPOINTS.md`, `docs/DATABASE.md`                                | Lectura directa (2026-11-23)                      |
| Arranque LAN y puerto 8000                                  | `scripts/run-lan.sh:11-61`                                                          | `docs/SCRIPTS.md`                                                      | Lectura directa (2026-11-23)                      |
| Límite de ejecución serverless                              | `src/pages/api/trips-diagnosis.ts:3-7`; `astro.config.mjs:19`                       | `docs/ARCHITECTURE.md`                                                 | Lectura directa (2026-11-23)                      |
| ADR de ML inexistente                                       | `docs/decisions/` (ADR-001…ADR-008; el 008 es de la landing)                        | [ADR-008](./decisions/ADR-008-landing-subdominio.md), `docs/README.md` | Listado de directorio (2026-11-23)                |
