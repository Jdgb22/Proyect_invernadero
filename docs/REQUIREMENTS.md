# Especificación de Requisitos (SRS) — Proyecto Invernadero (Macollo)

> Versión 1.0 · octubre 2026. Estado por requisito: ✅ implementado · 🔜 futuro/propuesto.
> Trazabilidad: cada RF enlaza casos de uso (CU), historias (US) y endpoints.

## 1. Alcance

Panel web de monitoreo agronómico de un invernadero de 20 plantas (matriz 4×5): autenticación por roles, dashboard con matriz + 3D + clima, métricas, historial con importación/exportación y configuración. **Fuera de alcance v1.0:** umbrales/alertas automáticas, ingesta IoT en vivo, app móvil nativa, escritura hacia Google Sheets, multi-invernadero.

## 2. Requisitos funcionales

| ID    | Requisito                                                                                                                               | Estado | CU     | US     | Endpoint/Vista                                      |
| :---- | :-------------------------------------------------------------------------------------------------------------------------------------- | :----: | :----- | :----- | :-------------------------------------------------- |
| RF-01 | Registro con nombre + email/teléfono + contraseña; rol inicial fijo `Campesino`                                                         |   ✅   | CU-001 | —      | `POST /api/auth/register`, `/signin`                |
| RF-02 | Login con email/nombre/teléfono + contraseña (bcrypt)                                                                                   |   ✅   | CU-001 | US-001 | Auth.js credentials, `/signin`                      |
| RF-03 | Login con Google OAuth (vinculación por email)                                                                                          |   ✅   | CU-001 | US-001 | Auth.js google                                      |
| RF-04 | Cierre de sesión (desktop y móvil)                                                                                                      |   ✅   | —      | US-002 | `signOut()`, navbar                                 |
| RF-05 | Recuperación con código de 6 dígitos/15 min por email o SMS                                                                             |   ✅   | CU-007 | US-009 | `forgot/reset-password`                             |
| RF-06 | Dashboard: matriz 4 filas × 5 columnas con semáforo (Óptimo/Atención/Crítico/Sin datos) y cards humedad + temp. aire                    |   ✅   | CU-002 | US-003 | `/`, `Dashboard.astro`                              |
| RF-07 | Modal de detalle por planta (pH, temp. suelo/aire, crecimiento, productividad, sanidad)                                                 |   ✅   | CU-003 | US-003 | `Dashboard`, `Metrics`                              |
| RF-08 | Simulación 3D con ciclo sol/luna, sombras, rotación y zoom                                                                              |   ✅   | CU-003 | US-005 | `Dashboard` (Three.js)                              |
| RF-09 | Widget clima (temp, humedad, lluvia, viento) + AQI, geolocalización con fallback Medellín/OPEN-Meteo, refresco 10 min, fallback offline |   ✅   | CU-002 | US-010 | `fetchWeatherData`, `/api/siata` (pausado, ADR-007) |
| RF-10 | Métricas: promedios globales y por fila, badges pH/sanidad/productividad, tabla + gráficos por planta                                   |   ✅   | CU-002 | US-004 | `/metrics`                                          |
| RF-11 | Historial cronológico filtrable por fecha (14→30-sep-2026 según datos)                                                                  |   ✅   | CU-002 | US-008 | `/historial`                                        |
| RF-12 | Importación manual Excel/CSV en Historial                                                                                               |   ✅   | —      | —      | `/historial` (cliente)                              |
| RF-13 | Importación desde Google Sheets pública (CSV → `records` en memoria)                                                                    |   ✅   | CU-006 | US-011 | `POST /api/sync-sheets`                             |
| RF-14 | Exportación `.xlsx` de 3 hojas con promedios                                                                                            |   ✅   | CU-005 | US-007 | `GET\|POST /api/export-excel`                       |
| RF-15 | Perfil: nombre editable, correo solo lectura, insignia de rol                                                                           |   ✅   | —      | —      | `/settings`                                         |
| RF-16 | Tema Claro/Oscuro/Automático                                                                                                            |   ✅   | —      | —      | `/settings`                                         |
| RF-17 | Frecuencia de sincronización IoT configurable                                                                                           |   ✅   | —      | —      | `/settings` (preferencia)                           |
| RF-18 | Notificaciones toast de eventos (login, import, export, errores)                                                                        |   ✅   | —      | —      | `sileo`                                             |
| RF-19 | Roles `Campesino/Agronomo/Admin/Super admin` con JWT; promoción vía BD + re-login                                                       |   ✅   | CU-001 | —      | `auth.config.ts`, `users.role`                      |
| RF-20 | Umbrales de alerta configurables + avisos automáticos                                                                                   |   🔜   | CU-004 | —      | — (diseñar)                                         |
| RF-21 | Persistencia Sheets→PG y `GET /api/metrics` desde BD                                                                                    |   🔜   | —      | —      | `mediciones`, `plantas`                             |
| RF-22 | Ingesta IoT en vivo (ESP32/Arduino vía WebSocket/MQTT)                                                                                  |   🔜   | —      | —      | — (diseñar)                                         |

