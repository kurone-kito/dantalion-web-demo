import type { Genius, SupportedLanguage } from './dantalion';
import { defaultLanguage } from './dantalion';

export type GeniusPageCopy = {
  breadcrumbHomeLabel: string;
  ctaLabel: string;
  loadingLabel: string;
  summary: string;
  title: string;
};

export type NotFoundPageCopy = {
  actionLabel: string;
  body: string;
  title: string;
};

const getGeniusTitle = (genius: Genius): string => `Genius ${genius}`;

const geniusPageCopyByLanguage: Record<
  SupportedLanguage,
  (genius: Genius) => GeniusPageCopy
> = {
  en: (genius) => ({
    breadcrumbHomeLabel: 'Home',
    ctaLabel: 'Find your genius',
    loadingLabel: 'Loading detail page...',
    summary: 'Explore the full localized profile for this genius type.',
    title: getGeniusTitle(genius),
  }),
  ja: (genius) => ({
    breadcrumbHomeLabel: 'ホーム',
    ctaLabel: '診断トップへ戻る',
    loadingLabel: '詳細を読み込み中...',
    summary: 'この genius type のローカライズ済み詳細ページです。',
    title: getGeniusTitle(genius),
  }),
};

const notFoundPageCopyByLanguage: Record<SupportedLanguage, NotFoundPageCopy> =
  {
    en: {
      actionLabel: 'Back to the demo',
      body: 'The page you requested is not part of this static demo build.',
      title: 'Page not found',
    },
    ja: {
      actionLabel: 'デモのトップへ戻る',
      body: '指定されたページは、この静的デモの公開対象に含まれていません。',
      title: 'ページが見つかりません',
    },
  };

export const getGeniusPageCopy = (
  language: SupportedLanguage = defaultLanguage,
  genius: Genius,
): GeniusPageCopy =>
  (
    geniusPageCopyByLanguage[language] ??
    geniusPageCopyByLanguage[defaultLanguage]
  )(genius);

export const getNotFoundPageCopy = (
  language: SupportedLanguage = defaultLanguage,
): NotFoundPageCopy =>
  notFoundPageCopyByLanguage[language] ??
  notFoundPageCopyByLanguage[defaultLanguage];
