# Resumen Ejecutivo del Sistema Macollo

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-30**.

## 1. Propósito

Este documento ofrece en una sola lectura la ficha técnica, el valor de negocio, el alcance y el estado de madurez de **Macollo**, para que un evaluador, un patrocinador o un nuevo integrante del equipo pueda tomar decisiones sin recorrer previamente los treinta documentos del conjunto. No sustituye a los documentos de detalle: los enlaza y los jerarquiza (ver [convenciones](./DOC-CONVENTIONS.md) y [matriz de trazabilidad](./TRACEABILITY-MATRIX.md)).

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

| Módulo        | Ruta                              | Entregable                                                 | Documento de detalle                                               |
| :------------ | :-------------------------------- | :--------------------------------------------------------- | :----------------------------------------------------------------- |
| Acceso        | `/`, `/signin` (alias)            | Portada dual, login/registro, recuperación por código      | [AUTH](./AUTH.md), [ROUTES](./ROUTES.md)                           |
| Tablero       | `/`                               | Matriz 4×5, semáforo, clima con geolocalización, escena 3D | [COMPONENTS](./COMPONENTS.md)                                      |
| Métricas      | `/metrics`                        | Promedios globales y por fila, gráficos por planta         | [DATA-DICTIONARY](./DATA-DICTIONARY.md)                            |
| Historial     | `/history`                        | Consulta por fecha, importación, Sheets, exportación       | [DATA-FLOW](./DATA-FLOW.md), [FIELD-PROTOCOL](./FIELD-PROTOCOL.md) |
| Fincas        | `/farms`, `/farms/[id]`, `/admin` | Multi-tenancy, invitaciones, membresías                    | [DATABASE](./DATABASE.md)                                          |
| Galería       | `/gallery`, `/gallery/[id]`       | Fotos por finca compartidas entre miembros                 | [CAMERA-ML](./CAMERA-ML.md)                                        |
| Diagnóstico   | Modal en el tablero               | Clasificación de trips vía API externa                     | [CAMERA-ML](./CAMERA-ML.md)                                        |
| Configuración | `/settings`                       | Perfil, tema, unidades, frecuencia, notificaciones         | [USER_MANUAL](./USER_MANUAL.md)                                    |

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

| Atributo       | Mecanismo observable                                                                          | Documento                                                     |
| :------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| Seguridad      | JWT + rol releído de BD, middleware, CSP, rate limiting por IP, Zod, bcrypt                   | [SECURITY](./SECURITY.md), [THREAT-MODEL](./THREAT-MODEL.md)  |
| Multi-tenancy  | `finca_miembros` + cookie `finca_activa` + `getFincaAccess`                                   | [DATABASE](./DATABASE.md)                                     |
| Disponibilidad | Fallback climático offline, proxy con timeout, persistencia tolerante a fallo de `sheets_url` | [INTEGRATIONS](./INTEGRATIONS.md)                             |
| Mantenibilidad | Servicios por dominio, tipos compartidos, ADR-001…ADR-008                                     | [ARCHITECTURE](./ARCHITECTURE.md), [decisions/](./decisions/) |
| Trazabilidad   | Matriz RF/CU/US → código → endpoint → verificación                                            | [TRACEABILITY-MATRIX](./TRACEABILITY-MATRIX.md)               |
| Accesibilidad  | Componentes Astro con Tailwind; auditoría pendiente                                           | [ACCESSIBILITY](./ACCESSIBILITY.md)                           |

## 8. Estado de madurez (octubre–noviembre 2026)

| Capacidad                                | Estado                                                                        | Evidencia                                                              |
| :--------------------------------------- | :---------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| Auth, roles y fincas                     | Implementado                                                                  | `auth.config.ts`, `src/pages/api/farms/`                               |
| Persistencia de lecturas y deduplicación | Implementado                                                                  | `src/backend/services/readings.ts:123-191`                             |
| Importación Sheets con parser tolerante  | Implementado                                                                  | `src/shared/recordsParser.ts`, `src/shared/csv.ts`                     |
| Exportación Excel de 3 hojas y CSV       | Implementado                                                                  | `src/pages/api/export-excel.ts`, `export-csv.ts`                       |
| Clima Open-Meteo + AQI WAQI              | Implementado                                                                  | `src/pages/api/weather.ts`, `aqi.ts`                                   |
| SIATA local                              | Latente (bypass)                                                              | ADR-007, `src/pages/api/siata.ts`                                      |
| Diagnóstico de trips                     | Implementado; infraestructura ML a desplegar                                  | [CAMERA-ML](./CAMERA-ML.md)                                            |
| Suite automatizada de pruebas            | No existe                                                                     | No hay `*.test.*` en el repositorio                                    |
| Capturas referenciadas en el índice      | 8 capturas CAP-01…CAP-08 en `docs/capturas/` e incrustadas en el PDF (DOC-46) | el generador de capturas (no incluido) (ver [CAPTURAS](./CAPTURAS.md)) |

