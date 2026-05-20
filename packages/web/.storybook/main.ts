import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import type { StorybookConfig } from 'storybook-solidjs-vite';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));

const config: StorybookConfig = {
  framework: {
    name: 'storybook-solidjs-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  staticDirs: ['../public'],
  async viteFinal(viteConfig) {
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(tailwindcss());
    viteConfig.root = projectRoot;
    return viteConfig;
  },
};

export default config;
