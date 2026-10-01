import 'dotenv/config';
import pg from 'pg';
const pool = new pg.Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DATABASE || 'astro_auth_db',
  connectionTimeoutMillis: 2000,
});
async function fix() {
  try {
    await pool.query('ALTER TABLE users ADD COLUMN phone VARCHAR(50)');
    console.log('Added phone column successfully!');
  } catch (err) {
    if (err.code === '42701') {
      console.log('Column phone already exists (42701)');
    } else {
      console.error('Error adding column:', err.message);
    }
  }
  
  try {
    await pool.query('ALTER TABLE users ADD COLUMN birth_date DATE');
    console.log('Added birth_date column successfully!');
  } catch (err) {
    if (err.code === '42701') {
      console.log('Column birth_date already exists (42701)');
    } else {
      console.error('Error adding column:', err.message);
    }
  }
  
  pool.end();
}
fix();
