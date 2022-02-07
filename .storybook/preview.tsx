import type { DecoratorFunction, Parameters } from '@storybook/addons';
import * as React from 'react';
import { GlobalStyles } from 'twin.macro';
import { useChangeLanguage } from '../src/hooks/useChangeLanguage';
import '../src/i18n';

export const decorators: DecoratorFunction[] = [
  (Story) => {
    useChangeLanguage(undefined);
    return (
      <>
        <GlobalStyles />
        {/* @ts-ignore */}
        <Story />
      </>
    );
  },
];

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true, sort: 'requiredFirst' },
  layout: 'centered',
};
