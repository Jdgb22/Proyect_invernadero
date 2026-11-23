> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-11**.

# Rutas de página (Routes) de Macollo

## 1. Alcance y mecanismo de enrutamiento

Macollo utiliza **enrutamiento basado en archivos de Astro**: cada archivo `*.astro` bajo `src/pages/` constituye una ruta de página SSR. La configuración efectiva reside en `astro.config.mjs` (`output: "server"`, adaptador `@astrojs/vercel`, integraciones `auth()` y `react()`, `security.checkOrigin: true`). La capa transversal de autenticación, limitación de tasa y cabeceras de seguridad reside en `src/middleware.ts`; la configuración de Auth.js (proveedores `Credentials` y `Google`, sesión JWT, `pages.signIn: "/"`) reside en `auth.config.ts`.

La protección real de una ruta es **estratificada**:

1. **Middleware** (`src/middleware.ts`): exige sesión para las páginas de `PROTECTED_PAGES` y para los prefijos de API de `PROTECTED_API_PREFIXES`; en páginas redirige a `/?desde=…` y en APIs responde `401 { "message": "No autenticado." }`.
2. **Página o manejador**: revalida la sesión y los permisos específicos (`getAuthUser`, `getFincaAccess`, `canManageSystem`, `resolveActiveFinca`), conforme al modelo _Zero Trust_ documentado en `src/backend/services/authz.ts`.

> Nota de precisión: `PROTECTED_PAGES` incluye `/gallery` (y por prefijo `/gallery/[id]`). Versiones anteriores de este documento omitían ese hecho.

---

## 2. Tabla maestra de rutas de página

