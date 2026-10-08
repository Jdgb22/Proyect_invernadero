# ADR-002: PostgreSQL en la nube como base de datos

## Status
Accepted

## Date
2026-09-01

## Context
Datos relacionales: usuarios↔cuentas OAuth↔sesiones↔tokens, y a futuro plantas↔mediciones↔responsables con consultas analíticas (promedios, históricos). El despliegue (ADR-001) es serverless sin disco persistente y el panel debe verse remotamente.

## Decision
PostgreSQL 17 en la nube (Supabase/Neon/RDS) vía `pg.Pool` (`src/db/client.ts`, SSL en producción). Esquemas en `src/db/auth-schema.sql` (auth, activo) e `invernadero.sql` (agronómico, objetivo — ver DATABASE.md §5).

## Alternatives Considered

### SQLite local
- Pros: cero config, ideal embebido
- Cons: archivo efímero en serverless, sin acceso remoto multiusuario
- Rejected: solo viable si el panel corriera offline en una Raspberry del invernadero (escenario descartado)

### Firebase Realtime Database
- Pros: latencia mínima para telemetría continua
- Cons: modelo no relacional, consultas analíticas pobres, lock-in
- Rejected: nuestro acceso es por tomas diarias + agregados, no streaming; se reevaluaría con IoT en vivo (ver ARCHITECTURE §6)

### Supabase vs RDS genérico
- Pros Supabase: Postgres gestionado + editor SQL, arranque rápido para el equipo
- Cons: menos control fino que RDS
- Accepted con flexibilidad: el código solo exige Postgres (`DATABASE_URL`/`POSTGRES_*`), el proveedor es intercambiable

## Consequences
- Auth persiste en PG hoy; el dataset agronómico vive en memoria hasta migrar Sheets→PG (brecha documentada, no deuda oculta).
- Pool `max: 20`, timeouts cortos; migraciones con `psql -f` (sin ORM).
- Backup con `pg_dump` antes de cada jornada de campo.
