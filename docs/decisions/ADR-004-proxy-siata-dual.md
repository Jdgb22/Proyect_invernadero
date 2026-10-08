# ADR-004: Proxy interno `/api/siata` + estrategia dual SIATA/Open-Meteo

## Status

Superseded (parcial, temporal) por ADR-007

## Date

2026-09-10

## Context

El panel necesita temperatura local precisa en Medellín (red SIATA) y cobertura fuera de ella. Los navegadores bloquean `fetch` directo a `siata.gov.co:8089` por CORS, y el endpoint público no tiene SLA.

## Decision

- `GET /api/siata` proxyea `estacionesTemperatura/20` desde el servidor (timeout/abort 3 s, `Access-Control-Allow-Origin: *`).
- `fetchWeatherData(lat, lon)`: si `isValleDeAburra` (bbox 6.00–6.50 / -75.75–-75.40) combina temp SIATA + resto Open-Meteo; si no, o ante fallo, solo Open-Meteo (`America/Bogota`). Ver `src/backend/services/weather.ts`.

## Alternatives Considered

### Fetch directo a SIATA desde el cliente

- Pros: sin código servidor
- Cons: bloqueado por CORS en todos los navegadores modernos
- Rejected: técnicamente inviable

### Solo Open-Meteo global

- Pros: una sola dependencia, SLA y formato estables
- Cons: pierde la precisión de la red local donde está el cultivo real
- Rejected como única fuente; queda como respaldo (gratis, sin API key)

### Cachear SIATA en PG/cron

- Pros: resiliencia ante caídas, histórico propio
- Cons: infraestructura de cron + invalidación que hoy no necesitamos (el clima se muestra, no se audita)
- Rejected por ahora; reconsiderar si el clima alimenta alertas automáticas

## Consequences

- `source` visible (`SIATA (Valle de Aburrá)` vs `Open-Meteo (Global)`): el usuario sabe de dónde viene el dato.
- Ante caída de SIATA el panel sigue funcionando (500 controlado → fallback), nunca cuelga.
- Clima con geolocalización + fallback Medellín y refresco 10 min en el Dashboard.
