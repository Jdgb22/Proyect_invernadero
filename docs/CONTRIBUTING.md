# Contribuir — Proyecto Invernadero (Macollo)

Guía para el equipo (6 devs). Stack y setup en [README](../README.md); decisiones en [`decisions/`](./decisions/).

## 1. Flujo de trabajo

1. Rama desde `main`: `feat/<tema>`, `fix/<tema>` o `docs/<tema>`.
2. Cambios pequeños y compilables; `pnpm build` verde antes del PR.
3. PR con: qué cambia, cómo probarlo (casos [TESTING](./TESTING.md)), capturas si hay UI.
4. Merge a `main` ⇒ Vercel redespliega (preview en el PR).

## 2. Convenciones

- **Código:** TypeScript estricto; JSDoc con *porqué* en servicios y endpoints (no reescribir el *qué*). Español en UI y mensajes; inglés en identificadores.
- **Datos:** IDs de planta `T{f}-P{c}` / `P-01–P-20`; fechas `YYYY-MM-DD`; reglas de dominio (pH clamp, temp. suelo null 29–30-sep) viven junto al parser, no duplicadas.
- **Commits:** `tipo(alcance): mensaje` — `feat`, `fix`, `docs`, `refactor`, `test`, `chore`. Ej. `docs(endpoints): corregir POST sync-sheets`.
- **Secretos:** jamás en código ni PRs (`.env`, tokens, App Passwords). Revisar `git diff` antes de pushear.

## 3. Definición de hecho (DoD)

- [ ] Compila (`pnpm build`) y flujos tocados probados (TEST-IDs en el PR).
- [ ] Sin regresión en rutas/roles (TEST-13 si toca auth o páginas).
- [ ] Docs actualizados: el/los `.md` afectados + índice si es doc nuevo.
- [ ] **Nueva decisión arquitectónica ⇒ nuevo ADR** en `docs/decisions/` (formato: Status/Date/Context/Decision/Alternatives/Consequences; nunca borrar uno viejo, se *supersede*).

## 4. Agregar documentación

| Tipo | Dónde | Regla |
| :--- | :--- | :--- |
| Decisión | `docs/decisions/ADR-00X-*.md` | Secuencial, con alternativas rechazadas y consecuencias |
| Endpoint/ruta nueva | `ENDPOINTS.md` + `ROUTES.md` | Con ejemplo `curl` y códigos reales del handler |
| Tabla/columna nueva | `DATABASE.md` | ER + script SQL + plan de migración |
| Requisito | `REQUIREMENTS.md` | ID RF/RNF + traza CU/US + criterio de aceptación |
| Flujo usuario | `MANUAL_USUARIO.md` | Pasos clicables, no descripción técnica |

## 5. Revisión de PR (checklist)

- [ ] ¿Cambia comportamiento visible? → MANUAL y/o README al día.
- [ ] ¿Toca authPagos/sesión/DB? → AUTH/DATABASE/DEPLOYMENT al día.
- [ ] ¿Agrega dependencia? → justificada en el PR (candidata a ADR si es mayor).
- [ ] ¿Deja `TODO`/código comentado? → no se acepta (hacerlo o crear issue).
