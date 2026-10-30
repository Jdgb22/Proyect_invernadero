import "dotenv/config";
import pg from "pg";
import bcrypt from "bcryptjs";

const { Pool } = pg;

const ROLES = ["Superadmin", "Admin", "Agropecuario", "Campesino"];

const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || "";
const name = (process.env.ADMIN_NAME || "Superadmin").trim();
const role = (process.env.ADMIN_ROLE || "Superadmin").trim();
const phone = (process.env.ADMIN_PHONE || "").trim() || null;

if (!email || !email.includes("@")) {
  console.error("✗ Falta ADMIN_EMAIL (correo válido).");
  process.exit(1);
}
if (password.length < 8) {
  console.error("✗ ADMIN_PASSWORD debe tener al menos 8 caracteres.");
  process.exit(1);
}
if (!ROLES.includes(role)) {
  console.error(`✗ ADMIN_ROLE inválido. Usa uno de: ${ROLES.join(", ")}`);
  process.exit(1);
}

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
      }
    : {
        host: process.env.POSTGRES_HOST || "localhost",
        port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
        user: process.env.POSTGRES_USER || "postgres",
        password: process.env.POSTGRES_PASSWORD || "",
        database: process.env.POSTGRES_DATABASE || "astro_auth_db",
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
      },
);

try {
  const hash = await bcrypt.hash(password, 10);

  const existing = await pool.query(
    "SELECT id FROM users WHERE LOWER(email) = LOWER($1)",
    [email],
  );

  if (existing.rows.length > 0) {
    const id = existing.rows[0].id;
    await pool.query(
      `UPDATE users SET name = $2, password = $3, role = $4, phone = COALESCE($5, phone),
                        updated_at = NOW()
       WHERE id = $1`,
      [id, name, hash, role, phone],
    );
    console.log(`✓ Usuario actualizado: ${email} (rol: ${role}, id: ${id})`);
  } else {
    const res = await pool.query(
      `INSERT INTO users (name, email, phone, password, role, "emailVerified")
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id`,
      [name, email, phone, hash, role],
    );
    console.log(
      `✓ Usuario creado: ${email} (rol: ${role}, id: ${res.rows[0].id})`,
    );
  }
} catch (err) {
  console.error("✗ Error creando la cuenta:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
