# Despliegue y Operación — Macollo

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-16**.
>
> Fuentes: `astro.config.mjs`, `package.json`, `.env.example`, `src/middleware.ts`, `src/db/client.ts`, `auth.config.ts`, `src/pages/api/trips-diagnosis.ts`, `scripts/*.mjs`, `.husky/pre-commit`, `git log -15` y los documentos de seguridad/roadmap citados. Este documento es operativo: cada afirmación verificable lleva `ruta:línea`.

---

## 1. Topología y correcciones al documento anterior

| Elemento                 | Valor real verificado                                                                                  | Evidencia                                                                                                |
| :----------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| Tipo de salida           | SSR obligatorio (`output: "server"`); no hay sitio estático                                            | `astro.config.mjs:14`                                                                                    |
| Adaptador                | `@astrojs/vercel` con `maxDuration: 60`                                                                | `astro.config.mjs:5,19`; `package.json:18`                                                               |
| Duración de función      | **60 s**, no ~10 s. La ruta ML también declara `export const maxDuration = 60`                         | `astro.config.mjs:15-19`; `src/pages/api/trips-diagnosis.ts:4-7`                                         |
| Protección CSRF de Astro | **`security.checkOrigin: true`** (el documento anterior decía `false`)                                 | `astro.config.mjs:13`                                                                                    |
| Sitio canónico           | `https://macollo.tech`, sobreescribible con `SITE`                                                     | `astro.config.mjs:12`; commit `84ce2a9` (2026-11-10)                                                     |
| Gestor de paquetes       | `pnpm` (`pnpm-lock.yaml` presente); **no hay scripts `npm` propios**                                   | `package.json:8-15`; `pnpm-lock.yaml`                                                                    |
| Node                     | `>=22.12.0`                                                                                            | `package.json:5-7`                                                                                       |
| Servicio ML              | FastAPI + BioCLIP 2.5 en **Google Cloud Run**, fuera de Vercel; Macollo solo actúa como proxy SSR      | `src/pages/api/trips-diagnosis.ts:9-13`; `docs/CAMERA-ML.md`                                             |
| Base de datos            | PostgreSQL en la nube (Neon en el despliegue documentado). Sin disco persistente en Vercel             | `src/db/client.ts:18-44`; `scripts/migrate-neon.mjs:3-10`                                                |
| Último cambio relevante  | `4e977f5` (2026-11-11): inferencia directa sin retardos artificiales de 503 en el diagnóstico de trips | `git log -15`; `src/pages/api/trips-diagnosis.ts:98-173`                                                 |
| Ruta de la landing       | `/landing` en el mismo deployment; dominio de publicación pendiente de definición                      | `src/pages/landing.astro`; [LANDING](./LANDING.md), [ADR-008](./decisions/ADR-008-landing-subdominio.md) |

### 1.1 Dominios y la landing

La landing se publica inicialmente como `/landing` en el mismo deployment, accesible también en `localhost:4321`. `src/middleware.ts` **no tiene lógica de host**: no hay redirecciones ni allowlist de dominios, y `astro.config.mjs` no se modifica (`site` sigue siendo `https://macollo.tech` por defecto, sobreescribible con `SITE`). El canonical de la landing se deriva de la petición y sus enlaces son relativos, de modo que funcionan con cualquier dominio.

Cuando se defina el dominio definitivo, se decidirá si se publica en un subdominio del mismo proyecto (añadiéndolo en _Settings → Domains_ con su CNAME) o en un proyecto estático aparte; esa decisión se registrará en un ADR. Ver [LANDING](./LANDING.md) (DOC-47) y [ADR-008](./decisions/ADR-008-landing-subdominio.md).

**Consecuencia operativa de `checkOrigin: true`:** en peticiones no seguras (`POST`/`PUT`/`PATCH`/`DELETE`) Astro exige que el header `Origin` sea igual al `origin` de la URL cuando el `Content-Type` es `application/x-www-form-urlencoded`, `multipart/form-data` o `text/plain`; si no, responde `403 Cross-site POST form submissions are forbidden` (`node_modules/astro/dist/core/app/origin-check.js:2-26`). Esto afecta, por ejemplo, a `POST /api/trips-diagnosis` y `POST /api/gallery/upload` (`multipart/form-data`). Los `curl` con `Content-Type: application/json` no están sujetos a esa comprobación, pero se documenta enviar `-H "Origin: $BASE"` en todos los `POST` de esta guía para que la prueba sea idéntica a la del navegador.

