import type { ReactNode, VFC } from 'react';
import ReactMarkdown from 'react-markdown';
import tw from 'twin.macro';
import { Article } from '../molecules/Article';
import { ExternalAnchor } from '../molecules/ExternalAnchor';

/** Type definition of the required attributes. */
export interface IntroductionProps {
  readonly exampleCode?: string;
  /** Specifies the body of feature text */
  readonly featureBody?: string[];
  /** Specifies the heading of feature text */
  readonly featureTitle?: ReactNode;
  readonly preface?: string;
  readonly repoText?: ReactNode;
  readonly repoUrl: string;
  /** The tooltip on hover the feature. */
  readonly tooltipSummary?: string;
}

/** The styles for the component. */
const styles = tw`
  [& > .markdown]:(
    mx-0
    my-5
    nm-inset-gray-500-sm
    overflow-auto
    p-6
    text-white
    dark:(nm-inset-gray-800-sm text-gray-200)
    md:rounded-3xl
  )
  [& > p]:(font-bold py-6 text-center text-xl)
`;

/**
 * The introduction component
 *
 * @param props required attributes.
 * @param props.exampleCode
 * @param props.featureBody
 * @param props.featureTitle
 * @param props.preface
 * @param props.repoText
 * @param props.repoUrl
 * @param props.tooltipSummary
 * @returns the component.
 */
export const Introduction: VFC<IntroductionProps> = ({
  exampleCode = '',
  featureBody,
  featureTitle,
  preface = '',
  repoText,
  repoUrl,
  tooltipSummary,
}) => (
  <section css={styles}>
    <Article
      featureBody={featureBody}
      featureHeading={featureTitle}
      tooltipFeatureDetails={tooltipSummary}
    >
      {preface}
    </Article>
    <ReactMarkdown className="markdown">{exampleCode}</ReactMarkdown>
    <p>
      <ExternalAnchor href={repoUrl} nofollow>
        {repoText}
      </ExternalAnchor>
    </p>
  </section>
);
