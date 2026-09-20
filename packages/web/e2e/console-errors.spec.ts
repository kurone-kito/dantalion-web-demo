import { expect, test } from '@playwright/test';

const routes = [
  '/en/100/',
  '/ja/919/',
  '/100.html',
  '/en/result/555-001-888/?n=Alice',
] as const;

test.describe('console pageerror regression guard (#79)', () => {
  for (const route of routes) {
    test(`${route} emits zero pageerror events on first load`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));

      await page.goto(route, { waitUntil: 'networkidle' });

      expect(errors).toEqual([]);
    });
  }
});