`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md` se cita en el encabezado por convención de la documentación unificada y **sí está presente** en el árbol como artefacto derivado (junto con el DOCX, el PDF y `manifest.json`). No se edita a mano: se regenera con el proceso de unificación (generador no incluido). El índice navegable es `docs/README.md`.

---

## 2. Matriz completa de variables de entorno

Leyenda de obligatoriedad: **Sí-prod** = la aplicación no arranca o no es funcional en producción; **Sí-tarea** = la exige un script concreto; **Cond.** = solo si se habilita esa integración; **No** = tiene default seguro o es informativa.

| Variable                                                           | Obligatoria         | Default                                                              | Dónde se usa                                                                                                                                  | Consecuencia de falta / nota operativa                                                                                                                                                                    |
| :----------------------------------------------------------------- | :------------------ | :------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                                                     | Sí-prod             | — (si falta, se usan `POSTGRES_*`)                                   | Pool `pg`: `src/db/client.ts:19-29`; seeders `seed-admin.mjs:29-36`, `seed-demo.mjs:23-30`; `migrate-neon.mjs:4-5`, `seed-production.mjs:4-6` | Sin URL ni `POSTGRES_*` completos: conecta a `localhost`, falla en Vercel con `[PostgreSQL] Error…` y `500` en rutas de datos. Precede a las variables separadas.                                         |
| `POSTGRES_HOST`                                                    | Cond.               | `localhost`                                                          | `src/db/client.ts:31`; `seed-admin.mjs:38`; `seed-demo.mjs:32`                                                                                | En Vercel apunta a un host inexistente → timeout (`connectionTimeoutMillis: 5000` con URL / `2000` sin URL, `client.ts:26-28,41-42`).                                                                     |
| `POSTGRES_PORT`                                                    | Cond.               | `5432`                                                               | `src/db/client.ts:32`; `seed-admin.mjs:39`; `seed-demo.mjs:33`                                                                                | Puerto erróneo → `ECONNREFUSED` / timeout.                                                                                                                                                                |
| `POSTGRES_USER`                                                    | Cond.               | `postgres`                                                           | `src/db/client.ts:33`; `seed-admin.mjs:40`; `seed-demo.mjs:34`                                                                                | Usuario sin permisos → `permission denied` en login y migraciones.                                                                                                                                        |
| `POSTGRES_PASSWORD`                                                | Cond.               | `""` (vacío)                                                         | `src/db/client.ts:34`; `seed-admin.mjs:41`; `seed-demo.mjs:35`                                                                                | Conexión rechazada; rotar junto con `DATABASE_URL` tras exposición (riesgo SEC-08, `docs/SECURITY.md`).                                                                                                   |
| `POSTGRES_DATABASE`                                                | Cond.               | `astro_auth_db`                                                      | `src/db/client.ts:35`; `seed-admin.mjs:42`; `seed-demo.mjs:36`                                                                                | Si la BD creada se llama `invernadero` y no se define, busca `astro_auth_db` → `database … does not exist`.                                                                                               |
| `NODE_ENV`                                                         | No (lo fija Vercel) | `production` en Vercel                                               | SSL PG `src/db/client.ts:23-25,37-39`; validación de secreto `auth.config.ts:30`; cookie `Secure` `authz.ts:141`                              | Si falta en un despliegue externo: SSL desactivado y no se exige `AUTH_SECRET`. No fijarlo a mano en Vercel.                                                                                              |
| `AUTH_SECRET`                                                      | Sí-prod             | Clave temporal solo en desarrollo (`auth.config.ts:33-37,175`)       | `auth.config.ts:28-32,175`                                                                                                                    | En producción lanza `[Auth] Falta AUTH_SECRET en variables de entorno (.env)` durante el arranque. Generar con `openssl rand -base64 32`.                                                                 |
| `SESSION_MAX_AGE_HOURS`                                            | No                  | `24` (mínimo efectivo 1 h)                                           | `auth.config.ts:42-52`; expiración absoluta en `jwt` `auth.config.ts:187-204`                                                                 | Sin valor: sesión de 24 h. Valores no numéricos o ≤ 0 caen al default. Cambiarlo **no cierra** sesiones ya emitidas de inmediato.                                                                         |
| `AUTH_TRUST_HOST`                                                  | Sí-prod             | — (`true` en `.env.example:16` y `scripts/run-lan.sh:35`)            | `@auth/core/lib/utils/env.js:41`; además `trustHost: true` fijo en `auth.config.ts:55`                                                        | Sin él, Auth.js puede rechazar peticiones detrás de proxy si no se reconoce el host. **No sustituye** los headers `x-forwarded-*`: el middleware reescribe URL y `AUTH_URL` en `src/middleware.ts:78-95`. |
| `AUTH_URL`                                                         | No                  | Lo deriva Auth.js; el middleware lo recalcula                        | `.env.example:18` (comentado); `src/middleware.ts:94`                                                                                         | No definirlo a mano en Vercel: el middleware lo sobreescribe con `${x-forwarded-proto}://${x-forwarded-host}/api/auth` cuando detecta proxy.                                                              |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`                        | Cond.               | `""`                                                                 | Provider Google en `auth.config.ts:58-68`                                                                                                     | Sin ellos el botón «Continuar con Google» no puede autenticar. El login por credenciales sigue funcionando. Registrar callback `https://macollo.tech/api/auth/callback/google`.                           |
| `SMTP_USER` / `SMTP_PASS`                                          | Cond.               | — (alias: `GMAIL_USER` / `GMAIL_APP_PASSWORD`)                       | `src/backend/services/notifications.ts:27-28,230-231`; recuperación `forgot-password.ts:109`                                                  | Sin ellos `sendRecoveryEmail` devuelve `MISSING_SMTP_CONFIG` y **escribe el código de 6 dígitos en logs** (`notifications.ts:35-49`). No usar este modo en producción.                                    |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_FROM`                            | No                  | `smtp.gmail.com` / `465` / `"Macollo Invernadero" <…>`               | `notifications.ts:29-33,232-236`                                                                                                              | Con defaults se intenta Gmail; puerto `465` ⇒ `secure: true`, cualquier otro ⇒ `secure: false` (`notifications.ts:56`). `FROM` solo cambia el remitente.                                                  |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_PHONE_NUMBER` | Cond.               | — (no aparecen en `.env.example`)                                    | `notifications.ts:138-140`; recuperación `forgot-password.ts:116`                                                                             | Sin ellos `sendRecoverySms` → `MISSING_SMS_CONFIG` y el código queda en logs (`notifications.ts:142-157`). Solo necesarios si se habilita SMS.                                                            |
| `WAQI_TOKEN`                                                       | No                  | Token embebido en `src/pages/api/aqi.ts:8-9`                         | `src/pages/api/aqi.ts:9,26`                                                                                                                   | Sin variable se usa el token del código; si vence, `/api/aqi` devuelve el fallback `aqi: 28` (`aqi.ts:32-39`). Definirlo permite rotar el token sin tocar código.                                         |
| `ML_API_URL`                                                       | Cond.               | `https://macollo-trips-api-961314735418.us-central1.run.app`         | `src/pages/api/trips-diagnosis.ts:10-13`; `scripts/run-lan.sh:38,45`                                                                          | Sin él se usa el Cloud Run por defecto; apunta a otro entorno → `503` en `GET` y `502` en `POST`. Alias aceptado: `PUBLIC_API_URL` (no recomendado).                                                      |
| `ML_API_KEY`                                                       | Sí-prod (ML)        | Key embebida en `src/pages/api/trips-diagnosis.ts:15-19`             | Header `X-API-Key` en `buildHeaders` (`trips-diagnosis.ts:79-88`)                                                                             | Sin variable se envía la key del código; si se rota en Cloud Run, el proxy recibe `401`. Alias: `API_KEY`, `ML_X_API_KEY`. **Rotar la key del código es tarea de código, no de configuración.**           |
| `ML_ADMIN_USER` / `ML_ADMIN_PASSWORD`                              | Sí-prod (ML)        | `admin` / `macollo2026`                                              | Renovación de cookie `macollo_session`: `trips-diagnosis.ts:50-77`                                                                            | Tras un reinicio de Cloud Run, un `401` de `/api/predict` dispara login automático; con credenciales erróneas, el reintento falla. rotar en el servicio ML y aquí a la vez.                               |
| `SITE`                                                             | No                  | `https://macollo.tech`                                               | `astro.config.mjs:12`                                                                                                                         | Solo afecta metadatos/URLs generadas por Astro; para preview con otro dominio, definirlo en el entorno de preview.                                                                                        |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD`                                   | Sí-tarea            | —                                                                    | `scripts/seed-admin.mjs:9-22`                                                                                                                 | `ADMIN_EMAIL` debe contener `@` y `ADMIN_PASSWORD` ≥ 8 caracteres; si no, el script termina con `exit 1`.                                                                                                 |
| `ADMIN_NAME` / `ADMIN_ROLE` / `ADMIN_PHONE`                        | No                  | `Superadmin` / `Superadmin` / `null`                                 | `scripts/seed-admin.mjs:11-13,23-26`                                                                                                          | `ADMIN_ROLE` debe estar en `Superadmin\|Admin\|Agropecuario\|Campesino`; si no, error. El script **sobrescribe** contraseña y rol del email existente (`seed-admin.mjs:58-66`).                           |
| `DEMO_EMAIL` / `DEMO_NAME` / `DEMO_PASSWORD`                       | No                  | `demo@invernadero.local` / `Dueño Demo` / aleatorio (~12 caracteres) | `scripts/seed-demo.mjs:11-20`                                                                                                                 | Si no se fija `DEMO_PASSWORD`, se imprime una vez y no se vuelve a mostrar (`seed-demo.mjs:192-202`). No ejecutar en producción.                                                                          |
| `PORT`                                                             | No                  | `4321`                                                               | `scripts/run-lan.sh:11-23`                                                                                                                    | `8000` está reservado para la API ML local; el script aborta si se intenta usar. Solo entorno local.                                                                                                      |

Reglas transversales:

- `.env` y `.env.production` están ignorados por Git (`.gitignore:16-18`); el único archivo versionado es `.env.example`. El pre-commit bloquea cualquier archivo en staging cuyo nombre coincida con `.env`, `credentials` o `secret`, salvo `.env.example` (`.husky/pre-commit:5-11`).
- Todas las variables de la tabla se configuran en **Vercel → Settings → Environment Variables** para cada entorno (Production / Preview / Development). Las variables de los scripts de siembra pueden pasarse solo en la sesión de terminal (`ADMIN_EMAIL=… node scripts/seed-admin.mjs`) y no deben quedar en Vercel.
- Hay credenciales por defecto en el código (`ML_ADMIN_PASSWORD`, key ML, token WAQI y el admin de `scripts/seed-production.mjs:24-26`). Su presencia es una deuda de seguridad conocida; tratarlas como secretos comprometidos y rotarlas en el proveedor antes de exponer el sistema (`docs/SECURITY.md`).

---

## 3. Base de datos y migraciones

1. Crear una instancia PostgreSQL accesible desde Vercel y la BD `invernadero`. Definir `DATABASE_URL` (forma preferida) o el bloque `POSTGRES_*` completo.
2. Aplicar esquemas en orden: `psql "$DATABASE_URL" -f src/db/auth-schema.sql` y `psql "$DATABASE_URL" -f src/db/greenhouse-schema.sql` (`docs/DATABASE.md`). En instalaciones con el esquema anterior, aplicar además `src/db/migrations/001-roles-farms.sql`, `002-add-responsable-to-lecturas.sql` y `003-add-sheets-url-to-fincas.sql` (presentes en `src/db/migrations/`; el responsable se añade también de forma idempotente en `scripts/migrate-neon.mjs:133-141`).
3. Verificar tablas y enum:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public' ORDER BY table_name;
   SELECT enumlabel FROM pg_enum e
   JOIN pg_type t ON t.oid = e.enumtypid
   WHERE t.typname = 'user_role_enum' ORDER BY enumlabel;
   ```
   Esperado: `fincas`, `finca_invitaciones`, `finca_miembros`, `lecturas`, `photos`, `plantas`, `users`, `accounts`, `sessions`, `verification_token`; roles `Superadmin`, `Admin`, `Agropecuario`, `Campesino` (`scripts/migrate-neon.mjs:29,62-161`).
