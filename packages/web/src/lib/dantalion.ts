import type { Genius, Personality } from '@kurone-kito/dantalion-core';
import { getPersonality, types } from '@kurone-kito/dantalion-core';
import {
  type Accessors,
  createAccessorsAsync,
  type DescriptionsType,
  fallbackLanguage,
  getPersonalityMarkdown,
} from '@kurone-kito/dantalion-i18n';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

export type { DescriptionsType };

const supportedLanguageValues = ['en', 'ja'] as const;

export type SupportedLanguage = (typeof supportedLanguageValues)[number];

export const defaultLanguage = fallbackLanguage as SupportedLanguage;

export const geniusTypes = [...types.genius] as readonly Genius[];

export const supportedLanguages = [...supportedLanguageValues];

const accessorsCache = new Map<SupportedLanguage, Promise<Accessors>>();

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
