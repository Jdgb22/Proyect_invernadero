# 🌿 Macollo - Monitoreo Agronómico

Plataforma web **multi-finca** para el **monitoreo agronómico**: matriz de **20 plantas (4 filas × 5 columnas)** por finca, métricas de suelo y ambiente (pH, temperaturas, humedad, crecimiento, sanidad, productividad), **historial por fecha** con importación/exportación Excel y sincronización con **Google Sheets**, más clima externo (**Open-Meteo** global; **SIATA** local latente). **Diagnóstico fitosanitario con IA para detección de trips usando la API [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api) (BioCLIP 2.5)**, **galería de fotos por finca** con vista ampliable y almacenamiento por finca activa. Roles: `Superadmin`, `Admin`, `Agropecuario`, `Campesino`.

**Autores:**

- Nixon Ramirez
- Luis Manuel Florez
- Mateo Herrera
- Juan David Giraldo
- Alejandro Florez
- Victor Manuel Cordoba Larez

> 👤 **¿Eres usuario final?** Ve directo al [Manual de Usuario](./docs/USER_MANUAL.md). Este README es para desarrollo y despliegue.

---

## ✨ Funcionalidades por módulo

| Módulo (ruta)                                  | Qué hace                                                                                                                                                                                                                                                                                                           |
| :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Inicio** (`/`)                               | Dashboard con matriz 4×5 de plantas, semáforo 🟢 Óptimo / 🟡 Atención / 🔴 Crítico / ⚪ Sin datos, cards de humedad y temp. aire, modal de detalle por planta (pH, temp suelo/aire, crecimiento, productividad, sanidad). Para **Superadmin/Admin** sin finca elegida, el inicio es el panel de fincas (`/admin`). |
| **Métricas** (`/metrics`)                      | Promedios globales y por fila, badges de pH (Óptimo 6.0–6.8 / Atención / Crítico), sanidad y productividad, tabla estilo Excel con modal y gráficos por planta.                                                                                                                                                    |
| **Historial** (`/history`)                     | Consulta cronológica por fecha, **importación Excel/CSV**, **conexión Google Sheets** (URL pública → CSV, **solo el dueño de la finca**), **exportación `.xlsx`** con ExcelJS.                                                                                                                                     |
| **Configuración** (`/settings`)                | Perfil (nombre editable, correo solo lectura), tema Claro/Oscuro/Auto, frecuencia de sincronización IoT, notificaciones y zona de peligro.                                                                                                                                                                         |
| **Fincas** (`/farms`, `/farms/[id]`, `/admin`) | Multi-tenant: crear finca o unirse por invitación (código 8 chars), cambiar finca activa, gestionar miembros e invitaciones. `/admin` es el panel del staff (fincas + **Entrar**; usuarios y hard-delete solo `Superadmin`).                                                                                       |
| **Auth** (`/` → `/api/auth/*`)                 | Login email/celular+contraseña (bcrypt + PostgreSQL), registro con `accountType` (`Campesino`/`Agropecuario`), OAuth Google, recuperación por código (email/SMS, ~15 min). Sesión JWT con rol releído de BD. (`/signin` es alias a `/`.)                                                                           |
| **Clima externo**                              | Proxy `/api/siata` (evita CORS) para SIATA Medellín + `fetchWeatherData()` a Open-Meteo como respaldo global.                                                                                                                                                                                                      |

---

## 🚀 Tecnologías Principales

