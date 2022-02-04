import type { VFC } from 'react';

/** Type definition of the required attributes. */
export interface CommonMetaProps {
  /** Specifies the web app name. */
  readonly appName?: string;
  /** Specifies the author name. */
  readonly author?: string;
  /** Specifies the theme color. */
  readonly color?: string;
  /**
   * Specifies the short description of the document.
   *
   * (limit to 150 characters)
   */
  readonly description?: string;
  /** Specifies the keywords. */
  readonly keywords?: readonly string[];
}

/**
 * The minimum metadata component.
 *
 * @param props required attributes.
 * @param props.appName specifies the web app name.
 * @param props.author specifies the author name.
 * @param props.color specifies the theme color.
 * @param props.description specifies the short description of the document.
 * @param props.keywords specifies the keywords.
 * @returns the component.
 */
export const CommonMeta: VFC<CommonMetaProps> = ({
  appName,
  author,
  color,
  description,
  keywords,
}) => (
  <>
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: process.env['applyDarkMode'] ?? '' }}
    />
    <meta httpEquiv="x-ua-compatible" content="ie=Edge" />
    {!!appName && <meta name="application-name" content={appName} />}
    {!!author && <meta name="author" content={author} />}
    <meta name="color-scheme" content="light dark" />
    <meta name="coverage" content="Worldwide" />
    {!!description && <meta name="description" content={description} />}
    <meta name="format-detection" content="telephone=no" />
    {!!keywords?.length && <meta name="keywords" content={keywords.join()} />}
    <meta name="rating" content="General" />
    <meta name="referer" content="same-origin" />
    <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
    {!!color && <meta name="theme-color" content={color} />}
  </>
);
CommonMeta.displayName = 'CommonMeta';
