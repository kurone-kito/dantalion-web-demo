import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { FooterNavigation } from './FooterNavigation';

/** the type definition of the component */
type Component = typeof FooterNavigation;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: FooterNavigation };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: { author: 'Author' },
};
