export type Theme = 'light' | 'dark';

export const defaultTheme: Theme = 'light';
export const supportedThemes = ['light', 'dark'] as const;
export const themeStorageKey = 'dantalion-web-demo:theme';
export const themeMediaQuery = '(prefers-color-scheme: dark)';

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

const getBrowserStorage = (): StorageLike | undefined => {
  try {
    return globalThis.window?.localStorage;
  } catch {
    return undefined;
  }
};

export const normalizeTheme = (
  value: string | null | undefined,
): Theme | null => (value === 'light' || value === 'dark' ? value : null);

export const resolvePreferredTheme = ({
  fallbackTheme = defaultTheme,
  persistedTheme,
  systemPrefersDark = false,
}: {
  fallbackTheme?: Theme;
  persistedTheme?: string | null;
  systemPrefersDark?: boolean;
}): Theme =>
  normalizeTheme(persistedTheme) ??
  (systemPrefersDark ? 'dark' : fallbackTheme);

export const readStoredTheme = (storage?: StorageLike | null): Theme | null => {
  try {
    return normalizeTheme(
      (storage ?? getBrowserStorage())?.getItem(themeStorageKey),
    );
  } catch {
    return null;
  }
};

export const persistThemeSelection = (
  theme: Theme,
  storage?: StorageLike | null,
): Theme => {
  try {
    (storage ?? getBrowserStorage())?.setItem(themeStorageKey, theme);
  } catch {
    // Ignore storage access failures so the toggle still updates the page theme.
  }

  return theme;
};

export const applyTheme = (
  theme: Theme,
  root: HTMLElement = document.documentElement,
): Theme => {
  root.dataset['theme'] = theme;
  return theme;
};

export const themeBootstrapScript = `(() => {
  try {
    const key = ${JSON.stringify(themeStorageKey)};
    const media = window.matchMedia(${JSON.stringify(themeMediaQuery)});
    const stored = localStorage.getItem(key);
    const theme = stored === 'light' || stored === 'dark'
      ? stored
      : media.matches
        ? 'dark'
        : 'light';
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = 'light';
  }
})();`;
