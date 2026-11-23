# Troubleshooting (Runbook) — Macollo

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-19**.
>
> Alcance: síntoma → causa probable → comprobación → acción. No se modifica código aquí; cuando la causa está en el código se registra como deuda y se remite a `docs/ROADMAP.md` / `docs/SECURITY.md`. Para despliegue y `curl` de verificación, ver `docs/DEPLOYMENT.md`.

---

## 1. Antes de empezar: árbol de decisión

```text
INCIDENTE
├─ ¿Afecta a TODAS las rutas (incluida "/")?
│  ├─ Sí → ¿Logs muestran "[Auth] Falta AUTH_SECRET"?
│  │        ├─ Sí → definir AUTH_SECRET en Vercel (auth.config.ts:28-32) y redesplegar
│  │        └─ No → ¿"[PostgreSQL] Error…" / timeout?
│  │                 ├─ Sí → psql "$DATABASE_URL" -c 'SELECT 1' → revisar BD/SSL/pool (client.ts:18-44)
│  │                 └─ No → ¿403 "Cross-site POST form submissions are forbidden"?
│  │                          └─ Sí → Origin distinto del dominio (astro.config.mjs:13)
│  └─ No → ¿Código HTTP predominante?
│     ├─ 401 → sesión ausente/expirada; rutas protegidas en middleware.ts:9-27, sesión JWT de 24 h (auth.config.ts:42-52,187-204)
│     ├─ 403 → permisos de finca en el handler o dueño-only en Sheets (CHANGELOG.md:31)
│     ├─ 403 en POST multipart → checkOrigin: enviar Origin = dominio
│     ├─ 429 → rate-limit por IP; esperar Retry-After (middleware.ts:29-37; rateLimit.ts:47-57)
│     ├─ 500 → log del endpoint: [SIATA], [AQI], Excel, Postgres
│     ├─ 502 → fallo de conexión Vercel → Cloud Run (trips-diagnosis.ts:160-172)
│     └─ 503 → ML apagado / cold start (trips-diagnosis.ts:220-230)
```

**Evidencia mínima antes de escalar** (lista de evidencia ampliada):

1. URL exacta, método, rol y finca activa; fecha-hora UTC.
2. Código HTTP y cuerpo del JSON (o `details` del error de validación Zod).
3. Logs de la función en Vercel → Deployments → Functions/Logs; prefijos útiles: `[Auth]`, `[Register]`, `[ForgotPassword]`, `[ResetPassword]`, `[PostgreSQL]`, `[SIATA]`, `[AQI]`, `[Notificaciones - Correo]`, `[/api/weather]`.
4. Si es ML: salida de `curl -sS -w '\n%{http_code}\n' "$BASE/api/trips-diagnosis"` y el estado del servicio en Cloud Run.
5. Si son datos: finca, planta, fecha y la fila de CSV/Sheets implicada.
6. Hash desplegado (`git rev-parse --short HEAD`) y entorno (Production/Preview).

---

## 2. Autenticación, sesión y CSRF

> Corrección al runbook anterior: el login por credenciales busca **email o teléfono**, no nombre. La consulta es `LOWER(COALESCE(email,'')) = LOWER($1) OR phone = $1` (`auth.config.ts:93-103`). El `name` se devuelve al construir el usuario, pero no se usa como identificador.

