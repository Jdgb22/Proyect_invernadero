# Diccionario de datos — Macollo

> Verificado contra el código el 2026-11-23. Documento rector: docs/README.md. Parte de la documentación unificada (docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md). Identificador: **DOC-15**.

## 1. Alcance y convenciones

Este documento define los tipos que cruzan la capa de datos (`MetricRecord`, `PlantMatrixItem`), las cabeceras y formatos que acepta la importación, las columnas que producen las exportaciones y su correspondencia con PostgreSQL. Los esquemas SQL, índices y consultas de auditoría se describen en [DATABASE](./DATABASE.md).

| Fuente                                                                     | Qué autoriza                                                                                             |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `src/shared/plantMatrix.ts`                                                | Tipos, constantes, resolución de coordenadas y construcción de la matriz.                                |
| `src/shared/recordsParser.ts`                                              | Parser nuevo de registros: `indexHeaders`, `findHeaderRowIndex`, `buildRecordsFromRows` y `HeaderIndex`. |
| `src/shared/csv.ts`                                                        | Delimitadores, números, tokens nulos, fechas/seriales y derivaciones de sanidad/productividad.           |
| `src/shared/serialize.ts`, `src/shared/utils.ts`                           | Reexportaciones, escape y paleta de `avatarColorFor`.                                                    |
| `src/backend/services/sheetsSync.ts`                                       | Descarga y reexportación del parser.                                                                     |
| `src/backend/services/readings.ts`                                         | Traducción entre filas SQL y `MetricRecord`; upsert.                                                     |
| `src/backend/services/csvExport.ts`, `src/backend/services/excelExport.ts` | Columnas y formatos de salida.                                                                           |
| `docs/sample-readings-demo.csv`                                            | Fixture real de 20 filas.                                                                                |

Convenciones: «Sí» en la columna _Opcional_ significa que el campo puede no estar presente (`?` en TypeScript); «null» significa que la propiedad existe y admite `null`. Los tipos listados son los **declarados** en el código, no inferencias.

---

## 2. Modelo canónico en memoria

### 2.1 Constantes y tipos (`src/shared/plantMatrix.ts:1-11`)

| Símbolo             | Valor                                                     | Uso                                                                  |
| :------------------ | :-------------------------------------------------------- | :------------------------------------------------------------------- |
| `FILAS`             | `['t0','t1','t2','t3']`                                   | Filas de la matriz; coincide con el `CHECK` de `plantas.fila`.       |
| `COLUMNAS`          | `['Col 1','Col 2','Col 3','Col 4','Col 5']`               | Columnas de la matriz; coincide con el `CHECK` de `plantas.columna`. |
| `FILAS_POR_COLUMNA` | `5`                                                       | Divisor para calcular el número global de planta.                    |
| `TOTAL_PLANTAS`     | `20`                                                      | `(4 × 5)`.                                                           |
| `Fila`, `Columna`   | Uniones de los literales anteriores                       | Tipos de `MetricRecord` y `PlantMatrixItem`.                         |
| `Productividad`     | `'Alta' \| 'Media' \| 'Baja'`                             | No hay `CHECK` SQL sobre `lecturas.productividad`.                   |
| `Sanidad`           | `'Excelente' \| 'Saludable' \| 'Vulnerable' \| 'Crítica'` | No hay `CHECK` SQL sobre `lecturas.sanidad`.                         |

### 2.2 `MetricRecord` (`src/shared/plantMatrix.ts:13-38`)

