import { getWebCopy } from '../i18n/web-copy';
import { defaultLanguage, type SupportedLanguage } from './dantalion';

export const minBirthdayValue = '1873-02-01';
export const maxBirthdayValue = '2050-12-31';
export const defaultBirthdayValue = '2000-01-01';

export type PersonalityFormCopy = {
  birthdayLabel: string;
  detailLinkLabel: string;
  emptyStateBody: string;
  emptyStateTitle: string;
  invalidRangeMessage: string;
  loadingLabel: string;
  nicknameHelp: string;
  nicknameLabel: string;
  nicknamePlaceholder: string;
  resetLabel: string;
  resultTitle: string;
  submitLabel: string;
  supportedRangeLabel: string;
};

export const getPersonalityFormCopy = (
  language: SupportedLanguage = defaultLanguage,
): PersonalityFormCopy => getWebCopy(language).personalityForm;

export const parseBirthdayValue = (value: string): Date | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const [, yearText, monthText, dayText] = match;

  if (!yearText || !monthText || !dayText) {
    return null;
  }

  const year = Number.parseInt(yearText, 10);
  const month = Number.parseInt(monthText, 10);
  const day = Number.parseInt(dayText, 10);
  const date = new Date(year, month - 1, day);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

export const isBirthdayInSupportedRange = (value: string): boolean => {
  if (!parseBirthdayValue(value)) {
    return false;
  }

  return value >= minBirthdayValue && value <= maxBirthdayValue;
};
