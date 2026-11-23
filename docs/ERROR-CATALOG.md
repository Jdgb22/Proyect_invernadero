# Catálogo de Errores y Códigos de Respuesta

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-35**.

## 1. Propósito

Unificar, en un solo lugar, los códigos HTTP, los mensajes y las acciones correctoras de todos los subsistemas. Complementa [TROUBLESHOOTING](./TROUBLESHOOTING.md) (árbol de decisión) y [ENDPOINTS](./ENDPOINTS.md) (contrato por ruta).

## 2. Códigos HTTP usados en el sistema

| Código | Significado general            | Ejemplos en Macollo                                                                |
| :----- | :----------------------------- | :--------------------------------------------------------------------------------- |
| `200`  | Operación correcta             | Lectura de sesión, sincronización, exportación, health online                      |
| `201`  | Recurso creado                 | `POST /api/auth/register`, creación de finca                                       |
| `400`  | Solicitud inválida             | Body Zod inválido, sin finca activa, dueño expulsado,.phone duplicado              |
| `401`  | Sin sesión                     | Middleware para APIs protegidas; `unauthorized()` en handlers                      |
| `403`  | Sin permiso                    | No miembro de la finca, roles insuficientes, usuario sin acceso                    |
| `404`  | No encontrado                  | Usuario inexistente en forgot/reset, foto/finca inexistente                        |
| `409`  | Conflicto                      | Límite de 5 fincas, usuario ya miembro, código de invitación agotado en Some flows |
| `410`  | Recurso expirado               | Invitación expirada/revocada/agotada                                               |
| `422`  | Entidad no procesable          | Sheets inaccessible, CSV vacío, sin registros válidos                              |
| `429`  | Demasiadas peticiones          | Rate limit por IP en register/forgot/reset/login/invitations/use                   |
| `500`  | Error interno                  | Fallo de PostgreSQL, ExcelJS, login de panel ML                                    |
| `502`  | Fallo de pasarela aguas arriba | Cloud Run no responde; SMTP no envió el resumen                                    |
| `503`  | Servicio no disponible         | Health de ML caído                                                                 |

> Los errores `401` del middleware usan `{ message: "No autenticado." }`; los del servicio de ML usan `{ error: "…" }`. No hay un esquema de error único: ver la sección de deuda.

## 3. Errores de autenticación y registro

| Mensaje / código                                                                     | Causa                                                            | Acción                                                                                      |
| :----------------------------------------------------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `Demasiados intentos. Intenta de nuevo en unos segundos.` (`429`, con `Retry-After`) | Superada una regla de `RATE_LIMITED` (`src/middleware.ts:30-37`) | Esperar el número de segundos indicado; en producción revisar IP compartida detrás de proxy |
| `No autenticado.` (`401`)                                                            | Falta de sesión en API protegida                                 | Iniciar sesión; conservar `?desde=` en páginas                                              |
| `El nombre completo es obligatorio.` (`400`)                                         | Zod `name.min(2)` en `register`                                  | Enviar al menos 2 caracteres                                                                |
| `Email o celular inválido o duplicado` (`400`)                                       | validación Zod o unicidad                                        | Usar otro correo/teléfono                                                                   |
| `La contraseña debe tener al menos 8 caracteres` (`400`)                             | Zod `password.min(8)`                                            | Aumentar longitud                                                                           |
| `Agropecuario sin fincaNombre` (`400`)                                               | Tipo de cuenta requiere nombre de finca                          | Enviar `fincaNombre`                                                                        |
| `Código incorrecto o expirado` (`400`)                                               | Token en `verification_token` no coincide o `expires <= NOW()`   | Solicitar un código nuevo                                                                   |
| `No encontramos ninguna cuenta asociada…` (`404`)                                    | `identifier` no existe en `users`                                | Verificar correo/celular                                                                    |

## 4. Errores de fincas, invitaciones y permisos

| Código                                               | Causa probable                                      | Acción                                              |
| :--------------------------------------------------- | :-------------------------------------------------- | :-------------------------------------------------- |
| `403 No tienes permiso para esta acción.`            | `getFincaAccess` devolvió `none` o rol insuficiente | Verificar `finca_miembros` y cookie `finca_activa`  |
| `409 Límite alcanzado: máximo 5 fincas por usuario.` | `MAX_FINCAS_POR_USUARIO` (`farms.ts:26`)            | Archivar o transferir una finca                     |
| `400 No se puede expulsar al dueño de la finca.`     | Intento de `removeMember` sobre `dueno_id`          | No aplicable; el dueño debe transferir              |
| `410`                                                | Invitación inactiva, expirada o sin cupos           | Generar un código nuevo                             |
| `400 Sin finca activa`                               | Cookie ausente o inválida                           | Elegir finca en `/farms` o `POST /api/farms/active` |

## 5. Errores de datos agronómicos

| Síntoma                                                   | Causa                                                  | Consecuencia           | Acción                                                                 |
| :-------------------------------------------------------- | :----------------------------------------------------- | :--------------------- | :--------------------------------------------------------------------- |
| `422 No se pudo acceder a Google Sheets / Drive (HTTP …)` | Documento no público                                   | Sin importación        | Compartir como "Cualquier persona con el enlace" o publicar como CSV   |
| `422 El documento descargado está vacío…`                 | Export CSV sin filas                                   | Sin importación        | Revisar la pestaña activa y el `gid`                                   |
| `422 No se pudieron extraer registros válidos…`           | Cabeceras o IDs de planta no reconocidos               | Sin importación        | Seguir [FIELD-PROTOCOL](./FIELD-PROTOCOL.md)                           |
| `guardadas < count`                                       | Filas con fecha inválida o planta inexistente omitidas | Importación parcial    | Revisar `resolvePlantCoordinates` y columnas                           |
| `success:true, guardadas:0`                               | Fallo de PostgreSQL al insertar, capturado y logueado  | **Pérdida silenciosa** | Revisar logs `[Sync] No se pudieron guardar las lecturas` y reintentar |
| Tarjetas `--` / `Sin mediciones`                          | No hay lecturas para la finca activa                   | UI vacía               | Importar datos o cambiar de finca                                      |
| pH 0 en métricas                                          | Defaults de `pendingMetric` o lectura sin pH           | Sesgo en promedios     | Filtrar `phSuelo > 0` en reportes                                      |