| Campo             | Tipo TypeScript         | Opcional | Ejemplo                      | Origen / regla verificable                                                                                                                                   | Columna SQL equivalente                                        |
| :---------------- | :---------------------- | :------- | :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| `id`              | `string`                | No       | `LEC-128`                    | Desde BD: `` `LEC-${row.id}` `` (`readings.ts:56`). Desde hoja: `MET-GS-<code>-<fecha>-<r>` (`recordsParser.ts:377`).                                        | `lecturas.id` (con prefijo)                                    |
| `invernadero`     | `string`                | No       | `Finca demo`                 | Desde BD: `fincas.nombre` (`readings.ts:57,90`). Desde hoja: constante `'Invernadero Macollo'` (`recordsParser.ts:378`).                                     | `fincas.nombre`                                                |
| `fila`            | `Fila`                  | No       | `t1`                         | `resolvePlantCoordinates()` (`plantMatrix.ts:66-156`).                                                                                                       | `plantas.fila`                                                 |
| `columna`         | `Columna`               | No       | `Col 2`                      | `resolvePlantCoordinates()`.                                                                                                                                 | `plantas.columna`                                              |
| `plantId`         | `string`                | No       | `P-07`                       | `plantIdFor(filaIdx*5+colIdx+1)` (`plantMatrix.ts:58-60,148-155`).                                                                                           | `plantas.plant_id`                                             |
| `code`            | `string`                | No       | `T1-P2`                      | `codeFor(filaIdx, colIdx)` → `` `T${i}-P${j+1}` `` (`plantMatrix.ts:62-64`). En lectura BD se deriva de los dígitos de `plant_id` (`readings.ts:53-61`).     | Calculado; no existe columna                                   |
| `fecha`           | `string` (`YYYY-MM-DD`) | No       | `2026-10-09`                 | `extractDateAndHour()`; validado dos veces (`recordsParser.ts:315-316`, `readings.ts:135`).                                                                  | `lecturas.fecha` (`DATE`)                                      |
| `hora`            | `string`                | No       | `09:00 AM`                   | Extraída del valor de fecha; **puede ser `''`** (`csv.ts:80-95`).                                                                                            | `lecturas.hora` (`VARCHAR(20)`)                                |
| `timestampTexto`  | `string`                | No       | `2026-10-09, 09:00 AM`       | ``hora ? `${fecha}, ${hora}` : fecha`` (`recordsParser.ts:385`, `readings.ts:64`).                                                                           | Calculado; no existe columna                                   |
| `phSuelo`         | `number`                | No       | `6.4`                        | Parser: clamp 0–14 y 2 decimales, default `6.4` (`recordsParser.ts:318-320`). BD: `row.ph_suelo ?? 0` (`readings.ts:65`).                                    | `lecturas.ph_suelo` (`REAL`)                                   |
| `tempInterna`     | `number \| null`        | No       | `24.5`                       | Parser: 1 decimal, default `24.5`. BD: `null` si falta (`readings.ts:66`).                                                                                   | `lecturas.temp_interna`                                        |
| `tempInvernadero` | `number`                | **Sí**   | `24.5`                       | Alias de `tempInterna` en el parser (`recordsParser.ts:388`) y en lectura (`readings.ts:67`).                                                                | Sin columna propia                                             |
| `tempExterna`     | `number \| null`        | No       | `20.2`                       | Parser: 1 decimal, default `20.2`. BD: `row.temp_externa ?? null` (`readings.ts:68`).                                                                        | `lecturas.temp_externa`                                        |
| `tempSuelo`       | `number \| null`        | No       | `20.1`                       | Parser: 1 decimal; `null` si no se tomó (`recordsParser.ts:322-324`).                                                                                        | `lecturas.temp_suelo`                                          |
| `humedad`         | `number`                | **Sí**   | `65`                         | Parser: redondeo y clamp 0–100, default `65` (`recordsParser.ts:334-338`). BD: `undefined` si falta (`readings.ts:70`).                                      | `lecturas.humedad`                                             |
| `alturaCm`        | `number \| null`        | **Sí**   | `42`                         | Parser: 1 decimal; `null` si es token nulo (`recordsParser.ts:340-341`).                                                                                     | `lecturas.altura_cm`                                           |
| `crecimiento`     | `number`                | No       | `75`                         | De altura: `≤100` → altura redondeada; `>100` → `min(100, round(altura/150*100))`; default `75` (`recordsParser.ts:343-349`). BD: `?? 0` (`readings.ts:72`). | `lecturas.crecimiento`                                         |
| `faseCrecimiento` | `string`                | No       | `Floración`                  | De hoja; si falta, derivada de altura (`recordsParser.ts:357-364`). BD: `row.fase \|\| 'Sin registrar'` (`readings.ts:73`).                                  | `lecturas.fase`                                                |
| `productividad`   | `Productividad`         | No       | `Alta`                       | `deriveProductividad()` (`csv.ts:158-168`). BD: `row.productividad \|\| 'Media'` (`readings.ts:74-75`).                                                      | `lecturas.productividad`                                       |
| `sanidad`         | `Sanidad`               | No       | `Saludable`                  | `deriveSanidad(texto, phSuelo)` (`csv.ts:126-156`). BD: `row.sanidad \|\| 'Saludable'` (`readings.ts:76`).                                                   | `lecturas.sanidad`                                             |
| `responsable`     | `string`                | No       | `Equipo Demo`                | Texto de hoja (`recordsParser.ts:351-355`), o `COALESCE` con `users.name` y `'Sin registrar'` desde BD (`readings.ts:94,54`).                                | `lecturas.responsable` **y** `users.name` vía `responsable_id` |
| `responsableRol`  | `string`                | No       | `''`                         | Se inicializa vacío en el parser y en lectura (`recordsParser.ts:398`, `readings.ts:78`); se escribe en la columna «Cargo» del Excel (`excelExport.ts:167`). | Sin columna propia                                             |
| `avatarColor`     | `string`                | No       | `bg-emerald-500`             | `avatarColorFor(responsable)`: hash `hash*31 + charCode`, paleta de 8 clases (`utils.ts:21-38`).                                                             | Sin columna propia                                             |
| `observaciones`   | `string`                | **Sí**   | `Demo: planta de referencia` | De hoja o texto generado (`recordsParser.ts:371-374`). BD: `undefined` si es NULL (`readings.ts:80`).                                                        | `lecturas.observaciones`                                       |

