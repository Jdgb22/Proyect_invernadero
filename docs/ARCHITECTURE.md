# Arquitectura del Sistema — Macollo

> Fuente de verdad verificada contra `src/` (octubre 2026). Diagramas académicos en [SEQUENCE_DIAGRAMS](./SEQUENCE_DIAGRAMS.md) y [ACTIVITIES](./ACTIVITIES.md).

## 1. Visión general

App **Astro 7.2.8 en SSR** (`output: 'server'`, adaptador Vercel) que combina páginas renderizadas en servidor con API routes en el mismo despliegue. Dominio: monitoreo agronómico de **20 plantas (matriz 4 filas `t0–t3` × 5 columnas)** con métricas de suelo/ambiente, historial multidía e integraciones de clima y hojas de cálculo.

- **Frontend:** Astro Components (`src/frontend/`), islas React (`sileo` toasts), Tailwind 4, Three.js (iluminación dinámica).
- **Backend:** API routes (`src/pages/api/`), servicios (`src/backend/services/`), `middleware.ts`, `auth.config.ts`.
- **Datos:** PostgreSQL multi-tenant (auth + agronómico **persistido por finca** en `lecturas` — ver [DATABASE](./DATABASE.md) §5) + Open-Meteo/SIATA + Google Sheets CSV + ExcelJS.
- **Auth:** Auth.js (`auth-astro`), Credentials + Google, sesión JWT con rol — ver [AUTH](./AUTH.md).

## 2. Estructura de directorios (real)

```text
/src
├── frontend/
│   ├── components/   # Dashboard (matriz 4×5 + modal), Metrics, History, Settings, Welcome, Navbar, NoFarm,
│   │                 # TripsDiagnosticModal, Gallery, GalleryDetail
│   ├── layouts/      # Layout.astro (head, metadatos, estilos)
│   └── styles/       # global.css (Tailwind)
├── pages/            # /index.astro (portada dual + login/registro), /signin (alias→/), /metrics, /history,
│                     # /gallery, /gallery/[id], /settings, /farms, /farms/[id], /admin, /invite/[code]
├── pages/api/
│   ├── auth/         # register, check-availability, forgot-password, reset-password (+ /api/auth/* de Auth.js)
│   ├── farms/        # index, [id], [id]/archive|members|invitations|readings, leave, active
│   ├── farm/         # active (alias retrocompatible hacia /api/farms/active)
│   ├── invitations/  # use (canje de código), peek
│   ├── admin/        # gestión de usuarios/roles (staff)
│   ├── gallery/      # upload (POST multipart), [id]/file (GET imagen por finca)
│   ├── trips-diagnosis.ts  # GET health / POST proxy a macollo-trips-api (BioCLIP 2.5)
│   ├── export-excel.ts  # GET|POST → .xlsx 3 hojas (ExcelJS), por finca
│   ├── export-csv.ts    # GET → .csv historial por finca
│   ├── sync-sheets.ts   # POST {url} → parse CSV → INSERT lecturas (finca activa)
│   ├── weather.ts       # GET {lat, lon} → clima Open-Meteo
│   ├── aqi.ts           # GET {lat, lon} → calidad del aire WAQI
│   └── siata.ts         # GET proxy siata.gov.co:8089 (timeout 3 s)
├── backend/
│   └── services/     # authz.ts (permisos), farms.ts (CRUD, invitaciones), readings.ts (lecturas),
│                     # notifications.ts (SMTP/SMS), csvExport.ts, excelExport.ts, profile.ts,
│                     # rateLimit.ts, sheetsSync.ts, siata.ts, weather.ts, server-fetch.ts
├── shared/           # plantMatrix.ts, badges.ts, roles.ts, avatar.ts, utils.ts, clientStorage.ts, preferences.ts, serialize.ts
├── db/               # auth-schema.sql, greenhouse-schema.sql, migrations/, client.ts (pool pg)
├── middleware.ts     # Guarda rutas reales + security headers + rate-limit + fix proxy
└── env.d.ts
/auth.config.ts       # Credentials (bcrypt) + Google, PostgresAdapter, JWT con rol
astro.config.mjs      # output server + @astrojs/vercel + auth() + react()
```

## 3. Flujos principales

