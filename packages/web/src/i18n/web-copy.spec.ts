import { describe, expect, it } from 'vitest';
import en from './locales/en.json';
import ja from './locales/ja.json';
import { getWebCopy, loadWebCopy } from './web-copy';

const collectKeys = (value: unknown, prefix = ''): readonly string[] => {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return [prefix];
  }
  const record = value as Record<string, unknown>;
  return Object.keys(record)
    .toSorted()
    .flatMap((key) =>
      collectKeys(record[key], prefix ? `${prefix}.${key}` : key),
    );
};

describe('web-copy locale resources', () => {
  it('en and ja expose the same key set', () => {
    expect(collectKeys(ja)).toEqual(collectKeys(en));
  });

  it('every leaf value is a non-empty string', () => {
    for (const resource of [en, ja]) {
      const visit = (value: unknown): void => {
        if (typeof value === 'string') {
          expect(value.length).toBeGreaterThan(0);
          return;
        }
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          for (const child of Object.values(value)) {
            visit(child);
          }
        }
      };
      visit(resource);
    }
  });
});

describe('getWebCopy', () => {
  it('returns the requested locale resource', () => {
    expect(getWebCopy('en')).toBe(en);
    expect(getWebCopy('ja')).toBe(ja);
  });

  it('falls back to en for unsupported languages', () => {
    // @ts-expect-error — exercising the runtime fallback path
    expect(getWebCopy('zh')).toBe(en);
  });
});

describe('loadWebCopy', () => {
  it('resolves the same shape as getWebCopy', async () => {
    await expect(loadWebCopy('en')).resolves.toEqual(en);
    await expect(loadWebCopy('ja')).resolves.toEqual(ja);
  });
});