| #   | Ruta             | Archivo de implementación       | Método    | Protección efectiva                     | Comportamiento y redirecciones                                                                                                                                                                                                                                                      | Documento relacionado                                                         |
| :-- | :--------------- | :------------------------------ | :-------- | :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| 1   | `/`              | `src/pages/index.astro`         | GET (SSR) | Pública, con ramas por sesión/rol       | Sin sesión renderiza `Welcome.astro`; con sesión y rol `Superadmin`/`Admin` sin cookie `finca_activa` válida redirige a `/admin`; con finca activa renderiza `Navbar` + `Dashboard.astro` + `TripsDiagnosticModal.astro`; sin finca renderiza `NoFarm.astro`.                       | [AUTH](./AUTH.md), [COMPONENTS](./COMPONENTS.md)                              |
| 2   | `/signin`        | `src/pages/signin.astro`        | GET (SSR) | Pública (**alias retrocompatible**)     | No renderiza contenido: sin sesión redirige a `/` conservando `?desde=` y `?code=`; con sesión redirige a `desde` (o `/`). La página real de acceso es `/` (`Welcome.astro`, configurada como `pages.signIn` en `auth.config.ts`).                                                  | [AUTH](./AUTH.md)                                                             |
| 3   | `/metrics`       | `src/pages/metrics.astro`       | GET (SSR) | Middleware + sesión + finca activa      | Tras `getAuthUser` y `listFincasForUser`, si no existe ninguna finca activa redirige a `/farms`. Renderiza `Metrics.astro` con nombre y rótulo de rol (`src/shared/roles.ts`).                                                                                                      | [DATA-DICTIONARY](./DATA-DICTIONARY.md)                                       |
| 4   | `/history`       | `src/pages/history.astro`       | GET (SSR) | Middleware + sesión + finca activa      | Misma comprobación que `/metrics`: sin finca activa redirige a `/farms`. Renderiza `History.astro` ( selectors de fecha, importación/sincronización y exportación).                                                                                                                 | [FIELD-PROTOCOL](./FIELD-PROTOCOL.md)                                         |
| 5   | `/settings`      | `src/pages/settings.astro`      | GET (SSR) | Middleware + sesión                     | Renderiza `Settings.astro` (perfil, preferencias, notificaciones, mis fincas). El complemento de la ruta es `PATCH /api/users/me` y `POST /api/notifications/weekly-summary`.                                                                                                       | [AUTH](./AUTH.md)                                                             |
| 6   | `/farms`         | `src/pages/farms/index.astro`   | GET (SSR) | Middleware + sesión                     | Sin usuario redirige a `/`. Lista `listFincasForUser`; oculta el formulario de creación a `Campesino`; consume `POST /api/farms`, `POST /api/farms/active` y `POST /api/invitations/use`.                                                                                           | [ENDPOINTS](./ENDPOINTS.md)                                                   |
| 7   | `/farms/[id]`    | `src/pages/farms/[id].astro`    | GET (SSR) | Middleware + sesión + acceso a la finca | Valida `id` entero positivo y `getFincaAccess(...) !== "none"`; en caso contrario redirige a `/farms`. Muestra gestión (datos, invitaciones, miembros, archivo, borrado) solo si `canManageFinca`; el borrado definitivo exige `canHardDeleteFinca` (Superadmin).                   | [AUTH](./AUTH.md)                                                             |
| 8   | `/gallery`       | `src/pages/gallery/index.astro` | GET (SSR) | Middleware + sesión                     | `export const prerender = false`. Renderiza `Gallery.astro`, que consulta `photos` filtrando por `finca_id = finca_activa` (galería compartida por los miembros de la finca, no por autor).                                                                                         | [ENDPOINTS](./ENDPOINTS.md)                                                   |
| 9   | `/gallery/[id]`  | `src/pages/gallery/[id].astro`  | GET (SSR) | Middleware + sesión                     | `export const prerender = false`. `GalleryDetail.astro` valida que `photos.finca_id` coincida con la finca activa; si no, redirige a `/gallery`. La imagen se sirve mediante `GET /api/gallery/:id/file`.                                                                           | [ENDPOINTS](./ENDPOINTS.md)                                                   |
| 10  | `/invite/[code]` | `src/pages/invite/[code].astro` | GET (SSR) | Pública                                 | Normaliza el código a mayúsculas y usa `peekInvitacion` (`src/backend/services/farms.ts`). Sin sesión ofrece `/?desde=/invite/CODE`; con sesión permite confirmar mediante `POST /api/invitations/use`. Código inválido/expirado/agotado muestra un mensaje de error sin redirigir. | [AUTH](./AUTH.md)                                                             |
| 11  | `/admin`         | `src/pages/admin.astro`         | GET (SSR) | Middleware + sesión + **staff**         | `getAuthUser` y comprobación `Superadmin`/`Admin`; cualquier otro rol redirige a `/`. Lista todas las fincas (`soloActivas: false`). Solo Superadmin ve la tabla de usuarios, el cambio de roles, la eliminación de cuentas y «Eliminar finca» (hard delete).                       | [AUTH](./AUTH.md), [DATABASE](./DATABASE.md)                                  |
| 12  | `/landing`       | `src/pages/landing.astro`       | GET (SSR) | Pública                                 | Se sirve directamente en `/landing` en cualquier host, incluido `localhost:4321`. No hay lógica de host ni redirecciones en el middleware. Canonical derivado de la petición y CTA a `/`. No usa `Layout.astro` ni sesión.                                                          | [LANDING](./LANDING.md), [ADR-008](./decisions/ADR-008-landing-subdominio.md) |

**Total de rutas de página: 12** (11 rutas estáticas/dinámicas propias más el alias `/signin`; de ellas, 8 están protegidas por middleware y 4 son públicas: `/`, `/signin`, `/invite/[code]` y `/landing`). `/landing` es accesible en cualquier host; su publicación en un dominio/subdominio definitivo está pendiente de decisión.

---

## 3. Fichas de comportamiento de las rutas de página

### 3.1 `/` — entrada única

**Archivo:** `src/pages/index.astro`. Resuelve `getSession`, `resolveActiveFinca` y `getFincaCookie` en el servidor.