4. Crear el primer staff con `ADMIN_EMAIL=… ADMIN_PASSWORD=… node scripts/seed-admin.mjs` (`scripts/seed-admin.mjs:9-26`). Alternativamente, registrarse en la app y promover: `UPDATE users SET role = 'Superadmin', updated_at = NOW() WHERE email = 'tu@correo.com';` — el rol del JWT se refresca al cerrar y reabrir sesión (`auth.config.ts:187-204`).
5. **Precaución con seeders de producción**: `scripts/seed-production.mjs` contiene una URL de Neon y la contraseña `Macollo2026*` embebidas (`seed-production.mjs:4-6,24-26`) e imprime credenciales por consola (`seed-production.mjs:176-184`). Revisar y rotar antes de usarlo; preferir `seed-admin.mjs` con variables de entorno.
6. Copia de seguridad antes de cualquier migración: `pg_dump "$DATABASE_URL" > backup_$(date +%F).sql` (patrón documentado en `docs/DATABASE.md`).

> No usar SQLite: el pool es `pg` y las funciones Vercel no tienen disco persistente (`src/db/client.ts:1-4`; `docs/ARCHITECTURE.md`).

---

## 4. Checklist pre-deploy

- [ ] Node ≥ 22.12.0 y `pnpm install` con `pnpm-lock.yaml` sin cambios accidentales (`package.json:5-7,16-59`).
- [ ] `pnpm build` en verde; genera `./dist` con el adaptador de Vercel (`package.json:11`; `astro.config.mjs:5,19`). Opcional: `pnpm preview` (`package.json:12`).
- [ ] No hay suite automatizada: ejecutar a mano los casos de `docs/TESTING.md` y registrar los IDs en el PR (verificable: no hay `*.test.*` ni script `test` en `package.json`).
- [ ] Variables de §2 presentes en **todos** los entornos Vercel que se usen; `AUTH_SECRET`, `DATABASE_URL` y `NODE_ENV=production` confirmados en Production.
- [ ] `AUTH_TRUST_HOST=true` y proxy configurable (`x-forwarded-proto`/`x-forwarded-host`): verificar que el dominio final no produce redirects a `http`/`localhost` (`src/middleware.ts:78-95`).
- [ ] DB migrada (§3), `SELECT 1` correcto y sin `[PostgreSQL] Error…` en logs.
- [ ] Google OAuth: callback `https://<dominio>/api/auth/callback/google` autorizado si se usa el proveedor (`auth.config.ts:58-68`).
- [ ] SMTP: correo de prueba de recuperación recibido; si no,确认 que `sent:false` se ha documentado y que el modo logs no se usa en producción (`notifications.ts:35-49`).
- [ ] Cloud Run de ML: `GET $ML_API_URL/api/health` responde; `ML_API_KEY` y `ML_ADMIN_*` alineados con el servicio remoto (`trips-diagnosis.ts:10-19,50-77`).
- [ ] Flujo completo en preview: registro → login → elegir finca → importar CSV → métricas → exportar Excel → logout (`docs/TESTING.md`).
- [ ] `git diff` sin secretos ( `.env`, tokens, contraseñas); el pre-commit ya los bloquea, pero la revisión manual sigue siendo obligatoria (`.husky/pre-commit:5-11`).
- [ ] `docs/CHANGELOG.md` y ADR si la decisión cambia infraestructura (`docs/CONTRIBUTING.md`).

