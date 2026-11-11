// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import auth from "auth-astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  security: { checkOrigin: true },
  output: "server",
  // maxDuration 60s: la función serverless que hace de proxy hacia Cloud Run
  // (src/pages/api/trips-diagnosis.ts) necesita margen para reintentar mientras
  // el modelo BioCLIP despierta (cold start). Con Fluid Compute de Vercel el
  // límite real por invocation sigue siendo el uso efectivo.
  adapter: vercel({ maxDuration: 60 }),
  integrations: [auth(), react()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
});
