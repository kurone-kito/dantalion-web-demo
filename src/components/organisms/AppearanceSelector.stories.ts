import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { AppearanceSelector } from './AppearanceSelector';

/** the type definition of the component */
type Component = typeof AppearanceSelector;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: AppearanceSelector };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {};
