import type { CreateTweetUrlOptions } from './createTweetUrl';
import { createTweetUrl } from './createTweetUrl';

describe('createTweetUrl', () => {
  it('should create the Tweet button URL', () => {
    const options: CreateTweetUrlOptions = {
      hashtag: '#hashtag',
      text: 'text',
      url: 'url',
    };
    const result = createTweetUrl(options);
    expect(result).toBe(
      'https://twitter.com/intent/tweet?button_hashtag=%23hashtag&text=text&url=url'
    );
  });
});
