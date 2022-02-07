import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { ResultDetail } from './ResultDetail';

/** the type definition of the component */
type Component = typeof ResultDetail;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: ResultDetail };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    children: 'Children',
    heading: 'Heading',
    headingDetail: 'HeadingDetail',
    hook: 'Hook',
    hookAdditional: 'HookAdditional',
    moreDetail: ['Foo', 'Bar', 'Qux'],
  },
};
