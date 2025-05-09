import { defineConfig } from '@solidjs/start/config';
// @ts-expect-error
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: { preset: 'github-pages' },
  vite: { plugins: [tailwindcss()] },
});
