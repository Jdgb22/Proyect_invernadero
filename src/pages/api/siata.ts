import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";

/**
 * GET /api/siata — proxy al API de SIATA (temperatura de estaciones).
 * Requiere sesión: los datos se sirven solo a usuarios autenticados.
 */
export const GET: APIRoute = async ({ request }) => {
  const session = await getSession(request);
  if (!session) {
    return new Response(JSON.stringify({ error: "No autenticado." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const siataEndpoint = "http://siata.gov.co:8089/estacionesTemperatura/20";

    // Timeout corto (3s) para evitar que Vercel cancele la función
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(siataEndpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `Error al conectar con SIATA. Estado: ${response.status}`,
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("[SIATA] Error:", error?.message);
    return new Response(
      JSON.stringify({ error: "No se pudo obtener la información del SIATA" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
