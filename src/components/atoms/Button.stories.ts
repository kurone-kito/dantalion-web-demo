import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { Button } from './Button';

/** the type definition of the component */
type Component = typeof Button;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = {
  argTypes: { onClick: {} },
  component: Button,
};
export default meta;

/** the default story of the component */
export const Default: Story<Props> = { args: { children: 'Children' } };
