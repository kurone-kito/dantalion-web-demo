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
import { splitMarkdownIntoSections } from './personality-sections';

export type { Genius } from '@kurone-kito/dantalion-core';
export type { DescriptionsType };

export type LocalizedPersonalitySection = {
  bodyHtml: string;
  heading: string;
  id: string;
};

const supportedLanguageValues = ['en', 'ja'] as const;

export type SupportedLanguage = (typeof supportedLanguageValues)[number];

export const defaultLanguage = fallbackLanguage as SupportedLanguage;

export const geniusTypes = [...types.genius] as readonly Genius[];
export const geniusTypeValues = geniusTypes.map(String);

export const supportedLanguages = [...supportedLanguageValues];

const supportedGeniusSet = new Set<string>(geniusTypeValues);

// dantalion-i18n's `createAccessorsAsync(language)` calls `i18next.init({ lng })`
// against the shared singleton. Caching the resulting Accessors bundle is unsafe
// across languages — a later JA call mutates the singleton, and a subsequent EN
// read against a cached Accessors bundle resolves through that polluted state.
// Always re-resolve so the singleton is locked to the requested language before
// `t()` runs. This is the durable fix for the prerender leak that #62 mitigated
// with `crawlLinks: false` and #74 surfaced again in the legacy `/<N>.html`
// aliases.
const getAccessorsFor = (language: SupportedLanguage): Promise<Accessors> =>
  createAccessorsAsync(language);

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
  innerGenius: Genius;
  introHtml: string;
  outerGenius: Genius;
  sections: readonly LocalizedPersonalitySection[];
  workStyleGenius: Genius;
};

export const getLocalizedPersonalityPreview = async (
  birthday: Date,
  language: SupportedLanguage,
): Promise<LocalizedPersonalityPreview> => {
  const personality = getPersonalityFor(birthday);
  const markdown = await getLocalizedPersonalityMarkdown(birthday, language);
  const { intro, sections } = splitMarkdownIntoSections(markdown);

  return {
    genius: personality.inner,
    html: renderMarkdownToHtml(markdown),
    innerGenius: personality.inner,
    introHtml: intro ? renderMarkdownToHtml(intro) : '',
    outerGenius: personality.outer,
    sections: sections.map((section) => ({
      bodyHtml: renderMarkdownToHtml(section.body),
      heading: section.heading,
      id: section.id,
    })),
    workStyleGenius: personality.workStyle,
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
