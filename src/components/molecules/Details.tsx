import type { ReactNode, VFC } from 'react';
import tw from 'twin.macro';
import { InlineMarkdownList } from './InlineMarkdownList';

/** Type definition of the required attributes. */
export interface DetailsProps {
  /** The caption. */
  readonly caption?: ReactNode;
  /** The children items. */
  readonly children?: readonly string[];
  /**
   * The heading level.
   *
   * @default 'h4'
   */
  readonly headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Whether that expand automatically. */
  readonly open?: boolean;
  /** The tooltip on hover. */
  readonly tooltip?: string;
}

/** The styles for the component. */
const styles = tw`
  my-5 nm-flat-gray-200-sm rounded-2xl
  dark:nm-flat-gray-700-sm
  md:(mx-1 rounded-3xl)
  [& > summary]:(
    bg-gray-200
    cursor-pointer
    duration-200
    ease-in-out
    outline-none
    px-8
    py-4
    rounded-2xl
    select-none
    text-gray-700
    text-xl
    transform
    transition
    dark:(bg-gray-700 text-gray-200)
    hocus:(bg-gray-100 dark:bg-gray-800)
    md:rounded-3xl
    sm:text-2xl
    [& > h1, & > h2, & > h3, & > h4, & > h5, & > h6]:(font-bold inline)
  )
  [& > div]:(
    border-gray-500 border-opacity-50 border-t-2 mx-4 overflow-y-scroll p-2
    [& > ol, & > ul]:(list-disc p-4 md:px-8)
  )
`;

/**
 * The collapsable list component which its items allow the Markdown format.
 *
 * @param props required attributes.
 * @param props.caption The caption.
 * @param props.children The children items.
 * @param props.headingLevel The heading level.
 * @param props.open Whether that expand automatically.
 * @param props.tooltip The tooltip on hover.
 * @returns the component.
 */
export const Details: VFC<DetailsProps> = ({
  caption,
  children,
  headingLevel: Heading = 'h4',
  open,
  tooltip,
}) => (
  <details css={styles} open={open}>
    <summary tabIndex={0} title={tooltip}>
      <Heading>{caption}</Heading>
    </summary>
    <div>
      <InlineMarkdownList>{children}</InlineMarkdownList>
    </div>
  </details>
);
Details.displayName = 'Details';
