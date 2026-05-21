import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LocaleProvider } from '../../lib/locale-context';
import { SectionCard } from './section-card';

const meta: Meta<typeof SectionCard> = {
  title: 'Result/SectionCard',
  component: SectionCard,
};

export default meta;

type Story = StoryObj<typeof SectionCard>;

const sampleBody =
  '<p>This is the first paragraph of the section body. Tailwind Typography styles this through the .prose class.</p><p>A second paragraph follows. The collapsible disclosure from #39 hides the body by default; the consumer can expand it via the summary toggle.</p>';

export const English: Story = {
  render: () => (
    <LocaleProvider language="en">
      <SectionCard
        bodyHtml={sampleBody}
        section={{ heading: 'Major categories of personality', id: 'sample' }}
      />
    </LocaleProvider>
  ),
};

export const Japanese: Story = {
  render: () => (
    <LocaleProvider language="ja">
      <SectionCard
        bodyHtml={sampleBody}
        section={{ heading: '性格の大分類', id: 'sample' }}
      />
    </LocaleProvider>
  ),
};
