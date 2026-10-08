# ADR-001: Astro en modo SSR desplegado en Vercel

## Status
Accepted

## Date
2026-09-01

## Context
Necesitamos una app web con páginas por rol/sesión y una API (auth, Excel, Sheets, proxy SIATA) sin operar dos despliegues. Requisitos: render según sesión en servidor, API routes en el mismo origen (evita CORS propio), despliegue simple con previews por rama. Equipo: 6 personas, sin capacidad de ops dedicada.

## Decision
Astro 7.2.8 con `output: 'server'`, adaptador `@astrojs/vercel`, integraciones `auth()` y `react()`. File-based routing en `src/pages/` para vistas y `/api/*` para backend.

## Alternatives Considered

### SPA (Vite + React) + API separada
- Pros: ecosistema React puro, interactividad total en cliente
- Cons: dos despliegues, CORS entre front/back, SEO y primera carga peores, más ops
- Rejected: sobredimensionado para paneles de lectura con islas de interactividad puntuales

### Astro estático + serverless aparte
- Pros: CDN barato para el front
- Cons: la sesión y los endpoints sensibles igual exigen servidor; se pierde `getSession` en SSR
- Rejected: duplica superficie sin beneficio (igual necesitamos cómputo por request)

### Next.js
- Pros: SSR maduro, equipo lo conoce parcialmente
- Cons: mayor peso de runtime y costo Vercel para el mismo alcance; Astro islas dan mejor rendimiento con menos JS
- Rejected: Astro cubre el caso con menor huella

## Consequences
- `src/pages/` es a la vez vistas y API; la convención debe respetarse (ver ROUTES.md).
- Todo lo sensible corre en funciones serverless (~10 s límite): el proxy SIATA aborta a 3 s por esto.
- Se requiere Postgres en la nube (sin disco local). Ver ADR-002.