---

## 5. Ejecución del despliegue

```bash
# 1) Verificación local con el mismo gestor del repo
pnpm install
pnpm build
pnpm preview          # opcional, sobre ./dist

# 2) Confirmar qué se va a desplegar
git rev-parse --short HEAD
git status --short

# 3) Push a la rama configurada en Vercel (main en el flujo documentado)
git push origin <rama>
```

Vercel (framework preset **Astro**) construye `pnpm build` y publica la rama configurada; los Pull Requests generan deployments de preview. No existe un script `deploy` en `package.json:8-15`: el despliegue lo hace la integración de Vercel, no un comando local. La API de ML **no** se despliega aquí: se gestiona en el repositorio externo y en Google Cloud Run (`docs/CAMERA-ML.md`).

---

## 6. Verificación post-deploy con `curl`

Sustituir `$BASE` por la URL de preview o producción. Los ejemplos usan `-w` para hacer verificable el código HTTP. No ejecutar la prueba de rate-limit contra producción: puede dejar la IP bloqueada 300 s.

```bash
BASE=https://macollo.tech
export BASE

# A) Portada y cabeceras de seguridad (middleware.ts:39-74)
curl -sS -o /dev/null -w 'home %{http_code}\n' "$BASE/"
curl -sSI "$BASE/" | grep -iE 'x-frame-options|x-content-type-options|content-security-policy|strict-transport-security|referrer-policy'

# B) Página protegida sin sesión → 3xx a /?desde=%2Fmetrics (middleware.ts:129-159)
curl -sS -o /dev/null -w 'metrics %{http_code} %{redirect_url}\n' "$BASE/metrics"

# C) API protegida sin sesión → 401 JSON (middleware.ts:137-147)
curl -sS -w '\napi/farms %{http_code}\n' "$BASE/api/farms"

# D) checkOrigin: sin Origin en multipart → 403; con Origin → 400 (falta archivo)
curl -sS -o /dev/null -w 'sin-origin %{http_code}\n' -X POST -F 'dummy=1' "$BASE/api/trips-diagnosis"
curl -sS -o /dev/null -w 'con-origin %{http_code}\n' -X POST -H "Origin: $BASE" -F 'dummy=1' "$BASE/api/trips-diagnosis"

# E) Registro duplicado (o email inválido) → 400; el JSON es application/json, no aplica origin-check
curl -sS -o /dev/null -w 'register %{http_code}\n' -X POST -H "Origin: $BASE" \
  -H 'Content-Type: application/json' \
  -d '{"name":"QA","email":"no-es-email","password":"12345678"}' \
  "$BASE/api/auth/register"

# F) Health del ML → 200 online / 503 offline; dispara warm-up si model_loaded=false
curl -sS -w '\ntrips-health %{http_code}\n' "$BASE/api/trips-diagnosis"

# G) Clima y AQI → 200 incluso si el proveedor externo falla (fallbacks)
curl -sS -o /dev/null -w 'weather %{http_code}\n' "$BASE/api/weather"
curl -sS -o /dev/null -w 'aqi %{http_code}\n' "$BASE/api/aqi"

# H) SIATA exige sesión: sin cookie → 401; con cookie válida → 200 o 500 en ≤3 s
curl -sS -o /dev/null -w 'siata-anon %{http_code}\n' "$BASE/api/siata"
# curl -sS -b cookies.txt -o /dev/null -w 'siata-auth %{http_code} %{time_total}s\n' "$BASE/api/siata"

# I) Rate-limit (SOLO PREVIEW): 11ª petición → 429 + Retry-After
for i in $(seq 1 11); do
  curl -sS -o /dev/null -w "rl-$i %{http_code}\n" -X POST -H "Origin: $BASE" \
    -H 'Content-Type: application/json' -d '{"name":""}' \
    "$BASE/api/auth/register"
done
```

