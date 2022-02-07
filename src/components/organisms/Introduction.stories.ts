import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { Introduction } from './Introduction';

/** the type definition of the component */
type Component = typeof Introduction;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: Introduction };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    exampleCode: 'ExampleCode',
    featureBody: ['Foo', 'Bar', 'Qux'],
    featureTitle: 'FeatureTitle',
    preface: 'Preface',
    repoUrl: 'https://example.com/',
    repoText: 'RepoText',
    tooltipSummary: 'TooltipSummary',
  },
};