### 2.3 `PlantMatrixItem` (`src/shared/plantMatrix.ts:40-48`)

| Campo          | Tipo             | Ejemplo   | Significado                                                                                                             |
| :------------- | :--------------- | :-------- | :---------------------------------------------------------------------------------------------------------------------- |
| `fila`         | `Fila`           | `t0`      | Fila de la celda.                                                                                                       |
| `columna`      | `Columna`        | `Col 1`   | Columna de la celda.                                                                                                    |
| `plantId`      | `string`         | `P-01`    | Etiqueta global `P-NN`.                                                                                                 |
| `plantNumber`  | `number`         | `1`       | `filaIdx*5 + columnaIdx + 1` (1–20).                                                                                    |
| `code`         | `string`         | `T0-P1`   | `codeFor(filaIdx, columnaIdx)`.                                                                                         |
| `latestMetric` | `MetricRecord`   | `LEC-128` | Último elemento del historial ordenado por `fecha`, o `pendingMetric()` si no hay registros (`plantMatrix.ts:201-224`). |
| `history`      | `MetricRecord[]` | `[…]`     | Registros de la planta ordenados por `fecha` ascendente (`plantMatrix.ts:213`).                                         |

`buildEmptyPlantsGrid()` equivale a `buildPlantsGridFromRecords([])`: devuelve 20 celdas con `latestMetric` pendiente (`plantMatrix.ts:233-235`). Valores de `pendingMetric()` (`plantMatrix.ts:158-188`): `id = MET-<code>-PENDING`, `invernadero = 'Invernadero Macollo'`, `fecha = ''`, `hora = ''`, `timestampTexto = 'Sin mediciones'`, `phSuelo = 0`, temperaturas y `alturaCm` en `null`/ausentes, `crecimiento = 0`, `faseCrecimiento = 'Esperando datos'`, `productividad = 'Media'`, `sanidad = 'Saludable'`, `responsable = 'Sin registrar'`, `responsableRol = ''`, `avatarColor = 'bg-stone-500'` y `observaciones = 'Esperando sincronización de datos reales desde Google Sheets.'`.

### 2.4 Resolución de coordenadas (`src/shared/plantMatrix.ts:66-156`)

| Prioridad | Entrada aceptada                                                                  | Resultado                                     | Fuente                 |
| :-------- | :-------------------------------------------------------------------------------- | :-------------------------------------------- | :--------------------- |
| 1         | Formato compuesto `T0-P1`, `T1P4`, `T2_P3`, `T3.P5`, `TO-F2` (`O` equivale a `0`) | Fila `t0`–`t3` y columna `Col 1`–`Col 5`.     | `plantMatrix.ts:80-89` |
| 2         | `TRATAMIENTO/FILA/CAMA/BLOQUE/SECCION T<n>`, `T<n>` o dígito suelto `0`–`3`       | Fila; la columna se busca aparte.             | `:91-108`              |
| 3         | `P1`–`P5`, `PLANTA/COL/COLUMNA/SITIO <n>` o dígito `1`–`5`                        | Columna.                                      | `:110-132`             |
| 4         | Identificador global `P-01`…`P-20` (o `1`…`20`)                                   | `fila = floor((n-1)/5)`, `columna = (n-1)%5`. | `:134-143`             |
| 5         | Sin coincidencia                                                                  | `t0` / `Col 1` por defecto.                   | `:145-146`             |

La consecuencia operativa es que un `ID_planta` ilegible **no descarta la fila**: se asigna a la primera planta. Conviene auditar el fixture antes de importar.

---

## 3. Entrada: CSV y Google Sheets

### 3.1 Lectura del archivo (`src/shared/csv.ts:17-58`, `src/backend/services/sheetsSync.ts:56-90`)

`fetchSheetRecords(url)` descarga el CSV con `User-Agent: Macollo-Greenhouse-Sync/2.0` y `Accept: text/csv,text/plain,*/*`; si HTTP no es `ok` o quedan menos de dos filas, lanza `SheetsSyncError` con estado 422. `parseCSV()` normaliza CRLF/CR a LF, descarta líneas vacías, infiere el delimitador de la **primera línea no vacía** comparando recuentos de `,`, `;` y tabulador (preferencia: coma > `;` > tab en empate), respeta comillas dobles y recorta espacios de cada celda.

`findHeaderRowIndex()` examina como máximo las 10 primeras filas (`recordsParser.ts:252-285`) y declara cabecera la que cumple `(contiene ID de planta AND (fecha OR pH OR responsable)) OR (fecha AND (pH OR responsable))`. Si ninguna cumple, usa la fila 0.

`normalizeHeader()` (`recordsParser.ts:27-36`): minúsculas, descomposición NFD, eliminación de diacríticos, sustitución de caracteres fuera de `[a-z0-9_ ]` por espacio y colapso de espacios. Así, `ID_planta` → `id_planta`, `T_Ext_C` → `t_ext_c` y `Temperatura (°C)` → `temperatura c`.

