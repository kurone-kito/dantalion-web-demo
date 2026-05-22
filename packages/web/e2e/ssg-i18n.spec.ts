import { type APIRequestContext, expect, test } from '@playwright/test';
import { locales } from './fixtures';

const enLandingMarkers = {
  feature: locales.en.landing.feature.title,
  hero: locales.en.demoPage.title,
  install: locales.en.landing.install.title,
};

const jaLandingMarkers = {
  feature: locales.ja.landing.feature.title,
  hero: locales.ja.demoPage.title,
  install: locales.ja.landing.install.title,
};

const detailMarkers = {
  en: {
    h1: /Dantalion: Details of people/u,
    h2: /Major categories of personality/u,
    leak: '性格の大分類',
  },
  ja: {
    h1: /Dantalion: 性格タイプ \d{3} の詳細/u,
    h2: /性格の大分類/u,
    leak: 'Major categories of personality',
  },
} as const;

const sampleGeniusIds = ['000', '100', '919'] as const;

const fetchText = async (
  request: APIRequestContext,
  path: string,
): Promise<{ status: number; body: string }> => {
  const response = await request.get(`http://127.0.0.1:4173${path}`);
  return { status: response.status(), body: await response.text() };
};

test.describe('SSG + i18n parity', () => {
  test('the EN home page renders the English landing copy', async ({
    page,
  }) => {
    await page.goto('/dantalion/en/');
    await expect(
      page.getByRole('heading', { name: enLandingMarkers.hero }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: enLandingMarkers.feature }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: enLandingMarkers.install }),
    ).toBeVisible();
  });

  test('the JA home page renders the Japanese landing copy', async ({
    page,
  }) => {
    await page.goto('/dantalion/ja/');
    await expect(
      page.getByRole('heading', { name: jaLandingMarkers.hero }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: jaLandingMarkers.feature }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: jaLandingMarkers.install }),
    ).toBeVisible();
  });

  for (const code of sampleGeniusIds) {
    test(`/dantalion/en/${code}/ contains English markdown markers and no JA leak`, async ({
      request,
    }) => {
      const { status, body } = await fetchText(
        request,
        `/dantalion/en/${code}/`,
      );
      expect(status).toBe(200);
      expect(body).toMatch(detailMarkers.en.h1);
      expect(body).toMatch(detailMarkers.en.h2);
      expect(body).not.toContain(detailMarkers.en.leak);
    });

    test(`/dantalion/ja/${code}/ contains Japanese markdown markers and no EN leak`, async ({
      request,
    }) => {
      const { status, body } = await fetchText(
        request,
        `/dantalion/ja/${code}/`,
      );
      expect(status).toBe(200);
      expect(body).toMatch(detailMarkers.ja.h1);
      expect(body).toMatch(detailMarkers.ja.h2);
      expect(body).not.toContain(detailMarkers.ja.leak);
    });
  }

  test('hreflang alternates on /en/100/ point at /ja/100/ and x-default falls back to en', async ({
    page,
  }) => {
    await page.goto('/dantalion/en/100/');
    const alternates = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((els) =>
        els.map((el) => ({
          hreflang: el.getAttribute('hreflang'),
          href: el.getAttribute('href'),
        })),
      );
    const enAlt = alternates.find((a) => a.hreflang === 'en');
    const jaAlt = alternates.find((a) => a.hreflang === 'ja');
    const xDefault = alternates.find((a) => a.hreflang === 'x-default');
    expect(enAlt?.href).toMatch(/\/dantalion\/en\/100\/$/u);
    expect(jaAlt?.href).toMatch(/\/dantalion\/ja\/100\/$/u);
    expect(xDefault?.href).toMatch(/\/dantalion\/en\/100\/$/u);
  });

  test('the legacy /100.html alias replaces the URL with the locale-pinned path', async ({
    page,
  }) => {
    await page.goto('/dantalion/100.html');
    await page.waitForURL(/\/dantalion\/(en|ja)\/100\/?$/u);
    expect(page.url()).toMatch(/\/dantalion\/(en|ja)\/100\/?$/u);
  });

  test('the legacy /100.html alias is served as a 200 asset with the canonical chrome', async ({
    request,
  }) => {
    const { status, body } = await fetchText(request, '/dantalion/100.html');
    expect(status).toBe(200);
    expect(body).toMatch(/Genius 100/u);
    expect(body).toContain('<html lang="en"');
  });

  // The legacy /<N>.html aliases SSR with the polluted i18next singleton
  // (see #74) and currently ship Japanese detail markdown under the
  // EN-default chrome. Flipping this back to `test()` is the acceptance
  // signal that #74 landed.
  test.fixme('the legacy /100.html SSR ships the EN genius detail copy (no JA leak)', async ({
    request,
  }) => {
    const { body } = await fetchText(request, '/dantalion/100.html');
    expect(body).toMatch(detailMarkers.en.h1);
    expect(body).not.toContain(detailMarkers.en.leak);
  });

  test('robots.txt and sitemap.xml are served from the deploy root', async ({
    request,
  }) => {
    const robots = await fetchText(request, '/dantalion/robots.txt');
    expect(robots.status).toBe(200);
    expect(robots.body).toContain('Sitemap:');
    expect(robots.body).toContain('/sitemap.xml');

    const sitemap = await fetchText(request, '/dantalion/sitemap.xml');
    expect(sitemap.status).toBe(200);
    expect(sitemap.body).toContain('<urlset');
    expect(sitemap.body).toContain('/dantalion/en/');
    expect(sitemap.body).toContain('/dantalion/ja/');
    expect(sitemap.body).toContain('/dantalion/en/100/');
  });
});
