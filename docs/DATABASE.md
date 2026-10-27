# Base de Datos (PostgreSQL)

> Scripts: `src/db/auth-schema.sql` (auth) y `src/db/greenhouse-schema.sql` (agronómico).
> Conexión: `src/db/client.ts` (pool `pg`, SSL en producción, `max: 20`).
> Última revisión: octubre 2026.

PostgreSQL 17. Dos dominios: **autenticación** (usado activamente por Auth.js y los endpoints `/api/auth/*`) y **agronómico** (esquema creado, migración de uso en curso — ver [§5 Estado real](#5-estado-real-y-brecha-conocida)).

---

## 1. Instalación

```bash
createdb invernadero
psql invernadero -f src/db/auth-schema.sql
psql invernadero -f src/db/greenhouse-schema.sql
# (Opcional) migración idempotente solo para bases creadas con el esquema anterior:
psql invernadero -f src/db/migrations/001-roles-farms.sql
```

Cuentas y datos de ejemplo (Node ≥ 22, lee `.env`):

```bash
# Crea/actualiza una cuenta privilegiada (por defecto Superadmin)
ADMIN_EMAIL=tu@correo.com ADMIN_PASSWORD='Secreta123' node scripts/seed-admin.mjs

# Crea "Finca demo" con dueño Agropecuario, 20 plantas y lecturas de ejemplo
node scripts/seed-demo.mjs
```

Conexión vía `.env` (ver [README](../README.md)):

```env
DATABASE_URL=postgres://postgres:TU_PASSWORD@localhost:5432/invernadero
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=TU_PASSWORD
POSTGRES_DATABASE=invernadero
```

> `auth-schema.sql` menciona `astro_auth_db` en sus comentarios; usa `invernadero` para unificar (o ajusta `POSTGRES_DATABASE`).

---

## 2. Dominio Auth (`auth-schema.sql`)

### `user_role_enum`

```sql
CREATE TYPE user_role_enum AS ENUM ('Superadmin', 'Admin', 'Agropecuario', 'Campesino');
```

> La migración `001-roles-farms.sql` renombra los valores antiguos (`Super admin`→`Superadmin`, `Agronomo`→`Agropecuario`) de forma idempotente. Ver [AUTH §6](./AUTH.md) para el alcance de cada rol.

### `users`

| Columna                     | Tipo                                          | Notas                                                                                                                             |
| :-------------------------- | :-------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `id`                        | `SERIAL PK`                                   | Id interno (Auth.js lo expone como string en JWT).                                                                                |
| `name`                      | `VARCHAR(255)`                                | Obligatorio en registro. Login también acepta buscar por `name`.                                                                  |
| `email`                     | `VARCHAR(255) UNIQUE`                         | Opcional si hay `phone`. Único case-insensitive (validado en app).                                                                |
| `phone`                     | `VARCHAR(50)`                                 | Opcional si hay `email`. Normalizado (sin espacios/guiones).                                                                      |
| `birth_date`                | `DATE`                                        | Opcional; debe ser fecha real no futura.                                                                                          |
| `password`                  | `VARCHAR(255)`                                | Hash **bcrypt** (`$2a$/$2b$`, salt 10). Nunca texto plano.                                                                        |
| `role`                      | `user_role_enum NOT NULL DEFAULT 'Campesino'` | Registro inserta `Campesino` o `Agropecuario` según `accountType` (nunca staff). Cambios de rol = `UPDATE` directo o panel admin. |
| `emailVerified`             | `TIMESTAMPTZ`                                 | Lo gestiona el adaptador OAuth.                                                                                                   |
| `image`                     | `TEXT`                                        | Avatar (Google o generado).                                                                                                       |
| `created_at` / `updated_at` | `TIMESTAMPTZ`                                 | `updated_at` se refresca en reset-password.                                                                                       |

Índices: `idx_users_email (email)`, `idx_users_role (role)`.

### `accounts` (OAuth, `@auth/pg-adapter`)

`id PK · userId FK→users(id) ON DELETE CASCADE · type · provider · providerAccountId · refresh_token · access_token · expires_at · token_type · scope · id_token · session_state`. Única `(provider, providerAccountId)`.

> **Permanace vacía salvo que se use "Continuar con Google"**. Con login por credenciales (email/teléfono + contraseña) nunca se inserta aquí; que esté vacía es lo normal.

### `sessions`

`id PK · sessionToken UNIQUE · userId FK→users(id) · expires`. Con estrategia **JWT** (`session.strategy='jwt'`) **permanece vacía**: la sesión viaja firmada en la cookie, no en BD. Solo se usaría con estrategia `database` (ver [AUTH §1](./AUTH.md)).

### `verification_token`

`identifier PK · token PK · expires`. Guarda el **código de 6 dígitos** de recuperación (`identifier` = email o teléfono canónico, `expires` = +15 min). Se borra al emitir uno nuevo y al consumirlo. **Vacía** salvo que haya una recuperación en curso.

> **Estado de tablas en un despliegue típico sin OAuth:** `users` con tus cuentas, `fincas`/`plantas`/`lecturas` con datos agronómicos, y `accounts`/`sessions`/`verification_token` en **0 filas** (no indica error).

---

## 3. Dominio agronómico (`greenhouse-schema.sql`)

Modelo multi-tenant **por finca**: cada finca tiene 20 plantas (matriz 4×5) y cada fila de `lecturas` es una visita a una planta. Script idempotente; las tablas se ejecutan tras `auth-schema.sql`.

Tablas: `fincas`, `finca_miembros`, `finca_invitaciones`, `plantas`, `lecturas`, `photos` — detalle de columnas en [§5](#5-multi-tenant-fincas-plantas-y-lecturas).

---

## 4. Diagrama ER (Mermaid)

```mermaid
erDiagram
    users ||--o{ accounts : "tiene (OAuth)"
    users ||--o{ sessions : "tiene"
    users ||--o{ fincas : "posee (dueno_id)"
    users ||--o{ finca_miembros : "pertenece"
    fincas ||--o{ finca_miembros : "tiene"
    fincas ||--o{ finca_invitaciones : "invita"
    fincas ||--o{ plantas : "contiene"
    fincas ||--o{ lecturas : "registra"
    plantas ||--o{ lecturas : "recibe"
    users ||--o{ lecturas : "mide (responsable_id)"
    fincas {
        int id PK
        string nombre
        int dueno_id FK
        bool activa
    }
    finca_miembros {
        int id PK
        int finca_id FK
        int user_id FK
        string rol_finca
    }
    lecturas {
        bigint id PK
        int finca_id FK
        int planta_id FK
        date fecha
        string hora
        real ph_suelo
        int responsable_id FK
    }
    users {
        int id PK
        string name
        string email UK
        string phone
        date birth_date
        string password
        enum role
    }
    plantas {
        int id PK
        int finca_id FK
        string fila
        string columna
        string plant_id
    }
```

---

## 5. Multi-tenant: fincas, plantas y lecturas

El modelo de datos agronómicos es por finca (una fila de `lecturas` = una visita a una planta). Es el esquema definido en `src/db/greenhouse-schema.sql`.

### `fincas`

`id PK · nombre · descripcion · ubicacion · dueno_id FK→users(id) ON DELETE RESTRICT · activa BOOL DEFAULT true · created_at · updated_at`. Archivar = `activa=false` (restaurable). Hard delete solo Superadmin.

### `finca_miembros` (N:N usuario↔finca)

`id PK · finca_id FK ON DELETE CASCADE · user_id FK ON DELETE CASCADE · rol_finca ∈ {dueno, miembro} · created_at`. Único `(finca_id, user_id)`.

### `finca_invitaciones`

`id PK · finca_id FK · codigo VARCHAR(20) UNIQUE · creado_por FK · expira_en · usos_maximos · usos_usados · activa · created_at`. Código de 8 caracteres (nanoid + `nanoid-dictionary`, alfabeto sin caracteres confusos, mayúsculas, sin prefijo). El canje descuenta usos y crea la membresía en una transacción (`FOR UPDATE OF i`).

### `plantas` (por finca)

`id PK · finca_id FK ON DELETE CASCADE · fila ∈ {t0..t3} · columna ∈ {Col 1..Col 5} · plant_id`. Único `(finca_id, fila, columna)`. Por defecto 20 plantas (4×5) al crear la finca.

### `lecturas` (por finca)

`id BIGSERIAL PK · finca_id FK · planta_id FK →plantas(id) ON DELETE CASCADE · fecha DATE · hora VARCHAR(20) · ph_suelo · temp_interna · temp_externa · temp_suelo · humedad · altura_cm · crecimiento · fase · productividad · sanidad · responsable_id FK→users SET NULL · observaciones · created_at`. Único `(finca_id, planta_id, fecha, hora)` (upsert idempotente). Índices `(finca_id, fecha)` y `(planta_id)`.

### `photos` (galería por finca)

`id UUID PK DEFAULT gen_random_uuid() · filename VARCHAR(255) · url TEXT · mime_type VARCHAR(100) · width · height · size_bytes BIGINT · caption TEXT · finca_id FK→fincas ON DELETE SET NULL · user_id FK→users ON DELETE SET NULL · taken_at · uploaded_at DEFAULT NOW()`. Índices `(finca_id)`, `(user_id)`, `(uploaded_at DESC)`. Fotos compartidas entre miembros de la finca activa.

---

## 6. Estado real

- **Auth**: persiste en PG (dominio §2).
- **Datos agronómicos**: ahora **sí persisten**. `POST /api/sync-sheets` (tras exigir sesión + acceso a la finca activa) hace `INSERT … ON CONFLICT` en `lecturas`. `Metrics.astro` e `History.astro` leen desde PG vía `getLecturasByFinca(fincaId)` y se scopean por `finca_activa`. `GET /api/farms/:id/readings` expone las lecturas con control de membresía.
- **Fallback**: sin finca activa se usa `buildEmptyPlantsGrid()` (matriz de 20 plantas sin mediciones); la fuente del tablero son las lecturas de la BD.

---

## 7. Mantenimiento

- Backup antes de cada sprint de campo: `pg_dump invernadero > backup_$(date +%F).sql`.
- Códigos expirados se acumulan solo si el usuario nunca los usa: `DELETE FROM verification_token WHERE expires < NOW();` (cron sugerido diario).
- Tras `RESET` de contraseña, `updated_at` se actualiza solo; auditar con `SELECT id, name, role, updated_at FROM users ORDER BY updated_at DESC;`.
- Cambio de rol: `UPDATE users SET role = 'Agropecuario', updated_at = NOW() WHERE email = 'x@y.z';` (valores exactos del enum: `Superadmin`, `Admin`, `Agropecuario`, `Campesino`). También disponible en `/admin` para Superadmins.
