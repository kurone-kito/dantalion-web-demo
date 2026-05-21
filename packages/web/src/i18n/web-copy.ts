import type { Accessor } from 'solid-js';
import type { SupportedLanguage } from '../lib/dantalion';
import { defaultLanguage } from '../lib/dantalion';
import { useLocale } from '../lib/locale-context';
import enResource from './locales/en.json';
import jaResource from './locales/ja.json';

export type WebCopy = typeof enResource;

const eagerResources: Record<SupportedLanguage, WebCopy> = {
  en: enResource,
  ja: jaResource as WebCopy,
};

export const loadWebCopy = async (
  language: SupportedLanguage,
): Promise<WebCopy> => {
  try {
    const module = (await import(`./locales/${language}.json`)) as {
      default: WebCopy;
    };
    return module.default;
  } catch {
    return enResource;
  }
};

export const getWebCopy = (
  language: SupportedLanguage = defaultLanguage,
): WebCopy => eagerResources[language] ?? eagerResources[defaultLanguage];

export const useWebCopy = (): Accessor<WebCopy> => {
  const { language } = useLocale();
  return () => getWebCopy(language());
};
