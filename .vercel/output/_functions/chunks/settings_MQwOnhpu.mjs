import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { B as createAstro, C as Fragment, O as renderTemplate, S as renderComponent, k as maybeRenderHead } from "./sequence_LuBbJFxY.mjs";
import { t as createComponent } from "./compiler_r57lFU0Y.mjs";
import { n as getSession } from "./server_C-YPFHLT.mjs";
import { n as $$Layout, r as $$Welcome, t as $$Navbar } from "./navbar_DVheN0YZ.mjs";
//#region src/frontend/components/Settings.astro
var $$Settings$1 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div>Configuración en construcción</div>`;
}, "/Users/juandavid/Documents/Proyectos mios/Proyectoinverna/src/frontend/components/Settings.astro", void 0);
//#endregion
//#region src/pages/settings.astro
var settings_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Settings,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Settings = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Settings;
	const isAuthenticated = !!await getSession(Astro.request);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result) => renderTemplate`${isAuthenticated ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, {})}${renderComponent($$result, "SettingsComponent", $$Settings$1, {})}` })}` : renderTemplate`${renderComponent($$result, "Welcome", $$Welcome, {})}`}` })}`;
}, "/Users/juandavid/Documents/Proyectos mios/Proyectoinverna/src/pages/settings.astro", void 0);
var $$file = "/Users/juandavid/Documents/Proyectos mios/Proyectoinverna/src/pages/settings.astro";
var $$url = "/settings";
//#endregion
//#region \0virtual:astro:page:src/pages/settings@_@astro
var page = () => settings_exports;
//#endregion
export { page };