Resultados esperados y su significado:

| Comprobación                  | Esperado                                                                                              | Si falla, mirar primero                                               |
| :---------------------------- | :---------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| Portada                       | `200` + `X-Frame-Options: DENY`, `nosniff`, CSP, HSTS (HSTS solo si `isHttps`, `middleware.ts:64-74`) | Logs de función; `AUTH_SECRET`; DB                                    |
| `/metrics` anónimo            | `3xx` hacia `/?desde=…`                                                                               | `PROTECTED_PAGES` (`middleware.ts:9-16`)                              |
| `/api/farms` anónimo          | `401 {"message":"No autenticado."}`                                                                   | `PROTECTED_API_PREFIXES` (`middleware.ts:19-27`)                      |
| `POST` multipart sin `Origin` | `403` de Astro                                                                                        | `security.checkOrigin: true` (`astro.config.mjs:13`)                  |
| Health ML                     | `200` con `status:"online"`; `503` si Cloud Run no responde                                           | `ML_API_URL`, `ML_API_KEY`, cold start (`trips-diagnosis.ts:175-230`) |
| `weather` / `aqi`             | `200` con datos o fallback (`weather.ts:48-60`, `aqi.ts:32-39`)                                       | `WAQI_TOKEN`, red saliente                                            |
| SIATA                         | `401` sin sesión; `≤3 s` con sesión                                                                   | `siata.ts:11-32`; service `siata.gov.co:8089`                         |
| Rate limit                    | `429` con `Retry-After`                                                                               | `RATE_LIMITED` (`middleware.ts:29-37`), `rateLimit.ts:23-58`          |

**Verificación de la cookie de sesión**: iniciar sesión desde el navegador en el dominio desplegado, abrir DevTools → Application → Cookies y comprobar que la cookie de Auth.js tiene `Secure` (con `NODE_ENV=production`, `authz.ts:141`) y que el host coincide con el dominio final. Si el login redirige a `http`/`localhost`, revisar §7 «Proxy» y `AUTH_TRUST_HOST`.

---

## 7. Límites, degradación y riesgos conocidos

### Vercel

| Límite / comportamiento  | Valor o regla verificable                                                                                                                                                                                                            | Mitigación                                                                                                                                                                                                                                  |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Duración de función      | `maxDuration: 60` en adaptador y en la ruta ML (`astro.config.mjs:19`; `trips-diagnosis.ts:7`). El comentario de configuración advierte que con Fluid Compute el límite real sigue siendo el uso efectivo (`astro.config.mjs:15-18`) | Las llamadas al ML deben terminar antes; separar trabajo pesado en Cloud Run                                                                                                                                                                |
| Presupuesto ML declarado | `TOTAL_BUDGET_MS = 50_000`, `ATTEMPT_TIMEOUT_MS = 45_000` (`trips-diagnosis.ts:21-26`)                                                                                                                                               | **No confiar en ellos como timeout real**: los `fetch` de `/api/predict` (`trips-diagnosis.ts:130-146`) no pasan `AbortSignal`; los timeouts explícitos están en el login (10 s, `:61`), health (25 s, `:182`) y warm-up (10 s, `:193,202`) |
| Rate limit               | En memoria por instancia, `MAX_BUCKETS = 10_000` (`rateLimit.ts:9-10`); reglas en `middleware.ts:29-37`                                                                                                                              | No es un límite global: con varias instancias el efectivo se multiplica. Backlog SEC-07 (`docs/SECURITY.md`)                                                                                                                                |
| Sistema de archivos      | `POST /api/gallery/upload` escribe en `public/uploads/gallery` con `node:fs` (`gallery/upload.ts:6,65-68`)                                                                                                                           | En entornos serverless el filesystem no es persistente: verificar la galería en preview antes de habilitarla en producción y migrar a almacenamiento de objetos si se pierden archivos. No se modifica código en esta auditoría             |
| Pool de BD               | `max: 20`, `idleTimeoutMillis: 30000`, `connectionTimeoutMillis: 5000/2000` (`src/db/client.ts:26-28,40-42`)                                                                                                                         | Vigilar saturación en picos; una función por instancia mantiene su propio pool                                                                                                                                                              |
| CORS/origin              | `checkOrigin: true` (`astro.config.mjs:13`)                                                                                                                                                                                          | Usar el mismo dominio en `Origin`; no desactivar el control                                                                                                                                                                                 |

