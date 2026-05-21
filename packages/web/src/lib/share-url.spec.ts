import { describe, expect, it } from 'vitest';
import { decodeShareUrl, encodeShareUrl } from './share-url';

describe('encodeShareUrl', () => {
  it('builds the result triple path without a nickname', () => {
    expect(
      encodeShareUrl({
        innerGenius: '100',
        language: 'en',
        outerGenius: '108',
        workStyleGenius: '125',
      }),
    ).toBe('/en/result/100-108-125/');
  });

  it('appends the n query when nickname is provided', () => {
    expect(
      encodeShareUrl({
        innerGenius: '100',
        language: 'ja',
        nickname: 'Alice',
        outerGenius: '108',
        workStyleGenius: '125',
      }),
    ).toBe('/ja/result/100-108-125/?n=Alice');
  });

  it('URL-encodes special characters in nickname', () => {
    expect(
      encodeShareUrl({
        innerGenius: '100',
        language: 'en',
        nickname: 'A & B',
        outerGenius: '108',
        workStyleGenius: '125',
      }),
    ).toBe('/en/result/100-108-125/?n=A+%26+B');
  });
});

describe('decodeShareUrl', () => {
  it('parses a valid triple + nickname', () => {
    expect(decodeShareUrl('100-108-125', 'n=Alice')).toEqual({
      genius: ['100', '108', '125'],
      nickname: 'Alice',
    });
  });

  it('returns null genius for triples with fewer than 3 parts', () => {
    expect(decodeShareUrl('100-108', '')).toEqual({
      genius: null,
      nickname: undefined,
    });
  });

  it('returns null genius for triples with more than 3 parts', () => {
    expect(decodeShareUrl('100-108-125-919', '')).toEqual({
      genius: null,
      nickname: undefined,
    });
  });

  it('rejects unsupported genius codes in any position', () => {
    expect(decodeShareUrl('100-bogus-125', '')).toEqual({
      genius: null,
      nickname: undefined,
    });
  });

  it('truncates overlong nicknames to 32 characters', () => {
    const overlong = 'a'.repeat(48);
    const result = decodeShareUrl('100-108-125', `n=${overlong}`);
    expect(result.nickname).toHaveLength(32);
  });

  it('treats whitespace-only nickname as undefined', () => {
    expect(decodeShareUrl('100-108-125', 'n=%20%20').nickname).toBeUndefined();
  });
});
