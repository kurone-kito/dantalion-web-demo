import type { ReactNode, VFC } from 'react';
import ReactMarkdown from 'react-markdown';
import tw from 'twin.macro';
import { InlineMarkdownList } from '../molecules/InlineMarkdownList';
import { ResultDetailWithDetails } from '../molecules/ResultDetailWithDetails';

/** Type definition of the required attributes. */
export interface GeniusProps {
  readonly details?: readonly string[];
  readonly heading?: string;
  readonly probed?: ReactNode;
  readonly strategyBody?: readonly string[];
  readonly strategyCaption?: ReactNode;
  readonly strategyTooltip?: string;
  readonly subDescriptionA?: string;
  readonly subDescriptionB?: string;
  readonly subDetailsA?: readonly string[];
  readonly subDetailsB?: readonly string[];
  readonly title?: ReactNode;
  readonly weakBody?: readonly string[];
  readonly weakCaption?: ReactNode;
  readonly weakTooltip?: string;
}

/** The styles for the component. */
const styles = tw`
  [& > ol, & > ul]:(list-decimal p-4 md:px-8)
  [& > hr]:(border-gray-300 my-3)
`;

/**
 * The genius detail component.
 *
 * @param props required attributes.
 * @param props.details
 * @param props.heading
 * @param props.probed
 * @param props.strategyBody
 * @param props.strategyCaption
 * @param props.strategyTooltip
 * @param props.subDescriptionA
 * @param props.subDescriptionB
 * @param props.subDetailsA
 * @param props.subDetailsB
 * @param props.title
 * @param props.weakBody
 * @param props.weakCaption
 * @param props.weakTooltip
 * @returns the component.
 */
export const Genius: VFC<GeniusProps> = ({
  details,
  heading,
  probed,
  strategyBody,
  strategyCaption,
  strategyTooltip,
  subDescriptionA = '',
  subDescriptionB = '',
  subDetailsA,
  subDetailsB,
  title,
  weakBody,
  weakCaption,
  weakTooltip,
}) => (
  <ResultDetailWithDetails
    heading={title}
    headingDetail={heading}
    hook={probed}
    moreDetail={details}
    details={[
      {
        caption: strategyCaption,
        children: strategyBody,
        tooltip: strategyTooltip,
      },
      {
        caption: weakCaption,
        children: weakBody,
        tooltip: weakTooltip,
      },
    ]}
  >
    <div css={styles}>
      <hr />
      <ReactMarkdown>{subDescriptionA}</ReactMarkdown>
      <InlineMarkdownList order>{subDetailsA}</InlineMarkdownList>
      <ReactMarkdown>{subDescriptionB}</ReactMarkdown>
      <InlineMarkdownList order>{subDetailsB}</InlineMarkdownList>
    </div>
  </ResultDetailWithDetails>
);
Genius.displayName = 'Genius';
