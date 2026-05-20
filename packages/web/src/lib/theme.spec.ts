import { describe, expect, it } from 'vitest';
import {
  normalizeTheme,
  persistThemeSelection,
  readStoredTheme,
  resolvePreferredTheme,
  themeStorageKey,
} from './theme';

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

describe('theme helpers', () => {
  it('prefers a stored theme over the system preference', () => {
    expect(
      resolvePreferredTheme({
        persistedTheme: 'light',
        systemPrefersDark: true,
      }),
    ).toBe('light');
  });

  it('falls back to the system preference when no theme has been stored', () => {
    expect(
      resolvePreferredTheme({
        persistedTheme: null,
        systemPrefersDark: true,
      }),
    ).toBe('dark');

    expect(
      resolvePreferredTheme({
        persistedTheme: null,
        systemPrefersDark: false,
      }),
    ).toBe('light');
  });

  it('stores the explicit selection under the documented key', () => {
    const storage = createMemoryStorage();

    persistThemeSelection('dark', storage);

    expect(storage.getItem(themeStorageKey)).toBe('dark');
    expect(readStoredTheme(storage)).toBe('dark');
  });

  it('rejects unsupported theme values', () => {
    expect(normalizeTheme('dark')).toBe('dark');
    expect(normalizeTheme('sepia')).toBeNull();
  });
});
