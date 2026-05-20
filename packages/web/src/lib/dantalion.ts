import type { Genius, Personality } from '@kurone-kito/dantalion-core';
import { getPersonality, types } from '@kurone-kito/dantalion-core';
import {
  type Accessors,
  createAccessorsAsync,
  type DescriptionsType,
  fallbackLanguage,
  getDetailMarkdown,
  getPersonalityMarkdown,
} from '@kurone-kito/dantalion-i18n';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

export type { Genius } from '@kurone-kito/dantalion-core';
export type { DescriptionsType };

const supportedLanguageValues = ['en', 'ja'] as const;

export type SupportedLanguage = (typeof supportedLanguageValues)[number];

export const defaultLanguage = fallbackLanguage as SupportedLanguage;

export const geniusTypes = [...types.genius] as readonly Genius[];
export const geniusTypeValues = geniusTypes.map(String);

export const supportedLanguages = [...supportedLanguageValues];

const accessorsCache = new Map<SupportedLanguage, Promise<Accessors>>();
const supportedGeniusSet = new Set<string>(geniusTypeValues);

const getAccessorsFor = (language: SupportedLanguage): Promise<Accessors> => {
  const cached = accessorsCache.get(language);

  if (cached) {
    return cached;
  }

  const accessors = createAccessorsAsync(language);
  accessorsCache.set(language, accessors);
  return accessors;
};

export const getPersonalityFor = (birthday: Date): Personality => {
  const personality = getPersonality(birthday);

  if (!personality) {
    throw new RangeError(
      'The specified birthday is outside the supported range.',
    );
  }

  return personality;
};

export const getDescriptionsFor = async (
  language: SupportedLanguage,
  type?: string,
): Promise<DescriptionsType> => {
  const accessors = await getAccessorsFor(language);
  return accessors.getDescription(type);
};

export const isSupportedGenius = (
  value: string | null | undefined,
): value is Genius =>
  typeof value === 'string' && supportedGeniusSet.has(value);

export const normalizeGenius = (
  value: string | null | undefined,
): Genius | null => {
  if (!value) {
    return null;
  }

  const normalized = value.trim();
  return isSupportedGenius(normalized) ? normalized : null;
};

export const getLocalizedPersonalityMarkdown = async (
  birthday: Date,
  language: SupportedLanguage,
): Promise<string> => {
  const accessors = await getAccessorsFor(language);
  return getPersonalityMarkdown(accessors, birthday);
};

export const renderMarkdownToHtml = (markdown: string): string => {
  const renderedHtml = marked.parse(markdown, { async: false });
  return DOMPurify.sanitize(renderedHtml);
};

export const getLocalizedPersonalityHtml = async (
  birthday: Date,
  language: SupportedLanguage,
): Promise<string> =>
  renderMarkdownToHtml(
    await getLocalizedPersonalityMarkdown(birthday, language),
  );

export type LocalizedPersonalityPreview = {
  genius: Genius;
  html: string;
};

export const getLocalizedPersonalityPreview = async (
  birthday: Date,
  language: SupportedLanguage,
): Promise<LocalizedPersonalityPreview> => {
  const personality = getPersonalityFor(birthday);

  return {
    genius: personality.inner,
    html: await getLocalizedPersonalityHtml(birthday, language),
  };
};

export const getLocalizedDetailMarkdown = async (
  genius: Genius,
  language: SupportedLanguage,
): Promise<string> => {
  const accessors = await getAccessorsFor(language);
  return getDetailMarkdown(accessors, genius);
};

export const getLocalizedDetailHtml = async (
  genius: Genius,
  language: SupportedLanguage,
): Promise<string> =>
  renderMarkdownToHtml(await getLocalizedDetailMarkdown(genius, language));

export const getGeniusPath = (
  language: SupportedLanguage,
  genius: Genius,
): string => `/${language}/${genius}/`;
