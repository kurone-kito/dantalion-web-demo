import type { ReactNode, VFC } from 'react';
import tw from 'twin.macro';

/** Type definition of the required attributes. */
export interface HeaderProps {
  /** The children items. */
  readonly children?: ReactNode;
}

/** The styles for the component. */
const styles = tw`
  text-gray-700 dark:text-gray-200
  [& > h1]:(font-thin py-10 text-4xl text-center sm:text-6xl)
  [i]:(not-italic)
`;

/**
 * The header component
 *
 * @param props required attributes.
 * @param props.children the children items.
 * @returns the component.
 */
export const Header: VFC<HeaderProps> = ({ children }) => (
  <header css={styles}>
    <h1>
      <i aria-label="Lion" role="img">
        🦁
      </i>
      Dantalion:
      <wbr />
      &nbsp;
      {children}
    </h1>
  </header>
);
Header.displayName = 'Header';
