import type { ChangeEventHandler, ReactNode, VFC } from 'react';
import tw from 'twin.macro';

/** Type definition of the required attributes. */
export interface SelectProps {
  /** Specifies the default value. */
  readonly defaultValue?: string;
  /** Specifies the ID. */
  readonly id: string;
  /** Specifies the label. */
  readonly label?: ReactNode;
  /** Callback to call when the user changes the control. */
  readonly onChange?: ChangeEventHandler<HTMLSelectElement>;
  /** Specifies the source. */
  readonly source?: readonly (readonly [string, string] | string)[];
}

/** The styles for the component. */
const styles = tw`
  flex flex-col my-4 sm:(flex-row items-center)
  all-child:(
    first-of-type:(
      font-bold
      mb-1
      text-gray-700
      text-sm
      tracking-widest
      dark:text-gray-200
      sm:(mb-0 mr-8 w-1/4)
    )
    last-of-type:(
      rounded-full
      duration-200
      nm-flat-gray-200
      flex-grow
      dark:nm-flat-gray-600
      hover:(nm-flat-gray-50 dark:nm-flat-gray-800)
      sm:w-full
      [& > select]:(
        appearance-none
        bg-transparent
        font-semibold
        px-8
        py-4
        text-gray-800
        w-full
        dark:text-gray-100
      )
    )
  )
`;

/**
 * The select component.
 *
 * @param props required attributes.
 * @param props.defaultValue Specifies the default value.
 * @param props.id Specifies the ID.
 * @param props.label Specifies the label.
 * @param props.onChange Callback to call when the user changes the control.
 * @param props.source Specifies the source.
 * @returns the component.
 */
export const Select: VFC<SelectProps> = ({
  defaultValue,
  id,
  label,
  onChange,
  source,
}) => (
  <label css={styles} htmlFor={id}>
    <span>{label}</span>
    <span>
      <select
        defaultValue={defaultValue}
        disabled={!source?.length}
        id={id}
        name={id}
        onChange={onChange}
        tabIndex={0}
      >
        {source?.map((item) => {
          const [value, text] = typeof item === 'string' ? [item, item] : item;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </span>
  </label>
);
Select.displayName = 'Select';
