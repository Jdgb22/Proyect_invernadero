# Protocolo de Campo — Toma de Datos (para operarios)

> Cómo llenar la hoja para que el sistema la entienda a la primera. Referencia técnica: [DATA-DICTIONARY](./DATA-DICTIONARY.md). Guía de la app: [MANUAL_USUARIO](../MANUAL_USUARIO.md).

## 1. Antes de salir

- [ ] Celular con datos y la hoja del día abierta (una pestaña por fecha o una hoja con columna `fecha`).
- [ ] pH-metro calibrado, termómetros (aire + suelo), cinta métrica.
- [ ] Saber tu fila asignada (`t0–t3`) y que cada fila tiene 5 plantas (`P1–P5`).

## 2. Cómo identificar cada planta (importante)

Escribe el ID siempre igual, formato **`T{fila}-P{planta}`**: `T0-P1, T0-P2 … T3-P5`.
El sistema también entiende `TO-P2` (O por 0), `T1P4`, `T2_P3`, `P-07` o el número global 1–20, pero **usa `T{f}-P{c}`** para evitar errores. Nunca dejes el ID vacío.

## 3. Columnas mínimas de la hoja

| Columna       | Qué poner                 | Ejemplo                           |
| :------------ | :------------------------ | :-------------------------------- |
| `ID_planta`   | Código `T{f}-P{c}`        | `T1-P3`                           |
| `fecha`       | Día (y hora si la tienes) | `2026-10-09` o `09/10/2026 09:00` |
| `Ph`          | pH 0–14 con punto o coma  | `6,4` ✓                           |
| `T_Ext_C`     | Aire fuera (°C)           | `20.2`                            |
| `T_Int_C`     | Aire dentro (°C)          | `24.5`                            |
| `T_Planta_C`  | Suelo/planta (°C)         | `20.1`                            |
| `humedad_Pct` | %                         | `65`                              |
| `ALtura_cm`   | Altura en cm              | `42`                              |
| `responsable` | Tu nombre                 | `María Campo`                     |

Opcionales: `fase` (`Floración`…), `productividad` (`Alta/Media/Baja`), `sanidad` (`Excelente/Saludable/Vulnerable/Crítica`), `observacion`.

Si un sensor falló ese día, escribe **`N/D`** (no inventes números: el sistema lo marca gris y deriva la sanidad del pH).

## 4. Al terminar la jornada

1. Revisa: 20 filas (una por planta), sin IDs vacíos ni fechas mezcladas.
2. Comparte la hoja como **lectora** (_"Cualquier persona con el enlace puede ver"_) o **publícala como CSV**.
3. En la app: Historial → **Conectar Google Sheets** → pegar URL → confirmar el conteo (esperado: 20 por día).
4. Verifica en el Dashboard que tu fila ya no esté gris.

## 5. Errores frecuentes

| Error                      | Qué hacer                                                                |
| :------------------------- | :----------------------------------------------------------------------- |
| Importa 0 registros        | Cabeceras con tildes/espacios raros o sin fila de datos; compara con §3. |
| Plantas en fila equivocada | IDs como `T1-P1` escritos como `TP1`; usa el formato exacto.             |
| Todo sale `N/D`            | Decimales con espacios o texto (`veinte`); usa números o `N/D`.          |
| La app dice 422            | La hoja no es pública: revisa el paso 2 del §4.                          |
