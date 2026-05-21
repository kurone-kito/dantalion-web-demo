import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LocaleProvider } from '../../lib/locale-context';
import { FileIdBadge } from './file-id-badge';

const meta: Meta<typeof FileIdBadge> = {
  title: 'Result/FileIdBadge',
  component: FileIdBadge,
};

export default meta;

type Story = StoryObj<typeof FileIdBadge>;

export const English: Story = {
  render: () => (
    <LocaleProvider language="en">
      <FileIdBadge genius="100" language="en" />
    </LocaleProvider>
  ),
};

export const Japanese: Story = {
  render: () => (
    <LocaleProvider language="ja">
      <FileIdBadge genius="100" language="ja" />
    </LocaleProvider>
  ),
};