### 3.2 Cabeceras reconocidas (`src/shared/recordsParser.ts:38-246`)

La coincidencia «exacta» se aplica sobre la cabecera normalizada; «contiene» significa `includes()` y «prefijo» `startsWith()`. La primera columna que coincide gana.

| Concepto (`HeaderIndex`) | Coincidencia exacta                                                                                  | Coincidencia adicional (`includes`/`startsWith`)                                             | Fallback / observación                                                                                                                                                                                                                         |
| :----------------------- | :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idPlanta`               | `id_planta`, `id planta`, `idplanta`, `id`, `plant_id`, `plant id`, `codigo_planta`, `codigo planta` | prefijo `id_planta`, sufijo `_id_planta`; cualquier cabecera con `id` **y** `plant`          | Si falta, se exploran **todas** las celdas de la fila buscando `T[0-3O]-P[1-5]` (`recordsParser.ts:298-311`). No hay índice para columnas auxiliares `fila`/`planta`: solo pueden influir si su valor contiene ese patrón y falta `ID_planta`. |
| `fecha`                  | —                                                                                                    | `fecha`, `date`, `dia`, `registro`                                                           | No existe índice de columna `hora`: se extrae del valor de fecha.                                                                                                                                                                              |
| `tempExt`                | `t_ext_c`, `t_ext`                                                                                   | `t_ext`, `temp_ext`, `t ext`, `externa`, `tout`, `exterior`                                  | Se resuelve **antes** que `tempInt`.                                                                                                                                                                                                           |
| `tempInt`                | `t_int_c`, `t_int`                                                                                   | `t_int`, `temp_int`, `t int`, cualquier cabecera con `temp` **y** `int`, o con `invernadero` | `tempInvernadero` es un alias en memoria.                                                                                                                                                                                                      |
| `humedad`                | `humedad_pct`, `humedad`                                                                             | `humedad`, `humidity`, prefijo `hum_`, `hum pct`                                             | Clamp 0–100.                                                                                                                                                                                                                                   |
| `tempSuelo`              | `t_planta_c`, `t_planta`                                                                             | `t_planta`, `temp_planta`, `t planta`, `piso`, `t_suelo`, `suelo`, `tsoil`                   | `N/D` se convierte en `null`.                                                                                                                                                                                                                  |
| `ph`                     | `ph`                                                                                                 | prefijo `ph_`/`ph `, o cualquier cabecera que contenga `ph`                                  | Clamp 0–14; default `6.4`.                                                                                                                                                                                                                     |
| `altura`                 | `altura_cm`, `altura`                                                                                | `altura`, prefijo `alt_`/`alt `, `crecimiento`, `growth`                                     | `crecimiento` de la hoja se interpreta como altura; el porcentaje se recalcula.                                                                                                                                                                |
| `fase`                   | —                                                                                                    | `fase`, `etapa`, `fenologia`                                                                 | Si falta, se deriva de la altura.                                                                                                                                                                                                              |
| `productividad`          | —                                                                                                    | `productividad`, `prod`, `rendimiento`, `frutos`                                             | `deriveProductividad()`.                                                                                                                                                                                                                       |
| `sanidad`                | —                                                                                                    | `sanidad`, `salud`, `fitosanitario`, `estado`, `vigor`                                       | `deriveSanidad()`; puede ser corregida por el pH.                                                                                                                                                                                              |
| `observaciones`          | —                                                                                                    | `observacion`, `notas`, `comentario`, `obs`, `detalles`                                      | Si falta, se genera texto automático.                                                                                                                                                                                                          |
| `hora`                   | **No se indexa**                                                                                     | —                                                                                            | `extractDateAndHour()` lee `HH:MM(:SS)? (AM\|PM)?` dentro de la celda de fecha (`csv.ts:81-95`).                                                                                                                                               |

### 3.3 Responsable (`src/shared/recordsParser.ts:67-141`)

Nivel 1 — coincidencia exacta (30 alias, `recordsParser.ts:68-99`): `responsable`, `responsables`, `responsable de toma`, `responsable toma`, `responsable de la toma`, `responsable de medicion`, `responsable medicion`, `responsable de campo`, `responsable campo`, `nombre responsable`, `nombre del responsable`, `tecnico responsable`, `operario responsable`, `operador`, `operario`, `tecnico`, `encargado`, `evaluador`, `observador`, `recolector`, `registrado por`, `tomado por`, `quien registra`, `responsible`, `operator`, `technician`, `evaluator`, `collector`, `recorded by`, `taken by`.

Nivel 2 — contiene (`recordsParser.ts:103-118`): `responsab`, `operari`, `operad`, `tecnic`, `evaluad`, `encargad`, `recolect`, `observad`, `tomado`, `registrado`, `quien registra`.

Nivel 3 — términos genéricos (`recordsParser.ts:121-141`): `nombre`, `persona`, `usuario`, `autor`, `personal`, `staff`, **solo si** la cabecera no contiene `plant`, `cultiv`, `finca`, `lote`, `especie`, `variedad`, `archivo` ni `invernadero`. Si no hay coincidencia, `responsable = 'Sin registrar'`.

### 3.4 Fecha, hora y seriales (`src/shared/csv.ts:73-124`)

| Formato de entrada                       | Regla                                                                 | Resultado                                                                                              |
| :--------------------------------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `YYYY-MM-DD`, `YYYY/MM/DD`, `YYYY.MM.DD` | `\b(202\d)[-/.](\d{1,2})[-/.](\d{1,2})\b`                             | `YYYY-MM-DD` con mes y día de dos dígitos.                                                             |
| `DD-MM-YYYY`, `DD/MM/YYYY`, `DD.MM.YYYY` | `\b(\d{1,2})[-/.](\d{1,2})[-/.](202\d)\b`                             | Se reordena a `YYYY-MM-DD`.                                                                            |
| Serial numérico de Excel                 | `40000 < serial < 60000`, época `1899-12-30` y `serial * 86400000` ms | Fecha civil en hora local; posteriormente se valida el patrón `YYYY-MM-DD`.                            |
| Hora incrustada                          | `(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM\|PM\|am\|pm)?`                  | `HH:MM AM\|PM`; si no hay sufijo, `≥12` → `PM`, otro → `AM`; `hh>12` se resta 12 y `hh===0` pasa a 12. |
| Otro valor                               | `raw.slice(0,10)`                                                     | La fila se descarta si no satisface `/^\d{4}-\d{2}-\d{2}$/`.                                           |

Las fechas textuales reconocidas se limitan al rango `2020`–`2029` por el patrón `202\d`; un año fuera de ese rango escrito como texto cae al fallback y se descarta. El rango de seriales cubre aproximadamente 2009–2064.

### 3.5 Números, tokens nulos y derivaciones

Tokens tratados como nulos (`src/shared/csv.ts:3-15`): `nd`, `n/d`, `na`, `n/a`, `-`, `--`, `null`, `no tomada`, `no medido`, `pendiente`, `''`. `parseCsvNumber()` reemplaza la **primera** coma por punto y descarta caracteres fuera de `[0-9.-]`; por tanto `6,4` y `6.4` son equivalentes (`csv.ts:60-71`).

| Campo calculado   | Fórmula verificable                                                                                                                                                                                                                            | Fuente                     |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| `phSuelo`         | `min(14, max(0, número))` con 2 decimales; defecto `6.4`                                                                                                                                                                                       | `recordsParser.ts:318-320` |
| `tempSuelo`       | número con 1 decimal; defecto `null`                                                                                                                                                                                                           | `:322-324`                 |
| `tempExterna`     | número con 1 decimal; defecto `20.2`                                                                                                                                                                                                           | `:326-328`                 |
| `tempInterna`     | número con 1 decimal; defecto `24.5`                                                                                                                                                                                                           | `:330-332`                 |
| `humedad`         | `round(clamp(número,0,100))`; defecto `65`                                                                                                                                                                                                     | `:334-338`                 |
| `alturaCm`        | número con 1 decimal; defecto `null`                                                                                                                                                                                                           | `:340-341`                 |
| `crecimiento`     | `≤100 → round(altura)`; `>100 → min(100, round(altura/150*100))`; sin altura `75`                                                                                                                                                              | `:343-349`                 |
| `responsable`     | texto recortado salvo token nulo; defecto `'Sin registrar'`                                                                                                                                                                                    | `:351-355`                 |
| `faseCrecimiento` | hoja; si falta: `altura>80 → 'Llenado de Fruto'`, `>40 → 'Floración'`, otro → `'Desarrollo Vegetativo'`                                                                                                                                        | `:357-364`                 |
| `productividad`   | `baja\|low\|1 → 'Baja'`; `med\|mid\|2 → 'Media'`; otro → `'Alta'`                                                                                                                                                                              | `csv.ts:158-168`           |
| `sanidad`         | `crit/mala/enferma/rojo → 'Crítica'`; `vuln/aten/regular/amarillo → 'Vulnerable'`; `excel/opt/muy buena → 'Excelente'`; si no hay texto: pH `<5.2` o `>7.8 → Crítica`, `<5.8` o `>7.2 → Vulnerable`, `6.2–6.7 → Excelente`, otro → `Saludable` | `csv.ts:126-156`           |
| `observaciones`   | texto de hoja; defecto `Medición de Google Sheets (<fecha>). Altura: <altura_cm o N/D>, Humedad: <humedad>%.`                                                                                                                                  | `recordsParser.ts:371-374` |

### 3.6 Identificadores generados y fixture

`buildRecordsFromRows()` produce `id = MET-GS-${coords.code}-${fecha}-${r}`, donde `r` es el **índice absoluto de la fila** en el arreglo devuelto por `parseCSV()` (base 0, cabecera incluida) (`recordsParser.ts:287-405`). Para la fila 2 de `docs/sample-readings-demo.csv`, el identificador es `MET-GS-T0-P1-2026-10-09-2`.

El fixture `docs/sample-readings-demo.csv:1-21` usa exactamente estas cabeceras: `ID_planta,fecha,responsable,T_Ext_C,T_Int_C,humedad_Pct,T_Planta_C,Ph,ALtura_cm,fase,productividad,sanidad,observacion`. Contiene 20 filas fechadas `2026-10-09` con responsable `Equipo Demo` y valores `N/D` en `T_Planta_C` (fila 14 del archivo), que se traducen a `tempSuelo = null`.

---

## 4. Salidas: CSV y Excel

### 4.1 CSV (`src/backend/services/csvExport.ts:3-60`)

`generateCsv(records)` emite BOM UTF-8 (`\uFEFF`), cabecera y filas separadas por `\r\n`; una celda se entrecomilla si contiene `"`, `,`, `\r`, `\n` o `;` y los comillas internos se duplican. Los números se imprimen con `String(value)`; `null`, `undefined` y `NaN` se dejan vacíos (`csvExport.ts:23-32`).

