import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { json } from "../../backend/services/authz";

export const GET: APIRoute = async ({ request }) => {
  const session = await getSession(request);
  if (!session) {
    return json({ error: "No autenticado." }, 401);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(
      "http://siata.gov.co:8089/estacionesTemperatura/20",
      { signal: controller.signal },
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `Error al conectar con SIATA. Estado: ${response.status}`,
      );
    }

    return json(await response.json());
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[SIATA] Error:", message);
    return json({ error: "No se pudo obtener la información del SIATA" }, 500);
  }
};
