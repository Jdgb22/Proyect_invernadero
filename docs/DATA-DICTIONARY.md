# Diccionario de Datos — Proyecto Invernadero (Macollo)

> Fuente: `src/backend/services/metricsData.ts` (tipos), `src/pages/api/sync-sheets.ts` (columnas CSV), `src/pages/api/export-excel.ts` (hojas), `src/db/*.sql` (tablas). Para llenar hojas ver [FIELD-PROTOCOL](./FIELD-PROTOCOL.md).

## 1. `MetricRecord` (registro canónico en memoria)

| Campo                                            | Tipo                                   | Ejemplo                             | Origen / notas                                                                            |
| :----------------------------------------------- | :------------------------------------- | :---------------------------------- | :---------------------------------------------------------------------------------------- |
| `id`                                             | string                                 | `MET-GS-T0-P1-2026-09-30-3`         | Generado en sync (`MET-GS-<code>-<fecha>-<fila>`) o `MET-<code>-PENDING` sin datos        |
| `invernadero`                                    | string                                 | `Invernadero Macollo`               | Constante (único invernadero v1.0)                                                        |
| `fila`                                           | `t0–t3`                                | `t1`                                | `resolvePlantCoordinates` (acepta `T0/TO/Tratamiento 0/0`)                                |
| `columna`                                        | `Col 1–5`                              | `Col 2`                             | Acepta `P1..P5`, `Planta/Col 1..5`, dígitos                                               |
| `plantId`                                        | string                                 | `P-07`                              | Global 1–20 (`fila*5+col+1`); acepta `P-07`, `7`                                          |
| `code`                                           | string                                 | `T1-P2`                             | `T{fila}-P{col}`; acepta `T1P4`, `T2_P3`, `T3.P5`                                         |
| `fecha`                                          | `YYYY-MM-DD`                           | `2026-09-30`                        | Acepta `YYYY-MM-DD`, `DD/MM/YYYY`, serial Excel                                           |
| `hora` / `timestampTexto`                        | string                                 | `09:00 AM` / `2026-09-30, 09:00 AM` | Extraída del campo fecha si trae hora; def. `09:00 AM`                                    |
| `phSuelo`                                        | number 0–14                            | `6.40`                              | Clamp 0–14; def. `6.4`. Semáforo: 6.0–6.8 óptimo                                          |
| `tempInterna`                                    | number\|null                           | `24.5`                              | = `T_Int_C`; def. `24.5`                                                                  |
| `tempInvernadero`                                | number                                 | `24.5`                              | Alias interno de `T_Int_C`                                                                |
| `tempExterna`                                    | number                                 | `20.2`                              | `T_Ext_C`; def. `20.2`                                                                    |
| `tempSuelo`                                      | number\|null                           | `20.1`                              | `T_Planta_C`; **null el 2026-09-29/30** (no tomada)                                       |
| `humedad`                                        | number 0–100                           | `65`                                | Clamp 0–100; def. `65`                                                                    |
| `alturaCm`                                       | number\|null                           | `42.0`                              | `ALtura_cm`; null si `N/D`                                                                |
| `crecimiento`                                    | number 0–100                           | `75`                                | De altura (≤100 directo) o def. `75`                                                      |
| `faseCrecimiento`                                | string                                 | `Floración`                         | De hoja o derivada (≤40 Veg / ≤80 Flor / >80 Llenado)                                     |
| `productividad`                                  | Alta/Media/Baja                        | `Alta`                              | De hoja (`baja/low/1`…) o def. `Alta`                                                     |
| `sanidad`                                        | Excelente/Saludable/Vulnerable/Crítica | `Saludable`                         | De hoja o **derivada de pH** (<5.2/>7.8 Crítica; <5.8/>7.2 Vulnerable; 6.2–6.7 Excelente) |
| `responsable` / `responsableRol` / `avatarColor` | string                                 | `Equipo de Campo`                   | De hoja o defaults; color por hash del nombre                                             |
| `observaciones`                                  | string                                 | `…`                                 | De hoja o auto (`Medición real de Google Sheets (fecha)…` + nota 29/30-sep)               |

Valores texto nulo reconocidos como `null`: `nd, n/d, na, n/a, -, --, null, no tomada, no medido, pendiente, ""` (coma decimal `,` aceptada).

## 2. Columnas CSV/Sheets reconocidas (búsqueda flexible, sin tildes, minúsculas)

| Concepto                      | Cabeceras aceptadas (clave)                                                                                                                                 |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID planta                     | `id_planta`, `id planta`, `id`, `plant_id`, `codigo_planta`, o `id`+`plant`; si falta, escanea la fila por patrón `T[0-3O]-P[1-5]`                          |
| Fecha                         | `fecha`, `date`, `dia`, `registro`                                                                                                                          |
| Responsable                   | `responsable`, `operario`, `tecnico`, `encargado`, `evaluador`, `nombre`                                                                                    |
| T externa                     | `t_ext_c`, `t_ext`, `temp_ext`, `externa`, `tout`, `exterior`                                                                                               |
| T interna                     | `t_int_c`, `t_int`, `temp_int`, `invernadero`                                                                                                               |
| Humedad                       | `humedad_pct`, `humedad`, `humidity`                                                                                                                        |
| T suelo/planta                | `t_planta_c`, `t_planta`, `temp_planta`, `piso`, `t_suelo`, `suelo`, `tsoil`                                                                                |
| pH                            | `ph`, `ph_*`                                                                                                                                                |
| Altura/crec.                  | `altura_cm`, `altura`, `crecimiento`, `growth`                                                                                                              |
| Fase / Prod. / Sanidad / Obs. | `fase/etapa/fenologia` · `productividad/prod/rendimiento/frutos` · `sanidad/salud/fitosanitario/estado/vigor` · `observacion/notas/comentario/obs/detalles` |

⚠️ **Trampa conocida:** columnas auxiliares `fila`/`planta` **no** se usan como ID (el parser las ignora a propósito y resuelve por `ID_planta`).

## 3. Reporte Excel (`Macollo_Mediciones_Invernadero_YYYY-MM-DD.xlsx`)

- **Hoja 1 Mediciones de Hoy** (16 col: Fila→Observaciones; `N/D` si temp interna null; colores por sanidad; fila `PROMEDIO GENERAL` con fórmulas `AVERAGE`; autofiltro).
- **Hoja 2 Historial Completo** (14 col, orden fecha desc, autofiltro).
- **Hoja 3 Rangos Agronómicos** (pH 6.0–6.8 · T_int 22–26 °C · T_ext 18–24 °C · T_suelo 19–22 °C · crecimiento 75–100 % + acciones).

## 4. Correspondencia con PostgreSQL (objetivo, ver DATABASE.md §5)

`plantas(id↔P-NN, nombre↔code, ubicacion↔fila/col)` · `mediciones(planta_id, tipo↔campo, valor, subtipo↔matiz, fecha_medida↔fecha+hora, usuario_id↔responsable)` · `responsable(nombre, cargo)` · `tipo_medicion_enum`: `ph→phSuelo`, `temperatura_atmosferica→tempInterna/tempExterna` (vía `subtipo`), `temperatura_suelo→tempSuelo`, `humedad`, `crecimiento`, `productividad`.
