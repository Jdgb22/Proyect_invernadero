# Integraciones Externas y Contratos

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-34**.

## 1. Propósito

Macollo no ejecuta modelos de visión, no genera clima y no entrega correo por sí mismo: orquesta servicios externos. Este documento enumera cada integración con su contrato, autenticación, timeout, fallback y modo de verificación. Es la referencia operativa de [DATA-FLOW](./DATA-FLOW.md) y [ERROR-CATALOG](./ERROR-CATALOG.md).

## 2. Inventario

| Integración           | Dirección                          | Autenticación                   | Timeout                            | Fallback                           | Código                                                    |
| :-------------------- | :--------------------------------- | :------------------------------ | :--------------------------------- | :--------------------------------- | :-------------------------------------------------------- |
| Google Sheets / Drive | `docs.google.com/spreadsheets/...` | URL pública (sin OAuth)         | `fetch` sin timeout explícito      | Error `422` al cliente             | `src/backend/services/sheetsSync.ts:13-89`                |
| Open-Meteo            | `api.open-meteo.com`               | Ninguna                         | Implícito en `serverFetch`/cliente | Datos offline fijos en cliente     | `src/backend/services/weather.ts`, `Dashboard.astro`      |
| WAQI                  | `api.waqi.info/feed/geo:…`         | Token en query string           | 8 s (`aqi.ts:27`)                  | AQI 28 fijo + `status:"ok"`        | `src/pages/api/aqi.ts:8-40`                               |
| SIATA                 | `siata.gov.co:8089/...`            | Ninguna                         | 3 s                                | `500` con `details`                | `src/backend/services/siata.ts`, `src/pages/api/siata.ts` |
| macollo-trips-api     | `${ML_API_URL}`                    | `X-API-Key` + cookie de panel   | 45 s/25 s/10 s según operación     | `502` (POST) / `503` (GET)         | `src/pages/api/trips-diagnosis.ts`                        |
| SMTP (Gmail u otro)   | `SMTP_HOST:SMTP_PORT`              | `SMTP_USER`/`SMTP_PASS`         | Nodemailer por defecto             | Log del código en dev              | `src/backend/services/notifications.ts:27-50`             |
| Twilio SMS            | `api.twilio.com/2010-04-01/...`    | Basic (SID:token)               | `fetch` por defecto                | Log del código en dev              | `notifications.ts:132-157`                                |
| Google OAuth          | Auth.js                            | `GOOGLE_CLIENT_ID/SECRET`       | Auth.js                            | Botón no disponible si faltan vars | `auth.config.ts`                                          |
| PostgreSQL            | `DATABASE_URL` o `POSTGRES_*`      | Usuario/contraseña; SSL en prod | 5 s conexión (URL) / 2 s (partes)  | Sin fallback                       | `src/db/client.ts:18-44`                                  |

## 3. Google Sheets / Drive

**Normalización de URL** (`src/backend/services/sheetsSync.ts:13-54`):

| Entrada                            | Salida                                                          |
| :--------------------------------- | :-------------------------------------------------------------- |
| `drive.google.com/file/d/<ID>/...` | `https://docs.google.com/spreadsheets/d/<ID>/export?format=csv` |
| `drive.google.com/open?id=<ID>`    | Igual que arriba                                                |
| `/spreadsheets/d/e/<ID>/pubhtml`   | `.../pub?output=csv`                                            |
| `/spreadsheets/d/e/<ID>/pub`       | `.../pub?output=csv`                                            |
| `/spreadsheets/d/<ID>/edit#gid=7`  | `.../export?format=csv&gid=7`                                   |
| Ya exportada con `format=csv`      | Sin cambios                                                     |

**Contrato de lectura:** cabeceras `User-Agent: Macollo-Greenhouse-Sync/2.0`, `Accept: text/csv,text/plain,*/*`. El documento debe permitir lectura anónima; no se usan credenciales de Google.

**Errores:** HTTP ≠ 2xx, menos de 2 filas o cero registros válidos → `SheetsSyncError` con estado `422` y mensaje accionable. Cualquier otra excepción → `500` con `details`.

**Persistencia colateral:** la URL se guarda en `fincas.sheets_url` (migración 003) para reutilizarla en sincronizaciones posteriores sin volver a enviarla. `GET /api/sync-sheets` la consulta. Si el guardado falla, se avisa por log y continúa.

## 4. Clima (Open-Meteo) y calidad del aire (WAQI)

- `fetchWeatherData(lat, lon, fallback, fetcher, locationName)` solicita temperatura, humedad relativa, código WMO, viento y probabilidad de precipitación de la hora actual con `timezone=auto`.
- Geocodificación por texto: `geocodeQuery(query, serverFetch)` desde `GET /api/weather?q=…`.
- Defaults de coordenadas: Medellín `6.2442, -75.5812` (`weather.ts:32-37`, `aqi.ts:19-22`).
- Fallback climático del endpoint: `{temperature:22, humidity:60, rainProbability:0, weatherCode:0, windSpeed:5, source:'Offline Fallback', isFallback:true}` (`weather.ts:50-59`).
- WAQI devuelve el JSON del proveedor; si falla se responde `AQI 28` con ciudad Medellín. **Es un dato simulado**: la interfaz debe mostrarlo como estimación; ver [ERROR-CATALOG](./ERROR-CATALOG.md).
- `connect-src` de CSP autoriza explícitamente ambos dominios (`src/middleware.ts:56`).

## 5. SIATA (latente)

