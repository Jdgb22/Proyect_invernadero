# Atributos de Calidad y Escenarios Arquitectónicos

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-37**.

## 1. Propósito

Expresar la calidad del sistema en **escenarios medibles** (estímulo → contexto → respuesta → criterio), siguiendo el enfoque de evaluación de arquitecturas (ATAM). Cada escenario se apoya en evidencia de código o se marca explícitamente como **no verificado**. Relacionado con [PERFORMANCE](./PERFORMANCE.md), [THREAT-MODEL](./THREAT-MODEL.md) y [ROADMAP](./ROADMAP.md).

## 2. Escenarios de rendimiento

| ID    | Escenario                     | Contexto                | Respuesta esperada                         | Criterio                                            | Evidencia                                     |
| :---- | :---------------------------- | :---------------------- | :----------------------------------------- | :-------------------------------------------------- | :-------------------------------------------- |
| QP-01 | Cargar tablero con 20 plantas | Finca con lecturas      | Matriz + promedios renderizados en SSR     | Sin petición adicional obligatoria al servidor      | `src/pages/index.astro`, `Dashboard.astro`    |
| QP-02 | Health del servicio ML        | Cloud Run en reposo     | Respuesta en ≤25 s con `warming_triggered` | `GET /api/trips-diagnosis` no excede 25 s en health | `trips-diagnosis.ts:180-183`                  |
| QP-03 | Predicción de trips           | Modelo cargado          | Diagnóstico en ≤45 s por intento           | `maxDuration=60` y presupuesto 50 s                 | `trips-diagnosis.ts:7,24-26`                  |
| QP-04 | Sincronizar 500 filas         | Hojas con 500 registros | `guardadas ≈ 500` en una transacción       | Un solo `COMMIT`; sin duplicados                    | `readings.ts:130-190`                         |
| QP-05 | Consultar AQI                 | WAQI lento              | Respuesta en ≤8 s o fallback               | `AbortSignal.timeout(8000)`                         | `aqi.ts:27`                                   |
| QP-06 | Clima sin red                 | Navegador offline       | Widget con `Offline Fallback`              | No bloquea render                                   | `weather.ts:50-59`                            |
| QP-07 | Carga de escena 3D            | Dispositivo móvil       | Iluminación según hora real                | Three.js en componente Astro                        | `Dashboard.astro`                             |
| QP-08 | Tiempo de arranque en frío    | Vercel Functions        | No medido                                  | **Sin dato**: requiere synthetic monitoring         | [OPERATIONS-RUNBOOK](./OPERATIONS-RUNBOOK.md) |

## 3. Escenarios de seguridad

| ID    | Escenario                               | Criterio                     | Control                         | Estado                               |
| :---- | :-------------------------------------- | :--------------------------- | :------------------------------ | :----------------------------------- |
| QS-01 | Solicitud a API privada sin sesión      | `401`                        | Middleware                      | Verificado (`middleware.ts:137-147`) |
| QS-02 | Cambio de rol no autorizado             | `403`                        | `canManageSystem`               | Verificado                           |
| QS-03 | Fuga de clave de ML al navegador        | Ninguna clave en bundle      | Proxy SSR                       | Verificado; agravado por R-01        |
| QS-04 | Fuerza bruta de login                   | `429` tras 20 intentos/5 min | Rate limit                      | Verificado en memoria                |
| QS-05 | Inyección de HTML en nombre de usuario  | Sin ejecución                | React/Astro escapan por defecto | Verificado por diseño; sin test      |
| QS-06 | Carga de archivo arbitrario             | Rechazo por tipo y tamaño    | **No implementado**             | R-04 abierto                         |
| QS-07 | Fetch a red interna desde Sheets        | Rechazo                      | **No implementado**             | R-03 abierto                         |
| QS-08 | Reutilización de código de recuperación | Rechazo                      | Token borrado al consumir       | Verificado                           |

## 4. Escenarios de disponibilidad y recuperación

| ID    | Escenario                      | Respuesta                                            | Criterio                                               |
| :---- | :----------------------------- | :--------------------------------------------------- | :----------------------------------------------------- |
| QA-01 | PostgreSQL caído               | Error 500 en endpoints de datos; UI no inventa datos | Sin corrupción; requiere monitorización externa        |
| QA-02 | Google Sheets caído            | `422` con instrucciones                              | No se escribe en `lecturas`                            |
| QA-03 | Cloud Run escalado a cero      | Health dispara `/api/warmup`                         | Predicción posterior sin error de sesión               |
| QA-04 | SMTP sin credenciales          | Código impreso en logs (recuperación)                | La cuenta queda sin correo real: degradación funcional |
| QA-05 | WAQI caído                     | AQI simulado 28                                      | La UI no distingue fallback de dato real: deuda UX     |
| QA-06 | Redeploy de Vercel             | Fotos locales desaparecen                            | Riesgo R-10; requiere object storage                   |
| QA-07 | Borrado accidental de lecturas | No hay papelera                                      | Deuda: implementar soft delete                         |

