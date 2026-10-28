# Scripts de utilidad

> Ubicación: `scripts/`. Comandos de arranque en red local y siembra de datos de prueba/admin.

---

## `scripts/run-lan.sh` — Servidor accesible desde celular (misma Wi-Fi)

Arranca Astro en `0.0.0.0` para que el proyecto sea reachable desde otros dispositivos de la red local (celular, tablet) usando la IP del equipo.

**Uso:**

```bash
./scripts/run-lan.sh              # puerto 4321 por defecto
PORT=4322 ./scripts/run-lan.sh    # otro puerto
```

**Qué hace:**

1. Detecta la IP local (interfaz Wi-Fi) mediante `ip route` / `hostname -I`.
2. Rechaza el puerto `8000` (reservado para la API de ML / BioCLIP 2.5).
3. Aborta si el puerto elegido ya está en uso.
4. Exporta variables de entorno:
   - `AUTH_TRUST_HOST=true` — Auth.js confía en el host al entrar por IP (no solo `localhost`).
   - `ML_API_URL=http://127.0.0.1:8000` — apunta a la API de ML en el mismo equipo.
5. Verifica (sin bloquear) si la ML API responde en `/api/health`.
6. Lanza `astro dev --host 0.0.0.0 --port $PORT`.

**También disponible como script de pnpm:**

```bash
pnpm run dev:lan   # equivale a ./scripts/run-lan.sh
```

**URLs al arrancar:**

| Qué                   | URL                           |
| :-------------------- | :---------------------------- |
| Local                 | `http://localhost:4321`       |
| Celular (misma Wi-Fi) | `http://<IP_LOCAL>:4321`      |
| ML API (docs)         | `http://<IP_LOCAL>:8000/docs` |

> ⚠️ La ML API (`macollo-trips-api`) corre aparte; el diagnóstico Trips no funciona sin ella. Ver [CAMERA-ML](./CAMERA-ML.md).

---

## `scripts/seed-admin.mjs` — Cuenta privilegiada (Superadmin/Admin)

Crea o actualiza un usuario con rol staff para acceder al panel `/admin`. Lee credenciales de variables de entorno.

**Variables de entorno:**

| Variable         | Por defecto  | Requisito                                       |
| :--------------- | :----------- | :---------------------------------------------- |
| `ADMIN_EMAIL`    | —            | **Obligatorio**, correo válido                  |
| `ADMIN_PASSWORD` | —            | **Obligatorio**, mín. 8 caracteres              |
| `ADMIN_NAME`     | `Superadmin` | Opcional                                        |
| `ADMIN_ROLE`     | `Superadmin` | `Superadmin` `Admin` `Agropecuario` `Campesino` |
| `ADMIN_PHONE`    | `null`       | Opcional                                        |

**Uso:**

```bash
ADMIN_EMAIL=admin@macollo.local \
ADMIN_PASSWORD=Admin1234 \
ADMIN_ROLE=Superadmin \
node scripts/seed-admin.mjs
```

**Comportamiento:** si el email ya existe, actualiza nombre/contraseña/rol/teléfono; si no, crea el usuario con `emailVerified` = ahora.

---

## `scripts/seed-demo.mjs` — Finca demo con datos de ejemplo

Siembra una finca completa lista para demostraciones: 1 dueño (`Agropecuario`), 1 finca, 20 plantas (matriz 4×5: `t0–t3` × `Col 1–5`) y lecturas de los últimos 3 días (09:00 AM).

**Variables de entorno:**

| Variable        | Por defecto                                         |
| :-------------- | :-------------------------------------------------- |
| `DEMO_EMAIL`    | `demo@invernadero.local`                            |
| `DEMO_NAME`     | `Dueño Demo`                                        |
| `DEMO_PASSWORD` | se genera aleatoriamente si no se indica o es `< 8` |

**Uso:**

```bash
node scripts/seed-demo.mjs
# o con credenciales fijas:
DEMO_EMAIL=demo@macollo.local DEMO_PASSWORD=Demo123456 node scripts/seed-demo.mjs
```

**Datos generados:**

- Usuario `Agropecuario` (dueño de la finca).
- Finca "Finca demo" (`Valle de Aburrá, Antioquia`).
- 20 plantas con `plant_id` `P-01`…`P-20`.
- Lecturas (últimos 3 días × 20 plantas): pH, temperaturas interna/externa/suelo, humedad, altura, crecimiento, fase, productividad, sanidad.

**Resultado:** imprime correo y contraseña de acceso (si se generó, guardarla: no se vuelve a mostrar).

> La contraseña del usuario demo se genera con `crypto.randomBytes(9).toString("base64url`) (~12 caracteres) cuando no se provee `DEMO_PASSWORD`.

---

## Variables comunes (BD)

Ambos seeders leen la conexión Postgres de estas variables (coinciden con `.env.example`):

| Variable            | Por defecto                                       |
| :------------------ | :------------------------------------------------ |
| `POSTGRES_HOST`     | `localhost`                                       |
| `POSTGRES_PORT`     | `5432`                                            |
| `POSTGRES_USER`     | `postgres`                                        |
| `POSTGRES_PASSWORD` | (vacío)                                           |
| `POSTGRES_DATABASE` | `astro_auth_db`                                   |
| `NODE_ENV`          | — (si `production`, SSL sin `rejectUnauthorized`) |
