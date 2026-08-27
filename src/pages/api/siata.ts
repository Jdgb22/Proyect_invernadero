import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  // Aquí podemos hacer proxy a la API de SIATA
  // Ejemplo: https://siata.gov.co/api/...
  
  try {
    // Por el momento, devolvemos un mockup para probar la integración
    // Una vez tengamos el endpoint real de SIATA, lo reemplazamos aquí
    const siataData = {
      source: 'SIATA (Simulado)',
      status: 'ok',
      timestamp: new Date().toISOString(),
      predictions: [
        { time: '12:00', rain_prob: 20 },
        { time: '13:00', rain_prob: 30 },
      ]
    };

    return new Response(JSON.stringify(siataData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch SIATA data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
