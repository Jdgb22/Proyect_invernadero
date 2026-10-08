# Datos Demo — Proyecto Invernadero

> Para presentaciones, onboarding y pruebas (TEST-07) sin tocar datos reales.

## 1. Archivo

[`sample-mediciones-demo.csv`](./sample-mediciones-demo.csv): **20 filas (T0-P1…T3-P5), fecha `2026-10-09`**, con casos pedagógicos:

- 🟢 Mayoría óptima (pH 6.0–6.8).
- 🟡 `T0-P3` (pH 5.7) y `T2-P4` (pH 5.4) en Atención.
- 🔴 `T1-P2` (pH 7.9) y `T3-P3` (pH 8.1) en Crítico.
- `T2-P3` con `T_Planta_C = N/D` (muestra el gris parcial + `N/D` en Excel).

## 2. Cómo usarlo (2 minutos)

1. Súbelo a Google Sheets (Archivo → Importar) **o** sírvelo local: `python3 -m http.server` en `docs/` y usa `http://localhost:8000/sample-mediciones-demo.csv`.
2. Hoja pública (paso 2 del [FIELD-PROTOCOL](./FIELD-PROTOCOL.md) §4).
3. En la app: Historial → Conectar Google Sheets → pegar URL → debe responder `count: 20`.
4. Dashboard: 16 🟢 + 2 🟡 + 2 🔴. Métricas: promedio pH ≈ 6.4.

## 3. Reglas

- Solo para demo/test; **nunca** mezclar con hojas reales (contamina el conteo y el Excel).
- Si necesitas otro escenario, duplica el archivo con fecha distinta (el historial agrupa por `fecha`).
