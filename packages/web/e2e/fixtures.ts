import en from '../src/i18n/locales/en.json';
import ja from '../src/i18n/locales/ja.json';

export const locales = { en, ja } as const;
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
