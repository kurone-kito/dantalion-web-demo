import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { Hello } from './Hello';

/** the type definition of the component */
type Component = typeof Hello;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: Hello };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {};
