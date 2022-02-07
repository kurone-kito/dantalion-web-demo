import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { AccompanyingItem } from './AccompanyingItem';

/** the type definition of the component */
type Component = typeof AccompanyingItem;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: AccompanyingItem };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    detail: 'Detail',
    heading: 'Heading',
    moreDetails: ['Foo', 'Bar', 'Qux'],
    probed: 'Probed',
    title: 'Title',
  },
};
