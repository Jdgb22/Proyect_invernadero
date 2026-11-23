# Índice de Documentación — Macollo

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-00**.

Este índice es la **puerta de entrada canónica** de la documentación. Fija el identificador estable `DOC-NN` de cada documento, su audiencia y su lugar en el documento unificado. Las reglas de numeración y verificación están en [DOC-CONVENTIONS](./DOC-CONVENTIONS.md) (DOC-43); las conexiones formales entre requisitos, código y pruebas están en [TRACEABILITY-MATRIX](./TRACEABILITY-MATRIX.md) (DOC-42).

## 1. Entregable unificado

| Artefacto             | Ruta                                                                                     | Uso                                                                            |
| :-------------------- | :--------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| Fuente Markdown       | [`MACOLLO-DOCUMENTACION-UNIFICADA.md`](./UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md)     | Revisión y diff del contenido íntegro.                                         |
| Documento editable    | [`Macollo-Documentacion-Unificada.docx`](./UNIFIED/Macollo-Documentacion-Unificada.docx) | Ajustes de estilo antes de regenerar.                                          |
| **PDF final**         | [`Macollo-Documentacion-Unificada.pdf`](./UNIFIED/Macollo-Documentacion-Unificada.pdf)   | **Entregable formal**: toda la documentación, conectada por IDs y referencias. |
| Orden canónico        | [`manifest.json`](./UNIFIED/manifest.json)                                               | Decide qué documentos entran y en qué orden.                                   |
| Generador             | el generador de documentación (no incluido en el entregable final)                       | Regenera los tres artefactos, incrusta las capturas y valida cobertura.        |
| Generador de capturas | el generador de capturas (no incluido en el entregable final)                            | Genera las imágenes reales con Playwright y `docs/CAPTURAS.md`.                |
| Evidencia visual      | [`docs/capturas/`](./capturas/)                                                          | CAP-01…CAP-08 (JPEG, escritorio y móvil); no incluye `/admin`.                 |

> El PDF es un artefacto derivado: no se edita a mano. Para cambiarlo, se edita un documento fuente, se actualiza este índice si procede y se ejecuta el proceso de unificación (generador no incluido).

## 2. Parte I. Gobierno y puerta de entrada

| ID     | Documento                                         | Para quién             | Qué contiene                                                                       |
| :----- | :------------------------------------------------ | :--------------------- | :--------------------------------------------------------------------------------- |
| DOC-00 | [Índice de documentación](./README.md)            | Todos                  | Mapa canónico, IDs, artefactos unificados y reglas de navegación.                  |
| DOC-01 | [README raíz](../README.md)                       | Todos                  | Qué es Macollo, stack, instalación, comandos, módulos y troubleshooting rápido.    |
| DOC-02 | [Arquitectura (resumen raíz)](../ARCHITECTURE.md) | Todos                  | Resumen puente hacia el documento canónico de arquitectura.                        |
| DOC-03 | [Arquitectura del sistema](./ARCHITECTURE.md)     | Devs / evaluadores     | Estructura `src/`, flujos, decisiones y modelo de datos.                           |
| DOC-30 | [Resumen ejecutivo](./EXECUTIVE-SUMMARY.md)       | Dirección / evaluación | Producto, alcance real, riesgos, estado de calidad y deriva corregida.             |
| DOC-43 | [Convenciones documentales](./DOC-CONVENTIONS.md) | Equipo                 | IDs, plantilla, jerarquía, correcciones de deriva y proceso de generación del PDF. |

## 3. Parte II. Contexto, dominio y producto

