# Componentes de frontend

> Ubicación: `src/frontend/components/`. Astro (islas React cuando aplica). Estado a octubre 2026.

---

## `BlobatarAvatar.tsx`

Avatar generado proceduralmente con **Blobatar** (`@blobatar/react`) y seguimiento de mirada (`useGaze`) en dispositivos con puntero fino.

**Props:**

| Prop   | Tipo     | Por defecto | Descripción                                             |
| :----- | :------- | :---------- | :------------------------------------------------------ |
| `name` | `string` | —           | Nombre usado para generar el avatar / letra de fallback |
| `size` | `number` | `40`        | Tamaño en px (cuadrado)                                 |

**Comportamiento:**

- En dispositivos con `hover` y `pointer: fine`, el blob sigue el cursor (`lookAt("pointer")`).
- Si Blobatar falla al cargar, se muestra un círculo degradado con la inicial del nombre.
- Se usa en **Settings → Perfil de Usuario** cuando el usuario no tiene imagen cargada.

**Uso (isla React):**

```astro
<BlobatarAvatar client:load name={userName} size={80} />
```

---

## `SileoProvider.tsx`

Proveedor de notificaciones toast con **Sileo** (`sileo`). Expone la instancia en `window.sileo` para que los scripts Vanilla JS de Astro (p. ej. `Settings.astro`) usen la misma instancia que renderiza el `<Toaster />`.

**Props:** ninguna.

**Uso:** se monta en el layout (`Layout.astro`) para que todo el sitio disponga de toasts:

```astro
<SileoProvider client:load />
```

**Ejemplo desde script de Astro:**

```js
const getSileo = () => (window as any).sileo;
getSileo()?.success({ title: "Operación completada." });
getSileo()?.error({ title: "No se pudo guardar." });
getSileo()?.info({ title: "Preferencia guardada." });
```

---

## `TripsDiagnosticModal.tsx`

Modal de diagnóstico de plagas (trips) integrado con la API ML externa [`macollo-trips-api`](https://github.com/VoctorMCL/macollo-trips-api) (BioCLIP 2.5).

**Funcionalidad:**

- Acceso a cámara (soporta HTTP por IP abriendo la cámara nativa del móvil).
- Captura o selección de imagen.
- Reenvío a `${ML_API_URL}/api/predict` vía `POST /api/trips-diagnosis`.
- Al guardar, sube la foto a la galería de la finca activa (`POST /api/gallery/upload`).

**Endpoints relacionados:**

- `GET  /api/trips-diagnosis` — health check hacia la ML API.
- `POST /api/trips-diagnosis` — proxy de predicción (auth opcional).

Ver [CAMERA-ML](./CAMERA-ML.md) para variables de entorno (`ML_API_URL`, `ML_API_KEY`).

---

## Otros componentes (referencia rápida)

| Componente            | Tipo  | Descripción                                                       |
| :-------------------- | :---- | :---------------------------------------------------------------- |
| `Dashboard.astro`     | Astro | Matriz 4×5 de plantas con promedios y badges agronómicos          |
| `Gallery.astro`       | Astro | Grid de fotos de la finca activa (`object-contain`, autor, fecha) |
| `GalleryDetail.astro` | Astro | Vista ampliada: zoom, descargar, compartir, metadatos             |
| `History.astro`       | Astro | Historial cronológico + import/export Excel/CSV y Google Sheets   |
| `Metrics.astro`       | Astro | Panel agronómico (promedios globales, resumen por fila)           |
| `Navbar.astro`        | Astro | Navegación con selector de finca y badge de rol                   |
| `NoFarm.astro`        | Astro | Pantalla sin finca activa (crear/unirse)                          |
| `Settings.astro`      | Astro | Perfil, preferencias, fincas, notificaciones, zona de peligro     |
| `Welcome.astro`       | Astro | Portada: login/registro (Auth.js Credentials + Google)            |
