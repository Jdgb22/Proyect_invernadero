import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    // El puerto 8089 de siata.gov.co es comúnmente usado para sus APIs públicas
    // Algunos endpoints conocidos incluyen:
    // - /estacionesTemperatura/20 (Temperatura)
    // - /estacionesAirePM25/token (Calidad del aire PM2.5, puede requerir un token específico)
    // - /estacionesNivel/20 (Nivel de afluentes)
    
    const siataEndpoint = 'http://siata.gov.co:8089/estacionesTemperatura/20';
    
    const response = await fetch(siataEndpoint);
    
    if (!response.ok) {
      throw new Error(`Error al conectar con SIATA. Estado: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Permite que tu frontend consulte esta API si lo necesitas por CORS
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ 
      error: 'No se pudo obtener la información del SIATA',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
