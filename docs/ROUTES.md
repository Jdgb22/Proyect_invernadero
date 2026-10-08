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
- **Sin sesión** → renderiza `Welcome.astro` (landing con invitación a `/signin`).
- **Con sesión** → renderiza `Navbar` + `Dashboard.astro` (matriz 4×5 de plantas).

No hay landing separada del dashboard: la misma URL cambia según autenticación.

### Route: `/signin`
**Archivo:** `src/pages/signin.astro`
**Descripción:** Acceso y registro. Si ya hay sesión, redirige a `/`.
**Contenido:**
- Pestaña **Iniciar Sesión**: email (+ contraseña) → `signIn('credentials')` de Auth.js, o botón **Continuar con Google** (OAuth).
- Pestaña **Registrarse**: nombre + email + contraseña (mín. 8 en cliente) → `POST /api/auth/register`. **Toda cuenta nueva queda con rol `Campesino`** (el servidor ignora el selector de rol del formulario).
- Alertas de estado (`Verificando credenciales…`, `¡Cuenta creada…`) y spinner de carga.

---

## Rutas Protegidas (requieren sesión)

> Protección real: cada página verifica `getSession(Astro.request)` y muestra `Welcome` si no hay sesión.
> Nota: `src/middleware.ts` solo intercepta rutas que empiezan con `/dashboard` (ruta que **no existe** actualmente) y las redirige a `/`. La protección efectiva de `/metrics`, `/historial` y `/settings` la hace cada página con `getSession`. Ver [AUTH](./AUTH.md).

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
- **Conectar Google Sheets**: modal que pide URL pública → `POST /api/sync-sheets` (convierte a `export?format=csv`, parsea columnas `ID_planta, fecha, T_Ext_C, T_Int_C, humedad_Pct, T_Planta_C, Ph, ALtura_cm…`, devuelve `records` al cliente).
- **Exportar a Excel**: `GET/POST /api/export-excel` → descarga `Macollo_Mediciones_Invernadero_YYYY-MM-DD.xlsx` (hojas: *Mediciones de Hoy*, *Historial Completo*, *Rangos Agronómicos*).

### Route: `/settings`
**Archivo:** `src/pages/settings.astro` → componente `Settings.astro`
**Descripción:** Perfil y preferencias (lee sesión para nombre/email/avatar).
**Secciones (tabs laterales):**
- **Perfil de Usuario**: nombre editable, correo solo lectura, insignia de rol.
- **Preferencias del Sistema**: tema (Automático/Claro/Oscuro), frecuencia de sincronización IoT.
- **Notificaciones**: toasts/push de alertas (vía `sileo`).
- **Zona de Peligro**: acciones irreversibles con confirmación.

---

## Rutas de API

| Ruta | Método | Descripción | Auth | Implementación |
| :--- | :--- | :--- | :--- | :--- |
| `/api/auth/register` | POST | Crea usuario (bcrypt, rol fijo `Campesino`) | No | `src/pages/api/auth/register.ts` |
| `/api/auth/forgot-password` | POST | Genera código 6 dígitos (15 min) en `verification_token`, envía email/SMS | No | `src/pages/api/auth/forgot-password.ts` |
| `/api/auth/reset-password` | POST | Valida código y actualiza contraseña (bcrypt) | No | `src/pages/api/auth/reset-password.ts` |
| `/api/auth/*` | GET/POST | Flujos Auth.js: `signin`, `signout`, `callback`, `session` (Credentials + Google) | No | `auth-astro` + `auth.config.ts` |
| `/api/export-excel` | GET, POST | Genera `.xlsx` (ExcelJS, 3 hojas). POST acepta `{ plants }` opcional | No verificada en código* | `src/pages/api/export-excel.ts` |
| `/api/sync-sheets` | POST | `{ url }` de Google Sheets → CSV → `records: MetricRecord[]` (no persiste en PG) | No verificada en código* | `src/pages/api/sync-sheets.ts` |
| `/api/siata` | GET | Proxy a `http://siata.gov.co:8089/estacionesTemperatura/20` (timeout 3 s) | No | `src/pages/api/siata.ts` |

\* El frontend los llama desde páginas que ya exigen sesión, pero los handlers no verifican sesión internamente. Endurecer con `getSession` si se exponen. Ver [ENDPOINTS](./ENDPOINTS.md).

---

## Mapa de navegación

```
                     ┌─────────────┐
                     │   /signin   │  (login / registro / Google)
                     └──────┬──────┘
                            │ sesión OK
                            ▼
┌──────────────────────────────────────────────────┐
│  Navbar: Inicio | Métricas | Historial | Config  │
│  + Cerrar Sesión (desktop y menú móvil)          │
└──┬──────────────┬───────────────┬────────────────┘
   ▼              ▼               ▼
   /            /metrics       /historial      /settings
 (Dashboard)   (Métricas)      (Historial)     (Perfil/sistema)
 matriz 4×5    promedios       por fecha       tema, frecuencia
 modal planta  modal planta    import/export   notificaciones
```

## Rutas que NO existen (no las enlaces)

- ❌ `/dashboard` — solo aparece como prefijo en `middleware.ts`; no hay `src/pages/dashboard.astro`. La portada autenticada es `/`.
- ❌ `/3d-simulation`, `/admin/integrations` — mencionadas en versiones viejas de este doc; no existen archivos.
- ❌ `GET /api/metrics`, `GET /api/weather`, `GET /api/export/excel` — no implementados. Ver tabla real arriba.
