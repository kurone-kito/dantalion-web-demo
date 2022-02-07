import type { InputHTMLAttributes, ReactNode, VFC } from 'react';
import tw from 'twin.macro';

/** Type definition of the required attributes. */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** The label for control */
  readonly label?: ReactNode;
}

/** The styles for the component. */
const styles = tw`
  flex flex-col my-4 sm:(flex-row items-center)
  [& > span]:(
    font-bold
    mb-1
    text-sm
    text-gray-700
    tracking-widest
    dark:text-gray-200
    sm:(mb-0 mr-8 w-1/3)
  )
  [& > input]:(
    appearance-none
    duration-200
    flex-grow
    leading-5
    mr-1
    nm-inset-gray-100
    px-8
    py-4
    rounded-full
    text-gray-800
    w-full
    dark:(nm-inset-gray-600 text-gray-100)
    hocus:(nm-inset-gray-50 dark:nm-inset-gray-800)
    sm:w-2/3
  )
`;

/**
 * The input control component
 *
 * @param props required attributes.
 * @param props.id The id of the input
 * @param props.label The label for control
 * @returns the component.
 */
export const Input: VFC<InputProps> = ({ id, label, ...props }) => (
  <label css={styles} htmlFor={id}>
    <span>{label}</span>
    <input
      id={id}
      tabIndex={0}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  </label>
);
Input.displayName = 'Input';
