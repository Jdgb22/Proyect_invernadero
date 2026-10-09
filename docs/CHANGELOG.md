# Changelog — Proyecto Invernadero (Macollo)

> Reconstruido desde `git log` (oct-2026). En adelante: entrada por release según CONTRIBUTING.

## [Unreleased]

### Fixed

- Documentación 2026-10-09: typo `(/ Sein)` → `(/)` en MANUAL_USUARIO; OAuth corregido a solo Google en USE_CASES/USER_STORIES; `.env.example` + README completados con `AUTH_TRUST_HOST`, `SMTP_HOST/PORT/FROM` (verificados contra `notifications.ts` y `auth.config.ts`).

### Added

- Documentación verificada contra `src/`: ARCHITECTURE, ROUTES, ENDPOINTS, AUTH, DATABASE, DEPLOYMENT, REQUIREMENTS (SRS), UML, TESTING, CONTRIBUTING, GLOSSARY, TROUBLESHOOTING, DATA-DICTIONARY, FIELD-PROTOCOL, DEMO-DATA (+ CSV demo), SECURITY, ROADMAP.
- ADRs 001–007 (`docs/decisions/`); ADR-004 parcialmente superseded por ADR-007.
- MANUAL_USUARIO ampliado (roles, matriz 4×5, 3D, clima/viento, Sheets, FAQ).

### Changed

- `weather.ts`: SIATA bypasseado → Open-Meteo directo (`wind_speed_10m`, `timezone=auto`) + fallback offline (`efed143`).
- `register`/`sync-sheets`/`export-excel`: validación Zod Zero Trust (`1ccbf24`).
- `middleware.ts`: security headers (DENY, nosniff, HSTS, CSP) (`1ccbf24`).
- Husky pre-commit: prettier + bloqueo de secretos (`1ccbf24`).
- Widget clima: viento (km/h) en vez de irradiación.

## 2026-10-08 — Tandem seguridad + docs

- `1ccbf24` feat: Zod, security headers, Husky hooks.
- `efed143` refactor: SIATA → viento Open-Meteo.
- `ad71f47` docs: ADRs y componentes (primera oleada).

## 2026-10-07 — Registro y deploy

- Validaciones de registro (email/celular/fecha) (`103caca`, `c3eab94`).
- Fix deploy Vercel (`cc41348`); merge PR #17.

## 2026-10-06 — Recuperación de clave

- OTP 6 dígitos vía Gmail (`6e73321`): `forgot/reset-password` + `verification_token`.

## 2026-10-05 — Estabilidad prod

- Timeout 3 s SIATA anti-crash Vercel (`1d30c5d`); SSL Neon (`3399605`).

## 2026-10-01 — Núcleo auth + datos

- Unificación `mediciones`, endurecimiento auth, pool 20 (`0e4785d`, `6d74068`); migración usuarios + nodemailer (`883ca21`).

## 2026-09-30 — Dashboard y exportaciones

- Dashboard + Historial + `metricsData` + export/sync APIs (`7ff50ea`); Excel export (`e8e9162`); Welcome + Google (`e200f75`, `1ee6095`).

## 2026-09-24/29 — Marca y base

- Rebrand AquaSens → Macollo + gulupa (`c16276c`, `0ed6232`, `54a581e`); schemas a `src/db/` (`ad813e6`).
