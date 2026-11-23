# Runbook de Operación y Respuesta a Incidentes

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-40**.

## 1. Propósito

Procedimientos accionables para operar Macollo en producción: chequeos periódicos, verificación post-despliegue, respuestas a incidentes, copias de seguridad y rotación de secretos. Complementa [DEPLOYMENT](./DEPLOYMENT.md) (cómo desplegar), [TROUBLESHOOTING](./TROUBLESHOOTING.md) (diagnóstico) y [ERROR-CATALOG](./ERROR-CATALOG.md) (catálogo de síntomas).

## 2. Inventario operativo

| Recurso                              | Dueño            | Verificación                          |
| :----------------------------------- | :--------------- | :------------------------------------ |
| Web (Vercel, `https://macollo.tech`) | Equipo web       | `curl -I https://macollo.tech`        |
| PostgreSQL en la nube                | DBA / equipo web | `psql "$DATABASE_URL" -c 'SELECT 1;'` |
| macollo-trips-api (Cloud Run)        | Equipo ML        | `curl "$ML_API_URL/api/health"`       |
| SMTP / Twilio                        | Equipo web       | Recuperación de prueba                |
| Google Sheets de campo               | Dueño de finca   | Acceso anónimo a la URL export        |
| Dominio y TLS                        | DevOps           | Certificado vigente                   |

## 3. Chequeo diario (10 min)

```bash
# 1. Sitio y cabeceras de seguridad
curl -sSI https://macollo.tech | grep -Ei 'HTTP/|content-security-policy|x-frame-options|strict-transport-security'

# 2. Salud de la API de ML
curl -sS "$ML_API_URL/api/health" | head -c 500

# 3. Base de datos: conexión y actividad reciente
psql "$DATABASE_URL" -c "SELECT count(*) AS usuarios FROM users;"
psql "$DATABASE_URL" -c "SELECT count(*) AS lecturas, max(fecha) AS ultima_fecha FROM lecturas;"

# 4. Errores recientes en Vercel (desde la CLI, si está disponible)
vercel logs macollo --since 1h | grep -Ei 'error|warn|\[Sync\]' | tail -50
```

Criterio de aceptación: `200` en el sitio, `model_loaded: true` (o warm-up disparado), conexión a BD correcta y ausencia de `[Sync] No se pudieron guardar las lecturas` en las últimas 24 h.

## 4. Chequeo semanal

- Revisar `SELECT finca_id, count(*) FROM lecturas GROUP BY finca_id ORDER BY 2 DESC;` para detectar fincas sin datos.
- Verificar usuarios con roles inesperados: `SELECT id, name, role FROM users ORDER BY role, id;`.
- Confirmar que el último Superadmin no esté a punto de ser eliminado.
- Revisar invitaciones activas y expiradas: `SELECT finca_id, count(*) FROM finca_invitaciones WHERE activa AND expira_en > NOW() GROUP BY finca_id;`.
- Comprobar espacio libre en `public/uploads/gallery` (o migrar a object storage; riesgo R-10).
- Repasar el [ERROR-CATALOG](./ERROR-CATALOG.md) y actualizar [CHANGELOG](./CHANGELOG.md).

## 5. Verificación post-despliegue

| #   | Acción                                 | Resultado esperado                              |
| :-- | :------------------------------------- | :---------------------------------------------- |
| 1   | `curl -I https://macollo.tech`         | `200`, cabeceras CSP/HSTS                       |
| 2   | Abrir `/` sin sesión                   | Portada con login/registro                      |
| 3   | Login con cuenta de prueba             | Redirección a `/` o `/admin`                    |
| 4   | `curl /api/farms` sin cookie           | `401`                                           |
| 5   | `GET /api/trips-diagnosis`             | `200` con `status:'online'` o `503` justificado |
| 6   | `GET /api/weather?lat=6.24&lon=-75.58` | JSON con `source` real u offline                |
| 7   | `GET /api/aqi?lat=6.24&lon=-75.58`     | JSON con `data.aqi`                             |
| 8   | Importar hoja de prueba en finca demo  | `guardadas > 0` y matriz actualizada            |
| 9   | Descargar `GET /api/export-excel`      | `.xlsx` con 3 hojas                             |
| 10  | Solicitar recuperación de contraseña   | Correo recibido y `verification_token` creado   |
| 11  | Subir foto desde el modal              | Fila en `photos` e imagen visible en `/gallery` |

## 6. Incidentes frecuentes

### 6.1 No carga el tablero / datos vacíos

1. Confirmar finca activa: `GET /api/farms/active` con la cookie de sesión.
2. Consultar lecturas de esa finca: `SELECT count(*) FROM lecturas WHERE finca_id = N;`.
3. Si hay lecturas pero no se muestran, revisar `plantas` (deben ser 20) y `responsable` (columna añadida por migración 002).
4. Si no hay lecturas, sincronizar desde `/history`.
5. Escalar a [TROUBLESHOOTING](./TROUBLESHOOTING.md).

### 6.2 La sincronización dice éxito pero no hay datos

Síntoma conocido: `success:true, guardadas:0` (`sync-sheets.ts:112-126`). Buscar en logs:

```text
[Sync] No se pudieron guardar las lecturas: …
```

Verificar permisos DDL/INSERT del rol de BD y repetir. Si el problema se repite, abrir incidente P1: es pérdida silenciosa de datos.

### 6.3 Diagnóstico de trips caído

