# Arquitectura del Sistema — Macollo

> **Documento canónico:** [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) (verificado contra `src/`, octubre 2026).
> Este archivo queda como resumen para no duplicar y evitar deriva.

**Stack:** Astro 7.2.8 SSR (adaptador Vercel) · Tailwind 4 · Three.js · Auth.js (`auth-astro`, Credentials + Google, JWT con rol) · PostgreSQL · Open-Meteo + SIATA (proxy `/api/siata`) · ExcelJS · Google Sheets CSV.

**Estructura:** `src/frontend/` (Dashboard, Metrics, History, Settings, Welcome, Navbar, NoFarm, Gallery, GalleryDetail) · `src/pages/` (`/` login+portada, `/signin` alias→`/`, `/metrics`, `/history`, `/settings`, `/farms`, `/farms/[id]`, `/admin`, `/invite/[code]`, `/gallery`, `/gallery/[id]` + `api/auth/*`, `api/farms/*`, `api/invitations/*`, `api/admin/*`, `api/gallery/*`, `api/export-excel`, `api/export-csv`, `api/sync-sheets`, `api/weather`, `api/aqi`, `api/siata`) · `src/backend/services/` (`weather`, `siata`, `authz`, `farms`, `readings`, `notifications`, `rateLimit`, `csvExport`, `excelExport`) · `src/db/` (`auth-schema.sql`, `greenhouse-schema.sql`, `migrations/`, `client.ts`) · `auth.config.ts` · `src/middleware.ts`.

**Flujos y decisiones:** ver documento canónico (§3–§4): portada dual por sesión, registro con rol elegible `Campesino`/`Agropecuario`, recuperación 6 dígitos/15 min, datos agronómicos **persistidos en PG por finca** (`lecturas`), invitaciones por código nanoid, dual SIATA/Open-Meteo, proxy CORS con timeout 3 s.

**Índice completo de docs:** [`docs/README.md`](./docs/README.md).
