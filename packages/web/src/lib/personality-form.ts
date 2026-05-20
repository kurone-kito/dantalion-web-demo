import { defaultLanguage, type SupportedLanguage } from './dantalion';

export const minBirthdayValue = '1873-02-01';
export const maxBirthdayValue = '2050-12-31';
export const defaultBirthdayValue = '2000-01-01';

export type PersonalityFormCopy = {
  birthdayLabel: string;
  emptyStateBody: string;
  emptyStateTitle: string;
  invalidRangeMessage: string;
  loadingLabel: string;
  resetLabel: string;
  resultTitle: string;
  submitLabel: string;
  supportedRangeLabel: string;
};

const personalityFormCopy: Record<SupportedLanguage, PersonalityFormCopy> = {
  en: {
    birthdayLabel: 'Birthday',
    emptyStateBody:
      'Pick a birthday inside the supported range and submit to render the localized personality result.',
    emptyStateTitle: 'Result preview',
    invalidRangeMessage:
      'Please pick a date between 1873-02-01 and 2050-12-31.',
    loadingLabel: 'Loading personality...',
    resetLabel: 'Reset',
    resultTitle: 'Personality result',
    submitLabel: 'Show personality',
    supportedRangeLabel: `Supported range: ${minBirthdayValue} to ${maxBirthdayValue}`,
  },
  ja: {
    birthdayLabel: '誕生日',
    emptyStateBody:
      '対応範囲内の誕生日を選んで送信すると、ローカライズ済みの性格結果を表示します。',
    emptyStateTitle: '結果プレビュー',
    invalidRangeMessage:
      '1873-02-01 から 2050-12-31 の範囲で日付を選択してください。',
    loadingLabel: '性格を読み込み中...',
    resetLabel: 'リセット',
    resultTitle: '性格結果',
    submitLabel: '性格を見る',
    supportedRangeLabel: `対応範囲: ${minBirthdayValue} から ${maxBirthdayValue}`,
  },
};

export const getPersonalityFormCopy = (
  language: SupportedLanguage = defaultLanguage,
): PersonalityFormCopy =>
  personalityFormCopy[language] ?? personalityFormCopy[defaultLanguage];

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
