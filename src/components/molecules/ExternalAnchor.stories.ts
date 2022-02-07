import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { ExternalAnchor } from './ExternalAnchor';

/** the type definition of the component */
type Component = typeof ExternalAnchor;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: ExternalAnchor };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    children: 'Children',
    href: 'https://example.com/',
    nofollow: true,
    tooltip: 'Tooltip',
  },
};
