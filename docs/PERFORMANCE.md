# Rendimiento, Límites y Presupuestos

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-38**.

## 1. Propósito

Recoger los **presupuestos reales** que el código impone (timeouts, concurrencia, ventanas de rate limit, duración de Lambda) y separarlos de las recomendaciones. Los escenarios de calidad están en [QUALITY-ATTRIBUTES](./QUALITY-ATTRIBUTES.md) y el procedimiento de medición en [OPERATIONS-RUNBOOK](./OPERATIONS-RUNBOOK.md).

## 2. Presupuestos implementados

| Recurso                                        | Límite                                              | Origen                                        |
| :--------------------------------------------- | :-------------------------------------------------- | :-------------------------------------------- |
| Duración máxima de función Vercel              | 60 s (global) y 60 s en el proxy ML                 | `astro.config.mjs:19`, `trips-diagnosis.ts:7` |
| Presupuesto total del proxy ML                 | 50 s                                                | `trips-diagnosis.ts:24`                       |
| Timeout por intento de predicción              | 45 s                                                | `trips-diagnosis.ts:26`                       |
| Timeout de health ML                           | 25 s                                                | `trips-diagnosis.ts:182`                      |
| Timeout de login y warm-up ML                  | 10 s cada uno                                       | `trips-diagnosis.ts:61,193,202`               |
| Cache de cookie de sesión ML                   | 6 días en memoria de la función                     | `trips-diagnosis.ts:69`                       |
| Timeout de conexión a PostgreSQL               | 5 s con `DATABASE_URL`, 2 s con variables separadas | `src/db/client.ts:28,42`                      |
| Tamaño del pool de PostgreSQL                  | 20 conexiones                                       | `src/db/client.ts:26,40`                      |
| Tiempo inactivo antes de cerrar conexión       | 30 s                                                | `src/db/client.ts:27,41`                      |
| Timeout de AQI                                 | 8 s                                                 | `src/pages/api/aqi.ts:27`                     |
| Timeout del proxy SIATA                        | 3 s                                                 | `src/backend/services/siata.ts`               |
| Refresh del widget climático                   | 10 min en cliente                                   | `Dashboard.astro`                             |
| Frecuencias de sincronización seleccionables   | 1, 5, 15, 60 min (default 5)                        | `src/shared/preferences.ts:13-14`             |
| Rate limit registro                            | 10 / 300 s por IP                                   | `src/middleware.ts:32`                        |
| Rate limit forgot/reset                        | 8 / 300 s por IP                                    | `src/middleware.ts:33-34`                     |
| Rate limit login con credenciales              | 20 / 300 s por IP                                   | `src/middleware.ts:35`                        |
| Rate limit canje de invitación                 | 15 / 300 s por IP                                   | `src/middleware.ts:36`                        |
| Reintentos de toast de alertas                 | 3 × 900 ms                                          | `src/shared/alerts.ts:120-128`                |
| Intentos de generación de código de invitación | 8                                                   | `src/backend/services/farms.ts:44`            |

## 3. Animación y renderizado

- La matriz 4×5 se renderiza en SSR desde lecturas (`getLecturasByFinca`); no requiere una llamada adicional para pintar el estado inicial.
- `buildPlantsGridFromRecords()` itera 20 celdas y filtra el arreglo completo de registros en cada celda, invocando `resolvePlantCoordinates` como fallback. Complejidad aproximada **O(20 · N · coste_regex)**; con N alto (miles de lecturas por finca) es el punto de escalado principal del tablero.
- La escena 3D usa Three.js con sombras `PCFSoftShadowMap` y ciclo sol/luna según hora real; es el mayor coste de GPU en móvil.
- `sileo` se monta como isla React (`client:load`) y `BlobatarAvatar` usa seguimiento de mirada solo con puntero fino.
- Las preferencias de temperatura recorren el DOM con `TreeWalker` y reescriben nodos de texto (`preferences.ts:192-226`): coste lineal al cambiar de unidad.

## 4. Cuellos de botella identificados

