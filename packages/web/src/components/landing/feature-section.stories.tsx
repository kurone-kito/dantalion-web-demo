import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LocaleProvider } from '../../lib/locale-context';
import { FeatureSection } from './feature-section';

const meta: Meta<typeof FeatureSection> = {
  title: 'Landing/FeatureSection',
  component: FeatureSection,
};

export default meta;

type Story = StoryObj<typeof FeatureSection>;

export const English: Story = {
  render: () => (
    <LocaleProvider language="en">
      <FeatureSection />
    </LocaleProvider>
  ),
};

export const Japanese: Story = {
  render: () => (
    <LocaleProvider language="ja">
      <FeatureSection />
    </LocaleProvider>
  ),
};
