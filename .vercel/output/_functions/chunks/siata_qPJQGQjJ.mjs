import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
//#region src/pages/api/siata.ts
var siata_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ request }) => {
	try {
		const response = await fetch("http://siata.gov.co:8089/estacionesTemperatura/20");
		if (!response.ok) throw new Error(`Error al conectar con SIATA. Estado: ${response.status}`);
		const data = await response.json();
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({
			error: "No se pudo obtener la información del SIATA",
			details: error.message
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/siata@_@ts
var page = () => siata_exports;
//#endregion
export { page };