| ID     | Documento                                               | Para quién              | Qué contiene                                                           |
| :----- | :------------------------------------------------------ | :---------------------- | :--------------------------------------------------------------------- |
| DOC-31 | [Contexto y fronteras del sistema](./SYSTEM-CONTEXT.md) | Analistas / evaluadores | Actores, sistemas externos, entradas/salidas y supuestos verificables. |
| DOC-32 | [Modelo de dominio](./DOMAIN-MODEL.md)                  | Devs / analistas        | Entidades, semáforo, umbrales, multi-finca y reglas de negocio.        |
| DOC-04 | [Requisitos (SRS)](./REQUIREMENTS.md)                   | Académico / PO          | RF-01…27, RNF-01…11, restricciones y criterios de aceptación.          |
| DOC-05 | [Casos de uso](./USE_CASES.md)                          | Académico / analista    | CU-001…CU-007 con actores, flujos y postcondiciones.                   |
| DOC-06 | [Historias de usuario](./USER_STORIES.md)               | Académico / PO          | US-001…US-011 por rol.                                                 |
| DOC-07 | [Diagramas UML](./UML.md)                               | Académico / devs        | Clases, componentes, despliegue y estados en Mermaid.                  |
| DOC-08 | [Diagramas de secuencia](./SEQUENCE_DIAGRAMS.md)        | Académico / devs        | SD-001…SD-004 en Mermaid.                                              |
| DOC-09 | [Diagramas de actividad](./ACTIVITIES.md)               | Académico / devs        | AD-001…AD-004 en Mermaid.                                              |
| DOC-10 | [Manual de usuario](./USER_MANUAL.md)                   | Usuarios finales        | Registro, matriz 4×5, métricas, historial, fincas, galería y settings. |
| DOC-45 | [FAQ](./FAQ.md)                                         | Usuarios / soporte      | Preguntas frecuentes con respuestas verificadas contra el código.      |

## 4. Parte III. Arquitectura de ejecución e integraciones

| ID     | Documento                                    | Para quién                | Qué contiene                                                                      |
| :----- | :------------------------------------------- | :------------------------ | :-------------------------------------------------------------------------------- |
| DOC-11 | [Rutas de página](./ROUTES.md)               | Devs                      | Rutas de página reales, protección por middleware y alias.                        |
| DOC-47 | [Landing pública](./LANDING.md)              | Marketing / devs / DevOps | Ruta `/landing`, contenido, diseño, enlaces y validación de la landing.           |
| DOC-12 | [Endpoints](./ENDPOINTS.md)                  | Devs / integraciones      | 29 rutas API propias, 42 operaciones HTTP, bodies, códigos y `curl`.              |
| DOC-13 | [Autenticación y autorización](./AUTH.md)    | Devs / seguridad          | Roles, JWT, bcrypt, rate limits, permisos y recuperación.                         |
| DOC-24 | [Política de seguridad](./SECURITY.md)       | Devs / seguridad          | Secretos, cabeceras, riesgos SEC-01…21 y reporte de incidentes.                   |
| DOC-26 | [Cámara y ML](./CAMERA-ML.md)                | Devs / ML                 | Proxy de trips, cámara nativa, inferencia directa y despliegue de la API externa. |
| DOC-27 | [Componentes frontend](./COMPONENTS.md)      | Devs / frontend           | Inventario real de 12 componentes, props, estado, eventos y rutas.                |
| DOC-14 | [Base de datos](./DATABASE.md)               | Devs / DBA                | Esquemas auth + agronómico, ER de 10 tablas, upsert y auditoría SQL.              |
| DOC-15 | [Diccionario de datos](./DATA-DICTIONARY.md) | Devs / campo              | `MetricRecord`, columnas CSV, spec Excel, mapeo a PostgreSQL.                     |
| DOC-21 | [Protocolo de campo](./FIELD-PROTOCOL.md)    | Operarios                 | Cómo llenar la hoja, IDs `T{f}-P{c}` y valores `N/D`.                             |
| DOC-22 | [Datos demo](./DEMO-DATA.md)                 | Todos / QA                | Fixture de 20 plantas y [`sample-readings-demo.csv`](./sample-readings-demo.csv). |
| DOC-33 | [Flujo de datos](./DATA-FLOW.md)             | Devs / analistas          | Extremo a extremo: Sheets/CSV → normalización → PostgreSQL → vistas.              |
| DOC-34 | [Integraciones externas](./INTEGRATIONS.md)  | Devs / operación          | Open-Meteo, WAQI, SIATA, Sheets, SMTP/Twilio y ML con timeouts y fallbacks.       |
| DOC-35 | [Catálogo de errores](./ERROR-CATALOG.md)    | Soporte / devs            | Códigos HTTP, mensajes, causa y acción correctiva.                                |
| DOC-44 | [Migraciones](./MIGRATIONS.md)               | Devs / DBA                | Migraciones 001…003, roles, `responsable` y `sheets_url`.                         |

