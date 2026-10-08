# Arquitectura del Sistema — Proyecto Invernadero (Macollo)

> Fuente de verdad verificada contra `src/` (octubre 2026). Diagramas académicos en [SEQUENCE_DIAGRAMS](./SEQUENCE_DIAGRAMS.md) y [ACTIVITIES](./ACTIVITIES.md).

## 1. Visión general

App **Astro 7.2.8 en SSR** (`output: 'server'`, adaptador Vercel) que combina páginas renderizadas en servidor con API routes en el mismo despliegue. Dominio: monitoreo agronómico de **20 plantas (matriz 4 filas `t0–t3` × 5 columnas)** con métricas de suelo/ambiente, historial multidía e integraciones de clima y hojas de cálculo.

- **Frontend:** Astro Components (`src/frontend/`), islas React (`sileo` toasts), Tailwind 4, Three.js (iluminación dinámica).
- **Backend:** API routes (`src/pages/api/`), servicios (`src/backend/services/`, `src/services/`), `middleware.ts`, `auth.config.ts`.
- **Datos:** PostgreSQL (auth activo; agronómico como esquema objetivo — ver [DATABASE](./DATABASE.md) §5) + dataset en memoria del navegador (import/Sheets) + Open-Meteo/SIATA + Google Sheets CSV + ExcelJS.
- **Auth:** Auth.js (`auth-astro`), Credentials + Google, sesión JWT con rol — ver [AUTH](./AUTH.md).

## 2. Estructura de directorios (real)

```text
/src
├── frontend/
│   ├── components/   # Dashboard (matriz 4×5 + modal), Metrics, Historial, Settings, Welcome, navbar
│   ├── layouts/      # Layout.astro (head, metadatos, estilos)
│   └── styles/       # global.css (Tailwind)
├── pages/            # /index.astro (portada dual), /signin, /metrics, /historial, /settings
├── pages/api/
│   ├── auth/         # register, forgot-password, reset-password (+ /api/auth/* de Auth.js)
│   ├── export-excel.ts  # GET|POST → .xlsx 3 hojas (ExcelJS)
│   ├── sync-sheets.ts   # POST {url} → parse CSV → records (sin persistir en PG)
│   └── siata.ts         # GET proxy siata.gov.co:8089 (timeout 3 s)
├── backend/services/ # metricsData.ts (MetricRecord, PlantMatrixItem, resolvePlantCoordinates, REAL_DATES 2026-09-14→30)
│                     # weather.ts (fetchWeatherData, isValleDeAburra 6.00–6.50/-75.75–-75.40, getWeatherEmoji)
│                     # siata.ts (fetchSiataPredictions vía proxy)
├── services/         # notifications.ts (Nodemailer SMTP + SMS recuperación)
├── db/               # auth-schema.sql (users/accounts/sessions/verification_token) · invernadero.sql (plantas/mediciones/relaciones/responsable) · client.ts (pool pg)
├── middleware.ts     # Fix proxy + guarda (solo /dashboard — muerta, ver §3)
└── env.d.ts
/auth.config.ts       # Credentials (bcrypt) + Google, PostgresAdapter, JWT con rol
astro.config.mjs      # output server + @astrojs/vercel + auth() + react()
```

## 3. Flujos principales

**Portada dual (`/`):** request → `getSession` → sin sesión `Welcome`, con sesión `Navbar + Dashboard`. El `middleware.ts` solo intercepta `/dashboard` (inexistente) → la protección real de `/metrics`, `/historial`, `/settings` es el `getSession` de cada página (renderiza `Welcome` si no hay sesión) — brecha documentada en [AUTH](./AUTH.md) §7.

**Login/registro:** `/signin` (tabs) → `signIn('credentials')` o Google, o `POST /api/auth/register` (bcrypt, rol fijo `Campesino`) → JWT con `role` → `/`.

**Recuperación:** `forgot-password` (código 6 dígitos/15 min en `verification_token` + email/SMS) → `reset-password` (verifica, bcrypt, invalida token).

