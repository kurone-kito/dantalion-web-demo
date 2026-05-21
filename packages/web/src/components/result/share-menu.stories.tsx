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
        genius="100"
        innerGenius="100"
        language="en"
        nickname="Alice"
        outerGenius="108"
        workStyleGenius="125"
      />
    </LocaleProvider>
  ),
};

export const Japanese: Story = {
  render: () => (
    <LocaleProvider language="ja">
      <ShareMenu
        genius="100"
        innerGenius="100"
        language="ja"
        nickname="アリス"
        outerGenius="108"
        workStyleGenius="125"
      />
    </LocaleProvider>
  ),
};