## 5. Escenarios de modificabilidad

| ID    | Cambio esperado                   | Punto de extensión                            | Impacto estimado                                     |
| :---- | :-------------------------------- | :-------------------------------------------- | :--------------------------------------------------- |
| QM-01 | Añadir fuente de clima            | `src/backend/services/weather.ts` + `aqi.ts`  | Bajo: aislado tras servicios                         |
| QM-02 | Cambiar umbrales agronómicos      | `src/shared/badges.ts`, `alerts.ts`, `csv.ts` | Medio: tres archivos con constantes duplicadas       |
| QM-03 | Añadir rol de sistema             | enum en SQL + `authz.ts` + `roles.ts` + UI    | Alto: toca BD, JWT y etiquetas                       |
| QM-04 | Sustituir almacenamiento de fotos | `gallery/upload.ts`, `gallery/[id]/file.ts`   | Medio: contrato de `url` en `photos`                 |
| QM-05 | Activar IoT real                  | Nuevo ingestor → `insertLecturas`             | Medio: la persistencia ya es reutilizable            |
| QM-06 | Internacionalizar la UI           | Textos dispersos en componentes               | Alto: no hay capa i18n (ver [ROADMAP](./ROADMAP.md)) |

## 6. Escenarios de usabilidad y accesibilidad

| ID    | Escenario                                           | Estado                                                     |
| :---- | :-------------------------------------------------- | :--------------------------------------------------------- |
| QU-01 | Usuario con teclado recorre la matriz               | No auditado; ver [ACCESSIBILITY](./ACCESSIBILITY.md)       |
| QU-02 | Usuario con lector de pantalla interpreta semáforos | Parcial: iconos con texto en badges; requiere `aria-label` |
| QU-03 | Contraste en tema oscuro                            | Clases Tailwind dedicadas; sin auditoría de contraste      |
| QU-04 | Cámara en HTTP por IP                               | Resuelto con `input[capture]`                              |
| QU-05 | Cambio de unidades °C/°F                            | Implementado por reescritura de nodos de texto             |

## 7. Escenarios de verificabilidad (testabilidad)

| ID    | Escenario                        | Herramienta actual          | Estado                                                  |
| :---- | :------------------------------- | :-------------------------- | :------------------------------------------------------ |
| QV-01 | Probar parser de CSV             | Ninguna                     | Sin suite; caso manual con fixture                      |
| QV-02 | Probar autorización por finca    | `curl`                      | Manual documentado en [TESTING](./TESTING.md)           |
| QV-03 | Probar deduplicación de lecturas | SQL + reimportación         | Manual                                                  |
| QV-04 | Probar arranque en frío de ML    | `curl /api/trips-diagnosis` | Manual                                                  |
| QV-05 | Regresión visual                 | No hay capturas en el repo  | Bloqueado (ver [DOC-CONVENTIONS](./DOC-CONVENTIONS.md)) |

## 8. Decisiones que soportan estos atributos

| Atributo                           | Decisión                      | ADR              |
| :--------------------------------- | :---------------------------- | :--------------- |
| Modificabilidad / despliegue       | Astro SSR en Vercel           | ADR-001          |
| Disponibilidad de datos            | PostgreSQL en la nube         | ADR-002          |
| Escalabilidad de sesión            | JWT sin sesiones en BD        | ADR-003          |
| Resiliencia climática              | Doble fuente SIATA/Open-Meteo | ADR-004, ADR-007 |
| Baja fricción de importación       | CSV sin credenciales Google   | ADR-005          |
| Recuperación sin proveedor externo | bcrypt + código de 6 dígitos  | ADR-006          |

## 9. Trazabilidad

| Escenario | Código                             | Documento relacionado               | Verificación                    |
| :-------- | :--------------------------------- | :---------------------------------- | :------------------------------ |
| QP-02/03  | `trips-diagnosis.ts`               | [CAMERA-ML](./CAMERA-ML.md)         | `time curl …`                   |
| QP-04     | `readings.ts`                      | [DATA-FLOW](./DATA-FLOW.md)         | Contar filas antes/después      |
| QS-01/02  | `middleware.ts`, `authz.ts`        | [SECURITY](./SECURITY.md)           | Casos AT-01…AT-08               |
| QA-04/05  | `notifications.ts`, `aqi.ts`       | [ERROR-CATALOG](./ERROR-CATALOG.md) | Simular fallo                   |
| QM-02     | `badges.ts`, `alerts.ts`, `csv.ts` | [DOMAIN-MODEL](./DOMAIN-MODEL.md)   | Cambiar umbral y validar badges |
| QV-*      | Ausencia de tests                  | [TESTING](./TESTING.md)             | `find . -name '*.test.*'`       |