## 6. Errores de clima y servicios externos

| Endpoint / capa             | Respuesta ante fallo                           | Dato devuelto                                    | Advertencia                           |
| :-------------------------- | :--------------------------------------------- | :----------------------------------------------- | :------------------------------------ |
| `GET /api/weather`          | `200` con fallback                             | 22 °C, 60 %, 5 km/h, `source:'Offline Fallback'` | No es medición real                   |
| `GET /api/aqi`              | `200` con fallback                             | AQI 28, Medellín                                 | No es medición real                   |
| `GET /api/siata`            | `500 { error, details }`                       | —                                                | Timeout 3 s; endpoint latente         |
| `GET /api/trips-diagnosis`  | `503 { status:'offline' }`                     | —                                                | Modelo caído o sin cargar             |
| `POST /api/trips-diagnosis` | `502 { error }`                                | —                                                | Sin conexión con Cloud Run            |
| `POST /api/trips-diagnosis` | Código del ML (p. ej. `4xx/5xx`)               | Texto del error remoto                           | Revisar `X-API-Key` y cookie de panel |
| SMTP no configurado         | `sent:false` en recuperación; `502` en resumen | Código impreso en logs (solo/recuperación)       | No apto para producción               |

## 7. Errores de galería y archivos

| Código                                         | Causa                                  | Acción                                                                                        |
| :--------------------------------------------- | :------------------------------------- | :-------------------------------------------------------------------------------------------- |
| `401 No autorizado`                            | Sin sesión al subir                    | Iniciar sesión                                                                                |
| `400 No se proporcionó ningún archivo válido.` | `formData.file` ausente o no es `Blob` | Enviar `multipart/form-data` con campo `file`                                                 |
| `500 Error al guardar la foto en la galería.`  | Fallo de escritura o INSERT            | Revisar permisos de `public/uploads/gallery` y PostgreSQL                                     |
| Imagen no visible tras redeploy                | Filesystem efímero en serverless       | Migrar a almacenamiento de objetos (deuda, ver [OPERATIONS-RUNBOOK](./OPERATIONS-RUNBOOK.md)) |

## 8. Errores de la capa de cliente

| Situación                               | Mecanismo                                           | Resultado                                                    |
| :-------------------------------------- | :-------------------------------------------------- | :----------------------------------------------------------- |
| Cámara bloqueada en HTTP por IP         | `getUserMedia` no disponible                        | El modal usa `input[capture]` (cámara nativa) o "Subir Foto" |
| Geolocalización rechazada/timeout       | `navigator.geolocation`                             | Coordenadas de Medellín                                      |
| Sin conexión                            | Fallback en `fetchWeatherData`                      | Datos climáticos de ejemplo                                  |
| `window.sileo` aún no montado           | Reintentos con 900 ms, máx. 3 (`alerts.ts:120-128`) | Toast puede no mostrarse                                     |
| Preferencias no persisten entre equipos | `localStorage`                                      | Comportamiento esperado; no es error de servidor             |

## 9. Deuda de consistencia del contrato de error

1. No existe un tipo `ApiError` único: conviven `{ message }`, `{ error }`, `{ success:false,error }` y `{ sent:false,message }`.
2. Algunos estados no distinguidos: un fallo de persistencia se reporta como éxito (`sync-sheets.ts:112-126`).
3. Los mensajes de Zod se devuelven en `message`, pero los errores de Sheets en `error`; los clientes deben leer ambos.
4. No hay identificador de correlación (request ID) en respuestas ni en logs. Recomendación: añadir `X-Request-Id` en `middleware.ts` y propagarlo a los `console.error`.

Propuesta de normalización (no implementada): `{ error: { code, message, details?, requestId } }` con `code` estable por dominio (`AUTH_001`, `FARM_003`, `SHEETS_422`, `ML_502`).

## 10. Trazabilidad

| Error        | Código                            | Documento relacionado                         | Verificación                  |
| :----------- | :-------------------------------- | :-------------------------------------------- | :---------------------------- |
| Rate limit   | `src/middleware.ts:30-37,100-127` | [SECURITY](./SECURITY.md)                     | 11 registros seguidos → `429` |
| Registro     | `src/pages/api/auth/register.ts`  | [AUTH](./AUTH.md)                             | Ver [TESTING](./TESTING.md)   |
| Sheets       | `sheetsSync.ts`, `sync-sheets.ts` | [DATA-FLOW](./DATA-FLOW.md)                   | URL inválida → `422`          |
| Persistencia | `readings.ts:123-191`             | [OPERATIONS-RUNBOOK](./OPERATIONS-RUNBOOK.md) | Forzar fallo de BD en staging |
| ML           | `trips-diagnosis.ts`              | [CAMERA-ML](./CAMERA-ML.md)                   | `ML_API_URL` inválida → `503` |
| Clima        | `weather.ts`, `aqi.ts`            | [INTEGRATIONS](./INTEGRATIONS.md)             | Bloquear dominio en DevTools  |
| Galería      | `gallery/upload.ts`               | [COMPONENTS](./COMPONENTS.md)                 | Subir archivo vacío → `400`   |
