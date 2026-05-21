import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LocaleProvider } from '../../lib/locale-context';
import { HeroSection } from './hero-section';

const meta: Meta<typeof HeroSection> = {
  title: 'Landing/HeroSection',
  component: HeroSection,
};

export default meta;

type Story = StoryObj<typeof HeroSection>;

export const English: Story = {
  render: () => (
    <LocaleProvider language="en">
      <HeroSection />
    </LocaleProvider>
  ),
};

export const Japanese: Story = {
  render: () => (
    <LocaleProvider language="ja">
      <HeroSection />
    </LocaleProvider>
  ),
};
