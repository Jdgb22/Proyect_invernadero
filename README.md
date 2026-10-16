# 🌿 Proyecto Invernadero (Macollo) - Monitoreo Agronómico

Plataforma web **multi-finca** para el **monitoreo agronómico**: matriz de **20 plantas (4 filas × 5 columnas)** por finca, métricas de suelo y ambiente (pH, temperaturas, humedad, crecimiento, sanidad, productividad), **historial por fecha** con importación/exportación Excel y sincronización con **Google Sheets**, más clima externo (**Open-Meteo** global; **SIATA** local latente). Roles: `Superadmin`, `Admin`, `Agropecuario`, `Campesino`.

**Autores:**

- Nixon Ramirez
- Luis Manuel Florez
- Mateo Herrera
- Juan David Giraldo
- Alejandro Florez
- Victor Manuel Cordoba Larez

> 👤 **¿Eres usuario final?** Ve directo al [Manual de Usuario](./MANUAL_USUARIO.md). Este README es para desarrollo y despliegue.

---

## ✨ Funcionalidades por módulo

| Módulo (ruta)                                    | Qué hace                                                                                                                                                                                                                                                                                                           |
| :----------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Inicio** (`/`)                                 | Dashboard con matriz 4×5 de plantas, semáforo 🟢 Óptimo / 🟡 Atención / 🔴 Crítico / ⚪ Sin datos, cards de humedad y temp. aire, modal de detalle por planta (pH, temp suelo/aire, crecimiento, productividad, sanidad). Para **Superadmin/Admin** sin finca elegida, el inicio es el panel de fincas (`/admin`). |
| **Métricas** (`/metrics`)                        | Promedios globales y por fila, badges de pH (Óptimo 6.0–6.8 / Atención / Crítico), sanidad y productividad, tabla estilo Excel con modal y gráficos por planta.                                                                                                                                                    |
| **Historial** (`/historial`)                     | Consulta cronológica por fecha, **importación Excel/CSV**, **conexión Google Sheets** (URL pública → CSV, **solo el dueño de la finca**), **exportación `.xlsx`** con ExcelJS.                                                                                                                                     |
| **Configuración** (`/settings`)                  | Perfil (nombre editable, correo solo lectura), tema Claro/Oscuro/Auto, frecuencia de sincronización IoT, notificaciones y zona de peligro.                                                                                                                                                                         |
| **Fincas** (`/fincas`, `/fincas/[id]`, `/admin`) | Multi-tenant: crear finca o unirse por invitación (código 8 chars), cambiar finca activa, gestionar miembros e invitaciones. `/admin` es el panel del staff (fincas + **Entrar**; usuarios y hard-delete solo `Superadmin`).                                                                                       |
| **Auth** (`/` → `/api/auth/*`)                   | Login email/nombre/teléfono+contraseña (bcrypt + PostgreSQL), registro con `accountType` (`Campesino`/`Agropecuario`), OAuth Google, recuperación por código (email/SMS, ~15 min). Sesión JWT con rol releído de BD. (`/signin` es alias a `/`.)                                                                   |
| **Clima externo**                                | Proxy `/api/siata` (evita CORS) para SIATA Medellín + `fetchWeatherData()` a Open-Meteo como respaldo global.                                                                                                                                                                                                      |

---

## 🚀 Tecnologías Principales

