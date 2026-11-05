import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { json } from "../../backend/services/authz";
import { fetchWeatherData, geocodeQuery } from "../../backend/services/weather";
import { serverFetch } from "../../backend/services/serverFetch";

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  try {
    await getSession(request);
  } catch {}

  let lat = Number(url.searchParams.get("lat"));
  let lon = Number(url.searchParams.get("lon"));
  let locationName = url.searchParams.get("name") || undefined;
  const isFallback = url.searchParams.get("fallback") === "1";
  const query = url.searchParams.get("q")?.trim();

  // Si no se pasaron lat/lon válidas pero sí una consulta por texto (ej. ubicación de la finca)
  if ((!Number.isFinite(lat) || !Number.isFinite(lon)) && query) {
    try {
      const geocoded = await geocodeQuery(query, serverFetch);
      if (geocoded) {
        lat = geocoded.lat;
        lon = geocoded.lon;
        locationName = locationName || geocoded.name;
      }
    } catch {}
  }

  // Si aún no hay coordenadas válidas, usar coordenadas predeterminadas de Medellín
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    lat = 6.2442;
    lon = -75.5812;
    locationName = locationName || "Medellín, ANT";
  }

  try {
    const data = await fetchWeatherData(
      lat,
      lon,
      isFallback,
      serverFetch,
      locationName,
    );
    return json(data);
  } catch (error) {
    console.error("[/api/weather] Error inesperado:", error);
    return json({
      temperature: 22,
      humidity: 60,
      rainProbability: 0,
      weatherCode: 0,
      windSpeed: 5,
      locationName: locationName || "Medellín, ANT",
      source: "Offline Fallback",
      isFallback: true,
    });
  }
};
