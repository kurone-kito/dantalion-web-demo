import type { ReactNode, VFC } from 'react';
import { Children } from 'react';
import tw from 'twin.macro';
import { Logo } from '../atoms/Logo';
import { FooterNavigation } from './FooterNavigation';

/** Type definition of the required attributes. */
export interface FooterProps {
  /** Specifies the author name. */
  readonly author?: ReactNode;
  /** The children items. */
  readonly children?: Iterable<ReactNode>;
}

/** The styles for the component. */
const styles = tw`
  nm-flat-gray-300-xs
  mt-4
  py-4
  text-gray-700
  text-sm
  dark:(nm-flat-gray-600-xs text-gray-200)
  [& > nav]:(
    flex flex-col mx-auto sm:flex-row lg:container
    [& > [role="banner"]]:(flex-[2_2_0%] hidden flex-shrink xl:block)
    [& > [role="navigation"]]:(flex flex-grow items-center justify-center)
    [& > [role="list"]]:(
      flex
      flex-col
      flex-shrink
      p-4
      lg:flex-row
      [& > div]:(flex-shrink p-4)
    )
  )
`;

/**
 * The footer component
 *
 * @param props required attributes.
 * @param props.author Specifies the author-name
 * @param props.children The children items.
 * @returns the component.
 */
export const Footer: VFC<FooterProps> = ({ author, children }) => (
  <footer css={styles} role="contentinfo">
    <nav>
      <div role="banner">
        <Logo />
      </div>
      <div role="navigation">
        <FooterNavigation author={author} />
      </div>
      <div role="list">
        {Children.toArray(children).map((child, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>{child}</div>
        ))}
      </div>
    </nav>
  </footer>
);
Footer.displayName = 'Footer';
