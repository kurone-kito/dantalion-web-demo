import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { types } from '@kurone-kito/dantalion-core';

const packageDir = fileURLToPath(new URL('..', import.meta.url));
const outputDir = join(packageDir, '.output', 'public');
const defaultSiteOrigin = 'https://kurone-kito.github.io/dantalion';
const basePath =
  process.env['BASE_PATH']?.trim().replace(/\/+$/u, '') || '/dantalion';
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

await injectSpaFallbackBridge();

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

// The result-triple route (/<lang>/result/<inner>-<outer>-<workStyle>/) is the
// recipient path for share URLs from #67 and is intentionally never prerendered
// (12³ × 2 = 3,456 routes is too much). Cold loads from X / Bluesky / Slack
// land on GH Pages's `404.html`, where Solid Start's client hydration locks to
// the SSR'd NotFoundPage and the Router does not re-render the matching route.
//
// This bridge injects an inline `<script>` that runs *before* Solid hydrates:
//
// - In 404.html: if the URL is a known SPA route, capture it in
//   sessionStorage and redirect to the prerendered locale home (`/<lang>/`).
// - In the locale home pages: if sessionStorage contains a pending SPA path,
//   `history.replaceState` to it before hydration so Solid Router matches the
//   intended route from the start.
//
// Tracked: #72 (this fix), #67 (E2E spec, `share-permalink.spec.ts:108`).
async function injectSpaFallbackBridge() {
  // Runs inside `404.html` only. Captures the cold-load URL in sessionStorage
  // and hard-redirects to the prerendered locale home (`/<lang>/`). The
  // locale home reads sessionStorage from its own `onMount` and navigates via
  // Solid Router — that way hydration completes against matching SSR DOM
  // first, avoiding the hydration mismatch that would otherwise crash the
  // `_triple_` chunk with "Cannot read properties of null".
  const inlineScript = `<script>(function(){try{var b=${JSON.stringify(basePath)};var k='__dantalion_spa_path';var loc=window.location;var path=loc.pathname.indexOf(b)===0?loc.pathname.slice(b.length):loc.pathname;var match=/^\\/(en|ja)\\/result\\/[^/]+\\/?$/.exec(path);if(match){try{sessionStorage.setItem(k,path+loc.search);}catch(e){}loc.replace(b+'/'+match[1]+'/');}}catch(e){}})();</script>`;

  const target = join(outputDir, '404.html');
  const html = await readFile(target, 'utf8');
  if (html.includes('__dantalion_spa_path')) {
    return;
  }
  const updated = html.replace(/<head>/u, `<head>${inlineScript}`);
  await writeFile(target, updated);
}
