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
  const res = await fetch("/api/siata");

  if (!res.ok) {
    throw new Error(`Error en el proxy SIATA: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
