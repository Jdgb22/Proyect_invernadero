# Scripts de utilidad

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-25**.

## Alcance

Los cinco archivos ejecutables de `scripts/` son `run-lan.sh`, `seed-admin.mjs`, `seed-demo.mjs`, `seed-production.mjs` y `migrate-neon.mjs`. Ninguno de los seeders ni la migración tiene un alias en `package.json`: se invocan con `node scripts/<archivo>.mjs`. Solo `dev:lan` tiene alias de pnpm (`package.json:8-15`). Las herramientas de documentación usadas para producir los artefactos derivados no se incluyen en este entregable.

**Corrección de deriva:** la versión anterior afirmaba que `run-lan.sh` exportaba `ML_API_URL=http://127.0.0.1:8000`. El código real exporta la URL de Cloud Run por defecto (`scripts/run-lan.sh:37-38`). También omitía `seed-production.mjs` y `migrate-neon.mjs`, y daba `POSTGRES_DATABASE=astro_auth_db` como valor por defecto, cuando `.env.example:7` usa `invernadero` (el valor `astro_auth_db` solo es el fallback interno de los seeders cuando no hay `.env`; `scripts/seed-admin.mjs:42`, `scripts/seed-demo.mjs:36`).

## Tabla de comandos

| Comando                                     | Archivo                                                      | Prerrequisitos                                                                             | Efecto principal                                                           | Idempotencia                                                                         |
| :------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `pnpm dev`                                  | `package.json:9`                                             | Node ≥ 22.12 (`package.json:5-7`), dependencias instaladas                                 | `astro dev` en `localhost:4321`                                            | N/A                                                                                  |
| `pnpm run dev:lan` / `./scripts/run-lan.sh` | `scripts/run-lan.sh` (alias `package.json:10`)               | Bash; `ip` o `hostname`; `ss` opcional; pnpm o npx                                         | Arranca Astro en `0.0.0.0:$PORT`, exporta `AUTH_TRUST_HOST` y `ML_API_URL` | N/A (detener con Ctrl+C)                                                             |
| `node scripts/seed-admin.mjs`               | `scripts/seed-admin.mjs`                                     | `ADMIN_EMAIL` y `ADMIN_PASSWORD`; BD accesible; `.env` opcional vía `dotenv/config` (`:1`) | Crea o **actualiza** un usuario con rol staff                              | Sí: actualiza por email en minúsculas (`:53-77`)                                     |
| `node scripts/seed-demo.mjs`                | `scripts/seed-demo.mjs`                                      | BD accesible; `.env` opcional (`:1`)                                                       | Crea usuario demo, finca, 20 plantas y 60 lecturas                         | Parcial: si la finca ya existe, termina sin tocar lecturas (`:70-79`)                |
| `node scripts/seed-production.mjs`          | `scripts/seed-production.mjs`                                | BD Neon accesible; `DATABASE_URL` recomendable                                             | Crea/actualiza Superadmin, finca principal, 20 plantas y 60 lecturas       | Parcial: actualiza usuario y reutiliza la primera finca (`:30-82`)                   |
| `node scripts/migrate-neon.mjs`             | `scripts/migrate-neon.mjs`                                   | BD Neon accesible; `DATABASE_URL` recomendable                                             | Ejecuta SQL de esquema en una transacción                                  | Parcial: usa `IF NOT EXISTS`, pero renombra tablas legacy y cambia roles (`:12-163`) |
| `pnpm build` / `pnpm preview`               | `package.json:11-12`                                         | Igual que `pnpm dev`                                                                       | Compilación SSR con adaptador Vercel / vista previa                        | N/A                                                                                  |
| Documentación derivada                      | Proceso de unificación y capturas (generadores no incluidos) | Artefactos ya presentes en `docs/UNIFIED/` y `docs/capturas/`                              | PDF unificado y CAP-01…CAP-08                                              | N/A: artefactos derivados                                                            |

