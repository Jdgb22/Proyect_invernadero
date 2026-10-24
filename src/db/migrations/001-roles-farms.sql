-- ============================================================
-- Migración 001: Roles (4) + Fincas multi-tenant
-- Macollo
-- Ejecutar en una BD existente que ya tiene users/accounts/etc.
--   psql "$DATABASE_URL" -f src/db/migrations/001-roles-farms.sql
-- Idempotente: puede ejecutarse más de una vez sin romper nada.
-- Roles: 'Superadmin' | 'Admin' | 'Agropecuario' | 'Campesino'
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Enum de roles: 'Super admin'|'Admin'|'Agronomo'|'Campesino'
--    -> 'Superadmin'|'Admin'|'Agropecuario'|'Campesino'
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'user_role_enum' AND n.nspname = 'public'
  ) AND EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'user_role_enum' AND e.enumlabel = 'Agronomo'
  ) THEN
    ALTER TABLE users ALTER COLUMN role DROP DEFAULT;
    ALTER TYPE user_role_enum RENAME TO user_role_enum_old;
    CREATE TYPE user_role_enum AS ENUM ('Superadmin', 'Admin', 'Agropecuario', 'Campesino');
    ALTER TABLE users
      ALTER COLUMN role TYPE user_role_enum
      USING (
        CASE role::text
          WHEN 'Super admin' THEN 'Superadmin'
          WHEN 'Admin'       THEN 'Admin'
          WHEN 'Agronomo'    THEN 'Agropecuario'
          ELSE 'Campesino'
        END
      )::user_role_enum;
    ALTER TABLE users ALTER COLUMN role SET DEFAULT 'Campesino';
    DROP TYPE user_role_enum_old;
    RAISE NOTICE 'user_role_enum migrado a Superadmin|Admin|Agropecuario|Campesino';
  ELSE
    RAISE NOTICE 'user_role_enum ya migrado (o no existe); se omite';
  END IF;
END $$;

-- ------------------------------------------------------------
-- 2. Fincas
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fincas (
    id           SERIAL PRIMARY KEY,
    nombre       VARCHAR(255) NOT NULL,
    descripcion  TEXT,
    ubicacion    TEXT,
    dueno_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    activa       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_fincas_dueno ON fincas(dueno_id);
CREATE INDEX IF NOT EXISTS idx_fincas_activa ON fincas(activa);

-- ------------------------------------------------------------
-- 3. Membresías (N:N usuario <-> finca)
--    rol_finca: 'dueno' | 'miembro'
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS finca_miembros (
    id         SERIAL PRIMARY KEY,
    finca_id   INTEGER NOT NULL REFERENCES fincas(id) ON DELETE CASCADE,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rol_finca  VARCHAR(12) NOT NULL DEFAULT 'miembro'
               CHECK (rol_finca IN ('dueno', 'miembro')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (finca_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_finca_miembros_user ON finca_miembros(user_id);
CREATE INDEX IF NOT EXISTS idx_finca_miembros_finca ON finca_miembros(finca_id);

-- ------------------------------------------------------------
-- 4. Invitaciones por código (abcdefgh, 8 chars mayúsculas, sin prefijo)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS finca_invitaciones (
    id           SERIAL PRIMARY KEY,
    finca_id     INTEGER NOT NULL REFERENCES fincas(id) ON DELETE CASCADE,
    codigo       VARCHAR(20) NOT NULL UNIQUE,
    creado_por   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expira_en    TIMESTAMPTZ NOT NULL,
    usos_maximos INTEGER NOT NULL DEFAULT 1 CHECK (usos_maximos > 0),
    usos_usados  INTEGER NOT NULL DEFAULT 0 CHECK (usos_usados >= 0),
    activa       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_invitaciones_finca ON finca_invitaciones(finca_id);

-- ------------------------------------------------------------
-- 5. Plantas por finca (matriz 4 filas x 5 columnas por defecto)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS plantas (
    id        SERIAL PRIMARY KEY,
    finca_id  INTEGER NOT NULL REFERENCES fincas(id) ON DELETE CASCADE,
    fila      VARCHAR(4)  NOT NULL CHECK (fila IN ('t0','t1','t2','t3')),
    columna   VARCHAR(8)  NOT NULL CHECK (columna IN ('Col 1','Col 2','Col 3','Col 4','Col 5')),
    plant_id  VARCHAR(16) NOT NULL,
    UNIQUE (finca_id, fila, columna)
);
CREATE INDEX IF NOT EXISTS idx_plantas_finca ON plantas(finca_id);

-- ------------------------------------------------------------
-- 6. Lecturas agronómicas (una fila = una visita a una planta)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS lecturas (
    id              BIGSERIAL PRIMARY KEY,
    finca_id        INTEGER NOT NULL REFERENCES fincas(id) ON DELETE CASCADE,
    planta_id       INTEGER NOT NULL REFERENCES plantas(id) ON DELETE CASCADE,
    fecha           DATE NOT NULL,
    hora            VARCHAR(20) NOT NULL DEFAULT '',
    ph_suelo        REAL,
    temp_interna    REAL,
    temp_externa    REAL,
    temp_suelo      REAL,
    humedad         REAL,
    altura_cm       REAL,
    crecimiento     REAL,
    fase            TEXT,
    productividad   TEXT,
    sanidad         TEXT,
    responsable_id  INTEGER REFERENCES users(id) ON DELETE SET NULL,
    observaciones   TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (finca_id, planta_id, fecha, hora)
);
CREATE INDEX IF NOT EXISTS idx_lecturas_finca_fecha ON lecturas(finca_id, fecha);
CREATE INDEX IF NOT EXISTS idx_lecturas_planta ON lecturas(planta_id);

COMMIT;

-- Verificación
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name IN
  ('fincas','finca_miembros','finca_invitaciones','plantas','lecturas')
ORDER BY table_name;
