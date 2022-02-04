import type { Parameters } from '@storybook/addons';
import 'tailwindcss/tailwind.css';

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true, sort: 'requiredFirst' },
  layout: 'centered',
};
