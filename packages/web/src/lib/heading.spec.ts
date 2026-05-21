import { describe, expect, it } from 'vitest';
import { formatHeading, normalizeNickname } from './heading';

describe('formatHeading', () => {
  it('substitutes the nickname token with the trimmed value', () => {
    expect(
      formatHeading("{{nickname}}'s personality", 'Alice', 'Anonymous'),
    ).toBe("Alice's personality");
  });

  it('falls back when nickname is undefined', () => {
    expect(
      formatHeading('{{nickname}}さんの性格診断', undefined, '名無しの権兵衛'),
    ).toBe('名無しの権兵衛さんの性格診断');
  });

  it('falls back when nickname is empty or whitespace', () => {
    expect(formatHeading('{{nickname}} result', '', 'Anon')).toBe(
      'Anon result',
    );
    expect(formatHeading('{{nickname}} result', '   ', 'Anon')).toBe(
      'Anon result',
    );
  });

  it('leaves templates without the token untouched', () => {
    expect(formatHeading('Personality result', 'Bob', 'Anon')).toBe(
      'Personality result',
    );
  });

  it('replaces every occurrence of the nickname token', () => {
    expect(
      formatHeading('{{nickname}}, see {{nickname}} again', 'Bob', 'Anon'),
    ).toBe('Bob, see Bob again');
  });
});

describe('normalizeNickname', () => {
  it('returns undefined for empty / whitespace-only / non-string inputs', () => {
    expect(normalizeNickname(undefined)).toBeUndefined();
    expect(normalizeNickname(null)).toBeUndefined();
    expect(normalizeNickname('')).toBeUndefined();
    expect(normalizeNickname('   ')).toBeUndefined();
  });

  it('trims surrounding whitespace', () => {
    expect(normalizeNickname('  Alice  ')).toBe('Alice');
  });

  it('truncates to the configured maximum length', () => {
    const overlong = 'a'.repeat(40);
    expect(normalizeNickname(overlong, 32)).toBe('a'.repeat(32));
  });

  it('keeps strings inside the maximum length intact', () => {
    expect(normalizeNickname('Bob', 32)).toBe('Bob');
  });
});
