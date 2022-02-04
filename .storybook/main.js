/**
 * @typedef {import("@babel/core").TransformOptions} TransformOptions
 * @typedef {import("@storybook/core-common").Options} Options
 * @typedef {import("@storybook/core-common").StorybookConfig} StorybookConfig
 */

/**
 * @template T
 * @typedef {import("type-fest").Promisable<T>} Promisable
 */

const postcss = require('postcss');

/**
 * the configuration for the storybook
 *
 * @type {StorybookConfig}
 */
module.exports = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: { postcssLoaderOptions: { implementation: postcss } },
    },
    {
      name: 'storybook-addon-turbo-build',
      options: {
        esbuildMinifyOptions: { target: 'es2021' },
        optimizationLevel: 2,
      },
    },
  ],
  /** @type {(options: TransformOptions) => Promisable<TransformOptions>} */
  babel: ({ plugins = [], presets = [], ...options }) => ({
    ...options,
    plugins: [
      'babel-plugin-twin',
      ...plugins,
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ],
    presets: [...presets, '@emotion/babel-preset-css-prop'],
  }),
  core: { builder: 'webpack5' },
  features: {
    argTypeTargetsV7: true,
    breakingChangesV7: true,
    buildStoriesJson: true,
    emotionAlias: true,
    modernInlineRender: true,
    postcss: true,
    warnOnLegacyHierarchySeparator: true,
  },
  framework: '@storybook/react',
  /** @type {(head: string, options: Options) => Promisable<string | undefined>} */
  managerHead: (head, { configType }) =>
    configType === 'PRODUCTION'
      ? `<base href="${process.env.CI ? '/dantalion' : ''}/storybook/">${head}`
      : undefined,
  stories: [{ directory: '../src' }],
  typescript: { check: true, reactDocgen: 'react-docgen-typescript' },
};
