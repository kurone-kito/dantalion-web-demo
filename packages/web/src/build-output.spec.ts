import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import { geniusTypeValues } from './lib/dantalion';

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
  const representativeFiles = [
    join(outputDir, 'ja', '100', 'index.html'),
    join(outputDir, '919.html'),
    join(outputDir, '404.html'),
  ];

  if (representativeFiles.every((filePath) => existsSync(filePath))) {
    return;
  }

  execFileSync('pnpm', ['run', 'build'], {
    cwd: packageDir,
    env: {
      ...process.env,
      BASE_PATH: '/dantalion/',
    },
    stdio: 'pipe',
  });
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
    const jaHtml = readFileSync(
      join(outputDir, 'ja', '100', 'index.html'),
      'utf8',
    );
    const enHtml = readFileSync(
      join(outputDir, 'en', '100', 'index.html'),
      'utf8',
    );

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

  it('renders the dedicated 404 page separately from genius detail pages', () => {
    const notFoundHtml = readFileSync(join(outputDir, '404.html'), 'utf8');

    expect(notFoundHtml).toContain('Page not found');
    expect(notFoundHtml).toContain('/dantalion/en/');
    expect(existsSync(join(outputDir, 'ja', '404', 'index.html'))).toBe(false);
  });
});
