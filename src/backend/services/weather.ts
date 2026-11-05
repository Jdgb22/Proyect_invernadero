export interface WeatherData {
  temperature: number;
  humidity: number;
  rainProbability: number;
  weatherCode: number;
  windSpeed: number;
  isFallback: boolean;
  locationName: string;
  source?: string;
}

// Bounding box aproximado del Valle de Aburrá (Área Metropolitana)
// Latitudes: 6.00 a 6.50, Longitudes: -75.75 a -75.40
export function isValleDeAburra(lat: number, lon: number): boolean {
  return lat >= 6.0 && lat <= 6.5 && lon >= -75.75 && lon <= -75.4;
}

const COLOMBIA_SUBDIVISIONS: Record<string, string> = {
  antioquia: "ANT",
  atlantico: "ATL",
  atlántico: "ATL",
  bogota: "D.C.",
  bogotá: "D.C.",
  "bogota d.c.": "D.C.",
  "bogotá d.c.": "D.C.",
  "distrito capital": "D.C.",
  bolivar: "BOL",
  bolívar: "BOL",
  boyaca: "BOY",
  boyacá: "BOY",
  caldas: "CAL",
  caqueta: "CAQ",
  caquetá: "CAQ",
  cauca: "CAU",
  cesar: "CES",
  cordoba: "COR",
  córdoba: "COR",
  cundinamarca: "CUN",
  choco: "CHO",
  chocó: "CHO",
  huila: "HUI",
  "la guajira": "LAG",
  guajira: "LAG",
  magdalena: "MAG",
  meta: "MET",
  narino: "NAR",
  nariño: "NAR",
  "norte de santander": "NSA",
  quindio: "QUI",
  quindío: "QUI",
  risaralda: "RIS",
  santander: "SAN",
  sucre: "SUC",
  tolima: "TOL",
  "valle del cauca": "VAL",
  arauca: "ARA",
  casanare: "CAS",
  putumayo: "PUT",
  "san andres": "SAP",
  "san andrés": "SAP",
  amazonas: "AMA",
  guainia: "GUA",
  guainía: "GUA",
  guaviare: "GUV",
  vaupes: "VAU",
  vaupés: "VAU",
  vichada: "VID",
};

/**
 * Convierte el nombre o código de una subdivisión (departamento/región/capital)
 * a su sigla o abreviatura en mayúsculas (ej: Antioquia -> ANT, Valle del Cauca -> VAL).
 */
export function formatRegionCode(
  subdivision?: string,
  code?: string,
): string | null {
  if (code) {
    const parts = code.split("-");
    const suffix =
      parts.length > 1
        ? parts[1].trim().toUpperCase()
        : parts[0].trim().toUpperCase();
    if (suffix && suffix.length <= 4) {
      if (suffix === "DC") return "D.C.";
      if (suffix === "VAC") return "VAL";
      return suffix;
    }
  }
  if (!subdivision) return null;
  const normalized = subdivision.trim().toLowerCase();
  if (COLOMBIA_SUBDIVISIONS[normalized]) {
    return COLOMBIA_SUBDIVISIONS[normalized];
  }
  const words = subdivision
    .trim()
    .split(/\s+/)
    .filter(
      (w) => !["de", "del", "la", "los", "las", "el"].includes(w.toLowerCase()),
    );
  if (words.length > 1 && words.length <= 3) {
    return words.map((w) => w[0].toUpperCase()).join("");
  }
  if (subdivision.length > 4) {
    return subdivision.slice(0, 3).toUpperCase();
  }
  return subdivision.toUpperCase();
}

/**
 * Formatea el rótulo de ubicación con el nombre de la ciudad/municipio/sitio
 * y la sigla de la región/departamento/capital en iniciales mayúsculas (ej: "Rionegro, ANT").
 */
export function formatLocationLabel(
  city?: string,
  subdivision?: string,
  code?: string,
): string | null {
  if (!city && !subdivision) return null;
  const regCode = formatRegionCode(subdivision, code);
  if (city && regCode && city.toLowerCase() !== subdivision?.toLowerCase()) {
    return `${city}, ${regCode}`;
  }
  if (city) {
    return regCode && !city.includes(regCode) ? `${city}, ${regCode}` : city;
  }
  return regCode || subdivision || null;
}

/**
 * Obtiene el nombre del municipio/ciudad y departamento correspondiente
 * a unas coordenadas geográficas dadas (geocodificación inversa).
 */
