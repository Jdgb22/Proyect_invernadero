# Documentación Unificada de Macollo

**Identificador:** DOC-29 · **Versión:** 1.1 · **Fecha:** 2026-11-23

**Estado:** documento derivado, generado desde `docs/UNIFIED/manifest.json`.

> No editar este archivo a mano: se regenera con `python3 scripts/build-unified-docs.py`.

---

## Prólogo

Este volumen reúne la documentación técnica, académica, operativa y de usuario de Macollo en un solo documento formal. Cada capítulo conserva su identificador `DOC-NN`, sus enlaces se han convertido en referencias numeradas y sus afirmaciones están conectadas con el código, los requisitos, las decisiones y la verificación. El eje de conexión es la [Matriz de Trazabilidad] (Capítulo 46 · DOC-42).

## Regla de oro

**El código manda; la documentación lo sigue.** Cuando una afirmación documental y el código divergen, se corrige el documento y se registra la corrección en `docs/DOC-CONVENTIONS.md` §5.

## Control de versiones

| Versión | Fecha      | Cambio                                                              | Generado por                                                        |
| :------ | :--------- | :------------------------------------------------------------------ | :------------------------------------------------------------------ |
| 1.0     | 2026-11-23 | Unificación formal de 47 documentos y 8 ADR                         | `scripts/build-unified-docs.py`                                     |
| 1.1     | 2026-11-23 | Anexo visual DOC-46: 8 capturas CAP-01…CAP-08 incrustadas en el PDF | `scripts/capture-screenshots.mjs` + `scripts/build-unified-docs.py` |

## Cómo leer este documento

1. Empezar por el **Resumen ejecutivo** y el **Contexto del sistema** para entender el producto.
2. Usar los capítulos de **Arquitectura de ejecución** para implementar o auditar código.
3. Consultar **Calidad, seguridad y operación** para desplegar, probar y responder incidentes.
4. Cerrar con la **Matriz de trazabilidad** y los **ADR** para justificar cada decisión.
5. Usar el **Anexo visual** (DOC-46) para contrastar la interfaz real con lo descrito; las capturas CAP-01…CAP-08 se generan con Playwright y no incluyen `/admin`.
6. Toda referencia `§Capítulo N · DOC-NN` apunta a un capítulo de este volumen.

## Mapa documental e índice general

### Parte I. Gobierno y puerta de entrada

| Referencia | ID     | Documento                                                        |
| :--------- | :----- | :--------------------------------------------------------------- |
| Capítulo 1 | DOC-00 | Índice de Documentación - Macollo                                |
| Capítulo 2 | DOC-01 | [MACOLLO] Macollo - Monitoreo Agronómico                         |
| Capítulo 3 | DOC-02 | Arquitectura del Sistema - Macollo                               |
| Capítulo 4 | DOC-03 | Arquitectura del Sistema - Macollo                               |
| Capítulo 5 | DOC-30 | Resumen Ejecutivo del Sistema Macollo                            |
| Capítulo 6 | DOC-43 | Convenciones Documentales y Construcción del Documento Unificado |

### Parte II. Contexto, dominio y producto

| Referencia  | ID     | Documento                                    |
| :---------- | :----- | :------------------------------------------- |
| Capítulo 7  | DOC-31 | Contexto y Fronteras del Sistema             |
| Capítulo 8  | DOC-32 | Modelo de Dominio y Reglas de Negocio        |
| Capítulo 9  | DOC-04 | Especificación de Requisitos (SRS) - Macollo |
| Capítulo 10 | DOC-05 | Casos de Uso                                 |
| Capítulo 11 | DOC-06 | User Stories                                 |
| Capítulo 12 | DOC-07 | Diagramas UML - Macollo                      |
| Capítulo 13 | DOC-08 | Diagramas de Secuencia                       |
| Capítulo 14 | DOC-09 | Diagramas de Actividad                       |
| Capítulo 15 | DOC-10 | 📖 Manual de Usuario - Macollo               |
| Capítulo 16 | DOC-45 | Preguntas Frecuentes (FAQ)                   |

### Parte III. Arquitectura de ejecución e integraciones

| Referencia  | ID     | Documento                                                    |
| :---------- | :----- | :----------------------------------------------------------- |
| Capítulo 17 | DOC-11 | Rutas de página (Routes) de Macollo                          |
| Capítulo 18 | DOC-47 | Landing Pública de Macollo                                   |
| Capítulo 19 | DOC-12 | Endpoints de la API de Macollo                               |
| Capítulo 20 | DOC-13 | Autenticación y Autorización - Macollo                       |
| Capítulo 21 | DOC-24 | Política de Seguridad - Macollo                              |
| Capítulo 22 | DOC-26 | Cámara y Machine Learning - Detección de Trips (BioCLIP 2.5) |
| Capítulo 23 | DOC-27 | Componentes de frontend                                      |
| Capítulo 24 | DOC-14 | Base de datos - PostgreSQL (Macollo)                         |
| Capítulo 25 | DOC-15 | Diccionario de datos - Macollo                               |
| Capítulo 26 | DOC-21 | Protocolo de Campo - Toma de Datos (para operarios)          |
| Capítulo 27 | DOC-22 | Datos Demo - Macollo                                         |
| Capítulo 28 | DOC-33 | Flujo de Datos Extremo a Extremo                             |
| Capítulo 29 | DOC-34 | Integraciones Externas y Contratos                           |
| Capítulo 30 | DOC-35 | Catálogo de Errores y Códigos de Respuesta                   |
| Capítulo 31 | DOC-44 | Migraciones de Esquema y Evolución de la Base de Datos       |

### Parte IV. Calidad, seguridad y operación

| Referencia  | ID     | Documento                                          |
| :---------- | :----- | :------------------------------------------------- |
| Capítulo 32 | DOC-16 | Despliegue y Operación - Macollo                   |
| Capítulo 33 | DOC-17 | Plan de Pruebas - Macollo                          |
| Capítulo 34 | DOC-18 | Contribuir - Macollo                               |
| Capítulo 35 | DOC-19 | Troubleshooting (Runbook) - Macollo                |
| Capítulo 36 | DOC-20 | Glosario - Macollo                                 |
| Capítulo 37 | DOC-23 | Roadmap - Macollo                                  |
| Capítulo 38 | DOC-25 | Scripts de utilidad                                |
| Capítulo 39 | DOC-28 | Changelog - Macollo                                |
| Capítulo 40 | DOC-36 | Modelo de Amenazas y Superficie de Ataque          |
| Capítulo 41 | DOC-37 | Atributos de Calidad y Escenarios Arquitectónicos  |
| Capítulo 42 | DOC-38 | Rendimiento, Límites y Presupuestos                |
| Capítulo 43 | DOC-39 | Accesibilidad e Internacionalización               |
| Capítulo 44 | DOC-40 | Runbook de Operación y Respuesta a Incidentes      |
| Capítulo 45 | DOC-41 | Guía de Incorporación para el Equipo de Desarrollo |

### Parte V. Cierre y trazabilidad

| Referencia  | ID     | Documento                                                            |
| :---------- | :----- | :------------------------------------------------------------------- |
| Capítulo 46 | DOC-42 | Matriz de Trazabilidad Requisito -> Diseño -> Código -> Verificación |

### Parte VI. Anexo visual

| Referencia  | ID     | Documento                                  |
| :---------- | :----- | :----------------------------------------- |
| Capítulo 47 | DOC-46 | Capturas de Pantalla Verificadas - Macollo |

### Apéndice A. Decisiones arquitectónicas

| Referencia   | ID      | Documento                                                                    |
| :----------- | :------ | :--------------------------------------------------------------------------- |
| Apéndice A.1 | ADR-001 | ADR-001: Astro en modo SSR desplegado en Vercel                              |
| Apéndice A.2 | ADR-002 | ADR-002: PostgreSQL en la nube como base de datos                            |
| Apéndice A.3 | ADR-003 | ADR-003: Auth.js (Credentials + Google) con sesión JWT y rol                 |
| Apéndice A.4 | ADR-004 | ADR-004: Proxy interno `/api/siata` + estrategia dual SIATA/Open-Meteo       |
| Apéndice A.5 | ADR-005 | ADR-005: Importación desde Google Sheets vía CSV público (sin API de Google) |
| Apéndice A.6 | ADR-006 | ADR-006: bcrypt + recuperación con código de 6 dígitos (15 min)              |
| Apéndice A.7 | ADR-007 | ADR-007: Bypass temporal de SIATA (Open-Meteo directo + fallback offline)    |
| Apéndice A.8 | ADR-008 | ADR-008: Landing en `/landing` y subdominio diferido                         |

---

# Capítulo 1. Índice de Documentación - Macollo (DOC-00)

**Ruta fuente:** `docs/README.md` · **Parte:** Parte I. Gobierno y puerta de entrada

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-00**.

Este índice es la **puerta de entrada canónica** de la documentación. Fija el identificador estable `DOC-NN` de cada documento, su audiencia y su lugar en el documento unificado. Las reglas de numeración y verificación están en DOC-CONVENTIONS (Capítulo 6 · DOC-43) (DOC-43); las conexiones formales entre requisitos, código y pruebas están en TRACEABILITY-MATRIX (Capítulo 46 · DOC-42) (DOC-42).

## 1. Entregable unificado

| Artefacto             | Ruta                                                                                      | Uso                                                                            |
| :-------------------- | :---------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| Fuente Markdown       | `MACOLLO-DOCUMENTACION-UNIFICADA.md` (`./UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`)     | Revisión y diff del contenido íntegro.                                         |
| Documento editable    | `Macollo-Documentacion-Unificada.docx` (`./UNIFIED/Macollo-Documentacion-Unificada.docx`) | Ajustes de estilo antes de regenerar.                                          |
| **PDF final**         | `Macollo-Documentacion-Unificada.pdf` (`./UNIFIED/Macollo-Documentacion-Unificada.pdf`)   | **Entregable formal**: toda la documentación, conectada por IDs y referencias. |
| Orden canónico        | `manifest.json` (`./UNIFIED/manifest.json`)                                               | Decide qué documentos entran y en qué orden.                                   |
| Generador             | el generador de documentación (no incluido en el entregable final)                        | Regenera los tres artefactos, incrusta las capturas y valida cobertura.        |
| Generador de capturas | el generador de capturas (no incluido en el entregable final)                             | Genera las imágenes reales con Playwright y `docs/CAPTURAS.md`.                |
| Evidencia visual      | `docs/capturas/` (`./capturas/`)                                                          | CAP-01…CAP-08 (JPEG, escritorio y móvil); no incluye `/admin`.                 |

> El PDF es un artefacto derivado: no se edita a mano. Para cambiarlo, se edita un documento fuente, se actualiza este índice si procede y se ejecuta el proceso de unificación (generador no incluido).

## 2. Parte I. Gobierno y puerta de entrada

| ID     | Documento                                         | Para quién             | Qué contiene                                                                       |
| :----- | :------------------------------------------------ | :--------------------- | :--------------------------------------------------------------------------------- |
| DOC-00 | Índice de documentación (Capítulo 1 · DOC-00)     | Todos                  | Mapa canónico, IDs, artefactos unificados y reglas de navegación.                  |
| DOC-01 | README raíz (Capítulo 2 · DOC-01)                 | Todos                  | Qué es Macollo, stack, instalación, comandos, módulos y troubleshooting rápido.    |
| DOC-02 | Arquitectura (resumen raíz) (Capítulo 3 · DOC-02) | Todos                  | Resumen puente hacia el documento canónico de arquitectura.                        |
| DOC-03 | Arquitectura del sistema (Capítulo 4 · DOC-03)    | Devs / evaluadores     | Estructura `src/`, flujos, decisiones y modelo de datos.                           |
| DOC-30 | Resumen ejecutivo (Capítulo 5 · DOC-30)           | Dirección / evaluación | Producto, alcance real, riesgos, estado de calidad y deriva corregida.             |
| DOC-43 | Convenciones documentales (Capítulo 6 · DOC-43)   | Equipo                 | IDs, plantilla, jerarquía, correcciones de deriva y proceso de generación del PDF. |

## 3. Parte II. Contexto, dominio y producto

| ID     | Documento                                              | Para quién              | Qué contiene                                                           |
| :----- | :----------------------------------------------------- | :---------------------- | :--------------------------------------------------------------------- |
| DOC-31 | Contexto y fronteras del sistema (Capítulo 7 · DOC-31) | Analistas / evaluadores | Actores, sistemas externos, entradas/salidas y supuestos verificables. |
| DOC-32 | Modelo de dominio (Capítulo 8 · DOC-32)                | Devs / analistas        | Entidades, semáforo, umbrales, multi-finca y reglas de negocio.        |
| DOC-04 | Requisitos (SRS) (Capítulo 9 · DOC-04)                 | Académico / PO          | RF-01…27, RNF-01…11, restricciones y criterios de aceptación.          |
| DOC-05 | Casos de uso (Capítulo 10 · DOC-05)                    | Académico / analista    | CU-001…CU-007 con actores, flujos y postcondiciones.                   |
| DOC-06 | Historias de usuario (Capítulo 11 · DOC-06)            | Académico / PO          | US-001…US-011 por rol.                                                 |
| DOC-07 | Diagramas UML (Capítulo 12 · DOC-07)                   | Académico / devs        | Clases, componentes, despliegue y estados en Mermaid.                  |
| DOC-08 | Diagramas de secuencia (Capítulo 13 · DOC-08)          | Académico / devs        | SD-001…SD-004 en Mermaid.                                              |
| DOC-09 | Diagramas de actividad (Capítulo 14 · DOC-09)          | Académico / devs        | AD-001…AD-004 en Mermaid.                                              |
| DOC-10 | Manual de usuario (Capítulo 15 · DOC-10)               | Usuarios finales        | Registro, matriz 4×5, métricas, historial, fincas, galería y settings. |
| DOC-45 | FAQ (Capítulo 16 · DOC-45)                             | Usuarios / soporte      | Preguntas frecuentes con respuestas verificadas contra el código.      |

## 4. Parte III. Arquitectura de ejecución e integraciones

| ID     | Documento                                           | Para quién                | Qué contiene                                                                       |
| :----- | :-------------------------------------------------- | :------------------------ | :--------------------------------------------------------------------------------- |
| DOC-11 | Rutas de página (Capítulo 17 · DOC-11)              | Devs                      | Rutas de página reales, protección por middleware y alias.                         |
| DOC-47 | Landing pública (Capítulo 18 · DOC-47)              | Marketing / devs / DevOps | Ruta `/landing`, contenido, diseño, enlaces y validación de la landing.            |
| DOC-12 | Endpoints (Capítulo 19 · DOC-12)                    | Devs / integraciones      | 29 rutas API propias, 42 operaciones HTTP, bodies, códigos y `curl`.               |
| DOC-13 | Autenticación y autorización (Capítulo 20 · DOC-13) | Devs / seguridad          | Roles, JWT, bcrypt, rate limits, permisos y recuperación.                          |
| DOC-24 | Política de seguridad (Capítulo 21 · DOC-24)        | Devs / seguridad          | Secretos, cabeceras, riesgos SEC-01…21 y reporte de incidentes.                    |
| DOC-26 | Cámara y ML (Capítulo 22 · DOC-26)                  | Devs / ML                 | Proxy de trips, cámara nativa, inferencia directa y despliegue de la API externa.  |
| DOC-27 | Componentes frontend (Capítulo 23 · DOC-27)         | Devs / frontend           | Inventario real de 12 componentes, props, estado, eventos y rutas.                 |
| DOC-14 | Base de datos (Capítulo 24 · DOC-14)                | Devs / DBA                | Esquemas auth + agronómico, ER de 10 tablas, upsert y auditoría SQL.               |
| DOC-15 | Diccionario de datos (Capítulo 25 · DOC-15)         | Devs / campo              | `MetricRecord`, columnas CSV, spec Excel, mapeo a PostgreSQL.                      |
| DOC-21 | Protocolo de campo (Capítulo 26 · DOC-21)           | Operarios                 | Cómo llenar la hoja, IDs `T{f}-P{c}` y valores `N/D`.                              |
| DOC-22 | Datos demo (Capítulo 27 · DOC-22)                   | Todos / QA                | Fixture de 20 plantas y `sample-readings-demo.csv` (`./sample-readings-demo.csv`). |
| DOC-33 | Flujo de datos (Capítulo 28 · DOC-33)               | Devs / analistas          | Extremo a extremo: Sheets/CSV → normalización → PostgreSQL → vistas.               |
| DOC-34 | Integraciones externas (Capítulo 29 · DOC-34)       | Devs / operación          | Open-Meteo, WAQI, SIATA, Sheets, SMTP/Twilio y ML con timeouts y fallbacks.        |
| DOC-35 | Catálogo de errores (Capítulo 30 · DOC-35)          | Soporte / devs            | Códigos HTTP, mensajes, causa y acción correctiva.                                 |
| DOC-44 | Migraciones (Capítulo 31 · DOC-44)                  | Devs / DBA                | Migraciones 001…003, roles, `responsable` y `sheets_url`.                          |

## 5. Parte IV. Calidad, seguridad y operación

| ID     | Documento                                   | Para quién     | Qué contiene                                                                           |
| :----- | :------------------------------------------ | :------------- | :------------------------------------------------------------------------------------- |
| DOC-16 | Despliegue (Capítulo 32 · DOC-16)           | DevOps         | Vercel, matriz de 28 variables, `maxDuration: 60`, checklist y rollback.               |
| DOC-17 | Plan de pruebas (Capítulo 33 · DOC-17)      | QA / devs      | Sin suite automatizada; TEST-01…29 con `curl` y aserciones SQL.                        |
| DOC-18 | Contribuir (Capítulo 34 · DOC-18)           | Equipo         | Ramas, Husky, DoD, ADRs y revisión de PR.                                              |
| DOC-19 | Troubleshooting (Capítulo 35 · DOC-19)      | Soporte / devs | Runbook por síntoma, consultas SQL y manejo de `401/403/429/500`.                      |
| DOC-20 | Glosario (Capítulo 36 · DOC-20)             | Todos          | Términos agronómicos y técnicos.                                                       |
| DOC-23 | Roadmap (Capítulo 37 · DOC-23)              | Equipo / PO    | Endurecimiento, agronomía, IoT y automatización de pruebas.                            |
| DOC-25 | Scripts (Capítulo 38 · DOC-25)              | Devs / campo   | Siembra y migración, servidor LAN, generación del unificado y capturas con Playwright. |
| DOC-28 | Changelog (Capítulo 39 · DOC-28)            | Todos          | Historial desde `git log` y cambios de esta unificación.                               |
| DOC-36 | Modelo de amenazas (Capítulo 40 · DOC-36)   | Seguridad      | R-01…R-10, SSRF, secretos por defecto y superficie de ataque.                          |
| DOC-37 | Atributos de calidad (Capítulo 41 · DOC-37) | Arquitectos    | Escenarios QP/QS/QA/QM/QU/QV con estímulo y respuesta medible.                         |
| DOC-38 | Rendimiento (Capítulo 42 · DOC-38)          | Devs / DevOps  | Presupuestos, cold start, timeouts reales y cuellos de botella.                        |
| DOC-39 | Accesibilidad (Capítulo 43 · DOC-39)        | Devs / diseño  | Estado observable del marcado, brechas y prueba con usuarios pendiente.                |
| DOC-40 | Runbook de operación (Capítulo 44 · DOC-40) | Soporte / SRE  | Incidentes, galería efímera, backups y registro de postmortem.                         |
| DOC-41 | Onboarding (Capítulo 45 · DOC-41)           | Nuevos devs    | Alta en 30/60/90 días, entorno, primeras tareas y checklist.                           |

## 6. Parte V. Cierre y trazabilidad

| ID     | Documento                                     | Para quién      | Qué contiene                                                             |
| :----- | :-------------------------------------------- | :-------------- | :----------------------------------------------------------------------- |
| DOC-42 | Matriz de trazabilidad (Capítulo 46 · DOC-42) | Todos los roles | RF/CU/US → código → endpoint → prueba → documento; trazabilidad inversa. |

## 7. Parte VI. Anexo visual

| ID     | Documento                                   | Para quién         | Qué contiene                                                                                                |
| :----- | :------------------------------------------ | :----------------- | :---------------------------------------------------------------------------------------------------------- |
| DOC-46 | Capturas verificadas (Capítulo 47 · DOC-46) | Todos / evaluación | CAP-01…CAP-08: pantallas reales tomadas con Playwright, incrustadas en el PDF; sin Astro Admin ni `/admin`. |

## 8. Apéndice A. Decisiones arquitectónicas

| ID                               | Decisión                                   | Estado                            |
| :------------------------------- | :----------------------------------------- | :-------------------------------- |
| ADR-001 (Apéndice A.1 · ADR-001) | Astro SSR desplegado en Vercel             | Aceptada; límite corregido a 60 s |
| ADR-002 (Apéndice A.2 · ADR-002) | PostgreSQL en la nube                      | Aceptada                          |
| ADR-003 (Apéndice A.3 · ADR-003) | Auth.js con sesión JWT y rol               | Aceptada; roles corregidos        |
| ADR-004 (Apéndice A.4 · ADR-004) | Proxy `/api/siata` y estrategia dual       | Parcialmente superada por ADR-007 |
| ADR-005 (Apéndice A.5 · ADR-005) | Google Sheets vía CSV público              | Aceptada                          |
| ADR-006 (Apéndice A.6 · ADR-006) | bcrypt y recuperación por código           | Aceptada                          |
| ADR-007 (Apéndice A.7 · ADR-007) | Bypass temporal de SIATA                   | Aceptada                          |
| ADR-008 (Apéndice A.8 · ADR-008) | Landing en `/landing`; subdominio diferido | Aceptada                          |

## 9. Convenciones rápidas

- Los nombres de rol global son exactamente `Superadmin`, `Admin`, `Agropecuario`, `Campesino`.
- Los roles de finca son `dueno` y `miembro`; el acceso efectivo incluye `staff`.
- Las unidades de la matriz son `T0`…`T3` × `Col 1`…`Col 5`; los IDs de planta son `T{f}-P{c}` / `P-01`…`P-20`.
- Lo no implementado se marca explícitamente; no se describe como existente.
- Una referencia `§Capítulo N · DOC-NN` apunta al capítulo del PDF unificado.
- El directorio `docs/capturas/` contiene 8 JPEG reales (CAP-01…CAP-08) generados con Playwright; no se editan a mano y nunca incluyen `/admin`.
- Las imágenes `![alt](ruta)` se incrustan en el PDF; sus rutas se resuelven desde `docs/UNIFIED/`.
- La landing se sirve en `/landing` en cualquier host (incluido localhost); el dominio de publicación está pendiente de definición (ver LANDING (Capítulo 18 · DOC-47), DOC-47).

## 10. Trazabilidad

| Tema             | Código / configuración                                        | Documento relacionado                                           | Verificación                           |
| :--------------- | :------------------------------------------------------------ | :-------------------------------------------------------------- | :------------------------------------- |
| Inventario       | `docs/**/*.md`, `docs/decisions/*.md`                         | DOC-CONVENTIONS (Capítulo 6 · DOC-43)                           | Cobertura validada por `manifest.json` |
| Unificación      | el generador de documentación (no incluido)                   | PDF unificado (`./UNIFIED/Macollo-Documentacion-Unificada.pdf`) | `pdfinfo` y regeneración reproducible  |
| Evidencia visual | el generador de capturas (no incluido), `docs/capturas/*.jpg` | CAPTURAS (Capítulo 47 · DOC-46)                                 | CAP-01…CAP-08 presentes en el PDF      |
| Conexión formal  | RF/CU/US/CU/TEST-NN                                           | TRACEABILITY-MATRIX (Capítulo 46 · DOC-42)                      | Revisión por release                   |
| Deriva           | `git log`, `src/`                                             | CHANGELOG (Capítulo 39 · DOC-28)                                | Tabla §5 de DOC-43                     |

---

# Capítulo 2. [MACOLLO] Macollo - Monitoreo Agronómico (DOC-01)

**Ruta fuente:** `README.md` · **Parte:** Parte I. Gobierno y puerta de entrada

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-01**.

Plataforma web **multi-finca** para el **monitoreo agronómico**: matriz de **20 plantas (4 filas × 5 columnas)** por finca, métricas de suelo y ambiente (pH, temperaturas, humedad, crecimiento, sanidad, productividad), **historial por fecha** con importación/exportación Excel y sincronización con **Google Sheets**, más clima externo (**Open-Meteo** global; **SIATA** local latente). **Diagnóstico fitosanitario con IA para detección de trips usando la API [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api) (BioCLIP 2.5)**, **galería de fotos por finca** con vista ampliable y almacenamiento por finca activa. Roles: `Superadmin`, `Admin`, `Agropecuario`, `Campesino`.

**Autores:**

- Nixon Ramirez
- Luis Manuel Florez
- Mateo Herrera
- Juan David Giraldo
- Alejandro Florez
- Victor Cordoba

> 👤 **¿Eres usuario final?** Ve directo al Manual de Usuario (Capítulo 15 · DOC-10). Este README es para desarrollo y despliegue.

> 🌐 **Landing:** la página pública se sirve en `/landing` en cualquier host (incluido `http://localhost:4321/landing`). El dominio de publicación está pendiente de definición; ver LANDING (Capítulo 18 · DOC-47) y ADR-008 (Apéndice A.8 · ADR-008).

---

## ✨ Funcionalidades por módulo

| Módulo (ruta)                                  | Qué hace                                                                                                                                                                                                                                                                                                           |
| :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Inicio** (`/`)                               | Dashboard con matriz 4×5 de plantas, semáforo 🟢 Óptimo / 🟡 Atención / 🔴 Crítico / ⚪ Sin datos, cards de humedad y temp. aire, modal de detalle por planta (pH, temp suelo/aire, crecimiento, productividad, sanidad). Para **Superadmin/Admin** sin finca elegida, el inicio es el panel de fincas (`/admin`). |
| **Métricas** (`/metrics`)                      | Promedios globales y por fila, badges de pH (Óptimo 6.0–6.8 / Atención / Crítico), sanidad y productividad, tabla estilo Excel con modal y gráficos por planta.                                                                                                                                                    |
| **Historial** (`/history`)                     | Consulta cronológica por fecha, **importación Excel/CSV**, **conexión Google Sheets** (URL pública → CSV; permitida a dueño, staff y miembro), **exportación `.xlsx`** con ExcelJS.                                                                                                                                |
| **Configuración** (`/settings`)                | Perfil (nombre editable, correo solo lectura), tema Claro/Oscuro/Auto, frecuencia de sincronización IoT, notificaciones y zona de peligro.                                                                                                                                                                         |
| **Fincas** (`/farms`, `/farms/[id]`, `/admin`) | Multi-tenant: crear finca o unirse por invitación (código 8 chars), cambiar finca activa, gestionar miembros e invitaciones. `/admin` es el panel del staff (fincas + **Entrar**; usuarios y hard-delete solo `Superadmin`).                                                                                       |
| **Auth** (`/` → `/api/auth/*`)                 | Login email/celular+contraseña (bcrypt + PostgreSQL), registro con `accountType` (`Campesino`/`Agropecuario`), OAuth Google, recuperación por código (email/SMS, ~15 min). Sesión JWT con rol releído de BD. (`/signin` es alias a `/`.)                                                                           |
| **Clima externo**                              | Proxy `/api/siata` (evita CORS) para SIATA Medellín + `fetchWeatherData()` a Open-Meteo como respaldo global.                                                                                                                                                                                                      |

---

## 🚀 Tecnologías Principales

Construido con SSR moderno. Detalle en ARCHITECTURE.md (Capítulo 3 · DOC-02) y docs/ARCHITECTURE.md (Capítulo 4 · DOC-03).

| Capa           | Tecnología (versión en `package.json`)                                                                               |
| :------------- | :------------------------------------------------------------------------------------------------------------------- |
| **Framework**  | [Astro](https://astro.build) 7.2.8 (SSR, adaptador Node/Vercel)                                                      |
| **UI**         | Astro Components + React 19 (islas) + `sileo` toasts                                                                 |
| **Estilos**    | Tailwind CSS 4.3.3                                                                                                   |
| **3D**         | Three.js 0.185.1 (iluminación dinámica según hora)                                                                   |
| **Auth**       | Auth.js (`auth-astro` 4.2.0, `@auth/core` 0.41.3, `@auth/pg-adapter` 1.11.3, `bcryptjs`)                             |
| **DB**         | PostgreSQL (`pg` 8.23.0). Esquemas en `src/db/`                                                                      |
| **Datos**      | Open-Meteo directo + fallback offline (SIATA pausado, ver ADR-007)                                                   |
| **Validación** | Zod 4 (Zero Trust en `register`, `sync-sheets`, `export-excel`)                                                      |
| **Calidad**    | Husky pre-commit (lint-staged prettier + bloqueo de secretos)                                                        |
| **Archivos**   | ExcelJS 4.4.0 (import/export `.xlsx`), Google Sheets sync                                                            |
| **Email/SMS**  | Nodemailer 10 (recuperación de contraseña)                                                                           |
| **IA / ML**    | [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api) (FastAPI + BioCLIP 2.5), consumida por proxy SSR |
| **Deploy**     | Vercel (web) + VPS para la API de ML                                                                                 |

### Estructura real del código

```text
/src
├── frontend/components/  # Dashboard, Metrics, History, Settings, Welcome, Navbar,
│                         # TripsDiagnosticModal, Gallery, GalleryDetail, NoFarm
├── frontend/layouts/     # Layout.astro (head, metadatos, Navbar)
├── frontend/styles/      # global.css (Tailwind)
├── pages/                # /index (portada + login), /signin (alias→/), /metrics, /history,
│                         # /gallery, /gallery/[id], /settings, /farms, /admin, /invite/[code]
├── pages/api/            # auth/*, farms/*, invitations/*, admin/*, gallery/*,
│                         # trips-diagnosis, export-excel, export-csv, sync-sheets, weather, aqi, siata
├── shared/               # plantMatrix, badges, roles, avatar, utils, clientStorage (SSR + cliente)
├── backend/services/     # sheetsSync, excelExport, csvExport, weather, siata, authz, farms, readings, rateLimit, notifications
├── db/                   # auth-schema.sql, greenhouse-schema.sql (+ migrations/), client.ts (pool pg)
├── middleware.ts         # Guarda rutas privadas + security headers + rate-limit + fix proxy
└── env.d.ts
/auth.config.ts           # Credentials + Google, JWT con rol, PostgresAdapter
/scripts                  # seed-admin.mjs, seed-demo.mjs, seed-production.mjs, migrate-neon.mjs,
                          # run-lan.sh (red local), generador de documentación, generador de capturas
/public/uploads/gallery   # Fotos subidas desde el escáner (runtime)
```

---

## 🛠️ Requisitos Previos

- [Node.js](https://nodejs.org/) **v22.12+** (ver `engines` en `package.json`)
- [pnpm](https://pnpm.io/) (gestor usado en este proyecto)
- **PostgreSQL 17+** local o en la nube (Supabase/RDS), con pgAdmin opcional
- Cuenta de Google Cloud (solo si usarás OAuth/Sheets) + SMTP (Gmail App Password para recuperación)

---

## 💻 Instalación y Ejecución Local

1. **Clona e instala:**

   ```bash
   pnpm install
   ```

2. **Variables de entorno:** copia `.env.example` a `.env` y completa (NO commitees el `.env` real):

   ```env
   DATABASE_URL=postgres://postgres:TU_PASSWORD@localhost:5432/invernadero
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=TU_PASSWORD
   POSTGRES_DATABASE=invernadero
   # openssl rand -base64 32
   AUTH_SECRET="tu_secreto_generado"
   AUTH_TRUST_HOST=true
   SESSION_MAX_AGE_HOURS=24
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   # SMTP para recuperación (Gmail: myaccount.google.com/apppasswords)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_FROM="Macollo <test@test.com>"
   SMTP_USER=test@test.com
   SMTP_PASS=abcdefghijklmnop
   # API de detección de trips (macollo-trips-api en Google Cloud Run)
   ML_API_URL=https://macollo-trips-api-961314735418.us-central1.run.app
   ML_API_KEY=mk_tu_api_key
   ```

   > **La API de ML corre en Google Cloud Run.** Por defecto, los endpoints usan `https://macollo-trips-api-961314735418.us-central1.run.app`. Si deseas probar con un servidor local, puedes cambiar `ML_API_URL=http://127.0.0.1:8000`.

3. **Base de datos:** crea la BD `invernadero` y ejecuta en orden:
   - `src/db/auth-schema.sql` (tablas `users`, cuentas OAuth, tokens de recuperación)
   - `src/db/greenhouse-schema.sql` (modelo por finca: `fincas`, `finca_miembros`, `finca_invitaciones`, `plantas`, `lecturas` y `photos` para la galería)

   ```bash
   createdb invernadero
   psql invernadero -f src/db/auth-schema.sql
   psql invernadero -f src/db/greenhouse-schema.sql
   ```

4. **Inicia el servidor:**

   ```bash
   pnpm dev
   ```

   > En segundo plano: `pnpm astro dev --background`. Gestión: `pnpm astro dev stop`, `pnpm astro dev status`, `pnpm astro dev logs`.

5. **Abre `http://localhost:4321`:**
   - Ve a `/` → pestaña **Registrarse** → crea tu usuario eligiendo `Campesino` (te unes con un código) o `Agropecuario` (creas tu finca).
   - Las cuentas privilegiadas (`Admin`/`Superadmin`) se crean por script: `node scripts/seed-admin.mjs`.
   - Inicia sesión → entrarás al Dashboard `/` (o a `/admin` si eres staff sin finca elegida, o a `/farms` si aún no tienes finca activa).
   - Si ves tarjetas grises (`--`/`N/D`), ve a `/history` e importa un Excel/CSV o conecta Google Sheets (según permisos de la finca: dueño, staff o miembro).

### 🔬 Diagnóstico de Trips (conexión con la API de Machine Learning)

El diagnóstico fitosanitario con cámara usa la API externa **[macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api)** (FastAPI + BioCLIP 2.5). Es un **servidor independiente** de este proyecto; este repositorio solo actúa como proxy y cliente.

#### 1. Levantar la API de ML

Sigue las instrucciones del repositorio [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api). En resumen:

```bash
git clone https://github.com/VoctorMCL/macollo-trips-api.git
cd macollo-trips-api
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
./run_server.sh   # escucha en 0.0.0.0:8000
```

Debe quedar escuchando en el **puerto 8000** (distinto al 4321 de Astro). Verifica con:

```bash
curl http://127.0.0.1:8000/api/health
```

#### 2. Conectar Macollo con la API

Define en `.env` (o en Vercel) las variables:

| Variable     | Descripción                                                                                          | Ejemplo                                                      |
| :----------- | :--------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| `ML_API_URL` | URL base del servicio ML en Google Cloud Run (o local para pruebas).                                 | `https://macollo-trips-api-961314735418.us-central1.run.app` |
| `ML_API_KEY` | Clave que se envía en la cabecera `X-API-Key` (debe coincidir con la configurada en el servicio ML). | `mk_...`                                                     |

La web no llama directamente al servicio: el endpoint `src/pages/api/trips-diagnosis.ts` reenvía la imagen a `${ML_API_URL}/api/predict`. Esto evita CORS y mantiene la API key en el servidor. La inferencia es directa: el único reintento ocurre ante un `401` del panel, renovando la sesión; no hay reintentos artificiales por `503` (`4e977f5`).

#### 3. Probar desde el celular (misma Wi-Fi)

```bash
# Macollo accesible en la red local (se conecta directamente a la API en Google Cloud)
pnpm run dev:lan
```

Abre en el celular `http://<IP-LAN>:4321`, entra a **Escanear Trips** y captura/sube una foto. La web reenviará la imagen a la API de ML y guardará la foto en la galería de la finca activa.

> Si accedes por `http://IP` (sin HTTPS), el navegador bloquea la cámara directa (`getUserMedia`). El modal lo detecta y abre la **cámara nativa** mediante el selector de archivos; también puedes usar **Subir Foto**.

Más detalle técnico: `docs/CAMERA-ML.md` (Capítulo 22 · DOC-26).

### Roles y sesiones

Roles: `Superadmin` · `Admin` · `Agropecuario` · `Campesino`. El rol se guarda en `users.role` y viaja en el JWT; `getAuthUser` lo **relee de BD** en cada petición (`auth.config.ts` → callbacks `jwt`/`session`). El acceso a datos se decide por **membresía de finca** (`finca_miembros`) + cookie `finca_activa`. El `middleware.ts` protege rutas privadas, aplica security headers y corrige `x-forwarded-proto/host` detrás de proxies (Cloudflare/Vercel).

---

## 📦 Comandos Disponibles

| Comando            | Descripción                                                                |
| :----------------- | :------------------------------------------------------------------------- |
| `pnpm install`     | Instala todas las dependencias del proyecto.                               |
| `pnpm dev`         | Inicia el servidor de desarrollo local.                                    |
| `pnpm run dev:lan` | Inicia en red local (`0.0.0.0`) en puerto 4321 para pruebas desde celular. |
| `pnpm build`       | Compila el proyecto para producción en el directorio `./dist/`.            |
| `pnpm preview`     | Previsualiza el proyecto compilado localmente antes de desplegar.          |
| `pnpm astro check` | Ejecuta validaciones de tipos en los archivos de Astro.                    |

> Despliegue en Vercel: define las mismas vars del `.env` en el panel de Vercel (`DATABASE_URL`, `AUTH_SECRET`, `GOOGLE_*`, `SMTP_*`, `ML_API_URL`, `ML_API_KEY`). Usa una DB en la nube (Supabase/RDS), no SQLite local. La API de ML debe estar desplegada aparte (VPS con ≥8 GB RAM) y accesible por HTTPS; no cabe en Vercel Functions.

### Solución rápida de problemas dev

| Síntoma                                  | Causa probable / fix                                                                                    |
| :--------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `[Auth] Falta AUTH_SECRET` en producción | Define `AUTH_SECRET` en `.env` / Vercel.                                                                |
| Login siempre "Credenciales incorrectas" | Usuario no existe o hash bcrypt inválido; verifica `users` en pgAdmin. El login acepta email o celular. |
| Tarjetas `--` / `N/D`                    | No hay lecturas en la finca activa; importa desde `/history`.                                           |
| Google OAuth no aparece / falla          | Faltan `GOOGLE_CLIENT_ID/SECRET` o URL de retorno no autorizada.                                        |
| Sheets: "Error de autenticación"         | La hoja no es pública/legible o no tienes permiso en la finca activa.                                   |
| Redirige a `/farms` al entrar            | No hay finca activa; crea una o únete por invitación.                                                   |
| Escáner: "servidor de IA offline"        | La API de ML no está corriendo o `ML_API_URL` apunta mal. Verifica `curl $ML_API_URL/api/health`.       |
| Escáner: error 401/403 desde ML          | `ML_API_KEY` no coincide con la clave configurada en la API de ML (`X-API-Key`).                        |
| Cámara no abre en el celular             | Es HTTP por IP (contexto no seguro). El modal abre la cámara nativa; o usa "Subir Foto".                |

---

## 📚 Documentación

- 👤 Manual de Usuario (Capítulo 15 · DOC-10) - Guía paso a paso (roles, dashboard 4×5 + 3D, métricas, historial, settings, FAQ).
- 📑 Índice de docs (Capítulo 1 · DOC-00) - Mapa de toda la documentación.
- 📄 Documentación unificada (PDF) (`./docs/UNIFIED/Macollo-Documentacion-Unificada.pdf`) - Entregable formal: 47 documentos, 8 ADR y el anexo visual.
- 📸 Capturas verificadas (Capítulo 47 · DOC-46) - CAP-01…CAP-08 tomadas con Playwright, sin Astro Admin ni `/admin`.
- Arquitectura (Capítulo 4 · DOC-03) - Estructura `src/`, flujos, decisiones (SSR, JWT, proxy SIATA, DB).
- Cámara y ML (Capítulo 22 · DOC-26) - Integración con [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api), configuración y pruebas desde celular.
- Rutas (Capítulo 17 · DOC-11) - Rutas reales (`/` login+portada, `/metrics`, `/history`, `/gallery`, `/settings`, `/admin`, `/landing` + API).
- Landing (Capítulo 18 · DOC-47) - Ruta `/landing` (visible en localhost), contenido, diseño, enlaces y validación de la landing pública.
- Endpoints (Capítulo 19 · DOC-12) - Referencia exacta de endpoints (auth, fincas, invitaciones, admin, datos, galería, ML) con bodies, códigos y `curl`.
- Auth (Capítulo 20 · DOC-13) - Credentials + Google, JWT con rol, recuperación 6 dígitos/15 min, brechas.
- Base de Datos (Capítulo 24 · DOC-14) - Esquemas auth + agronómico multi-tenant (`fincas`, `plantas`, `lecturas`, `photos`), ER.
- Despliegue (Capítulo 32 · DOC-16) - Vercel SSR, env vars, checklist y rollback.
- Decisiones (ADRs) (Apéndice A, ADR-001…ADR-007) - Los 8 porqués (SSR, PG, Auth.js, SIATA, Sheets, bcrypt, bypass SIATA, landing en `/landing`).
- Datos (Capítulo 25 · DOC-15) + Protocolo de campo (Capítulo 26 · DOC-21) + Demo (Capítulo 27 · DOC-22) - Campos, cómo llenar la hoja y fixture CSV.
- Seguridad (Capítulo 21 · DOC-24) + Roadmap (Capítulo 37 · DOC-23) + Changelog (Capítulo 39 · DOC-28) - Política, plan y historial.
- Requisitos (Capítulo 9 · DOC-04) - SRS v1.1 con trazabilidad RF→CU/US.
- UML (Capítulo 12 · DOC-07) - Clases, componentes, despliegue y estados.
- Testing (Capítulo 33 · DOC-17) - Plan, casos E2E/API y checklist release.
- Contribuir (Capítulo 34 · DOC-18) - Flujo, commits, DoD y revisión de PR.
- Glosario (Capítulo 36 · DOC-20) + Troubleshooting (Capítulo 35 · DOC-19) - Términos y runbook por síntoma.
- Casos de uso (Capítulo 10 · DOC-05) + Historias (Capítulo 11 · DOC-06) - Requisitos (lo no implementado va marcado ⚠️).
- Secuencia (Capítulo 13 · DOC-08) + Actividades (Capítulo 14 · DOC-09) - Diagramas Mermaid verificados.
- **JSDoc en código:** `src/backend/services/`, `src/middleware.ts` y `auth.config.ts` están documentados para autocompletado del editor.

## Trazabilidad

| Tema             | Código / configuración             | Documento relacionado                                                    | Verificación                           |
| :--------------- | :--------------------------------- | :----------------------------------------------------------------------- | :------------------------------------- |
| Stack y comandos | `package.json`, `astro.config.mjs` | ARCHITECTURE (Capítulo 3 · DOC-02), README de docs (Capítulo 1 · DOC-00) | `pnpm build` y `pnpm exec astro check` |

---

# Capítulo 3. Arquitectura del Sistema - Macollo (DOC-02)

**Ruta fuente:** `ARCHITECTURE.md` · **Parte:** Parte I. Gobierno y puerta de entrada

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-02**.

> **Documento canónico:** `docs/ARCHITECTURE.md` (Capítulo 4 · DOC-03) (verificado contra `src/`, octubre 2026).
> Este archivo queda como resumen para no duplicar y evitar deriva.

**Stack:** Astro 7.2.8 SSR (adaptador Vercel) · Tailwind 4 · Three.js · Auth.js (`auth-astro`, Credentials + Google, JWT con rol) · PostgreSQL · Open-Meteo + SIATA (proxy `/api/siata`) · ExcelJS · Google Sheets CSV.

**Estructura:** `src/frontend/` (Dashboard, Metrics, History, Settings, Welcome, Navbar, NoFarm, Gallery, GalleryDetail) · `src/pages/` (`/` login+portada, `/signin` alias→`/`, `/metrics`, `/history`, `/settings`, `/farms`, `/farms/[id]`, `/admin`, `/invite/[code]`, `/gallery`, `/gallery/[id]` + `api/auth/*`, `api/farms/*`, `api/invitations/*`, `api/admin/*`, `api/gallery/*`, `api/export-excel`, `api/export-csv`, `api/sync-sheets`, `api/weather`, `api/aqi`, `api/siata`) · `src/backend/services/` (`weather`, `siata`, `authz`, `farms`, `readings`, `notifications`, `rateLimit`, `csvExport`, `excelExport`) · `src/db/` (`auth-schema.sql`, `greenhouse-schema.sql`, `migrations/`, `client.ts`) · `auth.config.ts` · `src/middleware.ts`.

**Flujos y decisiones:** ver documento canónico (§3–§4): portada dual por sesión, registro con rol elegible `Campesino`/`Agropecuario`, recuperación 6 dígitos/15 min, datos agronómicos **persistidos en PG por finca** (`lecturas`), invitaciones por código nanoid, dual SIATA/Open-Meteo, proxy CORS con timeout 3 s.

**Índice completo de docs:** `docs/README.md` (Capítulo 1 · DOC-00).

## Trazabilidad

| Tema                   | Código / configuración | Documento relacionado                       | Verificación       |
| :--------------------- | :--------------------- | :------------------------------------------ | :----------------- |
| Resumen arquitectónico | `docs/ARCHITECTURE.md` | Arquitectura canónica (Capítulo 4 · DOC-03) | Diff contra `src/` |

---

# Capítulo 4. Arquitectura del Sistema - Macollo (DOC-03)

**Ruta fuente:** `docs/ARCHITECTURE.md` · **Parte:** Parte I. Gobierno y puerta de entrada

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-03**.

> Fuente de verdad verificada contra `src/` (octubre 2026). Diagramas académicos en SEQUENCE_DIAGRAMS (Capítulo 13 · DOC-08) y ACTIVITIES (Capítulo 14 · DOC-09).

## 1. Visión general

App **Astro 7.2.8 en SSR** (`output: 'server'`, adaptador Vercel) que combina páginas renderizadas en servidor con API routes en el mismo despliegue. Dominio: monitoreo agronómico de **20 plantas (matriz 4 filas `t0–t3` × 5 columnas)** con métricas de suelo/ambiente, historial multidía e integraciones de clima y hojas de cálculo.

- **Frontend:** Astro Components (`src/frontend/`), islas React (`sileo` toasts), Tailwind 4, Three.js (iluminación dinámica).
- **Backend:** API routes (`src/pages/api/`), servicios (`src/backend/services/`), `middleware.ts`, `auth.config.ts`.
- **Datos:** PostgreSQL multi-tenant (auth + agronómico **persistido por finca** en `lecturas` — ver DATABASE (Capítulo 24 · DOC-14) §5) + Open-Meteo/SIATA + Google Sheets CSV + ExcelJS.
- **Auth:** Auth.js (`auth-astro`), Credentials + Google, sesión JWT con rol — ver AUTH (Capítulo 20 · DOC-13).

## 2. Estructura de directorios (real)

```text
/src
├── frontend/
│   ├── components/   # Dashboard (matriz 4×5 + modal), Metrics, History, Settings, Welcome, Navbar, NoFarm,
│   │                 # TripsDiagnosticModal, Gallery, GalleryDetail
│   ├── layouts/      # Layout.astro (head, metadatos, estilos)
│   └── styles/       # global.css (Tailwind)
├── pages/            # /index.astro (portada dual + login/registro), /signin (alias→/), /metrics, /history,
│                     # /gallery, /gallery/[id], /settings, /farms, /farms/[id], /admin, /invite/[code]
├── pages/api/
│   ├── auth/         # register, check-availability, forgot-password, reset-password (+ /api/auth/* de Auth.js)
│   ├── farms/        # index, [id], [id]/archive|members|invitations|readings, leave, active
│   ├── farm/         # active (alias retrocompatible hacia /api/farms/active)
│   ├── invitations/  # use (canje de código), peek
│   ├── admin/        # gestión de usuarios/roles (staff)
│   ├── gallery/      # upload (POST multipart), [id]/file (GET imagen por finca)
│   ├── trips-diagnosis.ts  # GET health / POST proxy a macollo-trips-api (BioCLIP 2.5)
│   ├── export-excel.ts  # GET|POST → .xlsx 3 hojas (ExcelJS), por finca
│   ├── export-csv.ts    # GET → .csv historial por finca
│   ├── sync-sheets.ts   # POST {url} → parse CSV → INSERT lecturas (finca activa)
│   ├── weather.ts       # GET {lat, lon} → clima Open-Meteo
│   ├── aqi.ts           # GET {lat, lon} → calidad del aire WAQI
│   └── siata.ts         # GET proxy siata.gov.co:8089 (timeout 3 s)
├── backend/
│   └── services/     # authz.ts (permisos), farms.ts (CRUD, invitaciones), readings.ts (lecturas),
│                     # notifications.ts (SMTP/SMS), csvExport.ts, excelExport.ts, profile.ts,
│                     # rateLimit.ts, sheetsSync.ts, siata.ts, weather.ts, server-fetch.ts
├── shared/           # plantMatrix.ts, badges.ts, roles.ts, avatar.ts, utils.ts, clientStorage.ts, preferences.ts, serialize.ts
├── db/               # auth-schema.sql, greenhouse-schema.sql, migrations/, client.ts (pool pg)
├── middleware.ts     # Guarda rutas reales + security headers + rate-limit + fix proxy
└── env.d.ts
/auth.config.ts       # Credentials (bcrypt) + Google, PostgresAdapter, JWT con rol
astro.config.mjs      # output server + @astrojs/vercel + auth() + react()
```

## 3. Flujos principales

**Portada dual (`/`):** request → `getSession` → sin sesión `Welcome`; con sesión, `Navbar + Dashboard` (o `NoFarm` si no hay finca activa), salvo **staff (Superadmin/Admin) sin finca elegida**, que se redirige a `/admin`. El `middleware.ts` protege las páginas/APIs reales (`/metrics`, `/history`, `/settings`, `/farms`, `/admin` y `/api/farms*`, `/api/invitations*`, `/api/admin*`, `/api/farm*`, `/api/sync-sheets`, `/api/export-excel`) con redirect/`401`, y aplica **security headers** a toda respuesta (defensa en profundidad): `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `HSTS` y `CSP` (incluye `connect-src` a Open-Meteo y WAQI).

**Login/registro:** `/` (tabs en `Welcome`) → `signIn('credentials')` o Google, o `POST /api/auth/register` (bcrypt, rol según `accountType`) → JWT con `role` → `/` (o `/admin` si es staff). La antigua ruta `/signin` es ahora un alias que redirige a `/`.

**Recuperación:** `forgot-password` (código 6 dígitos/15 min en `verification_token` + email/SMS) → `reset-password` (verifica, bcrypt, invalida token).

**Datos agronómicos:** Historial → importar Excel/CSV o `POST /api/sync-sheets` (normaliza URL → CSV → `resolvePlantCoordinates` + defaults → `records`) → **`insertLecturas` persiste en `lecturas` de la finca activa** (`INSERT … ON CONFLICT` por finca+planta+fecha+hora). `getLecturasByFinca` alimenta Dashboard/Métricas/Historial scopeados por `finca_activa`; `export-excel` genera `.xlsx` por finca.

**Clima externo (desde `efed143`):** el Dashboard pide **geolocalización** (`navigator.geolocation`, timeout 10 s; fallback Medellín 6.2442, -75.5812) y llama `fetchWeatherData(lat, lon)` → **Open-Meteo directo** (`temperature_2m, relative_humidity_2m, weather_code, wind_speed_10m` + `precipitation_probability` hora actual, `timezone=auto`). Sin red responde **fallback offline** (22 °C, 60 %, lluvia 0, viento 5 km/h, `source: 'Offline Fallback'`). El widget muestra **viento (km/h)**, no irradiación. `getWeatherEmoji` mapea WMO → icono. Refresco cada **10 min** (`setInterval 600000`). Además consulta **AQI** a `api.waqi.info` a través de `/api/aqi` (token en servidor con valor por defecto; rotar antes de producción, R-02). La escena 3D anima el **ciclo sol (6:00–18:00) / luna** con sombras `PCFSoftShadowMap` según la hora real.

> ⚠️ SIATA está **temporalmente bypasseado** (fuera de línea; evitaba 3 s de espera): `/api/siata` sigue vivo pero sin consumidores internos. `isValleDeAburra` y `fetchSiataPredictions()` quedan como código latente. Ver ADR-007.

## 4. Decisiones clave

| Decisión                              | Por qué                                                                                                                                        |
| :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| Astro SSR + Vercel (`output: server`) | Sesión y API en el mismo despliegue; páginas deciden por sesión en servidor.                                                                   |
| JWT (no sessions DB)                  | Sin estado en serverless; el rol viaja en el token (re-login tras cambio de rol).                                                              |
| Proxy `/api/siata`                    | Evita CORS del navegador; timeout 3 s ante el límite serverless.                                                                               |
| Dual SIATA/Open-Meteo                 | Precisión local en Medellín, respaldo global fuera/fallo.                                                                                      |
| CSV-first para Sheets                 | Sin credenciales Google: basta enlace público/export. Parser tolerante (delimitador, comillas, coma decimal, serial Excel, IDs `T0-P1/TO-P2`). |
| ExcelJS 3 hojas                       | Reporte auditoría (hoy + historial + rangos) con promedios vía fórmulas.                                                                       |
| bcrypt salt 10                        | Costo razonable login/registro en serverless.                                                                                                  |
| PG nube, no SQLite                    | Serverless sin disco persistente; pool con SSL en prod.                                                                                        |
| Zod Zero Trust                        | `register`, `sync-sheets` y `export-excel` validan input con schemas (`safeParse`); el servidor no confía en el cliente.                       |
| Husky pre-commit                      | `lint-staged` (prettier) + bloqueo de secretos (`.env`, `credentials`, `secret`) antes de cada commit.                                         |

## 5. Modelo de datos (resumen)

Auth: `users (role enum: Superadmin, Admin, Agropecuario, Campesino def.)`, `accounts`, `sessions`, `verification_token` — DATABASE (Capítulo 24 · DOC-14) §2, AUTH (Capítulo 20 · DOC-13).
Agronómico: `fincas`, `finca_miembros`, `finca_invitaciones`, `plantas` (por finca) y `lecturas` (una visita a una planta) + tipos TS `MetricRecord`/`PlantMatrixItem` en `src/shared/plantMatrix.ts` (matriz `FILAS t0–t3`, `COLUMNAS Col 1–5`, códigos `T{f}-P{c}` / `P-01–P-20`).

## 6. Evolución (IoT / tiempo real / escala)

- **`GET /api/metrics` desde PG** (propuesto; hoy las páginas leen con `getLecturasByFinca`). Persistencia Sheets→PG **ya implementada** (DATABASE (Capítulo 24 · DOC-14) §5).
- **Estado global islas:** Nano Stores si se desacoplan islas Astro.
- **IoT real (ESP32/Arduino):** WebSocket/MQTT para ingesta continua → escribir en `lecturas`; la frecuencia de Settings (`1 min`…) hoy es preferencia de refresco, no ingesta.
- **Auth endurecida** en middleware + handlers (hecho, AUTH (Capítulo 20 · DOC-13) §7); revisar etiquetas de rol en páginas si aparece deriva (`'admin'` vs `'Admin'`).
- **Tests:** no hay suite (`*.test.*` inexistente); candidatos: `resolvePlantCoordinates`, `normalizeGoogleSheetUrl`/`parseCSV`, validadores de `register`, `extractDateAndHour`.

## Trazabilidad

| Tema        | Código / configuración                  | Documento relacionado                                           | Verificación           |
| :---------- | :-------------------------------------- | :-------------------------------------------------------------- | :--------------------- |
| SSR y capas | `astro.config.mjs`, `src/middleware.ts` | ROUTES (Capítulo 17 · DOC-11), DATA-FLOW (Capítulo 28 · DOC-33) | `grep -R` sobre `src/` |

---

# Capítulo 5. Resumen Ejecutivo del Sistema Macollo (DOC-30)

**Ruta fuente:** `docs/EXECUTIVE-SUMMARY.md` · **Parte:** Parte I. Gobierno y puerta de entrada

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-30**.

## 1. Propósito

Este documento ofrece en una sola lectura la ficha técnica, el valor de negocio, el alcance y el estado de madurez de **Macollo**, para que un evaluador, un patrocinador o un nuevo integrante del equipo pueda tomar decisiones sin recorrer previamente los treinta documentos del conjunto. No sustituye a los documentos de detalle: los enlaza y los jerarquiza (ver convenciones (Capítulo 6 · DOC-43) y matriz de trazabilidad (Capítulo 46 · DOC-42)).

## 2. Ficha técnica

| Campo            | Valor verificado                                                                                                                    |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| Producto         | Macollo — plataforma de monitoreo agronómico multi-finca                                                                            |
| Dominio          | Gulupa (_Passiflora edulis_) en invernadero; matriz de 20 plantas por finca                                                         |
| Repositorio web  | Este repositorio (Astro 7.2.8, SSR, adaptador Vercel)                                                                               |
| Servicio de IA   | [`macollo-trips-api`](https://github.com/VoctorMCL/macollo-trips-api), FastAPI + BioCLIP 2.5, desplegado aparte en Google Cloud Run |
| Sitio            | `https://macollo.tech` (`astro.config.mjs:12`)                                                                                      |
| Framework        | Astro 7.2.8 + React 19 (islas) + Tailwind CSS 4.3.3 + Three.js 0.185.1 (`package.json:16-55`)                                       |
| Autenticación    | Auth.js (`auth-astro` 4.2.0): Credentials (bcrypt) + Google OAuth, JWT con rol releído de PostgreSQL                                |
| Persistencia     | PostgreSQL 17 (`pg` 8.23.0), esquemas en `src/db/`, pool con SSL en producción (`src/db/client.ts:18-44`)                           |
| Fuentes de datos | Hojas de cálculo (CSV/XLSX), Google Sheets/Drive, lectura manual via API, Open-Meteo, WAQI, SIATA (latente)                         |
| Salidas          | Tablero 4×5, métricas, historial, galería, diagnóstico de trips, exportaciones `.xlsx`/`.csv`, resumen semanal por correo           |
| Roles            | `Superadmin`, `Admin`, `Agropecuario`, `Campesino` (`src/db/auth-schema.sql`)                                                       |
| Entrega          | Vercel Functions (máx. 60 s en el proxy de IA, `astro.config.mjs:15-19`) + Cloud Run para ML                                        |

## 3. Problema y propuesta de valor

El monitoreo fitosanitario manual de la matrices de cultivo es lento, heterogéneo y difícil de auditar: la información vive en hojas de cálculo, no hay una vista común por finca y la detección de trips depende de la experiencia del operario. Macollo centraliza la medición por planta y fecha, la convierte en semáforos agronómicos y alertas, y añade una segunda opinión mediante un modelo de visión por computadora.

El valor se concreta en cuatro capacidades:

1. **Trazabilidad por planta y fecha**: cada lectura queda identificada por `(finca, planta, fecha, hora)` con responsable (`src/backend/services/readings.ts:141-160`).
2. **Decisión rápida**: badges de pH, sanidad y productividad con umbrales explícitos (`src/shared/badges.ts:16-91`) y alertas umbraladas (`src/shared/alerts.ts:11-14`).
3. **Aislamiento multi-finca**: membership + cookie `finca_activa` + revalidación de permisos en cada handler (`src/backend/services/authz.ts:91-129`).
4. **Diagnóstico asistido**: cámara nativa en HTTP, proxy SSR con clave de API en servidor y guardado automático en la galería de la finca (`src/pages/api/trips-diagnosis.ts:98-173`).

## 4. Actores y capacidades

| Actor                              | Capacidades principales                                                                                                            | Restricción relevante                                |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| Visitante                          | Registro, inicio de sesión, vista previa de invitación                                                                             | No ve datos agronómicos                              |
| `Campesino` (Operario de Campo)    | Consultar tablero, métricas, historial y galería de las fincas a las que pertenece; abandonar finca                                | No crea fincas; no administra miembros               |
| `Agropecuario` (Dueño de Finca)    | Todo lo anterior + crear finca (máx. 5, `src/backend/services/farms.ts:26,87-96`), invitar, archivar, sincronizar Sheets, exportar | No accede al panel staff                             |
| `Admin` (Administrador de Cultivo) | Acceso total a todas las fincas, panel `/admin`, entrada a cualquier finca                                                         | No elimina fincas ni usuarios                        |
| `Superadmin`                       | Todo lo anterior + gestión de roles, borrado de cuentas y _hard delete_ de fincas                                                  | No puede borrarse a sí mismo ni al último Superadmin |

## 5. Alcance funcional

| Módulo        | Ruta                              | Entregable                                                 | Documento de detalle                                                    |
| :------------ | :-------------------------------- | :--------------------------------------------------------- | :---------------------------------------------------------------------- |
| Acceso        | `/`, `/signin` (alias)            | Portada dual, login/registro, recuperación por código      | AUTH (Capítulo 20 · DOC-13), ROUTES (Capítulo 17 · DOC-11)              |
| Tablero       | `/`                               | Matriz 4×5, semáforo, clima con geolocalización, escena 3D | COMPONENTS (Capítulo 23 · DOC-27)                                       |
| Métricas      | `/metrics`                        | Promedios globales y por fila, gráficos por planta         | DATA-DICTIONARY (Capítulo 25 · DOC-15)                                  |
| Historial     | `/history`                        | Consulta por fecha, importación, Sheets, exportación       | DATA-FLOW (Capítulo 28 · DOC-33), FIELD-PROTOCOL (Capítulo 26 · DOC-21) |
| Fincas        | `/farms`, `/farms/[id]`, `/admin` | Multi-tenancy, invitaciones, membresías                    | DATABASE (Capítulo 24 · DOC-14)                                         |
| Galería       | `/gallery`, `/gallery/[id]`       | Fotos por finca compartidas entre miembros                 | CAMERA-ML (Capítulo 22 · DOC-26)                                        |
| Diagnóstico   | Modal en el tablero               | Clasificación de trips vía API externa                     | CAMERA-ML (Capítulo 22 · DOC-26)                                        |
| Configuración | `/settings`                       | Perfil, tema, unidades, frecuencia, notificaciones         | USER_MANUAL (Capítulo 15 · DOC-10)                                      |

## 6. Arquitectura en una página

```text
  Navegador / celular
    │ SSR (Astro) + islas React + Tailwind + Three.js
    ▼
  Vercel Functions  ── middleware.ts ── sesión, CSP, rate limit, proxy headers
    │                  auth.config.ts ─ Credentials + Google, JWT con rol
    ├── páginas /api ── servicios (authz, farms, readings, sheetsSync, export…)
    │                    │
    │                    ├── PostgreSQL (users, fincas, plantas, lecturas, photos)
    │                    ├── Google Sheets/Drive → CSV → parser → lecturas
    │                    └── SMTP / Twilio (recuperación y resumen)
    └── /api/trips-diagnosis ── X-API-Key ──► Cloud Run (BioCLIP 2.5)
                                  │
                                  └── foto ──► public/uploads/gallery + tabla photos
  Cliente: Open-Meteo y WAQI (permitidos por CSP connect-src)
```

## 7. Calidad y decisiones

| Atributo       | Mecanismo observable                                                                          | Documento                                                                    |
| :------------- | :-------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| Seguridad      | JWT + rol releído de BD, middleware, CSP, rate limiting por IP, Zod, bcrypt                   | SECURITY (Capítulo 21 · DOC-24), THREAT-MODEL (Capítulo 40 · DOC-36)         |
| Multi-tenancy  | `finca_miembros` + cookie `finca_activa` + `getFincaAccess`                                   | DATABASE (Capítulo 24 · DOC-14)                                              |
| Disponibilidad | Fallback climático offline, proxy con timeout, persistencia tolerante a fallo de `sheets_url` | INTEGRATIONS (Capítulo 29 · DOC-34)                                          |
| Mantenibilidad | Servicios por dominio, tipos compartidos, ADR-001…ADR-008                                     | ARCHITECTURE (Capítulo 4 · DOC-03), decisions/ (Apéndice A, ADR-001…ADR-007) |
| Trazabilidad   | Matriz RF/CU/US → código → endpoint → verificación                                            | TRACEABILITY-MATRIX (Capítulo 46 · DOC-42)                                   |
| Accesibilidad  | Componentes Astro con Tailwind; auditoría pendiente                                           | ACCESSIBILITY (Capítulo 43 · DOC-39)                                         |

## 8. Estado de madurez (octubre–noviembre 2026)

| Capacidad                                | Estado                                                                        | Evidencia                                                                    |
| :--------------------------------------- | :---------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| Auth, roles y fincas                     | Implementado                                                                  | `auth.config.ts`, `src/pages/api/farms/`                                     |
| Persistencia de lecturas y deduplicación | Implementado                                                                  | `src/backend/services/readings.ts:123-191`                                   |
| Importación Sheets con parser tolerante  | Implementado                                                                  | `src/shared/recordsParser.ts`, `src/shared/csv.ts`                           |
| Exportación Excel de 3 hojas y CSV       | Implementado                                                                  | `src/pages/api/export-excel.ts`, `export-csv.ts`                             |
| Clima Open-Meteo + AQI WAQI              | Implementado                                                                  | `src/pages/api/weather.ts`, `aqi.ts`                                         |
| SIATA local                              | Latente (bypass)                                                              | ADR-007, `src/pages/api/siata.ts`                                            |
| Diagnóstico de trips                     | Implementado; infraestructura ML a desplegar                                  | CAMERA-ML (Capítulo 22 · DOC-26)                                             |
| Suite automatizada de pruebas            | No existe                                                                     | No hay `*.test.*` en el repositorio                                          |
| Capturas referenciadas en el índice      | 8 capturas CAP-01…CAP-08 en `docs/capturas/` e incrustadas en el PDF (DOC-46) | el generador de capturas (no incluido) (ver CAPTURAS (Capítulo 47 · DOC-46)) |

## 9. Riesgos y deuda documentada

1. **Secretos en código**: `src/pages/api/trips-diagnosis.ts:15-19` incluye una clave de API por defecto y `:54-55` credenciales de administrador del panel ML por defecto; deben moverse a variables de entorno obligatorias. Detalle en THREAT-MODEL (Capítulo 40 · DOC-36) y SECURITY (Capítulo 21 · DOC-24).
2. **Sin pruebas automáticas**: la verificación es manual (`docs/TESTING.md`). Riesgo de regresión en parser y autorización.
3. **Deriva documental histórica**: se han corregido referencias a `ADR-008` inexistente, al componente `TripsDiagnosticModal.tsx` (real: `.astro`) y a permisos de Sheets solo para dueño (real: dueño, staff y miembro).
4. **Dependencias externas sin SLA**: Open-Meteo, WAQI, Google Sheets y Cloud Run pueden fallar; hay fallbacks parciales (ver ERROR-CATALOG (Capítulo 30 · DOC-35)).
5. **Ajustes de esquema en caliente**: `ensureResponsableColumn()` y `ensureFincasSheetsColumn()` ejecutan `ALTER TABLE … IF NOT EXISTS` desde la aplicación (`readings.ts:9-21`, `sync-sheets.ts:20-31`); requieren permisos DDL o tolerancia silenciosa.

## 10. Cómo navegar esta documentación

- Usuario final: Manual de Usuario (Capítulo 15 · DOC-10) → FAQ (Capítulo 16 · DOC-45) → Protocolo de campo (Capítulo 26 · DOC-21).
- Desarrollo: Arquitectura (Capítulo 4 · DOC-03) → Rutas (Capítulo 17 · DOC-11) → Endpoints (Capítulo 19 · DOC-12) → Base de Datos (Capítulo 24 · DOC-14).
- Operación: Despliegue (Capítulo 32 · DOC-16) → Runbook (Capítulo 44 · DOC-40) → Troubleshooting (Capítulo 35 · DOC-19).
- Evaluación académica: Requisitos (Capítulo 9 · DOC-04) → Casos de uso (Capítulo 10 · DOC-05) → UML (Capítulo 12 · DOC-07) → Matriz de trazabilidad (Capítulo 46 · DOC-42).

## 11. Trazabilidad

| Tema            | Código / configuración                               | Documento relacionado                      | Verificación                                       |
| :-------------- | :--------------------------------------------------- | :----------------------------------------- | :------------------------------------------------- |
| Stack y versión | `package.json:16-55`, `astro.config.mjs:11-26`       | ARCHITECTURE (Capítulo 4 · DOC-03)         | `pnpm astro check`                                 |
| Roles           | `src/db/auth-schema.sql`, `src/shared/roles.ts:1-11` | AUTH (Capítulo 20 · DOC-13)                | `SELECT unnest(enum_range(NULL::user_role_enum));` |
| Matriz 4×5      | `src/shared/plantMatrix.ts:1-8`                      | DATA-DICTIONARY (Capítulo 25 · DOC-15)     | `TOTAL_PLANTAS === 20`                             |
| Persistencia    | `src/backend/services/readings.ts:84-191`            | DATABASE (Capítulo 24 · DOC-14)            | `SELECT count(*) FROM lecturas;`                   |
| IA              | `src/pages/api/trips-diagnosis.ts`                   | CAMERA-ML (Capítulo 22 · DOC-26)           | `curl /api/trips-diagnosis`                        |
| Documentación   | `docs/README.md`, `docs/DOC-CONVENTIONS.md`          | TRACEABILITY-MATRIX (Capítulo 46 · DOC-42) | Proceso de unificación (generador no incluido)     |

---

# Capítulo 6. Convenciones Documentales y Construcción del Documento Unificado (DOC-43)

**Ruta fuente:** `docs/DOC-CONVENTIONS.md` · **Parte:** Parte I. Gobierno y puerta de entrada

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-43**.

## 1. Propósito

Fijar las reglas que hacen que la documentación de Macollo sea **una sola sistema conectada**, no una carpeta de archivos sueltos. Define identificadores, jerarquía, plantillas, proceso de verificación y el procedimiento reproducible para generar el PDF unificado.

## 2. Identificadores

Cada documento significativo tiene un ID estable `DOC-NN`, asignado en el índice (README (Capítulo 1 · DOC-00)) y repetido en la primera línea de cada archivo. Los ADR usan su propia numeración (`ADR-001`…`ADR-008`). Los requisitos, casos de uso e historias usan `RF/RNF`, `CU`, `US`. Los diagramas usan `SD`, `AD`. Los casos de prueba usan `TEST-NN`. Los escenarios de calidad usan `QP/QS/QA/QM/QU/QV`. Los riesgos de seguridad usan `R-NN`.

| Rango         | Dominio                                                                           |
| :------------ | :-------------------------------------------------------------------------------- |
| DOC-00…DOC-09 | Puerta de entrada y documentación rectora                                         |
| DOC-10…DOC-29 | Documentación original (usuario, arquitectura, API, datos, operación, académica)  |
| DOC-30…DOC-49 | Documentación ampliada (contexto, dominio, flujos, calidad, seguridad, operación) |
| ADR-NNN       | Decisiones arquitectónicas                                                        |
| CAP-NN        | Capturas reales de pantalla (CAP-01…CAP-08, anexo visual DOC-46)                  |
| APÉNDICE A…   | Anexos del documento unificado                                                    |

## 3. Estructura obligatoria de un documento

```markdown
# Título del documento

> Verificado contra el código el AAAA-MM-DD. Documento rector: [docs/README.md](./README.md).
> Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-NN**.

## 1. Propósito

...

## N. Trazabilidad

| Tema | Código / configuración | Documento relacionado | Verificación |
```

Reglas:

1. Un solo H1 por archivo; las secciones numeradas empiezan en H2.
2. Las afirmaciones sobre comportamiento deben tener evidencia de código (`ruta:línea`) o marcarse **no verificado**.
3. Lo no implementado se marca explícitamente; nunca se describe como existente.
4. Los enlaces internos usan rutas relativas Markdown; el generador los convierte a referencias de capítulo en el PDF.
5. Los diagramas Mermaid se conservan como código fuente; en el DOCX/PDF se rotulan como "Diagrama Mermaid (código fuente)".
6. Los estados se escriben con palabras (`Implementado`, `Parcial`, `Pendiente`), no solo con iconos.
7. Las tablas son la forma preferida de comparar reglas, parámetros o responsabilidades.
8. Las imágenes usan `![alt](ruta)`; el generador resuelve la ruta desde `docs/UNIFIED/` y las incrusta en el DOCX/PDF. Las capturas se producen con el generador de capturas (no incluido) y nunca incluyen `/admin`.

## 4. Jerarquía de dependencias

```text
  DOC-43 Convenciones  ──►  DOC-00 Índice  ──►  DOC-30 Resumen ejecutivo
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        ▼                         ▼                         ▼
  DOC-31/32/33                DOC-1x técnicos           DOC-2x académicos
  contexto/dominio/flujo       API/DB/auth/UI            RF/CU/US/UML/ADRs
        │                         │                         │
        └─────────────────────────┼─────────────────────────┘
                                  ▼
                 DOC-42 Matriz de trazabilidad
                                  ▼
                 DOC-43 → PDF unificado (Anexos A…D)
```

Regla de oro: **el código manda, la documentación lo sigue**. Cuando un documento y el código discrepas, se corrige el documento y se registra la corrección en CHANGELOG (Capítulo 39 · DOC-28).

## 5. Correcciones de deriva registradas (2026-11-23)

| #   | Afirmación anterior                                    | Realidad verificada                                                                                           | Documentos corregidos                                                                            |
| :-- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------- |
| 1   | `ADR-008` para la integración ML                       | En su momento solo existían ADR-001…007; hoy ADR-008 documenta la landing, no ML                              | CAMERA-ML (Capítulo 22 · DOC-26), ADR-008 (Apéndice A.8 · ADR-008)                               |
| 2   | `TripsDiagnosticModal.tsx`                             | Archivo real `TripsDiagnosticModal.astro`                                                                     | COMPONENTS (Capítulo 23 · DOC-27)                                                                |
| 3   | Reintentos artificiales `503` en el proxy ML           | Eliminados en commit `4e977f5`; reintento único ante `401`                                                    | CAMERA-ML (Capítulo 22 · DOC-26), ENDPOINTS (Capítulo 19 · DOC-12)                               |
| 4   | Solo el dueño puede sincronizar Sheets                 | `canConnectSheets` permite dueño, staff y miembro (`authz.ts:127-129`)                                        | ROUTES (Capítulo 17 · DOC-11), ENDPOINTS (Capítulo 19 · DOC-12), AUTH (Capítulo 20 · DOC-13)     |
| 5   | `SyncRequestSchema.url` valida que sea URL             | Es `z.string().trim().optional()`: riesgo SSRF R-03                                                           | ENDPOINTS (Capítulo 19 · DOC-12), THREAT-MODEL (Capítulo 40 · DOC-36)                            |
| 6   | `lecturas` solo con `responsable_id`                   | Existen `responsable` (TEXT) y `responsable_id` (FK), migración 002                                           | DATABASE (Capítulo 24 · DOC-14), DATA-DICTIONARY (Capítulo 25 · DOC-15)                          |
| 7   | `fincas` sin `sheets_url`                              | Columna añadida por migración 003 y usada por `/api/sync-sheets`                                              | DATABASE (Capítulo 24 · DOC-14), ENDPOINTS (Capítulo 19 · DOC-12)                                |
| 8   | Existen 44 capturas en `docs/capturas/`                | El directorio no existía; ahora contiene 8 JPEG reales (CAP-01…CAP-08) generados con Playwright, sin `/admin` | CAPTURAS (Capítulo 47 · DOC-46), README (Capítulo 1 · DOC-00)                                    |
| 9   | RF-21/RF-23 como futuros                               | Persistencia y multi-finca implementadas                                                                      | REQUIREMENTS (Capítulo 9 · DOC-04), TRACEABILITY-MATRIX (Capítulo 46 · DOC-42)                   |
| 10  | Token AQI "demo en cliente"                            | Token en servidor con fallback a valor por defecto                                                            | REQUIREMENTS (Capítulo 9 · DOC-04), INTEGRATIONS (Capítulo 29 · DOC-34)                          |
| 11  | Límite serverless ~10 s                                | `maxDuration: 60` y presupuesto ML de 50 s                                                                    | REQUIREMENTS (Capítulo 9 · DOC-04), PERFORMANCE (Capítulo 42 · DOC-38)                           |
| 12  | Scripts solo `seed-admin`/`seed-demo`/`run-lan`        | Existen además `seed-production.mjs` y `migrate-neon.mjs`                                                     | SCRIPTS (Capítulo 38 · DOC-25)                                                                   |
| 13  | RF-25/RF-26/RF-27 ausentes en la SRS                   | Galería, diagnóstico ML y resumen semanal están implementados                                                 | REQUIREMENTS (Capítulo 9 · DOC-04), TRACEABILITY-MATRIX (Capítulo 46 · DOC-42)                   |
| 14  | Recuperación con destino enmascarado en la respuesta   | `message` enmascara, pero `identifier` se devuelve sin enmascarar (R-08)                                      | AUTH (Capítulo 20 · DOC-13), ENDPOINTS (Capítulo 19 · DOC-12), USE_CASES (Capítulo 10 · DOC-05)  |
| 15  | Roles `Agronomo`/`Super admin`                         | La migración 001 los normaliza a `Agropecuario`/`Superadmin`                                                  | AUTH (Capítulo 20 · DOC-13), ADR-003 (Apéndice A.3 · ADR-003)                                    |
| 16  | Guardián de `/dashboard`                               | La portada es `/`; el middleware protege rutas reales, incluida `/gallery`                                    | ROUTES (Capítulo 17 · DOC-11), ADR-003 (Apéndice A.3 · ADR-003)                                  |
| 17  | La ruta unificada «no existe»                          | `docs/UNIFIED/` contiene Markdown, DOCX, PDF y `manifest.json` generados                                      | README (Capítulo 1 · DOC-00), CONTRIBUTING (Capítulo 34 · DOC-18)                                |
| 18  | El PDF unificado no tiene evidencia visual             | DOC-46 incrusta CAP-01…CAP-08 con imágenes reales de Playwright                                               | CAPTURAS (Capítulo 47 · DOC-46), PDF unificado (`./UNIFIED/Macollo-Documentacion-Unificada.pdf`) |
| 19  | La landing exigía un subdominio con dominio de ejemplo | Se sirve en `/landing` en cualquier host; el subdominio se difiere hasta definir el dominio real              | LANDING (Capítulo 18 · DOC-47), ADR-008 (Apéndice A.8 · ADR-008)                                 |

## 6. Proceso de verificación documental

```bash
# Rutas y archivos citados existen
grep -rhoE 'src/[A-Za-z0-9_./\[\]-]+\.(ts|astro|tsx|sql)' docs | sort -u | while read f; do
  [ -e "$f" ] || echo "RUTA ROTA: $f"
done

# IDs de documentos únicos
grep -rhoE 'DOC-[0-9]{2}' docs/*.md | sort | uniq -c

# Enlaces Markdown relativos rotos (comprobación básica)
grep -rhoE '\]\(\./[A-Za-z0-9_./-]+\.md' docs --include='*.md' | sed 's/](//;s/^\.\///' | while read f; do
  [ -e "docs/$f" ] || echo "DOC ROTO: $f"
done

# Capturas ya generadas en `docs/capturas/` (Playwright, nunca `/admin`)
ls docs/capturas/*.jpg | wc -l

# El PDF unificado es un artefacto derivado (generador no incluido)
pdfinfo docs/UNIFIED/Macollo-Documentacion-Unificada.pdf | grep Pages
```

## 7. Generación del documento unificado

El proceso de unificación (generador no incluido en el entregable final):

1. Lee `docs/UNIFIED/manifest.json` (o su lista interna) con el orden canónico de documentos.
2. Verifica que **todos** los `.md` de `docs/` y `docs/decisions/` estén incluidos; si falta uno, falla.
3. Compone un único Markdown con portada, control de versiones, prólogo, mapa documental, índice general, partes, capítulos numerados y apéndices.
4. Convierte enlaces relativos entre documentos en referencias internas (`§Capítulo N`, `DOC-NN`) y conserva las imágenes `![alt](ruta)`, resolviéndolas desde `docs/UNIFIED/`.
5. Genera un DOCX con estilos, encabezados, pies con número de página, tablas, capturas incrustadas y saltos de capítulo.
6. Invoca LibreOffice para producir el PDF y valida que el archivo resultante tenga páginas.

Las capturas de `docs/capturas/*.jpg` y `docs/CAPTURAS.md` (DOC-46) se obtuvieron con Playwright contra un servidor en `http://localhost:4321`, sin Astro Admin ni `/admin`.

Salidas:

- `docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md` — fuente Markdown unificada.
- `docs/UNIFIED/Macollo-Documentacion-Unificada.docx` — intermedia editable.
- `docs/UNIFIED/Macollo-Documentacion-Unificada.pdf` — **entregable final**.

> El PDF es un artefacto derivado: no se edita a mano. Para cambiarlo, se edita el documento de origen y se regenera.

## 8. Convenciones de formatos

| Elemento              | Regla                                                                          |
| :-------------------- | :----------------------------------------------------------------------------- |
| Idioma                | Español; términos técnicos en inglés solo cuando son nombres de API/biblioteca |
| Fechas                | `YYYY-MM-DD` en datos y encabezados de verificación                            |
| Rutas                 | Con `src/` completo y número de línea cuando aporte valor                      |
| Comandos              | Bloques `bash` ejecutables, sin placeholders secretos reales                   |
| Código                | Bloques con lenguaje (`json`, `sql`, `ts`, `mermaid`)                          |
| Emojis                | Solo los preexistentes en estados; el generador los translitera para el PDF    |
| Nombres de rol        | Exactamente los del enum: `Superadmin`, `Admin`, `Agropecuario`, `Campesino`   |
| Nombres de finca role | `dueno`, `miembro`; acceso efectivo `none`, `miembro`, `dueno`, `staff`        |

## 9. Mantenimiento del índice

Tras crear, renombrar o eliminar un documento:

1. Actualizar README (Capítulo 1 · DOC-00) (tabla con DOC-NN, audiencia y contenido).
2. Actualizar la parte y la posición del documento en `docs/UNIFIED/manifest.json`.
3. Actualizar TRACEABILITY-MATRIX (Capítulo 46 · DOC-42) si cambia una responsabilidad.
4. Registrar el cambio en CHANGELOG (Capítulo 39 · DOC-28).
5. Regenerar el PDF.

## 10. Trazabilidad

| Convención       | Aplicación                                      | Documento relacionado                     | Verificación            |
| :--------------- | :---------------------------------------------- | :---------------------------------------- | :---------------------- |
| IDs              | `DOC-NN` en cada archivo                        | README (Capítulo 1 · DOC-00)              | `grep DOC-`             |
| Plantilla        | Encabezado + `## Trazabilidad`                  | Este documento                            | Revisión de PR          |
| Deriva           | Tabla §5                                        | CHANGELOG (Capítulo 39 · DOC-28)          | `git log`               |
| Generación       | el generador de documentación (no incluido)     | SCRIPTS (Capítulo 38 · DOC-25)            | `pdfinfo`               |
| Evidencia visual | Capturas con Playwright (generador no incluido) | CAPTURAS (Capítulo 47 · DOC-46)           | CAP-01…CAP-08 en el PDF |
| Calidad          | Escenarios QV                                   | QUALITY-ATTRIBUTES (Capítulo 41 · DOC-37) | Checklist release       |

---

# Capítulo 7. Contexto y Fronteras del Sistema (DOC-31)

**Ruta fuente:** `docs/SYSTEM-CONTEXT.md` · **Parte:** Parte II. Contexto, dominio y producto

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-31**.

## 1. Propósito y posición en el conjunto

Este documento fija **qué está dentro** de Macollo y **qué queda fuera**, quién interactúa con el sistema y con qué sistemas externos se comunica. Es el punto de partida de la especificación: los requisitos (REQUIREMENTS (Capítulo 9 · DOC-04)), los casos de uso (USE_CASES (Capítulo 10 · DOC-05)) y el modelo de dominio (DOMAIN-MODEL (Capítulo 8 · DOC-32)) se leen después de este documento.

## 2. Actores

| Actor                              | Tipo    | Interacción principal                             | Punto de entrada                        |
| :--------------------------------- | :------ | :------------------------------------------------ | :-------------------------------------- |
| Visitante                          | Humano  | Registro, acceso, vista previa de invitación      | `/`, `/invite/[code]`                   |
| Operario de Campo (`Campesino`)    | Humano  | Toma y consulta de lecturas; usa cámara           | `/`, `/metrics`, `/history`, `/gallery` |
| Dueño de Finca (`Agropecuario`)    | Humano  | Administra su finca, invita, sincroniza y exporta | `/farms`, `/farms/[id]`, `/history`     |
| Administrador de Cultivo (`Admin`) | Humano  | Supervisa todas las fincas y entra a ellas        | `/admin`                                |
| Superadministrador (`Superadmin`)  | Humano  | Gestiona usuarios, roles y borrado físico         | `/admin`                                |
| Servicio ML                        | Sistema | Recibe imágenes, devuelve diagnóstico             | `${ML_API_URL}/api/predict`             |
| Proveedor de correo/SMS            | Sistema | Entrega códigos y resúmenes                       | SMTP / Twilio REST                      |
| Hojas de cálculo                   | Sistema | Fuente de datos agronómicos                       | Google Sheets/Drive → CSV               |

## 3. Diagrama de contexto

```mermaid
flowchart LR
    A[Operario de Campo] -->|lecturas y fotos| W[Macollo · Astro SSR en Vercel]
    D[Dueño de Finca] -->|administra y sincroniza| W
    S[Staff Admin / Superadmin] -->|supervisa| W
    V[Visitante] -->|registro / invitación| W
    W -->|SQL| P[(PostgreSQL)]
    W -->|CSV público| G[Google Sheets / Drive]
    W -->|X-API-Key + Cookie| M[macollo-trips-api · Cloud Run]
    W -->|SMTP / REST| N[SMTP / Twilio]
    W -->|CSP connect-src| O[Open-Meteo · WAQI]
    W -.->|latente, ADR-007| SI[SIATA]
```

## 4. Frontera de responsabilidades

| Responsabilidad                                |   Dentro de Macollo   |       Fuera de Macollo        |
| :--------------------------------------------- | :-------------------: | :---------------------------: |
| Renderizar la matriz 4×5 y los semáforos       |          Sí           |               —               |
| Persistir lecturas y membresías                |          Sí           |               —               |
| Validar permisos por finca                     |          Sí           |               —               |
| Normalizar CSV y derivar sanidad/productividad |          Sí           |               —               |
| Emitir JWT y verificar sesión                  |          Sí           |               —               |
| Ejecutar inferencia BioCLIP                    |          No           |      `macollo-trips-api`      |
| Entrenar o reindexar el modelo                 |          No           |      `macollo-trips-api`      |
| Almacenar archivos de imagen                   | Sí (filesystem local) |               —               |
| Enviar correo/SMS                              |   Orquesta el envío   |          SMTP/Twilio          |
| Proveer clima y AQI                            | Proxy y presentación  |        Open-Meteo/WAQI        |
| Gestionar DNS/TLS del sitio                    |          No           | Vercel / proveedor de dominio |

> Nota: el guardado de fotos usa `public/uploads/gallery/` (`src/pages/api/gallery/upload.ts`). En serverless, ese directorio no es persistente entre despliegues; es una limitación operativa documentada en OPERATIONS-RUNBOOK (Capítulo 44 · DOC-40).

## 5. Fronteras de confianza

| Frontera                  | Mecanismo                                                    | Verificación                                                       |
| :------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------------- |
| Navegador → Vercel        | `security.checkOrigin: true`, CSP, `same-origin`, rate limit | `astro.config.mjs:13`, `src/middleware.ts:39-62,100-127`           |
| Petición → sesión         | `getSession` en middleware y `getAuthUser` en handlers       | `src/middleware.ts:137-159`, `src/backend/services/authz.ts:50-73` |
| Sesión → rol              | Rol releído de PostgreSQL en cada handler                    | `src/backend/services/authz.ts:59-72`                              |
| Usuario → finca           | `getFincaAccess` + cookie `httpOnly`                         | `src/backend/services/authz.ts:91-107,137-147`                     |
| Servidor → Sheets         | URL pública, sin credenciales de Google                      | `src/backend/services/sheetsSync.ts:56-89`                         |
| Servidor → ML             | `X-API-Key` + cookie de panel, solo servidor                 | `src/pages/api/trips-diagnosis.ts:79-88`                           |
| Cliente → Open-Meteo/WAQI | Domains fijos en `connect-src`                               | `src/middleware.ts:56`                                             |

## 6. Supuestos y dependencias

1. PostgreSQL accesible desde Vercel con SSL; `DATABASE_URL` tiene prioridad sobre las variables `POSTGRES_*` (`src/db/client.ts:19-43`).
2. La finca activa se conserva en una cookie con 30 días de validez y `SameSite=Lax` (`src/backend/services/authz.ts:140-143`).
3. Google Sheets debe estar públicamente legible; no se usa OAuth de Google para Sheets.
4. El modelo de ML puede arrancar en frío; el proxy tiene un presupuesto de 50 s y `maxDuration=60` (`trips-diagnosis.ts:7,24-26`).
5. La geolocalización del navegador es opcional; si falla se usa Medellín comoreferencia (ver INTEGRATIONS (Capítulo 29 · DOC-34)).
6. Las reglas agronómicas son umbrales fijos del código, no un modelo calibrado por finca.

## 7. Fuera de alcance

- Control de riego o actuadores IoT: la frecuencia de sincronización de Settings es una preferencia de interfaz, no ingesta automática (`src/shared/preferences.ts:91-100`).
- Facturación, inventario o trazabilidad de exportación comercial.
- Aplicación móvil nativa: el acceso es responsive y usa cámara nativa vía `input[capture]` cuando no hay HTTPS.
- Historial inmutable: `DELETE /api/farms/:id/readings` permite borrar todo el historial de una finca (documentado en ENDPOINTS (Capítulo 19 · DOC-12)).

## 8. Trazabilidad

| Elemento del contexto | Código / configuración                           | Documento relacionado               | Verificación                       |
| :-------------------- | :----------------------------------------------- | :---------------------------------- | :--------------------------------- |
| Frontera HTTP         | `astro.config.mjs`, `src/middleware.ts`          | ROUTES (Capítulo 17 · DOC-11)       | `curl -I https://macollo.tech`     |
| Actores y roles       | `src/shared/roles.ts`, `auth.config.ts`          | AUTH (Capítulo 20 · DOC-13)         | Panel `/admin`                     |
| Servicio ML           | `src/pages/api/trips-diagnosis.ts`               | CAMERA-ML (Capítulo 22 · DOC-26)    | `GET /api/trips-diagnosis`         |
| Fuentes externas      | `src/pages/api/weather.ts`, `aqi.ts`, `siata.ts` | INTEGRATIONS (Capítulo 29 · DOC-34) | Verificar `connect-src` en headers |
| Persistencia          | `src/db/client.ts`, `src/db/*.sql`               | DATABASE (Capítulo 24 · DOC-14)     | `\dt` en psql                      |

---

# Capítulo 8. Modelo de Dominio y Reglas de Negocio (DOC-32)

**Ruta fuente:** `docs/DOMAIN-MODEL.md` · **Parte:** Parte II. Contexto, dominio y producto

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-32**.

## 1. Propósito

Este documento describe el **lenguaje ubicuo** y las **invariantes** del monitoreo agronómico tal como están implementadas. Complementa el diagrama ER de DATABASE (Capítulo 24 · DOC-14) (estructura física) con las reglas que gobiernan el comportamiento (semántica). El contexto de sistema está en SYSTEM-CONTEXT (Capítulo 7 · DOC-31).

## 2. Lenguaje ubicuo

| Término          | Definición operativa                                                                                  | Origen                                                  |
| :--------------- | :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| Finca            | Aggregado raíz del tenant. Agrupa plantas, miembros, invitaciones, lecturas y fotos.                  | `fincas`                                                |
| Finca activa     | Finca seleccionada por el usuario en la cookie `finca_activa`; scope de casi toda consulta.           | `src/backend/services/authz.ts:137-160`                 |
| Planta           | Celda de la matriz 4×5 de una finca; identificada por `(fila, columna)` y por `plant_id` `P-01…P-20`. | `plantas`, `src/shared/plantMatrix.ts`                  |
| Código de planta | Notación `T{fila}-P{columna}` (p. ej. `T2-P4`). El parser tolera `TO-P2` (letra O en vez de cero).    | `src/shared/plantMatrix.ts:62-89`                       |
| Lectura          | Visita registrada a una planta en una fecha y hora; una fila en `lecturas`.                           | `src/backend/services/readings.ts`                      |
| Responsable      | Nombre de quien tomó la medición (texto) y, si se resolvió, usuario de sistema (`responsable_id`).    | `src/db/migrations/002-add-responsable-to-lecturas.sql` |
| Matriz           | Vista de 20 `PlantMatrixItem`, cada uno con `latestMetric` e `history`.                               | `src/shared/plantMatrix.ts:190-235`                     |
| Semáforo         | Clasificación visual derivada de umbrales de pH, sanidad y productividad.                             | `src/shared/badges.ts`                                  |
| Alerta           | Aviso efímero derivado de las últimas lecturas, condicionado a preferencias del usuario.              | `src/shared/alerts.ts`                                  |
| Invitación       | Código de 8 caracteres con expiración y cupos que crea una membresía.                                 | `src/backend/services/farms.ts`                         |
| Archivado        | Estado `fincas.activa = false`, reversible; distinto del _hard delete_.                               | `src/backend/services/farms.ts:189-201`                 |

## 3. Aggregados e invariantes

### 3.1 Finca

| Invariante                                                 | Implementación                                                                                                  |
| :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| Toda finca tiene exactamente un dueño                      | `fincas.dueno_id NOT NULL REFERENCES users` + membresía `rol_finca='dueno'` en la creación (`farms.ts:101-113`) |
| Toda finca se crea con 20 plantas                          | `seedPlantas()` inserta 4×5 con `ON CONFLICT DO NOTHING` (`farms.ts:58-76`)                                     |
| Máximo 5 fincas por dueño                                  | `MAX_FINCAS_POR_USUARIO = 5`, error `409` (`farms.ts:26,87-96`)                                                 |
| Un usuario no puede tener dos membresías en la misma finca | `UNIQUE (finca_id, user_id)`                                                                                    |
| El dueño no puede ser expulsado                            | `removeMember()` lanza `FincaError(400)` (`farms.ts:227-240`)                                                   |
| Archivar no destruye datos                                 | `setFincaActiva()` solo cambia `activa` (`farms.ts:189-197`)                                                    |

### 3.2 Planta

| Invariante                           | Implementación                                                                |
| :----------------------------------- | :---------------------------------------------------------------------------- |
| Fila ∈ {t0,t1,t2,t3}                 | `CHECK (fila IN (...))` en `plantas`                                          |
| Columna ∈ {Col 1…Col 5}              | `CHECK (columna IN (...))` en `plantas`                                       |
| No hay dos plantas en la misma celda | `UNIQUE (finca_id, fila, columna)`                                            |
| Numeración `P-01…P-20`               | `plantIdFor()` y orden fila-mayor (`src/shared/plantMatrix.ts:58-60,148-155`) |

### 3.3 Lectura

| Invariante                                          | Implementación                                                                  |
| :-------------------------------------------------- | :------------------------------------------------------------------------------ |
| Unicidad por finca, planta, fecha y hora            | `UNIQUE (finca_id, planta_id, fecha, hora)`                                     |
| Reimportar la misma medición actualiza, no duplica  | `INSERT … ON CONFLICT DO UPDATE` (`readings.ts:141-160`)                        |
| Responsable se conserva si la nueva fila no lo trae | `COALESCE(EXCLUDED.responsable, lecturas.responsable)` (`readings.ts:158-159`)  |
| Una lectura inválida se omite, no aborta el lote    | Validación `^\d{4}-\d{2}-\d{2}$` y existencia de planta (`readings.ts:135-137`) |
| Escritura atómica del lote                          | `BEGIN` / `COMMIT` / `ROLLBACK` con un `PoolClient` (`readings.ts:130-190`)     |
| Borrado de finca cascada a lecturas                 | `lecturas.finca_id … ON DELETE CASCADE`                                         |

### 3.4 Invitación

| Invariante                                           | Implementación                                                                                        |
| :--------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| Código único de 8 caracteres sin caracteres confusos | `customAlphabet(nolookalikesSafe.toUpperCase(), 8)` + reintentos (`farms.ts:28-56`)                   |
| Cupos y caducidad                                    | `usos_maximos`, `usos_usados`, `expira_en`, `activa` en `finca_invitaciones`                          |
| Canje consistente                                    | Transacción con bloqueo de fila en el servicio de invitaciones (ver ENDPOINTS (Capítulo 19 · DOC-12)) |
| Límites de tasa                                      | `POST /api/invitations/use` a 15 intentos / 300 s por IP (`src/middleware.ts:36`)                     |

## 4. Reglas de derivación agronómica

| Regla                           | Umbral / resultado                                                             | Código                                |
| :------------------------------ | :----------------------------------------------------------------------------- | :------------------------------------ |
| Badge de pH                     | 6.0–6.8 `Óptimo`; 5.5–7.2 `Atención`; resto `Crítico`                          | `src/shared/badges.ts:16-36`          |
| Badge compacto de pH            | Equivalente, con clases Tailwind adaptadas a tema oscuro                       | `src/shared/badges.ts:73-81`          |
| Sanidad                         | `Excelente` / `Saludable` → verde; `Vulnerable` → amarillo; `Crítica` → rojo   | `src/shared/badges.ts:48-71`          |
| Productividad                   | `Alta` → verde; `Media` → verde suave; `Baja` → rojo                           | `src/shared/badges.ts:38-46`          |
| pH por defecto al importar      | 6.4 si el celular no es numérico; clamp 0–14                                   | `src/shared/recordsParser.ts:318-320` |
| Humedad por defecto al importar | 65 %, clamp 0–100                                                              | `src/shared/recordsParser.ts:334-338` |
| Crecimiento derivado            | `altura ≤ 100` → altura; si no, `min(100, altura/150·100)`; sin altura → 75    | `src/shared/recordsParser.ts:343-349` |
| Sanidad derivada del pH         | `<5.2` o `>7.8` → Crítica; `<5.8` o `>7.2` → Vulnerable; `6.2–6.7` → Excelente | `src/shared/csv.ts:126-156`           |
| Fase derivada                   | Altura >80 → Llenado de Fruto; >40 → Floración; si no → Desarrollo Vegetativo  | `src/shared/recordsParser.ts:357-364` |
| Alerta crítica de pH            | pH fuera de 6.0–6.8 en la última lectura de cada planta                        | `src/shared/alerts.ts:11-12,39-58`    |
| Alerta de humedad               | Humedad < 30 % en última lectura                                               | `src/shared/alerts.ts:13,73-87`       |
| Alerta de mantenimiento         | Lectura sin pH o sin temperatura de suelo                                      | `src/shared/alerts.ts:90-106`         |
| Máximo de alertas visibles      | 3 por sesión y día (clave `macollo-alert:YYYY-MM-DD:…`)                        | `src/shared/alerts.ts:111-144`        |

## 5. Ciclo de vida de una lectura

```mermaid
stateDiagram-v2
    [*] --> HojaDeCalculo: fila en Sheets/CSV
    HojaDeCalculo --> Normalizada: parseCSV + indexHeaders + buildRecordsFromRows
    Normalizada --> Validada: resolvePlantCoordinates + extractDateAndHour
    Validada --> Persistida: insertLecturas (upsert transaccional)
    Persistida --> Agregada: buildPlantsGridFromRecords (latestMetric/history)
    Agregada --> Visualizada: Dashboard / Metrics / History
    Visualizada --> Exportada: export-excel / export-csv
    Persistida -->[*]: DELETE /api/farms/:id/readings
```

## 6. Preferencias que afectan la presentación

| Preferencia                  | Clave                        | Valores                 | Efecto                                                    |
| :--------------------------- | :--------------------------- | :---------------------- | :-------------------------------------------------------- |
| Tema                         | `macollo-theme`              | `light`/`dark`/`system` | Clase `dark` en `<html>`                                  |
| Unidad de temperatura        | `macollo-temp-unit`          | `C`/`F`                 | Reescritura de texto en el DOM (`preferences.ts:167-226`) |
| Frecuencia de sincronización | `macollo-sync-minutes`       | 1/5/15/60 min           | Intervalo de refresco de la interfaz, **no** ingesta IoT  |
| Alertas críticas             | `macollo-notify-critical`    | 1/0                     | Activa alertas de pH, sanidad y humedad                   |
| Alertas de mantenimiento     | `macollo-notify-maintenance` | 1/0                     | Activa alerta de sensores                                 |
| Resumen semanal              | `macollo-notify-weekly`      | 1/0                     | Habilita el envío desde Settings                          |

> Todas las preferencias viven en `localStorage`; no se sincronizan entre dispositivos ni con el perfil del usuario (`src/shared/preferences.ts:22-40`).

## 7. Trazabilidad

| Regla                  | Código                                     | Documento relacionado                  | Verificación                                            |
| :--------------------- | :----------------------------------------- | :------------------------------------- | :------------------------------------------------------ |
| Invariantes de finca   | `src/backend/services/farms.ts`            | DATABASE (Capítulo 24 · DOC-14)        | Crear 6 fincas con el mismo usuario → 409               |
| Invariantes de lectura | `src/backend/services/readings.ts:123-191` | DATA-FLOW (Capítulo 28 · DOC-33)       | Repetir importación → `guardadas` igual, sin duplicados |
| Umbrales de semáforo   | `src/shared/badges.ts`                     | USER_MANUAL (Capítulo 15 · DOC-10)     | pH 6.4 → Óptimo; 7.5 → Atención                         |
| Derivación CSV         | `src/shared/csv.ts`, `recordsParser.ts`    | DATA-DICTIONARY (Capítulo 25 · DOC-15) | Importar fixture `sample-readings-demo.csv`             |
| Alertas                | `src/shared/alerts.ts`                     | TESTING (Capítulo 33 · DOC-17)         | Forzar humedad 20 % → toast crítico                     |

---

# Capítulo 9. Especificación de Requisitos (SRS) - Macollo (DOC-04)

**Ruta fuente:** `docs/REQUIREMENTS.md` · **Parte:** Parte II. Contexto, dominio y producto

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-04**.

> Versión 1.1 · 2026-11-23. Estado por requisito: **Implementado** · **Parcial** · **Pendiente** · **No implementado**.
> Trazabilidad: cada RF enlaza casos de uso (CU), historias (US), código y verificación en TRACEABILITY-MATRIX (Capítulo 46 · DOC-42) (DOC-42).

## 1. Alcance

Panel web **multi-finca** de monitoreo agronómico: matriz de 20 plantas (4×5) por finca, métricas de suelo y ambiente, historial con importación/exportación, sincronización con Google Sheets, clima y calidad del aire externos, galería de fotos y diagnóstico fitosanitario de trips con IA.

**Fuera de alcance:** ingesta IoT en vivo (RF-22), aplicación móvil nativa, escritura hacia Google Sheets, alertas automáticas configurables completas (RF-20 solo parcial) y `GET /api/metrics` como endpoint público (RF-21 solo parcial). La persistencia Sheets→PostgreSQL, la multi-finca y el resumen semanal ya están implementados; las versiones anteriores de esta SRS los marcaban incorrectamente como futuros.

## 2. Requisitos funcionales

| ID    | Requisito                                                                                                               | Estado          | CU / US         | Código / vista                                                | Verificación                                       |
| :---- | :---------------------------------------------------------------------------------------------------------------------- | :-------------- | :-------------- | :------------------------------------------------------------ | :------------------------------------------------- |
| RF-01 | Registro con nombre + email/teléfono + contraseña; rol inicial `Campesino`/`Agropecuario` elegible                      | Implementado    | CU-001          | `POST /api/auth/register`, `/`                                | TEST-01                                            |
| RF-02 | Login con email o celular + contraseña (bcrypt coste 10)                                                                | Implementado    | CU-001 / US-001 | `auth.config.ts`                                              | TEST-02                                            |
| RF-03 | Login con Google OAuth (vinculación por email)                                                                          | Implementado    | CU-001 / US-001 | `auth.config.ts`, `@auth/pg-adapter`                          | TEST-03                                            |
| RF-04 | Cierre de sesión en escritorio y móvil                                                                                  | Implementado    | US-002          | `Navbar.astro`, `signOut()`                                   | TEST-04                                            |
| RF-05 | Recuperación con código de 6 dígitos/15 min por email o SMS                                                             | Parcial         | CU-007 / US-009 | `forgot-password.ts`, `reset-password.ts`, `notifications.ts` | TEST-05; R-08                                      |
| RF-06 | Matriz 4×5 con semáforo (Óptimo/Atención/Crítico/Sin datos) y cards de humedad/temperatura                              | Implementado    | CU-002 / US-003 | `Dashboard.astro`, `badges.ts`                                | TEST-06/07                                         |
| RF-07 | Modal de detalle por planta (pH, temp. suelo/aire, crecimiento, productividad, sanidad)                                 | Implementado    | CU-003 / US-003 | `Dashboard.astro`, `Metrics.astro`                            | TEST-07                                            |
| RF-08 | Escena 3D con ciclo sol/luna, sombras, rotación y zoom                                                                  | Implementado    | CU-003 / US-005 | `Dashboard.astro` (Three.js)                                  | Revisión visual                                    |
| RF-09 | Clima (temp., humedad, lluvia, viento) + AQI, geolocalización con fallback Medellín, refresco 10 min y fallback offline | Implementado    | CU-002 / US-010 | `weather.ts`, `aqi.ts`, `Dashboard.astro`                     | TEST-08                                            |
| RF-10 | Métricas: promedios globales y por fila, badges y gráficos por planta                                                   | Implementado    | CU-002 / US-004 | `/metrics`                                                    | TEST-09                                            |
| RF-11 | Historial cronológico filtrable por fecha                                                                               | Implementado    | CU-002 / US-008 | `History.astro`, `readings.ts`                                | TEST-10                                            |
| RF-12 | Importación manual Excel/CSV en Historial                                                                               | Implementado    | —               | `csv.ts`, `recordsParser.ts`                                  | TEST-11                                            |
| RF-13 | Google Sheets pública (CSV → `lecturas` de la finca activa); permitido a `dueno`, `staff` y `miembro`                   | Implementado    | CU-006 / US-011 | `sync-sheets.ts`, `sheetsSync.ts`                             | TEST-12                                            |
| RF-14 | Exportación `.xlsx` de 3 hojas con promedios y CSV histórico                                                            | Implementado    | CU-005 / US-007 | `excelExport.ts`, `csvExport.ts`                              | TEST-13                                            |
| RF-15 | Perfil: nombre editable, correo solo lectura, insignia de rol                                                           | Implementado    | —               | `users/me.ts`, `Settings.astro`                               | TEST-14                                            |
| RF-16 | Tema Claro/Oscuro/Automático                                                                                            | Implementado    | —               | `preferences.ts`, `/settings`                                 | Revisión manual                                    |
| RF-17 | Frecuencia de sincronización/IoT configurable                                                                           | Parcial         | —               | `preferences.ts:91-100`                                       | Es preferencia de refresco, no ingesta             |
| RF-18 | Notificaciones toast de eventos (login, import, export, errores)                                                        | Implementado    | —               | `SileoProvider.tsx`, `alerts.ts`                              | Revisión manual                                    |
| RF-19 | Roles globales `Superadmin`, `Admin`, `Agropecuario`, `Campesino` con JWT; autorización releída de BD                   | Implementado    | CU-001          | `auth.config.ts`, `authz.ts`, `/admin`                        | TEST-15                                            |
| RF-20 | Umbrales y avisos automáticos                                                                                           | Parcial         | CU-004          | `badges.ts`, `alerts.ts`                                      | Umbrales en cliente; sin configuración persistente |
| RF-21 | Persistencia Sheets→PG y `GET /api/metrics` desde BD                                                                    | Parcial         | —               | `lecturas`, `readings.ts`                                     | Persistencia implementada; endpoint inexistente    |
| RF-22 | Ingesta IoT en vivo (ESP32/Arduino vía WebSocket/MQTT)                                                                  | No implementado | —               | —                                                             | ROADMAP (Capítulo 37 · DOC-23)                     |
| RF-23 | Multi-finca: crear finca + 20 plantas, invitaciones, finca activa, roles `dueno`/`miembro`, archivar/hard-delete        | Implementado    | CU-005          | `farms.ts`, `farms/`, `invitations/`                          | TEST-16                                            |
| RF-24 | Inicio por rol: staff sin finca elegida → `/admin`; **Entrar** fija finca activa                                        | Implementado    | CU-001          | `index.astro`, `middleware.ts`                                | TEST-17                                            |
| RF-25 | Galería de fotos por finca con vista ampliable                                                                          | Implementado    | —               | `gallery/upload.ts`, `gallery/[id]/file.ts`, `photos`         | TEST-18                                            |
| RF-26 | Diagnóstico de trips con IA desde cámara/archivo                                                                        | Implementado    | —               | `trips-diagnosis.ts`, `TripsDiagnosticModal.astro`            | TEST-19                                            |
| RF-27 | Resumen semanal por correo                                                                                              | Implementado    | —               | `weekly-summary.ts`, `notifications.ts`                       | TEST-20                                            |

## 3. Requisitos no funcionales

| ID     | Categoría      | Requisito                                                             | Estado                  | Verificación                                            |
| :----- | :------------- | :-------------------------------------------------------------------- | :---------------------- | :------------------------------------------------------ |
| RNF-01 | Rendimiento    | Primera carga SSR < 3 s en 4G; 3D a 30+ fps en equipo medio           | No verificado           | Lighthouse y prueba manual pendientes                   |
| RNF-02 | Rendimiento    | Proxy SIATA responde o falla en ≤ 3 s                                 | Implementado            | `curl -w %{time_total}`                                 |
| RNF-03 | Seguridad      | Contraseñas solo bcrypt; ningún secreto en cliente ni repositorio     | Incumplido parcialmente | R-01/R-02: literal en `trips-diagnosis.ts` y `aqi.ts`   |
| RNF-04 | Seguridad      | Rutas privadas y APIs sensibles exigen sesión                         | Implementado            | `PROTECTED_PAGES` / `PROTECTED_API_PREFIXES`            |
| RNF-05 | Disponibilidad | Caída de Open-Meteo/WAQI/Sheets degrada sin tumbar el panel           | Parcial                 | Simular fallos; R-10                                    |
| RNF-06 | Usabilidad     | Operario registra→importa→exporta sin manual tras 10 min de inducción | No verificado           | Prueba de campo pendiente                               |
| RNF-07 | Portabilidad   | Chrome/Edge/Firefox/Safari y Android/iOS                              | No verificado           | Matriz de navegadores pendiente                         |
| RNF-08 | Mantenibilidad | Decisiones con ADR y documentación verificada contra `src/`           | Implementado            | 7 ADR + generador unificado                             |
| RNF-09 | Privacidad     | Respuestas de recuperación sin revelar destino                        | Incumplido parcialmente | `identifier` sin enmascarar y `404` que enumera cuentas |
| RNF-10 | Datos          | Reglas agronómicas (pH 6.0–6.8, semáforo) documentadas y probables    | Parcial                 | Importar fixture y revisar `badges.ts`                  |
| RNF-11 | Trazabilidad   | RF/CU/US → código → prueba → documento                                | Implementado            | TRACEABILITY-MATRIX (Capítulo 46 · DOC-42)              |

## 4. Restricciones

- Stack fijo: Astro SSR + Vercel + PostgreSQL en nube (ADR-001/002), sin disco persistente.
- Duración máxima de función: **`maxDuration: 60`** (`astro.config.mjs:15-19`; `trips-diagnosis.ts:4-7`). El presupuesto de inferencia ML es 50 s; el de SIATA, 3 s.
- La hoja Sheets debe ser pública/lectura; no se usan credenciales de Google (ADR-005).
- `WAQI_TOKEN` se lee en servidor con valor por defecto incrustado; rotar antes de producción masiva (R-02).
- La galería usa `public/uploads/gallery`, efímero en serverless; migrar a object storage (R-10).
- `ML_API_URL` por defecto apunta a Cloud Run; `ML_API_KEY` y credenciales admin tienen literales de respaldo (R-01).

## 5. Criterios de aceptación v1.1

1. Registro→login→dashboard en < 2 min con usuario nuevo (`Campesino`).
2. Importar el CSV maestro deja 20/20 plantas con datos y semáforo coherente con pH.
3. Exportar genera el `.xlsx` de 3 hojas con promedios calculados.
4. Sin sesión, `/metrics`, `/history`, `/settings` y `/gallery` no muestran datos.
5. Con Open-Meteo caído, el widget usa el fallback offline sin error visible.
6. `dueno`, `staff` y `miembro` pueden sincronizar Sheets; un usuario sin membresía recibe `403`.
7. La galería guarda la foto bajo la finca activa y el modal de trips devuelve un diagnóstico o un error explícito sin reintentos artificiales.

## 6. Trazabilidad

| Tema             | Código / configuración       | Documento relacionado                                                      | Verificación   |
| :--------------- | :--------------------------- | :------------------------------------------------------------------------- | :------------- |
| RF/RNF           | `src/pages/`, `src/backend/` | TRACEABILITY-MATRIX (Capítulo 46 · DOC-42), TESTING (Capítulo 33 · DOC-17) | Matriz §2 y §3 |
| Deriva histórica | `git log`, `src/`            | DOC-CONVENTIONS (Capítulo 6 · DOC-43)                                      | Tabla §5       |

---

# Capítulo 10. Casos de Uso (DOC-05)

**Ruta fuente:** `docs/USE_CASES.md` · **Parte:** Parte II. Contexto, dominio y producto

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-05**.

## Sistema: Macollo - Monitoreo y Simulación de Greenhouse

### Caso de Uso: CU-001 - Autenticación de Usuario

**Actor(es):** Usuario final, Sistema de autenticación
**Descripción:** El usuario se autentica en el sistema para obtener acceso a las funcionalidades protegidas.

**Flujo básico (registro + login):**

1. Usuario navega a `/` (login/registro), pestaña Registrarse
2. Usuario ingresa nombre, email/teléfono y contraseña (cliente exige ≥ 8; servidor ≥ 6)
3. `POST /api/auth/register` valida unicidad y guarda hash bcrypt; **el rol se asigna desde `accountType`** (`Campesino`/`Agropecuario`; los roles staff no se pueden pedir). Si es `Agropecuario` y envía `fincaNombre`, se crea su primera finca.
4. Usuario inicia sesión en la pestaña Iniciar Sesión (o con Google OAuth) y es redirigido a `/` (Dashboard); si es **staff (Admin/Superadmin) sin finca elegida**, a `/admin` para elegirla con **Entrar**.

**Flujo alternativo (OAuth):**

- Usuario usa el proveedor Google para iniciar sesión
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
2. La matriz se renderiza en servidor desde las lecturas de la finca activa (`getLecturasByFinca`) y se completa con datos importados/sincronizados
3. El navegador pide geolocalización y consulta clima (Open-Meteo directo; SIATA pausado, ADR-007) y AQI, con **refresco cada 10 minutos**
4. El usuario importa datos desde `/history` cuando hay nuevas tomas de campo

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

**Actor(es):** Usuario autenticado, Motor de exportación (ExcelJS / CSV)
**Descripción:** El usuario exporta las mediciones a Excel o CSV (`GET/POST /api/export-excel` para archivo `.xlsx` de 3 hojas; `GET /api/export-csv` para archivo `.csv` con historial tabular completo).

**Flujo básico:**

1. Usuario accede a `/history` o `/metrics`
2. Usuario hace clic en "Exportar a Excel" o "Exportar CSV"
3. Sistema genera el archivo (`.xlsx` o `.csv`) y lo descarga automáticamente

**Formatos compatibles:**

- Excel (.xlsx): Con encabezados, colores de sanidad, fórmulas y múltiples hojas por tipo de métrica
- CSV (.csv): Datos tabulares puros, compatible con Excel/Google Sheets

**Post-conditions:**

- Archivo generado y descargado
- Datos formateados según especificación

---

### Caso de Uso: CU-006 - Importación desde Google Sheets

**Actor(es):** Dueño de la finca (`rol_finca = 'dueno'`), Sistema de integración
**Descripción:** El usuario **importa** lecturas **desde** una hoja pública de Google Sheets (dirección Sheets → app; no se escribe en Sheets). **Implementado:** `POST /api/sync-sheets { url }` normaliza a `export?format=csv`, parsea columnas (`ID_planta`, `fecha`, `T_Ext_C`, `T_Int_C`, `humedad_Pct`, `T_Planta_C`, `Ph`, `ALtura_cm`…), resuelve la matriz 4×5, **persiste en `lecturas` de la finca activa** (`INSERT … ON CONFLICT` por finca+planta+fecha+hora) y devuelve `records` al cliente. Sin programación por intervalo.

**Flujo básico:**

1. **Dueño** de la finca activa accede a `/history` → "Conectar Google Sheets" (el botón no aparece a miembros ni staff y la API responde `403` si no es dueño)
2. Usuario pega la URL pública (documento con lectura _"Cualquier persona con el enlace"_ o _"Publicado en la web como CSV"_)
3. Sistema descarga el CSV, valida fechas/IDs (incluye regla 29/30-sep sin temp. de suelo) y muestra conteo importado
4. Dashboard/Métricas recargan desde PG (scopeadas por finca activa); opcionalmente se exporta a Excel

**Post-conditions:**

- Datos importados a `lecturas` de la finca activa (dirección Sheets → app; nunca se escribe en Sheets)
- El tablero/métricas reflejan las nuevas mediciones

---

### Caso de Uso: CU-007 - Recuperación de Contraseña

**Actor(es):** Usuario registrado, Sistema de email/SMS
**Descripción:** El usuario restablece su contraseña con un **código de 6 dígitos válido 15 minutos** (email vía SMTP o SMS). Implementado en `POST /api/auth/forgot-password` + `POST /api/auth/reset-password` con tabla `verification_token`.

**Flujo básico:**

1. Usuario indica su email o celular registrado
2. Sistema genera el código, invalida anteriores y lo envía. El mensaje muestra el destino enmascarado, pero el campo `identifier` de la respuesta JSON contiene el identificador canónico sin enmascarar (R-08).
3. Usuario ingresa código + nueva contraseña (mín. 8 en servidor)
4. Sistema verifica `token + expires > NOW()`, actualiza hash bcrypt e invalida el token

**Post-conditions:**

- Contraseña actualizada
- Usuario puede iniciar sesión con nueva contraseña
- Token de recuperación invalidado

## Trazabilidad

| Tema          | Código / configuración | Documento relacionado                                                        | Verificación           |
| :------------ | :--------------------- | :--------------------------------------------------------------------------- | :--------------------- |
| CU-001…CU-007 | `src/pages/api/*`      | REQUIREMENTS (Capítulo 9 · DOC-04), SEQUENCE_DIAGRAMS (Capítulo 13 · DOC-08) | Matriz de trazabilidad |

---

# Capítulo 11. User Stories (DOC-06)

**Ruta fuente:** `docs/USER_STORIES.md` · **Parte:** Parte II. Contexto, dominio y producto

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-06**.

## Authenticated Users

### US-001: Iniciar sesión

- **Usuario:** Cualquier usuario registrado
- **Descripción:** El usuario puede iniciar sesión en la aplicación usando sus credenciales (email y contraseña) o el proveedor OAuth Google.
- **Condiciones previas:** El usuario debe haber creado una cuenta.
- **Flujo principal:**
  1. El usuario navega a la página de login.
  2. El usuario ingresa su email y contraseña.
  3. El sistema valida las credenciales.
  4. El usuario es redirigido a `/` (Dashboard).
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

### US-007: Exportar datos a Excel y CSV

- **Usuario:** Usuario autenticado
- **Descripción:** El usuario puede exportar las mediciones a un archivo Excel (.xlsx) o CSV (.csv).
- **Formato:** Archivo `Macollo_Mediciones_Invernadero_YYYY-MM-DD.xlsx` con 3 hojas (Mediciones de Hoy, Historial Completo, Rangos Agronómicos), o archivo `.csv` descargable vía `GET /api/export-csv`.
- **Resultado esperado:** Archivos descargables vía `GET/POST /api/export-excel` y `GET /api/export-csv`.

### US-008: Ver historial de datos

- **Usuario:** Usuario autenticado
- **Descripción:** El usuario consulta el historial de lecturas pasadas.
- **Filtros:** Fecha específica (según las mediciones cargadas en la finca).
- **Resultado esperado:** Lista de lecturas con marca de tiempo y valores.

### US-009: Recuperar contraseña

- **Usuario:** Cualquier usuario registrado (con email o celular)
- **Descripción:** El usuario restablece su contraseña con un código de 6 dígitos válido 15 minutos, enviado por email (SMTP) o SMS.
- **Flujo principal:**
  1. El usuario indica su email o celular (`POST /api/auth/forgot-password`).
  2. El sistema guarda el código en `verification_token` y lo envía; el mensaje enmascara el destino, pero la respuesta JSON expone `identifier` sin enmascarar (R-08).
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

- **Usuario:** **Dueño** de la finca activa (`rol_finca='dueno'`)
- **Descripción:** El usuario importa lecturas **desde** una hoja pública de Google Sheets (dirección Sheets → app; no se escribe en Sheets).
- **Mecanismo:** `POST /api/sync-sheets { url }` (convierte a CSV, parsea columnas y **persiste en `lecturas` de la finca activa**). Otros miembros y staff reciben `403` (usar Importar Excel/CSV).
- **Resultado esperado:** Mediciones visibles en Dashboard/Métricas tras la importación.

### US-012: Panel del staff y finca activa

- **Usuario:** Superadmin / Admin
- **Descripción:** El staff aterriza en el panel `/admin` (lista de todas las fincas). Con **Entrar** fija la `finca_activa` (cookie) y abre su tablero/métricas/history como si fuera un miembro; puede archivar/restaurar. Solo Superadmin gestiona usuarios y elimina fincas.
- **Resultado esperado:** El staff opera cualquier finca sin ser miembro; el navbar muestra `Panel` y, con finca activa, `Tablero`/`Métricas`/`Historial`.

## Trazabilidad

| Tema          | Código / configuración                | Documento relacionado                                                | Verificación           |
| :------------ | :------------------------------------ | :------------------------------------------------------------------- | :--------------------- |
| US-001…US-011 | `src/pages/`, `src/backend/services/` | REQUIREMENTS (Capítulo 9 · DOC-04), USE_CASES (Capítulo 10 · DOC-05) | Matriz de trazabilidad |

---

# Capítulo 12. Diagramas UML - Macollo (DOC-07)

**Ruta fuente:** `docs/UML.md` · **Parte:** Parte II. Contexto, dominio y producto

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-07**.

> Mermaid, derivado del código (oct-2026). ER detallado en DATABASE (Capítulo 24 · DOC-14) §4; secuencias/actividades en sus docs.

## 1. Diagrama de clases (dominio agronómico + auth)

```mermaid
classDiagram
    class MetricRecord {
        +string id
        +string fila (t0..t3)
        +string columna (Col 1..5)
        +string plantId (P-01..P-20)
        +string code (T0-P1..)
        +string fecha (YYYY-MM-DD)
        +string hora
        +number phSuelo
        +number|null tempInterna
        +number tempExterna
        +number|null tempSuelo
        +number humedad
        +number|null alturaCm
        +number crecimiento
        +string faseCrecimiento
        +Alta|Media|Baja productividad
        +Excelente|...|Crítica sanidad
        +string responsable
    }
    class PlantMatrixItem {
        +string fila
        +string columna
        +string plantId
        +number plantNumber
        +string code
        +MetricRecord latestMetric
        +MetricRecord[] history
    }
    class MetricsService {
        +resolvePlantCoordinates() coords
        +buildPlantsGridFromRecords() matriz
        +getAllPlantsGrid() matriz
        +getPlantHistory() registros
        +getAllMetrics() registros
    }
    class WeatherService {
        +isValleDeAburra() bool
        +fetchWeatherData() WeatherData
        +getWeatherEmoji() string
    }
    class User {
        +int id
        +string name
        +string email
        +string phone
        +user_role_enum role
        +string password_hash
    }
    PlantMatrixItem *-- MetricRecord : latest + history
    MetricsService ..> PlantMatrixItem : construye
    MetricsService ..> MetricRecord : parsea
    User <.. AuthAPI : autentica
```

## 2. Diagrama de componentes

```mermaid
flowchart TB
    subgraph Client[Navegador]
        Pags[Páginas Astro: index, metrics, history, settings, farms, admin, gallery, invite]
        Comp[Componentes: Dashboard, Metrics, History, Settings, Navbar, NoFarm, Gallery, GalleryDetail, TripsDiagnosticModal]
        T3[Three.js: escena sol/luna + sombras]
        LS[Estado en memoria: plantsState, records Sheets]
        Pags --> Comp
        Comp --> T3
        Comp --> LS
    end
    subgraph Server[Astro SSR en Vercel]
        APIAuth[API auth: register, forgot/reset, Auth.js]
        APIXLS[API export-excel: ExcelJS 3 hojas]
        APICSV[API export-csv: descarga .csv]
        APISync[API sync-sheets: CSV → records]
        APIFarms[API farms: CRUD, miembros, invitaciones, lecturas]
        APIProxy[API siata: proxy timeout 3s]
        Svc[Servicios: plantMatrix, sheetsSync, excelExport, weather, siata, notifications]
        MW[middleware: fix proxy + guarda rutas reales]
    end
    subgraph Ext[Externos]
        PG[(PostgreSQL: auth activo)]
        SHEETS[(Google Sheets CSV público)]
        SIATA[(SIATA :8089)]
        OM[(Open-Meteo)]
        AQI[(waqi.info)]
        SMTP[(SMTP Gmail)]
    end
    Comp -->|fetch JSON / xlsx| APIAuth & APIXLS & APISync & APIProxy
    APIAuth --> PG & SMTP
    APISync --> SHEETS
    APIProxy --> SIATA
    Comp --> OM & AQI
    Svc -.-> APIAuth & APIXLS & APISync
```

## 3. Diagrama de despliegue

```mermaid
flowchart LR
    subgraph Dev[Desarrollo]
        DEV[pnpm dev :4321 + PG local :5432]
    end
    subgraph VercelNube[Vercel + nube]
        CDN[Edge / Functions SSR]
        PGc[(PostgreSQL gestionado)]
        CDN --> PGc
    end
    subgraph Campo[Campo]
        NAV[Navegador operario]
        SHEET[Google Sheets del equipo]
    end
    NAV -->|HTTPS| CDN
    CDN -->|CSV público| SHEET
    CDN --> SIATA & OM & SMTPg
    SIATA[(SIATA)] --- CDN
    OM[(Open-Meteo)] --- CDN
    SMTPg[(SMTP Gmail)] --- CDN
```

## 4. Diagrama de estados (planta)

```mermaid
stateDiagram-v2
    [*] --> SinDatos: buildPlantsGrid sin historial
    SinDatos --> Optimo: sync con sanidad Excelente/Saludable
    SinDatos --> Atencion: sync con sanidad Vulnerable
    SinDatos --> Critico: sync con sanidad Crítica
    Optimo --> Atencion: nueva toma Vulnerable
    Optimo --> Critico: nueva toma Crítica
    Atencion --> Optimo: nueva toma Saludable+
    Atencion --> Critico: nueva toma Crítica
    Critico --> Atencion: nueva toma Vulnerable
    Critico --> Optimo: nueva toma Saludable+
```

## Trazabilidad

| Tema                 | Código / configuración                      | Documento relacionado                                               | Verificación |
| :------------------- | :------------------------------------------ | :------------------------------------------------------------------ | :----------- |
| Clases y componentes | `src/db/*.sql`, `src/shared/plantMatrix.ts` | DOMAIN-MODEL (Capítulo 8 · DOC-32), DATABASE (Capítulo 24 · DOC-14) | ER Mermaid   |

---

# Capítulo 13. Diagramas de Secuencia (DOC-08)

**Ruta fuente:** `docs/SEQUENCE_DIAGRAMS.md` · **Parte:** Parte II. Contexto, dominio y producto

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-08**.

## SD-001: Flujo de Autenticación

```mermaid
sequenceDiagram
    participant User as Usuario
    participant Front as Frontend (Astro)
    participant Auth as Auth.js
    participant DB as PostgreSQL
    participant API as API Routes

    %% Login flow
    User->>Front: Navega a login
    Front->>Auth: Intenta autenticar credenciales
    Auth->>DB: Valida email y contraseña
    DB-->>Auth: Usuario encontrado/contraseña válida
    Auth-->>Front: Token de sesión válido
    Front->>User: Redirige al dashboard

    %% Failed login
    alt Credenciales inválidas
        Auth-->>Front: Error de autenticación
        Front-->>User: Mostrar mensaje "Credenciales inválidas"
    end
```

## SD-002: Flujo de Monitoreo (Dashboard + Clima)

```mermaid
sequenceDiagram
    participant User as Usuario/Dashboard
    participant Page as Página / (SSR, lecturas + plantMatrix)
    participant Geo as Geolocalización navegador
    participant Proxy as GET /api/siata (proxy)
    participant OM as Open-Meteo API
    participant AQI as waqi.info (AQI)

    User->>Page: Accede a / (con sesión)
    Page-->>User: Matriz 4×5 + escena 3D (dataset en memoria)
    User->>Geo: Solicitar ubicación
    alt Ubicación concedida
        Geo-->>User: lat/lon del dispositivo
    else Denegada o sin soporte
        User->>User: Fallback Medellín (6.2442, -75.5812)
    end
    User->>Proxy: GET /api/siata (si Valle de Aburrá)
    Proxy-->>User: Temperatura local (o 500 → fallback)
    User->>OM: Clima Open-Meteo (temp, humedad, lluvia, viento)
    OM-->>User: Datos America/Bogota
    User->>AQI: Índice calidad del aire
    AQI-->>User: AQI (ÓPTIMO…PELIGROSO)
    Note over User: Refresco de clima cada 10 min (setInterval)
    User-->>User: Widgets + ciclo sol/luna actualizados
```

## SD-003: Flujo de Exportación a Excel

```mermaid
sequenceDiagram
    participant User as Usuario
    participant Page as Métricas / Historial
    participant API as /api/export-excel (ExcelJS)

    User->>Page: Selecciona fecha / plantas
    alt Desde Métricas
        Page->>API: POST /api/export-excel { plants }
    else Desde Historial
        Page->>API: GET /api/export-excel (redirect)
    end
    API->>API: generateExcelBuffer (3 hojas + promedios AVERAGE)
    API-->>Page: .xlsx (Macollo_Mediciones_Invernadero_FECHA.xlsx)
    Page-->>User: Descarga automática del archivo
```

## SD-004: Flujo de Importación desde Google Sheets

```mermaid
sequenceDiagram
    participant User as Usuario (Admin)
    participant Page as Página Historial
    participant API as POST /api/sync-sheets
    participant Google as Google Sheets (CSV público)

    User->>Page: Pega URL pública del Sheet
    Page->>API: POST /api/sync-sheets { url }
    API->>API: normalizeGoogleSheetUrl (export?format=csv)
    API->>Google: Descarga CSV (sin credenciales)
    Google-->>API: Texto CSV
    API->>API: parseCSV + resolvePlantCoordinates + defaults
    API-->>Page: { success, count, records }
    Page-->>User: Dataset en memoria (Dashboard/Métricas)
    Note over Page,API: No persiste en PostgreSQL (brecha, ver DATABASE §5)
```

## Trazabilidad

| Tema          | Código / configuración                          | Documento relacionado                                              | Verificación        |
| :------------ | :---------------------------------------------- | :----------------------------------------------------------------- | :------------------ |
| SD-001…SD-004 | `src/pages/api/auth/*`, `src/pages/api/farms/*` | USE_CASES (Capítulo 10 · DOC-05), ENDPOINTS (Capítulo 19 · DOC-12) | Revisión de Mermaid |

---

# Capítulo 14. Diagramas de Actividad (DOC-09)

**Ruta fuente:** `docs/ACTIVITIES.md` · **Parte:** Parte II. Contexto, dominio y producto

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-09**.

## AD-001: Flujo de Login del Usuario

```mermaid
flowchart TD
    A[Usuario navega a login] --> B[Ingresar email y contraseña]
    B --> C{Credenciales válidas?}
    C -- No --> D[Mostrar error "Credenciales inválidas"]
    D --> B
    C -- Sí --> E[Generar token de sesión]
    E --> F[Guardar sesión en cookies]
    F --> G[Redirigir al dashboard]
    G --> H[Mostrar bienvenida usuario]
```

## AD-002: Flujo de Configuración de Umbrales de Alerta ⚠️ PROPUESTO (no implementado)

> Estado real (oct-2026): Settings no tiene UI de umbrales. Diagrama objetivo futuro.

```mermaid
flowchart TD
    A[Usuario accede a configuración] --> B[Ingresar umbrales temperatura]
    B --> C[Ingresar umbrales humedad]
    C --> D[Ingresar umbrales luz]
    D --> E[Validar que min < max]
    E -- No --> F[Mostrar error: "Mínimo debe ser menor que máximo"]
    F --> B
    E -- Sí --> G[Guardar configuración en BD]
    G --> H[Mostrar confirmación "Configuración guardada"]
    H --> I[Sistema comienza monitoreo]
    I --> J[Generar alerta si se supera umbral]
    J --> K[Mostrar notificación push/toast]
```

## AD-003: Flujo de Exportación de Datos

```mermaid
flowchart TD
    A[Usuario en Métricas o Historial] --> B{Origen}
    B -- Métricas --> C[POST /api/export-excel con plants filtrado]
    B -- Historial --> D[GET /api/export-excel redirect]
    C --> E[Generar .xlsx 3 hojas con ExcelJS]
    D --> E
    E --> G[Descargar archivo automáticamente]
    G --> H[Mostrar notificación Descarga completada]
```

> Soporta `.xlsx` (3 hojas: Mediciones de Hoy, Historial Completo, Rangos Agronómicos con ExcelJS) y `.csv` (`GET /api/export-csv`).

## AD-004: Flujo de Importación desde Google Sheets

```mermaid
flowchart TD
    A[Dueño de la finca accede a Historial] --> B[Pegar URL pública del Sheet]
    B --> C[POST /api/sync-sheets: normalizar a export CSV]
    C --> D[Descargar y parsear CSV sin credenciales]
    D --> E{Registros válidos?}
    E -- No --> F[Mostrar error 422: revisar permisos del documento]
    F --> A
    E -- Sí --> H[Resolver matriz 4x5 + defaults + regla 29/30-sep]
    H --> I[Persistir en lecturas de la finca activa ON CONFLICT]
    I --> J[Devolver records al cliente]
    J --> K[Mostrar conteo importado]
    K --> L[Dashboard/Métricas recargan desde PG]
    A -. no dueño .-> X[403 / botón oculto]
```

> Dirección **Sheets → app** (nunca se escribe en Sheets). **Dueño, staff y miembro** de la finca activa pueden sincronizar (`canConnectSheets` en `authz.ts:127-129`); los datos **persisten en `lecturas`** de la finca (ver DATABASE §5).

## Trazabilidad

| Tema          | Código / configuración                      | Documento relacionado                                                      | Verificación                |
| :------------ | :------------------------------------------ | :------------------------------------------------------------------------- | :-------------------------- |
| AD-001…AD-004 | `src/pages/api/*`, `src/backend/services/*` | USE_CASES (Capítulo 10 · DOC-05), SEQUENCE_DIAGRAMS (Capítulo 13 · DOC-08) | Revisión de Mermaid y rutas |

---

# Capítulo 15. 📖 Manual de Usuario - Macollo (DOC-10)

**Ruta fuente:** `docs/USER_MANUAL.md` · **Parte:** Parte II. Contexto, dominio y producto

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-10**.

¡Bienvenido a **Macollo**! Plataforma web para el **monitoreo agronómico de un invernadero real**: 20 plantas organizadas en matriz (4 filas × 5 columnas), métricas de suelo y ambiente, historial por fecha e integración con clima externo (SIATA / Open-Meteo) y Google Sheets.

> **Rutas principales:** `Inicio (/)` · `Métricas (/metrics)` · `Historial (/history)` · `Galería (/gallery)` · `Configuración (/settings)` · `Fincas (/farms)` · `Panel staff (/admin)`. El acceso (login/registro) está en `/` (la antigua `/signin` redirige a `/`).
>
> **Modelo multi-finca:** cada cuenta ve/opera sobre su **finca activa** (se elige en `/farms` o en el panel). Cada finca tiene 20 plantas (matriz 4×5).

---

## Índice

1. [Roles de usuario](#1-roles-de-usuario)
2. [Acceso al sistema](#2-acceso-al-sistema)
3. [Navegación general](#3-navegación-general)
4. [Inicio - Dashboard principal](#4-inicio--dashboard-principal)
5. [Métricas agronómicas](#5-métricas-agronómicas)
6. [Historial cronológico](#6-historial-cronológico)
7. [Galería de fotos](#7-galería-de-fotos)
8. [Configuración](#8-configuración)
9. [Datos climáticos externos](#9-datos-climáticos-externos)
10. [Solución de problemas (FAQ)](#10-solución-de-problemas-faq)
11. [Glosario](#11-glosario)

---

## 1. Roles de usuario

Al registrarte eliges un rol (se guarda en la tabla `users` de PostgreSQL y viaja en la sesión JWT):

| Rol                    | Qué puede hacer                                                                                                                                          |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Campesino**          | Trabaja en las fincas a las que se une por invitación. Consulta dashboard, métricas e historial; registra mediciones. No configura la finca.             |
| **Agropecuario**       | Todo lo del Campesino + crea sus propias fincas y las gestiona (editar, invitar, expulsar miembros). Es **dueño** de esas fincas.                        |
| **Admin** (staff)      | Ve **todas** las fincas, entra a cualquiera (`/admin` → **Entrar**), las archiva/restaura y opera sus datos. No gestiona usuarios/roles ni borra fincas. |
| **Superadmin** (staff) | Acceso total: además gestiona usuarios/roles y **elimina fincas** (hard delete) desde `/admin`.                                                          |

> **Rol de finca vs. rol de sistema:** el rol de sistema (arriba) es global. Dentro de cada finca, quien la creó es **dueño** (`rol_finca='dueno'`) y el resto son **miembros**. Solo el **dueño** conecta/sincroniza Google Sheets; registrar mediciones manualmente (Excel/CSV) lo puede hacer cualquier miembro.

> ⚠️ **Nota:** en el registro solo puedes elegir entre **Campesino** (por defecto) o **Agropecuario** (`POST /api/auth/register` rechaza roles staff). Los roles **Admin** y **Superadmin** se asignan desde fuera (panel `/admin` o `scripts/seed-admin.mjs`).

Tu nombre y rol se muestran en el encabezado del Historial y Métricas como `Sesión activa: Nombre (Rol)`.

---

## 2. Acceso al sistema

### 2.1. Iniciar sesión (`/`)

1. Abre la página **`/`**. Verás la tarjeta **Bienvenido / Sistema de monitoreo ambiental** con dos pestañas.
2. En la pestaña **Iniciar Sesión** ingresa:
   - **Correo Electrónico** (ej. `ejemplo@correo.com`). También puedes usar tu nombre de usuario o teléfono registrado.
   - **Contraseña**.
3. Haz clic en **Iniciar Sesión**. Verás `Verificando credenciales en PostgreSQL...` y luego `¡Sesión iniciada! Redirigiendo...`.
4. Serás llevado a `/` (Dashboard). Si eres **staff (Admin/Superadmin) sin finca elegida**, irás a `/admin` para elegir la finca con **Entrar**.

> La ruta antigua **`/signin`** sigue existiendo pero solo **redirige a `/`** (conservando invitaciones `?code=` / `?desde=`).

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

> Si intentas abrir una ruta privada sin sesión (`/metrics`, `/history`, `/gallery`, etc.), el middleware te redirige forzosamente a `/`.

---

## 3. Navegación general

La **Navbar** (barra superior, logo `Macollo` 🍈) está presente en todas las páginas autenticadas:

- **Inicio** (`/`) — Dashboard con la matriz de cultivos.
- **Métricas** (`/metrics`) — Análisis agronómico detallado.
- **Historial** (`/history`) — Consulta por fecha, importación y exportación.
- **Galería** (`/gallery`) — Fotos de la finca activa, compartidas entre sus miembros.
- **Configuración** (`/settings`) — Perfil y preferencias.

Comportamiento:

- El enlace activo se resalta en verde.
- En móvil usa el botón **☰ (hamburguesa)** para desplegar el menú.
- La interfaz soporta **modo claro / oscuro / automático** (ver [Configuración](#8-configuración)). El modo oscuro es ideal para trabajo nocturno en campo.

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

### 4.6. Escanear trips con IA

El botón flotante **📸 Escanear Trips** abre el diagnóstico fitosanitario con la cámara del celular (API BioCLIP 2.5).

1. Pulsa **Activar Cámara** o **Subir Foto**.
2. Centra el insecto/hoja con buena luz y captura.
3. La imagen se envía a la API de ML y se muestra el resultado (si es trips, etapa y recomendaciones).
4. La foto se guarda automáticamente en la **galería de la finca activa**.

> En HTTP por IP el navegador no permite cámara directa; el modal abre la cámara nativa del teléfono. Si el servidor de IA está apagado verás el aviso de "servidor offline".

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

## 6. Historial cronológico (`/history`)

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

### 6.3. Conectar Google Sheets (dueño, staff o miembro)

1. Haz clic en **Conectar Google Sheets** (`btn-open-sheets-modal`). Si no tienes acceso a la finca activa, **el botón no aparece** (la API responde `403`). Pueden usarlo `dueno`, `staff` y `miembro` (`canConnectSheets`).
2. Pega la **URL pública del Sheet** (debe estar publicado como CSV o enlace de exportación, ej. `https://docs.google.com/spreadsheets/d/TU_ID/edit#gid=0`).
3. El sistema convierte la URL a formato `export?format=csv`, descarga y persiste en las `lecturas` de la finca activa (`POST /api/sync-sheets`).
4. Verás confirmación de éxito o error de conexión.

> Exclusivo del **dueño** de la finca (quien la creó) o de quien tenga `rol_finca='dueno'`. Ni los demás miembros ni el staff pueden conectar Sheets; ellos pueden **Importar Excel/CSV** manualmente (§6.2).

### 6.4. Exportar a Excel y CSV

1. Selecciona fecha (y opcionalmente rango `inicio/fin` y métrica).
2. Haz clic en **Exportar a Excel** o **Exportar CSV**.
3. Se descarga un `.xlsx` generado con ExcelJS (`GET/POST /api/export-excel`), con hojas por tipo de métrica, o un `.csv` plano (`GET /api/export-csv`) con todo el historial de la finca activa, listo para análisis directo de datos o auditoría.

---

## 7. Galería de fotos (`/gallery`)

Muestra las fotografías tomadas en la **finca activa**. La galería es **compartida**: todos los miembros de esa finca ven las fotos que suba cualquier compañero, pero **no** ven las de otras fincas.

- **Miniaturas:** imagen completa sin recorte, con autor, fecha, dimensiones y tamaño.
- **Ver en grande:** haz clic en una foto (o en la lupa) para abrir `/gallery/[id]`.
- **Zoom:** clic en la imagen ampliada; `Esc` o la ✕ para cerrar.
- **Descargar / Compartir:** botones en la vista de detalle (compartir usa el menú nativo del celular o copia el enlace).
- **Cambiar de finca:** usa el selector de finca en la Navbar; la galería cambia automáticamente.

Las fotos se guardan al usar **Escanear Trips** (ver [4.6](#46-escanear-trips-con-ia)).

---

## 8. Configuración (`/settings`)

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
- (Solo **Superadmin**) Eliminar cuenta de usuario o finca (hard delete) desde el panel `/admin`.

> Lee siempre el mensaje de confirmación antes de aceptar.

---

## 9. Datos climáticos externos

El sistema combina tus sensores con clima externo:

- **Open-Meteo (fuente actual):** temperatura, humedad, probabilidad de lluvia y viento por coordenadas, con refresco cada 10 min.
- **SIATA (pausado):** la red local de Medellín está temporalmente fuera de línea; el proxy interno se mantiene para reactivarlo sin cambios en el panel.

No debes hacer nada: si hay internet verás el clima en vivo; si no, valores de respaldo. Si ves un icono de lluvia, es la predicción de la hora actual.

---

## 10. Solución de problemas (FAQ)

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

**Google Sheets dice "Error de autenticación" o no veo el botón.**
El botón **Conectar Google Sheets** aparece para **dueño, staff y miembro** de la finca activa (`canConnectSheets`); si no tienes membresía, usa **Importar Excel/CSV**. Además, la hoja debe estar **publicada/compartida como lector** (enlace `export?format=csv` accesible). Verifica el ID del documento.

**La página me devuelve al inicio.**
Tu sesión expiró o no tienes rol suficiente. Inicia sesión de nuevo.

---

## 11. Glosario

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

_Macollo © 2026 — Sistema de Monitoreo Ambiental. Para soporte técnico contacta al administrador del cultivo o al equipo de desarrollo (ver README)._

## Trazabilidad

| Tema              | Código / configuración | Documento relacionado                                     | Verificación     |
| :---------------- | :--------------------- | :-------------------------------------------------------- | :--------------- |
| Flujos de usuario | `src/pages/*.astro`    | ROUTES (Capítulo 17 · DOC-11), FAQ (Capítulo 16 · DOC-45) | Recorrido manual |

---

# Capítulo 16. Preguntas Frecuentes (FAQ) (DOC-45)

**Ruta fuente:** `docs/FAQ.md` · **Parte:** Parte II. Contexto, dominio y producto

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-45**.

## 1. Para usuarios de campo

### ¿Por qué veo `--` o "Sin mediciones" en el tablero?

Porque la finca activa no tiene lecturas en `lecturas`. Ve a `/history`, importa un Excel/CSV o conecta una Google Sheets pública. Fuente: DATA-FLOW (Capítulo 28 · DOC-33) §3.

### ¿Quién puede conectar una Google Sheets?

Cualquier persona con acceso a la finca: el dueño, un miembro invitado o el staff (Superadmin/Admin). La comprobación real es `canConnectSheets()` en `src/backend/services/authz.ts:127-129`. Las versiones antiguas de la documentación decían "solo el dueño"; estaba desactualizado.

### ¿Qué permisos debe tener la hoja?

Debe ser legible por cualquiera con el enlace o estar publicada como CSV. Macollo no usa credenciales de Google para leerla. Si falla, la API responde `422` con instrucciones (ERROR-CATALOG (Capítulo 30 · DOC-35) §5).

### ¿La frecuencia de sincronización de Settings hace que lleguen datos automáticamente?

No. Es una preferencia de refresco de la interfaz (1/5/15/60 min). No existe ingesta IoT automática; está en el ROADMAP (Capítulo 37 · DOC-23). Fuente: `src/shared/preferences.ts:91-100`.

### ¿Puedo usar la cámara desde el celular si entro por `http://IP`?

Sí, pero no con `getUserMedia`: el modal detecta el contexto no seguro y abre la cámara nativa mediante `input[capture]`. También puedes elegir "Subir Foto". Para `getUserMedia` real necesitas HTTPS. Ver CAMERA-ML (Capítulo 22 · DOC-26).

### ¿Por qué las fotos desaparecen después de un despliegue?

Porque se guardan en `public/uploads/gallery/` del servidor; en Vercel el filesystem es efímero. Es una deuda conocida (R-10). Ver OPERATIONS-RUNBOOK (Capítulo 44 · DOC-40).

### ¿Qué significan los colores del semáforo?

Verde = Excelente/Saludable u Óptimo (pH 6.0–6.8); amarillo = Vulnerable o pH en atención (5.5–7.2); rojo = Crítico; gris = sin datos. Umbrales en `src/shared/badges.ts`.

### ¿Puedo cambiar mi correo desde Settings?

No. El correo es solo lectura; el nombre y el avatar sí se editan (`PATCH /api/users/me`). Para cambiar el correo, contacta al administrador.

### ¿El resumen semanal llega automáticamente?

El botón de Settings envía un resumen bajo demanda. La marca de "último envío" y la preferencia viven en `localStorage`, así que no hay un cron del servidor que lo dispare por ti.

## 2. Para desarrolladores

### ¿Dónde está el dashboard?

En `/`. No existe `/dashboard`. La portada cambia según sesión y rol: `Welcome`, tablero, `NoFarm` o panel `/admin` para staff sin finca. Ver ROUTES (Capítulo 17 · DOC-11).

### ¿Por qué el rol del JWT puede quedar desactualizado?

El token incluye el rol, pero los handlers lo releen de PostgreSQL (`getAuthUser`). Tras cambiar un rol en `/admin`, el usuario debe cerrar sesión y volver a entrar para que la UI muestre la etiqueta nueva.

### ¿Qué es `finca_activa`?

Una cookie `HttpOnly`, `SameSite=Lax` y `Secure` en producción con 30 días de validez. Determina el scope de lecturas, fotos y mayoría de endpoints. Fuente: `src/backend/services/authz.ts:137-160`.

### ¿Hay tests automatizados?

No. No hay archivos `*.test.*` ni configuración de Vitest/Jest. La verificación es manual según TESTING (Capítulo 33 · DOC-17). Es un riesgo abierto R-11.

### ¿Por qué el generador del PDF falla si añado un Markdown nuevo?

Porque el manifiesto exige que **todos** los `.md` de `docs/` estén declarados. Hay que añadirlo a `docs/UNIFIED/manifest.json`, al índice README (Capítulo 1 · DOC-00) y regenerar. Ver DOC-CONVENTIONS (Capítulo 6 · DOC-43).

### ¿Cómo se generan los diagramas del PDF?

No se renderizan como imagen: se conserva su código Mermaid en un bloque monoespacio rotulado. Para verlos graficados, abre los `.md` en un visor con soporte Mermaid (GitHub, VS Code).

### ¿Qué hash usa bcrypt y cuánto duran los códigos de recuperación?

bcrypt con salt 10 y código de 6 dígitos válido 15 minutos en `verification_token`. Ver AUTH (Capítulo 20 · DOC-13).

### ¿Qué pasa si falla la inserción de lecturas durante una sincronización?

Se loguea el error pero la respuesta HTTP sigue siendo `success:true` con `guardadas:0`. Es un comportamiento a corregir; documentado como pérdida silenciosa en ERROR-CATALOG (Capítulo 30 · DOC-35) §5 y DATA-FLOW (Capítulo 28 · DOC-33) §3.

### ¿Dónde están las capturas de pantalla del índice antiguo?

Ahora están en `docs/capturas/` (CAP-01…CAP-08) y se incrustan en el PDF unificado como DOC-46. Se generan con Playwright, sin Astro Admin ni `/admin`; la corrección de deriva #8 se actualizó en DOC-CONVENTIONS (Capítulo 6 · DOC-43).

### ¿Puedo ejecutar `pnpm astro check` en CI?

Sí; es la validación de tipos disponible. El hook de Husky solo ejecuta Prettier y bloquea secretos, no reemplaza a `astro check`.

## 3. Para evaluadores

### ¿Qué entregable resume todo el sistema?

El Resumen Ejecutivo (Capítulo 5 · DOC-30) y el PDF unificado en `docs/UNIFIED/Macollo-Documentacion-Unificada.pdf`.

### ¿Cómo se demuestra la conexión entre requisitos y código?

Con la Matriz de Trazabilidad (Capítulo 46 · DOC-42): RF → CU/US → archivo de código → endpoint → verificación → documento.

### ¿Qué decisiones arquitectónicas están justificadas?

Siete ADR en decisions (Apéndice A, ADR-001…ADR-007): SSR en Vercel, PostgreSQL cloud, Auth.js JWT, proxy SIATA dual, Sheets CSV, bcrypt+recuperación y bypass de SIATA.

### ¿Cuál es la deuda técnica más crítica?

Secretos por defecto (R-01/R-02), SSRF en `sync-sheets` (R-03), ausencia de pruebas (R-11) y storage efímero de fotos (R-10). Detalle en THREAT-MODEL (Capítulo 40 · DOC-36).

## 4. Trazabilidad

| Pregunta        | Código                                      | Documento relacionado                 | Verificación       |
| :-------------- | :------------------------------------------ | :------------------------------------ | :----------------- |
| Permisos Sheets | `authz.ts:127-129`                          | AUTH (Capítulo 20 · DOC-13)           | Probar con miembro |
| Datos vacíos    | `readings.ts`                               | USER_MANUAL (Capítulo 15 · DOC-10)    | Importar fixture   |
| Cámara HTTP     | `TripsDiagnosticModal.astro`                | CAMERA-ML (Capítulo 22 · DOC-26)      | Prueba en celular  |
| Frecuencia      | `preferences.ts:91-100`                     | ROADMAP (Capítulo 37 · DOC-23)        | Settings           |
| Errores de sync | `sync-sheets.ts:112-126`                    | ERROR-CATALOG (Capítulo 30 · DOC-35)  | Revisar logs       |
| PDF             | el generador de documentación (no incluido) | DOC-CONVENTIONS (Capítulo 6 · DOC-43) | `pdfinfo`          |

---

# Capítulo 17. Rutas de página (Routes) de Macollo (DOC-11)

**Ruta fuente:** `docs/ROUTES.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

## 1. Alcance y mecanismo de enrutamiento

Macollo utiliza **enrutamiento basado en archivos de Astro**: cada archivo `*.astro` bajo `src/pages/` constituye una ruta de página SSR. La configuración efectiva reside en `astro.config.mjs` (`output: "server"`, adaptador `@astrojs/vercel`, integraciones `auth()` y `react()`, `security.checkOrigin: true`). La capa transversal de autenticación, limitación de tasa y cabeceras de seguridad reside en `src/middleware.ts`; la configuración de Auth.js (proveedores `Credentials` y `Google`, sesión JWT, `pages.signIn: "/"`) reside en `auth.config.ts`.

La protección real de una ruta es **estratificada**:

1. **Middleware** (`src/middleware.ts`): exige sesión para las páginas de `PROTECTED_PAGES` y para los prefijos de API de `PROTECTED_API_PREFIXES`; en páginas redirige a `/?desde=…` y en APIs responde `401 { "message": "No autenticado." }`.
2. **Página o manejador**: revalida la sesión y los permisos específicos (`getAuthUser`, `getFincaAccess`, `canManageSystem`, `resolveActiveFinca`), conforme al modelo _Zero Trust_ documentado en `src/backend/services/authz.ts`.

> Nota de precisión: `PROTECTED_PAGES` incluye `/gallery` (y por prefijo `/gallery/[id]`). Versiones anteriores de este documento omitían ese hecho.

---

## 2. Tabla maestra de rutas de página

| #   | Ruta             | Archivo de implementación       | Método    | Protección efectiva                     | Comportamiento y redirecciones                                                                                                                                                                                                                                                      | Documento relacionado                                            |
| :-- | :--------------- | :------------------------------ | :-------- | :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| 1   | `/`              | `src/pages/index.astro`         | GET (SSR) | Pública, con ramas por sesión/rol       | Sin sesión renderiza `Welcome.astro`; con sesión y rol `Superadmin`/`Admin` sin cookie `finca_activa` válida redirige a `/admin`; con finca activa renderiza `Navbar` + `Dashboard.astro` + `TripsDiagnosticModal.astro`; sin finca renderiza `NoFarm.astro`.                       | AUTH (Capítulo 20 · DOC-13), COMPONENTS (Capítulo 23 · DOC-27)   |
| 2   | `/signin`        | `src/pages/signin.astro`        | GET (SSR) | Pública (**alias retrocompatible**)     | No renderiza contenido: sin sesión redirige a `/` conservando `?desde=` y `?code=`; con sesión redirige a `desde` (o `/`). La página real de acceso es `/` (`Welcome.astro`, configurada como `pages.signIn` en `auth.config.ts`).                                                  | AUTH (Capítulo 20 · DOC-13)                                      |
| 3   | `/metrics`       | `src/pages/metrics.astro`       | GET (SSR) | Middleware + sesión + finca activa      | Tras `getAuthUser` y `listFincasForUser`, si no existe ninguna finca activa redirige a `/farms`. Renderiza `Metrics.astro` con nombre y rótulo de rol (`src/shared/roles.ts`).                                                                                                      | DATA-DICTIONARY (Capítulo 25 · DOC-15)                           |
| 4   | `/history`       | `src/pages/history.astro`       | GET (SSR) | Middleware + sesión + finca activa      | Misma comprobación que `/metrics`: sin finca activa redirige a `/farms`. Renderiza `History.astro` ( selectors de fecha, importación/sincronización y exportación).                                                                                                                 | FIELD-PROTOCOL (Capítulo 26 · DOC-21)                            |
| 5   | `/settings`      | `src/pages/settings.astro`      | GET (SSR) | Middleware + sesión                     | Renderiza `Settings.astro` (perfil, preferencias, notificaciones, mis fincas). El complemento de la ruta es `PATCH /api/users/me` y `POST /api/notifications/weekly-summary`.                                                                                                       | AUTH (Capítulo 20 · DOC-13)                                      |
| 6   | `/farms`         | `src/pages/farms/index.astro`   | GET (SSR) | Middleware + sesión                     | Sin usuario redirige a `/`. Lista `listFincasForUser`; oculta el formulario de creación a `Campesino`; consume `POST /api/farms`, `POST /api/farms/active` y `POST /api/invitations/use`.                                                                                           | ENDPOINTS (Capítulo 19 · DOC-12)                                 |
| 7   | `/farms/[id]`    | `src/pages/farms/[id].astro`    | GET (SSR) | Middleware + sesión + acceso a la finca | Valida `id` entero positivo y `getFincaAccess(...) !== "none"`; en caso contrario redirige a `/farms`. Muestra gestión (datos, invitaciones, miembros, archivo, borrado) solo si `canManageFinca`; el borrado definitivo exige `canHardDeleteFinca` (Superadmin).                   | AUTH (Capítulo 20 · DOC-13)                                      |
| 8   | `/gallery`       | `src/pages/gallery/index.astro` | GET (SSR) | Middleware + sesión                     | `export const prerender = false`. Renderiza `Gallery.astro`, que consulta `photos` filtrando por `finca_id = finca_activa` (galería compartida por los miembros de la finca, no por autor).                                                                                         | ENDPOINTS (Capítulo 19 · DOC-12)                                 |
| 9   | `/gallery/[id]`  | `src/pages/gallery/[id].astro`  | GET (SSR) | Middleware + sesión                     | `export const prerender = false`. `GalleryDetail.astro` valida que `photos.finca_id` coincida con la finca activa; si no, redirige a `/gallery`. La imagen se sirve mediante `GET /api/gallery/:id/file`.                                                                           | ENDPOINTS (Capítulo 19 · DOC-12)                                 |
| 10  | `/invite/[code]` | `src/pages/invite/[code].astro` | GET (SSR) | Pública                                 | Normaliza el código a mayúsculas y usa `peekInvitacion` (`src/backend/services/farms.ts`). Sin sesión ofrece `/?desde=/invite/CODE`; con sesión permite confirmar mediante `POST /api/invitations/use`. Código inválido/expirado/agotado muestra un mensaje de error sin redirigir. | AUTH (Capítulo 20 · DOC-13)                                      |
| 11  | `/admin`         | `src/pages/admin.astro`         | GET (SSR) | Middleware + sesión + **staff**         | `getAuthUser` y comprobación `Superadmin`/`Admin`; cualquier otro rol redirige a `/`. Lista todas las fincas (`soloActivas: false`). Solo Superadmin ve la tabla de usuarios, el cambio de roles, la eliminación de cuentas y «Eliminar finca» (hard delete).                       | AUTH (Capítulo 20 · DOC-13), DATABASE (Capítulo 24 · DOC-14)     |
| 12  | `/landing`       | `src/pages/landing.astro`       | GET (SSR) | Pública                                 | Se sirve directamente en `/landing` en cualquier host, incluido `localhost:4321`. No hay lógica de host ni redirecciones en el middleware. Canonical derivado de la petición y CTA a `/`. No usa `Layout.astro` ni sesión.                                                          | LANDING (Capítulo 18 · DOC-47), ADR-008 (Apéndice A.8 · ADR-008) |

**Total de rutas de página: 12** (11 rutas estáticas/dinámicas propias más el alias `/signin`; de ellas, 8 están protegidas por middleware y 4 son públicas: `/`, `/signin`, `/invite/[code]` y `/landing`). `/landing` es accesible en cualquier host; su publicación en un dominio/subdominio definitivo está pendiente de decisión.

---

## 3. Fichas de comportamiento de las rutas de página

### 3.1 `/` — entrada única

**Archivo:** `src/pages/index.astro`. Resuelve `getSession`, `resolveActiveFinca` y `getFincaCookie` en el servidor.

| Estado                           | Resultado                                                                                                  |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| Sin sesión                       | `Welcome.astro`: pestañas de inicio de sesión (Credentials/Google) y registro (`POST /api/auth/register`). |
| Staff sin cookie de finca válida | `Astro.redirect("/admin")`. Es el «Inicio» operativo de Superadmin/Admin.                                  |
| Sesión con finca activa          | `Navbar` + `Dashboard.astro` (matriz 4×5 `t0–t3` × `Col 1–Col 5`) + modal de diagnóstico de trips.         |
| Sesión sin finca activa          | `NoFarm.astro`, con acceso a `/farms`.                                                                     |

No existe una portada autenticada separada: `/` cambia de contenido según sesión y rol. Tras el inicio de sesión se respeta el parámetro `?desde=` (por ejemplo, `/?desde=/invite/K7M4XP9Q`).

### 3.2 `/signin` — alias retrocompatible

**Archivo:** `src/pages/signin.astro`. No contiene UI; únicamente normaliza `code` y `desde` y redirige. Se conserva para enlaces antiguos e invitaciones. **Sí existe**, contrariamente a documentaciones anteriores que lo daban por eliminado. La página de Auth.js es `/` (`pages.signIn: "/"` en `auth.config.ts`).

### 3.3 `/metrics` y `/history`

**Archivos:** `src/pages/metrics.astro`, `src/pages/history.astro`. Ambos delegan en `src/frontend/components/Metrics.astro` y `src/frontend/components/History.astro` respectivamente. Su restricción adicional no es de rol, sino de contexto: si `listFincasForUser(...).filter(f => f.activa)` está vacío, redirigen a `/farms`. En `/history`, la conexión de Google Sheets se resuelve con `GET/POST /api/sync-sheets` y la exportación con `GET/POST /api/export-excel`; el componente también registra lecturas vía `POST /api/farms/:id/readings`.

### 3.4 `/settings`

**Archivo:** `src/pages/settings.astro` → `src/frontend/components/Settings.astro`. Las mutaciones reales no ocurren en la página sino en `PATCH /api/users/me` (nombre y avatar) y `POST /api/notifications/weekly-summary` (envío inmediato del resumen). Las preferencias de tema/notificaciones se gestionan en cliente; la exportación histórica enlaza con `GET /api/export-csv`.

### 3.5 `/farms` y `/farms/[id]`

**Archivos:** `src/pages/farms/index.astro`, `src/pages/farms/[id].astro`. `/farms` usa `getAuthUser` y `listFincasForUser`; `puedeCrear = user.role !== "Campesino"`. El detalle de finca usa `getFincaAccess`, `canManageFinca` y `canHardDeleteFinca` de `src/backend/services/authz.ts`, y los servicios `getFincaById`, `listMembers`, `listInvitaciones` y `listPlantas` de `src/backend/services/farms.ts`.

### 3.6 `/gallery` y `/gallery/[id]`

**Archivos:** `src/pages/gallery/index.astro`, `src/pages/gallery/[id].astro` → `src/frontend/components/Gallery.astro`, `GalleryDetail.astro`. La **página** filtra por finca activa; el endpoint `GET /api/gallery/:id/file` (en `src/pages/api/gallery/[id]/file.ts`) solo exige sesión y **no** repite ese filtro. Véase la corrección registrada en ENDPOINTS (Capítulo 19 · DOC-12).

### 3.7 `/invite/[code]`

**Archivo:** `src/pages/invite/[code].astro`. Usa directamente el servicio `peekInvitacion` en SSR (no el endpoint `GET /api/invitations/peek`, aunque ambos comparten la misma lógica). El canje se realiza desde el cliente con `POST /api/invitations/use`, que fija la cookie `finca_activa` y aplica límite de tasa.

### 3.8 `/admin`

**Archivo:** `src/pages/admin.astro`. `canManageSystem` equivale a `role === "Superadmin"`; `esStaff` incluye también `Admin`. Las acciones de la página llaman a `GET /api/admin/users`, `PATCH/DELETE /api/admin/users/:id`, `POST /api/farms/active`, `POST /api/farms/:id/archive` y `DELETE /api/farms/:id`.

---

## 4. Mapa de protección de páginas

| Ruta             | Protegida por `src/middleware.ts`    | Revalidación en página                                                     | Sin sesión                           | Sin permisos de finca/rol                                            |
| :--------------- | :----------------------------------- | :------------------------------------------------------------------------- | :----------------------------------- | :------------------------------------------------------------------- |
| `/`              | No                                   | `getSession` + `resolveActiveFinca`                                        | `Welcome.astro`                      | Staff sin finca → `/admin`; usuario sin finca → `NoFarm`             |
| `/signin`        | No                                   | `getSession`                                                               | Redirección a `/`                    | Redirección a `desde` o `/`                                          |
| `/metrics`       | Sí                                   | `getAuthUser` + `listFincasForUser`                                        | `302` a `/?desde=%2Fmetrics`         | Sin finca activa → `/farms`                                          |
| `/history`       | Sí                                   | `getAuthUser` + `listFincasForUser`                                        | `302` a `/?desde=%2Fhistory`         | Sin finca activa → `/farms`                                          |
| `/settings`      | Sí                                   | `getSession`                                                               | `302` a `/?desde=%2Fsettings`        | —                                                                    |
| `/farms`         | Sí                                   | `getAuthUser` + `listFincasForUser`                                        | `302` a `/?desde=%2Ffarms`           | Campesino: sin formulario de creación                                |
| `/farms/[id]`    | Sí                                   | `getAuthUser` + `getFincaAccess` + `canManageFinca` + `canHardDeleteFinca` | `302` a `/?desde=%2Ffarms%2F…`       | `access === "none"` → `/farms`; vista simple si `miembro`            |
| `/gallery`       | Sí (`/gallery` en `PROTECTED_PAGES`) | Componente filtra por finca activa                                         | `302` a `/?desde=%2Fgallery`         | Solo fotos de la finca activa                                        |
| `/gallery/[id]`  | Sí (prefijo `/gallery/`)             | `GalleryDetail.astro` valida `photos.finca_id`                             | `302` a `/?desde=%2Fgallery%2F…`     | Foto ajena → `/gallery`                                              |
| `/invite/[code]` | No                                   | `getAuthUser` + `peekInvitacion`                                           | Vista de invitación con CTA de login | Código inválido → mensaje en la propia página                        |
| `/admin`         | Sí                                   | `getAuthUser` + roles staff                                                | `302` a `/?desde=%2Fadmin`           | No staff → `/`; no Superadmin → sin tabla de usuarios ni hard delete |

---

## 5. Índice de APIs por dominio

La tabla maestra completa, con métodos, parámetros, cuerpos, respuestas y autorización, se encuentra en ENDPOINTS (Capítulo 19 · DOC-12). Resumen de superficie:

| Dominio                                            | Rutas                                                                                                                                                                 | Métodos                  | Implementación                                                                                               | Detalle                                                                    |
| :------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :----------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| Autenticación y cuenta                             | `/api/auth/register`, `/api/auth/check-availability`, `/api/auth/forgot-password`, `/api/auth/reset-password`, `/api/auth/*`                                          | POST; GET/POST (Auth.js) | `src/pages/api/auth/*.ts`; `auth.config.ts`; `astro.config.mjs`                                              | Público; tres endpoints con límite de tasa                                 |
| Fincas, miembros, lecturas e invitaciones de finca | `/api/farms`, `/api/farms/:id`, `/api/farms/active`, `/api/farms/leave`, `/api/farms/:id/{archive,members,readings,invitations}`, `/api/farms/:id/invitations/:invId` | GET, POST, PATCH, DELETE | `src/pages/api/farms/**`                                                                                     | Sesión; permisos por `getFincaAccess`                                      |
| Alias retrocompatible                              | `/api/farm/active`                                                                                                                                                    | GET, POST                | `src/pages/api/farm/active.ts`                                                                               | Reexporta los manejadores de `/api/farms/active`                           |
| Invitaciones globales                              | `/api/invitations/peek`, `/api/invitations/use`                                                                                                                       | GET, POST                | `src/pages/api/invitations/*.ts`                                                                             | Sesión; `use` con límite de tasa                                           |
| Administración, perfil y notificaciones            | `/api/admin/users`, `/api/admin/users/:id`, `/api/users/me`, `/api/notifications/weekly-summary`                                                                      | GET, PATCH, DELETE, POST | `src/pages/api/admin/users/**`, `src/pages/api/users/me.ts`, `src/pages/api/notifications/weekly-summary.ts` | Superadmin / sesión / miembro según caso                                   |
| Datos, hojas y exportación                         | `/api/sync-sheets`, `/api/export-excel`, `/api/export-csv`                                                                                                            | GET, POST                | `src/pages/api/sync-sheets.ts`, `export-excel.ts`, `export-csv.ts`                                           | Finca activa; `sync-sheets` permite también miembros                       |
| Integraciones climáticas                           | `/api/weather`, `/api/aqi`, `/api/siata`                                                                                                                              | GET                      | `src/pages/api/weather.ts`, `aqi.ts`, `siata.ts`                                                             | `weather`/`aqi` efectivamente públicos; `siata` exige sesión en el handler |
| Galería                                            | `/api/gallery/upload`, `/api/gallery/:id/file`                                                                                                                        | POST, GET                | `src/pages/api/gallery/**`                                                                                   | Sesión; el endpoint de archivo no filtra por finca                         |
| Diagnóstico Trips                                  | `/api/trips-diagnosis`                                                                                                                                                | GET, POST                | `src/pages/api/trips-diagnosis.ts`                                                                           | Público; proxy hacia `macollo-trips-api`                                   |

---

## 6. Alias retrocompatibles y rutas inexistentes

### 6.1 Alias que **sí existen** y deben conservarse

| Ruta               | Archivo                        | Observación                                                                                        |
| :----------------- | :----------------------------- | :------------------------------------------------------------------------------------------------- |
| `/signin`          | `src/pages/signin.astro`       | Redirección a `/` conservando `desde` y `code`.                                                    |
| `/api/farm/active` | `src/pages/api/farm/active.ts` | Reexporta `GET` y `POST` de `src/pages/api/farms/active.ts`; comparte middleware y comportamiento. |

### 6.2 Rutas que **no existen** (no enlazar)

| Ruta inexistente                                               | Situación real                                                                                                       |
| :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `/dashboard`                                                   | La portada autenticada es `/`; para staff, `/admin`.                                                                 |
| `/login`, `/register`                                          | El acceso y el registro están en `/` (`Welcome.astro`); `/signin` es solo alias.                                     |
| `/3d-simulation`, `/admin/integrations`                        | Mencionadas en documentación antigua; no hay archivos bajo `src/pages/`.                                             |
| `/api/metrics`                                                 | No existe; las lecturas se obtienen con `GET /api/farms/:id/readings`.                                               |
| `/api/export/excel`, `/api/export/csv`                         | No existen (con guion medio sí: `/api/export-excel`, `/api/export-csv`).                                             |
| `/api/farms/:id/plantas`, `/api/plants`                        | No existen; las plantas se listan en el servidor de la página `/farms/[id]` (`listPlantas`).                         |
| `/api/gallery` (colección), `/api/users`, `/api/notifications` | No existen como colecciones; solo las rutas individuales documentadas.                                               |
| `/api/predict`, `/api/health`, `/api/warmup`                   | Pertenecen al servicio externo `macollo-trips-api`, no a este repositorio; el proxy local es `/api/trips-diagnosis`. |
| `/api/sheets`, `/api/weather/aqi`                              | No implementados.                                                                                                    |

No hay métodos `PUT` en la API: las actualizaciones usan `PATCH` o `POST` según el endpoint.

---

## 7. Mapa de navegación (corregido)

```
                       ┌──────────────────────────┐
                       │  /  (Welcome; ex /signin)│  pública
                       └────────────┬─────────────┘
                                    │ sesión OK
              ┌─────────────────────┴──────────────────────┐
              ▼                                            ▼
   staff sin finca elegida → /admin          Agropecuario / Campesino
              │                              con finca activa → / (tablero)
              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ Navbar: Inicio · Métricas · Historial · Galería · Mis Fincas · Config   │
│ Staff añade Panel (/admin). Los enlaces a Métricas/Historial/Galería    │
│ pueden derivar en /farms si no hay finca activa.                        │
└──┬──────────┬───────────┬───────────┬───────────┬───────────┬───────────┘
   ▼          ▼           ▼           ▼           ▼           ▼
 /admin      /metrics   /history    /gallery    /farms      /settings
 (solo      (matriz     (fechas,   (fotos de   (crear,     (perfil,
  staff)     4×5)       Sheets,     la finca)   unir,       tema,
                        exportar)               activar)    resumen)
        │
        └── /invite/[code] (pública) → POST /api/invitations/use → /farms
```

---

## Trazabilidad

| Ruta             | Archivo                         | Método | Autorización                             | Doc relacionado                        | Verificación curl                                      |
| :--------------- | :------------------------------ | :----- | :--------------------------------------- | :------------------------------------- | :----------------------------------------------------- |
| `/`              | `src/pages/index.astro`         | GET    | Pública / sesión / staff                 | AUTH (Capítulo 20 · DOC-13)            | `curl -i http://localhost:4321/`                       |
| `/signin`        | `src/pages/signin.astro`        | GET    | Pública (alias)                          | AUTH (Capítulo 20 · DOC-13)            | `curl -i 'http://localhost:4321/signin?code=K7M4XP9Q'` |
| `/metrics`       | `src/pages/metrics.astro`       | GET    | Sesión + finca activa                    | DATA-DICTIONARY (Capítulo 25 · DOC-15) | `curl -i -L http://localhost:4321/metrics`             |
| `/history`       | `src/pages/history.astro`       | GET    | Sesión + finca activa                    | FIELD-PROTOCOL (Capítulo 26 · DOC-21)  | `curl -i -L http://localhost:4321/history`             |
| `/settings`      | `src/pages/settings.astro`      | GET    | Sesión                                   | AUTH (Capítulo 20 · DOC-13)            | `curl -i -L http://localhost:4321/settings`            |
| `/farms`         | `src/pages/farms/index.astro`   | GET    | Sesión                                   | ENDPOINTS (Capítulo 19 · DOC-12)       | `curl -i -L http://localhost:4321/farms`               |
| `/farms/[id]`    | `src/pages/farms/[id].astro`    | GET    | Sesión + miembro/dueño/staff             | AUTH (Capítulo 20 · DOC-13)            | `curl -i -L http://localhost:4321/farms/1`             |
| `/gallery`       | `src/pages/gallery/index.astro` | GET    | Sesión                                   | ENDPOINTS (Capítulo 19 · DOC-12)       | `curl -i -L http://localhost:4321/gallery`             |
| `/gallery/[id]`  | `src/pages/gallery/[id].astro`  | GET    | Sesión + foto de la finca activa         | ENDPOINTS (Capítulo 19 · DOC-12)       | `curl -i -L http://localhost:4321/gallery/1`           |
| `/invite/[code]` | `src/pages/invite/[code].astro` | GET    | Pública                                  | AUTH (Capítulo 20 · DOC-13)            | `curl -i http://localhost:4321/invite/K7M4XP9Q`        |
| `/admin`         | `src/pages/admin.astro`         | GET    | Staff; tabla de usuarios solo Superadmin | AUTH (Capítulo 20 · DOC-13)            | `curl -i -L http://localhost:4321/admin`               |
| `/landing`       | `src/pages/landing.astro`       | GET    | Pública                                  | LANDING (Capítulo 18 · DOC-47)         | `curl -i http://localhost:4321/landing`                |

---

# Capítulo 18. Landing Pública de Macollo (DOC-47)

**Ruta fuente:** `docs/LANDING.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-47**.

## 1. Propósito

Este documento describe la landing pública de Macollo: dónde vive, qué información comunica, cómo se diseñó y cómo se validó. La decisión sobre su publicación está en ADR-008 (Apéndice A.8 · ADR-008).

## 2. Ubicación y enrutamiento

| Elemento     | Valor                                                                   | Evidencia                                 |
| :----------- | :---------------------------------------------------------------------- | :---------------------------------------- |
| Página       | `src/pages/landing.astro`                                               | Ruta de archivos de Astro                 |
| URL actual   | `/landing`, accesible en **cualquier host** (incluido `localhost:4321`) | Sin lógica de host en `src/middleware.ts` |
| Renderizado  | SSR (`output: "server"` en `astro.config.mjs`)                          | Sin `prerender` explícito                 |
| Canonical    | Se deriva de la petición: `new URL(Astro.url.pathname, Astro.url).href` | En local: `http://localhost:4321/landing` |
| CTA a la app | Relativo `/`                                                            | Funciona en local y en cualquier dominio  |

No hay dominios hardcodeados ni redirecciones por host. Cuando se defina el dominio definitivo, la landing podrá publicarse tal cual en `/landing` o enlazarse desde un subdominio mediante configuración del proveedor; no hará falta tocar la página. La decisión de diferir ese paso está registrada en ADR-008 (Apéndice A.8 · ADR-008).

## 3. Contenido comunicado

La landing responde a las preguntas requeridas, en este orden:

| Sección       | Contenido                                                                            |
| :------------ | :----------------------------------------------------------------------------------- |
| Hero          | Propuesta de valor y mock de la matriz 4×5 con semáforo; no son datos en vivo        |
| Ticker        | Capacidades destacadas (20 plantas, trazabilidad, IA, multi-finca, Sheets/CSV/Excel) |
| Problema      | Datos dispersos, decisiones a ciegas y detección tardía de trips                     |
| Solución      | Tres pasos: traer lecturas → mirar el semáforo → actuar con evidencia                |
| Qué hacemos   | Matriz, métricas, historial, multi-finca, galería y diagnóstico con IA               |
| Por qué       | Trazabilidad, umbrales visibles y acceso por roles; contadores animados              |
| Para quién    | Campesino, Agropecuario y staff (Admin/Superadmin)                                   |
| Stack         | Versiones reales del repositorio por capa (interfaz, aplicación, datos, IA/clima)    |
| Quiénes somos | Equipo e ilustración con `static-farmer.svg`                                         |
| CTA final     | Enlace a la app (`/`) y a las capacidades de la propia landing                       |

El equipo, las versiones del stack y las capacidades se verificaron contra el repositorio y la documentación existente. El mock del hero está rotulado como representación visual, no como lectura real.

## 4. Diseño y accesibilidad

- **Paleta:** superficie `#f4fce3`, verde profundo `#062c16`, bordes `#104d28`/`#166534`, acento verde→lima (`#22c55e`, `#84cc16`) y neutros `stone`. Son los colores literales ya usados en `Navbar.astro`, `Dashboard.astro` y `Metrics.astro`.
- **Tipografía:** stack del sistema; no se carga Inter porque la CSP solo permite `font-src 'self' data:`.
- **Movimiento:** reveal-on-scroll con `IntersectionObserver`, contadores eased, float/ticker y hover states. Todo se desactiva con `prefers-reduced-motion`.
- **Responsive:** breakpoint a 980 px y 640 px; menú móvil con `aria-expanded`/`aria-controls`.
- **Accesibilidad:** enlace de salto, foco visible, `aria-label` en la matriz decorativa y etiquetas de texto junto al color del semáforo en la sección «Con Macollo».
- **Assets:** reutiliza `public/gulupa.svg`, `public/gulupa.png` y `public/static-farmer.svg`; no añade dependencias ni fuentes externas.
- **Aislamiento:** no reutiliza `Layout.astro`, para no arrastrar toasts, tema ni lógica de sesión de la app.

## 5. Sesión y enlaces

- Todos los enlaces internos son anclas o rutas relativas; el único enlace a la app es `/`.
- No hay formularios `POST` cruzados: con `security.checkOrigin: true` (`astro.config.mjs:13`), un POST entre dominios distintos sería rechazado con `403`.
- La landing no consume sesión ni cookies de la app; el CTA lleva al usuario a la portada de la aplicación.

## 6. Validación ejecutada

| Comprobación                         | Resultado                                                               |
| :----------------------------------- | :---------------------------------------------------------------------- |
| `curl http://localhost:4321/landing` | `200`, título de la landing y canonical `http://localhost:4321/landing` |
| `curl http://localhost:4321/`        | `200` (app intacta)                                                     |
| Playwright 1440×900 y 390×844        | Sin errores de consola, sin overflow horizontal, menú móvil funcional   |
| `astro check`                        | 0 errores, 0 advertencias (14 hints preexistentes)                      |
| `pnpm build`                         | Correcto; `/landing` queda como ruta SSR (`^/landing/?$ → _render`)     |

## 7. Trazabilidad

| Tema        | Código / configuración                                   | Documento relacionado                                            | Verificación                                   |
| :---------- | :------------------------------------------------------- | :--------------------------------------------------------------- | :--------------------------------------------- |
| Página      | `src/pages/landing.astro`                                | ROUTES (Capítulo 17 · DOC-11), COMPONENTS (Capítulo 23 · DOC-27) | `curl` + Playwright + `astro check`            |
| Middleware  | `src/middleware.ts` (sin cambios)                        | SECURITY (Capítulo 21 · DOC-24)                                  | App y landing funcionan en el mismo deployment |
| Decisión    | ADR-008 (Apéndice A.8 · ADR-008)                         | DOC-CONVENTIONS (Capítulo 6 · DOC-43)                            | Índice y manifiesto actualizados               |
| Publicación | Configuración del proveedor, cuando se defina el dominio | DEPLOYMENT (Capítulo 32 · DOC-16)                                | Pendiente de dominio definitivo                |

---

# Capítulo 19. Endpoints de la API de Macollo (DOC-12)

**Ruta fuente:** `docs/ENDPOINTS.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

## 1. Convenios generales

- **Base URL local:** `http://localhost:4321`. En producción el `site` configurado en `astro.config.mjs` es `https://macollo.tech`.
- **Implementación:** todos los manejadores residen bajo `src/pages/api/`; las respuestas JSON se construyen con `json()` de `src/backend/services/authz.ts` (`Content-Type: application/json`) o con `Response` directa cuando se documenta lo contrario.
- **Formatos:** JSON salvo `/api/export-excel` (`.xlsx`), `/api/export-csv` (`.csv`), `/api/gallery/:id/file` (imagen) y las respuestas de error en texto plano de la galería.
- **Autenticación en dos capas:** `src/middleware.ts` protege los prefijos `/api/farms`, `/api/farm`, `/api/invitations`, `/api/admin`, `/api/gallery`, `/api/sync-sheets` y `/api/export-excel` (`401` antes de entrar al handler). Otros endpoints **no** están en esa lista y exigen sesión únicamente dentro del manejador (`getAuthUser` o `resolveActiveFinca`); `weather` y `aqi` invocan `getSession` pero **ignoran el resultado**, por lo que son efectivamente públicos.
- **Autorización a finca:** `getFincaAccess` (`src/backend/services/authz.ts`) devuelve `"none" | "miembro" | "dueno" | "staff"`. Los predicados son `canViewFincaData` y `canWriteFincaData` (cualquier acceso distinto de `none`), `canManageFinca` (`dueno` o `staff`), `canConnectSheets` (`dueno`, `staff` **o `miembro`**) y `canHardDeleteFinca`/`canManageSystem` (solo `Superadmin`).
- **Finca activa:** cookie HttpOnly `finca_activa` (`src/backend/services/authz.ts`). `resolveActiveFinca` (`src/backend/services/farms.ts`) además la infiere automáticamente cuando el usuario tiene una sola finca visible.
- **CSRF:** `security.checkOrigin: true` en `astro.config.mjs`; las peticiones `multipart/form-data` procedentes de navegador deben conservar el `Origin` del sitio.
- **Límite de tasa:** en memoria, por IP, aplicado en middleware (`src/backend/services/rateLimit.ts`). Los excesos devuelven `429 { "message": "Demasiados intentos. Intenta de nuevo en unos segundos." }` con cabecera `Retry-After`. No es un límite distribuido entre instancias serverless.
- **Cuerpos:** `parseJsonBody` devuelve `null` ante JSON inválido; cada handler decide el mensaje de error (`400`). Las validaciones Zod devuelven el primer `issue` en `message`.

Inventario verificado: **29 archivos manejadores**, **29 rutas de API propias** (una de ellas alias) y **42 operaciones HTTP explícitas**, más la familia `/api/auth/*` gestionada por Auth.js.

---

## 2. Tabla maestra de endpoints (agrupada por dominio)

### 2.1 Autenticación y cuenta

| Ruta                           | Método   | Entrada                                                                  | Respuesta principal              | Autorización              | Archivo de implementación                  |
| :----------------------------- | :------- | :----------------------------------------------------------------------- | :------------------------------- | :------------------------ | :----------------------------------------- |
| `/api/auth/register`           | POST     | JSON: `name`, `email`/`phone`, `password`, `accountType`, `fincaNombre`… | `201` usuario + finca opcional   | Público (límite 10/300 s) | `src/pages/api/auth/register.ts`           |
| `/api/auth/check-availability` | POST     | JSON: `{ email?, phone? }`                                               | `200 { emailTaken, phoneTaken }` | Público                   | `src/pages/api/auth/check-availability.ts` |
| `/api/auth/forgot-password`    | POST     | JSON: `{ identifier }`                                                   | `200` código enviado/informativo | Público (límite 8/300 s)  | `src/pages/api/auth/forgot-password.ts`    |
| `/api/auth/reset-password`     | POST     | JSON: `{ identifier, code, newPassword }`                                | `200` usuario actualizado        | Público (límite 8/300 s)  | `src/pages/api/auth/reset-password.ts`     |
| `/api/auth/*`                  | GET/POST | acciones estándar Auth.js                                                | JSON/redirección según acción    | Público (según acción)    | `astro.config.mjs` + `auth.config.ts`      |

### 2.2 Fincas, miembros, lecturas e invitaciones de finca

| Ruta                                | Método | Entrada                                       | Respuesta principal                     | Autorización                | Archivo de implementación                                      |
| :---------------------------------- | :----- | :-------------------------------------------- | :-------------------------------------- | :-------------------------- | :------------------------------------------------------------- |
| `/api/farms`                        | GET    | —                                             | `200 { fincas }`                        | Sesión                      | `src/pages/api/farms/index.ts`                                 |
| `/api/farms`                        | POST   | JSON: `{ nombre, descripcion?, ubicacion? }`  | `201 { message, finca }`                | Sesión; no `Campesino`      | `src/pages/api/farms/index.ts`                                 |
| `/api/farms/:id`                    | GET    | Parámetro `id`                                | `200 { finca, miembros, access }`       | Miembro / dueño / staff     | `src/pages/api/farms/[id].ts`                                  |
| `/api/farms/:id`                    | PATCH  | JSON: `{ nombre?, descripcion?, ubicacion? }` | `200 { message }`                       | Dueño / staff               | `src/pages/api/farms/[id].ts`                                  |
| `/api/farms/:id`                    | DELETE | Parámetro `id`                                | `200 { message }`                       | **Solo Superadmin**         | `src/pages/api/farms/[id].ts`                                  |
| `/api/farms/active`                 | GET    | Cookie `finca_activa`                         | `200 { finca, fincas? }` + `Set-Cookie` | Sesión                      | `src/pages/api/farms/active.ts`                                |
| `/api/farms/active`                 | POST   | JSON: `{ fincaId }`                           | `200 { message, finca }` + `Set-Cookie` | Sesión + acceso a la finca  | `src/pages/api/farms/active.ts`                                |
| `/api/farm/active`                  | GET    | Igual que el canonical                        | Igual que el canonical                  | Igual que el canonical      | `src/pages/api/farm/active.ts` (alias, reexporta `GET`/`POST`) |
| `/api/farm/active`                  | POST   | Igual que el canonical                        | Igual que el canonical                  | Igual que el canonical      | `src/pages/api/farm/active.ts` (alias)                         |
| `/api/farms/leave`                  | POST   | JSON: `{ fincaId }`                           | `200 { message }`                       | Sesión + miembro (no dueño) | `src/pages/api/farms/leave.ts`                                 |
| `/api/farms/:id/archive`            | POST   | JSON: `{ activa: boolean }`                   | `200 { message }`                       | Dueño / staff               | `src/pages/api/farms/[id]/archive.ts`                          |
| `/api/farms/:id/members`            | GET    | Parámetro `id`                                | `200 { miembros }`                      | Dueño / staff               | `src/pages/api/farms/[id]/members.ts`                          |
| `/api/farms/:id/members`            | DELETE | Query `?userId=N`                             | `200 { message }`                       | Dueño / staff               | `src/pages/api/farms/[id]/members.ts`                          |
| `/api/farms/:id/readings`           | GET    | Parámetro `id`                                | `200 { records }`                       | Miembro / dueño / staff     | `src/pages/api/farms/[id]/readings.ts`                         |
| `/api/farms/:id/readings`           | POST   | JSON: `{ records: MetricRecord[] }`           | `200 { message, count }`                | Miembro / dueño / staff     | `src/pages/api/farms/[id]/readings.ts`                         |
| `/api/farms/:id/readings`           | DELETE | Parámetro `id`                                | `200 { message, count }`                | Dueño / staff               | `src/pages/api/farms/[id]/readings.ts`                         |
| `/api/farms/:id/invitations`        | GET    | Parámetro `id`                                | `200 { invitaciones }`                  | Dueño / staff               | `src/pages/api/farms/[id]/invitations.ts`                      |
| `/api/farms/:id/invitations`        | POST   | JSON: `{ expiraDias?, usosMaximos? }`         | `201 { message, invitacion }`           | Dueño / staff               | `src/pages/api/farms/[id]/invitations.ts`                      |
| `/api/farms/:id/invitations/:invId` | DELETE | Parámetros `id`, `invId`                      | `200 { message }`                       | Dueño / staff               | `src/pages/api/farms/[id]/invitations/[invId].ts`              |

### 2.3 Invitaciones globales

| Ruta                    | Método | Entrada              | Respuesta principal                                    | Autorización             | Archivo de implementación           |
| :---------------------- | :----- | :------------------- | :----------------------------------------------------- | :----------------------- | :---------------------------------- |
| `/api/invitations/peek` | GET    | Query `?code=CODIGO` | `200 { invitacion }`                                   | Sesión                   | `src/pages/api/invitations/peek.ts` |
| `/api/invitations/use`  | POST   | JSON: `{ code }`     | `200 { message, fincaId, fincaNombre }` + `Set-Cookie` | Sesión (límite 15/300 s) | `src/pages/api/invitations/use.ts`  |

### 2.4 Administración, perfil y notificaciones

| Ruta                                | Método | Entrada                   | Respuesta principal        | Autorización                                     | Archivo de implementación                       |
| :---------------------------------- | :----- | :------------------------ | :------------------------- | :----------------------------------------------- | :---------------------------------------------- |
| `/api/admin/users`                  | GET    | Query `?q=` (búsqueda)    | `200 { users }` (máx. 200) | Solo Superadmin                                  | `src/pages/api/admin/users/index.ts`            |
| `/api/admin/users/:id`              | PATCH  | JSON: `{ role }`          | `200 { message }`          | Solo Superadmin                                  | `src/pages/api/admin/users/[id].ts`             |
| `/api/admin/users/:id`              | DELETE | Parámetro `id`            | `200 { message }`          | Solo Superadmin                                  | `src/pages/api/admin/users/[id].ts`             |
| `/api/users/me`                     | PATCH  | JSON: `{ name?, image? }` | `200 { message, user }`    | Sesión (solo handler)                            | `src/pages/api/users/me.ts`                     |
| `/api/notifications/weekly-summary` | POST   | Sin body                  | `200 { sent, message }`    | Sesión + acceso a la finca activa (solo handler) | `src/pages/api/notifications/weekly-summary.ts` |

### 2.5 Datos, hojas de cálculo y exportación

| Ruta                | Método | Entrada                                            | Respuesta principal                                              | Autorización                                     | Archivo de implementación       |
| :------------------ | :----- | :------------------------------------------------- | :--------------------------------------------------------------- | :----------------------------------------------- | :------------------------------ |
| `/api/sync-sheets`  | GET    | —                                                  | `200 { success, sheetsUrl }`                                     | Sesión + finca activa                            | `src/pages/api/sync-sheets.ts`  |
| `/api/sync-sheets`  | POST   | JSON: `{ url? }` (opcional si ya hay `sheets_url`) | `200 { success, count, guardadas, records, sheetsUrl, message }` | Sesión + miembro/dueño/staff                     | `src/pages/api/sync-sheets.ts`  |
| `/api/export-excel` | GET    | —                                                  | `200` binario `.xlsx`                                            | Sesión + acceso a la finca activa                | `src/pages/api/export-excel.ts` |
| `/api/export-excel` | POST   | Body ignorado                                      | `200` binario `.xlsx`                                            | Sesión + acceso a la finca activa                | `src/pages/api/export-excel.ts` |
| `/api/export-csv`   | GET    | —                                                  | `200` binario `.csv`                                             | Sesión + acceso a la finca activa (solo handler) | `src/pages/api/export-csv.ts`   |

### 2.6 Integraciones climáticas y ambientales

| Ruta           | Método | Entrada                                 | Respuesta principal | Autorización                       | Archivo de implementación  |
| :------------- | :----- | :-------------------------------------- | :------------------ | :--------------------------------- | :------------------------- |
| `/api/weather` | GET    | `lat`, `lon`, `name`, `fallback=1`, `q` | `200 WeatherData`   | **Pública (sin control efectivo)** | `src/pages/api/weather.ts` |
| `/api/aqi`     | GET    | `lat`, `lon`                            | `200` payload WAQI  | **Pública (sin control efectivo)** | `src/pages/api/aqi.ts`     |
| `/api/siata`   | GET    | —                                       | `200` JSON SIATA    | Sesión (solo handler)              | `src/pages/api/siata.ts`   |

### 2.7 Galería

| Ruta                    | Método | Entrada                                                | Respuesta principal                | Autorización                                   | Archivo de implementación            |
| :---------------------- | :----- | :----------------------------------------------------- | :--------------------------------- | :--------------------------------------------- | :----------------------------------- |
| `/api/gallery/upload`   | POST   | `multipart/form-data`: `file`, `caption?`, `taken_at?` | `200 { ok, photo }`                | Sesión                                         | `src/pages/api/gallery/upload.ts`    |
| `/api/gallery/:id/file` | GET    | Parámetro `id`                                         | `200` imagen / `302` a URL externa | Sesión (**sin filtro de finca en el handler**) | `src/pages/api/gallery/[id]/file.ts` |

### 2.8 Diagnóstico de trips (IA)

| Ruta                   | Método | Entrada                                                              | Respuesta principal                | Autorización | Archivo de implementación          |
| :--------------------- | :----- | :------------------------------------------------------------------- | :--------------------------------- | :----------- | :--------------------------------- |
| `/api/trips-diagnosis` | GET    | —                                                                    | `200` health check o `503` offline | Pública      | `src/pages/api/trips-diagnosis.ts` |
| `/api/trips-diagnosis` | POST   | `multipart/form-data`: `file`, `temperature_c?`, `crop?`, `profile?` | `200` predicción del servicio ML   | Pública      | `src/pages/api/trips-diagnosis.ts` |

---

## 3. Matriz de autenticación y autorización por endpoint

**Leyenda:** `Público` = sin sesión requerida en middleware ni handler; `Sesión` = sesión válida; `Miembro` = acceso a finca `miembro | dueno | staff`; `Dueño` = `dueno | staff`; `Staff` = `Superadmin | Admin`; `Superadmin` = solo ese rol. `MW` indica si `src/middleware.ts` aplica el filtro antes del manejador.

| Operación                                  | MW  | Comprobación real en handler/servicio                                  | Nivel efectivo              |
| :----------------------------------------- | :-- | :--------------------------------------------------------------------- | :-------------------------- |
| `POST /api/auth/register`                  | No  | Ninguna (rate limit por IP)                                            | Público                     |
| `POST /api/auth/check-availability`        | No  | Ninguna                                                                | Público                     |
| `POST /api/auth/forgot-password`           | No  | Ninguna (rate limit por IP)                                            | Público                     |
| `POST /api/auth/reset-password`            | No  | Token `verification_token` vigente (rate limit por IP)                 | Público                     |
| `GET/POST /api/auth/*` (Auth.js)           | No  | Según proveedor/acción; `callback/credentials` con rate limit          | Público                     |
| `GET /api/farms`                           | Sí  | `getAuthUser`                                                          | Sesión                      |
| `POST /api/farms`                          | Sí  | `getAuthUser` + `user.role !== "Campesino"`                            | Sesión (no Campesino)       |
| `GET /api/farms/:id`                       | Sí  | `getFincaAccess !== "none"`                                            | Miembro                     |
| `PATCH /api/farms/:id`                     | Sí  | `canManageFinca`                                                       | Dueño / Staff               |
| `DELETE /api/farms/:id`                    | Sí  | `canHardDeleteFinca`                                                   | Superadmin                  |
| `GET /api/farms/active`                    | Sí  | `getAuthUser` + `userCanUseFinca` sobre la cookie                      | Sesión                      |
| `POST /api/farms/active`                   | Sí  | `getAuthUser` + `userCanUseFinca`                                      | Sesión + acceso a finca     |
| `GET /api/farm/active` (alias)             | Sí  | Idéntico al canonical                                                  | Sesión                      |
| `POST /api/farm/active` (alias)            | Sí  | Idéntico al canonical                                                  | Sesión + acceso a finca     |
| `POST /api/farms/leave`                    | Sí  | `getAuthUser`; `leaveFinca` rechaza al dueño                           | Sesión + Miembro            |
| `POST /api/farms/:id/archive`              | Sí  | `canManageFinca`                                                       | Dueño / Staff               |
| `GET /api/farms/:id/members`               | Sí  | `canManageFinca`                                                       | Dueño / Staff               |
| `DELETE /api/farms/:id/members`            | Sí  | `canManageFinca` + no expulsar al dueño                                | Dueño / Staff               |
| `GET /api/farms/:id/readings`              | Sí  | `canViewFincaData`                                                     | Miembro                     |
| `POST /api/farms/:id/readings`             | Sí  | `canWriteFincaData`                                                    | Miembro                     |
| `DELETE /api/farms/:id/readings`           | Sí  | `canManageFinca`                                                       | Dueño / Staff               |
| `GET /api/farms/:id/invitations`           | Sí  | `canManageFinca`                                                       | Dueño / Staff               |
| `POST /api/farms/:id/invitations`          | Sí  | `canManageFinca`                                                       | Dueño / Staff               |
| `DELETE /api/farms/:id/invitations/:invId` | Sí  | `canManageFinca` + pertenencia de la invitación a la finca             | Dueño / Staff               |
| `GET /api/invitations/peek`                | Sí  | `getAuthUser` + código vigente                                         | Sesión                      |
| `POST /api/invitations/use`                | Sí  | `getAuthUser` + transacción atómica (rate limit por IP)                | Sesión                      |
| `GET /api/admin/users`                     | Sí  | `canManageSystem`                                                      | Superadmin                  |
| `PATCH /api/admin/users/:id`               | Sí  | `canManageSystem` + regla del último Superadmin                        | Superadmin                  |
| `DELETE /api/admin/users/:id`              | Sí  | `canManageSystem` + no propio + último Superadmin + sin fincas propias | Superadmin                  |
| `PATCH /api/users/me`                      | No  | `getAuthUser`                                                          | Sesión                      |
| `POST /api/notifications/weekly-summary`   | No  | `resolveActiveFinca` + `canViewFincaData` + correo propio              | Sesión + Miembro            |
| `GET /api/sync-sheets`                     | Sí  | `resolveActiveFinca` (sin comprobación de rol adicional)               | Sesión + finca activa       |
| `POST /api/sync-sheets`                    | Sí  | `resolveActiveFinca` + `canConnectSheets`                              | **Miembro / Dueño / Staff** |
| `GET /api/export-excel`                    | Sí  | `resolveActiveFinca` + `canViewFincaData`                              | Sesión + Miembro            |
| `POST /api/export-excel`                   | Sí  | Igual que `GET` (body ignorado)                                        | Sesión + Miembro            |
| `GET /api/export-csv`                      | No  | `resolveActiveFinca` + `canViewFincaData`                              | Sesión + Miembro            |
| `GET /api/weather`                         | No  | `getSession` ignorado                                                  | **Público**                 |
| `GET /api/aqi`                             | No  | `getSession` ignorado                                                  | **Público**                 |
| `GET /api/siata`                           | No  | `getSession` con comprobación explícita                                | Sesión                      |
| `POST /api/gallery/upload`                 | Sí  | `getSession` + `getAuthUser`                                           | Sesión                      |
| `GET /api/gallery/:id/file`                | Sí  | `getSession`; **no valida `finca_id` ni autoría**                      | Sesión                      |
| `GET /api/trips-diagnosis`                 | No  | Ninguna                                                                | Público                     |
| `POST /api/trips-diagnosis`                | No  | Ninguna                                                                | Público                     |

> Corrección relevante: la documentación anterior afirmaba que solo el **dueño** podía sincronizar Google Sheets. El predicado real `canConnectSheets` en `src/backend/services/authz.ts` incluye explícitamente a `miembro`, además de `dueno` y `staff`.

---

## 4. Fichas detalladas por endpoint

### 4.1 Autenticación y cuenta

#### `POST /api/auth/register`

**Archivo:** `src/pages/api/auth/register.ts` · **Autorización:** pública · **Rate limit:** 10 peticiones / 300 s por IP · **Body:** JSON.

Valida con `RegisterSchema` (Zod), hashea la contraseña con bcrypt (10 rondas), verifica unicidad de correo (case-insensitive) y teléfono normalizado, asigna el rol desde `accountType` y, si procede, crea la primera finca mediante `createFinca`.

| Campo         | Requerido         | Regla real                                                                  |
| :------------ | :---------------- | :-------------------------------------------------------------------------- |
| `name`        | Sí                | `min(2)`; se recorta.                                                       |
| `email`       | `email` o `phone` | Formato de correo o `""`; único en `LOWER(email)`.                          |
| `phone`       | `email` o `phone` | Dígitos `+?7–15` tras quitar espacios, guiones, paréntesis y puntos; único. |
| `birthDate`   | No                | `YYYY-MM-DD` real y no futura; `""` permitido.                              |
| `password`    | Sí                | `min(8)`.                                                                   |
| `accountType` | No                | `Campesino` (por defecto) o `Agropecuario`; **nunca** role staff.           |
| `fincaNombre` | Solo Agropecuario | Opcional en Zod, pero obligatorio en la lógica (`400` si falta).            |
| `role`        | —                 | Campo no reconocido: se ignora. Tampoco se acepta `fincaCode`.              |

**Respuestas:**

- `201` → `{ "message": "Cuenta creada y finca \"X\" lista." | "Cuenta creada exitosamente.", "user": { id, name, email, phone, birth_date, role }, "fincaCreada": { id, nombre } | null, "avisoCreacion": string | null }`.
- `400` → `{ message }`: JSON inválido, nombre corto, falta de contacto, correo/teléfono inválido o duplicado, fecha inválida, contraseña corta o Agropecuario sin `fincaNombre`.
- `429` → límite de tasa; `500` → error genérico de registro.

```bash
curl -X POST http://localhost:4321/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Juan Pérez","email":"juan@correo.com","password":"secreto123","accountType":"Agropecuario","fincaNombre":"Finca La Esperanza"}'
```

#### `POST /api/auth/check-availability`

**Archivo:** `src/pages/api/auth/check-availability.ts` · **Autorización:** pública · **Body:** JSON.

Esquema Zod: `email?: string` (máx. 255) y `phone?: string` (máx. 50), ambos opcionales o `""`. El celular se normaliza antes de consultar; `phoneTaken` solo se evalúa si cumple `+?\d{7,15}`.

- `200` → `{ "emailTaken": boolean, "phoneTaken": boolean }`.
- `400` → `{ message: "Datos no válidos." }`; `500` → `{ message: "No se pudo verificar. Intenta de nuevo." }`.

```bash
curl -X POST http://localhost:4321/api/auth/check-availability \
  -H 'Content-Type: application/json' -d '{"email":"juan@correo.com","phone":"3001234567"}'
```

#### `POST /api/auth/forgot-password`

**Archivo:** `src/pages/api/auth/forgot-password.ts` · **Autorización:** pública · **Rate limit:** 8/300 s · Servicios: `sendRecoveryEmail`/`sendRecoverySms` en `src/backend/services/notifications.ts`.

Busca por `LOWER(email)` o `phone`, genera un código numérico de 6 dígitos, lo almacena en `verification_token` con vigencia de 15 minutos y envía correo (SMTP/Gmail) o SMS (Twilio). La respuesta es **informativa por diseño**: el campo `message` muestra el destino enmascarado, pero el campo `identifier` devuelve el identificador canónico sin enmascarar (R-08).

- `200` → `{ message, destinationType: "correo electrónico" | "número celular", maskedTarget, identifier, sent }`. Si falta configuración SMTP/Twilio, `sent: false` y el código queda en logs del servidor.
- `400` → identificador ausente; `404` → cuenta no encontrada; `429` → límite; `500` → error interno.

```bash
curl -X POST http://localhost:4321/api/auth/forgot-password \
  -H 'Content-Type: application/json' -d '{"identifier":"juan@correo.com"}'
```

#### `POST /api/auth/reset-password`

**Archivo:** `src/pages/api/auth/reset-password.ts` · **Autorización:** pública · **Rate limit:** 8/300 s.

Valida `identifier`, `code` y `newPassword` contra `verification_token` (`expires > NOW()`), actualiza con bcrypt (10 rondas) y elimina el token.

- `200` → `{ message, user: { id, name, role } }`.
- `400` → campos obligatorios, **`newPassword` menor de 8 caracteres** o código incorrecto/expirado.
- `404` → usuario no encontrado al actualizar; `429` → límite; `500` → error interno.

> Corrección: versiones anteriores de este documento indicaban un mínimo de 6 caracteres; el código exige 8.

```bash
curl -X POST http://localhost:4321/api/auth/reset-password \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"juan@correo.com","code":"482913","newPassword":"nuevoSecreto123"}'
```

#### `/api/auth/*` — Auth.js

**Archivo de configuración:** `auth.config.ts`; integración registrada en `astro.config.mjs` (`integrations: [auth(), react()]`). `auth-astro` monta el catch-all `/api/auth/[...auth]`.

| Ruta                                  | Uso                                                                                                                     |
| :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------- |
| `GET /api/auth/signin`                | Flujo de inicio de sesión de Auth.js (la UI propia está en `/`).                                                        |
| `POST /api/auth/callback/credentials` | Login con email o celular + contraseña; bcrypt con migración de contraseñas antiguas en texto plano (`auth.config.ts`). |
| `GET/POST /api/auth/callback/google`  | OAuth de Google; requiere `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`.                                                  |
| `GET /api/auth/session`               | Sesión JWT actual; expone `user.id` y `user.role`.                                                                      |
| `POST /api/auth/signout`              | Cierre de sesión.                                                                                                       |

La sesión es JWT con `maxAge`/`updateAge` derivados de `SESSION_MAX_AGE_HOURS` (24 h por defecto) y expiración absoluta mediante `token.sessionStartedAt`. El resto de acciones estándar de `@auth/core` se sirven bajo el mismo prefijo; no son manejadores propios de este repositorio.

```bash
curl -i -c cookies.txt http://localhost:4321/api/auth/csrf
curl -i -b cookies.txt -c cookies.txt -X POST http://localhost:4321/api/auth/callback/credentials \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'email=juan@correo.com' --data-urlencode 'password=secreto123'
curl -i -b cookies.txt http://localhost:4321/api/auth/session
```

---

### 4.2 Fincas, miembros y lecturas

#### `GET /api/farms` y `POST /api/farms`

**Archivo:** `src/pages/api/farms/index.ts` · **Autorización:** sesión; creación vedada a `Campesino`.

`GET` devuelve `{ fincas }` de `listFincasForUser(user.id, user.role)` (staff ve todas; solo activas por defecto). `POST` valida `nombre` (2–255), `descripcion` (≤2000) y `ubicacion` (≤500), crea la finca, la membresía de dueño y la matriz de 20 plantas en transacción (`src/backend/services/farms.ts`). Máximo **5 fincas por usuario** (`FincaError` → `409`).

- `201` → `{ message: "Finca creada.", finca }`.
- `400` → JSON/validación; `403` → Campesino; `409` → límite de fincas; `500` → error interno.

```bash
curl -b cookies.txt http://localhost:4321/api/farms
curl -X POST http://localhost:4321/api/farms -b cookies.txt \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Finca La Esperanza","ubicacion":"Rionegro, ANT","descripcion":"Invernadero principal"}'
```

#### `GET|PATCH|DELETE /api/farms/:id`

**Archivo:** `src/pages/api/farms/[id].ts` · **Autorización:** `GET` miembro/staff; `PATCH` dueño/staff; `DELETE` solo Superadmin. El parámetro `id` se normaliza con `parseId` (entero positivo).

- `GET` → `200 { finca, miembros, access }`, donde `access` es `"miembro" | "dueno" | "staff"`. `404` si el ID no es válido o la finca no existe; `403` si `access === "none"`.
- `PATCH` → cuerpo `{ nombre?, descripcion?, ubicacion? }`; `descripcion` y `ubicacion` admiten `null`. Devuelve `200 { message: "Finca actualizada." }`. `403` para miembros.
- `DELETE` → borrado físico (`hardDeleteFinca`), `200 { message }`. `403` para cualquier no Superadmin; `404` si no existe.

```bash
curl -b cookies.txt http://localhost:4321/api/farms/1
curl -X PATCH http://localhost:4321/api/farms/1 -b cookies.txt \
  -H 'Content-Type: application/json' -d '{"nombre":"Finca La Esperanza II","descripcion":null}'
curl -X DELETE http://localhost:4321/api/farms/1 -b cookies.txt
```

#### `GET|POST /api/farms/active` y alias `/api/farm/active`

**Archivos:** `src/pages/api/farms/active.ts` y `src/pages/api/farm/active.ts` (alias que reexporta ambos manejadores) · **Autorización:** sesión.

`GET` valida la cookie contra `userCanUseFinca` y el estado `finca.activa`; si no hay cookie válida y el usuario tiene una sola finca visible, la fija y devuelve `Set-Cookie`. Si hay varias sin selección, responde `{ finca: null, fincas }` y limpia la cookie. `POST` exige `{ fincaId: number > 0 }`, verifica `userCanUseFinca`, exige finca activa y devuelve `{ message, finca }` con cookie HttpOnly `finca_activa` (30 días, `SameSite=Lax`, `Secure` en producción).

- `200` → según lo anterior; `400` → JSON/cuerpo inválido; `403` → «No formas parte de esa finca.»; `404` → finca inexistente o archivada.

```bash
curl -b cookies.txt http://localhost:4321/api/farms/active
curl -X POST http://localhost:4321/api/farms/active -b cookies.txt -c cookies.txt \
  -H 'Content-Type: application/json' -d '{"fincaId":1}'
curl -i -b cookies.txt http://localhost:4321/api/farm/active
```

#### `POST /api/farms/leave`

**Archivo:** `src/pages/api/farms/leave.ts` · **Autorización:** sesión; el servicio `leaveFinca` rechaza al dueño (`400`).

Body `{ fincaId: number > 0 }`. Respuestas: `200 { message: "Saliste de la finca." }`; `400` JSON/formato o dueño; `404` si el usuario no era miembro; `500` error interno.

```bash
curl -X POST http://localhost:4321/api/farms/leave -b cookies.txt \
  -H 'Content-Type: application/json' -d '{"fincaId":1}'
```

#### `POST /api/farms/:id/archive`

**Archivo:** `src/pages/api/farms/[id]/archive.ts` · **Autorización:** dueño/staff.

Body exacto `{ "activa": boolean }`; `true` restaura, `false` archiva. Respuestas: `200 { message }`; `400` si falta o no es booleano; `403` sin permiso; `404` finca inexistente.

```bash
curl -X POST http://localhost:4321/api/farms/1/archive -b cookies.txt \
  -H 'Content-Type: application/json' -d '{"activa":false}'
```

#### `GET|DELETE /api/farms/:id/members`

**Archivo:** `src/pages/api/farms/[id]/members.ts` · **Autorización:** dueño/staff en ambos métodos.

`GET` → `200 { miembros }` (`user_id`, `name`, `email`, `phone`, `rol_finca`, `created_at`). `DELETE` usa **query string**, no body: `?userId=N`. No se puede expulsar al dueño (`400` desde `removeMember`); `404` si el objetivo no es miembro; `400` si falta `userId`.

```bash
curl -b cookies.txt http://localhost:4321/api/farms/1/members
curl -X DELETE 'http://localhost:4321/api/farms/1/members?userId=7' -b cookies.txt
```

#### `GET|POST|DELETE /api/farms/:id/readings`

**Archivo:** `src/pages/api/farms/[id]/readings.ts` · Servicios: `src/backend/services/readings.ts`.

- `GET` (miembro/staff) → `200 { records: MetricRecord[] }`, orden ascendente por `fecha, hora`. Cada registro incluye `id: "LEC-<id>"`, `code`, `fila`, `columna`, `plantId`, `fecha`, `hora`, `phSuelo`, `tempInterna`, `tempExterna`, `tempSuelo`, `humedad`, `alturaCm`, `crecimiento`, `faseCrecimiento`, `productividad`, `sanidad`, `responsable` (texto CSV o nombre del usuario), `responsableRol`, `avatarColor`, `observaciones`.
- `POST` (miembro/staff) → body `{ "records": [MetricRecord, …] }`. No hay esquema Zod para cada registro: `insertLecturas` omite los que no tengan `fecha` `YYYY-MM-DD` o cuya `(fila, columna)` no corresponda a una planta de la finca. Upsert por `(finca_id, planta_id, fecha, hora)`; el texto `responsable` se conserva si no viene y `responsable_id` se fija al usuario de la sesión. Respuesta `200 { message, count }`; `400` si `records` está vacío.
- `DELETE` (dueño/staff) → borra **todo** el historial de la finca: `200 { message, count }`.

```bash
curl -b cookies.txt http://localhost:4321/api/farms/1/readings
curl -X POST http://localhost:4321/api/farms/1/readings -b cookies.txt \
  -H 'Content-Type: application/json' \
  -d '{"records":[{"fila":"t0","columna":"Col 1","fecha":"2026-11-23","hora":"08:30","phSuelo":6.4,"tempInterna":24.5,"humedad":65,"responsable":"Equipo de Campo"}]}'
curl -X DELETE http://localhost:4321/api/farms/1/readings -b cookies.txt
```

#### `GET|POST /api/farms/:id/invitations` y `DELETE /api/farms/:id/invitations/:invId`

**Archivo:** `src/pages/api/farms/[id]/invitations.ts` y `src/pages/api/farms/[id]/invitations/[invId].ts` · **Autorización:** dueño/staff.

`GET` → `200 { invitaciones }`. `POST` acepta `{ expiraDias?, usosMaximos? }` con defaults **7** y **1** y rangos 1–90 y 1–500; el servidor calcula `expira_en` y genera un código `nanoid` de 8 caracteres del alfabeto `nolookalikesSafe` en mayúsculas. Devuelve `201 { message, invitacion }`.

> Corrección: el body es `expiraDias` (días), **no** `expiraEn` (fecha ISO). Documentaciones anteriores usaban el nombre incorrecto.

`DELETE` → `200 { message: "Invitación revocada." }`; valida que la invitación pertenezca a `:id`; `404` si no existe. Errores comunes: `400` validación, `403` permiso, `500` fallo de base de datos.

```bash
curl -X POST http://localhost:4321/api/farms/1/invitations -b cookies.txt \
  -H 'Content-Type: application/json' -d '{"expiraDias":7,"usosMaximos":5}'
curl -b cookies.txt http://localhost:4321/api/farms/1/invitations
curl -X DELETE http://localhost:4321/api/farms/1/invitations/12 -b cookies.txt
```

---

### 4.3 Invitaciones globales

#### `GET /api/invitations/peek`

**Archivo:** `src/pages/api/invitations/peek.ts` · **Autorización:** sesión · **Query:** `?code=CODIGO` (se normaliza a mayúsculas en el servicio).

- `200` → `{ invitacion: { fincaId, fincaNombre, expiraEn, usosRestantes } }`.
- `400` → `{ message: "Falta el código." }`; `404` → código inexistente, revocado, expirado, agotado o de finca archivada.

La página `/invite/[code]` usa `peekInvitacion` directamente en SSR; este endpoint está disponible para clientes externos.

```bash
curl -b cookies.txt 'http://localhost:4321/api/invitations/peek?code=K7M4XP9Q'
```

#### `POST /api/invitations/use`

**Archivo:** `src/pages/api/invitations/use.ts` · **Autorización:** sesión · **Rate limit:** 15/300 s · Servicio: `redeemInvitacion` (`src/backend/services/farms.ts`).

Body `{ code: string }` (4–20 caracteres; se recorta y convierte a mayúsculas). La operación es transaccional (`SELECT … FOR UPDATE`) y fija la cookie `finca_activa`.

- `200` → `{ message: "Te uniste a \"X\".", fincaId, fincaNombre }` + `Set-Cookie`.
- `400` → JSON/código corto; `404` → código inexistente; `409` → ya es miembro; `410` → revocada, expirada, agotada o finca no disponible; `429` límite; `500` error interno.

```bash
curl -X POST http://localhost:4321/api/invitations/use -b cookies.txt -c cookies.txt \
  -H 'Content-Type: application/json' -d '{"code":"K7M4XP9Q"}'
```

---

### 4.4 Administración, perfil y notificaciones

#### `GET /api/admin/users`

**Archivo:** `src/pages/api/admin/users/index.ts` · **Autorización:** solo Superadmin (`canManageSystem`).

Query opcional `?q=` buscando por `name`, `email` o `phone` con `ILIKE`. Devuelve hasta **200** filas ordenadas por rol y nombre: `{ users: [{ id, name, email, phone, role, created_at, fincas_count }] }`. `401` sin sesión, `403` si no es Superadmin.

```bash
curl -b cookies.txt 'http://localhost:4321/api/admin/users?q=juan'
```

#### `PATCH|DELETE /api/admin/users/:id`

**Archivo:** `src/pages/api/admin/users/[id].ts` · **Autorización:** solo Superadmin.

`PATCH` Body `{ role }` con `role ∈ {Superadmin, Admin, Agropecuario, Campesino}`. Devuelve `200 { message }`. Protege al último Superadmin (`403`). `400` rol inválido; `404` usuario inexistente.

`DELETE` sin body. Reglas: no eliminar la propia cuenta (`403`), no eliminar al último Superadmin (`403`), no eliminar a dueño de fincas (`409` con mensaje de transferencia/borrado previo), `409` si existen lecturas asociadas (violación FK `23503`). `200 { message }` en caso de éxito; las membresías se eliminan con el usuario.

```bash
curl -X PATCH http://localhost:4321/api/admin/users/7 -b cookies.txt \
  -H 'Content-Type: application/json' -d '{"role":"Admin"}'
curl -X DELETE http://localhost:4321/api/admin/users/7 -b cookies.txt
```

#### `PATCH /api/users/me`

**Archivo:** `src/pages/api/users/me.ts` · Servicio: `src/backend/services/profile.ts` · **Autorización:** sesión (solo handler; el middleware no cubre este prefijo).

| Campo   | Regla                                                                    |
| :------ | :----------------------------------------------------------------------- |
| `name`  | Opcional; 2–255 caracteres tras recortar.                                |
| `image` | Opcional; ≤400 000 caracteres; `""`, URL `http(s)://…` o `data:image/png | jpeg | jpg | webp;base64,…`. |

Se exige al menos uno de `name`/`image` (`refine` → `400 "No se enviaron cambios."`). `image: ""` se persiste como `NULL`.

- `200` → `{ message: "Perfil actualizado.", user: { name, image } }`.
- `400` → Body inválido o validación; `401` sin sesión; `404` usuario no encontrado; `500` fallo de actualización.

```bash
curl -X PATCH http://localhost:4321/api/users/me -b cookies.txt \
  -H 'Content-Type: application/json' -d '{"name":"Juan Pérez"}'
```

#### `POST /api/notifications/weekly-summary`

**Archivo:** `src/pages/api/notifications/weekly-summary.ts` · Servicios: `src/backend/services/readings.ts`, `profile.ts`, `notifications.ts` · **Autorización:** sesión + `canViewFincaData` de la finca activa (solo handler).

Sin body. Obtiene el correo propio (`getOwnEmail`), calcula la última lectura por planta, promedios de pH y temperatura interior, plantas `Crítica`/`Vulnerable`, pH fuera de 6.0–6.8 y envía el resumen con `sendWeeklySummaryEmail`.

- `200` → `{ sent: true, message: "Resumen enviado a <email>." }`.
- `400` → `{ sent: false, message }` si no hay finca activa o la cuenta no tiene correo.
- `401` sin sesión; `403` sin acceso a la finca; `502` → `{ sent: false, message }` si SMTP no está configurado o falla el envío.

Requiere `SMTP_USER`/`SMTP_PASS` o `GMAIL_USER`/`GMAIL_APP_PASSWORD`. **No** imprime el resumen en logs como sustituto del envío (eso ocurre solo con los códigos de recuperación).

```bash
curl -X POST http://localhost:4321/api/notifications/weekly-summary \
  -b cookies.txt -H 'Accept: application/json'
```

---

### 4.5 Sincronización y exportación

#### `GET /api/sync-sheets`

**Archivo:** `src/pages/api/sync-sheets.ts` · **Autorización:** sesión + finca activa (middleware + `resolveActiveFinca`). No aplica `canConnectSheets` en `GET`.

Lee la columna `fincas.sheets_url` (la columna se crea de forma idempotente con `ALTER TABLE … IF NOT EXISTS`). Responde `200 { success: true, sheetsUrl: string | null }`. Sin finca activa: `400 { success: false, error: "Sin finca activa" }`; sin sesión: `401`.

Es usada por `src/frontend/components/Dashboard.astro` y `Metrics.astro` para recuperar la URL guardada antes de sincronizar.

```bash
curl -b cookies.txt http://localhost:4321/api/sync-sheets
```

#### `POST /api/sync-sheets`

**Archivo:** `src/pages/api/sync-sheets.ts` · Servicios: `src/backend/services/sheetsSync.ts`, `src/shared/recordsParser.ts`, `src/backend/services/readings.ts` · **Autorización:** sesión + finca activa + `canConnectSheets` → **miembro, dueño o staff**.

**Request body:** `{ "url": "https://docs.google.com/spreadsheets/d/TU_ID/edit#gid=0" }`. El campo `url` es opcional: si se omite o es inválido, se reutiliza `fincas.sheets_url`. `normalizeGoogleSheetUrl` convierte enlaces `/file/d/…`, `drive.google.com/...?id=…`, `/spreadsheets/d/e/…/pubhtml` y `/spreadsheets/d/<id>/edit#gid=<gid>` a exportaciones CSV. La descarga usa `User-Agent: Macollo-Greenhouse-Sync/2.0`.

**Columnas reconocidas** (normalizadas: sin tildes, guiones bajos/espacios equivalentes): `ID_planta`, `fecha` (ISO, `DD/MM/YYYY` o serial Excel), `responsable` (con many alias: `operario`, `técnico`, `registrado por`, `nombre`, …), `T_Ext_C`, `T_Int_C`, `humedad_Pct`, `T_Planta_C` (temperatura de suelo), `Ph`, `ALtura_cm` y opcionales `fase`, `productividad`, `sanidad`, `observacion`. La fila de cabecera se detecta entre las 10 primeras filas.

**Reglas de normalización:** pH limitado a 0–14 (default `6.4`); temperatura interna default `24.5 °C`, externa `20.2 °C`; humedad 0–100 (default `65`); `tempSuelo: null` si no se midió; altura y crecimiento derivados; sanidad derivada del pH si no se informa; **responsable** por defecto `"Sin registrar"`; `observaciones` con detalle de la medición cuando falta.

**Persistencia:** se guarda `sheets_url` en la finca antes de insertar; `insertLecturas` realiza upsert por `(finca, planta, fecha, hora)`, conservando el texto `responsable` previo si la fila no trae uno y asignando `responsable_id = ctx.user.id`.

**Respuestas:**

- `200` → `{ success: true, count, guardadas, records: MetricRecord[], sheetsUrl, message }`. `guardadas` puede ser menor que `count` si hay deduplicación o filas omitidas; un fallo de persistencia se registra en logs sin fallar la petición.
- `400` → `{ success: false, error, needsUrl?: true }` (sin finca activa o sin URL configurada).
- `401/403` → sin sesión / sin acceso a la finca (el permiso se evalúa solo en `POST`).
- `422` → `SheetsSyncError`: HTTP externo ≠ 2xx (compartir como «Cualquier persona con el enlace» o publicar como CSV), CSV vacío o sin registros válidos.
- `500` → `{ success: false, error, details }`.

```bash
curl -X POST http://localhost:4321/api/sync-sheets -b cookies.txt \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://docs.google.com/spreadsheets/d/TU_ID/edit#gid=0"}'
```

#### `GET|POST /api/export-excel`

**Archivo:** `src/pages/api/export-excel.ts` · Servicio: `src/backend/services/excelExport.ts` · **Autorización:** sesión + `canViewFincaData` de la finca activa. Ambos métodos apuntan al mismo manejador; el body se ignora.

Carga `getLecturasByFinca`, construye `PlantMatrixItem[]` con `buildPlantsGridFromRecords` y genera un libro de tres hojas: **Mediciones de Hoy** (matriz con formato, colores por sanidad, fila `PROMEDIO GENERAL`), **Historial Completo** y **Rangos Agronómicos**.

**Respuesta `200` (binaria):**

```http
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="<Finca>_Mediciones_YYYY-MM-DD.xlsx"
Cache-Control: no-cache, no-store, must-revalidate
```

> Corrección: el nombre real es `<nombre de finca sanitizado>_Mediciones_YYYY-MM-DD.xlsx`, no `Macollo_Mediciones_…`.

`500` → `{ error: "Error al exportar Excel", details }`.

```bash
curl -OJ -b cookies.txt http://localhost:4321/api/export-excel
curl -X POST -b cookies.txt http://localhost:4321/api/export-excel \
  -H 'Content-Type: application/json' -d '{}' -o reporte.xlsx
```

#### `GET /api/export-csv`

**Archivo:** `src/pages/api/export-csv.ts` · Servicio: `src/backend/services/csvExport.ts` · **Autorización:** sesión + `canViewFincaData` (solo handler; no cubierto por middleware).

Cabeceras: `Planta, Fila, Columna, Fecha, Hora, pH_Suelo, Temp_Interna_C, Temp_Externa_C, Temp_Suelo_C, Humedad_Pct, Altura_cm, Crecimiento_Pct, Fase, Productividad, Sanidad, Responsable, Observaciones`. BOM UTF-8 y separador CRLF. Nombre: `<Finca>_Historial_YYYY-MM-DD.csv`.

- `200` → `text/csv; charset=utf-8` con `Content-Disposition: attachment`.
- `400` sin finca activa; `401` sin sesión; `403` sin acceso; `500` → `{ error: "Error al exportar CSV" }`.

```bash
curl -OJ -b cookies.txt http://localhost:4321/api/export-csv
```

---

### 4.6 Integraciones climáticas

#### `GET /api/weather`

**Archivo:** `src/pages/api/weather.ts` · Servicios: `src/backend/services/weather.ts` y `serverFetch.ts` · **Autorización:** pública en la práctica.

| Parámetro    | Uso                                                     |
| :----------- | :------------------------------------------------------ |
| `lat`, `lon` | Coordenadas; si faltan o no son finitas se intenta `q`. |
| `q`          | Consulta textual geocodificada (`geocodeQuery`).        |
| `name`       | Etiqueta de ubicación preferida.                        |
| `fallback=1` | Fuerza etiqueta `Medellín, ANT` como fallback.          |

Si no hay coordenadas válidas se usan `6.2442, -75.5812` (Medellín). La respuesta es `WeatherData`: `{ temperature, humidity, rainProbability, weatherCode, windSpeed, isFallback, locationName, source }`, con `source: "Open-Meteo (Global)"` o `"Offline Fallback"`. Incluso en fallo externo el handler devuelve **`200`** con valores por defecto (`22 °C`, `60 %`, `isFallback: true`).

> Corrección: el handler invoca `getSession(request)` dentro de un `try/catch` y descarta el valor; no hay `401`. El middleware tampoco protege `/api/weather`. Debe considerarse información no sensible y no usarla como barrera de autorización.

```bash
curl 'http://localhost:4321/api/weather?lat=6.2442&lon=-75.5812'
curl 'http://localhost:4321/api/weather?q=Rionegro%2C%20Antioquia'
```

#### `GET /api/aqi`

**Archivo:** `src/pages/api/aqi.ts` · **Autorización:** pública en la práctica (mismo patrón `getSession` ignorado que `/api/weather`).

Parámetros `lat`, `lon` (default Medellín). Consulta WAQI con `WAQI_TOKEN` (valor por entorno o fallback en código) mediante `serverFetch` y timeout de 8 s. Respuesta normal: el JSON tal cual de WAQI (`{ status, data }`). Ante error externo devuelve **`200`** con `{ status: "ok", data: { aqi: 28, city: { name: "Medellín" } } }`.

```bash
curl 'http://localhost:4321/api/aqi?lat=6.2442&lon=-75.5812'
```

#### `GET /api/siata`

**Archivo:** `src/pages/api/siata.ts` · **Autorización:** sesión (comprobación explícita en el handler; el middleware no cubre el prefijo). Sin parámetros.

Consulta `http://siata.gov.co:8089/estacionesTemperatura/20` con abort a los 3 s. Respuestas:

- `200` → JSON devuelto por SIATA.
- `401` → `{ error: "No autenticado." }`.
- `500` → `{ error: "No se pudo obtener la información del SIATA" }` (caída, timeout o HTTP ≠ 2xx).

> Correcciones: no se añade la cabecera `Access-Control-Allow-Origin: *` y el error `500` no incluye campo `details`. El servicio `fetchWeatherData` ya no consume este proxy (ADR-007): el endpoint permanece operativo pero sin consumidores internos.

```bash
curl -i -b cookies.txt http://localhost:4321/api/siata
```

---

### 4.7 Galería

#### `POST /api/gallery/upload`

**Archivo:** `src/pages/api/gallery/upload.ts` · **Autorización:** sesión (middleware + doble comprobación `getSession`/`getAuthUser`).

`multipart/form-data` con `file` (obligatorio, `Blob`), `caption` y `taken_at` opcionales. Guarda el archivo en `public/uploads/gallery/<uuid>.<ext>` (extensión inferida del MIME: `png`, `webp`, `gif`, `avif` o `jpg`) e inserta en `photos` con `finca_id` tomado **directamente de la cookie `finca_activa`**, `user_id` de la sesión y `taken_at` o `NOW()`.

- `200` → `{ ok: true, photo: { id, url, filename } }`, con `url = /uploads/gallery/<uuid>.<ext>`.
- `400` → `{ error: "No se proporcionó ningún archivo válido." }`; `401` → `{ error: "No autorizado" }`; `500` → `{ error: "Error al guardar la foto en la galería." }`.

> Precisión de seguridad: el handler **no valida membresía** entre el usuario y la finca de la cookie; únicamente usa el valor entero positivo de la cookie. No hay validación de tamaño ni de tipo MIME más allá de `instanceof Blob`.

```bash
curl -X POST http://localhost:4321/api/gallery/upload -b cookies.txt \
  -H 'Origin: http://localhost:4321' \
  -F 'file=@/ruta/foto.jpg;type=image/jpeg' \
  -F 'caption=Planta T0-P1' -F 'taken_at=2026-11-23T09:00:00Z'
```

#### `GET /api/gallery/:id/file`

**Archivo:** `src/pages/api/gallery/[id]/file.ts` · **Autorización:** sesión (middleware + `getSession`). `prerender = false`.

Busca la fila en `photos` por ID y prueba rutas candidatas (`public` + `photo.url`, `public/uploads`, `public/uploads/gallery`, `public/uploads/galeria`, `uploads`). Sirve el buffer con `Content-Type` derivado del MIME, `Content-Length` y `Cache-Control: public, max-age=31536000, immutable`; si `photo.url` es HTTP remoto y no hay archivo local, redirige `302`.

- `200` imagen; `302` URL remota; `400` «ID requerido»; `401` «No autorizado»; `404` «Foto no encontrada» / «Archivo no disponible»; `500` «Error interno». Todas estas respuestas de error son **texto plano**, no JSON.

> Corrección: el endpoint **no** verifica que la foto pertenezca a la finca activa. El filtrado existe en las páginas `src/frontend/components/Gallery.astro` y `GalleryDetail.astro`, pero un cliente con sesión podría solicitar el ID de una foto de otra finca.

```bash
curl -i -b cookies.txt http://localhost:4321/api/gallery/12/file -o foto.bin
```

---

### 4.8 Diagnóstico de trips (proxy ML)

**Archivo:** `src/pages/api/trips-diagnosis.ts` · **Autorización:** pública · `prerender = false` · `maxDuration = 60` · Destino: `${ML_API_URL}/api/{health,warmup,predict}` del servicio [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api).

#### `GET /api/trips-diagnosis`

Consulta `${ML_API_URL}/api/health` con timeout de 25 s. Si `model_loaded === false`, lanza `POST /api/warmup` en segundo plano (timeout 10 s; reintento único tras renovar sesión si responde `401`).

- `200` → `{ status: "online", ml_service: <JSON de /api/health>, warming_triggered: boolean }`.
- `503` → `{ status: "offline", message: "El servidor de Machine Learning en Google Cloud Run no está activo o no responde en <URL>" }`.

#### `POST /api/trips-diagnosis`

`multipart/form-data` con `file` (obligatorio y no vacío), `temperature_c` (opcional), `crop` (default `gulupa`) y `profile` (default `auto`). Reenvía el archivo a `${ML_API_URL}/api/predict` con cabeceras `X-API-Key` y, si está disponible, la cookie `macollo_session` obtenida de `/api/auth/login`. Si la API responde `401`, renueva la sesión y **realiza un único reintento inmediato**.

- `200` → JSON de predicción del servicio ML (taxonomía, estadio, confianza, urgencia, etc.).
- `400` → `{ error: "No se proporcionó ningún archivo de imagen válido." }`.
- Cualquier estado no 2xx del servicio ML se propaga **tal cual** (por ejemplo `503` si el modelo está cargando), con `{ error: "Error desde la API de Machine Learning (<status>): <texto>" }`.
- `502` → `{ error: "No se pudo conectar con el servidor de Machine Learning en Google Cloud Run (…)" }` u error interno del proxy.

Estado verificado tras el commit `4e977f5` (**`fix(trips): direct fast inference without artificial 503 retry delays`**): se eliminaron el bucle de reintentos por `503 warming`, las esperas de 2/5/8 s, el presupuesto de 50 s y la respuesta sintética `{ status: "warming", retry: true, retry_after_seconds: 10, ... }` con cabecera `Retry-After`. Las constantes `TOTAL_BUDGET_MS` y `ATTEMPT_TIMEOUT_MS` permanecen declaradas pero ya no intervienen en `POST`; `safeJson` tampoco se usa. La inferencia es directa: una llamada, con la única excepción de la renovación automática ante `401`. La modal `TripsDiagnosticModal.astro` guarda la foto en la galería (`POST /api/gallery/upload`) de forma independiente al diagnóstico.

```bash
curl -i http://localhost:4321/api/trips-diagnosis
curl -X POST http://localhost:4321/api/trips-diagnosis \
  -H 'Origin: http://localhost:4321' \
  -F 'file=@/ruta/hoja.jpg;type=image/jpeg' \
  -F 'temperature_c=22.0' -F 'crop=gulupa' -F 'profile=auto'
```

---

## 5. Códigos de estado y errores comunes

| Código | Significado en esta API                                                                                                                                                          |
| :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200`  | Éxito. También lo devuelven `/api/weather` y `/api/aqi` cuando entregan datos de fallback.                                                                                       |
| `201`  | Recurso creado: registro, finca o invitación.                                                                                                                                    |
| `400`  | JSON inválido, validación Zod, parámetro ausente, sin finca activa, Agropecuario sin `fincaNombre`, intento de expulsar al dueño, contraseña corta o código inválido.            |
| `401`  | Sin sesión. Lo produce el middleware para prefijos protegidos o el handler (`unauthorized()`, `getSession`, `resolveActiveFinca`).                                               |
| `403`  | Sin permiso: `Campesino` creando fincas, miembro editando/archivando, no Superadmin en administración o hard delete, acceso `none` a la finca, sincronización Sheets sin acceso. |
| `404`  | Finca/usuario/foto/invitación inexistente; cuenta no encontrada en recuperación; código de invitación inexistente.                                                               |
| `409`  | Límite de 5 fincas, ya miembro de la finca, usuario dueño de fincas al eliminar cuenta o violación de clave foránea.                                                             |
| `410`  | Invitación revocada, expirada, agotada o finca no disponible.                                                                                                                    |
| `422`  | Google Sheets/Drive inaccesible, CSV vacío o sin registros válidos (`SheetsSyncError`).                                                                                          |
| `429`  | Límite de tasa por IP; incluye `Retry-After`.                                                                                                                                    |
| `500`  | Fallo interno (base de datos, ExcelJS, envío de correo, persistencia de lecturas).                                                                                               |
| `502`  | Fallo de conexión con la API de ML o SMTP no configurado/fallido en el resumen semanal.                                                                                          |
| `503`  | Solo en `/api/trips-diagnosis` `GET` (servicio ML caído) o propagado desde `/api/predict`. Ya no se genera artificialmente en `POST`.                                            |

---

## 6. Límites de tasa (middleware)

| Prefijo                          | Límite | Ventana | Fuente              |
| :------------------------------- | :----- | :------ | :------------------ |
| `/api/auth/register`             | 10     | 300 s   | `src/middleware.ts` |
| `/api/auth/forgot-password`      | 8      | 300 s   | `src/middleware.ts` |
| `/api/auth/reset-password`       | 8      | 300 s   | `src/middleware.ts` |
| `/api/auth/callback/credentials` | 20     | 300 s   | `src/middleware.ts` |
| `/api/invitations/use`           | 15     | 300 s   | `src/middleware.ts` |

La IP se obtiene de `x-forwarded-for` (primer valor) o `x-real-ip` (`src/backend/services/rateLimit.ts`). En Vercel el mapa es por instancia: no constituye un límite global.

---

## 7. Rutas que NO existen y correcciones aplicadas

| Elemento                                                             | Situación real                                                                    |
| :------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| `/api/metrics`                                                       | No existe. Usar `GET /api/farms/:id/readings`.                                    |
| `/api/export/excel`, `/api/export/csv`                               | No existen. Los correctos son `/api/export-excel` y `/api/export-csv`.            |
| `PUT` en cualquier ruta                                              | No hay manejadores `PUT`; se usa `PATCH` o `POST`.                                |
| `POST /api/sync-sheets` solo para dueño                              | Incorrecto: `canConnectSheets` admite `miembro`, `dueno` y `staff`.               |
| `expiraEn` en el body de invitaciones                                | Incorrecto: el campo real es `expiraDias` (1–90, default 7).                      |
| `newPassword` de 6 caracteres                                        | Incorrecto: `/api/auth/reset-password` exige 8.                                   |
| `GET /api/gallery/:id/file` filtrado por finca                       | Incorrecto: el handler solo exige sesión; el filtro vive en la página de detalle. |
| `Access-Control-Allow-Origin: *` en `/api/siata`                     | No se emite. Los errores son `{ error }` sin `details`.                           |
| Filename `Macollo_Mediciones_*.xlsx`                                 | Incorrecto: `<Finca>_Mediciones_YYYY-MM-DD.xlsx`.                                 |
| `/api/predict`, `/api/health`, `/api/warmup`, `/api/auth/login` (ML) | Pertenecen a `macollo-trips-api`; localmente solo existe `/api/trips-diagnosis`.  |
| Reintentos artificiales `503` en trips                               | eliminados en `4e977f5`; no hay `Retry-After` sintético en `POST`.                |
| `/signin`, `/api/farm/active`                                        | **Sí existen** como alias retrocompatibles; no eliminarlos de enlaces antiguos.   |
| `/api/sync-sheets` `GET`                                             | **Sí existe** y devuelve `sheetsUrl`; no estaba documentado.                      |

---

## Trazabilidad

| Ruta                                | Archivo                                           | Método    | Autorización          | Doc relacionado                        | Verificación curl                                                                                                        |
| :---------------------------------- | :------------------------------------------------ | :-------- | :-------------------- | :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `/api/auth/register`                | `src/pages/api/auth/register.ts`                  | POST      | Público               | AUTH (Capítulo 20 · DOC-13)            | `curl -X POST localhost:4321/api/auth/register -H 'Content-Type: application/json' -d '{...}'`                           |
| `/api/auth/check-availability`      | `src/pages/api/auth/check-availability.ts`        | POST      | Público               | AUTH (Capítulo 20 · DOC-13)            | `curl -X POST localhost:4321/api/auth/check-availability -H 'Content-Type: application/json' -d '{"email":"a@b.com"}'`   |
| `/api/auth/forgot-password`         | `src/pages/api/auth/forgot-password.ts`           | POST      | Público               | AUTH (Capítulo 20 · DOC-13)            | `curl -X POST localhost:4321/api/auth/forgot-password -H 'Content-Type: application/json' -d '{"identifier":"a@b.com"}'` |
| `/api/auth/reset-password`          | `src/pages/api/auth/reset-password.ts`            | POST      | Público               | AUTH (Capítulo 20 · DOC-13)            | `curl -X POST localhost:4321/api/auth/reset-password -H 'Content-Type: application/json' -d '{...}'`                     |
| `/api/auth/*`                       | `auth.config.ts`, `astro.config.mjs`              | GET/POST  | Público               | AUTH (Capítulo 20 · DOC-13)            | `curl -i localhost:4321/api/auth/session`                                                                                |
| `/api/farms`                        | `src/pages/api/farms/index.ts`                    | GET       | Sesión                | ROUTES (Capítulo 17 · DOC-11)          | `curl -b cookies.txt localhost:4321/api/farms`                                                                           |
| `/api/farms`                        | `src/pages/api/farms/index.ts`                    | POST      | Sesión (no Campesino) | ROUTES (Capítulo 17 · DOC-11)          | `curl -X POST -b cookies.txt localhost:4321/api/farms -d '{"nombre":"Finca X"}'`                                         |
| `/api/farms/:id`                    | `src/pages/api/farms/[id].ts`                     | GET       | Miembro               | AUTH (Capítulo 20 · DOC-13)            | `curl -b cookies.txt localhost:4321/api/farms/1`                                                                         |
| `/api/farms/:id`                    | `src/pages/api/farms/[id].ts`                     | PATCH     | Dueño/staff           | AUTH (Capítulo 20 · DOC-13)            | `curl -X PATCH -b cookies.txt localhost:4321/api/farms/1 -d '{"nombre":"Finca Y"}'`                                      |
| `/api/farms/:id`                    | `src/pages/api/farms/[id].ts`                     | DELETE    | Superadmin            | AUTH (Capítulo 20 · DOC-13)            | `curl -X DELETE -b cookies.txt localhost:4321/api/farms/1`                                                               |
| `/api/farms/active`                 | `src/pages/api/farms/active.ts`                   | GET       | Sesión                | ROUTES (Capítulo 17 · DOC-11)          | `curl -b cookies.txt localhost:4321/api/farms/active`                                                                    |
| `/api/farms/active`                 | `src/pages/api/farms/active.ts`                   | POST      | Sesión + acceso       | ROUTES (Capítulo 17 · DOC-11)          | `curl -X POST -b cookies.txt localhost:4321/api/farms/active -d '{"fincaId":1}'`                                         |
| `/api/farm/active`                  | `src/pages/api/farm/active.ts`                    | GET, POST | Igual que canonical   | ROUTES (Capítulo 17 · DOC-11)          | `curl -b cookies.txt localhost:4321/api/farm/active`                                                                     |
| `/api/farms/leave`                  | `src/pages/api/farms/leave.ts`                    | POST      | Sesión + miembro      | AUTH (Capítulo 20 · DOC-13)            | `curl -X POST -b cookies.txt localhost:4321/api/farms/leave -d '{"fincaId":1}'`                                          |
| `/api/farms/:id/archive`            | `src/pages/api/farms/[id]/archive.ts`             | POST      | Dueño/staff           | ROUTES (Capítulo 17 · DOC-11)          | `curl -X POST -b cookies.txt localhost:4321/api/farms/1/archive -d '{"activa":false}'`                                   |
| `/api/farms/:id/members`            | `src/pages/api/farms/[id]/members.ts`             | GET       | Dueño/staff           | AUTH (Capítulo 20 · DOC-13)            | `curl -b cookies.txt localhost:4321/api/farms/1/members`                                                                 |
| `/api/farms/:id/members`            | `src/pages/api/farms/[id]/members.ts`             | DELETE    | Dueño/staff           | AUTH (Capítulo 20 · DOC-13)            | `curl -X DELETE -b cookies.txt 'localhost:4321/api/farms/1/members?userId=7'`                                            |
| `/api/farms/:id/readings`           | `src/pages/api/farms/[id]/readings.ts`            | GET       | Miembro               | DATA-DICTIONARY (Capítulo 25 · DOC-15) | `curl -b cookies.txt localhost:4321/api/farms/1/readings`                                                                |
| `/api/farms/:id/readings`           | `src/pages/api/farms/[id]/readings.ts`            | POST      | Miembro               | DATA-DICTIONARY (Capítulo 25 · DOC-15) | `curl -X POST -b cookies.txt localhost:4321/api/farms/1/readings -d '{"records":[...]}'`                                 |
| `/api/farms/:id/readings`           | `src/pages/api/farms/[id]/readings.ts`            | DELETE    | Dueño/staff           | ROUTES (Capítulo 17 · DOC-11)          | `curl -X DELETE -b cookies.txt localhost:4321/api/farms/1/readings`                                                      |
| `/api/farms/:id/invitations`        | `src/pages/api/farms/[id]/invitations.ts`         | GET       | Dueño/staff           | AUTH (Capítulo 20 · DOC-13)            | `curl -b cookies.txt localhost:4321/api/farms/1/invitations`                                                             |
| `/api/farms/:id/invitations`        | `src/pages/api/farms/[id]/invitations.ts`         | POST      | Dueño/staff           | AUTH (Capítulo 20 · DOC-13)            | `curl -X POST -b cookies.txt localhost:4321/api/farms/1/invitations -d '{"expiraDias":7}'`                               |
| `/api/farms/:id/invitations/:invId` | `src/pages/api/farms/[id]/invitations/[invId].ts` | DELETE    | Dueño/staff           | AUTH (Capítulo 20 · DOC-13)            | `curl -X DELETE -b cookies.txt localhost:4321/api/farms/1/invitations/12`                                                |
| `/api/invitations/peek`             | `src/pages/api/invitations/peek.ts`               | GET       | Sesión                | ROUTES (Capítulo 17 · DOC-11)          | `curl -b cookies.txt 'localhost:4321/api/invitations/peek?code=K7M4XP9Q'`                                                |
| `/api/invitations/use`              | `src/pages/api/invitations/use.ts`                | POST      | Sesión                | ROUTES (Capítulo 17 · DOC-11)          | `curl -X POST -b cookies.txt localhost:4321/api/invitations/use -d '{"code":"K7M4XP9Q"}'`                                |
| `/api/admin/users`                  | `src/pages/api/admin/users/index.ts`              | GET       | Superadmin            | AUTH (Capítulo 20 · DOC-13)            | `curl -b cookies.txt 'localhost:4321/api/admin/users?q=juan'`                                                            |
| `/api/admin/users/:id`              | `src/pages/api/admin/users/[id].ts`               | PATCH     | Superadmin            | AUTH (Capítulo 20 · DOC-13)            | `curl -X PATCH -b cookies.txt localhost:4321/api/admin/users/7 -d '{"role":"Admin"}'`                                    |
| `/api/admin/users/:id`              | `src/pages/api/admin/users/[id].ts`               | DELETE    | Superadmin            | AUTH (Capítulo 20 · DOC-13)            | `curl -X DELETE -b cookies.txt localhost:4321/api/admin/users/7`                                                         |
| `/api/users/me`                     | `src/pages/api/users/me.ts`                       | PATCH     | Sesión                | AUTH (Capítulo 20 · DOC-13)            | `curl -X PATCH -b cookies.txt localhost:4321/api/users/me -d '{"name":"Juan"}'`                                          |
| `/api/notifications/weekly-summary` | `src/pages/api/notifications/weekly-summary.ts`   | POST      | Sesión + miembro      | AUTH (Capítulo 20 · DOC-13)            | `curl -X POST -b cookies.txt localhost:4321/api/notifications/weekly-summary`                                            |
| `/api/sync-sheets`                  | `src/pages/api/sync-sheets.ts`                    | GET       | Sesión + finca activa | ADR-005 (Apéndice A.5 · ADR-005)       | `curl -b cookies.txt localhost:4321/api/sync-sheets`                                                                     |
| `/api/sync-sheets`                  | `src/pages/api/sync-sheets.ts`                    | POST      | Miembro/dueño/staff   | ADR-005 (Apéndice A.5 · ADR-005)       | `curl -X POST -b cookies.txt localhost:4321/api/sync-sheets -d '{"url":"..."}'`                                          |
| `/api/export-excel`                 | `src/pages/api/export-excel.ts`                   | GET, POST | Sesión + miembro      | DATA-DICTIONARY (Capítulo 25 · DOC-15) | `curl -OJ -b cookies.txt localhost:4321/api/export-excel`                                                                |
| `/api/export-csv`                   | `src/pages/api/export-csv.ts`                     | GET       | Sesión + miembro      | DATA-DICTIONARY (Capítulo 25 · DOC-15) | `curl -OJ -b cookies.txt localhost:4321/api/export-csv`                                                                  |
| `/api/weather`                      | `src/pages/api/weather.ts`                        | GET       | Pública               | ADR-007 (Apéndice A.7 · ADR-007)       | `curl 'localhost:4321/api/weather?lat=6.2442&lon=-75.5812'`                                                              |
| `/api/aqi`                          | `src/pages/api/aqi.ts`                            | GET       | Pública               | ARCHITECTURE (Capítulo 4 · DOC-03)     | `curl 'localhost:4321/api/aqi?lat=6.2442&lon=-75.5812'`                                                                  |
| `/api/siata`                        | `src/pages/api/siata.ts`                          | GET       | Sesión                | ADR-004 (Apéndice A.4 · ADR-004)       | `curl -b cookies.txt localhost:4321/api/siata`                                                                           |
| `/api/gallery/upload`               | `src/pages/api/gallery/upload.ts`                 | POST      | Sesión                | COMPONENTS (Capítulo 23 · DOC-27)      | `curl -X POST -b cookies.txt -F 'file=@foto.jpg' localhost:4321/api/gallery/upload`                                      |
| `/api/gallery/:id/file`             | `src/pages/api/gallery/[id]/file.ts`              | GET       | Sesión                | COMPONENTS (Capítulo 23 · DOC-27)      | `curl -i -b cookies.txt localhost:4321/api/gallery/12/file`                                                              |
| `/api/trips-diagnosis`              | `src/pages/api/trips-diagnosis.ts`                | GET       | Pública               | CAMERA-ML (Capítulo 22 · DOC-26)       | `curl -i localhost:4321/api/trips-diagnosis`                                                                             |
| `/api/trips-diagnosis`              | `src/pages/api/trips-diagnosis.ts`                | POST      | Pública               | CAMERA-ML (Capítulo 22 · DOC-26)       | `curl -X POST -F 'file=@hoja.jpg' localhost:4321/api/trips-diagnosis`                                                    |

---

# Capítulo 20. Autenticación y Autorización - Macollo (DOC-13)

**Ruta fuente:** `docs/AUTH.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-13**.

Este documento describe el comportamiento **implementado** de autenticación (quién es el usuario) y autorización (qué puede hacer), con referencias de código verificables. La referencia operativa de bodies y códigos de respuesta es ENDPOINTS (Capítulo 19 · DOC-12); la política de secretos y amenazas es SECURITY (Capítulo 21 · DOC-24). Cuando otra documentación difiera de lo aquí indicado, prevalece el código citado.

## 1. Fuentes de verdad y modelo de confianza

| Componente                | Archivo                                                           | Responsabilidad                                              |
| :------------------------ | :---------------------------------------------------------------- | :----------------------------------------------------------- |
| Configuración Auth.js     | `auth.config.ts`                                                  | Proveedores, estrategia JWT, secret, callbacks               |
| Filtrado de peticiones    | `src/middleware.ts`                                               | Cabeceras, límite de tasa, protección gruesa de rutas, proxy |
| Servicios de autorización | `src/backend/services/authz.ts`                                   | Relectura de rol, helpers de permisos, cookie de finca       |
| Servicios de fincas       | `src/backend/services/farms.ts`                                   | Membresías, invitaciones, resolución de finca activa         |
| Endpoints de auth         | `src/pages/api/auth/*.ts`                                         | Registro, disponibilidad, recuperación                       |
| Endpoints administrativos | `src/pages/api/admin/users/*.ts`                                  | Gestión de usuarios y roles                                  |
| Esquema                   | `src/db/auth-schema.sql`, `src/db/migrations/001-roles-farms.sql` | ENUM de roles, tablas y restricciones                        |

Existen dos planos de identidad que no deben confundirse:

1. **Sesión JWT (Auth.js).** `session.strategy = "jwt"` (`auth.config.ts:170-174`). El token contiene `sub`, `role` y `sessionStartedAt` (`auth.config.ts:187-207`) y se entrega en una cookie gestionada por Auth.js.
2. **Identidad autoritativa en PostgreSQL.** `getAuthUser()` lee `id, role, name, email, image` de `users` en cada handler sensible (`src/backend/services/authz.ts:50-73`). Un cambio de rol o la eliminación del usuario surte efecto en cuanto se reconsulta la BD, aunque el JWT siga vigente.

> El rol del JWT **no** se usa como fuente de verdad para autorizar operaciones de datos. Se usa para representación en páginas y como apoyo al middleware; las decisiones de permiso se toman con el rol leído de la BD.

## 2. Arquitectura del flujo

```mermaid
flowchart TD
    U["Navegador"] --> W["/ Welcome · /signin es alias"]
    W -->|credentials| CB["POST /api/auth/callback/credentials"]
    W -->|google| GO["GET /api/auth/callback/google"]
    CB --> AU["authorize(): users por email/phone y bcrypt"]
    GO --> AD["Google OAuth + @auth/pg-adapter"]
    AU --> JWT["JWT firmado con AUTH_SECRET"]
    AD --> JWT
    JWT --> MW["middleware: proxy, rate limit, headers, rutas"]
    MW --> PG["getSession() en páginas"]
    MW --> API["Handlers API: getAuthUser() relee users"]
    API --> FA["getFincaAccess(): finca_miembros + fincas.activa"]
    FA --> DB[(PostgreSQL)]
    PG --> DB
```

La página de entrada es `/` (`auth.config.ts:176-178`). El archivo `src/pages/signin.astro:1-25` conserva `/signin` únicamente como alias: si no hay sesión redirige a `/` propagando `?desde=` y `?code=`; si hay sesión, redirige al destino indicado por `desde` o a `/`. El middleware, cuando detecta una página protegida sin sesión, redirige a `/?desde=<ruta>` (`src/middleware.ts:148-157`).

El despliegue es SSR (`output: "server"`) con adaptador de Vercel y `maxDuration: 60` (`astro.config.mjs:12-20`). El middleware reescribe la URL y `process.env.AUTH_URL` a partir de `x-forwarded-proto` y `x-forwarded-host` para operar detrás de proxy o túnel (`src/middleware.ts:76-96`).

## 3. Proveedores y sesión

### 3.1. Credenciales

`authorize()` (`auth.config.ts:75-167`) sigue este orden:

| Paso                    | Comportamiento                                                                                                            | Referencia                                          |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------- |
| Normalización           | `trim()` del identificador; se acepta `email` o el alias `username`; se exige contraseña                                  | `auth.config.ts:76-87`                              |
| Búsqueda                | `LOWER(COALESCE(email,'')) = LOWER($1) OR phone = $1`, con `ORDER BY CASE` para priorizar coincidencia por email          | `auth.config.ts:93-103`                             |
| Verificación bcrypt     | Solo hashes que cumplen `/^\$2[aby]\$/` se comparan con `bcrypt.compare`                                                  | `auth.config.ts:115-116`                            |
| Compatibilidad heredada | Si el valor almacenado no es un hash y es **igual** a la contraseña enviada, se acepta una vez y se programa su migración | `auth.config.ts:117-122`                            |
| Migración               | `bcrypt.hash(password, 10)` + `UPDATE users SET password, updated_at`                                                     | `auth.config.ts:127-144`                            |
| Emisión                 | `{ id, name, email, image, role }`; si no hay email se sintetiza `<phone                                                  | id>@invernadero.local`; rol por defecto `Campesino` | `auth.config.ts:148-158` |

Un identificador inexistente, una contraseña inválida o un error de BD producen `null`; Auth.js lo traduce al error `CredentialsSignin` (`auth.config.ts:106-108`, `161-166`). No hay bloqueo ni contador de intentos fallidos por cuenta en el código de `authorize`; el único freno es el límite de tasa por IP del middleware (sección 7).

El uso de contraseñas en texto plano como mecanismo de compatibilidad es una brecha deliberada y temporal: cualquier fila de `users` con `password` que no empiece por `$2a$`, `$2b$` o `$2y$` se acepta si coincide literalmente. La migración se registró en logs (`auth.config.ts:135-137`) y debe verificarse con SQL (sección 8).

### 3.2. Google OAuth

El proveedor Google se configura con `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` (`auth.config.ts:58-68`, `.env.example:20-21`) y declara `allowDangerousEmailAccountLinking: true`. En consecuencia, una identidad Google con un email que ya existe en `users` puede vincularse a esa cuenta sin un paso adicional de verificación de propiedad en la aplicación. Las cuentas OAuth se persisten en `accounts` a través de `@auth/pg-adapter` (`auth.config.ts:56`, `src/db/auth-schema.sql:46-60`).

### 3.3. Sesión JWT y expiración absoluta

| Parámetro      | Valor implementado                                                                              | Referencia                        |
| :------------- | :---------------------------------------------------------------------------------------------- | :-------------------------------- |
| `strategy`     | `jwt`                                                                                           | `auth.config.ts:171`              |
| `maxAge`       | `SESSION_MAX_AGE_HOURS` en horas (por defecto 24), con mínimo 1 hora y redondeo a segundos      | `auth.config.ts:39-52`, `170-173` |
| `updateAge`    | Igual a `maxAge`: no hay renovación deslizante                                                  | `auth.config.ts:173`              |
| `secret`       | `AUTH_SECRET` (obligatorio si `NODE_ENV=production`; en dev hay clave temporal con advertencia) | `auth.config.ts:28-37`, `175`     |
| `pages.signIn` | `/`                                                                                             | `auth.config.ts:176-178`          |

`callbacks.jwt` guarda `sessionStartedAt` en el primer inicio de sesión y devuelve `null` cuando `now - sessionStartedAt >= sessionMaxAge` (`auth.config.ts:187-207`). Esto complementa `exp`: Auth.js re-firma el JWT en cada lectura, por lo que el sello propio evita que la sesión se renueve indefinidamente. Para tokens emitidos antes de este mecanismo se rellena `sessionStartedAt` con la hora actual (`auth.config.ts:199-201`), es decir, se les concede una ventana completa adicional.

`callbacks.session` copia únicamente dos claims: `session.user.id = token.sub` y `session.user.role = token.role ?? "Campesino"` (`auth.config.ts:180-186`). No hay revocación server-side del JWT: un cambio de contraseña o un `signout` en otra pestaña no invalida tokens ya emitidos; la relectura de BD mitiga el efecto en las APIs, no en las etiquetas de la UI.

## 4. Registro y comprobación de disponibilidad

### 4.1. `POST /api/auth/register`

`RegisterSchema` (`src/pages/api/auth/register.ts:8-27`) y la lógica posterior aplican:

| Campo         | Regla                                                                   | Observación                                                           |
| :------------ | :---------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `name`        | `string().min(2)`, luego `trim()`                                       | Primer error Zod se devuelve en `message` (400)                       |
| `email`       | `z.email()` opcional o `""`; se normaliza a minúsculas                  | Unicidad case-insensitive comprobada en aplicación (`:96-107`)        |
| `phone`       | Opcional; se eliminan espacios, guiones y paréntesis; `/^\+?\d{7,15}$/` | Unicidad exacta comprobada en aplicación (`:109-120`)                 |
| `birthDate`   | Opcional; `YYYY-MM-DD` real y no futura                                 | `isValidBirthDate` (`:36-54`)                                         |
| `password`    | `min(8)`                                                                | Hash con `bcrypt.hash(password, 10)` (`:127`)                         |
| `accountType` | `z.enum(["Campesino","Agropecuario"])`, defecto `Campesino`             | **El cliente elige el rol**; los roles staff no son alcanzables       |
| `fincaNombre` | Opcional, `max(255)`                                                    | Obligatorio en la práctica si `accountType=Agropecuario` (`:122-125`) |

El `INSERT` devuelve `id, name, email, phone, birth_date, role` y responde `201` con `user`, `fincaCreada` y `avisoCreacion` (`:129-171`). Si la creación de la finca falla, el usuario queda creado y se devuelve un aviso; no se revierte la transacción (`:148-159`). Un campo `role` enviado por el cliente es ignorado por Zod: no figura en el esquema y se elimina al parsear.

La unicidad de email está respaldada por `UNIQUE` en la BD (`src/db/auth-schema.sql:34`); la de teléfono **no** tiene restricción equivalente (`:35`). Las comprobaciones `SELECT` previas al `INSERT` no son atómicas, por lo que existen ventanas de carrera, especialmente para `phone`.

### 4.2. `POST /api/auth/check-availability`

Endpoint público que responde `{ emailTaken, phoneTaken }` (`src/pages/api/auth/check-availability.ts:12-41`). Normaliza email a minúsculas y celular eliminando separadores, y solo consulta el teléfono si cumple `/^\+?\d{7,15}$/`. El esquema valida longitudes máximas (255 y 50), **no** formato de email. No exige sesión y no aparece en la lista de rutas con límite de tasa del middleware: es un oráculo de existencia de cuentas por diseño y debe considerarse en el análisis de enumeración (ver SECURITY (Capítulo 21 · DOC-24)).

## 5. Recuperación de contraseña

```mermaid
sequenceDiagram
    actor U as Usuario
    participant F as /api/auth/forgot-password
    participant DB as PostgreSQL
    participant N as notifications.ts
    participant R as /api/auth/reset-password
    U->>F: POST { identifier }
    F->>DB: SELECT users por email o phone
    alt sin coincidencia
        F-->>U: 404 "No encontramos ninguna cuenta..."
    else usuario encontrado
        F->>DB: DELETE verification_token + INSERT código 6 dígitos
        F->>N: sendRecoveryEmail o sendRecoverySms
        N-->>F: sent=true/false
        F-->>U: 200 { maskedTarget, identifier, sent }
    end
    U->>R: POST { identifier, code, newPassword }
    R->>DB: SELECT token WHERE expires > NOW()
    R->>DB: UPDATE users.password (bcrypt 10)
    R->>DB: DELETE verification_token
    R-->>U: 200 con datos básicos del usuario
```

| Aspecto                | Implementación                                                                                         | Referencia                         |
| :--------------------- | :----------------------------------------------------------------------------------------------------- | :--------------------------------- |
| Código                 | 6 dígitos decimales generados con `Math.random()`                                                      | `forgot-password.ts:79`            |
| Validez                | 15 minutos (`Date.now() + 15 * 60 * 1000`)                                                             | `forgot-password.ts:80`            |
| Identificador canónico | `user.email` si el input contiene `@`, en su defecto `user.phone`                                      | `forgot-password.ts:82-85`         |
| Almacenamiento         | Se borran tokens previos del mismo identificador y se inserta el nuevo en texto plano                  | `forgot-password.ts:87-94`         |
| Enmascaramiento        | Email: primeras 2 letras + hasta 5 asteriscos + dominio; teléfono: primeros 3 + asteriscos + últimos 2 | `forgot-password.ts:9-26`, `96-98` |
| Entrega                | `sendRecoveryEmail` (Nodemailer/SMTP) o `sendRecoverySms` (Twilio REST)                                | `forgot-password.ts:100-122`       |
| Verificación           | `identifier = $1 AND token = $2 AND expires > NOW()`                                                   | `reset-password.ts:34-47`          |
| Actualización          | `bcrypt.hash(newPassword, 10)`, `updated_at=NOW()`, borrado del token                                  | `reset-password.ts:49-68`          |

Consideraciones derivadas del código:

- La respuesta de `forgot-password` devuelve `identifier` **sin enmascarar** junto a `maskedTarget` (`forgot-password.ts:124-135`). El `maskedTarget` reduce la exposición en pantalla, pero el campo `identifier` conserva el valor canónico.
- Un usuario inexistente produce `404`, lo que permite distinguir cuentas existentes (`forgot-password.ts:66-74`).
- Sin `SMTP_USER`/`SMTP_PASS` (o los alias `GMAIL_USER`/`GMAIL_APP_PASSWORD`), `sendRecoveryEmail` registra el código en logs y devuelve `sent: false` (`src/backend/services/notifications.ts:27-49`); el token ya quedó guardado y sigue siendo usable. Para SMS faltan `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` y `TWILIO_PHONE_NUMBER`, con el mismo patrón de fallback a logs (`notifications.ts:138-157`). Estas variables Twilio **no** figuran en `.env.example`.
- El canje del código no es atómico: la consulta de validez y el borrado posterior son dos sentencias separadas (`reset-password.ts:34-47`, `66-68`). No hay contador de intentos, hash del token ni invalidación de sesiones JWT vigentes.

## 6. Modelo de autorización

### 6.1. Roles del sistema (enum exacto)

Los cuatro valores de `user_role_enum` son `Superadmin`, `Admin`, `Agropecuario` y `Campesino` (`src/db/auth-schema.sql:13-28`; migración en `src/db/migrations/001-roles-farms.sql:16-46`). El tipo TS homólogo está en `src/backend/services/authz.ts:3`, y la lista usada por el panel admin en `src/pages/api/admin/users/[id].ts:17-18`. No existen los valores `Super admin`, `Agronomo` ni variantes en minúsculas: la migración 001 los transforma (`001-roles-farms.sql:29-41`).

| Rol            | Definición operativa en código                                                                                                 |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `Superadmin`   | `canManageSystem` y `canHardDeleteFinca` devuelven `true` exclusivamente para este rol (`authz.ts:79-85`).                     |
| `Admin`        | Staff con acceso total a fincas; puede archivar, pero no gestionar usuarios ni hacer hard delete (`authz.ts:75-77`, `83-85`).  |
| `Agropecuario` | Dueño típico; puede crear fincas (hasta 5) y registrar `fincaNombre` en el registro (`farms.ts:25-26`, `register.ts:122-125`). |
| `Campesino`    | Rol por defecto; no puede crear fincas (`src/pages/api/farms/index.ts:40-44`) y se une por invitación como `miembro`.          |

### 6.2. Matriz de permisos por finca

`FincaAccess` tiene cuatro valores: `none`, `miembro`, `dueno` y `staff` (`authz.ts:6-7`). `getFincaAccess` devuelve `staff` de inmediato para Superadmin/Admin y, para el resto, consulta `finca_miembros` join `fincas` con `f.activa = TRUE` (`authz.ts:91-107`). Las reglas son `canManageFinca` (`:109-111`), `canViewFincaData` (`:113-116`), `canWriteFincaData` (`:118-121`) y `canConnectSheets` (`:123-129`).

| Identidad                      | Nivel resultante | Ver datos | Registrar mediciones | Gestionar finca/miembros/invitaciones | Archivar | Hard delete | Sheets | Gestionar usuarios |
| :----------------------------- | :--------------- | :-------: | :------------------: | :-----------------------------------: | :------: | :---------: | :----: | :----------------: |
| `Superadmin`                   | `staff`          |    Sí     |          Sí          |                  Sí                   |    Sí    |     Sí      |   Sí   |         Sí         |
| `Admin`                        | `staff`          |    Sí     |          Sí          |                  Sí                   |    Sí    |     No      |   Sí   |         No         |
| `dueno`                        | `dueno`          |    Sí     |          Sí          |                  Sí                   |    Sí    |     No      |   Sí   |         No         |
| `miembro`                      | `miembro`        |    Sí     |          Sí          |                  No                   |    No    |     No      |   Sí   |         No         |
| Sin membresía o finca inactiva | `none`           |    No     |          No          |                  No                   |    No    |     No      |   No   |         No         |

Fuentes de la matriz: `getFincaAccess` y helpers en `authz.ts:75-129`; `canHardDeleteFinca` aplicado en `src/pages/api/farms/[id].ts:94`; archivado en `farms/[id]/archive.ts:29-30`; lecturas en `farms/[id]/readings.ts:31-32`, `47-48`, `80-81`; sincronización en `src/pages/api/sync-sheets.ts:65-70`.

> **Corrección de deriva.** `canConnectSheets` devuelve `true` para `dueno`, `staff` **y** `miembro` (`authz.ts:127-129`), y el handler de `/api/sync-sheets` solo bloquea `none` (`sync-sheets.ts:65-70`). La afirmación anterior de este documento —y la de `docs/ENDPOINTS.md:162`— de que la sincronización es exclusiva del dueño es incorrecta. Registrar mediciones manualmente y conectar/sincronizar Hojas son acciones distintas con permisos distintos.

### 6.3. Gestión administrativa de usuarios

| Operación                     | Regla                                                                                                          | Referencia                                    |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| `GET /api/admin/users?q=`     | Solo Superadmin; filtra nombre/email/teléfono con `ILIKE`, ordena por rol y nombre, `LIMIT 200`                | `admin/users/index.ts:12-34`                  |
| `PATCH /api/admin/users/:id`  | Solo Superadmin; `role` validado contra los 4 valores del enum                                                 | `admin/users/[id].ts:17-18`, `27-67`          |
| Salvaguarda de roles          | No se puede degradar ni eliminar al último `Superadmin`                                                        | `admin/users/[id].ts:20-25`, `48-54`, `89-91` |
| `DELETE /api/admin/users/:id` | Prohíbe auto-eliminación; bloquea con `409` si el usuario es dueño de alguna finca; traduce FK `23503` a `409` | `admin/users/[id].ts:69-124`                  |

El cambio de rol se escribe en `users` y se registra en logs con el administrador responsable (`admin/users/[id].ts:56-63`). La relectura de `getAuthUser` hace que el nuevo rol se aplique de inmediato en las APIs; las páginas que solo usan `getSession` conservarán el rol del JWT hasta su expiración.

### 6.4. Fincas, invitaciones y finca activa

- `finca_miembros` es N:N con `rol_finca CHECK (rol_finca IN ('dueno','miembro'))`, `UNIQUE (finca_id, user_id)` y borrado en cascada (`001-roles-farms.sql:68-78`).
- El límite de creación es **5 fincas por usuario**, comprobado antes de insertar (`src/backend/services/farms.ts:25-26`, `87-96`).
- Los códigos de invitación tienen **8 caracteres** en mayúsculas, alfabeto `nolookalikesSafe` y reintento ante colisión (`farms.ts:28-56`). El canje valida `activa`, `finca_activa`, `expira_en` y `usos_usados < usos_maximos`, bloquea la fila con `FOR UPDATE OF i` y escribe la membresía `miembro` en una transacción (`farms.ts:304-369`). El endpoint exige sesión y aplica límite de tasa (`src/pages/api/invitations/use.ts:17-42`, `src/middleware.ts:36`).
- La cookie `finca_activa` es `HttpOnly; SameSite=Lax; Max-Age=2592000; Path=/`, con `Secure` añadido solo si `NODE_ENV=production` (`authz.ts:137-147`). Su valor no está firmado, pero `resolveActiveFinca` lo contrasta con la lista de fincas permitidas al usuario (`farms.ts:413-429`); si la cookie es inválida y el usuario tiene una sola finca, esa finca se selecciona automáticamente (`:426`).
- `CREATE TABLE fincas.dueno_id` usa `ON DELETE RESTRICT` (`001-roles-farms.sql:51-60`), coherente con el bloqueo de borrado de usuarios dueños.

### 6.5. Perfil del usuario

`PATCH /api/users/me` actualiza únicamente `name` y `image` del usuario autenticado (`src/pages/api/users/me.ts:35-60`, `src/backend/services/profile.ts:13-42`). La imagen acepta `""`, `data:image/(png|jpeg|jpg|webp);base64,…` o una URL `http(s)`, con tope de 400.000 caracteres (`users/me.ts:11-12`, `22-29`). No permite cambiar email, teléfono, contraseña ni rol.

## 7. Protección perimetral: middleware

### 7.1. Límites de tasa reales

`RATE_LIMITED` en `src/middleware.ts:30-37` define exactamente cinco reglas. La clave es `<prefijo>:<IP>`, donde la IP se obtiene del primer valor de `x-forwarded-for`, o de `x-real-ip`, o del literal `unknown` (`src/backend/services/rateLimit.ts:61-65`). La ventana es **deslizante** y el exceso responde `429` con `Retry-After` (`middleware.ts:100-127`).

| Ruta                             |        Límite |       Ventana | Clave                                 |
| :------------------------------- | ------------: | ------------: | :------------------------------------ |
| `/api/auth/register`             | 10 peticiones | 300 s (5 min) | `/api/auth/register:<IP>`             |
| `/api/auth/forgot-password`      |  8 peticiones |         300 s | `/api/auth/forgot-password:<IP>`      |
| `/api/auth/reset-password`       |  8 peticiones |         300 s | `/api/auth/reset-password:<IP>`       |
| `/api/auth/callback/credentials` | 20 peticiones |         300 s | `/api/auth/callback/credentials:<IP>` |
| `/api/invitations/use`           | 15 peticiones |         300 s | `/api/invitations/use:<IP>`           |

El contador vive en un `Map` en memoria, con limpieza perezosa cuando se superan 10.000 buckets (`rateLimit.ts:5-10`, `31-37`). No hay límite por cuenta, por identificador de recuperación ni para `check-availability`. En múltiples instancias serverless cada una mantiene su propio contador.

### 7.2. Rutas protegidas

| Tipo    | Rutas                                                                                                                         | Sin sesión               |
| :------ | :---------------------------------------------------------------------------------------------------------------------------- | :----------------------- |
| Páginas | `/metrics`, `/history`, `/settings`, `/farms`, `/gallery`, `/admin` (y subrutas)                                              | `redirect` a `/?desde=…` |
| APIs    | Prefijos `/api/farms`, `/api/invitations`, `/api/admin`, `/api/farm`, `/api/gallery`, `/api/sync-sheets`, `/api/export-excel` | `401` JSON               |

Fuente: `src/middleware.ts:9-27`, `129-159`. La comparación de páginas usa igualdad o prefijo con `/`; la de APIs usa `pathname.startsWith(p)` sin exigir frontera de segmento (`:133-135`), por lo que un prefijo como `/api/farm` también alcanza rutas que empiecen por esos caracteres. Las reglas de tasa, en cambio, sí comprueban igualdad o `prefijo + "/"` (`:102`).

### 7.3. Cabeceras exactas

`applySecurityHeaders` se aplica a respuestas `429`, `401`, redirecciones y al resultado de `next()` (`src/middleware.ts:64-74`, `122`, `145`, `156`, `161-163`).

| Cabecera                     | Valor literal                                                                                  |
| :--------------------------- | :--------------------------------------------------------------------------------------------- |
| `X-Frame-Options`            | `DENY`                                                                                         |
| `X-Content-Type-Options`     | `nosniff`                                                                                      |
| `Referrer-Policy`            | `strict-origin-when-cross-origin`                                                              |
| `Permissions-Policy`         | `camera=(self *), microphone=(), geolocation=(self), payment=()`                               |
| `Cross-Origin-Opener-Policy` | `same-origin`                                                                                  |
| `X-DNS-Prefetch-Control`     | `off`                                                                                          |
| `Strict-Transport-Security`  | `max-age=31536000; includeSubDomains` **solo** si la URL es HTTPS o `x-forwarded-proto: https` |
| `Content-Security-Policy`    | Ver bloque siguiente                                                                           |

```text
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https:;
font-src 'self' data:;
connect-src 'self' https://api.open-meteo.com https://api.waqi.info;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none'
```

La CSP se construye con `join("; ")` (`src/middleware.ts:49-61`): no hay `upgrade-insecure-requests`, no hay directiva `worker-src` explícita y se permite `unsafe-inline` en scripts y estilos (necesario para Astro en desarrollo y para componentes inline, según el comentario del código). `connect-src` incluye Open-Meteo y WAQI porque el tablero los consulta desde el cliente (`middleware.ts:55-56`).

```mermaid
flowchart TD
    A["Petición"] --> B["Proxy: x-forwarded-proto/host reescriben URL y AUTH_URL"]
    B --> C{"Coincide con RATE_LIMITED?"}
    C -->|sí| D{"rateLimit(clave, límite, ventana)"}
    D -->|excedido| E["429 + Retry-After"]
    D -->|permitido| F{"¿Ruta protegida?"}
    C -->|no| F
    F -->|sí, sin sesión| G["Página: redirect /?desde= · API: 401"]
    F -->|no o con sesión| H["next()"]
    E --> I["applySecurityHeaders (HSTS solo si HTTPS)"]
    G --> I
    H --> I
    I --> J["Respuesta"]
```

## 8. Procedimientos de verificación

Los comandos asumen el servidor local en `http://localhost:4321` y un shell POSIX.

```bash
BASE=http://localhost:4321

# Cabeceras de seguridad (HSTS no aparece en http plano: es esperado)
curl -sSI "$BASE/" | grep -iE '^(HTTP/|content-security-policy|x-frame-options|x-content-type-options|referrer-policy|permissions-policy|cross-origin-opener-policy|x-dns-prefetch-control|strict-transport-security):'

# Registro de un Campesino
curl -sS -o /tmp/opencode/reg.json -w '%{http_code}\n' \
  -X POST "$BASE/api/auth/register" -H 'Content-Type: application/json' \
  -d '{"name":"Prueba Audit","email":"audit-2026@example.com","password":"secreto123"}'

# Intento de escalada de rol: accountType no asigna role; role se ignora
curl -sS -X POST "$BASE/api/auth/register" -H 'Content-Type: application/json' \
  -d '{"name":"Prueba Audit","email":"audit-role@example.com","password":"secreto123","role":"Superadmin"}'

# Disponibilidad (público y sin límite de tasa)
curl -sS -X POST "$BASE/api/auth/check-availability" \
  -H 'Content-Type: application/json' -d '{"email":"audit-2026@example.com"}'

# Sin sesión: 401 en API protegida y redirección en página protegida
curl -sS -o /dev/null -w 'admin: %{http_code}\n' "$BASE/api/admin/users"
curl -sS -o /dev/null -w 'metrics: %{http_code} -> %{redirect_url}\n' "$BASE/metrics"

# Con sesión de Superadmin (sustituir por la cookie Auth.js de la sesión)
curl -sS "$BASE/api/admin/users?q=audit" -H 'Cookie: <cookie-de-sesion-authjs>'

# Perfil propio: solo name/image
curl -sS -X PATCH "$BASE/api/users/me" -H 'Content-Type: application/json' \
  -H 'Cookie: <cookie-de-sesion-authjs>' -d '{"name":"Nombre Auditado"}'

# Límite de tasa: 11 intentos sobre register con body inválido; el 11º debe ser 429
for i in $(seq 1 11); do
  curl -sS -o /dev/null -w '%{http_code} ' -X POST "$BASE/api/auth/register" \
    -H 'Content-Type: application/json' -d '{}'
done; echo

# Recuperación: sin SMTP configurado devuelve sent=false y el código queda en logs
curl -sS -X POST "$BASE/api/auth/forgot-password" \
  -H 'Content-Type: application/json' -d '{"identifier":"audit-2026@example.com"}'
```

Comprobaciones SQL útiles (`psql "$DATABASE_URL"` o Query Tool de pgAdmin):

```sql
-- ENUM exacto (debe devolver 4 filas: Superadmin, Admin, Agropecuario, Campesino)
SELECT e.enumlabel
FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid
WHERE t.typname = 'user_role_enum'
ORDER BY e.enumsortorder;

-- Distribución de roles y cuántos Superadmin existen
SELECT role, count(*) FROM users GROUP BY role ORDER BY role;

-- Contraseñas no migradas a bcrypt (deben dar 0 tras el primer login de cada cuenta)
SELECT id, email FROM users
WHERE password IS NOT NULL AND password !~ '^\$2[aby]\$';

-- Duplicados: email está protegido por UNIQUE; phone no
SELECT lower(email) AS email, count(*) FROM users WHERE email IS NOT NULL
GROUP BY 1 HAVING count(*) > 1;
SELECT phone, count(*) FROM users WHERE phone IS NOT NULL
GROUP BY 1 HAVING count(*) > 1;

-- Códigos de recuperación vigentes (almacenados en texto plano)
SELECT identifier, token, expires FROM verification_token
WHERE expires > NOW() ORDER BY expires DESC LIMIT 10;

-- Membresías y coherencia de dueños
SELECT f.id, f.dueno_id, m.user_id, m.rol_finca, f.activa
FROM fincas f LEFT JOIN finca_miembros m ON m.finca_id = f.id
ORDER BY f.id;

-- Superadmin con más de una finca en propiedad (no se puede borrar desde /admin)
SELECT dueno_id, count(*) FROM fincas GROUP BY dueno_id HAVING count(*) > 1;
```

## 9. Amenazas mitigadas y brechas abiertas

| Amenaza                              | Mitigación implementada                                                                             |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------- |
| Fuerza bruta de login                | 20 intentos / 300 s por IP en `callback/credentials` (`middleware.ts:35`)                           |
| Abuso de registro y recuperación     | 10 y 8 intentos / 300 s por IP respectivamente (`middleware.ts:32-34`)                              |
| Robo de sesión por XSS parcial       | Cookie de sesión gestionada por Auth.js y cookie `finca_activa` con `HttpOnly` (`authz.ts:140-142`) |
| Clickjacking y MIME sniffing         | `X-Frame-Options: DENY`, `nosniff`, `frame-ancestors 'none'` (`middleware.ts:40-41`, `60`)          |
| Escalada de rol desde el registro    | `accountType` restringido a dos valores; `role` ignorado (`register.ts:20`, `122`)                  |
| Cambio de rol no reflejado en la API | Relectura de `users` en `getAuthUser` (`authz.ts:50-73`)                                            |
| Datos entre fincas                   | `finca_id` en `plantas`/`lecturas` (`001-roles-farms.sql:99-134`) y verificación de membresía       |

Brechas que permanecen abiertas y su detalle en SECURITY (Capítulo 21 · DOC-24): contadores de tasa en memoria y IP confiada de cabeceras proxy; códigos de recuperación generados con `Math.random()`, almacenados sin hash y sin límite de intentos; aceptación de contraseñas en texto plano; ausencia de revocación de JWT; vinculación automática de cuentas Google; oráculos de existencia en `forgot-password` y `check-availability`.

## Trazabilidad

| Tema                         | Archivo(s) de código                                                                              | Doc(s) relacionado(s)                                            | Verificación sugerida                                                                                |
| :--------------------------- | :------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| Proveedores, JWT y secret    | `auth.config.ts`, `astro.config.mjs`, `.env.example`                                              | `docs/SECURITY.md`, `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md` | Revisar `GET /api/auth/session` con y sin cookie; comprobar que falta `AUTH_SECRET` rompe producción |
| Registro y roles asignables  | `src/pages/api/auth/register.ts`, `src/pages/api/auth/check-availability.ts`                      | `docs/ENDPOINTS.md`, `docs/USER_MANUAL.md`                       | `curl` de registro con `role:"Superadmin"` y consulta SQL del rol resultante                         |
| Recuperación de contraseña   | `src/pages/api/auth/{forgot-password,reset-password}.ts`, `src/backend/services/notifications.ts` | `docs/ENDPOINTS.md`, `docs/TROUBLESHOOTING.md`                   | Verificar `sent:false` sin SMTP, TTL de 15 min y borrado del token en SQL                            |
| Roles y matriz de permisos   | `src/backend/services/authz.ts`, `src/db/migrations/001-roles-farms.sql`                          | `docs/DATABASE.md`, `docs/REQUIREMENTS.md`                       | Consultar `pg_enum`; probar `dueno` vs `miembro` en `/api/sync-sheets`                               |
| Gestión administrativa       | `src/pages/api/admin/users/{index,[id]}.ts`                                                       | `docs/ENDPOINTS.md`, `docs/ROUTES.md`                            | `401` anónimo, `403` con Admin, guardar última prueba del último Superadmin                          |
| Fincas e invitaciones        | `src/backend/services/farms.ts`, `src/pages/api/invitations/use.ts`                               | `docs/ENDPOINTS.md`, `docs/USER_MANUAL.md`                       | Canjear código dos veces: segunda respuesta `409`/`410`; comprobar `usos_usados`                     |
| Middleware, tasa y cabeceras | `src/middleware.ts`, `src/backend/services/rateLimit.ts`                                          | `docs/SECURITY.md`, `docs/ROUTES.md`                             | Bucle de 11 peticiones a `register`; `curl -I` comparando HTTP/HTTPS                                 |
| Perfil propio                | `src/pages/api/users/me.ts`, `src/backend/services/profile.ts`                                    | `docs/ENDPOINTS.md`                                              | `PATCH` con `role` incluido: comprobar que no se persiste                                            |

---

# Capítulo 21. Política de Seguridad - Macollo (DOC-24)

**Ruta fuente:** `docs/SECURITY.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-24**.

Este documento inventaría los controles de seguridad **existentes**, las amenazas que mitigan y las brechas pendientes, con referencias de código. El detalle funcional de autenticación y autorización está en AUTH (Capítulo 20 · DOC-13); los conceptos de diseño en ARCHITECTURE (Capítulo 4 · DOC-03) y las decisiones en `docs/decisions/`. No se describe aquí funcionalidad que no esté implementada.

## 1. Alcance y modelo de confianza

La aplicación se ejecuta en modo SSR (`output: "server"`) sobre Vercel (`astro.config.mjs:12-20`). La confianza se reparte en cuatro capas:

```mermaid
flowchart LR
    E["Perímetro: proxy, HTTPS, cabeceras y checkOrigin"] --> M["Middleware: tasa por IP y rutas"]
    M --> S["Auth.js: JWT firmado con AUTH_SECRET"]
    S --> A["authz.ts: rol leído de users y acceso a finca"]
    A --> D[(PostgreSQL: restricciones y claves foráneas)]
```

1. **Perímetro.** Astro declara `security.checkOrigin: true` (`astro.config.mjs:13`). El middleware interpreta `x-forwarded-proto`/`x-forwarded-host`, reescribe la URL de la petición y asigna `AUTH_URL` (`src/middleware.ts:76-96`). No añade lógica de host para la landing: `/landing` es una ruta pública más y no expone APIs ni datos de sesión.
2. **Sesión.** Auth.js usa JWT (`auth.config.ts:170-174`) con `AUTH_SECRET` obligatorio en producción (`auth.config.ts:28-37`).
3. **Autorización.** `getAuthUser()` relee `users` en cada operación sensible y `getFincaAccess()` consulta membresía activa (`src/backend/services/authz.ts:50-73`, `91-107`). Es un modelo de verificación continua dentro de la API.
4. **Persistencia.** El esquema define ENUM de roles, claves foráneas y restricciones `CHECK`/`UNIQUE` (`src/db/auth-schema.sql:13-76`, `src/db/migrations/001-roles-farms.sql:51-134`).

La frontera de confianza incluye explícitamente las cabeceras `x-forwarded-*`: se confía en que el proxy las normaliza. En ausencia de un proxy que sobrescriba esas cabeceras, un cliente puede influir en la IP del limitador y en la URL reconstruida (sección 7). `checkOrigin: true` implica que un `POST` de formulario entre dominios distintos sería `403`; por eso la landing usa exclusivamente enlaces `GET`. Si en el futuro se publica en otro dominio, las cookies de Auth.js (host-only) no compartirán sesión con la app (ver LANDING (Capítulo 18 · DOC-47), DOC-47).

## 2. Secretos y configuración

### 2.1. Regla y mecanismo

Ningún secreto debe versionarse: `AUTH_SECRET`, `SMTP_PASS` (o `GMAIL_APP_PASSWORD`), `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`/`POSTGRES_PASSWORD` y tokens de servicios externos solo deben vivir en `.env` local no versionado o en las variables de entorno del despliegue. `.env.example:1` advierte explícitamente no commitear el `.env` real y contiene únicamente marcadores.

El hook `.husky/pre-commit:3-10` ejecuta `npx lint-staged` y rechaza el commit si algún **nombre de archivo en staging** coincide con `\.env|credentials|secret`, salvo `.env.example`. `package.json:57-59` configura `lint-staged` únicamente con `prettier --ignore-unknown --write`: **no hay escaneo de contenido**. Un secreto pegado en un archivo `.ts` versionado no es detectado por este mecanismo.

### 2.2. Variables relevantes y fallbacks reales

| Variable                                                           | Consumo en código                                 | Observación de seguridad                                                                                                                |
| :----------------------------------------------------------------- | :------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `AUTH_SECRET`                                                      | `auth.config.ts:28-37`, `175`                     | Falta en producción → excepción; en desarrollo se usa `dev-only-insecure-key-do-not-use-in-production` con advertencia                  |
| `SESSION_MAX_AGE_HOURS`                                            | `auth.config.ts:39-52`                            | Entero ≥ 1; defecto 24; expiración absoluta por `sessionStartedAt`                                                                      |
| `DATABASE_URL` o `POSTGRES_*`                                      | `src/db/client.ts:18-44`                          | Pool con `max: 20`; en producción `ssl: { rejectUnauthorized: false }` (sección 7)                                                      |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`                        | `auth.config.ts:58-68`                            | Sin ellas el proveedor Google queda con credenciales vacías                                                                             |
| `SMTP_USER` / `SMTP_PASS`                                          | `notifications.ts:27-33`, `230-236`               | Alias `GMAIL_USER` / `GMAIL_APP_PASSWORD`; `SMTP_HOST` por defecto `smtp.gmail.com`, `SMTP_PORT` 465, `secure: port === 465` (`:53-61`) |
| `SMTP_FROM`                                                        | `notifications.ts:31-33`                          | Por defecto `"Macollo Invernadero" <no-reply@macollo.com>`                                                                              |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_PHONE_NUMBER` | `notifications.ts:138-140`                        | Requeridas para SMS reales; **ausentes en `.env.example`**                                                                              |
| `WAQI_TOKEN`                                                       | `src/pages/api/aqi.ts:8-9`                        | Si falta, se usa un token literal embebido en el código                                                                                 |
| `ML_API_KEY`                                                       | `src/pages/api/trips-diagnosis.ts:15-19`          | Alias `API_KEY`, `ML_X_API_KEY`; si faltan, se usa una clave literal embebida                                                           |
| `ML_API_URL`                                                       | `trips-diagnosis.ts:10-13`                        | Alias `PUBLIC_API_URL`, con URL por defecto embebida                                                                                    |
| `AUTH_TRUST_HOST`                                                  | `.env.example:16`                                 | `auth.config.ts:55` fija `trustHost: true` de forma incondicional; la variable es redundante en la configuración actual                 |
| `AUTH_URL`                                                         | `.env.example:18` (comentada), `middleware.ts:94` | El middleware la sobrescribe por petición tras el proxy                                                                                 |
| `SITE`                                                             | `astro.config.mjs:12`                             | Valor por defecto `https://macollo.tech`                                                                                                |

### 2.3. Correcciones de deriva documental

- `docs/DEPLOYMENT.md:3` todavía afirma `security.checkOrigin: false`; la configuración vigente es `true` (`astro.config.mjs:13`).
- `docs/ENDPOINTS.md:121` indica `newPassword < 6`; el servidor exige **8** (`src/pages/api/auth/reset-password.ts:27-32`).
- `docs/ENDPOINTS.md:162` restringe la sincronización de Sheets al dueño; `canConnectSheets` autoriza también a `staff` y `miembro` (`src/backend/services/authz.ts:127-129`).
- `docs/ENDPOINTS.md:328` afirma que el resumen semanal imprime el código en logs; `sendWeeklySummaryEmail` no genera ni registra códigos, solo envía el correo si hay SMTP (`notifications.ts:221-243`, `287-295`).

Estos documentos no se modifican en esta revisión; se listan para evitar que su lectura invalide los controles aquí descritos.

## 3. Controles implementados

| Capa                  | Control concreto                                                                                                                   | Evidencia                                                                                          |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| Transporte            | HSTS `max-age=31536000; includeSubDomains` cuando la petición se resuelve como HTTPS; PostgreSQL con TLS en producción             | `middleware.ts:64-74`, `src/db/client.ts:22-25`, `36-39`                                           |
| Solicitudes           | `security.checkOrigin: true` en la configuración Astro                                                                             | `astro.config.mjs:13`                                                                              |
| Navegador             | Cabeceras `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, `X-DNS-Prefetch-Control`, CSP             | `middleware.ts:39-74`                                                                              |
| Rutas                 | Lista de páginas protegidas y prefijos de API; redirección con `?desde=` o `401` JSON                                              | `middleware.ts:9-27`, `129-159`                                                                    |
| Frecuencia            | Cinco reglas de ventana deslizante por IP con `Retry-After`                                                                        | `middleware.ts:30-37`, `100-127`, `rateLimit.ts:23-58`                                             |
| Sesión                | JWT firmado, `maxAge` absoluto, `sessionStartedAt`, rol por defecto `Campesino`                                                    | `auth.config.ts:39-52`, `170-207`                                                                  |
| Autorización          | Rol real reconsultado en BD; acceso a finca con `finca_miembros` y `fincas.activa = TRUE`                                          | `authz.ts:50-73`, `91-107`                                                                         |
| Multi-tenant          | `finca_id` en `plantas`/`lecturas`; cookie `finca_activa` HttpOnly contrastada contra la lista de fincas permitidas                | `001-roles-farms.sql:99-134`, `authz.ts:137-160`, `farms.ts:413-429`                               |
| Invitaciones          | Código de 8 caracteres, expiración, usos, revocación, canje con `FOR UPDATE` en transacción                                        | `farms.ts:25-31`, `43-56`, `304-369`                                                               |
| Credenciales          | bcrypt coste 10 en registro, reset y migración de hashes heredados; contraseña mínima 8                                            | `register.ts:127`, `reset-password.ts:27-32`, `49`, `auth.config.ts:115-143`                       |
| Validación de entrada | Zod en registro, disponibilidad, perfil, administración de usuarios, fincas e invitaciones; `parseJsonBody` controla JSON inválido | `register.ts:8-27`, `check-availability.ts:7-10`, `users/me.ts:14-33`, `admin/users/[id].ts:17-18` |
| Limitación de datos   | Listado administrativo con `LIMIT 200`; imagen de perfil con tope de 400.000 caracteres y patrón restringido                       | `admin/users/index.ts:21-31`, `users/me.ts:11-12`, `22-29`                                         |
| Integridad de roles   | Enum de cuatro valores; salvaguardas para el último Superadmin y para dueños de finca                                              | `001-roles-farms.sql:16-46`, `admin/users/[id].ts:48-54`, `89-105`                                 |
| Errores               | Respuestas JSON con mensajes controlados; errores de BD se-loguean en servidor y se devuelven como 500 genérico                    | `register.ts:172-178`, `forgot-password.ts:136-145`, `reset-password.ts:84-93`                     |

## 4. Cabeceras, CSP y TLS

Las cabeceras se aplican en **todas** las salidas del middleware, incluidas `429`, `401` y redirecciones (`middleware.ts:122`, `145`, `156`, `161-163`). Valores literales:

| Cabecera                     | Valor                                                            |
| :--------------------------- | :--------------------------------------------------------------- |
| `X-Frame-Options`            | `DENY`                                                           |
| `X-Content-Type-Options`     | `nosniff`                                                        |
| `Referrer-Policy`            | `strict-origin-when-cross-origin`                                |
| `Permissions-Policy`         | `camera=(self *), microphone=(), geolocation=(self), payment=()` |
| `Cross-Origin-Opener-Policy` | `same-origin`                                                    |
| `X-DNS-Prefetch-Control`     | `off`                                                            |
| `Strict-Transport-Security`  | `max-age=31536000; includeSubDomains` (condicionado a HTTPS)     |

```text
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https:;
font-src 'self' data:;
connect-src 'self' https://api.open-meteo.com https://api.waqi.info;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none'
```

La CSP está en `src/middleware.ts:49-61`. La decisión de permitir `unsafe-inline` está documentada en el propio código (`:47-48`) por inyecciones de Astro en desarrollo y componentes inline. HSTS no incluye `preload`, no hay `Cross-Origin-Embedder-Policy` y la Directiva `connect-src` está abierta a `https:` solo para imágenes, no para scripts. La detección de HTTPS usa `request.url.startsWith("https://") || forwardedProto === "https"` (`middleware.ts:83-84`): en una petición HTTP sin cabecera de proxy, HSTS no se envía.

El pool de PostgreSQL activa TLS en producción, pero con `rejectUnauthorized: false` (`src/db/client.ts:22-25`, `36-39`), es decir, cifra sin validar el certificado del servidor: no protege frente a un atacante con capacidad de interceptación TLS.

## 5. Límite de tasa y confianza en la IP

| Endpoint                         | Peticiones | Ventana | Fuente             |
| :------------------------------- | ---------: | ------: | :----------------- |
| `/api/auth/register`             |         10 |   300 s | `middleware.ts:32` |
| `/api/auth/forgot-password`      |          8 |   300 s | `middleware.ts:33` |
| `/api/auth/reset-password`       |          8 |   300 s | `middleware.ts:34` |
| `/api/auth/callback/credentials` |         20 |   300 s | `middleware.ts:35` |
| `/api/invitations/use`           |         15 |   300 s | `middleware.ts:36` |

La ventana es deslizante: se conservan marcas de tiempo dentro de `windowSeconds` y, al alcanzar el límite, se responde `429` con `Retry-After` calculado desde la marca más antigua (`rateLimit.ts:45-57`, `middleware.ts:109-124`). El estado es un `Map` por proceso con un máximo suave de 10.000 claves y limpieza perezosa (`rateLimit.ts:5-10`, `31-37`).

La IP se toma del **primer** valor de `x-forwarded-for`, de `x-real-ip` o del literal `unknown` (`rateLimit.ts:61-65`). No se valida que esas cabeceras provengan del proxy de confianza. Tampoco hay límite para `/api/auth/check-availability`, para los demás endpoints de Auth.js ni por cuenta/identificador de recuperación.

## 6. Amenazas mitigadas

| Amenaza                                     | Control                                                                | Efecto residual                                                            |
| :------------------------------------------ | :--------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| Fuerza bruta de credenciales                | 20/300 s por IP en `callback/credentials`                              | Un atacante con control de `x-forwarded-for` puede evadir el contador      |
| Creación masiva de cuentas                  | 10/300 s en `register`; unicidad de email en BD                        | El teléfono no es `UNIQUE`; la comprobación previa no es atómica           |
| Abuso de recuperación                       | 8/300 s en `forgot` y `reset`; código con TTL de 15 min                | Sin límite por identificador ni por intento de código                      |
| Robo de sesión                              | JWT firmado con `AUTH_SECRET`; cookie `finca_activa` HttpOnly          | No hay revocación server-side del JWT                                      |
| Escalada de privilegios desde el cliente    | `accountType` limitado a `Campesino`/`Agropecuario`; rol releído de BD | Las etiquetas de páginas pueden mostrar el rol antiguo del JWT             |
| Acceso cross-tenant                         | `getFincaAccess` exige membresía en finca activa; `finca_id` en datos  | Staff ve todas las fincas activas por diseño                               |
| Clickjacking / sniffing / framing externo   | `DENY`, `nosniff`, `frame-ancestors 'none'`                            | `unsafe-inline` debilita la CSP frente a XSS                               |
| Fuga del token meteorológico al cliente     | Proxy servidor en `/api/siata` con sesión obligatoria (`siata.ts:5-9`) | `/api/aqi` invoca `getSession` pero descarta el resultado (`aqi.ts:11-14`) |
| Borrado accidental del último administrador | Guardas en `PATCH`/`DELETE` de `/api/admin/users/:id`                  | No cubre cambios de rol realizados directamente en BD                      |

## 7. Riesgos conocidos y backlog

Los identificadores SEC-01 a SEC-08 se conservan de revisiones anteriores; el resto son nuevos. «Pendiente» significa que no existe control en el código citado.

| ID     | Riesgo                                               | Evidencia                                                                                     | Estado / acción propuesta                                                                                                                           |
| :----- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEC-01 | Handlers sensibles sin verificación de sesión        | `authz.ts:50-73`, handlers de `/api/farms`, `/api/admin`                                      | Resuelto: verificación en middleware y en cada handler                                                                                              |
| SEC-02 | Middleware con `/dashboard` como ruta muerta         | `middleware.ts:9-27`                                                                          | Resuelto: rutas reales, incluida `/gallery`, con `401`/redirect                                                                                     |
| SEC-03 | Token de calidad del aire expuesto en cliente        | `siata.ts:5-9`, `aqi.ts:8-14`                                                                 | Parcial: SIATA exige sesión; `/api/aqi` no la aplica y el token de WAQI tiene fallback embebido. Revocar la credencial expuesta y moverla a env var |
| SEC-04 | Contraseña mínima inconsistente                      | `register.ts:17-19`, `reset-password.ts:27-32`                                                | Resuelto para nuevas contraseñas: mínimo 8 en ambos                                                                                                 |
| SEC-05 | Sin límite de tasa en registro/recuperación          | `middleware.ts:30-37`                                                                         | Resuelto como línea base: ventanas deslizantes por IP en memoria                                                                                    |
| SEC-06 | Comparación de roles `'admin'` vs `'Admin'`          | `authz.ts:3`, `auth.config.ts:16`                                                             | Resuelto: enum de cuatro valores exactos                                                                                                            |
| SEC-07 | Limitador en memoria no distribuido                  | `rateLimit.ts:1-3`, `9`                                                                       | Pendiente: migrar a Redis/Upstash; las instancias no comparten contador                                                                             |
| SEC-08 | Credenciales de BD rotadas tras exposición histórica | No verificable en código                                                                      | Pendiente: rotar `POSTGRES_PASSWORD`/`DATABASE_URL` y `AUTH_SECRET` en el despliegue; confirmar que `.env` no está versionado                       |
| SEC-09 | Enumeración de cuentas                               | `forgot-password.ts:66-74`, `check-availability.ts:25-41`                                     | Pendiente: unificar respuestas y limitar `check-availability`                                                                                       |
| SEC-10 | Códigos de recuperación predecibles y reutilizables  | `forgot-password.ts:79`, `87-94`, `reset-password.ts:34-68`                                   | Pendiente: `crypto.randomInt`, hash del token, intentos máximos, consumo atómico y limpieza de expirados                                            |
| SEC-11 | Aceptación de contraseñas en texto plano             | `auth.config.ts:117-143`                                                                      | Pendiente: forzar reset de las cuentas que aún no migraron (SQL en AUTH §8)                                                                         |
| SEC-12 | JWT sin revocación y backfill de `sessionStartedAt`  | `auth.config.ts:180-207`                                                                      | Pendiente: lista de revocación o `sessions` con estrategia database si se requiere cierre inmediato                                                 |
| SEC-13 | Credenciales embebidas en código                     | `aqi.ts:8-9`, `trips-diagnosis.ts:15-19`                                                      | Pendiente, prioridad alta: retirar los literales, rotar las credenciales y fallar si falta la env var                                               |
| SEC-14 | TLS a PostgreSQL sin validación de certificado       | `src/db/client.ts:22-25`, `36-39`                                                             | Pendiente: usar `rejectUnauthorized: true` con CA confiable cuando el proveedor lo permita                                                          |
| SEC-15 | CSP permisiva y cabeceras incompletas                | `middleware.ts:39-62`                                                                         | Pendiente: eliminar `unsafe-inline` mediante hashes/nonces; revisar la lista `camera=(self *)`; valorar HSTS `preload` y COEP                       |
| SEC-16 | IP del limitador tomada de cabeceras no validadas    | `rateLimit.ts:61-65`, `middleware.ts:77-84`                                                   | Pendiente: configurar `trustHost`/proxy para sobrescribir `x-forwarded-for` y usar la IP auténtica                                                  |
| SEC-17 | Prefijos de API sin frontera de segmento             | `middleware.ts:133-135`                                                                       | Pendiente: comparar con `pathname === p \|\| pathname.startsWith(p + "/")`                                                                          |
| SEC-18 | Avatar sin verificación real de MIME/tamaño          | `users/me.ts:11-12`, `22-29`                                                                  | Pendiente: validar bytes y dimensiones en servidor; la URL remota solo se restringe a `http(s)`                                                     |
| SEC-19 | Vinculación automática de cuentas Google             | `auth.config.ts:67`                                                                           | Pendiente: valorar `allowDangerousEmailAccountLinking: false` y vinculación explícita                                                               |
| SEC-20 | Hook de secretos basado solo en nombres de archivo   | `.husky/pre-commit:7-10`, `package.json:57-59`                                                | Pendiente: añadir escaneo de contenido (gitleaks/trufflehog) en CI                                                                                  |
| SEC-21 | PII y códigos en logs de servidor                    | `auth.config.ts:90-92`, `145-147`, `register.ts:144-146`, `notifications.ts:35-49`, `142-157` | Pendiente: redactar identificadores y nunca registrar códigos de recuperación                                                                       |

## 8. Procedimientos de verificación de seguridad

```bash
BASE=http://localhost:4321

# 1. Cabeceras en una respuesta pública. En HTTP plano HSTS debe estar ausente.
curl -sSI "$BASE/" | grep -iE '^(HTTP/|content-security-policy|x-frame-options|x-content-type-options|referrer-policy|permissions-policy|cross-origin-opener-policy|x-dns-prefetch-control|strict-transport-security):'

# 2. Las mismas cabeceras deben aparecer en 401 y 429
curl -sS -D - -o /dev/null "$BASE/api/admin/users" | grep -iE '^(HTTP/|content-security-policy|x-frame-options|retry-after):'
for i in $(seq 1 9); do
  curl -sS -o /dev/null -X POST "$BASE/api/auth/forgot-password" \
    -H 'Content-Type: application/json' -d '{"identifier":"nadie@example.com"}'
done
curl -sS -D - -o /dev/null -X POST "$BASE/api/auth/forgot-password" \
  -H 'Content-Type: application/json' -d '{"identifier":"nadie@example.com"}' \
  | grep -iE '^(HTTP/|retry-after|content-security-policy):'

# 3. Enumeración: compare respuestas de un email existente y otro inexistente
curl -sS -X POST "$BASE/api/auth/check-availability" \
  -H 'Content-Type: application/json' -d '{"email":"audit-2026@example.com"}'

# 4. Roles: anónimo y Admin deben recibir 401/403 en /api/admin/users
curl -sS -o /dev/null -w 'anónimo: %{http_code}\n' "$BASE/api/admin/users"
curl -sS -o /dev/null -w 'rol no staff: %{http_code}\n' "$BASE/api/admin/users" \
  -H 'Cookie: <cookie-de-sesion-authjs>'

# 5. Revisión de secretos versionados y del hook
git ls-files | grep -E '(^|/)(\.env$|credentials|secret)' || echo 'sin .env versionado'
git check-ignore -v .env || true
```

Verificaciones en base de datos:

```sql
-- Conjunto de roles permitidos
SELECT e.enumlabel FROM pg_enum e
JOIN pg_type t ON t.oid = e.enumtypid
WHERE t.typname = 'user_role_enum' ORDER BY e.enumsortorder;

-- Contraseñas pendientes de migrar a bcrypt (objetivo: 0 filas)
SELECT count(*) AS pendientes FROM users
WHERE password IS NOT NULL AND password !~ '^\$2[aby]\$';

-- Códigos de recuperación en texto plano y su antigüedad
SELECT identifier, expires, expires - NOW() AS restante
FROM verification_token ORDER BY expires DESC LIMIT 20;

-- Superadmins: nunca debe quedar menos de uno por operación desde /admin
SELECT id, email, role FROM users WHERE role = 'Superadmin';

-- Teléfonos duplicados: la unicidad solo se comprueba en la aplicación
SELECT phone, count(*) FROM users WHERE phone IS NOT NULL
GROUP BY 1 HAVING count(*) > 1;

-- Dueños con fincas asociadas: bloquean el DELETE desde el panel
SELECT dueno_id, count(*) AS fincas FROM fincas GROUP BY dueno_id ORDER BY 2 DESC;
```

Revisión de configuración del despliegue: confirmar en el panel de Vercel que `AUTH_SECRET`, `DATABASE_URL` y `SMTP_PASS` están definidos, que no aparecen literales de token en `src/pages/api/aqi.ts:9` ni en `src/pages/api/trips-diagnosis.ts:19`, y que `astro.config.mjs:13` mantiene `checkOrigin: true`.

## 9. Reporte de vulnerabilidades

Canal: issue privado al equipo de mantenimiento o correo del administrador del sistema; no abrir un issue público con detalles explotables. Incluir ruta y método, rol necesario, pasos de reproducción, impacto, evidencia (respuesta o log redactado) y una prueba de concepto mínima. Para incidencias críticas se mantiene como objetivo una corrección en 72 horas y su registro en CHANGELOG (Capítulo 39 · DOC-28). Antes de divulgar, verificar si el hallazgo corresponde a SEC-01…SEC-21 para no duplicar esfuerzos.

## Trazabilidad

| Tema                          | Archivo(s) de código                                                                              | Doc(s) relacionado(s)                        | Verificación sugerida                                                 |
| :---------------------------- | :------------------------------------------------------------------------------------------------ | :------------------------------------------- | :-------------------------------------------------------------------- |
| Secretos y hook               | `.env.example`, `.husky/pre-commit`, `package.json`, `src/db/client.ts`                           | `docs/DEPLOYMENT.md`, `docs/CONTRIBUTING.md` | `git ls-files` y `git check-ignore`; inspeccionar variables en Vercel |
| Cabeceras, CSP y HSTS         | `src/middleware.ts`                                                                               | `docs/AUTH.md`, `docs/ARCHITECTURE.md`       | `curl -I` sobre `/`, un `401` y un `429`                              |
| TLS y base de datos           | `src/db/client.ts`                                                                                | `docs/DATABASE.md`, `docs/DEPLOYMENT.md`     | Revisar `ssl.rejectUnauthorized` y certificado del proveedor          |
| Sesión y roles                | `auth.config.ts`, `src/backend/services/authz.ts`                                                 | `docs/AUTH.md`, `docs/UML.md`                | `GET /api/auth/session`; consulta de `pg_enum`                        |
| Limitación de tasa            | `src/middleware.ts`, `src/backend/services/rateLimit.ts`                                          | `docs/AUTH.md`, `docs/ENDPOINTS.md`          | Ráfaga de peticiones y comprobación de `Retry-After`                  |
| Recuperación y notificaciones | `src/pages/api/auth/{forgot-password,reset-password}.ts`, `src/backend/services/notifications.ts` | `docs/AUTH.md`, `docs/TROUBLESHOOTING.md`    | Simular sin SMTP y revisar `verification_token` en SQL                |
| Multi-tenant e invitaciones   | `src/backend/services/{authz,farms}.ts`, `src/db/migrations/001-roles-farms.sql`                  | `docs/AUTH.md`, `docs/DATABASE.md`           | Intentar acceso a otra finca; verificar `FOR UPDATE` y `usos_usados`  |
| Credenciales embebidas        | `src/pages/api/aqi.ts`, `src/pages/api/trips-diagnosis.ts`                                        | `docs/CAMERA-ML.md`, `docs/ENDPOINTS.md`     | Buscar literales `token=`/`X-API-Key` y rotar credenciales            |
| Perfil y entrada de datos     | `src/pages/api/users/me.ts`, `src/backend/services/profile.ts`                                    | `docs/AUTH.md`, `docs/ENDPOINTS.md`          | `PATCH` con imagen inválida y con `role` incluido                     |
| Backlog SEC-01…SEC-21         | Todo el código citado en las tablas anteriores                                                    | `docs/ROADMAP.md`, `docs/CHANGELOG.md`       | Revisión trimestral del estado de cada ID                             |

---

# Capítulo 22. Cámara y Machine Learning - Detección de Trips (BioCLIP 2.5) (DOC-26)

**Ruta fuente:** `docs/CAMERA-ML.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-26**.

## Alcance y estado de la documentación

Este documento describe **únicamente la integración implementada en este repositorio** entre Macollo (Astro SSR) y el servicio externo [`macollo-trips-api`](https://github.com/VoctorMCL/macollo-trips-api) (FastAPI + BioCLIP 2.5). El modelo, el entrenamiento, los esquemas de respuesta y el despliegue del servicio pertenecen al repositorio externo y no se reproducen aquí como verdad verificada.

**Corrección de deriva:** la versión anterior de este documento encabezaba la sección con «ADR-008». En ese momento no existía tal ADR: el directorio `docs/decisions/` contenía solo ADR-001…ADR-007. Actualmente ADR-008 existe, pero decide la **publicación de la landing en `/landing`** (ADR-008 (Apéndice A.8 · ADR-008)), no la integración ML. La integración de cámara/ML **no tiene ADR propio**; este documento es una guía de integración, no una decisión arquitectónica registrada.

## Contexto

El cultivo de gulupa (_Passiflora edulis_) en invernadero requiere monitoreo de trips (_Thysanoptera: Thripidae_), plaga asociada al cacarizado/roña de fruto y al rechazo para exportación. Macollo ofrece al operario un botón flotante de cámara que captura o selecciona una imagen, solicita una inferencia al servicio ML y muestra el diagnóstico (taxón, estadio, urgencia térmica y plan de manejo integrado) dentro del propio modal.

La separación de responsabilidades es efectiva en el código:

1. El modelo no se ejecuta en este repositorio: el proxy solo reenvía `multipart/form-data` a `${ML_API_URL}/api/predict` (`src/pages/api/trips-diagnosis.ts:110-159`).
2. La clave de la API ML se mantiene en el servidor: se envía como cabecera `X-API-Key` en `buildHeaders()` (`src/pages/api/trips-diagnosis.ts:79-88`); el navegador nunca la recibe.
3. El servicio puede estar en Google Cloud Run o en otra URL accesible; la URL se resuelve desde variables de entorno al cargar el módulo (`src/pages/api/trips-diagnosis.ts:10-13`).

## Arquitectura de la integración

```text
Navegador (modal .astro, sin isla React)
  │ POST /api/trips-diagnosis   multipart: file, temperature_c, crop, profile
  │ GET  /api/trips-diagnosis   health (al abrir el modal)
  │ POST /api/gallery/upload    copia de la foto (fire-and-forget)
  ▼
Astro SSR — src/pages/api/trips-diagnosis.ts  (prerender = false, maxDuration = 60)
  │ X-API-Key (+ Cookie macollo_session si hay sesión renovada)
  ├─ POST ${ML_API_URL}/api/predict
  ├─ GET  ${ML_API_URL}/api/health
  └─ POST ${ML_API_URL}/api/warmup  (best-effort si model_loaded === false)
  ▼
macollo-trips-api (FastAPI + BioCLIP 2.5)
```

Rutas implicadas y responsables:

| Etapa                                                    | Archivo                                              | Referencia           |
| :------------------------------------------------------- | :--------------------------------------------------- | :------------------- |
| Botón flotante, cámara, compresión, render de resultados | `src/frontend/components/TripsDiagnosticModal.astro` | líneas 7-18, 210-632 |
| Proxy SSR de inferencia y health                         | `src/pages/api/trips-diagnosis.ts`                   | líneas 3-7, 98-231   |
| Guardado de la captura en la galería                     | `src/pages/api/gallery/upload.ts`                    | líneas 12-100        |
| Entrega autenticada del archivo                          | `src/pages/api/gallery/[id]/file.ts`                 | líneas 9-74          |
| Montaje del modal solo en la portada autenticada         | `src/pages/index.astro`                              | líneas 29-43         |

## Configuración real de variables de entorno

`.env.example:30-32` declara las variables ML; las demás variables del entorno se enumeran para evitar confusiones con nombres usados en versiones anteriores de la documentación.

| Variable                                                                                     | Obligatoria                     | Origen / default efectivo                                                                                                                                                | Uso verificado                                                                       |
| :------------------------------------------------------------------------------------------- | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `ML_API_URL`                                                                                 | No                              | `process.env.ML_API_URL` → `PUBLIC_API_URL` → `https://macollo-trips-api-961314735418.us-central1.run.app` (`src/pages/api/trips-diagnosis.ts:10-13`; `.env.example:31`) | Base para `/api/predict`, `/api/health`, `/api/warmup` y `/api/auth/login`           |
| `ML_API_KEY`                                                                                 | Recomendada en producción       | `ML_API_KEY` → `API_KEY` → `ML_X_API_KEY` → valor literal de respaldo en `src/pages/api/trips-diagnosis.ts:15-19`                                                        | Cabecera `X-API-Key` del proxy (`trips-diagnosis.ts:79-88`)                          |
| `ML_ADMIN_USER`                                                                              | No                              | Default `admin` (`trips-diagnosis.ts:54`)                                                                                                                                | Usuario para renovar la cookie del panel ML                                          |
| `ML_ADMIN_PASSWORD`                                                                          | No                              | Default `macollo2026` (`trips-diagnosis.ts:55`)                                                                                                                          | Contraseña para `POST ${ML_API_URL}/api/auth/login` (`trips-diagnosis.ts:57-62`)     |
| `PORT`                                                                                       | No                              | `4321` en `scripts/run-lan.sh:11`                                                                                                                                        | Puerto del servidor de desarrollo en LAN                                             |
| `AUTH_TRUST_HOST`                                                                            | No en local; sí detrás de proxy | Exportado como `true` por `scripts/run-lan.sh:35`; `.env.example:16`                                                                                                     | Auth.js detrás de IP/HTTPS proxy                                                     |
| `DATABASE_URL`                                                                               | Sí en producción                | `.env.example:2`                                                                                                                                                         | Cadena de conexión usada por la aplicación y por los seeders (ver `docs/SCRIPTS.md`) |
| `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DATABASE`  | Sí si no hay `DATABASE_URL`     | `.env.example:3-7`; `POSTGRES_DATABASE=invernadero`                                                                                                                      | Conexión local alternativa                                                           |
| `AUTH_SECRET`, `SESSION_MAX_AGE_HOURS`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `SMTP_*` | Según despliegue                | `.env.example:9-28`                                                                                                                                                      | Autenticación y correo; ajenas al proxy ML                                           |
| `SITE`                                                                                       | No                              | `astro.config.mjs:12`, default `https://macollo.tech`                                                                                                                    | URL canónica de Astro; no aparece en `.env.example`                                  |

> Los alias `PUBLIC_API_URL`, `API_KEY` y `ML_X_API_KEY` siguen siendo aceptados por el código (`src/pages/api/trips-diagnosis.ts:11-18`), pero la configuración recomendada y la declarada en `.env.example` son `ML_API_URL` y `ML_API_KEY`. El valor de respaldo de la clave está codificado en el propio archivo: en producción debe definirse explícitamente.

## Comportamiento real del proxy

### `POST /api/trips-diagnosis`

`prerender = false` y `maxDuration = 60` (`src/pages/api/trips-diagnosis.ts:3-7`); el adaptador de Vercel también fija 60 s (`astro.config.mjs:19`). La petición entrante se convierte en `FormData` y se valida `file` como `Blob` no vacío (`trips-diagnosis.ts:100-108`).

| Campo           | Tipo            | Obligatorio | Valor por defecto | Observación                                                                         |
| :-------------- | :-------------- | :---------- | :---------------- | :---------------------------------------------------------------------------------- |
| `file`          | `Blob`/`File`   | Sí          | —                 | Nombre reenviado: `file.name` o `muestra_gulupa.jpg` (`trips-diagnosis.ts:111-116`) |
| `temperature_c` | cadena numérica | No          | no se envía       | El modal siempre lo calcula en °C (`TripsDiagnosticModal.astro:515-529`)            |
| `crop`          | cadena          | No          | `gulupa`          | `trips-diagnosis.ts:123-124`                                                        |
| `profile`       | cadena          | No          | `auto`            | `trips-diagnosis.ts:126-127`; el modal envía `auto`                                 |

Flujo de reenvío y errores (`src/pages/api/trips-diagnosis.ts:129-173`):

| Situación                                              | Comportamiento                                                                                                                       | Código devuelto al navegador         |
| :----------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| Archivo ausente, no `Blob` o de tamaño 0               | `{ error: "No se proporcionó ningún archivo de imagen válido." }`                                                                    | `400`                                |
| El ML responde correctamente                           | JSON del servicio ML, sin transformación                                                                                             | `200`                                |
| El ML responde `401`                                   | Se obtiene/renueva la cookie `macollo_session` y se reintenta **una sola vez** (`trips-diagnosis.ts:136-146`)                        | `200` o el error del segundo intento |
| El ML responde `503` (incluido «warming») u otro error | Se reenvía el texto de error con el **mismo código**; no hay espera ni reintento por temperatura/frío (`trips-diagnosis.ts:148-156`) | Código del ML                        |
| `fetch` falla con `ECONNREFUSED` o «fetch failed»      | Mensaje de conexión con `ML_API_URL`                                                                                                 | `502`                                |
| Cualquier otra excepción                               | `{ error: "Error interno al procesar diagnóstico: …" }`                                                                              | `502`                                |

**Deriva corregida (commit `4e977f5`, 2026-11-11, `fix(trips): direct fast inference without artificial 503 retry delays`):** el proxy **ya no** genera respuestas propias `503` con `Retry-After`, **ya no** duerme entre intentos ni aplica un presupuesto de 50 s con reintentos por cold start. La inferencia es directa: una llamada a `/api/predict` y, como único reintento posible, la renovación de sesión tras un `401`. En el archivo permanecen declaradas, sin uso, las constantes `TOTAL_BUDGET_MS = 50_000` y `ATTEMPT_TIMEOUT_MS = 45_000` y las funciones `sleep()` y `safeJson()` (`trips-diagnosis.ts:21-31, 90-96`): **no deben interpretarse como timeouts activos**. Tampoco hay `AbortSignal.timeout` en la llamada de inferencia de `POST`; el límite superior es el `maxDuration = 60` de la plataforma.

Si el modelo está cargando, sintomático es que el ML devuelva `503`; ese código llega al modal y se muestra mediante `alert("❌ " + err.message)` (`TripsDiagnosticModal.astro:545-552`). La estrategia de calentamiento se trasladó al health check (`GET`) y al sondeo del modal, no al `POST`.

### `GET /api/trips-diagnosis` (health y calentamiento)

| Paso                                                                                                                                                     | Implementación                                                                                                             |
| :------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| Consulta `GET ${ML_API_URL}/api/health` con timeout de `AbortSignal.timeout(25000)`                                                                      | `trips-diagnosis.ts:175-184`                                                                                               |
| Si `model_loaded === false`, llama `POST ${ML_API_URL}/api/warmup` (timeout 10 s) con la cookie cacheada; ante `401`, renueva sesión y reintenta una vez | `trips-diagnosis.ts:187-210`; el fallo del warm-up se ignora (`best-effort`)                                               |
| Respuesta correcta                                                                                                                                       | `200` con `{ status: "online", ml_service: <JSON del ML>, warming_triggered: boolean }` (`trips-diagnosis.ts:212-219`)     |
| Cualquier error de red/HTTP del health                                                                                                                   | `503` con `{ status: "offline", message: "…no está activo o no responde en <ML_API_URL>" }` (`trips-diagnosis.ts:220-230`) |

La cookie se guarda en memoria del proceso (`cachedSessionCookie`, validez de 6 días; `trips-diagnosis.ts:28-29, 64-70`). En serverless, cada instancia puede tener su propia caché: la renovación ante `401` cubre reinicios del contenedor ML, no garantiza una sesión compartida entre instancias de Vercel.

### Estados que muestra el modal

`checkMlHealth()` (`TripsDiagnosticModal.astro:403-430`) interpreta la respuesta del `GET`:

| Respuesta                                                  | Indicador            | Texto                                                   |
| :--------------------------------------------------------- | :------------------- | :------------------------------------------------------ |
| `status === "online"` y `ml_service.model_loaded === true` | punto verde          | «IA BioCLIP 2.5 Conectada (Google Cloud)» + dispositivo |
| `status === "online"` y modelo cargando                    | punto ámbar pulsante | «Calentando IA BioCLIP 2.5 (Cloud Run)...»              |
| `status === "offline"` o error de red                      | punto rojo           | «Servidor IA offline (Google Cloud Run)»                |

Mientras el modelo carga, el modal reprograma la comprobación cada 12 s hasta un máximo de 12 sondeos (`TripsDiagnosticModal.astro:432-445`); al volver a abrir el modal se reinicia el contador y se ejecuta un health check inmediato (`TripsDiagnosticModal.astro:248-261`). Este sondeo es propio del cliente: no existe un bucle de reintentos en `POST`.

## Flujo en el navegador

`TripsDiagnosticModal.astro` es un componente **Astro** (no `.tsx`, no isla React): todo su comportamiento está en el `<script>` de la sección 210-632 del propio archivo. No recibe props.

1. **Apertura:** botón flotante `📸` con `id="open-trips-scanner-btn"` (`TripsDiagnosticModal.astro:7-18`); cierre por botón o backdrop (`:263-275`).
2. **Cámara:** si `window.isSecureContext` es falso (HTTP por IP), se muestra una alerta y se dispara el `<input type="file" accept="image/*" capture="environment">` para abrir la cámara nativa (`:280-292, 137-143`). En contexto seguro se intenta `getUserMedia` con `facingMode: { exact: "environment" }` y se hace fallback a `ideal` (`:300-313`). Cualquier error vuelve al input de archivo (`:326-329`).
3. **Captura:** se dibuja el frame del `<video>` en un `<canvas>` y se exporta a JPEG con calidad `0.92` (`:364-385`).
4. **Compresión previa a inferencia:** `compressImageClient()` limita la dimensión mayor a 1024 px y re codifica a JPEG `0.82`; si la imagen ya es pequeña o falla la decodificación, envía el blob original (`:447-484`).
5. **Temperatura:** el campo es de solo lectura; se toma de `window.__MACOLLO_WEATHER__.temperatureC`, publicado por `Dashboard.astro:625-638`, y se convierte a °F solo para mostrarlo. Antes de enviar, se reconvierte F→C; si no hay valor válido se usa `22.0` (`TripsDiagnosticModal.astro:234-245, 515-521`).
6. **Inferencia:** `FormData` con `file=muestra.jpg`, `temperature_c`, `crop=gulupa`, `profile=auto`, enviado a `POST /api/trips-diagnosis` (`:526-541`). Durante la espera se muestra un overlay con cronómetro (`:486-511`).
7. **Resultado:** `renderResultados()` admite tanto el formato `detection.*` (nuevo) como `is_thrips`/`thrips_confidence` (heredado); pinta confianza, estadio, ciclo térmico, urgencia y recomendaciones MIP (`TripsDiagnosticModal.astro:558-631`).
8. **Galería:** la misma imagen se envía a `POST /api/gallery/upload` con nombre `trips-diagnostico.jpg` y caption `Diagnóstico de trips - Escáner BioCLIP 2.5` (`:351-362`). Es una petición _fire-and-forget_: no se comprueba `res.ok` y los errores se silencian; un fallo de guardado **no impide** la inferencia (`:382, 398-399`).

## Guardado en galería por finca

La atribución a la finca no la decide el modal: la resuelve el endpoint a partir de la cookie `finca_activa` (`HttpOnly`, `SameSite=Lax`, definida en `src/backend/services/authz.ts:137-155`).

| Paso                        | Implementación                                                                                                                                                                                                                      |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisito de sesión Auth.js | `getSession(request)` y `getAuthUser(request)`; sin sesión, `401` (`src/pages/api/gallery/upload.ts:14-28`)                                                                                                                         |
| Finca activa                | `Number(getFincaCookie(request))`, válida solo si es entero > 0; si no hay cookie, `finca_id = null` (`upload.ts:46-50`)                                                                                                            |
| Archivo                     | `public/uploads/gallery/<UUID>.<ext>`, con extensión derivada del MIME (`png`/`webp`/`gif`/`avif`/`jpg`) (`upload.ts:52-68`)                                                                                                        |
| Registro                    | `INSERT INTO photos (filename, url, mime_type, size_bytes, caption, finca_id, user_id, taken_at …)`; `taken_at` usa `COALESCE($8::timestamptz, NOW())` (`upload.ts:72-86`)                                                          |
| Respuesta                   | `{ ok: true, photo: { id, url, filename } }` (`upload.ts:88-91`)                                                                                                                                                                    |
| Servicio de archivo         | `GET /api/gallery/:id/file` exige sesión, busca rutas alternativas bajo `public/`, fija `Cache-Control: public, max-age=31536000, immutable` y redirige a una URL externa si la hubiera (`src/pages/api/gallery/[id]/file.ts:9-71`) |
| Listado/detalle             | `Gallery.astro` filtra `WHERE p.finca_id = $1` (`src/frontend/components/Gallery.astro:27-42`); `GalleryDetail.astro` exige `p.id = $1 AND p.finca_id = $2` (`src/frontend/components/GalleryDetail.astro:31-53`)                   |

En consecuencia, la galería es **compartida por finca** entre sus miembros: al cambiar de finca desde la navbar se cambia el valor de la cookie y, tras recargar, cambia el listado (`src/frontend/components/Navbar.astro:300-326`). El diagnóstico en sí no exige sesión en el proxy (`src/pages/api/trips-diagnosis.ts` no invoca `getSession`), pero el guardado en galería sí: sin sesión la foto no se conserva aunque el diagnóstico se muestre.

## Desarrollo local y acceso desde el celular

| Servicio            | Forma de arranque en este repositorio                              | Dirección                                  |
| :------------------ | :----------------------------------------------------------------- | :----------------------------------------- |
| Macollo (Astro SSR) | `pnpm dev` (`package.json:9`)                                      | `http://localhost:4321`                    |
| Macollo en LAN      | `pnpm run dev:lan` → `bash scripts/run-lan.sh` (`package.json:10`) | `http://<IP_LOCAL>:4321`                   |
| API ML              | No hay script en este repositorio; véase el README externo         | `ML_API_URL` (por defecto Cloud Run HTTPS) |

`scripts/run-lan.sh` **ya no apunta al puerto 8000 local**: exporta `ML_API_URL` con el valor de Cloud Run si no está definida (`scripts/run-lan.sh:37-38`), rechaza explícitamente `PORT=8000` (`:13-17`) y solo comprueba el health de ML con `curl --max-time 6` a modo de aviso no bloqueante (`:49-56`). Para probar contra una API ML local, hay que exportar `ML_API_URL=http://<IP>:8000` antes de arrancar.

### Limitación de cámara en HTTP

Los navegadores restringen `getUserMedia` a contextos seguros. El modal comprueba `window.isSecureContext`, protocolo y host (`localhost`, `127.0.0.1`, `[::1]`): si entró por `http://IP`, abre la cámara nativa con `capture="environment"` (`TripsDiagnosticModal.astro:280-292, 137-143`). El botón «Subir Foto» ofrece el mismo mecanismo. Para `getUserMedia` real desde el celular se necesita HTTPS (túnel o certificado local); mixed content también obliga a que el servicio ML sea HTTPS cuando la web lo es.

### Comprobaciones rápidas

```bash
# 1. Health del proxy (debe devolver online/offline y warming_triggered)
curl -sS http://localhost:4321/api/trips-diagnosis | jq .

# 2. Inferencia directa: no hay cerrar sesión ni reintentos artificiales 503
curl -sS -F 'file=@muestra.jpg' \
  -F 'temperature_c=24.5' -F 'crop=gulupa' -F 'profile=auto' \
  http://localhost:4321/api/trips-diagnosis | jq .

# 3. Galería: requiere cookie de sesión Auth.js y cookie finca_activa
curl -sS -b 'finca_activa=1; <cookie-de-sesion-authjs>' \
  -F 'file=@muestra.jpg' -F 'caption=Prueba de cámara' \
  http://localhost:4321/api/gallery/upload | jq .
```

## Requisitos de infraestructura del servicio ML

El repositorio no contiene el despliegue del modelo, por lo que los requisitos de RAM/versión de Python deben tomarse del README de `macollo-trips-api`; la documentación anterior citaba ~4 GB por worker de uvicorn y un único worker, y un servidor con ≥8 GB RAM. Esa información **no es verificable desde este repositorio** y se conserva solo como referencia histórica. Lo que sí se verifica aquí es el límite de 60 s de la función serverless (`src/pages/api/trips-diagnosis.ts:7`, `astro.config.mjs:19`), el timeout de 25 s del health (`trips-diagnosis.ts:182`) y el calentamiento best-effort del modelo (`trips-diagnosis.ts:187-210`).

## Estado de la integración

- ✅ Modal Astro con cámara nativa en HTTP por IP y `getUserMedia` en contexto seguro.
- ✅ Proxy SSR con `X-API-Key`, renovación de sesión ante `401` y health con warm-up.
- ✅ Inferencia directa sin reintentos artificiales ni `Retry-After` propios (commit `4e977f5`).
- ✅ Guardado de la imagen en `photos` con `finca_id` de la finca activa y `user_id` de la sesión.
- ✅ Listado y detalle de galería restringidos a la finca activa.
- ⚠️ `ML_ADMIN_USER`/`ML_ADMIN_PASSWORD` tienen valores por defecto inseguros en el código; describirlos explícitamente en despliegues reales.
- ⚠️ El despliegue del servicio ML, su HTTPS y su CORS se gestionan fuera de este repositorio; no se puede afirmar su estado desde aquí.

## Trazabilidad

| Tema                                                        | Archivo de código                                                                   | Doc relacionada                                    | Verificación                                      |
| :---------------------------------------------------------- | :---------------------------------------------------------------------------------- | :------------------------------------------------- | :------------------------------------------------ |
| Reenvío de inferencia, errores y ausencia de reintentos 503 | `src/pages/api/trips-diagnosis.ts:98-173`                                           | `docs/ENDPOINTS.md:193-200`                        | Lectura directa + `git show 4e977f5` (2026-11-23) |
| Health, warm-up y timeouts                                  | `src/pages/api/trips-diagnosis.ts:175-231`                                          | `docs/ENDPOINTS.md:199`                            | Lectura directa (2026-11-23)                      |
| Variables ML y alias                                        | `src/pages/api/trips-diagnosis.ts:10-19`; `.env.example:30-32`                      | `docs/DEPLOYMENT.md:25`                            | Comparación con `.env.example` (2026-11-23)       |
| Modal (cámara, compresión, temperatura, resultados)         | `src/frontend/components/TripsDiagnosticModal.astro:210-632`                        | `docs/COMPONENTS.md`                               | Lectura directa del `.astro` (2026-11-23)         |
| Galería por finca                                           | `src/pages/api/gallery/upload.ts:12-100`; `src/pages/api/gallery/[id]/file.ts:9-74` | `docs/ENDPOINTS.md`, `docs/DATABASE.md`            | Lectura directa (2026-11-23)                      |
| Arranque LAN y puerto 8000                                  | `scripts/run-lan.sh:11-61`                                                          | `docs/SCRIPTS.md`                                  | Lectura directa (2026-11-23)                      |
| Límite de ejecución serverless                              | `src/pages/api/trips-diagnosis.ts:3-7`; `astro.config.mjs:19`                       | `docs/ARCHITECTURE.md`                             | Lectura directa (2026-11-23)                      |
| ADR de ML inexistente                                       | `docs/decisions/` (ADR-001…ADR-008; el 008 es de la landing)                        | ADR-008 (Apéndice A.8 · ADR-008), `docs/README.md` | Listado de directorio (2026-11-23)                |

---

# Capítulo 23. Componentes de frontend (DOC-27)

**Ruta fuente:** `docs/COMPONENTS.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-27**.

## Convenciones y corrección de deriva

Ubicación: `src/frontend/components/`. Doce componentes reales (10 `.astro` y 2 `.tsx`), más el layout `src/frontend/layouts/Layout.astro` y la hoja `src/frontend/styles/global.css`, descritos al final.

**Corrección de deriva:** la versión anterior documentaba `TripsDiagnosticModal.tsx`. El archivo real es **`src/frontend/components/TripsDiagnosticModal.astro`** (`src/pages/index.astro:8`); no es una isla React y no acepta props. La tabla de «otros componentes» de esa versión omitía los contratos de props, estado, eventos y rutas: se sustituye íntegramente por las tablas y fichas siguientes.

Todos los componentes se renderizan en servidor en una ruta Astro SSR (`astro.config.mjs:14-20`, adaptador Vercel). Solo `BlobatarAvatar.tsx` y `SileoProvider.tsx` se hidratan explícitamente con `client:load`; el resto de la interactividad es JavaScript vanilla incluido en `<script>` de cada `.astro` (Astro lo empaqueta y ejecuta en el navegador). Donde se indica «estado cliente», se trata de variables del script o de `localStorage`, no de estado React.

## Inventario: props, estado cliente, eventos y rutas

| Componente                   | Tipo                  | Props / entrada                                                                                                | Estado cliente principal                                                                                                                                            | Eventos que publica                                                                                | Rutas que lo montan                                                                                      |
| :--------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `BlobatarAvatar.tsx`         | React (`client:load`) | `name: string` (obligatoria), `size?: number` = `40` (`BlobatarAvatar.tsx:7-15`)                               | `canHover`, `error` (`:16-17`); mirada con `useGaze` (`:18-31`)                                                                                                     | Ninguno                                                                                            | Isla dentro de `Navbar.astro:145,236` y `Settings.astro:94`                                              |
| `SileoProvider.tsx`          | React (`client:load`) | Ninguna                                                                                                        | Expone `window.sileo` en `useEffect` (`SileoProvider.tsx:5-12`)                                                                                                     | Ninguno                                                                                            | `Layout.astro:3,65` → todas las páginas con Layout                                                       |
| `TripsDiagnosticModal.astro` | Astro + `<script>`    | Ninguna                                                                                                        | `videoStream`, `activeImageBlob`, `warmupPolls`, `warmupPollTimer` (`TripsDiagnosticModal.astro:213-214, 435-436`)                                                  | Ninguno; escucha `macollo:weather-updated` y `macollo:preferences-changed` (`:243-245`)            | `/` autenticado (`src/pages/index.astro:37`)                                                             |
| `Dashboard.astro`            | Astro + `<script>`    | Ninguna; resuelve finca con `resolveActiveFinca(Astro.request)` (`Dashboard.astro:11-18`)                      | `weatherLocation`, `weatherTimer`, `weatherTimer` de GPS en `localStorage`, `serverRecords`, `lecturasTimer`, escena Three.js (`Dashboard.astro:418-596, 909-1056`) | `macollo:weather-updated` (`:634-638`), `aquasens:data-synced` (`:1119-1123`), `storage` (`:1124`) | `/` con finca activa (`src/pages/index.astro:35`)                                                        |
| `Gallery.astro`              | Astro, solo servidor  | Ninguna; usa cookie `finca_activa` (`Gallery.astro:7-25`)                                                      | Ninguno                                                                                                                                                             | Ninguno                                                                                            | `/gallery` (`src/pages/gallery/index.astro:3-9`)                                                         |
| `GalleryDetail.astro`        | Astro + `<script>`    | `Astro.params.id`; redirige a `/gallery` si falta id o foto (`GalleryDetail.astro:7-13, 51-53`)                | Estado de zoom solo con clases CSS (`GalleryDetail.astro:268-285`)                                                                                                  | Ninguno                                                                                            | `/gallery/[id]` (`src/pages/gallery/[id].astro:3-9`)                                                     |
| `History.astro`              | Astro + `<script>`    | `currentUserName?`, `currentUserRole?`, defaults «Administrador» / «Líder de Cultivo» (`History.astro:16-24`)  | `state` (fecha, filtros, gráfico activo, filas pendientes), `baseRecords`, `FINCA_SCOPE`, `historySyncTimer` (`History.astro:1252-1300, 2783-2817`)                 | `aquasens:data-synced` (`:2595-2599, 2701-2705`), `storage` (`:2600, 2706`)                        | `/history` (`src/pages/history.astro:34`)                                                                |
| `Metrics.astro`              | Astro + `<script>`    | `currentUserName?`, `currentUserRole?`, mismos defaults (`Metrics.astro:21-26`)                                | `plantsState`, `serverRecords`, `currentOpenPlant`, `metricsSyncTimer`, modales y filtros (`Metrics.astro:1631-1676, 2191-2340, 3013-3035`)                         | `aquasens:data-synced` (`:3097-3101`), `storage` (`:3102`)                                         | `/metrics` (`src/pages/metrics.astro:34`)                                                                |
| `Navbar.astro`               | Astro + `<script>`    | Ninguna; sesión, rol y fincas desde servidor (`Navbar.astro:8-30`)                                             | Importación dinámica de `signOut`; menú móvil por clases; selector de finca (`Navbar.astro:256-343`)                                                                | Ninguno (recarga con `location.reload()` tras cambiar de finca)                                    | `/`, `/metrics`, `/history`, `/settings`, `/farms`, `/farms/[id]`, `/admin`                              |
| `NoFarm.astro`               | Astro, solo servidor  | `tieneFincas?: boolean` = `false` (`NoFarm.astro:2-6`)                                                         | Ninguno                                                                                                                                                             | Ninguno                                                                                            | `/` sin finca activa (`src/pages/index.astro:35`)                                                        |
| `Settings.astro`             | Astro + `<script>`    | Ninguna; datos de sesión, fincas y permisos desde servidor (`Settings.astro:15-37`)                            | Pestañas activas, preferencias en `localStorage`, `fincaScope`, imagen redimensionada (`Settings.astro:356-440, 447-481`)                                           | Ninguno; usa `window.sileo` para toasts (`:392` en adelante)                                       | `/settings` autenticado (`src/pages/settings.astro:17`)                                                  |
| `Welcome.astro`              | Astro + `<script>`    | Ninguna; `today` calculado en servidor (`Welcome.astro:1-3`); lee `?desde=` y `?code=` en cliente (`:833-838`) | `currentRegStep`, modo de autenticación, video/audio, validación de campos (`Welcome.astro:624-930`)                                                                | Ninguno; redirige con `window.location.href` (`:1014, 1175`)                                       | `/` anónimo, `/settings` anónimo, `/metrics` anónimo, `/history` anónimo; alias `/signin` redirige a `/` |

### Dependencias y modo de ejecución

| Componente                   | Dependencias verificables                                                                                                                                                                                                                                     | Servidor                                                                                                                 | Cliente                                                                                          |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `BlobatarAvatar.tsx`         | `@blobatar/react`, `useGaze`, `blobatar/*.css` (`BlobatarAvatar.tsx:1-5`)                                                                                                                                                                                     | Render inicial del fallback/avatar                                                                                       | `matchMedia('(hover: hover) and (pointer: fine)')`, seguimiento de puntero, fallback con inicial |
| `SileoProvider.tsx`          | `sileo`, `sileo/styles.css` (`SileoProvider.tsx:2-3`)                                                                                                                                                                                                         | Render de `<Toaster />`                                                                                                  | Asigna la instancia a `window.sileo` para scripts Astro                                          |
| `TripsDiagnosticModal.astro` | `../../shared/preferences` (`TripsDiagnosticModal.astro:211`); APIs `/api/trips-diagnosis`, `/api/gallery/upload`                                                                                                                                             | Solo markup del modal                                                                                                    | Cámara, canvas, compresión, health, inferencia y render de resultados                            |
| `Dashboard.astro`            | `three`, `../../backend/services/weather`, `../../shared/plantMatrix`, `../../shared/serialize`, `../../shared/clientStorage`, `../../shared/preferences`, `../../shared/alerts` (`Dashboard.astro:399-416`); backend `farms`/`readings` en servidor (`:8-9`) | Consulta finca + lecturas; serializa registros en `#dashboard-initial-records` (`:391-396`)                              | Escena 3D, clima/AQI, GPS, matriz reactiva, sincronización Sheets                                |
| `Gallery.astro`              | `pg` pool, `authz`, `farms` (`Gallery.astro:2-5`)                                                                                                                                                                                                             | Consulta `photos` + `users` filtrada por finca (`:29-42`)                                                                | Ninguno                                                                                          |
| `GalleryDetail.astro`        | `pg` pool, `authz`, `farms` (`GalleryDetail.astro:2-5`)                                                                                                                                                                                                       | Consulta foto por `id` **y** `finca_id`; calcula `isOwner` (`:31-72`)                                                    | Zoom, `navigator.share`, copiar URL                                                              |
| `History.astro`              | `plantMatrix`, `serialize`, `farms`, `readings` + en cliente `csv`, `recordsParser`, `clientStorage`, `preferences`, `alerts` (`History.astro:6-14, 1217-1247`)                                                                                               | Serializa `allRecords`, expone `fincaId`/`isOwner` (`:47-54`)                                                            | Filtros, gráficos SVG, importación CSV, Sheets, exportación                                      |
| `Metrics.astro`              | `plantMatrix`, `badges`, `serialize`, `farms`, `readings` + en cliente `badges`, `clientStorage`, `preferences`, `alerts` (`Metrics.astro:7-19, 1607-1629`)                                                                                                   | Calcula promedios globales y por fila; serializa `#plants-data-source` (`:28-135`)                                       | Gráficos SVG, modales, filtros, alta de lectura, Sheets                                          |
| `Navbar.astro`               | `auth-astro/server`, `authz`, `farms`, `BlobatarAvatar` (`Navbar.astro:2-6`); `auth-astro/client` en cliente (`:261`)                                                                                                                                         | Sesión, lista de fincas, cookie validada, rol y enlaces (`:8-67`)                                                        | Logout con CSRF, cambio de finca, menú móvil                                                     |
| `NoFarm.astro`               | Ninguna                                                                                                                                                                                                                                                       | Mensaje y enlace a `/farms` (`:9-29`)                                                                                    | Ninguno                                                                                          |
| `Settings.astro`             | `auth-astro/server`, `authz`, `farms`, `BlobatarAvatar` + en cliente `preferences`, `clientStorage` (`Settings.astro:2-13, 338-354`)                                                                                                                          | Sesión, permisos `puedeExportar`/`puedeRestablecer` (`:23-29`), atributos `data-finca-id`/`data-finca-nombre` (`:40-42`) | Pestañas (`:362-390`), perfil/avatar, preferencias, invitaciones, zonas de peligro               |
| `Welcome.astro`              | `auth-astro/client` dinámico (`Welcome.astro:626-632`)                                                                                                                                                                                                        | Calcula `today` y renderiza video + formularios (`:1-623`)                                                               | Login/registro/recuperación, video, validaciones                                                 |

El helper `src/backend/services/serverFetch.ts` envuelve `undici.fetch` con un `Agent` (`autoSelectFamilyAttemptTimeout: 2500`, líneas 1-14); `src/backend/services/server-fetch.ts` es solo un re-export. **No es dependencia directa de ningún componente**: lo consumen `src/pages/api/weather.ts:5,23,44` y `src/pages/api/aqi.ts:4,25`, que son los endpoints invocados por `Dashboard.astro:621,693`.

## Publicación y suscripción de eventos

| Evento                                   | Publicado por                                                                                        | Suscriptores                                                                                                                                                 | Detalle / efecto                                                   |
| :--------------------------------------- | :--------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `macollo:weather-updated`                | `Dashboard.astro:634-638`                                                                            | `TripsDiagnosticModal.astro:243`                                                                                                                             | `detail.temperatureC`; actualiza el campo de temperatura del modal |
| `macollo:preferences-changed`            | `src/shared/preferences.ts:110-116` (lo emiten los setters de tema/unidad/frecuencia/notificaciones) | `TripsDiagnosticModal.astro:244`, `Layout.astro:81` vía `onPreferencesChanged`, `Dashboard.astro:1146`, `Metrics.astro:3125-3128`, `History.astro:2814-2817` | Reaplica unidad de temperatura y reprograma la sincronización      |
| `aquasens:data-synced` (nombre heredado) | `Dashboard.astro:1119-1123`, `Metrics.astro:3097-3101`, `History.astro:2595-2599, 2701-2705`         | `Dashboard.astro:1148`, `Metrics.astro:3130`                                                                                                                 | Recarga registros en memoria tras Sheets o importación             |
| `storage` (nativo)                       | `Dashboard.astro:1124`, `Metrics.astro:3102`, `History.astro:2600, 2706`                             | `Dashboard.astro:1147`, `Metrics.astro:3129`, `Layout.astro:52-54` (tema)                                                                                    | Sincroniza pestañas y preferencias                                 |
| `keydown` (Escape)                       | —                                                                                                    | `GalleryDetail.astro:283-285`                                                                                                                                | Cierra el zoom                                                     |

Estado global compartido, distinto de los eventos: `window.__MACOLLO_WEATHER__` lo escribe `Dashboard.astro:625-633` y lo lee `TripsDiagnosticModal.astro:235`; `window.__MACOLLO_FINCA_ID__` lo definen `Dashboard.astro:386-390`, `Metrics.astro:135`, `History.astro:54`; `window.__MACOLLO_IS_OWNER__` lo define `History.astro:54`; `window.sileo` lo define `SileoProvider.tsx:9`.

## Fichas por componente

### `Layout.astro` (layout)

Importa `global.css` y `SileoProvider`, fija `lang="es-co"`, icono `/gulupa.png`, `<title>Macollo</title>` y un script inline que aplica tema antes del pintado (`Layout.astro:1-58, 59-65`). El `<body>` contiene `<slot />`, el proveedor de toasts y un script que aplica tema y unidad de temperatura al documento (`:63-82`). **No declara `interface Props` y el título está fijo en la línea 61**: aunque `src/pages/gallery/index.astro:8` y otras páginas pasan `title="…"`, el atributo no se consume (deriva documentada, no funcionalidad implementada).

### `global.css`

Tailwind 4 (`@import "tailwindcss"`, línea 1) y la variante `@custom-variant dark` que respeta `.dark`, `.light` y `prefers-color-scheme` (líneas 3-19). Es la base de las clases `dark:` usadas por todos los componentes.

### `Dashboard.astro`

En servidor resuelve la finca activa, construye la matriz 4×5 desde `getLecturasByFinca()` y calcula `tieneRegistros`/`ultimaFecha` para el indicador de sincronización (`Dashboard.astro:11-25, 46-66`). Cada tarjeta lleva los datos en `data-*` (`:131-154`) para que el modal de planta los lea sin peticiones (`:868-906`).

En cliente tiene tres subsistemas:

1. **Three.js:** cámara perspectiva 72°, renderer WebGL con antialias/alpha, suelo, invernadero translúcido, sol/luna y luz direccional; `updateSun()` calcula la órbita según la hora local y `animate()` usa `requestAnimationFrame` (`:420-584`). Si WebGL falla, registra `console.warn` y deja el contenedor vacío (`:582-584`). El resize usa `window` y `ResizeObserver` (`:441-453`).
2. **Clima y geolocalización:** `initWeather()` usa cache GPS de `localStorage` (`macollo_gps_coords`, <24 h), si no ubicación de la finca y, como último recurso, Medellín (6.2442, -75.5812) (`:792-827`). En segundo plano pide `getCurrentPosition` con timeout 4 s (8 s si se fuerza) y `maximumAge` de 5 min (`:758-790`). `fetchWeather()` consulta `/api/weather?lat&lon&fallback&name`, publica `window.__MACOLLO_WEATHER__` y el evento `macollo:weather-updated`, y aplica la unidad de temperatura elegida (`:598-689`). `fetchAQI()` consulta `/api/aqi?lat&lon` y clasifica 0-50 / 51-100 / 101-150 / >150 (`:691-726`). El periodo de refresco es `getSyncIntervalMs()` (`:735-738`). El icono de ubicación fuerza GPS de alta precisión (`:829-834`).
3. **Datos y sincronización:** combina registros del servidor con `localStorage` por finca (`mergeRecords`, `purgeMockStorage`), actualiza tarjetas y lanza alertas agronómicas (`:909-1026`). Consulta `GET /api/farms/:fincaId/readings` periódicamente (`:1030-1050`). El botón «Actualizar Datos» busca la URL de Sheets en `localStorage` → `GET /api/sync-sheets` → `window.prompt`, hace `POST /api/sync-sheets`, guarda registros y notifica con `window.sileo` (`:1058-1141`).

### `TripsDiagnosticModal.astro`

Detallado en `docs/CAMERA-ML.md`. Punto clave para frontend: **no es `.tsx`**, no recibe props y su `<script>` (`:210-632`) es el único propietario de la lógica de cámara e inferencia. Escucha los eventos de clima y preferencias, y guarda la foto en galería de forma independiente del resultado del diagnóstico (`:351-362`).

### `Gallery.astro` y `GalleryDetail.astro`

`Gallery.astro` Solo servidor: resuelve finca activa con las mismas reglas de la navbar (Superadmin/Admin pueden usar cualquier cookie válida; los demás solo fincas activas propias), consulta `photos JOIN users` ordenado por `taken_at`/`uploaded_at` y pinta tarjetas con `object-contain`, autor, fecha, caption y tamaño (`:7-64, 97-152`). No hay paginación ni subida desde esta vista.

`GalleryDetail.astro` recibe `id` por `Astro.params`, exige coincidencia con la finca activa y redirige a `/gallery` si no hay foto (`:7-53`). Pinta enlaces de descarga (`download={photo.filename}`; `:97, 217`) apuntando a `/api/gallery/:id/file`. En cliente añade zoom con cierre por Escape, `navigator.share` con fallback a `navigator.clipboard`, y botón para copiar URL (`:261-315`). Calcula `isOwner` en servidor (`:72`), pero el script no implementa borrado: no hay funcionalidad de eliminación en este componente.

### `Metrics.astro`

Servidor: calcula promedios globales y por fila (pH, temperatura interna/externa/suelo, crecimiento, humedad) y textos interpretativos con bandas agronómicas (`:28-129`). Cliente: dibuja gráficos SVG propios (`renderSvgPh`, `renderSvgTin`, `renderSvgTout`, `renderSvgTsoil`, `renderSvgGrowth`, `renderSvgHealth`; `:1688-2043`), modal de planta con histórico y vista ampliada de gráficas (`:2044-2199`), tabla Excel filtrable (`:2191-2340`) y exportación a `/api/export-excel` (`:2352-2416`). El formulario «Nueva Medición» valida finca activa y hace `POST /api/farms/:fincaId/readings` con un único registro; si falla, muestra un toast de `window.sileo` y no actualiza la interfaz (`:2430-2537`). La sincronización con Sheets y el refresco periódico están en `:3013-3130`.

### `History.astro`

Servidor: obtiene todos los registros de la finca, deriva fechas únicas y calcula `isOwner = ctx.finca.rol_finca === "dueno"`; esa bandera restringe la conexión con Google Sheets a nivel de interfaz (`History.astro:26-54`). Cliente: estado centralizado de fecha/filtros/gráfico (`:1252-1300`), tarjetas cronológicas y gráficos SVG, selector de fila/planta/sanidad y búsqueda (`:1474-2450`). La importación acepta CSV arrastrado o seleccionado, lo parsea con `parseCSV` + `buildRecordsFromRows`, muestra vista previa de 10 filas y confirma con `POST /api/farms/:fincaId/readings`; si la persistencia falla, los registros quedan solo en `localStorage` y el aviso lo indica explícitamente (`:2451-2607`). Descarga una plantilla de 20 filas (`:2609-2635`), sincroniza Sheets mediante `POST /api/sync-sheets` (`:2637-2751`) y exporta con `/api/export-excel` (`:2776-2781`). Refresca desde `/api/farms/:fincaId/readings` según `getSyncIntervalMs()` (`:2783-2817`).

### `Navbar.astro`

Genera enlaces según rol: staff (`Superadmin`/`Admin`) ve «Panel» `/admin` y, solo con finca activa, Tablero/Métricas/Historial/Galería; los demás ven «Inicio» y las mismas secciones por finca (`:32-59`). Valida la cookie antes de usarla (`:15-27`) y muestra badge de rol (`:61-67`) y avatar React. En cliente, logout con `signOut()` de `auth-astro/client` y fallback CSRF a `/api/auth/signout` (`:256-290`), cambio de finca con `POST /api/farms/active` y recarga (`:300-326`), y menú móvil (`:328-342`).

### `NoFarm.astro`

Pantalla vacía de «No tienes una finca activa» con un prop booleano `tieneFincas`: cambia el texto y el CTA entre «Ir a mis fincas» y «Crear o unirme a una finca», siempre hacia `/farms` (`NoFarm.astro:2-6, 9-29`).

### `Settings.astro`

Servidor calcula `puedeExportar` y `puedeRestablecer` con `canViewFincaData`/`canManageFinca` sobre la finca activa (`:23-29`). Cliente organiza cinco pestañas `profile`, `system`, `fincas`, `notifications`, `danger` (`:60-72, 362-390`). Acciones verificables:

| Acción                                                           | Implementación                                                                                                    |
| :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| Tema, unidad °C/°F, frecuencia de sincronización, notificaciones | Setters de `src/shared/preferences.ts` (`:412-436, 567-603`)                                                      |
| Nombre y avatar                                                  | Recorte a 160 px en canvas y `PATCH /api/users/me` (`:447-541`)                                                   |
| Resumen semanal                                                  | `POST /api/notifications/weekly-summary` (`:547-565`)                                                             |
| Exportar CSV                                                     | Navegación a `/api/export-csv` (`:605-608`)                                                                       |
| Restablecer datos                                                | `DELETE /api/farms/:fincaId/readings` + limpieza de `localStorage`, solo con confirmación y permisos (`:610-638`) |
| Canjear invitación / salir de finca                              | `POST /api/invitations/use` y `POST /api/farms/leave` (`:669-708`)                                                |
| Logout                                                           | `signOut()` con fallback CSRF, igual que Navbar (`:640-667`)                                                      |

### `Welcome.astro`

Página pública de autenticación con video de bienvenida y control de audio (`:8-45, 704-770`), tres modos (`login`, `register`, `forgot`) gestionados por `setAuthMode()` (`:774-830`), registro en dos pasos con selección de rol `Campesino`/`Agropecuario` y nombre de finca opcional (`:663-689, 1059-1096`). Flujos: Google con `signIn("google", { callbackUrl })`, credenciales con `signIn("credentials")` y fallback CSRF a `/api/auth/callback/credentials` (`:921-1014`), disponibilidad y registro vía `/api/auth/check-availability` y `/api/auth/register` (`:1070, 1131`), recuperación en dos pasos con `/api/auth/forgot-password` y `/api/auth/reset-password` (`:1188-1284`). El parámetro `desde` se sanea para aceptar solo rutas relativas que empiecen por `/` (`:833-838`). `/signin` es un alias obsoleto que solo redirige (`src/pages/signin.astro:4-25`).

## Trazabilidad

| Tema                                             | Archivo de código                                                                                                  | Doc relacionada                          | Verificación                                 |
| :----------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------- |
| Inventario real de componentes (12 + layout)     | `src/frontend/components/`, `src/frontend/layouts/Layout.astro`                                                    | `docs/README.md:30`                      | Listado de directorio y lectura (2026-11-23) |
| Corrección `TripsDiagnosticModal.tsx` → `.astro` | `src/frontend/components/TripsDiagnosticModal.astro`; `src/pages/index.astro:8`                                    | `docs/CAMERA-ML.md`                      | Lectura directa (2026-11-23)                 |
| Props y defaults de `History`/`Metrics`/`NoFarm` | `History.astro:16-24`, `Metrics.astro:21-26`, `NoFarm.astro:2-6`                                                   | `docs/ROUTES.md`                         | Lectura directa (2026-11-23)                 |
| Eventos `macollo:*` y `aquasens:data-synced`     | `src/shared/preferences.ts:7,110-116`; `Dashboard.astro:634,1119`; `History.astro:2595,2701`; `Metrics.astro:3097` | `docs/ARCHITECTURE.md`                   | Búsqueda global en `src/` (2026-11-23)       |
| Three.js, GPS y clima                            | `Dashboard.astro:398-842`; `/api/weather.ts`, `/api/aqi.ts`                                                        | `docs/CAMERA-ML.md`, `docs/ENDPOINTS.md` | Lectura directa (2026-11-23)                 |
| Islas React y toasts                             | `BlobatarAvatar.tsx:1-54`, `SileoProvider.tsx:1-13`, `Layout.astro:2-82`                                           | `docs/ARCHITECTURE.md`                   | Lectura directa (2026-11-23)                 |
| Galería por finca en componentes                 | `Gallery.astro:27-42`, `GalleryDetail.astro:31-53`                                                                 | `docs/CAMERA-ML.md`, `docs/DATABASE.md`  | Lectura directa (2026-11-23)                 |
| Dependencias y modo SSR                          | `package.json:8-42`, `astro.config.mjs:11-26`                                                                      | `docs/ARCHITECTURE.md`                   | Lectura directa (2026-11-23)                 |
| Helper HTTP del servidor                         | `src/backend/services/serverFetch.ts:1-14`, `server-fetch.ts:1`                                                    | `docs/ENDPOINTS.md`                      | Búsqueda de usos en `src/` (2026-11-23)      |

---

# Capítulo 24. Base de datos - PostgreSQL (Macollo) (DOC-14)

**Ruta fuente:** `docs/DATABASE.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-14**.

## 1. Alcance, fuentes y estado

Este documento describe el estado **implementado** del esquema de PostgreSQL y de la capa de persistencia. Toda afirmación se contrasta con el código fuente; cuando una convención es validada por la aplicación pero **no** por una restricción SQL, se indica expresamente.

| Fuente                                                                            | Qué autoriza                                                                               |
| :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| `src/db/auth-schema.sql`                                                          | Tipo `user_role_enum` y tablas `users`, `accounts`, `sessions`, `verification_token`.      |
| `src/db/greenhouse-schema.sql`                                                    | Tablas `fincas`, `finca_miembros`, `finca_invitaciones`, `plantas`, `lecturas` y `photos`. |
| `src/db/migrations/001-roles-farms.sql`                                           | Migración del enum y creación del dominio multi-tenant en bases preexistentes.             |
| `src/db/migrations/002-add-responsable-to-lecturas.sql`                           | Adición de `lecturas.responsable TEXT`.                                                    |
| `src/db/migrations/003-add-sheets-url-to-fincas.sql`                              | Adición de `fincas.sheets_url TEXT`.                                                       |
| `src/db/client.ts`                                                                | Pool `pg`, selección de `DATABASE_URL` o variables discretas, SSL.                         |
| `src/backend/services/{readings,sheetsSync,csvExport,excelExport,authz,farms}.ts` | Lectura/escritura, importación, exportación y control de acceso.                           |
| `src/shared/{plantMatrix,recordsParser,csv,serialize}.ts`                         | Tipos canónicos, parser de registros y conversiones.                                       |
| `scripts/{migrate-neon,seed-admin,seed-demo,seed-production}.mjs`                 | Migración y siembra en Neon/PostgreSQL.                                                    |
| `docs/sample-readings-demo.csv`, `.env.example`                                   | Fixture de campo y variables de entorno.                                                   |

**Estado correcto (corrección de deriva):** los datos agronómicos **persisten** en PostgreSQL. `POST /api/sync-sheets` valida sesión y acceso, descarga el CSV, interpreta los registros con `buildRecordsFromRows` y ejecuta `INSERT … ON CONFLICT` en `lecturas` (`src/pages/api/sync-sheets.ts:52-126`, `src/backend/services/readings.ts:123-191`). El tablero y el historial leen desde la BD mediante `getLecturasByFinca()` (`src/backend/services/readings.ts:85-104`). La referencia a una «brecha dataset-en-memoria» que todavía aparece en `docs/README.md:15` es **obsoleta**.

No se fija una versión mayor de PostgreSQL en los scripts: se emplean `SERIAL`/`BIGSERIAL`, `TIMESTAMPTZ`, `REAL` y `gen_random_uuid()` (`src/db/auth-schema.sql:31-43`, `src/db/greenhouse-schema.sql:79-100`, `src/db/greenhouse-schema.sql:116-129`). La afirmación anterior de «PostgreSQL 17» no es verificable desde las fuentes y se retira.

---

## 2. Conexión

`src/db/client.ts:18-44` exporta un único `Pool`. La rama seleccionada depende de que exista `DATABASE_URL`:

| Parámetro                 | Con `DATABASE_URL` (`client.ts:19-29`)                                              | Sin `DATABASE_URL` (`client.ts:30-43`)                                                                                                                                                                               |
| :------------------------ | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Destino                   | `connectionString: DATABASE_URL`                                                    | `POSTGRES_HOST` (por defecto `localhost`), `POSTGRES_PORT` (por defecto `5432`), `POSTGRES_USER` (por defecto `postgres`), `POSTGRES_PASSWORD` (por defecto `''`), `POSTGRES_DATABASE` (por defecto `astro_auth_db`) |
| SSL                       | `NODE_ENV === "production"` → `{ rejectUnauthorized: false }`; en otro caso `false` | Misma regla (`client.ts:36-39`)                                                                                                                                                                                      |
| `max`                     | `20`                                                                                | `20`                                                                                                                                                                                                                 |
| `idleTimeoutMillis`       | `30000`                                                                             | `30000`                                                                                                                                                                                                              |
| `connectionTimeoutMillis` | `5000`                                                                              | `2000`                                                                                                                                                                                                               |

Los errores de clientes inactivos se registran con `pool.on("error", …)` (`src/db/client.ts:46-48`). `auth.config.ts:56` reutiliza el mismo pool para el adaptador `@auth/pg-adapter`, aunque la estrategia de sesión es JWT (`auth.config.ts:170-174`).

Valores de plantilla en `.env.example:2-7`: `DATABASE_URL=postgres://postgres:TU_PASSWORD@localhost:5432/invernadero`, `POSTGRES_HOST=localhost`, `POSTGRES_PORT=5432`, `POSTGRES_USER=postgres`, `POSTGRES_PASSWORD=TU_PASSWORD`, `POSTGRES_DATABASE=invernadero`. El comentario de `src/db/auth-schema.sql:8` menciona `astro_auth_db`; ambas denominaciones son válidas siempre que el nombre coincida con la URL de conexión. La configuración de autenticación adicional (`AUTH_SECRET`, `SESSION_MAX_AGE_HOURS`, `AUTH_TRUST_HOST`) está en `.env.example:9-18`.

Comprobación ejecutable de conexión:

```bash
psql "$DATABASE_URL" -c 'SELECT current_database(), current_user, version();'
```

---

## 3. Instalación desde cero

```bash
# 1. Ajusta la URL a tu entorno (valor de ejemplo, no credencial real).
export DATABASE_URL='postgresql://postgres:TU_PASSWORD@localhost:5432/invernadero'

# 2. Crea la base de datos si no existe (usa un rol con privilegios CREATEDB).
psql 'postgresql://postgres:TU_PASSWORD@localhost:5432/postgres' -c 'CREATE DATABASE invernadero;'

# 3. Esquema de autenticación y esquema agronómico, en este orden.
psql "$DATABASE_URL" -f src/db/auth-schema.sql
psql "$DATABASE_URL" -f src/db/greenhouse-schema.sql

# 4. Verificación: deben aparecer 10 tablas en public.
psql "$DATABASE_URL" -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name;"
```

Salida esperada (10 tablas): `accounts`, `finca_invitaciones`, `finca_miembros`, `fincas`, `lecturas`, `photos`, `plantas`, `sessions`, `users`, `verification_token`. La consulta de verificación incluida en `src/db/greenhouse-schema.sql:107-110` solo lista las cinco tablas agronómicas principales; `photos` se crea después de `COMMIT` (`src/db/greenhouse-schema.sql:104-132`), por lo que no figura en esa comprobación parcial.

Siembra opcional (requiere Node ≥ 22.12.0, `package.json:8-14`):

```bash
# Cuenta privilegiada; ADMIN_ROLE admite los cuatro valores del enum.
ADMIN_EMAIL='tu@correo.com' ADMIN_PASSWORD='Secreta123' \
  node scripts/seed-admin.mjs

# Finca demo, 20 plantas y 60 lecturas (3 días × 20 plantas).
node scripts/seed-demo.mjs
```

`scripts/seed-admin.mjs:9-26` exige correo válido, contraseña de al menos 8 caracteres y rol del conjunto (`Superadmin`, `Admin`, `Agropecuario`, `Campesino`); hace upsert por `LOWER(email)` (`scripts/seed-admin.mjs:53-76`). `scripts/seed-demo.mjs:15-20` genera una contraseña aleatoria cuando `DEMO_PASSWORD` tiene menos de 8 caracteres y la imprime una sola vez; si ya existe «Finca demo», termina sin modificar lecturas (`scripts/seed-demo.mjs:70-79`). `scripts/seed-demo.mjs:22-42` y `scripts/seed-admin.mjs:28-48` sí importan `dotenv/config`; los scripts de Neon no.

---

## 4. Migraciones

| Script                                                  | Alcance exacto                                                                                                                                                                                                                                                              | Idempotencia / efecto                                                                                                                                                                                                                                                          |
| :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/db/migrations/001-roles-farms.sql`                 | Renombra `Super admin`→`Superadmin` y `Agronomo`→`Agropecuario` dentro de `user_role_enum` (`:16-46`); crea `fincas`, `finca_miembros`, `finca_invitaciones`, `plantas` y `lecturas` (`:51-134`).                                                                           | `CREATE TABLE IF NOT EXISTS`, índices `IF NOT EXISTS` y bloque `DO $$` condicionado a la existencia del valor antiguo. `lecturas` incluye `responsable_id` (`:128`) y `UNIQUE (finca_id, planta_id, fecha, hora)` (`:131`), pero **no** incluye `responsable` ni `sheets_url`. |
| `src/db/migrations/002-add-responsable-to-lecturas.sql` | `ALTER TABLE lecturas ADD COLUMN IF NOT EXISTS responsable TEXT;` (`:4`).                                                                                                                                                                                                   | La columna nueva es `responsable`; `responsable_id` **no** proviene de esta migración, ya estaba en la 001 y en el esquema agronómico.                                                                                                                                         |
| `src/db/migrations/003-add-sheets-url-to-fincas.sql`    | `ALTER TABLE fincas ADD COLUMN IF NOT EXISTS sheets_url TEXT;` (`:4`).                                                                                                                                                                                                      | Idempotente; conserva NULL en fincas existentes.                                                                                                                                                                                                                               |
| `scripts/migrate-neon.mjs`                              | Script integral para Neon: migra el enum, fuerza `role='Superadmin'` en `users.id=1` (`:47`), renombra `plantas` heredada sin `finca_id` a `plantas_legacy` (`:49-60`), crea las 10 tablas con `sheets_url`, `responsable` y `responsable_id`, y hace `COMMIT` (`:12-163`). | Todo el DDL va en una sola transacción, incluidas las tres tablas de `photos`. Usa `ssl: { rejectUnauthorized: false }` (`:7-10`). **No importa `dotenv/config`**: hay que exportar `DATABASE_URL`; si no, usa el literal de respaldo de `:4-5`.                               |

Orden recomendado en una base preexistente:

```bash
psql "$DATABASE_URL" -f src/db/migrations/001-roles-farms.sql
psql "$DATABASE_URL" -f src/db/migrations/002-add-responsable-to-lecturas.sql
psql "$DATABASE_URL" -f src/db/migrations/003-add-sheets-url-to-fincas.sql
```

Para una instancia Neon que aún no tenga el modelo actual, alternativa integral:

```bash
export DATABASE_URL='postgresql://…/neondb?sslmode=require'
node scripts/migrate-neon.mjs
```

> **Seguridad:** `scripts/migrate-neon.mjs:4-5` y `scripts/seed-production.mjs:4-6` contienen una URL de respaldo con credenciales literales; este documento no las reproduce. Fijar `DATABASE_URL` en el entorno y tratar esos valores como secretos comprometidos si el repositorio es accesible a terceros.

`scripts/seed-production.mjs` crea/actualiza un Superadmin, vincula la finca «Invernadero Macollo Principal», siembra 20 plantas y 60 lecturas con `responsable_id` del administrador (`:21-175`). Las credenciales y mensajes están codificados en `:24-25` y `:176-184`; no importa `dotenv/config` y usa el mismo respaldo Neon. Su ejecución no es necesaria para el esquema: es una siembra de calibración.

### Autoadición de columnas en tiempo de ejecución

Además de las migraciones, el código aplica DDL best-effort una vez por proceso:

- `src/backend/services/readings.ts:9-21`: `ALTER TABLE lecturas ADD COLUMN IF NOT EXISTS responsable TEXT;` antes de leer o insertar; silencia errores de permisos o tabla ausente.
- `src/pages/api/sync-sheets.ts:20-31`: `ALTER TABLE fincas ADD COLUMN IF NOT EXISTS sheets_url TEXT;` en `GET` y `POST`; también silencia errores.

Esto **no sustituye** a las migraciones: la autoadición depende de que el rol de aplicación tenga permisos DDL y de que se ejecute la ruta correspondiente.

---

## 5. Dominio de autenticación

### `user_role_enum`

```sql
CREATE TYPE user_role_enum AS ENUM ('Superadmin', 'Admin', 'Agropecuario', 'Campesino');
```

Definición condicional en `src/db/auth-schema.sql:18-28`; reconversión de valores antiguos en `src/db/migrations/001-roles-farms.sql:16-46` y en `scripts/migrate-neon.mjs:15-44`. `src/backend/services/authz.ts:3-4` declara los mismos cuatro roles y `dueno`/`miembro` para el ámbito de finca.

### `users` (`src/db/auth-schema.sql:31-43`)

| Columna           | Tipo             | Nulo | Valor por defecto         | FK / UK         | Índice                              | Significado                                                                                                                                                                          |
| :---------------- | :--------------- | :--- | :------------------------ | :-------------- | :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `SERIAL`         | No   | `nextval('users_id_seq')` | PK              | PK                                  | Identificador interno; Auth.js lo expone como `string` en el JWT (`auth.config.ts:189`).                                                                                             |
| `name`            | `VARCHAR(255)`   | Sí   | —                         | —               | —                                   | Nombre; las validaciones de obligatoriedad son de aplicación, no SQL.                                                                                                                |
| `email`           | `VARCHAR(255)`   | Sí   | —                         | `UNIQUE(email)` | `idx_users_email` + índice de la UK | Correo. La UK **distingue mayúsculas de minúsculas** en PostgreSQL; la aplicación compara con `LOWER(COALESCE(email,''))` (`auth.config.ts:94-102`, `scripts/seed-admin.mjs:53-55`). |
| `phone`           | `VARCHAR(50)`    | Sí   | —                         | —               | —                                   | Celular alternativo para login y recuperación.                                                                                                                                       |
| `birth_date`      | `DATE`           | Sí   | —                         | —               | —                                   | Fecha de nacimiento.                                                                                                                                                                 |
| `password`        | `VARCHAR(255)`   | Sí   | —                         | —               | —                                   | Hash bcrypt (salt 10); el login acepta transitoriamente texto plano y lo rehashea (`auth.config.ts:114-143`).                                                                        |
| `role`            | `user_role_enum` | No   | `'Campesino'`             | —               | `idx_users_role`                    | Rol del sistema; se relee de la BD en cada operación sensible (`authz.ts:50-73`).                                                                                                    |
| `"emailVerified"` | `TIMESTAMPTZ`    | Sí   | —                         | —               | —                                   | Marca de verificación; la siembra la fija con `NOW()`.                                                                                                                               |
| `image`           | `TEXT`           | Sí   | —                         | —               | —                                   | URL del avatar.                                                                                                                                                                      |
| `created_at`      | `TIMESTAMPTZ`    | Sí   | `CURRENT_TIMESTAMP`       | —               | —                                   | Creación. El DDL no declara `NOT NULL`.                                                                                                                                              |
| `updated_at`      | `TIMESTAMPTZ`    | Sí   | `CURRENT_TIMESTAMP`       | —               | —                                   | Actualización; se modifica explícitamente en reset-password y panel admin. **No hay trigger** que lo refresque solo.                                                                 |

### `accounts` (`src/db/auth-schema.sql:46-60`)

| Columna               | Tipo           | Nulo | Valor por defecto | FK / UK                                  | Índice          | Significado                                         |
| :-------------------- | :------------- | :--- | :---------------- | :--------------------------------------- | :-------------- | :-------------------------------------------------- |
| `id`                  | `SERIAL`       | No   | `nextval(...)`    | PK                                       | PK              | Identificador de cuenta OAuth.                      |
| `"userId"`            | `INTEGER`      | No   | —                 | FK → `users(id) ON DELETE CASCADE`       | —               | Propietario de la cuenta.                           |
| `type`                | `VARCHAR(255)` | No   | —                 | —                                        | —               | Tipo de cuenta del adaptador Auth.js.               |
| `provider`            | `VARCHAR(255)` | No   | —                 | `UNIQUE (provider, "providerAccountId")` | índice de la UK | Proveedor, p. ej. `google`.                         |
| `"providerAccountId"` | `VARCHAR(255)` | No   | —                 | `UNIQUE (provider, "providerAccountId")` | índice de la UK | Identificador remoto del proveedor.                 |
| `refresh_token`       | `TEXT`         | Sí   | —                 | —                                        | —               | Token de refresco OAuth.                            |
| `access_token`        | `TEXT`         | Sí   | —                 | —                                        | —               | Token de acceso OAuth.                              |
| `expires_at`          | `BIGINT`       | Sí   | —                 | —                                        | —               | Expiración en epoch (segundos), según el adaptador. |
| `token_type`          | `VARCHAR(255)` | Sí   | —                 | —                                        | —               | Tipo de token.                                      |
| `scope`               | `TEXT`         | Sí   | —                 | —                                        | —               | Alcances solicitados.                               |
| `id_token`            | `TEXT`         | Sí   | —                 | —                                        | —               | Token de identidad OIDC.                            |
| `session_state`       | `TEXT`         | Sí   | —                 | —                                        | —               | Estado de sesión del proveedor.                     |

`accounts` solo se pobla con «Continuar con Google» (`auth.config.ts:58-68`); con login por credenciales permanece en 0 filas. La tabla existe porque el adaptador está configurado (`auth.config.ts:56`).

### `sessions` (`src/db/auth-schema.sql:63-68`)

| Columna          | Tipo           | Nulo | Valor por defecto | FK / UK                            | Índice          | Significado                    |
| :--------------- | :------------- | :--- | :---------------- | :--------------------------------- | :-------------- | :----------------------------- |
| `id`             | `SERIAL`       | No   | `nextval(...)`    | PK                                 | PK              | Identificador de sesión.       |
| `"sessionToken"` | `VARCHAR(255)` | No   | —                 | `UNIQUE`                           | índice de la UK | Token opaco del adaptador.     |
| `"userId"`       | `INTEGER`      | No   | —                 | FK → `users(id) ON DELETE CASCADE` | —               | Usuario asociado.              |
| `expires`        | `TIMESTAMPTZ`  | No   | —                 | —                                  | —               | Expiración de la sesión en BD. |

Con `session.strategy='jwt'` y `updateAge = maxAge` (`auth.config.ts:170-174`, `auth.config.ts:39-52`), la sesión viaja en la cookie firmada: `sessions` queda normalmente en 0 filas. No es una condición de error; solo se usaría con estrategia `database`.

### `verification_token` (`src/db/auth-schema.sql:71-76`)

| Columna      | Tipo           | Nulo | Valor por defecto | FK / UK                  | Índice          | Significado                                                                  |
| :----------- | :------------- | :--- | :---------------- | :----------------------- | :-------------- | :--------------------------------------------------------------------------- |
| `identifier` | `VARCHAR(255)` | No   | —                 | `PK (identifier, token)` | índice de la PK | Email o celular canónico (`forgot-password.ts:82-85`). Sin FK hacia `users`. |
| `token`      | `VARCHAR(255)` | No   | —                 | `PK (identifier, token)` | índice de la PK | Código numérico de 6 dígitos (`forgot-password.ts:78-80`).                   |
| `expires`    | `TIMESTAMPTZ`  | No   | —                 | —                        | —               | Vigencia de 15 minutos.                                                      |

Corrección de deriva: no es correcto afirmar que «siempre está vacía salvo una recuperación en curso». Se inserta al solicitar el código, se depura al emitir uno nuevo (`src/pages/api/auth/forgot-password.ts:87-94`) y se elimina al consumirlo (`src/pages/api/auth/reset-password.ts:66-68`); un código nunca usado **puede permanecer expirado** hasta una limpieza (§9).

---

## 6. Dominio agronómico

Modelo multi-tenant por finca: 20 plantas por finca (matriz 4 × 5) y una fila de `lecturas` por visita a una planta (`src/db/greenhouse-schema.sql:3`, `src/shared/plantMatrix.ts:1-8`).

### `fincas` (`src/db/greenhouse-schema.sql:17-29`)

| Columna       | Tipo           | Nulo | Valor por defecto   | FK / UK                             | Índice              | Significado                                                                                                                                                 |
| :------------ | :------------- | :--- | :------------------ | :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | `SERIAL`       | No   | `nextval(...)`      | PK                                  | PK                  | Identificador de finca.                                                                                                                                     |
| `nombre`      | `VARCHAR(255)` | No   | —                   | —                                   | —                   | Nombre visible.                                                                                                                                             |
| `descripcion` | `TEXT`         | Sí   | —                   | —                                   | —                   | Descripción libre.                                                                                                                                          |
| `ubicacion`   | `TEXT`         | Sí   | —                   | —                                   | —                   | Localización.                                                                                                                                               |
| `sheets_url`  | `TEXT`         | Sí   | —                   | —                                   | —                   | Enlace de Google Sheets/Drive recordado por finca. Migración 003 (`:4`), esquema (`:22`), `migrate-neon.mjs:68,76` y autoadición en `sync-sheets.ts:24-26`. |
| `dueno_id`    | `INTEGER`      | No   | —                   | FK → `users(id) ON DELETE RESTRICT` | `idx_fincas_dueno`  | Dueño; impide borrar un usuario con fincas asociadas.                                                                                                       |
| `activa`      | `BOOLEAN`      | No   | `TRUE`              | —                                   | `idx_fincas_activa` | `FALSE` = archivada, restaurable; el borrado físico está restringido a Superadmin (`authz.ts:83-85`).                                                       |
| `created_at`  | `TIMESTAMPTZ`  | No   | `CURRENT_TIMESTAMP` | —                                   | —                   | Creación.                                                                                                                                                   |
| `updated_at`  | `TIMESTAMPTZ`  | No   | `CURRENT_TIMESTAMP` | —                                   | —                   | Se actualiza en `updateFinca`, `setFincaActiva` y al guardar `sheets_url` (`farms.ts:178,194`, `sync-sheets.ts:105`).                                       |

`sheets_url` **no** forma parte de `FincaRow` en `src/backend/services/farms.ts:9-20`: se consulta y escribe exclusivamente desde `GET`/`POST /api/sync-sheets` (`src/pages/api/sync-sheets.ts:37-50`, `:72-126`). `POST` usa la URL del cuerpo si viene y, si no, la guardada; tras descargar con éxito persiste la URL efectiva (`sync-sheets.ts:74-110`).

### `finca_miembros` (`src/db/greenhouse-schema.sql:35-45`)

| Columna      | Tipo          | Nulo | Valor por defecto   | FK / UK                                                           | Índice                                       | Significado                                      |
| :----------- | :------------ | :--- | :------------------ | :---------------------------------------------------------------- | :------------------------------------------- | :----------------------------------------------- |
| `id`         | `SERIAL`      | No   | `nextval(...)`      | PK                                                                | PK                                           | Identificador de membresía.                      |
| `finca_id`   | `INTEGER`     | No   | —                   | FK → `fincas(id) ON DELETE CASCADE`; `UNIQUE (finca_id, user_id)` | `idx_finca_miembros_finca` + índice de la UK | Finca compartida.                                |
| `user_id`    | `INTEGER`     | No   | —                   | FK → `users(id) ON DELETE CASCADE`; `UNIQUE (finca_id, user_id)`  | `idx_finca_miembros_user`                    | Miembro.                                         |
| `rol_finca`  | `VARCHAR(12)` | No   | `'miembro'`         | `CHECK (rol_finca IN ('dueno','miembro'))`                        | —                                            | Rol dentro de la finca, distinto del rol global. |
| `created_at` | `TIMESTAMPTZ` | No   | `CURRENT_TIMESTAMP` | —                                                                 | —                                            | Fecha de ingreso.                                |

La creación de finca inserta o actualiza la membresía `dueno` en la misma transacción que la finca y las 20 plantas (`farms.ts:98-123`). El acceso efectivo se calcula en `authz.ts:91-107`: staff = `staff`, dueño = `dueno`, resto con membresía = `miembro`, sin membresía = `none`.

### `finca_invitaciones` (`src/db/greenhouse-schema.sql:50-61`)

| Columna        | Tipo          | Nulo | Valor por defecto   | FK / UK                             | Índice                   | Significado                                                           |
| :------------- | :------------ | :--- | :------------------ | :---------------------------------- | :----------------------- | :-------------------------------------------------------------------- |
| `id`           | `SERIAL`      | No   | `nextval(...)`      | PK                                  | PK                       | Identificador de invitación.                                          |
| `finca_id`     | `INTEGER`     | No   | —                   | FK → `fincas(id) ON DELETE CASCADE` | `idx_invitaciones_finca` | Finca invitada.                                                       |
| `codigo`       | `VARCHAR(20)` | No   | —                   | `UNIQUE`                            | índice de la UK          | Código de 8 caracteres en mayúsculas, sin prefijo (`farms.ts:28-31`). |
| `creado_por`   | `INTEGER`     | No   | —                   | FK → `users(id) ON DELETE CASCADE`  | —                        | Usuario que generó el código.                                         |
| `expira_en`    | `TIMESTAMPTZ` | No   | —                   | —                                   | —                        | Fecha de expiración.                                                  |
| `usos_maximos` | `INTEGER`     | No   | `1`                 | `CHECK (usos_maximos > 0)`          | —                        | Número de canjes permitidos.                                          |
| `usos_usados`  | `INTEGER`     | No   | `0`                 | `CHECK (usos_usados >= 0)`          | —                        | Canjes consumidos.                                                    |
| `activa`       | `BOOLEAN`     | No   | `TRUE`              | —                                   | —                        | `FALSE` = revocada.                                                   |
| `created_at`   | `TIMESTAMPTZ` | No   | `CURRENT_TIMESTAMP` | —                                   | —                        | Creación.                                                             |

El alfabeto se deriva de `nolookalikesSafe` en mayúsculas y deduplicado (`farms.ts:28-31`); `generarCodigoInvitacion` reintenta hasta 8 veces ante colisiones (`:43-56`). El canje normaliza a mayúsculas, bloquea la fila con `FOR UPDATE OF i`, valida vigencia/usos/membresía y escribe membresía y contador en una transacción (`farms.ts:308-369`). `peekInvitacion` solo valida, sin consumir la invitación (`:372-398`).

### `plantas` (`src/db/greenhouse-schema.sql:66-74`)

| Columna    | Tipo          | Nulo | Valor por defecto | FK / UK                                                                                            | Índice                                | Significado                                                                                              |
| :--------- | :------------ | :--- | :---------------- | :------------------------------------------------------------------------------------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------- |
| `id`       | `SERIAL`      | No   | `nextval(...)`    | PK                                                                                                 | PK                                    | Identificador interno usado por `lecturas.planta_id`.                                                    |
| `finca_id` | `INTEGER`     | No   | —                 | FK → `fincas(id) ON DELETE CASCADE`; `UNIQUE (finca_id, fila, columna)`                            | `idx_plantas_finca` + índice de la UK | Finca propietaria.                                                                                       |
| `fila`     | `VARCHAR(4)`  | No   | —                 | `CHECK (fila IN ('t0','t1','t2','t3'))`; `UNIQUE (finca_id, fila, columna)`                        | índice de la UK                       | Fila de la matriz.                                                                                       |
| `columna`  | `VARCHAR(8)`  | No   | —                 | `CHECK (columna IN ('Col 1','Col 2','Col 3','Col 4','Col 5'))`; `UNIQUE (finca_id, fila, columna)` | índice de la UK                       | Columna de la matriz.                                                                                    |
| `plant_id` | `VARCHAR(16)` | No   | —                 | —                                                                                                  | —                                     | Etiqueta `P-01`…`P-20` calculada por `fila*5 + columna + 1` (`farms.ts:66-67`). No es única por sí sola. |

La siembra estándar usa `ON CONFLICT (finca_id, fila, columna) DO NOTHING` (`farms.ts:58-76`). La unicidad es por coordenadas, no por `plant_id`.

### `lecturas` (`src/db/greenhouse-schema.sql:79-102`)

| Columna          | Tipo          | Nulo | Valor por defecto   | FK / UK                                                                           | Índice                                       | Significado                                                                                                                                                       |
| :--------------- | :------------ | :--- | :------------------ | :-------------------------------------------------------------------------------- | :------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `BIGSERIAL`   | No   | `nextval(...)`      | PK                                                                                | PK                                           | Identificador de lectura; se expone como `LEC-<id>` (`readings.ts:56`).                                                                                           |
| `finca_id`       | `INTEGER`     | No   | —                   | FK → `fincas(id) ON DELETE CASCADE`; `UNIQUE (finca_id, planta_id, fecha, hora)`  | `idx_lecturas_finca_fecha` + índice de la UK | Finca de la medición.                                                                                                                                             |
| `planta_id`      | `INTEGER`     | No   | —                   | FK → `plantas(id) ON DELETE CASCADE`; `UNIQUE (finca_id, planta_id, fecha, hora)` | `idx_lecturas_planta` + índice de la UK      | Planta visitada.                                                                                                                                                  |
| `fecha`          | `DATE`        | No   | —                   | `UNIQUE (finca_id, planta_id, fecha, hora)`                                       | índice de la UK + `idx_lecturas_finca_fecha` | Fecha de la visita en formato SQL.                                                                                                                                |
| `hora`           | `VARCHAR(20)` | No   | `''` (cadena vacía) | `UNIQUE (finca_id, planta_id, fecha, hora)`                                       | índice de la UK                              | Hora textual, p. ej. `09:00 AM`. **No** tiene como valor por defecto `09:00 AM` en la BD.                                                                         |
| `ph_suelo`       | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | pH (0–14 por validación del parser).                                                                                                                              |
| `temp_interna`   | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | Temperatura interna del invernadero.                                                                                                                              |
| `temp_externa`   | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | Temperatura externa.                                                                                                                                              |
| `temp_suelo`     | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | Temperatura del sustrato/suelo.                                                                                                                                   |
| `humedad`        | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | Humedad relativa (0–100 por validación del parser).                                                                                                               |
| `altura_cm`      | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | Altura de la planta en centímetros.                                                                                                                               |
| `crecimiento`    | `REAL`        | Sí   | —                   | —                                                                                 | —                                            | Porcentaje derivado de la altura.                                                                                                                                 |
| `fase`           | `TEXT`        | Sí   | —                   | —                                                                                 | —                                            | Fase fenológica.                                                                                                                                                  |
| `productividad`  | `TEXT`        | Sí   | —                   | —                                                                                 | —                                            | `Alta`/`Media`/`Baja` por convención de aplicación.                                                                                                               |
| `sanidad`        | `TEXT`        | Sí   | —                   | —                                                                                 | —                                            | `Excelente`/`Saludable`/`Vulnerable`/`Crítica` por convención de aplicación.                                                                                      |
| `responsable`    | `TEXT`        | Sí   | —                   | —                                                                                 | —                                            | Nombre literal del responsable tal como figura en la hoja. Migración 002 (`:4`), esquema (`:95`), `migrate-neon.mjs:133,141` y autoadición en `readings.ts:9-21`. |
| `responsable_id` | `INTEGER`     | Sí   | —                   | FK → `users(id) ON DELETE SET NULL`                                               | —                                            | Usuario autenticado que sincronizó. Presente en `001-roles-farms.sql:128`, `greenhouse-schema.sql:96` y `migrate-neon.mjs:134`.                                   |
| `observaciones`  | `TEXT`        | Sí   | —                   | —                                                                                 | —                                            | Notas de campo o texto generado por el parser.                                                                                                                    |
| `created_at`     | `TIMESTAMPTZ` | No   | `CURRENT_TIMESTAMP` | —                                                                                 | —                                            | Creación del registro.                                                                                                                                            |

No hay `CHECK` numérico en la BD: los rangos y derivaciones se aplican en `src/shared/recordsParser.ts:318-374` y `src/shared/csv.ts:126-168`. La clave `UNIQUE (finca_id, planta_id, fecha, hora)` es la base de la deduplicación: `insertLecturas` ejecuta `ON CONFLICT … DO UPDATE` y conserva `responsable`/`responsable_id` previos cuando el nuevo valor es NULL (`readings.ts:141-160`). Las semillas usan `DO NOTHING` (`seed-demo.mjs:159-165`, `seed-production.mjs:140-152`).

En lectura, el nombre se resuelve con `COALESCE(NULLIF(TRIM(l.responsable), ''), u.name, 'Sin registrar')` y se une `users` por `responsable_id` (`readings.ts:89-100`).

### `photos` (`src/db/greenhouse-schema.sql:116-132`)

| Columna       | Tipo           | Nulo | Valor por defecto   | FK / UK                              | Índice                          | Significado                                                                |
| :------------ | :------------- | :--- | :------------------ | :----------------------------------- | :------------------------------ | :------------------------------------------------------------------------- |
| `id`          | `UUID`         | No   | `gen_random_uuid()` | PK                                   | PK                              | Identificador de la foto. No se declara `CREATE EXTENSION` en los scripts. |
| `filename`    | `VARCHAR(255)` | No   | —                   | —                                    | —                               | Nombre de archivo original.                                                |
| `url`         | `TEXT`         | No   | —                   | —                                    | —                               | Ubicación pública del objeto.                                              |
| `mime_type`   | `VARCHAR(100)` | Sí   | —                   | —                                    | —                               | Tipo MIME.                                                                 |
| `width`       | `INTEGER`      | Sí   | —                   | —                                    | —                               | Ancho en píxeles.                                                          |
| `height`      | `INTEGER`      | Sí   | —                   | —                                    | —                               | Alto en píxeles.                                                           |
| `size_bytes`  | `BIGINT`       | Sí   | —                   | —                                    | —                               | Tamaño en bytes.                                                           |
| `caption`     | `TEXT`         | Sí   | —                   | —                                    | —                               | Pie de foto opcional.                                                      |
| `finca_id`    | `INTEGER`      | Sí   | —                   | FK → `fincas(id) ON DELETE SET NULL` | `idx_photos_finca`              | Finca asociada; se conserva la foto si se borra la finca.                  |
| `user_id`     | `INTEGER`      | Sí   | —                   | FK → `users(id) ON DELETE SET NULL`  | `idx_photos_user`               | Autor de la subida.                                                        |
| `taken_at`    | `TIMESTAMPTZ`  | Sí   | —                   | —                                    | —                               | Fecha de captura.                                                          |
| `uploaded_at` | `TIMESTAMPTZ`  | No   | `CURRENT_TIMESTAMP` | —                                    | `idx_photos_uploaded_at` (DESC) | Fecha de subida.                                                           |

---

## 7. Diagrama entidad-relación

```mermaid
erDiagram
    users ||--o{ accounts : "OAuth (userId)"
    users ||--o{ sessions : "sessionToken"
    users ||--o{ fincas : "dueno_id (RESTRICT)"
    users ||--o{ finca_miembros : "user_id"
    users ||--o{ finca_invitaciones : "creado_por"
    fincas ||--o{ finca_miembros : "finca_id"
    fincas ||--o{ finca_invitaciones : "finca_id"
    fincas ||--o{ plantas : "finca_id"
    fincas ||--o{ lecturas : "finca_id"
    plantas ||--o{ lecturas : "planta_id"
    users |o--o{ lecturas : "responsable_id (SET NULL)"
    fincas |o--o{ photos : "finca_id (SET NULL)"
    users |o--o{ photos : "user_id (SET NULL)"

    users {
        int id PK
        varchar name
        varchar email UK
        varchar phone
        date birth_date
        varchar password
        enum role
        timestamptz emailVerified
        text image
        timestamptz created_at
        timestamptz updated_at
    }
    accounts {
        int id PK
        int userId FK
        varchar type
        varchar provider
        varchar providerAccountId
        text refresh_token
        text access_token
        bigint expires_at
        varchar token_type
        text scope
        text id_token
        text session_state
    }
    sessions {
        int id PK
        varchar sessionToken UK
        int userId FK
        timestamptz expires
    }
    verification_token {
        varchar identifier PK
        varchar token PK
        timestamptz expires
    }
    fincas {
        int id PK
        varchar nombre
        text descripcion
        text ubicacion
        text sheets_url
        int dueno_id FK
        boolean activa
        timestamptz created_at
        timestamptz updated_at
    }
    finca_miembros {
        int id PK
        int finca_id FK
        int user_id FK
        varchar rol_finca
        timestamptz created_at
    }
    finca_invitaciones {
        int id PK
        int finca_id FK
        varchar codigo UK
        int creado_por FK
        timestamptz expira_en
        int usos_maximos
        int usos_usados
        boolean activa
        timestamptz created_at
    }
    plantas {
        int id PK
        int finca_id FK
        varchar fila
        varchar columna
        varchar plant_id
    }
    lecturas {
        bigint id PK
        int finca_id FK
        int planta_id FK
        date fecha
        varchar hora
        real ph_suelo
        real temp_interna
        real temp_externa
        real temp_suelo
        real humedad
        real altura_cm
        real crecimiento
        text fase
        text productividad
        text sanidad
        text responsable
        int responsable_id FK
        text observaciones
        timestamptz created_at
    }
    photos {
        uuid id PK
        varchar filename
        text url
        varchar mime_type
        int width
        int height
        bigint size_bytes
        text caption
        int finca_id FK
        int user_id FK
        timestamptz taken_at
        timestamptz uploaded_at
    }
```

`verification_token` se representa sin relación: su `identifier` es un email/teléfono y no una FK (`forgot-password.ts:82-94`). Las únicas restricciones de unicidad compuestas relevantes para el negocio son `UNIQUE (finca_id, user_id)`, `UNIQUE (finca_id, fila, columna)` y `UNIQUE (finca_id, planta_id, fecha, hora)`.

---

## 8. Flujos de datos

### Importación desde Google Sheets

1. `resolveActiveFinca()` exige sesión y resuelve la finca activa desde la cookie `finca_activa` o, si hay una sola, la única disponible (`farms.ts:413-429`, `authz.ts:137-161`).
2. `getFincaAccess()` + `canConnectSheets()` permiten a `dueno`, `staff` y `miembro` sincronizar (`sync-sheets.ts:65-70`, `authz.ts:91-129`).
3. Se obtiene la URL del cuerpo o de `fincas.sheets_url`; si no hay ninguna se responde `400` con `needsUrl: true` (`sync-sheets.ts:72-97`).
4. `normalizeGoogleSheetUrl()` convierte enlaces `/file/d/<id>` y `open?id=<id>` de Drive a `…/export?format=csv`, respeta enlaces `/spreadsheets/d/e/…/pub?output=csv` y añade `gid` cuando aplica (`sheetsSync.ts:13-54`).
5. `fetchSheetRecords()` usa `User-Agent: Macollo-Greenhouse-Sync/2.0`, parsea con `parseCSV()` y delega en `buildRecordsFromRows()` (`sheetsSync.ts:56-90`); errores HTTP o ausencia de registros producen `SheetsSyncError` con estado 422 (`:66-87`, `:92-99`).
6. Se persiste la URL (`sync-sheets.ts:102-110`) y se llama a `insertLecturas(fincaId, records, ctx.user.id)` (`:114`), que hace `responsable_id = usuario autenticado` y `responsable = texto de la hoja`.
7. `insertLecturas()` opera en una transacción, valida `YYYY-MM-DD`, resuelve `(fila, columna)` contra `plantas`, aplica el upsert por clave compuesta y devuelve el número de filas intentadas (`readings.ts:123-191`). Un error revierte toda la operación.

### Lectura y reconstrucción de la matriz

`getLecturasByFinca()` ordena por `fecha` y `hora` ascendente y mapea cada fila a `MetricRecord` (`readings.ts:50-104`). `buildPlantsGridFromRecords()` reconstruye las 20 celdas y asigna como `latestMetric` el último elemento del historial ordenado; sin registros usa `pendingMetric()` (`plantMatrix.ts:158-188`, `:190-235`). Sin finca activa el tablero cae a una matriz vacía, pero la fuente de datos es la BD.

---

## 9. Mantenimiento, backup y auditoría

### Backup y restauración

```bash
# Copia lógica completa, esquema y datos.
pg_dump "$DATABASE_URL" -Fc -f "backup_macollo_$(date +%F).dump"

# Copia legible para revisión en el repositorio (sin credenciales).
pg_dump "$DATABASE_URL" -f "backup_macollo_$(date +%F).sql"

# Restauración en una base vacía.
pg_restore --clean --if-exists -d "$DATABASE_URL" "backup_macollo_$(date +%F).dump"
```

Respaldo antes de cada migración o sprint de campo; verificar con `psql "$DATABASE_URL" -c 'SELECT count(*) FROM lecturas;'`.

### Consultas de auditoría

```sql
-- A. Inventario completo de columnas (tipos, nulabilidad y defaults reales).
SELECT table_name, ordinal_position, column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- B. Columnas incorporadas por las migraciones 002 y 003.
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND ((table_name = 'fincas' AND column_name = 'sheets_url')
    OR (table_name = 'lecturas' AND column_name IN ('responsable', 'responsable_id')))
ORDER BY table_name, column_name;

-- C. Restricciones de unicidad y claves foráneas de lecturas.
SELECT conname, pg_get_constraintdef(oid) AS definicion
FROM pg_constraint
WHERE conrelid = 'public.lecturas'::regclass
ORDER BY conname;

-- D. Índices declarados (deben incluir los prefijados idx_* del esquema).
SELECT tablename, indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- E. Claves duplicadas en lecturas (debe devolver 0).
SELECT count(*) AS claves_duplicadas
FROM (
  SELECT finca_id, planta_id, fecha, hora
  FROM lecturas
  GROUP BY finca_id, planta_id, fecha, hora
  HAVING count(*) > 1
) d;

-- F. Integridad referencial: todos los conteos deben ser 0.
SELECT 'lecturas.finca_id' AS relacion, count(*) AS huerfanos
  FROM lecturas l LEFT JOIN fincas f ON f.id = l.finca_id WHERE f.id IS NULL
UNION ALL
SELECT 'lecturas.planta_id', count(*)
  FROM lecturas l LEFT JOIN plantas p ON p.id = l.planta_id WHERE p.id IS NULL
UNION ALL
SELECT 'lecturas.responsable_id', count(*)
  FROM lecturas l LEFT JOIN users u ON u.id = l.responsable_id
 WHERE l.responsable_id IS NOT NULL AND u.id IS NULL
UNION ALL
SELECT 'fincas.dueno_id', count(*)
  FROM fincas f LEFT JOIN users u ON u.id = f.dueno_id WHERE u.id IS NULL;

-- G. Cobertura del responsable textual frente al usuario vinculado.
SELECT count(*) AS total,
       count(*) FILTER (WHERE NULLIF(TRIM(responsable), '') IS NOT NULL) AS con_texto,
       count(*) FILTER (WHERE responsable_id IS NOT NULL) AS con_usuario,
       count(*) FILTER (WHERE NULLIF(TRIM(responsable), '') IS NULL AND responsable_id IS NULL) AS sin_responsable
FROM lecturas;

-- H. Distribución de roles y fincas por usuario.
SELECT role, count(*) AS usuarios FROM users GROUP BY role ORDER BY role;
SELECT dueno_id, count(*) AS fincas FROM fincas GROUP BY dueno_id ORDER BY fincas DESC;

-- I. Invitaciones vigentes y consumadas.
SELECT f.nombre, i.codigo, i.usos_maximos, i.usos_usados, i.activa, i.expira_en
FROM finca_invitaciones i
JOIN fincas f ON f.id = i.finca_id
WHERE i.activa AND i.expira_en > now() AND i.usos_usados < i.usos_maximos
ORDER BY i.expira_en;

-- J. Códigos de recuperación expirados (limpieza opcional).
SELECT count(*) AS expirados FROM verification_token WHERE expires < now();
DELETE FROM verification_token WHERE expires < now();

-- K. Volumen y tamaño por tabla.
SELECT relname, n_live_tup AS filas_estimadas
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;
SELECT pg_size_pretty(pg_total_relation_size('public.lecturas')) AS tamano_lecturas;

-- L. Cambios de rol recientes (updated_at no tiene trigger: se actualiza en app).
SELECT id, name, role, updated_at FROM users ORDER BY updated_at DESC LIMIT 20;
```

Cambio de rol controlado:

```sql
UPDATE users SET role = 'Agropecuario', updated_at = now()
WHERE lower(COALESCE(email, '')) = lower('x@y.z');
```

Los valores válidos son exactamente `Superadmin`, `Admin`, `Agropecuario` y `Campesino`. Archivar una finca es `UPDATE fincas SET activa = FALSE, updated_at = now() WHERE id = <id>;`; el borrado físico solo debe realizarse desde el flujo restringido a Superadmin.

---

## 10. Correcciones de deriva aplicadas

| Afirmación anterior                                                 | Realidad verificada                                                                                                                                            | Fuente                                                                                                                    |
| :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| «Los datos agronómicos no persisten / dataset en memoria».          | Persisten con upsert en `lecturas`; el tablero consulta PostgreSQL.                                                                                            | `src/pages/api/sync-sheets.ts:100-126`; `src/backend/services/readings.ts:85-191`; `docs/README.md:15` (índice obsoleto). |
| «`fincas` no tiene `sheets_url`».                                   | Columna `TEXT` nullable añadida por la migración 003 y presente en esquema, Neon y autoadición.                                                                | `src/db/migrations/003-add-sheets-url-to-fincas.sql:4`; `src/db/greenhouse-schema.sql:22`.                                |
| «`lecturas.responsable_id` proviene de la migración 002».           | La 002 añade `responsable TEXT`; `responsable_id` ya estaba en la 001 y en el esquema.                                                                         | `src/db/migrations/002-add-responsable-to-lecturas.sql:4`; `src/db/migrations/001-roles-farms.sql:128`.                   |
| «`responsable` es un alias de `responsable_id`».                    | Son dos columnas: texto de hoja y FK a `users`; en lectura se combinan con `COALESCE`.                                                                         | `src/backend/services/readings.ts:94,158-159`.                                                                            |
| «`hora` por defecto `09:00 AM`».                                    | El DDL fija `''`; el parser extrae la hora del campo de fecha y puede dejarla vacía.                                                                           | `src/db/greenhouse-schema.sql:84`; `src/shared/csv.ts:80-95`; `src/shared/recordsParser.ts:315,385`.                      |
| «`email` es único case-insensitive en la BD».                       | La restricción `UNIQUE` es case-sensitive; la comparación insensible se hace en la aplicación.                                                                 | `src/db/auth-schema.sql:34`; `auth.config.ts:94-102`.                                                                     |
| «Las tablas auxiliares están siempre vacías».                       | Correcto solo en condiciones determinadas: `accounts` sin Google, `sessions` con JWT; `verification_token` es transitorio y puede conservar códigos expirados. | `auth.config.ts:56,170-174`; `src/pages/api/auth/forgot-password.ts:87-94`.                                               |
| «`updated_at` se actualiza automáticamente».                        | Tiene valor por defecto, no trigger; se actualiza explícitamente en los servicios.                                                                             | `farms.ts:178,194`; `sync-sheets.ts:105`.                                                                                 |
| «`photos` se crea dentro de la transacción del esquema agronómico». | Se define después de `COMMIT` en ese archivo; en `migrate-neon.mjs` sí queda dentro de la transacción.                                                         | `src/db/greenhouse-schema.sql:104-132`; `scripts/migrate-neon.mjs:143-162`.                                               |
| «PostgreSQL 17» sin evidencia.                                      | Versión no fijada en los scripts; se documentan solo los tipos empleados.                                                                                      | `src/db/auth-schema.sql`; `src/db/greenhouse-schema.sql`.                                                                 |

---

## Trazabilidad

| Concepto                           | Archivo de código / esquema                                                                                                                    | Documento relacionado                                               | Verificación                                                                                                |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------- |
| Pool, SSL y tiempos de espera      | `src/db/client.ts:18-48`; `.env.example:2-7`                                                                                                   | `docs/DEPLOYMENT.md`, `docs/SECURITY.md`                            | Leído directamente; `DATABASE_URL` con SSL solo en producción.                                              |
| Enum y tablas de autenticación     | `src/db/auth-schema.sql:18-76`; `auth.config.ts:56,170-174`                                                                                    | `docs/AUTH.md`                                                      | `strategy: "jwt"`; `sessions` permanece sin filas en el flujo habitual.                                     |
| Multi-tenant y unicidad agronómica | `src/db/greenhouse-schema.sql:17-102`; `src/db/migrations/001-roles-farms.sql:51-134`                                                          | `docs/ARCHITECTURE.md`                                              | `UNIQUE (finca_id, planta_id, fecha, hora)` en ambos archivos.                                              |
| `responsable` y `responsable_id`   | `src/db/migrations/002-add-responsable-to-lecturas.sql:4`; `src/db/greenhouse-schema.sql:95-96`; `src/backend/services/readings.ts:94,141-179` | `docs/DATA-DICTIONARY.md`                                           | Columnas independientes; `COALESCE` en lectura y en upsert.                                                 |
| `sheets_url`                       | `src/db/migrations/003-add-sheets-url-to-fincas.sql:4`; `src/pages/api/sync-sheets.ts:20-31,45-49,78-110`                                      | `docs/ENDPOINTS.md`                                                 | No incluido en `FincaRow` (`farms.ts:9-20`); se gestiona desde `/api/sync-sheets`.                          |
| Deduplicación y persistencia       | `src/backend/services/readings.ts:123-191`; `src/pages/api/sync-sheets.ts:99-126`                                                              | `docs/ENDPOINTS.md`, `docs/USER_MANUAL.md`                          | `ON CONFLICT DO UPDATE`; transacción con `ROLLBACK` en error.                                               |
| Parser y formatos de fecha         | `src/shared/recordsParser.ts:252-405`; `src/shared/csv.ts:17-124`                                                                              | `docs/DATA-DICTIONARY.md`, `docs/FIELD-PROTOCOL.md`                 | Serial Excel 40000–60000 con época 1899-12-30; hora extraída del campo fecha.                               |
| Roles, invitaciones y acceso       | `src/backend/services/authz.ts:3-129`; `src/backend/services/farms.ts:28-56,308-398`                                                           | `docs/AUTH.md`, `docs/ROUTES.md`                                    | Código 8 caracteres; canje con `FOR UPDATE OF i`.                                                           |
| Migración y siembra Neon           | `scripts/migrate-neon.mjs:4-10,12-163`; `scripts/seed-production.mjs:4-11,21-175`                                                              | `docs/SCRIPTS.md`, `docs/DEPLOYMENT.md`                             | Llamadas `pool.query(SQL_MIGRATION)` y creación de Superadmin/finca/plantas/lecturas.                       |
| Backup y auditoría                 | Consultas de la §9                                                                                                                             | `docs/TROUBLESHOOTING.md`                                           | Consultas ejecutables contra `information_schema`, `pg_constraint`, `pg_indexes`.                           |
| Encabezado unificado               | Encabezado de este documento                                                                                                                   | `docs/README.md`, `docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md` | Texto requerido por la auditoría del 2026-11-23; la ruta `docs/UNIFIED/` no está presente en este checkout. |

---

# Capítulo 25. Diccionario de datos - Macollo (DOC-15)

**Ruta fuente:** `docs/DATA-DICTIONARY.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-15**.

## 1. Alcance y convenciones

Este documento define los tipos que cruzan la capa de datos (`MetricRecord`, `PlantMatrixItem`), las cabeceras y formatos que acepta la importación, las columnas que producen las exportaciones y su correspondencia con PostgreSQL. Los esquemas SQL, índices y consultas de auditoría se describen en DATABASE (Capítulo 24 · DOC-14).

| Fuente                                                                     | Qué autoriza                                                                                             |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `src/shared/plantMatrix.ts`                                                | Tipos, constantes, resolución de coordenadas y construcción de la matriz.                                |
| `src/shared/recordsParser.ts`                                              | Parser nuevo de registros: `indexHeaders`, `findHeaderRowIndex`, `buildRecordsFromRows` y `HeaderIndex`. |
| `src/shared/csv.ts`                                                        | Delimitadores, números, tokens nulos, fechas/seriales y derivaciones de sanidad/productividad.           |
| `src/shared/serialize.ts`, `src/shared/utils.ts`                           | Reexportaciones, escape y paleta de `avatarColorFor`.                                                    |
| `src/backend/services/sheetsSync.ts`                                       | Descarga y reexportación del parser.                                                                     |
| `src/backend/services/readings.ts`                                         | Traducción entre filas SQL y `MetricRecord`; upsert.                                                     |
| `src/backend/services/csvExport.ts`, `src/backend/services/excelExport.ts` | Columnas y formatos de salida.                                                                           |
| `docs/sample-readings-demo.csv`                                            | Fixture real de 20 filas.                                                                                |

Convenciones: «Sí» en la columna _Opcional_ significa que el campo puede no estar presente (`?` en TypeScript); «null» significa que la propiedad existe y admite `null`. Los tipos listados son los **declarados** en el código, no inferencias.

---

## 2. Modelo canónico en memoria

### 2.1 Constantes y tipos (`src/shared/plantMatrix.ts:1-11`)

| Símbolo             | Valor                                                     | Uso                                                                  |
| :------------------ | :-------------------------------------------------------- | :------------------------------------------------------------------- |
| `FILAS`             | `['t0','t1','t2','t3']`                                   | Filas de la matriz; coincide con el `CHECK` de `plantas.fila`.       |
| `COLUMNAS`          | `['Col 1','Col 2','Col 3','Col 4','Col 5']`               | Columnas de la matriz; coincide con el `CHECK` de `plantas.columna`. |
| `FILAS_POR_COLUMNA` | `5`                                                       | Divisor para calcular el número global de planta.                    |
| `TOTAL_PLANTAS`     | `20`                                                      | `(4 × 5)`.                                                           |
| `Fila`, `Columna`   | Uniones de los literales anteriores                       | Tipos de `MetricRecord` y `PlantMatrixItem`.                         |
| `Productividad`     | `'Alta' \| 'Media' \| 'Baja'`                             | No hay `CHECK` SQL sobre `lecturas.productividad`.                   |
| `Sanidad`           | `'Excelente' \| 'Saludable' \| 'Vulnerable' \| 'Crítica'` | No hay `CHECK` SQL sobre `lecturas.sanidad`.                         |

### 2.2 `MetricRecord` (`src/shared/plantMatrix.ts:13-38`)

| Campo             | Tipo TypeScript         | Opcional | Ejemplo                      | Origen / regla verificable                                                                                                                                   | Columna SQL equivalente                                        |
| :---------------- | :---------------------- | :------- | :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| `id`              | `string`                | No       | `LEC-128`                    | Desde BD: `` `LEC-${row.id}` `` (`readings.ts:56`). Desde hoja: `MET-GS-<code>-<fecha>-<r>` (`recordsParser.ts:377`).                                        | `lecturas.id` (con prefijo)                                    |
| `invernadero`     | `string`                | No       | `Finca demo`                 | Desde BD: `fincas.nombre` (`readings.ts:57,90`). Desde hoja: constante `'Invernadero Macollo'` (`recordsParser.ts:378`).                                     | `fincas.nombre`                                                |
| `fila`            | `Fila`                  | No       | `t1`                         | `resolvePlantCoordinates()` (`plantMatrix.ts:66-156`).                                                                                                       | `plantas.fila`                                                 |
| `columna`         | `Columna`               | No       | `Col 2`                      | `resolvePlantCoordinates()`.                                                                                                                                 | `plantas.columna`                                              |
| `plantId`         | `string`                | No       | `P-07`                       | `plantIdFor(filaIdx*5+colIdx+1)` (`plantMatrix.ts:58-60,148-155`).                                                                                           | `plantas.plant_id`                                             |
| `code`            | `string`                | No       | `T1-P2`                      | `codeFor(filaIdx, colIdx)` → `` `T${i}-P${j+1}` `` (`plantMatrix.ts:62-64`). En lectura BD se deriva de los dígitos de `plant_id` (`readings.ts:53-61`).     | Calculado; no existe columna                                   |
| `fecha`           | `string` (`YYYY-MM-DD`) | No       | `2026-10-09`                 | `extractDateAndHour()`; validado dos veces (`recordsParser.ts:315-316`, `readings.ts:135`).                                                                  | `lecturas.fecha` (`DATE`)                                      |
| `hora`            | `string`                | No       | `09:00 AM`                   | Extraída del valor de fecha; **puede ser `''`** (`csv.ts:80-95`).                                                                                            | `lecturas.hora` (`VARCHAR(20)`)                                |
| `timestampTexto`  | `string`                | No       | `2026-10-09, 09:00 AM`       | ``hora ? `${fecha}, ${hora}` : fecha`` (`recordsParser.ts:385`, `readings.ts:64`).                                                                           | Calculado; no existe columna                                   |
| `phSuelo`         | `number`                | No       | `6.4`                        | Parser: clamp 0–14 y 2 decimales, default `6.4` (`recordsParser.ts:318-320`). BD: `row.ph_suelo ?? 0` (`readings.ts:65`).                                    | `lecturas.ph_suelo` (`REAL`)                                   |
| `tempInterna`     | `number \| null`        | No       | `24.5`                       | Parser: 1 decimal, default `24.5`. BD: `null` si falta (`readings.ts:66`).                                                                                   | `lecturas.temp_interna`                                        |
| `tempInvernadero` | `number`                | **Sí**   | `24.5`                       | Alias de `tempInterna` en el parser (`recordsParser.ts:388`) y en lectura (`readings.ts:67`).                                                                | Sin columna propia                                             |
| `tempExterna`     | `number \| null`        | No       | `20.2`                       | Parser: 1 decimal, default `20.2`. BD: `row.temp_externa ?? null` (`readings.ts:68`).                                                                        | `lecturas.temp_externa`                                        |
| `tempSuelo`       | `number \| null`        | No       | `20.1`                       | Parser: 1 decimal; `null` si no se tomó (`recordsParser.ts:322-324`).                                                                                        | `lecturas.temp_suelo`                                          |
| `humedad`         | `number`                | **Sí**   | `65`                         | Parser: redondeo y clamp 0–100, default `65` (`recordsParser.ts:334-338`). BD: `undefined` si falta (`readings.ts:70`).                                      | `lecturas.humedad`                                             |
| `alturaCm`        | `number \| null`        | **Sí**   | `42`                         | Parser: 1 decimal; `null` si es token nulo (`recordsParser.ts:340-341`).                                                                                     | `lecturas.altura_cm`                                           |
| `crecimiento`     | `number`                | No       | `75`                         | De altura: `≤100` → altura redondeada; `>100` → `min(100, round(altura/150*100))`; default `75` (`recordsParser.ts:343-349`). BD: `?? 0` (`readings.ts:72`). | `lecturas.crecimiento`                                         |
| `faseCrecimiento` | `string`                | No       | `Floración`                  | De hoja; si falta, derivada de altura (`recordsParser.ts:357-364`). BD: `row.fase \|\| 'Sin registrar'` (`readings.ts:73`).                                  | `lecturas.fase`                                                |
| `productividad`   | `Productividad`         | No       | `Alta`                       | `deriveProductividad()` (`csv.ts:158-168`). BD: `row.productividad \|\| 'Media'` (`readings.ts:74-75`).                                                      | `lecturas.productividad`                                       |
| `sanidad`         | `Sanidad`               | No       | `Saludable`                  | `deriveSanidad(texto, phSuelo)` (`csv.ts:126-156`). BD: `row.sanidad \|\| 'Saludable'` (`readings.ts:76`).                                                   | `lecturas.sanidad`                                             |
| `responsable`     | `string`                | No       | `Equipo Demo`                | Texto de hoja (`recordsParser.ts:351-355`), o `COALESCE` con `users.name` y `'Sin registrar'` desde BD (`readings.ts:94,54`).                                | `lecturas.responsable` **y** `users.name` vía `responsable_id` |
| `responsableRol`  | `string`                | No       | `''`                         | Se inicializa vacío en el parser y en lectura (`recordsParser.ts:398`, `readings.ts:78`); se escribe en la columna «Cargo» del Excel (`excelExport.ts:167`). | Sin columna propia                                             |
| `avatarColor`     | `string`                | No       | `bg-emerald-500`             | `avatarColorFor(responsable)`: hash `hash*31 + charCode`, paleta de 8 clases (`utils.ts:21-38`).                                                             | Sin columna propia                                             |
| `observaciones`   | `string`                | **Sí**   | `Demo: planta de referencia` | De hoja o texto generado (`recordsParser.ts:371-374`). BD: `undefined` si es NULL (`readings.ts:80`).                                                        | `lecturas.observaciones`                                       |

### 2.3 `PlantMatrixItem` (`src/shared/plantMatrix.ts:40-48`)

| Campo          | Tipo             | Ejemplo   | Significado                                                                                                             |
| :------------- | :--------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------- |
| `fila`         | `Fila`           | `t0`      | Fila de la celda.                                                                                                       |
| `columna`      | `Columna`        | `Col 1`   | Columna de la celda.                                                                                                    |
| `plantId`      | `string`         | `P-01`    | Etiqueta global `P-NN`.                                                                                                 |
| `plantNumber`  | `number`         | `1`       | `filaIdx*5 + columnaIdx + 1` (1–20).                                                                                    |
| `code`         | `string`         | `T0-P1`   | `codeFor(filaIdx, columnaIdx)`.                                                                                         |
| `latestMetric` | `MetricRecord`   | `LEC-128` | Último elemento del historial ordenado por `fecha`, o `pendingMetric()` si no hay registros (`plantMatrix.ts:201-224`). |
| `history`      | `MetricRecord[]` | `[…]`     | Registros de la planta ordenados por `fecha` ascendente (`plantMatrix.ts:213`).                                         |

`buildEmptyPlantsGrid()` equivale a `buildPlantsGridFromRecords([])`: devuelve 20 celdas con `latestMetric` pendiente (`plantMatrix.ts:233-235`). Valores de `pendingMetric()` (`plantMatrix.ts:158-188`): `id = MET-<code>-PENDING`, `invernadero = 'Invernadero Macollo'`, `fecha = ''`, `hora = ''`, `timestampTexto = 'Sin mediciones'`, `phSuelo = 0`, temperaturas y `alturaCm` en `null`/ausentes, `crecimiento = 0`, `faseCrecimiento = 'Esperando datos'`, `productividad = 'Media'`, `sanidad = 'Saludable'`, `responsable = 'Sin registrar'`, `responsableRol = ''`, `avatarColor = 'bg-stone-500'` y `observaciones = 'Esperando sincronización de datos reales desde Google Sheets.'`.

### 2.4 Resolución de coordenadas (`src/shared/plantMatrix.ts:66-156`)

| Prioridad | Entrada aceptada                                                                  | Resultado                                     | Fuente                 |
| :-------- | :-------------------------------------------------------------------------------- | :-------------------------------------------- | :--------------------- |
| 1         | Formato compuesto `T0-P1`, `T1P4`, `T2_P3`, `T3.P5`, `TO-F2` (`O` equivale a `0`) | Fila `t0`–`t3` y columna `Col 1`–`Col 5`.     | `plantMatrix.ts:80-89` |
| 2         | `TRATAMIENTO/FILA/CAMA/BLOQUE/SECCION T<n>`, `T<n>` o dígito suelto `0`–`3`       | Fila; la columna se busca aparte.             | `:91-108`              |
| 3         | `P1`–`P5`, `PLANTA/COL/COLUMNA/SITIO <n>` o dígito `1`–`5`                        | Columna.                                      | `:110-132`             |
| 4         | Identificador global `P-01`…`P-20` (o `1`…`20`)                                   | `fila = floor((n-1)/5)`, `columna = (n-1)%5`. | `:134-143`             |
| 5         | Sin coincidencia                                                                  | `t0` / `Col 1` por defecto.                   | `:145-146`             |

La consecuencia operativa es que un `ID_planta` ilegible **no descarta la fila**: se asigna a la primera planta. Conviene auditar el fixture antes de importar.

---

## 3. Entrada: CSV y Google Sheets

### 3.1 Lectura del archivo (`src/shared/csv.ts:17-58`, `src/backend/services/sheetsSync.ts:56-90`)

`fetchSheetRecords(url)` descarga el CSV con `User-Agent: Macollo-Greenhouse-Sync/2.0` y `Accept: text/csv,text/plain,*/*`; si HTTP no es `ok` o quedan menos de dos filas, lanza `SheetsSyncError` con estado 422. `parseCSV()` normaliza CRLF/CR a LF, descarta líneas vacías, infiere el delimitador de la **primera línea no vacía** comparando recuentos de `,`, `;` y tabulador (preferencia: coma > `;` > tab en empate), respeta comillas dobles y recorta espacios de cada celda.

`findHeaderRowIndex()` examina como máximo las 10 primeras filas (`recordsParser.ts:252-285`) y declara cabecera la que cumple `(contiene ID de planta AND (fecha OR pH OR responsable)) OR (fecha AND (pH OR responsable))`. Si ninguna cumple, usa la fila 0.

`normalizeHeader()` (`recordsParser.ts:27-36`): minúsculas, descomposición NFD, eliminación de diacríticos, sustitución de caracteres fuera de `[a-z0-9_ ]` por espacio y colapso de espacios. Así, `ID_planta` → `id_planta`, `T_Ext_C` → `t_ext_c` y `Temperatura (°C)` → `temperatura c`.

### 3.2 Cabeceras reconocidas (`src/shared/recordsParser.ts:38-246`)

La coincidencia «exacta» se aplica sobre la cabecera normalizada; «contiene» significa `includes()` y «prefijo» `startsWith()`. La primera columna que coincide gana.

| Concepto (`HeaderIndex`) | Coincidencia exacta                                                                                  | Coincidencia adicional (`includes`/`startsWith`)                                             | Fallback / observación                                                                                                                                                                                                                         |
| :----------------------- | :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idPlanta`               | `id_planta`, `id planta`, `idplanta`, `id`, `plant_id`, `plant id`, `codigo_planta`, `codigo planta` | prefijo `id_planta`, sufijo `_id_planta`; cualquier cabecera con `id` **y** `plant`          | Si falta, se exploran **todas** las celdas de la fila buscando `T[0-3O]-P[1-5]` (`recordsParser.ts:298-311`). No hay índice para columnas auxiliares `fila`/`planta`: solo pueden influir si su valor contiene ese patrón y falta `ID_planta`. |
| `fecha`                  | —                                                                                                    | `fecha`, `date`, `dia`, `registro`                                                           | No existe índice de columna `hora`: se extrae del valor de fecha.                                                                                                                                                                              |
| `tempExt`                | `t_ext_c`, `t_ext`                                                                                   | `t_ext`, `temp_ext`, `t ext`, `externa`, `tout`, `exterior`                                  | Se resuelve **antes** que `tempInt`.                                                                                                                                                                                                           |
| `tempInt`                | `t_int_c`, `t_int`                                                                                   | `t_int`, `temp_int`, `t int`, cualquier cabecera con `temp` **y** `int`, o con `invernadero` | `tempInvernadero` es un alias en memoria.                                                                                                                                                                                                      |
| `humedad`                | `humedad_pct`, `humedad`                                                                             | `humedad`, `humidity`, prefijo `hum_`, `hum pct`                                             | Clamp 0–100.                                                                                                                                                                                                                                   |
| `tempSuelo`              | `t_planta_c`, `t_planta`                                                                             | `t_planta`, `temp_planta`, `t planta`, `piso`, `t_suelo`, `suelo`, `tsoil`                   | `N/D` se convierte en `null`.                                                                                                                                                                                                                  |
| `ph`                     | `ph`                                                                                                 | prefijo `ph_`/`ph `, o cualquier cabecera que contenga `ph`                                  | Clamp 0–14; default `6.4`.                                                                                                                                                                                                                     |
| `altura`                 | `altura_cm`, `altura`                                                                                | `altura`, prefijo `alt_`/`alt `, `crecimiento`, `growth`                                     | `crecimiento` de la hoja se interpreta como altura; el porcentaje se recalcula.                                                                                                                                                                |
| `fase`                   | —                                                                                                    | `fase`, `etapa`, `fenologia`                                                                 | Si falta, se deriva de la altura.                                                                                                                                                                                                              |
| `productividad`          | —                                                                                                    | `productividad`, `prod`, `rendimiento`, `frutos`                                             | `deriveProductividad()`.                                                                                                                                                                                                                       |
| `sanidad`                | —                                                                                                    | `sanidad`, `salud`, `fitosanitario`, `estado`, `vigor`                                       | `deriveSanidad()`; puede ser corregida por el pH.                                                                                                                                                                                              |
| `observaciones`          | —                                                                                                    | `observacion`, `notas`, `comentario`, `obs`, `detalles`                                      | Si falta, se genera texto automático.                                                                                                                                                                                                          |
| `hora`                   | **No se indexa**                                                                                     | —                                                                                            | `extractDateAndHour()` lee `HH:MM(:SS)? (AM\|PM)?` dentro de la celda de fecha (`csv.ts:81-95`).                                                                                                                                               |

### 3.3 Responsable (`src/shared/recordsParser.ts:67-141`)

Nivel 1 — coincidencia exacta (30 alias, `recordsParser.ts:68-99`): `responsable`, `responsables`, `responsable de toma`, `responsable toma`, `responsable de la toma`, `responsable de medicion`, `responsable medicion`, `responsable de campo`, `responsable campo`, `nombre responsable`, `nombre del responsable`, `tecnico responsable`, `operario responsable`, `operador`, `operario`, `tecnico`, `encargado`, `evaluador`, `observador`, `recolector`, `registrado por`, `tomado por`, `quien registra`, `responsible`, `operator`, `technician`, `evaluator`, `collector`, `recorded by`, `taken by`.

Nivel 2 — contiene (`recordsParser.ts:103-118`): `responsab`, `operari`, `operad`, `tecnic`, `evaluad`, `encargad`, `recolect`, `observad`, `tomado`, `registrado`, `quien registra`.

Nivel 3 — términos genéricos (`recordsParser.ts:121-141`): `nombre`, `persona`, `usuario`, `autor`, `personal`, `staff`, **solo si** la cabecera no contiene `plant`, `cultiv`, `finca`, `lote`, `especie`, `variedad`, `archivo` ni `invernadero`. Si no hay coincidencia, `responsable = 'Sin registrar'`.

### 3.4 Fecha, hora y seriales (`src/shared/csv.ts:73-124`)

| Formato de entrada                       | Regla                                                                 | Resultado                                                                                              |
| :--------------------------------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `YYYY-MM-DD`, `YYYY/MM/DD`, `YYYY.MM.DD` | `\b(202\d)[-/.](\d{1,2})[-/.](\d{1,2})\b`                             | `YYYY-MM-DD` con mes y día de dos dígitos.                                                             |
| `DD-MM-YYYY`, `DD/MM/YYYY`, `DD.MM.YYYY` | `\b(\d{1,2})[-/.](\d{1,2})[-/.](202\d)\b`                             | Se reordena a `YYYY-MM-DD`.                                                                            |
| Serial numérico de Excel                 | `40000 < serial < 60000`, época `1899-12-30` y `serial * 86400000` ms | Fecha civil en hora local; posteriormente se valida el patrón `YYYY-MM-DD`.                            |
| Hora incrustada                          | `(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM\|PM\|am\|pm)?`                  | `HH:MM AM\|PM`; si no hay sufijo, `≥12` → `PM`, otro → `AM`; `hh>12` se resta 12 y `hh===0` pasa a 12. |
| Otro valor                               | `raw.slice(0,10)`                                                     | La fila se descarta si no satisface `/^\d{4}-\d{2}-\d{2}$/`.                                           |

Las fechas textuales reconocidas se limitan al rango `2020`–`2029` por el patrón `202\d`; un año fuera de ese rango escrito como texto cae al fallback y se descarta. El rango de seriales cubre aproximadamente 2009–2064.

### 3.5 Números, tokens nulos y derivaciones

Tokens tratados como nulos (`src/shared/csv.ts:3-15`): `nd`, `n/d`, `na`, `n/a`, `-`, `--`, `null`, `no tomada`, `no medido`, `pendiente`, `''`. `parseCsvNumber()` reemplaza la **primera** coma por punto y descarta caracteres fuera de `[0-9.-]`; por tanto `6,4` y `6.4` son equivalentes (`csv.ts:60-71`).

| Campo calculado   | Fórmula verificable                                                                                                                                                                                                                            | Fuente                     |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| `phSuelo`         | `min(14, max(0, número))` con 2 decimales; defecto `6.4`                                                                                                                                                                                       | `recordsParser.ts:318-320` |
| `tempSuelo`       | número con 1 decimal; defecto `null`                                                                                                                                                                                                           | `:322-324`                 |
| `tempExterna`     | número con 1 decimal; defecto `20.2`                                                                                                                                                                                                           | `:326-328`                 |
| `tempInterna`     | número con 1 decimal; defecto `24.5`                                                                                                                                                                                                           | `:330-332`                 |
| `humedad`         | `round(clamp(número,0,100))`; defecto `65`                                                                                                                                                                                                     | `:334-338`                 |
| `alturaCm`        | número con 1 decimal; defecto `null`                                                                                                                                                                                                           | `:340-341`                 |
| `crecimiento`     | `≤100 → round(altura)`; `>100 → min(100, round(altura/150*100))`; sin altura `75`                                                                                                                                                              | `:343-349`                 |
| `responsable`     | texto recortado salvo token nulo; defecto `'Sin registrar'`                                                                                                                                                                                    | `:351-355`                 |
| `faseCrecimiento` | hoja; si falta: `altura>80 → 'Llenado de Fruto'`, `>40 → 'Floración'`, otro → `'Desarrollo Vegetativo'`                                                                                                                                        | `:357-364`                 |
| `productividad`   | `baja\|low\|1 → 'Baja'`; `med\|mid\|2 → 'Media'`; otro → `'Alta'`                                                                                                                                                                              | `csv.ts:158-168`           |
| `sanidad`         | `crit/mala/enferma/rojo → 'Crítica'`; `vuln/aten/regular/amarillo → 'Vulnerable'`; `excel/opt/muy buena → 'Excelente'`; si no hay texto: pH `<5.2` o `>7.8 → Crítica`, `<5.8` o `>7.2 → Vulnerable`, `6.2–6.7 → Excelente`, otro → `Saludable` | `csv.ts:126-156`           |
| `observaciones`   | texto de hoja; defecto `Medición de Google Sheets (<fecha>). Altura: <altura_cm o N/D>, Humedad: <humedad>%.`                                                                                                                                  | `recordsParser.ts:371-374` |

### 3.6 Identificadores generados y fixture

`buildRecordsFromRows()` produce `id = MET-GS-${coords.code}-${fecha}-${r}`, donde `r` es el **índice absoluto de la fila** en el arreglo devuelto por `parseCSV()` (base 0, cabecera incluida) (`recordsParser.ts:287-405`). Para la fila 2 de `docs/sample-readings-demo.csv`, el identificador es `MET-GS-T0-P1-2026-10-09-2`.

El fixture `docs/sample-readings-demo.csv:1-21` usa exactamente estas cabeceras: `ID_planta,fecha,responsable,T_Ext_C,T_Int_C,humedad_Pct,T_Planta_C,Ph,ALtura_cm,fase,productividad,sanidad,observacion`. Contiene 20 filas fechadas `2026-10-09` con responsable `Equipo Demo` y valores `N/D` en `T_Planta_C` (fila 14 del archivo), que se traducen a `tempSuelo = null`.

---

## 4. Salidas: CSV y Excel

### 4.1 CSV (`src/backend/services/csvExport.ts:3-60`)

`generateCsv(records)` emite BOM UTF-8 (`\uFEFF`), cabecera y filas separadas por `\r\n`; una celda se entrecomilla si contiene `"`, `,`, `\r`, `\n` o `;` y los comillas internos se duplican. Los números se imprimen con `String(value)`; `null`, `undefined` y `NaN` se dejan vacíos (`csvExport.ts:23-32`).

| #   | Cabecera CSV      | Origen en `MetricRecord` |
| :-- | :---------------- | :----------------------- |
| 1   | `Planta`          | `plantId`                |
| 2   | `Fila`            | `fila`                   |
| 3   | `Columna`         | `columna`                |
| 4   | `Fecha`           | `fecha`                  |
| 5   | `Hora`            | `hora`                   |
| 6   | `pH_Suelo`        | `phSuelo`                |
| 7   | `Temp_Interna_C`  | `tempInterna`            |
| 8   | `Temp_Externa_C`  | `tempExterna`            |
| 9   | `Temp_Suelo_C`    | `tempSuelo`              |
| 10  | `Humedad_Pct`     | `humedad`                |
| 11  | `Altura_cm`       | `alturaCm`               |
| 12  | `Crecimiento_Pct` | `crecimiento`            |
| 13  | `Fase`            | `faseCrecimiento`        |
| 14  | `Productividad`   | `productividad`          |
| 15  | `Sanidad`         | `sanidad`                |
| 16  | `Responsable`     | `responsable`            |
| 17  | `Observaciones`   | `observaciones`          |

El nombre de archivo del botón del tablero es `Macollo_Mediciones_Invernadero_<YYYY-MM-DD>.csv` (`src/frontend/components/Metrics.astro:2399`).

### 4.2 Excel (`src/backend/services/excelExport.ts:32-639`)

`generateExcelBuffer(plants)` devuelve un `ArrayBuffer` de ExcelJS con tres hojas.

**Hoja 1 «Mediciones de Hoy»** — 16 columnas, cabecera en la fila 4, una fila por planta con `latestMetric`, autofiltro `A4:P<n>` y fila «PROMEDIO GENERAL DEL CULTIVO» con `AVERAGE` en F–J (`excelExport.ts:94-111,137-175,289-358`).

| Col. | Cabecera                    | Origen                                              |
| :--- | :-------------------------- | :-------------------------------------------------- |
| A    | `Fila`                      | `PlantMatrixItem.fila`                              |
| B    | `Columna`                   | `PlantMatrixItem.columna`                           |
| C    | `ID Planta`                 | `plantId`                                           |
| D    | `Fecha`                     | `latestMetric.fecha`                                |
| E    | `Hora`                      | `latestMetric.hora`                                 |
| F    | `pH Suelo`                  | `phSuelo` (`0.0`)                                   |
| G    | `Temp. Int (°C)`            | `tempInterna` (`0.0" °C"`), `N/D` si es null        |
| H    | `Temp. Ext (°C)`            | `tempExterna`                                       |
| I    | `Temp. Suelo (°C)`          | `tempSuelo`                                         |
| J    | `Crecimiento (%)`           | `crecimiento` (`0"%"`)                              |
| K    | `Fase Fenológica`           | `faseCrecimiento`                                   |
| L    | `Productividad`             | `productividad`                                     |
| M    | `Sanidad`                   | `sanidad` (coloreada)                               |
| N    | `Responsable`               | `responsable`                                       |
| O    | `Cargo`                     | `responsableRol`                                    |
| P    | `Observaciones Agronómicas` | `observaciones` o `Condición óptima de desarrollo.` |

**Hoja 2 «Historial Completo»** — 14 columnas, cabecera en la fila 3, registros ordenados por `fecha + hora` descendente y autofiltro `A3:N<n>` (`excelExport.ts:379-492`).

| Col. | Cabecera      | Col. | Cabecera           |
| :--- | :------------ | :--- | :----------------- |
| A    | `ID Registro` | H    | `Temp. Int (°C)`   |
| B    | `ID Planta`   | I    | `Temp. Ext (°C)`   |
| C    | `Fila`        | J    | `Temp. Suelo (°C)` |
| D    | `Columna`     | K    | `Crecimiento (%)`  |
| E    | `Fecha`       | L    | `Sanidad`          |
| F    | `Hora`        | M    | `Productividad`    |
| G    | `pH Suelo`    | N    | `Responsable`      |

**Hoja 3 «Rangos Agronómicos»** — columnas `Parámetro`, `Rango Óptimo`, `Rango de Alerta`, `Unidad`, `Frecuencia`, `Acción Recomendada` (`excelExport.ts:531-608`). Filas: pH `6.0 a 6.8`; temperatura interna `22.0 °C a 26.0 °C`; externa `18.0 °C a 24.0 °C`; suelo `19.0 °C a 22.0 °C`; crecimiento `75 % a 100 %`; sanidad `Excelente / Saludable`.

Corrección de deriva: el nombre `Macollo_Mediciones_Invernadero_<fecha>.xlsx` no corresponde al Excel. El botón del tablero usa `Macollo_Mediciones_<YYYY-MM-DD>.xlsx` (`Metrics.astro:2362`) y el endpoint `GET /api/export-excel` usa `<finca_sanitizada>_Mediciones_<YYYY-MM-DD>.xlsx` (`src/pages/api/export-excel.ts:41-49`).

---

## 5. Correspondencia con PostgreSQL y deduplicación

| Campo / concepto                       | `lecturas` u otra tabla                                  | Escritura (`insertLecturas`)                                                                               | Lectura (`getLecturasByFinca` / `rowToRecord`)                               |
| :------------------------------------- | :------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| Planta                                 | `plantas(id, finca_id, fila, columna, plant_id)`         | `getPlantaMap()` indexa por `` `${fila}\|${columna}` ``; fila sin planta se omite (`readings.ts:106-137`). | `JOIN plantas` para `fila`, `columna`, `plant_id` (`:89-100`).               |
| Finca                                  | `fincas(id, nombre)`                                     | `finca_id` de la finca activa del contexto HTTP (`sync-sheets.ts:113-115`).                                | `fincas.nombre` → `invernadero` (`readings.ts:57,90`).                       |
| `fecha`, `hora`                        | `lecturas.fecha`, `lecturas.hora`                        | `r.fecha` debe cumplir `YYYY-MM-DD`; `r.hora \|\| ''` (`:135,165`).                                        | `toISODate()` y `row.hora \|\| ''` (`:45-52`).                               |
| Métricas y texto (excepto responsable) | `ph_suelo` … `sanidad`, `observaciones`                  | Se escriben como `NULL` cuando el campo no trae valor (`:166-178`).                                        | Valores defensivos (`?? 0`, `?? null`, `\|\| 'Media'`, etc.) en `:65-81`.    |
| `responsable`                          | `lecturas.responsable TEXT`                              | `(r.responsable \|\| '').trim() \|\| null` (`:139,176`).                                                   | `COALESCE(NULLIF(TRIM(l.responsable),''), u.name, 'Sin registrar')` (`:94`). |
| `responsable_id`                       | `lecturas.responsable_id → users(id) ON DELETE SET NULL` | ID del usuario autenticado que sincroniza (`sync-sheets.ts:114`).                                          | `LEFT JOIN users` para obtener `u.name` (`readings.ts:98`).                  |
| Identificador                          | `lecturas.id BIGSERIAL`                                  | Asignado por PostgreSQL.                                                                                   | `` `LEC-${row.id}` `` (`readings.ts:56`).                                    |

La clave de deduplicación es `UNIQUE (finca_id, planta_id, fecha, hora)` (`src/db/greenhouse-schema.sql:99`). `insertLecturas()` envuelve todas las filas en `BEGIN`/`COMMIT` y aplica `ON CONFLICT … DO UPDATE` (`readings.ts:133-183`):

- Se sobrescriben `ph_suelo`, temperaturas, humedad, altura, crecimiento, fase, productividad, sanidad y observaciones con los valores entrantes.
- `responsable` y `responsable_id` usan `COALESCE(EXCLUDED…, lecturas…)`: un valor NULL entrante **conserva** el anterior (`:158-159`).
- Ante cualquier error se ejecuta `ROLLBACK` y se libera el cliente (`:185-190`).
- El valor devuelto (`escritas`) cuenta las filas procesadas, no distingue inserción de actualización (`:181`).

Las semillas emplean `ON CONFLICT … DO NOTHING` (`scripts/seed-demo.mjs:159-165`, `scripts/seed-production.mjs:140-152`), por lo que son seguras frente a reprocesos del mismo día.

---

## 6. Correcciones de deriva aplicadas

| Afirmación anterior                                                             | Realidad verificada                                                                                                                                             | Fuente                                                              |
| :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| «Parser en `sheetsSync.ts`».                                                    | La lógica vive en `src/shared/recordsParser.ts` y se reexporta desde `sheetsSync.ts:10-11`.                                                                     | `sheetsSync.ts:3-11`; `recordsParser.ts:11-405`.                    |
| «Hora por defecto `09:00 AM`».                                                  | No hay columna `hora` en la cabecera ni default de aplicación: se extrae de la celda de fecha y puede ser `''`.                                                 | `csv.ts:80-95`; `greenhouse-schema.sql:84`; `recordsParser.ts:385`. |
| «`responsable_id` ↔ `responsable` como un solo campo».                          | `responsable` es texto de hoja; `responsable_id` es FK a `users`; se combinan solo en lectura.                                                                  | `readings.ts:94,158-159`; `migrations/002…:4`.                      |
| «Observaciones automáticas: _Medición real de Google Sheets_ + nota 29/30-sep». | Texto exacto: `Medición de Google Sheets (<fecha>). Altura: …, Humedad: …%.`                                                                                    | `recordsParser.ts:371-374`.                                         |
| «El sufijo de `id` es el número de fila de la planta».                          | Es el índice absoluto `r` de la fila del CSV (cabecera incluida).                                                                                               | `recordsParser.ts:377`.                                             |
| «`tempExterna` es `number`».                                                    | Es `number \| null` en `MetricRecord` y `REAL` nullable en SQL.                                                                                                 | `plantMatrix.ts:26`; `greenhouse-schema.sql:87`.                    |
| «Excel: `Macollo_Mediciones_Invernadero_<fecha>.xlsx`».                         | Ese formato corresponde al CSV; el Excel usa otros dos nombres según botón o endpoint.                                                                          | `Metrics.astro:2362`; `export-excel.ts:41-49`.                      |
| «Todo dato ausente se vuelve cero».                                             | Depende del campo: `phSuelo`/`crecimiento` → `0`; `tempSuelo`/`alturaCm` → `null`; humedad y temperatura interna → defaults; `responsable` → `'Sin registrar'`. | `recordsParser.ts:318-355`; `readings.ts:65-81`.                    |

---

## Trazabilidad

| Concepto                           | Archivo de código / esquema                                                                                  | Documento relacionado                                               | Verificación                                                                                                |
| :--------------------------------- | :----------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------- |
| `MetricRecord` y `PlantMatrixItem` | `src/shared/plantMatrix.ts:13-48`                                                                            | `docs/COMPONENTS.md`, `docs/ARCHITECTURE.md`                        | 24 campos del registro y 7 de la celda, listados sin campos inventados.                                     |
| Coordenadas y matriz 4 × 5         | `src/shared/plantMatrix.ts:1-11,58-156,190-235`                                                              | `docs/FIELD-PROTOCOL.md`, `docs/USER_MANUAL.md`                     | `TOTAL_PLANTAS = 20`; resolución con `O→0` y fallback `t0/Col 1`.                                           |
| Parser de registros                | `src/shared/recordsParser.ts:11-405`                                                                         | `docs/DATA-DICTIONARY.md` (este documento)                          | `HeaderIndex` con 13 claves; cabeceras y derivaciones transcritas del código.                               |
| CSV, seriales y derivaciones       | `src/shared/csv.ts:3-168`                                                                                    | `docs/DEMO-DATA.md`                                                 | Serial Excel 40000–60000 con época 1899-12-30; umbrales de pH de `deriveSanidad`.                           |
| Importación desde Sheets           | `src/backend/services/sheetsSync.ts:13-99`; `src/pages/api/sync-sheets.ts:37-126`                            | `docs/ENDPOINTS.md`                                                 | Normalización de URL, descarga CSV y persistencia de `sheets_url`.                                          |
| Escritura y deduplicación          | `src/backend/services/readings.ts:123-191`; `src/db/greenhouse-schema.sql:79-102`                            | `docs/DATABASE.md`                                                  | `UNIQUE (finca_id, planta_id, fecha, hora)` y `ON CONFLICT DO UPDATE`.                                      |
| Responsable doble representación   | `src/db/migrations/002-add-responsable-to-lecturas.sql:4`; `src/backend/services/readings.ts:94,139,158-159` | `docs/AUTH.md`, `docs/DATABASE.md`                                  | Columna de texto y FK independientes; `COALESCE` al leer y al actualizar.                                   |
| Exportación CSV                    | `src/backend/services/csvExport.ts:3-60`; `src/frontend/components/Metrics.astro:2399`                       | `docs/USER_MANUAL.md`                                               | 17 cabeceras, BOM y CRLF.                                                                                   |
| Exportación Excel                  | `src/backend/services/excelExport.ts:32-639`; `src/pages/api/export-excel.ts:41-49`                          | `docs/USER_MANUAL.md`                                               | Tres hojas, 16/14/6 columnas y nombres de archivo reales.                                                   |
| Fixture de campo                   | `docs/sample-readings-demo.csv:1-21`                                                                         | `docs/DEMO-DATA.md`, `docs/TESTING.md`                              | 20 filas, `2026-10-09`, `Equipo Demo`, `N/D` en `T_Planta_C`.                                               |
| Encabezado unificado               | Encabezado de este documento                                                                                 | `docs/README.md`, `docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md` | Texto requerido por la auditoría del 2026-11-23; la ruta `docs/UNIFIED/` no está presente en este checkout. |

---

# Capítulo 26. Protocolo de Campo - Toma de Datos (para operarios) (DOC-21)

**Ruta fuente:** `docs/FIELD-PROTOCOL.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-21**.

> Cómo llenar la hoja para que el sistema la entienda a la primera. Referencia técnica: DATA-DICTIONARY (Capítulo 25 · DOC-15). Guía de la app: USER_MANUAL (Capítulo 15 · DOC-10).

## 1. Antes de salir

- [ ] Celular con datos y la hoja del día abierta (una pestaña por fecha o una hoja con columna `fecha`).
- [ ] pH-metro calibrado, termómetros (aire + suelo), cinta métrica.
- [ ] Saber tu fila asignada (`t0–t3`) y que cada fila tiene 5 plantas (`P1–P5`).

## 2. Cómo identificar cada planta (importante)

Escribe el ID siempre igual, formato **`T{fila}-P{planta}`**: `T0-P1, T0-P2 … T3-P5`.
El sistema también entiende `TO-P2` (O por 0), `T1P4`, `T2_P3`, `P-07` o el número global 1–20, pero **usa `T{f}-P{c}`** para evitar errores. Nunca dejes el ID vacío.

## 3. Columnas mínimas de la hoja

| Columna       | Qué poner                 | Ejemplo                           |
| :------------ | :------------------------ | :-------------------------------- |
| `ID_planta`   | Código `T{f}-P{c}`        | `T1-P3`                           |
| `fecha`       | Día (y hora si la tienes) | `2026-10-09` o `09/10/2026 09:00` |
| `Ph`          | pH 0–14 con punto o coma  | `6,4` ✓                           |
| `T_Ext_C`     | Aire fuera (°C)           | `20.2`                            |
| `T_Int_C`     | Aire dentro (°C)          | `24.5`                            |
| `T_Planta_C`  | Suelo/planta (°C)         | `20.1`                            |
| `humedad_Pct` | %                         | `65`                              |
| `ALtura_cm`   | Altura en cm              | `42`                              |
| `responsable` | Tu nombre                 | `María Campo`                     |

Opcionales: `fase` (`Floración`…), `productividad` (`Alta/Media/Baja`), `sanidad` (`Excelente/Saludable/Vulnerable/Crítica`), `observacion`.

Si un sensor falló ese día, escribe **`N/D`** (no inventes números: el sistema lo marca gris y deriva la sanidad del pH).

## 4. Al terminar la jornada

1. Revisa: 20 filas (una por planta), sin IDs vacíos ni fechas mezcladas.
2. Comparte la hoja como **lectora** (_"Cualquier persona con el enlace puede ver"_) o **publícala como CSV**.
3. En la app, con la **cuenta dueña de la finca**, Historial → **Conectar Google Sheets** → pegar URL → confirmar el conteo (esperado: 20 por día). Los miembros pueden usar **Importar Excel/CSV**.
4. Verifica en el Dashboard que tu fila ya no esté gris.

## 5. Errores frecuentes

| Error                      | Qué hacer                                                                |
| :------------------------- | :----------------------------------------------------------------------- |
| Importa 0 registros        | Cabeceras con tildes/espacios raros o sin fila de datos; compara con §3. |
| Plantas en fila equivocada | IDs como `T1-P1` escritos como `TP1`; usa el formato exacto.             |
| Todo sale `N/D`            | Decimales con espacios o texto (`veinte`); usa números o `N/D`.          |
| La app dice 422            | La hoja no es pública: revisa el paso 2 del §4.                          |

## Trazabilidad

| Tema                     | Código / configuración                                              | Documento relacionado                                                    | Verificación            |
| :----------------------- | :------------------------------------------------------------------ | :----------------------------------------------------------------------- | :---------------------- |
| Columnas y normalización | `src/shared/recordsParser.ts`, `src/backend/services/sheetsSync.ts` | DATA-DICTIONARY (Capítulo 25 · DOC-15), DEMO-DATA (Capítulo 27 · DOC-22) | Importar CSV de ejemplo |

---

# Capítulo 27. Datos Demo - Macollo (DOC-22)

**Ruta fuente:** `docs/DEMO-DATA.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-22**.

> Para presentaciones, onboarding y pruebas (TEST-07) sin tocar datos reales.

## 1. Archivo

`sample-readings-demo.csv` (`./sample-readings-demo.csv`): **20 filas (T0-P1…T3-P5), fecha `2026-10-09`**, con casos pedagógicos:

- 🟢 Mayoría óptima (pH 6.0–6.8).
- 🟡 `T0-P3` (pH 5.7) y `T2-P4` (pH 5.4) en Atención.
- 🔴 `T1-P2` (pH 7.9) y `T3-P3` (pH 8.1) en Crítico.
- `T2-P3` con `T_Planta_C = N/D` (muestra el gris parcial + `N/D` en Excel).

El archivo usa el mismo contrato de columnas que acepta el importador (`src/pages/api/sync-sheets.ts`): `ID_planta, fecha, responsable, T_Ext_C, T_Int_C, humedad_Pct, T_Planta_C, Ph, ALtura_cm, fase, productividad, sanidad, observacion`. Cada fila se guarda como una **lectura** de esa planta en la **finca activa**.

## 2. Cómo usarlo (2 minutos)

1. Súbelo a Google Sheets (Archivo → Importar) **o** sírvelo local: `python3 -m http.server` en `docs/` y usa `http://localhost:8000/sample-readings-demo.csv`.
2. Hoja pública (paso 2 del FIELD-PROTOCOL (Capítulo 26 · DOC-21) §4).
3. En la app, con la **cuenta dueña** de la finca activa: Historial → Conectar Google Sheets → pegar URL → debe responder `count: 20`.
4. Dashboard: 16 🟢 + 2 🟡 + 2 🔴. Métricas: promedio pH ≈ 6.4.

## 3. Reglas

- Solo para demo/test; **nunca** mezclar con hojas reales (contamina el conteo y el Excel).
- Si necesitas otro escenario, duplica el archivo con otra fecha (el historial agrupa por `fecha`).
- Las lecturas demo quedan asociadas a la finca con la que sincronizaste; para limpiarlas usa los datos de esa finca.

## Trazabilidad

| Tema               | Código / configuración                                         | Documento relacionado                                                  | Verificación |
| :----------------- | :------------------------------------------------------------- | :--------------------------------------------------------------------- | :----------- |
| Fixture 20 plantas | `docs/sample-readings-demo.csv`, `src/shared/recordsParser.ts` | DATA-DICTIONARY (Capítulo 25 · DOC-15), TESTING (Capítulo 33 · DOC-17) | TEST-07      |

---

# Capítulo 28. Flujo de Datos Extremo a Extremo (DOC-33)

**Ruta fuente:** `docs/DATA-FLOW.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-33**.

## 1. Propósito

Este documento sigue una medición desde su origen (hoja de campo, Sheets o cámara) hasta su presentación y exportación. Es la vista complementaria de DOMAIN-MODEL (Capítulo 8 · DOC-32) (reglas) y INTEGRATIONS (Capítulo 29 · DOC-34)(sistemas externos). Cada flujo identifica el punto de validación, la transformación y el efecto persistente.

## 2. Mapa de transformaciones

| Etapa                 | Entrada                  | Transformación                                                             | Salida              | Código                                                |
| :-------------------- | :----------------------- | :------------------------------------------------------------------------- | :------------------ | :---------------------------------------------------- |
| Descarga              | URL de Sheets/Drive      | Normalización a `export?format=csv[&gid]`                                  | Texto CSV           | `src/backend/services/sheetsSync.ts:13-54`            |
| Parseo                | Texto CSV                | Delimitador automático, comillas, coma decimal                             | `string[][]`        | `src/shared/csv.ts:17-58`                             |
| Detección de cabecera | Filas                    | Búsqueda en las 10 primeras filas de `planta`+(`fecha`/`pH`/`responsable`) | Índice de cabecera  | `src/shared/recordsParser.ts:252-285`                 |
| Indexación            | Fila de cabecera         | Normalización sin tildes y synonyms                                        | `HeaderIndex`       | `src/shared/recordsParser.ts:27-246`                  |
| Resolución de planta  | `ID_planta`/fila/columna | Regex tolerante (`T0-P1`, `TO-P2`, `P-07`, `Planta 3`)                     | `PlantCoordinates`  | `src/shared/plantMatrix.ts:66-156`                    |
| Fecha                 | Celda `fecha`            | `YYYY-MM-DD`, `DD/MM/YYYY`, serial Excel, hora AM/PM                       | `{fecha, hora}`     | `src/shared/csv.ts:73-124`                            |
| Tipado y defaults     | Celdas numéricas         | Clamp, derivationes, responsable                                           | `MetricRecord`      | `src/shared/recordsParser.ts:287-405`                 |
| Persistencia          | `MetricRecord[]`         | Upsert transaccional por `(finca, planta, fecha, hora)`                    | Filas en `lecturas` | `src/backend/services/readings.ts:123-191`            |
| Agregación            | Filas de `lecturas`      | Join con `plantas`/`fincas`, `rowToRecord`                                 | `MetricRecord[]`    | `src/backend/services/readings.ts:50-104`             |
| Matriz                | `MetricRecord[]`         | 20 celdas con `latestMetric` + `history`                                   | `PlantMatrixItem[]` | `src/shared/plantMatrix.ts:190-235`                   |
| Vista                 | Matriz                   | Badges, promedios, alertas                                                 | UI + toasts         | `src/shared/badges.ts`, `alerts.ts`                   |
| Exportación           | Lecturas de la finca     | 3 hojas XLSX / CSV                                                         | Archivo binario     | `src/backend/services/excelExport.ts`, `csvExport.ts` |

## 3. Flujo A — Google Sheets a tablero

```mermaid
sequenceDiagram
    participant U as Dueño/miembro/staff
    participant UI as History.astro
    participant API as /api/sync-sheets
    participant DB as PostgreSQL
    participant GS as Google Sheets
    U->>UI: pega URL pública
    UI->>API: POST { url }
    API->>API: resolveActiveFinca + getFincaAccess + canConnectSheets
    API->>GS: GET export?format=csv (User-Agent propio)
    GS-->>API: CSV
    API->>API: parseCSV → buildRecordsFromRows
    API->>DB: UPDATE fincas.sheets_url (best-effort)
    API->>DB: insertLecturas (BEGIN/COMMIT)
    API-->>UI: { success, count, guardadas, records }
    UI->>UI: pinta matriz y tablero con records
```

Puntos de fallo y comportamiento:

- Sin finca activa: `400 { success:false, error }` (`sync-sheets.ts:53-63`).
- Sin permiso: `403` — reciben acceso **dueño, staff y miembro** (`authz.ts:127-129`), no solo el dueño.
- HTTP externo ≠ 2xx o CSV vacío/sin registros: `422` con instrucciones de permisos (`sheetsSync.ts:66-88`).
- Falla al guardar `sheets_url`: se registra `console.warn` y la sincronización continúa (`sync-sheets.ts:102-110`).
- Falla al insertar lecturas: se registra `console.error`, pero la respuesta sigue `success:true` con `guardadas: 0` (`sync-sheets.ts:112-126`). **Es una inconsistencia conocida**: el cliente cree que importó aunque no se persistió; ver ERROR-CATALOG (Capítulo 30 · DOC-35).

## 4. Flujo B — Importación local de Excel/CSV

El navegador parsea el archivo y envía los registros a `POST /api/farms/:id/readings`, que vuelve a validar sesión y membresía antes de `insertLecturas`. La ruta acepta `{ records }` y devuelve el número de filas escritas. La exportación inversa es `GET /api/export-excel` (3 hojas) o `GET /api/export-csv`. El detalle de columnas aceptadas está en DATA-DICTIONARY (Capítulo 25 · DOC-15) y la operación de campo en FIELD-PROTOCOL (Capítulo 26 · DOC-21).

```mermaid
flowchart LR
    X[XLSX/CSV local] -->|FileReader en cliente| R[MetricRecord[]]
    R -->|POST /api/farms/:id/readings| A[authz: miembro/staff]
    A --> I[insertLecturas: upsert]
    I --> P[(lecturas)]
    P --> E[export-excel / export-csv]
    P --> M[Matriz 4x5 → Dashboard/Metrics/History]
```

## 5. Flujo C — Lectura manual por API

Un integrador con sesión y acceso a la finca puede `POST /api/farms/:id/readings` con un arreglo de `records`; el servidor resuelve la planta por `(fila, columna)` contra la tabla `plantas` de esa finca. Las filas con fecha inválida o planta inexistente se omiten silenciosamente (`readings.ts:135-137`), por lo que el valor de `guardadas` puede ser menor que el tamaño del lote.

## 6. Flujo D — Clima y calidad del aire

1. El Dashboard solicita `navigator.geolocation` con timeout; si falla usa Medellín (6.2442, -75.5812).
2. `fetchWeatherData(lat, lon)` consulta Open-Meteo (temperatura, humedad, código WMO, viento y probabilidad de precipitación de la hora actual, `timezone=auto`).
3. Sin red, el cliente usa un fallback offline (22 °C, 60 %, viento 5 km/h, `source: 'Offline Fallback'`).
4. En paralelo, `GET /api/aqi?lat=&lon=` proxya WAQI.
5. El refresco es cada 10 minutos y la escena 3D ajusta sol/luna según la hora local.

> `GET /api/weather` existe como proxy SSR, pero el Dashboard actual consume Open-Meteo directamente desde el cliente (permitido por `connect-src`). SIATA queda como código latente (ADR-007). Detalle en INTEGRATIONS (Capítulo 29 · DOC-34).

## 7. Flujo E — Diagnóstico de trips y galería

```mermaid
sequenceDiagram
    participant M as Modal de cámara
    participant P as /api/trips-diagnosis
    participant ML as Cloud Run /api/predict
    participant G as /api/gallery/upload
    M->>P: POST multipart (file, crop, temperature_c, profile)
    P->>ML: POST /api/predict (X-API-Key, Cookie opcional)
    alt ML responde 401
        P->>ML: POST /api/auth/login y reintenta una vez
    end
    ML-->>P: diagnóstico JSON
    P-->>M: 200 JSON
    M->>G: POST multipart (file)
    G->>G: escribe public/uploads/gallery + fila en photos
    G-->>M: URL de la foto
```

Notas:

- No hay reintentos artificiales con `503` para simular calentamiento; el cambio `4e977f5` los eliminó. El proxy reintenta **una sola vez** ante `401` autenticándose al panel.
- `GET /api/trips-diagnosis` verifica `/api/health` y, si `model_loaded === false`, dispara `/api/warmup` en mejor esfuerzo; responde `warming_triggered`.
- Presupuesto: 50 s totales, timeout de 45 s por intento a `/api/predict`, 25 s para health, 10 s para login y warm-up (`trips-diagnosis.ts:24-26,61,182-193`).

## 8. Flujo F — Invitación a finca

```mermaid
sequenceDiagram
    participant O as Dueño
    participant API as /api/farms/:id/invitations
    participant I as /api/invitations/use
    participant N as Invitado
    O->>API: POST { expiraDias, usosMaximos }
    API-->>O: código de 8 caracteres + link /invite/CODE
    N->>N: GET /invite/CODE (peek)
    N->>I: POST { code } con sesión
    I->>I: transacción: valida cupo, descuenta uso, crea membresía
    I-->>N: finca activa fijada
```

## 9. Flujo G — Resumen semanal

`POST /api/notifications/weekly-summary` relee lecturas de la finca activa, calcula promedios y conteos, y envía correo vía SMTP. Requiere que la cuenta tenga `email`; si faltan credenciales SMTP responde `502`. La preferencia `macollo-notify-weekly` y la marca `macollo-weekly-summary-last` viven en `localStorage`, por lo que el disparo depende del navegador del usuario, no de un cron del servidor (`src/shared/preferences.ts:9-11,87-89`).

## 10. Consistencia, idempotencia y observabilidad

| Propiedad                   | Mecanismo                                                                      | Limitación                                                                                 |
| :-------------------------- | :----------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| Idempotencia de importación | Upsert por `(finca, planta, fecha, hora)`                                      | `hora` vacía colisiona con cualquier lectura sin hora del mismo día                        |
| Atomicidad                  | Transacción por lote en `insertLecturas`                                       | `sheets_url` se actualiza fuera de esa transacción                                         |
| Aislamiento                 | Scope por finca en todas las consultas                                         | El panel staff puede entrar a cualquier finca por diseño                                   |
| Trazabilidad de autor       | `responsable` + `responsable_id`                                               | Si el texto está vacío se muestra `Sin registrar`                                          |
| Registro de eventos         | `console.warn/error` con prefijos `[Sync]`, `[Notificaciones]`, `[PostgreSQL]` | No hay sistema central de logs ni métricas (ver OBSERVABILITY gaps (Capítulo 44 · DOC-40)) |

## 11. Trazabilidad

| Flujo             | Código                                             | Documento relacionado                  | Verificación                                   |
| :---------------- | :------------------------------------------------- | :------------------------------------- | :--------------------------------------------- |
| Sheets → lecturas | `sheetsSync.ts`, `recordsParser.ts`, `readings.ts` | ENDPOINTS (Capítulo 19 · DOC-12)       | `curl -X POST /api/sync-sheets -d '{"url":…}'` |
| CSV → lecturas    | `src/pages/api/farms/[id]/readings.ts`             | FIELD-PROTOCOL (Capítulo 26 · DOC-21)  | Importar fixture de demo                       |
| Clima             | `Dashboard.astro`, `weather.ts`, `aqi.ts`          | INTEGRATIONS (Capítulo 29 · DOC-34)    | Revisar `connect-src` y widget                 |
| IA y galería      | `trips-diagnosis.ts`, `gallery/upload.ts`          | CAMERA-ML (Capítulo 22 · DOC-26)       | `curl /api/trips-diagnosis`                    |
| Invitaciones      | `farms.ts`, `invitations/use.ts`                   | AUTH (Capítulo 20 · DOC-13)            | Canjear código de demo                         |
| Exportación       | `excelExport.ts`, `csvExport.ts`                   | DATA-DICTIONARY (Capítulo 25 · DOC-15) | Descargar y abrir `.xlsx`                      |

---

# Capítulo 29. Integraciones Externas y Contratos (DOC-34)

**Ruta fuente:** `docs/INTEGRATIONS.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-34**.

## 1. Propósito

Macollo no ejecuta modelos de visión, no genera clima y no entrega correo por sí mismo: orquesta servicios externos. Este documento enumera cada integración con su contrato, autenticación, timeout, fallback y modo de verificación. Es la referencia operativa de DATA-FLOW (Capítulo 28 · DOC-33) y ERROR-CATALOG (Capítulo 30 · DOC-35).

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
- WAQI devuelve el JSON del proveedor; si falla se responde `AQI 28` con ciudad Medellín. **Es un dato simulado**: la interfaz debe mostrarlo como estimación; ver ERROR-CATALOG (Capítulo 30 · DOC-35).
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

Riesgo documentado: existen valores por defecto para `ML_API_KEY` y para las credenciales del panel (`ML_ADMIN_USER`, `ML_ADMIN_PASSWORD`) en el código (`trips-diagnosis.ts:15-19,54-55`). Deben sobrescribirse en el entorno de despliegue y rotarse; ver THREAT-MODEL (Capítulo 40 · DOC-36).

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

| Integración | Código                            | Documento relacionado              | Verificación                              |
| :---------- | :-------------------------------- | :--------------------------------- | :---------------------------------------- |
| Sheets      | `sheetsSync.ts`, `sync-sheets.ts` | ENDPOINTS (Capítulo 19 · DOC-12)   | `curl -X POST /api/sync-sheets`           |
| Clima       | `weather.ts`, `Dashboard.astro`   | DATA-FLOW (Capítulo 28 · DOC-33)   | `curl '/api/weather?lat=6.24&lon=-75.58'` |
| AQI         | `aqi.ts`                          | USER_MANUAL (Capítulo 15 · DOC-10) | `curl '/api/aqi?lat=6.24&lon=-75.58'`     |
| ML          | `trips-diagnosis.ts`              | CAMERA-ML (Capítulo 22 · DOC-26)   | `curl /api/trips-diagnosis`               |
| Correo/SMS  | `notifications.ts`                | AUTH (Capítulo 20 · DOC-13)        | Solicitar recuperación de prueba          |
| OAuth       | `auth.config.ts`                  | AUTH (Capítulo 20 · DOC-13)        | Botón "Continuar con Google"              |
| DB          | `src/db/client.ts`                | DATABASE (Capítulo 24 · DOC-14)    | `SELECT 1;` desde el deploy               |

---

# Capítulo 30. Catálogo de Errores y Códigos de Respuesta (DOC-35)

**Ruta fuente:** `docs/ERROR-CATALOG.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-35**.

## 1. Propósito

Unificar, en un solo lugar, los códigos HTTP, los mensajes y las acciones correctoras de todos los subsistemas. Complementa TROUBLESHOOTING (Capítulo 35 · DOC-19) (árbol de decisión) y ENDPOINTS (Capítulo 19 · DOC-12) (contrato por ruta).

## 2. Códigos HTTP usados en el sistema

| Código | Significado general            | Ejemplos en Macollo                                                                |
| :----- | :----------------------------- | :--------------------------------------------------------------------------------- |
| `200`  | Operación correcta             | Lectura de sesión, sincronización, exportación, health online                      |
| `201`  | Recurso creado                 | `POST /api/auth/register`, creación de finca                                       |
| `400`  | Solicitud inválida             | Body Zod inválido, sin finca activa, dueño expulsado,.phone duplicado              |
| `401`  | Sin sesión                     | Middleware para APIs protegidas; `unauthorized()` en handlers                      |
| `403`  | Sin permiso                    | No miembro de la finca, roles insuficientes, usuario sin acceso                    |
| `404`  | No encontrado                  | Usuario inexistente en forgot/reset, foto/finca inexistente                        |
| `409`  | Conflicto                      | Límite de 5 fincas, usuario ya miembro, código de invitación agotado en Some flows |
| `410`  | Recurso expirado               | Invitación expirada/revocada/agotada                                               |
| `422`  | Entidad no procesable          | Sheets inaccessible, CSV vacío, sin registros válidos                              |
| `429`  | Demasiadas peticiones          | Rate limit por IP en register/forgot/reset/login/invitations/use                   |
| `500`  | Error interno                  | Fallo de PostgreSQL, ExcelJS, login de panel ML                                    |
| `502`  | Fallo de pasarela aguas arriba | Cloud Run no responde; SMTP no envió el resumen                                    |
| `503`  | Servicio no disponible         | Health de ML caído                                                                 |

> Los errores `401` del middleware usan `{ message: "No autenticado." }`; los del servicio de ML usan `{ error: "…" }`. No hay un esquema de error único: ver la sección de deuda.

## 3. Errores de autenticación y registro

| Mensaje / código                                                                     | Causa                                                            | Acción                                                                                      |
| :----------------------------------------------------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `Demasiados intentos. Intenta de nuevo en unos segundos.` (`429`, con `Retry-After`) | Superada una regla de `RATE_LIMITED` (`src/middleware.ts:30-37`) | Esperar el número de segundos indicado; en producción revisar IP compartida detrás de proxy |
| `No autenticado.` (`401`)                                                            | Falta de sesión en API protegida                                 | Iniciar sesión; conservar `?desde=` en páginas                                              |
| `El nombre completo es obligatorio.` (`400`)                                         | Zod `name.min(2)` en `register`                                  | Enviar al menos 2 caracteres                                                                |
| `Email o celular inválido o duplicado` (`400`)                                       | validación Zod o unicidad                                        | Usar otro correo/teléfono                                                                   |
| `La contraseña debe tener al menos 8 caracteres` (`400`)                             | Zod `password.min(8)`                                            | Aumentar longitud                                                                           |
| `Agropecuario sin fincaNombre` (`400`)                                               | Tipo de cuenta requiere nombre de finca                          | Enviar `fincaNombre`                                                                        |
| `Código incorrecto o expirado` (`400`)                                               | Token en `verification_token` no coincide o `expires <= NOW()`   | Solicitar un código nuevo                                                                   |
| `No encontramos ninguna cuenta asociada…` (`404`)                                    | `identifier` no existe en `users`                                | Verificar correo/celular                                                                    |

## 4. Errores de fincas, invitaciones y permisos

| Código                                               | Causa probable                                      | Acción                                              |
| :--------------------------------------------------- | :-------------------------------------------------- | :-------------------------------------------------- |
| `403 No tienes permiso para esta acción.`            | `getFincaAccess` devolvió `none` o rol insuficiente | Verificar `finca_miembros` y cookie `finca_activa`  |
| `409 Límite alcanzado: máximo 5 fincas por usuario.` | `MAX_FINCAS_POR_USUARIO` (`farms.ts:26`)            | Archivar o transferir una finca                     |
| `400 No se puede expulsar al dueño de la finca.`     | Intento de `removeMember` sobre `dueno_id`          | No aplicable; el dueño debe transferir              |
| `410`                                                | Invitación inactiva, expirada o sin cupos           | Generar un código nuevo                             |
| `400 Sin finca activa`                               | Cookie ausente o inválida                           | Elegir finca en `/farms` o `POST /api/farms/active` |

## 5. Errores de datos agronómicos

| Síntoma                                                   | Causa                                                  | Consecuencia           | Acción                                                                 |
| :-------------------------------------------------------- | :----------------------------------------------------- | :--------------------- | :--------------------------------------------------------------------- |
| `422 No se pudo acceder a Google Sheets / Drive (HTTP …)` | Documento no público                                   | Sin importación        | Compartir como "Cualquier persona con el enlace" o publicar como CSV   |
| `422 El documento descargado está vacío…`                 | Export CSV sin filas                                   | Sin importación        | Revisar la pestaña activa y el `gid`                                   |
| `422 No se pudieron extraer registros válidos…`           | Cabeceras o IDs de planta no reconocidos               | Sin importación        | Seguir FIELD-PROTOCOL (Capítulo 26 · DOC-21)                           |
| `guardadas < count`                                       | Filas con fecha inválida o planta inexistente omitidas | Importación parcial    | Revisar `resolvePlantCoordinates` y columnas                           |
| `success:true, guardadas:0`                               | Fallo de PostgreSQL al insertar, capturado y logueado  | **Pérdida silenciosa** | Revisar logs `[Sync] No se pudieron guardar las lecturas` y reintentar |
| Tarjetas `--` / `Sin mediciones`                          | No hay lecturas para la finca activa                   | UI vacía               | Importar datos o cambiar de finca                                      |
| pH 0 en métricas                                          | Defaults de `pendingMetric` o lectura sin pH           | Sesgo en promedios     | Filtrar `phSuelo > 0` en reportes                                      |

## 6. Errores de clima y servicios externos

| Endpoint / capa             | Respuesta ante fallo                           | Dato devuelto                                    | Advertencia                           |
| :-------------------------- | :--------------------------------------------- | :----------------------------------------------- | :------------------------------------ |
| `GET /api/weather`          | `200` con fallback                             | 22 °C, 60 %, 5 km/h, `source:'Offline Fallback'` | No es medición real                   |
| `GET /api/aqi`              | `200` con fallback                             | AQI 28, Medellín                                 | No es medición real                   |
| `GET /api/siata`            | `500 { error, details }`                       | —                                                | Timeout 3 s; endpoint latente         |
| `GET /api/trips-diagnosis`  | `503 { status:'offline' }`                     | —                                                | Modelo caído o sin cargar             |
| `POST /api/trips-diagnosis` | `502 { error }`                                | —                                                | Sin conexión con Cloud Run            |
| `POST /api/trips-diagnosis` | Código del ML (p. ej. `4xx/5xx`)               | Texto del error remoto                           | Revisar `X-API-Key` y cookie de panel |
| SMTP no configurado         | `sent:false` en recuperación; `502` en resumen | Código impreso en logs (solo/recuperación)       | No apto para producción               |

## 7. Errores de galería y archivos

| Código                                         | Causa                                  | Acción                                                                                    |
| :--------------------------------------------- | :------------------------------------- | :---------------------------------------------------------------------------------------- |
| `401 No autorizado`                            | Sin sesión al subir                    | Iniciar sesión                                                                            |
| `400 No se proporcionó ningún archivo válido.` | `formData.file` ausente o no es `Blob` | Enviar `multipart/form-data` con campo `file`                                             |
| `500 Error al guardar la foto en la galería.`  | Fallo de escritura o INSERT            | Revisar permisos de `public/uploads/gallery` y PostgreSQL                                 |
| Imagen no visible tras redeploy                | Filesystem efímero en serverless       | Migrar a almacenamiento de objetos (deuda, ver OPERATIONS-RUNBOOK (Capítulo 44 · DOC-40)) |

## 8. Errores de la capa de cliente

| Situación                               | Mecanismo                                           | Resultado                                                    |
| :-------------------------------------- | :-------------------------------------------------- | :----------------------------------------------------------- |
| Cámara bloqueada en HTTP por IP         | `getUserMedia` no disponible                        | El modal usa `input[capture]` (cámara nativa) o "Subir Foto" |
| Geolocalización rechazada/timeout       | `navigator.geolocation`                             | Coordenadas de Medellín                                      |
| Sin conexión                            | Fallback en `fetchWeatherData`                      | Datos climáticos de ejemplo                                  |
| `window.sileo` aún no montado           | Reintentos con 900 ms, máx. 3 (`alerts.ts:120-128`) | Toast puede no mostrarse                                     |
| Preferencias no persisten entre equipos | `localStorage`                                      | Comportamiento esperado; no es error de servidor             |

## 9. Deuda de consistencia del contrato de error

1. No existe un tipo `ApiError` único: conviven `{ message }`, `{ error }`, `{ success:false,error }` y `{ sent:false,message }`.
2. Algunos estados no distinguidos: un fallo de persistencia se reporta como éxito (`sync-sheets.ts:112-126`).
3. Los mensajes de Zod se devuelven en `message`, pero los errores de Sheets en `error`; los clientes deben leer ambos.
4. No hay identificador de correlación (request ID) en respuestas ni en logs. Recomendación: añadir `X-Request-Id` en `middleware.ts` y propagarlo a los `console.error`.

Propuesta de normalización (no implementada): `{ error: { code, message, details?, requestId } }` con `code` estable por dominio (`AUTH_001`, `FARM_003`, `SHEETS_422`, `ML_502`).

## 10. Trazabilidad

| Error        | Código                            | Documento relacionado                     | Verificación                       |
| :----------- | :-------------------------------- | :---------------------------------------- | :--------------------------------- |
| Rate limit   | `src/middleware.ts:30-37,100-127` | SECURITY (Capítulo 21 · DOC-24)           | 11 registros seguidos → `429`      |
| Registro     | `src/pages/api/auth/register.ts`  | AUTH (Capítulo 20 · DOC-13)               | Ver TESTING (Capítulo 33 · DOC-17) |
| Sheets       | `sheetsSync.ts`, `sync-sheets.ts` | DATA-FLOW (Capítulo 28 · DOC-33)          | URL inválida → `422`               |
| Persistencia | `readings.ts:123-191`             | OPERATIONS-RUNBOOK (Capítulo 44 · DOC-40) | Forzar fallo de BD en staging      |
| ML           | `trips-diagnosis.ts`              | CAMERA-ML (Capítulo 22 · DOC-26)          | `ML_API_URL` inválida → `503`      |
| Clima        | `weather.ts`, `aqi.ts`            | INTEGRATIONS (Capítulo 29 · DOC-34)       | Bloquear dominio en DevTools       |
| Galería      | `gallery/upload.ts`               | COMPONENTS (Capítulo 23 · DOC-27)         | Subir archivo vacío → `400`        |

---

# Capítulo 31. Migraciones de Esquema y Evolución de la Base de Datos (DOC-44)

**Ruta fuente:** `docs/MIGRATIONS.md` · **Parte:** Parte III. Arquitectura de ejecución e integraciones

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-44**.

## 1. Propósito

Describir el orden seguro de aplicación del esquema, las migraciones disponibles, los ajustes que la aplicación realiza en caliente y los procedimientos de verificación y reversión. Complementa DATABASE (Capítulo 24 · DOC-14) (estructura actual) y DEPLOYMENT (Capítulo 32 · DOC-16) (despliegue).

## 2. Orden de aplicación

```bash
# 1. Dominio de autenticación (crea users, accounts, sessions, verification_token, enum)
psql "$DATABASE_URL" -f src/db/auth-schema.sql

# 2. Dominio agronómico (fincas, memb resías, invitaciones, plantas, lecturas)
psql "$DATABASE_URL" -f src/db/greenhouse-schema.sql

# 3. Migraciones incrementales (idempotentes)
psql "$DATABASE_URL" -f src/db/migrations/001-roles-farms.sql
psql "$DATABASE_URL" -f src/db/migrations/002-add-responsable-to-lecturas.sql
psql "$DATABASE_URL" -f src/db/migrations/003-add-sheets-url-to-fincas.sql
```

> El esquema agronómico base ya incluye `responsable`, `responsable_id` y `sheets_url`; las migraciones 002 y 003 existen para bases creadas con versiones anteriores. Ejecutarlas sobre una base actual es inofensivo (`IF NOT EXISTS`).

## 3. Catálogo de migraciones

| Archivo                               | Propósito                                                                                                                 | Sentencia clave                                                   | Idempotente | Aplicar cuándo                  |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------- | :---------- | :------------------------------ |
| `001-roles-farms.sql`                 | Renombra valores antiguos del enum (`Super admin`→`Superadmin`, `Agronomo`→`Agropecuario`) y crea/ajusta tablas de fincas | `ALTER TYPE ... RENAME VALUE` condicional                         | Sí          | Bases con roles legacy          |
| `002-add-responsable-to-lecturas.sql` | Añade autor de la medición                                                                                                | `ALTER TABLE lecturas ADD COLUMN IF NOT EXISTS responsable TEXT;` | Sí          | Bases sin columna `responsable` |
| `003-add-sheets-url-to-fincas.sql`    | Persiste la URL de Sheets por finca                                                                                       | `ALTER TABLE fincas ADD COLUMN IF NOT EXISTS sheets_url TEXT;`    | Sí          | Bases sin columna `sheets_url`  |

## 4. Ajustes en caliente desde la aplicación

El código ejecuta DDL ligero de forma defensiva. Es una decisión práctica para entornos donde el pipeline de migraciones no está automatizado; tiene implicaciones de permisos (ver R-07 en THREAT-MODEL (Capítulo 40 · DOC-36)).

| Función                      | Ubicación                               | Sentencia                                                        | Comportamiento si falla                                 |
| :--------------------------- | :-------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------ |
| `ensureResponsableColumn()`  | `src/backend/services/readings.ts:9-21` | `ALTER TABLE lecturas ADD COLUMN IF NOT EXISTS responsable TEXT` | Registra flag en memoria y continúa; la app no se rompe |
| `ensureFincasSheetsColumn()` | `src/pages/api/sync-sheets.ts:20-31`    | `ALTER TABLE fincas ADD COLUMN IF NOT EXISTS sheets_url TEXT`    | Igual que arriba                                        |

Ambas usan una variable module-scope para ejecutar la comprobación una sola vez por proceso. En serverless con muchas instancias, cada una lo intentará una vez.

## 5. Scripts de apoyo

| Script                        | Uso                                                                         | Efecto                                                 |
| :---------------------------- | :-------------------------------------------------------------------------- | :----------------------------------------------------- |
| `scripts/migrate-neon.mjs`    | Aplica esquemas/migraciones a una cadena de conexión Neon/PostgreSQL remota | Lee `DATABASE_URL`/argumentos; crea tablas y columnas  |
| `scripts/seed-admin.mjs`      | Crea/actualiza cuenta privilegiada                                          | Solicita `ADMIN_EMAIL`, `ADMIN_PASSWORD`, rol opcional |
| `scripts/seed-demo.mjs`       | Siembra "Finca demo" con 20 plantas y lecturas                              | Datos de ejemplo para demos                            |
| `scripts/seed-production.mjs` | Siembra datos base de producción                                            | Requiere revisión explícita antes de ejecutar          |

Detalle de variables y precauciones en SCRIPTS (Capítulo 38 · DOC-25).

## 6. Procedimiento de migración en producción

1. **Aviso**: ventana de bajo uso;notificar a los dueños de finca.
2. **Backup**: `pg_dump "$DATABASE_URL" -Fc -f "pre_migracion_$(date +%F_%H%M).dump"` y guardar el SHA256.
3. **Ensayo**: restaurar en `macollo_staging` y aplicar la migración allí.
4. **Verificación en staging**: consultas de la sección 7 + recorrido de las rutas afectadas.
5. **Aplicación**: ejecutar la migración en producción con el mismo orden del §2.
6. **Verificación post**: repetir consultas y ejecutar el chequeo de OPERATIONS-RUNBOOK (Capítulo 44 · DOC-40) §5.
7. **Registro**: actualizar CHANGELOG (Capítulo 39 · DOC-28) y esta guía.

## 7. Consultas de verificación

```sql
-- Tablas esperadas
SELECT table_name FROM information_schema.tables
WHERE table_schema='public'
  AND table_name IN ('users','accounts','sessions','verification_token',
                     'fincas','finca_miembros','finca_invitaciones','plantas','lecturas','photos')
ORDER BY table_name;

-- Columnas nuevas
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name='lecturas' AND column_name IN ('responsable','responsable_id');
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name='fincas' AND column_name='sheets_url';

-- Roles exactos
SELECT unnest(enum_range(NULL::user_role_enum)) AS rol;

-- Integridad de la matriz (debe dar 20 para cada finca)
SELECT f.id, f.nombre, count(p.id) AS plantas
FROM fincas f LEFT JOIN plantas p ON p.finca_id=f.id
GROUP BY f.id, f.nombre ORDER BY f.id;

-- Unicidad de lecturas (debe devolver 0)
SELECT finca_id, planta_id, fecha, hora, count(*)
FROM lecturas GROUP BY 1,2,3,4 HAVING count(*) > 1;

-- Invitaciones consistentes (no debería devolver filas)
SELECT * FROM finca_invitaciones
WHERE usos_usados > usos_maximos OR expira_en < NOW() AND activa;
```

## 8. Reversión

| Situación                                     | Acción                                                                       |
| :-------------------------------------------- | :--------------------------------------------------------------------------- |
| Migración `ADD COLUMN` sin datos dependientes | `ALTER TABLE … DROP COLUMN …;` tras confirmar que ningún handler la usa      |
| Renombrado de enum                            | Recrear el valor anterior solo si no hay datos que lo usen; requiere cuidado |
| Carga masiva incorrecta                       | `ROLLBACK` si está en transacción; si no, restaurar desde backup             |
| Peor caso                                     | Restaurar dump completo en una BD nueva y cambiar `DATABASE_URL`             |

**No existe un mecanismo de down automático**: todas las migraciones se consideran forward-only. Cualquier reversión se documenta en el CHANGELOG.

## 9. Riesgos específicos

1. Un rol de BD sin permisos DDL hace que los `ensure...` fallen silenciosamente; la columna debe crearse con la migración.
2. `ALTER TABLE` Bloquea la tabla brevemente; en tablas grandes programar fuera de horario hábil.
3. `gen_random_uuid()` requiere la extensión `pgcrypto` en versiones antiguas de PostgreSQL.
4. `sheets_url` guarda una URL proporcionada por el usuario; junto con R-03 (SSRF) conviene validarla antes de persistir.
5. Los backups lógicos no incluyen archivos de `public/uploads/gallery`.

## 10. Trazabilidad

| Elemento            | Código                          | Documento relacionado                     | Verificación                  |
| :------------------ | :------------------------------ | :---------------------------------------- | :---------------------------- |
| Esquema base        | `src/db/*.sql`                  | DATABASE (Capítulo 24 · DOC-14)           | Consultas §7                  |
| Migraciones         | `src/db/migrations/*`           | DATABASE (Capítulo 24 · DOC-14)           | `psql -f` en staging          |
| Ajustes en caliente | `readings.ts`, `sync-sheets.ts` | DATA-FLOW (Capítulo 28 · DOC-33)          | Revisar logs                  |
| Neon                | `scripts/migrate-neon.mjs`      | SCRIPTS (Capítulo 38 · DOC-25)            | Ejecutar con cadena de prueba |
| Backup              | `pg_dump`                       | OPERATIONS-RUNBOOK (Capítulo 44 · DOC-40) | `pg_restore`                  |
| Cambios             | `git log`                       | CHANGELOG (Capítulo 39 · DOC-28)          | Revisión por release          |

---

# Capítulo 32. Despliegue y Operación - Macollo (DOC-16)

**Ruta fuente:** `docs/DEPLOYMENT.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-16**.
>
> Fuentes: `astro.config.mjs`, `package.json`, `.env.example`, `src/middleware.ts`, `src/db/client.ts`, `auth.config.ts`, `src/pages/api/trips-diagnosis.ts`, `scripts/*.mjs`, `.husky/pre-commit`, `git log -15` y los documentos de seguridad/roadmap citados. Este documento es operativo: cada afirmación verificable lleva `ruta:línea`.

---

## 1. Topología y correcciones al documento anterior

| Elemento                 | Valor real verificado                                                                                  | Evidencia                                                                                   |
| :----------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| Tipo de salida           | SSR obligatorio (`output: "server"`); no hay sitio estático                                            | `astro.config.mjs:14`                                                                       |
| Adaptador                | `@astrojs/vercel` con `maxDuration: 60`                                                                | `astro.config.mjs:5,19`; `package.json:18`                                                  |
| Duración de función      | **60 s**, no ~10 s. La ruta ML también declara `export const maxDuration = 60`                         | `astro.config.mjs:15-19`; `src/pages/api/trips-diagnosis.ts:4-7`                            |
| Protección CSRF de Astro | **`security.checkOrigin: true`** (el documento anterior decía `false`)                                 | `astro.config.mjs:13`                                                                       |
| Sitio canónico           | `https://macollo.tech`, sobreescribible con `SITE`                                                     | `astro.config.mjs:12`; commit `84ce2a9` (2026-11-10)                                        |
| Gestor de paquetes       | `pnpm` (`pnpm-lock.yaml` presente); **no hay scripts `npm` propios**                                   | `package.json:8-15`; `pnpm-lock.yaml`                                                       |
| Node                     | `>=22.12.0`                                                                                            | `package.json:5-7`                                                                          |
| Servicio ML              | FastAPI + BioCLIP 2.5 en **Google Cloud Run**, fuera de Vercel; Macollo solo actúa como proxy SSR      | `src/pages/api/trips-diagnosis.ts:9-13`; `docs/CAMERA-ML.md`                                |
| Base de datos            | PostgreSQL en la nube (Neon en el despliegue documentado). Sin disco persistente en Vercel             | `src/db/client.ts:18-44`; `scripts/migrate-neon.mjs:3-10`                                   |
| Último cambio relevante  | `4e977f5` (2026-11-11): inferencia directa sin retardos artificiales de 503 en el diagnóstico de trips | `git log -15`; `src/pages/api/trips-diagnosis.ts:98-173`                                    |
| Ruta de la landing       | `/landing` en el mismo deployment; dominio de publicación pendiente de definición                      | `src/pages/landing.astro`; LANDING (Capítulo 18 · DOC-47), ADR-008 (Apéndice A.8 · ADR-008) |

### 1.1 Dominios y la landing

La landing se publica inicialmente como `/landing` en el mismo deployment, accesible también en `localhost:4321`. `src/middleware.ts` **no tiene lógica de host**: no hay redirecciones ni allowlist de dominios, y `astro.config.mjs` no se modifica (`site` sigue siendo `https://macollo.tech` por defecto, sobreescribible con `SITE`). El canonical de la landing se deriva de la petición y sus enlaces son relativos, de modo que funcionan con cualquier dominio.

Cuando se defina el dominio definitivo, se decidirá si se publica en un subdominio del mismo proyecto (añadiéndolo en _Settings → Domains_ con su CNAME) o en un proyecto estático aparte; esa decisión se registrará en un ADR. Ver LANDING (Capítulo 18 · DOC-47) (DOC-47) y ADR-008 (Apéndice A.8 · ADR-008).

**Consecuencia operativa de `checkOrigin: true`:** en peticiones no seguras (`POST`/`PUT`/`PATCH`/`DELETE`) Astro exige que el header `Origin` sea igual al `origin` de la URL cuando el `Content-Type` es `application/x-www-form-urlencoded`, `multipart/form-data` o `text/plain`; si no, responde `403 Cross-site POST form submissions are forbidden` (`node_modules/astro/dist/core/app/origin-check.js:2-26`). Esto afecta, por ejemplo, a `POST /api/trips-diagnosis` y `POST /api/gallery/upload` (`multipart/form-data`). Los `curl` con `Content-Type: application/json` no están sujetos a esa comprobación, pero se documenta enviar `-H "Origin: $BASE"` en todos los `POST` de esta guía para que la prueba sea idéntica a la del navegador.

`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md` se cita en el encabezado por convención de la documentación unificada y **sí está presente** en el árbol como artefacto derivado (junto con el DOCX, el PDF y `manifest.json`). No se edita a mano: se regenera con el proceso de unificación (generador no incluido). El índice navegable es `docs/README.md`.

---

## 2. Matriz completa de variables de entorno

Leyenda de obligatoriedad: **Sí-prod** = la aplicación no arranca o no es funcional en producción; **Sí-tarea** = la exige un script concreto; **Cond.** = solo si se habilita esa integración; **No** = tiene default seguro o es informativa.

| Variable                                                           | Obligatoria         | Default                                                              | Dónde se usa                                                                                                                                  | Consecuencia de falta / nota operativa                                                                                                                                                                    |
| :----------------------------------------------------------------- | :------------------ | :------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                                                     | Sí-prod             | — (si falta, se usan `POSTGRES_*`)                                   | Pool `pg`: `src/db/client.ts:19-29`; seeders `seed-admin.mjs:29-36`, `seed-demo.mjs:23-30`; `migrate-neon.mjs:4-5`, `seed-production.mjs:4-6` | Sin URL ni `POSTGRES_*` completos: conecta a `localhost`, falla en Vercel con `[PostgreSQL] Error…` y `500` en rutas de datos. Precede a las variables separadas.                                         |
| `POSTGRES_HOST`                                                    | Cond.               | `localhost`                                                          | `src/db/client.ts:31`; `seed-admin.mjs:38`; `seed-demo.mjs:32`                                                                                | En Vercel apunta a un host inexistente → timeout (`connectionTimeoutMillis: 5000` con URL / `2000` sin URL, `client.ts:26-28,41-42`).                                                                     |
| `POSTGRES_PORT`                                                    | Cond.               | `5432`                                                               | `src/db/client.ts:32`; `seed-admin.mjs:39`; `seed-demo.mjs:33`                                                                                | Puerto erróneo → `ECONNREFUSED` / timeout.                                                                                                                                                                |
| `POSTGRES_USER`                                                    | Cond.               | `postgres`                                                           | `src/db/client.ts:33`; `seed-admin.mjs:40`; `seed-demo.mjs:34`                                                                                | Usuario sin permisos → `permission denied` en login y migraciones.                                                                                                                                        |
| `POSTGRES_PASSWORD`                                                | Cond.               | `""` (vacío)                                                         | `src/db/client.ts:34`; `seed-admin.mjs:41`; `seed-demo.mjs:35`                                                                                | Conexión rechazada; rotar junto con `DATABASE_URL` tras exposición (riesgo SEC-08, `docs/SECURITY.md`).                                                                                                   |
| `POSTGRES_DATABASE`                                                | Cond.               | `astro_auth_db`                                                      | `src/db/client.ts:35`; `seed-admin.mjs:42`; `seed-demo.mjs:36`                                                                                | Si la BD creada se llama `invernadero` y no se define, busca `astro_auth_db` → `database … does not exist`.                                                                                               |
| `NODE_ENV`                                                         | No (lo fija Vercel) | `production` en Vercel                                               | SSL PG `src/db/client.ts:23-25,37-39`; validación de secreto `auth.config.ts:30`; cookie `Secure` `authz.ts:141`                              | Si falta en un despliegue externo: SSL desactivado y no se exige `AUTH_SECRET`. No fijarlo a mano en Vercel.                                                                                              |
| `AUTH_SECRET`                                                      | Sí-prod             | Clave temporal solo en desarrollo (`auth.config.ts:33-37,175`)       | `auth.config.ts:28-32,175`                                                                                                                    | En producción lanza `[Auth] Falta AUTH_SECRET en variables de entorno (.env)` durante el arranque. Generar con `openssl rand -base64 32`.                                                                 |
| `SESSION_MAX_AGE_HOURS`                                            | No                  | `24` (mínimo efectivo 1 h)                                           | `auth.config.ts:42-52`; expiración absoluta en `jwt` `auth.config.ts:187-204`                                                                 | Sin valor: sesión de 24 h. Valores no numéricos o ≤ 0 caen al default. Cambiarlo **no cierra** sesiones ya emitidas de inmediato.                                                                         |
| `AUTH_TRUST_HOST`                                                  | Sí-prod             | — (`true` en `.env.example:16` y `scripts/run-lan.sh:35`)            | `@auth/core/lib/utils/env.js:41`; además `trustHost: true` fijo en `auth.config.ts:55`                                                        | Sin él, Auth.js puede rechazar peticiones detrás de proxy si no se reconoce el host. **No sustituye** los headers `x-forwarded-*`: el middleware reescribe URL y `AUTH_URL` en `src/middleware.ts:78-95`. |
| `AUTH_URL`                                                         | No                  | Lo deriva Auth.js; el middleware lo recalcula                        | `.env.example:18` (comentado); `src/middleware.ts:94`                                                                                         | No definirlo a mano en Vercel: el middleware lo sobreescribe con `${x-forwarded-proto}://${x-forwarded-host}/api/auth` cuando detecta proxy.                                                              |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`                        | Cond.               | `""`                                                                 | Provider Google en `auth.config.ts:58-68`                                                                                                     | Sin ellos el botón «Continuar con Google» no puede autenticar. El login por credenciales sigue funcionando. Registrar callback `https://macollo.tech/api/auth/callback/google`.                           |
| `SMTP_USER` / `SMTP_PASS`                                          | Cond.               | — (alias: `GMAIL_USER` / `GMAIL_APP_PASSWORD`)                       | `src/backend/services/notifications.ts:27-28,230-231`; recuperación `forgot-password.ts:109`                                                  | Sin ellos `sendRecoveryEmail` devuelve `MISSING_SMTP_CONFIG` y **escribe el código de 6 dígitos en logs** (`notifications.ts:35-49`). No usar este modo en producción.                                    |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_FROM`                            | No                  | `smtp.gmail.com` / `465` / `"Macollo Invernadero" <…>`               | `notifications.ts:29-33,232-236`                                                                                                              | Con defaults se intenta Gmail; puerto `465` ⇒ `secure: true`, cualquier otro ⇒ `secure: false` (`notifications.ts:56`). `FROM` solo cambia el remitente.                                                  |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_PHONE_NUMBER` | Cond.               | — (no aparecen en `.env.example`)                                    | `notifications.ts:138-140`; recuperación `forgot-password.ts:116`                                                                             | Sin ellos `sendRecoverySms` → `MISSING_SMS_CONFIG` y el código queda en logs (`notifications.ts:142-157`). Solo necesarios si se habilita SMS.                                                            |
| `WAQI_TOKEN`                                                       | No                  | Token embebido en `src/pages/api/aqi.ts:8-9`                         | `src/pages/api/aqi.ts:9,26`                                                                                                                   | Sin variable se usa el token del código; si vence, `/api/aqi` devuelve el fallback `aqi: 28` (`aqi.ts:32-39`). Definirlo permite rotar el token sin tocar código.                                         |
| `ML_API_URL`                                                       | Cond.               | `https://macollo-trips-api-961314735418.us-central1.run.app`         | `src/pages/api/trips-diagnosis.ts:10-13`; `scripts/run-lan.sh:38,45`                                                                          | Sin él se usa el Cloud Run por defecto; apunta a otro entorno → `503` en `GET` y `502` en `POST`. Alias aceptado: `PUBLIC_API_URL` (no recomendado).                                                      |
| `ML_API_KEY`                                                       | Sí-prod (ML)        | Key embebida en `src/pages/api/trips-diagnosis.ts:15-19`             | Header `X-API-Key` en `buildHeaders` (`trips-diagnosis.ts:79-88`)                                                                             | Sin variable se envía la key del código; si se rota en Cloud Run, el proxy recibe `401`. Alias: `API_KEY`, `ML_X_API_KEY`. **Rotar la key del código es tarea de código, no de configuración.**           |
| `ML_ADMIN_USER` / `ML_ADMIN_PASSWORD`                              | Sí-prod (ML)        | `admin` / `macollo2026`                                              | Renovación de cookie `macollo_session`: `trips-diagnosis.ts:50-77`                                                                            | Tras un reinicio de Cloud Run, un `401` de `/api/predict` dispara login automático; con credenciales erróneas, el reintento falla. rotar en el servicio ML y aquí a la vez.                               |
| `SITE`                                                             | No                  | `https://macollo.tech`                                               | `astro.config.mjs:12`                                                                                                                         | Solo afecta metadatos/URLs generadas por Astro; para preview con otro dominio, definirlo en el entorno de preview.                                                                                        |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD`                                   | Sí-tarea            | —                                                                    | `scripts/seed-admin.mjs:9-22`                                                                                                                 | `ADMIN_EMAIL` debe contener `@` y `ADMIN_PASSWORD` ≥ 8 caracteres; si no, el script termina con `exit 1`.                                                                                                 |
| `ADMIN_NAME` / `ADMIN_ROLE` / `ADMIN_PHONE`                        | No                  | `Superadmin` / `Superadmin` / `null`                                 | `scripts/seed-admin.mjs:11-13,23-26`                                                                                                          | `ADMIN_ROLE` debe estar en `Superadmin\|Admin\|Agropecuario\|Campesino`; si no, error. El script **sobrescribe** contraseña y rol del email existente (`seed-admin.mjs:58-66`).                           |
| `DEMO_EMAIL` / `DEMO_NAME` / `DEMO_PASSWORD`                       | No                  | `demo@invernadero.local` / `Dueño Demo` / aleatorio (~12 caracteres) | `scripts/seed-demo.mjs:11-20`                                                                                                                 | Si no se fija `DEMO_PASSWORD`, se imprime una vez y no se vuelve a mostrar (`seed-demo.mjs:192-202`). No ejecutar en producción.                                                                          |
| `PORT`                                                             | No                  | `4321`                                                               | `scripts/run-lan.sh:11-23`                                                                                                                    | `8000` está reservado para la API ML local; el script aborta si se intenta usar. Solo entorno local.                                                                                                      |

Reglas transversales:

- `.env` y `.env.production` están ignorados por Git (`.gitignore:16-18`); el único archivo versionado es `.env.example`. El pre-commit bloquea cualquier archivo en staging cuyo nombre coincida con `.env`, `credentials` o `secret`, salvo `.env.example` (`.husky/pre-commit:5-11`).
- Todas las variables de la tabla se configuran en **Vercel → Settings → Environment Variables** para cada entorno (Production / Preview / Development). Las variables de los scripts de siembra pueden pasarse solo en la sesión de terminal (`ADMIN_EMAIL=… node scripts/seed-admin.mjs`) y no deben quedar en Vercel.
- Hay credenciales por defecto en el código (`ML_ADMIN_PASSWORD`, key ML, token WAQI y el admin de `scripts/seed-production.mjs:24-26`). Su presencia es una deuda de seguridad conocida; tratarlas como secretos comprometidos y rotarlas en el proveedor antes de exponer el sistema (`docs/SECURITY.md`).

---

## 3. Base de datos y migraciones

1. Crear una instancia PostgreSQL accesible desde Vercel y la BD `invernadero`. Definir `DATABASE_URL` (forma preferida) o el bloque `POSTGRES_*` completo.
2. Aplicar esquemas en orden: `psql "$DATABASE_URL" -f src/db/auth-schema.sql` y `psql "$DATABASE_URL" -f src/db/greenhouse-schema.sql` (`docs/DATABASE.md`). En instalaciones con el esquema anterior, aplicar además `src/db/migrations/001-roles-farms.sql`, `002-add-responsable-to-lecturas.sql` y `003-add-sheets-url-to-fincas.sql` (presentes en `src/db/migrations/`; el responsable se añade también de forma idempotente en `scripts/migrate-neon.mjs:133-141`).
3. Verificar tablas y enum:
   ```sql
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public' ORDER BY table_name;
   SELECT enumlabel FROM pg_enum e
   JOIN pg_type t ON t.oid = e.enumtypid
   WHERE t.typname = 'user_role_enum' ORDER BY enumlabel;
   ```
   Esperado: `fincas`, `finca_invitaciones`, `finca_miembros`, `lecturas`, `photos`, `plantas`, `users`, `accounts`, `sessions`, `verification_token`; roles `Superadmin`, `Admin`, `Agropecuario`, `Campesino` (`scripts/migrate-neon.mjs:29,62-161`).
4. Crear el primer staff con `ADMIN_EMAIL=… ADMIN_PASSWORD=… node scripts/seed-admin.mjs` (`scripts/seed-admin.mjs:9-26`). Alternativamente, registrarse en la app y promover: `UPDATE users SET role = 'Superadmin', updated_at = NOW() WHERE email = 'tu@correo.com';` — el rol del JWT se refresca al cerrar y reabrir sesión (`auth.config.ts:187-204`).
5. **Precaución con seeders de producción**: `scripts/seed-production.mjs` contiene una URL de Neon y la contraseña `Macollo2026*` embebidas (`seed-production.mjs:4-6,24-26`) e imprime credenciales por consola (`seed-production.mjs:176-184`). Revisar y rotar antes de usarlo; preferir `seed-admin.mjs` con variables de entorno.
6. Copia de seguridad antes de cualquier migración: `pg_dump "$DATABASE_URL" > backup_$(date +%F).sql` (patrón documentado en `docs/DATABASE.md`).

> No usar SQLite: el pool es `pg` y las funciones Vercel no tienen disco persistente (`src/db/client.ts:1-4`; `docs/ARCHITECTURE.md`).

---

## 4. Checklist pre-deploy

- [ ] Node ≥ 22.12.0 y `pnpm install` con `pnpm-lock.yaml` sin cambios accidentales (`package.json:5-7,16-59`).
- [ ] `pnpm build` en verde; genera `./dist` con el adaptador de Vercel (`package.json:11`; `astro.config.mjs:5,19`). Opcional: `pnpm preview` (`package.json:12`).
- [ ] No hay suite automatizada: ejecutar a mano los casos de `docs/TESTING.md` y registrar los IDs en el PR (verificable: no hay `*.test.*` ni script `test` en `package.json`).
- [ ] Variables de §2 presentes en **todos** los entornos Vercel que se usen; `AUTH_SECRET`, `DATABASE_URL` y `NODE_ENV=production` confirmados en Production.
- [ ] `AUTH_TRUST_HOST=true` y proxy configurable (`x-forwarded-proto`/`x-forwarded-host`): verificar que el dominio final no produce redirects a `http`/`localhost` (`src/middleware.ts:78-95`).
- [ ] DB migrada (§3), `SELECT 1` correcto y sin `[PostgreSQL] Error…` en logs.
- [ ] Google OAuth: callback `https://<dominio>/api/auth/callback/google` autorizado si se usa el proveedor (`auth.config.ts:58-68`).
- [ ] SMTP: correo de prueba de recuperación recibido; si no,确认 que `sent:false` se ha documentado y que el modo logs no se usa en producción (`notifications.ts:35-49`).
- [ ] Cloud Run de ML: `GET $ML_API_URL/api/health` responde; `ML_API_KEY` y `ML_ADMIN_*` alineados con el servicio remoto (`trips-diagnosis.ts:10-19,50-77`).
- [ ] Flujo completo en preview: registro → login → elegir finca → importar CSV → métricas → exportar Excel → logout (`docs/TESTING.md`).
- [ ] `git diff` sin secretos ( `.env`, tokens, contraseñas); el pre-commit ya los bloquea, pero la revisión manual sigue siendo obligatoria (`.husky/pre-commit:5-11`).
- [ ] `docs/CHANGELOG.md` y ADR si la decisión cambia infraestructura (`docs/CONTRIBUTING.md`).

---

## 5. Ejecución del despliegue

```bash
# 1) Verificación local con el mismo gestor del repo
pnpm install
pnpm build
pnpm preview          # opcional, sobre ./dist

# 2) Confirmar qué se va a desplegar
git rev-parse --short HEAD
git status --short

# 3) Push a la rama configurada en Vercel (main en el flujo documentado)
git push origin <rama>
```

Vercel (framework preset **Astro**) construye `pnpm build` y publica la rama configurada; los Pull Requests generan deployments de preview. No existe un script `deploy` en `package.json:8-15`: el despliegue lo hace la integración de Vercel, no un comando local. La API de ML **no** se despliega aquí: se gestiona en el repositorio externo y en Google Cloud Run (`docs/CAMERA-ML.md`).

---

## 6. Verificación post-deploy con `curl`

Sustituir `$BASE` por la URL de preview o producción. Los ejemplos usan `-w` para hacer verificable el código HTTP. No ejecutar la prueba de rate-limit contra producción: puede dejar la IP bloqueada 300 s.

```bash
BASE=https://macollo.tech
export BASE

# A) Portada y cabeceras de seguridad (middleware.ts:39-74)
curl -sS -o /dev/null -w 'home %{http_code}\n' "$BASE/"
curl -sSI "$BASE/" | grep -iE 'x-frame-options|x-content-type-options|content-security-policy|strict-transport-security|referrer-policy'

# B) Página protegida sin sesión → 3xx a /?desde=%2Fmetrics (middleware.ts:129-159)
curl -sS -o /dev/null -w 'metrics %{http_code} %{redirect_url}\n' "$BASE/metrics"

# C) API protegida sin sesión → 401 JSON (middleware.ts:137-147)
curl -sS -w '\napi/farms %{http_code}\n' "$BASE/api/farms"

# D) checkOrigin: sin Origin en multipart → 403; con Origin → 400 (falta archivo)
curl -sS -o /dev/null -w 'sin-origin %{http_code}\n' -X POST -F 'dummy=1' "$BASE/api/trips-diagnosis"
curl -sS -o /dev/null -w 'con-origin %{http_code}\n' -X POST -H "Origin: $BASE" -F 'dummy=1' "$BASE/api/trips-diagnosis"

# E) Registro duplicado (o email inválido) → 400; el JSON es application/json, no aplica origin-check
curl -sS -o /dev/null -w 'register %{http_code}\n' -X POST -H "Origin: $BASE" \
  -H 'Content-Type: application/json' \
  -d '{"name":"QA","email":"no-es-email","password":"12345678"}' \
  "$BASE/api/auth/register"

# F) Health del ML → 200 online / 503 offline; dispara warm-up si model_loaded=false
curl -sS -w '\ntrips-health %{http_code}\n' "$BASE/api/trips-diagnosis"

# G) Clima y AQI → 200 incluso si el proveedor externo falla (fallbacks)
curl -sS -o /dev/null -w 'weather %{http_code}\n' "$BASE/api/weather"
curl -sS -o /dev/null -w 'aqi %{http_code}\n' "$BASE/api/aqi"

# H) SIATA exige sesión: sin cookie → 401; con cookie válida → 200 o 500 en ≤3 s
curl -sS -o /dev/null -w 'siata-anon %{http_code}\n' "$BASE/api/siata"
# curl -sS -b cookies.txt -o /dev/null -w 'siata-auth %{http_code} %{time_total}s\n' "$BASE/api/siata"

# I) Rate-limit (SOLO PREVIEW): 11ª petición → 429 + Retry-After
for i in $(seq 1 11); do
  curl -sS -o /dev/null -w "rl-$i %{http_code}\n" -X POST -H "Origin: $BASE" \
    -H 'Content-Type: application/json' -d '{"name":""}' \
    "$BASE/api/auth/register"
done
```

Resultados esperados y su significado:

| Comprobación                  | Esperado                                                                                              | Si falla, mirar primero                                               |
| :---------------------------- | :---------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| Portada                       | `200` + `X-Frame-Options: DENY`, `nosniff`, CSP, HSTS (HSTS solo si `isHttps`, `middleware.ts:64-74`) | Logs de función; `AUTH_SECRET`; DB                                    |
| `/metrics` anónimo            | `3xx` hacia `/?desde=…`                                                                               | `PROTECTED_PAGES` (`middleware.ts:9-16`)                              |
| `/api/farms` anónimo          | `401 {"message":"No autenticado."}`                                                                   | `PROTECTED_API_PREFIXES` (`middleware.ts:19-27`)                      |
| `POST` multipart sin `Origin` | `403` de Astro                                                                                        | `security.checkOrigin: true` (`astro.config.mjs:13`)                  |
| Health ML                     | `200` con `status:"online"`; `503` si Cloud Run no responde                                           | `ML_API_URL`, `ML_API_KEY`, cold start (`trips-diagnosis.ts:175-230`) |
| `weather` / `aqi`             | `200` con datos o fallback (`weather.ts:48-60`, `aqi.ts:32-39`)                                       | `WAQI_TOKEN`, red saliente                                            |
| SIATA                         | `401` sin sesión; `≤3 s` con sesión                                                                   | `siata.ts:11-32`; service `siata.gov.co:8089`                         |
| Rate limit                    | `429` con `Retry-After`                                                                               | `RATE_LIMITED` (`middleware.ts:29-37`), `rateLimit.ts:23-58`          |

**Verificación de la cookie de sesión**: iniciar sesión desde el navegador en el dominio desplegado, abrir DevTools → Application → Cookies y comprobar que la cookie de Auth.js tiene `Secure` (con `NODE_ENV=production`, `authz.ts:141`) y que el host coincide con el dominio final. Si el login redirige a `http`/`localhost`, revisar §7 «Proxy» y `AUTH_TRUST_HOST`.

---

## 7. Límites, degradación y riesgos conocidos

### Vercel

| Límite / comportamiento  | Valor o regla verificable                                                                                                                                                                                                            | Mitigación                                                                                                                                                                                                                                  |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Duración de función      | `maxDuration: 60` en adaptador y en la ruta ML (`astro.config.mjs:19`; `trips-diagnosis.ts:7`). El comentario de configuración advierte que con Fluid Compute el límite real sigue siendo el uso efectivo (`astro.config.mjs:15-18`) | Las llamadas al ML deben terminar antes; separar trabajo pesado en Cloud Run                                                                                                                                                                |
| Presupuesto ML declarado | `TOTAL_BUDGET_MS = 50_000`, `ATTEMPT_TIMEOUT_MS = 45_000` (`trips-diagnosis.ts:21-26`)                                                                                                                                               | **No confiar en ellos como timeout real**: los `fetch` de `/api/predict` (`trips-diagnosis.ts:130-146`) no pasan `AbortSignal`; los timeouts explícitos están en el login (10 s, `:61`), health (25 s, `:182`) y warm-up (10 s, `:193,202`) |
| Rate limit               | En memoria por instancia, `MAX_BUCKETS = 10_000` (`rateLimit.ts:9-10`); reglas en `middleware.ts:29-37`                                                                                                                              | No es un límite global: con varias instancias el efectivo se multiplica. Backlog SEC-07 (`docs/SECURITY.md`)                                                                                                                                |
| Sistema de archivos      | `POST /api/gallery/upload` escribe en `public/uploads/gallery` con `node:fs` (`gallery/upload.ts:6,65-68`)                                                                                                                           | En entornos serverless el filesystem no es persistente: verificar la galería en preview antes de habilitarla en producción y migrar a almacenamiento de objetos si se pierden archivos. No se modifica código en esta auditoría             |
| Pool de BD               | `max: 20`, `idleTimeoutMillis: 30000`, `connectionTimeoutMillis: 5000/2000` (`src/db/client.ts:26-28,40-42`)                                                                                                                         | Vigilar saturación en picos; una función por instancia mantiene su propio pool                                                                                                                                                              |
| CORS/origin              | `checkOrigin: true` (`astro.config.mjs:13`)                                                                                                                                                                                          | Usar el mismo dominio en `Origin`; no desactivar el control                                                                                                                                                                                 |

### Google Cloud Run (servicio ML externo)

- El modelo se ejecuta fuera de Vercel porque requiere ~4 GB de RAM y Python/PyTorch (`docs/CAMERA-ML.md`). No existen cuotas numéricas de Cloud Run en este repositorio: consultar la consola del proveedor y el README de `macollo-trips-api` en lugar de inventarlas.
- Cloud Run puede escalar a 0: el proxy detecta `model_loaded === false` en `/api/health` y lanza `POST /api/warmup` en segundo plano (`trips-diagnosis.ts:175-210`). Un `GET /api/trips-diagnosis` justo después de un despliegue puede tardar más; eso explica los `503` transitorios.
- Si el contenedor se reinicia, la cookie `macollo_session` guardada en memoria deja de servir; un `401` de `/api/predict` provoca login automático con `ML_ADMIN_USER`/`ML_ADMIN_PASSWORD` y un reintento (`trips-diagnosis.ts:50-77,136-146`).
- El navegador nunca llama a Cloud Run: la key viaja en `X-API-Key` desde el servidor (`trips-diagnosis.ts:79-88`). No publicar la URL con credenciales en el frontend.
- Cámara: `getUserMedia` requiere HTTPS o localhost; por HTTP con IP se usa la cámara nativa vía `input capture` (`docs/CAMERA-ML.md`).

### Proveedores y datos

- SIATA es HTTP público sin SLA (`src/pages/api/siata.ts:15-18`) con abort a los 3 s (`:12-13`); ante fallo responde `500` y el dashboard usa Open-Meteo (`docs/CHANGELOG.md:58`). Revisar `docs/ROADMAP.md:19`: está pendiente reactivarlo o retirarlo.
- WAQI tiene timeout de 8 s y fallback `aqi: 28` (`src/pages/api/aqi.ts:25-39`); Open-Meteo tiene fallback offline `22 °C / 60 %` (`src/pages/api/weather.ts:48-60`).
- `POST /api/sync-sheets` parsea en la función y solo lo puede ejecutar el **dueño** de la finca activa (`docs/CHANGELOG.md:31`; `middleware.ts:25`). CSV muy grandes pueden consumir CPU/tiempo: partir por rangos de fechas.
- Los códigos de recuperación sin usar se acumulan en `verification_token`; limpieza: `DELETE FROM verification_token WHERE expires < NOW();` (`docs/DATABASE.md`).

---

## 8. Rollback

1. **Congelar evidencia**: guardar URL del deployment, hash (`git rev-parse HEAD`), hora UTC y los últimos logs de Vercel/Cloud Run.
2. **Rollback de aplicación**: en Vercel → Deployments, seleccionar el deployment anterior estable y usar **Promote to Production**. Alternativamente, `git revert <hash>` y push a la rama de producción (ambos mecanismos están disponibles; no hay script propio para ello en `package.json`).
3. **Rollback de datos**: solo si la migración cambió esquema o datos. Restaurar el `pg_dump` previo (§3) en una BD nueva y cambiar `DATABASE_URL`/`POSTGRES_*` al nuevo destino; no mezclar dumps con esquemas parciales. Verificar con las consultas de §3 antes de reabrir tráfico.
4. **Rollback de secretos**: si se rotaron, restaurar valores anteriores en **todos** los entornos Vercel y en Cloud Run de forma coordinada (`AUTH_SECRET`, `ML_API_KEY`, `ML_ADMIN_*`, SMTP).
5. **Verificación obligatoria**: repetir §6 completo (incluidos `checkOrigin`, `401`, health ML y rate-limit en preview) y confirmar un login real con rol correcto.
6. **Cierre**: entrada en `docs/CHANGELOG.md` con causa, alcance y acción correctiva; ADR si el rollback cambia una decisión arquitectónica (`docs/CONTRIBUTING.md`).

> Un rollback de código **no revierte** migraciones de BD ni archivos escritos en `public/uploads/gallery`. Tratar esos cambios por separado.

---

## Trazabilidad

| Tema                         | Archivo de configuración / código                                                                                                                       | Doc relacionado                                                 | Verificación                                                               |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------- | :------------------------------------------------------------------------- |
| SSR, dominio y `checkOrigin` | `astro.config.mjs:12-19`; `node_modules/astro/dist/core/app/origin-check.js:2-26`                                                                       | `docs/ARCHITECTURE.md`, `docs/ROUTES.md`                        | `curl` §6-A y §6-D: `200`, `403` sin `Origin`                              |
| Scripts y gestor             | `package.json:5-15,47-59`; `pnpm-lock.yaml`                                                                                                             | `docs/README.md`, `docs/CONTRIBUTING.md`                        | `pnpm build`; no hay script `test`/`deploy`                                |
| Matriz de entorno            | `.env.example:1-33`; `auth.config.ts:28-68`; `src/db/client.ts:18-44`; `notifications.ts:27-40,138-157`; `trips-diagnosis.ts:10-19,50-77`; `seed-*.mjs` | `docs/AUTH.md`, `docs/CAMERA-ML.md`, `docs/SECURITY.md`         | Tabla §2 construida de `grep process.env.*` en `src/`, `scripts/` y config |
| Headers, rate limit, proxy   | `src/middleware.ts:29-164`; `rateLimit.ts:9-65`                                                                                                         | `docs/SECURITY.md`, `docs/TROUBLESHOOTING.md`                   | `curl -I`; `401`, `429` + `Retry-After`                                    |
| DB y migraciones             | `src/db/client.ts:18-48`; `scripts/migrate-neon.mjs:12-187`; `src/db/migrations/*`                                                                      | `docs/DATABASE.md`, `docs/DEMO-DATA.md`                         | Consultas SQL §3; `pg_dump` previo                                         |
| Límites Vercel / Cloud Run   | `astro.config.mjs:15-19`; `trips-diagnosis.ts:4-7,21-26,175-230`; `gallery/upload.ts:65-68`                                                             | `docs/CAMERA-ML.md`, `docs/ROADMAP.md`                          | Health `200/503`; revisar timeouts explícitos en código                    |
| Verificación y rollback      | `src/pages/api/siata.ts:11-32`; `weather.ts:48-60`; `aqi.ts:32-39`; Vercel UI                                                                           | `docs/TESTING.md`, `docs/TROUBLESHOOTING.md`                    | Checklist §6 + §8; reposición de deployment anterior                       |
| Convención documental        | `docs/README.md`, el generador de documentación (no incluido)                                                                                           | PDF unificado (`./UNIFIED/Macollo-Documentacion-Unificada.pdf`) | `pdfinfo` y regeneración reproducible                                      |

---

# Capítulo 33. Plan de Pruebas - Macollo (DOC-17)

**Ruta fuente:** `docs/TESTING.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-17**.
>
> **Estado explícito: NO existe suite automatizada.** A la fecha de verificación no hay archivos `*.test.*` / `*.spec.*` ni configuraciones `vitest.config.*` / `playwright.config.*` en el repositorio, y `package.json:8-15` no define los scripts `test`, `check` ni `e2e`. Lo único instalado con fines de comprobación es `@astrojs/check` (`package.json:48`), invocable con `pnpm exec astro check`. La automatización con Vitest está **pendiente** en `docs/ROADMAP.md:12`; este documento es, por tanto, un plan de regresión **manual y verificable** más un diseño de automatización no implementado. Requisitos en `docs/REQUIREMENTS.md`.

---

## 1. Estrategia y responsabilidades

| Nivel               | Qué cubre                                                                                             | Cómo se ejecuta hoy                                                              | Objetivo futuro                                 |
| :------------------ | :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- | :---------------------------------------------- |
| Estático            | Tipos, build SSR, secretos en el diff                                                                 | `pnpm build`; `pnpm exec astro check`; `git diff --check` y revisión de secretos | Pipeline de CI (no configurado en el repo)      |
| Unitario            | `resolvePlantCoordinates`, `parseCSV`, schemas Zod, `isValleDeAburra`, `getWeatherEmoji`, `rateLimit` | Manual / por inspección de código                                                | Vitest (`docs/ROADMAP.md:12`, **no instalado**) |
| Integración         | Endpoints con `curl`, headers, rate-limit, DB de prueba                                               | Manual con §§3–4                                                                 | DB efímera + aserciones SQL                     |
| E2E manual          | RF-01…RF-18 en navegador (§2)                                                                         | Checklist de release                                                             | No hay herramienta E2E en el repo               |
| Regresión de deploy | Verificación post-deploy de `docs/DEPLOYMENT.md` §6                                                   | `curl` + logs                                                                    | Repetir en cada preview                         |

**Regla de evidencia:** todo caso debe dejar rastro en el PR: ID del caso, entorno (local/preview/production), código HTTP observado y, si aplica, consulta SQL o salida de `curl`. Sin evidencia, el caso no cuenta como ejecutado.

---

## 2. Casos E2E manuales (navegador)

Los casos TEST-01…TEST-14 se conservan del plan anterior y se amplían con casos derivados del código verificado el 2026-11-23 (TEST-15 en adelante).

| ID      | RF / código                                                  | Pasos                                                                                                        | Esperado                                                                                                                                                                                                            |
| :------ | :----------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TEST-01 | RF-01 · `src/pages/api/auth/register.ts`                     | `/` → Registrarse: nombre + email nuevo + clave ≥ 8 → Crear Cuenta                                           | `201` y mensaje de cuenta creada; vuelve al login con email precargado (`docs/ENDPOINTS.md`)                                                                                                                        |
| TEST-02 | RF-01                                                        | Registrar el mismo email dos veces                                                                           | `400` con mensaje guiado (no filtra otros datos)                                                                                                                                                                    |
| TEST-03 | RF-02 · `auth.config.ts:69-168`                              | Login correcto / incorrecto con email y con teléfono                                                         | Entra a `/` / `Credenciales incorrectas…`. El login **no busca por nombre** (`auth.config.ts:93-103`)                                                                                                               |
| TEST-04 | RF-03 · `auth.config.ts:58-68`                               | Continuar con Google                                                                                         | Sesión creada y entra a `/`; callback autorizado en Google                                                                                                                                                          |
| TEST-05 | RF-05 · `notifications.ts:21-127`                            | Forgot con email válido → código de 6 dígitos → reset + login                                                | Código válido 15 min; mensaje enmascarado; `identifier` sin enmascarar; reúso del token falla                                                                                                                       |
| TEST-06 | RF-06/07                                                     | Dashboard: contar tarjetas y abrir `T0-C1`                                                                   | 20 tarjetas de la matriz 4×5; modal con pH, temperaturas, crecimiento, productividad y sanidad                                                                                                                      |
| TEST-07 | RF-06 · `docs/DEMO-DATA.md`                                  | Importar el CSV maestro de 20 plantas en Historial → volver a `/`                                            | Sin tarjetas grises; semáforo coherente con umbrales de pH                                                                                                                                                          |
| TEST-08 | RF-08/09                                                     | 3D + clima: rotar/zoom; denegar geolocalización                                                              | Escena activa; clima de Medellín y AQI visibles; sin error de permiso                                                                                                                                               |
| TEST-09 | RF-10 · `/metrics`                                           | Revisar promedios y badges                                                                                   | Rangos y peor fila coherentes con `lecturas` de la finca activa                                                                                                                                                     |
| TEST-10 | RF-11/13 · `/history`                                        | Como **dueño**: cambiar fecha y pegar URL de Sheets pública/privada. Como **miembro/staff**: buscar el botón | Dueño: conteo importado / error `422` guiado. Miembro/staff: botón oculto y `403` si llama a la API (`docs/CHANGELOG.md:31`)                                                                                        |
| TEST-11 | RF-14                                                        | Exportar desde Métricas e Historial                                                                          | `.xlsx` con hojas de promedios; abre en Excel/Sheets                                                                                                                                                                |
| TEST-12 | RF-15–18 · `/settings`                                       | Cambiar nombre/tema/frecuencia; provocar toast                                                               | Persiste el nombre; tema aplicado; toast visible                                                                                                                                                                    |
| TEST-13 | RNF-04 · `middleware.ts:9-27,129-159`                        | Sin sesión abrir `/metrics`, `/history`, `/settings`, `/farms`, `/gallery`, `/admin` y `/api/farms`          | Páginas → `3xx` a `/?desde=…`; APIs → `401 {"message":"No autenticado."}`                                                                                                                                           |
| TEST-14 | RNF-05                                                       | Bloquear `api.open-meteo.com` en DevTools y recargar                                                         | Widget con fallback offline `22 °C / 60 %` (`weather.ts:48-60`), sin error visible                                                                                                                                  |
| TEST-15 | `middleware.ts:39-74`                                        | `curl -I` a la portada en HTTPS                                                                              | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, CSP y `Strict-Transport-Security`                                                                      |
| TEST-16 | `astro.config.mjs:13`                                        | Enviar `POST /api/trips-diagnosis` con `multipart/form-data` sin `Origin` y luego con `Origin = $BASE`       | Sin `Origin` → `403`; con `Origin` y sin archivo → `400`. Si el navegador hace un POST legítimo y da `403`, revisar proxy/dominio                                                                                   |
| TEST-17 | `middleware.ts:29-37`; `rateLimit.ts:23-58`                  | En **preview**, 11 POST seguidos a `/api/auth/register` con body inválido                                    | Los primeros dan `400` (llegan al handler) y el 11.º da `429` con `Retry-After`                                                                                                                                     |
| TEST-18 | `trips-diagnosis.ts:175-230`                                 | `GET /api/trips-diagnosis` con Cloud Run en reposo                                                           | `200 {"status":"online",…}`; si `model_loaded === false` se intenta `/api/warmup` y `warming_triggered` es `true` solo si ese POST respondió `ok` (`:187-210`); si el servicio está caído, `503` con mensaje de URL |
| TEST-19 | `trips-diagnosis.ts:98-173`                                  | Subir imagen válida desde el modal «Escanear Trips»                                                          | `POST` reenvía `file`, `crop` y `profile` a Cloud Run; si hay `401`, renueva cookie y reintenta; si falla la conexión → `502` con mensaje claro. Sin 503 artificiales (`git log -1`: `4e977f5`)                     |
| TEST-20 | `astro.config.mjs:19`; `trips-diagnosis.ts:7,21-26`          | Revisar despliegue y logs de la función ML                                                                   | `maxDuration = 60` activo; la petición no debe morir antes por el límite de Vercel. Las constantes de 50/45 s **no** son timeouts aplicados a `/api/predict`                                                        |
| TEST-21 | `finca_miembros`, cookie `finca_activa` (`docs/DATABASE.md`) | Crear dos fincas con usuarios distintos, entrar con membresía en una sola y consultar métricas/export        | No se filtran `lecturas` ni fotos de la otra finca; cambiar de finca cambia el dataset                                                                                                                              |
| TEST-22 | `scripts/migrate-neon.mjs:133-141`; commit `03f8b97`         | Verificar columna `responsable` y hacer una importación/lectura con responsable                              | `SELECT responsable, responsable_id FROM lecturas LIMIT 5;` devuelve valores coherentes; la UI muestra el responsable cuando aplica                                                                                 |
| TEST-23 | `auth.config.ts:42-52,187-204`                               | En staging con `SESSION_MAX_AGE_HOURS=1`, iniciar sesión y esperar > 1 h                                     | La sesión se invalida de forma absoluta aunque se siga usando (no basta con refrescar el JWT). No apto para release de pocos minutos                                                                                |
| TEST-24 | `siata.ts:11-32`; `aqi.ts:32-39`                             | Llamar a `/api/siata` sin sesión y a `/api/aqi` con WAQI caído                                               | `401` / `200` con AQI 28; `/api/siata` con sesión falla en ≤ 3 s si el proveedor no responde                                                                                                                        |
| TEST-25 | `gallery/upload.ts:6,12-80`                                  | Subir foto con sesión y `Origin` válido; luego sin sesión                                                    | Con sesión: `photos` gana una fila y `url=/uploads/gallery/<uuid>.<ext>`. Sin sesión: `401`. Verificar persistencia del archivo en el entorno serverless                                                            |
| TEST-26 | `auth.config.ts:21-22`; `docs/CHANGELOG.md:33`               | Promover a un usuario con `UPDATE users SET role = 'Admin'…` y re-loguear                                    | El panel muestra el rol real; la autorización sensible se relee de BD                                                                                                                                               |
| TEST-27 | `seed-admin.mjs:15-26`; `seed-demo.mjs:15-20`                | Ejecutar `ADMIN_PASSWORD=corta node scripts/seed-admin.mjs` y `node scripts/seed-demo.mjs` en BD de prueba   | El primero termina con `ADMIN_PASSWORD debe tener al menos 8 caracteres`; el segundo genera y printa una contraseña aleatoria si no se provee                                                                       |
| TEST-28 | `scripts/migrate-neon.mjs:137`                               | Importar dos veces el mismo CSV con igual finca/planta/fecha/hora                                            | No hay duplicados: `SELECT … HAVING count(*) > 1` da 0 filas                                                                                                                                                        |
| TEST-29 | `package.json:11,48`                                         | `pnpm build` y `pnpm exec astro check`                                                                       | Build verde; cualquier error de tipos conocido se registra como issue, no se ignora en silencio                                                                                                                     |

> TEST-17 satura un contador en memoria; ejecutarlo **solo en preview** y esperar 300 s antes de repetirlo desde la misma IP (`middleware.ts:31-36`).

---

## 3. Casos de API con `curl`

Base: usar la URL de preview. `$BASE` debe ser el origen exacto (sin barra final) para que `-H "Origin: $BASE"` coincida con `url.origin` en el control de Astro.

```bash
BASE=https://macollo-preview.vercel.app
EMAIL="qa+$(date +%s)@example.com"
export BASE EMAIL

# 1) Registro válido → 201; duplicado → 400
curl -sS -o /dev/null -w 'register-nuevo %{http_code}\n' -X POST -H "Origin: $BASE" \
  -H 'Content-Type: application/json' \
  -d "{\"name\":\"QA Macollo\",\"email\":\"$EMAIL\",\"password\":\"secreto123\"}" \
  "$BASE/api/auth/register"
curl -sS -o /dev/null -w 'register-dup %{http_code}\n' -X POST -H "Origin: $BASE" \
  -H 'Content-Type: application/json' \
  -d "{\"name\":\"QA Macollo\",\"email\":\"$EMAIL\",\"password\":\"secreto123\"}" \
  "$BASE/api/auth/register"

# 2) Disponibilidad de email → 200 con {emailTaken, phoneTaken}
curl -sS -w '\ncheck %{http_code}\n' -X POST -H "Origin: $BASE" \
  -H 'Content-Type: application/json' -d "{\"email\":\"$EMAIL\"}" \
  "$BASE/api/auth/check-availability"

# 3) Forgot con usuario inexistente → 404; body vacío → 400
curl -sS -o /dev/null -w 'forgot-404 %{http_code}\n' -X POST -H "Origin: $BASE" \
  -H 'Content-Type: application/json' -d '{"identifier":"nadie@example.com"}' \
  "$BASE/api/auth/forgot-password"
curl -sS -o /dev/null -w 'forgot-400 %{http_code}\n' -X POST -H "Origin: $BASE" \
  -H 'Content-Type: application/json' -d '{}' "$BASE/api/auth/forgot-password"

# 4) Rutas protegidas sin sesión → 401 (exportar y fincas)
curl -sS -o /dev/null -w 'export-anon %{http_code}\n' "$BASE/api/export-excel"
curl -sS -o /dev/null -w 'farms-anon %{http_code}\n' "$BASE/api/farms"

# 5) checkOrigin en multipart → 403 sin Origin / 400 con Origin y sin archivo
curl -sS -o /dev/null -w 'origin-out %{http_code}\n' -X POST -F 'dummy=1' "$BASE/api/trips-diagnosis"
curl -sS -o /dev/null -w 'origin-ok %{http_code}\n' -X POST -H "Origin: $BASE" -F 'dummy=1' "$BASE/api/trips-diagnosis"

# 6) Health ML → 200 online / 503 offline
curl -sS -w '\nml-health %{http_code}\n' "$BASE/api/trips-diagnosis"

# 7) Clima/AQI → 200, con fallback cuando el proveedor externo falla
curl -sS -o /dev/null -w 'weather %{http_code}\n' "$BASE/api/weather"
curl -sS -o /dev/null -w 'aqi %{http_code}\n' "$BASE/api/aqi"

# 8) SIATA: 401 sin sesión; con cookie de navegador, 200/500 en ≤3 s
curl -sS -o /dev/null -w 'siata-anon %{http_code}\n' "$BASE/api/siata"

# 9) Latencia de la portada
curl -sS -o /dev/null -w 'home %{http_code} %{time_total}s\n' "$BASE/"
```

**Matriz de códigos esperados**

| Petición                   | Esperado                       | Fuente                             |
| :------------------------- | :----------------------------- | :--------------------------------- |
| Registro nuevo / duplicado | `201` / `400`                  | `docs/ENDPOINTS.md`                |
| `check-availability`       | `200` / `400` si body inválido | `docs/ENDPOINTS.md`                |
| Forgot inexistente / vacío | `404` / `400`                  | `docs/ENDPOINTS.md`                |
| APIs protegidas anónimas   | `401`                          | `src/middleware.ts:19-27,137-147`  |
| Multiparts sin `Origin`    | `403`                          | `astro.config.mjs:13`              |
| `GET /api/trips-diagnosis` | `200` u `503`                  | `trips-diagnosis.ts:212-230`       |
| `weather` / `aqi`          | `200` (fallback incluido)      | `weather.ts:48-60`; `aqi.ts:32-39` |
| `siata` anónimo            | `401`                          | `siata.ts:5-9`                     |

> Las respuestas de `/api/export-excel`, `/api/export-csv`, `/api/sync-sheets`, `/api/invitations/*`, `/api/gallery/*` y `/api/admin/*` requieren sesión (y permisos de finca). Obtener la cookie desde un login real en el navegador; el repositorio no incluye un helper de autenticación para `curl`.

---

## 4. Aserciones de base de datos para el plan manual

Ejecutar contra la BD de preview antes y después de los casos §2–§3.

```sql
-- Registro (TEST-01/02): exactamente una fila para el correo de prueba
SELECT id, name, role, "emailVerified" FROM users WHERE email = 'qa+...';

-- Código de recuperación (TEST-05): se consume y no se reutiliza
SELECT identifier, expires FROM verification_token WHERE identifier = 'qa+...';

-- Importación idempotente (TEST-28): 0 filas duplicadas
SELECT finca_id, planta_id, fecha, hora, count(*)
FROM lecturas GROUP BY 1,2,3,4 HAVING count(*) > 1;

-- Multi-tenant (TEST-21): cada finca solo ve sus plantas
SELECT finca_id, count(*) FROM plantas GROUP BY finca_id ORDER BY finca_id;
SELECT finca_id, count(*) FROM lecturas GROUP BY finca_id ORDER BY finca_id;

-- Responsable (TEST-22)
SELECT id, fecha, responsable, responsable_id FROM lecturas ORDER BY id DESC LIMIT 5;

-- Galería (TEST-25)
SELECT id, url, finca_id, user_id, size_bytes FROM photos ORDER BY uploaded_at DESC LIMIT 5;

-- Roles (TEST-26)
SELECT id, email, role FROM users WHERE email = 'qa+...';
```

---

## 5. Automatización propuesta (NO implementada)

1. **Dependencia y script**: añadir `vitest` como devDependency y un script `"test": "vitest run"` a `package.json:8-15`. Hoy no existen (`docs/ROADMAP.md:12` lo marca como tarea abierta).
2. **Refactor previo necesario**: exportar `parseCSV`, `normalizeGoogleSheetUrl` y `extractDateAndHour` de `src/pages/api/sync-sheets.ts` y los schemas de `src/pages/api/auth/register.ts` (hoy privados) para poder probarlos sin montar la app.
3. **Primeros casos unitarios** (esqueleto ilustrativo, **no presente en el repo**):
   ```ts
   import { describe, expect, it } from "vitest";
   import { resolvePlantCoordinates } from "./plantMatrix";
   import { rateLimit } from "./rateLimit";

   describe("resolvePlantCoordinates", () => {
     it("acepta TO-P2 (letra O) como t0 columna 2", () => {
       expect(resolvePlantCoordinates("TO-P2")).toMatchObject({
         fila: "t0",
         columna: "Col 2",
         plantId: "P-02",
       });
     });
     it("mapea P-20 global a t3 columna 5", () => {
       expect(resolvePlantCoordinates("P-20")).toMatchObject({
         fila: "t3",
         columna: "Col 5",
       });
     });
   });

   describe("rateLimit", () => {
     it("devuelve 429 y Retry-After ≥ 1 al agotar la ventana", () => {
       const key = "test:127.0.0.1";
       for (let i = 0; i < 3; i++) expect(rateLimit(key, 3, 60).ok).toBe(true);
       const blocked = rateLimit(key, 3, 60);
       expect(blocked.ok).toBe(false);
       expect(blocked.retryAfterSeconds).toBeGreaterThanOrEqual(1);
     });
   });
   ```
4. **Casos semilla**: IDs compuestos/globales (`TO-P2`, `P-20`), clamp de pH 0–14, fechas `YYYY-MM-DD` y seriales Excel, bbox del Valle de Aburrá (`6.2442,-75.5812` dentro; `4.71,-74.07` fuera), WMO `0 → ☀️` / `95+ → ⛈️`, email/teléfono duplicados (con BD de prueba), ventanas de `rateLimit` y precedencia de `ML_API_URL` sobre `PUBLIC_API_URL` (`trips-diagnosis.ts:10-13`).
5. **Integración**: repetir §3 contra una BD efímera, aplicando `src/db/auth-schema.sql`, `src/db/greenhouse-schema.sql` y `src/db/migrations/*.sql` antes de cada corrida.
6. **No hay CI configurada** en el repositorio (sin workflows en `.github/`): la ejecución debe hacerse manualmente hasta que se añada. No se instala ni se invoca ninguna herramienta nueva en esta auditoría.

---

## 6. Checklist de release

- [ ] `pnpm build` y `pnpm exec astro check` ejecutados; resultados registrados (TEST-29).
- [ ] TEST-01 → TEST-29 ejecutados en la URL de preview, con IDs y evidencia en el PR.
- [ ] `curl` de §3 con los códigos de la matriz; comprobados `checkOrigin` y `401`.
- [ ] Aserciones SQL de §4 sin duplicados ni fugas entre fincas.
- [ ] Verificación post-deploy completa de `docs/DEPLOYMENT.md` §6 si el cambio toca infraestructura.
- [ ] `git diff` sin secretos; pre-commit de Husky respetado (`.husky/pre-commit:5-11`).
- [ ] `docs/CHANGELOG.md` actualizado y ADR nuevo si hubo decisión arquitectónica (`docs/CONTRIBUTING.md` §4).
- [ ] Si el cambio invalidó un caso, actualizar este documento en el mismo PR (trazabilidad §7).

---

## Trazabilidad

| Tema                  | Archivo de configuración / código                                                | Doc relacionado                                                 | Verificación                                           |
| :-------------------- | :------------------------------------------------------------------------------- | :-------------------------------------------------------------- | :----------------------------------------------------- |
| Ausencia de suite     | `package.json:8-15,47-59`; búsqueda de `*.test.*` / `*.spec.*` sin resultados    | `docs/ROADMAP.md:12`                                            | No hay script `test` ni archivos de test al 2026-11-23 |
| Auth y sesión         | `auth.config.ts:28-68,93-103,170-208`; `src/pages/api/auth/*.ts`                 | `docs/AUTH.md`, `docs/ENDPOINTS.md`                             | TEST-01…05, TEST-23, TEST-26                           |
| Rutas y headers       | `src/middleware.ts:9-74,100-164`; `astro.config.mjs:13`                          | `docs/ROUTES.md`, `docs/SECURITY.md`                            | TEST-13, TEST-15, TEST-16; `curl -I`                   |
| Rate-limit            | `src/middleware.ts:29-37`; `src/backend/services/rateLimit.ts:9-65`              | `docs/SECURITY.md` (SEC-05/07)                                  | TEST-17; `429` + `Retry-After`                         |
| ML y timeouts         | `src/pages/api/trips-diagnosis.ts:4-26,50-88,98-230`; `git log -1` (`4e977f5`)   | `docs/CAMERA-ML.md`, `docs/DEPLOYMENT.md`                       | TEST-18…20; health `200/503`                           |
| Multi-tenant y datos  | `scripts/migrate-neon.mjs:62-161`; `docs/DATABASE.md`; `gallery/upload.ts:12-80` | `docs/DATABASE.md`, `docs/DATA-DICTIONARY.md`                   | TEST-21, TEST-22, TEST-25, TEST-28; SQL §4             |
| Fallbacks externos    | `siata.ts:11-32`; `weather.ts:32-60`; `aqi.ts:25-39`                             | `docs/TROUBLESHOOTING.md`, `docs/ROADMAP.md:19`                 | TEST-14, TEST-24                                       |
| Convención documental | `docs/README.md`, el generador de documentación (no incluido)                    | PDF unificado (`./UNIFIED/Macollo-Documentacion-Unificada.pdf`) | Regeneración y `pdfinfo`                               |

---

# Capítulo 34. Contribuir - Macollo (DOC-18)

**Ruta fuente:** `docs/CONTRIBUTING.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-18**.
>
> Este documento describe el flujo **real** de Git, Husky y Prettier según `package.json`, `.husky/pre-commit`, `.vscode/*`, `tsconfig.json` y `git log -15`. Información adicional: `docs/README.md` (índice), `docs/CHANGELOG.md` (historial) y `docs/ROADMAP.md` (pendientes). No hay hook de pre-push propio ni CI configurada en el repositorio (sin `.github/`).

---

## 1. Preparación del entorno

```bash
# 1) Node >= 22.12.0 (package.json:5-7) y pnpm (pnpm-lock.yaml)
node --version
pnpm install          # dispara "prepare": "husky" (package.json:14) e instala los hooks

# 2) Configuración local
cp .env.example .env  # rellenar valores; .env está ignorado (.gitignore:16-18)

# 3) Arrancar
pnpm dev              # astro dev → http://localhost:4321 (package.json:9)
pnpm run dev:lan      # bash scripts/run-lan.sh, para celular en la misma Wi-Fi (package.json:10)
```

Scripts disponibles (`package.json:8-15`): `dev`, `dev:lan`, `build`, `preview`, `astro` y `prepare`. **No** hay scripts `test`, `lint`, `format`, `check` ni `deploy`; `pnpm exec astro check` funciona porque `@astrojs/check` está instalado (`package.json:48`), y el formateo se aplica vía `npx lint-staged` en el hook.

VS Code: la extensión recomendada es `astro-build.astro-vscode` (`.vscode/extensions.json:2`) y la configuración de depuración lanza `./node_modules/.bin/astro dev` como terminal (`.vscode/launch.json:5-8`). `tsconfig.json:2-13` extiende `astro/tsconfigs/strict`, incluye `.astro/types.d.ts` y todo el árbol, excluye `dist` y fija `jsx: react-jsx` con `jsxImportSource: react`.

> `scripts/run-lan.sh` exporta `AUTH_TRUST_HOST=true` y un `ML_API_URL` por defecto, rechaza el puerto `8000` (reservado para la API ML) y comprueba `/api/health` sin bloquear (`scripts/run-lan.sh:11-56`). Ver `docs/SCRIPTS.md`.

---

## 2. Flujo Git

1. **Rama**: crear desde `main` con `feat/<tema>`, `fix/<tema>`, `docs/<tema>` o `refactor/<tema>`. Es una convención de equipo, no una regla automatizada; `git log -15` muestra commits `feat`, `fix`, `docs` y `refactor` (incluido `feat!` en `0c71598` y `313e38a`).
2. **Cambios pequeños y compilables**: `pnpm build` en verde antes de abrir el PR (`package.json:11`).
3. **Commit**: formato `tipo(alcance): mensaje` en minúsculas y sin punto final. Ejemplos reales: `fix(trips): direct fast inference without artificial 503 retry delays` (`4e977f5`) y `feat: add responsable field to readings and improve google sheets sync support` (`03f8b97`). Tipos usados: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`. Los mensajes visibles en el historial están en español y en inglés; mantener el idioma del alcance y ser consistente dentro del PR.
4. **Husky en pre-commit** (`.husky/pre-commit:1-11`):
   - Imprime `🔒 Ejecutando controles DevSecOps (pre-commit)...` y ejecuta `npx lint-staged`.
   - `lint-staged` aplica `"*": "prettier --ignore-unknown --write"` (`package.json:57-59`) a los archivos en staging. No hay configuración de Prettier en el repo: se usa el comportamiento por defecto de la versión instalada (`prettier ^3.9.10`, `package.json:54`).
   - Después bloquea la confirmación si `git diff --cached --name-only` contiene un nombre que coincida con `.env`, `credentials` o `secret`, salvo `.env.example`. El patrón es case-sensitive; también alcanza rutas legítimas con `secret` en minúsculas.
   - Si te frena: `git reset HEAD <archivo>` para sacarlo del staging y vuelve a confirmar. **No usar `--no-verify`**: el bloqueo existe para proteger secretos (`.husky/pre-commit:8-10`; `docs/SECURITY.md` §1).
   - No hay hook de pre-push propio: los archivos bajo `.husky/_/` son la infraestructura interna de Husky, no comprobaciones del proyecto.
5. **PR**: describir qué cambia, cómo probarlo con los IDs de `docs/TESTING.md`, capturas si hay UI, y el entorno usado (local/preview). Los PR generan deployments de preview en Vercel; el merge a la rama de producción redespliega (`docs/DEPLOYMENT.md` §5).
6. **Cierre**: squash o merge según el acuerdo del equipo; actualizar `docs/CHANGELOG.md` en el mismo PR si el cambio es visible para usuarios u operación.

---

## 3. Convenciones de código y datos

| Ámbito            | Regla                                                                                                                   | Evidencia                                                                     |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| TypeScript        | Modo estricto; documentar el **porqué** en JSDoc de servicios/endpoints, no reescribir el código                        | `tsconfig.json:2`; `src/backend/services/*.ts`; `src/middleware.ts:5-8,44-48` |
| React             | `jsx: react-jsx` con `jsxImportSource: react`; integración `@astrojs/react`                                             | `tsconfig.json:11-12`; `astro.config.mjs:8,20`                                |
| Idioma            | Identificadores en inglés; UI y mensajes de error al usuario en español                                                 | `docs/REQUIREMENTS.md`, `src/pages/api/auth/register.ts`                      |
| Datos agronómicos | IDs `T{f}-P{c}` / `P-01…P-20`, fechas `YYYY-MM-DD`; reglas de dominio junto al parser                                   | `docs/DATA-DICTIONARY.md`; `docs/DEMO-DATA.md`                                |
| Multi-tenant      | Toda lectura/escritura de datos se scoping por `finca_id` y validada contra membresía; no confiar solo en el middleware | `src/middleware.ts:19-27`; `docs/DATABASE.md` §5; `docs/SECURITY.md` §2       |
| Secretos          | Nunca en código, PRs, logs ni Sheets; solo `.env` local y variables de Vercel                                           | `.gitignore:16-18,32-37`; `.husky/pre-commit:5-11`; `docs/SECURITY.md` §1     |
| Dependencias      | Justificar cada una en el PR; las mayores merecen ADR                                                                   | `package.json:16-59`; `docs/decisions/`                                       |

---

## 4. Definición de Hecho (DoD)

Una tarea solo se cierra cuando se cumple todo lo siguiente:

- [ ] `pnpm build` en verde y, si se tocó código, `pnpm exec astro check` ejecutado (errores preexistentes documentados, no ignorados en silencio).
- [ ] Casos de `docs/TESTING.md` correspondientes ejecutados y sus IDs + evidencia (código HTTP, capturas, consultas SQL) registrados en el PR.
- [ ] Sin regresión en auth, roles ni rutas protegidas: al menos TEST-13; si toca multi-tenant, TEST-21; si toca ML, TEST-18/19.
- [ ] Variables de entorno nuevas añadidas a `.env.example`, a la matriz de `docs/DEPLOYMENT.md` §2 y a todos los entornos de Vercel; sin secretos reales en el repositorio.
- [ ] Documentación afectada actualizada: índice `docs/README.md` si es doc nuevo; `ENDPOINTS.md`/`ROUTES.md` si cambia una ruta; `DEPLOYMENT.md` si cambia infraestructura; `TROUBLESHOOTING.md` si aparece un modo de fallo; `CHANGELOG.md` en cambios visibles.
- [ ] Si hubo una decisión arquitectónica o de seguridad: **nuevo ADR** (§5). Nunca borrar ni reescribir uno antiguo: se marca como _superseded_ por el siguiente.
- [ ] Pre-commit de Husky respetado y `git diff` revisado antes de pushear; PR con checklist de revisión completado (§6).

---

## 5. Cómo añadir documentación y ADRs

### 5.1 Documentación técnica

| Tipo de cambio            | Documento(s) a actualizar                                                       | Regla                                                                                    |
| :------------------------ | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------- |
| Endpoint o ruta nueva     | `docs/ENDPOINTS.md` + `docs/ROUTES.md`                                          | Incluir método, auth requerida, body, códigos reales del handler y un `curl` verificable |
| Tabla/columna o migración | `docs/DATABASE.md` (+ `docs/DATA-DICTIONARY.md` si cambia el contrato de datos) | ER, SQL aplicado y plan de rollback                                                      |
| Variable de entorno       | `.env.example` + `docs/DEPLOYMENT.md` §2 + `docs/SECURITY.md` si es secreto     | Nombre, obligatoriedad, default, uso y consecuencia de falta                             |
| Comportamiento visible    | `docs/USER_MANUAL.md` + `docs/CHANGELOG.md`                                     | Pasos para el usuario, no descripción técnica                                            |
| Requisito                 | `docs/REQUIREMENTS.md`                                                          | ID RF/RNF + traza CU/US + criterio de aceptación                                         |
| Procedimiento operativo   | `docs/DEPLOYMENT.md` o `docs/TROUBLESHOOTING.md`                                | Comandos ejecutables y señal de éxito/fracaso                                            |
| Prueba                    | `docs/TESTING.md`                                                               | ID nuevo, pasos, esperado y evidencia                                                    |
| Documento nuevo           | `docs/README.md`                                                                | Añadir fila al índice con público objetivo y contenido                                   |

Todos los documentos operativos de este conjunto llevan el encabezado de verificación y la sección `## Trazabilidad` con columnas **tema → archivo de configuración/código → doc relacionado → verificación**. La ruta unificada citada en dicho encabezado (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`) se genera con el generador de documentación (no incluido); el índice navegable es `docs/README.md`.

### 5.2 ADR (Architecture Decision Record)

- **Ubicación**: `docs/decisions/ADR-00X-<slug>.md`. Existen ADR-001…ADR-008 (`docs/decisions/`), por lo que el próximo número libre es **ADR-009**. ADR-008 decide la ruta `/landing` de la landing; la integración ML no tiene ADR propio (`docs/CAMERA-ML.md`). Darlo por creado solo cuando se escriba con este formato.
- **Formato mínimo**: `Status` (proposed/accepted/superseded), `Date` (AAAA-MM-DD), `Context`, `Decision`, `Alternatives` (incluir las rechazadas y por qué) y `Consequences` (positivas y negativas). Añadir `Links` a código, doc y caso de prueba.
- **Regla de inmutabilidad**: no editar el contenido histórico de un ADR aceptado. Si una decisión cambia (p. ej., ADR-004 parcialmente reemplazado por ADR-007, `docs/CHANGELOG.md`), crear uno nuevo con `Status: superseded` en el antiguo y enlace cruzado.
- **Publicación**: añadir la fila al índice `docs/README.md`, referenciarlo desde la doc técnica correspondiente y registrar la decisión en `docs/CHANGELOG.md`.
- **Cuándo escribirlo**: cambio de adaptador o plataforma, estrategia de autenticación/sesión, esquema de BD multi-tenant, integración con proveedor externo (ML, SIATA, Sheets), dependencia mayor o decisión de seguridad. Los casos menores se resuelven en el PR.

---

## 6. Checklist de revisión de PR

- [ ] ¿Cambia comportamiento visible? → `USER_MANUAL.md` y `CHANGELOG.md` al día.
- [ ] ¿Toca auth, sesión, permisos o BD? → `AUTH.md`, `DATABASE.md`, `SECURITY.md` y `DEPLOYMENT.md` al día; ejecutar TEST-13/21.
- [ ] ¿Añade o rota secretos / variables? → `.env.example`, matriz de entorno y entornos de Vercel actualizados; sin valores reales en el diff.
- [ ] ¿Cambia un endpoint? → `ENDPOINTS.md`, `ROUTES.md`, `TESTING.md` y ADR si altera el contrato.
- [ ] ¿Añade dependencia? → justificación en la descripción; si es estructural, ADR.
- [ ] ¿Deja `TODO` o código comentado? → no se acepta: se implementa o se crea un issue en `docs/ROADMAP.md`.
- [ ] ¿Modifica infraestructura? → checklist pre/post deploy y rollback de `docs/DEPLOYMENT.md` ejecutados.
- [ ] ¿Hay `docs/UNIFIED/…` o índice nuevo? → actualizar `docs/README.md` en el mismo PR y verificar los enlaces relativos.

---

## Trazabilidad

| Tema                   | Archivo de configuración / código                                                                                    | Doc relacionado                                                 | Verificación                                                                 |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| Setup y scripts        | `package.json:5-15`; `pnpm-lock.yaml`; `.vscode/extensions.json:2`; `.vscode/launch.json:5-8`                        | `docs/README.md`, `docs/SCRIPTS.md`                             | `pnpm install`, `pnpm dev`, `pnpm run dev:lan`                               |
| Husky y Prettier       | `.husky/pre-commit:1-11`; `package.json:14,54,57-59`; `.gitignore:16-18`                                             | `docs/SECURITY.md`, `docs/DEPLOYMENT.md`                        | Hacer commit con `.env` en staging → bloqueo; con `.env.example` → permitido |
| Convenciones de código | `tsconfig.json:2-13`; `astro.config.mjs:8,20`; `git log -15`                                                         | `docs/COMPONENTS.md`, `docs/DATA-DICTIONARY.md`                 | `pnpm build`; revisión de `git log`                                          |
| DoD y pruebas          | `docs/TESTING.md` §§2–6; `src/middleware.ts:9-27`                                                                    | `docs/TESTING.md`, `docs/DEPLOYMENT.md`                         | IDs de test en el PR; TEST-13/21/18/19                                       |
| Documentación y ADRs   | `docs/decisions/ADR-001-astro-ssr-vercel.md` … `ADR-007-bypass-siata.md`; `docs/README.md:1-37`; `docs/CHANGELOG.md` | `docs/README.md`, `docs/ROADMAP.md`                             | `ls docs/decisions` → 007 como último; índice actualizado                    |
| Convención documental  | `docs/README.md`, el generador de documentación (no incluido)                                                        | PDF unificado (`./UNIFIED/Macollo-Documentacion-Unificada.pdf`) | `pdfinfo` y regeneración reproducible                                        |

---

# Capítulo 35. Troubleshooting (Runbook) - Macollo (DOC-19)

**Ruta fuente:** `docs/TROUBLESHOOTING.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-19**.
>
> Alcance: síntoma → causa probable → comprobación → acción. No se modifica código aquí; cuando la causa está en el código se registra como deuda y se remite a `docs/ROADMAP.md` / `docs/SECURITY.md`. Para despliegue y `curl` de verificación, ver `docs/DEPLOYMENT.md`.

---

## 1. Antes de empezar: árbol de decisión

```text
INCIDENTE
├─ ¿Afecta a TODAS las rutas (incluida "/")?
│  ├─ Sí → ¿Logs muestran "[Auth] Falta AUTH_SECRET"?
│  │        ├─ Sí → definir AUTH_SECRET en Vercel (auth.config.ts:28-32) y redesplegar
│  │        └─ No → ¿"[PostgreSQL] Error…" / timeout?
│  │                 ├─ Sí → psql "$DATABASE_URL" -c 'SELECT 1' → revisar BD/SSL/pool (client.ts:18-44)
│  │                 └─ No → ¿403 "Cross-site POST form submissions are forbidden"?
│  │                          └─ Sí → Origin distinto del dominio (astro.config.mjs:13)
│  └─ No → ¿Código HTTP predominante?
│     ├─ 401 → sesión ausente/expirada; rutas protegidas en middleware.ts:9-27, sesión JWT de 24 h (auth.config.ts:42-52,187-204)
│     ├─ 403 → permisos de finca en el handler o dueño-only en Sheets (CHANGELOG.md:31)
│     ├─ 403 en POST multipart → checkOrigin: enviar Origin = dominio
│     ├─ 429 → rate-limit por IP; esperar Retry-After (middleware.ts:29-37; rateLimit.ts:47-57)
│     ├─ 500 → log del endpoint: [SIATA], [AQI], Excel, Postgres
│     ├─ 502 → fallo de conexión Vercel → Cloud Run (trips-diagnosis.ts:160-172)
│     └─ 503 → ML apagado / cold start (trips-diagnosis.ts:220-230)
```

**Evidencia mínima antes de escalar** (lista de evidencia ampliada):

1. URL exacta, método, rol y finca activa; fecha-hora UTC.
2. Código HTTP y cuerpo del JSON (o `details` del error de validación Zod).
3. Logs de la función en Vercel → Deployments → Functions/Logs; prefijos útiles: `[Auth]`, `[Register]`, `[ForgotPassword]`, `[ResetPassword]`, `[PostgreSQL]`, `[SIATA]`, `[AQI]`, `[Notificaciones - Correo]`, `[/api/weather]`.
4. Si es ML: salida de `curl -sS -w '\n%{http_code}\n' "$BASE/api/trips-diagnosis"` y el estado del servicio en Cloud Run.
5. Si son datos: finca, planta, fecha y la fila de CSV/Sheets implicada.
6. Hash desplegado (`git rev-parse --short HEAD`) y entorno (Production/Preview).

---

## 2. Autenticación, sesión y CSRF

> Corrección al runbook anterior: el login por credenciales busca **email o teléfono**, no nombre. La consulta es `LOWER(COALESCE(email,'')) = LOWER($1) OR phone = $1` (`auth.config.ts:93-103`). El `name` se devuelve al construir el usuario, pero no se usa como identificador.

| Síntoma                                                       | Causa probable                                                                                                | Comprobación / acción                                                                                                                                                                                                                                                                            |
| :------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Credenciales incorrectas` siempre                            | Usuario inexistente, hash no bcrypt o identifier no reconocido                                                | `SELECT id, name, email, phone, role, left(password,7) AS prefijo FROM users WHERE LOWER(COALESCE(email,'')) = LOWER('x') OR phone = 'x';`. Solo se comparan hashes `/^\$2[aby]\$/` o contraseñas antiguas en texto plano, que se migran a bcrypt en el primer login (`auth.config.ts:111-143`). |
| `CredentialsSignin` en logs                                   | `authorize` devolvió `null` (usuario no encontrado, password inválido o error SQL)                            | Leer los `console.warn` de `auth.config.ts:82-165`; no es un error de la UI.                                                                                                                                                                                                                     |
| Login redirige a `http://localhost` tras proxy                | `x-forwarded-proto`/`x-forwarded-host` ausentes o `AUTH_TRUST_HOST` no configurado                            | El middleware reescribe la URL y `AUTH_URL` cuando ve ambos headers (`src/middleware.ts:78-95`); verificar que el proxy (Vercel/túnel) los envía. `trustHost: true` ya está fijo en `auth.config.ts:55`.                                                                                         |
| `403 Cross-site POST form submissions are forbidden`          | `security.checkOrigin: true` (`astro.config.mjs:13`) con `Origin` ausente o distinto en un POST `multipart`   | Reenviar con `-H "Origin: https://<dominio>"`. Ver `docs/DEPLOYMENT.md` §6-D. No desactivar el control.                                                                                                                                                                                          |
| Google OAuth falla                                            | Credenciales o callback incorrectos                                                                           | Verificar `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (`auth.config.ts:58-68`) y el callback autorizado `https://<dominio>/api/auth/callback/google`. `allowDangerousEmailAccountLinking: true` (`:67`) permite vincular por email: revisar si hay cuentas duplicadas.                             |
| `[Auth] Falta AUTH_SECRET` en arranque                        | Secreto no definido con `NODE_ENV=production`                                                                 | Definirlo (`openssl rand -base64 32`) en Vercel para **todos** los entornos y redesplegar (`auth.config.ts:28-32`). En dev hay clave temporal (`:33-37,175`).                                                                                                                                    |
| La sesión «nunca caduca» o caduca antes                       | Cambio de `SESSION_MAX_AGE_HOURS` con sesiones ya emitidas; expiración absoluta sealada en `sessionStartedAt` | Default 24 h y mínimo 1 h (`auth.config.ts:42-52`); el callback devuelve `null` al superar `maxAge` (`:187-204`). Cerrar sesión y volver a entrar para aplicar el nuevo valor.                                                                                                                   |
| El rol no cambia en la UI tras un `UPDATE`                    | El rol viaja en el JWT; la autorización sensible se relee de BD                                               | `SELECT id, email, role, updated_at FROM users WHERE email = 'x';` y re-login. La UI muestra `session.user.role` (`auth.config.ts:179-185`), mientras que `getAuthUser` relee BD (`authz.ts`, explicado en `auth.config.ts:21-22`).                                                              |
| Registro con `role: "Admin"` queda `Campesino`/`Agropecuario` | Comportamiento intencional: `accountType` solo permite esos dos valores                                       | Promover con `UPDATE users SET role = 'Admin', updated_at = NOW() WHERE email = 'x';` (`docs/CHANGELOG.md:19,30`).                                                                                                                                                                               |
| Muchos `401` de golpe                                         | Intento de fuerza bruta o cookie incompatible con el dominio                                                  | Revisar rate-limit (§5) y que la cookie tenga `Secure` en producción (`authz.ts:141`).                                                                                                                                                                                                           |
| `429` en login/registro                                       | Límite por IP alcanzado                                                                                       | Esperar el `Retry-After`: 20 intentos/300 s en `callback/credentials`, 10 en `register`, 8 en `forgot`/`reset`, 15 en `invitations/use` (`middleware.ts:29-37`). Es en memoria: con varias instancias el contador no es global (`rateLimit.ts:1-3`).                                             |

---

## 3. Datos, fincas e importaciones

| Síntoma                                                 | Causa probable                                                                                                        | Comprobación / acción                                                                                                                                                                                                                    |
| :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tarjetas en `--` / `N/D`                                | No hay `lecturas` para la finca activa, o la cookie `finca_activa` apunta a otra finca                                | `SELECT f.id, f.nombre, count(l.id) AS lecturas FROM fincas f LEFT JOIN lecturas l ON l.finca_id=f.id GROUP BY f.id, f.nombre ORDER BY f.id;` Verificar la finca activa en la UI. Sin finca se usa la matriz vacía (`docs/DATABASE.md`). |
| Google Sheets devuelve `422`                            | Documento no compartido como «cualquier persona con el enlace» / CSV público                                          | Probar la URL `export?format=csv` en una ventana de incógnito antes de pegarla en `/history`.                                                                                                                                            |
| No aparece «Conectar Google Sheets» o da `403`          | Solo el **dueño** de la finca activa puede sincronizar (`canConnectSheets`, `docs/CHANGELOG.md:22,31`)                | Miembros y staff deben usar **Importar Excel/CSV**. No es un fallo de permisos de Google.                                                                                                                                                |
| Sheets importa `0 registros`                            | Cabeceras o filas incorrectas                                                                                         | Comprobar `ID_planta`, `fecha`, `T_Ext_C`, `T_Int_C`, `humedad_Pct`, `T_Planta_C`, `Ph`, `ALtura_cm` con datos debajo `docs/DATA-DICTIONARY.md`).                                                                                        |
| Registros duplicados o «no se actualiza» la importación | Upsert por `UNIQUE (finca_id, planta_id, fecha, hora)` (`scripts/migrate-neon.mjs:137`)                               | Si la hora cambia, se crea otra fila. Consultar `SELECT fecha, hora, count(*) FROM lecturas WHERE finca_id = X GROUP BY 1,2 ORDER BY 1 DESC, 2;`                                                                                         |
| Export Excel vacío o `500`                              | Sin sesión, sin dataset o error en generación                                                                         | `curl -sS -o /dev/null -w '%{http_code} %{content_type}\n' "$BASE/api/export-excel"` sin sesión debe dar `401`; con sesión, `application/vnd…` y binario. Buscar `Error al generar Excel` en logs.                                       |
| No puedo borrar usuario (`409`)                         | Es dueño de finca y `fincas.dueno_id` es `ON DELETE RESTRICT` (`scripts/migrate-neon.mjs:69`; `docs/CHANGELOG.md:33`) | Transferir o archivar/eliminar sus fincas antes. No es un `500`.                                                                                                                                                                         |
| Invitación rechazada                                    | Código expirado, usos agotados o inactiva                                                                             | `SELECT codigo, usos_maximos, usos_usados, activa, expira_en FROM finca_invitaciones WHERE codigo = 'XXXXXXXX';` El canje es atómico (`docs/DATABASE.md`).                                                                               |
| Fotos no aparecen tras subir                            | La galería guarda archivos en `public/uploads/gallery` (`gallery/upload.ts:65-68`) y la BD en `photos`                | Comprobar `SELECT id, url, finca_id FROM photos ORDER BY uploaded_at DESC LIMIT 10;`. En Vercel el filesystem no es persistente: ver `docs/DEPLOYMENT.md` §7.                                                                            |
| Widgets de clima/AQI vacíos                             | Proveedor externo caído o permiso de ubicación denegado                                                               | `/api/weather` y `/api/aqi` devuelven `200` con fallback (`weather.ts:48-60`; `aqi.ts:32-39`). Si el navegador bloquea geolocalización, se usan coordenadas de Medellín (`weather.ts:32-37`).                                            |
| Canvas 3D en negro                                      | WebGL no disponible o Three.js aún cargando                                                                           | Recargar; verificar soporte WebGL del dispositivo. No afecta a los datos.                                                                                                                                                                |

---

## 4. Base de datos

| Síntoma                                                      | Causa probable                                                         | Acción                                                                                                                                                  |
| :----------------------------------------------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `[PostgreSQL] Error inesperado en cliente inactivo`          | Pool con conexiones muertas; el error se registra en `client.ts:46-48` | Revisar latencia/firewall y `idleTimeoutMillis: 30000`. Si es recurrente, revisar el proveedor.                                                         |
| `connectionTimeout` / `ECONNREFUSED`                         | Host/puerto/credenciales o SSL incorrectos                             | `psql "$DATABASE_URL" -c 'SELECT 1';`. Con URL, SSL en producción usa `rejectUnauthorized: false` (`client.ts:20-25`); sin URL, timeout de 2 s (`:42`). |
| `relation "users" does not exist`                            | Esquema no aplicado                                                    | `psql "$DATABASE_URL" -f src/db/auth-schema.sql` y `-f src/db/greenhouse-schema.sql`; luego migraciones de `src/db/migrations/` (`docs/DATABASE.md`).   |
| `duplicate key value violates unique constraint` en registro | Email/celular ya existentes                                            | Es un `400` guiado, no un bug. Verificar con la consulta de email/teléfono del §2.                                                                      |
| `accounts` / `sessions` vacías                               | Normal con login por credenciales + JWT (`docs/DATABASE.md`)           | No «reparar». Solo se llenan con OAuth o con estrategia de sesión en BD, respectivamente.                                                               |
| `verification_token` crece                                   | Códigos nunca usados                                                   | `DELETE FROM verification_token WHERE expires < NOW();` (`docs/DATABASE.md`).                                                                           |
| Rol con valores antiguos (`Agronomo`, `Super admin`)         | BD no migrada                                                          | `scripts/migrate-neon.mjs:15-44` normaliza el enum; también `src/db/migrations/001-roles-farms.sql`.                                                    |

### Consultas SQL útiles

```sql
-- 1) Conectividad y versión
SELECT 1;
SELECT current_database(), current_user, version();

-- 2) Usuarios y roles (columna con mayúsculas: ir entre comillas)
SELECT id, name, email, phone, role, "emailVerified", updated_at
FROM users ORDER BY id LIMIT 20;

-- 3) Membresías por finca
SELECT f.id AS finca_id, f.nombre, f.dueno_id,
       u.email AS miembro, fm.rol_finca
FROM fincas f
LEFT JOIN finca_miembros fm ON fm.finca_id = f.id
LEFT JOIN users u ON u.id = fm.user_id
ORDER BY f.id, u.email;

-- 4) Volumen de lecturas por finca y día
SELECT finca_id, fecha, count(*) AS lecturas,
       round(avg(ph_suelo)::numeric, 2) AS ph_promedio
FROM lecturas
GROUP BY finca_id, fecha
ORDER BY fecha DESC, finca_id
LIMIT 30;

-- 5) Duplicados potenciales por planta/fecha/hora (debería dar 0 filas)
SELECT finca_id, planta_id, fecha, hora, count(*)
FROM lecturas GROUP BY 1,2,3,4 HAVING count(*) > 1;

-- 6) Matriz de 20 plantas de una finca
SELECT p.fila, p.columna, p.plant_id, count(l.id) AS lecturas
FROM plantas p LEFT JOIN lecturas l ON l.planta_id = p.id
WHERE p.finca_id = 1
GROUP BY p.fila, p.columna, p.plant_id
ORDER BY p.fila, p.columna;

-- 7) Invitaciones con estado
SELECT codigo, finca_id, usos_maximos, usos_usados, activa, expira_en
FROM finca_invitaciones ORDER BY created_at DESC LIMIT 20;

-- 8) Auditoría de cambios de contraseña/rol
SELECT id, name, role, updated_at FROM users ORDER BY updated_at DESC LIMIT 20;

-- 9) Limpieza de códigos expirados
DELETE FROM verification_token WHERE expires < NOW();

-- 10) Fotos huérfanas o sin finca
SELECT count(*) AS sin_finca FROM photos WHERE finca_id IS NULL;
SELECT pg_size_pretty(pg_database_size(current_database())) AS tamano_bd;
```

> Antes de cualquier `UPDATE`/`DELETE`: `pg_dump "$DATABASE_URL" > backup_$(date +%F-%H%M).sql`. Procedimiento completo en `docs/DEPLOYMENT.md` §§3 y 8.

---

## 5. ML (Cloud Run), clima y límites de función

| Síntoma                                                                  | Causa probable                                                                        | Comprobación / acción                                                                                                                                                                                 |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /api/trips-diagnosis` → `503 {"status":"offline"…}`                 | Cloud Run apagado/cold start, `ML_API_URL` erróneo o timeout de 25 s en `/api/health` | Repetir tras unos segundos: el proxy dispara `/api/warmup` cuando `model_loaded === false` (`trips-diagnosis.ts:175-210`). Revisar `ML_API_URL` y el servicio remoto.                                 |
| `POST /api/trips-diagnosis` → `401` interno tras reinicio del contenedor | Cookie `macollo_session` en memoria ya no sirve                                       | El proxy renueva sesión con `ML_ADMIN_USER`/`ML_ADMIN_PASSWORD` y reintenta (`:50-77,136-146`). Si falla, rotar credenciales en ambos lados.                                                          |
| `POST /api/trips-diagnosis` → `502`                                      | `fetch failed` / `ECONNREFUSED` hacia Cloud Run                                       | Mensaje explícito con la URL usada (`:160-172`). Verificar red saliente y HTTPS.                                                                                                                      |
| `403` en el `POST` con `multipart/form-data`                             | `checkOrigin` de Astro                                                                | Añadir `-H "Origin: $BASE"` (`astro.config.mjs:13`).                                                                                                                                                  |
| La petición ML muere cerca de los 60 s                                   | `maxDuration: 60` en Vercel y en la ruta                                              | Los `fetch` de `/api/predict` no llevan `AbortSignal` (`:130-146`); las constantes `TOTAL_BUDGET_MS`/`ATTEMPT_TIMEOUT_MS` (`:21-26`) no se aplican ahí. Deuda documentada en `docs/DEPLOYMENT.md` §7. |
| `/api/siata` → `401`                                                     | Endpoint protegido por middleware                                                     | Obtener sesión válida en el navegador; `GET /api/siata` no es público (`docs/ENDPOINTS.md`; `siata.ts:5-9`).                                                                                          |
| `/api/siata` → `500` en ~3 s                                             | proveedor `siata.gov.co:8089` caído o timeout                                         | Comportamiento esperado (`siata.ts:12-32`): el dashboard usa Open-Meteo. No escalar como incidente de la app salvo que sea continuo.                                                                  |
| `429` en `/api/auth/*`                                                   | Rate-limit por IP                                                                     | Ventana de 300 s; cabecera `Retry-After` (`middleware.ts:29-37,109-123`). Con varias instancias cada una cuenta por separado (`rateLimit.ts:1-3`).                                                    |

---

## 6. Build y despliegue

| Síntoma                                       | Causa probable                                                                        | Acción                                                                                                                                                                    |
| :-------------------------------------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm build` falla por tipos (p. ej. `sileo`) | Errores de tipado pre-existentes                                                      | Confirmar con `pnpm exec astro check` (`@astrojs/check` está en `package.json:48` pero no hay script `check`). Registrar issue; no silenciar con `// @ts-ignore` sin ADR. |
| Todo da `500` en Vercel                       | `AUTH_SECRET` / `DATABASE_URL` ausentes o mal aplicados al entorno Production         | Revisar Variables de entorno y redesplegar; ver `docs/DEPLOYMENT.md` §2 y §6.                                                                                             |
| Funciona local, falla en Vercel               | `POSTGRES_HOST=localhost` en Vercel, `NODE_ENV` distinto, o proxy sin `x-forwarded-*` | Usar BD nube, no fijar `NODE_ENV` a mano y comprobar `AUTH_TRUST_HOST` (`middleware.ts:78-95`).                                                                           |
| `404` en rutas SSR                            | Build estático o adaptador incorrecto                                                 | `output: "server"` y `@astrojs/vercel` en `astro.config.mjs:5,14,19`.                                                                                                     |
| `403` solo en el celular                      | `Origin` del túnel/IP distinto al de la URL; o `getUserMedia` en HTTP                 | `Origin` debe coincidir con el host usado (`astro.config.mjs:13`); en HTTP por IP la cámara usa `input capture` (`docs/CAMERA-ML.md`).                                    |
| Cambios no visibles tras merge                | Deployment de preview promovido o caché del CDN                                       | Verificar hash en Vercel → Deployments y repetir `curl` con `Cache-Control: no-cache` (las exportaciones ya llevan `no-cache`, `docs/DEPLOYMENT.md` anterior §6).         |

---

## Trazabilidad

| Tema                               | Archivo de configuración / código                                                                  | Doc relacionado                                                    | Verificación                                    |
| :--------------------------------- | :------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- | :---------------------------------------------- |
| Árbol de decisión y signos vitales | `astro.config.mjs:12-19`; `src/middleware.ts:76-164`; `src/db/client.ts:18-48`                     | `docs/DEPLOYMENT.md`, `docs/README.md`                             | `curl` §6 de `docs/DEPLOYMENT.md`               |
| Auth y CSRF                        | `auth.config.ts:28-68,93-103,170-208`; `src/middleware.ts:78-95`; `authz.ts:141`                   | `docs/AUTH.md`, `docs/SECURITY.md`                                 | `SELECT` de usuarios; login; `Origin` explícito |
| Datos multi-tenant                 | `scripts/migrate-neon.mjs:62-161`; `gallery/upload.ts:65-68`; `docs/CHANGELOG.md:19-31`            | `docs/DATABASE.md`, `docs/DATA-DICTIONARY.md`, `docs/CAMERA-ML.md` | Consultas SQL 3–7 y 10                          |
| SQL y mantenimiento                | `src/db/client.ts:18-48`; `src/db/migrations/*`; `docs/DATABASE.md`                                | `docs/DEMO-DATA.md`, `docs/DEPLOYMENT.md`                          | Consultas 1–10; `pg_dump` previo                |
| ML, clima y timeouts               | `trips-diagnosis.ts:4-7,21-26,50-77,130-230`; `siata.ts:11-32`; `weather.ts:32-60`; `aqi.ts:25-39` | `docs/CAMERA-ML.md`, `docs/ROADMAP.md`                             | Health `200/503`; latencia SIATA ≤3 s           |
| Rate-limit y headers               | `middleware.ts:29-74,100-127`; `rateLimit.ts:9-65`                                                 | `docs/SECURITY.md` (SEC-05/07)                                     | `401`, `429`, `Retry-After`, `curl -I`          |
| Build/despliegue                   | `package.json:5-15,47-59`; `astro.config.mjs:5,14,19`                                              | `docs/DEPLOYMENT.md`, `docs/CONTRIBUTING.md`                       | `pnpm build`; `pnpm exec astro check`           |
| Convención documental              | `docs/README.md`, el generador de documentación (no incluido)                                      | PDF unificado (`./UNIFIED/Macollo-Documentacion-Unificada.pdf`)    | Regeneración y `pdfinfo`                        |

---

# Capítulo 36. Glosario - Macollo (DOC-20)

**Ruta fuente:** `docs/GLOSSARY.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-20**.

## Agronómico

- **pH del suelo:** acidez/alcalinidad (0–14). Óptimo **6.0–6.8**; alerta 5.5–6.0/6.8–7.2; crítico fuera. Columna `Ph`.
- **Temp. interna (`T_Int_C`):** aire dentro de la nave. Referencia 22–26 °C.
- **Temp. externa (`T_Ext_C`):** aire fuera. Referencia 18–24 °C.
- **Temp. de suelo/planta (`T_Planta_C`):** sustrato donde está la planta. Referencia 19–22 °C. **Null el 29–30-sep-2026** (no se tomó).
- **Humedad (`humedad_Pct`):** relativa % (0–100).
- **Altura (`ALtura_cm`)** → **crecimiento %** (derivado; ≤100 cm directo, si no proporcional).
- **Fase fenológica:** `Desarrollo Vegetativo` / `Floración` / `Llenado de Fruto` / `Maduración`.
- **Sanidad:** `Excelente` / `Saludable` / `Vulnerable` / `Crítica` (semáforo 🟢🟢🟡🔴).
- **Productividad:** `Alta` / `Media` / `Baja`.
- **Matriz:** 4 filas (`t0–t3`, tratamientos) × 5 columnas (`Col 1–5`); códigos `T{f}-P{c}` e IDs `P-01–P-20`.
- **Toma:** medición de campo de un día (rango real 2026-09-14→30).

## Multi-finca y roles de finca

- **Finca:** unidad multi-tenant con 20 plantas (matriz 4×5) y sus `lecturas`. Un usuario puede pertenecer a varias (N:N en `finca_miembros`).
- **Dueño:** quien creó la finca (`finca_miembros.rol_finca='dueno'`); la gestiona (editar, invitar, expulsar) y **solo él** conecta/sincroniza Google Sheets.
- **Miembro:** usuario unido por invitación; lee/registra mediciones (Excel/CSV) pero no configura la finca ni sincroniza Sheets.
- **Staff:** roles de sistema `Superadmin`/`Admin`; ven todas las fincas y operan sus datos sin ser miembros. Su inicio es `/admin` (**Entrar** fija la finca activa).
- **Finca activa:** la finca sobre la que opera la sesión; cookie httpOnly `finca_activa`, revalidada contra la BD en cada API.

## Técnico

- **SSR:** render en servidor por request (Astro `output: server`).
- **JWT:** token de sesión con `sub` + `role`; exige re-login tras cambio de rol.
- **Proxy SIATA:** `/api/siata` (evitaba CORS, timeout 3 s). **Pausado**: sin consumidores internos desde `efed143` (ver ADR-007).
- **Fuente climática actual:** Open-Meteo directo + fallback offline (22 °C/60 %/viento 5 km/h). Widget con **viento (km/h)**, no irradiación.
- **CSV-first:** ingesta Sheets sin credenciales vía `export?format=csv`.
- **Finca / lectura:** cada finca tiene 20 plantas; una `lecturas` guarda una visita a una planta (pH, temperaturas, humedad, altura, fase, sanidad…).
- **AQI:** índice de calidad del aire (waqi.info) mostrado en el Dashboard.
- **MACOLLO:** marca y nombre del proyecto (logo `gulupa.svg`).

## Trazabilidad

| Tema                | Código / configuración                              | Documento relacionado                                                      | Verificación         |
| :------------------ | :-------------------------------------------------- | :------------------------------------------------------------------------- | :------------------- |
| Términos de dominio | `src/shared/badges.ts`, `src/shared/plantMatrix.ts` | DOMAIN-MODEL (Capítulo 8 · DOC-32), DATA-DICTIONARY (Capítulo 25 · DOC-15) | Revisión de umbrales |

---

# Capítulo 37. Roadmap - Macollo (DOC-23)

**Ruta fuente:** `docs/ROADMAP.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-23**.

> Origen: RF-20…22, SEC-01…06, brechas de AUTH/DATABASE. Actualizar al cerrar cada item (mover a CHANGELOG).

## v1.1 — Endurecimiento y persistencia (completado)

- [x] **SEC-01/02**: sesión verificada en handlers + middleware protege `/metrics`, `/history`, `/settings`, `/farms`, `/gallery`, `/admin` (redirect a `/` con `?desde=`).
- [x] **SEC-04/05**: Zod password `min(8)` + rate-limit en `register`/`forgot-password`/`reset-password`/`callback`.
- [x] **SEC-03**: proxy servidor para AQI en `/api/aqi` y clima en `/api/weather`.
- [x] **RF-21 (persistencia)**: `POST /api/sync-sheets` persiste en `lecturas` (idempotente por finca+planta+fecha+hora); lecturas scopeadas por finca en Dashboard, Métricas e Historial.
- [x] **CU-005 (exportación CSV)**: endpoint `GET /api/export-csv` implementado para descarga de historial completo por finca.
- [ ] **TESTING §4**: Vitest con `resolvePlantCoordinates`, `parseCSV`, schemas Zod.
- [x] Unificar etiqueta de rol (`'Admin'`, `'Superadmin'`, `'Agropecuario'`, `'Campesino'`).

## v1.2 — Agronomía operativa

- [ ] **RF-20**: umbrales configurables + avisos (CU-004/AD-002 dejan de ser propuesta).
- [ ] Filtros avanzados por métrica en Historial.
- [ ] Reactivar SIATA (revert `efed143` + ADR que cierre ADR-007) o retirarlo del todo (borrar proxy + `siata.ts` + ADR de retiro).

## v2.0 — IoT y escala

- [ ] **RF-22**: ingesta ESP32/Arduino (WebSocket/MQTT → `lecturas`); reevaluar Firebase si hay streaming real.
- [ ] Multi-invernadero (`invernadero` deja de ser constante).
- [ ] Roles granulares en UI (Sheets ya es **dueño-only**; pendiente pulir permisos de finca en la interfaz).

## Trazabilidad

| Tema       | Código / configuración              | Documento relacionado                                                  | Verificación                |
| :--------- | :---------------------------------- | :--------------------------------------------------------------------- | :-------------------------- |
| Pendientes | `docs/TESTING.md`, `src/pages/api/` | REQUIREMENTS (Capítulo 9 · DOC-04), ARCHITECTURE (Capítulo 4 · DOC-03) | Marcar como no implementado |

---

# Capítulo 38. Scripts de utilidad (DOC-25)

**Ruta fuente:** `docs/SCRIPTS.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-25**.

## Alcance

Los cinco archivos ejecutables de `scripts/` son `run-lan.sh`, `seed-admin.mjs`, `seed-demo.mjs`, `seed-production.mjs` y `migrate-neon.mjs`. Ninguno de los seeders ni la migración tiene un alias en `package.json`: se invocan con `node scripts/<archivo>.mjs`. Solo `dev:lan` tiene alias de pnpm (`package.json:8-15`). Las herramientas de documentación usadas para producir los artefactos derivados no se incluyen en este entregable.

**Corrección de deriva:** la versión anterior afirmaba que `run-lan.sh` exportaba `ML_API_URL=http://127.0.0.1:8000`. El código real exporta la URL de Cloud Run por defecto (`scripts/run-lan.sh:37-38`). También omitía `seed-production.mjs` y `migrate-neon.mjs`, y daba `POSTGRES_DATABASE=astro_auth_db` como valor por defecto, cuando `.env.example:7` usa `invernadero` (el valor `astro_auth_db` solo es el fallback interno de los seeders cuando no hay `.env`; `scripts/seed-admin.mjs:42`, `scripts/seed-demo.mjs:36`).

## Tabla de comandos

| Comando                                     | Archivo                                                      | Prerrequisitos                                                                             | Efecto principal                                                           | Idempotencia                                                                         |
| :------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `pnpm dev`                                  | `package.json:9`                                             | Node ≥ 22.12 (`package.json:5-7`), dependencias instaladas                                 | `astro dev` en `localhost:4321`                                            | N/A                                                                                  |
| `pnpm run dev:lan` / `./scripts/run-lan.sh` | `scripts/run-lan.sh` (alias `package.json:10`)               | Bash; `ip` o `hostname`; `ss` opcional; pnpm o npx                                         | Arranca Astro en `0.0.0.0:$PORT`, exporta `AUTH_TRUST_HOST` y `ML_API_URL` | N/A (detener con Ctrl+C)                                                             |
| `node scripts/seed-admin.mjs`               | `scripts/seed-admin.mjs`                                     | `ADMIN_EMAIL` y `ADMIN_PASSWORD`; BD accesible; `.env` opcional vía `dotenv/config` (`:1`) | Crea o **actualiza** un usuario con rol staff                              | Sí: actualiza por email en minúsculas (`:53-77`)                                     |
| `node scripts/seed-demo.mjs`                | `scripts/seed-demo.mjs`                                      | BD accesible; `.env` opcional (`:1`)                                                       | Crea usuario demo, finca, 20 plantas y 60 lecturas                         | Parcial: si la finca ya existe, termina sin tocar lecturas (`:70-79`)                |
| `node scripts/seed-production.mjs`          | `scripts/seed-production.mjs`                                | BD Neon accesible; `DATABASE_URL` recomendable                                             | Crea/actualiza Superadmin, finca principal, 20 plantas y 60 lecturas       | Parcial: actualiza usuario y reutiliza la primera finca (`:30-82`)                   |
| `node scripts/migrate-neon.mjs`             | `scripts/migrate-neon.mjs`                                   | BD Neon accesible; `DATABASE_URL` recomendable                                             | Ejecuta SQL de esquema en una transacción                                  | Parcial: usa `IF NOT EXISTS`, pero renombra tablas legacy y cambia roles (`:12-163`) |
| `pnpm build` / `pnpm preview`               | `package.json:11-12`                                         | Igual que `pnpm dev`                                                                       | Compilación SSR con adaptador Vercel / vista previa                        | N/A                                                                                  |
| Documentación derivada                      | Proceso de unificación y capturas (generadores no incluidos) | Artefactos ya presentes en `docs/UNIFIED/` y `docs/capturas/`                              | PDF unificado y CAP-01…CAP-08                                              | N/A: artefactos derivados                                                            |

## Variables de entorno

| Variable                                                                                        | Script(s) que la leen                                                                              | Default real                                                 | Observación                                                                                           |
| :---------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `PORT`                                                                                          | `run-lan.sh:11`                                                                                    | `4321`                                                       | `8000` se rechaza explícitamente (`:13-17`)                                                           |
| `AUTH_TRUST_HOST`                                                                               | `run-lan.sh:35`                                                                                    | `true` si no está definida                                   | Necesario para entrar por IP                                                                          |
| `ML_API_URL`                                                                                    | `run-lan.sh:38`                                                                                    | `https://macollo-trips-api-961314735418.us-central1.run.app` | Anula el valor por defecto del proxy ML si se exporta                                                 |
| `DATABASE_URL`                                                                                  | `seed-admin.mjs:28-36`, `seed-demo.mjs:22-30`, `seed-production.mjs:4-11`, `migrate-neon.mjs:3-10` | Los dos últimos tienen una URL Neon literal de respaldo      | `.env.example:2` documenta el formato                                                                 |
| `POSTGRES_HOST` / `POSTGRES_PORT` / `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DATABASE` | `seed-admin.mjs:37-47`, `seed-demo.mjs:31-41`                                                      | `localhost` / `5432` / `postgres` / `''` / `astro_auth_db`   | Solo se usan si no hay `DATABASE_URL`; `.env.example:3-7` fija `invernadero`                          |
| `NODE_ENV`                                                                                      | `seed-admin.mjs:33,44`, `seed-demo.mjs:27,38`                                                      | Sin valor                                                    | Si es `production`, SSL con `rejectUnauthorized: false`                                               |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD`                                                                 | `seed-admin.mjs:9-10`                                                                              | Sin valor; validación obligatoria (`:15-22`)                 | Email se normaliza a minúsculas; contraseña ≥ 8 caracteres                                            |
| `ADMIN_NAME`, `ADMIN_ROLE`, `ADMIN_PHONE`                                                       | `seed-admin.mjs:11-13`                                                                             | `Superadmin`, `Superadmin`, `null`                           | Roles permitidos: `Superadmin`, `Admin`, `Agropecuario`, `Campesino` (`:7, 23-26`)                    |
| `DEMO_EMAIL`, `DEMO_NAME`, `DEMO_PASSWORD`                                                      | `seed-demo.mjs:11-20`                                                                              | `demo@invernadero.local`, `Dueño Demo`, aleatorio            | Si la contraseña tiene < 8 caracteres se genera una con `crypto.randomBytes(9).toString("base64url")` |
| `SITE`                                                                                          | `astro.config.mjs:12`                                                                              | `https://macollo.tech`                                       | No es variable de ningún script, pero afecta al arranque de Astro                                     |

> `seed-admin.mjs` y `seed-demo.mjs` importan `dotenv/config` (`:1` en ambos), por lo que leen `.env` automáticamente. `seed-production.mjs` y `migrate-neon.mjs` **no** importan dotenv: exporte `DATABASE_URL` en el entorno del shell antes de ejecutarlos o se usará la URL Neon codificada en el archivo.

## `scripts/run-lan.sh` — servidor accesible desde el celular

Secuencia verificable:

1. Se sitúa en la raíz del repositorio calculando `SCRIPT_DIR` (`run-lan.sh:8-9`).
2. Toma `PORT` de entorno o `4321` y rechaza `8000`, reservado para la API ML (`:11-17`).
3. Detecta la IP de salida con `ip route get 1.1.1.1 | awk …` y, si falla, con `hostname -I`; último recurso `localhost` (`:25-32`).
4. Comprueba si el puerto está ocupado **solo si el comando `ss` está disponible** (`:19-23`).
5. Exporta `AUTH_TRUST_HOST=true` y `ML_API_URL` con el valor de Cloud Run si no viene definida (`:34-38`).
6. Imprime URLs locales/LAN y hace un `curl -fsS --max-time 6 ${ML_API_URL}/api/health` meramente informativo; un fallo no aborta el arranque (`:40-56`).
7. Ejecuta `pnpm exec astro dev --host 0.0.0.0 --port "$PORT"` o, si no hay pnpm, `npx astro dev …` (`:58-62`).

| Uso                       | Resultado                  |
| :------------------------ | :------------------------- |
| Local                     | `http://localhost:4321`    |
| Celular en la misma Wi-Fi | `http://<IP_LOCAL>:4321`   |
| Health de la ML API       | `${ML_API_URL}/api/health` |

**Precauciones:** el tráfico va por HTTP, por lo que la cámara real (`getUserMedia`) se sustituye por el input nativo `capture="environment"` en el celular; ver `docs/CAMERA-ML.md`. La API ML es externa: el diagnóstico no funciona sin ella, aunque el arranque de Astro no se bloquea por su ausencia. Para una API ML local, exporte `ML_API_URL` antes de llamar al script.

```bash
./scripts/run-lan.sh
PORT=4322 ./scripts/run-lan.sh
ML_API_URL=http://192.168.1.20:8000 ./scripts/run-lan.sh
```

## `scripts/seed-admin.mjs` — cuenta privilegiada

Valida `ADMIN_EMAIL` (debe contener `@`), `ADMIN_PASSWORD` (≥ 8 caracteres) y `ADMIN_ROLE` (uno de los cuatro roles) antes de conectar (`seed-admin.mjs:9-26`). Hash con `bcryptjs` y factor 10 (`:51`). Si el correo ya existe, actualiza `name`, `password`, `role`, `updated_at` y solo sobrescribe `phone` si se indicó uno nuevo (`COALESCE($5, phone)`; `:58-66`). Si no existe, inserta con `"emailVerified" = NOW()` (`:68-76`).

**Efectos en BD:** `SELECT` y `UPDATE`/`INSERT` sobre `users`. No escribe archivos.

**Precaución:** ejecutarlo con un email existente **reemplaza su contraseña y su rol**. Las credenciales quedan en el historial de la shell si se pasan como variables en línea; preferir un `.env` local no versionado.

```bash
ADMIN_EMAIL=admin@macollo.local \
ADMIN_PASSWORD='Admin1234' \
ADMIN_ROLE=Admin \
ADMIN_NAME='Administrador Local' \
node scripts/seed-admin.mjs
```

## `scripts/seed-demo.mjs` — finca de demostración

Genera el usuario demo (rol `Agropecuario`) solo si el correo no existe (`seed-demo.mjs:49-67`), crea la finca «Finca demo» en «Valle de Aburrá, Antioquia» y la membresía `dueno` (`:69-98`), siembra la matriz `t0`–`t3` × `Col 1`…`Col 5` con IDs `P-01`…`P-20` (`:100-116`) y 60 lecturas (3 días × 20 plantas, hora `09:00 AM`, `responsable_id` del dueño) con `ON CONFLICT … DO NOTHING` en `(finca_id, planta_id, fecha, hora)` (`:118-190`). Los valores se derivan de forma determinista con `pseudo(seed)` (`:44-47, 131-157`).

**Efectos en BD:** `users`, `fincas`, `finca_miembros`, `plantaIds` vía `plantas` y `lecturas`. No escribe archivos.

**Precauciones:**

- Si ya existe «Finca demo» para ese dueño, el script retorna antes de insertar plantas/lecturas (`:74-79`).
- Si el **usuario** ya existe pero la finca no, se reutiliza el usuario sin cambiar su contraseña, pero el mensaje final puede imprimir una contraseña generada que **no fue aplicada** (`:15-20, 51-67, 192-202`). Para credenciales deterministas, defina `DEMO_PASSWORD`.
- El resultado imprime correo y contraseña; guárdela en ese momento porque no se persiste en otro sitio.

```bash
node scripts/seed-demo.mjs
DEMO_EMAIL=demo@macollo.local DEMO_PASSWORD='Demo123456' node scripts/seed-demo.mjs
```

## `scripts/seed-production.mjs` — siembra en Neon

Declara una URL Neon literal como respaldo (`seed-production.mjs:4-6`) y un pool con `ssl: { rejectUnauthorized: false }` (`:8-11`). Crea o actualiza `admin@macollo.tech` como `Superadmin` con una contraseña fija en el código (`:24-55`), reutiliza la primera finca de ese usuario o crea «Invernadero Macollo Principal» (`:57-82`), vincula la membresía `dueno` (`:84-89`), siembra 20 plantas (`:91-107`) y 60 lecturas de calibración (`:109-175`). Al terminar imprime las credenciales (`:176-184`).

**Efectos en BD (Neon, no local por defecto):** `users`, `fincas`, `finca_miembros`, `plantas`, `lecturas`. No escribe archivos.

**Precauciones:**

- **No ejecutar en una BD de producción real sin revisar antes:** la contraseña y la URL de respaldo están codificadas y la consulta de usuario incluye `OR id = 1` (`:30-33`), por lo que puede sobreescribir al usuario con id 1.
- La búsqueda de usuario es `email = adminEmail OR id = 1`; la actualización cambia email, nombre, contraseña, rol y `emailVerified` (`:35-45`).
- Requiere `DATABASE_URL` exportado para apuntar a otra instancia; no carga `.env`.
- Rotar cualquier credencial que haya figurado en este archivo o en historiales de ejecución.

```bash
export DATABASE_URL='postgres://usuario:password@host/neondb?sslmode=require'
node scripts/seed-production.mjs
```

## `scripts/migrate-neon.mjs` — migración de esquema

Ejecuta una única cadena SQL entre `BEGIN;` y `COMMIT;` (`migrate-neon.mjs:12-163`) y, si tiene éxito, lista las tablas de `public` (`:165-184`). Opera sobre `DATABASE_URL` o la URL Neon literal de respaldo (`:3-10`); no carga `.env`.

| Bloque SQL            | Efecto                                                                                                                           | Referencia |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| Enum `user_role_enum` | Si contiene `Agronomo`/`Super admin`, recrea el enum con `Superadmin                                                             | Admin      | Agropecuario | Campesino` y mapea valores | `:15-44` |
| Usuario id 1          | `UPDATE users SET role='Superadmin' WHERE id=1`                                                                                  | `:46-47`   |
| Plantas legacy        | Renombra `plantas` a `plantas_legacy` si no tiene columna `finca_id`                                                             | `:49-60`   |
| Fincas y membresías   | `CREATE TABLE IF NOT EXISTS fincas`, `finca_miembros`, `finca_invitaciones` + índices                                            | `:62-103`  |
| Plantas y lecturas    | Tablas con `UNIQUE (finca_id, fila, columna)` y `UNIQUE (finca_id, planta_id, fecha, hora)`; agrega `responsable` si falta       | `:105-141` |
| Galería               | Tabla `photos` con `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`, `finca_id` y `user_id` con `ON DELETE SET NULL`, más índices | `:143-160` |

**Precauciones:** es una migración con cambios destructivos/irreversibles en el estado previo (renombrado a `plantas_legacy`, reescritura de roles, Promoción del usuario 1). Hacer copia de seguridad y ejecutarla una sola vez. El esquema resultante debe cuadrar con los archivos incrementales `src/db/migrations/001-roles-farms.sql`, `002-add-responsable-to-lecturas.sql` y `003-add-sheets-url-to-fincas.sql`, que **no** son invocados por este script.

```bash
export DATABASE_URL='postgres://usuario:password@host/neondb?sslmode=require'
node scripts/migrate-neon.mjs
```

## Documento unificado y capturas (artefactos derivados)

Los artefactos de `docs/UNIFIED/` se generaron a partir del orden canónico de `manifest.json`, con enlaces convertidos en referencias internas y capturas incrustadas. El PDF final se validó con `pdfinfo`; no se edita a mano.

Las ocho capturas CAP-01…CAP-08 en `docs/capturas/` se obtuvieron con Playwright contra el servidor local, sin Astro Admin ni `/admin`, en resoluciones de escritorio y móvil. También son artefactos derivados: no se editan manualmente.

```bash
pdfinfo docs/UNIFIED/Macollo-Documentacion-Unificada.pdf | grep Pages
```

## Verificación posterior a la siembra

```bash
# Usuarios y roles (tras seed-admin o seed-production)
psql "$DATABASE_URL" -c "SELECT id, email, role FROM users ORDER BY id LIMIT 10;"

# Finca demo / finca principal y su matriz
psql "$DATABASE_URL" -c "SELECT id, nombre, dueno_id FROM fincas ORDER BY id;"
psql "$DATABASE_URL" -c "SELECT finca_id, count(*) FROM plantas GROUP BY finca_id;"
psql "$DATABASE_URL" -c "SELECT finca_id, count(*) FROM lecturas GROUP BY finca_id;"

# Galería por finca (relacionada con docs/CAMERA-ML.md)
psql "$DATABASE_URL" -c "SELECT finca_id, count(*) FROM photos GROUP BY finca_id;"
```

Tras `seed-demo.mjs`, las cuentas esperadas son 20 plantas y 60 lecturas para «Finca demo» (`scripts/seed-demo.mjs:116, 190`); tras `seed-production.mjs`, 20 plantas y 60 lecturas para «Invernadero Macollo Principal» (`scripts/seed-production.mjs:107, 175`).

## Trazabilidad

| Tema                                         | Archivo de código                                       | Doc relacionada                           | Verificación                                   |
| :------------------------------------------- | :------------------------------------------------------ | :---------------------------------------- | :--------------------------------------------- |
| Arranque LAN, IP, puerto 8000 y ML Cloud Run | `scripts/run-lan.sh:1-62`; `package.json:9-10`          | `docs/CAMERA-ML.md`, `docs/DEPLOYMENT.md` | Lectura directa (2026-11-23)                   |
| Credenciales admin y roles                   | `scripts/seed-admin.mjs:7-83`                           | `docs/AUTH.md`, `docs/SECURITY.md`        | Lectura directa (2026-11-23)                   |
| Datos demo y contraseña generada             | `scripts/seed-demo.mjs:8-210`                           | `docs/DEMO-DATA.md`                       | Lectura directa (2026-11-23)                   |
| Siembra en Neon y credenciales codificadas   | `scripts/seed-production.mjs:1-192`                     | `docs/DEPLOYMENT.md`, `docs/DATABASE.md`  | Lectura directa (2026-11-23)                   |
| Esquema migrado y tablas legacy              | `scripts/migrate-neon.mjs:12-187`; `src/db/migrations/` | `docs/DATABASE.md`                        | Lectura directa (2026-11-23)                   |
| Variables reales de entorno                  | `.env.example:1-33`, `astro.config.mjs:12`              | `docs/DEPLOYMENT.md`, `docs/CAMERA-ML.md` | Comparación directa (2026-11-23)               |
| Galería por finca y su consumo               | `src/pages/api/gallery/upload.ts:46-86`                 | `docs/CAMERA-ML.md`, `docs/ENDPOINTS.md`  | Lectura directa (2026-11-23)                   |
| Unificación y PDF con imágenes               | `docs/UNIFIED/manifest.json`, artefactos derivados      | `docs/README.md`, `docs/CAPTURAS.md`      | `pdfinfo` (2026-11-23)                         |
| Capturas reales sin `/admin`                 | `docs/capturas/*.jpg`                                   | `docs/CAPTURAS.md`, `docs/ROUTES.md`      | CAP-01…CAP-08 presentes en el PDF (2026-11-23) |

---

# Capítulo 39. Changelog - Macollo (DOC-28)

**Ruta fuente:** `docs/CHANGELOG.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-28**.

> Reconstruido desde `git log` (oct-2026). En adelante: entrada por release según CONTRIBUTING.

## [Unreleased]

### Fixed

- Documentación 2026-10-09: typo `(/ Sein)` → `(/)` en MANUAL_USUARIO; OAuth corregido a solo Google en USE_CASES/USER_STORIES; `.env.example` + README completados con `AUTH_TRUST_HOST`, `SMTP_HOST/PORT/FROM` (verificados contra `notifications.ts` y `auth.config.ts`).

### Added

- **Multi-tenant con 4 roles** (`Superadmin`, `Admin`, `Agropecuario`, `Campesino`): migración `src/db/migrations/001-roles-farms.sql` + tablas `fincas`, `finca_miembros`, `finca_invitaciones`, `plantas`, `lecturas`.
- Servicios `src/backend/services/authz.ts` (autorización Zero Trust, rol relee de BD, cookie `finca_activa`), `farms.ts` (CRUD, invitaciones con código nanoid, canje atómico) y `readings.ts` (persistencia por finca).
- APIs de fincas/invitaciones/miembros/admin + `GET|POST /api/farms/:id/readings`; `POST /api/auth/check-availability` (email/celular) que el wizard consulta antes del paso 2. El registro **ya no acepta `fincaCode`**: las invitaciones se canjean solo en `/api/invitations/use`.
- Páginas `/farms`, `/farms/[id]`, `/invite/[code]`, `/admin`; selector de finca en navbar; badge de rol real en Settings.
- Datos agronómicos separados por finca: `sync-sheets` persiste en `lecturas` y `Metrics`/`Historial` leen desde PG scopeados por finca activa; export Excel por finca.
- Scripts `scripts/seed-admin.mjs` (cuentas privilegiadas) y `scripts/seed-demo.mjs` (Finca demo + 20 plantas + lecturas).
- **Rol elegible al registrarse**: `accountType` ∈ {`Campesino` (def.), `Agropecuario`} (nuevas dependencias `nanoid` + `nanoid-dictionary`).
- **Códigos de invitación reales**: 8 caracteres con `nanoid` + `nanoid-dictionary` (sin prefijo `FARM-`), tope de 5 fincas por usuario.
- **Inicio por rol (staff → panel)**: `GET /` redirige a `/admin` si el usuario es `Superadmin`/`Admin` y no tiene finca activa; el panel añade la acción **Entrar** por finca (fija `finca_activa` y abre el tablero). Navbar del staff con `Panel` + (`Tablero`/`Métricas`/`Historial` solo con finca activa).
- Helper `canConnectSheets(access)` en `authz.ts`: habilita Google Sheets a **dueño, staff y miembro** de la finca (corrección documental 2026-11-23).
- **Landing pública** en `src/pages/landing.astro`, disponible en `/landing` en cualquier host (incluido localhost): hero con mock de matriz 4×5, problema, solución, qué hacemos, por qué, para quién, stack, equipo y CTA; paleta del proyecto, animaciones con `prefers-reduced-motion` y responsive. Canonical derivado de la petición y CTA relativo a `/`.
- Documentación LANDING (Capítulo 18 · DOC-47) (DOC-47) y ADR-008 (Apéndice A.8 · ADR-008): contenido, diseño, validación y decisión de publicar primero en `/landing`, difiriendo el subdominio hasta definir el dominio real.

### Changed

- `middleware.ts`: security headers + protección de páginas/APIs reales + rate-limit por IP (sin cambios para la landing: `/landing` es una ruta pública más).
- `register`/`forgot`/`reset-password`: errores genéricos, contraseña mín. 8 en servidor y cliente.
- `astro.config.mjs`: `security.checkOrigin: true`.
- `siata`, `sync-sheets`, `export-excel`: ahora exigen sesión (y acceso a la finca activa).
- Rol: enum de 4 valores; etiquetas de rol en `/metrics` e `/history` usan el rol real.
- `POST /api/sync-sheets`: restringido al **dueño** de la finca activa (`403` para miembros y staff); la UI de `/history` oculta el botón a quien no sea dueño. Importar Excel/CSV (.csv/.xlsx) sigue abierto a cualquier miembro.
- `/signin` pasa a ser **alias** de `/` (redirige conservando `?desde=`/`?code=`); el login/registro vive en la portada `Welcome`.
- `DELETE /api/admin/users/:id`: ahora **rechaza con `409`** borrar a un usuario dueño de finca (la FK `fincas.dueno_id` es `ON DELETE RESTRICT`), evitando un `500`; el texto de confirmación del panel se corrigió.

### Galería y diagnóstico

- **Galería por finca**: nueva ruta `/gallery` y `/gallery/[id]` con grid `object-contain`, vista ampliable con zoom, descarga/compartir. Fotos compartidas entre todos los miembros de la finca activa.
- **Subida automática**: al capturar o seleccionar imagen desde el modal "Escanear Trips" se guarda en `public/uploads/gallery/` vía `POST /api/gallery/upload` con `finca_id` y `user_id`.
- **API galería**: `GET /api/gallery/[id]/file` sirve imágenes con control por finca activa.
- **Diagnóstico Trips**: modal con acceso a cámara (soporta HTTP por IP abriendo cámara nativa) y reenvío a servicio ML. Se guarda foto en galería de la finca activa.
- **Navbar**: añadido enlace "Galería" cuando hay finca activa.
- **Red local**: script `scripts/run-lan.sh` y `pnpm run dev:lan` para probar desde celular en misma Wi-Fi (puerto 4321).

## Security

- Eliminados artefactos con datos (`test-db.js`, `cookies.txt`, `scratch.js`); `.gitignore` endurecido.
- Autorización por handler (no solo middleware) en todas las rutas de datos.
- Google Sheets con control por finca: sincronizan dueño, staff y miembro (`canConnectSheets` en `authz.ts`); la corrección documental se registró en DOC-CONVENTIONS §5.

### Documentation

- Documentación verificada contra `src/`: ARCHITECTURE, ROUTES, ENDPOINTS, AUTH, DATABASE, DEPLOYMENT, REQUIREMENTS (SRS), UML, TESTING, CONTRIBUTING, GLOSSARY, TROUBLESHOOTING, DATA-DICTIONARY, FIELD-PROTOCOL, DEMO-DATA (+ CSV demo), SECURITY, ROADMAP.
- ADRs 001–007 (`docs/decisions/`); ADR-004 parcialmente superseded por ADR-007.
- MANUAL_USUARIO ampliado (roles, matriz 4×5, 3D, clima/viento, Sheets, FAQ).
- **Documentación unificada 2026-11-23:** 46 documentos (`DOC-00`…`DOC-46`) y 7 ADR en `docs/UNIFIED/Macollo-Documentacion-Unificada.pdf`, generados desde `manifest.json` por el generador de documentación (no incluido); índice canónico en `docs/README.md`, convenciones en `docs/DOC-CONVENTIONS.md` y matriz RF/CU/US → código → prueba en `docs/TRACEABILITY-MATRIX.md`.
- **Anexo visual DOC-46:** el generador de capturas (no incluido) toma 8 capturas reales con Playwright (CAP-01…CAP-08, escritorio y móvil) en `docs/capturas/`, sin Astro Admin ni `/admin`; el generador las incrusta en el PDF.

### Changed (previo)

- `weather.ts`: SIATA bypasseado → Open-Meteo directo (`wind_speed_10m`, `timezone=auto`) + fallback offline (`efed143`).
- `register`/`sync-sheets`/`export-excel`: validación Zod Zero Trust (`1ccbf24`).
- `middleware.ts`: security headers (DENY, nosniff, HSTS, CSP) (`1ccbf24`).
- Husky pre-commit: prettier + bloqueo de secretos (`1ccbf24`).
- Widget clima: viento (km/h) en vez de irradiación.

## 2026-10-23 — Galería, diagnóstico Trips y red local

- Galería por finca con vista ampliable y subida automática desde escáner.
- Soporte de cámara en HTTP por IP (usa selector/cámara nativa).
- Integración con API externa [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api) (BioCLIP 2.5) para detección de trips.
- `pnpm run dev:lan` + script para pruebas en red local.
- `.env.example` actualizado con variables ML/SMTP/Auth.

## 2026-10-08 — Tandem seguridad + docs

- `1ccbf24` feat: Zod, security headers, Husky hooks.
- `efed143` refactor: SIATA → viento Open-Meteo.
- `ad71f47` docs: ADRs y componentes (primera oleada).

## 2026-10-07 — Registro y deploy

- Validaciones de registro (email/celular/fecha) (`103caca`, `c3eab94`).
- Fix deploy Vercel (`cc41348`); merge PR #17.

## 2026-10-06 — Recuperación de clave

- OTP 6 dígitos vía Gmail (`6e73321`): `forgot/reset-password` + `verification_token`.

## 2026-10-05 — Estabilidad prod

- Timeout 3 s SIATA anti-crash Vercel (`1d30c5d`); SSL Neon (`3399605`).

## 2026-10-01 — Núcleo auth + datos

- Unificación `mediciones`, endurecimiento auth, pool 20 (`0e4785d`, `6d74068`); migración usuarios + nodemailer (`883ca21`).

## 2026-09-30 — Dashboard y exportaciones

- Dashboard + Historial + `metricsData` + export/sync APIs (`7ff50ea`); Excel export (`e8e9162`); Welcome + Google (`e200f75`, `1ee6095`).

## 2026-09-24/29 — Marca y base

- Rebrand AquaSens → Macollo + gulupa (`c16276c`, `0ed6232`, `54a581e`); schemas a `src/db/` (`ad813e6`).

## Trazabilidad

| Tema      | Código / configuración | Documento relacionado                                                      | Verificación  |
| :-------- | :--------------------- | :------------------------------------------------------------------------- | :------------ |
| Historial | `git log`              | CONTRIBUTING (Capítulo 34 · DOC-18), DOC-CONVENTIONS (Capítulo 6 · DOC-43) | `git log -15` |

---

# Capítulo 40. Modelo de Amenazas y Superficie de Ataque (DOC-36)

**Ruta fuente:** `docs/THREAT-MODEL.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-36**.

## 1. Propósito y método

Este documento aplica una revisión STRIDE (**S**poofing, **T**ampering, **R**epudiation, **I**nformation disclosure, **D**enial of service, **E**levation of privilege) a los componentes descritos en SYSTEM-CONTEXT (Capítulo 7 · DOC-31). Cada hallazgo se clasifica por severidad y se vincula a una mitigación existente o a una recomendación. complementa SECURITY (Capítulo 21 · DOC-24) (política) y ERROR-CATALOG (Capítulo 30 · DOC-35) (síntomas).

## 2. Activos a proteger

| Activo                                                                      | Clasificación             | Ubicación                                            |
| :-------------------------------------------------------------------------- | :------------------------ | :--------------------------------------------------- |
| Credenciales de usuario (hash bcrypt)                                       | Confidencial              | `users.password`                                     |
| `AUTH_SECRET`, `ML_API_KEY`, `SMTP_PASS`, `TWILIO_AUTH_TOKEN`, `WAQI_TOKEN` | Crítico                   | Variables de entorno (y, en parte, código: ver R-01) |
| Datos agronómicos por finca                                                 | Confidencial / integridad | `lecturas`, `plantas`                                |
| Fotos de cultivo                                                            | Confidencial              | `public/uploads/gallery/`, `photos`                  |
| Sesión JWT y cookie `finca_activa`                                          | Crítico                   | Navegador                                            |
| Código de recuperación de 6 dígitos                                         | Crítico / tiempo limitado | `verification_token`, correo/SMS                     |

## 3. Matriz STRIDE por componente

|     Componente      |   S   |   T   |   R   |   I   |   D   |   E   | Mitigaciones existentes                                      |
| :-----------------: | :---: | :---: | :---: | :---: | :---: | :---: | :----------------------------------------------------------- |
|   Navegador / API   | Media | Media | Baja  | Media | Alta  | Media | `checkOrigin`, CSP, rate limit, HTTPS/HSTS                   |
|     Middleware      | Baja  | Media | Media | Baja  | Media | Alta  | `getSession`, headers, proxy fix (ver R-05)                  |
|    Auth.js / JWT    | Media | Baja  | Media | Alta  | Media | Alta  | Rol releído de BD, bcrypt, JWT firmado                       |
| Fincas y membresías | Baja  | Alta  | Media | Alta  | Baja  | Alta  | `getFincaAccess`, cookie httpOnly, handlers revalidan        |
| Importación Sheets  | Media | Alta  | Alta  | Media | Alta  | Media | `422`, parser tolerante; **sin validación de URL** (R-03)    |
|       Galería       | Baja  | Alta  | Alta  | Alta  | Alta  | Media | Sesión + extensión por MIME; **sin límite de tamaño** (R-04) |
|      Proxy ML       | Alta  | Media | Media | Alta  | Alta  | Baja  | `X-API-Key` en servidor; **secretos por defecto** (R-01)     |
|     Correo/SMS      | Media | Baja  | Media | Alta  | Media | Baja  | Código de 15 min, token de un solo uso                       |

## 4. Registro de riesgos

| ID   | Riesgo                                                                                                     | Severidad | Estado                | Evidencia                                                       | Recomendación                                                                                                                            |
| :--- | :--------------------------------------------------------------------------------------------------------- | :-------- | :-------------------- | :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| R-01 | Clave de API de ML y credenciales del panel ML embebidas como valores por defecto                          | **Alta**  | Abierto               | `trips-diagnosis.ts:15-19,54-55`                                | Variables obligatorias sin fallback; rotar credenciales; mover a secret manager                                                          |
| R-02 | Token de WAQI embebido como valor por defecto                                                              | Media     | Abierto               | `aqi.ts:8-9`                                                    | Exigir `WAQI_TOKEN`; ocultar en logs; considerar proxy con cache                                                                         |
| R-03 | SSRF: `POST /api/sync-sheets` acepta cualquier cadena y el servidor hace `fetch` de ella                   | **Alta**  | Abierto               | `sync-sheets.ts:33-35,56-64`                                    | Validar `z.string().url()`, permitir solo hosts `docs.google.com`/`drive.google.com`, bloquear redes privadas, timeout y límite de bytes |
| R-04 | Subida de archivos sin límite de tamaño, sin validación de contenido ni de propiedad de finca en la cookie | Media     | Abierto               | `gallery/upload.ts:30-68`                                       | Límite (p. ej. 10 MB), magic bytes, `getFincaAccess()` sobre la cookie, almacenamiento externo                                           |
| R-05 | Reescritura de `context.request` y `process.env.AUTH_URL` desde cabeceras `x-forwarded-*`                  | Media     | Parcial               | `src/middleware.ts:77-96`                                       | Confiar solo en proxies conocidos; validar host contra lista blanca; no mutar `process.env` por petición                                 |
| R-06 | CSP con `'unsafe-inline'` en `script-src` y `style-src`                                                    | Media     | Aceptado              | `src/middleware.ts:49-61`                                       | Nonces/hashes por build; mover estilos inline a hojas externas                                                                           |
| R-07 | SSL con `rejectUnauthorized:false` en producción                                                           | Media     | Aceptado              | `src/db/client.ts:22-25,36-39`                                  | Usar CA del proveedor o `sslmode=verify-full`                                                                                            |
| R-08 | Rate limit en memoria por proceso                                                                          | Media     | Aceptado              | `src/backend/services/rateLimit.ts`                             | Redis/Upstash para coherencia entre instancias serverless                                                                                |
| R-09 | Persistencia de premisas de seguridad en `localStorage`                                                    | Baja      | Aceptado              | `src/shared/preferences.ts:22-40`                               | No almacenar datos sensibles; ya se cumple                                                                                               |
| R-10 | Fotos en filesystem local bajo serverless                                                                  | Media     | Abierto               | `gallery/upload.ts:65-68`                                       | Object storage (S3/R2/Blob) + CDN                                                                                                        |
| R-11 | Sin suite de pruebas ni escaneo de dependencias en CI                                                      | Media     | Abierto               | No hay `*.test.*`; `.husky/pre-commit` solo Prettier + secretos | Añadir Vitest, `pnpm audit`, SAST en CI                                                                                                  |
| R-12 | Los mensajes de error del ML incluyen texto remoto (`errText`)                                             | Baja      | Abierto               | `trips-diagnosis.ts:148-156`                                    | Sanitizar y no devolver stack traces al cliente                                                                                          |
| R-13 | Eliminación física de finca y cuentas                                                                      | Media     | Mitigado              | Solo `Superadmin`; protección al último Superadmin y a dueños   | Doble confirmación en UI y registro de auditoría                                                                                         |
| R-14 | Hard-delete de historial de lecturas                                                                       | Media     | Mitigado por permisos | `DELETE /api/farms/:id/readings`, dueño/staff                   | Soft delete o papelera con retención                                                                                                     |

## 5. Controles implementados (evidencia)

| Control                                                            | Evidencia                                      |
| :----------------------------------------------------------------- | :--------------------------------------------- |
| Contraseñas hasheadas con bcrypt                                   | `src/pages/api/auth/register.ts`               |
| Rol revalidado desde BD en cada handler                            | `src/backend/services/authz.ts:50-73`          |
| Autorización por finca y miembro                                   | `src/backend/services/authz.ts:91-129`         |
| Cookie de finca `HttpOnly`, `SameSite=Lax`, `Secure` en producción | `src/backend/services/authz.ts:140-143`        |
| Rate limiting por IP en 5 rutas sensibles                          | `src/middleware.ts:30-37`                      |
| Cabeceras de seguridad y HSTS condicional                          | `src/middleware.ts:39-74`                      |
| Validación Zod en registro, perfil y Sheets                        | `register.ts`, `users/me.ts`, `sync-sheets.ts` |
| Hook pre-commit de secretos                                        | `.husky/pre-commit:5-10`                       |
| CheckOrigin de Astro                                               | `astro.config.mjs:13`                          |

## 6. Escenarios de abuso y prueba

| ID    | Escenario                                           | Prueba sugerida                              | Resultado esperado hoy                |
| :---- | :-------------------------------------------------- | :------------------------------------------- | :------------------------------------ |
| AT-01 | Usuario sin sesión llama a `/api/farms`             | `curl -i /api/farms`                         | `401`                                 |
| AT-02 | Miembro intenta cambiar rol de otro usuario         | `PATCH /api/admin/users/:id` con ese usuario | `403`                                 |
| AT-03 | Campesino intenta sincronizar Sheets en finca ajena | `POST /api/sync-sheets`                      | `403`                                 |
| AT-04 | 11 intentos fallidos de login                       | Bucle `curl`                                 | `429` con `Retry-After`               |
| AT-05 | URL `http://127.0.0.1:5432` en `sync-sheets`        | `POST /api/sync-sheets`                      | **Se intenta fetch** (riesgo R-03)    |
| AT-06 | Subida de 500 MB                                    | `curl -F file=@grande.bin`                   | **Se intenta escribir** (riesgo R-04) |
| AT-07 | Código de recuperación reutilizado                  | Segundo `POST /api/auth/reset-password`      | `400`                                 |
| AT-08 | Hard delete de finca por `Admin`                    | `DELETE /api/farms/:id`                      | `403` (solo Superadmin)               |

## 7. Priorización de remediación

1. **Inmediata**: R-01, R-02 (rotar secretos y exigir variables), R-03 (whitelist de hosts en Sheets).
2. **Corto plazo**: R-04, R-05, R-11.
3. **Medio plazo**: R-06, R-07, R-08, R-10, R-14.
4. **Aceptado con seguimiento**: R-09, R-12, R-13.

## 8. Trazabilidad

| Riesgo     | Código                                         | Documento relacionado            | Verificación               |
| :--------- | :--------------------------------------------- | :------------------------------- | :------------------------- |
| Secretos   | `trips-diagnosis.ts`, `aqi.ts`, `.env.example` | SECURITY (Capítulo 21 · DOC-24)  | `grep -R "mk_\|b3e64" src` |
| SSRF       | `sync-sheets.ts`, `sheetsSync.ts`              | ENDPOINTS (Capítulo 19 · DOC-12) | AT-05                      |
| Subidas    | `gallery/upload.ts`                            | CAMERA-ML (Capítulo 22 · DOC-26) | AT-06                      |
| Roles      | `authz.ts`, `admin/users/[id].ts`              | AUTH (Capítulo 20 · DOC-13)      | AT-02, AT-03               |
| Rate limit | `rateLimit.ts`, `middleware.ts`                | TESTING (Capítulo 33 · DOC-17)   | AT-04                      |
| Headers    | `middleware.ts:39-74`                          | SECURITY (Capítulo 21 · DOC-24)  | `curl -I`                  |

---

# Capítulo 41. Atributos de Calidad y Escenarios Arquitectónicos (DOC-37)

**Ruta fuente:** `docs/QUALITY-ATTRIBUTES.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-37**.

## 1. Propósito

Expresar la calidad del sistema en **escenarios medibles** (estímulo → contexto → respuesta → criterio), siguiendo el enfoque de evaluación de arquitecturas (ATAM). Cada escenario se apoya en evidencia de código o se marca explícitamente como **no verificado**. Relacionado con PERFORMANCE (Capítulo 42 · DOC-38), THREAT-MODEL (Capítulo 40 · DOC-36) y ROADMAP (Capítulo 37 · DOC-23).

## 2. Escenarios de rendimiento

| ID    | Escenario                     | Contexto                | Respuesta esperada                         | Criterio                                            | Evidencia                                  |
| :---- | :---------------------------- | :---------------------- | :----------------------------------------- | :-------------------------------------------------- | :----------------------------------------- |
| QP-01 | Cargar tablero con 20 plantas | Finca con lecturas      | Matriz + promedios renderizados en SSR     | Sin petición adicional obligatoria al servidor      | `src/pages/index.astro`, `Dashboard.astro` |
| QP-02 | Health del servicio ML        | Cloud Run en reposo     | Respuesta en ≤25 s con `warming_triggered` | `GET /api/trips-diagnosis` no excede 25 s en health | `trips-diagnosis.ts:180-183`               |
| QP-03 | Predicción de trips           | Modelo cargado          | Diagnóstico en ≤45 s por intento           | `maxDuration=60` y presupuesto 50 s                 | `trips-diagnosis.ts:7,24-26`               |
| QP-04 | Sincronizar 500 filas         | Hojas con 500 registros | `guardadas ≈ 500` en una transacción       | Un solo `COMMIT`; sin duplicados                    | `readings.ts:130-190`                      |
| QP-05 | Consultar AQI                 | WAQI lento              | Respuesta en ≤8 s o fallback               | `AbortSignal.timeout(8000)`                         | `aqi.ts:27`                                |
| QP-06 | Clima sin red                 | Navegador offline       | Widget con `Offline Fallback`              | No bloquea render                                   | `weather.ts:50-59`                         |
| QP-07 | Carga de escena 3D            | Dispositivo móvil       | Iluminación según hora real                | Three.js en componente Astro                        | `Dashboard.astro`                          |
| QP-08 | Tiempo de arranque en frío    | Vercel Functions        | No medido                                  | **Sin dato**: requiere synthetic monitoring         | OPERATIONS-RUNBOOK (Capítulo 44 · DOC-40)  |

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

| ID    | Cambio esperado                   | Punto de extensión                            | Impacto estimado                                            |
| :---- | :-------------------------------- | :-------------------------------------------- | :---------------------------------------------------------- |
| QM-01 | Añadir fuente de clima            | `src/backend/services/weather.ts` + `aqi.ts`  | Bajo: aislado tras servicios                                |
| QM-02 | Cambiar umbrales agronómicos      | `src/shared/badges.ts`, `alerts.ts`, `csv.ts` | Medio: tres archivos con constantes duplicadas              |
| QM-03 | Añadir rol de sistema             | enum en SQL + `authz.ts` + `roles.ts` + UI    | Alto: toca BD, JWT y etiquetas                              |
| QM-04 | Sustituir almacenamiento de fotos | `gallery/upload.ts`, `gallery/[id]/file.ts`   | Medio: contrato de `url` en `photos`                        |
| QM-05 | Activar IoT real                  | Nuevo ingestor → `insertLecturas`             | Medio: la persistencia ya es reutilizable                   |
| QM-06 | Internacionalizar la UI           | Textos dispersos en componentes               | Alto: no hay capa i18n (ver ROADMAP (Capítulo 37 · DOC-23)) |

## 6. Escenarios de usabilidad y accesibilidad

| ID    | Escenario                                           | Estado                                                     |
| :---- | :-------------------------------------------------- | :--------------------------------------------------------- |
| QU-01 | Usuario con teclado recorre la matriz               | No auditado; ver ACCESSIBILITY (Capítulo 43 · DOC-39)      |
| QU-02 | Usuario con lector de pantalla interpreta semáforos | Parcial: iconos con texto en badges; requiere `aria-label` |
| QU-03 | Contraste en tema oscuro                            | Clases Tailwind dedicadas; sin auditoría de contraste      |
| QU-04 | Cámara en HTTP por IP                               | Resuelto con `input[capture]`                              |
| QU-05 | Cambio de unidades °C/°F                            | Implementado por reescritura de nodos de texto             |

## 7. Escenarios de verificabilidad (testabilidad)

| ID    | Escenario                        | Herramienta actual          | Estado                                                |
| :---- | :------------------------------- | :-------------------------- | :---------------------------------------------------- |
| QV-01 | Probar parser de CSV             | Ninguna                     | Sin suite; caso manual con fixture                    |
| QV-02 | Probar autorización por finca    | `curl`                      | Manual documentado en TESTING (Capítulo 33 · DOC-17)  |
| QV-03 | Probar deduplicación de lecturas | SQL + reimportación         | Manual                                                |
| QV-04 | Probar arranque en frío de ML    | `curl /api/trips-diagnosis` | Manual                                                |
| QV-05 | Regresión visual                 | No hay capturas en el repo  | Bloqueado (ver DOC-CONVENTIONS (Capítulo 6 · DOC-43)) |

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

| Escenario | Código                             | Documento relacionado                | Verificación                    |
| :-------- | :--------------------------------- | :----------------------------------- | :------------------------------ |
| QP-02/03  | `trips-diagnosis.ts`               | CAMERA-ML (Capítulo 22 · DOC-26)     | `time curl …`                   |
| QP-04     | `readings.ts`                      | DATA-FLOW (Capítulo 28 · DOC-33)     | Contar filas antes/después      |
| QS-01/02  | `middleware.ts`, `authz.ts`        | SECURITY (Capítulo 21 · DOC-24)      | Casos AT-01…AT-08               |
| QA-04/05  | `notifications.ts`, `aqi.ts`       | ERROR-CATALOG (Capítulo 30 · DOC-35) | Simular fallo                   |
| QM-02     | `badges.ts`, `alerts.ts`, `csv.ts` | DOMAIN-MODEL (Capítulo 8 · DOC-32)   | Cambiar umbral y validar badges |
| QV-*      | Ausencia de tests                  | TESTING (Capítulo 33 · DOC-17)       | `find . -name '*.test.*'`       |

---

# Capítulo 42. Rendimiento, Límites y Presupuestos (DOC-38)

**Ruta fuente:** `docs/PERFORMANCE.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-38**.

## 1. Propósito

Recoger los **presupuestos reales** que el código impone (timeouts, concurrencia, ventanas de rate limit, duración de Lambda) y separarlos de las recomendaciones. Los escenarios de calidad están en QUALITY-ATTRIBUTES (Capítulo 41 · DOC-37) y el procedimiento de medición en OPERATIONS-RUNBOOK (Capítulo 44 · DOC-40).

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
3. Cualquier integración nueva debe definir timeout explícito y respuesta degradada documentada en INTEGRATIONS (Capítulo 29 · DOC-34).
4. Los lotes de escritura deben usar una sola transacción, como `insertLecturas`.
5. No superar el presupuesto de 50 s del proxy ML sin revisar `maxDuration`.
6. Registrar el motivo de cada fallback para poder distinguir dato real de estimación.

## 8. Trazabilidad

| Límite             | Código                          | Documento relacionado              | Verificación                     |
| :----------------- | :------------------------------ | :--------------------------------- | :------------------------------- |
| Timeouts ML        | `trips-diagnosis.ts`            | CAMERA-ML (Capítulo 22 · DOC-26)   | `time curl`                      |
| Pool y conexión    | `src/db/client.ts`              | DATABASE (Capítulo 24 · DOC-14)    | `SHOW max_connections;`          |
| Rate limits        | `middleware.ts`, `rateLimit.ts` | SECURITY (Capítulo 21 · DOC-24)    | Bucle de peticiones              |
| Agregación O(20·N) | `src/shared/plantMatrix.ts`     | DATA-FLOW (Capítulo 28 · DOC-33)   | Cargar 10.000 lecturas de prueba |
| Frecuencias        | `src/shared/preferences.ts`     | USER_MANUAL (Capítulo 15 · DOC-10) | Settings → sincronización        |

---

# Capítulo 43. Accesibilidad e Internacionalización (DOC-39)

**Ruta fuente:** `docs/ACCESSIBILITY.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-39**.

## 1. Propósito y alcance

Este documento registra el estado de accesibilidad observable en el marcado y los estilos del proyecto, y distingue lo **verificado en código** de lo que requiere una auditoría con usuarios o herramientas automáticas (axe, Lighthouse, lectores de pantalla). No se reclama conformidad WCAG sin evidencia. La interfaz está en español; la internacionalización se trata en la sección 6.

## 2. Estado verificado en el marcado

| Aspecto                                        | Evidencia                                                                                          | Evaluación                                                                    |
| :--------------------------------------------- | :------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| Idioma del documento                           | Revisar `src/frontend/layouts/Layout.astro` (`<html lang>`)                                        | Verificar que sea `lang="es"`                                                 |
| Botones icono con nombre accesible             | `Navbar.astro:163` `aria-label="Abrir menú"`; `Welcome.astro:37,142,348,534` para audio/contraseña | Patrón correcto en esos puntos                                                |
| Agrupación de opciones de registro             | `Welcome.astro:374-375` `role="radiogroup"` + `aria-label="Tipo de cuenta"`                        | Patrón correcto; revisar que los hijos tengan `role="radio"`/`aria-checked`   |
| Botones de cierre de modales                   | `Metrics.astro:1102,1402` usan `title="Cerrar…"`                                                   | Insuficiente: `title` no siempre expone nombre accesible; añadir `aria-label` |
| Botones sin etiqueta visible en matriz/galería | `Dashboard.astro:36,314,333`, `GalleryDetail.astro:106,133,225,244`                                | Revisar contenido textual o `aria-label`                                      |
| Alternativas textuales de imágenes             | `Navbar.astro:80,143,234`, `Gallery.astro:105,116`, `GalleryDetail.astro:128,153,255` con `alt`    | Presente; revisar que sean descriptivas y no genéricas ("Avatar")             |
| Etiquetas de formulario                        | `Metrics.astro:1477-1560` usa `<label for>`                                                        | Patrón correcto en modal de edición                                           |
| Contraste y tema oscuro                        | Clases `dark:` en `badges.ts` y componentes                                                        | Sin auditoría de ratio de contraste                                           |
| Navegación por teclado / foco                  | No hay gestión explícita de foco en modales                                                        | Revisar: `tabindex`, `focus()`, `Escape` y `aria-modal`                       |
| Escena 3D                                      | Three.js generada por script en `Dashboard.astro`                                                  | Debe ser decorativa (`aria-hidden`) y no bloquear contenido                   |

## 3. Barreras probables

1. **Semáforo por color**: los badges combinan color con etiqueta textual (`Óptimo`, `Crítico`) e icono (🟢/🟡/🔴), lo cual ayuda; conviene añadir `aria-label` que incluya el significado.
2. **Modales sin `role="dialog"`**: los cierres usan `title`, no `aria-label`; no se encontró gestión de foco.
3. **Tablas estilo Excel**: `Metrics.astro` e `History.astro` construyen tablas dinámicas; requieren `<caption>`, `scope="col"` y orden de lectura verificado.
4. **Toasts de Sileo**: deben anunciarse con `aria-live="polite"`; verificar configuración del `<Toaster />` en `SileoProvider.tsx`.
5. **Cámara y geolocalización**: son opcionales y tienen fallback, pero el estado de permiso debe anunciarse textualmente.
6. **Animación de carga**: `public/animated-farmer.svg`, `Loading screen.svg`, `newwelcome.mp4` pueden distraer; respetar `prefers-reduced-motion`.

## 4. Plan de auditoría propuesto

| Paso                       | Herramienta                                                                   | Criterio de salida                           |
| :------------------------- | :---------------------------------------------------------------------------- | :------------------------------------------- |
| 1. Inventario de etiquetas | `grep -R "aria-\|role=\|alt=" src/frontend`                                   | Lista de puntos sin nombre accesible         |
| 2. Automático              | axe-core / Lighthouse en `/`, `/metrics`, `/history`, `/gallery`, `/settings` | 0 errores críticos                           |
| 3. Teclado                 | Recorrido con Tab/Shift+Tab/Escape                                            | Foco visible, sin trampas, cierre de modales |
| 4. Lector de pantalla      | NVDA/VoiceOver en matriz y modal de planta                                    | Cada celda anuncia código, pH y sanidad      |
| 5. Contraste               | Verificación de tokens Tailwind claros/oscuros                                | Ratio ≥ 4.5:1 en texto normal                |
| 6. Movimiento              | Activar `prefers-reduced-motion`                                              | Animaciones reducidas                        |
| 7. Zoom                    | 200 % y 400 % en móvil                                                        | Sin pérdida de información                   |

## 5. Recomendaciones de implementación (pendientes)

```html
<!-- Matriz: celda con información completa para lectores de pantalla -->
<button type="button" aria-label="Planta T2-P4, pH 6.3, sanidad Excelente">
  <span aria-hidden="true">🟢</span>
  <span>T2-P4</span>
</button>

<!-- Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Detalle de planta T2-P4</h2>
  …
</div>

<!-- Escena decorativa -->
<div id="three-scene" aria-hidden="true"></div>
```

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 6. Internacionalización

| Elemento              | Situación                                                                |
| :-------------------- | :----------------------------------------------------------------------- |
| Idioma de la interfaz | Español, textos embebidos en componentes Astro/React                     |
| Capa i18n             | No existe (sin `src/i18n/`, sin diccionarios, sin `astro:i18n`)          |
| Formatos de fecha     | ISO `YYYY-MM-DD` en persistencia; texto libre en importación             |
| Unidades              | °C/°F conmutables en cliente (`src/shared/preferences.ts:47-49,228-242`) |
| Números               | Coma decimal aceptada por `parseCsvNumber` (`csv.ts:60-67`)              |
| Moneda / zona horaria | No aplicables; `timezone=auto` solo en Open-Meteo                        |

Para añadir un segundo idioma haría falta extraer los textos de al menos `Welcome.astro`, `Navbar.astro`, `Dashboard.astro`, `Metrics.astro`, `History.astro`, `Settings.astro`, `Gallery*.astro`, `NoFarm.astro` y los mensajes de las APIs. Está previsto en ROADMAP (Capítulo 37 · DOC-23) como deuda de modificabilidad (QM-06 en QUALITY-ATTRIBUTES (Capítulo 41 · DOC-37)).

## 7. Trazabilidad

| Aspecto                | Código                                           | Documento relacionado              | Verificación                        |
| :--------------------- | :----------------------------------------------- | :--------------------------------- | :---------------------------------- |
| Nombres accesibles     | `Navbar.astro`, `Welcome.astro`, `Metrics.astro` | COMPONENTS (Capítulo 23 · DOC-27)  | `grep -R 'aria-label' src/frontend` |
| Alternativas de imagen | `Gallery.astro`, `GalleryDetail.astro`           | COMPONENTS (Capítulo 23 · DOC-27)  | Revisión manual                     |
| Toasts                 | `SileoProvider.tsx`                              | COMPONENTS (Capítulo 23 · DOC-27)  | Inspect DOM: `aria-live`            |
| Preferencias           | `src/shared/preferences.ts`                      | USER_MANUAL (Capítulo 15 · DOC-10) | Cambiar unidad en Settings          |
| Auditoría              | Sin herramienta configurada                      | TESTING (Capítulo 33 · DOC-17)     | Lighthouse / axe                    |

---

# Capítulo 44. Runbook de Operación y Respuesta a Incidentes (DOC-40)

**Ruta fuente:** `docs/OPERATIONS-RUNBOOK.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-40**.

## 1. Propósito

Procedimientos accionables para operar Macollo en producción: chequeos periódicos, verificación post-despliegue, respuestas a incidentes, copias de seguridad y rotación de secretos. Complementa DEPLOYMENT (Capítulo 32 · DOC-16) (cómo desplegar), TROUBLESHOOTING (Capítulo 35 · DOC-19) (diagnóstico) y ERROR-CATALOG (Capítulo 30 · DOC-35) (catálogo de síntomas).

## 2. Inventario operativo

| Recurso                              | Dueño            | Verificación                          |
| :----------------------------------- | :--------------- | :------------------------------------ |
| Web (Vercel, `https://macollo.tech`) | Equipo web       | `curl -I https://macollo.tech`        |
| PostgreSQL en la nube                | DBA / equipo web | `psql "$DATABASE_URL" -c 'SELECT 1;'` |
| macollo-trips-api (Cloud Run)        | Equipo ML        | `curl "$ML_API_URL/api/health"`       |
| SMTP / Twilio                        | Equipo web       | Recuperación de prueba                |
| Google Sheets de campo               | Dueño de finca   | Acceso anónimo a la URL export        |
| Dominio y TLS                        | DevOps           | Certificado vigente                   |

## 3. Chequeo diario (10 min)

```bash
# 1. Sitio y cabeceras de seguridad
curl -sSI https://macollo.tech | grep -Ei 'HTTP/|content-security-policy|x-frame-options|strict-transport-security'

# 2. Salud de la API de ML
curl -sS "$ML_API_URL/api/health" | head -c 500

# 3. Base de datos: conexión y actividad reciente
psql "$DATABASE_URL" -c "SELECT count(*) AS usuarios FROM users;"
psql "$DATABASE_URL" -c "SELECT count(*) AS lecturas, max(fecha) AS ultima_fecha FROM lecturas;"

# 4. Errores recientes en Vercel (desde la CLI, si está disponible)
vercel logs macollo --since 1h | grep -Ei 'error|warn|\[Sync\]' | tail -50
```

Criterio de aceptación: `200` en el sitio, `model_loaded: true` (o warm-up disparado), conexión a BD correcta y ausencia de `[Sync] No se pudieron guardar las lecturas` en las últimas 24 h.

## 4. Chequeo semanal

- Revisar `SELECT finca_id, count(*) FROM lecturas GROUP BY finca_id ORDER BY 2 DESC;` para detectar fincas sin datos.
- Verificar usuarios con roles inesperados: `SELECT id, name, role FROM users ORDER BY role, id;`.
- Confirmar que el último Superadmin no esté a punto de ser eliminado.
- Revisar invitaciones activas y expiradas: `SELECT finca_id, count(*) FROM finca_invitaciones WHERE activa AND expira_en > NOW() GROUP BY finca_id;`.
- Comprobar espacio libre en `public/uploads/gallery` (o migrar a object storage; riesgo R-10).
- Repasar el ERROR-CATALOG (Capítulo 30 · DOC-35) y actualizar CHANGELOG (Capítulo 39 · DOC-28).

## 5. Verificación post-despliegue

| #   | Acción                                 | Resultado esperado                              |
| :-- | :------------------------------------- | :---------------------------------------------- |
| 1   | `curl -I https://macollo.tech`         | `200`, cabeceras CSP/HSTS                       |
| 2   | Abrir `/` sin sesión                   | Portada con login/registro                      |
| 3   | Login con cuenta de prueba             | Redirección a `/` o `/admin`                    |
| 4   | `curl /api/farms` sin cookie           | `401`                                           |
| 5   | `GET /api/trips-diagnosis`             | `200` con `status:'online'` o `503` justificado |
| 6   | `GET /api/weather?lat=6.24&lon=-75.58` | JSON con `source` real u offline                |
| 7   | `GET /api/aqi?lat=6.24&lon=-75.58`     | JSON con `data.aqi`                             |
| 8   | Importar hoja de prueba en finca demo  | `guardadas > 0` y matriz actualizada            |
| 9   | Descargar `GET /api/export-excel`      | `.xlsx` con 3 hojas                             |
| 10  | Solicitar recuperación de contraseña   | Correo recibido y `verification_token` creado   |
| 11  | Subir foto desde el modal              | Fila en `photos` e imagen visible en `/gallery` |

## 6. Incidentes frecuentes

### 6.1 No carga el tablero / datos vacíos

1. Confirmar finca activa: `GET /api/farms/active` con la cookie de sesión.
2. Consultar lecturas de esa finca: `SELECT count(*) FROM lecturas WHERE finca_id = N;`.
3. Si hay lecturas pero no se muestran, revisar `plantas` (deben ser 20) y `responsable` (columna añadida por migración 002).
4. Si no hay lecturas, sincronizar desde `/history`.
5. Escalar a TROUBLESHOOTING (Capítulo 35 · DOC-19).

### 6.2 La sincronización dice éxito pero no hay datos

Síntoma conocido: `success:true, guardadas:0` (`sync-sheets.ts:112-126`). Buscar en logs:

```text
[Sync] No se pudieron guardar las lecturas: …
```

Verificar permisos DDL/INSERT del rol de BD y repetir. Si el problema se repite, abrir incidente P1: es pérdida silenciosa de datos.

### 6.3 Diagnóstico de trips caído

1. `curl "$ML_API_URL/api/health"`.
2. Si `503`, revisar Cloud Run (revisión, memoria, escalado a cero) y reintentar health para disparar `/api/warmup`.
3. Si `401` en `/api/predict`, rotar cookie del panel: el proxy renueva sesión automáticamente, pero puede fallar si cambiaron las credenciales por defecto (R-01).
4. Si `502`, verificar `ML_API_URL` en Vercel y que la foto no supere los límites de la función.

### 6.4 Fuerza bruta o abuso de endpoints

1. Revisar reglas en `src/middleware.ts:30-37`: 10 registro, 8 forgot/reset, 20 login, 15 invitaciones por IP en 300 s.
2. Bloquear IP en el proveedor de borde si continúa.
3. Considerar migrar el contador a Redis (R-08).

## 7. Copias de seguridad y restauración

```bash
# Backup lógico completo (programar diario, retención 30 días)
pg_dump "$DATABASE_URL" -Fc -f "macollo_$(date +%F_%H%M).dump"

# Backup solo esquema
pg_dump "$DATABASE_URL" --schema-only -f "macollo_schema_$(date +%F).sql"

# Restauración en entorno de prueba
createdb macollo_restore
pg_restore -d macollo_restore "macollo_$(date +%F_%H%M).dump"

# Verificación posterior
psql -d macollo_restore -c "SELECT count(*) FROM fincas; SELECT count(*) FROM lecturas;"
```

**Antes de cualquier migración destructiva** se debe ejecutar un backup y registrar el hash del archivo. Procedimiento de migraciones en MIGRATIONS (Capítulo 31 · DOC-44).

## 8. Rotación de secretos

| Secreto                               | Dónde cambiar            | Efecto                                                 |
| :------------------------------------ | :----------------------- | :----------------------------------------------------- |
| `AUTH_SECRET`                         | Vercel + `.env`          | **Invalida todas las sesiones**; avisar a los usuarios |
| `DATABASE_URL`                        | Vercel + proveedor de BD | Reinicio de conexiones del pool                        |
| `ML_API_KEY`                          | Cloud Run + Vercel       | Sin rotar en ambos lados → `401` desde el ML           |
| `ML_ADMIN_USER` / `ML_ADMIN_PASSWORD` | Cloud Run + Vercel       | El proxy debe autenticarse de nuevo                    |
| `SMTP_PASS` / `TWILIO_AUTH_TOKEN`     | Vercel + proveedor       | Afecta recuperación y resúmenes                        |
| `WAQI_TOKEN`                          | Vercel + proveedor       | AQI caerá al fallback 28                               |
| `GOOGLE_CLIENT_SECRET`                | Google Cloud + Vercel    | Afecta solo OAuth                                      |

La rotación debe hacerse en ventanas de bajo uso y verificarse con el chequeo post-despliegue.

## 9. Gestión de incidentes

| Nivel | Definición                                             | Tiempo de respuesta | Ejemplo                              |
| :---- | :----------------------------------------------------- | :------------------ | :----------------------------------- |
| P1    | Pérdida de datos o acceso bloqueado a todas las fincas | Inmediato           | `guardadas:0` generalizado, BD caída |
| P2    | Función crítica degradada                              | < 4 h               | ML caído, Sheets no sincroniza       |
| P3    | Impacto parcial                                        | < 1 día laborable   | AQI en fallback, foto no visible     |
| P4    | Mejora / deuda                                         | Próximo sprint      | Auditoría de accesibilidad           |

Formato de registro: `fecha · nivel · síntoma · endpoint afectado · causa raíz ·Acción correctiva · responsable · verificación`.

## 10. Observabilidad: brechas

| Necesidad           | Estado actual                   | Recomendación                                       |
| :------------------ | :------------------------------ | :-------------------------------------------------- |
| Logs centralizados  | `console.*` en Vercel/Cloud Run | Agregar proveedor con retención y búsqueda          |
| Request ID          | No existe                       | `X-Request-Id` en middleware y propagación          |
| Métricas de negocio | No existen                      | Importaciones/día, plantas críticas, latencia ML    |
| Alertas             | No existen                      | Umbral de 5xx y de `guardadas:0`                    |
| Trazas distribuidas | No existen                      | OpenTelemetry en Vercel + Cloud Run                 |
| Health agregado     | Solo `/api/health` de ML        | Endpoint `/api/health` local con BD + integraciones |

## 11. Trazabilidad

| Procedimiento       | Código / config                     | Documento relacionado                | Verificación                |
| :------------------ | :---------------------------------- | :----------------------------------- | :-------------------------- |
| Chequeo post-deploy | `astro.config.mjs`, `middleware.ts` | DEPLOYMENT (Capítulo 32 · DOC-16)    | Sección 5                   |
| Backup              | `src/db/*.sql`                      | DATABASE (Capítulo 24 · DOC-14)      | `pg_restore` en staging     |
| Incidentes ML       | `trips-diagnosis.ts`                | CAMERA-ML (Capítulo 22 · DOC-26)     | `curl /api/trips-diagnosis` |
| Incidentes datos    | `readings.ts`, `sync-sheets.ts`     | DATA-FLOW (Capítulo 28 · DOC-33)     | Consultas SQL               |
| Secretos            | `.env.example`, `.husky/pre-commit` | SECURITY (Capítulo 21 · DOC-24)      | Rotación trimestral         |
| Errores             | Todo el sistema                     | ERROR-CATALOG (Capítulo 30 · DOC-35) | Catálogo + AT-01…AT-08      |

---

# Capítulo 45. Guía de Incorporación para el Equipo de Desarrollo (DOC-41)

**Ruta fuente:** `docs/ONBOARDING.md` · **Parte:** Parte IV. Calidad, seguridad y operación

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-41**.

## 1. Propósito

Llegar a un primer cambio seguro en Macollo en cinco pasos. No sustituye la instalación (Capítulo 2 · DOC-01) ni las convenciones de contribución (Capítulo 34 · DOC-18): las secuencia para una persona nueva.

## 2. Día 1 — Entender el producto

1. Leer el Resumen Ejecutivo (Capítulo 5 · DOC-30) y el Manual de Usuario (Capítulo 15 · DOC-10).
2. Leer el Contexto del Sistema (Capítulo 7 · DOC-31) y el Modelo de Dominio (Capítulo 8 · DOC-32).
3. Repasar el Glosario (Capítulo 36 · DOC-20) (términos agronómicos y técnicos).
4. Ver los casos de uso (Capítulo 10 · DOC-05) y requisitos (Capítulo 9 · DOC-04) para entender la intención original.

**Ejercicio:** explicar en cinco frases qué ocurre entre que el dueño pega una URL de Google Sheets y que aparece un badge verde en la matriz. Respuesta: Flujo de Datos §3 (Capítulo 28 · DOC-33).

## 3. Día 2 — Preparar el entorno

```bash
# Requisitos: Node >= 22.12, pnpm, PostgreSQL 17
node --version
pnpm --version

pnpm install
cp .env.example .env
# Editar .env: DATABASE_URL, AUTH_SECRET, SMTP_*, ML_API_*
createdb invernadero
psql invernadero -f src/db/auth-schema.sql
psql invernadero -f src/db/greenhouse-schema.sql
node scripts/seed-admin.mjs
node scripts/seed-demo.mjs
pnpm dev
```

Abrir `http://localhost:4321`. Verificar la secuencia de instalación completa (Capítulo 2 · DOC-01) si algo falla. Para pruebas desde el celular: `pnpm run dev:lan` (SCRIPTS (Capítulo 38 · DOC-25)).

> El servidor de desarrollo puede ejecutarse en segundo plano con `pnpm astro dev --background`; gestionarlo con `pnpm astro dev stop|status|logs` (convención del repositorio, `AGENTS.md`).

## 4. Día 3 — Recorrer el código

| Orden | Archivo                                                        | Qué aprender                                            |
| :---- | :------------------------------------------------------------- | :------------------------------------------------------ |
| 1     | `astro.config.mjs`                                             | SSR, adaptador Vercel, integraciones, `maxDuration`     |
| 2     | `auth.config.ts`                                               | Credentials + Google, JWT con rol                       |
| 3     | `src/middleware.ts`                                            | Rutas protegidas, CSP, rate limit, proxy headers        |
| 4     | `src/backend/services/authz.ts`                                | `getAuthUser`, `getFincaAccess`, cookie `finca_activa`  |
| 5     | `src/shared/plantMatrix.ts`                                    | Tipos `MetricRecord`, resolución de coordenadas, matriz |
| 6     | `src/backend/services/readings.ts`                             | Upsert y mapeo fila → `MetricRecord`                    |
| 7     | `src/pages/api/sync-sheets.ts` + `src/shared/recordsParser.ts` | Importación tolerante                                   |
| 8     | `src/frontend/components/Dashboard.astro`                      | UI, clima y 3D                                          |
| 9     | `src/pages/api/trips-diagnosis.ts`                             | Proxy ML                                                |
| 10    | `src/db/*.sql` + `src/db/migrations/`                          | Modelo físico y evolución                               |

Complementar con ARCHITECTURE (Capítulo 4 · DOC-03), ROUTES (Capítulo 17 · DOC-11), ENDPOINTS (Capítulo 19 · DOC-12), COMPONENTS (Capítulo 23 · DOC-27) y DATABASE (Capítulo 24 · DOC-14).

## 5. Día 4 — Verificar y entender la deuda

1. Ejecutar `pnpm astro check`.
2. Seguir el plan de pruebas manual (Capítulo 33 · DOC-17): registro, login, importación, exportación, invitación, diagnóstico.
3. Reproducir tres incidentes del Runbook (Capítulo 44 · DOC-40) en local.
4. Leer THREAT-MODEL (Capítulo 40 · DOC-36), especialmente R-01 a R-04.
5. Leer ERROR-CATALOG (Capítulo 30 · DOC-35) y TROUBLESHOOTING (Capítulo 35 · DOC-19).

## 6. Día 5 — Primer cambio

1. Crear rama desde `main`: `git switch -c feat/<tema>`.
2. Hacer el cambio respetando CONTRIBUTING (Capítulo 34 · DOC-18).
3. Si cambia una ruta, un endpoint o una columna, actualizar obligatoriamente ROUTES (Capítulo 17 · DOC-11), ENDPOINTS (Capítulo 19 · DOC-12) y/o DATABASE (Capítulo 24 · DOC-14) en el **mismo PR**.
4. Si la decisión es arquitectónica, añadir un ADR según CONTRIBUTING (Capítulo 34 · DOC-18) y la numeración de decisions (Apéndice A, ADR-001…ADR-007).
5. Ejecutar `pnpm astro check` y el checklist de TESTING (Capítulo 33 · DOC-17).
6. El hook de Husky ejecuta Prettier y bloquea secretos (`.husky/pre-commit`).

## 7. Mapa de "¿quién sabe de qué?"

| Tema                | Documento rector                                                                  | Código                                      |
| :------------------ | :-------------------------------------------------------------------------------- | :------------------------------------------ |
| Producto y usuarios | USER_MANUAL (Capítulo 15 · DOC-10), REQUIREMENTS (Capítulo 9 · DOC-04)            | —                                           |
| Arquitectura        | ARCHITECTURE (Capítulo 4 · DOC-03), QUALITY-ATTRIBUTES (Capítulo 41 · DOC-37)     | `astro.config.mjs`                          |
| Auth y permisos     | AUTH (Capítulo 20 · DOC-13), SECURITY (Capítulo 21 · DOC-24)                      | `auth.config.ts`, `authz.ts`                |
| Datos y esquema     | DATABASE (Capítulo 24 · DOC-14), DATA-DICTIONARY (Capítulo 25 · DOC-15)           | `src/db/`, `readings.ts`                    |
| Importación         | FIELD-PROTOCOL (Capítulo 26 · DOC-21), DATA-FLOW (Capítulo 28 · DOC-33)           | `recordsParser.ts`, `csv.ts`                |
| API                 | ENDPOINTS (Capítulo 19 · DOC-12), ERROR-CATALOG (Capítulo 30 · DOC-35)            | `src/pages/api/`                            |
| UI                  | COMPONENTS (Capítulo 23 · DOC-27), ACCESSIBILITY (Capítulo 43 · DOC-39)           | `src/frontend/`                             |
| ML                  | CAMERA-ML (Capítulo 22 · DOC-26), INTEGRATIONS (Capítulo 29 · DOC-34)             | `trips-diagnosis.ts`                        |
| Operación           | DEPLOYMENT (Capítulo 32 · DOC-16), OPERATIONS-RUNBOOK (Capítulo 44 · DOC-40)      | `scripts/`, `.env.example`                  |
| Documentación       | DOC-CONVENTIONS (Capítulo 6 · DOC-43), TRACEABILITY-MATRIX (Capítulo 46 · DOC-42) | el generador de documentación (no incluido) |

## 8. Check-list del primer día

- [ ] Entiendo la matriz 4×5 y el significado de `T0-P1` … `T3-P5`.
- [ ] Sé qué hace la cookie `finca_activa`.
- [ ] Puedo explicar la diferencia entre `dueno`, `miembro` y `staff`.
- [ ] Tengo `.env` local sin secretos versionados.
- [ ] He iniciado sesión y he importado el fixture de demo.
- [ ] Sé dónde está documentado cada endpoint.
- [ ] Conozco los riesgos R-01 a R-04 del modelo de amenazas.

## 9. Trazabilidad

| Paso     | Código / config                      | Documento relacionado                 | Verificación           |
| :------- | :----------------------------------- | :------------------------------------ | :--------------------- |
| Entorno  | `package.json`, `.env.example`       | README (Capítulo 2 · DOC-01)          | `pnpm astro check`     |
| BD local | `src/db/*.sql`, `scripts/seed-*.mjs` | DATABASE (Capítulo 24 · DOC-14)       | `psql -c '\dt'`        |
| Rutas    | `src/pages/`                         | ROUTES (Capítulo 17 · DOC-11)         | Recorrer navegación    |
| Permisos | `authz.ts`                           | AUTH (Capítulo 20 · DOC-13)           | Probar con 4 roles     |
| Calidad  | `.husky/pre-commit`                  | CONTRIBUTING (Capítulo 34 · DOC-18)   | `git commit` de prueba |
| Docs     | `docs/README.md`                     | DOC-CONVENTIONS (Capítulo 6 · DOC-43) | Generar PDF unificado  |

---

# Capítulo 46. Matriz de Trazabilidad Requisito -> Diseño -> Código -> Verificación (DOC-42)

**Ruta fuente:** `docs/TRACEABILITY-MATRIX.md` · **Parte:** Parte V. Cierre y trazabilidad

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-42**.

## 1. Propósito

Conectar formalmente los requisitos (REQUIREMENTS (Capítulo 9 · DOC-04)), los casos de uso (USE_CASES (Capítulo 10 · DOC-05)), las historias (USER_STORIES (Capítulo 11 · DOC-06)), los diagramas (UML (Capítulo 12 · DOC-07), SEQUENCE_DIAGRAMS (Capítulo 13 · DOC-08), ACTIVITIES (Capítulo 14 · DOC-09)), el código y la verificación (TESTING (Capítulo 33 · DOC-17)). Es el eje de la documentación unificada: cualquier cambio funcional debe reflejarse aquí.

> **Corrección de estado 2026-11-23:** la SRS v1.0 marcaba RF-20/RF-21/RF-22 como futuros y declaraba "multi-invernadero" fuera de alcance. El código actual ya persiste lecturas (RF-21 parcial), implementa multi-finca (RF-23), alertas umbraladas en cliente (RF-20 parcial) y galería/IA (RF-25, RF-26, nuevos). La tabla siguiente refleja el estado **real**, no el histórico.

## 2. Matriz de requisitos funcionales

| RF    | Capacidad                      | CU / US         | Código (evidencia)                                            | Endpoint / ruta                                | Verificación  | Documento                              |
| :---- | :----------------------------- | :-------------- | :------------------------------------------------------------ | :--------------------------------------------- | :------------ | :------------------------------------- |
| RF-01 | Registro con rol elegible      | CU-001          | `api/auth/register.ts`, Zod                                   | `POST /api/auth/register`                      | TEST-01       | AUTH (Capítulo 20 · DOC-13)            |
| RF-02 | Login email/celular + bcrypt   | CU-001 / US-001 | `auth.config.ts`                                              | `POST /api/auth/callback/credentials`          | TEST-02       | AUTH (Capítulo 20 · DOC-13)            |
| RF-03 | Google OAuth                   | CU-001 / US-001 | `auth.config.ts`, `@auth/pg-adapter`                          | `/api/auth/callback/google`                    | TEST-03       | AUTH (Capítulo 20 · DOC-13)            |
| RF-04 | Cierre de sesión               | US-002          | `Navbar.astro`                                                | `POST /api/auth/signout`                       | TEST-04       | ROUTES (Capítulo 17 · DOC-11)          |
| RF-05 | Recuperación 6 dígitos/15 min  | CU-007 / US-009 | `forgot-password.ts`, `reset-password.ts`, `notifications.ts` | `/api/auth/forgot-password`, `/reset-password` | TEST-05       | AUTH (Capítulo 20 · DOC-13)            |
| RF-06 | Matriz 4×5 + semáforo          | CU-002 / US-003 | `Dashboard.astro`, `plantMatrix.ts`, `badges.ts`              | `/`                                            | TEST-06/07    | COMPONENTS (Capítulo 23 · DOC-27)      |
| RF-07 | Modal de detalle de planta     | CU-003 / US-003 | `Dashboard.astro`, `Metrics.astro`                            | `/`, `/metrics`                                | TEST-07       | DOMAIN-MODEL (Capítulo 8 · DOC-32)     |
| RF-08 | Escena 3D sol/luna             | CU-003 / US-005 | `Dashboard.astro` (Three.js)                                  | `/`                                            | Manual visual | COMPONENTS (Capítulo 23 · DOC-27)      |
| RF-09 | Clima + AQI + geolocalización  | CU-002 / US-010 | `Dashboard.astro`, `weather.ts`, `aqi.ts`                     | `/api/weather`, `/api/aqi`                     | TEST-08       | INTEGRATIONS (Capítulo 29 · DOC-34)    |
| RF-10 | Métricas y gráficos            | CU-002 / US-004 | `Metrics.astro`                                               | `/metrics`                                     | TEST-09       | DATA-DICTIONARY (Capítulo 25 · DOC-15) |
| RF-11 | Historial por fecha            | CU-002 / US-008 | `History.astro`, `readings.ts`                                | `/history`                                     | TEST-10       | USER_MANUAL (Capítulo 15 · DOC-10)     |
| RF-12 | Importación local XLSX/CSV     | —               | `History.astro`, `csv.ts`, `recordsParser.ts`                 | `/api/farms/:id/readings`                      | TEST-11       | FIELD-PROTOCOL (Capítulo 26 · DOC-21)  |
| RF-13 | Google Sheets → lecturas       | CU-006 / US-011 | `sync-sheets.ts`, `sheetsSync.ts`, `recordsParser.ts`         | `POST /api/sync-sheets`                        | TEST-12       | DATA-FLOW (Capítulo 28 · DOC-33)       |
| RF-14 | Exportación XLSX 3 hojas / CSV | CU-005 / US-007 | `excelExport.ts`, `csvExport.ts`                              | `/api/export-excel`, `/api/export-csv`         | TEST-13       | DATA-DICTIONARY (Capítulo 25 · DOC-15) |
| RF-15 | Perfil (nombre/avatar)         | —               | `users/me.ts`, `profile.ts`, `Settings.astro`                 | `PATCH /api/users/me`                          | TEST-14       | ENDPOINTS (Capítulo 19 · DOC-12)       |
| RF-16 | Tema claro/oscuro/auto         | —               | `preferences.ts`                                              | `/settings`                                    | Manual        | DOMAIN-MODEL (Capítulo 8 · DOC-32)     |
| RF-17 | Frecuencia de sincronización   | —               | `preferences.ts:91-100`                                       | `/settings`                                    | Manual        | PERFORMANCE (Capítulo 42 · DOC-38)     |
| RF-18 | Toasts Sileo                   | —               | `SileoProvider.tsx`, `alerts.ts`                              | Global                                         | Manual        | COMPONENTS (Capítulo 23 · DOC-27)      |
| RF-19 | Roles JWT + panel admin        | CU-001          | `auth.config.ts`, `authz.ts`, `admin/users/`                  | `/admin`, `/api/admin/*`                       | TEST-15       | AUTH (Capítulo 20 · DOC-13)            |
| RF-20 | Alertas umbraladas             | CU-004          | `alerts.ts`, `preferences.ts`                                 | Cliente (`sileo`)                              | Manual        | DOMAIN-MODEL (Capítulo 8 · DOC-32)     |
| RF-21 | Persistencia Sheets→PG         | —               | `readings.ts`, `lecturas`                                     | Implícito en todas las vistas                  | TEST-12 + SQL | DATABASE (Capítulo 24 · DOC-14)        |
| RF-22 | Ingesta IoT                    | —               | **No implementado**                                           | —                                              | —             | ROADMAP (Capítulo 37 · DOC-23)         |
| RF-23 | Multi-finca e invitaciones     | CU-005          | `farms.ts`, `farms/`, `invitations/`                          | `/farms`, `/admin`, `/invite/:code`            | TEST-16       | DATABASE (Capítulo 24 · DOC-14)        |
| RF-24 | Inicio por rol                 | CU-001          | `index.astro`, `middleware.ts`                                | `/`, `/admin`                                  | TEST-17       | ROUTES (Capítulo 17 · DOC-11)          |
| RF-25 | Galería de fotos por finca     | —               | `gallery/upload.ts`, `gallery/[id]/file.ts`, `photos`         | `/gallery`, `/gallery/[id]`                    | TEST-18       | COMPONENTS (Capítulo 23 · DOC-27)      |
| RF-26 | Diagnóstico de trips con IA    | —               | `trips-diagnosis.ts`, `TripsDiagnosticModal.astro`            | `POST /api/trips-diagnosis`                    | TEST-19       | CAMERA-ML (Capítulo 22 · DOC-26)       |
| RF-27 | Resumen semanal por correo     | —               | `weekly-summary.ts`, `notifications.ts`                       | `POST /api/notifications/weekly-summary`       | TEST-20       | ENDPOINTS (Capítulo 19 · DOC-12)       |

## 3. Matriz de requisitos no funcionales

| RNF    | Categoría      | Evidencia en código                                           | Estado                      | Verificación              | Documento                             |
| :----- | :------------- | :------------------------------------------------------------ | :-------------------------- | :------------------------ | :------------------------------------ |
| RNF-01 | Rendimiento    | SSR + `maxDuration:60`; sin medición de LCP                   | Parcial                     | Lighthouse pendiente      | PERFORMANCE (Capítulo 42 · DOC-38)    |
| RNF-02 | Rendimiento    | Timeout SIATA 3 s                                             | Implementado                | `curl -w`                 | INTEGRATIONS (Capítulo 29 · DOC-34)   |
| RNF-03 | Seguridad      | bcrypt; secretos por defecto en `trips-diagnosis.ts`/`aqi.ts` | **Incumplido parcialmente** | R-01/R-02                 | THREAT-MODEL (Capítulo 40 · DOC-36)   |
| RNF-04 | Seguridad      | `PROTECTED_PAGES`/`PROTECTED_API_PREFIXES`                    | Implementado                | AT-01                     | SECURITY (Capítulo 21 · DOC-24)       |
| RNF-05 | Disponibilidad | Fallbacks de clima/AQI; persistencia tolerante                | Parcial                     | Simular fallos            | ERROR-CATALOG (Capítulo 30 · DOC-35)  |
| RNF-06 | Usabilidad     | Diseño responsive; sin prueba con usuarios                    | Parcial                     | Prueba de campo pendiente | ACCESSIBILITY (Capítulo 43 · DOC-39)  |
| RNF-07 | Portabilidad   | CSS moderno + Three.js; sin matriz de navegadores             | No verificado               | Matriz pendiente          | TESTING (Capítulo 33 · DOC-17)        |
| RNF-08 | Mantenibilidad | 7 ADR + esta documentación verificada                         | Implementado                | Generador unificado       | DOC-CONVENTIONS (Capítulo 6 · DOC-43) |
| RNF-09 | Privacidad     | Respuestas enmascaradas en forgot-password                    | Implementado                | TEST-05                   | AUTH (Capítulo 20 · DOC-13)           |
| RNF-10 | Datos          | Umbrales en `badges.ts`/`csv.ts`; sin tests                   | Parcial                     | Importar fixture          | DOMAIN-MODEL (Capítulo 8 · DOC-32)    |
| RNF-11 | Trazabilidad   | Esta matriz                                                   | Implementado                | Revisión por release      | DOC-CONVENTIONS (Capítulo 6 · DOC-43) |

## 4. Trazabilidad de diseño

| Artefacto              | Identificadores   | Cubre                                                                       | Documento                                                               |
| :--------------------- | :---------------- | :-------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| Casos de uso           | CU-001…CU-007     | Acceso, tablero, detalle, alertas, exportación, Sheets, recuperación        | USE_CASES (Capítulo 10 · DOC-05)                                        |
| Historias de usuario   | US-001…US-011     | Roles y capacidades por actor                                               | USER_STORIES (Capítulo 11 · DOC-06)                                     |
| Diagramas de secuencia | SD-001…SD-004     | Login, importación, exportación, invitación                                 | SEQUENCE_DIAGRAMS (Capítulo 13 · DOC-08)                                |
| Diagramas de actividad | AD-001…AD-004     | Registro, sincronización, diagnóstico, permisos                             | ACTIVITIES (Capítulo 14 · DOC-09)                                       |
| Diagrama de clases     | Modelo de dominio | Entidades y relaciones                                                      | UML (Capítulo 12 · DOC-07)                                              |
| Diagrama ER            | 10 tablas         | Persistencia                                                                | DATABASE (Capítulo 24 · DOC-14)                                         |
| Decisiones             | ADR-001…ADR-008   | Stack, BD, auth, clima, Sheets, recuperación, bypass, landing en `/landing` | decisions (Apéndice A, ADR-001…ADR-007), LANDING (Capítulo 18 · DOC-47) |

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
2. Todo endpoint nuevo debe aparecer en ROUTES (Capítulo 17 · DOC-11), ENDPOINTS (Capítulo 19 · DOC-12) y en esta matriz si implementa un RF.
3. Toda columna nueva debe aparecer en DATABASE (Capítulo 24 · DOC-14), DATA-DICTIONARY (Capítulo 25 · DOC-15) y en la migración correspondiente.
4. Todo cambio de umbral debe actualizarse en DOMAIN-MODEL (Capítulo 8 · DOC-32), DATA-DICTIONARY (Capítulo 25 · DOC-15) y el código.
5. Si un requisito cambia de estado, se actualiza la SRS y esta matriz en el mismo PR (ver CONTRIBUTING (Capítulo 34 · DOC-18)).
6. Si cambia una pantalla capturada, se regenera con Playwright y se actualiza DOC-46.
7. La documentación unificada se regenera con el proceso de unificación (generador no incluido) antes de cada release.

## 7. Trazabilidad inversa (código → documentos)

| Archivo de código                           | Documentos que debe actualizar                                                                              |
| :------------------------------------------ | :---------------------------------------------------------------------------------------------------------- |
| `astro.config.mjs`                          | ARCHITECTURE (Capítulo 4 · DOC-03), DEPLOYMENT (Capítulo 32 · DOC-16), PERFORMANCE (Capítulo 42 · DOC-38)   |
| `auth.config.ts`                            | AUTH (Capítulo 20 · DOC-13), SECURITY (Capítulo 21 · DOC-24), DATABASE (Capítulo 24 · DOC-14)               |
| `src/middleware.ts`                         | ROUTES (Capítulo 17 · DOC-11), SECURITY (Capítulo 21 · DOC-24), ERROR-CATALOG (Capítulo 30 · DOC-35)        |
| `src/backend/services/*`                    | ARCHITECTURE (Capítulo 4 · DOC-03), DATA-FLOW (Capítulo 28 · DOC-33), INTEGRATIONS (Capítulo 29 · DOC-34)   |
| `src/pages/api/*`                           | ENDPOINTS (Capítulo 19 · DOC-12), ROUTES (Capítulo 17 · DOC-11), ERROR-CATALOG (Capítulo 30 · DOC-35)       |
| `src/db/*.sql` y `migrations/*`             | DATABASE (Capítulo 24 · DOC-14), DATA-DICTIONARY (Capítulo 25 · DOC-15), MIGRATIONS (Capítulo 31 · DOC-44)  |
| `src/shared/*`                              | DOMAIN-MODEL (Capítulo 8 · DOC-32), DATA-FLOW (Capítulo 28 · DOC-33)                                        |
| `src/frontend/components/*`                 | COMPONENTS (Capítulo 23 · DOC-27), ACCESSIBILITY (Capítulo 43 · DOC-39), USER_MANUAL (Capítulo 15 · DOC-10) |
| el generador de capturas (no incluido)      | CAPTURAS (Capítulo 47 · DOC-46), SCRIPTS (Capítulo 38 · DOC-25), ROUTES (Capítulo 17 · DOC-11)              |
| el generador de documentación (no incluido) | README (Capítulo 1 · DOC-00), DOC-CONVENTIONS (Capítulo 6 · DOC-43), PDF unificado                          |
| `scripts/*`                                 | SCRIPTS (Capítulo 38 · DOC-25), OPERATIONS-RUNBOOK (Capítulo 44 · DOC-40)                                   |
| `docs/*`                                    | README (Capítulo 1 · DOC-00), esta matriz, documento unificado                                              |

## 8. Trazabilidad

| Elemento         | Código                                                   | Documento relacionado                                                 | Verificación                                |
| :--------------- | :------------------------------------------------------- | :-------------------------------------------------------------------- | :------------------------------------------ |
| RF               | `src/pages/`, `src/backend/`                             | REQUIREMENTS (Capítulo 9 · DOC-04)                                    | Tabla §2                                    |
| CU/US            | Sin código directo                                       | USE_CASES (Capítulo 10 · DOC-05), USER_STORIES (Capítulo 11 · DOC-06) | Tabla §4                                    |
| Pruebas          | Sin suite automatizada                                   | TESTING (Capítulo 33 · DOC-17)                                        | Casos TEST-01…20                            |
| Documentación    | `docs/`                                                  | DOC-CONVENTIONS (Capítulo 6 · DOC-43)                                 | el generador de documentación (no incluido) |
| Evidencia visual | el generador de capturas (no incluido), `docs/capturas/` | CAPTURAS (Capítulo 47 · DOC-46)                                       | CAP-01…CAP-08 en el PDF                     |

---

# Capítulo 47. Capturas de Pantalla Verificadas - Macollo (DOC-46)

**Ruta fuente:** `docs/CAPTURAS.md` · **Parte:** Parte VI. Anexo visual

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-46**.

## 1. Propósito y método

Este documento incorpora al expediente unificado evidencia visual de la aplicación real. Las imágenes se obtuvieron con **Playwright** directamente contra un servidor de desarrollo en ejecución. **No se usó Astro Admin ni la ruta `/admin`**: solo se capturaron páginas de la experiencia de usuario.

- Fecha de captura: **2026-11-23**.
- Resolución escritorio: **1440 × 900 px**; móvil: **390 × 844 px**.
- Navegador: Chromium headless, `locale: es-CO`, `timezone: America/Bogota`.
- Geolocalización simulada en Medellín (6.2442, -75.5812) para evitar el aviso del navegador.
- Formato: JPEG calidad 82, suficiente para impresión en el PDF unificado.

Entorno usado:

```bash
astro dev --background
```

## 2. Inventario

| ID     | Pantalla                 | Ruta        | Archivo                                | Contenido                                                    |
| :----- | :----------------------- | :---------- | :------------------------------------- | :----------------------------------------------------------- |
| CAP-01 | Portada pública y acceso | `/`         | `docs/capturas/01-inicio-publico.jpg`  | Vista pública con pestañas de inicio de sesión y registro.   |
| CAP-02 | Dashboard principal      | `/`         | `docs/capturas/02-dashboard.jpg`       | Matriz 4×5, semáforo, clima y escena 3D con la finca activa. |
| CAP-03 | Métricas agronómicas     | `/metrics`  | `docs/capturas/03-metricas.jpg`        | Promedios, badges y tabla de métricas por planta.            |
| CAP-04 | Historial de lecturas    | `/history`  | `docs/capturas/04-historial.jpg`       | Historial por fecha con importación, Sheets y exportación.   |
| CAP-05 | Galería por finca        | `/gallery`  | `docs/capturas/05-galeria.jpg`         | Galería de fotos asociada a la finca activa.                 |
| CAP-06 | Gestión de fincas        | `/farms`    | `docs/capturas/06-fincas.jpg`          | Selección de finca activa, miembros e invitaciones.          |
| CAP-07 | Configuración            | `/settings` | `docs/capturas/07-configuracion.jpg`   | Perfil, tema y preferencias de la cuenta.                    |
| CAP-08 | Dashboard en móvil       | `/`         | `docs/capturas/08-dashboard-movil.jpg` | Vista responsive del dashboard en 390×844 px.                |

## 3. Evidencia visual

### CAP-01. Portada pública y acceso

![CAP-01 — Portada pública y acceso](../capturas/01-inicio-publico.jpg)

Ruta: `/`. Vista pública con pestañas de inicio de sesión y registro.

### CAP-02. Dashboard principal

![CAP-02 — Dashboard principal](../capturas/02-dashboard.jpg)

Ruta: `/`. Matriz 4×5, semáforo, clima y escena 3D con la finca activa.

### CAP-03. Métricas agronómicas

![CAP-03 — Métricas agronómicas](../capturas/03-metricas.jpg)

Ruta: `/metrics`. Promedios, badges y tabla de métricas por planta.

### CAP-04. Historial de lecturas

![CAP-04 — Historial de lecturas](../capturas/04-historial.jpg)

Ruta: `/history`. Historial por fecha con importación, Sheets y exportación.

### CAP-05. Galería por finca

![CAP-05 — Galería por finca](../capturas/05-galeria.jpg)

Ruta: `/gallery`. Galería de fotos asociada a la finca activa.

### CAP-06. Gestión de fincas

![CAP-06 — Gestión de fincas](../capturas/06-fincas.jpg)

Ruta: `/farms`. Selección de finca activa, miembros e invitaciones.

### CAP-07. Configuración

![CAP-07 — Configuración](../capturas/07-configuracion.jpg)

Ruta: `/settings`. Perfil, tema y preferencias de la cuenta.

### CAP-08. Dashboard en móvil

![CAP-08 — Dashboard en móvil](../capturas/08-dashboard-movil.jpg)

Ruta: `/`. Vista responsive del dashboard en 390×844 px.

## 4. Limitaciones

- Las capturas reflejan el estado del entorno local en la fecha indicada, con la base de datos de desarrollo y 60 lecturas cargadas.
- No se incluye `/admin` por instrucción explícita; las pantallas de staff se documentan en ROUTES (Capítulo 17 · DOC-11) y AUTH (Capítulo 20 · DOC-13).
- La cámara y la inferencia ML no se disparan durante la captura: el diagnóstico se documenta en CAMERA-ML (Capítulo 22 · DOC-26).
- Las imágenes son artefactos derivados: no se editan manualmente.

## 5. Trazabilidad

| Tema               | Código / configuración                          | Documento relacionado                                           | Verificación                            |
| :----------------- | :---------------------------------------------- | :-------------------------------------------------------------- | :-------------------------------------- |
| CAP-01…CAP-08      | Capturas con Playwright (generador no incluido) | README (Capítulo 1 · DOC-00)                                    | Archivos presentes en `docs/capturas/`  |
| Rutas capturadas   | `src/pages/*.astro`                             | ROUTES (Capítulo 17 · DOC-11)                                   | Coincidencia de URL y contenido visible |
| Evidencia visual   | `docs/capturas/*.jpg`                           | PDF unificado (`./UNIFIED/Macollo-Documentacion-Unificada.pdf`) | Inserción de imágenes en el DOCX/PDF    |
| Exclusión de staff | Sin `/admin`                                    | AUTH (Capítulo 20 · DOC-13)                                     | Revisión del inventario §2              |

---

# Apéndice A.1. ADR-001: Astro en modo SSR desplegado en Vercel (ADR-001)

**Ruta fuente:** `docs/decisions/ADR-001-astro-ssr-vercel.md` · **Parte:** Apéndice A. Decisiones arquitectónicas

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **ADR-001**.

## Status

Accepted

## Date

2026-09-01

## Context

Necesitamos una app web con páginas por rol/sesión y una API (auth, Excel, Sheets, proxy SIATA) sin operar dos despliegues. Requisitos: render según sesión en servidor, API routes en el mismo origen (evita CORS propio), despliegue simple con previews por rama. Equipo: 6 personas, sin capacidad de ops dedicada.

## Decision

Astro 7.2.8 con `output: 'server'`, adaptador `@astrojs/vercel`, integraciones `auth()` y `react()`. File-based routing en `src/pages/` para vistas y `/api/*` para backend.

## Alternatives Considered

### SPA (Vite + React) + API separada

- Pros: ecosistema React puro, interactividad total en cliente
- Cons: dos despliegues, CORS entre front/back, SEO y primera carga peores, más ops
- Rejected: sobredimensionado para paneles de lectura con islas de interactividad puntuales

### Astro estático + serverless aparte

- Pros: CDN barato para el front
- Cons: la sesión y los endpoints sensibles igual exigen servidor; se pierde `getSession` en SSR
- Rejected: duplica superficie sin beneficio (igual necesitamos cómputo por request)

### Next.js

- Pros: SSR maduro, equipo lo conoce parcialmente
- Cons: mayor peso de runtime y costo Vercel para el mismo alcance; Astro islas dan mejor rendimiento con menos JS
- Rejected: Astro cubre el caso con menor huella

## Consequences

- `src/pages/` es a la vez vistas y API; la convención debe respetarse (ver ROUTES.md).
- Todo lo sensible corre en funciones serverless con `maxDuration: 60` (`astro.config.mjs:15-19`); el proxy SIATA aborta a 3 s por diseño y la ruta ML reserva 50 s.
- Se requiere Postgres en la nube (sin disco local). Ver ADR-002.

## Trazabilidad

| Tema     | Código / configuración | Documento relacionado             | Verificación                   |
| :------- | :--------------------- | :-------------------------------- | :----------------------------- |
| Decisión | `astro.config.mjs`     | DEPLOYMENT (Capítulo 32 · DOC-16) | Estado y consecuencias del ADR |

---

# Apéndice A.2. ADR-002: PostgreSQL en la nube como base de datos (ADR-002)

**Ruta fuente:** `docs/decisions/ADR-002-postgres-cloud.md` · **Parte:** Apéndice A. Decisiones arquitectónicas

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **ADR-002**.

## Status

Accepted

## Date

2026-09-01

## Context

Datos relacionales: usuarios↔cuentas OAuth↔sesiones↔tokens, y a futuro plantas↔mediciones↔responsables con consultas analíticas (promedios, históricos). El despliegue (ADR-001) es serverless sin disco persistente y el panel debe verse remotamente.

## Decision

PostgreSQL 17 en la nube (Supabase/Neon/RDS) vía `pg.Pool` (`src/db/client.ts`, SSL en producción). Esquemas en `src/db/auth-schema.sql` (auth, activo) e `greenhouse-schema.sql` (agronómico, objetivo — ver DATABASE.md §5).

## Alternatives Considered

### SQLite local

- Pros: cero config, ideal embebido
- Cons: archivo efímero en serverless, sin acceso remoto multiusuario
- Rejected: solo viable si el panel corriera offline en una Raspberry del invernadero (escenario descartado)

### Firebase Realtime Database

- Pros: latencia mínima para telemetría continua
- Cons: modelo no relacional, consultas analíticas pobres, lock-in
- Rejected: nuestro acceso es por tomas diarias + agregados, no streaming; se reevaluaría con IoT en vivo (ver ARCHITECTURE §6)

### Supabase vs RDS genérico

- Pros Supabase: Postgres gestionado + editor SQL, arranque rápido para el equipo
- Cons: menos control fino que RDS
- Accepted con flexibilidad: el código solo exige Postgres (`DATABASE_URL`/`POSTGRES_*`), el proveedor es intercambiable

## Consequences

- Auth persiste en PG hoy; el dataset agronómico vive en memoria hasta migrar Sheets→PG (brecha documentada, no deuda oculta).
- Pool `max: 20`, timeouts cortos; migraciones con `psql -f` (sin ORM).
- Backup con `pg_dump` antes de cada jornada de campo.

## Trazabilidad

| Tema     | Código / configuración             | Documento relacionado           | Verificación                   |
| :------- | :--------------------------------- | :------------------------------ | :----------------------------- |
| Decisión | `src/db/client.ts`, `src/db/*.sql` | DATABASE (Capítulo 24 · DOC-14) | Estado y consecuencias del ADR |

---

# Apéndice A.3. ADR-003: Auth.js (Credentials + Google) con sesión JWT y rol (ADR-003)

**Ruta fuente:** `docs/decisions/ADR-003-authjs-jwt.md` · **Parte:** Apéndice A. Decisiones arquitectónicas

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **ADR-003**.

## Status

Accepted

## Date

2026-09-05

## Context

Se requiere login email/celular y contraseña contra PG, registro con roles (`Campesino`/`Agropecuario`; la migración 001 normaliza `Agronomo`→`Agropecuario` y `Super admin`→`Superadmin`), OAuth Google y recuperación de contraseña, funcionando tras proxy HTTPS (Vercel/Cloudflare) y en serverless sin sesiones pegajosas.

## Decision

Auth.js vía `auth-astro` (`auth.config.ts`): proveedores Credentials (bcrypt contra `users`, acepta email/celular) + Google (`allowDangerousEmailAccountLinking`), adaptador `PostgresAdapter`, `session.strategy: 'jwt'` con `role` en el token (`jwt`/`session` callbacks), `trustHost: true` + fix `x-forwarded-proto/host` en `middleware.ts`.

## Alternatives Considered

### Sesiones en BD (strategy database)

- Pros: revocación inmediata, inspección simple
- Cons: una lectura a `sessions` por request; en serverless suma latencia y el JWT ya cubre el caso
- Rejected: la tabla `sessions` queda creada pero con uso reducido; se acepta re-login tras cambio de rol

### Auth propia (cookies + JWT manual)

- Pros: control total, cero dependencias
- Cons: reimplementar OAuth, CSRF, expiración y rotación; alto riesgo de seguridad con equipo sin especialista
- Rejected: Auth.js ya resuelve OAuth/CSRF/cookies seguras

### Proveedor externo (Clerk/Auth0)

- Pros: UI y gestión listas
- Cons: costo, dependencia y datos de usuarios fuera de nuestra PG
- Rejected: el control de roles por enum propio y el costo no lo justifican

## Consequences

- Toda cuenta nace `Campesino` (el handler ignora el rol del formulario); promover con `UPDATE users`.
- Cambio de rol exige re-login (el JWT no se refresca solo).
- `AUTH_SECRET` obligatorio en prod; Google exige callback autorizado.
- Corrección: la brecha histórica del guardián sobre `/dashboard` (inexistente) quedó resuelta; `middleware.ts` protege las rutas reales, incluida `/gallery` (ver AUTH §7 y SECURITY §2).

## Trazabilidad

| Tema     | Código / configuración                | Documento relacionado       | Verificación                   |
| :------- | :------------------------------------ | :-------------------------- | :----------------------------- |
| Decisión | `auth.config.ts`, `src/middleware.ts` | AUTH (Capítulo 20 · DOC-13) | Estado y consecuencias del ADR |

---

# Apéndice A.4. ADR-004: Proxy interno `/api/siata` + estrategia dual SIATA/Open-Meteo (ADR-004)

**Ruta fuente:** `docs/decisions/ADR-004-proxy-siata-dual.md` · **Parte:** Apéndice A. Decisiones arquitectónicas

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **ADR-004**.

## Status

Superseded (parcial, temporal) por ADR-007

## Date

2026-09-10

## Context

El panel necesita temperatura local precisa en Medellín (red SIATA) y cobertura fuera de ella. Los navegadores bloquean `fetch` directo a `siata.gov.co:8089` por CORS, y el endpoint público no tiene SLA.

## Decision

- `GET /api/siata` proxyea `estacionesTemperatura/20` desde el servidor (timeout/abort 3 s, `Access-Control-Allow-Origin: *`).
- `fetchWeatherData(lat, lon)`: si `isValleDeAburra` (bbox 6.00–6.50 / -75.75–-75.40) combina temp SIATA + resto Open-Meteo; si no, o ante fallo, solo Open-Meteo (`America/Bogota`). Ver `src/backend/services/weather.ts`.

## Alternatives Considered

### Fetch directo a SIATA desde el cliente

- Pros: sin código servidor
- Cons: bloqueado por CORS en todos los navegadores modernos
- Rejected: técnicamente inviable

### Solo Open-Meteo global

- Pros: una sola dependencia, SLA y formato estables
- Cons: pierde la precisión de la red local donde está el cultivo real
- Rejected como única fuente; queda como respaldo (gratis, sin API key)

### Cachear SIATA en PG/cron

- Pros: resiliencia ante caídas, histórico propio
- Cons: infraestructura de cron + invalidación que hoy no necesitamos (el clima se muestra, no se audita)
- Rejected por ahora; reconsiderar si el clima alimenta alertas automáticas

## Consequences

- `source` visible (`SIATA (Valle de Aburrá)` vs `Open-Meteo (Global)`): el usuario sabe de dónde viene el dato.
- Ante caída de SIATA el panel sigue funcionando (500 controlado → fallback), nunca cuelga.
- Clima con geolocalización + fallback Medellín y refresco 10 min en el Dashboard.

## Trazabilidad

| Tema     | Código / configuración                                      | Documento relacionado               | Verificación                   |
| :------- | :---------------------------------------------------------- | :---------------------------------- | :----------------------------- |
| Decisión | `src/pages/api/siata.ts`, `src/backend/services/weather.ts` | INTEGRATIONS (Capítulo 29 · DOC-34) | Estado y consecuencias del ADR |

---

# Apéndice A.5. ADR-005: Importación desde Google Sheets vía CSV público (sin API de Google) (ADR-005)

**Ruta fuente:** `docs/decisions/ADR-005-sheets-csv.md` · **Parte:** Apéndice A. Decisiones arquitectónicas

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **ADR-005**.

## Status

Accepted (con brecha registrada)

## Date

2026-09-14

## Context

Las tomas de campo se registran en Google Sheets con formatos heterogéneos (`T0-P1`, `TO-P2`, coma decimal, fechas DD/MM/YYYY y seriales Excel). Se necesita llevarlas al panel sin fricción para operarios no técnicos y sin gestionar credenciales OAuth de Google en el servidor.

## Decision

`POST /api/sync-sheets { url }`: normaliza la URL a `export?format=csv`, descarga sin credenciales (documento público/lectura), parsea tolerante (delimitador auto, comillas, `resolvePlantCoordinates`, reglas de dominio como temp. de suelo `null` el 29–30-sep) y devuelve `records` que el cliente mantiene **en memoria**. Ver `src/pages/api/sync-sheets.ts`.

## Alternatives Considered

### Google Sheets API con cuenta de servicio

- Pros: lectura robusta, metadatos, escritura bidireccional
- Cons: credenciales, consentimientos y gestión de accesos por hoja; fricción para campo
- Rejected: sobredimensionado para ingesta de lectura; el enlace público basta

### Carga manual de Excel/CSV en cliente

- Pros: cero red, funciona offline
- Cons: no reutiliza la hoja viva del equipo; doble trabajo
- Accepted como complemento (ya existe en Historial), no como única vía

### Persistir cada sync en PostgreSQL

- Pros: cierra la brecha (histórico consultable, `GET /api/metrics` real)
- Cons: exige idempotencia por `(planta, fecha, tipo)` y backfill del histórico 14–30-sep antes de ser útil
- Deferred: es la migración propuesta (DATABASE.md §5). Mientras tanto la brecha es explícita: exportar Excel sale de memoria, no de PG

## Consequences

- Requisito operativo: la hoja debe estar en _"Cualquier persona con el enlace"_ o _"Publicado como CSV"_ (error 422 guiado si no).
- Sin programación por intervalo: cada toma nueva exige re-importar (el intervalo de Settings es preferencia de refresco, no ingesta).
- Parser tolerante documentado en ENDPOINTS.md; casos nuevos de formato se agregan ahí, no en código disperso.

## Trazabilidad

| Tema     | Código / configuración                                              | Documento relacionado            | Verificación                   |
| :------- | :------------------------------------------------------------------ | :------------------------------- | :----------------------------- |
| Decisión | `src/backend/services/sheetsSync.ts`, `src/shared/recordsParser.ts` | DATA-FLOW (Capítulo 28 · DOC-33) | Estado y consecuencias del ADR |

---

# Apéndice A.6. ADR-006: bcrypt + recuperación con código de 6 dígitos (15 min) (ADR-006)

**Ruta fuente:** `docs/decisions/ADR-006-bcrypt-recovery.md` · **Parte:** Apéndice A. Decisiones arquitectónicas

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **ADR-006**.

## Status

Accepted

## Date

2026-09-08

## Context

Contraseñas nunca en texto plano; recuperación usable por operarios de campo (muchos con celular antes que email) sin montar un sistema de tokens con enlaces firmados.

## Decision

- Hash **bcrypt** (salt 10 rondas): registro, login (`compare`) y reset usan el mismo esquema; solo se aceptan hashes `$2a$/$2b$`.
- Recuperación en dos pasos con **código numérico de 6 dígitos, 15 min de validez** en `verification_token`: `forgot-password` (emite, invalida anteriores, envía email SMTP o SMS; el mensaje enmascara el destino pero `identifier` se devuelve sin enmascarar) → `reset-password` (verifica `expires > NOW()`, exige mínimo 8 caracteres, actualiza hash y borra token).

## Alternatives Considered

### Enlace firmado de un solo uso (24 h)

- Pros: un clic, estándar en apps de escritorio
- Cons: expira lento si se reenvía, peor UX en celulares básicos, exige página de aterrizaje con token en URL (logs/proxys lo exponen)
- Rejected: el código corto con ventana de 15 min minimiza la superficie y funciona por SMS

### argon2 en vez de bcrypt

- Pros: mejor resistencia GPU/ASIC
- Cons: sin soporte nativo en el stack actual; `bcryptjs` ya integrado y auditado en uso
- Rejected: el costo de migración no compensa para este perfil de amenaza; reevaluar con auditoría formal

### Preguntas secretas / reset por admin

- Pros: cero infraestructura de correo
- Cons: respuestas adivinables; dependencia humana y tiempos muertos en campo
- Rejected: inaceptable operativamente

## Consequences

- Discrepancia conocida: el cliente pide ≥ 8 caracteres pero el servidor valida ≥ 6 (unificar a 8 al endurecer).
- Sin SMTP configurado no hay envío real (`sent: false` + código en logs): el deploy exige `SMTP_USER/SMTP_PASS` (ver DEPLOYMENT.md).
- SMS depende del proveedor en `notifications.ts`; documentar el suyo al cambiarlo.

## Trazabilidad

| Tema     | Código / configuración                                                          | Documento relacionado       | Verificación                   |
| :------- | :------------------------------------------------------------------------------ | :-------------------------- | :----------------------------- |
| Decisión | `src/pages/api/auth/forgot-password.ts`, `src/pages/api/auth/reset-password.ts` | AUTH (Capítulo 20 · DOC-13) | Estado y consecuencias del ADR |

---

# Apéndice A.7. ADR-007: Bypass temporal de SIATA (Open-Meteo directo + fallback offline) (ADR-007)

**Ruta fuente:** `docs/decisions/ADR-007-bypass-siata.md` · **Parte:** Apéndice A. Decisiones arquitectónicas

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **ADR-007**.

## Status

Accepted (temporal — revisitar al volver SIATA)

## Date

2026-10-08

## Context

El servicio SIATA (`siata.gov.co:8089`) quedó fuera de línea o con timeouts. Cada carga del Dashboard pagaba ~3 s esperando el proxy antes de caer al respaldo, degradando la primera pintura del widget climático. Ver ADR-004 (diseño dual original).

## Decision

`fetchWeatherData()` usa **Open-Meteo directo** (`wind_speed_10m` reemplaza a `shortwave_radiation`; `timezone=auto`) con **fallback offline** (22 °C, 60 %, lluvia 0, viento 5 km/h, `source: 'Offline Fallback'`). El proxy `/api/siata`, `fetchSiataPredictions()` e `isValleDeAburra` quedan latentes (sin borrar) para reactivación. Commit `efed143`.

## Alternatives Considered

### Mantener el intento SIATA con timeout menor (1 s)

- Pros: conserva la precisión local cuando SIATA responde lento pero vivo
- Cons: con SIATA caído igual se paga 1 s por carga; el diagnóstico mostró caída total, no lentitud
- Rejected: el bypass total da respuesta instantánea; el timeout de 3 s del proxy sigue como red de seguridad

### Cachear última temp. SIATA en cliente/PG

- Pros: conserva precisión local histórica ante caídas cortas
- Cons: dato obsoleto mostrado como actual (peor que fallback explícito `Offline Fallback`)
- Rejected: el fallback declara su fuente; no finge precisión

### Eliminar el código SIATA

- Pros: menos código muerto
- Cons: la reactivación costaría reescribir proxy + parsing; la intención es temporal
- Rejected: se conserva y documenta como latente

## Consequences

- Widget con **viento (km/h)** en vez de irradiación; `source` siempre `Open-Meteo (Global)` u `Offline Fallback`.
- ADR-004 pasa a **Superseded (parcial, temporal)** por este ADR; reactivar = nuevo ADR + revert de `efed143` en `weather.ts` + TEST-14 contra SIATA.
- `isValleDeAburra` sin uso: no borrar (la usa la reactivación); el linter puede marcarla — aceptado conscientemente.

## Trazabilidad

| Tema     | Código / configuración                                      | Documento relacionado              | Verificación                   |
| :------- | :---------------------------------------------------------- | :--------------------------------- | :----------------------------- |
| Decisión | `src/backend/services/weather.ts`, `src/pages/api/siata.ts` | PERFORMANCE (Capítulo 42 · DOC-38) | Estado y consecuencias del ADR |

---

# Apéndice A.8. ADR-008: Landing en `/landing` y subdominio diferido (ADR-008)

**Ruta fuente:** `docs/decisions/ADR-008-landing-subdominio.md` · **Parte:** Apéndice A. Decisiones arquitectónicas

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md (Capítulo 1 · DOC-00). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **ADR-008**.

> El slug del archivo conserva «subdominio» por la discusión original; la decisión vigente es la que sigue.

## Status

Accepted

## Date

2026-11-23

## Context

Se necesita una landing pública que comunique quiénes somos, qué hacemos, por qué, stack, solución, capacidades y público objetivo. El dominio de producción mencionado al plantear el trabajo era **solo un ejemplo** y aún no está definido; además, el desarrollo se valida en `localhost:4321`.

Publicar la landing con un subdominio inventado habría requerido hardcodear un dominio, añadir una rama por host en el middleware y redirigir `/landing` hacia ese subdominio. Eso deja la página invisible en local y acopla el código a un nombre de dominio que todavía no existe.

## Decision

La landing se sirve en **`src/pages/landing.astro`, en la ruta `/landing`**, accesible en cualquier host, incluido `localhost:4321`:

- `src/middleware.ts` **no cambia**: no hay branch por host, ni redirección de `/landing`, ni allowlist de dominios.
- La página es SSR (no prerenderizada) porque el proyecto usa `output: "server"`.
- El canonical se deriva de la petición (`new URL(Astro.url.pathname, Astro.url).href`) y los CTA apuntan a `/`: no hay dominios hardcodeados.
- La publicación en un subdominio real se **difiere** hasta que se defina el dominio; en ese momento se hará en la configuración del proveedor o con un proyecto estático separado, sin modificar esta página.

## Alternatives Considered

### Publicar ya en un subdominio inventado con branch por host

- Pros: deja la estructura de dominios «lista» de antemano.
- Cons: el dominio es solo un ejemplo; la redirección de `/landing` impide ver la página en localhost; añade lógica de host al middleware y canonical/CTA hardcodeados.
- Rejected: se prefiere una ruta visible y neutral hasta conocer el dominio real (decisión de esta ADR).

### Proyecto Vercel independiente para la landing

- Pros: aislamiento total respecto de la app.
- Cons: segundo pipeline, segundo lockfile y duplicación de assets sin que exista aún un dominio al que apuntar.
- Rejected por ahora: se puede adoptar más adelante sin cambiar el contenido de la página.

### `vercel.json` con rewrites por host

- Pros: configuración declarativa aparente.
- Cons: Vercel desaconseja rewrites de rutas en proyectos Astro (comportamiento inconsistente, no soporte oficial); el adaptador ya genera sus propias rutas.
- Rejected.

### Prerenderizar la landing

- Pros: salida estática más simple.
- Cons: el proyecto es SSR y la ruta debe convivir con el middleware; no aporta beneficios mientras no haya dominio definido.
- Rejected: se mantiene SSR por defecto.

## Consequences

- `/landing` se puede abrir y validar en local sin configuración adicional.
- El mismo deployment sirve la app y la landing; no se toca `astro.config.mjs` ni se crea `vercel.json`.
- Los enlaces siguen funcionando aunque cambie el dominio, porque son relativos.
- Cuando se defina el dominio, habrá que decidir su mapeo (subdominio en el mismo proyecto o proyecto aparte) y actualizar canonical/CTA si se quiere un dominio fijo; esa decisión ameritará un ADR nuevo o una revisión de este.
- El detalle de contenido, diseño y validación está en LANDING (Capítulo 18 · DOC-47) (DOC-47).

## Trazabilidad

| Tema          | Código / configuración                                       | Documento relacionado                                         | Verificación                         |
| :------------ | :----------------------------------------------------------- | :------------------------------------------------------------ | :----------------------------------- |
| Decisión      | `src/pages/landing.astro`, `src/middleware.ts` (sin cambios) | LANDING (Capítulo 18 · DOC-47), ROUTES (Capítulo 17 · DOC-11) | `curl http://localhost:4321/landing` |
| Configuración | `astro.config.mjs` (sin cambios)                             | DEPLOYMENT (Capítulo 32 · DOC-16)                             | `pnpm build`                         |
| Perímetro     | `astro.config.mjs:13`                                        | SECURITY (Capítulo 21 · DOC-24)                               | Sin lógica de host nueva             |

---

# Apéndice B. Índice de identificadores

| ID      | Referencia   | Documento                                                                    | Ruta fuente                                    |
| :------ | :----------- | :--------------------------------------------------------------------------- | :--------------------------------------------- |
| DOC-00  | Capítulo 1   | Índice de Documentación - Macollo                                            | `docs/README.md`                               |
| DOC-01  | Capítulo 2   | [MACOLLO] Macollo - Monitoreo Agronómico                                     | `README.md`                                    |
| DOC-02  | Capítulo 3   | Arquitectura del Sistema - Macollo                                           | `ARCHITECTURE.md`                              |
| DOC-03  | Capítulo 4   | Arquitectura del Sistema - Macollo                                           | `docs/ARCHITECTURE.md`                         |
| DOC-30  | Capítulo 5   | Resumen Ejecutivo del Sistema Macollo                                        | `docs/EXECUTIVE-SUMMARY.md`                    |
| DOC-43  | Capítulo 6   | Convenciones Documentales y Construcción del Documento Unificado             | `docs/DOC-CONVENTIONS.md`                      |
| DOC-31  | Capítulo 7   | Contexto y Fronteras del Sistema                                             | `docs/SYSTEM-CONTEXT.md`                       |
| DOC-32  | Capítulo 8   | Modelo de Dominio y Reglas de Negocio                                        | `docs/DOMAIN-MODEL.md`                         |
| DOC-04  | Capítulo 9   | Especificación de Requisitos (SRS) - Macollo                                 | `docs/REQUIREMENTS.md`                         |
| DOC-05  | Capítulo 10  | Casos de Uso                                                                 | `docs/USE_CASES.md`                            |
| DOC-06  | Capítulo 11  | User Stories                                                                 | `docs/USER_STORIES.md`                         |
| DOC-07  | Capítulo 12  | Diagramas UML - Macollo                                                      | `docs/UML.md`                                  |
| DOC-08  | Capítulo 13  | Diagramas de Secuencia                                                       | `docs/SEQUENCE_DIAGRAMS.md`                    |
| DOC-09  | Capítulo 14  | Diagramas de Actividad                                                       | `docs/ACTIVITIES.md`                           |
| DOC-10  | Capítulo 15  | 📖 Manual de Usuario - Macollo                                               | `docs/USER_MANUAL.md`                          |
| DOC-45  | Capítulo 16  | Preguntas Frecuentes (FAQ)                                                   | `docs/FAQ.md`                                  |
| DOC-11  | Capítulo 17  | Rutas de página (Routes) de Macollo                                          | `docs/ROUTES.md`                               |
| DOC-47  | Capítulo 18  | Landing Pública de Macollo                                                   | `docs/LANDING.md`                              |
| DOC-12  | Capítulo 19  | Endpoints de la API de Macollo                                               | `docs/ENDPOINTS.md`                            |
| DOC-13  | Capítulo 20  | Autenticación y Autorización - Macollo                                       | `docs/AUTH.md`                                 |
| DOC-24  | Capítulo 21  | Política de Seguridad - Macollo                                              | `docs/SECURITY.md`                             |
| DOC-26  | Capítulo 22  | Cámara y Machine Learning - Detección de Trips (BioCLIP 2.5)                 | `docs/CAMERA-ML.md`                            |
| DOC-27  | Capítulo 23  | Componentes de frontend                                                      | `docs/COMPONENTS.md`                           |
| DOC-14  | Capítulo 24  | Base de datos - PostgreSQL (Macollo)                                         | `docs/DATABASE.md`                             |
| DOC-15  | Capítulo 25  | Diccionario de datos - Macollo                                               | `docs/DATA-DICTIONARY.md`                      |
| DOC-21  | Capítulo 26  | Protocolo de Campo - Toma de Datos (para operarios)                          | `docs/FIELD-PROTOCOL.md`                       |
| DOC-22  | Capítulo 27  | Datos Demo - Macollo                                                         | `docs/DEMO-DATA.md`                            |
| DOC-33  | Capítulo 28  | Flujo de Datos Extremo a Extremo                                             | `docs/DATA-FLOW.md`                            |
| DOC-34  | Capítulo 29  | Integraciones Externas y Contratos                                           | `docs/INTEGRATIONS.md`                         |
| DOC-35  | Capítulo 30  | Catálogo de Errores y Códigos de Respuesta                                   | `docs/ERROR-CATALOG.md`                        |
| DOC-44  | Capítulo 31  | Migraciones de Esquema y Evolución de la Base de Datos                       | `docs/MIGRATIONS.md`                           |
| DOC-16  | Capítulo 32  | Despliegue y Operación - Macollo                                             | `docs/DEPLOYMENT.md`                           |
| DOC-17  | Capítulo 33  | Plan de Pruebas - Macollo                                                    | `docs/TESTING.md`                              |
| DOC-18  | Capítulo 34  | Contribuir - Macollo                                                         | `docs/CONTRIBUTING.md`                         |
| DOC-19  | Capítulo 35  | Troubleshooting (Runbook) - Macollo                                          | `docs/TROUBLESHOOTING.md`                      |
| DOC-20  | Capítulo 36  | Glosario - Macollo                                                           | `docs/GLOSSARY.md`                             |
| DOC-23  | Capítulo 37  | Roadmap - Macollo                                                            | `docs/ROADMAP.md`                              |
| DOC-25  | Capítulo 38  | Scripts de utilidad                                                          | `docs/SCRIPTS.md`                              |
| DOC-28  | Capítulo 39  | Changelog - Macollo                                                          | `docs/CHANGELOG.md`                            |
| DOC-36  | Capítulo 40  | Modelo de Amenazas y Superficie de Ataque                                    | `docs/THREAT-MODEL.md`                         |
| DOC-37  | Capítulo 41  | Atributos de Calidad y Escenarios Arquitectónicos                            | `docs/QUALITY-ATTRIBUTES.md`                   |
| DOC-38  | Capítulo 42  | Rendimiento, Límites y Presupuestos                                          | `docs/PERFORMANCE.md`                          |
| DOC-39  | Capítulo 43  | Accesibilidad e Internacionalización                                         | `docs/ACCESSIBILITY.md`                        |
| DOC-40  | Capítulo 44  | Runbook de Operación y Respuesta a Incidentes                                | `docs/OPERATIONS-RUNBOOK.md`                   |
| DOC-41  | Capítulo 45  | Guía de Incorporación para el Equipo de Desarrollo                           | `docs/ONBOARDING.md`                           |
| DOC-42  | Capítulo 46  | Matriz de Trazabilidad Requisito -> Diseño -> Código -> Verificación         | `docs/TRACEABILITY-MATRIX.md`                  |
| DOC-46  | Capítulo 47  | Capturas de Pantalla Verificadas - Macollo                                   | `docs/CAPTURAS.md`                             |
| ADR-001 | Apéndice A.1 | ADR-001: Astro en modo SSR desplegado en Vercel                              | `docs/decisions/ADR-001-astro-ssr-vercel.md`   |
| ADR-002 | Apéndice A.2 | ADR-002: PostgreSQL en la nube como base de datos                            | `docs/decisions/ADR-002-postgres-cloud.md`     |
| ADR-003 | Apéndice A.3 | ADR-003: Auth.js (Credentials + Google) con sesión JWT y rol                 | `docs/decisions/ADR-003-authjs-jwt.md`         |
| ADR-004 | Apéndice A.4 | ADR-004: Proxy interno `/api/siata` + estrategia dual SIATA/Open-Meteo       | `docs/decisions/ADR-004-proxy-siata-dual.md`   |
| ADR-005 | Apéndice A.5 | ADR-005: Importación desde Google Sheets vía CSV público (sin API de Google) | `docs/decisions/ADR-005-sheets-csv.md`         |
| ADR-006 | Apéndice A.6 | ADR-006: bcrypt + recuperación con código de 6 dígitos (15 min)              | `docs/decisions/ADR-006-bcrypt-recovery.md`    |
| ADR-007 | Apéndice A.7 | ADR-007: Bypass temporal de SIATA (Open-Meteo directo + fallback offline)    | `docs/decisions/ADR-007-bypass-siata.md`       |
| ADR-008 | Apéndice A.8 | ADR-008: Landing en `/landing` y subdominio diferido                         | `docs/decisions/ADR-008-landing-subdominio.md` |

# Apéndice C. Procedimiento de regeneración

```bash
python3 scripts/build-unified-docs.py
pdfinfo docs/UNIFIED/Macollo-Documentacion-Unificada.pdf | grep Pages
```

El generador comprueba que todos los `.md` bajo `docs/` y `docs/decisions/` estén en el manifiesto, reescribe los enlaces, resuelve las imágenes del anexo visual respecto a `docs/UNIFIED/`, produce el Markdown unificado, compone el DOCX con estilos e imágenes incrustadas y convierte a PDF con LibreOffice. Las capturas se generan antes con `node scripts/capture-screenshots.mjs`. El PDF es un artefacto derivado: no se edita manualmente.

# Apéndice D. Verificación documental

| Comprobación     | Comando                                 | Criterio de aceptación              |
| :--------------- | :-------------------------------------- | :---------------------------------- |
| Cobertura        | `python3 scripts/build-unified-docs.py` | Termina sin errores de manifiesto   |
| Rutas de código  | Ver `docs/DOC-CONVENTIONS.md` §6        | Sin `RUTA ROTA`                     |
| Enlaces          | Ver `docs/DOC-CONVENTIONS.md` §6        | Sin `DOC ROTO`                      |
| PDF              | `pdfinfo ...pdf`                        | `Pages` mayor que 0                 |
| Evidencia visual | `node scripts/capture-screenshots.mjs`  | CAP-01…CAP-08 incrustadas en el PDF |
