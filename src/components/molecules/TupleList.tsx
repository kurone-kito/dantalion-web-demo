import type { ReactNode, VFC } from 'react';
import tw from 'twin.macro';
import type { ListProps } from '../atoms/List';
import { List } from '../atoms/List';

/** Type definition of the required attributes. */
export interface TupleListProps extends Omit<ListProps, 'children'> {
  /** The children items. */
  readonly children?: readonly (readonly [ReactNode, ReactNode])[];
}

/** The styles for the component. */
const styles = tw`
  text-xl
  all-child:(inline)
  [& > h2]:(font-extrabold)
  [& > p]:(ml-3)
`;

/**
 * The generic list component which its items allow the Markdown format.
 *
 * @param props required attributes.
 * @param props.children The children items.
 * @returns the component.
 */
export const TupleList: VFC<TupleListProps> = ({ children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <List {...props}>
    {children?.map(([caption, content], index) => (
      // eslint-disable-next-line react/no-array-index-key
      <section css={styles} key={index}>
        <h2>{caption}</h2>
        <p>{content}</p>
      </section>
    ))}
  </List>
);
TupleList.displayName = 'TupleList';
