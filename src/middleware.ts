import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

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
