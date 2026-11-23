# Preguntas Frecuentes (FAQ)

> Verificado contra el código el 2026-11-23. Documento rector: [docs/README.md](./README.md). Parte de la documentación unificada (`docs/UNIFIED/MACOLLO-DOCUMENTACION-UNIFICADA.md`). Identificador: **DOC-45**.

## 1. Para usuarios de campo

### ¿Por qué veo `--` o "Sin mediciones" en el tablero?

Porque la finca activa no tiene lecturas en `lecturas`. Ve a `/history`, importa un Excel/CSV o conecta una Google Sheets pública. Fuente: [DATA-FLOW](./DATA-FLOW.md) §3.

### ¿Quién puede conectar una Google Sheets?

Cualquier persona con acceso a la finca: el dueño, un miembro invitado o el staff (Superadmin/Admin). La comprobación real es `canConnectSheets()` en `src/backend/services/authz.ts:127-129`. Las versiones antiguas de la documentación decían "solo el dueño"; estaba desactualizado.

### ¿Qué permisos debe tener la hoja?

Debe ser legible por cualquiera con el enlace o estar publicada como CSV. Macollo no usa credenciales de Google para leerla. Si falla, la API responde `422` con instrucciones ([ERROR-CATALOG](./ERROR-CATALOG.md) §5).

### ¿La frecuencia de sincronización de Settings hace que lleguen datos automáticamente?

No. Es una preferencia de refresco de la interfaz (1/5/15/60 min). No existe ingesta IoT automática; está en el [ROADMAP](./ROADMAP.md). Fuente: `src/shared/preferences.ts:91-100`.

### ¿Puedo usar la cámara desde el celular si entro por `http://IP`?

Sí, pero no con `getUserMedia`: el modal detecta el contexto no seguro y abre la cámara nativa mediante `input[capture]`. También puedes elegir "Subir Foto". Para `getUserMedia` real necesitas HTTPS. Ver [CAMERA-ML](./CAMERA-ML.md).

### ¿Por qué las fotos desaparecen después de un despliegue?

Porque se guardan en `public/uploads/gallery/` del servidor; en Vercel el filesystem es efímero. Es una deuda conocida (R-10). Ver [OPERATIONS-RUNBOOK](./OPERATIONS-RUNBOOK.md).

### ¿Qué significan los colores del semáforo?

Verde = Excelente/Saludable u Óptimo (pH 6.0–6.8); amarillo = Vulnerable o pH en atención (5.5–7.2); rojo = Crítico; gris = sin datos. Umbrales en `src/shared/badges.ts`.

### ¿Puedo cambiar mi correo desde Settings?

No. El correo es solo lectura; el nombre y el avatar sí se editan (`PATCH /api/users/me`). Para cambiar el correo, contacta al administrador.

### ¿El resumen semanal llega automáticamente?

El botón de Settings envía un resumen bajo demanda. La marca de "último envío" y la preferencia viven en `localStorage`, así que no hay un cron del servidor que lo dispare por ti.

## 2. Para desarrolladores

### ¿Dónde está el dashboard?

En `/`. No existe `/dashboard`. La portada cambia según sesión y rol: `Welcome`, tablero, `NoFarm` o panel `/admin` para staff sin finca. Ver [ROUTES](./ROUTES.md).

### ¿Por qué el rol del JWT puede quedar desactualizado?

El token incluye el rol, pero los handlers lo releen de PostgreSQL (`getAuthUser`). Tras cambiar un rol en `/admin`, el usuario debe cerrar sesión y volver a entrar para que la UI muestre la etiqueta nueva.

### ¿Qué es `finca_activa`?

Una cookie `HttpOnly`, `SameSite=Lax` y `Secure` en producción con 30 días de validez. Determina el scope de lecturas, fotos y mayoría de endpoints. Fuente: `src/backend/services/authz.ts:137-160`.

### ¿Hay tests automatizados?

No. No hay archivos `*.test.*` ni configuración de Vitest/Jest. La verificación es manual según [TESTING](./TESTING.md). Es un riesgo abierto R-11.

