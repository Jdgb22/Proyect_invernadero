# Endpoints de la API

## API Routes Reference

### Endpoint: GET /api/metrics
**Descripción:** Obtiene las lecturas más recientes de los sensores del greenhouse.

**Método:** GET
**Autenticación:** Requerida (middleware de protección)
**Respuestas:**
- **200 OK:** Retorna datos de métricas en formato JSON
  ```json
  {
    "temperature": 24.5,
    "humidity": 65.2,
    "light": 45000,
    "water_level": 85,
    "timestamp": "2024-01-15T10:30:00Z"
  }
  ```
- **401 Unauthorized:** El usuario no está autenticado
- **500 Internal Error:** Error al consultar la base de datos

---

### Endpoint: GET /api/export/excel
**Descripción:** Exporta los datos históricos a un archivo Excel (.xlsx).

**Método:** GET
**Autenticación:** Requerida
**Parámetros de query:**
- `start` (opcional): Fecha de inicio en formato ISO (ej. `2024-01-01T00:00:00Z`)
- `end` (opcional): Fecha de fin en formato ISO
- `metric` (opcional): Tipo de métrica (`temperature`, `humidity`, `light`, `water_level`)

**Respuestas:**
- **200 OK:** Archivo .xlsx descargable
  ```http
  Content-Disposition: attachment; filename="greenhouse-data-2024-01-15.xlsx"
  Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
  ```
- **401 Unauthorized:** El usuario no está autenticado
- **400 Bad Request:** Parámetros de fecha inválidos

**Implementación:** `src/pages/api/export-excel.ts` utiliza ExcelJS para generar la hoja de cálculo.

---

### Endpoint: GET /api/siata
**Descripción:** Proxy para obtener datos climáticos del sistema SIATA (Medellín).

**Método:** GET
**Autenticación:** Opcional (puede ser público para datos climáticos)
**Parámetros de query:**
- `type` (opcional): Tipo de dato climático (`temperature`, `forecast`, `current`)

**Respuestas:**
- **200 OK:** Datos climáticos de SIATA en formato JSON
- **502 Bad Gateway:** Error al conectar con el servicio SIATA

**Implementación:** `src/pages/api/siata.ts` - Endpoint que evita problemas de CORS al hacer fetch directo desde el frontend.

---

### Endpoint: POST /api/sync-sheets
**Descripción:** Sincroniza los datos del greenhouse con una hoja de Google Sheets.

**Método:** POST
**Autenticación:** Requerida (solo usuarios administradores)
**Cuerpo JSON (request body):**
```json
{
  "sheetId": "1BxiMvo0XfgIGQlO constraint...",  // ID de la hoja de Google Sheets
  "range": "A1:E100",  // Rango de celdas destino
  "frequency": "manual" | "every_5min" | "every_15min" | "every_h1"
}
```

**Respuestas:**
- **200 OK:** `{ success: true, message: "Sincronización completada" }`
- **401 Unauthorized:** El usuario no tiene permisos de administrador
- **400 Bad Request:** Datos de request inválidos o ID de hoja inexistente
- **500 Internal Error:** Error al escribir en Google Sheets

**Implementación:** `src/pages/api/sync-sheets.ts` utilizando la API de Google Sheets.

---

### Endpoint: GET /api/weather
**Descripción:** Obtiene datos del clima usando Open-Meteo API.

**Método:** GET
**Autenticación:** Opcional
**Parámetros de query:**
- `latitude` (requerido): Coordenadas geográficas
- `longitude` (requerido): Coordenadas geográficas
- `hourly` (opcional): Variables a obtener (`temperature_2m`, `relative_humidity_2m`, `precipitation`)

**Respuestas:**
- **200 OK:** Datos climáticos de Open-Meteo
- **400 Bad Request:** Parámetros geográficos inválidos

**Implementación:** `src/backend/services/weather.ts` - Integración con Open-Meteo API global.