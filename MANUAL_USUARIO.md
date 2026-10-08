# 📖 Manual de Usuario - Proyecto Invernadero (Macollo)

¡Bienvenido a **Macollo / Proyecto Invernadero**! Plataforma web para el **monitoreo agronómico de un invernadero real**: 20 plantas organizadas en matriz (4 filas × 5 columnas), métricas de suelo y ambiente, historial por fecha e integración con clima externo (SIATA / Open-Meteo) y Google Sheets.

> **Rutas principales:** `Inicio (/ Sein)` · `Métricas (/metrics)` · `Historial (/historial)` · `Configuración (/settings)` · Acceso en `/signin`.

---

## Índice

1. [Roles de usuario](#1-roles-de-usuario)
2. [Acceso al sistema](#2-acceso-al-sistema)
3. [Navegación general](#3-navegación-general)
4. [Inicio - Dashboard principal](#4-inicio--dashboard-principal)
5. [Métricas agronómicas](#5-métricas-agronómicas)
6. [Historial cronológico](#6-historial-cronológico)
7. [Configuración](#7-configuración)
8. [Datos climáticos externos](#8-datos-climáticos-externos)
9. [Solución de problemas (FAQ)](#9-solución-de-problemas-faq)
10. [Glosario](#10-glosario)

---

## 1. Roles de usuario

Al registrarte eliges un rol (se guarda en la tabla `users` de PostgreSQL y viaja en la sesión JWT):

| Rol                         | Qué puede hacer                                                                                                                         |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Campesino** (por defecto) | Consultar dashboard, métricas e historial. Uso operativo de campo. **Toda cuenta nueva recibe este rol.**                               |
| **Agrónomo**                | Todo lo anterior + análisis de pH, sanidad y productividad por fila/planta. Se asigna por un administrador directo en la base de datos. |
| **Admin**                   | Todo lo anterior + sincronización con Google Sheets y gestión de integraciones.                                                         |
| **Super admin**             | Acceso total, incluyendo gestión de usuarios y parámetros críticos.                                                                     |

> ⚠️ **Nota importante:** aunque el formulario de registro muestra un selector de rol, el servidor actualmente asigna siempre `Campesino` por seguridad (`POST /api/auth/register`). Si necesitas otro rol, un administrador debe cambiarlo en la tabla `users` (`UPDATE users SET role='Agronomo' WHERE email='...'`).

Tu nombre y rol se muestran en el encabezado del Historial y Métricas como `Sesión activa: Nombre (Rol)`.

---

## 2. Acceso al sistema

### 2.1. Iniciar sesión (`/signin`)

1. Abre la página `/signin`. Verás la tarjeta **Bienvenido / Sistema de monitoreo ambiental** con dos pestañas.
2. En la pestaña **Iniciar Sesión** ingresa:
   - **Correo Electrónico** (ej. `ejemplo@correo.com`). También puedes usar tu nombre de usuario o teléfono registrado.
   - **Contraseña**.
3. Haz clic en **Iniciar Sesión**. Verás el mensaje `Verificando credenciales en PostgreSQL...` y luego `¡Sesión iniciada! Redirigiendo...`.
4. Serás llevado automáticamente a `/` (Dashboard).

**Alternativa con Google:** haz clic en **Continuar con Google** (debajo del divisor `o continúa con`). Se usa OAuth de Google y la cuenta se vincula automáticamente a tu correo.

### 2.2. Crear cuenta (pestaña Registrarse)

1. Cambia a la pestaña **Registrarse**.
2. Completa:
   - **Nombre completo** (ej. `Juan Pérez`).
   - **Correo Electrónico** (obligatorio, debe ser único).
   - **Contraseña** (mínimo **8 caracteres**; si no los cumple verás el error `La contraseña debe tener al menos 8 caracteres`).
   - **Rol en el sistema**: el desplegable es informativo; la cuenta se creará como `Campesino` (ver [Roles](#1-roles-de-usuario)).
3. Haz clic en **Crear Cuenta**. Verás `Registrando como "Rol" en PostgreSQL...`.
4. Si todo va bien: `¡Cuenta creada como "Rol"! Redirigiendo al login...` y el formulario vuelve solo a la pestaña de login con tu correo ya diligenciado. **Ahora inicia sesión normalmente** (el registro no inicia sesión automáticamente).

> Si el correo ya existe verás `Error al registrar el usuario` con el mensaje del servidor (ej. correo duplicado).

### 2.3. Recuperar contraseña

1. En el login busca la opción **¿Olvidaste tu contraseña?** (flujo `POST /api/auth/forgot-password`).
2. Ingresa tu correo registrado. El sistema genera un **código válido por ~15 minutos** y lo envía por correo (SMTP) y/o SMS según configuración.
3. Abre el enlace/código recibido e ingresa tu **nueva contraseña** (mínimo 8 caracteres) en la página de restablecimiento (`POST /api/auth/reset-password`).
4. Inicia sesión con tu nueva contraseña. El código queda invalidado automáticamente.

### 2.4. Cerrar sesión

Haz clic en **Cerrar Sesión** en la barra superior (versión escritorio) o en el menú hamburguesa → **Cerrar Sesión** (versión móvil). La sesión JWT se invalida y vuelves a la pantalla de bienvenida.

> Si intentas abrir una ruta privada sin sesión (`/dashboard`, etc.), el middleware te redirige forzosamente a `/`.

---

## 3. Navegación general

La **Navbar** (barra superior, logo `Macollo` 🍈) está presente en todas las páginas autenticadas:

- **Inicio** (`/`) — Dashboard con la matriz de cultivos.
- **Métricas** (`/metrics`) — Análisis agronómico detallado.
- **Historial** (`/historial`) — Consulta por fecha, importación y exportación.
- **Configuración** (`/settings`) — Perfil y preferencias.

Comportamiento:

- El enlace activo se resalta en verde.
- En móvil usa el botón **☰ (hamburguesa)** para desplegar el menú.
- La interfaz soporta **modo claro / oscuro / automático** (ver [Configuración](#7-configuración)). El modo oscuro es ideal para trabajo nocturno en campo.

---

## 4. Inicio — Dashboard principal (`/`)

Es lo primero que ves al iniciar sesión. Título: **Dashboard Principal / Monitoreo de cultivos reales y simulación ambiental**.

### 4.1. Matriz de cultivos (4 filas × 5 plantas = 20)

Cada tarjeta representa una planta con código como `T0-C1` (fila `t0..t3`, columna `Col 1..Col 5`) y su ID interno.

Semáforo de estado (leyenda superior):

| Color       | Estado              | Significado                                                 |
| :---------- | :------------------ | :---------------------------------------------------------- |
| 🟢 Lima     | **Óptimo**          | Sanidad `Excelente` / `Saludable`.                          |
| 🟡 Amarillo | **Atención**        | Sanidad `Vulnerable`. Requiere revisión.                    |
| 🔴 Rojo     | **Crítico**         | Sanidad `Crítica`. Acción inmediata (riego, pH, plaga).     |
| ⚪ Gris     | **Esperando datos** | Aún no hay medición cargada para esa planta (`--` / `N/D`). |

Cada tarjeta muestra de un vistazo:

- 💧 **Humedad** (ej. `65%`, o `35%` en crítico).
- 🌡️ **Temp. aire interna** (ej. `24.5°C`, o `N/D` si no hay sensor).

### 4.2. Ver detalle de una planta (modal)

**Haz clic en cualquier tarjeta** para abrir el modal de detalle con:

- Icono y estado (`🪴 Óptimo`, `🌿 Atención`, `🥀 Crítico`).
- **pH del suelo** (ej. `6.4`).
- **Temp. suelo** y **Temp. aire**.
- **Crecimiento / altura** (ej. `42 cm` o `78%`).
- **Productividad**: `Alta` / `Media` / `Baja`.
- **Sanidad**: `Excelente` / `Saludable` / `Vulnerable` / `Crítica`.

Cierra el modal con la **X**, clic fuera o tecla `Esc`.

### 4.3. Simulación 3D del invernadero

Debajo de la matriz verás el **modelo 3D** (Three.js): nave del invernadero sobre el terreno, con **ciclo sol/luna y sombras suaves** que siguen la hora real (día 6:00–18:00 con cielo y atardeceres, noche con luna azulada). De noche la escena se oscurece: es normal.

- **Rotar:** clic sostenido + arrastrar.
- **Zoom:** rueda del ratón (o pellizca en móvil).
- Si el canvas se ve negro al cargar, espera unos segundos o recarga la página.

### 4.4. Widget de clima y calidad del aire

Junto al 3D verás el widget ambiental: **temperatura, humedad, probabilidad de lluvia, viento (km/h)** e icono de condición, más el **índice AQI de calidad del aire** (ÓPTIMO / ACEPTABLE / RIESGO LEVE / DAÑINO…).

- La primera vez, el navegador te pedirá **permiso de ubicación**: acéptalo para clima de tu zona (se actualiza cada 10 min).
- Si lo deniegas, se usa **Medellín por defecto** (verás `Clima (Medellín)` en el título).
- Los datos vienen de **Open-Meteo**; sin internet verás valores de respaldo (`22 °C / 60 %`).

### 4.5. Indicador de sincronización

Arriba a la derecha verás una píldora de estado:

- `Esperando sincronización de datos reales` (gris) → aún no se han cargado mediciones.
- Estado actualizado (verde) → datos del día cargados correctamente.

Si ves tarjetas en gris con `--`, ve a [Historial](#6-historial-cronológico) e importa un Excel/CSV o sincroniza Google Sheets.

---

## 5. Métricas agronómicas (`/metrics`)

Panel profesional para análisis por planta, fila y global. Encabezado: **Métricas + tu nombre y rol**.

### 5.1. Promedios globales

Tarjetas resumen calculadas con todas las plantas que tienen datos:

- **pH promedio** (ej. `6.35`).
- **Temp. interna / externa / suelo** (`°C`).
- **Crecimiento promedio** (`%` o `cm`).
- **Humedad promedio** (`%`).
- **% plantas sanas** (`Excelente + Saludable / 20`).

> Si no hay datos verás `--` en lugar de números. No es un error: significa que debes cargar mediciones.

### 5.2. Cómo leer los badges

**pH del suelo** (rango ideal 6.0 – 6.8):

- 🟢 **Óptimo** (6.0 – 6.8).
- 🟡 **Atención** (5.5 – 6.0 o 6.8 – 7.2).
- 🔴 **Crítico** (fuera de esos rangos).

**Sanidad:**

- 🟢 `Excelente` / `Saludable` · 🟡 `Vulnerable` · 🔴 `Crítica`.

**Productividad:** `Alta` (verde) · `Media` (neutro) · `Baja` (rojo).

### 5.3. Vista por filas y tabla Excel

- Cada fila (`Fila t0 … t3`) muestra sus promedios propios (pH, temps, crecimiento) para comparar microclimas dentro del invernadero.
- La **tabla estilo Excel** lista las 20 plantas con sus columnas. **Haz clic en cualquier fila de la tabla o en el selector rápido** para abrir el mismo modal de detalle del Dashboard, con la última medición del día y sus gráficos individuales.
- Usa los filtros de fila/columna para enfocarte en un sector problemático.

**Buenas prácticas:**

1. Revisa primero los contadores de sanidad (¿cuántas en `Crítica`?).
2. Baja a la fila con peor pH promedio.
3. Abre las plantas en rojo y anota pH + temp suelo para la bitácora.

---

## 6. Historial cronológico (`/historial`)

Título: **Historial Cronológico de Mediciones / Registro Multidía**. Aquí consultas, auditas, importas y exportas.

### 6.1. Consultar por fecha

1. Usa el **selector de fecha** (por defecto muestra la más reciente disponible).
2. La tabla se actualiza con las tomas de ese día para las 20 plantas.
3. Compara días navegando entre fechas para ver evolución (picos de temperatura, caídas de humedad, correcciones de pH).

Las fechas disponibles vienen de las mediciones reales cargadas (`REAL_DATES` en el sistema). Si solo ves un día, es porque solo hay un día cargado.

### 6.2. Importar datos (Excel / CSV)

1. Haz clic en **Importar** / **Cargar archivo**.
2. Selecciona un `.xlsx` o `.csv` con las columnas de medición (fecha, planta/fila/columna, pH, temperaturas, humedad, crecimiento, productividad, sanidad).
3. El sistema valida y previsualiza. Confirma para guardar en PostgreSQL.
4. Vuelve al Dashboard/Métricas: las tarjetas grises ahora mostrarán datos.

### 6.3. Conectar Google Sheets (solo Admin)

1. Haz clic en **Conectar Google Sheets** (`btn-open-sheets-modal`).
2. Pega la **URL pública del Sheet** (debe estar publicado como CSV o enlace de exportación, ej. `https://docs.google.com/spreadsheets/d/TU_ID/edit#gid=0`).
3. El sistema convierte la URL a formato `export?format=csv`, descarga y sincroniza (`POST /api/sync-sheets`).
4. Verás confirmación de éxito o error de autenticación/conexión.

> Requiere rol Admin o superior. La sincronización puede ser `manual`, cada 5/15 min o cada hora según configuración.

### 6.4. Exportar a Excel

1. Selecciona fecha (y opcionalmente rango `inicio/fin` y métrica).
2. Haz clic en **Exportar a Excel**.
3. Se descarga un `.xlsx` generado con ExcelJS (`GET/POST /api/export-excel`), con hojas por tipo de métrica, listo para informes o auditoría.

---

## 7. Configuración (`/settings`)

Accede desde la Navbar → **Configuración**. Menú lateral con 4 secciones:

### 7.1. 👤 Perfil de Usuario

- Foto/avatar, **Nombre Completo** (editable) y **Correo** (solo lectura, no se puede cambiar por seguridad).
- Insignia de rol (`Administrador`, etc.).
- Haz clic en **Guardar Cambios** para aplicar el nuevo nombre.

### 7.2. ⚙️ Preferencias del Sistema

- **Tema Visual**: `Automático (Sistema)` / `Modo Claro` / `Modo Oscuro`.
- **Sensores IoT — Frecuencia de Sincronización**: cada cuánto se refrescan los datos en tiempo real (ej. `1 Minuto`). A menor intervalo, datos más frescos pero mayor consumo.
- Otros parámetros de invernadero e interfaz según despliegue.

### 7.3. 🔔 Notificaciones

Activa/desactiva avisos (toast/push) para:

- Planta en estado **Crítico**.
- pH fuera de rango.
- Confirmaciones de importación/exportación/sincronización.

### 7.4. ⚠️ Zona de Peligro

Acciones irreversibles (requieren confirmación):

- Borrar historial local / restablecer preferencias.
- Cerrar todas las sesiones.
- (Solo Super admin) Eliminar cuenta o datos del invernadero.

> Lee siempre el mensaje de confirmación antes de aceptar.

---

## 8. Datos climáticos externos

El sistema combina tus sensores con clima externo:

- **Open-Meteo (fuente actual):** temperatura, humedad, probabilidad de lluvia y viento por coordenadas, con refresco cada 10 min.
- **SIATA (pausado):** la red local de Medellín está temporalmente fuera de línea; el proxy interno se mantiene para reactivarlo sin cambios en el panel.

No debes hacer nada: si hay internet verás el clima en vivo; si no, valores de respaldo. Si ves un icono de lluvia, es la predicción de la hora actual.

---

## 9. Solución de problemas (FAQ)

**No puedo iniciar sesión: "Credenciales incorrectas".**
Verifica mayúsculas, que el correo sea el registrado y que la contraseña tenga 8+ caracteres. Si te registraste con Google, entra con **Continuar con Google**, no con correo/contraseña. Si persiste, usa **¿Olvidaste tu contraseña?**.

**Me registré pero no entro.**
El registro no inicia sesión solo: vuelve a la pestaña **Iniciar Sesión** e ingresa con tu correo y contraseña recién creados.

**Veo `--` / `N/D` / tarjetas grises.**
No hay mediciones cargadas. Ve a **Historial → Importar Excel/CSV** o **Conectar Google Sheets**.

**El Dashboard se ve oscuro / el 3D se ve de noche.**
La iluminación sigue el reloj real. De noche el sol de la simulación se oculta. Vuelve de día o ajusta el tema a modo claro.

**¿De dónde vienen los datos?**
Mediciones propias (importadas a memoria desde Excel/Sheets) + clima Open-Meteo en vivo (+ AQI). SIATA está pausado temporalmente.

**Exportar Excel falla o descarga vacía.**
Revisa que haya datos en el rango/fecha elegido y que tu sesión siga activa (si expiró, inicia sesión de nuevo).

**Google Sheets dice "Error de autenticación".**
La hoja debe estar **publicada/compartida como lector** (enlace `export?format=csv` accesible). Verifica el ID y que tengas rol Admin.

**La página me devuelve al inicio.**
Tu sesión expiró o no tienes rol suficiente. Inicia sesión de nuevo.

---

## 10. Glosario

- **pH del suelo:** acidez/alcalinidad. Ideal 6.0–6.8 para la mayoría de cultivos.
- **Temp. interna / externa / suelo:** aire dentro, aire fuera y sustrato. El suelo amortigua cambios bruscos.
- **Humedad relativa (%):** vapor de agua en el aire. Alta + calor = riesgo de hongos.
- **Crecimiento:** altura (cm) o avance (%) según cultivo.
- **Sanidad:** estado fitosanitario (`Excelente/Saludable/Vulnerable/Crítica`).
- **Productividad:** rendimiento esperado (`Alta/Media/Baja`).
- **SIATA:** Sistema de Alertas Tempranas del Valle de Aburrá.
- **Open-Meteo:** API global gratuita de pronóstico.
- **JWT:** token de sesión que guarda tu identidad y rol.

---

_Proyecto Invernadero © 2026 — Sistema de Monitoreo Ambiental. Para soporte técnico contacta al administrador del cultivo o al equipo de desarrollo (ver README)._
