-- ============================================================
-- Esquema agronómico — Proyecto Invernadero (Macollo)
-- Modelo multi-tenant por finca: una fila de `lecturas` = una visita a una planta.
-- Ejecutar DESPUÉS de `auth-schema.sql` (que crea users/accounts/sessions/
-- verification_token y el enum user_role_enum).
--   psql "$DATABASE_URL" -f src/db/auth-schema.sql
--   psql "$DATABASE_URL" -f src/db/invernadero.sql
-- Idempotente: puede ejecutarse más de una vez sin romper nada.
-- Reemplaza el esquema EAV anterior (mediciones/relaciones/responsable).
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Fincas (cada finca pertenece a un usuario dueño)
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
-- 2. Membresías (N:N usuario <-> finca)
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
-- 3. Invitaciones por código (8 chars mayúsculas, sin prefijo)
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
-- 4. Plantas por finca (matriz 4 filas x 5 columnas por defecto)
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
-- 5. Lecturas agronómicas (una fila = una visita a una planta)
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