### Google Cloud Run (servicio ML externo)

- El modelo se ejecuta fuera de Vercel porque requiere ~4 GB de RAM y Python/PyTorch (`docs/CAMERA-ML.md`). No existen cuotas numéricas de Cloud Run en este repositorio: consultar la consola del proveedor y el README de `macollo-trips-api` en lugar de inventarlas.
- Cloud Run puede escalar a 0: el proxy detecta `model_loaded === false` en `/api/health` y lanza `POST /api/warmup` en segundo plano (`trips-diagnosis.ts:175-210`). Un `GET /api/trips-diagnosis` justo después de un despliegue puede tardar más; eso explica los `503` transitorios.
- Si el contenedor se reinicia, la cookie `macollo_session` guardada en memoria deja de servir; un `401` de `/api/predict` provoca login automático con `ML_ADMIN_USER`/`ML_ADMIN_PASSWORD` y un reintento (`trips-diagnosis.ts:50-77,136-146`).
- El navegador nunca llama a Cloud Run: la key viaja en `X-API-Key` desde el servidor (`trips-diagnosis.ts:79-88`). No publicar la URL con credenciales en el frontend.
- Cámara: `getUserMedia` requiere HTTPS o localhost; por HTTP con IP se usa la cámara nativa vía `input capture` (`docs/CAMERA-ML.md`).

### Proveedores y datos

- SIATA es HTTP público sin SLA (`src/pages/api/siata.ts:15-18`) con abort a los 3 s (`:12-13`); ante fallo responde `500` y el dashboard usa Open-Meteo (`docs/CHANGELOG.md:58`). Revisar `docs/ROADMAP.md:19`: está pendiente reactivarlo o retirarlo.
- WAQI tiene timeout de 8 s y fallback `aqi: 28` (`src/pages/api/aqi.ts:25-39`); Open-Meteo tiene fallback offline `22 °C / 60 %` (`src/pages/api/weather.ts:48-60`).
- `POST /api/sync-sheets` parsea en la función y solo lo puede ejecutar el **dueño** de la finca activa (`docs/CHANGELOG.md:31`; `middleware.ts:25`). CSV muy grandes pueden consumir CPU/tiempo: partir por rangos de fechas.
- Los códigos de recuperación sin usar se acumulan en `verification_token`; limpieza: `DELETE FROM verification_token WHERE expires < NOW();` (`docs/DATABASE.md`).