## Variables de entorno

| Variable                                                                                        | Script(s) que la leen                                                                              | Default real                                                 | Observación                                                                                           |
| :---------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `PORT`                                                                                          | `run-lan.sh:11`                                                                                    | `4321`                                                       | `8000` se rechaza explícitamente (`:13-17`)                                                           |
| `AUTH_TRUST_HOST`                                                                               | `run-lan.sh:35`                                                                                    | `true` si no está definida                                   | Necesario para entrar por IP                                                                          |
| `ML_API_URL`                                                                                    | `run-lan.sh:38`                                                                                    | `https://macollo-trips-api-961314735418.us-central1.run.app` | Anula el valor por defecto del proxy ML si se exporta                                                 |
| `DATABASE_URL`                                                                                  | `seed-admin.mjs:28-36`, `seed-demo.mjs:22-30`, `seed-production.mjs:4-11`, `migrate-neon.mjs:3-10` | Los dos últimos tienen una URL Neon literal de respaldo      | `.env.example:2` documenta el formato                                                                 |
| `POSTGRES_HOST` / `POSTGRES_PORT` / `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DATABASE` | `seed-admin.mjs:37-47`, `seed-demo.mjs:31-41`                                                      | `localhost` / `5432` / `postgres` / `''` / `astro_auth_db`   | Solo se usan si no hay `DATABASE_URL`; `.env.example:3-7` fija `invernadero`                          |
| `NODE_ENV`                                                                                      | `seed-admin.mjs:33,44`, `seed-demo.mjs:27,38`                                                      | Sin valor                                                    | Si es `production`, SSL con `rejectUnauthorized: false`                                               |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD`                                                                 | `seed-admin.mjs:9-10`                                                                              | Sin valor; validación obligatoria (`:15-22`)                 | Email se normaliza a minúsculas; contraseña ≥ 8 caracteres                                            |
| `ADMIN_NAME`, `ADMIN_ROLE`, `ADMIN_PHONE`                                                       | `seed-admin.mjs:11-13`                                                                             | `Superadmin`, `Superadmin`, `null`                           | Roles permitidos: `Superadmin`, `Admin`, `Agropecuario`, `Campesino` (`:7, 23-26`)                    |
| `DEMO_EMAIL`, `DEMO_NAME`, `DEMO_PASSWORD`                                                      | `seed-demo.mjs:11-20`                                                                              | `demo@invernadero.local`, `Dueño Demo`, aleatorio            | Si la contraseña tiene < 8 caracteres se genera una con `crypto.randomBytes(9).toString("base64url")` |
| `SITE`                                                                                          | `astro.config.mjs:12`                                                                              | `https://macollo.tech`                                       | No es variable de ningún script, pero afecta al arranque de Astro                                     |

> `seed-admin.mjs` y `seed-demo.mjs` importan `dotenv/config` (`:1` en ambos), por lo que leen `.env` automáticamente. `seed-production.mjs` y `migrate-neon.mjs` **no** importan dotenv: exporte `DATABASE_URL` en el entorno del shell antes de ejecutarlos o se usará la URL Neon codificada en el archivo.

## `scripts/run-lan.sh` — servidor accesible desde el celular

Secuencia verificable:

1. Se sitúa en la raíz del repositorio calculando `SCRIPT_DIR` (`run-lan.sh:8-9`).
2. Toma `PORT` de entorno o `4321` y rechaza `8000`, reservado para la API ML (`:11-17`).
3. Detecta la IP de salida con `ip route get 1.1.1.1 | awk …` y, si falla, con `hostname -I`; último recurso `localhost` (`:25-32`).
4. Comprueba si el puerto está ocupado **solo si el comando `ss` está disponible** (`:19-23`).
5. Exporta `AUTH_TRUST_HOST=true` y `ML_API_URL` con el valor de Cloud Run si no viene definida (`:34-38`).
6. Imprime URLs locales/LAN y hace un `curl -fsS --max-time 6 ${ML_API_URL}/api/health` meramente informativo; un fallo no aborta el arranque (`:40-56`).
7. Ejecuta `pnpm exec astro dev --host 0.0.0.0 --port "$PORT"` o, si no hay pnpm, `npx astro dev …` (`:58-62`).