### ¿Por qué el generador del PDF falla si añado un Markdown nuevo?

Porque el manifiesto exige que **todos** los `.md` de `docs/` estén declarados. Hay que añadirlo a `docs/UNIFIED/manifest.json`, al índice [README](./README.md) y regenerar. Ver [DOC-CONVENTIONS](./DOC-CONVENTIONS.md).

### ¿Cómo se generan los diagramas del PDF?

No se renderizan como imagen: se conserva su código Mermaid en un bloque monoespacio rotulado. Para verlos graficados, abre los `.md` en un visor con soporte Mermaid (GitHub, VS Code).

### ¿Qué hash usa bcrypt y cuánto duran los códigos de recuperación?

bcrypt con salt 10 y código de 6 dígitos válido 15 minutos en `verification_token`. Ver [AUTH](./AUTH.md).

### ¿Qué pasa si falla la inserción de lecturas durante una sincronización?

Se loguea el error pero la respuesta HTTP sigue siendo `success:true` con `guardadas:0`. Es un comportamiento a corregir; documentado como pérdida silenciosa en [ERROR-CATALOG](./ERROR-CATALOG.md) §5 y [DATA-FLOW](./DATA-FLOW.md) §3.

### ¿Dónde están las capturas de pantalla del índice antiguo?

Ahora están en `docs/capturas/` (CAP-01…CAP-08) y se incrustan en el PDF unificado como DOC-46. Se generan con Playwright, sin Astro Admin ni `/admin`; la corrección de deriva #8 se actualizó en [DOC-CONVENTIONS](./DOC-CONVENTIONS.md).

### ¿Puedo ejecutar `pnpm astro check` en CI?

Sí; es la validación de tipos disponible. El hook de Husky solo ejecuta Prettier y bloquea secretos, no reemplaza a `astro check`.

## 3. Para evaluadores

### ¿Qué entregable resume todo el sistema?

El [Resumen Ejecutivo](./EXECUTIVE-SUMMARY.md) y el PDF unificado en `docs/UNIFIED/Macollo-Documentacion-Unificada.pdf`.

### ¿Cómo se demuestra la conexión entre requisitos y código?

Con la [Matriz de Trazabilidad](./TRACEABILITY-MATRIX.md): RF → CU/US → archivo de código → endpoint → verificación → documento.

### ¿Qué decisiones arquitectónicas están justificadas?

Siete ADR en [decisions](./decisions/): SSR en Vercel, PostgreSQL cloud, Auth.js JWT, proxy SIATA dual, Sheets CSV, bcrypt+recuperación y bypass de SIATA.

### ¿Cuál es la deuda técnica más crítica?

Secretos por defecto (R-01/R-02), SSRF en `sync-sheets` (R-03), ausencia de pruebas (R-11) y storage efímero de fotos (R-10). Detalle en [THREAT-MODEL](./THREAT-MODEL.md).

## 4. Trazabilidad

| Pregunta        | Código                                      | Documento relacionado                   | Verificación       |
| :-------------- | :------------------------------------------ | :-------------------------------------- | :----------------- |
| Permisos Sheets | `authz.ts:127-129`                          | [AUTH](./AUTH.md)                       | Probar con miembro |
| Datos vacíos    | `readings.ts`                               | [USER_MANUAL](./USER_MANUAL.md)         | Importar fixture   |
| Cámara HTTP     | `TripsDiagnosticModal.astro`                | [CAMERA-ML](./CAMERA-ML.md)             | Prueba en celular  |
| Frecuencia      | `preferences.ts:91-100`                     | [ROADMAP](./ROADMAP.md)                 | Settings           |
| Errores de sync | `sync-sheets.ts:112-126`                    | [ERROR-CATALOG](./ERROR-CATALOG.md)     | Revisar logs       |
| PDF             | el generador de documentación (no incluido) | [DOC-CONVENTIONS](./DOC-CONVENTIONS.md) | `pdfinfo`          |
