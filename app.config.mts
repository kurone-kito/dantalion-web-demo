import { defineConfig } from '@solidjs/start/config';
// @ts-expect-error
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: { preset: 'github-pages', prerender: { autoSubfolderIndex: false } },
  vite: { plugins: [tailwindcss()] },
});