## 5. Parte IV. Calidad, seguridad y operación

| ID     | Documento                                       | Para quién     | Qué contiene                                                                           |
| :----- | :---------------------------------------------- | :------------- | :------------------------------------------------------------------------------------- |
| DOC-16 | [Despliegue](./DEPLOYMENT.md)                   | DevOps         | Vercel, matriz de 28 variables, `maxDuration: 60`, checklist y rollback.               |
| DOC-17 | [Plan de pruebas](./TESTING.md)                 | QA / devs      | Sin suite automatizada; TEST-01…29 con `curl` y aserciones SQL.                        |
| DOC-18 | [Contribuir](./CONTRIBUTING.md)                 | Equipo         | Ramas, Husky, DoD, ADRs y revisión de PR.                                              |
| DOC-19 | [Troubleshooting](./TROUBLESHOOTING.md)         | Soporte / devs | Runbook por síntoma, consultas SQL y manejo de `401/403/429/500`.                      |
| DOC-20 | [Glosario](./GLOSSARY.md)                       | Todos          | Términos agronómicos y técnicos.                                                       |
| DOC-23 | [Roadmap](./ROADMAP.md)                         | Equipo / PO    | Endurecimiento, agronomía, IoT y automatización de pruebas.                            |
| DOC-25 | [Scripts](./SCRIPTS.md)                         | Devs / campo   | Siembra y migración, servidor LAN, generación del unificado y capturas con Playwright. |
| DOC-28 | [Changelog](./CHANGELOG.md)                     | Todos          | Historial desde `git log` y cambios de esta unificación.                               |
| DOC-36 | [Modelo de amenazas](./THREAT-MODEL.md)         | Seguridad      | R-01…R-10, SSRF, secretos por defecto y superficie de ataque.                          |
| DOC-37 | [Atributos de calidad](./QUALITY-ATTRIBUTES.md) | Arquitectos    | Escenarios QP/QS/QA/QM/QU/QV con estímulo y respuesta medible.                         |
| DOC-38 | [Rendimiento](./PERFORMANCE.md)                 | Devs / DevOps  | Presupuestos, cold start, timeouts reales y cuellos de botella.                        |
| DOC-39 | [Accesibilidad](./ACCESSIBILITY.md)             | Devs / diseño  | Estado observable del marcado, brechas y prueba con usuarios pendiente.                |
| DOC-40 | [Runbook de operación](./OPERATIONS-RUNBOOK.md) | Soporte / SRE  | Incidentes, galería efímera, backups y registro de postmortem.                         |
| DOC-41 | [Onboarding](./ONBOARDING.md)                   | Nuevos devs    | Alta en 30/60/90 días, entorno, primeras tareas y checklist.                           |

## 6. Parte V. Cierre y trazabilidad

| ID     | Documento                                          | Para quién      | Qué contiene                                                             |
| :----- | :------------------------------------------------- | :-------------- | :----------------------------------------------------------------------- |
| DOC-42 | [Matriz de trazabilidad](./TRACEABILITY-MATRIX.md) | Todos los roles | RF/CU/US → código → endpoint → prueba → documento; trazabilidad inversa. |

## 7. Parte VI. Anexo visual

