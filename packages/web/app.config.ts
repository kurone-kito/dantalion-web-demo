import { defineConfig } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';

const baseURL = process.env['BASE_PATH'] ?? '/dantalion/';

export default defineConfig({
  server: {
    prerender: {
      autoSubfolderIndex: true,
      routes: ['/', '/en/', '/ja/'],
    },
    preset: 'githubPages',
    baseURL,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