| #   | Cuello de botella                           | Evidencia                                   | Impacto                                                 | Mitigación sugerida                                                  |
| :-- | :------------------------------------------ | :------------------------------------------ | :------------------------------------------------------ | :------------------------------------------------------------------- |
| 1   | Cold start de Cloud Run (BioCLIP)           | Comentarios en `astro.config.mjs:15-18`     | Hasta ~50 s en predicción                               | Health con warm-up (ya implementado) + instancia mínima en Cloud Run |
| 2   | Importación desde Sheets                    | `fetch` sin timeout ni límite de tamaño     | Función ocupada hasta `maxDuration`                     | `AbortSignal.timeout` y streaming con límite de bytes                |
| 3   | Agregación de la matriz en cliente/servidor | `plantMatrix.ts:201-213`                    | O(20·N) con regex                                       | Preindexar registros por `code` en un `Map`                          |
| 4   | Pool compartido en serverless               | `max:20` por instancia                      | Agotamiento de conexiones de la BD con muchas functions | PgBouncer / Neon pooler; reducir `max` por instancia                 |
| 5   | Escritura local de fotos                    | `gallery/upload.ts:65-68`                   | I/O y no persistencia entre deploys                     | Object storage                                                       |
| 6   | Rate limit en memoria                       | `rateLimit.ts`                              | Cada instancia tiene su propio contador                 | Store distribuido                                                    |
| 7   | Thumbnails sin optimizar                    | `Gallery.astro` muestra imágenes originales | Transferencia innecesaria                               | Redimensionado y WebP en subida                                      |

## 5. Medición recomendada

```bash
# Tiempo de health de ML (debe ser < 25 s)
time curl -s -o /dev/null -w '%{http_code} %{time_total}\n' http://localhost:4321/api/trips-diagnosis

# Tiempo de AQI con fallback
time curl -s -o /dev/null -w '%{http_code} %{time_total}\n' 'http://localhost:4321/api/aqi?lat=6.24&lon=-75.58'

# Tiempo de sincronización (solo en entorno de prueba)
time curl -s -X POST http://localhost:4321/api/sync-sheets \
  -H 'Content-Type: application/json' -d '{"url":"<URL_PUBLICA>"}'

# Tamaño de las lecturas de una finca (sustituir ID)
psql "$DATABASE_URL" -c "SELECT count(*), pg_size_pretty(pg_total_relation_size('lecturas')) FROM lecturas WHERE finca_id = 1;"

# Índices disponibles para las consultas principales
psql "$DATABASE_URL" -c "\d lecturas"
```

## 6. Objetivos propuestos (no implementados)

| Métrica                                               | Objetivo      | Estado actual   |
| :---------------------------------------------------- | :------------ | :-------------- |
| LCP del tablero                                       | < 2.5 s en 4G | Sin medición    |
| Respuesta de `/api/trips-diagnosis` (modelo caliente) | < 10 s p95    | Sin medición    |
| Sincronización de 500 registros                       | < 5 s         | Sin medición    |
| Consulta `getLecturasByFinca` (10.000 filas)          | < 300 ms      | Sin medición    |
| Tasa de error 5xx                                     | < 0.5 %       | Sin medición    |
| Cobertura de tests unitarios del parser               | > 80 %        | 0 % (sin suite) |

## 7. Reglas de diseño para no degradar el rendimiento

1. Toda consulta de datos debe filtrar por `finca_id`; los índices `(finca_id, fecha)` y `(planta_id)` existen para ello.
2. No añadir `fetch` desde el cliente a dominios no incluidos en `connect-src` de la CSP.
3. Cualquier integración nueva debe definir timeout explícito y respuesta degradada documentada en [INTEGRATIONS](./INTEGRATIONS.md).
4. Los lotes de escritura deben usar una sola transacción, como `insertLecturas`.
5. No superar el presupuesto de 50 s del proxy ML sin revisar `maxDuration`.
6. Registrar el motivo de cada fallback para poder distinguir dato real de estimación.

## 8. Trazabilidad

| Límite             | Código                          | Documento relacionado           | Verificación                     |
| :----------------- | :------------------------------ | :------------------------------ | :------------------------------- |
| Timeouts ML        | `trips-diagnosis.ts`            | [CAMERA-ML](./CAMERA-ML.md)     | `time curl`                      |
| Pool y conexión    | `src/db/client.ts`              | [DATABASE](./DATABASE.md)       | `SHOW max_connections;`          |
| Rate limits        | `middleware.ts`, `rateLimit.ts` | [SECURITY](./SECURITY.md)       | Bucle de peticiones              |
| Agregación O(20·N) | `src/shared/plantMatrix.ts`     | [DATA-FLOW](./DATA-FLOW.md)     | Cargar 10.000 lecturas de prueba |
| Frecuencias        | `src/shared/preferences.ts`     | [USER_MANUAL](./USER_MANUAL.md) | Settings → sincronización        |
