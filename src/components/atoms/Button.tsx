import type { MouseEventHandler, ReactNode, VFC } from 'react';
import tw from 'twin.macro';

/** Type definition of the required attributes. */
export interface ButtonProps {
  /** The children items */
  readonly children?: ReactNode;
  /** Callback to call when the user taps */
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
}

/** The styles for the component. */
const styles = tw`
  flex justify-center pt-8
  [& > button]:(
    duration-200
    ease-in-out
    flex-grow
    font-bold
    leading-5
    nm-flat-gray-300
    px-8
    py-4
    rounded-full
    text-gray-800
    tracking-widest
    transform
    transition
    uppercase
    dark:(nm-flat-gray-600 text-gray-300)
    hover:(
      nm-flat-gray-50-lg text-gray-900
      dark:(nm-flat-gray-800-lg text-gray-100)
    )
  )
`;

/**
 * The button component
 *
 * @param props required attributes.
 * @param props.children the children items.
 * @param props.onClick callback to call when the user taps
 * @returns the component.
 */
export const Button: VFC<ButtonProps> = ({ children, onClick }) => (
  <div css={styles}>
    <button onClick={onClick} tabIndex={0} type="submit">
      {children}
    </button>
  </div>
);
Button.displayName = 'Button';
