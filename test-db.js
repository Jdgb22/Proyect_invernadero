const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_Kk2YpljDv9ut@ep-aged-cloud-b8a9koin-pooler.c-14.us-east-1.aws.neon.tech/neondb?sslmode=require',
});
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error(err);
  else console.log('Connected to Neon DB:', res.rows[0]);
  pool.end();
});
