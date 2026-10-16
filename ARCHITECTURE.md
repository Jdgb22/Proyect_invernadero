# Arquitectura del Sistema — Proyecto Invernadero

> **Documento canónico:** [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) (verificado contra `src/`, octubre 2026).
> Este archivo queda como resumen para no duplicar y evitar deriva.

**Stack:** Astro 7.2.8 SSR (adaptador Vercel) · Tailwind 4 · Three.js · Auth.js (`auth-astro`, Credentials + Google, JWT con rol) · PostgreSQL · Open-Meteo + SIATA (proxy `/api/siata`) · ExcelJS · Google Sheets CSV.

**Estructura:** `src/frontend/` (Dashboard, Metrics, Historial, Settings, Welcome, navbar, SinFinca) · `src/pages/` (`/` login+portada, `/signin` alias→`/`, `/metrics`, `/historial`, `/settings`, `/fincas`, `/fincas/[id]`, `/admin`, `/invitar/[codigo]` + `api/auth/*`, `api/fincas/*`, `api/invitaciones/*`, `api/admin/*`, `api/finca/*`, `api/export-excel`, `api/sync-sheets`, `api/siata`) · `src/backend/services/` (`metricsData`, `weather`, `siata`, `authz`, `fincas`, `lecturas`, `rateLimit`) · `src/services/notifications.ts` · `src/db/` (`auth-schema.sql`, `invernadero.sql`, `migrations/`, `client.ts`) · `auth.config.ts` · `src/middleware.ts`.

**Flujos y decisiones:** ver documento canónico (§3–§4): portada dual por sesión, registro con rol elegible `Campesino`/`Agropecuario`, recuperación 6 dígitos/15 min, datos agronómicos **persistidos en PG por finca** (`lecturas`), invitaciones por código nanoid, dual SIATA/Open-Meteo, proxy CORS con timeout 3 s.

**Índice completo de docs:** [`docs/README.md`](./docs/README.md).
