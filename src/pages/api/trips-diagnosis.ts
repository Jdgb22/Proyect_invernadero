import type { APIRoute } from "astro";

export const prerender = false;
// Vercel: la función serverless que ejecuta este proxy puede vivir hasta 60s
// (Hobby/Pro con Fluid Compute). Sin esto el límite por defecto mata la
// petición con 500/503 mientras Cloud Run hace el cold start del modelo.
export const maxDuration = 60;

// URL base de la API de Machine Learning (Macollo / BioCLIP 2.5 en Google Cloud Run)
const ML_API_URL =
  process.env.ML_API_URL ||
  process.env.PUBLIC_API_URL ||
  "https://macollo-trips-api-961314735418.us-central1.run.app";

const ML_API_KEY =
  process.env.ML_API_KEY ||
  process.env.API_KEY ||
  process.env.ML_X_API_KEY ||
  "mk_JVAjJnfceKW4ruOdY25ZtsmI6ZIqE-qjj5anP2yjVqI";

// Presupuesto total de espera dentro de esta función serverless (ms).
// Debe quedar por debajo de maxDuration para poder devolver un error limpio
// (y no un 500 crudo de Vercel) cuando el modelo tarda en calentar.
const TOTAL_BUDGET_MS = 50_000;
// Timeout por intento individual hacia Cloud Run (ms).
const ATTEMPT_TIMEOUT_MS = 45_000;

