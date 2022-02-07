import type { ReactNode, VFC } from 'react';
import ReactMarkdown from 'react-markdown';
import tw from 'twin.macro';
import { Details } from './Details';
import { ExternalAnchor } from './ExternalAnchor';

/** Type definition of the required attributes. */
export interface Props {
  /** Specifies the main article text as a Markdown format */
  readonly children: string;
  /** Specifies the body of feature text */
  readonly featureBody?: string[];
  /** Specifies the heading of feature text */
  readonly featureHeading?: ReactNode;
  /** The tooltip on hover the feature. */
  readonly tooltipFeatureDetails?: string;
}

/** The styles for the component. */
const styles = tw`
  [& > .markdown]:(
    font-light
    leading-loose
    p-3
    prose-lg
    text-gray-700
    text-lg
    dark:text-gray-200
    sm:px-2
  )
`;

/**
 * The main article component
 *
 * @param props required attributes.
 * @param props.children Specifies the main article text as a Markdown format
 * @param props.featureBody Specifies the body of feature text
 * @param props.featureHeading Specifies the heading of feature text
 * @param props.tooltipFeatureDetails The tooltip on hover the feature.
 * @returns the component.
 */
export const Article: VFC<Props> = ({
  children,
  featureBody,
  featureHeading,
  tooltipFeatureDetails,
}) => (
  <article css={styles}>
    <ReactMarkdown
      components={{
        a: ({ children: c, href }) => (
          <ExternalAnchor href={href as string} nofollow>
            {c}
          </ExternalAnchor>
        ),
      }}
      className="markdown"
      linkTarget="_blank"
    >
      {children}
    </ReactMarkdown>
    <Details
      caption={featureHeading}
      headingLevel="h2"
      tooltip={tooltipFeatureDetails}
    >
      {featureBody}
    </Details>
  </article>
);
Article.displayName = 'Article';
