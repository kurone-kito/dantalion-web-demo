import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { ResultDetailWithDetails } from './ResultDetailWithDetails';

/** the type definition of the component */
type Component = typeof ResultDetailWithDetails;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: ResultDetailWithDetails };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    children: 'Children',
    details: [
      { caption: 'Caption', children: ['Foo', 'Baz'], tooltip: 'Tooltip' },
      { caption: 'Caption', children: ['Foo', 'Baz'], tooltip: 'Tooltip' },
      { caption: 'Caption', children: ['Foo', 'Baz'], tooltip: 'Tooltip' },
    ],
    heading: 'Heading',
    headingDetail: 'HeadingDetail',
    hook: 'Hook',
    moreDetail: ['Foo', 'Bar', 'Qux'],
  },
};
