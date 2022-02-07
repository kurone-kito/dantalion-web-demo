import type { ReactNode, VFC } from 'react';
import tw from 'twin.macro';
import { InlineMarkdown } from '../atoms/InlineMarkdown';

/** Type definition of the required attributes. */
export interface ResultHeadingProps {
  /** Specifies the additional information. */
  readonly additional?: ReactNode;
  /** The children items. */
  readonly children?: ReactNode;
  /**
   * Specifies the detail.
   *
   * @default ''
   */
  readonly detail?: string;
  /** Specifies the heading. */
  readonly heading?: ReactNode;
}

/** The styles for the component. */
const styles = tw`
  leading-loose mb-4
  [& > div]:(
    first-of-type:(
      divide-gray-500
      divide-opacity-50
      divide-x
      flex
      [& > h2]:(flex-grow-0 pr-4 text-gray-900 dark:text-gray-100)
      [& > .markdown]:(flex-grow pl-4)
    )
    last-of-type:(
      p-0
      text-2xl
      text-center
      text-gray-700
      dark:text-gray-200
      sm:text-3xl
      [& > h3]:(font-extrabold p-0)
      [& > [role="heading"][aria-level="4"]]:(font-extralight p-0)
    )
  )
  [& > hr]:(border-gray-500 border-opacity-50 mb-6 mt-3)
`;

/**
 * The heading for result
 *
 * @param props required attributes.
 * @param props.additional Specifies the additional information.
 * @param props.children The children items.
 * @param props.detail Specifies the detail.
 * @param props.heading Specifies the heading.
 * @returns the component.
 */
export const ResultHeading: VFC<ResultHeadingProps> = ({
  additional,
  children,
  detail = '',
  heading,
}) => (
  <header css={styles}>
    <div>
      <h2>{heading}</h2>
      <InlineMarkdown>{detail}</InlineMarkdown>
    </div>
    <hr />
    <div>
      <h3>{children}</h3>
      {!!additional && (
        <div role="heading" aria-level={4}>
          {additional}
        </div>
      )}
    </div>
  </header>
);
ResultHeading.displayName = 'ResultHeading';