## 3. Requisitos no funcionales

| ID     | Categoría        | Requisito                                                                               | Verificación                   |
| :----- | :--------------- | :-------------------------------------------------------------------------------------- | :----------------------------- |
| RNF-01 | Rendimiento      | Primera carga SSR < 3 s en 4G; 3D a 30+ fps en equipo medio                             | Lighthouse + prueba manual     |
| RNF-02 | Rendimiento      | Proxy SIATA responde o falla en ≤ 3 s (nunca cuelga la función)                         | `curl -w %{time_total}`        |
| RNF-03 | Seguridad        | Contraseñas solo bcrypt; ningún secreto en cliente ni repo                              | grep + revisión `.env`         |
| RNF-04 | Seguridad        | Rutas `/metrics`, `/historial`, `/settings` y APIs sensibles exigen sesión              | Matriz de pruebas §TESTING     |
| RNF-05 | Disponibilidad   | Caída de SIATA/Sheets degrada (fallback/datos en memoria), no tumba el panel            | Apagar dependencias en staging |
| RNF-06 | Usabilidad       | Operario registra→importa→exporta sin manual tras 10 min de inducción; responsive móvil | Prueba con 2 usuarios de campo |
| RNF-07 | Portabilidad     | Funciona en Chrome/Edge/Firefox/Safari últimos + Android/iOS                            | Matriz navegadores             |
| RNF-08 | Mantenibilidad   | Toda decisión arquitectónica con ADR; docs verificados contra `src/` cada release       | Checklist release              |
| RNF-09 | Legal/privacidad | Respuestas de recuperación enmascaran el destino; correos solo al titular               | Revisión `maskIdentifier`      |
| RNF-10 | Datos            | Reglas agronómicas (pH 6.0–6.8, temp. suelo null 29–30-sep) documentadas y testeadas    | Casos TESTING-07/08            |

## 4. Restricciones

- Stack fijo: Astro SSR + Vercel + PG nube (ADR-001/002). Sin disco local.
- Límite serverless ~10 s por request (condiciona timeouts y tamaño de CSV).
- Hoja Sheets debe ser pública/lectura (sin credenciales Google en servidor, ADR-005).
- Token AQI demo en cliente (rotar antes de producción masiva).

## 5. Criterios de aceptación v1.0

1. Registro→login→dashboard en < 2 min con usuario nuevo (rol `Campesino`).
2. Importar el CSV maestro deja 20/20 plantas con datos y semáforo coherente con pH.
3. Exportar genera el `.xlsx` de 3 hojas con promedios calculados.
4. Sin sesión, `/metrics`, `/historial`, `/settings` no muestran datos (Welcome o redirect).
5. Con SIATA caído, el widget muestra Open-Meteo sin error visible.
