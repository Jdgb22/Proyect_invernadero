import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { json } from "../../backend/services/authz";
import { serverFetch } from "../../backend/services/serverFetch";

export const prerender = false;

const WAQI_TOKEN =
  process.env.WAQI_TOKEN || "b3e64cc0156d4ea004ea5f3dd5b2e2a4d4e37656";

export const GET: APIRoute = async ({ request, url }) => {
  const session = await getSession(request);
  if (!session) return json({ message: "No autenticado." }, 401);

  const lat = Number(url.searchParams.get("lat"));
  const lon = Number(url.searchParams.get("lon"));

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return json({ message: "Coordenadas inválidas." }, 400);
  }

  try {
    const res = await serverFetch(
      `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${WAQI_TOKEN}`,
      { signal: AbortSignal.timeout(8000) },
    );
    if (!res.ok) throw new Error(`WAQI respondió ${res.status}`);
    return json(await res.json());
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[AQI] Error:", message);
    return json({ status: "error", message }, 502);
  }
};
