import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { TupleList } from './TupleList';

/** the type definition of the component */
type Component = typeof TupleList;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: TupleList };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    children: [
      ['Foo', 'Hoge'],
      ['Bar', 'Fuga'],
      ['Qux', 'Piyo'],
    ],
    order: false,
  },
};
