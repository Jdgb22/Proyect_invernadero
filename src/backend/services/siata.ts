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