---

## 8. Rollback

1. **Congelar evidencia**: guardar URL del deployment, hash (`git rev-parse HEAD`), hora UTC y los últimos logs de Vercel/Cloud Run.
2. **Rollback de aplicación**: en Vercel → Deployments, seleccionar el deployment anterior estable y usar **Promote to Production**. Alternativamente, `git revert <hash>` y push a la rama de producción (ambos mecanismos están disponibles; no hay script propio para ello en `package.json`).
3. **Rollback de datos**: solo si la migración cambió esquema o datos. Restaurar el `pg_dump` previo (§3) en una BD nueva y cambiar `DATABASE_URL`/`POSTGRES_*` al nuevo destino; no mezclar dumps con esquemas parciales. Verificar con las consultas de §3 antes de reabrir tráfico.
4. **Rollback de secretos**: si se rotaron, restaurar valores anteriores en **todos** los entornos Vercel y en Cloud Run de forma coordinada (`AUTH_SECRET`, `ML_API_KEY`, `ML_ADMIN_*`, SMTP).
5. **Verificación obligatoria**: repetir §6 completo (incluidos `checkOrigin`, `401`, health ML y rate-limit en preview) y confirmar un login real con rol correcto.
6. **Cierre**: entrada en `docs/CHANGELOG.md` con causa, alcance y acción correctiva; ADR si el rollback cambia una decisión arquitectónica (`docs/CONTRIBUTING.md`).

> Un rollback de código **no revierte** migraciones de BD ni archivos escritos en `public/uploads/gallery`. Tratar esos cambios por separado.

---

## Trazabilidad

| Tema                         | Archivo de configuración / código                                                                                                                       | Doc relacionado                                                | Verificación                                                               |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------- | :------------------------------------------------------------------------- |
| SSR, dominio y `checkOrigin` | `astro.config.mjs:12-19`; `node_modules/astro/dist/core/app/origin-check.js:2-26`                                                                       | `docs/ARCHITECTURE.md`, `docs/ROUTES.md`                       | `curl` §6-A y §6-D: `200`, `403` sin `Origin`                              |
| Scripts y gestor             | `package.json:5-15,47-59`; `pnpm-lock.yaml`                                                                                                             | `docs/README.md`, `docs/CONTRIBUTING.md`                       | `pnpm build`; no hay script `test`/`deploy`                                |
| Matriz de entorno            | `.env.example:1-33`; `auth.config.ts:28-68`; `src/db/client.ts:18-44`; `notifications.ts:27-40,138-157`; `trips-diagnosis.ts:10-19,50-77`; `seed-*.mjs` | `docs/AUTH.md`, `docs/CAMERA-ML.md`, `docs/SECURITY.md`        | Tabla §2 construida de `grep process.env.*` en `src/`, `scripts/` y config |
| Headers, rate limit, proxy   | `src/middleware.ts:29-164`; `rateLimit.ts:9-65`                                                                                                         | `docs/SECURITY.md`, `docs/TROUBLESHOOTING.md`                  | `curl -I`; `401`, `429` + `Retry-After`                                    |
| DB y migraciones             | `src/db/client.ts:18-48`; `scripts/migrate-neon.mjs:12-187`; `src/db/migrations/*`                                                                      | `docs/DATABASE.md`, `docs/DEMO-DATA.md`                        | Consultas SQL §3; `pg_dump` previo                                         |
| Límites Vercel / Cloud Run   | `astro.config.mjs:15-19`; `trips-diagnosis.ts:4-7,21-26,175-230`; `gallery/upload.ts:65-68`                                                             | `docs/CAMERA-ML.md`, `docs/ROADMAP.md`                         | Health `200/503`; revisar timeouts explícitos en código                    |
| Verificación y rollback      | `src/pages/api/siata.ts:11-32`; `weather.ts:48-60`; `aqi.ts:32-39`; Vercel UI                                                                           | `docs/TESTING.md`, `docs/TROUBLESHOOTING.md`                   | Checklist §6 + §8; reposición de deployment anterior                       |
| Convención documental        | `docs/README.md`, el generador de documentación (no incluido)                                                                                           | [PDF unificado](./UNIFIED/Macollo-Documentacion-Unificada.pdf) | `pdfinfo` y regeneración reproducible                                      |
