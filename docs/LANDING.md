# Landing Pública de Macollo

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-47**.

## 1. Propósito

Este documento describe la landing pública de Macollo: dónde vive, qué información comunica, cómo se diseñó y cómo se validó. La decisión sobre su publicación está en [ADR-008](./decisions/ADR-008-landing-subdominio.md).

## 2. Ubicación y enrutamiento

| Elemento     | Valor                                                                   | Evidencia                                 |
| :----------- | :---------------------------------------------------------------------- | :---------------------------------------- |
| Página       | `src/pages/landing.astro`                                               | Ruta de archivos de Astro                 |
| URL actual   | `/landing`, accesible en **cualquier host** (incluido `localhost:4321`) | Sin lógica de host en `src/middleware.ts` |
| Renderizado  | SSR (`output: "server"` en `astro.config.mjs`)                          | Sin `prerender` explícito                 |
| Canonical    | Se deriva de la petición: `new URL(Astro.url.pathname, Astro.url).href` | En local: `http://localhost:4321/landing` |
| CTA a la app | Relativo `/`                                                            | Funciona en local y en cualquier dominio  |

No hay dominios hardcodeados ni redirecciones por host. Cuando se defina el dominio definitivo, la landing podrá publicarse tal cual en `/landing` o enlazarse desde un subdominio mediante configuración del proveedor; no hará falta tocar la página. La decisión de diferir ese paso está registrada en [ADR-008](./decisions/ADR-008-landing-subdominio.md).

## 3. Contenido comunicado

La landing responde a las preguntas requeridas, en este orden:

| Sección       | Contenido                                                                            |
| :------------ | :----------------------------------------------------------------------------------- |
| Hero          | Propuesta de valor y mock de la matriz 4×5 con semáforo; no son datos en vivo        |
| Ticker        | Capacidades destacadas (20 plantas, trazabilidad, IA, multi-finca, Sheets/CSV/Excel) |
| Problema      | Datos dispersos, decisiones a ciegas y detección tardía de trips                     |
| Solución      | Tres pasos: traer lecturas → mirar el semáforo → actuar con evidencia                |
| Qué hacemos   | Matriz, métricas, historial, multi-finca, galería y diagnóstico con IA               |
| Por qué       | Trazabilidad, umbrales visibles y acceso por roles; contadores animados              |
| Para quién    | Campesino, Agropecuario y staff (Admin/Superadmin)                                   |
| Stack         | Versiones reales del repositorio por capa (interfaz, aplicación, datos, IA/clima)    |
| Quiénes somos | Equipo e ilustración con `static-farmer.svg`                                         |
| CTA final     | Enlace a la app (`/`) y a las capacidades de la propia landing                       |

El equipo, las versiones del stack y las capacidades se verificaron contra el repositorio y la documentación existente. El mock del hero está rotulado como representación visual, no como lectura real.

## 4. Diseño y accesibilidad

- **Paleta:** superficie `#f4fce3`, verde profundo `#062c16`, bordes `#104d28`/`#166534`, acento verde→lima (`#22c55e`, `#84cc16`) y neutros `stone`. Son los colores literales ya usados en `Navbar.astro`, `Dashboard.astro` y `Metrics.astro`.
- **Tipografía:** stack del sistema; no se carga Inter porque la CSP solo permite `font-src 'self' data:`.
- **Movimiento:** reveal-on-scroll con `IntersectionObserver`, contadores eased, float/ticker y hover states. Todo se desactiva con `prefers-reduced-motion`.
- **Responsive:** breakpoint a 980 px y 640 px; menú móvil con `aria-expanded`/`aria-controls`.
- **Accesibilidad:** enlace de salto, foco visible, `aria-label` en la matriz decorativa y etiquetas de texto junto al color del semáforo en la sección «Con Macollo».
- **Assets:** reutiliza `public/gulupa.svg`, `public/gulupa.png` y `public/static-farmer.svg`; no añade dependencias ni fuentes externas.
- **Aislamiento:** no reutiliza `Layout.astro`, para no arrastrar toasts, tema ni lógica de sesión de la app.

## 5. Sesión y enlaces

- Todos los enlaces internos son anclas o rutas relativas; el único enlace a la app es `/`.
- No hay formularios `POST` cruzados: con `security.checkOrigin: true` (`astro.config.mjs:13`), un POST entre dominios distintos sería rechazado con `403`.
- La landing no consume sesión ni cookies de la app; el CTA lleva al usuario a la portada de la aplicación.

## 6. Validación ejecutada

| Comprobación                         | Resultado                                                               |
| :----------------------------------- | :---------------------------------------------------------------------- |
| `curl http://localhost:4321/landing` | `200`, título de la landing y canonical `http://localhost:4321/landing` |
| `curl http://localhost:4321/`        | `200` (app intacta)                                                     |
| Playwright 1440×900 y 390×844        | Sin errores de consola, sin overflow horizontal, menú móvil funcional   |
| `astro check`                        | 0 errores, 0 advertencias (14 hints preexistentes)                      |
| `pnpm build`                         | Correcto; `/landing` queda como ruta SSR (`^/landing/?$ → _render`)     |

## 7. Trazabilidad

| Tema        | Código / configuración                                   | Documento relacionado                                | Verificación                                   |
| :---------- | :------------------------------------------------------- | :--------------------------------------------------- | :--------------------------------------------- |
| Página      | `src/pages/landing.astro`                                | [ROUTES](./ROUTES.md), [COMPONENTS](./COMPONENTS.md) | `curl` + Playwright + `astro check`            |
| Middleware  | `src/middleware.ts` (sin cambios)                        | [SECURITY](./SECURITY.md)                            | App y landing funcionan en el mismo deployment |
| Decisión    | [ADR-008](./decisions/ADR-008-landing-subdominio.md)     | [DOC-CONVENTIONS](./DOC-CONVENTIONS.md)              | Índice y manifiesto actualizados               |
| Publicación | Configuración del proveedor, cuando se defina el dominio | [DEPLOYMENT](./DEPLOYMENT.md)                        | Pendiente de dominio definitivo                |
