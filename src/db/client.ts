import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

/**
 * Pool de conexiones a PostgreSQL (pgAdmin).
 * Las credenciales se cargan desde variables de entorno (.env).
 * Astro carga el .env automáticamente, no se necesita dotenv.config().
 *
 * Variables requeridas:
 *  - POSTGRES_HOST      (default: localhost)
 *  - POSTGRES_PORT      (default: 5432)
 *  - POSTGRES_USER      (default: postgres)
 *  - POSTGRES_PASSWORD
 *  - POSTGRES_DATABASE
 */
export const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DATABASE || 'astro_auth_db',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('[PostgreSQL] Error inesperado en cliente inactivo:', err);
});
