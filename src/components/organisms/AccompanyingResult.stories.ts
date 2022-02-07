import { getDetail } from '@kurone-kito/dantalion-core';
import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { AccompanyingResult } from '../../components/organisms/AccompanyingResult';

/** the type definition of the component */
type Component = typeof AccompanyingResult;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: AccompanyingResult };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: { details: getDetail('000'), nickname: 'Nickname' },
};
