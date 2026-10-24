# Glosario — Macollo

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

## Multi-finca y roles de finca

- **Finca:** unidad multi-tenant con 20 plantas (matriz 4×5) y sus `lecturas`. Un usuario puede pertenecer a varias (N:N en `finca_miembros`).
- **Dueño:** quien creó la finca (`finca_miembros.rol_finca='dueno'`); la gestiona (editar, invitar, expulsar) y **solo él** conecta/sincroniza Google Sheets.
- **Miembro:** usuario unido por invitación; lee/registra mediciones (Excel/CSV) pero no configura la finca ni sincroniza Sheets.
- **Staff:** roles de sistema `Superadmin`/`Admin`; ven todas las fincas y operan sus datos sin ser miembros. Su inicio es `/admin` (**Entrar** fija la finca activa).
- **Finca activa:** la finca sobre la que opera la sesión; cookie httpOnly `finca_activa`, revalidada contra la BD en cada API.

## Técnico

- **SSR:** render en servidor por request (Astro `output: server`).
- **JWT:** token de sesión con `sub` + `role`; exige re-login tras cambio de rol.
- **Proxy SIATA:** `/api/siata` (evitaba CORS, timeout 3 s). **Pausado**: sin consumidores internos desde `efed143` (ver ADR-007).
- **Fuente climática actual:** Open-Meteo directo + fallback offline (22 °C/60 %/viento 5 km/h). Widget con **viento (km/h)**, no irradiación.
- **CSV-first:** ingesta Sheets sin credenciales vía `export?format=csv`.
- **Finca / lectura:** cada finca tiene 20 plantas; una `lecturas` guarda una visita a una planta (pH, temperaturas, humedad, altura, fase, sanidad…).
- **AQI:** índice de calidad del aire (waqi.info) mostrado en el Dashboard.
- **MACOLLO:** marca y nombre del proyecto (logo `gulupa.svg`).
