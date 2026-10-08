# ADR-005: Importación desde Google Sheets vía CSV público (sin API de Google)

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
- Requisito operativo: la hoja debe estar en *"Cualquier persona con el enlace"* o *"Publicado como CSV"* (error 422 guiado si no).
- Sin programación por intervalo: cada toma nueva exige re-importar (el intervalo de Settings es preferencia de refresco, no ingesta).
- Parser tolerante documentado en ENDPOINTS.md; casos nuevos de formato se agregan ahí, no en código disperso.
