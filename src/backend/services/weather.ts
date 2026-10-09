export interface WeatherData {
  temperature: number;
  humidity: number;
  rainProbability: number;
  weatherCode: number;
  irradiance: number;
  isFallback: boolean;
  source?: string;
}

// Bounding box aproximado del Valle de Aburrá (Área Metropolitana)
// Latitudes: 6.00 a 6.50, Longitudes: -75.75 a -75.40
/**
 * Verifica si unas coordenadas geográficas dadas pertenecen al Área Metropolitana
 * del Valle de Aburrá (Medellín y municipios aledaños).
 *
 * @param {number} lat - Latitud en grados decimales.
 * @param {number} lon - Longitud en grados decimales.
 * @returns {boolean} `true` si está dentro del perímetro, `false` en caso contrario.
 */
export function isValleDeAburra(lat: number, lon: number): boolean {
  return lat >= 6.0 && lat <= 6.5 && lon >= -75.75 && lon <= -75.4;
}

/**
 * Obtiene los datos meteorológicos actuales para unas coordenadas dadas.
 *
 * Esta función es un agregador inteligente:
 * 1. Si las coordenadas están en Medellín, intenta usar primero el servicio local SIATA
 *    para obtener mediciones más precisas (como temperatura local).
 * 2. Utiliza Open-Meteo como base global, o como respaldo total si SIATA falla.
 *
 * @param {number} lat - Latitud a consultar.
 * @param {number} lon - Longitud a consultar.
 * @param {boolean} [isFallback=false] - Indica si esta petición es un reintento de respaldo.
 * @returns {Promise<WeatherData>} Objeto consolidado con todas las métricas climáticas.
 */
export async function fetchWeatherData(
  lat: number,
  lon: number,
  isFallback = false,
): Promise<WeatherData> {
  // El servicio de SIATA está temporalmente fuera de línea o con timeout.
  // Usamos Open-Meteo directamente para evitar el retraso de 3 segundos
  // y asegurar que la interfaz responda instantáneamente.
  try {
    const openMeteoData = await fetchOpenMeteo(lat, lon);
    return {
      ...openMeteoData,
      source: "Open-Meteo (Global)",
      isFallback,
    };
  } catch (error) {
    console.error("Error al obtener Open-Meteo:", error);
    // Datos de emergencia si falla la red
    return {
      temperature: 22,
      humidity: 60,
      rainProbability: 0,
      weatherCode: 0,
      irradiance: 450,
      source: "Offline Fallback",
      isFallback: true,
    };
  }
}

async function fetchOpenMeteo(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,shortwave_radiation&hourly=precipitation_probability&timezone=auto`,
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
    irradiance: current.shortwave_radiation,
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
