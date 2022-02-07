import type { ComponentType, LiHTMLAttributes, ReactNode, VFC } from 'react';
import { Children } from 'react';

/** Type definition of the required attributes. */
export interface ListProps {
  /** The children items. */
  readonly children?: Iterable<ReactNode>;
  /**
   * If you need a list item component, specify it.
   *
   * @default 'li'
   */
  readonly itemType?: ComponentType<LiHTMLAttributes<HTMLLIElement>>;
  /** Whether the use as an order list. */
  readonly order?: boolean;
}

/**
 * The generical list component
 *
 * @param props required attributes.
 * @param props.children the children items.
 * @param props.itemType if you need a list item component, specify it.
 * @param props.order whether the use as an order list.
 * @returns the component.
 */
export const List: VFC<ListProps> = ({ children, itemType = 'li', order }) => {
  const Parent = order ? 'ol' : 'ul';
  const Item = itemType;
  return (
    <Parent>
      {Children.toArray(children).map((child, index) => (
        <Item key={index}>{child}</Item>
      ))}
    </Parent>
  );
};
List.displayName = 'List';