| #   | Cabecera CSV      | Origen en `MetricRecord` |
| :-- | :---------------- | :----------------------- |
| 1   | `Planta`          | `plantId`                |
| 2   | `Fila`            | `fila`                   |
| 3   | `Columna`         | `columna`                |
| 4   | `Fecha`           | `fecha`                  |
| 5   | `Hora`            | `hora`                   |
| 6   | `pH_Suelo`        | `phSuelo`                |
| 7   | `Temp_Interna_C`  | `tempInterna`            |
| 8   | `Temp_Externa_C`  | `tempExterna`            |
| 9   | `Temp_Suelo_C`    | `tempSuelo`              |
| 10  | `Humedad_Pct`     | `humedad`                |
| 11  | `Altura_cm`       | `alturaCm`               |
| 12  | `Crecimiento_Pct` | `crecimiento`            |
| 13  | `Fase`            | `faseCrecimiento`        |
| 14  | `Productividad`   | `productividad`          |
| 15  | `Sanidad`         | `sanidad`                |
| 16  | `Responsable`     | `responsable`            |
| 17  | `Observaciones`   | `observaciones`          |

El nombre de archivo del botón del tablero es `Macollo_Mediciones_Invernadero_<YYYY-MM-DD>.csv` (`src/frontend/components/Metrics.astro:2399`).

