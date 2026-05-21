import { expect, test } from '@playwright/test';

test.describe('smoke', () => {
  test('the / entry redirects to a locale-pinned route under /dantalion/', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/dantalion\/(en|ja)\/$/u);
    const heading = page.getByRole('heading', { level: 1 }).first();
    await expect(heading).toContainText(/Dantalion/u);
  });

  test('the EN locale-pinned route serves under /dantalion/ with HTTP 200', async ({
    page,
  }) => {
    const response = await page.goto('/dantalion/en/');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/dantalion\/en\/$/u);
    await expect(
      page
        .getByRole('heading', { name: /Dantalion birthday personality demo/u })
        .first(),
    ).toBeVisible();
  });

  test('the JA locale-pinned route serves under /dantalion/ with HTTP 200', async ({
    page,
  }) => {
    const response = await page.goto('/dantalion/ja/');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/dantalion\/ja\/$/u);
    await expect(
      page
        .getByRole('heading', { name: /Dantalion 誕生日性格診断デモ/u })
        .first(),
    ).toBeVisible();
  });
});
