import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

/**
 * Middleware global de Astro.
 * Intercepta todas las solicitudes HTTP al servidor antes de ser renderizadas o devueltas.
 * 
 * Su función principal actual es la **protección de rutas**:
 * Verifica si el usuario intenta acceder a `/dashboard` u otras rutas privadas
 * y valida si existe una sesión activa mediante Auth.js. Si no hay sesión,
 * bloquea el acceso y redirige forzosamente al inicio (`/`).
 *
 * @see https://docs.astro.build/en/guides/middleware/
 */
export const onRequest = defineMiddleware(async (context, next) => {
  // Solo protegemos las rutas que empiezan con /dashboard o otras rutas privadas
  const isProtectedRoute = context.url.pathname.startsWith('/dashboard');

  if (isProtectedRoute) {
    const session = await getSession(context.request);
    
    // Si no hay sesión, redirigimos a la página de inicio (login)
    if (!session) {
      return context.redirect('/');
    }
  }

  // Continuar con la petición normal
  return next();
});
