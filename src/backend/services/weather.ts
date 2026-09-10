export interface WeatherData {
  temperature: number;
  humidity: number;
  rainProbability: number;
  weatherCode: number;
  irradiation: number;
  isFallback: boolean;
  source?: string;
}

// Bounding box aproximado del Valle de Aburrá (Área Metropolitana)
// Latitudes: 6.00 a 6.50, Longitudes: -75.75 a -75.40
export function isValleDeAburra(lat: number, lon: number): boolean {
  return lat >= 6.00 && lat <= 6.50 && lon >= -75.75 && lon <= -75.40;
}

export async function fetchWeatherData(lat: number, lon: number, isFallback = false): Promise<WeatherData> {
  const inMedellin = isValleDeAburra(lat, lon);
  
  if (inMedellin) {
    // Estamos dentro del Área Metropolitana de Medellín.
    // Intentamos usar la API local de SIATA a través de nuestro proxy.
    try {
      const siataRes = await fetch('/api/siata');
      if (siataRes.ok) {
        const siataData = await siataRes.json();
        
        // Obtenemos el resto de datos de Open-Meteo ya que SIATA /estacionesTemperatura 
        // solo devuelve temperatura
        const openMeteo = await fetchOpenMeteo(lat, lon);
        
        // Asumiendo que siataData tiene datos. Intentamos parsear la temperatura
        // (La estructura real depende de SIATA, pero si existe, la priorizamos)
        let tempSiata = openMeteo.temperature;
        if (Array.isArray(siataData) && siataData.length > 0 && siataData[0].temperatura) {
          tempSiata = siataData[0].temperatura;
        } else if (siataData.datos && siataData.datos.length > 0 && siataData.datos[0].temperatura) {
          tempSiata = siataData.datos[0].temperatura;
        }

        return {
          ...openMeteo,
          temperature: tempSiata, 
          source: 'SIATA (Valle de Aburrá)',
          isFallback
        };
      }
    } catch (error) {
      console.warn("Fallo al consultar SIATA, cayendo a Open-Meteo", error);
    }
  }

  // Si estamos fuera del Área Metropolitana, o SIATA falló, usamos directamente Open-Meteo
  const openMeteoData = await fetchOpenMeteo(lat, lon);
  return {
    ...openMeteoData,
    source: 'Open-Meteo (Global)',
    isFallback
  };
}

async function fetchOpenMeteo(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,shortwave_radiation&hourly=precipitation_probability&timezone=America%2FBogota`
  );
  
  if (!res.ok) throw new Error('Error de red al obtener el clima desde Open-Meteo');
  
  const data = await res.json();
  const current = data.current;
  
  const currentHour = new Date().getHours();
  const rainProb = data.hourly.precipitation_probability[currentHour] || 0;
  
  return {
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    rainProbability: rainProb,
    weatherCode: current.weather_code,
    irradiation: current.shortwave_radiation
  };
}

export function getWeatherEmoji(code: number): string {
  if (code === 0) return '☀️';
  if (code >= 1 && code <= 3) return '⛅';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 95) return '⛈️';
  return '☁️';
}