| Síntoma                                                       | Causa probable                                                                                                | Comprobación / acción                                                                                                                                                                                                                                                                            |
| :------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Credenciales incorrectas` siempre                            | Usuario inexistente, hash no bcrypt o identifier no reconocido                                                | `SELECT id, name, email, phone, role, left(password,7) AS prefijo FROM users WHERE LOWER(COALESCE(email,'')) = LOWER('x') OR phone = 'x';`. Solo se comparan hashes `/^\$2[aby]\$/` o contraseñas antiguas en texto plano, que se migran a bcrypt en el primer login (`auth.config.ts:111-143`). |
| `CredentialsSignin` en logs                                   | `authorize` devolvió `null` (usuario no encontrado, password inválido o error SQL)                            | Leer los `console.warn` de `auth.config.ts:82-165`; no es un error de la UI.                                                                                                                                                                                                                     |
| Login redirige a `http://localhost` tras proxy                | `x-forwarded-proto`/`x-forwarded-host` ausentes o `AUTH_TRUST_HOST` no configurado                            | El middleware reescribe la URL y `AUTH_URL` cuando ve ambos headers (`src/middleware.ts:78-95`); verificar que el proxy (Vercel/túnel) los envía. `trustHost: true` ya está fijo en `auth.config.ts:55`.                                                                                         |
| `403 Cross-site POST form submissions are forbidden`          | `security.checkOrigin: true` (`astro.config.mjs:13`) con `Origin` ausente o distinto en un POST `multipart`   | Reenviar con `-H "Origin: https://<dominio>"`. Ver `docs/DEPLOYMENT.md` §6-D. No desactivar el control.                                                                                                                                                                                          |
| Google OAuth falla                                            | Credenciales o callback incorrectos                                                                           | Verificar `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (`auth.config.ts:58-68`) y el callback autorizado `https://<dominio>/api/auth/callback/google`. `allowDangerousEmailAccountLinking: true` (`:67`) permite vincular por email: revisar si hay cuentas duplicadas.                             |
| `[Auth] Falta AUTH_SECRET` en arranque                        | Secreto no definido con `NODE_ENV=production`                                                                 | Definirlo (`openssl rand -base64 32`) en Vercel para **todos** los entornos y redesplegar (`auth.config.ts:28-32`). En dev hay clave temporal (`:33-37,175`).                                                                                                                                    |
| La sesión «nunca caduca» o caduca antes                       | Cambio de `SESSION_MAX_AGE_HOURS` con sesiones ya emitidas; expiración absoluta sealada en `sessionStartedAt` | Default 24 h y mínimo 1 h (`auth.config.ts:42-52`); el callback devuelve `null` al superar `maxAge` (`:187-204`). Cerrar sesión y volver a entrar para aplicar el nuevo valor.                                                                                                                   |
| El rol no cambia en la UI tras un `UPDATE`                    | El rol viaja en el JWT; la autorización sensible se relee de BD                                               | `SELECT id, email, role, updated_at FROM users WHERE email = 'x';` y re-login. La UI muestra `session.user.role` (`auth.config.ts:179-185`), mientras que `getAuthUser` relee BD (`authz.ts`, explicado en `auth.config.ts:21-22`).                                                              |
| Registro con `role: "Admin"` queda `Campesino`/`Agropecuario` | Comportamiento intencional: `accountType` solo permite esos dos valores                                       | Promover con `UPDATE users SET role = 'Admin', updated_at = NOW() WHERE email = 'x';` (`docs/CHANGELOG.md:19,30`).                                                                                                                                                                               |
| Muchos `401` de golpe                                         | Intento de fuerza bruta o cookie incompatible con el dominio                                                  | Revisar rate-limit (§5) y que la cookie tenga `Secure` en producción (`authz.ts:141`).                                                                                                                                                                                                           |
| `429` en login/registro                                       | Límite por IP alcanzado                                                                                       | Esperar el `Retry-After`: 20 intentos/300 s en `callback/credentials`, 10 en `register`, 8 en `forgot`/`reset`, 15 en `invitations/use` (`middleware.ts:29-37`). Es en memoria: con varias instancias el contador no es global (`rateLimit.ts:1-3`).                                             |

---

## 3. Datos, fincas e importaciones

| Síntoma                                                 | Causa probable                                                                                                        | Comprobación / acción                                                                                                                                                                                                                    |
| :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tarjetas en `--` / `N/D`                                | No hay `lecturas` para la finca activa, o la cookie `finca_activa` apunta a otra finca                                | `SELECT f.id, f.nombre, count(l.id) AS lecturas FROM fincas f LEFT JOIN lecturas l ON l.finca_id=f.id GROUP BY f.id, f.nombre ORDER BY f.id;` Verificar la finca activa en la UI. Sin finca se usa la matriz vacía (`docs/DATABASE.md`). |
| Google Sheets devuelve `422`                            | Documento no compartido como «cualquier persona con el enlace» / CSV público                                          | Probar la URL `export?format=csv` en una ventana de incógnito antes de pegarla en `/history`.                                                                                                                                            |
| No aparece «Conectar Google Sheets» o da `403`          | Solo el **dueño** de la finca activa puede sincronizar (`canConnectSheets`, `docs/CHANGELOG.md:22,31`)                | Miembros y staff deben usar **Importar Excel/CSV**. No es un fallo de permisos de Google.                                                                                                                                                |
| Sheets importa `0 registros`                            | Cabeceras o filas incorrectas                                                                                         | Comprobar `ID_planta`, `fecha`, `T_Ext_C`, `T_Int_C`, `humedad_Pct`, `T_Planta_C`, `Ph`, `ALtura_cm` con datos debajo `docs/DATA-DICTIONARY.md`).                                                                                        |
| Registros duplicados o «no se actualiza» la importación | Upsert por `UNIQUE (finca_id, planta_id, fecha, hora)` (`scripts/migrate-neon.mjs:137`)                               | Si la hora cambia, se crea otra fila. Consultar `SELECT fecha, hora, count(*) FROM lecturas WHERE finca_id = X GROUP BY 1,2 ORDER BY 1 DESC, 2;`                                                                                         |
| Export Excel vacío o `500`                              | Sin sesión, sin dataset o error en generación                                                                         | `curl -sS -o /dev/null -w '%{http_code} %{content_type}\n' "$BASE/api/export-excel"` sin sesión debe dar `401`; con sesión, `application/vnd…` y binario. Buscar `Error al generar Excel` en logs.                                       |
| No puedo borrar usuario (`409`)                         | Es dueño de finca y `fincas.dueno_id` es `ON DELETE RESTRICT` (`scripts/migrate-neon.mjs:69`; `docs/CHANGELOG.md:33`) | Transferir o archivar/eliminar sus fincas antes. No es un `500`.                                                                                                                                                                         |
| Invitación rechazada                                    | Código expirado, usos agotados o inactiva                                                                             | `SELECT codigo, usos_maximos, usos_usados, activa, expira_en FROM finca_invitaciones WHERE codigo = 'XXXXXXXX';` El canje es atómico (`docs/DATABASE.md`).                                                                               |
| Fotos no aparecen tras subir                            | La galería guarda archivos en `public/uploads/gallery` (`gallery/upload.ts:65-68`) y la BD en `photos`                | Comprobar `SELECT id, url, finca_id FROM photos ORDER BY uploaded_at DESC LIMIT 10;`. En Vercel el filesystem no es persistente: ver `docs/DEPLOYMENT.md` §7.                                                                            |
| Widgets de clima/AQI vacíos                             | Proveedor externo caído o permiso de ubicación denegado                                                               | `/api/weather` y `/api/aqi` devuelven `200` con fallback (`weather.ts:48-60`; `aqi.ts:32-39`). Si el navegador bloquea geolocalización, se usan coordenadas de Medellín (`weather.ts:32-37`).                                            |
| Canvas 3D en negro                                      | WebGL no disponible o Three.js aún cargando                                                                           | Recargar; verificar soporte WebGL del dispositivo. No afecta a los datos.                                                                                                                                                                |

---

## 4. Base de datos

| Síntoma                                                      | Causa probable                                                         | Acción                                                                                                                                                  |
| :----------------------------------------------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `[PostgreSQL] Error inesperado en cliente inactivo`          | Pool con conexiones muertas; el error se registra en `client.ts:46-48` | Revisar latencia/firewall y `idleTimeoutMillis: 30000`. Si es recurrente, revisar el proveedor.                                                         |
| `connectionTimeout` / `ECONNREFUSED`                         | Host/puerto/credenciales o SSL incorrectos                             | `psql "$DATABASE_URL" -c 'SELECT 1';`. Con URL, SSL en producción usa `rejectUnauthorized: false` (`client.ts:20-25`); sin URL, timeout de 2 s (`:42`). |
| `relation "users" does not exist`                            | Esquema no aplicado                                                    | `psql "$DATABASE_URL" -f src/db/auth-schema.sql` y `-f src/db/greenhouse-schema.sql`; luego migraciones de `src/db/migrations/` (`docs/DATABASE.md`).   |
| `duplicate key value violates unique constraint` en registro | Email/celular ya existentes                                            | Es un `400` guiado, no un bug. Verificar con la consulta de email/teléfono del §2.                                                                      |
| `accounts` / `sessions` vacías                               | Normal con login por credenciales + JWT (`docs/DATABASE.md`)           | No «reparar». Solo se llenan con OAuth o con estrategia de sesión en BD, respectivamente.                                                               |
| `verification_token` crece                                   | Códigos nunca usados                                                   | `DELETE FROM verification_token WHERE expires < NOW();` (`docs/DATABASE.md`).                                                                           |
| Rol con valores antiguos (`Agronomo`, `Super admin`)         | BD no migrada                                                          | `scripts/migrate-neon.mjs:15-44` normaliza el enum; también `src/db/migrations/001-roles-farms.sql`.                                                    |

### Consultas SQL útiles

