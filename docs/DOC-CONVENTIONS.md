# Convenciones Documentales y Construcción del Documento Unificado

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-43**.

## 1. Propósito

Fijar las reglas que hacen que la documentación de Macollo sea **una sola sistema conectada**, no una carpeta de archivos sueltos. Define identificadores, jerarquía, plantillas, proceso de verificación y el procedimiento reproducible para generar el PDF unificado.

## 2. Identificadores

Cada documento significativo tiene un ID estable `DOC-NN`, asignado en el índice ([README](./README.md)) y repetido en la primera línea de cada archivo. Los ADR usan su propia numeración (`ADR-001`…`ADR-008`). Los requisitos, casos de uso e historias usan `RF/RNF`, `CU`, `US`. Los diagramas usan `SD`, `AD`. Los casos de prueba usan `TEST-NN`. Los escenarios de calidad usan `QP/QS/QA/QM/QU/QV`. Los riesgos de seguridad usan `R-NN`.

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

Regla de oro: **el código manda, la documentación lo sigue**. Cuando un documento y el código discrepas, se corrige el documento y se registra la corrección en [CHANGELOG](./CHANGELOG.md).

## 5. Correcciones de deriva registradas (2026-11-23)

| #   | Afirmación anterior                                    | Realidad verificada                                                                                           | Documentos corregidos                                                                     |
| :-- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------- |
| 1   | `ADR-008` para la integración ML                       | En su momento solo existían ADR-001…007; hoy ADR-008 documenta la landing, no ML                              | [CAMERA-ML](./CAMERA-ML.md), [ADR-008](./decisions/ADR-008-landing-subdominio.md)         |
| 2   | `TripsDiagnosticModal.tsx`                             | Archivo real `TripsDiagnosticModal.astro`                                                                     | [COMPONENTS](./COMPONENTS.md)                                                             |
| 3   | Reintentos artificiales `503` en el proxy ML           | Eliminados en commit `4e977f5`; reintento único ante `401`                                                    | [CAMERA-ML](./CAMERA-ML.md), [ENDPOINTS](./ENDPOINTS.md)                                  |
| 4   | Solo el dueño puede sincronizar Sheets                 | `canConnectSheets` permite dueño, staff y miembro (`authz.ts:127-129`)                                        | [ROUTES](./ROUTES.md), [ENDPOINTS](./ENDPOINTS.md), [AUTH](./AUTH.md)                     |
| 5   | `SyncRequestSchema.url` valida que sea URL             | Es `z.string().trim().optional()`: riesgo SSRF R-03                                                           | [ENDPOINTS](./ENDPOINTS.md), [THREAT-MODEL](./THREAT-MODEL.md)                            |
| 6   | `lecturas` solo con `responsable_id`                   | Existen `responsable` (TEXT) y `responsable_id` (FK), migración 002                                           | [DATABASE](./DATABASE.md), [DATA-DICTIONARY](./DATA-DICTIONARY.md)                        |
| 7   | `fincas` sin `sheets_url`                              | Columna añadida por migración 003 y usada por `/api/sync-sheets`                                              | [DATABASE](./DATABASE.md), [ENDPOINTS](./ENDPOINTS.md)                                    |
| 8   | Existen 44 capturas en `docs/capturas/`                | El directorio no existía; ahora contiene 8 JPEG reales (CAP-01…CAP-08) generados con Playwright, sin `/admin` | [CAPTURAS](./CAPTURAS.md), [README](./README.md)                                          |
| 9   | RF-21/RF-23 como futuros                               | Persistencia y multi-finca implementadas                                                                      | [REQUIREMENTS](./REQUIREMENTS.md), [TRACEABILITY-MATRIX](./TRACEABILITY-MATRIX.md)        |
| 10  | Token AQI "demo en cliente"                            | Token en servidor con fallback a valor por defecto                                                            | [REQUIREMENTS](./REQUIREMENTS.md), [INTEGRATIONS](./INTEGRATIONS.md)                      |
| 11  | Límite serverless ~10 s                                | `maxDuration: 60` y presupuesto ML de 50 s                                                                    | [REQUIREMENTS](./REQUIREMENTS.md), [PERFORMANCE](./PERFORMANCE.md)                        |
| 12  | Scripts solo `seed-admin`/`seed-demo`/`run-lan`        | Existen además `seed-production.mjs` y `migrate-neon.mjs`                                                     | [SCRIPTS](./SCRIPTS.md)                                                                   |
| 13  | RF-25/RF-26/RF-27 ausentes en la SRS                   | Galería, diagnóstico ML y resumen semanal están implementados                                                 | [REQUIREMENTS](./REQUIREMENTS.md), [TRACEABILITY-MATRIX](./TRACEABILITY-MATRIX.md)        |
| 14  | Recuperación con destino enmascarado en la respuesta   | `message` enmascara, pero `identifier` se devuelve sin enmascarar (R-08)                                      | [AUTH](./AUTH.md), [ENDPOINTS](./ENDPOINTS.md), [USE_CASES](./USE_CASES.md)               |
| 15  | Roles `Agronomo`/`Super admin`                         | La migración 001 los normaliza a `Agropecuario`/`Superadmin`                                                  | [AUTH](./AUTH.md), [ADR-003](./decisions/ADR-003-authjs-jwt.md)                           |
| 16  | Guardián de `/dashboard`                               | La portada es `/`; el middleware protege rutas reales, incluida `/gallery`                                    | [ROUTES](./ROUTES.md), [ADR-003](./decisions/ADR-003-authjs-jwt.md)                       |
| 17  | La ruta unificada «no existe»                          | `docs/UNIFIED/` contiene Markdown, DOCX, PDF y `manifest.json` generados                                      | [README](./README.md), [CONTRIBUTING](./CONTRIBUTING.md)                                  |
| 18  | El PDF unificado no tiene evidencia visual             | DOC-46 incrusta CAP-01…CAP-08 con imágenes reales de Playwright                                               | [CAPTURAS](./CAPTURAS.md), [PDF unificado](./UNIFIED/Macollo-Documentacion-Unificada.pdf) |
| 19  | La landing exigía un subdominio con dominio de ejemplo | Se sirve en `/landing` en cualquier host; el subdominio se difiere hasta definir el dominio real              | [LANDING](./LANDING.md), [ADR-008](./decisions/ADR-008-landing-subdominio.md)             |

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

