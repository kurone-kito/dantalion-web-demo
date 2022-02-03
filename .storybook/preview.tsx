import type { Parameters } from '@storybook/addons';

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true, sort: 'requiredFirst' },
  layout: 'centered',
};
