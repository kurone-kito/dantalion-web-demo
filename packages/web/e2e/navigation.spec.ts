import { type APIRequestContext, expect, test } from '@playwright/test';
import {
  axisLabels,
  detailLinkLabel,
  fileIdLabel,
  type LocaleId,
  submitLabel,
} from './fixtures';

const locales: readonly LocaleId[] = ['en', 'ja'];

const fetchAbsolute = async (
  request: APIRequestContext,
  path: string,
): Promise<number> => {
  const baseHost = 'http://127.0.0.1:4173';
  const response = await request.get(`${baseHost}${path}`);
  return response.status();
};

test.describe('navigation + base path', () => {
  test('the / entry resolves to /dantalion/<locale>/', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/dantalion\/(en|ja)\/$/u);
  });

  for (const locale of locales) {
    test(`every internal anchor on /dantalion/${locale}/ carries the /dantalion/ prefix`, async ({
      page,
    }) => {
      await page.goto(`/dantalion/${locale}/`);
      const internalHrefs = await page
        .locator('a[href^="/"]')
        .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
      expect(internalHrefs.length).toBeGreaterThan(0);
      for (const href of internalHrefs) {
        expect
          .soft(href, `bare anchor must carry /dantalion/: ${href}`)
          .toMatch(/^\/dantalion\//u);
      }
    });

    test(`every internal anchor on /dantalion/${locale}/100/ carries the /dantalion/ prefix`, async ({
      page,
    }) => {
      await page.goto(`/dantalion/${locale}/100/`);
      const internalHrefs = await page
        .locator('a[href^="/"]')
        .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));
      expect(internalHrefs.length).toBeGreaterThan(0);
      for (const href of internalHrefs) {
        expect
          .soft(href, `bare anchor must carry /dantalion/: ${href}`)
          .toMatch(/^\/dantalion\//u);
      }
    });
  }

  test('genius detail pages serve as static SSG assets with HTTP 200', async ({
    request,
  }) => {
    expect.soft(await fetchAbsolute(request, '/dantalion/en/100/')).toBe(200);
    expect.soft(await fetchAbsolute(request, '/dantalion/ja/100/')).toBe(200);
    expect.soft(await fetchAbsolute(request, '/dantalion/en/555/')).toBe(200);
  });

  test('submitting the form keeps /dantalion/ in the URL bar', async ({
    page,
  }) => {
    await page.goto('/dantalion/en/');
    await page.fill('#nickname', 'Alice');
    await page.getByRole('button', { name: submitLabel('en') }).click();
    await expect(page).toHaveURL(
      /\/dantalion\/en\/\?d=\d{4}-\d{2}-\d{2}&n=Alice/u,
    );
  });

  test('clicking Open detail page lands on /dantalion/<lang>/<inner-genius>/', async ({
    page,
  }) => {
    await page.goto('/dantalion/en/');
    await page.getByRole('button', { name: submitLabel('en') }).click();
    await expect(
      page.getByRole('link', { name: detailLinkLabel('en') }).first(),
    ).toBeVisible();
    await page
      .getByRole('link', { name: detailLinkLabel('en') })
      .first()
      .click();
    await page.waitForURL(/\/dantalion\/en\/\d{3}\/$/u);
    await expect(
      page.getByRole('link', { name: /Find your genius/u }),
    ).toBeVisible();
  });

  test('clicking the File ID badge lands on the genius detail page', async ({
    page,
  }) => {
    await page.goto('/dantalion/en/');
    await page.getByRole('button', { name: submitLabel('en') }).click();
    const badge = page
      .getByRole('link', { name: new RegExp(`^${fileIdLabel('en')}`, 'u') })
      .first();
    await expect(badge).toBeVisible();
    await badge.click();
    await page.waitForURL(/\/dantalion\/en\/\d{3}\/$/u);
  });

  test('clicking an axis chip lands on /dantalion/<lang>/<axis-genius>/', async ({
    page,
  }) => {
    await page.goto('/dantalion/en/');
    await page.getByRole('button', { name: submitLabel('en') }).click();
    const labels = axisLabels('en');
    const chip = page
      .getByRole('link', {
        name: new RegExp(`^${labels.inner}\\s+\\d{3}$`, 'u'),
      })
      .first();
    await expect(chip).toBeVisible();
    await chip.click();
    await page.waitForURL(/\/dantalion\/en\/\d{3}\/$/u);
  });

  test('from a detail page, the CTA returns to /dantalion/<lang>/', async ({
    page,
  }) => {
    await page.goto('/dantalion/en/100/');
    const cta = page.getByRole('link', { name: /Find your genius/u }).first();
    await expect(cta).toBeVisible();
    await cta.click();
    await page.waitForURL(/\/dantalion\/en\/$/u);
  });

  test('reopening /dantalion/en/?d=2000-01-01&n=Alice restores the result', async ({
    page,
  }) => {
    await page.goto('/dantalion/en/?d=2000-01-01&n=Alice');
    await expect(page.locator('input#birthday')).toHaveValue('2000-01-01');
    await expect(page.locator('input#nickname')).toHaveValue('Alice');
    await expect(
      page.getByRole('heading', { name: "Alice's personality" }).first(),
    ).toBeVisible();
  });
});
