# Troubleshooting (Runbook) — Proyecto Invernadero

> Síntoma → causa probable → fix. Profundidad dev en [README](../README.md) y [DEPLOYMENT](./DEPLOYMENT.md).

## Auth

| Síntoma | Fix |
| :--- | :--- |
| `Credenciales incorrectas` siempre | Verificar usuario en PG: `SELECT id,name,email,role FROM users WHERE LOWER(email)=LOWER('x');` El login acepta email, **nombre** o teléfono. |
| `CredentialsSignin` en consola | Contraseña ≠ hash o hash no bcrypt (`$2a$/$2b$`). Resetear vía forgot/reset. |
| Google OAuth falla | `GOOGLE_CLIENT_ID/SECRET` + callback `https://DOMINIO/api/auth/callback/google` autorizado en Google Cloud. |
| `[Auth] Falta AUTH_SECRET` | Definir `AUTH_SECRET` (`openssl rand -base64 32`) en `.env`/Vercel. |
| Rol no cambia tras `UPDATE` | Re-login (JWT no se refresca solo). |
| Registro dice rol X pero queda `Campesino` | Comportamiento real (seguridad): promover con `UPDATE users SET role='Agronomo' WHERE email='…';` |

## Datos

| Síntoma | Fix |
| :--- | :--- |
| Tarjetas grises `--`/`N/D` | Sin dataset: Historial → importar Excel/CSV o Sheets. |
| Sheets `422` lectura | Compartir como *"Cualquier persona con el enlace"* o *"Publicado como CSV"*; probar el `export?format=csv` en incógnito. |
| Sheets `0 registros` | Revisar cabeceras (`ID_planta`, `fecha`, `T_Ext_C`, `T_Int_C`, `humedad_Pct`, `T_Planta_C`, `Ph`, `ALtura_cm`) y que haya filas bajo ellas. |
| Export vacío/500 | Ver logs `Error al generar Excel`; confirmar sesión y dataset cargado. |
| Widget clima vacío | Revisar permiso de ubicación; probar `curl /api/siata`; sin red externa solo falla el widget, el resto funciona. |
| Canvas 3D negro | Esperar carga de Three.js / recargar; desactivar bloqueadores de WebGL. |

## Base de datos

| Síntoma | Fix |
| :--- | :--- |
| `[PostgreSQL] Error…` / `connectionTimeout` | `psql $DATABASE_URL -c 'SELECT 1';` revisar host/puerto/firewall y SSL en prod. |
| `relation users does not exist` | Falta migrar: `psql $DATABASE_URL -f src/db/auth-schema.sql` (+ `invernadero.sql`). |
| `duplicate key email` en registro | Esperado si el correo existe (400 guiado, no bug). |
| Códigos de recuperación huérfanos | `DELETE FROM verification_token WHERE expires < NOW();` |

## Build/Deploy

| Síntoma | Fix |
| :--- | :--- |
| `pnpm build` falla (tipos `sileo`, etc.) | Errores pre-existentes conocidos en `signin.astro`; no bloquear docs por ellos, registrar issue. |
| Vercel 500 en todo | Env vars incompletas (empezar por `AUTH_SECRET` + DB) y revisar logs `[Auth]/[PostgreSQL]`. |
| Funciona local, falla en Vercel | DB `localhost` en env de Vercel (usar PG nube) o `AUTH_TRUST_HOST` sin definir. |

## Recolección para reportar un bug

Incluir: URL/ruta, rol, fecha-hora, mensaje exacto (o `details` del JSON), logs servidor (`[Auth]/[Register]/[PostgreSQL]/…`) y, si es datos, la fila del CSV implicada.
