# User Stories

## Authenticated Users

### US-001: Iniciar sesión
- **Usuario:** Cualquier usuario registrado
- **Descripción:** El usuario puede iniciar sesión en la aplicación usando sus credenciales (email y contraseña) o proveedores de OAuth (Google, GitHub).
- **Condiciones previas:** El usuario debe haber creado una cuenta.
- **Flujo principal:**
  1. El usuario navega a la página de login.
  2. El usuario ingresa su email y contraseña.
  3. El sistema valida las credenciales.
  4. El usuario es redirigido al dashboard.
- **Resultado esperado:** Sesión activa y acceso al dashboard.

### US-002: Cerrar sesión
- **Usuario:** Usuario autenticado
- **Descripción:** El usuario puede cerrar sesión de la aplicación.
- **Flujo principal:**
  1. El usuario hace clic en el botón de "Cerrar sesión".
  2. El sistema invalida la sesión.
  3. El usuario es redirigido a la página de login.
- **Resultado esperado:** Sesión terminada, el usuario debe iniciar sesión nuevamente para acceder.

## Dashboard Users

### US-003: Ver panel de dashboard
- **Usuario:** Usuario autenticado
- **Descripción:** El usuario ve una visión general de los datos del greenhouse en tiempo real.
- **Elementos del dashboard:**
  - Lectura de temperatura y humedad en tiempo real.
  - Medición de luz solar actual.
  - Nivel de agua del sistema.
  - Estado del sistema (activo/inactivo).
- **Resultado esperado:** Panel actualizado cada 30 segundos.

### US-004: Ver gráficos históricos
- **Usuario:** Usuario autenticado
- **Descripción:** El usuario puede ver gráficos históricos de los datos del greenhouse.
- **Filtros disponibles:** Por fecha, tipo de métrica (temperatura, humedad, luz).
- **Resultado esperado:** Gráficos interactivos con datos históricos.

## 3D Simulation Users

### US-005: Visualizar simulación 3D
- **Usuario:** Usuario autenticado
- **Descripción:** El usuario visualiza la simulación 3D del greenhouse con sensores y plantas.
- **Interacciones:**
  - Rotar vista del greenhouse.
  - Zoom in/out.
  - Hacer clic en sensores para ver datos detallados.
- **Resultado esperado:** Renderizado fluido con Three.js.

### US-006: Configurar parámetros de simulación
- **Usuario:** Usuario con permisos de administrador
- **Descripción:** El usuario puede configurar parámetros de la simulación 3D.
- **Parámetros configurables:**
  - Brillo de luces artificiales.
  - Velocidad de crecimiento de plantas.
  - Posición de sensores.
- **Resultado esperado:** Configuración aplicada y reflejada en la simulación.

## Data Management Users

### US-007: Exportar datos a Excel
- **Usuario:** Usuario autenticado
- **Descripción:** El usuario puede exportar las mediciones a un archivo Excel.
- **Formato:** Archivo `Macollo_Mediciones_Invernadero_YYYY-MM-DD.xlsx` con 3 hojas (Mediciones de Hoy, Historial Completo, Rangos Agronómicos). Solo `.xlsx` (CSV no implementado).
- **Resultado esperado:** Archivo descargable vía `GET/POST /api/export-excel` (POST acepta `{ plants }` para filtrar).

### US-008: Ver historial de datos
- **Usuario:** Usuario autenticado
- **Descripción:** El usuario consulta el historial de lecturas pasadas.
- **Filtros:** Fecha específica (rango 2026-09-14 a 2026-09-30 según datos cargados).
- **Resultado esperado:** Lista de lecturas con marca de tiempo y valores.

### US-009: Recuperar contraseña
- **Usuario:** Cualquier usuario registrado (con email o celular)
- **Descripción:** El usuario restablece su contraseña con un código de 6 dígitos válido 15 minutos, enviado por email (SMTP) o SMS.
- **Flujo principal:**
  1. El usuario indica su email o celular (`POST /api/auth/forgot-password`).
  2. El sistema guarda el código en `verification_token` y lo envía (destino enmascarado en la respuesta).
  3. El usuario ingresa código + nueva contraseña (`POST /api/auth/reset-password`).
  4. El sistema actualiza el hash bcrypt e invalida el código.
- **Resultado esperado:** Contraseña actualizada y lista para login.

## Integration Users

### US-010: Integración con SIATA
- **Usuario:** Usuario con permisos de administrador
- **Descripción:** El usuario puede consultar datos climáticos externos del sistema SIATA para comparación.
- **Datos obtenidos:** Pronósticos climáticos, datos específicos de Medellín.
- **Resultado esperado:** Datos SIATA integrados en el dashboard junto con datos propios.

### US-011: Importación desde Google Sheets
- **Usuario:** Usuario con permisos de administrador
- **Descripción:** El usuario importa mediciones **desde** una hoja pública de Google Sheets (dirección Sheets → app; no se escribe en Sheets).
- **Mecanismo:** `POST /api/sync-sheets { url }` (convierte a CSV, parsea columnas y devuelve `records`; viven en memoria del navegador, no persisten en PG).
- **Resultado esperado:** Mediciones visibles en Dashboard/Métricas tras la importación.