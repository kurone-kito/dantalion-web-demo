import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

type Locale = {
  geniusAxes: { inner: string; outer: string; workStyle: string };
  personalityForm: { detailLinkLabel: string; submitLabel: string };
  result: { fileId: string };
  share: {
    items: { copyLink: string };
    trigger: string;
  };
};

const loadLocale = (file: string): Locale =>
  JSON.parse(
    readFileSync(
      fileURLToPath(new URL(`../src/i18n/locales/${file}`, import.meta.url)),
      'utf8',
    ),
  ) as Locale;

export const locales = {
  en: loadLocale('en.json'),
  ja: loadLocale('ja.json'),
} as const;

export type LocaleId = keyof typeof locales;

export const submitLabel = (locale: LocaleId): string =>
  locales[locale].personalityForm.submitLabel;

export const detailLinkLabel = (locale: LocaleId): string =>
  locales[locale].personalityForm.detailLinkLabel;

export const fileIdLabel = (locale: LocaleId): string =>
  locales[locale].result.fileId;

export const shareTriggerLabel = (locale: LocaleId): string =>
  locales[locale].share.trigger;

export const copyLinkLabel = (locale: LocaleId): string =>
  locales[locale].share.items.copyLink;

export const axisLabels = (locale: LocaleId) => ({
  inner: locales[locale].geniusAxes.inner,
  outer: locales[locale].geniusAxes.outer,
  workStyle: locales[locale].geniusAxes.workStyle,
});
