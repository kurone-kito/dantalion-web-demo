import { readdirSync } from 'node:fs';
import { parse } from 'node:path';
import { defineConfig } from '@solidjs/start/config';
// @ts-expect-error
import tailwindcss from '@tailwindcss/vite';

/**
 * Get the names of the files in a directory.
 * @param dir The directory.
 * @returns The names of the files.
 */
const getNames = (dir: string) =>
  readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map(({ name }) => parse(name).name);

/** The locales. */
const locales = getNames('src/i18n').filter((name) => /^[a-z]{2}$/.test(name));

/** The route paths for all pages and their localized versions. */
const pathes = getNames('src/routes/[[language]]').flatMap((page) => {
  const route = page.replace(/^index$/i, '');
  return [`/${route}`, ...locales.map((locale) => `/${locale}/${route}`)];
});

/**
 * Adds a collection of paths from the external `pathes` array to an
 * existing Set of routes.
 *
 * @param routes The existing Set of route strings to add paths to
 * @returns The updated Set containing both the original routes and
 * the added paths
 */
const addRoutes = (routes: Set<string>) =>
  pathes.reduce<Set<string>>((acc, path) => acc.add(path), routes);

export default defineConfig({
  server: {
    hooks: { 'prerender:routes': addRoutes },
    preset: 'github-pages',
    prerender: { autoSubfolderIndex: false },
  },
  vite: { plugins: [tailwindcss()] },
});
