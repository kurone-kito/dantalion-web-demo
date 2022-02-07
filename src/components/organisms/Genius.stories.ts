import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { Genius } from './Genius';

/** the type definition of the component */
type Component = typeof Genius;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: Genius };
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
    subDescriptionA: 'SubDescriptionA',
    subDescriptionB: 'SubDescriptionB',
    subDetailsA: ['Foo', 'Bar', 'Qux'],
    subDetailsB: ['Foo', 'Bar', 'Qux'],
    title: 'Title',
    weakBody: ['Foo', 'Bar', 'Qux'],
    weakCaption: 'StrategyCaption',
    weakTooltip: 'strategyTooltip',
  },
};
