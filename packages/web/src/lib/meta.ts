import type { JSX } from 'solid-js';
import {
  defaultLanguage,
  type SupportedLanguage,
  supportedLanguages,
} from './dantalion';

export type MetaDescriptor = JSX.MetaHTMLAttributes<HTMLMetaElement>;
export type LinkDescriptor = JSX.LinkHTMLAttributes<HTMLLinkElement>;

export type BuildMetaInput = {
  description: string;
  image?: string;
  includeAlternates?: boolean;
  locale: SupportedLanguage;
  noIndex?: boolean;
  path: string;
  title: string;
  type?: 'article' | 'website';
};

export type BuildMetaOutput = {
  links: LinkDescriptor[];
  metaTags: MetaDescriptor[];
  title: string;
};

export const defaultSiteOrigin = 'https://kurone-kito.github.io/dantalion';
export const defaultOgImagePath = '/og.png';

const fallbackBasePath = '/dantalion/';
const localeCodes: Record<SupportedLanguage, string> = {
  en: 'en_US',
  ja: 'ja_JP',
};

const normalizeBasePath = (value: string): string => {
  const trimmed = value.trim();

  if (trimmed === '' || trimmed === '/') {
    return '/';
  }

  return `/${trimmed.replace(/^\/+|\/+$/gu, '')}/`;
};

const normalizePath = (value: string): string => {
  const trimmed = value.trim();

  if (trimmed === '' || trimmed === '/') {
    return '/';
  }

  const normalized = trimmed.replace(/^\/+/gu, '');

  if (/\.[a-z0-9]+$/iu.test(normalized)) {
    return `/${normalized}`;
  }

  return `/${normalized.replace(/\/+$/gu, '')}/`;
};

const normalizeSiteOrigin = (value: string): string =>
  value.trim().replace(/\/+$/gu, '');

const getSiteOriginFromProcess = (): string | undefined =>
  typeof process === 'undefined' ? undefined : process.env?.['SITE_ORIGIN'];

export const assetBasePath = normalizeBasePath(
  import.meta.env.SERVER_BASE_URL ?? fallbackBasePath,
);

export const siteOrigin = normalizeSiteOrigin(
  import.meta.env['VITE_SITE_ORIGIN'] ??
    getSiteOriginFromProcess() ??
    defaultSiteOrigin,
);

export const resolveAssetPath = (path: string): string =>
  `${assetBasePath}${path.replace(/^\/+/gu, '')}`;

export const resolveSiteUrl = (path: string): string => {
  const normalizedPath = normalizePath(path);

  if (normalizedPath === '/') {
    return `${siteOrigin}/`;
  }

  return `${siteOrigin}${normalizedPath}`;
};

const getAlternateLocalePath = (
  path: string,
  locale: SupportedLanguage,
): string => {
  const normalizedPath = normalizePath(path);

  if (normalizedPath === '/') {
    return `/${locale}/`;
  }

  const segments = normalizedPath.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (
    firstSegment &&
    supportedLanguages.includes(firstSegment as SupportedLanguage)
  ) {
    segments[0] = locale;
    const suffix = normalizedPath.endsWith('/') ? '/' : '';
    return `/${segments.join('/')}${suffix}`;
  }

  return normalizedPath;
};

export const buildMeta = ({
  description,
  image = defaultOgImagePath,
  includeAlternates = true,
  locale,
  noIndex = false,
  path,
  title,
  type = 'website',
}: BuildMetaInput): BuildMetaOutput => {
  const canonicalUrl = resolveSiteUrl(path);
  const imageUrl = resolveSiteUrl(image);
  const alternateLinks = includeAlternates
    ? supportedLanguages.map((candidate) => ({
        href: resolveSiteUrl(getAlternateLocalePath(path, candidate)),
        hreflang: candidate,
        rel: 'alternate',
      }))
    : [];

  return {
    title,
    metaTags: [
      { content: description, name: 'description' },
      { content: title, property: 'og:title' },
      { content: description, property: 'og:description' },
      { content: type, property: 'og:type' },
      { content: canonicalUrl, property: 'og:url' },
      { content: imageUrl, property: 'og:image' },
      {
        content: localeCodes[locale] ?? localeCodes[defaultLanguage],
        property: 'og:locale',
      },
      { content: 'summary_large_image', name: 'twitter:card' },
      { content: title, name: 'twitter:title' },
      { content: description, name: 'twitter:description' },
      { content: imageUrl, name: 'twitter:image' },
      ...(noIndex ? [{ content: 'noindex, nofollow', name: 'robots' }] : []),
    ],
    links: [
      { href: canonicalUrl, rel: 'canonical' },
      ...alternateLinks,
      ...(includeAlternates
        ? [
            {
              href: resolveSiteUrl(
                getAlternateLocalePath(path, defaultLanguage),
              ),
              hreflang: 'x-default',
              rel: 'alternate',
            },
          ]
        : []),
    ],
  };
};