## 9. Riesgos y deuda documentada

1. **Secretos en código**: `src/pages/api/trips-diagnosis.ts:15-19` incluye una clave de API por defecto y `:54-55` credenciales de administrador del panel ML por defecto; deben moverse a variables de entorno obligatorias. Detalle en [THREAT-MODEL](./THREAT-MODEL.md) y [SECURITY](./SECURITY.md).
2. **Sin pruebas automáticas**: la verificación es manual (`docs/TESTING.md`). Riesgo de regresión en parser y autorización.
3. **Deriva documental histórica**: se han corregido referencias a `ADR-008` inexistente, al componente `TripsDiagnosticModal.tsx` (real: `.astro`) y a permisos de Sheets solo para dueño (real: dueño, staff y miembro).
4. **Dependencias externas sin SLA**: Open-Meteo, WAQI, Google Sheets y Cloud Run pueden fallar; hay fallbacks parciales (ver [ERROR-CATALOG](./ERROR-CATALOG.md)).
5. **Ajustes de esquema en caliente**: `ensureResponsableColumn()` y `ensureFincasSheetsColumn()` ejecutan `ALTER TABLE … IF NOT EXISTS` desde la aplicación (`readings.ts:9-21`, `sync-sheets.ts:20-31`); requieren permisos DDL o tolerancia silenciosa.

## 10. Cómo navegar esta documentación

- Usuario final: [Manual de Usuario](./USER_MANUAL.md) → [FAQ](./FAQ.md) → [Protocolo de campo](./FIELD-PROTOCOL.md).
- Desarrollo: [Arquitectura](./ARCHITECTURE.md) → [Rutas](./ROUTES.md) → [Endpoints](./ENDPOINTS.md) → [Base de Datos](./DATABASE.md).
- Operación: [Despliegue](./DEPLOYMENT.md) → [Runbook](./OPERATIONS-RUNBOOK.md) → [Troubleshooting](./TROUBLESHOOTING.md).
- Evaluación académica: [Requisitos](./REQUIREMENTS.md) → [Casos de uso](./USE_CASES.md) → [UML](./UML.md) → [Matriz de trazabilidad](./TRACEABILITY-MATRIX.md).

## 11. Trazabilidad

| Tema            | Código / configuración                               | Documento relacionado                           | Verificación                                       |
| :-------------- | :--------------------------------------------------- | :---------------------------------------------- | :------------------------------------------------- |
| Stack y versión | `package.json:16-55`, `astro.config.mjs:11-26`       | [ARCHITECTURE](./ARCHITECTURE.md)               | `pnpm astro check`                                 |
| Roles           | `src/db/auth-schema.sql`, `src/shared/roles.ts:1-11` | [AUTH](./AUTH.md)                               | `SELECT unnest(enum_range(NULL::user_role_enum));` |
| Matriz 4×5      | `src/shared/plantMatrix.ts:1-8`                      | [DATA-DICTIONARY](./DATA-DICTIONARY.md)         | `TOTAL_PLANTAS === 20`                             |
| Persistencia    | `src/backend/services/readings.ts:84-191`            | [DATABASE](./DATABASE.md)                       | `SELECT count(*) FROM lecturas;`                   |
| IA              | `src/pages/api/trips-diagnosis.ts`                   | [CAMERA-ML](./CAMERA-ML.md)                     | `curl /api/trips-diagnosis`                        |
| Documentación   | `docs/README.md`, `docs/DOC-CONVENTIONS.md`          | [TRACEABILITY-MATRIX](./TRACEABILITY-MATRIX.md) | Proceso de unificación (generador no incluido)     |
