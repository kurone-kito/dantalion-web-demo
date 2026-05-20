import type { Preview } from 'storybook-solidjs-vite';
import '../src/app.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      description: 'DaisyUI theme applied to the preview shell',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      if (typeof document !== 'undefined') {
        document.documentElement.dataset['theme'] = context.globals['theme'] as
          | string
          | undefined;
      }
      return Story();
    },
  ],
};

export default preview;
