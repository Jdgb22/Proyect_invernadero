import pg from "pg";
const { Pool } = pg;
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error(err);
  else console.log("Connected to Neon DB:", res.rows[0]);
  pool.end();
});
