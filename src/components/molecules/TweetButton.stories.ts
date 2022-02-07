import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import type { ComponentProps } from 'react';
import { TweetButton } from './TweetButton';

/** the type definition of the component */
type Component = typeof TweetButton;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = { component: TweetButton };
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    children: 'Children',
    hashtag: 'Hashtag',
    text: 'Text',
    url: 'https://example.com',
  },
};
