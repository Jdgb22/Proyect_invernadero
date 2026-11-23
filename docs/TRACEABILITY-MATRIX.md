# Matriz de Trazabilidad Requisito → Diseño → Código → Verificación

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-42**.

## 1. Propósito

Conectar formalmente los requisitos ([REQUIREMENTS](./REQUIREMENTS.md)), los casos de uso ([USE_CASES](./USE_CASES.md)), las historias ([USER_STORIES](./USER_STORIES.md)), los diagramas ([UML](./UML.md), [SEQUENCE_DIAGRAMS](./SEQUENCE_DIAGRAMS.md), [ACTIVITIES](./ACTIVITIES.md)), el código y la verificación ([TESTING](./TESTING.md)). Es el eje de la documentación unificada: cualquier cambio funcional debe reflejarse aquí.

> **Corrección de estado 2026-11-23:** la SRS v1.0 marcaba RF-20/RF-21/RF-22 como futuros y declaraba "multi-invernadero" fuera de alcance. El código actual ya persiste lecturas (RF-21 parcial), implementa multi-finca (RF-23), alertas umbraladas en cliente (RF-20 parcial) y galería/IA (RF-25, RF-26, nuevos). La tabla siguiente refleja el estado **real**, no el histórico.

## 2. Matriz de requisitos funcionales