| Uso                       | Resultado                  |
| :------------------------ | :------------------------- |
| Local                     | `http://localhost:4321`    |
| Celular en la misma Wi-Fi | `http://<IP_LOCAL>:4321`   |
| Health de la ML API       | `${ML_API_URL}/api/health` |

**Precauciones:** el tráfico va por HTTP, por lo que la cámara real (`getUserMedia`) se sustituye por el input nativo `capture="environment"` en el celular; ver `docs/CAMERA-ML.md`. La API ML es externa: el diagnóstico no funciona sin ella, aunque el arranque de Astro no se bloquea por su ausencia. Para una API ML local, exporte `ML_API_URL` antes de llamar al script.

```bash
./scripts/run-lan.sh
PORT=4322 ./scripts/run-lan.sh
ML_API_URL=http://192.168.1.20:8000 ./scripts/run-lan.sh
```

## `scripts/seed-admin.mjs` — cuenta privilegiada

Valida `ADMIN_EMAIL` (debe contener `@`), `ADMIN_PASSWORD` (≥ 8 caracteres) y `ADMIN_ROLE` (uno de los cuatro roles) antes de conectar (`seed-admin.mjs:9-26`). Hash con `bcryptjs` y factor 10 (`:51`). Si el correo ya existe, actualiza `name`, `password`, `role`, `updated_at` y solo sobrescribe `phone` si se indicó uno nuevo (`COALESCE($5, phone)`; `:58-66`). Si no existe, inserta con `"emailVerified" = NOW()` (`:68-76`).

**Efectos en BD:** `SELECT` y `UPDATE`/`INSERT` sobre `users`. No escribe archivos.

**Precaución:** ejecutarlo con un email existente **reemplaza su contraseña y su rol**. Las credenciales quedan en el historial de la shell si se pasan como variables en línea; preferir un `.env` local no versionado.

```bash
ADMIN_EMAIL=admin@macollo.local \
ADMIN_PASSWORD='Admin1234' \
ADMIN_ROLE=Admin \
ADMIN_NAME='Administrador Local' \
node scripts/seed-admin.mjs
```

## `scripts/seed-demo.mjs` — finca de demostración

Genera el usuario demo (rol `Agropecuario`) solo si el correo no existe (`seed-demo.mjs:49-67`), crea la finca «Finca demo» en «Valle de Aburrá, Antioquia» y la membresía `dueno` (`:69-98`), siembra la matriz `t0`–`t3` × `Col 1`…`Col 5` con IDs `P-01`…`P-20` (`:100-116`) y 60 lecturas (3 días × 20 plantas, hora `09:00 AM`, `responsable_id` del dueño) con `ON CONFLICT … DO NOTHING` en `(finca_id, planta_id, fecha, hora)` (`:118-190`). Los valores se derivan de forma determinista con `pseudo(seed)` (`:44-47, 131-157`).

**Efectos en BD:** `users`, `fincas`, `finca_miembros`, `plantaIds` vía `plantas` y `lecturas`. No escribe archivos.

**Precauciones:**

- Si ya existe «Finca demo» para ese dueño, el script retorna antes de insertar plantas/lecturas (`:74-79`).
- Si el **usuario** ya existe pero la finca no, se reutiliza el usuario sin cambiar su contraseña, pero el mensaje final puede imprimir una contraseña generada que **no fue aplicada** (`:15-20, 51-67, 192-202`). Para credenciales deterministas, defina `DEMO_PASSWORD`.
- El resultado imprime correo y contraseña; guárdela en ese momento porque no se persiste en otro sitio.

