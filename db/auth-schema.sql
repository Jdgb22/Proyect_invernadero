-- ============================================================
-- Script DDL para PostgreSQL - Sistema de Autenticación
-- Proyecto Invernadero - Ejecutar en pgAdmin 4
-- ============================================================
-- INSTRUCCIONES:
--   1. Abre pgAdmin 4
--   2. Conéctate a tu servidor PostgreSQL
--   3. Crea la base de datos: CREATE DATABASE astro_auth_db;
--   4. Selecciona la BD astro_auth_db y abre el Query Tool
--   5. Pega y ejecuta este script completo
-- ============================================================

-- 1. Crear tipo ENUM para los roles del sistema
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') THEN
        CREATE TYPE user_role_enum AS ENUM (
            'Super admin',
            'Admin',
            'Profesor',
            'Estudiante',
            'Usuario X'
        );
    END IF;
END $$;

-- 2. Tabla de Usuarios (users) con soporte de email, contraseña y rol
CREATE TABLE IF NOT EXISTS users (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password        VARCHAR(255),
    role            user_role_enum NOT NULL DEFAULT 'Usuario X',
    "emailVerified" TIMESTAMPTZ,
    image           TEXT,
    created_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Cuentas OAuth (para Google, etc. compatible con @auth/pg-adapter)
CREATE TABLE IF NOT EXISTS accounts (
    id                  SERIAL PRIMARY KEY,
    "userId"            INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type                VARCHAR(255) NOT NULL,
    provider            VARCHAR(255) NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    refresh_token       TEXT,
    access_token        TEXT,
    expires_at          BIGINT,
    token_type          VARCHAR(255),
    scope               TEXT,
    id_token            TEXT,
    session_state       TEXT,
    UNIQUE (provider, "providerAccountId")
);

-- 4. Tabla de Sesiones
CREATE TABLE IF NOT EXISTS sessions (
    id            SERIAL PRIMARY KEY,
    "sessionToken" VARCHAR(255) UNIQUE NOT NULL,
    "userId"       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires        TIMESTAMPTZ NOT NULL
);

-- 5. Tabla de Tokens de Verificación
CREATE TABLE IF NOT EXISTS verification_token (
    identifier  VARCHAR(255) NOT NULL,
    token       VARCHAR(255) NOT NULL,
    expires     TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- 6. Índices para optimizar búsquedas
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role  ON users(role);

-- ============================================================
-- VERIFICACIÓN: muestra las tablas creadas
-- ============================================================
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
