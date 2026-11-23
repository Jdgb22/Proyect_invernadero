# Migraciones de Esquema y Evolución de la Base de Datos

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-44**.

## 1. Propósito

Describir el orden seguro de aplicación del esquema, las migraciones disponibles, los ajustes que la aplicación realiza en caliente y los procedimientos de verificación y reversión. Complementa [DATABASE](./DATABASE.md) (estructura actual) y [DEPLOYMENT](./DEPLOYMENT.md) (despliegue).

## 2. Orden de aplicación

```bash
# 1. Dominio de autenticación (crea users, accounts, sessions, verification_token, enum)
psql "$DATABASE_URL" -f src/db/auth-schema.sql

# 2. Dominio agronómico (fincas, memb resías, invitaciones, plantas, lecturas)
psql "$DATABASE_URL" -f src/db/greenhouse-schema.sql

# 3. Migraciones incrementales (idempotentes)
psql "$DATABASE_URL" -f src/db/migrations/001-roles-farms.sql
psql "$DATABASE_URL" -f src/db/migrations/002-add-responsable-to-lecturas.sql
psql "$DATABASE_URL" -f src/db/migrations/003-add-sheets-url-to-fincas.sql
```

> El esquema agronómico base ya incluye `responsable`, `responsable_id` y `sheets_url`; las migraciones 002 y 003 existen para bases creadas con versiones anteriores. Ejecutarlas sobre una base actual es inofensivo (`IF NOT EXISTS`).

## 3. Catálogo de migraciones

| Archivo                               | Propósito                                                                                                                 | Sentencia clave                                                   | Idempotente | Aplicar cuándo                  |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------- | :---------- | :------------------------------ |
| `001-roles-farms.sql`                 | Renombra valores antiguos del enum (`Super admin`→`Superadmin`, `Agronomo`→`Agropecuario`) y crea/ajusta tablas de fincas | `ALTER TYPE ... RENAME VALUE` condicional                         | Sí          | Bases con roles legacy          |
| `002-add-responsable-to-lecturas.sql` | Añade autor de la medición                                                                                                | `ALTER TABLE lecturas ADD COLUMN IF NOT EXISTS responsable TEXT;` | Sí          | Bases sin columna `responsable` |
| `003-add-sheets-url-to-fincas.sql`    | Persiste la URL de Sheets por finca                                                                                       | `ALTER TABLE fincas ADD COLUMN IF NOT EXISTS sheets_url TEXT;`    | Sí          | Bases sin columna `sheets_url`  |

## 4. Ajustes en caliente desde la aplicación

El código ejecuta DDL ligero de forma defensiva. Es una decisión práctica para entornos donde el pipeline de migraciones no está automatizado; tiene implicaciones de permisos (ver R-07 en [THREAT-MODEL](./THREAT-MODEL.md)).

| Función                      | Ubicación                               | Sentencia                                                        | Comportamiento si falla                                 |
| :--------------------------- | :-------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------ |
| `ensureResponsableColumn()`  | `src/backend/services/readings.ts:9-21` | `ALTER TABLE lecturas ADD COLUMN IF NOT EXISTS responsable TEXT` | Registra flag en memoria y continúa; la app no se rompe |
| `ensureFincasSheetsColumn()` | `src/pages/api/sync-sheets.ts:20-31`    | `ALTER TABLE fincas ADD COLUMN IF NOT EXISTS sheets_url TEXT`    | Igual que arriba                                        |

Ambas usan una variable module-scope para ejecutar la comprobación una sola vez por proceso. En serverless con muchas instancias, cada una lo intentará una vez.

## 5. Scripts de apoyo

| Script                        | Uso                                                                         | Efecto                                                 |
| :---------------------------- | :-------------------------------------------------------------------------- | :----------------------------------------------------- |
| `scripts/migrate-neon.mjs`    | Aplica esquemas/migraciones a una cadena de conexión Neon/PostgreSQL remota | Lee `DATABASE_URL`/argumentos; crea tablas y columnas  |
| `scripts/seed-admin.mjs`      | Crea/actualiza cuenta privilegiada                                          | Solicita `ADMIN_EMAIL`, `ADMIN_PASSWORD`, rol opcional |
| `scripts/seed-demo.mjs`       | Siembra "Finca demo" con 20 plantas y lecturas                              | Datos de ejemplo para demos                            |
| `scripts/seed-production.mjs` | Siembra datos base de producción                                            | Requiere revisión explícita antes de ejecutar          |

Detalle de variables y precauciones en [SCRIPTS](./SCRIPTS.md).

