# Base de datos — PostgreSQL (Macollo)

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-14**.

## 1. Alcance, fuentes y estado

Este documento describe el estado **implementado** del esquema de PostgreSQL y de la capa de persistencia. Toda afirmación se contrasta con el código fuente; cuando una convención es validada por la aplicación pero **no** por una restricción SQL, se indica expresamente.

| Fuente                                                                            | Qué autoriza                                                                               |
| :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| `src/db/auth-schema.sql`                                                          | Tipo `user_role_enum` y tablas `users`, `accounts`, `sessions`, `verification_token`.      |
| `src/db/greenhouse-schema.sql`                                                    | Tablas `fincas`, `finca_miembros`, `finca_invitaciones`, `plantas`, `lecturas` y `photos`. |
| `src/db/migrations/001-roles-farms.sql`                                           | Migración del enum y creación del dominio multi-tenant en bases preexistentes.             |
| `src/db/migrations/002-add-responsable-to-lecturas.sql`                           | Adición de `lecturas.responsable TEXT`.                                                    |
| `src/db/migrations/003-add-sheets-url-to-fincas.sql`                              | Adición de `fincas.sheets_url TEXT`.                                                       |
| `src/db/client.ts`                                                                | Pool `pg`, selección de `DATABASE_URL` o variables discretas, SSL.                         |
| `src/backend/services/{readings,sheetsSync,csvExport,excelExport,authz,farms}.ts` | Lectura/escritura, importación, exportación y control de acceso.                           |
| `src/shared/{plantMatrix,recordsParser,csv,serialize}.ts`                         | Tipos canónicos, parser de registros y conversiones.                                       |
| `scripts/{migrate-neon,seed-admin,seed-demo,seed-production}.mjs`                 | Migración y siembra en Neon/PostgreSQL.                                                    |
| `docs/sample-readings-demo.csv`, `.env.example`                                   | Fixture de campo y variables de entorno.                                                   |

**Estado correcto (corrección de deriva):** los datos agronómicos **persisten** en PostgreSQL. `POST /api/sync-sheets` valida sesión y acceso, descarga el CSV, interpreta los registros con `buildRecordsFromRows` y ejecuta `INSERT … ON CONFLICT` en `lecturas` (`src/pages/api/sync-sheets.ts:52-126`, `src/backend/services/readings.ts:123-191`). El tablero y el historial leen desde la BD mediante `getLecturasByFinca()` (`src/backend/services/readings.ts:85-104`). La referencia a una «brecha dataset-en-memoria» que todavía aparece en `docs/README.md:15` es **obsoleta**.

No se fija una versión mayor de PostgreSQL en los scripts: se emplean `SERIAL`/`BIGSERIAL`, `TIMESTAMPTZ`, `REAL` y `gen_random_uuid()` (`src/db/auth-schema.sql:31-43`, `src/db/greenhouse-schema.sql:79-100`, `src/db/greenhouse-schema.sql:116-129`). La afirmación anterior de «PostgreSQL 17» no es verificable desde las fuentes y se retira.

---

## 2. Conexión

`src/db/client.ts:18-44` exporta un único `Pool`. La rama seleccionada depende de que exista `DATABASE_URL`:

| Parámetro                 | Con `DATABASE_URL` (`client.ts:19-29`)                                              | Sin `DATABASE_URL` (`client.ts:30-43`)                                                                                                                                                                               |
| :------------------------ | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Destino                   | `connectionString: DATABASE_URL`                                                    | `POSTGRES_HOST` (por defecto `localhost`), `POSTGRES_PORT` (por defecto `5432`), `POSTGRES_USER` (por defecto `postgres`), `POSTGRES_PASSWORD` (por defecto `''`), `POSTGRES_DATABASE` (por defecto `astro_auth_db`) |
| SSL                       | `NODE_ENV === "production"` → `{ rejectUnauthorized: false }`; en otro caso `false` | Misma regla (`client.ts:36-39`)                                                                                                                                                                                      |
| `max`                     | `20`                                                                                | `20`                                                                                                                                                                                                                 |
| `idleTimeoutMillis`       | `30000`                                                                             | `30000`                                                                                                                                                                                                              |
| `connectionTimeoutMillis` | `5000`                                                                              | `2000`                                                                                                                                                                                                               |

Los errores de clientes inactivos se registran con `pool.on("error", …)` (`src/db/client.ts:46-48`). `auth.config.ts:56` reutiliza el mismo pool para el adaptador `@auth/pg-adapter`, aunque la estrategia de sesión es JWT (`auth.config.ts:170-174`).

Valores de plantilla en `.env.example:2-7`: `DATABASE_URL=postgres://postgres:TU_PASSWORD@localhost:5432/invernadero`, `POSTGRES_HOST=localhost`, `POSTGRES_PORT=5432`, `POSTGRES_USER=postgres`, `POSTGRES_PASSWORD=TU_PASSWORD`, `POSTGRES_DATABASE=invernadero`. El comentario de `src/db/auth-schema.sql:8` menciona `astro_auth_db`; ambas denominaciones son válidas siempre que el nombre coincida con la URL de conexión. La configuración de autenticación adicional (`AUTH_SECRET`, `SESSION_MAX_AGE_HOURS`, `AUTH_TRUST_HOST`) está en `.env.example:9-18`.

Comprobación ejecutable de conexión:

```bash
psql "$DATABASE_URL" -c 'SELECT current_database(), current_user, version();'
```

---

## 3. Instalación desde cero

```bash
# 1. Ajusta la URL a tu entorno (valor de ejemplo, no credencial real).
export DATABASE_URL='postgresql://postgres:TU_PASSWORD@localhost:5432/invernadero'

# 2. Crea la base de datos si no existe (usa un rol con privilegios CREATEDB).
psql 'postgresql://postgres:TU_PASSWORD@localhost:5432/postgres' -c 'CREATE DATABASE invernadero;'

# 3. Esquema de autenticación y esquema agronómico, en este orden.
psql "$DATABASE_URL" -f src/db/auth-schema.sql
psql "$DATABASE_URL" -f src/db/greenhouse-schema.sql

# 4. Verificación: deben aparecer 10 tablas en public.
psql "$DATABASE_URL" -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name;"
```

Salida esperada (10 tablas): `accounts`, `finca_invitaciones`, `finca_miembros`, `fincas`, `lecturas`, `photos`, `plantas`, `sessions`, `users`, `verification_token`. La consulta de verificación incluida en `src/db/greenhouse-schema.sql:107-110` solo lista las cinco tablas agronómicas principales; `photos` se crea después de `COMMIT` (`src/db/greenhouse-schema.sql:104-132`), por lo que no figura en esa comprobación parcial.

