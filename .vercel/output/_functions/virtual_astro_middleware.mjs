import { t as sequence, xt as defineMiddleware } from "./chunks/sequence_LuBbJFxY.mjs";
import { n as getSession } from "./chunks/server_C-YPFHLT.mjs";
//#region src/middleware.ts
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
var onRequest$1 = defineMiddleware(async (context, next) => {
	const forwardedProto = context.request.headers.get("x-forwarded-proto");
	const forwardedHost = context.request.headers.get("x-forwarded-host") || context.request.headers.get("host");
	if (forwardedProto && forwardedHost) {
		if (new URL(context.request.url).protocol !== forwardedProto + ":") {
			const newUrl = new URL(context.request.url);
			newUrl.protocol = forwardedProto + ":";
			newUrl.host = forwardedHost;
			context.request = new Request(newUrl.toString(), context.request);
			process.env.AUTH_URL = `${forwardedProto}://${forwardedHost}/api/auth`;
		}
	}
	if (context.url.pathname.startsWith("/dashboard")) {
		if (!await getSession(context.request)) return context.redirect("/");
	}
	return next();
});
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };
