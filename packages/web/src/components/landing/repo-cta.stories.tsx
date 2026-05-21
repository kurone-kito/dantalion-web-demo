import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LocaleProvider } from '../../lib/locale-context';
import { RepoCta } from './repo-cta';

const meta: Meta<typeof RepoCta> = {
  title: 'Landing/RepoCta',
  component: RepoCta,
};

export default meta;

type Story = StoryObj<typeof RepoCta>;

export const English: Story = {
  render: () => (
    <LocaleProvider language="en">
      <RepoCta />
    </LocaleProvider>
  ),
};

export const Japanese: Story = {
  render: () => (
    <LocaleProvider language="ja">
      <RepoCta />
    </LocaleProvider>
  ),
};