| ID     | Documento                             | Para quién         | Qué contiene                                                                                                |
| :----- | :------------------------------------ | :----------------- | :---------------------------------------------------------------------------------------------------------- |
| DOC-46 | [Capturas verificadas](./CAPTURAS.md) | Todos / evaluación | CAP-01…CAP-08: pantallas reales tomadas con Playwright, incrustadas en el PDF; sin Astro Admin ni `/admin`. |

## 8. Apéndice A. Decisiones arquitectónicas

| ID                                                   | Decisión                                   | Estado                            |
| :--------------------------------------------------- | :----------------------------------------- | :-------------------------------- |
| [ADR-001](./decisions/ADR-001-astro-ssr-vercel.md)   | Astro SSR desplegado en Vercel             | Aceptada; límite corregido a 60 s |
| [ADR-002](./decisions/ADR-002-postgres-cloud.md)     | PostgreSQL en la nube                      | Aceptada                          |
| [ADR-003](./decisions/ADR-003-authjs-jwt.md)         | Auth.js con sesión JWT y rol               | Aceptada; roles corregidos        |
| [ADR-004](./decisions/ADR-004-proxy-siata-dual.md)   | Proxy `/api/siata` y estrategia dual       | Parcialmente superada por ADR-007 |
| [ADR-005](./decisions/ADR-005-sheets-csv.md)         | Google Sheets vía CSV público              | Aceptada                          |
| [ADR-006](./decisions/ADR-006-bcrypt-recovery.md)    | bcrypt y recuperación por código           | Aceptada                          |
| [ADR-007](./decisions/ADR-007-bypass-siata.md)       | Bypass temporal de SIATA                   | Aceptada                          |
| [ADR-008](./decisions/ADR-008-landing-subdominio.md) | Landing en `/landing`; subdominio diferido | Aceptada                          |

## 9. Convenciones rápidas

- Los nombres de rol global son exactamente `Superadmin`, `Admin`, `Agropecuario`, `Campesino`.
- Los roles de finca son `dueno` y `miembro`; el acceso efectivo incluye `staff`.
- Las unidades de la matriz son `T0`…`T3` × `Col 1`…`Col 5`; los IDs de planta son `T{f}-P{c}` / `P-01`…`P-20`.
- Lo no implementado se marca explícitamente; no se describe como existente.
- Una referencia `§Capítulo N · DOC-NN` apunta al capítulo del PDF unificado.
- El directorio `docs/capturas/` contiene 8 JPEG reales (CAP-01…CAP-08) generados con Playwright; no se editan a mano y nunca incluyen `/admin`.
- Las imágenes `![alt](ruta)` se incrustan en el PDF; sus rutas se resuelven desde `docs/UNIFIED/`.
- La landing se sirve en `/landing` en cualquier host (incluido localhost); el dominio de publicación está pendiente de definición (ver [LANDING](./LANDING.md), DOC-47).

## 10. Trazabilidad

| Tema             | Código / configuración                                        | Documento relacionado                                          | Verificación                           |
| :--------------- | :------------------------------------------------------------ | :------------------------------------------------------------- | :------------------------------------- |
| Inventario       | `docs/**/*.md`, `docs/decisions/*.md`                         | [DOC-CONVENTIONS](./DOC-CONVENTIONS.md)                        | Cobertura validada por `manifest.json` |
| Unificación      | el generador de documentación (no incluido)                   | [PDF unificado](./UNIFIED/Macollo-Documentacion-Unificada.pdf) | `pdfinfo` y regeneración reproducible  |
| Evidencia visual | el generador de capturas (no incluido), `docs/capturas/*.jpg` | [CAPTURAS](./CAPTURAS.md)                                      | CAP-01…CAP-08 presentes en el PDF      |
| Conexión formal  | RF/CU/US/CU/TEST-NN                                           | [TRACEABILITY-MATRIX](./TRACEABILITY-MATRIX.md)                | Revisión por release                   |
| Deriva           | `git log`, `src/`                                             | [CHANGELOG](./CHANGELOG.md)                                    | Tabla §5 de DOC-43                     |
