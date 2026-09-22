# Casos de Uso

## Sistema: AquaSens - Monitoreo y Simulación de Greenhouse

### Caso de Uso: CU-001 - Autenticación de Usuario
**Actor(es):** Usuario final, Sistema de autenticación
**Descripción:** El usuario se autentica en el sistema para obtener acceso a las funcionalidades protegidas.

**Flujo básico:**
1. Usuario navega a la página de login
2. Usuario ingresa credenciales (email/contraseña)
3. Sistema valida credenciales contra la base de datos
4. Si son válidas, se crea una sesión y se redirige al usuario al dashboard
5. Si son inválidas, se muestra mensaje de error

**Flujo alternativo (OAuth):**
- Usuario usa proveedor Google/GitHub para iniciar sesión
- Sistema recibe token del proveedor y crea sesión local

**Post-conditions:**
- Sesión de usuario activa
- Token de autenticación generado
- Redirección al dashboard

---

### Caso de Uso: CU-002 - Monitoreo de Datos en Tiempo Real
**Actor(es):** Usuario autenticado, Sistema de sensores
**Descripción:** El usuario visualiza los datos actuales del greenhouse provenientes de sensores IoT.

**Flujo básico:**
1. Usuario accede al dashboard
2. Sistema inicia conexión con backend para obtener datos en tiempo real
3. Backend consulta PostgreSQL por lecturas recientes
4. Datos se envían al frontend y se visualizan en tarjetas métricas
5. Cada 30 segundos, el sistema actualiza automáticamente los datos

**Flujo de error:**
- Si la conexión falla, se muestra estado "Última actualización: HH:MM"
- Si no hay datos, se muestra mensaje "Sin datos disponibles"

**Post-conditions:**
- Datos actualizados en pantalla
- Indicador de última actualización visible

---

### Caso de Uso: CU-003 - Visualización 3D
**Actor(es):** Usuario autenticado, Motor de renderizado (Three.js)
**Descripción:** El usuario visualiza la representación tridimensional del greenhouse con sus elementos.

**Flujo básico:**
1. Usuario navega a la página con la simulación 3D
2. Se carga el modelo 3D del greenhouse
3. Se posicionan los sensores virtuales en el modelo
4. Usuario puede interactuar (rotar, hacer zoom, clicar sensores)
5. Al hacer clic en un sensor, se muestra información detallada

**Interacciones:**
- Rotar vista con arrastre del mouse
- Zoom con rueda del mouse
- Clic en sensor → mostrar pop-up con datos en tiempo real

**Post-conditions:**
- Modelo 3D renderizado y interactivo
- Datos del sensor seleccionado mostrados

---

### Caso de Uso: CU-004 - Configuración de Umbrales de Alerta
**Actor(es):** Usuario autenticado, Sistema de notificaciones
**Descripción:** El usuario establece los límites mínimos y máximos para las variables ambientales.

**Flujo básico:**
1. Usuario accede a la sección de configuración
2. Usuario ingresa valores mínimos y máximos para:
   - Temperatura (°C)
   - Humedad relativa (%)
   - Nivel de luz (lux)
   - Nivel de agua
3. Usuario guarda la configuración
4. El sistema valida que los mínimos sean menores a los máximos
5. Las alertas se activan cuando los datos superan/estan por debajo de los umbrales

**Validaciones:**
- Temperatura: -10°C a 50°C
- Humedad: 0% a 100%
- Luz: 0 a 100,000 lux

**Post-conditions:**
- Umbrales guardados en base de datos
- Sistema empieza a monitorear y generar alertas

---

### Caso de Uso: CU-005 - Exportación de Datos
**Actor(es):** Usuario autenticado, Motor de exportación (ExcelJS)
**Descripción:** El usuario exporta los datos históricos a un formato de archivo compatible.

**Flujo básico:**
1. Usuario selecciona el rango de fechas y tipo de dato
2. Usuario hace clic en "Exportar"
3. Sistema genera archivo según formato seleccionado (Excel/CSV)
4. Archivo se descarga automáticamente al dispositivo del usuario

**Formatos compatibles:**
- Excel (.xlsx): Con encabezados, múltiples hojas por tipo de métrica
- CSV (.csv): Datos puros, compatible con Excel/Google Sheets

**Post-conditions:**
- Archivo generado y descargado
- Datos formateados según especificación

---

### Caso de Uso: CU-006 - Sincronización con Google Sheets
**Actor(es):** Administrador, Sistema de integración
**Descripción:** El usuario sincroniza los datos del greenhouse con una hoja de cálculo de Google Sheets.

**Flujo básico:**
1. Usuario accede a la página de sincronización
2. Usuario ingresa el ID de la hoja de Google Sheets y credenciales de servicio
3. Usuario configura el intervalo de sincronización ( cada 5min, 15min, 1h, manual)
4. Usuario inicia la sincronización
5. Sistema lee los datos actuales de PostgreSQL
6. Sistema escribe los datos en la hoja de Google Sheets especificada
7. Confirmación de éxito o fallo

**Post-conditions:**
- Datos transferidos a Google Sheets
- Configuración de intervalo guardada
- Historial de sincronizaciones registrado

---

### Caso de Uso: CU-007 - Recuperación de Contraseña
**Actor(es):** Usuario registrado, Sistema de email
**Descripción:** El usuario solicita el restablecimiento de su contraseña cuando la ha olvidado.

**Flujo básico:**
1. Usuario hace clic en "¿Olvidaste tu contraseña?" en la página de login
2. Usuario ingresa su dirección de email registrada
3. Sistema verifica que el email existe en la base de datos
4. Sistema genera un token de recuperación único (válido 24h)
5. Sistema envía email con enlace de restablecimiento
6. Usuario hace clic en el enlace y es redirigido a página de nueva contraseña
7. Usuario ingresa y confirma la nueva contraseña
8. Sistema actualiza la contraseña y cierra sesión activa

**Post-conditions:**
- Contraseña actualizada
- Usuario puede iniciar sesión con nueva contraseña
- Token de recuperación invalidado