1. `curl "$ML_API_URL/api/health"`.
2. Si `503`, revisar Cloud Run (revisión, memoria, escalado a cero) y reintentar health para disparar `/api/warmup`.
3. Si `401` en `/api/predict`, rotar cookie del panel: el proxy renueva sesión automáticamente, pero puede fallar si cambiaron las credenciales por defecto (R-01).
4. Si `502`, verificar `ML_API_URL` en Vercel y que la foto no supere los límites de la función.

### 6.4 Fuerza bruta o abuso de endpoints

1. Revisar reglas en `src/middleware.ts:30-37`: 10 registro, 8 forgot/reset, 20 login, 15 invitaciones por IP en 300 s.
2. Bloquear IP en el proveedor de borde si continúa.
3. Considerar migrar el contador a Redis (R-08).

## 7. Copias de seguridad y restauración

```bash
# Backup lógico completo (programar diario, retención 30 días)
pg_dump "$DATABASE_URL" -Fc -f "macollo_$(date +%F_%H%M).dump"

# Backup solo esquema
pg_dump "$DATABASE_URL" --schema-only -f "macollo_schema_$(date +%F).sql"

# Restauración en entorno de prueba
createdb macollo_restore
pg_restore -d macollo_restore "macollo_$(date +%F_%H%M).dump"

# Verificación posterior
psql -d macollo_restore -c "SELECT count(*) FROM fincas; SELECT count(*) FROM lecturas;"
```

**Antes de cualquier migración destructiva** se debe ejecutar un backup y registrar el hash del archivo. Procedimiento de migraciones en [MIGRATIONS](./MIGRATIONS.md).

## 8. Rotación de secretos

| Secreto                               | Dónde cambiar            | Efecto                                                 |
| :------------------------------------ | :----------------------- | :----------------------------------------------------- |
| `AUTH_SECRET`                         | Vercel + `.env`          | **Invalida todas las sesiones**; avisar a los usuarios |
| `DATABASE_URL`                        | Vercel + proveedor de BD | Reinicio de conexiones del pool                        |
| `ML_API_KEY`                          | Cloud Run + Vercel       | Sin rotar en ambos lados → `401` desde el ML           |
| `ML_ADMIN_USER` / `ML_ADMIN_PASSWORD` | Cloud Run + Vercel       | El proxy debe autenticarse de nuevo                    |
| `SMTP_PASS` / `TWILIO_AUTH_TOKEN`     | Vercel + proveedor       | Afecta recuperación y resúmenes                        |
| `WAQI_TOKEN`                          | Vercel + proveedor       | AQI caerá al fallback 28                               |
| `GOOGLE_CLIENT_SECRET`                | Google Cloud + Vercel    | Afecta solo OAuth                                      |

La rotación debe hacerse en ventanas de bajo uso y verificarse con el chequeo post-despliegue.

## 9. Gestión de incidentes

| Nivel | Definición                                             | Tiempo de respuesta | Ejemplo                              |
| :---- | :----------------------------------------------------- | :------------------ | :----------------------------------- |
| P1    | Pérdida de datos o acceso bloqueado a todas las fincas | Inmediato           | `guardadas:0` generalizado, BD caída |
| P2    | Función crítica degradada                              | < 4 h               | ML caído, Sheets no sincroniza       |
| P3    | Impacto parcial                                        | < 1 día laborable   | AQI en fallback, foto no visible     |
| P4    | Mejora / deuda                                         | Próximo sprint      | Auditoría de accesibilidad           |

Formato de registro: `fecha · nivel · síntoma · endpoint afectado · causa raíz ·Acción correctiva · responsable · verificación`.

## 10. Observabilidad: brechas

| Necesidad           | Estado actual                   | Recomendación                                       |
| :------------------ | :------------------------------ | :-------------------------------------------------- |
| Logs centralizados  | `console.*` en Vercel/Cloud Run | Agregar proveedor con retención y búsqueda          |
| Request ID          | No existe                       | `X-Request-Id` en middleware y propagación          |
| Métricas de negocio | No existen                      | Importaciones/día, plantas críticas, latencia ML    |
| Alertas             | No existen                      | Umbral de 5xx y de `guardadas:0`                    |
| Trazas distribuidas | No existen                      | OpenTelemetry en Vercel + Cloud Run                 |
| Health agregado     | Solo `/api/health` de ML        | Endpoint `/api/health` local con BD + integraciones |

## 11. Trazabilidad

| Procedimiento       | Código / config                     | Documento relacionado               | Verificación                |
| :------------------ | :---------------------------------- | :---------------------------------- | :-------------------------- |
| Chequeo post-deploy | `astro.config.mjs`, `middleware.ts` | [DEPLOYMENT](./DEPLOYMENT.md)       | Sección 5                   |
| Backup              | `src/db/*.sql`                      | [DATABASE](./DATABASE.md)           | `pg_restore` en staging     |
| Incidentes ML       | `trips-diagnosis.ts`                | [CAMERA-ML](./CAMERA-ML.md)         | `curl /api/trips-diagnosis` |
| Incidentes datos    | `readings.ts`, `sync-sheets.ts`     | [DATA-FLOW](./DATA-FLOW.md)         | Consultas SQL               |
| Secretos            | `.env.example`, `.husky/pre-commit` | [SECURITY](./SECURITY.md)           | Rotación trimestral         |
| Errores             | Todo el sistema                     | [ERROR-CATALOG](./ERROR-CATALOG.md) | Catálogo + AT-01…AT-08      |