export async function reverseGeocode(
  lat: number,
  lon: number,
  fetcher: typeof fetch = fetch,
): Promise<string | null> {
  // 1. Intento primario: BigDataCloud (rápido, sin clave de API, soporte español)
  try {
    const res = await fetcher(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`,
      { signal: AbortSignal.timeout(3500) },
    );
    if (res.ok) {
      const data = (await res.json()) as {
        city?: string;
        locality?: string;
        principalSubdivision?: string;
        principalSubdivisionCode?: string;
        countryName?: string;
      };
      const city = data.city || data.locality || data.principalSubdivision;
      const formatted = formatLocationLabel(
        city,
        data.principalSubdivision,
        data.principalSubdivisionCode,
      );
      if (formatted) return formatted;
    }
  } catch {
    // Si falla o timeout, continúa al respaldo
  }

  // 2. Respaldo: OpenStreetMap Nominatim
  try {
    const res = await fetcher(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: { "User-Agent": "MacolloInvernadero/1.0" },
        signal: AbortSignal.timeout(3500),
      },
    );
    if (res.ok) {
      const data = (await res.json()) as {
        address?: {
          city?: string;
          town?: string;
          village?: string;
          municipality?: string;
          county?: string;
          state?: string;
        };
      };
      const addr = data.address || {};
      const city =
        addr.city ||
        addr.town ||
        addr.village ||
        addr.municipality ||
        addr.county;
      const formatted = formatLocationLabel(city, addr.state);
      if (formatted) return formatted;
    }
  } catch {
    // Si ambos fallan, retornará null
  }

  return null;
}

/**
 * Resuelve una consulta de texto o coordenadas en formato texto a coordenadas lat/lon
 * y nombre de ubicación.
 */
export async function geocodeQuery(
  query: string,
  fetcher: typeof fetch = fetch,
): Promise<{ lat: number; lon: number; name: string } | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  // Si son coordenadas explícitas "lat, lon"
  const coordsMatch = trimmed.match(/^(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)$/);
  if (coordsMatch) {
    const lat = parseFloat(coordsMatch[1]);
    const lon = parseFloat(coordsMatch[3]);
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      const revName = await reverseGeocode(lat, lon, fetcher);
      return {
        lat,
        lon,
        name: revName || `${lat.toFixed(3)}, ${lon.toFixed(3)}`,
      };
    }
  }

  // Búsqueda por nombre en Open-Meteo Geocoding API
  try {
    const res = await fetcher(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=1&language=es&format=json`,
      { signal: AbortSignal.timeout(4000) },
    );
    if (res.ok) {
      const data = (await res.json()) as {
        results?: Array<{
          name: string;
          latitude: number;
          longitude: number;
          admin1?: string;
          country?: string;
        }>;
      };
      if (data.results && data.results.length > 0) {
        const item = data.results[0];
        const fullName =
          formatLocationLabel(item.name, item.admin1) || item.name;
        return {
          lat: item.latitude,
          lon: item.longitude,
          name: fullName,
        };
      }
    }
  } catch {
    // Fallback o error de red
  }

  return null;
}

export async function fetchWeatherData(
  lat: number,
  lon: number,
  isFallback = false,
  fetcher: typeof fetch = fetch,
  providedLocationName?: string,
): Promise<WeatherData> {
  try {
    const [openMeteoData, resolvedName] = await Promise.all([
      fetchOpenMeteo(lat, lon, fetcher),
      providedLocationName
        ? Promise.resolve(providedLocationName)
        : reverseGeocode(lat, lon, fetcher),
    ]);

    const locationName =
      resolvedName ||
      (isFallback ? "Medellín, ANT" : `${lat.toFixed(3)}, ${lon.toFixed(3)}`);

    return {
      ...openMeteoData,
      locationName,
      source: "Open-Meteo (Global)",
      isFallback,
    };
  } catch (error) {
    console.error("Error al obtener Open-Meteo:", error);
    return {
      temperature: 22,
      humidity: 60,
      rainProbability: 0,
      weatherCode: 0,
      windSpeed: 5,
      locationName:
        providedLocationName ||
        (isFallback ? "Medellín, ANT" : "Ubicación actual"),
      source: "Offline Fallback",
      isFallback: true,
    };
  }
}

async function fetchOpenMeteo(lat: number, lon: number, fetcher: typeof fetch) {
  const res = await fetcher(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=precipitation_probability&timezone=auto`,
    { signal: AbortSignal.timeout(10000) },
  );

  if (!res.ok)
    throw new Error("Error de red al obtener el clima desde Open-Meteo");

  const data = await res.json();
  const current = data.current;

  const currentHour = new Date().getHours();
  // Al usar timezone=auto, la hora local del usuario coincidirá muy de cerca con el índice
  const rainProb = data.hourly?.precipitation_probability?.[currentHour] ?? 0;

  return {
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    rainProbability: rainProb,
    weatherCode: current.weather_code,
    windSpeed: current.wind_speed_10m,
  };
}

/**
 * Convierte un código meteorológico estándar (WMO de Open-Meteo) a un Emoji visual.
 *
 * @param {number} code - Código WMO (World Meteorological Organization).
 * @returns {string} Emoji representativo de la condición climática.
 */
export function getWeatherEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return "⛅";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 95) return "⛈️";
  return "☁️";
}