| Estado                           | Resultado                                                                                                  |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| Sin sesión                       | `Welcome.astro`: pestañas de inicio de sesión (Credentials/Google) y registro (`POST /api/auth/register`). |
| Staff sin cookie de finca válida | `Astro.redirect("/admin")`. Es el «Inicio» operativo de Superadmin/Admin.                                  |
| Sesión con finca activa          | `Navbar` + `Dashboard.astro` (matriz 4×5 `t0–t3` × `Col 1–Col 5`) + modal de diagnóstico de trips.         |
| Sesión sin finca activa          | `NoFarm.astro`, con acceso a `/farms`.                                                                     |

No existe una portada autenticada separada: `/` cambia de contenido según sesión y rol. Tras el inicio de sesión se respeta el parámetro `?desde=` (por ejemplo, `/?desde=/invite/K7M4XP9Q`).

### 3.2 `/signin` — alias retrocompatible

**Archivo:** `src/pages/signin.astro`. No contiene UI; únicamente normaliza `code` y `desde` y redirige. Se conserva para enlaces antiguos e invitaciones. **Sí existe**, contrariamente a documentaciones anteriores que lo daban por eliminado. La página de Auth.js es `/` (`pages.signIn: "/"` en `auth.config.ts`).

### 3.3 `/metrics` y `/history`

**Archivos:** `src/pages/metrics.astro`, `src/pages/history.astro`. Ambos delegan en `src/frontend/components/Metrics.astro` y `src/frontend/components/History.astro` respectivamente. Su restricción adicional no es de rol, sino de contexto: si `listFincasForUser(...).filter(f => f.activa)` está vacío, redirigen a `/farms`. En `/history`, la conexión de Google Sheets se resuelve con `GET/POST /api/sync-sheets` y la exportación con `GET/POST /api/export-excel`; el componente también registra lecturas vía `POST /api/farms/:id/readings`.

### 3.4 `/settings`

**Archivo:** `src/pages/settings.astro` → `src/frontend/components/Settings.astro`. Las mutaciones reales no ocurren en la página sino en `PATCH /api/users/me` (nombre y avatar) y `POST /api/notifications/weekly-summary` (envío inmediato del resumen). Las preferencias de tema/notificaciones se gestionan en cliente; la exportación histórica enlaza con `GET /api/export-csv`.

### 3.5 `/farms` y `/farms/[id]`

**Archivos:** `src/pages/farms/index.astro`, `src/pages/farms/[id].astro`. `/farms` usa `getAuthUser` y `listFincasForUser`; `puedeCrear = user.role !== "Campesino"`. El detalle de finca usa `getFincaAccess`, `canManageFinca` y `canHardDeleteFinca` de `src/backend/services/authz.ts`, y los servicios `getFincaById`, `listMembers`, `listInvitaciones` y `listPlantas` de `src/backend/services/farms.ts`.

### 3.6 `/gallery` y `/gallery/[id]`

