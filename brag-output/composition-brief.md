# Hyperframes Composition Brief: Macollo - Monitoreo Agronómico

## Objective

Crear un video promocional de lanzamiento ("Brag Video") de 20 segundos de duración, con alto impacto visual y ritmo dinámico, destacando la propuesta de valor de Macollo: monitoreo planta por planta, semáforos agronómicos y diagnóstico fitosanitario con IA (BioCLIP 2.5).

## Output

- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20 seconds (600 frames at 30fps)

## Source Material

- Project root: `/Users/juandavid/Documents/Proyectos mios/Proyectoinverna`
- Primary files read: `README.md`, `src/frontend/components/Dashboard.astro`, `src/frontend/components/TripsDiagnosticModal.astro`, `src/frontend/styles/global.css`
- Product name: Macollo
- Tagline / strongest claim: "Del sensor a la cosecha: control total de tu finca. Monitoreo planta por planta y diagnóstico con IA (BioCLIP 2.5)."
- Key UI moments to recreate:
  1. Matriz 4×5 (20 plantas) con semáforos verde, amarillo y rojo + widgets de DPV y CO₂.
  2. Modal de Diagnóstico Fitosanitario con láser de escaneo en hoja y resultado de confianza 98.4% de BioCLIP 2.5.
  3. Logo y claim de cierre.
- Copy that must appear verbatim:
  - "Matriz 4×5 en Tiempo Real"
  - "BioCLIP 2.5 • Detección de Trips"
  - "Del sensor a la cosecha: control total de tu finca."

## Creative Direction

- Tone preset: `polished`
- Creative direction: AgTech moderno, cinematográfico y de alto impacto: limpio, tecnológico, creíble y con ritmo musical exacto.
- Interpretation: Tipografía sans geométrica, contrastes oscuros con toques verde esmeralda y lima viva, transiciones milimétricas sincronizadas al beat musical.
- Avoid: Lenguaje corporativo genérico tipo "optimiza flujos de trabajo" o elementos abstractos sin sentido agrícola.

## Visual Identity

- Background: `#0c0a09` (Stone-950)
- Surface Cards: `#1c1917` con bordes `#166534` y `#22c55e40`
- Accent Primary: `#22c55e` (Verde esmeralda)
- Accent Highlight: `#84cc16` (Verde lima brillante)
- Text Primary: `#fafaf9`
- Text Muted: `#a8a29e`
- Font: `Inter, system-ui, -apple-system, sans-serif`

## Storyboard

Seguir rigurosamente la secuencia de 4 escenas detallada en `brag-output/brag-plan.md`:

1. Scene 1 (0.0s - 3.7s): El Gancho — Pregunta inicial y reveal del logo Macollo en beat-locked 1.60s.
2. Scene 2 (3.7s - 9.0s): Matriz 4×5 & Telemetría — La matriz de 20 plantas y tarjetas de CO₂ y DPV en beat-grid (5.80s, 6.34s, 7.38s).
3. Scene 3 (9.0s - 15.0s): Diagnóstico con IA (BioCLIP 2.5) — Escaneo óptico sobre hoja en beat-locked 8.96s y resultado en 12.65s.
4. Scene 4 (15.0s - 20.0s): Outro & Cierre — Resumen de capacidades y claim definitivo en 17.91s.

## Audio

- Audio role: Warm energetic modern electronic bed con clicks y chimes de UI precisos.
- Music: `happy-beats-business-moves-vol-11-by-ende-dot-app.mp3`
- Music treatment: Fade-in rápido de 0.2s, volumen 0.85, fade out suave en 19.5s.
- Audio-coupled moments:
  - 1.60s: Impacto inicial al revelar el logo.
  - 5.80s, 6.34s, 7.38s: Entradas de métricas en la matriz.
  - 9.0s - 12.65s: Escáner HUD y confirmación positiva de detección.
  - 17.91s: Golpe rítmico final con el claim de Macollo.
