import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { Select } from './Select';

/** the type definition of the component */
type Component = typeof Select;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = {
  argTypes: { onChange: {} },
  component: Select,
};
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    defaultValue: 'baz',
    id: 'id',
    label: 'Label',
    source: ['foo', 'bar', ['baz', 'qux']],
  },
};
