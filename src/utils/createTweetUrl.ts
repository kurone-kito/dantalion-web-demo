import { stringify } from 'qs';

/** The options for createTweetUrl function */
export interface CreateTweetUrlOptions {
  /** The hashtag. */
  readonly hashtag?: string;
  /** The content. */
  readonly text: string;
  /** URL. */
  readonly url?: string;
}

/**
 * Create the Tweet button URL.
 *
 * @param props The props.
 * @returns the Tweet button URL
 */
export const createTweetUrl = (props: CreateTweetUrlOptions): string => {
  const { hashtag, text, url } = props;
  const query = stringify(
    { button_hashtag: hashtag, text, url },
    { addQueryPrefix: true }
  );
  return `https://twitter.com/intent/tweet${query}`;
};
