# Rutas (Routes) de la Aplicación

> Fuente de verdad: `src/pages/` + `src/middleware.ts` + `src/frontend/components/navbar.astro`.
> Última revisión: octubre 2026. Si agregas una página, actualiza esta tabla.

El proyecto usa **file-based routing de Astro**: cada archivo en `src/pages/` es una ruta.
La marca del producto es **Macollo** (ver logo en navbar) dentro del **Proyecto Invernadero**.

---

## Rutas Públicas (sin sesión)

### Route: `/`

**Archivo:** `src/pages/index.astro`
**Descripción:** Entrada única de la aplicación. Decide qué mostrar según la sesión (`getSession`):

- **Sin sesión** → renderiza `Welcome.astro` (login/registro; antes vivía en `/signin`).
- **Con sesión y staff (Superadmin/Admin) sin finca seleccionada** → redirige a `/admin` (panel de fincas); al pulsar «Entrar» en una finca se fija `finca_activa` y ya se ve el tablero.
- **Con sesión y finca activa** → renderiza `Navbar` + `Dashboard.astro` (matriz 4×5 de plantas).
- **Con sesión y sin finca** → `SinFinca.astro` (invita a crear/unirse a una finca).

No hay landing separada del dashboard: la misma URL cambia según autenticación y rol.

### Route: `/signin`

**Archivo:** `src/pages/signin.astro`
**Descripción:** Alias **deprecado**. El login/registro viven en `/` (`Welcome.astro`). Si hay sesión redirige a `?desde=` (o `/`); si no, redirige a `/?desde=…&codigo=…`. Se conserva solo para no romper enlaces antiguos e invitaciones.
**Contenido (real, en `/`):**

- Pestaña **Iniciar Sesión**: email/nombre/teléfono (+ contraseña) → `signIn('credentials')` de Auth.js, o botón **Continuar con Google** (OAuth). El post-login respeta `?desde=` (p. ej. `/invitar/CODE`).
- Pestaña **Registrarse**: nombre + email/celular + contraseña (mín. 8) + **tipo de cuenta** (`Campesino`/`Agropecuario`) y nombre de finca para Agropecuario → `POST /api/auth/register`. El rol se asigna desde `accountType`.

---

## Rutas Protegidas (requieren sesión)

> Protección real: `src/middleware.ts` exige sesión para `/metrics`, `/historial`, `/settings`, `/fincas` y `/admin` (redirect a `/` con `?desde=`), y para las APIs de datos (`401`). Además cada página/handler revalida sesión y autorización (Zero Trust). Ver [AUTH](./AUTH.md).

### Route: `/metrics`

**Archivo:** `src/pages/metrics.astro` → componente `Metrics.astro`
**Descripción:** Panel agronómico de las 20 plantas (matriz `t0–t3` × `Col 1–Col 5`).
**Elementos:**

- Promedios globales: pH suelo, temp. interna/externa/suelo, crecimiento, humedad, % plantas sanas.
- Resumen por fila (`Fila t0…t3`) para comparar microclimas.
- Badges: pH (Óptimo 6.0–6.8 / Atención 5.5–7.2 / Crítico), sanidad (`Excelente/Saludable/Vulnerable/Crítica`), productividad (`Alta/Media/Baja`).
- Tabla estilo Excel + selector rápido; clic en planta → modal con última medición y gráficos.
- Muestra `Sesión activa: nombre (rol)`; rol `admin` se etiqueta `Administrador de Cultivo`, resto `Operario de Campo`.

### Route: `/historial`

**Archivo:** `src/pages/historial.astro` → componente `Historial.astro`
**Descripción:** Historial cronológico multidía + importación/exportación.
**Elementos:**

- Selector de fecha (por defecto la más reciente de `REAL_DATES`: 2026-09-14 a 2026-09-30).
- Tabla de tomas del día para las 20 plantas.
- **Importar** Excel/CSV (parseo en cliente).
- **Conectar Google Sheets** (solo el **dueño** de la finca): modal que pide URL pública → `POST /api/sync-sheets` (convierte a `export?format=csv`, parsea columnas `ID_planta, fecha, T_Ext_C, T_Int_C, humedad_Pct, T_Planta_C, Ph, ALtura_cm…`, persiste en `lecturas` de la finca y devuelve `records` al cliente). Los miembros no ven el botón y reciben `403`.
- **Exportar a Excel**: `GET/POST /api/export-excel` → descarga `Macollo_Mediciones_Invernadero_YYYY-MM-DD.xlsx` (hojas: _Mediciones de Hoy_, _Historial Completo_, _Rangos Agronómicos_).

