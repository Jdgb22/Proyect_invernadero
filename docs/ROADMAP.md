# Roadmap — Proyecto Invernadero (Macollo)

> Origen: RF-20…22, SEC-01…06, brechas de AUTH/DATABASE. Actualizar al cerrar cada item (mover a CHANGELOG).

## v1.1 — Endurecimiento y persistencia (siguiente)

- [ ] **SEC-01/02**: sesión verificada en handlers + middleware protege `/metrics`, `/historial`, `/settings` (redirect `/signin`).
- [ ] **SEC-04/05**: Zod password `min(8)` + rate-limit en `register`/`forgot-password`.
- [ ] **SEC-03**: proxy servidor para AQI (rotar token demo).
- [ ] **RF-21**: `POST /api/sync-sheets` persiste en `mediciones` (idempotente por planta+fecha+tipo) + `GET /api/metrics` desde PG + backfill 2026-09-14→30. Requiere ADR (supersede ADR-005 parcial).
- [ ] **TESTING §4**: Vitest con `resolvePlantCoordinates`, `parseCSV`,schemas Zod (exportar helpers privados primero).
- [ ] Unificar etiqueta de rol (`'Admin'` vs `'admin'`, SEC-06).

## v1.2 — Agronomía operativa

- [ ] **RF-20**: umbrales configurables + avisos (CU-004/AD-002 dejan de ser propuesta).
- [ ] Exportación CSV real (completar CU-005) y filtros por métrica en Historial.
- [ ] Reactivar SIATA (revert `efed143` + ADR que cierre ADR-007) o retirarlo del todo (borrar proxy + `siata.ts` + ADR de retiro).

## v2.0 — IoT y escala

- [ ] **RF-22**: ingesta ESP32/Arduino (WebSocket/MQTT → `mediciones`); reevaluar Firebase si hay streaming real.
- [ ] Multi-invernadero (`invernadero` deja de ser constante).
- [ ] Roles granulares en UI (hoy: tag cosmético + Sheets solo-Admin implícito).
