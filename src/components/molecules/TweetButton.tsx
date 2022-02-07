import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactNode, VFC } from 'react';
import tw from 'twin.macro';
import { Anchor } from '../atoms/Anchor';
import type { CreateTweetUrlOptions } from '../../utils/createTweetUrl';
import { createTweetUrl } from '../../utils/createTweetUrl';

/** Type definition of the required attributes. */
export interface TweetButtonProps extends CreateTweetUrlOptions {
  /** The children items. */
  readonly children?: ReactNode;
}

/** The styles for the component. */
const styles = tw`
  text-center mb-4 select-none
  [& > a]:(
    block
    duration-200
    ease-in-out
    flex-grow
    font-bold
    leading-5
    nm-flat-indigo-100
    px-8
    py-4
    rounded-full
    text-base
    tracking-widest
    transform
    transition
    uppercase
    dark:nm-flat-purple-800
    hover:(nm-flat-blue-50-lg dark:nm-flat-purple-900)
    sm:text-xl
    svg:(animate-pulse mx-2)
  )
`;

/**
 * Tweet button component.
 *
 * @param props required attributes.
 * @param props.children The children items.
 * @returns the component.
 */
export const TweetButton: VFC<TweetButtonProps> = ({ children, ...props }) => (
  <p css={styles}>
    <Anchor href={createTweetUrl(props)} noblank nofollow>
      <FontAwesomeIcon icon={faTwitter} />
      {children}
    </Anchor>
  </p>
);
TweetButton.displayName = 'TweetButton';