**Portada dual (`/`):** request → `getSession` → sin sesión `Welcome`; con sesión, `Navbar + Dashboard` (o `NoFarm` si no hay finca activa), salvo **staff (Superadmin/Admin) sin finca elegida**, que se redirige a `/admin`. El `middleware.ts` protege las páginas/APIs reales (`/metrics`, `/history`, `/settings`, `/farms`, `/admin` y `/api/farms*`, `/api/invitations*`, `/api/admin*`, `/api/farm*`, `/api/sync-sheets`, `/api/export-excel`) con redirect/`401`, y aplica **security headers** a toda respuesta (defensa en profundidad): `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `HSTS` y `CSP` (incluye `connect-src` a Open-Meteo y WAQI).

**Login/registro:** `/` (tabs en `Welcome`) → `signIn('credentials')` o Google, o `POST /api/auth/register` (bcrypt, rol según `accountType`) → JWT con `role` → `/` (o `/admin` si es staff). La antigua ruta `/signin` es ahora un alias que redirige a `/`.

**Recuperación:** `forgot-password` (código 6 dígitos/15 min en `verification_token` + email/SMS) → `reset-password` (verifica, bcrypt, invalida token).

**Datos agronómicos:** Historial → importar Excel/CSV o `POST /api/sync-sheets` (normaliza URL → CSV → `resolvePlantCoordinates` + defaults → `records`) → **`insertLecturas` persiste en `lecturas` de la finca activa** (`INSERT … ON CONFLICT` por finca+planta+fecha+hora). `getLecturasByFinca` alimenta Dashboard/Métricas/Historial scopeados por `finca_activa`; `export-excel` genera `.xlsx` por finca.

**Clima externo (desde `efed143`):** el Dashboard pide **geolocalización** (`navigator.geolocation`, timeout 10 s; fallback Medellín 6.2442, -75.5812) y llama `fetchWeatherData(lat, lon)` → **Open-Meteo directo** (`temperature_2m, relative_humidity_2m, weather_code, wind_speed_10m` + `precipitation_probability` hora actual, `timezone=auto`). Sin red responde **fallback offline** (22 °C, 60 %, lluvia 0, viento 5 km/h, `source: 'Offline Fallback'`). El widget muestra **viento (km/h)**, no irradiación. `getWeatherEmoji` mapea WMO → icono. Refresco cada **10 min** (`setInterval 600000`). Además consulta **AQI** a `api.waqi.info` (token demo en cliente). La escena 3D anima el **ciclo sol (6:00–18:00) / luna** con sombras `PCFSoftShadowMap` según la hora real.

> ⚠️ SIATA está **temporalmente bypasseado** (fuera de línea; evitaba 3 s de espera): `/api/siata` sigue vivo pero sin consumidores internos. `isValleDeAburra` y `fetchSiataPredictions()` quedan como código latente. Ver ADR-007.

## 4. Decisiones clave

| Decisión                              | Por qué                                                                                                                                        |
| :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| Astro SSR + Vercel (`output: server`) | Sesión y API en el mismo despliegue; páginas deciden por sesión en servidor.                                                                   |
| JWT (no sessions DB)                  | Sin estado en serverless; el rol viaja en el token (re-login tras cambio de rol).                                                              |
| Proxy `/api/siata`                    | Evita CORS del navegador; timeout 3 s ante el límite serverless.                                                                               |
| Dual SIATA/Open-Meteo                 | Precisión local en Medellín, respaldo global fuera/fallo.                                                                                      |
| CSV-first para Sheets                 | Sin credenciales Google: basta enlace público/export. Parser tolerante (delimitador, comillas, coma decimal, serial Excel, IDs `T0-P1/TO-P2`). |
| ExcelJS 3 hojas                       | Reporte auditoría (hoy + historial + rangos) con promedios vía fórmulas.                                                                       |
| bcrypt salt 10                        | Costo razonable login/registro en serverless.                                                                                                  |
| PG nube, no SQLite                    | Serverless sin disco persistente; pool con SSL en prod.                                                                                        |
| Zod Zero Trust                        | `register`, `sync-sheets` y `export-excel` validan input con schemas (`safeParse`); el servidor no confía en el cliente.                       |
| Husky pre-commit                      | `lint-staged` (prettier) + bloqueo de secretos (`.env`, `credentials`, `secret`) antes de cada commit.                                         |

## 5. Modelo de datos (resumen)

Auth: `users (role enum: Superadmin, Admin, Agropecuario, Campesino def.)`, `accounts`, `sessions`, `verification_token` — [DATABASE](./DATABASE.md) §2, [AUTH](./AUTH.md).
Agronómico: `fincas`, `finca_miembros`, `finca_invitaciones`, `plantas` (por finca) y `lecturas` (una visita a una planta) + tipos TS `MetricRecord`/`PlantMatrixItem` en `src/shared/plantMatrix.ts` (matriz `FILAS t0–t3`, `COLUMNAS Col 1–5`, códigos `T{f}-P{c}` / `P-01–P-20`).

## 6. Evolución (IoT / tiempo real / escala)

- **`GET /api/metrics` desde PG** (propuesto; hoy las páginas leen con `getLecturasByFinca`). Persistencia Sheets→PG **ya implementada** ([DATABASE](./DATABASE.md) §5).
- **Estado global islas:** Nano Stores si se desacoplan islas Astro.
- **IoT real (ESP32/Arduino):** WebSocket/MQTT para ingesta continua → escribir en `lecturas`; la frecuencia de Settings (`1 min`…) hoy es preferencia de refresco, no ingesta.
- **Auth endurecida** en middleware + handlers (hecho, [AUTH](./AUTH.md) §7); revisar etiquetas de rol en páginas si aparece deriva (`'admin'` vs `'Admin'`).
- **Tests:** no hay suite (`*.test.*` inexistente); candidatos: `resolvePlantCoordinates`, `normalizeGoogleSheetUrl`/`parseCSV`, validadores de `register`, `extractDateAndHour`.