### Route: `/settings`

**Archivo:** `src/pages/settings.astro` → componente `Settings.astro`
**Descripción:** Perfil y preferencias (lee sesión para nombre/email/avatar).
**Secciones (tabs laterales):**

- **Perfil de Usuario**: nombre editable, correo solo lectura, insignia de rol.
- **Preferencias del Sistema**: tema (Automático/Claro/Oscuro), frecuencia de sincronización IoT.
- **Notificaciones**: toasts/push de alertas (vía `sileo`).
- **Zona de Peligro**: acciones irreversibles con confirmación.
- **Mis Fincas**: listado con finca activa, unirse por código y salir.

### Route: `/fincas`

**Archivo:** `src/pages/fincas.astro`
**Descripción:** Lista las fincas visibles para el usuario (propias + todas si es staff). Permite crear una finca (Agropecuario/Admin/Superadmin quedan como dueño; los Campesinos no crean), unirse por código de 8 caracteres (p.ej. `K7M4XP9Q`), activar una finca y ver su detalle. Si no tiene ninguna, es la pantalla "únete a una finca".

### Route: `/fincas/[id]`

**Archivo:** `src/pages/fincas/[id].astro`
**Descripción:** Detalle de la finca. El dueño/staff gestiona: editar datos, generar/revocar invitaciones (código + link), ver y expulsar miembros, archivar/restaurar. Otros miembros ven vista simple de plantas. Hard delete solo Superadmin (`DELETE /api/fincas/:id`).

### Route: `/invitar/[codigo]`

**Archivo:** `src/pages/invitar/[codigo].astro`
**Descripción:** Vista previa de una invitación (`peekInvitacion`). Sin sesión, ofrece iniciar sesión/registrarse conservando el código; con sesión, permite confirmar la unión (`POST /api/invitaciones/usar`).

### Route: `/admin`

**Archivo:** `src/pages/admin.astro`
**Descripción:** Panel de fincas para **Superadmin y Admin** (es el "Inicio" del staff). Lista todas las fincas del sistema con acción **Entrar** (fija la finca activa y abre su tablero), además de archivar/restaurar. **Solo el Superadmin** ve además la tabla de **Usuarios** (cambiar rol / eliminar cuenta) y el botón **Eliminar finca** (hard delete). Protege al último Superadmin y el auto-borrado.

---

## Rutas de API