**Datos agronómicos (estado actual):** Historial → importar Excel/CSV o `POST /api/sync-sheets` (normaliza URL → CSV → `resolvePlantCoordinates` + defaults + regla 29/30-sep sin temp suelo → `records`) → cliente en memoria → Dashboard/Métricas renderizan + `export-excel` genera `.xlsx`. **PG agronómico aún no interviene** (migración propuesta en [DATABASE](./DATABASE.md) §5).

**Clima externo:** el Dashboard pide **geolocalización** (`navigator.geolocation`, timeout 10 s; fallback Medellín 6.2442, -75.5812) y llama `fetchWeatherData(lat, lon)` → si `isValleDeAburra` (6.00–6.50, -75.75–-75.40) intenta `/api/siata` (temp local) + Open-Meteo (resto: `temperature_2m, relative_humidity_2m, weather_code, shortwave_radiation` + `precipitation_probability` hora actual, `America/Bogota`); si falla o fuera del Valle, solo Open-Meteo. `getWeatherEmoji` mapea WMO → icono. Refresco cada **10 min** (`setInterval 600000`). Además consulta **AQI** a `api.waqi.info` (token demo en cliente). La escena 3D anima el **ciclo sol (6:00–18:00) / luna** con sombras `PCFSoftShadowMap` según la hora real.

## 4. Decisiones clave

| Decisión | Por qué |
| :--- | :--- |
| Astro SSR + Vercel (`output: server`) | Sesión y API en el mismo despliegue; páginas deciden por sesión en servidor. |
| JWT (no sessions DB) | Sin estado en serverless; el rol viaja en el token (re-login tras cambio de rol). |
| Proxy `/api/siata` | Evita CORS del navegador; timeout 3 s ante el límite serverless. |
| Dual SIATA/Open-Meteo | Precisión local en Medellín, respaldo global fuera/fallo. |
| CSV-first para Sheets | Sin credenciales Google: basta enlace público/export. Parser tolerante (delimitador, comillas, coma decimal, serial Excel, IDs `T0-P1/TO-P2`). |
| ExcelJS 3 hojas | Reporte auditoría (hoy + historial + rangos) con promedios vía fórmulas. |
| bcrypt salt 10 | Costo razonable login/registro en serverless. |
| PG nube, no SQLite | Serverless sin disco persistente; pool con SSL en prod. |

## 5. Modelo de datos (resumen)

Auth: `users (role enum Campesino def.)`, `accounts`, `sessions`, `verification_token` — [DATABASE](./DATABASE.md) §2, [AUTH](./AUTH.md).
Agronómico: `plantas`, `mediciones` (EAV por `tipo_medicion_enum`), `responsable`, `relaciones` + tipos TS `MetricRecord`/`PlantMatrixItem` (matriz `FILAS t0–t3`, `COLUMNAS Col 1–5`, códigos `T{f}-P{c}` / `P-01–P-20`, `REAL_DATES` 2026-09-14→30, `tempSuelo null` 29–30-sep).

## 6. Evolución (IoT / tiempo real / escala)

- **Persistencia Sheets→PG** y `GET /api/metrics` desde PG (propuesto, [DATABASE](./DATABASE.md) §5).
- **Estado global islas:** Nano Stores si se desacoplan islas Astro.
- **IoT real (ESP32/Arduino):** WebSocket/MQTT para ingesta continua → escribir en `mediciones`; la frecuencia de Settings (`1 min`…) hoy es preferencia de refresco, no ingesta.
- **Endurecer auth** en middleware/handlers ([AUTH](./AUTH.md) §7) y corregir etiqueta de rol en páginas (`'admin'` vs `'Admin'`).
- **Tests:** no hay suite (`*.test.*` inexistente); candidatos: `resolvePlantCoordinates`, `normalizeGoogleSheetUrl`/`parseCSV`, validadores de `register`, `extractDateAndHour`.
