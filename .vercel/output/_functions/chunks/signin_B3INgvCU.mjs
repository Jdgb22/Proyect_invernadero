import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { A as renderHead, B as createAstro, C as Fragment, L as unescapeHTML, M as defineScriptVars, O as renderTemplate, S as renderComponent, T as renderSlot, k as maybeRenderHead, y as spreadAttributes } from "./sequence_LuBbJFxY.mjs";
import { t as createComponent } from "./compiler_r57lFU0Y.mjs";
import { t as renderScript } from "./script_CRI2JpNt.mjs";
import { n as getSession, r as _auth_config_default } from "./server_C-YPFHLT.mjs";
//#region node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.41.3_astro@7.2.8_@emnapi+core@1.11.1_@emnapi+runtime@1.11_8fbbf0c65aa091928276a83ac4d8e207/node_modules/auth-astro/src/components/Auth.astro
createAstro("https://astro.build");
var $$Auth = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Auth;
	const { authConfig = _auth_config_default } = Astro.props;
	let session = await getSession(Astro.request, authConfig);
	return renderTemplate`${maybeRenderHead($$result)}<div>${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result) => renderTemplate`${unescapeHTML(Astro.slots.render("default", [session]))}` })}</div>`;
}, "/Users/juandavid/Documents/Proyectos mios/Proyectoinverna/node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.41.3_astro@7.2.8_@emnapi+core@1.11.1_@emnapi+runtime@1.11_8fbbf0c65aa091928276a83ac4d8e207/node_modules/auth-astro/src/components/Auth.astro", void 0);
//#endregion
//#region node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.41.3_astro@7.2.8_@emnapi+core@1.11.1_@emnapi+runtime@1.11_8fbbf0c65aa091928276a83ac4d8e207/node_modules/auth-astro/src/components/SignIn.astro
createAstro("https://astro.build");
var $$SignIn = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SignIn;
	const key = Math.random().toString(36).slice(2, 11);
	const { provider, options, authParams, ...attrs } = Astro.props;
	attrs.class = `signin-${key} ${attrs.class ?? ""}`;
	return renderTemplate`${maybeRenderHead($$result)}<button${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</button>${renderScript($$result, "/Users/juandavid/Documents/Proyectos mios/Proyectoinverna/node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.41.3_astro@7.2.8_@emnapi+core@1.11.1_@emnapi+runtime@1.11_8fbbf0c65aa091928276a83ac4d8e207/node_modules/auth-astro/src/components/SignIn.astro?astro&type=script&index=0&lang.ts")}<script>(function(){${defineScriptVars({
		provider,
		options,
		authParams,
		key
	})}
	document
		.querySelector(\`.signin-\${key}\`)
		?.addEventListener('click', () => signIn(provider, options, authParams))
})();<\/script>`;
}, "/Users/juandavid/Documents/Proyectos mios/Proyectoinverna/node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.41.3_astro@7.2.8_@emnapi+core@1.11.1_@emnapi+runtime@1.11_8fbbf0c65aa091928276a83ac4d8e207/node_modules/auth-astro/src/components/SignIn.astro", void 0);
//#endregion
//#region node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.41.3_astro@7.2.8_@emnapi+core@1.11.1_@emnapi+runtime@1.11_8fbbf0c65aa091928276a83ac4d8e207/node_modules/auth-astro/src/components/SignOut.astro
createAstro("https://astro.build");
var $$SignOut = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SignOut;
	const key = Math.random().toString(36).slice(2, 11);
	const { params, ...attrs } = Astro.props;
	attrs.class = `signout-${key} ${attrs.class ?? ""}`;
	return renderTemplate`${maybeRenderHead($$result)}<button${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</button>${renderScript($$result, "/Users/juandavid/Documents/Proyectos mios/Proyectoinverna/node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.41.3_astro@7.2.8_@emnapi+core@1.11.1_@emnapi+runtime@1.11_8fbbf0c65aa091928276a83ac4d8e207/node_modules/auth-astro/src/components/SignOut.astro?astro&type=script&index=0&lang.ts")}<script>(function(){${defineScriptVars({
		params,
		key
	})}
	document.querySelector(\`.signout-\${key}\`)?.addEventListener('click', () => signOut(params))
})();<\/script>`;
}, "/Users/juandavid/Documents/Proyectos mios/Proyectoinverna/node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.41.3_astro@7.2.8_@emnapi+core@1.11.1_@emnapi+runtime@1.11_8fbbf0c65aa091928276a83ac4d8e207/node_modules/auth-astro/src/components/SignOut.astro", void 0);
//#endregion
//#region src/pages/signin.astro
var signin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Signin,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Signin = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Signin;
	if (await getSession(Astro.request)) return Astro.redirect("/dashboard");
	return renderTemplate`<html lang="es" data-astro-cid-nv3kv2t6><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Iniciar Sesión | Proyecto Invernadero</title><meta name="description" content="Accede al sistema de monitoreo del invernadero con tu cuenta institucional."><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">${renderHead($$result)}</head><body data-astro-cid-nv3kv2t6><!-- FONDO ANIMADO --><div class="bg-scene" data-astro-cid-nv3kv2t6><div class="bg-orb orb-1" data-astro-cid-nv3kv2t6></div><div class="bg-orb orb-2" data-astro-cid-nv3kv2t6></div><div class="bg-orb orb-3" data-astro-cid-nv3kv2t6></div><div class="grid-overlay" data-astro-cid-nv3kv2t6></div></div><main class="auth-wrapper" data-astro-cid-nv3kv2t6><!-- LOGO / HEADER SUPERIOR --><div class="brand-header" data-astro-cid-nv3kv2t6><div class="brand-icon" data-astro-cid-nv3kv2t6><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" data-astro-cid-nv3kv2t6><path stroke-linecap="round" stroke-linejoin="round" d="M12 3C8 3 4 6 4 10c0 2.5 1.5 4.7 3.7 5.8L7 21h10l-.7-5.2C18.5 14.7 20 12.5 20 10c0-4-4-7-8-7z" data-astro-cid-nv3kv2t6></path><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v9m-3-4.5 3 4.5 3-4.5" data-astro-cid-nv3kv2t6></path></svg></div><span class="brand-name" data-astro-cid-nv3kv2t6>Invernadero</span></div><!-- CARD PRINCIPAL --><div class="auth-card" data-astro-cid-nv3kv2t6><!-- Encabezado --><div class="auth-header" data-astro-cid-nv3kv2t6><h1 data-astro-cid-nv3kv2t6>Bienvenido</h1><p data-astro-cid-nv3kv2t6>Sistema de monitoreo ambiental</p></div><!-- Alertas --><div id="alert-box" class="alert hidden" role="alert" data-astro-cid-nv3kv2t6></div><!-- TABS --><div class="auth-tabs" role="tablist" data-astro-cid-nv3kv2t6><button id="tab-login" class="tab-btn active" role="tab" aria-selected="true" data-astro-cid-nv3kv2t6>Iniciar Sesión</button><button id="tab-register" class="tab-btn" role="tab" aria-selected="false" data-astro-cid-nv3kv2t6>Registrarse</button></div><!-- ── FORMULARIO LOGIN ── --><div id="form-login" class="tab-content active" data-astro-cid-nv3kv2t6><form id="login-form" class="auth-form" novalidate data-astro-cid-nv3kv2t6><div class="form-group" data-astro-cid-nv3kv2t6><label for="login-email" data-astro-cid-nv3kv2t6>Correo Electrónico</label><div class="input-wrapper" data-astro-cid-nv3kv2t6><svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-nv3kv2t6><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-astro-cid-nv3kv2t6></path></svg><input type="email" id="login-email" name="email" placeholder="ejemplo@correo.com" required autocomplete="email" data-astro-cid-nv3kv2t6></div></div><div class="form-group" data-astro-cid-nv3kv2t6><label for="login-password" data-astro-cid-nv3kv2t6>Contraseña</label><div class="input-wrapper" data-astro-cid-nv3kv2t6><svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-nv3kv2t6><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-astro-cid-nv3kv2t6></path></svg><input type="password" id="login-password" name="password" placeholder="••••••••" required autocomplete="current-password" data-astro-cid-nv3kv2t6></div></div><button type="submit" id="btn-login-submit" class="btn-primary" data-astro-cid-nv3kv2t6><span class="btn-text" data-astro-cid-nv3kv2t6>Iniciar Sesión</span><span class="btn-spinner hidden" data-astro-cid-nv3kv2t6></span></button></form><!-- Divisor OAuth --><div class="divider" data-astro-cid-nv3kv2t6><span data-astro-cid-nv3kv2t6>o continúa con</span></div><div class="oauth-area" data-astro-cid-nv3kv2t6>${renderComponent($$result, "SignIn", $$SignIn, {
		"provider": "google",
		"class": "btn-oauth",
		"data-astro-cid-nv3kv2t6": true
	}, { "default": ($$result) => renderTemplate`<svg viewBox="0 0 24 24" width="18" height="18" data-astro-cid-nv3kv2t6><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" data-astro-cid-nv3kv2t6></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" data-astro-cid-nv3kv2t6></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" data-astro-cid-nv3kv2t6></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" data-astro-cid-nv3kv2t6></path></svg>Continuar con Google` })}</div></div><!-- ── FORMULARIO REGISTRO ── --><div id="form-register" class="tab-content" data-astro-cid-nv3kv2t6><form id="register-form" class="auth-form" novalidate data-astro-cid-nv3kv2t6><div class="form-group" data-astro-cid-nv3kv2t6><label for="reg-name" data-astro-cid-nv3kv2t6>Nombre completo</label><div class="input-wrapper" data-astro-cid-nv3kv2t6><svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-nv3kv2t6><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-astro-cid-nv3kv2t6></path></svg><input type="text" id="reg-name" name="name" placeholder="Juan Pérez" autocomplete="name" data-astro-cid-nv3kv2t6></div></div><div class="form-group" data-astro-cid-nv3kv2t6><label for="reg-email" data-astro-cid-nv3kv2t6>Correo Electrónico</label><div class="input-wrapper" data-astro-cid-nv3kv2t6><svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-nv3kv2t6><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-astro-cid-nv3kv2t6></path></svg><input type="email" id="reg-email" name="email" placeholder="ejemplo@correo.com" required autocomplete="email" data-astro-cid-nv3kv2t6></div></div><div class="form-group" data-astro-cid-nv3kv2t6><label for="reg-password" data-astro-cid-nv3kv2t6>Contraseña</label><div class="input-wrapper" data-astro-cid-nv3kv2t6><svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-nv3kv2t6><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-astro-cid-nv3kv2t6></path></svg><input type="password" id="reg-password" name="password" placeholder="Mínimo 8 caracteres" required autocomplete="new-password" data-astro-cid-nv3kv2t6></div></div><div class="form-group" data-astro-cid-nv3kv2t6><label for="reg-role" data-astro-cid-nv3kv2t6>Rol en el sistema</label><div class="input-wrapper" data-astro-cid-nv3kv2t6><svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-nv3kv2t6><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-nv3kv2t6></path></svg><select id="reg-role" name="role" class="form-select" data-astro-cid-nv3kv2t6><option value="Usuario X" data-astro-cid-nv3kv2t6>Usuario X (por defecto)</option><option value="Estudiante" data-astro-cid-nv3kv2t6>Estudiante</option><option value="Profesor" data-astro-cid-nv3kv2t6>Profesor</option><option value="Admin" data-astro-cid-nv3kv2t6>Admin</option><option value="Super admin" data-astro-cid-nv3kv2t6>Super Admin</option></select></div></div><button type="submit" id="btn-register-submit" class="btn-primary" data-astro-cid-nv3kv2t6><span class="btn-text" data-astro-cid-nv3kv2t6>Crear Cuenta</span><span class="btn-spinner hidden" data-astro-cid-nv3kv2t6></span></button></form></div></div><!-- /auth-card --><!-- Pie de página --><p class="footer-note" data-astro-cid-nv3kv2t6>Proyecto Invernadero &copy; ${(/* @__PURE__ */ new Date()).getFullYear()} — Sistema de Monitoreo Ambiental</p></main></body></html>${renderScript($$result, "/Users/juandavid/Documents/Proyectos mios/Proyectoinverna/src/pages/signin.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/juandavid/Documents/Proyectos mios/Proyectoinverna/src/pages/signin.astro", void 0);
var $$file = "/Users/juandavid/Documents/Proyectos mios/Proyectoinverna/src/pages/signin.astro";
var $$url = "/signin";
//#endregion
//#region \0virtual:astro:page:src/pages/signin@_@astro
var page = () => signin_exports;
//#endregion
export { page };