```sql
-- 1) Conectividad y versión
SELECT 1;
SELECT current_database(), current_user, version();

-- 2) Usuarios y roles (columna con mayúsculas: ir entre comillas)
SELECT id, name, email, phone, role, "emailVerified", updated_at
FROM users ORDER BY id LIMIT 20;

-- 3) Membresías por finca
SELECT f.id AS finca_id, f.nombre, f.dueno_id,
       u.email AS miembro, fm.rol_finca
FROM fincas f
LEFT JOIN finca_miembros fm ON fm.finca_id = f.id
LEFT JOIN users u ON u.id = fm.user_id
ORDER BY f.id, u.email;

-- 4) Volumen de lecturas por finca y día
SELECT finca_id, fecha, count(*) AS lecturas,
       round(avg(ph_suelo)::numeric, 2) AS ph_promedio
FROM lecturas
GROUP BY finca_id, fecha
ORDER BY fecha DESC, finca_id
LIMIT 30;

-- 5) Duplicados potenciales por planta/fecha/hora (debería dar 0 filas)
SELECT finca_id, planta_id, fecha, hora, count(*)
FROM lecturas GROUP BY 1,2,3,4 HAVING count(*) > 1;

-- 6) Matriz de 20 plantas de una finca
SELECT p.fila, p.columna, p.plant_id, count(l.id) AS lecturas
FROM plantas p LEFT JOIN lecturas l ON l.planta_id = p.id
WHERE p.finca_id = 1
GROUP BY p.fila, p.columna, p.plant_id
ORDER BY p.fila, p.columna;

-- 7) Invitaciones con estado
SELECT codigo, finca_id, usos_maximos, usos_usados, activa, expira_en
FROM finca_invitaciones ORDER BY created_at DESC LIMIT 20;

-- 8) Auditoría de cambios de contraseña/rol
SELECT id, name, role, updated_at FROM users ORDER BY updated_at DESC LIMIT 20;

-- 9) Limpieza de códigos expirados
DELETE FROM verification_token WHERE expires < NOW();

-- 10) Fotos huérfanas o sin finca
SELECT count(*) AS sin_finca FROM photos WHERE finca_id IS NULL;
SELECT pg_size_pretty(pg_database_size(current_database())) AS tamano_bd;
```

> Antes de cualquier `UPDATE`/`DELETE`: `pg_dump "$DATABASE_URL" > backup_$(date +%F-%H%M).sql`. Procedimiento completo en `docs/DEPLOYMENT.md` §§3 y 8.

---

## 5. ML (Cloud Run), clima y límites de función

