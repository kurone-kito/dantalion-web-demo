import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LocaleProvider } from '../../lib/locale-context';
import { PrivacyCallout } from './privacy-callout';

const meta: Meta<typeof PrivacyCallout> = {
  title: 'Landing/PrivacyCallout',
  component: PrivacyCallout,
};

export default meta;

type Story = StoryObj<typeof PrivacyCallout>;

export const English: Story = {
  render: () => (
    <LocaleProvider language="en">
      <PrivacyCallout />
    </LocaleProvider>
  ),
};

export const Japanese: Story = {
  render: () => (
    <LocaleProvider language="ja">
      <PrivacyCallout />
    </LocaleProvider>
  ),
};
