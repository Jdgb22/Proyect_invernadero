export interface SiataPrediction {
  time: string;
  rain_prob: number;
}

export interface SiataData {
  source: string;
  status: string;
  timestamp: string;
  predictions: SiataPrediction[];
}

/**
 * Realiza una petición al proxy interno de SIATA para obtener predicciones climáticas locales.
 * 
 * Se utiliza un proxy (`/api/siata`) para evitar bloqueos de CORS en el navegador al consultar
 * los servidores oficiales del Sistema de Alerta Temprana de Medellín y el Valle de Aburrá.
 *
 * @returns {Promise<SiataData>} Promesa que resuelve con los datos de predicción estructurados.
 * @throws {Error} Si la respuesta del proxy no es exitosa.
 */
export async function fetchSiataPredictions(): Promise<SiataData> {
  try {
    // Usamos nuestro propio proxy interno para evitar problemas de CORS y centralizar la lógica
    const res = await fetch('/api/siata');
    
    if (!res.ok) {
      throw new Error(`Error en el proxy SIATA: ${res.status} ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error al obtener predicciones de SIATA:", error);
    throw error;
  }
}
