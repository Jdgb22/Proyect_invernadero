# Modelo de Amenazas y Superficie de Ataque

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-36**.

## 1. Propósito y método

Este documento aplica una revisión STRIDE (**S**poofing, **T**ampering, **R**epudiation, **I**nformation disclosure, **D**enial of service, **E**levation of privilege) a los componentes descritos en [SYSTEM-CONTEXT](./SYSTEM-CONTEXT.md). Cada hallazgo se clasifica por severidad y se vincula a una mitigación existente o a una recomendación. complementa [SECURITY](./SECURITY.md) (política) y [ERROR-CATALOG](./ERROR-CATALOG.md) (síntomas).

## 2. Activos a proteger

| Activo                                                                      | Clasificación             | Ubicación                                            |
| :-------------------------------------------------------------------------- | :------------------------ | :--------------------------------------------------- |
| Credenciales de usuario (hash bcrypt)                                       | Confidencial              | `users.password`                                     |
| `AUTH_SECRET`, `ML_API_KEY`, `SMTP_PASS`, `TWILIO_AUTH_TOKEN`, `WAQI_TOKEN` | Crítico                   | Variables de entorno (y, en parte, código: ver R-01) |
| Datos agronómicos por finca                                                 | Confidencial / integridad | `lecturas`, `plantas`                                |
| Fotos de cultivo                                                            | Confidencial              | `public/uploads/gallery/`, `photos`                  |
| Sesión JWT y cookie `finca_activa`                                          | Crítico                   | Navegador                                            |
| Código de recuperación de 6 dígitos                                         | Crítico / tiempo limitado | `verification_token`, correo/SMS                     |

## 3. Matriz STRIDE por componente

|     Componente      |   S   |   T   |   R   |   I   |   D   |   E   | Mitigaciones existentes                                      |
| :-----------------: | :---: | :---: | :---: | :---: | :---: | :---: | :----------------------------------------------------------- |
|   Navegador / API   | Media | Media | Baja  | Media | Alta  | Media | `checkOrigin`, CSP, rate limit, HTTPS/HSTS                   |
|     Middleware      | Baja  | Media | Media | Baja  | Media | Alta  | `getSession`, headers, proxy fix (ver R-05)                  |
|    Auth.js / JWT    | Media | Baja  | Media | Alta  | Media | Alta  | Rol releído de BD, bcrypt, JWT firmado                       |
| Fincas y membresías | Baja  | Alta  | Media | Alta  | Baja  | Alta  | `getFincaAccess`, cookie httpOnly, handlers revalidan        |
| Importación Sheets  | Media | Alta  | Alta  | Media | Alta  | Media | `422`, parser tolerante; **sin validación de URL** (R-03)    |
|       Galería       | Baja  | Alta  | Alta  | Alta  | Alta  | Media | Sesión + extensión por MIME; **sin límite de tamaño** (R-04) |
|      Proxy ML       | Alta  | Media | Media | Alta  | Alta  | Baja  | `X-API-Key` en servidor; **secretos por defecto** (R-01)     |
|     Correo/SMS      | Media | Baja  | Media | Alta  | Media | Baja  | Código de 15 min, token de un solo uso                       |

## 4. Registro de riesgos

| ID   | Riesgo                                                                                                     | Severidad | Estado                | Evidencia                                                       | Recomendación                                                                                                                            |
| :--- | :--------------------------------------------------------------------------------------------------------- | :-------- | :-------------------- | :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| R-01 | Clave de API de ML y credenciales del panel ML embebidas como valores por defecto                          | **Alta**  | Abierto               | `trips-diagnosis.ts:15-19,54-55`                                | Variables obligatorias sin fallback; rotar credenciales; mover a secret manager                                                          |
| R-02 | Token de WAQI embebido como valor por defecto                                                              | Media     | Abierto               | `aqi.ts:8-9`                                                    | Exigir `WAQI_TOKEN`; ocultar en logs; considerar proxy con cache                                                                         |
| R-03 | SSRF: `POST /api/sync-sheets` acepta cualquier cadena y el servidor hace `fetch` de ella                   | **Alta**  | Abierto               | `sync-sheets.ts:33-35,56-64`                                    | Validar `z.string().url()`, permitir solo hosts `docs.google.com`/`drive.google.com`, bloquear redes privadas, timeout y límite de bytes |
| R-04 | Subida de archivos sin límite de tamaño, sin validación de contenido ni de propiedad de finca en la cookie | Media     | Abierto               | `gallery/upload.ts:30-68`                                       | Límite (p. ej. 10 MB), magic bytes, `getFincaAccess()` sobre la cookie, almacenamiento externo                                           |
| R-05 | Reescritura de `context.request` y `process.env.AUTH_URL` desde cabeceras `x-forwarded-*`                  | Media     | Parcial               | `src/middleware.ts:77-96`                                       | Confiar solo en proxies conocidos; validar host contra lista blanca; no mutar `process.env` por petición                                 |
| R-06 | CSP con `'unsafe-inline'` en `script-src` y `style-src`                                                    | Media     | Aceptado              | `src/middleware.ts:49-61`                                       | Nonces/hashes por build; mover estilos inline a hojas externas                                                                           |
| R-07 | SSL con `rejectUnauthorized:false` en producción                                                           | Media     | Aceptado              | `src/db/client.ts:22-25,36-39`                                  | Usar CA del proveedor o `sslmode=verify-full`                                                                                            |
| R-08 | Rate limit en memoria por proceso                                                                          | Media     | Aceptado              | `src/backend/services/rateLimit.ts`                             | Redis/Upstash para coherencia entre instancias serverless                                                                                |
| R-09 | Persistencia de premisas de seguridad en `localStorage`                                                    | Baja      | Aceptado              | `src/shared/preferences.ts:22-40`                               | No almacenar datos sensibles; ya se cumple                                                                                               |
| R-10 | Fotos en filesystem local bajo serverless                                                                  | Media     | Abierto               | `gallery/upload.ts:65-68`                                       | Object storage (S3/R2/Blob) + CDN                                                                                                        |
| R-11 | Sin suite de pruebas ni escaneo de dependencias en CI                                                      | Media     | Abierto               | No hay `*.test.*`; `.husky/pre-commit` solo Prettier + secretos | Añadir Vitest, `pnpm audit`, SAST en CI                                                                                                  |
| R-12 | Los mensajes de error del ML incluyen texto remoto (`errText`)                                             | Baja      | Abierto               | `trips-diagnosis.ts:148-156`                                    | Sanitizar y no devolver stack traces al cliente                                                                                          |
| R-13 | Eliminación física de finca y cuentas                                                                      | Media     | Mitigado              | Solo `Superadmin`; protección al último Superadmin y a dueños   | Doble confirmación en UI y registro de auditoría                                                                                         |
| R-14 | Hard-delete de historial de lecturas                                                                       | Media     | Mitigado por permisos | `DELETE /api/farms/:id/readings`, dueño/staff                   | Soft delete o papelera con retención                                                                                                     |