Siembra opcional (requiere Node ≥ 22.12.0, `package.json:8-14`):

```bash
# Cuenta privilegiada; ADMIN_ROLE admite los cuatro valores del enum.
ADMIN_EMAIL='tu@correo.com' ADMIN_PASSWORD='Secreta123' \
  node scripts/seed-admin.mjs

# Finca demo, 20 plantas y 60 lecturas (3 días × 20 plantas).
node scripts/seed-demo.mjs
```

`scripts/seed-admin.mjs:9-26` exige correo válido, contraseña de al menos 8 caracteres y rol del conjunto (`Superadmin`, `Admin`, `Agropecuario`, `Campesino`); hace upsert por `LOWER(email)` (`scripts/seed-admin.mjs:53-76`). `scripts/seed-demo.mjs:15-20` genera una contraseña aleatoria cuando `DEMO_PASSWORD` tiene menos de 8 caracteres y la imprime una sola vez; si ya existe «Finca demo», termina sin modificar lecturas (`scripts/seed-demo.mjs:70-79`). `scripts/seed-demo.mjs:22-42` y `scripts/seed-admin.mjs:28-48` sí importan `dotenv/config`; los scripts de Neon no.

---

## 4. Migraciones

| Script                                                  | Alcance exacto                                                                                                                                                                                                                                                              | Idempotencia / efecto                                                                                                                                                                                                                                                          |
| :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/db/migrations/001-roles-farms.sql`                 | Renombra `Super admin`→`Superadmin` y `Agronomo`→`Agropecuario` dentro de `user_role_enum` (`:16-46`); crea `fincas`, `finca_miembros`, `finca_invitaciones`, `plantas` y `lecturas` (`:51-134`).                                                                           | `CREATE TABLE IF NOT EXISTS`, índices `IF NOT EXISTS` y bloque `DO $$` condicionado a la existencia del valor antiguo. `lecturas` incluye `responsable_id` (`:128`) y `UNIQUE (finca_id, planta_id, fecha, hora)` (`:131`), pero **no** incluye `responsable` ni `sheets_url`. |
| `src/db/migrations/002-add-responsable-to-lecturas.sql` | `ALTER TABLE lecturas ADD COLUMN IF NOT EXISTS responsable TEXT;` (`:4`).                                                                                                                                                                                                   | La columna nueva es `responsable`; `responsable_id` **no** proviene de esta migración, ya estaba en la 001 y en el esquema agronómico.                                                                                                                                         |
| `src/db/migrations/003-add-sheets-url-to-fincas.sql`    | `ALTER TABLE fincas ADD COLUMN IF NOT EXISTS sheets_url TEXT;` (`:4`).                                                                                                                                                                                                      | Idempotente; conserva NULL en fincas existentes.                                                                                                                                                                                                                               |
| `scripts/migrate-neon.mjs`                              | Script integral para Neon: migra el enum, fuerza `role='Superadmin'` en `users.id=1` (`:47`), renombra `plantas` heredada sin `finca_id` a `plantas_legacy` (`:49-60`), crea las 10 tablas con `sheets_url`, `responsable` y `responsable_id`, y hace `COMMIT` (`:12-163`). | Todo el DDL va en una sola transacción, incluidas las tres tablas de `photos`. Usa `ssl: { rejectUnauthorized: false }` (`:7-10`). **No importa `dotenv/config`**: hay que exportar `DATABASE_URL`; si no, usa el literal de respaldo de `:4-5`.                               |

Orden recomendado en una base preexistente:

```bash
psql "$DATABASE_URL" -f src/db/migrations/001-roles-farms.sql
psql "$DATABASE_URL" -f src/db/migrations/002-add-responsable-to-lecturas.sql
psql "$DATABASE_URL" -f src/db/migrations/003-add-sheets-url-to-fincas.sql
```

Para una instancia Neon que aún no tenga el modelo actual, alternativa integral:

```bash
export DATABASE_URL='postgresql://…/neondb?sslmode=require'
node scripts/migrate-neon.mjs
```

> **Seguridad:** `scripts/migrate-neon.mjs:4-5` y `scripts/seed-production.mjs:4-6` contienen una URL de respaldo con credenciales literales; este documento no las reproduce. Fijar `DATABASE_URL` en el entorno y tratar esos valores como secretos comprometidos si el repositorio es accesible a terceros.

`scripts/seed-production.mjs` crea/actualiza un Superadmin, vincula la finca «Invernadero Macollo Principal», siembra 20 plantas y 60 lecturas con `responsable_id` del administrador (`:21-175`). Las credenciales y mensajes están codificados en `:24-25` y `:176-184`; no importa `dotenv/config` y usa el mismo respaldo Neon. Su ejecución no es necesaria para el esquema: es una siembra de calibración.

### Autoadición de columnas en tiempo de ejecución

Además de las migraciones, el código aplica DDL best-effort una vez por proceso:

- `src/backend/services/readings.ts:9-21`: `ALTER TABLE lecturas ADD COLUMN IF NOT EXISTS responsable TEXT;` antes de leer o insertar; silencia errores de permisos o tabla ausente.
- `src/pages/api/sync-sheets.ts:20-31`: `ALTER TABLE fincas ADD COLUMN IF NOT EXISTS sheets_url TEXT;` en `GET` y `POST`; también silencia errores.

Esto **no sustituye** a las migraciones: la autoadición depende de que el rol de aplicación tenga permisos DDL y de que se ejecute la ruta correspondiente.

---

## 5. Dominio de autenticación

### `user_role_enum`

```sql
CREATE TYPE user_role_enum AS ENUM ('Superadmin', 'Admin', 'Agropecuario', 'Campesino');
```

Definición condicional en `src/db/auth-schema.sql:18-28`; reconversión de valores antiguos en `src/db/migrations/001-roles-farms.sql:16-46` y en `scripts/migrate-neon.mjs:15-44`. `src/backend/services/authz.ts:3-4` declara los mismos cuatro roles y `dueno`/`miembro` para el ámbito de finca.

### `users` (`src/db/auth-schema.sql:31-43`)

| Columna           | Tipo             | Nulo | Valor por defecto         | FK / UK         | Índice                              | Significado                                                                                                                                                                          |
| :---------------- | :--------------- | :--- | :------------------------ | :-------------- | :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `SERIAL`         | No   | `nextval('users_id_seq')` | PK              | PK                                  | Identificador interno; Auth.js lo expone como `string` en el JWT (`auth.config.ts:189`).                                                                                             |
| `name`            | `VARCHAR(255)`   | Sí   | —                         | —               | —                                   | Nombre; las validaciones de obligatoriedad son de aplicación, no SQL.                                                                                                                |
| `email`           | `VARCHAR(255)`   | Sí   | —                         | `UNIQUE(email)` | `idx_users_email` + índice de la UK | Correo. La UK **distingue mayúsculas de minúsculas** en PostgreSQL; la aplicación compara con `LOWER(COALESCE(email,''))` (`auth.config.ts:94-102`, `scripts/seed-admin.mjs:53-55`). |
| `phone`           | `VARCHAR(50)`    | Sí   | —                         | —               | —                                   | Celular alternativo para login y recuperación.                                                                                                                                       |
| `birth_date`      | `DATE`           | Sí   | —                         | —               | —                                   | Fecha de nacimiento.                                                                                                                                                                 |
| `password`        | `VARCHAR(255)`   | Sí   | —                         | —               | —                                   | Hash bcrypt (salt 10); el login acepta transitoriamente texto plano y lo rehashea (`auth.config.ts:114-143`).                                                                        |
| `role`            | `user_role_enum` | No   | `'Campesino'`             | —               | `idx_users_role`                    | Rol del sistema; se relee de la BD en cada operación sensible (`authz.ts:50-73`).                                                                                                    |
| `"emailVerified"` | `TIMESTAMPTZ`    | Sí   | —                         | —               | —                                   | Marca de verificación; la siembra la fija con `NOW()`.                                                                                                                               |
| `image`           | `TEXT`           | Sí   | —                         | —               | —                                   | URL del avatar.                                                                                                                                                                      |
| `created_at`      | `TIMESTAMPTZ`    | Sí   | `CURRENT_TIMESTAMP`       | —               | —                                   | Creación. El DDL no declara `NOT NULL`.                                                                                                                                              |
| `updated_at`      | `TIMESTAMPTZ`    | Sí   | `CURRENT_TIMESTAMP`       | —               | —                                   | Actualización; se modifica explícitamente en reset-password y panel admin. **No hay trigger** que lo refresque solo.                                                                 |

### `accounts` (`src/db/auth-schema.sql:46-60`)

| Columna               | Tipo           | Nulo | Valor por defecto | FK / UK                                  | Índice          | Significado                                         |
| :-------------------- | :------------- | :--- | :---------------- | :--------------------------------------- | :-------------- | :-------------------------------------------------- |
| `id`                  | `SERIAL`       | No   | `nextval(...)`    | PK                                       | PK              | Identificador de cuenta OAuth.                      |
| `"userId"`            | `INTEGER`      | No   | —                 | FK → `users(id) ON DELETE CASCADE`       | —               | Propietario de la cuenta.                           |
| `type`                | `VARCHAR(255)` | No   | —                 | —                                        | —               | Tipo de cuenta del adaptador Auth.js.               |
| `provider`            | `VARCHAR(255)` | No   | —                 | `UNIQUE (provider, "providerAccountId")` | índice de la UK | Proveedor, p. ej. `google`.                         |
| `"providerAccountId"` | `VARCHAR(255)` | No   | —                 | `UNIQUE (provider, "providerAccountId")` | índice de la UK | Identificador remoto del proveedor.                 |
| `refresh_token`       | `TEXT`         | Sí   | —                 | —                                        | —               | Token de refresco OAuth.                            |
| `access_token`        | `TEXT`         | Sí   | —                 | —                                        | —               | Token de acceso OAuth.                              |
| `expires_at`          | `BIGINT`       | Sí   | —                 | —                                        | —               | Expiración en epoch (segundos), según el adaptador. |
| `token_type`          | `VARCHAR(255)` | Sí   | —                 | —                                        | —               | Tipo de token.                                      |
| `scope`               | `TEXT`         | Sí   | —                 | —                                        | —               | Alcances solicitados.                               |
| `id_token`            | `TEXT`         | Sí   | —                 | —                                        | —               | Token de identidad OIDC.                            |
| `session_state`       | `TEXT`         | Sí   | —                 | —                                        | —               | Estado de sesión del proveedor.                     |

`accounts` solo se pobla con «Continuar con Google» (`auth.config.ts:58-68`); con login por credenciales permanece en 0 filas. La tabla existe porque el adaptador está configurado (`auth.config.ts:56`).

### `sessions` (`src/db/auth-schema.sql:63-68`)

| Columna          | Tipo           | Nulo | Valor por defecto | FK / UK                            | Índice          | Significado                    |
| :--------------- | :------------- | :--- | :---------------- | :--------------------------------- | :-------------- | :----------------------------- |
| `id`             | `SERIAL`       | No   | `nextval(...)`    | PK                                 | PK              | Identificador de sesión.       |
| `"sessionToken"` | `VARCHAR(255)` | No   | —                 | `UNIQUE`                           | índice de la UK | Token opaco del adaptador.     |
| `"userId"`       | `INTEGER`      | No   | —                 | FK → `users(id) ON DELETE CASCADE` | —               | Usuario asociado.              |
| `expires`        | `TIMESTAMPTZ`  | No   | —                 | —                                  | —               | Expiración de la sesión en BD. |

Con `session.strategy='jwt'` y `updateAge = maxAge` (`auth.config.ts:170-174`, `auth.config.ts:39-52`), la sesión viaja en la cookie firmada: `sessions` queda normalmente en 0 filas. No es una condición de error; solo se usaría con estrategia `database`.

### `verification_token` (`src/db/auth-schema.sql:71-76`)

| Columna      | Tipo           | Nulo | Valor por defecto | FK / UK                  | Índice          | Significado                                                                  |
| :----------- | :------------- | :--- | :---------------- | :----------------------- | :-------------- | :--------------------------------------------------------------------------- |
| `identifier` | `VARCHAR(255)` | No   | —                 | `PK (identifier, token)` | índice de la PK | Email o celular canónico (`forgot-password.ts:82-85`). Sin FK hacia `users`. |
| `token`      | `VARCHAR(255)` | No   | —                 | `PK (identifier, token)` | índice de la PK | Código numérico de 6 dígitos (`forgot-password.ts:78-80`).                   |
| `expires`    | `TIMESTAMPTZ`  | No   | —                 | —                        | —               | Vigencia de 15 minutos.                                                      |

Corrección de deriva: no es correcto afirmar que «siempre está vacía salvo una recuperación en curso». Se inserta al solicitar el código, se depura al emitir uno nuevo (`src/pages/api/auth/forgot-password.ts:87-94`) y se elimina al consumirlo (`src/pages/api/auth/reset-password.ts:66-68`); un código nunca usado **puede permanecer expirado** hasta una limpieza (§9).

---

## 6. Dominio agronómico

Modelo multi-tenant por finca: 20 plantas por finca (matriz 4 × 5) y una fila de `lecturas` por visita a una planta (`src/db/greenhouse-schema.sql:3`, `src/shared/plantMatrix.ts:1-8`).

### `fincas` (`src/db/greenhouse-schema.sql:17-29`)

| Columna       | Tipo           | Nulo | Valor por defecto   | FK / UK                             | Índice              | Significado                                                                                                                                                 |
| :------------ | :------------- | :--- | :------------------ | :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | `SERIAL`       | No   | `nextval(...)`      | PK                                  | PK                  | Identificador de finca.                                                                                                                                     |
| `nombre`      | `VARCHAR(255)` | No   | —                   | —                                   | —                   | Nombre visible.                                                                                                                                             |
| `descripcion` | `TEXT`         | Sí   | —                   | —                                   | —                   | Descripción libre.                                                                                                                                          |
| `ubicacion`   | `TEXT`         | Sí   | —                   | —                                   | —                   | Localización.                                                                                                                                               |
| `sheets_url`  | `TEXT`         | Sí   | —                   | —                                   | —                   | Enlace de Google Sheets/Drive recordado por finca. Migración 003 (`:4`), esquema (`:22`), `migrate-neon.mjs:68,76` y autoadición en `sync-sheets.ts:24-26`. |
| `dueno_id`    | `INTEGER`      | No   | —                   | FK → `users(id) ON DELETE RESTRICT` | `idx_fincas_dueno`  | Dueño; impide borrar un usuario con fincas asociadas.                                                                                                       |
| `activa`      | `BOOLEAN`      | No   | `TRUE`              | —                                   | `idx_fincas_activa` | `FALSE` = archivada, restaurable; el borrado físico está restringido a Superadmin (`authz.ts:83-85`).                                                       |
| `created_at`  | `TIMESTAMPTZ`  | No   | `CURRENT_TIMESTAMP` | —                                   | —                   | Creación.                                                                                                                                                   |
| `updated_at`  | `TIMESTAMPTZ`  | No   | `CURRENT_TIMESTAMP` | —                                   | —                   | Se actualiza en `updateFinca`, `setFincaActiva` y al guardar `sheets_url` (`farms.ts:178,194`, `sync-sheets.ts:105`).                                       |

`sheets_url` **no** forma parte de `FincaRow` en `src/backend/services/farms.ts:9-20`: se consulta y escribe exclusivamente desde `GET`/`POST /api/sync-sheets` (`src/pages/api/sync-sheets.ts:37-50`, `:72-126`). `POST` usa la URL del cuerpo si viene y, si no, la guardada; tras descargar con éxito persiste la URL efectiva (`sync-sheets.ts:74-110`).

### `finca_miembros` (`src/db/greenhouse-schema.sql:35-45`)

| Columna      | Tipo          | Nulo | Valor por defecto   | FK / UK                                                           | Índice                                       | Significado                                      |
| :----------- | :------------ | :--- | :------------------ | :---------------------------------------------------------------- | :------------------------------------------- | :----------------------------------------------- |
| `id`         | `SERIAL`      | No   | `nextval(...)`      | PK                                                                | PK                                           | Identificador de membresía.                      |
| `finca_id`   | `INTEGER`     | No   | —                   | FK → `fincas(id) ON DELETE CASCADE`; `UNIQUE (finca_id, user_id)` | `idx_finca_miembros_finca` + índice de la UK | Finca compartida.                                |
| `user_id`    | `INTEGER`     | No   | —                   | FK → `users(id) ON DELETE CASCADE`; `UNIQUE (finca_id, user_id)`  | `idx_finca_miembros_user`                    | Miembro.                                         |
| `rol_finca`  | `VARCHAR(12)` | No   | `'miembro'`         | `CHECK (rol_finca IN ('dueno','miembro'))`                        | —                                            | Rol dentro de la finca, distinto del rol global. |
| `created_at` | `TIMESTAMPTZ` | No   | `CURRENT_TIMESTAMP` | —                                                                 | —                                            | Fecha de ingreso.                                |

La creación de finca inserta o actualiza la membresía `dueno` en la misma transacción que la finca y las 20 plantas (`farms.ts:98-123`). El acceso efectivo se calcula en `authz.ts:91-107`: staff = `staff`, dueño = `dueno`, resto con membresía = `miembro`, sin membresía = `none`.

### `finca_invitaciones` (`src/db/greenhouse-schema.sql:50-61`)

| Columna        | Tipo          | Nulo | Valor por defecto   | FK / UK                             | Índice                   | Significado                                                           |
| :------------- | :------------ | :--- | :------------------ | :---------------------------------- | :----------------------- | :-------------------------------------------------------------------- |
| `id`           | `SERIAL`      | No   | `nextval(...)`      | PK                                  | PK                       | Identificador de invitación.                                          |
| `finca_id`     | `INTEGER`     | No   | —                   | FK → `fincas(id) ON DELETE CASCADE` | `idx_invitaciones_finca` | Finca invitada.                                                       |
| `codigo`       | `VARCHAR(20)` | No   | —                   | `UNIQUE`                            | índice de la UK          | Código de 8 caracteres en mayúsculas, sin prefijo (`farms.ts:28-31`). |
| `creado_por`   | `INTEGER`     | No   | —                   | FK → `users(id) ON DELETE CASCADE`  | —                        | Usuario que generó el código.                                         |
| `expira_en`    | `TIMESTAMPTZ` | No   | —                   | —                                   | —                        | Fecha de expiración.                                                  |
| `usos_maximos` | `INTEGER`     | No   | `1`                 | `CHECK (usos_maximos > 0)`          | —                        | Número de canjes permitidos.                                          |
| `usos_usados`  | `INTEGER`     | No   | `0`                 | `CHECK (usos_usados >= 0)`          | —                        | Canjes consumidos.                                                    |
| `activa`       | `BOOLEAN`     | No   | `TRUE`              | —                                   | —                        | `FALSE` = revocada.                                                   |
| `created_at`   | `TIMESTAMPTZ` | No   | `CURRENT_TIMESTAMP` | —                                   | —                        | Creación.                                                             |

El alfabeto se deriva de `nolookalikesSafe` en mayúsculas y deduplicado (`farms.ts:28-31`); `generarCodigoInvitacion` reintenta hasta 8 veces ante colisiones (`:43-56`). El canje normaliza a mayúsculas, bloquea la fila con `FOR UPDATE OF i`, valida vigencia/usos/membresía y escribe membresía y contador en una transacción (`farms.ts:308-369`). `peekInvitacion` solo valida, sin consumir la invitación (`:372-398`).

### `plantas` (`src/db/greenhouse-schema.sql:66-74`)

| Columna    | Tipo          | Nulo | Valor por defecto | FK / UK                                                                                            | Índice                                | Significado                                                                                              |
| :--------- | :------------ | :--- | :---------------- | :------------------------------------------------------------------------------------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------- |
| `id`       | `SERIAL`      | No   | `nextval(...)`    | PK                                                                                                 | PK                                    | Identificador interno usado por `lecturas.planta_id`.                                                    |
| `finca_id` | `INTEGER`     | No   | —                 | FK → `fincas(id) ON DELETE CASCADE`; `UNIQUE (finca_id, fila, columna)`                            | `idx_plantas_finca` + índice de la UK | Finca propietaria.                                                                                       |
| `fila`     | `VARCHAR(4)`  | No   | —                 | `CHECK (fila IN ('t0','t1','t2','t3'))`; `UNIQUE (finca_id, fila, columna)`                        | índice de la UK                       | Fila de la matriz.                                                                                       |
| `columna`  | `VARCHAR(8)`  | No   | —                 | `CHECK (columna IN ('Col 1','Col 2','Col 3','Col 4','Col 5'))`; `UNIQUE (finca_id, fila, columna)` | índice de la UK                       | Columna de la matriz.                                                                                    |
| `plant_id` | `VARCHAR(16)` | No   | —                 | —                                                                                                  | —                                     | Etiqueta `P-01`…`P-20` calculada por `fila*5 + columna + 1` (`farms.ts:66-67`). No es única por sí sola. |

La siembra estándar usa `ON CONFLICT (finca_id, fila, columna) DO NOTHING` (`farms.ts:58-76`). La unicidad es por coordenadas, no por `plant_id`.

### `lecturas` (`src/db/greenhouse-schema.sql:79-102`)

| Columna          | Tipo          | Nulo | Valor por defecto   | FK / UK                                                                           | Índice                                       | Significado                                                                                                                                                       |
| :--------------- | :------------ | :--- | :------------------ | :-------------------------------------------------------------------------------- | :------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `BIGSERIAL`   | No   | `nextval(...)`      | PK                                                                                | PK                                           | Identificador de lectura; se expone como `LEC-<id>` (`readings.ts:56`).                                                                                           |
| `finca_id`       | `INTEGER`     | No   | —                   | FK → `fincas(id) ON DELETE CASCADE`; `UNIQUE (finca_id, planta_id, fecha, hora)`  | `idx_lecturas_finca_fecha` + índice de la UK | Finca de la medición.                                                                                                                                             |
| `planta_id`      | `INTEGER`     | No   | —                   | FK → `plantas(id) ON DELETE CASCADE`; `UNIQUE (finca_id, planta_id, fecha, hora)` | `idx_lecturas_planta` + índice de la UK      | Planta visitada.                                                                                                                                                  |
| `fecha`          | `DATE`        | No   | —                   | `UNIQUE (finca_id, planta_id, fecha, hora)`                                       | índice de la UK + `idx_lecturas_finca_fecha` | Fecha de la visita en formato SQL.                                                                                                                                |
| `hora`           | `VARCHAR(20)` | No   | `''` (cadena vacía) | `UNIQUE (finca_id, planta_id, fecha, hora)`                                       | índice de la UK                              | Hora textual, p. ej. `09:00 AM`. **No** tiene como valor por defecto `09:00 AM` en la BD.                                                                         |
| `ph_suelo`       | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | pH (0–14 por validación del parser).                                                                                                                              |
| `temp_interna`   | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | Temperatura interna del invernadero.                                                                                                                              |
| `temp_externa`   | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | Temperatura externa.                                                                                                                                              |
| `temp_suelo`     | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | Temperatura del sustrato/suelo.                                                                                                                                   |
| `humedad`        | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | Humedad relativa (0–100 por validación del parser).                                                                                                               |
| `altura_cm`      | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | Altura de la planta en centímetros.                                                                                                                               |
| `crecimiento`    | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | Porcentaje derivado de la altura.                                                                                                                                 |
| `fase`           | `TEXT`        | Sí   | —                   | —                                                                                 | —                                            | Fase fenológica.                                                                                                                                                  |
| `productividad`  | `TEXT`        | Sí   | —                   | —                                                                                 | —                                            | `Alta`/`Media`/`Baja` por convención de aplicación.                                                                                                               |
| `sanidad`        | `TEXT`        | Sí   | —                   | —                                                                                 | —                                            | `Excelente`/`Saludable`/`Vulnerable`/`Crítica` por convención de aplicación.                                                                                      |
| `responsable`    | `TEXT`        | Sí   | —                   | —                                                                                 | —                                            | Nombre literal del responsable tal como figura en la hoja. Migración 002 (`:4`), esquema (`:95`), `migrate-neon.mjs:133,141` y autoadición en `readings.ts:9-21`. |
| `responsable_id` | `INTEGER`     | Sí   | —                   | FK → `users(id) ON DELETE SET NULL`                                               | —                                            | Usuario autenticado que sincronizó. Presente en `001-roles-farms.sql:128`, `greenhouse-schema.sql:96` y `migrate-neon.mjs:134`.                                   |
| `observaciones`  | `TEXT`        | Sí   | —                   | —                                                                                 | —                                            | Notas de campo o texto generado por el parser.                                                                                                                    |
| `created_at`     | `TIMESTAMPTZ` | No   | `CURRENT_TIMESTAMP` | —                                                                                 | —                                            | Creación del registro.                                                                                                                                            |

No hay `CHECK` numérico en la BD: los rangos y derivaciones se aplican en `src/shared/recordsParser.ts:318-374` y `src/shared/csv.ts:126-168`. La clave `UNIQUE (finca_id, planta_id, fecha, hora)` es la base de la deduplicación: `insertLecturas` ejecuta `ON CONFLICT … DO UPDATE` y conserva `responsable`/`responsable_id` previos cuando el nuevo valor es NULL (`readings.ts:141-160`). Las semillas usan `DO NOTHING` (`seed-demo.mjs:159-165`, `seed-production.mjs:140-152`).

En lectura, el nombre se resuelve con `COALESCE(NULLIF(TRIM(l.responsable), ''), u.name, 'Sin registrar')` y se une `users` por `responsable_id` (`readings.ts:89-100`).

### `photos` (`src/db/greenhouse-schema.sql:116-132`)

| Columna       | Tipo           | Nulo | Valor por defecto   | FK / UK                              | Índice                          | Significado                                                                |
| :------------ | :------------- | :--- | :------------------ | :----------------------------------- | :------------------------------ | :------------------------------------------------------------------------- |
| `id`          | `UUID`         | No   | `gen_random_uuid()` | PK                                   | PK                              | Identificador de la foto. No se declara `CREATE EXTENSION` en los scripts. |
| `filename`    | `VARCHAR(255)` | No   | —                   | —                                    | —                               | Nombre de archivo original.                                                |
| `url`         | `TEXT`         | No   | —                   | —                                    | —                               | Ubicación pública del objeto.                                              |
| `mime_type`   | `VARCHAR(100)` | Sí   | —                   | —                                    | —                               | Tipo MIME.                                                                 |
| `width`       | `INTEGER`      | Sí   | —                   | —                                    | —                               | Ancho en píxeles.                                                          |
| `height`      | `INTEGER`      | Sí   | —                   | —                                    | —                               | Alto en píxeles.                                                           |
| `size_bytes`  | `BIGINT`       | Sí   | —                   | —                                    | —                               | Tamaño en bytes.                                                           |
| `caption`     | `TEXT`         | Sí   | —                   | —                                    | —                               | Pie de foto opcional.                                                      |
| `finca_id`    | `INTEGER`      | Sí   | —                   | FK → `fincas(id) ON DELETE SET NULL` | `idx_photos_finca`              | Finca asociada; se conserva la foto si se borra la finca.                  |
| `user_id`     | `INTEGER`      | Sí   | —                   | FK → `users(id) ON DELETE SET NULL`  | `idx_photos_user`               | Autor de la subida.                                                        |
| `taken_at`    | `TIMESTAMPTZ`  | Sí   | —                   | —                                    | —                               | Fecha de captura.                                                          |
| `uploaded_at` | `TIMESTAMPTZ`  | No   | `CURRENT_TIMESTAMP` | —                                    | `idx_photos_uploaded_at` (DESC) | Fecha de subida.                                                           |

---

## 7. Diagrama entidad-relación

```mermaid
erDiagram
    users ||--o{ accounts : "OAuth (userId)"
    users ||--o{ sessions : "sessionToken"
    users ||--o{ fincas : "dueno_id (RESTRICT)"
    users ||--o{ finca_miembros : "user_id"
    users ||--o{ finca_invitaciones : "creado_por"
    fincas ||--o{ finca_miembros : "finca_id"
    fincas ||--o{ finca_invitaciones : "finca_id"
    fincas ||--o{ plantas : "finca_id"
    fincas ||--o{ lecturas : "finca_id"
    plantas ||--o{ lecturas : "planta_id"
    users |o--o{ lecturas : "responsable_id (SET NULL)"
    fincas |o--o{ photos : "finca_id (SET NULL)"
    users |o--o{ photos : "user_id (SET NULL)"

    users {
        int id PK
        varchar name
        varchar email UK
        varchar phone
        date birth_date
        varchar password
        enum role
        timestamptz emailVerified
        text image
        timestamptz created_at
        timestamptz updated_at
    }
    accounts {
        int id PK
        int userId FK
        varchar type
        varchar provider
        varchar providerAccountId
        text refresh_token
        text access_token
        bigint expires_at
        varchar token_type
        text scope
        text id_token
        text session_state
    }
    sessions {
        int id PK
        varchar sessionToken UK
        int userId FK
        timestamptz expires
    }
    verification_token {
        varchar identifier PK
        varchar token PK
        timestamptz expires
    }
    fincas {
        int id PK
        varchar nombre
        text descripcion
        text ubicacion
        text sheets_url
        int dueno_id FK
        boolean activa
        timestamptz created_at
        timestamptz updated_at
    }
    finca_miembros {
        int id PK
        int finca_id FK
        int user_id FK
        varchar rol_finca
        timestamptz created_at
    }
    finca_invitaciones {
        int id PK
        int finca_id FK
        varchar codigo UK
        int creado_por FK
        timestamptz expira_en
        int usos_maximos
        int usos_usados
        boolean activa
        timestamptz created_at
    }
    plantas {
        int id PK
        int finca_id FK
        varchar fila
        varchar columna
        varchar plant_id
    }
    lecturas {
        bigint id PK
        int finca_id FK
        int planta_id FK
        date fecha
        varchar hora
        real ph_suelo
        real temp_interna
        real temp_externa
        real temp_suelo
        real humedad
        real altura_cm
        real crecimiento
        text fase
        text productividad
        text sanidad
        text responsable
        int responsable_id FK
        text observaciones
        timestamptz created_at
    }
    photos {
        uuid id PK
        varchar filename
        text url
        varchar mime_type
        int width
        int height
        bigint size_bytes
        text caption
        int finca_id FK
        int user_id FK
        timestamptz taken_at
        timestamptz uploaded_at
    }
```

`verification_token` se representa sin relación: su `identifier` es un email/teléfono y no una FK (`forgot-password.ts:82-94`). Las únicas restricciones de unicidad compuestas relevantes para el negocio son `UNIQUE (finca_id, user_id)`, `UNIQUE (finca_id, fila, columna)` y `UNIQUE (finca_id, planta_id, fecha, hora)`.

---

## 8. Flujos de datos

### Importación desde Google Sheets

1. `resolveActiveFinca()` exige sesión y resuelve la finca activa desde la cookie `finca_activa` o, si hay una sola, la única disponible (`farms.ts:413-429`, `authz.ts:137-161`).
2. `getFincaAccess()` + `canConnectSheets()` permiten a `dueno`, `staff` y `miembro` sincronizar (`sync-sheets.ts:65-70`, `authz.ts:91-129`).
3. Se obtiene la URL del cuerpo o de `fincas.sheets_url`; si no hay ninguna se responde `400` con `needsUrl: true` (`sync-sheets.ts:72-97`).
4. `normalizeGoogleSheetUrl()` convierte enlaces `/file/d/<id>` y `open?id=<id>` de Drive a `…/export?format=csv`, respeta enlaces `/spreadsheets/d/e/…/pub?output=csv` y añade `gid` cuando aplica (`sheetsSync.ts:13-54`).
5. `fetchSheetRecords()` usa `User-Agent: Macollo-Greenhouse-Sync/2.0`, parsea con `parseCSV()` y delega en `buildRecordsFromRows()` (`sheetsSync.ts:56-90`); errores HTTP o ausencia de registros producen `SheetsSyncError` con estado 422 (`:66-87`, `:92-99`).
6. Se persiste la URL (`sync-sheets.ts:102-110`) y se llama a `insertLecturas(fincaId, records, ctx.user.id)` (`:114`), que hace `responsable_id = usuario autenticado` y `responsable = texto de la hoja`.
7. `insertLecturas()` opera en una transacción, valida `YYYY-MM-DD`, resuelve `(fila, columna)` contra `plantas`, aplica el upsert por clave compuesta y devuelve el número de filas intentadas (`readings.ts:123-191`). Un error revierte toda la operación.

### Lectura y reconstrucción de la matriz

`getLecturasByFinca()` ordena por `fecha` y `hora` ascendente y mapea cada fila a `MetricRecord` (`readings.ts:50-104`). `buildPlantsGridFromRecords()` reconstruye las 20 celdas y asigna como `latestMetric` el último elemento del historial ordenado; sin registros usa `pendingMetric()` (`plantMatrix.ts:158-188`, `:190-235`). Sin finca activa el tablero cae a una matriz vacía, pero la fuente de datos es la BD.

---

## 9. Mantenimiento, backup y auditoría

### Backup y restauración

```bash
# Copia lógica completa, esquema y datos.
pg_dump "$DATABASE_URL" -Fc -f "backup_macollo_$(date +%F).dump"

# Copia legible para revisión en el repositorio (sin credenciales).
pg_dump "$DATABASE_URL" -f "backup_macollo_$(date +%F).sql"

# Restauración en una base vacía.
pg_restore --clean --if-exists -d "$DATABASE_URL" "backup_macollo_$(date +%F).dump"
```

Respaldo antes de cada migración o sprint de campo; verificar con `psql "$DATABASE_URL" -c 'SELECT count(*) FROM lecturas;'`.

### Consultas de auditoría

```sql
-- A. Inventario completo de columnas (tipos, nulabilidad y defaults reales).
SELECT table_name, ordinal_position, column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- B. Columnas incorporadas por las migraciones 002 y 003.
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND ((table_name = 'fincas' AND column_name = 'sheets_url')
    OR (table_name = 'lecturas' AND column_name IN ('responsable', 'responsable_id')))
ORDER BY table_name, column_name;

-- C. Restricciones de unicidad y claves foráneas de lecturas.
SELECT conname, pg_get_constraintdef(oid) AS definicion
FROM pg_constraint
WHERE conrelid = 'public.lecturas'::regclass
ORDER BY conname;

-- D. Índices declarados (deben incluir los prefijados idx_* del esquema).
SELECT tablename, indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- E. Claves duplicadas en lecturas (debe devolver 0).
SELECT count(*) AS claves_duplicadas
FROM (
  SELECT finca_id, planta_id, fecha, hora
  FROM lecturas
  GROUP BY finca_id, planta_id, fecha, hora
  HAVING count(*) > 1
) d;

-- F. Integridad referencial: todos los conteos deben ser 0.
SELECT 'lecturas.finca_id' AS relacion, count(*) AS huerfanos
  FROM lecturas l LEFT JOIN fincas f ON f.id = l.finca_id WHERE f.id IS NULL
UNION ALL
SELECT 'lecturas.planta_id', count(*)
  FROM lecturas l LEFT JOIN plantas p ON p.id = l.planta_id WHERE p.id IS NULL
UNION ALL
SELECT 'lecturas.responsable_id', count(*)
  FROM lecturas l LEFT JOIN users u ON u.id = l.responsable_id
 WHERE l.responsable_id IS NOT NULL AND u.id IS NULL
UNION ALL
SELECT 'fincas.dueno_id', count(*)
  FROM fincas f LEFT JOIN users u ON u.id = f.dueno_id WHERE u.id IS NULL;

-- G. Cobertura del responsable textual frente al usuario vinculado.
SELECT count(*) AS total,
       count(*) FILTER (WHERE NULLIF(TRIM(responsable), '') IS NOT NULL) AS con_texto,
       count(*) FILTER (WHERE responsable_id IS NOT NULL) AS con_usuario,
       count(*) FILTER (WHERE NULLIF(TRIM(responsable), '') IS NULL AND responsable_id IS NULL) AS sin_responsable
FROM lecturas;

-- H. Distribución de roles y fincas por usuario.
SELECT role, count(*) AS usuarios FROM users GROUP BY role ORDER BY role;
SELECT dueno_id, count(*) AS fincas FROM fincas GROUP BY dueno_id ORDER BY fincas DESC;

-- I. Invitaciones vigentes y consumadas.
SELECT f.nombre, i.codigo, i.usos_maximos, i.usos_usados, i.activa, i.expira_en
FROM finca_invitaciones i
JOIN fincas f ON f.id = i.finca_id
WHERE i.activa AND i.expira_en > now() AND i.usos_usados < i.usos_maximos
ORDER BY i.expira_en;

-- J. Códigos de recuperación expirados (limpieza opcional).
SELECT count(*) AS expirados FROM verification_token WHERE expires < now();
DELETE FROM verification_token WHERE expires < now();

-- K. Volumen y tamaño por tabla.
SELECT relname, n_live_tup AS filas_estimadas
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;
SELECT pg_size_pretty(pg_total_relation_size('public.lecturas')) AS tamano_lecturas;

-- L. Cambios de rol recientes (updated_at no tiene trigger: se actualiza en app).
SELECT id, name, role, updated_at FROM users ORDER BY updated_at DESC LIMIT 20;
```

Cambio de rol controlado:

```sql
UPDATE users SET role = 'Agropecuario', updated_at = now()
WHERE lower(COALESCE(email, '')) = lower('x@y.z');
```

Los valores válidos son exactamente `Superadmin`, `Admin`, `Agropecuario` y `Campesino`. Archivar una finca es `UPDATE fincas SET activa = FALSE, updated_at = now() WHERE id = <id>;`; el borrado físico solo debe realizarse desde el flujo restringido a Superadmin.

---

## 10. Correcciones de deriva aplicadas

| Afirmación anterior                                                 | Realidad verificada                                                                                                                                            | Fuente                                                                                                                    |
| :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| «Los datos agronómicos no persisten / dataset en memoria».          | Persisten con upsert en `lecturas`; el tablero consulta PostgreSQL.                                                                                            | `src/pages/api/sync-sheets.ts:100-126`; `src/backend/services/readings.ts:85-191`; `docs/README.md:15` (índice obsoleto). |
| «`fincas` no tiene `sheets_url`».                                   | Columna `TEXT` nullable añadida por la migración 003 y presente en esquema, Neon y autoadición.                                                                | `src/db/migrations/003-add-sheets-url-to-fincas.sql:4`; `src/db/greenhouse-schema.sql:22`.                                |
| «`lecturas.responsable_id` proviene de la migración 002».           | La 002 añade `responsable TEXT`; `responsable_id` ya estaba en la 001 y en el esquema.                                                                         | `src/db/migrations/002-add-responsable-to-lecturas.sql:4`; `src/db/migrations/001-roles-farms.sql:128`.                   |
| «`responsable` es un alias de `responsable_id`».                    | Son dos columnas: texto de hoja y FK a `users`; en lectura se combinan con `COALESCE`.                                                                         | `src/backend/services/readings.ts:94,158-159`.                                                                            |
| «`hora` por defecto `09:00 AM`».                                    | El DDL fija `''`; el parser extrae la hora del campo de fecha y puede dejarla vacía.                                                                           | `src/db/greenhouse-schema.sql:84`; `src/shared/csv.ts:80-95`; `src/shared/recordsParser.ts:315,385`.                      |
| «`email` es único case-insensitive en la BD».                       | La restricción `UNIQUE` es case-sensitive; la comparación insensible se hace en la aplicación.                                                                 | `src/db/auth-schema.sql:34`; `auth.config.ts:94-102`.                                                                     |
| «Las tablas auxiliares están siempre vacías».                       | Correcto solo en condiciones determinadas: `accounts` sin Google, `sessions` con JWT; `verification_token` es transitorio y puede conservar códigos expirados. | `auth.config.ts:56,170-174`; `src/pages/api/auth/forgot-password.ts:87-94`.                                               |
| «`updated_at` se actualiza automáticamente».                        | Tiene valor por defecto, no trigger; se actualiza explícitamente en los servicios.                                                                             | `farms.ts:178,194`; `sync-sheets.ts:105`.                                                                                 |
| «`photos` se crea dentro de la transacción del esquema agronómico». | Se define después de `COMMIT` en ese archivo; en `migrate-neon.mjs` sí queda dentro de la transacción.                                                         | `src/db/greenhouse-schema.sql:104-132`; `scripts/migrate-neon.mjs:143-162`.                                               |
| «PostgreSQL 17» sin evidencia.                                      | Versión no fijada en los scripts; se documentan solo los tipos empleados.                                                                                      | `src/db/auth-schema.sql`; `src/db/greenhouse-schema.sql`.                                                                 |

---

## Trazabilidad

| Concepto                           | Archivo de código / esquema                                                                                                                    | Documento relacionado                                               | Verificación                                                                                                |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------- |
| Pool, SSL y tiempos de espera      | `src/db/client.ts:18-48`; `.env.example:2-7`                                                                                                   | `docs/DEPLOYMENT.md`, `docs/SECURITY.md`                            | Leído directamente; `DATABASE_URL` con SSL solo en producción.                                              |
| Enum y tablas de autenticación     | `src/db/auth-schema.sql:18-76`; `auth.config.ts:56,170-174`                                                                                    | `docs/AUTH.md`                                                      | `strategy: "jwt"`; `sessions` permanece sin filas en el flujo habitual.                                     |
| Multi-tenant y unicidad agronómica | `src/db/greenhouse-schema.sql:17-102`; `src/db/migrations/001-roles-farms.sql:51-134`                                                          | `docs/ARCHITECTURE.md`                                              | `UNIQUE (finca_id, planta_id, fecha, hora)` en ambos archivos.                                              |
| `responsable` y `responsable_id`   | `src/db/migrations/002-add-responsable-to-lecturas.sql:4`; `src/db/greenhouse-schema.sql:95-96`; `src/backend/services/readings.ts:94,141-179` | `docs/DATA-DICTIONARY.md`                                           | Columnas independientes; `COALESCE` en lectura y en upsert.                                                 |
| `sheets_url`                       | `src/db/migrations/003-add-sheets-url-to-fincas.sql:4`; `src/pages/api/sync-sheets.ts:20-31,45-49,78-110`                                      | `docs/ENDPOINTS.md`                                                 | No incluido en `FincaRow` (`farms.ts:9-20`); se gestiona desde `/api/sync-sheets`.                          |
| Deduplicación y persistencia       | `src/backend/services/readings.ts:123-191`; `src/pages/api/sync-sheets.ts:99-126`                                                              | `docs/ENDPOINTS.md`, `docs/USER_MANUAL.md`                          | `ON CONFLICT DO UPDATE`; transacción con `ROLLBACK` en error.                                               |
| Parser y formatos de fecha         | `src/shared/recordsParser.ts:252-405`; `src/shared/csv.ts:17-124`                                                                              | `docs/DATA-DICTIONARY.md`, `docs/FIELD-PROTOCOL.md`                 | Serial Excel 40000–60000 con época 1899-12-30; hora extraída del campo fecha.                               |
| Roles, invitaciones y acceso       | `src/backend/services/authz.ts:3-129`; `src/backend/services/farms.ts:28-56,308-398`                                                           | `docs/AUTH.md`, `docs/ROUTES.md`                                    | Código 8 caracteres; canje con `FOR UPDATE OF i`.                                                           |
| Migración y siembra Neon           | `scripts/migrate-neon.mjs:4-10,12-163`; `scripts/seed-production.mjs:4-11,21-175`                                                              | `docs/SCRIPTS.md`, `docs/DEPLOYMENT.md`                             | Llamadas `pool.query(SQL_MIGRATION)` y creación de Superadmin/finca/plantas/lecturas.                       |
| Backup y auditoría                 | Consultas de la §9                                                                                                                             | `docs/TROUBLESHOOTING.md`                                           | Consultas ejecutables contra `information_schema`, `pg_constraint`, `pg_indexes`.                           |
| Encabezado unificado               | Encabezado de este documento                                                                                                                   | `docs/README.md`, `docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md` | Texto requerido por la auditoría del 2026-11-23; la ruta `docs/UNIFIED/` no está presente en este checkout. |
