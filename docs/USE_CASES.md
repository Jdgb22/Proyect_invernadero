# Casos de Uso

## Sistema: Macollo - Monitoreo y Simulación de Greenhouse

### Caso de Uso: CU-001 - Autenticación de Usuario

**Actor(es):** Usuario final, Sistema de autenticación
**Descripción:** El usuario se autentica en el sistema para obtener acceso a las funcionalidades protegidas.

**Flujo básico (registro + login):**

1. Usuario navega a `/signin`, pestaña Registrarse
2. Usuario ingresa nombre, email/teléfono y contraseña (cliente exige ≥ 8; servidor ≥ 6)
3. `POST /api/auth/register` valida unicidad y guarda hash bcrypt; **toda cuenta nace con rol `Campesino`** (el selector de rol del formulario es informativo)
4. Usuario inicia sesión en la pestaña Iniciar Sesión (o con Google OAuth) y es redirigido a `/` (Dashboard)

**Flujo alternativo (OAuth):**

- Usuario usa proveedor Google/GitHub para iniciar sesión
- Sistema recibe token del proveedor y crea sesión local

**Post-conditions:**

- Sesión de usuario activa
- Token de autenticación generado
- Redirección al dashboard

---

### Caso de Uso: CU-002 - Monitoreo de Datos en Tiempo Real

**Actor(es):** Usuario autenticado, Sistema de sensores, APIs de clima
**Descripción:** El usuario visualiza el estado del invernadero: matriz de 20 plantas con su última medición + clima externo en vivo.

**Flujo básico (real):**

1. Usuario accede a `/` (Dashboard)
2. La matriz se renderiza en servidor desde el dataset (`metricsData.ts`, hoy vacío hasta importar/sincronizar Sheets)
3. El navegador pide geolocalización y consulta clima (Open-Meteo directo; SIATA pausado, ADR-007) y AQI, con **refresco cada 10 minutos**
4. El usuario importa datos desde `/historial` cuando hay nuevas tomas de campo

**Flujo de error:**

- Sin geolocalización → clima de Medellín por defecto (`Clima (Medellín)`)
- Sin mediciones → tarjetas en gris `Esperando datos` (`--`/`N/D`)

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

### Caso de Uso: CU-004 - Configuración de Umbrales de Alerta ⚠️ PROPUESTO (no implementado)

**Actor(es):** Usuario autenticado, Sistema de notificaciones
**Descripción:** El usuario establecerá los límites mínimos y máximos para las variables ambientales. **Estado real (oct-2026): Settings solo ofrece perfil, tema, frecuencia de sincronización y notificaciones; no hay UI ni persistencia de umbrales.** Se conserva como requisito futuro.

**Flujo básico (futuro):**

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
**Descripción:** El usuario exporta las mediciones a Excel. **Implementado solo `.xlsx`** (`GET/POST /api/export-excel`, 3 hojas: Mediciones de Hoy, Historial Completo, Rangos Agronómicos, archivo `Macollo_Mediciones_Invernadero_YYYY-MM-DD.xlsx`). CSV no implementado.

**Flujo básico:**

1. Usuario selecciona fecha en `/historial` (POST puede enviar `{ plants }` filtrado)
2. Usuario hace clic en "Exportar a Excel"
3. Sistema genera el `.xlsx` y lo descarga automáticamente

**Formatos compatibles:**

- Excel (.xlsx): Con encabezados, múltiples hojas por tipo de métrica
- CSV (.csv): Datos puros, compatible con Excel/Google Sheets

**Post-conditions:**

- Archivo generado y descargado
- Datos formateados según especificación

---

### Caso de Uso: CU-006 - Importación desde Google Sheets

**Actor(es):** Administrador, Sistema de integración
**Descripción:** El usuario **importa** mediciones **desde** una hoja pública de Google Sheets (dirección Sheets → app; no se escribe en Sheets). **Implementado:** `POST /api/sync-sheets { url }` normaliza a `export?format=csv`, parsea columnas (`ID_planta`, `fecha`, `T_Ext_C`, `T_Int_C`, `humedad_Pct`, `T_Planta_C`, `Ph`, `ALtura_cm`…), resuelve la matriz 4×5 y devuelve `records` al cliente **sin persistir en PG** (viven en memoria del navegador). Sin programación por intervalo.

**Flujo básico:**

1. Usuario accede a `/historial` → "Conectar Google Sheets"
2. Usuario pega la URL pública (documento con lectura _"Cualquier persona con el enlace"_ o _"Publicado en la web como CSV"_)
3. Sistema descarga el CSV, valida fechas/IDs (incluye regla 29/30-sep sin temp. de suelo) y muestra conteo importado
4. Dashboard/Métricas se actualizan en memoria; opcionalmente se exporta a Excel

**Post-conditions:**

- Datos transferidos a Google Sheets
- Configuración de intervalo guardada
- Historial de sincronizaciones registrado

---

### Caso de Uso: CU-007 - Recuperación de Contraseña

**Actor(es):** Usuario registrado, Sistema de email/SMS
**Descripción:** El usuario restablece su contraseña con un **código de 6 dígitos válido 15 minutos** (email vía SMTP o SMS). Implementado en `POST /api/auth/forgot-password` + `POST /api/auth/reset-password` con tabla `verification_token`.

**Flujo básico:**

1. Usuario indica su email o celular registrado
2. Sistema genera el código, invalida anteriores y lo envía (respuesta con destino enmascarado, ej. `ju***@correo.com`)
3. Usuario ingresa código + nueva contraseña (mín. 6 en servidor)
4. Sistema verifica `token + expires > NOW()`, actualiza hash bcrypt e invalida el token

**Post-conditions:**

- Contraseña actualizada
- Usuario puede iniciar sesión con nueva contraseña
- Token de recuperación invalidado
