import { getWebCopy } from '../i18n/web-copy';
import type { SupportedLanguage } from './dantalion';
import { defaultLanguage } from './dantalion';

export type DemoPageCopy = {
  badgeLabel: string;
  localeMenuLabel: string;
  localeCurrentBadge: string;
  metaTitle: string;
  summary: string;
  themeToggleLabel: string;
  title: string;
};

export const getDemoPageCopy = (
  language: SupportedLanguage = defaultLanguage,
): DemoPageCopy => getWebCopy(language).demoPage;
