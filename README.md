# 🌿 Proyecto Invernadero (Macollo) - Monitoreo Agronómico

Plataforma web para el **monitoreo agronómico de un invernadero real**: matriz de **20 plantas (4 filas × 5 columnas)**, métricas de suelo y ambiente (pH, temperaturas, humedad, crecimiento, sanidad, productividad), **historial por fecha** con importación/exportación Excel y sincronización con **Google Sheets**, más clima externo (**SIATA** local + **Open-Meteo** global).

**Autores:**
- Nixon Ramirez
- Luis Manuel Florez
- Mateo Herrera
- Juan David Giraldo
- Alejandro Florez
- Luis Angel Mesa

> 👤 **¿Eres usuario final?** Ve directo al [Manual de Usuario](./MANUAL_USUARIO.md). Este README es para desarrollo y despliegue.

---

## ✨ Funcionalidades por módulo

| Módulo (ruta) | Qué hace |
| :--- | :--- |
| **Inicio** (`/`) | Dashboard con matriz 4×5 de plantas, semáforo 🟢 Óptimo / 🟡 Atención / 🔴 Crítico / ⚪ Sin datos, cards de humedad y temp. aire, modal de detalle por planta (pH, temp suelo/aire, crecimiento, productividad, sanidad). |
| **Métricas** (`/metrics`) | Promedios globales y por fila, badges de pH (Óptimo 6.0–6.8 / Atención / Crítico), sanidad y productividad, tabla estilo Excel con modal y gráficos por planta. |
| **Historial** (`/historial`) | Consulta cronológica por fecha, **importación Excel/CSV**, **conexión Google Sheets** (URL pública → CSV), **exportación `.xlsx`** con ExcelJS. |
| **Configuración** (`/settings`) | Perfil (nombre editable, correo solo lectura), tema Claro/Oscuro/Auto, frecuencia de sincronización IoT, notificaciones y zona de peligro. |
| **Auth** (`/signin`, `/api/auth/*`) | Login email+contraseña (bcrypt + PostgreSQL), registro con rol (`Campesino/Agrónomo/Admin/Super admin`), OAuth Google, recuperación por código (email/SMS, ~15 min). Sesión JWT con rol. |
| **Clima externo** | Proxy `/api/siata` (evita CORS) para SIATA Medellín + `fetchWeatherData()` a Open-Meteo como respaldo global. |

---

## 🚀 Tecnologías Principales