| RF    | Capacidad                      | CU / US         | Código (evidencia)                                            | Endpoint / ruta                                | Verificación  | Documento                               |
| :---- | :----------------------------- | :-------------- | :------------------------------------------------------------ | :--------------------------------------------- | :------------ | :-------------------------------------- |
| RF-01 | Registro con rol elegible      | CU-001          | `api/auth/register.ts`, Zod                                   | `POST /api/auth/register`                      | TEST-01       | [AUTH](./AUTH.md)                       |
| RF-02 | Login email/celular + bcrypt   | CU-001 / US-001 | `auth.config.ts`                                              | `POST /api/auth/callback/credentials`          | TEST-02       | [AUTH](./AUTH.md)                       |
| RF-03 | Google OAuth                   | CU-001 / US-001 | `auth.config.ts`, `@auth/pg-adapter`                          | `/api/auth/callback/google`                    | TEST-03       | [AUTH](./AUTH.md)                       |
| RF-04 | Cierre de sesión               | US-002          | `Navbar.astro`                                                | `POST /api/auth/signout`                       | TEST-04       | [ROUTES](./ROUTES.md)                   |
| RF-05 | Recuperación 6 dígitos/15 min  | CU-007 / US-009 | `forgot-password.ts`, `reset-password.ts`, `notifications.ts` | `/api/auth/forgot-password`, `/reset-password` | TEST-05       | [AUTH](./AUTH.md)                       |
| RF-06 | Matriz 4×5 + semáforo          | CU-002 / US-003 | `Dashboard.astro`, `plantMatrix.ts`, `badges.ts`              | `/`                                            | TEST-06/07    | [COMPONENTS](./COMPONENTS.md)           |
| RF-07 | Modal de detalle de planta     | CU-003 / US-003 | `Dashboard.astro`, `Metrics.astro`                            | `/`, `/metrics`                                | TEST-07       | [DOMAIN-MODEL](./DOMAIN-MODEL.md)       |
| RF-08 | Escena 3D sol/luna             | CU-003 / US-005 | `Dashboard.astro` (Three.js)                                  | `/`                                            | Manual visual | [COMPONENTS](./COMPONENTS.md)           |
| RF-09 | Clima + AQI + geolocalización  | CU-002 / US-010 | `Dashboard.astro`, `weather.ts`, `aqi.ts`                     | `/api/weather`, `/api/aqi`                     | TEST-08       | [INTEGRATIONS](./INTEGRATIONS.md)       |
| RF-10 | Métricas y gráficos            | CU-002 / US-004 | `Metrics.astro`                                               | `/metrics`                                     | TEST-09       | [DATA-DICTIONARY](./DATA-DICTIONARY.md) |
| RF-11 | Historial por fecha            | CU-002 / US-008 | `History.astro`, `readings.ts`                                | `/history`                                     | TEST-10       | [USER_MANUAL](./USER_MANUAL.md)         |
| RF-12 | Importación local XLSX/CSV     | —               | `History.astro`, `csv.ts`, `recordsParser.ts`                 | `/api/farms/:id/readings`                      | TEST-11       | [FIELD-PROTOCOL](./FIELD-PROTOCOL.md)   |
| RF-13 | Google Sheets → lecturas       | CU-006 / US-011 | `sync-sheets.ts`, `sheetsSync.ts`, `recordsParser.ts`         | `POST /api/sync-sheets`                        | TEST-12       | [DATA-FLOW](./DATA-FLOW.md)             |
| RF-14 | Exportación XLSX 3 hojas / CSV | CU-005 / US-007 | `excelExport.ts`, `csvExport.ts`                              | `/api/export-excel`, `/api/export-csv`         | TEST-13       | [DATA-DICTIONARY](./DATA-DICTIONARY.md) |
| RF-15 | Perfil (nombre/avatar)         | —               | `users/me.ts`, `profile.ts`, `Settings.astro`                 | `PATCH /api/users/me`                          | TEST-14       | [ENDPOINTS](./ENDPOINTS.md)             |
| RF-16 | Tema claro/oscuro/auto         | —               | `preferences.ts`                                              | `/settings`                                    | Manual        | [DOMAIN-MODEL](./DOMAIN-MODEL.md)       |
| RF-17 | Frecuencia de sincronización   | —               | `preferences.ts:91-100`                                       | `/settings`                                    | Manual        | [PERFORMANCE](./PERFORMANCE.md)         |
| RF-18 | Toasts Sileo                   | —               | `SileoProvider.tsx`, `alerts.ts`                              | Global                                         | Manual        | [COMPONENTS](./COMPONENTS.md)           |
| RF-19 | Roles JWT + panel admin        | CU-001          | `auth.config.ts`, `authz.ts`, `admin/users/`                  | `/admin`, `/api/admin/*`                       | TEST-15       | [AUTH](./AUTH.md)                       |
| RF-20 | Alertas umbraladas             | CU-004          | `alerts.ts`, `preferences.ts`                                 | Cliente (`sileo`)                              | Manual        | [DOMAIN-MODEL](./DOMAIN-MODEL.md)       |
| RF-21 | Persistencia Sheets→PG         | —               | `readings.ts`, `lecturas`                                     | Implícito en todas las vistas                  | TEST-12 + SQL | [DATABASE](./DATABASE.md)               |
| RF-22 | Ingesta IoT                    | —               | **No implementado**                                           | —                                              | —             | [ROADMAP](./ROADMAP.md)                 |
| RF-23 | Multi-finca e invitaciones     | CU-005          | `farms.ts`, `farms/`, `invitations/`                          | `/farms`, `/admin`, `/invite/:code`            | TEST-16       | [DATABASE](./DATABASE.md)               |
| RF-24 | Inicio por rol                 | CU-001          | `index.astro`, `middleware.ts`                                | `/`, `/admin`                                  | TEST-17       | [ROUTES](./ROUTES.md)                   |
| RF-25 | Galería de fotos por finca     | —               | `gallery/upload.ts`, `gallery/[id]/file.ts`, `photos`         | `/gallery`, `/gallery/[id]`                    | TEST-18       | [COMPONENTS](./COMPONENTS.md)           |
| RF-26 | Diagnóstico de trips con IA    | —               | `trips-diagnosis.ts`, `TripsDiagnosticModal.astro`            | `POST /api/trips-diagnosis`                    | TEST-19       | [CAMERA-ML](./CAMERA-ML.md)             |
| RF-27 | Resumen semanal por correo     | —               | `weekly-summary.ts`, `notifications.ts`                       | `POST /api/notifications/weekly-summary`       | TEST-20       | [ENDPOINTS](./ENDPOINTS.md)             |

## 3. Matriz de requisitos no funcionales

