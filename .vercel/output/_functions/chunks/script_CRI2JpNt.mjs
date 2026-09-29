import { N as createRenderInstruction } from "./sequence_LuBbJFxY.mjs";
//#region node_modules/.pnpm/astro@7.2.8_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@vercel+functions@3.9.8_jiti@2.7.0_yaml@2.9.0/node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
export { renderScript as t };
