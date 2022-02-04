import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { Anchor } from './Anchor';

/** the type definition of the component */
type Component = typeof Anchor;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = {
  component: Anchor,
};
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    href: 'https://kurone-kito.github.io/dantalion',
    children: 'Dantalion',
    noblank: false,
    nofollow: false,
    tooltip: 'Tooltip',
  },
};
