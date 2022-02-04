import type { VFC } from 'react';
import { CommonMeta } from '../atoms/head/CommonMeta';
import { Links } from '../atoms/head/Links';
import { MobileMeta } from '../atoms/head/MobileMeta';
import { OpenGraphMeta } from '../atoms/head/OpenGraphMeta';

/** Type definition of the required attributes. */
export interface HeadContentsProps {
  /** Specifies the web app name. */
  readonly appName?: string;
  /** Whether the page is articles. */
  readonly article?: boolean;
  /** Specifies the author name. */
  readonly author?: string;
  /** Specifies the banner height. */
  readonly bannerHeight?: number;
  /** Specifies the banner URL. */
  readonly bannerPath?: string;
  /** Specifies the banner width. */
  readonly bannerWidth?: number;
  /** Specifies the base URL. */
  readonly baseUrl?: string;
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
  /** Specifies the page name. */
  readonly pageName?: string;
}

/**
 * The metadata component.
 *
 * @param props required attributes.
 * @param props.appName specifies the web app name.
 * @param props.article specifies whether the page is articles.
 * @param props.author specifies the author name.
 * @param props.bannerHeight specifies the banner height.
 * @param props.bannerPath specifies the banner URL.
 * @param props.bannerWidth specifies the banner width.
 * @param props.baseUrl specifies the base URL.
 * @param props.color specifies the theme color.
 * @param props.description specifies the short description of the document.
 * @param props.keywords specifies the keywords.
 * @param props.pageName specifies the page name.
 * @returns the component.
 */
export const HeadContents: VFC<HeadContentsProps> = ({
  appName,
  article,
  author,
  bannerHeight,
  bannerPath = '',
  bannerWidth,
  baseUrl = '',
  color,
  description,
  keywords,
  pageName,
}) => (
  <>
    <CommonMeta
      appName={appName}
      author={author}
      color={color}
      description={description}
      keywords={keywords}
    />
    <MobileMeta
      appName={appName}
      color={color}
      description={description}
      baseUrl={baseUrl}
    />
    <OpenGraphMeta
      appName={appName}
      article={article}
      bannerHeight={bannerHeight}
      bannerUrl={`${baseUrl}${bannerPath}`}
      bannerWidth={bannerWidth}
      pageName={pageName}
    />
    <Links baseUrl={baseUrl} />
  </>
);
HeadContents.displayName = 'HeadContents';