```bash
node scripts/seed-demo.mjs
DEMO_EMAIL=demo@macollo.local DEMO_PASSWORD='Demo123456' node scripts/seed-demo.mjs
```

## `scripts/seed-production.mjs` — siembra en Neon

Declara una URL Neon literal como respaldo (`seed-production.mjs:4-6`) y un pool con `ssl: { rejectUnauthorized: false }` (`:8-11`). Crea o actualiza `admin@macollo.tech` como `Superadmin` con una contraseña fija en el código (`:24-55`), reutiliza la primera finca de ese usuario o crea «Invernadero Macollo Principal» (`:57-82`), vincula la membresía `dueno` (`:84-89`), siembra 20 plantas (`:91-107`) y 60 lecturas de calibración (`:109-175`). Al terminar imprime las credenciales (`:176-184`).

**Efectos en BD (Neon, no local por defecto):** `users`, `fincas`, `finca_miembros`, `plantas`, `lecturas`. No escribe archivos.

**Precauciones:**

- **No ejecutar en una BD de producción real sin revisar antes:** la contraseña y la URL de respaldo están codificadas y la consulta de usuario incluye `OR id = 1` (`:30-33`), por lo que puede sobreescribir al usuario con id 1.
- La búsqueda de usuario es `email = adminEmail OR id = 1`; la actualización cambia email, nombre, contraseña, rol y `emailVerified` (`:35-45`).
- Requiere `DATABASE_URL` exportado para apuntar a otra instancia; no carga `.env`.
- Rotar cualquier credencial que haya figurado en este archivo o en historiales de ejecución.

```bash
export DATABASE_URL='postgres://usuario:password@host/neondb?sslmode=require'
node scripts/seed-production.mjs
```

## `scripts/migrate-neon.mjs` — migración de esquema

Ejecuta una única cadena SQL entre `BEGIN;` y `COMMIT;` (`migrate-neon.mjs:12-163`) y, si tiene éxito, lista las tablas de `public` (`:165-184`). Opera sobre `DATABASE_URL` o la URL Neon literal de respaldo (`:3-10`); no carga `.env`.

| Bloque SQL            | Efecto                                                                                                                           | Referencia |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| Enum `user_role_enum` | Si contiene `Agronomo`/`Super admin`, recrea el enum con `Superadmin                                                             | Admin      | Agropecuario | Campesino` y mapea valores | `:15-44` |
| Usuario id 1          | `UPDATE users SET role='Superadmin' WHERE id=1`                                                                                  | `:46-47`   |
| Plantas legacy        | Renombra `plantas` a `plantas_legacy` si no tiene columna `finca_id`                                                             | `:49-60`   |
| Fincas y membresías   | `CREATE TABLE IF NOT EXISTS fincas`, `finca_miembros`, `finca_invitaciones` + índices                                            | `:62-103`  |
| Plantas y lecturas    | Tablas con `UNIQUE (finca_id, fila, columna)` y `UNIQUE (finca_id, planta_id, fecha, hora)`; agrega `responsable` si falta       | `:105-141` |
| Galería               | Tabla `photos` con `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`, `finca_id` y `user_id` con `ON DELETE SET NULL`, más índices | `:143-160` |

**Precauciones:** es una migración con cambios destructivos/irreversibles en el estado previo (renombrado a `plantas_legacy`, reescritura de roles, Promoción del usuario 1). Hacer copia de seguridad y ejecutarla una sola vez. El esquema resultante debe cuadrar con los archivos incrementales `src/db/migrations/001-roles-farms.sql`, `002-add-responsable-to-lecturas.sql` y `003-add-sheets-url-to-fincas.sql`, que **no** son invocados por este script.

```bash
export DATABASE_URL='postgres://usuario:password@host/neondb?sslmode=require'
node scripts/migrate-neon.mjs
```

## Documento unificado y capturas (artefactos derivados)

