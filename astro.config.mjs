// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [auth()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true
    }
  }
});