Construido con SSR moderno. Detalle en [ARCHITECTURE.md](./ARCHITECTURE.md) y [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

| Capa           | Tecnología (versión en `package.json`)                                                   |
| :------------- | :--------------------------------------------------------------------------------------- |
| **Framework**  | [Astro](https://astro.build) 7.2.8 (SSR, adaptador Node/Vercel)                          |
| **UI**         | Astro Components + React 19 (islas) + `sileo` toasts                                     |
| **Estilos**    | Tailwind CSS 4.3.3                                                                       |
| **3D**         | Three.js 0.185.1 (iluminación dinámica según hora)                                       |
| **Auth**       | Auth.js (`auth-astro` 4.2.0, `@auth/core` 0.41.3, `@auth/pg-adapter` 1.11.3, `bcryptjs`) |
| **DB**         | PostgreSQL (`pg` 8.23.0). Esquemas en `src/db/`                                          |
| **Datos**      | Open-Meteo directo + fallback offline (SIATA pausado, ver ADR-007)                       |
| **Validación** | Zod 4 (Zero Trust en `register`, `sync-sheets`, `export-excel`)                          |
| **Calidad**    | Husky pre-commit (lint-staged prettier + bloqueo de secretos)                            |
| **Archivos**   | ExcelJS 4.4.0 (import/export `.xlsx`), Google Sheets sync                                |
| **Email/SMS**  | Nodemailer 10 (recuperación de contraseña)                                               |
| **Deploy**     | Vercel                                                                                   |

### Estructura real del código

```text
/src
├── frontend/components/  # Dashboard, Metrics, Historial, Settings, Welcome, navbar
├── frontend/layouts/     # Layout.astro (head, metadatos, navbar)
├── frontend/styles/      # global.css (Tailwind)
├── pages/                # /index (portada + login), /signin (alias→/), /metrics, /historial, /settings, /fincas, /admin, /invitar/[codigo]
├── pages/api/            # auth/* (register, check-availability, forgot/reset), fincas/*, invitaciones/*,
│                         # admin/*, export-excel, sync-sheets, siata
├── backend/services/     # metricsData, weather, siata, authz, fincas, lecturas, rateLimit
├── services/             # notifications.ts (email/SMS recuperación)
├── db/                   # auth-schema.sql, invernadero.sql (+ migrations/), client.ts (pool pg)
├── middleware.ts         # Guarda rutas privadas + security headers + rate-limit + fix proxy
└── env.d.ts
/auth.config.ts           # Credentials + Google, JWT con rol, PostgresAdapter
```

---

## 🛠️ Requisitos Previos

- [Node.js](https://nodejs.org/) **v22.12+** (ver `engines` en `package.json`)
- [pnpm](https://pnpm.io/) (gestor usado en este proyecto)
- **PostgreSQL 17+** local o en la nube (Supabase/RDS), con pgAdmin opcional
- Cuenta de Google Cloud (solo si usarás OAuth/Sheets) + SMTP (Gmail App Password para recuperación)

---

## 💻 Instalación y Ejecución Local

1. **Clona e instala:**

   ```bash
   pnpm install
   ```

2. **Variables de entorno:** copia `.env.example` a `.env` y completa (NO commitees el `.env` real):

   ```env
   DATABASE_URL=postgres://postgres:TU_PASSWORD@localhost:5432/invernadero
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=TU_PASSWORD
   POSTGRES_DATABASE=invernadero
   # openssl rand -base64 32
   AUTH_SECRET="tu_secreto_generado"
   AUTH_TRUST_HOST=true
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   # SMTP para recuperación (Gmail: myaccount.google.com/apppasswords)
   SMTP_USER=test@test.com
   SMTP_PASS=abcdefghijklmnop
   ```

3. **Base de datos:** crea la BD `invernadero` y ejecuta en orden:
   - `src/db/auth-schema.sql` (tablas `users`, cuentas OAuth, tokens de recuperación)
   - `src/db/invernadero.sql` (modelo por finca: `fincas`, `finca_miembros`, `finca_invitaciones`, `plantas`, `lecturas`)

   ```bash
   createdb invernadero
   psql invernadero -f src/db/auth-schema.sql
   psql invernadero -f src/db/invernadero.sql
   ```

4. **Inicia el servidor:**

   ```bash
   pnpm dev
   ```

   > En segundo plano: `pnpm astro dev --background`. Gestión: `pnpm astro dev stop`, `pnpm astro dev status`, `pnpm astro dev logs`.

5. **Abre `http://localhost:4321`:**
   - Ve a `/` → pestaña **Registrarse** → crea tu usuario eligiendo `Campesino` (te unes con un código) o `Agropecuario` (creas tu finca).
   - Las cuentas privilegiadas (`Admin`/`Superadmin`) se crean por script: `node scripts/seed-admin.mjs`.
   - Inicia sesión → entrarás al Dashboard `/` (o a `/admin` si eres staff sin finca elegida, o a `/fincas` si aún no tienes finca activa).
   - Si ves tarjetas grises (`--`/`N/D`), ve a `/historial` e importa un Excel/CSV o conecta Google Sheets (solo el **dueño** de la finca).

### Roles y sesiones

Roles: `Superadmin` · `Admin` · `Agropecuario` · `Campesino`. El rol se guarda en `users.role` y viaja en el JWT; `getAuthUser` lo **relee de BD** en cada petición (`auth.config.ts` → callbacks `jwt`/`session`). El acceso a datos se decide por **membresía de finca** (`finca_miembros`) + cookie `finca_activa`. El `middleware.ts` protege rutas privadas, aplica security headers y corrige `x-forwarded-proto/host` detrás de proxies (Cloudflare/Vercel).

---

## 📦 Comandos Disponibles

| Comando            | Descripción                                                       |
| :----------------- | :---------------------------------------------------------------- |
| `pnpm install`     | Instala todas las dependencias del proyecto.                      |
| `pnpm dev`         | Inicia el servidor de desarrollo local.                           |
| `pnpm build`       | Compila el proyecto para producción en el directorio `./dist/`.   |
| `pnpm preview`     | Previsualiza el proyecto compilado localmente antes de desplegar. |
| `pnpm astro check` | Ejecuta validaciones de tipos en los archivos de Astro.           |

> Despliegue en Vercel: define las mismas vars del `.env` en el panel de Vercel (`DATABASE_URL`, `AUTH_SECRET`, `GOOGLE_*`, `SMTP_*`). Usa una DB en la nube (Supabase/RDS), no SQLite local.

### Solución rápida de problemas dev

| Síntoma                                  | Causa probable / fix                                                                                             |
| :--------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `[Auth] Falta AUTH_SECRET` en producción | Define `AUTH_SECRET` en `.env` / Vercel.                                                                         |
| Login siempre "Credenciales incorrectas" | Usuario no existe o hash bcrypt inválido; verifica `users` en pgAdmin. El login acepta email, nombre o teléfono. |
| Tarjetas `--` / `N/D`                    | No hay lecturas en la finca activa; importa desde `/historial`.                                                  |
| Google OAuth no aparece / falla          | Faltan `GOOGLE_CLIENT_ID/SECRET` o URL de retorno no autorizada.                                                 |
| Sheets: "Error de autenticación"         | La hoja no es pública/legible o no tienes permiso en la finca activa.                                            |
| Redirige a `/fincas` al entrar           | No hay finca activa; crea una o únete por invitación.                                                            |

---

## 📚 Documentación

- [👤 Manual de Usuario](./MANUAL_USUARIO.md) - Guía paso a paso (roles, dashboard 4×5 + 3D, métricas, historial, settings, FAQ).
- [📑 Índice de docs](./docs/README.md) - Mapa de toda la documentación.
- [Arquitectura](./docs/ARCHITECTURE.md) - Estructura `src/`, flujos, decisiones (SSR, JWT, proxy SIATA, DB).
- [Rutas](./docs/ROUTES.md) - Rutas reales (`/` login+portada, `/metrics`, `/historial`, `/settings`, `/admin` + API).
- [Endpoints](./docs/ENDPOINTS.md) - Referencia exacta de los endpoints (auth, fincas, invitaciones, admin, datos) con bodies, códigos y `curl`.
- [Auth](./docs/AUTH.md) - Credentials + Google, JWT con rol, recuperación 6 dígitos/15 min, brechas.
- [Base de Datos](./docs/DATABASE.md) - Esquemas auth + agronómico multi-tenant (`fincas`, `plantas`, `lecturas`), ER.
- [Despliegue](./docs/DEPLOYMENT.md) - Vercel SSR, env vars, checklist y rollback.
- [Decisiones (ADRs)](./docs/decisions/) - Los 7 porqués (SSR, PG, Auth.js, SIATA, Sheets, bcrypt, bypass SIATA).
- [Datos](./docs/DATA-DICTIONARY.md) + [Protocolo de campo](./docs/FIELD-PROTOCOL.md) + [Demo](./docs/DEMO-DATA.md) - Campos, cómo llenar la hoja y fixture CSV.
- [Seguridad](./docs/SECURITY.md) + [Roadmap](./docs/ROADMAP.md) + [Changelog](./docs/CHANGELOG.md) - Política, plan y historial.
- [Requisitos](./docs/REQUIREMENTS.md) - SRS v1.0 con trazabilidad RF→CU/US.
- [UML](./docs/UML.md) - Clases, componentes, despliegue y estados.
- [Testing](./docs/TESTING.md) - Plan, casos E2E/API y checklist release.
- [Contribuir](./docs/CONTRIBUTING.md) - Flujo, commits, DoD y revisión de PR.
- [Glosario](./docs/GLOSSARY.md) + [Troubleshooting](./docs/TROUBLESHOOTING.md) - Términos y runbook por síntoma.
- [Casos de uso](./docs/USE_CASES.md) + [Historias](./docs/USER_STORIES.md) - Requisitos (lo no implementado va marcado ⚠️).
- [Secuencia](./docs/SEQUENCE_DIAGRAMS.md) + [Actividades](./docs/ACTIVITIES.md) - Diagramas Mermaid verificados.
- **JSDoc en código:** `src/backend/services/`, `src/middleware.ts`, `auth.config.ts` y `src/services/notifications.ts` están documentados para autocompletado del editor.