| Síntoma                                                                  | Causa probable                                                                        | Comprobación / acción                                                                                                                                                                                 |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /api/trips-diagnosis` → `503 {"status":"offline"…}`                 | Cloud Run apagado/cold start, `ML_API_URL` erróneo o timeout de 25 s en `/api/health` | Repetir tras unos segundos: el proxy dispara `/api/warmup` cuando `model_loaded === false` (`trips-diagnosis.ts:175-210`). Revisar `ML_API_URL` y el servicio remoto.                                 |
| `POST /api/trips-diagnosis` → `401` interno tras reinicio del contenedor | Cookie `macollo_session` en memoria ya no sirve                                       | El proxy renueva sesión con `ML_ADMIN_USER`/`ML_ADMIN_PASSWORD` y reintenta (`:50-77,136-146`). Si falla, rotar credenciales en ambos lados.                                                          |
| `POST /api/trips-diagnosis` → `502`                                      | `fetch failed` / `ECONNREFUSED` hacia Cloud Run                                       | Mensaje explícito con la URL usada (`:160-172`). Verificar red saliente y HTTPS.                                                                                                                      |
| `403` en el `POST` con `multipart/form-data`                             | `checkOrigin` de Astro                                                                | Añadir `-H "Origin: $BASE"` (`astro.config.mjs:13`).                                                                                                                                                  |
| La petición ML muere cerca de los 60 s                                   | `maxDuration: 60` en Vercel y en la ruta                                              | Los `fetch` de `/api/predict` no llevan `AbortSignal` (`:130-146`); las constantes `TOTAL_BUDGET_MS`/`ATTEMPT_TIMEOUT_MS` (`:21-26`) no se aplican ahí. Deuda documentada en `docs/DEPLOYMENT.md` §7. |
| `/api/siata` → `401`                                                     | Endpoint protegido por middleware                                                     | Obtener sesión válida en el navegador; `GET /api/siata` no es público (`docs/ENDPOINTS.md`; `siata.ts:5-9`).                                                                                          |
| `/api/siata` → `500` en ~3 s                                             | proveedor `siata.gov.co:8089` caído o timeout                                         | Comportamiento esperado (`siata.ts:12-32`): el dashboard usa Open-Meteo. No escalar como incidente de la app salvo que sea continuo.                                                                  |
| `429` en `/api/auth/*`                                                   | Rate-limit por IP                                                                     | Ventana de 300 s; cabecera `Retry-After` (`middleware.ts:29-37,109-123`). Con varias instancias cada una cuenta por separado (`rateLimit.ts:1-3`).                                                    |

---

## 6. Build y despliegue

| Síntoma                                       | Causa probable                                                                        | Acción                                                                                                                                                                    |
| :-------------------------------------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm build` falla por tipos (p. ej. `sileo`) | Errores de tipado pre-existentes                                                      | Confirmar con `pnpm exec astro check` (`@astrojs/check` está en `package.json:48` pero no hay script `check`). Registrar issue; no silenciar con `// @ts-ignore` sin ADR. |
| Todo da `500` en Vercel                       | `AUTH_SECRET` / `DATABASE_URL` ausentes o mal aplicados al entorno Production         | Revisar Variables de entorno y redesplegar; ver `docs/DEPLOYMENT.md` §2 y §6.                                                                                             |
| Funciona local, falla en Vercel               | `POSTGRES_HOST=localhost` en Vercel, `NODE_ENV` distinto, o proxy sin `x-forwarded-*` | Usar BD nube, no fijar `NODE_ENV` a mano y comprobar `AUTH_TRUST_HOST` (`middleware.ts:78-95`).                                                                           |
| `404` en rutas SSR                            | Build estático o adaptador incorrecto                                                 | `output: "server"` y `@astrojs/vercel` en `astro.config.mjs:5,14,19`.                                                                                                     |
| `403` solo en el celular                      | `Origin` del túnel/IP distinto al de la URL; o `getUserMedia` en HTTP                 | `Origin` debe coincidir con el host usado (`astro.config.mjs:13`); en HTTP por IP la cámara usa `input capture` (`docs/CAMERA-ML.md`).                                    |
| Cambios no visibles tras merge                | Deployment de preview promovido o caché del CDN                                       | Verificar hash en Vercel → Deployments y repetir `curl` con `Cache-Control: no-cache` (las exportaciones ya llevan `no-cache`, `docs/DEPLOYMENT.md` anterior §6).         |

---

## Trazabilidad

| Tema                               | Archivo de configuración / código                                                                  | Doc relacionado                                                    | Verificación                                    |
| :--------------------------------- | :------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- | :---------------------------------------------- |
| Árbol de decisión y signos vitales | `astro.config.mjs:12-19`; `src/middleware.ts:76-164`; `src/db/client.ts:18-48`                     | `docs/DEPLOYMENT.md`, `docs/README.md`                             | `curl` §6 de `docs/DEPLOYMENT.md`               |
| Auth y CSRF                        | `auth.config.ts:28-68,93-103,170-208`; `src/middleware.ts:78-95`; `authz.ts:141`                   | `docs/AUTH.md`, `docs/SECURITY.md`                                 | `SELECT` de usuarios; login; `Origin` explícito |
| Datos multi-tenant                 | `scripts/migrate-neon.mjs:62-161`; `gallery/upload.ts:65-68`; `docs/CHANGELOG.md:19-31`            | `docs/DATABASE.md`, `docs/DATA-DICTIONARY.md`, `docs/CAMERA-ML.md` | Consultas SQL 3–7 y 10                          |
| SQL y mantenimiento                | `src/db/client.ts:18-48`; `src/db/migrations/*`; `docs/DATABASE.md`                                | `docs/DEMO-DATA.md`, `docs/DEPLOYMENT.md`                          | Consultas 1–10; `pg_dump` previo                |
| ML, clima y timeouts               | `trips-diagnosis.ts:4-7,21-26,50-77,130-230`; `siata.ts:11-32`; `weather.ts:32-60`; `aqi.ts:25-39` | `docs/CAMERA-ML.md`, `docs/ROADMAP.md`                             | Health `200/503`; latencia SIATA ≤3 s           |
| Rate-limit y headers               | `middleware.ts:29-74,100-127`; `rateLimit.ts:9-65`                                                 | `docs/SECURITY.md` (SEC-05/07)                                     | `401`, `429`, `Retry-After`, `curl -I`          |
| Build/despliegue                   | `package.json:5-15,47-59`; `astro.config.mjs:5,14,19`                                              | `docs/DEPLOYMENT.md`, `docs/CONTRIBUTING.md`                       | `pnpm build`; `pnpm exec astro check`           |
| Convención documental              | `docs/README.md`, el generador de documentación (no incluido)                                      | [PDF unificado](./UNIFIED/Macollo-Documentacion-Unificada.pdf)     | Regeneración y `pdfinfo`                        |