**Archivos:** `src/pages/gallery/index.astro`, `src/pages/gallery/[id].astro` → `src/frontend/components/Gallery.astro`, `GalleryDetail.astro`. La **página** filtra por finca activa; el endpoint `GET /api/gallery/:id/file` (en `src/pages/api/gallery/[id]/file.ts`) solo exige sesión y **no** repite ese filtro. Véase la corrección registrada en [ENDPOINTS](./ENDPOINTS.md#galería).

### 3.7 `/invite/[code]`

**Archivo:** `src/pages/invite/[code].astro`. Usa directamente el servicio `peekInvitacion` en SSR (no el endpoint `GET /api/invitations/peek`, aunque ambos comparten la misma lógica). El canje se realiza desde el cliente con `POST /api/invitations/use`, que fija la cookie `finca_activa` y aplica límite de tasa.

### 3.8 `/admin`

**Archivo:** `src/pages/admin.astro`. `canManageSystem` equivale a `role === "Superadmin"`; `esStaff` incluye también `Admin`. Las acciones de la página llaman a `GET /api/admin/users`, `PATCH/DELETE /api/admin/users/:id`, `POST /api/farms/active`, `POST /api/farms/:id/archive` y `DELETE /api/farms/:id`.

---

## 4. Mapa de protección de páginas

| Ruta             | Protegida por `src/middleware.ts`    | Revalidación en página                                                     | Sin sesión                           | Sin permisos de finca/rol                                            |
| :--------------- | :----------------------------------- | :------------------------------------------------------------------------- | :----------------------------------- | :------------------------------------------------------------------- |
| `/`              | No                                   | `getSession` + `resolveActiveFinca`                                        | `Welcome.astro`                      | Staff sin finca → `/admin`; usuario sin finca → `NoFarm`             |
| `/signin`        | No                                   | `getSession`                                                               | Redirección a `/`                    | Redirección a `desde` o `/`                                          |
| `/metrics`       | Sí                                   | `getAuthUser` + `listFincasForUser`                                        | `302` a `/?desde=%2Fmetrics`         | Sin finca activa → `/farms`                                          |
| `/history`       | Sí                                   | `getAuthUser` + `listFincasForUser`                                        | `302` a `/?desde=%2Fhistory`         | Sin finca activa → `/farms`                                          |
| `/settings`      | Sí                                   | `getSession`                                                               | `302` a `/?desde=%2Fsettings`        | —                                                                    |
| `/farms`         | Sí                                   | `getAuthUser` + `listFincasForUser`                                        | `302` a `/?desde=%2Ffarms`           | Campesino: sin formulario de creación                                |
| `/farms/[id]`    | Sí                                   | `getAuthUser` + `getFincaAccess` + `canManageFinca` + `canHardDeleteFinca` | `302` a `/?desde=%2Ffarms%2F…`       | `access === "none"` → `/farms`; vista simple si `miembro`            |
| `/gallery`       | Sí (`/gallery` en `PROTECTED_PAGES`) | Componente filtra por finca activa                                         | `302` a `/?desde=%2Fgallery`         | Solo fotos de la finca activa                                        |
| `/gallery/[id]`  | Sí (prefijo `/gallery/`)             | `GalleryDetail.astro` valida `photos.finca_id`                             | `302` a `/?desde=%2Fgallery%2F…`     | Foto ajena → `/gallery`                                              |
| `/invite/[code]` | No                                   | `getAuthUser` + `peekInvitacion`                                           | Vista de invitación con CTA de login | Código inválido → mensaje en la propia página                        |
| `/admin`         | Sí                                   | `getAuthUser` + roles staff                                                | `302` a `/?desde=%2Fadmin`           | No staff → `/`; no Superadmin → sin tabla de usuarios ni hard delete |

---

## 5. Índice de APIs por dominio

La tabla maestra completa, con métodos, parámetros, cuerpos, respuestas y autorización, se encuentra en [ENDPOINTS](./ENDPOINTS.md). Resumen de superficie:

| Dominio                                            | Rutas                                                                                                                                                                 | Métodos                  | Implementación                                                                                               | Detalle                                                                    |
| :------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :----------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| Autenticación y cuenta                             | `/api/auth/register`, `/api/auth/check-availability`, `/api/auth/forgot-password`, `/api/auth/reset-password`, `/api/auth/*`                                          | POST; GET/POST (Auth.js) | `src/pages/api/auth/*.ts`; `auth.config.ts`; `astro.config.mjs`                                              | Público; tres endpoints con límite de tasa                                 |
| Fincas, miembros, lecturas e invitaciones de finca | `/api/farms`, `/api/farms/:id`, `/api/farms/active`, `/api/farms/leave`, `/api/farms/:id/{archive,members,readings,invitations}`, `/api/farms/:id/invitations/:invId` | GET, POST, PATCH, DELETE | `src/pages/api/farms/**`                                                                                     | Sesión; permisos por `getFincaAccess`                                      |
| Alias retrocompatible                              | `/api/farm/active`                                                                                                                                                    | GET, POST                | `src/pages/api/farm/active.ts`                                                                               | Reexporta los manejadores de `/api/farms/active`                           |
| Invitaciones globales                              | `/api/invitations/peek`, `/api/invitations/use`                                                                                                                       | GET, POST                | `src/pages/api/invitations/*.ts`                                                                             | Sesión; `use` con límite de tasa                                           |
| Administración, perfil y notificaciones            | `/api/admin/users`, `/api/admin/users/:id`, `/api/users/me`, `/api/notifications/weekly-summary`                                                                      | GET, PATCH, DELETE, POST | `src/pages/api/admin/users/**`, `src/pages/api/users/me.ts`, `src/pages/api/notifications/weekly-summary.ts` | Superadmin / sesión / miembro según caso                                   |
| Datos, hojas y exportación                         | `/api/sync-sheets`, `/api/export-excel`, `/api/export-csv`                                                                                                            | GET, POST                | `src/pages/api/sync-sheets.ts`, `export-excel.ts`, `export-csv.ts`                                           | Finca activa; `sync-sheets` permite también miembros                       |
| Integraciones climáticas                           | `/api/weather`, `/api/aqi`, `/api/siata`                                                                                                                              | GET                      | `src/pages/api/weather.ts`, `aqi.ts`, `siata.ts`                                                             | `weather`/`aqi` efectivamente públicos; `siata` exige sesión en el handler |
| Galería                                            | `/api/gallery/upload`, `/api/gallery/:id/file`                                                                                                                        | POST, GET                | `src/pages/api/gallery/**`                                                                                   | Sesión; el endpoint de archivo no filtra por finca                         |
| Diagnóstico Trips                                  | `/api/trips-diagnosis`                                                                                                                                                | GET, POST                | `src/pages/api/trips-diagnosis.ts`                                                                           | Público; proxy hacia `macollo-trips-api`                                   |

---

## 6. Alias retrocompatibles y rutas inexistentes

### 6.1 Alias que **sí existen** y deben conservarse

| Ruta               | Archivo                        | Observación                                                                                        |
| :----------------- | :----------------------------- | :------------------------------------------------------------------------------------------------- |
| `/signin`          | `src/pages/signin.astro`       | Redirección a `/` conservando `desde` y `code`.                                                    |
| `/api/farm/active` | `src/pages/api/farm/active.ts` | Reexporta `GET` y `POST` de `src/pages/api/farms/active.ts`; comparte middleware y comportamiento. |

### 6.2 Rutas que **no existen** (no enlazar)

| Ruta inexistente                                               | Situación real                                                                                                       |
| :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `/dashboard`                                                   | La portada autenticada es `/`; para staff, `/admin`.                                                                 |
| `/login`, `/register`                                          | El acceso y el registro están en `/` (`Welcome.astro`); `/signin` es solo alias.                                     |
| `/3d-simulation`, `/admin/integrations`                        | Mencionadas en documentación antigua; no hay archivos bajo `src/pages/`.                                             |
| `/api/metrics`                                                 | No existe; las lecturas se obtienen con `GET /api/farms/:id/readings`.                                               |
| `/api/export/excel`, `/api/export/csv`                         | No existen (con guion medio sí: `/api/export-excel`, `/api/export-csv`).                                             |
| `/api/farms/:id/plantas`, `/api/plants`                        | No existen; las plantas se listan en el servidor de la página `/farms/[id]` (`listPlantas`).                         |
| `/api/gallery` (colección), `/api/users`, `/api/notifications` | No existen como colecciones; solo las rutas individuales documentadas.                                               |
| `/api/predict`, `/api/health`, `/api/warmup`                   | Pertenecen al servicio externo `macollo-trips-api`, no a este repositorio; el proxy local es `/api/trips-diagnosis`. |
| `/api/sheets`, `/api/weather/aqi`                              | No implementados.                                                                                                    |

No hay métodos `PUT` en la API: las actualizaciones usan `PATCH` o `POST` según el endpoint.

---

## 7. Mapa de navegación (corregido)

```
                       ┌──────────────────────────┐
                       │  /  (Welcome; ex /signin)│  pública
                       └────────────┬─────────────┘
                                    │ sesión OK
              ┌─────────────────────┴──────────────────────┐
              ▼                                            ▼
   staff sin finca elegida → /admin          Agropecuario / Campesino
              │                              con finca activa → / (tablero)
              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Navbar: Inicio · Métricas · Historial · Galería · Mis Fincas · Config   │
│ Staff añade Panel (/admin). Los enlaces a Métricas/Historial/Galería    │
│ pueden derivar en /farms si no hay finca activa.                        │
└──┬──────────┬───────────┬───────────┬───────────┬───────────┬───────────┘
   ▼          ▼           ▼           ▼           ▼           ▼
 /admin      /metrics   /history    /gallery    /farms      /settings
 (solo      (matriz     (fechas,   (fotos de   (crear,     (perfil,
  staff)     4×5)       Sheets,     la finca)   unir,       tema,
                        exportar)               activar)    resumen)
        │
        └── /invite/[code] (pública) → POST /api/invitations/use → /farms
```

---

## Trazabilidad

| Ruta             | Archivo                         | Método | Autorización                             | Doc relacionado                         | Verificación curl                                      |
| :--------------- | :------------------------------ | :----- | :--------------------------------------- | :-------------------------------------- | :----------------------------------------------------- |
| `/`              | `src/pages/index.astro`         | GET    | Pública / sesión / staff                 | [AUTH](./AUTH.md)                       | `curl -i http://localhost:4321/`                       |
| `/signin`        | `src/pages/signin.astro`        | GET    | Pública (alias)                          | [AUTH](./AUTH.md)                       | `curl -i 'http://localhost:4321/signin?code=K7M4XP9Q'` |
| `/metrics`       | `src/pages/metrics.astro`       | GET    | Sesión + finca activa                    | [DATA-DICTIONARY](./DATA-DICTIONARY.md) | `curl -i -L http://localhost:4321/metrics`             |
| `/history`       | `src/pages/history.astro`       | GET    | Sesión + finca activa                    | [FIELD-PROTOCOL](./FIELD-PROTOCOL.md)   | `curl -i -L http://localhost:4321/history`             |
| `/settings`      | `src/pages/settings.astro`      | GET    | Sesión                                   | [AUTH](./AUTH.md)                       | `curl -i -L http://localhost:4321/settings`            |
| `/farms`         | `src/pages/farms/index.astro`   | GET    | Sesión                                   | [ENDPOINTS](./ENDPOINTS.md)             | `curl -i -L http://localhost:4321/farms`               |
| `/farms/[id]`    | `src/pages/farms/[id].astro`    | GET    | Sesión + miembro/dueño/staff             | [AUTH](./AUTH.md)                       | `curl -i -L http://localhost:4321/farms/1`             |
| `/gallery`       | `src/pages/gallery/index.astro` | GET    | Sesión                                   | [ENDPOINTS](./ENDPOINTS.md)             | `curl -i -L http://localhost:4321/gallery`             |
| `/gallery/[id]`  | `src/pages/gallery/[id].astro`  | GET    | Sesión + foto de la finca activa         | [ENDPOINTS](./ENDPOINTS.md)             | `curl -i -L http://localhost:4321/gallery/1`           |
| `/invite/[code]` | `src/pages/invite/[code].astro` | GET    | Pública                                  | [AUTH](./AUTH.md)                       | `curl -i http://localhost:4321/invite/K7M4XP9Q`        |
| `/admin`         | `src/pages/admin.astro`         | GET    | Staff; tabla de usuarios solo Superadmin | [AUTH](./AUTH.md)                       | `curl -i -L http://localhost:4321/admin`               |
| `/landing`       | `src/pages/landing.astro`       | GET    | Pública                                  | [LANDING](./LANDING.md)                 | `curl -i http://localhost:4321/landing`                |