## 6. Procedimiento de migración en producción

1. **Aviso**: ventana de bajo uso;notificar a los dueños de finca.
2. **Backup**: `pg_dump "$DATABASE_URL" -Fc -f "pre_migracion_$(date +%F_%H%M).dump"` y guardar el SHA256.
3. **Ensayo**: restaurar en `macollo_staging` y aplicar la migración allí.
4. **Verificación en staging**: consultas de la sección 7 + recorrido de las rutas afectadas.
5. **Aplicación**: ejecutar la migración en producción con el mismo orden del §2.
6. **Verificación post**: repetir consultas y ejecutar el chequeo de [OPERATIONS-RUNBOOK](./OPERATIONS-RUNBOOK.md) §5.
7. **Registro**: actualizar [CHANGELOG](./CHANGELOG.md) y esta guía.

## 7. Consultas de verificación

```sql
-- Tablas esperadas
SELECT table_name FROM information_schema.tables
WHERE table_schema='public'
  AND table_name IN ('users','accounts','sessions','verification_token',
                     'fincas','finca_miembros','finca_invitaciones','plantas','lecturas','photos')
ORDER BY table_name;

-- Columnas nuevas
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name='lecturas' AND column_name IN ('responsable','responsable_id');
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name='fincas' AND column_name='sheets_url';

-- Roles exactos
SELECT unnest(enum_range(NULL::user_role_enum)) AS rol;

-- Integridad de la matriz (debe dar 20 para cada finca)
SELECT f.id, f.nombre, count(p.id) AS plantas
FROM fincas f LEFT JOIN plantas p ON p.finca_id=f.id
GROUP BY f.id, f.nombre ORDER BY f.id;

-- Unicidad de lecturas (debe devolver 0)
SELECT finca_id, planta_id, fecha, hora, count(*)
FROM lecturas GROUP BY 1,2,3,4 HAVING count(*) > 1;

-- Invitaciones consistentes (no debería devolver filas)
SELECT * FROM finca_invitaciones
WHERE usos_usados > usos_maximos OR expira_en < NOW() AND activa;
```

## 8. Reversión

| Situación                                     | Acción                                                                       |
| :-------------------------------------------- | :--------------------------------------------------------------------------- |
| Migración `ADD COLUMN` sin datos dependientes | `ALTER TABLE … DROP COLUMN …;` tras confirmar que ningún handler la usa      |
| Renombrado de enum                            | Recrear el valor anterior solo si no hay datos que lo usen; requiere cuidado |
| Carga masiva incorrecta                       | `ROLLBACK` si está en transacción; si no, restaurar desde backup             |
| Peor caso                                     | Restaurar dump completo en una BD nueva y cambiar `DATABASE_URL`             |

**No existe un mecanismo de down automático**: todas las migraciones se consideran forward-only. Cualquier reversión se documenta en el CHANGELOG.

## 9. Riesgos específicos

1. Un rol de BD sin permisos DDL hace que los `ensure...` fallen silenciosamente; la columna debe crearse con la migración.
2. `ALTER TABLE` Bloquea la tabla brevemente; en tablas grandes programar fuera de horario hábil.
3. `gen_random_uuid()` requiere la extensión `pgcrypto` en versiones antiguas de PostgreSQL.
4. `sheets_url` guarda una URL proporcionada por el usuario; junto con R-03 (SSRF) conviene validarla antes de persistir.
5. Los backups lógicos no incluyen archivos de `public/uploads/gallery`.

## 10. Trazabilidad

| Elemento            | Código                          | Documento relacionado                         | Verificación                  |
| :------------------ | :------------------------------ | :-------------------------------------------- | :---------------------------- |
| Esquema base        | `src/db/*.sql`                  | [DATABASE](./DATABASE.md)                     | Consultas §7                  |
| Migraciones         | `src/db/migrations/*`           | [DATABASE](./DATABASE.md)                     | `psql -f` en staging          |
| Ajustes en caliente | `readings.ts`, `sync-sheets.ts` | [DATA-FLOW](./DATA-FLOW.md)                   | Revisar logs                  |
| Neon                | `scripts/migrate-neon.mjs`      | [SCRIPTS](./SCRIPTS.md)                       | Ejecutar con cadena de prueba |
| Backup              | `pg_dump`                       | [OPERATIONS-RUNBOOK](./OPERATIONS-RUNBOOK.md) | `pg_restore`                  |
| Cambios             | `git log`                       | [CHANGELOG](./CHANGELOG.md)                   | Revisión por release          |
