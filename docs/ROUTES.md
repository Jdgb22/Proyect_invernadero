# Rutas (Routes) de la Aplicación

## Rutas Públicas (Acceso sin autenticación)

### Route: /
**Archivo:** `src/pages/index.astro`
**Descripción:** Página de landing/login del sistema.
**Funcionalidades:**
- Formulario de inicio de sesión (email/contraseña)
- Opciones de inicio con Google y GitHub
- Enlace de recuperación de contraseña
- Llamada a Auth.js para autenticación

**Redirección:**
- Si el usuario ya tiene sesión activa → redirigir a `/dashboard`
- Si el usuario no tiene sesión → mostrar formulario de login

---

### Route: /auth/*
**Archivo:** `src/pages/api/auth/[...nextauth].ts`
**Descripción:** Rutas manejadas por Auth.js para proveedores de OAuth.
**Funcionalidades:**
- Login con Google
- Login con GitHub
- Callback de retorno después de autenticación
- Logout y invalidación de sesión

---

## Rutas Protegidas (Requieren autenticación)

### Route: /dashboard
**Archivo:** `src/pages/metrics.astro`
**Descripción:** Panel principal de dashboard con métricas en tiempo real.
**Elementos:**
- Cards de temperatura, humedad, luz, nivel de agua
- Gráficos históricos interactivos
- Botón de actualización manual
- Indicador de última actualización
- Enlace a simulación 3D

**Características técnicas:**
- Datos fetch cada 30 segundos via API `/api/metrics`
- Protegido por middleware de autenticación
- Auto-refresh en tiempo real

---

### Route: /historial
**Archivo:** `src/pages/historial.astro`
**Descripción:** Página para ver y exportar datos históricos del greenhouse.
**Elementos:**
- Selector de rango de fechas (calendar picker)
- Filtro por tipo de métrica (temperatura, humedad, luz)
- Tabla de datos con marca de tiempo
- Botones de exportación:
  - Exportar a Excel (.xlsx)
  - Exportar a CSV
- Últimas 24h / 7d / 30d quick select

**Flujos:**
- Usuario selecciona fechas → datos fetch de `/api/metrics` con parámetros
- Usuario hace clic en exportar → redirect a `/api/export/excel` con query params
- Vista de tabla responsive para desktop y móvil

---

### Route: /settings
**Archivo:** `src/pages/settings.astro`
**Descripción:** Configuración de usuario y parámetros del sistema.
**Secciones:**
- Perfil de usuario (nombre, email)
- Cambiar contraseña
- Umbrales de alerta (temperatura min/max, humedad min/max, luz)
- Configuración de notificaciones
- Integraciones (Google Sheets, SIATA)

**Validaciones:**
- Formato de email válido
- Umbrales: mínimo < máximo
- Longitud de contraseña mínima 8 caracteres

---

### Route: /3d-simulation
**Archivo:** `src/pages/3d-simulation.astro` (o componente embebido en dashboard)
**Descripción:** Simulación tridimensional del greenhouse con Three.js.
**Elementos visuales:**
- Modelo 3D del greenhouse
- Posicionamiento de sensores virtuales
- Visualización de datos en tiempo real en el modelo
- Controles de interacción:
  - Rotar vista (arrastre mouse)
  - Zoom (rueda mouse)
  - Clic en sensor → pop-up con datos

**Integración:**
- Recibe datos en tiempo real vía WebSocket o fetch API
- Renderiza sensores con colores según estado (verde=normal, rojo=alerta)

---

### Route: /admin/integrations
**Archivo:** `src/pages/admin/integrations.astro` (ruta administrativa)
**Descripción:** Panel de integraciones para usuarios con permisos de administrador.
**Funcionalidades:**
- Sincronización con Google Sheets
- Configuración de proveedor SIATA
- Tokens de API management
- Historial de sincronizaciones

**Endpoints utilizados:**
- `POST /api/sync-sheets`
- `GET /api/siata`

---

## Rutas de API (Endpoints)

| Ruta | Método | Descripción | Autenticación |
|------|--------|-------------|---------------|
| `/api/metrics` | GET | Lecturas actuales de sensores | Requerida |
| `/api/export/excel` | GET | Exportar datos a Excel | Requerida |
| `/api/siata` | GET | Datos climáticos SIATA | Opcional |
| `/api/sync-sheets` | POST | Sincronizar con Google Sheets | Requerida (Admin) |
| `/api/weather` | GET | Datos Open-Meteo | Opcional |
| `/api/auth/[...nextauth]` | GET/POST | Auth.js OAuth flows | Opcional |

## Resumen de Navegación

```
+----------------+     +----------------------+     +------------------+
|     /          |     |     /dashboard       |     |     /historial   |
|   (Login)      |     |   (Dashboard)        |     |   (Data Export)  |
+--------+-------+     +----------+-----------+     +--------+---------+
         |                       |                           |
         |                       |                           |
         +-----------+-----------+-------------------------+
                     |
              /auth/* (OAuth)
                     |
              /settings (Configuración usuario)
                     |
              /3d-simulation (3D View)
                     |
              /admin/integrations (Admin)
```