let cachedSessionCookie: string | null = null;
let sessionExpiresAt = 0;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function jsonResponse(
  body: unknown,
  status: number,
  extraHeaders: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

/**
 * Obtiene o renueva la cookie de sesión del panel de la API en Cloud Run.
 * Esto garantiza que si Cloud Run se escala a 0 o reinicia el contenedor
 * (borrando las llaves efímeras de la memoria), el proxy se autentique
 * automáticamente sin interrumpir el servicio.
 */
async function getOrRenewSession(): Promise<string | null> {
  if (cachedSessionCookie && Date.now() < sessionExpiresAt) {
    return cachedSessionCookie;
  }
  const username = process.env.ML_ADMIN_USER || "admin";
  const password = process.env.ML_ADMIN_PASSWORD || "macollo2026";
  try {
    const res = await fetch(`${ML_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const cookieHeader = res.headers.get("set-cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(/macollo_session=([^;]+)/);
      if (match) {
        cachedSessionCookie = `macollo_session=${match[1]}`;
        sessionExpiresAt = Date.now() + 6 * 24 * 60 * 60 * 1000; // 6 días
        return cachedSessionCookie;
      }
    }
  } catch (e) {
    console.warn("Fallo al autenticar sesión con la API de ML:", e);
  }
  return null;
}

function buildHeaders(sessionCookie: string | null): Record<string, string> {
  const h: Record<string, string> = {};
  if (ML_API_KEY) {
    h["X-API-Key"] = ML_API_KEY;
  }
  if (sessionCookie) {
    h["Cookie"] = sessionCookie;
  }
  return h;
}

async function safeJson(res: Response): Promise<any> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export const POST: APIRoute = async ({ request }) => {
  const startedAt = Date.now();
  const deadline = startedAt + TOTAL_BUDGET_MS;

  let file: Blob;
  let formData: FormData;
  try {
    formData = await request.formData();
    file = formData.get("file") as Blob;
  } catch (err: any) {
    return jsonResponse(
      { error: `No se pudo leer la imagen enviada: ${err.message}` },
      400,
    );
  }

  if (!file || !(file instanceof Blob) || file.size === 0) {
    return jsonResponse(
      { error: "No se proporcionó ningún archivo de imagen válido." },
      400,
    );
  }

  // Reenviar a la API FastAPI de BioCLIP 2.5
  const apiFormData = new FormData();
  apiFormData.append("file", file, (file as File).name || "muestra_gulupa.jpg");

  const tempC = formData.get("temperature_c");
  if (tempC) {
    apiFormData.append("temperature_c", String(tempC));
  }

  const crop = formData.get("crop") || "gulupa";
  apiFormData.append("crop", String(crop));

  const profile = formData.get("profile") || "auto";
  apiFormData.append("profile", String(profile));

  let session = cachedSessionCookie;
  let reauthenticated = false;
  let lastWarmingRetryAfter = 5;
  let attempts = 0;

  // Bucle de reintentos: cubre el cold start de Cloud Run (503 "warming" con
  // Retry-After), la re-autenticación tras 401 y la reconexión de red, sin
  // exceder el presupuesto de la función serverless.
  while (Date.now() < deadline) {
    attempts++;
    const remaining = deadline - Date.now();
    const timeout = Math.max(5_000, Math.min(ATTEMPT_TIMEOUT_MS, remaining));

    let mlResponse: Response;
    try {
      mlResponse = await fetch(`${ML_API_URL}/api/predict`, {
        method: "POST",
        headers: buildHeaders(session),
        body: apiFormData,
        signal: AbortSignal.timeout(timeout),
      });
    } catch (err: any) {
      const timedOut =
        err?.name === "TimeoutError" || err?.name === "AbortError";
      if (Date.now() < deadline) {
        // Cloud Run puede estar despertando el contenedor: reintentar pronto.
        await sleep(timedOut ? 5_000 : 2_000);
        continue;
      }
      return jsonResponse(
        {
          status: "warming",
          retry: true,
          retry_after_seconds: 10,
          error:
            "El servidor de Machine Learning en Google Cloud Run está despertando. Intenta de nuevo en unos segundos.",
        },
        503,
        { "Retry-After": "10" },
      );
    }

    // Si Cloud Run reinició contenedor o la API key fue revocada,
    // auto-autenticarse con la sesión del panel y reintentar una sola vez.
    if (mlResponse.status === 401 && !reauthenticated) {
      reauthenticated = true;
      session = await getOrRenewSession();
      if (session) {
        continue;
      }
    }

    // Cold start del modelo: la API responde 503 {"status":"warming"} con
    // Retry-After. Esperar y reintentar dentro del presupuesto.
    if (mlResponse.status === 503) {
      const body = await safeJson(mlResponse);
      const isWarming =
        body?.status === "warming" ||
        String(body?.detail ?? "")
          .toLowerCase()
          .includes("cargando");
      if (isWarming && Date.now() < deadline) {
        lastWarmingRetryAfter = Number(body?.retry_after_seconds) || 5;
        await sleep(Math.min(lastWarmingRetryAfter * 1000, 8_000));
        continue;
      }
      if (isWarming) {
        return jsonResponse(
          {
            status: "warming",
            retry: true,
            retry_after_seconds: lastWarmingRetryAfter,
            error:
              "El modelo BioCLIP sigue cargando en Cloud Run (arranque en frío). Vuelve a intentarlo en unos segundos.",
          },
          503,
          { "Retry-After": String(lastWarmingRetryAfter) },
        );
      }
    }

    if (!mlResponse.ok) {
      const errText = await mlResponse.text().catch(() => "");
      return jsonResponse(
        {
          error: `Error desde la API de Machine Learning (${mlResponse.status}): ${errText}`,
        },
        mlResponse.status === 401 ? 502 : mlResponse.status,
      );
    }

    const data = await mlResponse.json();
    return jsonResponse(data, 200);
  }

  // El presupuesto se agotó esperando el cold start del modelo.
  return jsonResponse(
    {
      status: "warming",
      retry: true,
      retry_after_seconds: 10,
      error:
        "El modelo BioCLIP está calentando en Google Cloud Run. Reintenta en unos segundos para obtener el resultado.",
    },
    503,
    { "Retry-After": "10" },
  );
};

export const GET: APIRoute = async () => {
  // Health check hacia la API de ML. Si el modelo no está cargado, se dispara
  // el warm-up en segundo plano para que, cuando el usuario tome la foto, el
  // modelo ya esté listo (el cold start de Cloud Run escala a 0 en reposo).
  try {
    const res = await fetch(`${ML_API_URL}/api/health`, {
      headers: buildHeaders(null),
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();

    let warmingTriggered = false;
    if (data && data.model_loaded === false) {
      try {
        const warmupRes = await fetch(`${ML_API_URL}/api/warmup`, {
          method: "POST",
          headers: buildHeaders(cachedSessionCookie),
          signal: AbortSignal.timeout(10000),
        });
        warmingTriggered = warmupRes.ok;
        if (warmupRes.status === 401) {
          const session = await getOrRenewSession();
          if (session) {
            await fetch(`${ML_API_URL}/api/warmup`, {
              method: "POST",
              headers: buildHeaders(session),
              signal: AbortSignal.timeout(10000),
            }).catch(() => {});
            warmingTriggered = true;
          }
        }
      } catch {
        // El warm-up es best-effort: si falla, /api/predict hará el propio.
      }
    }

    return jsonResponse(
      {
        status: "online",
        ml_service: data,
        warming_triggered: warmingTriggered,
      },
      200,
    );
  } catch (err: any) {
    return jsonResponse(
      {
        status: "offline",
        message:
          "El servidor de Machine Learning en Google Cloud Run no está activo o no responde en " +
          ML_API_URL,
      },
      503,
    );
  }
};
