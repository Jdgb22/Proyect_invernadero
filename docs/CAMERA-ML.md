# Cámara y Machine Learning — Detección de Trips (BioCLIP 2.5)

> ADR-008: servicio externo de ML para detección de plagas vía cámara del celular.

## Contexto

El cultivo de Gulupa (_Passiflora edulis_) en invernadero requiere monitoreo constante de trips (_Thysanoptera: Thripidae_), una plaga que causa "cacarizado" o "roña" en los frutos y rechazo automático para exportación. El monitoreo manual es lento y depende de la experiencia del agrónomo.

## Decisión

Se usa un **microservicio Python independiente** ([macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api), FastAPI + BioCLIP 2.5) que recibe fotos tomadas con el celular y devuelve un diagnóstico fitosanitario en JSON. Macollo (Astro) actúa como **cliente y proxy SSR**; no ejecuta el modelo.

### ¿Por qué un servicio separado?

1. **BioCLIP 2.5 requiere ~4 GB de RAM** — no puede correr dentro de Vercel Functions ni serverless.
2. **Python + PyTorch** son el ecosistema estándar para ML.
3. **Independencia de despliegue** — la web puede actualizarse sin afectar el modelo y viceversa.
4. **La API key queda en el servidor** — el navegador nunca llama directamente al servicio ML.

## Repositorio de la API

**→ [https://github.com/VoctorMCL/macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api)**

Ahí está documentado el modelo, los endpoints, las variables de entorno, los tests y el despliegue del servicio. Este documento describe únicamente cómo **Macollo se conecta** a esa API.

## Arquitectura de la integración

```text
Celular / navegador
        │  POST /api/trips-diagnosis  (multipart: file, temperature_c, crop)
        ▼
Astro SSR — src/pages/api/trips-diagnosis.ts
        │  POST ${ML_API_URL}/api/predict  (header X-API-Key)
        ▼
macollo-trips-api (FastAPI + BioCLIP 2.5) — puerto 8000
        │
        ▼
JSON con diagnóstico (is_thrips, etapa, recomendaciones…)
```

Al capturar o subir una foto desde el modal, el navegador también hace `POST /api/gallery/upload` para guardarla en la galería de la **finca activa**.

## Configuración

Variables en `.env` (o en el panel de Vercel):

| Variable     | Obligatoria | Descripción                                                             | Default                                                       |
| :----------- | :---------- | :---------------------------------------------------------------------- | :------------------------------------------------------------ |
| `ML_API_URL` | No          | URL base del servicio ML.                                               | `http://127.0.0.1:8000` (o `PUBLIC_API_URL` si está definida) |
| `ML_API_KEY` | Recomendada | Se envía como cabecera `X-API-Key`. Debe coincidir con la del servicio. | — (sin cabecera)                                              |

> El código también acepta los alias `PUBLIC_API_URL`, `API_KEY` y `ML_X_API_KEY`, pero lo recomendado es usar `ML_API_URL` y `ML_API_KEY`.

## Levantar el servicio ML

Sigue el README de [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api). Resumen:

```bash
git clone https://github.com/VoctorMCL/macollo-trips-api.git
cd macollo-trips-api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
./run_server.sh          # uvicorn en 0.0.0.0:8000
```

Comprobar que responde:

```bash
curl http://127.0.0.1:8000/api/health
```

## Levantar Macollo

```bash
pnpm dev            # local: http://localhost:4321
pnpm run dev:lan    # red local: http://<IP-LAN>:4321
```

Los dos servidores conviven en puertos distintos:

| Servicio          | Puerto |
| :---------------- | :----- |
| Macollo (Astro)   | `4321` |
| macollo-trips-api | `8000` |

## Endpoints que expone Macollo

### `GET /api/trips-diagnosis`

Health check contra la API de ML. Respuesta:

- `200` → `{ status: "online", ml_service: {...} }`
- `503` → `{ status: "offline", message }` si no responde.

### `POST /api/trips-diagnosis`

Recibe `multipart/form-data`:

| Campo           | Tipo   | Obligatorio | Descripción                     |
| :-------------- | :----- | :---------- | :------------------------------ |
| `file`          | Blob   | Sí          | Imagen de la muestra (JPG/PNG). |
| `temperature_c` | number | No          | Temperatura ambiental (°C).     |
| `crop`          | string | No          | Cultivo; por defecto `gulupa`.  |

Reenvía a `${ML_API_URL}/api/predict` y devuelve el JSON del servicio ML con el mismo código HTTP. Si el ML devuelve error, responde `502`/código del ML con `{ error }`.

### Endpoints del servicio ML (referencia)

| Método | Ruta                   | Descripción                               |
| :----- | :--------------------- | :---------------------------------------- |
| GET    | `/api/health`          | Estado del servicio y modelo              |
| POST   | `/api/predict`         | Análisis de una foto (endpoint principal) |
| GET    | `/api/gallery`         | Estado de la galería de referencia        |
| POST   | `/api/gallery/upload`  | Subir foto de referencia                  |
| POST   | `/api/gallery/reindex` | Reindexar galería                         |
| GET    | `/api/gulupa-handbook` | Manual técnico MIP                        |

Para bodies, respuestas y códigos exactos, consultar la documentación del repositorio [macollo-trips-api](https://github.com/VoctorMCL/macollo-trips-api).

## Uso desde el celular

1. Ambos equipos/servidores en la misma Wi-Fi.
2. Arranca el ML en `0.0.0.0:8000` y Macollo con `pnpm run dev:lan`.
3. Abre `http://<IP-LAN>:4321` en el celular → **Escanear Trips**.

### Limitación de cámara en HTTP

Los navegadores solo permiten `getUserMedia` en **HTTPS o localhost**. Al entrar por `http://IP`, el modal:

1. Detecta que no es contexto seguro.
2. Abre la **cámara nativa** mediante `<input type="file" accept="image/*" capture="environment">`.

También puedes usar el botón **Subir Foto**. Para `getUserMedia` real en el celular necesitas HTTPS (por ejemplo un túnel o certificado local).

## Guardado en galería

Cada captura o archivo seleccionado se envía a `POST /api/gallery/upload`, que:

- Guarda el archivo en `public/uploads/gallery/`.
- Crea un registro en la tabla `photos` con `finca_id` (finca activa) y `user_id`.
- La galería es **compartida entre todos los miembros de esa finca**; al cambiar de finca cambia el listado.

## Requisitos de infraestructura del ML

- Servidor/VPS con **≥8 GB RAM** (un worker de uvicorn ≈ 4 GB).
- Python 3.10+, PyTorch, open-clip-torch.
- HTTPS si la web principal usa HTTPS (evitar mixed content).
- Un solo worker de uvicorn.

## Estado

- ✅ Integración Macollo ↔ macollo-trips-api implementada.
- ✅ Proxy SSR con `X-API-Key` y health check.
- ✅ Guardado automático en galería por finca.
- ✅ Soporte de cámara nativa en HTTP por IP.
- ⬜ Pendiente: desplegar la API ML en VPS de producción con HTTPS.
- ⬜ Pendiente: restringir CORS del servicio ML al dominio real.
