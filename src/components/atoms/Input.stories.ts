import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { Input } from './Input';

/** the type definition of the component */
type Component = typeof Input;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = {
  argTypes: { onChange: {} },
  component: Input,
};
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: { label: 'Label', placeholder: 'Placeholder' },
};