Construido con SSR moderno. Detalle en [ARCHITECTURE.md](./ARCHITECTURE.md) y [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

| Capa | Tecnología (versión en `package.json`) |
| :--- | :--- |
| **Framework** | [Astro](https://astro.build) 7.2.8 (SSR, adaptador Node/Vercel) |
| **UI** | Astro Components + React 19 (islas) + `sileo` toasts |
| **Estilos** | Tailwind CSS 4.3.3 |
| **3D** | Three.js 0.185.1 (iluminación dinámica según hora) |
| **Auth** | Auth.js (`auth-astro` 4.2.0, `@auth/core` 0.41.3, `@auth/pg-adapter` 1.11.3, `bcryptjs`) |
| **DB** | PostgreSQL (`pg` 8.23.0). Esquemas en `src/db/` |
| **Datos** | Open-Meteo (global) + SIATA (Medellín, vía proxy) |
| **Archivos** | ExcelJS 4.4.0 (import/export `.xlsx`), Google Sheets sync |
| **Email/SMS** | Nodemailer 10 (recuperación de contraseña) |
| **Deploy** | Vercel |

### Estructura real del código

```text
/src
├── frontend/components/  # Dashboard, Metrics, Historial, Settings, Welcome, navbar
├── frontend/layouts/     # Layout.astro (head, metadatos, navbar)
├── frontend/styles/      # global.css (Tailwind)
├── pages/                # /index, /signin, /metrics, /historial, /settings
├── pages/api/            # auth/register, auth/forgot-password, auth/reset-password,
│                         # export-excel, sync-sheets, siata
├── backend/services/     # metricsData.ts (matriz 20 plantas), weather.ts, siata.ts
├── services/             # notifications.ts (email/SMS recuperación)
├── db/                   # auth-schema.sql, invernadero.sql, client.ts (pool pg)
├── middleware.ts         # Guarda de rutas privadas + fix proxy (Cloudflare/Vercel)
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
   - `src/db/invernadero.sql` (tipos como `tipo_medicion_enum`, tablas de mediciones)

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
   - Ve a `/signin` → pestaña **Registrarse** → crea tu usuario (rol `Super admin` para el primero).
   - Inicia sesión → entrarás al Dashboard `/`.
   - Si ves tarjetas grises (`--`/`N/D`), ve a `/historial` e importa un Excel/CSV o conecta Google Sheets.

### Roles y sesiones

Roles: `Campesino` (defecto) · `Agrónomo` · `Admin` · `Super admin`. El rol se guarda en `users.role` y viaja en el JWT (`auth.config.ts` → callbacks `jwt`/`session`). El `middleware.ts` protege rutas privadas y corrige `x-forwarded-proto/host` detrás de proxies (Cloudflare/Vercel).

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

| Síntoma | Causa probable / fix |
| :--- | :--- |
| `[Auth] Falta AUTH_SECRET` en producción | Define `AUTH_SECRET` en `.env` / Vercel. |
| Login siempre "Credenciales incorrectas" | Usuario no existe o hash bcrypt inválido; verifica `users` en pgAdmin. El login acepta email, nombre o teléfono. |
| Tarjetas `--` / `N/D` | No hay mediciones; importa desde `/historial`. |
| Google OAuth no aparece / falla | Faltan `GOOGLE_CLIENT_ID/SECRET` o URL de retorno no autorizada. |
| Sheets: "Error de autenticación" | La hoja no es pública/legible o el rol no es Admin. |

---

## 📚 Documentación

- [👤 Manual de Usuario](./MANUAL_USUARIO.md) - Guía paso a paso (roles, dashboard 4×5 + 3D, métricas, historial, settings, FAQ).
- [📑 Índice de docs](./docs/README.md) - Mapa de toda la documentación.
- [Arquitectura](./docs/ARCHITECTURE.md) - Estructura `src/`, flujos, decisiones (SSR, JWT, proxy SIATA, DB).
- [Rutas](./docs/ROUTES.md) - Rutas reales (`/`, `/signin`, `/metrics`, `/historial`, `/settings` + API).
- [Endpoints](./docs/ENDPOINTS.md) - Referencia exacta de los 7 endpoints con bodies, códigos y `curl`.
- [Auth](./docs/AUTH.md) - Credentials + Google, JWT con rol, recuperación 6 dígitos/15 min, brechas.
- [Base de Datos](./docs/DATABASE.md) - Esquemas auth + agronómico, ER, brecha dataset-en-memoria.
- [Despliegue](./docs/DEPLOYMENT.md) - Vercel SSR, env vars, checklist y rollback.
- [Decisiones (ADRs)](./docs/decisions/) - Los 6 porqués arquitectónicos (SSR, PG, Auth.js, SIATA, Sheets, bcrypt).
- [Requisitos](./docs/REQUIREMENTS.md) - SRS v1.0 con trazabilidad RF→CU/US.
- [UML](./docs/UML.md) - Clases, componentes, despliegue y estados.
- [Testing](./docs/TESTING.md) - Plan, casos E2E/API y checklist release.
- [Contribuir](./docs/CONTRIBUTING.md) - Flujo, commits, DoD y revisión de PR.
- [Glosario](./docs/GLOSSARY.md) + [Troubleshooting](./docs/TROUBLESHOOTING.md) - Términos y runbook por síntoma.
- [Casos de uso](./docs/USE_CASES.md) + [Historias](./docs/USER_STORIES.md) - Requisitos (lo no implementado va marcado ⚠️).
- [Secuencia](./docs/SEQUENCE_DIAGRAMS.md) + [Actividades](./docs/ACTIVITIES.md) - Diagramas Mermaid verificados.
- **JSDoc en código:** `src/backend/services/`, `src/middleware.ts`, `auth.config.ts` y `src/services/notifications.ts` están documentados para autocompletado del editor.