### 4.2 Excel (`src/backend/services/excelExport.ts:32-639`)

`generateExcelBuffer(plants)` devuelve un `ArrayBuffer` de ExcelJS con tres hojas.

**Hoja 1 «Mediciones de Hoy»** — 16 columnas, cabecera en la fila 4, una fila por planta con `latestMetric`, autofiltro `A4:P<n>` y fila «PROMEDIO GENERAL DEL CULTIVO» con `AVERAGE` en F–J (`excelExport.ts:94-111,137-175,289-358`).

| Col. | Cabecera                    | Origen                                              |
| :--- | :-------------------------- | :-------------------------------------------------- |
| A    | `Fila`                      | `PlantMatrixItem.fila`                              |
| B    | `Columna`                   | `PlantMatrixItem.columna`                           |
| C    | `ID Planta`                 | `plantId`                                           |
| D    | `Fecha`                     | `latestMetric.fecha`                                |
| E    | `Hora`                      | `latestMetric.hora`                                 |
| F    | `pH Suelo`                  | `phSuelo` (`0.0`)                                   |
| G    | `Temp. Int (°C)`            | `tempInterna` (`0.0" °C"`), `N/D` si es null        |
| H    | `Temp. Ext (°C)`            | `tempExterna`                                       |
| I    | `Temp. Suelo (°C)`          | `tempSuelo`                                         |
| J    | `Crecimiento (%)`           | `crecimiento` (`0"%"`)                              |
| K    | `Fase Fenológica`           | `faseCrecimiento`                                   |
| L    | `Productividad`             | `productividad`                                     |
| M    | `Sanidad`                   | `sanidad` (coloreada)                               |
| N    | `Responsable`               | `responsable`                                       |
| O    | `Cargo`                     | `responsableRol`                                    |
| P    | `Observaciones Agronómicas` | `observaciones` o `Condición óptima de desarrollo.` |

**Hoja 2 «Historial Completo»** — 14 columnas, cabecera en la fila 3, registros ordenados por `fecha + hora` descendente y autofiltro `A3:N<n>` (`excelExport.ts:379-492`).

| Col. | Cabecera      | Col. | Cabecera           |
| :--- | :------------ | :--- | :----------------- |
| A    | `ID Registro` | H    | `Temp. Int (°C)`   |
| B    | `ID Planta`   | I    | `Temp. Ext (°C)`   |
| C    | `Fila`        | J    | `Temp. Suelo (°C)` |
| D    | `Columna`     | K    | `Crecimiento (%)`  |
| E    | `Fecha`       | L    | `Sanidad`          |
| F    | `Hora`        | M    | `Productividad`    |
| G    | `pH Suelo`    | N    | `Responsable`      |

