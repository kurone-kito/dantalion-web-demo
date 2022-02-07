import type { ReactNode, VFC } from 'react';
import tw from 'twin.macro';
import { ResultFrame } from '../atoms/ResultFrame';
import { InlineMarkdownList } from './InlineMarkdownList';
import { ResultHeading } from './ResultHeading';

/** Type definition of the required attributes. */
export interface Props {
  /** Specifies the main content */
  readonly children?: ReactNode;
  /** Specifies the heading */
  readonly heading?: ReactNode;
  /** Specifies the detail of heading */
  readonly headingDetail?: string;
  /** Specifies the hook text */
  readonly hook?: ReactNode;
  /** Specifies the additional hook text */
  readonly hookAdditional?: ReactNode;
  /** Specifies the more detail */
  readonly moreDetail?: readonly string[];
}

/** The styles for the component. */
const styles = tw`[ol, ul]:(leading-loose list-disc p-4 md:px-8)`;

/**
 * The detail of result
 *
 * @param props required attributes.
 * @param props.children Specifies the main content.
 * @param props.heading Specifies the heading.
 * @param props.headingDetail Specifies the detail of heading.
 * @param props.hook Specifies the hook text.
 * @param props.hookAdditional Specifies the additional hook text.
 * @param props.moreDetail Specifies the more detail.
 * @returns the component.
 */
export const ResultDetail: VFC<Props> = ({
  children,
  heading,
  headingDetail,
  hook,
  hookAdditional,
  moreDetail,
}) => (
  <ResultFrame>
    <ResultHeading
      additional={hookAdditional}
      detail={headingDetail}
      heading={heading}
    >
      {hook}
    </ResultHeading>
    <div css={styles}>
      <InlineMarkdownList>{moreDetail}</InlineMarkdownList>
    </div>
    {children}
  </ResultFrame>
);
ResultDetail.displayName = 'ResultDetail';
