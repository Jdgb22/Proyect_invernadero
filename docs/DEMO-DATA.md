# Datos Demo — Proyecto Invernadero

> Para presentaciones, onboarding y pruebas (TEST-07) sin tocar datos reales.

## 1. Archivo

[`sample-lecturas-demo.csv`](./sample-lecturas-demo.csv): **20 filas (T0-P1…T3-P5), fecha `2026-10-09`**, con casos pedagógicos:

- 🟢 Mayoría óptima (pH 6.0–6.8).
- 🟡 `T0-P3` (pH 5.7) y `T2-P4` (pH 5.4) en Atención.
- 🔴 `T1-P2` (pH 7.9) y `T3-P3` (pH 8.1) en Crítico.
- `T2-P3` con `T_Planta_C = N/D` (muestra el gris parcial + `N/D` en Excel).

El archivo usa el mismo contrato de columnas que acepta el importador (`src/pages/api/sync-sheets.ts`): `ID_planta, fecha, responsable, T_Ext_C, T_Int_C, humedad_Pct, T_Planta_C, Ph, ALtura_cm, fase, productividad, sanidad, observacion`. Cada fila se guarda como una **lectura** de esa planta en la **finca activa**.

## 2. Cómo usarlo (2 minutos)

1. Súbelo a Google Sheets (Archivo → Importar) **o** sírvelo local: `python3 -m http.server` en `docs/` y usa `http://localhost:8000/sample-lecturas-demo.csv`.
2. Hoja pública (paso 2 del [FIELD-PROTOCOL](./FIELD-PROTOCOL.md) §4).
3. En la app, con la **cuenta dueña** de la finca activa: Historial → Conectar Google Sheets → pegar URL → debe responder `count: 20`.
4. Dashboard: 16 🟢 + 2 🟡 + 2 🔴. Métricas: promedio pH ≈ 6.4.

## 3. Reglas

- Solo para demo/test; **nunca** mezclar con hojas reales (contamina el conteo y el Excel).
- Si necesitas otro escenario, duplica el archivo con otra fecha (el historial agrupa por `fecha`).
- Las lecturas demo quedan asociadas a la finca con la que sincronizaste; para limpiarlas usa los datos de esa finca.
