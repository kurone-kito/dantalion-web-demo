import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LocaleProvider } from '../../lib/locale-context';
import { InstallSection } from './install-section';

const meta: Meta<typeof InstallSection> = {
  title: 'Landing/InstallSection',
  component: InstallSection,
};

export default meta;

type Story = StoryObj<typeof InstallSection>;

export const English: Story = {
  render: () => (
    <LocaleProvider language="en">
      <InstallSection />
    </LocaleProvider>
  ),
};

export const Japanese: Story = {
  render: () => (
    <LocaleProvider language="ja">
      <InstallSection />
    </LocaleProvider>
  ),
};