**Hoja 3 «Rangos Agronómicos»** — columnas `Parámetro`, `Rango Óptimo`, `Rango de Alerta`, `Unidad`, `Frecuencia`, `Acción Recomendada` (`excelExport.ts:531-608`). Filas: pH `6.0 a 6.8`; temperatura interna `22.0 °C a 26.0 °C`; externa `18.0 °C a 24.0 °C`; suelo `19.0 °C a 22.0 °C`; crecimiento `75 % a 100 %`; sanidad `Excelente / Saludable`.

Corrección de deriva: el nombre `Macollo_Mediciones_Invernadero_<fecha>.xlsx` no corresponde al Excel. El botón del tablero usa `Macollo_Mediciones_<YYYY-MM-DD>.xlsx` (`Metrics.astro:2362`) y el endpoint `GET /api/export-excel` usa `<finca_sanitizada>_Mediciones_<YYYY-MM-DD>.xlsx` (`src/pages/api/export-excel.ts:41-49`).

---

## 5. Correspondencia con PostgreSQL y deduplicación

| Campo / concepto                       | `lecturas` u otra tabla                                  | Escritura (`insertLecturas`)                                                                               | Lectura (`getLecturasByFinca` / `rowToRecord`)                               |
| :------------------------------------- | :------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| Planta                                 | `plantas(id, finca_id, fila, columna, plant_id)`         | `getPlantaMap()` indexa por `` `${fila}\|${columna}` ``; fila sin planta se omite (`readings.ts:106-137`). | `JOIN plantas` para `fila`, `columna`, `plant_id` (`:89-100`).               |
| Finca                                  | `fincas(id, nombre)`                                     | `finca_id` de la finca activa del contexto HTTP (`sync-sheets.ts:113-115`).                                | `fincas.nombre` → `invernadero` (`readings.ts:57,90`).                       |
| `fecha`, `hora`                        | `lecturas.fecha`, `lecturas.hora`                        | `r.fecha` debe cumplir `YYYY-MM-DD`; `r.hora \|\| ''` (`:135,165`).                                        | `toISODate()` y `row.hora \|\| ''` (`:45-52`).                               |
| Métricas y texto (excepto responsable) | `ph_suelo` … `sanidad`, `observaciones`                  | Se escriben como `NULL` cuando el campo no trae valor (`:166-178`).                                        | Valores defensivos (`?? 0`, `?? null`, `\|\| 'Media'`, etc.) en `:65-81`.    |
| `responsable`                          | `lecturas.responsable TEXT`                              | `(r.responsable \|\| '').trim() \|\| null` (`:139,176`).                                                   | `COALESCE(NULLIF(TRIM(l.responsable),''), u.name, 'Sin registrar')` (`:94`). |
| `responsable_id`                       | `lecturas.responsable_id → users(id) ON DELETE SET NULL` | ID del usuario autenticado que sincroniza (`sync-sheets.ts:114`).                                          | `LEFT JOIN users` para obtener `u.name` (`readings.ts:98`).                  |
| Identificador                          | `lecturas.id BIGSERIAL`                                  | Asignado por PostgreSQL.                                                                                   | `` `LEC-${row.id}` `` (`readings.ts:56`).                                    |

La clave de deduplicación es `UNIQUE (finca_id, planta_id, fecha, hora)` (`src/db/greenhouse-schema.sql:99`). `insertLecturas()` envuelve todas las filas en `BEGIN`/`COMMIT` y aplica `ON CONFLICT … DO UPDATE` (`readings.ts:133-183`):

- Se sobrescriben `ph_suelo`, temperaturas, humedad, altura, crecimiento, fase, productividad, sanidad y observaciones con los valores entrantes.
- `responsable` y `responsable_id` usan `COALESCE(EXCLUDED…, lecturas…)`: un valor NULL entrante **conserva** el anterior (`:158-159`).
- Ante cualquier error se ejecuta `ROLLBACK` y se libera el cliente (`:185-190`).
- El valor devuelto (`escritas`) cuenta las filas procesadas, no distingue inserción de actualización (`:181`).

Las semillas emplean `ON CONFLICT … DO NOTHING` (`scripts/seed-demo.mjs:159-165`, `scripts/seed-production.mjs:140-152`), por lo que son seguras frente a reprocesos del mismo día.

---

## 6. Correcciones de deriva aplicadas

