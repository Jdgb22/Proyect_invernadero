import pg from "pg";
import bcrypt from "bcryptjs";

const NEON_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_oSHbGuMVvF96@ep-aged-cloud-b8a9koin-pooler.c-14.us-east-1.aws.neon.tech/neondb?sslmode=require";

const pool = new pg.Pool({
  connectionString: NEON_URL,
  ssl: { rejectUnauthorized: false },
});

const FILAS = ["t0", "t1", "t2", "t3"];
const COLUMNAS = ["Col 1", "Col 2", "Col 3", "Col 4", "Col 5"];

function pseudo(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

async function main() {
  console.log("Configurando usuario y finca en Neon Database...");

  const adminEmail = "admin@macollo.tech";
  const adminPasswordPlain = "Macollo2026*";
  const adminHash = await bcrypt.hash(adminPasswordPlain, 10);

  // 1. Crear o actualizar usuario Superadmin
  let superadminId;
  const existingAdmin = await pool.query(
    "SELECT id FROM users WHERE LOWER(email) = LOWER($1) OR id = 1",
    [adminEmail],
  );

  if (existingAdmin.rows.length > 0) {
    superadminId = existingAdmin.rows[0].id;
    await pool.query(
      `UPDATE users SET name = 'Administrador Macollo', email = $1, password = $2, role = 'Superadmin',
                        "emailVerified" = NOW(), updated_at = NOW()
       WHERE id = $3`,
      [adminEmail, adminHash, superadminId],
    );
    console.log(
      `✓ Superadmin actualizado: ${adminEmail} (id: ${superadminId})`,
    );
  } else {
    const res = await pool.query(
      `INSERT INTO users (name, email, password, role, "emailVerified")
       VALUES ('Administrador Macollo', $1, $2, 'Superadmin', NOW())
       RETURNING id`,
      [adminEmail, adminHash],
    );
    superadminId = res.rows[0].id;
    console.log(`✓ Superadmin creado: ${adminEmail} (id: ${superadminId})`);
  }

  // 2. Finca principal
  let fincaId;
  const existingFinca = await pool.query(
    "SELECT id FROM fincas WHERE dueno_id = $1 LIMIT 1",
    [superadminId],
  );

  if (existingFinca.rows.length > 0) {
    fincaId = existingFinca.rows[0].id;
    console.log(`• Finca ya existente (id: ${fincaId})`);
  } else {
    const fincaRes = await pool.query(
      `INSERT INTO fincas (nombre, descripcion, ubicacion, dueno_id)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [
        "Invernadero Macollo Principal",
        "Cultivo tecnificado de gulupa y monitoreo agronómico.",
        "Valle de Aburrá, Antioquia",
        superadminId,
      ],
    );
    fincaId = fincaRes.rows[0].id;
    console.log(
      `✓ Finca creada: Invernadero Macollo Principal (id: ${fincaId})`,
    );
  }

  // 3. Vincular como dueño en finca_miembros
  await pool.query(
    `INSERT INTO finca_miembros (finca_id, user_id, rol_finca) VALUES ($1, $2, 'dueno')
     ON CONFLICT (finca_id, user_id) DO NOTHING`,
    [fincaId, superadminId],
  );

  // 4. Sembrar matriz de 20 plantas (4x5)
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
      plantaIds.set(`${fila}:${columna}`, res.rows[0].id);
    }
  }
  console.log(`✓ Matriz de 20 plantas sembrada en finca ${fincaId}`);

  // 5. Sembrar lecturas de los últimos 3 días
  const fechas = [2, 1, 0].map((diasAtras) => {
    const f = new Date();
    f.setDate(f.getDate() - diasAtras);
    return f.toISOString().slice(0, 10);
  });

  const FASES = ["Vegetativo", "Floración", "Fructificación"];
  const PRODUCTIVIDAD = ["Alta", "Media", "Baja"];
  const SANIDAD = ["Excelente", "Saludable", "Regular"];

  let insertadas = 0;
  for (const [diaIdx, fecha] of fechas.entries()) {
    for (const [filaIdx, fila] of FILAS.entries()) {
      for (const [colIdx, columna] of COLUMNAS.entries()) {
        const seed = diaIdx * 100 + filaIdx * 10 + colIdx + 1;
        const pid = plantaIds.get(`${fila}:${columna}`);
        if (!pid) continue;

        const ph = +(6.0 + pseudo(seed) * 0.9).toFixed(1);
        const tempInt = +(21.0 + pseudo(seed + 1) * 5.0).toFixed(1);
        const tempExt = +(18.0 + pseudo(seed + 2) * 6.0).toFixed(1);
        const tempSuelo = +(19.0 + pseudo(seed + 3) * 3.0).toFixed(1);
        const hum = +(70 + Math.floor(pseudo(seed + 4) * 20));
        const alt = +(80 + Math.floor(pseudo(seed + 5) * 40));
        const crec = +(1.0 + pseudo(seed + 6) * 1.5).toFixed(1);
        const fase = FASES[Math.floor(pseudo(seed + 7) * FASES.length)];
        const prod =
          PRODUCTIVIDAD[Math.floor(pseudo(seed + 8) * PRODUCTIVIDAD.length)];
        const san = SANIDAD[Math.floor(pseudo(seed + 9) * SANIDAD.length)];

        await pool.query(
          `INSERT INTO lecturas (
             finca_id, planta_id, fecha, hora,
             ph_suelo, temp_interna, temp_externa, temp_suelo, humedad,
             altura_cm, crecimiento, fase, productividad, sanidad,
             responsable_id, observaciones
           ) VALUES (
             $1, $2, $3, '09:00 AM',
             $4, $5, $6, $7, $8,
             $9, $10, $11, $12, $13,
             $14, 'Lectura agronómica de calibración'
           )
           ON CONFLICT (finca_id, planta_id, fecha, hora) DO NOTHING`,
          [
            fincaId,
            pid,
            fecha,
            ph,
            tempInt,
            tempExt,
            tempSuelo,
            hum,
            alt,
            crec,
            fase,
            prod,
            san,
            superadminId,
          ],
        );
        insertadas++;
      }
    }
  }

  console.log(`✓ Lecturas iniciales sembradas: ${insertadas} registros.`);
  console.log("\n==========================================");
  console.log("CREDENCIALES DE ACCESO A MACOLLO.TECH:");
  console.log(`Usuario / Correo: ${adminEmail}`);
  console.log(`Contraseña:       ${adminPasswordPlain}`);
  console.log(`Rol:              Superadmin`);
  console.log(
    `Finca activa:     Invernadero Macollo Principal (id: ${fincaId})`,
  );
  console.log("==========================================\n");
}

main()
  .catch((e) => {
    console.error("Error sembrando producción:", e);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