| RNF    | Categoría      | Evidencia en código                                           | Estado                      | Verificación              | Documento                               |
| :----- | :------------- | :------------------------------------------------------------ | :-------------------------- | :------------------------ | :-------------------------------------- |
| RNF-01 | Rendimiento    | SSR + `maxDuration:60`; sin medición de LCP                   | Parcial                     | Lighthouse pendiente      | [PERFORMANCE](./PERFORMANCE.md)         |
| RNF-02 | Rendimiento    | Timeout SIATA 3 s                                             | Implementado                | `curl -w`                 | [INTEGRATIONS](./INTEGRATIONS.md)       |
| RNF-03 | Seguridad      | bcrypt; secretos por defecto en `trips-diagnosis.ts`/`aqi.ts` | **Incumplido parcialmente** | R-01/R-02                 | [THREAT-MODEL](./THREAT-MODEL.md)       |
| RNF-04 | Seguridad      | `PROTECTED_PAGES`/`PROTECTED_API_PREFIXES`                    | Implementado                | AT-01                     | [SECURITY](./SECURITY.md)               |
| RNF-05 | Disponibilidad | Fallbacks de clima/AQI; persistencia tolerante                | Parcial                     | Simular fallos            | [ERROR-CATALOG](./ERROR-CATALOG.md)     |
| RNF-06 | Usabilidad     | Diseño responsive; sin prueba con usuarios                    | Parcial                     | Prueba de campo pendiente | [ACCESSIBILITY](./ACCESSIBILITY.md)     |
| RNF-07 | Portabilidad   | CSS moderno + Three.js; sin matriz de navegadores             | No verificado               | Matriz pendiente          | [TESTING](./TESTING.md)                 |
| RNF-08 | Mantenibilidad | 7 ADR + esta documentación verificada                         | Implementado                | Generador unificado       | [DOC-CONVENTIONS](./DOC-CONVENTIONS.md) |
| RNF-09 | Privacidad     | Respuestas enmascaradas en forgot-password                    | Implementado                | TEST-05                   | [AUTH](./AUTH.md)                       |
| RNF-10 | Datos          | Umbrales en `badges.ts`/`csv.ts`; sin tests                   | Parcial                     | Importar fixture          | [DOMAIN-MODEL](./DOMAIN-MODEL.md)       |
| RNF-11 | Trazabilidad   | Esta matriz                                                   | Implementado                | Revisión por release      | [DOC-CONVENTIONS](./DOC-CONVENTIONS.md) |

## 4. Trazabilidad de diseño

| Artefacto              | Identificadores   | Cubre                                                                       | Documento                                          |
| :--------------------- | :---------------- | :-------------------------------------------------------------------------- | :------------------------------------------------- |
| Casos de uso           | CU-001…CU-007     | Acceso, tablero, detalle, alertas, exportación, Sheets, recuperación        | [USE_CASES](./USE_CASES.md)                        |
| Historias de usuario   | US-001…US-011     | Roles y capacidades por actor                                               | [USER_STORIES](./USER_STORIES.md)                  |
| Diagramas de secuencia | SD-001…SD-004     | Login, importación, exportación, invitación                                 | [SEQUENCE_DIAGRAMS](./SEQUENCE_DIAGRAMS.md)        |
| Diagramas de actividad | AD-001…AD-004     | Registro, sincronización, diagnóstico, permisos                             | [ACTIVITIES](./ACTIVITIES.md)                      |
| Diagrama de clases     | Modelo de dominio | Entidades y relaciones                                                      | [UML](./UML.md)                                    |
| Diagrama ER            | 10 tablas         | Persistencia                                                                | [DATABASE](./DATABASE.md)                          |
| Decisiones             | ADR-001…ADR-008   | Stack, BD, auth, clima, Sheets, recuperación, bypass, landing en `/landing` | [decisions](./decisions/), [LANDING](./LANDING.md) |

## 5. Trazabilidad de la evidencia visual

Las capturas CAP-01…CAP-08 (DOC-46) se generan con el generador de capturas (no incluido) y se incrustan en el PDF. Ninguna corresponde a `/admin` ni a Astro Admin.

| Captura | Pantalla                     | Ruta        | Código / componente                              | Verificación                        |
| :------ | :--------------------------- | :---------- | :----------------------------------------------- | :---------------------------------- |
| CAP-01  | Portada pública y acceso     | `/`         | `Welcome.astro`, `auth.config.ts`                | TEST-01/02                          |
| CAP-02  | Dashboard principal          | `/`         | `Dashboard.astro`, `plantMatrix.ts`, `badges.ts` | TEST-06/07                          |
| CAP-03  | Métricas agronómicas         | `/metrics`  | `Metrics.astro`                                  | TEST-09                             |
| CAP-04  | Historial de lecturas        | `/history`  | `History.astro`, `readings.ts`                   | TEST-10/11/13                       |
| CAP-05  | Galería por finca            | `/gallery`  | `Gallery.astro`, `gallery/upload.ts`             | TEST-18                             |
| CAP-06  | Gestión de fincas            | `/farms`    | `farms/index.astro`, `farms.ts`                  | TEST-16                             |
| CAP-07  | Configuración                | `/settings` | `Settings.astro`, `preferences.ts`               | TEST-14                             |
| CAP-08  | Dashboard en móvil (390×844) | `/`         | `Dashboard.astro`, `Layout.astro`                | Revisión responsive; RNF-06 parcial |

