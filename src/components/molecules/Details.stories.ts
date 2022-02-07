import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { Details } from './Details';

/** the type definition of the component */
type Component = typeof Details;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: Details };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    caption: 'FeatureHeading',
    children: ['Foo', 'Bar', 'Qux'],
    headingLevel: 'h1',
    open: true,
    tooltip: 'Tooltip',
  },
};
