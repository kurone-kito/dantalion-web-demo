import { getWebCopy } from '../i18n/web-copy';
import type { Genius, SupportedLanguage } from './dantalion';
import { defaultLanguage } from './dantalion';

export type GeniusPageCopy = {
  breadcrumbHomeLabel: string;
  ctaLabel: string;
  loadingLabel: string;
  metaTitle: string;
  summary: string;
  title: string;
};

export type NotFoundPageCopy = {
  actionLabel: string;
  body: string;
  metaTitle: string;
  title: string;
};

export const getGeniusPageCopy = (
  language: SupportedLanguage = defaultLanguage,
  genius: Genius,
): GeniusPageCopy => {
  const base = getWebCopy(language).geniusPage;
  const title = `${base.titlePrefix}${genius}`;
  return {
    breadcrumbHomeLabel: base.breadcrumbHomeLabel,
    ctaLabel: base.ctaLabel,
    loadingLabel: base.loadingLabel,
    metaTitle: `${base.metaTitlePrefix}${title}`,
    summary: base.summary,
    title,
  };
};

export const getNotFoundPageCopy = (
  language: SupportedLanguage = defaultLanguage,
): NotFoundPageCopy => getWebCopy(language).notFoundPage;
