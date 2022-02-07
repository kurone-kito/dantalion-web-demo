import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { InlineMarkdownList } from './InlineMarkdownList';

/** the type definition of the component */
type Component = typeof InlineMarkdownList;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: InlineMarkdownList };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: { children: ['**Foo**', '_Bar_', 'Qux'], order: false },
};
