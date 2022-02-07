import type { VFC } from 'react';
import { InlineMarkdown } from '../atoms/InlineMarkdown';
import type { ListProps } from '../atoms/List';
import { List } from '../atoms/List';

/** Type definition of the required attributes. */
export interface InlineMarkdownListProps extends Omit<ListProps, 'children'> {
  /** The children items. */
  readonly children?: readonly string[];
}

/**
 * The generic list component which its items allow the Markdown format.
 *
 * @param props required attributes.
 * @param props.children The children items.
 * @returns the component.
 */
export const InlineMarkdownList: VFC<InlineMarkdownListProps> = ({
  children,
  ...props
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <List {...props}>
    {children?.map((child) => (
      <InlineMarkdown key={child}>{child}</InlineMarkdown>
    ))}
  </List>
);
InlineMarkdownList.displayName = 'InlineMarkdownList';