Construido con SSR moderno. Detalle en [ARCHITECTURE.md](./ARCHITECTURE.md) y [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

| Capa           | Tecnología (versión en `package.json`)                                                                               |
| :------------- | :------------------------------------------------------------------------------------------------------------------- |
| **Framework**  | [Astro](https://astro.build) 7.2.8 (SSR, adaptador Node/Vercel)                                                      |
| **UI**         | Astro Components + React 19 (islas) + `sileo` toasts                                                                 |
| **Estilos**    | Tailwind CSS 4.3.3                                                                                                   |
| **3D**         | Three.js 0.185.1 (iluminación dinámica según hora)                                                                   |
| **Auth**       | Auth.js (`auth-astro` 4.2.0, `@auth/core` 0.41.3, `@auth/pg-adapter` 1.11.3, `bcryptjs`)                             |
| **DB**         | PostgreSQL (`pg` 8.23.0). Esquemas en `src/db/`                                                                      |
| **Datos**      | Open-Meteo directo + fallback offline (SIATA pausado, ver ADR-007)                                                   |
| **Validación** | Zod 4 (Zero Trust en `register`, `sync-sheets`, `export-excel`)                                                      |
| **Calidad**    | Husky pre-commit (lint-staged prettier + bloqueo de secretos)                                                        |
| **Archivos**   | ExcelJS 4.4.0 (import/export `.xlsx`), Google Sheets sync                                                            |
| **Email/SMS**  | Nodemailer 10 (recuperación de contraseña)                                                                           |
| **IA / ML**    | [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api) (FastAPI + BioCLIP 2.5), consumida por proxy SSR |
| **Deploy**     | Vercel (web) + VPS para la API de ML                                                                                 |

### Estructura real del código

```text
/src
├── frontend/components/  # Dashboard, Metrics, History, Settings, Welcome, Navbar,
│                         # TripsDiagnosticModal, Gallery, GalleryDetail, NoFarm
├── frontend/layouts/     # Layout.astro (head, metadatos, Navbar)
├── frontend/styles/      # global.css (Tailwind)
├── pages/                # /index (portada + login), /signin (alias→/), /metrics, /history,
│                         # /gallery, /gallery/[id], /settings, /farms, /admin, /invite/[code]
├── pages/api/            # auth/*, farms/*, invitations/*, admin/*, gallery/*,
│                         # trips-diagnosis, export-excel, export-csv, sync-sheets, weather, aqi, siata
├── shared/               # plantMatrix, badges, roles, avatar, utils, clientStorage (SSR + cliente)
├── backend/services/     # sheetsSync, excelExport, csvExport, weather, siata, authz, farms, readings, rateLimit, notifications
├── db/                   # auth-schema.sql, greenhouse-schema.sql (+ migrations/), client.ts (pool pg)
├── middleware.ts         # Guarda rutas privadas + security headers + rate-limit + fix proxy
└── env.d.ts
/auth.config.ts           # Credentials + Google, JWT con rol, PostgresAdapter
/scripts                  # seed-admin.mjs, seed-demo.mjs, run-lan.sh (red local)
/public/uploads/gallery   # Fotos subidas desde el escáner (runtime)
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
   SESSION_MAX_AGE_HOURS=24
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   # SMTP para recuperación (Gmail: myaccount.google.com/apppasswords)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_FROM="Macollo <test@test.com>"
   SMTP_USER=test@test.com
   SMTP_PASS=abcdefghijklmnop
   # API de detección de trips (macollo-trips-api). Ver sección "Diagnóstico de Trips".
   ML_API_URL=http://127.0.0.1:8000
   ML_API_KEY=tu_api_key
   ```

   > **La API de ML es opcional para arrancar la web.** Si no defines `ML_API_URL`, los endpoints usan `http://127.0.0.1:8000` por defecto y el escáner mostrará "servidor de IA offline" hasta que la levantes.

3. **Base de datos:** crea la BD `invernadero` y ejecuta en orden:
   - `src/db/auth-schema.sql` (tablas `users`, cuentas OAuth, tokens de recuperación)
   - `src/db/greenhouse-schema.sql` (modelo por finca: `fincas`, `finca_miembros`, `finca_invitaciones`, `plantas`, `lecturas` y `photos` para la galería)

   ```bash
   createdb invernadero
   psql invernadero -f src/db/auth-schema.sql
   psql invernadero -f src/db/greenhouse-schema.sql
   ```

4. **Inicia el servidor:**

   ```bash
   pnpm dev
   ```

   > En segundo plano: `pnpm astro dev --background`. Gestión: `pnpm astro dev stop`, `pnpm astro dev status`, `pnpm astro dev logs`.

5. **Abre `http://localhost:4321`:**
   - Ve a `/` → pestaña **Registrarse** → crea tu usuario eligiendo `Campesino` (te unes con un código) o `Agropecuario` (creas tu finca).
   - Las cuentas privilegiadas (`Admin`/`Superadmin`) se crean por script: `node scripts/seed-admin.mjs`.
   - Inicia sesión → entrarás al Dashboard `/` (o a `/admin` si eres staff sin finca elegida, o a `/farms` si aún no tienes finca activa).
   - Si ves tarjetas grises (`--`/`N/D`), ve a `/history` e importa un Excel/CSV o conecta Google Sheets (solo el **dueño** de la finca).

### 🔬 Diagnóstico de Trips (conexión con la API de Machine Learning)

El diagnóstico fitosanitario con cámara usa la API externa **[macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api)** (FastAPI + BioCLIP 2.5). Es un **servidor independiente** de este proyecto; este repositorio solo actúa como proxy y cliente.

#### 1. Levantar la API de ML

Sigue las instrucciones del repositorio [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api). En resumen:

```bash
git clone https://github.com/VoctorMCL/macollo-trips-api.git
cd macollo-trips-api
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
./run_server.sh   # escucha en 0.0.0.0:8000
```

Debe quedar escuchando en el **puerto 8000** (distinto al 4321 de Astro). Verifica con:

```bash
curl http://127.0.0.1:8000/api/health
```

#### 2. Conectar Macollo con la API

Define en `.env` (o en Vercel) las variables:

| Variable     | Descripción                                                                                               | Ejemplo                 |
| :----------- | :-------------------------------------------------------------------------------------------------------- | :---------------------- |
| `ML_API_URL` | URL base del servicio ML. Desde el propio equipo usa `localhost`; desde otra máquina en la red usa su IP. | `http://127.0.0.1:8000` |
| `ML_API_KEY` | Clave que se envía en la cabecera `X-API-Key` (debe coincidir con la configurada en el servicio ML).      | `mk_...`                |

La web no llama directamente al servicio: el endpoint `src/pages/api/trips-diagnosis.ts` reenvía la imagen a `${ML_API_URL}/api/predict`. Esto evita CORS y mantiene la API key en el servidor.

#### 3. Probar desde el celular (misma Wi-Fi)

```bash
# Terminal 1: API de ML en el puerto 8000 (ver punto 1)
# Terminal 2: Macollo accesible en la red local
pnpm run dev:lan
```

Abre en el celular `http://<IP-LAN>:4321`, entra a **Escanear Trips** y captura/sube una foto. La web reenviará la imagen a la API de ML y guardará la foto en la galería de la finca activa.

> Si accedes por `http://IP` (sin HTTPS), el navegador bloquea la cámara directa (`getUserMedia`). El modal lo detecta y abre la **cámara nativa** mediante el selector de archivos; también puedes usar **Subir Foto**.

Más detalle técnico: [`docs/CAMERA-ML.md`](./docs/CAMERA-ML.md).

### Roles y sesiones

Roles: `Superadmin` · `Admin` · `Agropecuario` · `Campesino`. El rol se guarda en `users.role` y viaja en el JWT; `getAuthUser` lo **relee de BD** en cada petición (`auth.config.ts` → callbacks `jwt`/`session`). El acceso a datos se decide por **membresía de finca** (`finca_miembros`) + cookie `finca_activa`. El `middleware.ts` protege rutas privadas, aplica security headers y corrige `x-forwarded-proto/host` detrás de proxies (Cloudflare/Vercel).

---

## 📦 Comandos Disponibles

| Comando            | Descripción                                                                |
| :----------------- | :------------------------------------------------------------------------- |
| `pnpm install`     | Instala todas las dependencias del proyecto.                               |
| `pnpm dev`         | Inicia el servidor de desarrollo local.                                    |
| `pnpm run dev:lan` | Inicia en red local (`0.0.0.0`) en puerto 4321 para pruebas desde celular. |
| `pnpm build`       | Compila el proyecto para producción en el directorio `./dist/`.            |
| `pnpm preview`     | Previsualiza el proyecto compilado localmente antes de desplegar.          |
| `pnpm astro check` | Ejecuta validaciones de tipos en los archivos de Astro.                    |

> Despliegue en Vercel: define las mismas vars del `.env` en el panel de Vercel (`DATABASE_URL`, `AUTH_SECRET`, `GOOGLE_*`, `SMTP_*`, `ML_API_URL`, `ML_API_KEY`). Usa una DB en la nube (Supabase/RDS), no SQLite local. La API de ML debe estar desplegada aparte (VPS con ≥8 GB RAM) y accesible por HTTPS; no cabe en Vercel Functions.

### Solución rápida de problemas dev

| Síntoma                                  | Causa probable / fix                                                                                    |
| :--------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `[Auth] Falta AUTH_SECRET` en producción | Define `AUTH_SECRET` en `.env` / Vercel.                                                                |
| Login siempre "Credenciales incorrectas" | Usuario no existe o hash bcrypt inválido; verifica `users` en pgAdmin. El login acepta email o celular. |
| Tarjetas `--` / `N/D`                    | No hay lecturas en la finca activa; importa desde `/history`.                                           |
| Google OAuth no aparece / falla          | Faltan `GOOGLE_CLIENT_ID/SECRET` o URL de retorno no autorizada.                                        |
| Sheets: "Error de autenticación"         | La hoja no es pública/legible o no tienes permiso en la finca activa.                                   |
| Redirige a `/farms` al entrar            | No hay finca activa; crea una o únete por invitación.                                                   |
| Escáner: "servidor de IA offline"        | La API de ML no está corriendo o `ML_API_URL` apunta mal. Verifica `curl $ML_API_URL/api/health`.       |
| Escáner: error 401/403 desde ML          | `ML_API_KEY` no coincide con la clave configurada en la API de ML (`X-API-Key`).                        |
| Cámara no abre en el celular             | Es HTTP por IP (contexto no seguro). El modal abre la cámara nativa; o usa "Subir Foto".                |

---

## 📚 Documentación

- [👤 Manual de Usuario](./docs/USER_MANUAL.md) - Guía paso a paso (roles, dashboard 4×5 + 3D, métricas, historial, settings, FAQ).
- [📑 Índice de docs](./docs/README.md) - Mapa de toda la documentación.
- [Arquitectura](./docs/ARCHITECTURE.md) - Estructura `src/`, flujos, decisiones (SSR, JWT, proxy SIATA, DB).
- [Cámara y ML](./docs/CAMERA-ML.md) - Integración con [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api), configuración y pruebas desde celular.
- [Rutas](./docs/ROUTES.md) - Rutas reales (`/` login+portada, `/metrics`, `/history`, `/gallery`, `/settings`, `/admin` + API).
- [Endpoints](./docs/ENDPOINTS.md) - Referencia exacta de endpoints (auth, fincas, invitaciones, admin, datos, galería, ML) con bodies, códigos y `curl`.
- [Auth](./docs/AUTH.md) - Credentials + Google, JWT con rol, recuperación 6 dígitos/15 min, brechas.
- [Base de Datos](./docs/DATABASE.md) - Esquemas auth + agronómico multi-tenant (`fincas`, `plantas`, `lecturas`, `photos`), ER.
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
- **JSDoc en código:** `src/backend/services/`, `src/middleware.ts` y `auth.config.ts` están documentados para autocompletado del editor.
