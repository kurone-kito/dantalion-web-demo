import { expect, test } from '@playwright/test';
import { copyLinkLabel, shareTriggerLabel, submitLabel } from './fixtures';

const expectedShareUrlPattern =
  /^http:\/\/127\.0\.0\.1:4173\/dantalion\/en\/result\/\d{3}-\d{3}-\d{3}\/(\?n=Alice)?$/u;

const openShareMenu = async (page: import('@playwright/test').Page) => {
  const trigger = page.getByRole('button', { name: shareTriggerLabel('en') });
  await expect(trigger).toBeVisible();
  await trigger.focus();
};

const submitAlice = async (page: import('@playwright/test').Page) => {
  await page.goto('/dantalion/en/');
  await page.fill('#birthday', '2000-01-01');
  await page.fill('#nickname', 'Alice');
  await page.getByRole('button', { name: submitLabel('en') }).click();
  await expect(
    page.getByRole('heading', { name: "Alice's personality" }).first(),
  ).toBeVisible();
};

test.describe('share menu + permalink', () => {
  test('Copy link writes the genius-derived URL to the clipboard with no birthday leak', async ({
    page,
    context,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await submitAlice(page);
    await openShareMenu(page);
    await page.evaluate((label) => {
      const target = Array.from(
        document.querySelectorAll<HTMLButtonElement>(
          '.dropdown-content button',
        ),
      ).find((el) => el.textContent?.trim() === label);
      target?.click();
    }, copyLinkLabel('en'));
    await expect(
      page.getByText('Permalink copied to clipboard').first(),
    ).toBeVisible();
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toMatch(expectedShareUrlPattern);
    expect(clipboard).not.toContain('?d=');
    expect(clipboard).not.toContain('2000-01-01');
  });

  test('X compose intent encodes the leak-free share URL', async ({ page }) => {
    await submitAlice(page);
    await openShareMenu(page);
    const href = await page
      .getByRole('link', { name: 'Share on X' })
      .getAttribute('href');
    expect(href).toBeTruthy();
    const intent = new URL(href ?? '');
    expect(intent.origin).toBe('https://x.com');
    expect(intent.pathname).toBe('/intent/post');
    const sharedUrl = intent.searchParams.get('url') ?? '';
    expect(sharedUrl).toMatch(expectedShareUrlPattern);
    expect(sharedUrl).not.toContain('?d=');
    expect(sharedUrl).not.toContain('2000-01-01');
  });

  test('Bluesky compose intent encodes the leak-free share URL', async ({
    page,
  }) => {
    await submitAlice(page);
    await openShareMenu(page);
    const href = await page
      .getByRole('link', { name: 'Share on Bluesky' })
      .getAttribute('href');
    expect(href).toBeTruthy();
    const intent = new URL(href ?? '');
    expect(intent.origin).toBe('https://bsky.app');
    expect(intent.pathname).toBe('/intent/compose');
    const text = intent.searchParams.get('text') ?? '';
    expect(text).toMatch(/\/dantalion\/en\/result\/\d{3}-\d{3}-\d{3}\//u);
    expect(text).not.toContain('?d=');
    expect(text).not.toContain('2000-01-01');
  });

  test('personal-use ?d= state never appears in share URLs', async ({
    page,
  }) => {
    await submitAlice(page);
    await expect(page).toHaveURL(/\?d=2000-01-01&n=Alice/u);
    await openShareMenu(page);
    const xHref =
      (await page
        .getByRole('link', { name: 'Share on X' })
        .getAttribute('href')) ?? '';
    const blueskyHref =
      (await page
        .getByRole('link', { name: 'Share on Bluesky' })
        .getAttribute('href')) ?? '';
    for (const href of [xHref, blueskyHref]) {
      expect.soft(href).not.toContain('d%3D2000-01-01');
      expect.soft(href).not.toContain('?d=');
      expect.soft(href).not.toContain('2000-01-01');
    }
  });

  // Static SSG ships only prerendered detail-page paths; the result-triple
  // route is dynamic and not currently emitted as an HTML asset, so cold
  // loads (the recipient path for X / Bluesky share links) land on the 404
  // shell. Tracked in #72 — flipping this back to `test()` is the acceptance
  // signal that the SPA fallback works.
  test.fixme('visiting a result-triple URL renders the axis panel and per-axis bodies', async ({
    page,
  }) => {
    await page.goto('/dantalion/en/result/555-001-888/?n=Alice');
    await expect(
      page.getByRole('heading', { name: /Three personalities/u }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /^Inner\s+555$/u }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /^Outer\s+001$/u }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /^Work style\s+888$/u }),
    ).toBeVisible();
    expect(page.url()).not.toContain('?d=');
    expect(await page.locator('input#birthday').count()).toBe(0);
  });

  test('cold-loading any non-prerendered URL serves the localized not-found shell', async ({
    page,
  }) => {
    const response = await page.goto('/dantalion/en/result/100-108-bogus/');
    expect(response?.status()).toBe(404);
    await expect(
      page
        .getByText(/page you requested|not part of this static demo/u)
        .first(),
    ).toBeVisible();
  });
});
