# Guía de Incorporación para el Equipo de Desarrollo

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-41**.

## 1. Propósito

Llegar a un primer cambio seguro en Macollo en cinco pasos. No sustituye la [instalación](./../README.md) ni las [convenciones de contribución](./CONTRIBUTING.md): las secuencia para una persona nueva.

## 2. Día 1 — Entender el producto

1. Leer el [Resumen Ejecutivo](./EXECUTIVE-SUMMARY.md) y el [Manual de Usuario](./USER_MANUAL.md).
2. Leer el [Contexto del Sistema](./SYSTEM-CONTEXT.md) y el [Modelo de Dominio](./DOMAIN-MODEL.md).
3. Repasar el [Glosario](./GLOSSARY.md) (términos agronómicos y técnicos).
4. Ver los [casos de uso](./USE_CASES.md) y [requisitos](./REQUIREMENTS.md) para entender la intención original.

**Ejercicio:** explicar en cinco frases qué ocurre entre que el dueño pega una URL de Google Sheets y que aparece un badge verde en la matriz. Respuesta: [Flujo de Datos §3](./DATA-FLOW.md).

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

Abrir `http://localhost:4321`. Verificar la [secuencia de instalación completa](../README.md#-instalación-y-ejecución-local) si algo falla. Para pruebas desde el celular: `pnpm run dev:lan` ([SCRIPTS](./SCRIPTS.md)).

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

Complementar con [ARCHITECTURE](./ARCHITECTURE.md), [ROUTES](./ROUTES.md), [ENDPOINTS](./ENDPOINTS.md), [COMPONENTS](./COMPONENTS.md) y [DATABASE](./DATABASE.md).

## 5. Día 4 — Verificar y entender la deuda

1. Ejecutar `pnpm astro check`.
2. Seguir el [plan de pruebas manual](./TESTING.md): registro, login, importación, exportación, invitación, diagnóstico.
3. Reproducir tres incidentes del [Runbook](./OPERATIONS-RUNBOOK.md) en local.
4. Leer [THREAT-MODEL](./THREAT-MODEL.md), especialmente R-01 a R-04.
5. Leer [ERROR-CATALOG](./ERROR-CATALOG.md) y [TROUBLESHOOTING](./TROUBLESHOOTING.md).

## 6. Día 5 — Primer cambio

1. Crear rama desde `main`: `git switch -c feat/<tema>`.
2. Hacer el cambio respetando [CONTRIBUTING](./CONTRIBUTING.md).
3. Si cambia una ruta, un endpoint o una columna, actualizar obligatoriamente [ROUTES](./ROUTES.md), [ENDPOINTS](./ENDPOINTS.md) y/o [DATABASE](./DATABASE.md) en el **mismo PR**.
4. Si la decisión es arquitectónica, añadir un ADR según [CONTRIBUTING](./CONTRIBUTING.md) y la numeración de [decisions](./decisions/).
5. Ejecutar `pnpm astro check` y el checklist de [TESTING](./TESTING.md).
6. El hook de Husky ejecuta Prettier y bloquea secretos (`.husky/pre-commit`).

## 7. Mapa de "¿quién sabe de qué?"

| Tema                | Documento rector                                                                         | Código                                      |
| :------------------ | :--------------------------------------------------------------------------------------- | :------------------------------------------ |
| Producto y usuarios | [USER_MANUAL](./USER_MANUAL.md), [REQUIREMENTS](./REQUIREMENTS.md)                       | —                                           |
| Arquitectura        | [ARCHITECTURE](./ARCHITECTURE.md), [QUALITY-ATTRIBUTES](./QUALITY-ATTRIBUTES.md)         | `astro.config.mjs`                          |
| Auth y permisos     | [AUTH](./AUTH.md), [SECURITY](./SECURITY.md)                                             | `auth.config.ts`, `authz.ts`                |
| Datos y esquema     | [DATABASE](./DATABASE.md), [DATA-DICTIONARY](./DATA-DICTIONARY.md)                       | `src/db/`, `readings.ts`                    |
| Importación         | [FIELD-PROTOCOL](./FIELD-PROTOCOL.md), [DATA-FLOW](./DATA-FLOW.md)                       | `recordsParser.ts`, `csv.ts`                |
| API                 | [ENDPOINTS](./ENDPOINTS.md), [ERROR-CATALOG](./ERROR-CATALOG.md)                         | `src/pages/api/`                            |
| UI                  | [COMPONENTS](./COMPONENTS.md), [ACCESSIBILITY](./ACCESSIBILITY.md)                       | `src/frontend/`                             |
| ML                  | [CAMERA-ML](./CAMERA-ML.md), [INTEGRATIONS](./INTEGRATIONS.md)                           | `trips-diagnosis.ts`                        |
| Operación           | [DEPLOYMENT](./DEPLOYMENT.md), [OPERATIONS-RUNBOOK](./OPERATIONS-RUNBOOK.md)             | `scripts/`, `.env.example`                  |
| Documentación       | [DOC-CONVENTIONS](./DOC-CONVENTIONS.md), [TRACEABILITY-MATRIX](./TRACEABILITY-MATRIX.md) | el generador de documentación (no incluido) |

## 8. Check-list del primer día

- [ ] Entiendo la matriz 4×5 y el significado de `T0-P1` … `T3-P5`.
- [ ] Sé qué hace la cookie `finca_activa`.
- [ ] Puedo explicar la diferencia entre `dueno`, `miembro` y `staff`.
- [ ] Tengo `.env` local sin secretos versionados.
- [ ] He iniciado sesión y he importado el fixture de demo.
- [ ] Sé dónde está documentado cada endpoint.
- [ ] Conozco los riesgos R-01 a R-04 del modelo de amenazas.

## 9. Trazabilidad

| Paso     | Código / config                      | Documento relacionado                   | Verificación           |
| :------- | :----------------------------------- | :-------------------------------------- | :--------------------- |
| Entorno  | `package.json`, `.env.example`       | [README](../README.md)                  | `pnpm astro check`     |
| BD local | `src/db/*.sql`, `scripts/seed-*.mjs` | [DATABASE](./DATABASE.md)               | `psql -c '\dt'`        |
| Rutas    | `src/pages/`                         | [ROUTES](./ROUTES.md)                   | Recorrer navegación    |
| Permisos | `authz.ts`                           | [AUTH](./AUTH.md)                       | Probar con 4 roles     |
| Calidad  | `.husky/pre-commit`                  | [CONTRIBUTING](./CONTRIBUTING.md)       | `git commit` de prueba |
| Docs     | `docs/README.md`                     | [DOC-CONVENTIONS](./DOC-CONVENTIONS.md) | Generar PDF unificado  |
