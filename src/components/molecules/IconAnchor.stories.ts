import { faCat } from '@fortawesome/free-solid-svg-icons';
import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { IconAnchor } from './IconAnchor';

/** the type definition of the component */
type Component = typeof IconAnchor;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: IconAnchor };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    children: 'Children',
    href: 'https://example.com/',
    icon: faCat,
    nofollow: false,
    sup: false,
    tooltip: 'Tooltip',
  },
};
