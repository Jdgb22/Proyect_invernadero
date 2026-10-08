# Política de Seguridad — Proyecto Invernadero (Macollo)

> Detalle técnico en [AUTH](./AUTH.md). Decisiones en ADR-003/006. Última revisión: octubre 2026.

## 1. Secretos (regla dura)

Nunca en código, PRs, logs ni Sheets: `AUTH_SECRET`, `SMTP_PASS`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`, tokens (AQI). Solo `.env` local (no commiteado) y env vars de Vercel. El **pre-commit Husky** bloquea `.env`/`credentials`/`secret` en staging + prettier vía `lint-staged`.

## 2. Controles implementados

| Capa         | Control                                                                                                 |
| :----------- | :------------------------------------------------------------------------------------------------------ |
| Transporte   | HSTS (`max-age=1a, preload`), `trustHost` + fix proxy, SSL PG en prod                                   |
| Navegador    | `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `CSP` base (middleware)                          |
| Input        | Zod `safeParse` en `register`, `sync-sheets`, `export-excel` (Zero Trust)                               |
| Credenciales | bcrypt salt 10, solo hashes `$2a$/$2b$`; recuperación con código 6 dígitos/15 min + destino enmascarado |
| Sesión       | JWT firmado (`AUTH_SECRET` obligatorio en prod), rol en token, cookies seguras tras proxy               |

## 3. Riesgos conocidos y backlog (ordenado)

| ID     | Riesgo                                                                                | Mitigación futura                                                     |
| :----- | :------------------------------------------------------------------------------------ | :-------------------------------------------------------------------- |
| SEC-01 | Handlers sensibles (`export-excel`, `sync-sheets`) sin verificar sesión internamente  | `getSession` en handler o guarda en middleware (AUTH §7)              |
| SEC-02 | Middleware solo protege `/dashboard` (inexistente)                                    | Proteger `/metrics`, `/historial`, `/settings` + redirect a `/signin` |
| SEC-03 | Token AQI demo expuesto en cliente                                                    | Rotar y mover a proxy servidor como `/api/siata`                      |
| SEC-04 | Servidor acepta clave ≥ 6 (cliente ≥ 8)                                               | Unificar a 8 en Zod                                                   |
| SEC-05 | Sin rate-limit en `register`/`forgot-password` (spam/abuso, costo SMTP)               | Throttle por IP + cooldown por identifier                             |
| SEC-06 | Etiqueta de rol compara `'admin'` vs `'Admin'` (cosmético, confunde auditoría visual) | Comparar contra el enum                                               |

## 4. Reporte de vulnerabilidades

Canal: issue privado al equipo o correo del admin (no hacerlo público). Incluir: ruta, rol, pasos, impacto y PoC. Ventana objetivo de fix crítico: 72 h + entrada en [CHANGELOG](./CHANGELOG.md).
