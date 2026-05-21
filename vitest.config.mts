import solid from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [solid({ hot: false })],
  resolve: {
    conditions: ['development', 'browser'],
  },
  test: {
    passWithNoTests: true,
    include: ['packages/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      '**/e2e/**',
      '**/node_modules/**',
      '**/.output/**',
      '**/.vinxi/**',
    ],
    setupFiles: ['./packages/web/vitest-jest-dom.setup.ts'],
    server: {
      deps: {
        inline: [/@solidjs\/router/u],
      },
    },
  },
});
