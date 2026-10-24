# Changelog — Macollo

> Reconstruido desde `git log` (oct-2026). En adelante: entrada por release según CONTRIBUTING.

## [Unreleased]

### Fixed

- Documentación 2026-10-09: typo `(/ Sein)` → `(/)` en MANUAL_USUARIO; OAuth corregido a solo Google en USE_CASES/USER_STORIES; `.env.example` + README completados con `AUTH_TRUST_HOST`, `SMTP_HOST/PORT/FROM` (verificados contra `notifications.ts` y `auth.config.ts`).

### Added

- **Multi-tenant con 4 roles** (`Superadmin`, `Admin`, `Agropecuario`, `Campesino`): migración `src/db/migrations/001-roles-farms.sql` + tablas `fincas`, `finca_miembros`, `finca_invitaciones`, `plantas`, `lecturas`.
- Servicios `src/backend/services/authz.ts` (autorización Zero Trust, rol relee de BD, cookie `finca_activa`), `farms.ts` (CRUD, invitaciones con código nanoid, canje atómico) y `readings.ts` (persistencia por finca).
- APIs de fincas/invitaciones/miembros/admin + `GET|POST /api/farms/:id/readings`; `POST /api/auth/check-availability` (email/celular) que el wizard consulta antes del paso 2. El registro **ya no acepta `fincaCode`**: las invitaciones se canjean solo en `/api/invitations/use`.
- Páginas `/farms`, `/farms/[id]`, `/invite/[code]`, `/admin`; selector de finca en navbar; badge de rol real en Settings.
- Datos agronómicos separados por finca: `sync-sheets` persiste en `lecturas` y `Metrics`/`Historial` leen desde PG scopeados por finca activa; export Excel por finca.
- Scripts `scripts/seed-admin.mjs` (cuentas privilegiadas) y `scripts/seed-demo.mjs` (Finca demo + 20 plantas + lecturas).
- **Rol elegible al registrarse**: `accountType` ∈ {`Campesino` (def.), `Agropecuario`} (nuevas dependencias `nanoid` + `nanoid-dictionary`).
- **Códigos de invitación reales**: 8 caracteres con `nanoid` + `nanoid-dictionary` (sin prefijo `FARM-`), tope de 5 fincas por usuario.
- **Inicio por rol (staff → panel)**: `GET /` redirige a `/admin` si el usuario es `Superadmin`/`Admin` y no tiene finca activa; el panel añade la acción **Entrar** por finca (fija `finca_activa` y abre el tablero). Navbar del staff con `Panel` + (`Tablero`/`Métricas`/`Historial` solo con finca activa).
- Helper `canConnectSheets(access)` en `authz.ts`: habilita Google Sheets **solo al dueño** de la finca.

### Changed

- `middleware.ts`: security headers + protección de páginas/APIs reales + rate-limit por IP.
- `register`/`forgot`/`reset-password`: errores genéricos, contraseña mín. 8 en servidor y cliente.
- `astro.config.mjs`: `security.checkOrigin: true`.
- `siata`, `sync-sheets`, `export-excel`: ahora exigen sesión (y acceso a la finca activa).
- Rol: enum de 4 valores; etiquetas de rol en `/metrics` e `/history` usan el rol real.
- `POST /api/sync-sheets`: restringido al **dueño** de la finca activa (`403` para miembros y staff); la UI de `/history` oculta el botón a quien no sea dueño. Importar Excel/CSV (.csv/.xlsx) sigue abierto a cualquier miembro.
- `/signin` pasa a ser **alias** de `/` (redirige conservando `?desde=`/`?code=`); el login/registro vive en la portada `Welcome`.
- `DELETE /api/admin/users/:id`: ahora **rechaza con `409`** borrar a un usuario dueño de finca (la FK `fincas.dueno_id` es `ON DELETE RESTRICT`), evitando un `500`; el texto de confirmación del panel se corrigió.

### Galería y diagnóstico

- **Galería por finca**: nueva ruta `/gallery` y `/gallery/[id]` con grid `object-contain`, vista ampliable con zoom, descarga/compartir. Fotos compartidas entre todos los miembros de la finca activa.
- **Subida automática**: al capturar o seleccionar imagen desde el modal "Escanear Trips" se guarda en `public/uploads/gallery/` vía `POST /api/gallery/upload` con `finca_id` y `user_id`.
- **API galería**: `GET /api/gallery/[id]/file` sirve imágenes con control por finca activa.
- **Diagnóstico Trips**: modal con acceso a cámara (soporta HTTP por IP abriendo cámara nativa) y reenvío a servicio ML. Se guarda foto en galería de la finca activa.
- **Navbar**: añadido enlace "Galería" cuando hay finca activa.
- **Red local**: script `scripts/run-lan.sh` y `pnpm run dev:lan` para probar desde celular en misma Wi-Fi (puerto 4321).

## Security

- Eliminados artefactos con datos (`test-db.js`, `cookies.txt`, `scratch.js`); `.gitignore` endurecido.
- Autorización por handler (no solo middleware) en todas las rutas de datos.
- Google Sheets **dueño-only**: ni miembros ni staff sincronizan el documento de una finca.

### Documentation

- Documentación verificada contra `src/`: ARCHITECTURE, ROUTES, ENDPOINTS, AUTH, DATABASE, DEPLOYMENT, REQUIREMENTS (SRS), UML, TESTING, CONTRIBUTING, GLOSSARY, TROUBLESHOOTING, DATA-DICTIONARY, FIELD-PROTOCOL, DEMO-DATA (+ CSV demo), SECURITY, ROADMAP.
- ADRs 001–007 (`docs/decisions/`); ADR-004 parcialmente superseded por ADR-007.
- MANUAL_USUARIO ampliado (roles, matriz 4×5, 3D, clima/viento, Sheets, FAQ).

### Changed (previo)

- `weather.ts`: SIATA bypasseado → Open-Meteo directo (`wind_speed_10m`, `timezone=auto`) + fallback offline (`efed143`).
- `register`/`sync-sheets`/`export-excel`: validación Zod Zero Trust (`1ccbf24`).
- `middleware.ts`: security headers (DENY, nosniff, HSTS, CSP) (`1ccbf24`).
- Husky pre-commit: prettier + bloqueo de secretos (`1ccbf24`).
- Widget clima: viento (km/h) en vez de irradiación.

## 2026-10-23 — Galería, diagnóstico Trips y red local

- Galería por finca con vista ampliable y subida automática desde escáner.
- Soporte de cámara en HTTP por IP (usa selector/cámara nativa).
- Integración con API externa [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api) (BioCLIP 2.5) para detección de trips.
- `pnpm run dev:lan` + script para pruebas en red local.
- `.env.example` actualizado con variables ML/SMTP/Auth.

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
