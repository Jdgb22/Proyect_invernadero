# Contribuir — Macollo

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

| Tema                   | Archivo de configuración / código                                                                                    | Doc relacionado                                                | Verificación                                                                 |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| Setup y scripts        | `package.json:5-15`; `pnpm-lock.yaml`; `.vscode/extensions.json:2`; `.vscode/launch.json:5-8`                        | `docs/README.md`, `docs/SCRIPTS.md`                            | `pnpm install`, `pnpm dev`, `pnpm run dev:lan`                               |
| Husky y Prettier       | `.husky/pre-commit:1-11`; `package.json:14,54,57-59`; `.gitignore:16-18`                                             | `docs/SECURITY.md`, `docs/DEPLOYMENT.md`                       | Hacer commit con `.env` en staging → bloqueo; con `.env.example` → permitido |
| Convenciones de código | `tsconfig.json:2-13`; `astro.config.mjs:8,20`; `git log -15`                                                         | `docs/COMPONENTS.md`, `docs/DATA-DICTIONARY.md`                | `pnpm build`; revisión de `git log`                                          |
| DoD y pruebas          | `docs/TESTING.md` §§2–6; `src/middleware.ts:9-27`                                                                    | `docs/TESTING.md`, `docs/DEPLOYMENT.md`                        | IDs de test en el PR; TEST-13/21/18/19                                       |
| Documentación y ADRs   | `docs/decisions/ADR-001-astro-ssr-vercel.md` … `ADR-007-bypass-siata.md`; `docs/README.md:1-37`; `docs/CHANGELOG.md` | `docs/README.md`, `docs/ROADMAP.md`                            | `ls docs/decisions` → 007 como último; índice actualizado                    |
| Convención documental  | `docs/README.md`, el generador de documentación (no incluido)                                                        | [PDF unificado](./UNIFIED/Macollo-Documentacion-Unificada.pdf) | `pdfinfo` y regeneración reproducible                                        |
