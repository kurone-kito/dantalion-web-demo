import { describe, expect, it } from 'vitest';
import {
  defaultBirthdayValue,
  isBirthdayInSupportedRange,
  maxBirthdayValue,
  minBirthdayValue,
  parseBirthdayValue,
} from './personality-form';

describe('birthday validation helpers', () => {
  it('accepts the documented boundary values', () => {
    expect(isBirthdayInSupportedRange(minBirthdayValue)).toBe(true);
    expect(isBirthdayInSupportedRange(maxBirthdayValue)).toBe(true);
  });

  it('rejects out-of-range and malformed values', () => {
    expect(isBirthdayInSupportedRange('1700-01-01')).toBe(false);
    expect(isBirthdayInSupportedRange('2051-01-01')).toBe(false);
    expect(isBirthdayInSupportedRange('2000-02-31')).toBe(false);
    expect(isBirthdayInSupportedRange('not-a-date')).toBe(false);
  });

  it('parses the default form value into a stable local date', () => {
    const parsed = parseBirthdayValue(defaultBirthdayValue);

    expect(parsed).not.toBeNull();
    expect(parsed?.getFullYear()).toBe(2000);
    expect(parsed?.getMonth()).toBe(0);
    expect(parsed?.getDate()).toBe(1);
  });
});