## 5. Controles implementados (evidencia)

| Control                                                            | Evidencia                                      |
| :----------------------------------------------------------------- | :--------------------------------------------- |
| Contraseñas hasheadas con bcrypt                                   | `src/pages/api/auth/register.ts`               |
| Rol revalidado desde BD en cada handler                            | `src/backend/services/authz.ts:50-73`          |
| Autorización por finca y miembro                                   | `src/backend/services/authz.ts:91-129`         |
| Cookie de finca `HttpOnly`, `SameSite=Lax`, `Secure` en producción | `src/backend/services/authz.ts:140-143`        |
| Rate limiting por IP en 5 rutas sensibles                          | `src/middleware.ts:30-37`                      |
| Cabeceras de seguridad y HSTS condicional                          | `src/middleware.ts:39-74`                      |
| Validación Zod en registro, perfil y Sheets                        | `register.ts`, `users/me.ts`, `sync-sheets.ts` |
| Hook pre-commit de secretos                                        | `.husky/pre-commit:5-10`                       |
| CheckOrigin de Astro                                               | `astro.config.mjs:13`                          |

## 6. Escenarios de abuso y prueba

| ID    | Escenario                                           | Prueba sugerida                              | Resultado esperado hoy                |
| :---- | :-------------------------------------------------- | :------------------------------------------- | :------------------------------------ |
| AT-01 | Usuario sin sesión llama a `/api/farms`             | `curl -i /api/farms`                         | `401`                                 |
| AT-02 | Miembro intenta cambiar rol de otro usuario         | `PATCH /api/admin/users/:id` con ese usuario | `403`                                 |
| AT-03 | Campesino intenta sincronizar Sheets en finca ajena | `POST /api/sync-sheets`                      | `403`                                 |
| AT-04 | 11 intentos fallidos de login                       | Bucle `curl`                                 | `429` con `Retry-After`               |
| AT-05 | URL `http://127.0.0.1:5432` en `sync-sheets`        | `POST /api/sync-sheets`                      | **Se intenta fetch** (riesgo R-03)    |
| AT-06 | Subida de 500 MB                                    | `curl -F file=@grande.bin`                   | **Se intenta escribir** (riesgo R-04) |
| AT-07 | Código de recuperación reutilizado                  | Segundo `POST /api/auth/reset-password`      | `400`                                 |
| AT-08 | Hard delete de finca por `Admin`                    | `DELETE /api/farms/:id`                      | `403` (solo Superadmin)               |

## 7. Priorización de remediación

1. **Inmediata**: R-01, R-02 (rotar secretos y exigir variables), R-03 (whitelist de hosts en Sheets).
2. **Corto plazo**: R-04, R-05, R-11.
3. **Medio plazo**: R-06, R-07, R-08, R-10, R-14.
4. **Aceptado con seguimiento**: R-09, R-12, R-13.

## 8. Trazabilidad

| Riesgo     | Código                                         | Documento relacionado       | Verificación               |
| :--------- | :--------------------------------------------- | :-------------------------- | :------------------------- |
| Secretos   | `trips-diagnosis.ts`, `aqi.ts`, `.env.example` | [SECURITY](./SECURITY.md)   | `grep -R "mk_\|b3e64" src` |
| SSRF       | `sync-sheets.ts`, `sheetsSync.ts`              | [ENDPOINTS](./ENDPOINTS.md) | AT-05                      |
| Subidas    | `gallery/upload.ts`                            | [CAMERA-ML](./CAMERA-ML.md) | AT-06                      |
| Roles      | `authz.ts`, `admin/users/[id].ts`              | [AUTH](./AUTH.md)           | AT-02, AT-03               |
| Rate limit | `rateLimit.ts`, `middleware.ts`                | [TESTING](./TESTING.md)     | AT-04                      |
| Headers    | `middleware.ts:39-74`                          | [SECURITY](./SECURITY.md)   | `curl -I`                  |
