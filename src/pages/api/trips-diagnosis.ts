import type { APIRoute } from "astro";

export const prerender = false;

// URL base de la API de Machine Learning (Macollo / BioCLIP 2.5)
const ML_API_URL =
  process.env.ML_API_URL ||
  process.env.PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

const ML_API_KEY =
  process.env.ML_API_KEY || process.env.API_KEY || process.env.ML_X_API_KEY;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return new Response(
        JSON.stringify({
          error: "No se proporcionó ningún archivo de imagen válido.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Reenviar a la API FastAPI de BioCLIP 2.5
    const apiFormData = new FormData();
    apiFormData.append(
      "file",
      file,
      (file as File).name || "muestra_gulupa.jpg",
    );

    const tempC = formData.get("temperature_c");
    if (tempC) {
      apiFormData.append("temperature_c", String(tempC));
    }

    const crop = formData.get("crop") || "gulupa";
    apiFormData.append("crop", String(crop));

    const headers: Record<string, string> = {};
    if (ML_API_KEY) {
      headers["X-API-Key"] = ML_API_KEY;
    }

    const mlResponse = await fetch(`${ML_API_URL}/api/predict`, {
      method: "POST",
      headers,
      body: apiFormData,
    });

    if (!mlResponse.ok) {
      const errText = await mlResponse.text();
      return new Response(
        JSON.stringify({
          error: `Error desde la API de Machine Learning (${mlResponse.status}): ${errText}`,
        }),
        {
          status: mlResponse.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const data = await mlResponse.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    const isConnRefused =
      err?.cause?.code === "ECONNREFUSED" ||
      err?.message?.includes("fetch failed");
    return new Response(
      JSON.stringify({
        error: isConnRefused
          ? "No se pudo conectar con el servidor de Machine Learning (BioCLIP 2.5). Asegúrate de que Macollo esté corriendo en el puerto 8000 (./run_server.sh)."
          : `Error interno al procesar diagnóstico: ${err.message}`,
      }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }
};

export const GET: APIRoute = async () => {
  // Health check hacia la API de ML
  try {
    const headers: Record<string, string> = {};
    if (ML_API_KEY) {
      headers["X-API-Key"] = ML_API_KEY;
    }
    const res = await fetch(`${ML_API_URL}/api/health`, {
      headers,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    return new Response(
      JSON.stringify({ status: "online", ml_service: data }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        status: "offline",
        message:
          "El servidor de Machine Learning no está activo o no responde en " +
          ML_API_URL,
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }
};
