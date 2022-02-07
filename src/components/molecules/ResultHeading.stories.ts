import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { ResultHeading } from './ResultHeading';

/** the type definition of the component */
type Component = typeof ResultHeading;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: ResultHeading };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    additional: 'Additional',
    children: 'Children',
    detail: 'Detail',
    heading: 'Heading',
  },
};
