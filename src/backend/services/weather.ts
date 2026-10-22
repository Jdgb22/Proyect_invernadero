interface WeatherData {
  temperature: number;
  humidity: number;
  rainProbability: number;
  weatherCode: number;
  windSpeed: number;
  isFallback: boolean;
  source?: string;
}

// Bounding box aproximado del Valle de Aburrá (Área Metropolitana)
// Latitudes: 6.00 a 6.50, Longitudes: -75.75 a -75.40
export function isValleDeAburra(lat: number, lon: number): boolean {
  return lat >= 6.0 && lat <= 6.5 && lon >= -75.75 && lon <= -75.4;
}

export async function fetchWeatherData(
  lat: number,
  lon: number,
  isFallback = false,
): Promise<WeatherData> {
  try {
    const openMeteoData = await fetchOpenMeteo(lat, lon);
    return {
      ...openMeteoData,
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
      source: "Offline Fallback",
      isFallback: true,
    };
  }
}

async function fetchOpenMeteo(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=precipitation_probability&timezone=auto`,
  );

  if (!res.ok)
    throw new Error("Error de red al obtener el clima desde Open-Meteo");

  const data = await res.json();
  const current = data.current;

  const currentHour = new Date().getHours();
  // Al usar timezone=auto, la hora local del usuario coincidirá muy de cerca con el índice
  const rainProb = data.hourly.precipitation_probability[currentHour] || 0;

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
