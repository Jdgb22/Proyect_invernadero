# ADR-008: Landing en `/landing` y subdominio diferido

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](../README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **ADR-008**.

> El slug del archivo conserva «subdominio» por la discusión original; la decisión vigente es la que sigue.

## Status

Accepted

## Date

2026-11-23

## Context

Se necesita una landing pública que comunique quiénes somos, qué hacemos, por qué, stack, solución, capacidades y público objetivo. El dominio de producción mencionado al plantear el trabajo era **solo un ejemplo** y aún no está definido; además, el desarrollo se valida en `localhost:4321`.

Publicar la landing con un subdominio inventado habría requerido hardcodear un dominio, añadir una rama por host en el middleware y redirigir `/landing` hacia ese subdominio. Eso deja la página invisible en local y acopla el código a un nombre de dominio que todavía no existe.

## Decision

La landing se sirve en **`src/pages/landing.astro`, en la ruta `/landing`**, accesible en cualquier host, incluido `localhost:4321`:

- `src/middleware.ts` **no cambia**: no hay branch por host, ni redirección de `/landing`, ni allowlist de dominios.
- La página es SSR (no prerenderizada) porque el proyecto usa `output: "server"`.
- El canonical se deriva de la petición (`new URL(Astro.url.pathname, Astro.url).href`) y los CTA apuntan a `/`: no hay dominios hardcodeados.
- La publicación en un subdominio real se **difiere** hasta que se defina el dominio; en ese momento se hará en la configuración del proveedor o con un proyecto estático separado, sin modificar esta página.

## Alternatives Considered

### Publicar ya en un subdominio inventado con branch por host

- Pros: deja la estructura de dominios «lista» de antemano.
- Cons: el dominio es solo un ejemplo; la redirección de `/landing` impide ver la página en localhost; añade lógica de host al middleware y canonical/CTA hardcodeados.
- Rejected: se prefiere una ruta visible y neutral hasta conocer el dominio real (decisión de esta ADR).

### Proyecto Vercel independiente para la landing

- Pros: aislamiento total respecto de la app.
- Cons: segundo pipeline, segundo lockfile y duplicación de assets sin que exista aún un dominio al que apuntar.
- Rejected por ahora: se puede adoptar más adelante sin cambiar el contenido de la página.

### `vercel.json` con rewrites por host

- Pros: configuración declarativa aparente.
- Cons: Vercel desaconseja rewrites de rutas en proyectos Astro (comportamiento inconsistente, no soporte oficial); el adaptador ya genera sus propias rutas.
- Rejected.

### Prerenderizar la landing

- Pros: salida estática más simple.
- Cons: el proyecto es SSR y la ruta debe convivir con el middleware; no aporta beneficios mientras no haya dominio definido.
- Rejected: se mantiene SSR por defecto.

## Consequences

- `/landing` se puede abrir y validar en local sin configuración adicional.
- El mismo deployment sirve la app y la landing; no se toca `astro.config.mjs` ni se crea `vercel.json`.
- Los enlaces siguen funcionando aunque cambie el dominio, porque son relativos.
- Cuando se defina el dominio, habrá que decidir su mapeo (subdominio en el mismo proyecto o proyecto aparte) y actualizar canonical/CTA si se quiere un dominio fijo; esa decisión ameritará un ADR nuevo o una revisión de este.
- El detalle de contenido, diseño y validación está en [LANDING](../LANDING.md) (DOC-47).

## Trazabilidad

| Tema          | Código / configuración                                       | Documento relacionado                            | Verificación                         |
| :------------ | :----------------------------------------------------------- | :----------------------------------------------- | :----------------------------------- |
| Decisión      | `src/pages/landing.astro`, `src/middleware.ts` (sin cambios) | [LANDING](../LANDING.md), [ROUTES](../ROUTES.md) | `curl http://localhost:4321/landing` |
| Configuración | `astro.config.mjs` (sin cambios)                             | [DEPLOYMENT](../DEPLOYMENT.md)                   | `pnpm build`                         |
| Perímetro     | `astro.config.mjs:13`                                        | [SECURITY](../SECURITY.md)                       | Sin lógica de host nueva             |
