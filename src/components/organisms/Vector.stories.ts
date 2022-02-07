import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { Vector } from './Vector';

/** the type definition of the component */
type Component = typeof Vector;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: Vector };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    details: ['Foo', 'Bar', 'Qux'],
    heading: 'Heading',
    probed: 'Probed',
    strategyBody: ['Foo', 'Bar', 'Qux'],
    strategyCaption: 'StrategyCaption',
    strategyTooltip: 'strategyTooltip',
    title: 'Title',
  },
};
