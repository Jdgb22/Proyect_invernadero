# Política de Seguridad — Macollo

> Detalle técnico en [AUTH](./AUTH.md). Decisiones en ADR-003/006. Última revisión: octubre 2026.

## 1. Secretos (regla dura)

Nunca en código, PRs, logs ni Sheets: `AUTH_SECRET`, `SMTP_PASS`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`, tokens (AQI). Solo `.env` local (no commiteado) y env vars de Vercel. El **pre-commit Husky** bloquea `.env`/`credentials`/`secret` en staging + prettier vía `lint-staged`.

## 2. Controles implementados

| Capa         | Control                                                                                                                    |
| :----------- | :------------------------------------------------------------------------------------------------------------------------- |
| Transporte   | HSTS (`max-age=1a, includeSubDomains`), `trustHost` + fix proxy, SSL PG en prod                                            |
| Navegador    | `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, `CSP` (middleware)                    |
| Rutas        | Middleware protege páginas y APIs; cada handler revalida sesión + autorización de finca (Zero Trust)                       |
| Rate-limit   | Ventana deslizante por IP en `register`, `forgot/reset-password`, `callback/credentials`, `invitations/use`                |
| Input        | Zod `safeParse` en `register`, `sync-sheets`, `export-excel`                                                               |
| Credenciales | bcrypt salt 10, solo hashes `$2a$/$2b$`; recuperación con código 6 dígitos/15 min + destino enmascarado; contraseña mín. 8 |
| Sesión       | JWT firmado (`AUTH_SECRET` obligatorio en prod), rol releído de BD en cada operación, cookies seguras tras proxy           |
| Multi-tenant | Datos por finca (`finca_id`); cookie `finca_activa` httpOnly validada contra membresía; invitaciones atómicas y revocables |
| Errores      | `register`/`forgot`/`reset` devuelven mensajes genéricos para no filtrar existencia de cuentas                             |
| SSRF/abuso   | `sync-sheets` exige sesión + **dueño** de la finca; `siata` exige sesión                                                   |

## 3. Riesgos conocidos y backlog (ordenado)

| ID     | Riesgo                                                                | Estado / Mitigación                                                                       |
| :----- | :-------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| SEC-01 | Handlers sensibles sin verificar sesión                               | **Resuelto**: sesión + autorización dentro de cada handler y en middleware.               |
| SEC-02 | Middleware solo protegía `/dashboard`                                 | **Resuelto**: protege páginas y APIs reales con redirect / `401`.                         |
| SEC-03 | Token AQI expuesto en cliente                                         | **Resuelto**: `/api/siata` es proxy servidor y exige sesión.                              |
| SEC-04 | Contraseña mínima inconsistente (servidor ≥ 6)                        | **Resuelto**: mínimo 8 en cliente y servidor.                                             |
| SEC-05 | Sin rate-limit en `register`/`forgot-password`                        | **Resuelto**: `rateLimit` por IP (en memoria; migrar a Redis si escala).                  |
| SEC-06 | Etiquetas de rol comparaban `'admin'` vs `'Admin'`                    | **Resuelto**: se compara contra el enum de 4 roles.                                       |
| SEC-07 | `rateLimit` en memoria (se reinicia con el proceso / multi-instancia) | Migrar a Redis/Upstash en despliegues con varias instancias.                              |
| SEC-08 | Credenciales de BD rotadas tras exposición histórica                  | Rotar `POSTGRES_PASSWORD`/`DATABASE_URL` y `AUTH_SECRET`; verificar `.env` no versionado. |

## 4. Reporte de vulnerabilidades

Canal: issue privado al equipo o correo del admin (no hacerlo público). Incluir: ruta, rol, pasos, impacto y PoC. Ventana objetivo de fix crítico: 72 h + entrada en [CHANGELOG](./CHANGELOG.md).
