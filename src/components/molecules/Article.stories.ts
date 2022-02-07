import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { Article } from './Article';

/** the type definition of the component */
type Component = typeof Article;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: Article };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    featureBody: ['Foo', 'Bar', 'Qux'],
    children: '_Markdown_ **contents**',
    featureHeading: 'FeatureHeading',
    tooltipFeatureDetails: 'TooltipFeatureDetails',
  },
};
