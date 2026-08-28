export interface WeatherData {
  temperature: number;
  humidity: number;
  rainProbability: number;
  weatherCode: number;
  irradiation: number;
  isFallback: boolean;
}

export async function fetchWeatherData(lat: number, lon: number, isFallback = false): Promise<WeatherData> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,shortwave_radiation&hourly=precipitation_probability&timezone=America%2FBogota`
    );
    
    if (!res.ok) throw new Error('Error de red al obtener el clima');
    
    const data = await res.json();
    const current = data.current;
    
    // Obtener la probabilidad de lluvia para la hora actual
    const currentHour = new Date().getHours();
    const rainProb = data.hourly.precipitation_probability[currentHour] || 0;
    
    return {
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      rainProbability: rainProb,
      weatherCode: current.weather_code,
      irradiation: current.shortwave_radiation,
      isFallback
    };
  } catch (error) {
    console.error("Error cargando el clima desde Open-Meteo:", error);
    throw error;
  }
}

export function getWeatherEmoji(code: number): string {
  if (code === 0) return '☀️';
  if (code >= 1 && code <= 3) return '⛅';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 95) return '⛈️';
  return '☁️';
}
