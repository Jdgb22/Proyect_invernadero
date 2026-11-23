# Accesibilidad e Internacionalización

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-39**.

## 1. Propósito y alcance

Este documento registra el estado de accesibilidad observable en el marcado y los estilos del proyecto, y distingue lo **verificado en código** de lo que requiere una auditoría con usuarios o herramientas automáticas (axe, Lighthouse, lectores de pantalla). No se reclama conformidad WCAG sin evidencia. La interfaz está en español; la internacionalización se trata en la sección 6.

## 2. Estado verificado en el marcado

| Aspecto                                        | Evidencia                                                                                          | Evaluación                                                                    |
| :--------------------------------------------- | :------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| Idioma del documento                           | Revisar `src/frontend/layouts/Layout.astro` (`<html lang>`)                                        | Verificar que sea `lang="es"`                                                 |
| Botones icono con nombre accesible             | `Navbar.astro:163` `aria-label="Abrir menú"`; `Welcome.astro:37,142,348,534` para audio/contraseña | Patrón correcto en esos puntos                                                |
| Agrupación de opciones de registro             | `Welcome.astro:374-375` `role="radiogroup"` + `aria-label="Tipo de cuenta"`                        | Patrón correcto; revisar que los hijos tengan `role="radio"`/`aria-checked`   |
| Botones de cierre de modales                   | `Metrics.astro:1102,1402` usan `title="Cerrar…"`                                                   | Insuficiente: `title` no siempre expone nombre accesible; añadir `aria-label` |
| Botones sin etiqueta visible en matriz/galería | `Dashboard.astro:36,314,333`, `GalleryDetail.astro:106,133,225,244`                                | Revisar contenido textual o `aria-label`                                      |
| Alternativas textuales de imágenes             | `Navbar.astro:80,143,234`, `Gallery.astro:105,116`, `GalleryDetail.astro:128,153,255` con `alt`    | Presente; revisar que sean descriptivas y no genéricas ("Avatar")             |
| Etiquetas de formulario                        | `Metrics.astro:1477-1560` usa `<label for>`                                                        | Patrón correcto en modal de edición                                           |
| Contraste y tema oscuro                        | Clases `dark:` en `badges.ts` y componentes                                                        | Sin auditoría de ratio de contraste                                           |
| Navegación por teclado / foco                  | No hay gestión explícita de foco en modales                                                        | Revisar: `tabindex`, `focus()`, `Escape` y `aria-modal`                       |
| Escena 3D                                      | Three.js generada por script en `Dashboard.astro`                                                  | Debe ser decorativa (`aria-hidden`) y no bloquear contenido                   |

## 3. Barreras probables

1. **Semáforo por color**: los badges combinan color con etiqueta textual (`Óptimo`, `Crítico`) e icono (🟢/🟡/🔴), lo cual ayuda; conviene añadir `aria-label` que incluya el significado.
2. **Modales sin `role="dialog"`**: los cierres usan `title`, no `aria-label`; no se encontró gestión de foco.
3. **Tablas estilo Excel**: `Metrics.astro` e `History.astro` construyen tablas dinámicas; requieren `<caption>`, `scope="col"` y orden de lectura verificado.
4. **Toasts de Sileo**: deben anunciarse con `aria-live="polite"`; verificar configuración del `<Toaster />` en `SileoProvider.tsx`.
5. **Cámara y geolocalización**: son opcionales y tienen fallback, pero el estado de permiso debe anunciarse textualmente.
6. **Animación de carga**: `public/animated-farmer.svg`, `Loading screen.svg`, `newwelcome.mp4` pueden distraer; respetar `prefers-reduced-motion`.

## 4. Plan de auditoría propuesto

| Paso                       | Herramienta                                                                   | Criterio de salida                           |
| :------------------------- | :---------------------------------------------------------------------------- | :------------------------------------------- |
| 1. Inventario de etiquetas | `grep -R "aria-\|role=\|alt=" src/frontend`                                   | Lista de puntos sin nombre accesible         |
| 2. Automático              | axe-core / Lighthouse en `/`, `/metrics`, `/history`, `/gallery`, `/settings` | 0 errores críticos                           |
| 3. Teclado                 | Recorrido con Tab/Shift+Tab/Escape                                            | Foco visible, sin trampas, cierre de modales |
| 4. Lector de pantalla      | NVDA/VoiceOver en matriz y modal de planta                                    | Cada celda anuncia código, pH y sanidad      |
| 5. Contraste               | Verificación de tokens Tailwind claros/oscuros                                | Ratio ≥ 4.5:1 en texto normal                |
| 6. Movimiento              | Activar `prefers-reduced-motion`                                              | Animaciones reducidas                        |
| 7. Zoom                    | 200 % y 400 % en móvil                                                        | Sin pérdida de información                   |

## 5. Recomendaciones de implementación (pendientes)

```html
<!-- Matriz: celda con información completa para lectores de pantalla -->
<button type="button" aria-label="Planta T2-P4, pH 6.3, sanidad Excelente">
  <span aria-hidden="true">🟢</span>
  <span>T2-P4</span>
</button>

<!-- Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Detalle de planta T2-P4</h2>
  …
</div>

<!-- Escena decorativa -->
<div id="three-scene" aria-hidden="true"></div>
```

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 6. Internacionalización

| Elemento              | Situación                                                                |
| :-------------------- | :----------------------------------------------------------------------- |
| Idioma de la interfaz | Español, textos embebidos en componentes Astro/React                     |
| Capa i18n             | No existe (sin `src/i18n/`, sin diccionarios, sin `astro:i18n`)          |
| Formatos de fecha     | ISO `YYYY-MM-DD` en persistencia; texto libre en importación             |
| Unidades              | °C/°F conmutables en cliente (`src/shared/preferences.ts:47-49,228-242`) |
| Números               | Coma decimal aceptada por `parseCsvNumber` (`csv.ts:60-67`)              |
| Moneda / zona horaria | No aplicables; `timezone=auto` solo en Open-Meteo                        |

Para añadir un segundo idioma haría falta extraer los textos de al menos `Welcome.astro`, `Navbar.astro`, `Dashboard.astro`, `Metrics.astro`, `History.astro`, `Settings.astro`, `Gallery*.astro`, `NoFarm.astro` y los mensajes de las APIs. Está previsto en [ROADMAP](./ROADMAP.md) como deuda de modificabilidad (QM-06 en [QUALITY-ATTRIBUTES](./QUALITY-ATTRIBUTES.md)).

## 7. Trazabilidad

| Aspecto                | Código                                           | Documento relacionado           | Verificación                        |
| :--------------------- | :----------------------------------------------- | :------------------------------ | :---------------------------------- |
| Nombres accesibles     | `Navbar.astro`, `Welcome.astro`, `Metrics.astro` | [COMPONENTS](./COMPONENTS.md)   | `grep -R 'aria-label' src/frontend` |
| Alternativas de imagen | `Gallery.astro`, `GalleryDetail.astro`           | [COMPONENTS](./COMPONENTS.md)   | Revisión manual                     |
| Toasts                 | `SileoProvider.tsx`                              | [COMPONENTS](./COMPONENTS.md)   | Inspect DOM: `aria-live`            |
| Preferencias           | `src/shared/preferences.ts`                      | [USER_MANUAL](./USER_MANUAL.md) | Cambiar unidad en Settings          |
| Auditoría              | Sin herramienta configurada                      | [TESTING](./TESTING.md)         | Lighthouse / axe                    |
