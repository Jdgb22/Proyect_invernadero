import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { json } from "../../backend/services/authz";
import { fetchWeatherData, geocodeQuery } from "../../backend/services/weather";
import { serverFetch } from "../../backend/services/serverFetch";

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  const session = await getSession(request);
  if (!session) return json({ message: "No autenticado." }, 401);

  let lat = Number(url.searchParams.get("lat"));
  let lon = Number(url.searchParams.get("lon"));
  let locationName = url.searchParams.get("name") || undefined;
  const isFallback = url.searchParams.get("fallback") === "1";
  const query = url.searchParams.get("q")?.trim();

  // Si no se pasaron lat/lon válidas pero sí una consulta por texto (ej. ubicación de la finca)
  if ((!Number.isFinite(lat) || !Number.isFinite(lon)) && query) {
    const geocoded = await geocodeQuery(query, serverFetch);
    if (geocoded) {
      lat = geocoded.lat;
      lon = geocoded.lon;
      locationName = locationName || geocoded.name;
    }
  }

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return json(
      { message: "Coordenadas inválidas o ubicación no encontrada." },
      400,
    );
  }

  const data = await fetchWeatherData(
    lat,
    lon,
    isFallback,
    serverFetch,
    locationName,
  );
  return json(data);
};
