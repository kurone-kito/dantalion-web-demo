import type { DecoratorFunction, Parameters } from '@storybook/addons';
import * as React from 'react';
import { GlobalStyles } from 'twin.macro';

export const decorators: DecoratorFunction[] = [
  (Story) => (
    <>
      <GlobalStyles />
      {/* @ts-ignore */}
      <Story />
    </>
  ),
];

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true, sort: 'requiredFirst' },
  layout: 'centered',
};