## 6. Reglas de actualización

1. Toda historia de usuario nueva debe tener al menos un RF y un caso de prueba.
2. Todo endpoint nuevo debe aparecer en [ROUTES](./ROUTES.md), [ENDPOINTS](./ENDPOINTS.md) y en esta matriz si implementa un RF.
3. Toda columna nueva debe aparecer en [DATABASE](./DATABASE.md), [DATA-DICTIONARY](./DATA-DICTIONARY.md) y en la migración correspondiente.
4. Todo cambio de umbral debe actualizarse en [DOMAIN-MODEL](./DOMAIN-MODEL.md), [DATA-DICTIONARY](./DATA-DICTIONARY.md) y el código.
5. Si un requisito cambia de estado, se actualiza la SRS y esta matriz en el mismo PR (ver [CONTRIBUTING](./CONTRIBUTING.md)).
6. Si cambia una pantalla capturada, se regenera con Playwright y se actualiza DOC-46.
7. La documentación unificada se regenera con el proceso de unificación (generador no incluido) antes de cada release.

## 7. Trazabilidad inversa (código → documentos)

| Archivo de código                           | Documentos que debe actualizar                                                                      |
| :------------------------------------------ | :-------------------------------------------------------------------------------------------------- |
| `astro.config.mjs`                          | [ARCHITECTURE](./ARCHITECTURE.md), [DEPLOYMENT](./DEPLOYMENT.md), [PERFORMANCE](./PERFORMANCE.md)   |
| `auth.config.ts`                            | [AUTH](./AUTH.md), [SECURITY](./SECURITY.md), [DATABASE](./DATABASE.md)                             |
| `src/middleware.ts`                         | [ROUTES](./ROUTES.md), [SECURITY](./SECURITY.md), [ERROR-CATALOG](./ERROR-CATALOG.md)               |
| `src/backend/services/*`                    | [ARCHITECTURE](./ARCHITECTURE.md), [DATA-FLOW](./DATA-FLOW.md), [INTEGRATIONS](./INTEGRATIONS.md)   |
| `src/pages/api/*`                           | [ENDPOINTS](./ENDPOINTS.md), [ROUTES](./ROUTES.md), [ERROR-CATALOG](./ERROR-CATALOG.md)             |
| `src/db/*.sql` y `migrations/*`             | [DATABASE](./DATABASE.md), [DATA-DICTIONARY](./DATA-DICTIONARY.md), [MIGRATIONS](./MIGRATIONS.md)   |
| `src/shared/*`                              | [DOMAIN-MODEL](./DOMAIN-MODEL.md), [DATA-FLOW](./DATA-FLOW.md)                                      |
| `src/frontend/components/*`                 | [COMPONENTS](./COMPONENTS.md), [ACCESSIBILITY](./ACCESSIBILITY.md), [USER_MANUAL](./USER_MANUAL.md) |
| el generador de capturas (no incluido)      | [CAPTURAS](./CAPTURAS.md), [SCRIPTS](./SCRIPTS.md), [ROUTES](./ROUTES.md)                           |
| el generador de documentación (no incluido) | [README](./README.md), [DOC-CONVENTIONS](./DOC-CONVENTIONS.md), PDF unificado                       |
| `scripts/*`                                 | [SCRIPTS](./SCRIPTS.md), [OPERATIONS-RUNBOOK](./OPERATIONS-RUNBOOK.md)                              |
| `docs/*`                                    | [README](./README.md), esta matriz, documento unificado                                             |

## 8. Trazabilidad

| Elemento         | Código                                                   | Documento relacionado                                          | Verificación                                |
| :--------------- | :------------------------------------------------------- | :------------------------------------------------------------- | :------------------------------------------ |
| RF               | `src/pages/`, `src/backend/`                             | [REQUIREMENTS](./REQUIREMENTS.md)                              | Tabla §2                                    |
| CU/US            | Sin código directo                                       | [USE_CASES](./USE_CASES.md), [USER_STORIES](./USER_STORIES.md) | Tabla §4                                    |
| Pruebas          | Sin suite automatizada                                   | [TESTING](./TESTING.md)                                        | Casos TEST-01…20                            |
| Documentación    | `docs/`                                                  | [DOC-CONVENTIONS](./DOC-CONVENTIONS.md)                        | el generador de documentación (no incluido) |
| Evidencia visual | el generador de capturas (no incluido), `docs/capturas/` | [CAPTURAS](./CAPTURAS.md)                                      | CAP-01…CAP-08 en el PDF                     |
