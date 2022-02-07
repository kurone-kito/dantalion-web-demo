import type { ReactNode, VFC } from 'react';
import tw from 'twin.macro';

/** Type definition of the required attributes. */
export interface ResultFrameProps {
  /** Specifies the main content */
  readonly children?: ReactNode;
}

/** The styles for the component. */
const styles = tw`
  mb-6
  nm-inset-gray-200-xs
  p-4
  rounded-xl
  text-gray-700
  dark:(nm-inset-gray-700-xs text-gray-200)
  md:(px-6 rounded-3xl)
`;

/**
 * The frame of the results
 *
 * @param props required attributes.
 * @param props.children The main content
 * @returns the component.
 */
export const ResultFrame: VFC<ResultFrameProps> = ({ children }) => (
  <section css={styles}>{children}</section>
);
ResultFrame.displayName = 'ResultFrame';
