import { types } from '@kurone-kito/dantalion-core';
import { defineConfig } from '@solidjs/start/config';
import tailwindcss from '@tailwindcss/vite';

const baseURL = process.env['BASE_PATH'] ?? '/dantalion/';
const geniusTypeValues = types.genius.map(String);
const detailRoutes = ['en', 'ja'].flatMap((language) =>
  geniusTypeValues.map((genius) => `/${language}/${genius}/`),
);
const legacyGeniusRoutes = geniusTypeValues.map((genius) => `/${genius}.html`);

export default defineConfig({
  server: {
    prerender: {
      autoSubfolderIndex: true,
      crawlLinks: false,
      routes: [
        '/',
        '/en/',
        '/ja/',
        '/404.html',
        ...detailRoutes,
        ...legacyGeniusRoutes,
      ],
    },
    preset: 'githubPages',
    baseURL,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