El proxy `GET /api/siata` consulta `http://siata.gov.co:8089/estacionesTemperatura/20` con timeout de 3 s y añade `Access-Control-Allow-Origin: *`. `fetchSiataPredictions()` ya no se llama desde `fetchWeatherData()`; el código permanece como opción local y se rige por ADR-004 y ADR-007. No hay consumidores internos activos.

## 6. Servicio de Machine Learning (macollo-trips-api)

| Operación      | Ruta remota            | Cabeceras                      | Timeout | Respuesta local                                                        |
| :------------- | :--------------------- | :----------------------------- | :------ | :--------------------------------------------------------------------- |
| Health         | `GET /api/health`      | `X-API-Key`                    | 25 s    | `200 {status:'online', ml_service, warming_triggered}` / `503 offline` |
| Warm-up        | `POST /api/warmup`     | `X-API-Key` + cookie si existe | 10 s    | Best-effort; no cambia el estado de la respuesta                       |
| Login de panel | `POST /api/auth/login` | JSON `{username,password}`     | 10 s    | Cookie `macollo_session` cacheada 6 días en memoria                    |
| Predicción     | `POST /api/predict`    | `X-API-Key` + cookie           | 45 s    | JSON del modelo; reintento único ante `401`                            |

Campos enviados a `/api/predict`: `file` (Blob), `temperature_c` (opcional), `crop` (por defecto `gulupa`), `profile` (por defecto `auto`). La clave se envía solo desde el servidor; el navegador nunca la ve.

Riesgo documentado: existen valores por defecto para `ML_API_KEY` y para las credenciales del panel (`ML_ADMIN_USER`, `ML_ADMIN_PASSWORD`) en el código (`trips-diagnosis.ts:15-19,54-55`). Deben sobrescribirse en el entorno de despliegue y rotarse; ver [THREAT-MODEL](./THREAT-MODEL.md).

## 7. Correo y SMS

- Recuperación: código de 6 dígitos en `verification_token`, 15 min de validez; envío por SMTP (`SMTP_*` o `GMAIL_*`) o Twilio (`TWILIO_*`). Si faltan credenciales, el código se imprime en logs y la respuesta indica `sent:false`.
- Resumen semanal: `POST /api/notifications/weekly-summary` calcula métricas de la finca activa y envía HTML por SMTP; sin credenciales responde `502`.
- El remitente por defecto es `"Macollo Invernadero" <no-reply@macollo.com>` cuando no se define `SMTP_FROM` (`notifications.ts:31-33`).
- Normalización de celular colombiano: si tiene 10 dígitos y no empieza con `+`, se prefija `+57` (`notifications.ts:162-171`).

## 8. OAuth de Google

`auth.config.ts` registra el proveedor Google con `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` y usa `@auth/pg-adapter` para `accounts`. Con login por credenciales la tabla `accounts` permanece vacía; es un estado normal. La URL de retorno debe autorizarse en Google Cloud cuando se use `https://macollo.tech`.

## 9. Matriz de resiliencia

| Fallo                   | Comportamiento observado                | Impacto en datos             | Acción operativa                     |
| :---------------------- | :-------------------------------------- | :--------------------------- | :----------------------------------- |
| Sheets caído            | `422`, sin escritura                    | Ninguno                      | Revisar permisos del documento       |
| Insert en PG falla      | Respuesta `success:true`, `guardadas:0` | Pérdida silenciosa           | Consultar logs `[Sync]` y reintentar |
| Open-Meteo caído        | Fallback offline en cliente             | Ninguno                      | Avisar en UI; no bloquea             |
| WAQI caído              | AQI 28 simulado                         | Ninguno                      | No interpretar como medición real    |
| Cloud Run frío          | Health dispara warm-up                  | Ninguno                      | Esperar y reintentar                 |
| Cloud Run caído         | `502`/`503`                             | Foto no se guarda en galería | Verificar `ML_API_URL` y health      |
| SMTP sin configurar     | Código en logs, `sent:false`            | Token sí se guarda           | Configurar `SMTP_*`                  |
| PostgreSQL sin conexión | Error `500` en el handler               | Sin persistencia             | Verificar `DATABASE_URL` y pool      |

## 10. Trazabilidad

| Integración | Código                            | Documento relacionado           | Verificación                              |
| :---------- | :-------------------------------- | :------------------------------ | :---------------------------------------- |
| Sheets      | `sheetsSync.ts`, `sync-sheets.ts` | [ENDPOINTS](./ENDPOINTS.md)     | `curl -X POST /api/sync-sheets`           |
| Clima       | `weather.ts`, `Dashboard.astro`   | [DATA-FLOW](./DATA-FLOW.md)     | `curl '/api/weather?lat=6.24&lon=-75.58'` |
| AQI         | `aqi.ts`                          | [USER_MANUAL](./USER_MANUAL.md) | `curl '/api/aqi?lat=6.24&lon=-75.58'`     |
| ML          | `trips-diagnosis.ts`              | [CAMERA-ML](./CAMERA-ML.md)     | `curl /api/trips-diagnosis`               |
| Correo/SMS  | `notifications.ts`                | [AUTH](./AUTH.md)               | Solicitar recuperación de prueba          |
| OAuth       | `auth.config.ts`                  | [AUTH](./AUTH.md)               | Botón "Continuar con Google"              |
| DB          | `src/db/client.ts`                | [DATABASE](./DATABASE.md)       | `SELECT 1;` desde el deploy               |
