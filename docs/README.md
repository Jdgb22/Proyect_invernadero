# Índice de Documentación — Proyecto Invernadero (Macollo)

Documentación técnica y de usuario. La marca del producto es **Macollo** (logo `gulupa.svg` en navbar) dentro del **Proyecto Invernadero**.

| Documento | Para quién | Qué contiene |
| :--- | :--- | :--- |
| [👤 Manual de Usuario](../MANUAL_USUARIO.md) | Usuarios finales, campo | Registro/login, matriz 4×5, métricas, historial, settings, FAQ, glosario. |
| [README](../README.md) | Todos (puerta de entrada) | Qué es, features, stack, instalación, comandos, troubleshooting. |
| [ARCHITECTURE](./ARCHITECTURE.md) | Devs / evaluadores | Visión, estructura `src/`, flujos auth/datos, decisiones (SSR, JWT, proxy SIATA, DB). |
| [ROUTES](./ROUTES.md) | Devs | Rutas reales (`/`, `/signin`, `/metrics`, `/historial`, `/settings` + API) y mapa de navegación. |
| [ENDPOINTS](./ENDPOINTS.md) | Devs / integraciones | Referencia exacta de los 7 endpoints con bodies, códigos y `curl`. |
| [AUTH](./AUTH.md) | Devs / seguridad | Credentials + Google, JWT con rol, recuperación 6 dígitos/15 min, brechas y endurecimiento. |
| [DATABASE](./DATABASE.md) | Devs / DBA | Esquemas auth + agronómico, ER Mermaid, instalación, brecha dataset-en-memoria, mantenimiento. |
| [DEPLOYMENT](./DEPLOYMENT.md) | DevOps | Vercel SSR, env vars, DB nube, checklist, límites y rollback. |
| [USE_CASES](./USE_CASES.md) | Académico / analista | CU-001…CU-007 con flujos y postcondiciones. |
| [USER_STORIES](./USER_STORIES.md) | Académico / PO | US-001…US-011 por rol. |
| [SEQUENCE_DIAGRAMS](./SEQUENCE_DIAGRAMS.md) | Académico / devs | SD-001…SD-004 en Mermaid. |
| [ACTIVITIES](./ACTIVITIES.md) | Académico / devs | AD-001…AD-004 en Mermaid. |

**Convenciones:** rutas y endpoints documentados aquí son los implementados (verificados contra `src/` en oct-2026). Lo no implementado se marca explícitamente (ej. `/dashboard`, `GET /api/metrics`, persistencia de Sheets en PG). JSDoc en `src/backend/services/`, `src/middleware.ts`, `auth.config.ts` y `src/services/notifications.ts` complementa como ayuda de editor.