| Afirmación anterior                                                             | Realidad verificada                                                                                                                                             | Fuente                                                              |
| :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| «Parser en `sheetsSync.ts`».                                                    | La lógica vive en `src/shared/recordsParser.ts` y se reexporta desde `sheetsSync.ts:10-11`.                                                                     | `sheetsSync.ts:3-11`; `recordsParser.ts:11-405`.                    |
| «Hora por defecto `09:00 AM`».                                                  | No hay columna `hora` en la cabecera ni default de aplicación: se extrae de la celda de fecha y puede ser `''`.                                                 | `csv.ts:80-95`; `greenhouse-schema.sql:84`; `recordsParser.ts:385`. |
| «`responsable_id` ↔ `responsable` como un solo campo».                          | `responsable` es texto de hoja; `responsable_id` es FK a `users`; se combinan solo en lectura.                                                                  | `readings.ts:94,158-159`; `migrations/002…:4`.                      |
| «Observaciones automáticas: _Medición real de Google Sheets_ + nota 29/30-sep». | Texto exacto: `Medición de Google Sheets (<fecha>). Altura: …, Humedad: …%.`                                                                                    | `recordsParser.ts:371-374`.                                         |
| «El sufijo de `id` es el número de fila de la planta».                          | Es el índice absoluto `r` de la fila del CSV (cabecera incluida).                                                                                               | `recordsParser.ts:377`.                                             |
| «`tempExterna` es `number`».                                                    | Es `number \| null` en `MetricRecord` y `REAL` nullable en SQL.                                                                                                 | `plantMatrix.ts:26`; `greenhouse-schema.sql:87`.                    |
| «Excel: `Macollo_Mediciones_Invernadero_<fecha>.xlsx`».                         | Ese formato corresponde al CSV; el Excel usa otros dos nombres según botón o endpoint.                                                                          | `Metrics.astro:2362`; `export-excel.ts:41-49`.                      |
| «Todo dato ausente se vuelve cero».                                             | Depende del campo: `phSuelo`/`crecimiento` → `0`; `tempSuelo`/`alturaCm` → `null`; humedad y temperatura interna → defaults; `responsable` → `'Sin registrar'`. | `recordsParser.ts:318-355`; `readings.ts:65-81`.                    |

---

## Trazabilidad

| Concepto                           | Archivo de código / esquema                                                                                  | Documento relacionado                                               | Verificación                                                                                                |
| :--------------------------------- | :----------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------- |
| `MetricRecord` y `PlantMatrixItem` | `src/shared/plantMatrix.ts:13-48`                                                                            | `docs/COMPONENTS.md`, `docs/ARCHITECTURE.md`                        | 24 campos del registro y 7 de la celda, listados sin campos inventados.                                     |
| Coordenadas y matriz 4 × 5         | `src/shared/plantMatrix.ts:1-11,58-156,190-235`                                                              | `docs/FIELD-PROTOCOL.md`, `docs/USER_MANUAL.md`                     | `TOTAL_PLANTAS = 20`; resolución con `O→0` y fallback `t0/Col 1`.                                           |
| Parser de registros                | `src/shared/recordsParser.ts:11-405`                                                                         | `docs/DATA-DICTIONARY.md` (este documento)                          | `HeaderIndex` con 13 claves; cabeceras y derivaciones transcritas del código.                               |
| CSV, seriales y derivaciones       | `src/shared/csv.ts:3-168`                                                                                    | `docs/DEMO-DATA.md`                                                 | Serial Excel 40000–60000 con época 1899-12-30; umbrales de pH de `deriveSanidad`.                           |
| Importación desde Sheets           | `src/backend/services/sheetsSync.ts:13-99`; `src/pages/api/sync-sheets.ts:37-126`                            | `docs/ENDPOINTS.md`                                                 | Normalización de URL, descarga CSV y persistencia de `sheets_url`.                                          |
| Escritura y deduplicación          | `src/backend/services/readings.ts:123-191`; `src/db/greenhouse-schema.sql:79-102`                            | `docs/DATABASE.md`                                                  | `UNIQUE (finca_id, planta_id, fecha, hora)` y `ON CONFLICT DO UPDATE`.                                      |
| Responsable doble representación   | `src/db/migrations/002-add-responsable-to-lecturas.sql:4`; `src/backend/services/readings.ts:94,139,158-159` | `docs/AUTH.md`, `docs/DATABASE.md`                                  | Columna de texto y FK independientes; `COALESCE` al leer y al actualizar.                                   |
| Exportación CSV                    | `src/backend/services/csvExport.ts:3-60`; `src/frontend/components/Metrics.astro:2399`                       | `docs/USER_MANUAL.md`                                               | 17 cabeceras, BOM y CRLF.                                                                                   |
| Exportación Excel                  | `src/backend/services/excelExport.ts:32-639`; `src/pages/api/export-excel.ts:41-49`                          | `docs/USER_MANUAL.md`                                               | Tres hojas, 16/14/6 columnas y nombres de archivo reales.                                                   |
| Fixture de campo                   | `docs/sample-readings-demo.csv:1-21`                                                                         | `docs/DEMO-DATA.md`, `docs/TESTING.md`                              | 20 filas, `2026-10-09`, `Equipo Demo`, `N/D` en `T_Planta_C`.                                               |
| Encabezado unificado               | Encabezado de este documento                                                                                 | `docs/README.md`, `docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md` | Texto requerido por la auditoría del 2026-11-23; la ruta `docs/UNIFIED/` no está presente en este checkout. |
