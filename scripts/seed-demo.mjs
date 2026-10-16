import "dotenv/config";
import crypto from "node:crypto";
import pg from "pg";
import bcrypt from "bcryptjs";

const { Pool } = pg;

const FILAS = ["t0", "t1", "t2", "t3"];
const COLUMNAS = ["Col 1", "Col 2", "Col 3", "Col 4", "Col 5"];

const email = (process.env.DEMO_EMAIL || "demo@invernadero.local")
  .trim()
  .toLowerCase();
const name = (process.env.DEMO_NAME || "Dueño Demo").trim();
let password = process.env.DEMO_PASSWORD || "";
let passwordGenerada = false;
if (password.length < 8) {
  password = crypto.randomBytes(9).toString("base64url"); // ~12 chars
  passwordGenerada = true;
}

const pool = new Pool({
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "",
  database: process.env.POSTGRES_DATABASE || "astro_auth_db",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

function pseudo(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

async function main() {
  let ownerId;
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE LOWER(email) = LOWER($1)",
    [email],
  );
  if (existingUser.rows.length > 0) {
    ownerId = existingUser.rows[0].id;
    console.log(`• Dueño demo ya existe: ${email} (id: ${ownerId})`);
  } else {
    const hash = await bcrypt.hash(password, 10);
    const res = await pool.query(
      `INSERT INTO users (name, email, password, role, "emailVerified")
       VALUES ($1, $2, $3, 'Agropecuario', NOW()) RETURNING id`,
      [name, email, hash],
    );
    ownerId = res.rows[0].id;
    console.log(`✓ Dueño demo creado: ${email} (id: ${ownerId})`);
  }

  // 2. Finca demo
  const existingFinca = await pool.query(
    "SELECT id FROM fincas WHERE dueno_id = $1 AND nombre = $2",
    [ownerId, "Finca demo"],
  );
  if (existingFinca.rows.length > 0) {
    console.log(
      `• Finca demo ya existe (id: ${existingFinca.rows[0].id}). No se tocan las lecturas.`,
    );
    return;
  }

  const fincaRes = await pool.query(
    `INSERT INTO fincas (nombre, descripcion, ubicacion, dueno_id)
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [
      "Finca demo",
      "Finca de demostración con datos de ejemplo.",
      "Valle de Aburrá, Antioquia",
      ownerId,
    ],
  );
  const fincaId = fincaRes.rows[0].id;
  console.log(`✓ Finca demo creada (id: ${fincaId})`);

  await pool.query(
    `INSERT INTO finca_miembros (finca_id, user_id, rol_finca) VALUES ($1, $2, 'dueno')
     ON CONFLICT (finca_id, user_id) DO NOTHING`,
    [fincaId, ownerId],
  );

  // 3. Plantas
  const plantaIds = new Map();
  for (const fila of FILAS) {
    for (const columna of COLUMNAS) {
      const n = FILAS.indexOf(fila) * 5 + COLUMNAS.indexOf(columna) + 1;
      const plantId = `P-${n < 10 ? "0" + n : n}`;
      const res = await pool.query(
        `INSERT INTO plantas (finca_id, fila, columna, plant_id)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (finca_id, fila, columna) DO UPDATE SET plant_id = EXCLUDED.plant_id
         RETURNING id`,
        [fincaId, fila, columna, plantId],
      );
      plantaIds.set(`${fila}|${columna}`, res.rows[0].id);
    }
  }
  console.log(`✓ ${plantaIds.size} plantas creadas`);

  // 4. Lecturas de los últimos 3 días
  const hoy = new Date();
  const dias = [2, 1, 0];
  let total = 0;
  for (const offset of dias) {
    const d = new Date(hoy);
    d.setDate(d.getDate() - offset);
    const fecha = d.toISOString().slice(0, 10);

    let i = 0;
    for (const fila of FILAS) {
      for (const columna of COLUMNAS) {
        const plantaId = plantaIds.get(`${fila}|${columna}`);
        const s = offset * 100 + i;
        const ph = +(6.0 + pseudo(s + 1) * 1.0).toFixed(2);
        const tempInterna = +(22 + pseudo(s + 2) * 5).toFixed(1);
        const tempExterna = +(18 + pseudo(s + 3) * 6).toFixed(1);
        const tempSuelo = +(19 + pseudo(s + 4) * 3).toFixed(1);
        const humedad = Math.round(55 + pseudo(s + 5) * 35);
        const alturaCm = +(35 + (2 - offset) * 8 + pseudo(s + 6) * 40).toFixed(
          1,
        );
        const crecimiento = Math.min(
          100,
          Math.round(alturaCm <= 100 ? alturaCm : (alturaCm / 150) * 100),
        );
        const productividad =
          crecimiento > 80 ? "Alta" : crecimiento > 55 ? "Media" : "Baja";
        const sanidad =
          ph >= 6.2 && ph <= 6.7
            ? "Excelente"
            : ph >= 5.8 && ph <= 7.2
              ? "Saludable"
              : "Vulnerable";
        const fase =
          alturaCm > 80
            ? "Llenado de Fruto"
            : alturaCm > 40
              ? "Floración"
              : "Desarrollo Vegetativo";

        await pool.query(
          `INSERT INTO lecturas
             (finca_id, planta_id, fecha, hora, ph_suelo, temp_interna, temp_externa,
              temp_suelo, humedad, altura_cm, crecimiento, fase, productividad, sanidad,
              responsable_id, observaciones)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
           ON CONFLICT (finca_id, planta_id, fecha, hora) DO NOTHING`,
          [
            fincaId,
            plantaId,
            fecha,
            "09:00 AM",
            ph,
            tempInterna,
            tempExterna,
            tempSuelo,
            humedad,
            alturaCm,
            crecimiento,
            fase,
            productividad,
            sanidad,
            ownerId,
            "Medición de demostración.",
          ],
        );
        total++;
        i++;
      }
    }
  }
  console.log(`✓ ${total} lecturas de ejemplo creadas`);

  console.log("\n────────────────────────────────────────");
  console.log("Acceso a la finca demo:");
  console.log(`  Correo:     ${email}`);
  if (passwordGenerada) {
    console.log(
      `  Contraseña: ${password}   (guárdala ahora, no se vuelve a mostrar)`,
    );
  } else {
    console.log("  Contraseña: (la indicada en DEMO_PASSWORD)");
  }
  console.log("────────────────────────────────────────");
}

main()
  .catch((err) => {
    console.error("✗ Error sembrando la demo:", err.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
