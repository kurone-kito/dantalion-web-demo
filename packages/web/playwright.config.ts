import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env['CI']);
const port = 4173;
const baseHost = '127.0.0.1';
const basePath = '/dantalion/';
const packageDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  expect: { timeout: 5_000 },
  forbidOnly: isCI,
  fullyParallel: true,
  outputDir: 'test-results',
  projects: [
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
    },
  ],
  reporter: isCI
    ? [
        ['github'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
      ]
    : [
        ['list'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
      ],
  retries: isCI ? 2 : 0,
  testDir: './e2e',
  timeout: 30_000,
  use: {
    baseURL: `http://${baseHost}:${port}${basePath}`,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm run build && pnpm run preview',
    cwd: packageDir,
    env: {
      BASE_PATH: basePath,
      HOST: baseHost,
      PORT: String(port),
    },
    reuseExistingServer: !isCI,
    timeout: 180_000,
    url: `http://${baseHost}:${port}${basePath}`,
  },
});
