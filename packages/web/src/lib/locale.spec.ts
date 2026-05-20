import { describe, expect, it } from 'vitest';
import {
  getLocalePath,
  localeStorageKey,
  normalizeLocale,
  persistLanguageSelection,
  readStoredLanguage,
  resolvePreferredLanguage,
} from './locale';

type MemoryStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

const createMemoryStorage = (): MemoryStorage => {
  const values = new Map<string, string>();

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
  };
};

describe('locale helpers', () => {
  it('prefers an explicit stored locale over navigator.language', () => {
    expect(
      resolvePreferredLanguage({
        navigatorLanguage: 'en-US',
        persistedLocale: 'ja',
      }),
    ).toBe('ja');
  });

  it('normalizes BCP 47 values and falls back to English when unsupported', () => {
    expect(
      resolvePreferredLanguage({
        navigatorLanguage: 'ja-JP',
        persistedLocale: null,
      }),
    ).toBe('ja');

    expect(
      resolvePreferredLanguage({
        navigatorLanguage: 'fr-FR',
        persistedLocale: null,
      }),
    ).toBe('en');
  });

  it('persists the selected locale with the documented storage key', () => {
    const storage = createMemoryStorage();

    persistLanguageSelection('ja', storage);

    expect(storage.getItem(localeStorageKey)).toBe('ja');
    expect(readStoredLanguage(storage)).toBe('ja');
  });

  it('normalizes and formats locale routes consistently', () => {
    expect(normalizeLocale('JA_jp')).toBe('ja');
    expect(normalizeLocale('de-DE')).toBeNull();
    expect(getLocalePath('en')).toBe('/en/');
  });
});
