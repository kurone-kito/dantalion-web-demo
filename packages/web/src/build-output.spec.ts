import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import { geniusTypeValues } from './lib/dantalion';
import { defaultSiteOrigin, resolveSiteUrl } from './lib/meta';

const workspaceDir = process.cwd();
const packageDir = join(workspaceDir, 'packages', 'web');
const outputDir = join(packageDir, '.output', 'public');
const legacyGeniusAliases = [
  '000',
  '001',
  '012',
  '024',
  '025',
  '100',
  '108',
  '125',
  '555',
  '789',
  '888',
  '919',
] as const;

const ensureBuildOutput = () => {
  execFileSync('pnpm', ['run', 'build'], {
    cwd: packageDir,
    env: {
      ...process.env,
      BASE_PATH: '/dantalion/',
      NODE_OPTIONS: '',
    },
    stdio: 'pipe',
  });
};

const readHtml = (...segments: string[]): string =>
  readFileSync(join(outputDir, ...segments), 'utf8');

const escapeForRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');

const readPngDimensions = (filePath: string) => {
  const png = readFileSync(filePath);

  expect(Array.from(png.subarray(0, 8))).toEqual([
    137, 80, 78, 71, 13, 10, 26, 10,
  ]);

  return {
    height: png.readUInt32BE(20),
    width: png.readUInt32BE(16),
  };
};

describe('static build output', () => {
  beforeAll(() => {
    ensureBuildOutput();
  }, 60_000);

  it('emits locale detail pages for every supported genius type', () => {
    for (const language of ['en', 'ja'] as const) {
      for (const genius of geniusTypeValues) {
        expect(
          existsSync(join(outputDir, language, genius, 'index.html')),
        ).toBe(true);
      }
    }
  });

  it('keeps the legacy root html aliases and a dedicated 404 page', () => {
    for (const genius of legacyGeniusAliases) {
      expect(existsSync(join(outputDir, `${genius}.html`))).toBe(true);
    }

    expect(existsSync(join(outputDir, '404.html'))).toBe(true);
  });

  it('renders localized english and japanese detail pages with the breadcrumb and CTA', () => {
    const jaHtml = readHtml('ja', '100', 'index.html');
    const enHtml = readHtml('en', '100', 'index.html');

    expect(jaHtml).toContain('Genius 100');
    expect(jaHtml).toContain('ホーム');
    expect(jaHtml).toContain('診断トップへ戻る');
    expect(jaHtml).toContain(
      'この genius type のローカライズ済み詳細ページです。',
    );

    expect(enHtml).toContain('Genius 100');
    expect(enHtml).toContain('Home');
    expect(enHtml).toContain('Find your genius');
    expect(enHtml).toContain('Major categories of personality');
    expect(enHtml).not.toEqual(jaHtml);
  });

  it('emits localized titles, descriptions, canonicals, alternates, and social image tags', () => {
    const enHomeHtml = readHtml('en', 'index.html');
    const jaDetailHtml = readHtml('ja', '100', 'index.html');
    const legacyAliasHtml = readHtml('100.html');

    expect(enHomeHtml).toMatch(
      /<title[^>]*>Dantalion - birthday personality demo<\/title>/u,
    );
    expect(enHomeHtml).toMatch(
      /<meta(?=[^>]*name="description")(?=[^>]*published dantalion packages)[^>]*>/u,
    );
    expect(enHomeHtml).toContain(
      `href="${defaultSiteOrigin}/en/" rel="canonical"`,
    );
    expect(enHomeHtml).toContain(
      `href="${defaultSiteOrigin}/ja/" hreflang="ja" rel="alternate"`,
    );

    expect(jaDetailHtml).toMatch(
      /<title[^>]*>Dantalion - Genius 100<\/title>/u,
    );
    expect(jaDetailHtml).toMatch(
      /<meta(?=[^>]*name="description")(?=[^>]*ローカライズ済み詳細ページ)[^>]*>/u,
    );
    expect(jaDetailHtml).toContain(
      `content="${defaultSiteOrigin}/ja/100/" property="og:url"`,
    );
    expect(jaDetailHtml).toContain(
      `content="${defaultSiteOrigin}/og.png" property="og:image"`,
    );
    expect(jaDetailHtml).toContain(
      `content="${defaultSiteOrigin}/og.png" name="twitter:image"`,
    );

    expect(legacyAliasHtml).toContain(
      `href="${defaultSiteOrigin}/en/100/" rel="canonical"`,
    );
  });

  it('ships favicon fallbacks, an OGP image, robots.txt, and sitemap.xml', () => {
    expect(existsSync(join(outputDir, 'favicons', 'favicon.svg'))).toBe(true);
    expect(existsSync(join(outputDir, 'favicons', 'favicon-32x32.png'))).toBe(
      true,
    );
    expect(existsSync(join(outputDir, 'favicons', 'favicon-192x192.png'))).toBe(
      true,
    );
    expect(existsSync(join(outputDir, 'favicons', 'favicon-512x512.png'))).toBe(
      true,
    );
    expect(existsSync(join(outputDir, 'og.png'))).toBe(true);

    const ogDimensions = readPngDimensions(join(outputDir, 'og.png'));
    const robotsTxt = readFileSync(join(outputDir, 'robots.txt'), 'utf8');
    const sitemapXml = readFileSync(join(outputDir, 'sitemap.xml'), 'utf8');

    expect(ogDimensions.width).toBeGreaterThanOrEqual(600);
    expect(ogDimensions.height).toBeGreaterThanOrEqual(315);
    expect(robotsTxt).toContain('User-agent: *');
    expect(robotsTxt).toContain(`${defaultSiteOrigin}/sitemap.xml`);
    expect(sitemapXml).toContain('<urlset');

    for (const path of ['/', '/en/', '/ja/', '/en/100/', '/ja/919/']) {
      expect(sitemapXml).toMatch(
        new RegExp(escapeForRegex(`<loc>${resolveSiteUrl(path)}</loc>`), 'u'),
      );
    }
  });

  it('renders the dedicated 404 page separately from genius detail pages', () => {
    const notFoundHtml = readHtml('404.html');

    expect(notFoundHtml).toContain('Page not found');
    expect(notFoundHtml).toContain('/dantalion/en/');
    expect(notFoundHtml).toMatch(
      /<title[^>]*>Dantalion - Page not found<\/title>/u,
    );
    expect(notFoundHtml).toContain('noindex, nofollow');
    expect(existsSync(join(outputDir, 'ja', '404', 'index.html'))).toBe(false);
  });
});
