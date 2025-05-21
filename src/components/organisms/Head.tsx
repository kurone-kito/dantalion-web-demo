import type { Component } from 'solid-js';
import { keywords } from '../../../package.json' with { type: 'json' };
import { createI18N, useLanguage } from '../../modules/createI18N.mjs';
import { Head as InternalHead } from '../molecules/Head.js';

/** The keywords for the meta tag. */
const joinedKeywords = keywords.join(',');

/**
 * The head metadata component.
 * @returns The component.
 */
export const Head: Component = () => {
  const language = useLanguage();
  const t = createI18N(language);
  return (
    <InternalHead
      author={t('author')}
      authorUrl="https://kit.black/"
      colorDark="#15191E"
      colorLight="#E5E6E6"
      description={t('description')}
      keywords={joinedKeywords}
      language={language()}
      licenseUrl="https://opensource.org/licenses/MIT"
      siteName={t('siteName')}
      url="https://kurone-kito.github.io/dantalion-web-demo/"
    />
  );
};
