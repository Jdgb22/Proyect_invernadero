# Despliegue y Operación

> Config: `astro.config.mjs` (`output: 'server'`, adaptador `@astrojs/vercel`, `security.checkOrigin: false`, `allowedHosts: true`).
> Última revisión: octubre 2026.

---

## 1. Dónde desplegar

Único objetivo soportado: **Vercel** (adaptador `@astrojs/vercel`). SSR obligatorio: las páginas leen sesión y los endpoints corren en funciones serverless (límite ~10 s; por eso `/api/siata` aborta a los 3 s).

## 2. Variables de entorno (Vercel → Settings → Environment Variables)

| Var | Producción | Notas |
| :--- | :--- | :--- |
| `DATABASE_URL` o `POSTGRES_HOST/PORT/USER/PASSWORD/DATABASE` | ✅ requerida | Apuntar a DB nube (Supabase/Neon/RDS). `client.ts` usa SSL con `rejectUnauthorized: false` en prod. |
| `AUTH_SECRET` | ✅ requerida | `openssl rand -base64 32`. Sin esto el boot falla (`[Auth] Falta AUTH_SECRET`). |
| `AUTH_TRUST_HOST` | ✅ `true` | Tras proxy HTTPS de Vercel. |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Si se usa Google | Registrar en Google Cloud el origen + callback `https://TU_DOMINIO/api/auth/callback/google`. |
| `SMTP_USER` / `SMTP_PASS` | Si hay recuperación email | Gmail: contraseña de aplicación (`myaccount.google.com/apppasswords`). Opcional `SMTP_HOST/PORT/FROM`. |
| `NODE_ENV` | `production` (Vercel lo pone) | Activa SSL de PG y validación estricta de `AUTH_SECRET`. |

`.env` nunca se commitea (ver `.env.example`, `.gitignore`).

## 3. Base de datos en producción

1. Crear instancia Postgres en la nube + BD `invernadero`.
2. Ejecutar `src/db/auth-schema.sql` y luego `src/db/invernadero.sql` (psql o SQL editor del proveedor).
3. Crear el primer usuario: registrarse en la app (nace `Campesino`) y promoverlo:
   ```sql
   UPDATE users SET role = 'Super admin' WHERE email = 'tu@correo.com';
   ```
   (cerrar y reabrir sesión para que el JWT tome el rol).
4. **No usar SQLite local**: las funciones Vercel no tienen disco persistente (ver [ARCHITECTURE](./ARCHITECTURE.md) §6).

## 4. Pasos de despliegue (Vercel)

```bash
pnpm install
pnpm build        # genera ./dist con adaptador Vercel
pnpm preview      # verificación local opcional
```

Conectar el repo en Vercel (framework preset Astro), definir las env vars y desplegar. Cada push a la rama principal redespliega.

## 5. Checklist pre-deploy

- [ ] `pnpm build` en verde local.
- [ ] Env vars de §2 definidas en Vercel (todos los entornos que uses).
- [ ] DB nube migrada (§3) y conectividad probada (logs sin `[PostgreSQL] Error…`).
- [ ] Google OAuth: callback autorizado con el dominio final.
- [ ] SMTP: correo de prueba de recuperación llega (revisar spam).
- [ ] `/api/siata` responde (o cae con `500` controlado, nunca cuelga: timeout 3 s).
- [ ] Probar flujo completo en la URL de preview: registro → login → importar Sheets → exportar Excel → logout.

## 6. Operación y límites conocidos

- **SIATA**: endpoint público `siata.gov.co:8089` sin SLA; ante caída, el proxy responde `500` y `fetchWeatherData()` usa Open-Meteo. Monitorear con chequeo HTTP a `/api/siata`.
- **Sync Sheets**: parsea en la función serverless; CSV gigantes (>~5 MB) pueden superar memoria/tiempo — partir por rangos de fechas.
- **Excel**: se genera por request; descargas concurrentes masivas consumen CPU — sin caché (lleva `no-cache`).
- **Logs útiles**: `[Auth]`, `[Register]`, `[ForgotPassword]`, `[ResetPassword]`, `[PostgreSQL]`, `[Notificaciones - Correo]`.
- **Recuperación sin SMTP**: el código queda en `verification_token` y en logs; en emergencia se puede dictar manualmente y expira en 15 min.
- **Rollback**: redeploy del deployment anterior en Vercel + `pg_dump` previo a migraciones (`pg_dump $DATABASE_URL > backup_$(date +%F).sql`).
