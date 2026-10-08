# Glosario — Proyecto Invernadero (Macollo)

## Agronómico

- **pH del suelo:** acidez/alcalinidad (0–14). Óptimo **6.0–6.8**; alerta 5.5–6.0/6.8–7.2; crítico fuera. Columna `Ph`.
- **Temp. interna (`T_Int_C`):** aire dentro de la nave. Referencia 22–26 °C.
- **Temp. externa (`T_Ext_C`):** aire fuera. Referencia 18–24 °C.
- **Temp. de suelo/planta (`T_Planta_C`):** sustrato donde está la planta. Referencia 19–22 °C. **Null el 29–30-sep-2026** (no se tomó).
- **Humedad (`humedad_Pct`):** relativa % (0–100).
- **Altura (`ALtura_cm`)** → **crecimiento %** (derivado; ≤100 cm directo, si no proporcional).
- **Fase fenológica:** `Desarrollo Vegetativo` / `Floración` / `Llenado de Fruto` / `Maduración`.
- **Sanidad:** `Excelente` / `Saludable` / `Vulnerable` / `Crítica` (semáforo 🟢🟢🟡🔴).
- **Productividad:** `Alta` / `Media` / `Baja`.
- **Matriz:** 4 filas (`t0–t3`, tratamientos) × 5 columnas (`Col 1–5`); códigos `T{f}-P{c}` e IDs `P-01–P-20`.
- **Toma:** medición de campo de un día (rango real 2026-09-14→30).

## Técnico

- **SSR:** render en servidor por request (Astro `output: server`).
- **JWT:** token de sesión con `sub` + `role`; exige re-login tras cambio de rol.
- **Proxy SIATA:** `/api/siata` (evita CORS, timeout 3 s).
- **Dual climático:** SIATA local en Valle de Aburrá, Open-Meteo resto/fallback.
- **CSV-first:** ingesta Sheets sin credenciales vía `export?format=csv`.
- **EAV:** `mediciones` guarda una fila por `(planta, tipo, fecha)` con `tipo_medicion_enum`.
- **AQI:** índice de calidad del aire (waqi.info) mostrado en el Dashboard.
- **MACOLLO:** marca del producto (logo `gulupa.svg`); **Proyecto Invernadero** es el proyecto académico que lo contiene.
