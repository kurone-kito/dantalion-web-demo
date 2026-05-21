import { describe, expect, it } from 'vitest';
import { decodePermalink, encodePermalink } from './permalink';

describe('encodePermalink', () => {
  it('builds the standard URL shape with both fields', () => {
    expect(
      encodePermalink({
        birthday: '2000-01-01',
        language: 'en',
        nickname: 'Alice',
      }),
    ).toBe('/en/?d=2000-01-01&n=Alice');
  });

  it('omits the n parameter when nickname is undefined', () => {
    expect(encodePermalink({ birthday: '2000-01-01', language: 'ja' })).toBe(
      '/ja/?d=2000-01-01',
    );
  });

  it('URL-encodes nicknames with special characters', () => {
    const url = encodePermalink({
      birthday: '2000-01-01',
      language: 'en',
      nickname: 'Bob & Alice',
    });
    expect(url).toBe('/en/?d=2000-01-01&n=Bob+%26+Alice');
  });
});

describe('decodePermalink', () => {
  it('returns the birthday when present and in range', () => {
    expect(decodePermalink('d=2000-01-01&n=Alice')).toEqual({
      birthday: '2000-01-01',
      nickname: 'Alice',
    });
  });

  it('returns nickname undefined when n is absent', () => {
    expect(decodePermalink('d=2000-01-01')).toEqual({
      birthday: '2000-01-01',
      nickname: undefined,
    });
  });

  it('rejects birthdays outside the supported range', () => {
    expect(decodePermalink('d=1700-01-01')).toEqual({
      birthday: null,
      nickname: undefined,
    });
  });

  it('rejects malformed dates', () => {
    expect(decodePermalink('d=not-a-date')).toEqual({
      birthday: null,
      nickname: undefined,
    });
  });

  it('truncates overlong nicknames to 32 characters', () => {
    const overlong = 'a'.repeat(48);
    expect(decodePermalink(`d=2000-01-01&n=${overlong}`).nickname).toHaveLength(
      32,
    );
  });

  it('treats whitespace-only nickname as undefined', () => {
    expect(
      decodePermalink('d=2000-01-01&n=%20%20%20').nickname,
    ).toBeUndefined();
  });
});
