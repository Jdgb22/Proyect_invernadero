# Especificación de Requisitos (SRS) — Macollo

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-04**.

> Versión 1.1 · 2026-11-23. Estado por requisito: **Implementado** · **Parcial** · **Pendiente** · **No implementado**.
> Trazabilidad: cada RF enlaza casos de uso (CU), historias (US), código y verificación en [TRACEABILITY-MATRIX](./TRACEABILITY-MATRIX.md) (DOC-42).

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
| RF-22 | Ingesta IoT en vivo (ESP32/Arduino vía WebSocket/MQTT)                                                                  | No implementado | —               | —                                                             | [ROADMAP](./ROADMAP.md)                            |
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
| RNF-11 | Trazabilidad   | RF/CU/US → código → prueba → documento                                | Implementado            | [TRACEABILITY-MATRIX](./TRACEABILITY-MATRIX.md)         |

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

| Tema             | Código / configuración       | Documento relacionado                                                    | Verificación   |
| :--------------- | :--------------------------- | :----------------------------------------------------------------------- | :------------- |
| RF/RNF           | `src/pages/`, `src/backend/` | [TRACEABILITY-MATRIX](./TRACEABILITY-MATRIX.md), [TESTING](./TESTING.md) | Matriz §2 y §3 |
| Deriva histórica | `git log`, `src/`            | [DOC-CONVENTIONS](./DOC-CONVENTIONS.md)                                  | Tabla §5       |
