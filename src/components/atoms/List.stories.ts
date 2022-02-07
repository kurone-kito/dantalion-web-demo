import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { List } from './List';

/** the type definition of the component */
type Component = typeof List;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: List };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: { children: ['foo', 'bar', 'qux'], order: false },
};
