# Roadmap — Macollo

> Origen: RF-20…22, SEC-01…06, brechas de AUTH/DATABASE. Actualizar al cerrar cada item (mover a CHANGELOG).

## v1.1 — Endurecimiento y persistencia (completado)

- [x] **SEC-01/02**: sesión verificada en handlers + middleware protege `/metrics`, `/history`, `/settings`, `/farms`, `/gallery`, `/admin` (redirect a `/` con `?desde=`).
- [x] **SEC-04/05**: Zod password `min(8)` + rate-limit en `register`/`forgot-password`/`reset-password`/`callback`.
- [x] **SEC-03**: proxy servidor para AQI en `/api/aqi` y clima en `/api/weather`.
- [x] **RF-21 (persistencia)**: `POST /api/sync-sheets` persiste en `lecturas` (idempotente por finca+planta+fecha+hora); lecturas scopeadas por finca en Dashboard, Métricas e Historial.
- [x] **CU-005 (exportación CSV)**: endpoint `GET /api/export-csv` implementado para descarga de historial completo por finca.
- [ ] **TESTING §4**: Vitest con `resolvePlantCoordinates`, `parseCSV`, schemas Zod.
- [x] Unificar etiqueta de rol (`'Admin'`, `'Superadmin'`, `'Agropecuario'`, `'Campesino'`).

## v1.2 — Agronomía operativa

- [ ] **RF-20**: umbrales configurables + avisos (CU-004/AD-002 dejan de ser propuesta).
- [ ] Filtros avanzados por métrica en Historial.
- [ ] Reactivar SIATA (revert `efed143` + ADR que cierre ADR-007) o retirarlo del todo (borrar proxy + `siata.ts` + ADR de retiro).

## v2.0 — IoT y escala

- [ ] **RF-22**: ingesta ESP32/Arduino (WebSocket/MQTT → `lecturas`); reevaluar Firebase si hay streaming real.
- [ ] Multi-invernadero (`invernadero` deja de ser constante).
- [ ] Roles granulares en UI (Sheets ya es **dueño-only**; pendiente pulir permisos de finca en la interfaz).
