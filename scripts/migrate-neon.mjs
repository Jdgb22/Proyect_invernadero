import pg from "pg";

const NEON_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_oSHbGuMVvF96@ep-aged-cloud-b8a9koin-pooler.c-14.us-east-1.aws.neon.tech/neondb?sslmode=require";

const pool = new pg.Pool({
  connectionString: NEON_URL,
  ssl: { rejectUnauthorized: false },
});

const SQL_MIGRATION = `
BEGIN;

-- 1. Actualizar enum user_role_enum si contiene valores antiguos
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'user_role_enum' AND n.nspname = 'public'
  ) AND EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'user_role_enum' AND e.enumlabel IN ('Agronomo', 'Super admin')
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
  END IF;
END $$;

-- 2. Asegurar que el usuario id=1 sea Superadmin
UPDATE users SET role = 'Superadmin' WHERE id = 1;

-- 3. Renombrar tabla plantas antigua si no tiene columna finca_id
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_name = 'plantas' AND table_schema = 'public'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name = 'plantas' AND column_name = 'finca_id'
  ) THEN
    ALTER TABLE plantas RENAME TO plantas_legacy;
    RAISE NOTICE 'plantas antigua renombrada a plantas_legacy';
  END IF;
END $$;

-- 4. Fincas
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

-- 5. Membresías
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

-- 6. Invitaciones por código
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

-- 7. Plantas nuevas (matriz estándar 4x5)
CREATE TABLE IF NOT EXISTS plantas (
    id        SERIAL PRIMARY KEY,
    finca_id  INTEGER NOT NULL REFERENCES fincas(id) ON DELETE CASCADE,
    fila      VARCHAR(4)  NOT NULL CHECK (fila IN ('t0','t1','t2','t3')),
    columna   VARCHAR(8)  NOT NULL CHECK (columna IN ('Col 1','Col 2','Col 3','Col 4','Col 5')),
    plant_id  VARCHAR(16) NOT NULL,
    UNIQUE (finca_id, fila, columna)
);
CREATE INDEX IF NOT EXISTS idx_plantas_finca ON plantas(finca_id);

-- 8. Lecturas agronómicas
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

-- 9. Galería de fotos
CREATE TABLE IF NOT EXISTS photos (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename    VARCHAR(255) NOT NULL,
    url         TEXT NOT NULL,
    mime_type   VARCHAR(100),
    width       INTEGER,
    height      INTEGER,
    size_bytes  BIGINT,
    caption     TEXT,
    finca_id    INTEGER REFERENCES fincas(id) ON DELETE SET NULL,
    user_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
    taken_at    TIMESTAMPTZ,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_photos_finca ON photos(finca_id);
CREATE INDEX IF NOT EXISTS idx_photos_user ON photos(user_id);
CREATE INDEX IF NOT EXISTS idx_photos_uploaded_at ON photos(uploaded_at DESC);

COMMIT;
`;

async function main() {
  console.log("Iniciando migración en Neon Database...");
  try {
    await pool.query(SQL_MIGRATION);
    console.log("✓ Esquema migrado exitosamente.");

    // Verificar tablas resultantes
    const tables = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name",
    );
    console.log(
      "Tablas actuales:",
      tables.rows.map((r) => r.table_name).join(", "),
    );
  } catch (err) {
    console.error("✗ Error en la migración:", err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
