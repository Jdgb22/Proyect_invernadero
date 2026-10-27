import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { json } from "../../backend/services/authz";
import { fetchWeatherData } from "../../backend/services/weather";
import { serverFetch } from "../../backend/services/serverFetch";

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  const session = await getSession(request);
  if (!session) return json({ message: "No autenticado." }, 401);

  const lat = Number(url.searchParams.get("lat"));
  const lon = Number(url.searchParams.get("lon"));

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return json({ message: "Coordenadas inválidas." }, 400);
  }

  const isFallback = url.searchParams.get("fallback") === "1";
  const data = await fetchWeatherData(lat, lon, isFallback, serverFetch);
  return json(data);
};