Los artefactos de `docs/UNIFIED/` se generaron a partir del orden canónico de `manifest.json`, con enlaces convertidos en referencias internas y capturas incrustadas. El PDF final se validó con `pdfinfo`; no se edita a mano.

Las ocho capturas CAP-01…CAP-08 en `docs/capturas/` se obtuvieron con Playwright contra el servidor local, sin Astro Admin ni `/admin`, en resoluciones de escritorio y móvil. También son artefactos derivados: no se editan manualmente.

```bash
pdfinfo docs/UNIFIED/Macollo-Documentacion-Unificada.pdf | grep Pages
```

## Verificación posterior a la siembra

```bash
# Usuarios y roles (tras seed-admin o seed-production)
psql "$DATABASE_URL" -c "SELECT id, email, role FROM users ORDER BY id LIMIT 10;"

# Finca demo / finca principal y su matriz
psql "$DATABASE_URL" -c "SELECT id, nombre, dueno_id FROM fincas ORDER BY id;"
psql "$DATABASE_URL" -c "SELECT finca_id, count(*) FROM plantas GROUP BY finca_id;"
psql "$DATABASE_URL" -c "SELECT finca_id, count(*) FROM lecturas GROUP BY finca_id;"

# Galería por finca (relacionada con docs/CAMERA-ML.md)
psql "$DATABASE_URL" -c "SELECT finca_id, count(*) FROM photos GROUP BY finca_id;"
```

Tras `seed-demo.mjs`, las cuentas esperadas son 20 plantas y 60 lecturas para «Finca demo» (`scripts/seed-demo.mjs:116, 190`); tras `seed-production.mjs`, 20 plantas y 60 lecturas para «Invernadero Macollo Principal» (`scripts/seed-production.mjs:107, 175`).

## Trazabilidad

| Tema                                         | Archivo de código                                       | Doc relacionada                           | Verificación                                   |
| :------------------------------------------- | :------------------------------------------------------ | :---------------------------------------- | :--------------------------------------------- |
| Arranque LAN, IP, puerto 8000 y ML Cloud Run | `scripts/run-lan.sh:1-62`; `package.json:9-10`          | `docs/CAMERA-ML.md`, `docs/DEPLOYMENT.md` | Lectura directa (2026-11-23)                   |
| Credenciales admin y roles                   | `scripts/seed-admin.mjs:7-83`                           | `docs/AUTH.md`, `docs/SECURITY.md`        | Lectura directa (2026-11-23)                   |
| Datos demo y contraseña generada             | `scripts/seed-demo.mjs:8-210`                           | `docs/DEMO-DATA.md`                       | Lectura directa (2026-11-23)                   |
| Siembra en Neon y credenciales codificadas   | `scripts/seed-production.mjs:1-192`                     | `docs/DEPLOYMENT.md`, `docs/DATABASE.md`  | Lectura directa (2026-11-23)                   |
| Esquema migrado y tablas legacy              | `scripts/migrate-neon.mjs:12-187`; `src/db/migrations/` | `docs/DATABASE.md`                        | Lectura directa (2026-11-23)                   |
| Variables reales de entorno                  | `.env.example:1-33`, `astro.config.mjs:12`              | `docs/DEPLOYMENT.md`, `docs/CAMERA-ML.md` | Comparación directa (2026-11-23)               |
| Galería por finca y su consumo               | `src/pages/api/gallery/upload.ts:46-86`                 | `docs/CAMERA-ML.md`, `docs/ENDPOINTS.md`  | Lectura directa (2026-11-23)                   |
| Unificación y PDF con imágenes               | `docs/UNIFIED/manifest.json`, artefactos derivados      | `docs/README.md`, `docs/CAPTURAS.md`      | `pdfinfo` (2026-11-23)                         |
| Capturas reales sin `/admin`                 | `docs/capturas/*.jpg`                                   | `docs/CAPTURAS.md`, `docs/ROUTES.md`      | CAP-01…CAP-08 presentes en el PDF (2026-11-23) |
