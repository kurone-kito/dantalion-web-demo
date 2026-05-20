import { locales } from '@kurone-kito/dantalion-i18n';
import {
  defaultLanguage,
  type SupportedLanguage,
  supportedLanguages,
} from './dantalion';

export const localeStorageKey = 'dantalion-web-demo:locale';

const supportedLanguageSet = new Set<string>(supportedLanguages);

export const localeDisplayNames: Record<SupportedLanguage, string> = {
  en: locales.en ?? 'English',
  ja: locales.ja ?? '日本語',
};

export type ResolvePreferredLanguageOptions = {
  fallbackLanguage?: SupportedLanguage;
  navigatorLanguage?: string | null;
  persistedLocale?: string | null;
};

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

const getBrowserStorage = (): StorageLike | undefined => {
  try {
    return globalThis.window?.localStorage;
  } catch {
    return undefined;
  }
};

export const isSupportedLanguage = (
  value: string | null | undefined,
): value is SupportedLanguage =>
  typeof value === 'string' && supportedLanguageSet.has(value);

export const normalizeLocale = (
  value: string | null | undefined,
): SupportedLanguage | null => {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase().split(/[-_]/u)[0];
  return isSupportedLanguage(normalized) ? normalized : null;
};

export const resolvePreferredLanguage = ({
  fallbackLanguage = defaultLanguage,
  navigatorLanguage,
  persistedLocale,
}: ResolvePreferredLanguageOptions): SupportedLanguage =>
  normalizeLocale(persistedLocale) ??
  normalizeLocale(navigatorLanguage) ??
  fallbackLanguage;

export const readStoredLanguage = (
  storage?: StorageLike | null,
): SupportedLanguage | null => {
  try {
    return normalizeLocale(
      (storage ?? getBrowserStorage())?.getItem(localeStorageKey),
    );
  } catch {
    return null;
  }
};

export const persistLanguageSelection = (
  language: SupportedLanguage,
  storage?: StorageLike | null,
): SupportedLanguage => {
  try {
    (storage ?? getBrowserStorage())?.setItem(localeStorageKey, language);
  } catch {
    // Ignore storage access failures so locale routing still works.
  }

  return language;
};

export const resolveWindowLanguage = (): SupportedLanguage =>
  resolvePreferredLanguage({
    navigatorLanguage: globalThis.navigator?.language,
    persistedLocale: readStoredLanguage(),
  });

export const getLocalePath = (language: SupportedLanguage): string =>
  `/${language}/`;
