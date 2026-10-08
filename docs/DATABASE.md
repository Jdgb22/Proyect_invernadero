# Base de Datos (PostgreSQL)

> Scripts: `src/db/auth-schema.sql` (auth) y `src/db/invernadero.sql` (agronómico).
> Conexión: `src/db/client.ts` (pool `pg`, SSL en producción, `max: 20`).
> Última revisión: octubre 2026.

PostgreSQL 17. Dos dominios: **autenticación** (usado activamente por Auth.js y los endpoints `/api/auth/*`) y **agronómico** (esquema creado, migración de uso en curso — ver [§5 Estado real](#5-estado-real-y-brecha-conocida)).

---

## 1. Instalación

```bash
createdb invernadero
psql invernadero -f src/db/auth-schema.sql
psql invernadero -f src/db/invernadero.sql
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
CREATE TYPE user_role_enum AS ENUM ('Super admin', 'Admin', 'Agronomo', 'Campesino');
```

### `users`

| Columna | Tipo | Notas |
| :--- | :--- | :--- |
| `id` | `SERIAL PK` | Id interno (Auth.js lo expone como string en JWT). |
| `name` | `VARCHAR(255)` | Obligatorio en registro. Login también acepta buscar por `name`. |
| `email` | `VARCHAR(255) UNIQUE` | Opcional si hay `phone`. Único case-insensitive (validado en app). |
| `phone` | `VARCHAR(50)` | Opcional si hay `email`. Normalizado (sin espacios/guiones). |
| `birth_date` | `DATE` | Opcional; debe ser fecha real no futura. |
| `password` | `VARCHAR(255)` | Hash **bcrypt** (`$2a$/$2b$`, salt 10). Nunca texto plano. |
| `role` | `user_role_enum NOT NULL DEFAULT 'Campesino'` | **Registro siempre inserta `Campesino`**. Cambios de rol = `UPDATE` directo o panel admin. |
| `emailVerified` | `TIMESTAMPTZ` | Lo gestiona el adaptador OAuth. |
| `image` | `TEXT` | Avatar (Google o generado). |
| `created_at` / `updated_at` | `TIMESTAMPTZ` | `updated_at` se refresca en reset-password. |

Índices: `idx_users_email (email)`, `idx_users_role (role)`.

### `accounts` (OAuth, `@auth/pg-adapter`)

`id PK · userId FK→users(id) ON DELETE CASCADE · type · provider · providerAccountId · refresh_token · access_token · expires_at · token_type · scope · id_token · session_state`. Única `(provider, providerAccountId)`.

### `sessions`

`id PK · sessionToken UNIQUE · userId FK→users · expires`. Con estrategia JWT actual tiene uso reducido (ver [AUTH](./AUTH.md)).

### `verification_token`

`identifier PK · token PK · expires`. Guarda el **código de 6 dígitos** de recuperación (`identifier` = email o teléfono canónico, `expires` = +15 min). Se borra al emitir uno nuevo y al consumirlo.

---

## 3. Dominio agronómico (`invernadero.sql`)

### `tipo_medicion_enum`

```sql
CREATE TYPE tipo_medicion_enum AS ENUM (
  'crecimiento', 'ph', 'productividad',
  'temperatura_atmosferica', 'temperatura_suelo', 'humedad'
);
```

### `plantas`

| Columna | Tipo | Notas |
| :--- | :--- | :--- |
| `id` | `INTEGER PK` (seq `plantas_id_seq`) | Corresponde a `P-01…P-20` de la matriz (`plantNumber`). |
| `nombre` | `VARCHAR(100) NOT NULL` | Ej. código `T0-P1`. |
| `especie` | `VARCHAR(100)` | Cultivo (ej. gulupa — ver `public/gulupa.svg`). |
| `ubicacion` | `VARCHAR(50)` | Fila/columna (`t0…t3`, `Col 1…Col 5`). |
| `estado` | `VARCHAR(20) DEFAULT 'activa'` | `activa` / inactiva. |

### `mediciones`

Modelo **EAV por tipo** (una fila por variable medida):

| Columna | Tipo | Notas |
| :--- | :--- | :--- |
| `id` | `BIGINT PK` (seq `mediciones_id_seq`) | Equivale a `MetricRecord.id` (`MET-…`). |
| `planta_id` | `INTEGER NOT NULL` | FK lógica → `plantas(id)`. |
| `tipo` | `tipo_medicion_enum NOT NULL` | Qué se midió. |
| `valor` | `NUMERIC(10,2) NOT NULL` | Numérico. `productividad`/`sanidad` (cualitativas) van como `subtipo` o tabla futura. |
| `subtipo` | `VARCHAR(50)` | Matiz (ej. `interna/externa/suelo` para temperatura, `Alta/Media/Baja`). |
| `fecha_medida` | `TIMESTAMPTZ NOT NULL DEFAULT NOW()` | Equivale a `fecha + hora` (`timestampTexto`). |
| `usuario_id` | `INTEGER` | Quién midió → `users(id)` (equivale a `responsable`). |
| `created_at` | `TIMESTAMPTZ DEFAULT NOW()` | Auditoría de carga. |

### `responsable`

`id PK · nombre NOT NULL · cargo (rol: Campesino/Agrónomo…) · activo DEFAULT true · fecha_registro`. Catálogo de quién toma datos (equivale a `responsable + responsableRol + avatarColor`).

### `relaciones`

Correlaciones entre dos medidas: `id PK · tipo_relacion NOT NULL · plantida_id · tipo_medida1 · valor1 · tipo_medida2 · valor2 · fecha_registro`. Ej. pH vs sanidad por planta/fecha (base para análisis futuro).

---

## 4. Diagrama ER (Mermaid)

```mermaid
erDiagram
    users ||--o{ accounts : "tiene (OAuth)"
    users ||--o{ sessions : "tiene"
    users ||--o{ mediciones : "mide (usuario_id)"
    plantas ||--o{ mediciones : "recibe (planta_id)"
    responsable ||--o{ mediciones : "cataloga"
    plantas ||--o{ relaciones : "correlaciona"
    users {
        int id PK
        string name
        string email UK
        string phone
        date birth_date
        string password_hash
        enum role
    }
    mediciones {
        bigint id PK
        int planta_id FK
        enum tipo
        numeric valor
        string subtipo
        timestamptz fecha_medida
        int usuario_id FK
    }
    plantas {
        int id PK
        string nombre
        string especie
        string ubicacion
        string estado
    }
```

---

## 5. Estado real y brecha conocida ⚠️

Hoy el **frontend agronómico no lee estas tablas**: `src/backend/services/metricsData.ts` trabaja con `initialMetricsData: MetricRecord[] = []` (vacío) y `POST /api/sync-sheets` **devuelve `records` al cliente sin `INSERT` en PG**. El dataset vive en memoria del navegador tras importar/sincronizar. Solo el dominio auth persiste en PG.

**Ruta de migración sugerida** (no implementada; registrar como ADR si se prioriza):

1. `POST /api/sync-sheets` → además de devolver, `INSERT` en `mediciones` (una fila por `tipo` con `planta_id` resuelto, `fecha_medida`, `usuario_id` de la sesión).
2. `GET /api/metrics` nuevo → lee `mediciones` + `plantas` y arma `PlantMatrixItem[]` (reemplaza `initialMetricsData`).
3. Backfill del histórico 2026-09-14→30 desde el CSV maestro.
4. Cualitativas (`sanidad`, `productividad`, `faseCrecimiento`) → usar `subtipo` o nueva tabla `evaluaciones`.

Mientras tanto: **no borres `invernadero.sql`**; es el esquema objetivo. Y toda exportación Excel sale del dataset en memoria, no de PG.

---

## 6. Mantenimiento

- Backup antes de cada sprint de campo: `pg_dump invernadero > backup_$(date +%F).sql`.
- Códigos expirados se acumulan solo si el usuario nunca los usa: `DELETE FROM verification_token WHERE expires < NOW();` (cron sugerido diario).
- Tras `RESET` de contraseña, `updated_at` se actualiza solo; auditar con `SELECT id, name, role, updated_at FROM users ORDER BY updated_at DESC;`.
- Cambio de rol: `UPDATE users SET role = 'Agronomo', updated_at = NOW() WHERE email = 'x@y.z';` (valores exactos del enum, con mayúsculas y espacio en `Super admin`).