| Ruta                                  | Método             | Descripción                                                                                 | Auth                           | Implementación                                      |
| :------------------------------------ | :----------------- | :------------------------------------------------------------------------------------------ | :----------------------------- | :-------------------------------------------------- |
| `/api/auth/register`                  | POST               | Crea usuario (bcrypt, rol según `accountType`); `fincaNombre` obligatorio para Agropecuario | No                             | `src/pages/api/auth/register.ts`                    |
| `/api/auth/check-availability`        | POST               | Indica si un correo/celular ya está registrado (paso 1 del wizard)                          | No                             | `src/pages/api/auth/check-availability.ts`          |
| `/api/auth/forgot-password`           | POST               | Genera código 6 dígitos (15 min), envía email/SMS; respuesta genérica                       | No                             | `src/pages/api/auth/forgot-password.ts`             |
| `/api/auth/reset-password`            | POST               | Valida código y actualiza contraseña (bcrypt, mín. 8)                                       | No                             | `src/pages/api/auth/reset-password.ts`              |
| `/api/auth/*`                         | GET/POST           | Flujos Auth.js: `signin`, `signout`, `callback`, `session`                                  | No                             | `auth-astro` + `auth.config.ts`                     |
| `/api/fincas`                         | GET, POST          | Lista fincas visibles / crea finca                                                          | Sesión                         | `src/pages/api/fincas/index.ts`                     |
| `/api/fincas/:id`                     | GET, PATCH, DELETE | Detalle / edita / **hard delete (solo Superadmin)**                                         | Sesión + finca                 | `src/pages/api/fincas/[id].ts`                      |
| `/api/fincas/:id/archivo`             | POST               | Archiva/restaura la finca (dueño/staff)                                                     | Sesión + dueño                 | `src/pages/api/fincas/[id]/archivo.ts`              |
| `/api/fincas/:id/miembros`            | GET, DELETE        | Lista/expulsa miembros                                                                      | Sesión + dueño                 | `src/pages/api/fincas/[id]/miembros.ts`             |
| `/api/fincas/:id/invitaciones`        | GET, POST          | Lista/crea invitaciones                                                                     | Sesión + dueño                 | `src/pages/api/fincas/[id]/invitaciones.ts`         |
| `/api/fincas/:id/invitaciones/:invId` | DELETE             | Revoca una invitación                                                                       | Sesión + dueño                 | `src/pages/api/fincas/[id]/invitaciones/[invId].ts` |
| `/api/fincas/:id/lecturas`            | GET, POST          | Lee/registra lecturas de la finca                                                           | Sesión + miembro/staff         | `src/pages/api/fincas/[id]/lecturas.ts`             |
| `/api/fincas/salir`                   | POST               | Abandona una finca (no siendo dueño)                                                        | Sesión + miembro               | `src/pages/api/fincas/salir.ts`                     |
| `/api/finca/activa`                   | GET, POST          | Lee/fija la finca activa (cookie `finca_activa`)                                            | Sesión                         | `src/pages/api/finca/activa.ts`                     |
| `/api/invitaciones/usar`              | POST               | Canjea un código (rate-limited)                                                             | Sesión                         | `src/pages/api/invitaciones/usar.ts`                |
| `/api/invitaciones/peek`              | GET                | Vista previa de un código                                                                   | Sesión                         | `src/pages/api/invitaciones/peek.ts`                |
| `/api/admin/users`                    | GET                | Lista/busca usuarios                                                                        | Solo Superadmin                | `src/pages/api/admin/users.ts`                      |
| `/api/admin/users/:id`                | PATCH, DELETE      | Cambia rol / elimina cuenta                                                                 | Solo Superadmin                | `src/pages/api/admin/users/[id].ts`                 |
| `/api/export-excel`                   | GET, POST          | Genera `.xlsx` (3 hojas) de la finca activa                                                 | Sesión + miembro/staff         | `src/pages/api/export-excel.ts`                     |
| `/api/sync-sheets`                    | POST               | `{ url }` de Google Sheets → CSV → persiste en `lecturas` de la finca activa                | Sesión + **dueño** de la finca | `src/pages/api/sync-sheets.ts`                      |
| `/api/siata`                          | GET                | Proxy a SIATA (timeout 3 s)                                                                 | Sesión                         | `src/pages/api/siata.ts`                            |

> Todas las APIs de datos revalidan sesión + acceso a la finca dentro del handler (además del `401` del middleware). Ver [ENDPOINTS](./ENDPOINTS.md).

---

## Mapa de navegación

```
                          ┌───────────────────────┐
                          │   /  login/registro    │  (Welcome; ex /signin)
                          └───────────┬───────────┘
                                      │ sesión OK
                     ┌────────────────┴───────────────┐
                     ▼                                 ▼
        staff (Superadmin/Admin)              Agropecuario / Campesino
        sin finca elegida → /admin             con finca activa → /
                          │                         (Tablero matriz 4×5)
                          ▼
┌──────────────────────────────────────────────────────────────┐
│  Navbar staff: Panel| Tablero·Métricas/Historial si hay finca │
│  | Fincas | Config            (usuarios normales: Inicio +…) │
└─┬───────────┬──────────┬──────────┬───────────┬──────────────┘
  ▼           ▼          ▼          ▼           ▼
 /admin     /          /metrics   /historial  /fincas    /settings
 (Panel     (Tablero)  (Métricas) (Historial) (Mis fincas)(Perfil)
  fincas:    matriz     promedios  por fecha   crear/unir  tema
  Entrar/    4×5        modal      import/     invitaciones frecuencia
  archivar/             planta     export      miembros
  usuarios*)
* tabla de Usuarios y hard delete: solo Superadmin
```

## Rutas que NO existen (no las enlaces)

- ❌ `/dashboard` — la portada autenticada es `/`.
- ❌ `/3d-simulation`, `/admin/integrations` — mencionadas en versiones viejas de este doc; no existen archivos.
- ❌ `GET /api/metrics`, `GET /api/weather`, `GET /api/export/excel` — no implementados. Las lecturas por finca viven en `GET /api/fincas/:id/lecturas`.