1. Actualizar [README](./README.md) (tabla con DOC-NN, audiencia y contenido).
2. Actualizar la parte y la posición del documento en `docs/UNIFIED/manifest.json`.
3. Actualizar [TRACEABILITY-MATRIX](./TRACEABILITY-MATRIX.md) si cambia una responsabilidad.
4. Registrar el cambio en [CHANGELOG](./CHANGELOG.md).
5. Regenerar el PDF.

## 10. Trazabilidad

| Convención       | Aplicación                                      | Documento relacionado                         | Verificación            |
| :--------------- | :---------------------------------------------- | :-------------------------------------------- | :---------------------- |
| IDs              | `DOC-NN` en cada archivo                        | [README](./README.md)                         | `grep DOC-`             |
| Plantilla        | Encabezado + `## Trazabilidad`                  | Este documento                                | Revisión de PR          |
| Deriva           | Tabla §5                                        | [CHANGELOG](./CHANGELOG.md)                   | `git log`               |
| Generación       | el generador de documentación (no incluido)     | [SCRIPTS](./SCRIPTS.md)                       | `pdfinfo`               |
| Evidencia visual | Capturas con Playwright (generador no incluido) | [CAPTURAS](./CAPTURAS.md)                     | CAP-01…CAP-08 en el PDF |
| Calidad          | Escenarios QV                                   | [QUALITY-ATTRIBUTES](./QUALITY-ATTRIBUTES.md) | Checklist release       |
