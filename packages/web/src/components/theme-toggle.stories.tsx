import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LocaleProvider } from '../lib/locale-context';
import { ThemeToggle } from './theme-toggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

const renderWith = (language: 'en' | 'ja') => () => (
  <LocaleProvider language={language}>
    <div class="p-8">
      <ThemeToggle />
    </div>
  </LocaleProvider>
);

export const English: Story = {
  render: renderWith('en'),
};

export const Japanese: Story = {
  render: renderWith('ja'),
};
