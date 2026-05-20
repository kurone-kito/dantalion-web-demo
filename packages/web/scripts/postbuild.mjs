import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { types } from '@kurone-kito/dantalion-core';

const packageDir = fileURLToPath(new URL('..', import.meta.url));
const outputDir = join(packageDir, '.output', 'public');
const defaultSiteOrigin = 'https://kurone-kito.github.io/dantalion';
const geniusTypeValues = types.genius.map(String);
const siteOrigin = normalizeSiteOrigin(
  process.env['SITE_ORIGIN'] ??
    process.env['VITE_SITE_ORIGIN'] ??
    defaultSiteOrigin,
);
const sitemapPaths = [
  '/',
  '/en/',
  '/ja/',
  ...['en', 'ja'].flatMap((language) =>
    geniusTypeValues.map((genius) => `/${language}/${genius}/`),
  ),
];

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, 'robots.txt'), buildRobotsTxt(siteOrigin));
await writeFile(join(outputDir, 'sitemap.xml'), buildSitemapXml(siteOrigin));

function normalizeSiteOrigin(value) {
  return value.trim().replace(/\/+$/u, '');
}

function resolveSiteUrl(origin, path) {
  if (path === '/') {
    return `${origin}/`;
  }

  return `${origin}${path}`;
}

function buildRobotsTxt(origin) {
  return `User-agent: *\nAllow: /\nSitemap: ${resolveSiteUrl(origin, '/sitemap.xml')}\n`;
}

function buildSitemapXml(origin) {
  const urls = sitemapPaths
    .map((path) => {
      const url = resolveSiteUrl(origin, path);
      return `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
