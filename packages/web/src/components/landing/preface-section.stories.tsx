import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LocaleProvider } from '../../lib/locale-context';
import { PrefaceSection } from './preface-section';

const meta: Meta<typeof PrefaceSection> = {
  title: 'Landing/PrefaceSection',
  component: PrefaceSection,
};

export default meta;

type Story = StoryObj<typeof PrefaceSection>;

export const English: Story = {
  render: () => (
    <LocaleProvider language="en">
      <PrefaceSection />
    </LocaleProvider>
  ),
};

export const Japanese: Story = {
  render: () => (
    <LocaleProvider language="ja">
      <PrefaceSection />
    </LocaleProvider>
  ),
};
