import type { SupportedLanguage } from './dantalion';
import { defaultLanguage } from './dantalion';

export type DemoPageCopy = {
  badgeLabel: string;
  localeMenuLabel: string;
  localeCurrentBadge: string;
  summary: string;
  themeToggleLabel: string;
  title: string;
};

const demoPageCopy: Record<SupportedLanguage, DemoPageCopy> = {
  en: {
    badgeLabel: '/dantalion/ demo',
    localeCurrentBadge: 'Current',
    localeMenuLabel: 'Select language',
    summary:
      'Enter a birthday to render the localized personality result with the published dantalion packages.',
    themeToggleLabel: 'Toggle light or dark theme',
    title: 'Dantalion birthday personality demo',
  },
  ja: {
    badgeLabel: '/dantalion/ デモ',
    localeCurrentBadge: '現在',
    localeMenuLabel: '言語を選択',
    summary:
      '誕生日を入力すると、公開済みの dantalion パッケージでローカライズされた性格結果を表示します。',
    themeToggleLabel: 'ライトテーマとダークテーマを切り替える',
    title: 'Dantalion 誕生日性格診断デモ',
  },
};

export const getDemoPageCopy = (
  language: SupportedLanguage = defaultLanguage,
): DemoPageCopy => demoPageCopy[language] ?? demoPageCopy[defaultLanguage];
