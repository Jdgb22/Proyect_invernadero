# ADR-007: Bypass temporal de SIATA (Open-Meteo directo + fallback offline)

## Status

Accepted (temporal — revisitar al volver SIATA)

## Date

2026-10-08

## Context

El servicio SIATA (`siata.gov.co:8089`) quedó fuera de línea o con timeouts. Cada carga del Dashboard pagaba ~3 s esperando el proxy antes de caer al respaldo, degradando la primera pintura del widget climático. Ver ADR-004 (diseño dual original).

## Decision

`fetchWeatherData()` usa **Open-Meteo directo** (`wind_speed_10m` reemplaza a `shortwave_radiation`; `timezone=auto`) con **fallback offline** (22 °C, 60 %, lluvia 0, viento 5 km/h, `source: 'Offline Fallback'`). El proxy `/api/siata`, `fetchSiataPredictions()` e `isValleDeAburra` quedan latentes (sin borrar) para reactivación. Commit `efed143`.

## Alternatives Considered

### Mantener el intento SIATA con timeout menor (1 s)

- Pros: conserva la precisión local cuando SIATA responde lento pero vivo
- Cons: con SIATA caído igual se paga 1 s por carga; el diagnóstico mostró caída total, no lentitud
- Rejected: el bypass total da respuesta instantánea; el timeout de 3 s del proxy sigue como red de seguridad

### Cachear última temp. SIATA en cliente/PG

- Pros: conserva precisión local histórica ante caídas cortas
- Cons: dato obsoleto mostrado como actual (peor que fallback explícito `Offline Fallback`)
- Rejected: el fallback declara su fuente; no finge precisión

### Eliminar el código SIATA

- Pros: menos código muerto
- Cons: la reactivación costaría reescribir proxy + parsing; la intención es temporal
- Rejected: se conserva y documenta como latente

## Consequences

- Widget con **viento (km/h)** en vez de irradiación; `source` siempre `Open-Meteo (Global)` u `Offline Fallback`.
- ADR-004 pasa a **Superseded (parcial, temporal)** por este ADR; reactivar = nuevo ADR + revert de `efed143` en `weather.ts` + TEST-14 contra SIATA.
- `isValleDeAburra` sin uso: no borrar (la usa la reactivación); el linter puede marcarla — aceptado conscientemente.
