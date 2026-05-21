import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LocaleProvider } from '../../lib/locale-context';
import { ShareMenu } from './share-menu';

const meta: Meta<typeof ShareMenu> = {
  title: 'Result/ShareMenu',
  component: ShareMenu,
};

export default meta;

type Story = StoryObj<typeof ShareMenu>;

export const English: Story = {
  render: () => (
    <LocaleProvider language="en">
      <ShareMenu
        birthday="2000-01-01"
        genius="100"
        language="en"
        nickname="Alice"
      />
    </LocaleProvider>
  ),
};

export const Japanese: Story = {
  render: () => (
    <LocaleProvider language="ja">
      <ShareMenu
        birthday="2000-01-01"
        genius="100"
        language="ja"
        nickname="アリス"
      />
    </LocaleProvider>
  ),
};
