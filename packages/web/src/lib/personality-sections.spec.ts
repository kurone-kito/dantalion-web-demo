import { describe, expect, it } from 'vitest';
import { splitMarkdownIntoSections } from './personality-sections';

describe('splitMarkdownIntoSections', () => {
  it('separates ## sections', () => {
    const markdown = [
      '# Title',
      '',
      'intro paragraph',
      '',
      '## Section A',
      'body of A',
      '',
      '## Section B',
      'body of B',
    ].join('\n');
    const result = splitMarkdownIntoSections(markdown);
    expect(result.intro).toBe('intro paragraph');
    expect(result.sections).toHaveLength(2);
    expect(result.sections[0]?.heading).toBe('Section A');
    expect(result.sections[0]?.body).toBe('body of A');
    expect(result.sections[1]?.heading).toBe('Section B');
    expect(result.sections[1]?.body).toBe('body of B');
  });

  it('keeps the trailing section even without a sentinel', () => {
    const markdown = '# Title\n\n## Only one\nbody';
    const result = splitMarkdownIntoSections(markdown);
    expect(result.sections).toHaveLength(1);
    expect(result.sections[0]?.heading).toBe('Only one');
    expect(result.sections[0]?.body).toBe('body');
  });

  it('returns an empty intro and no sections for empty input', () => {
    const result = splitMarkdownIntoSections('');
    expect(result.intro).toBe('');
    expect(result.sections).toHaveLength(0);
  });

  it('produces stable slug ids derived from headings', () => {
    const result = splitMarkdownIntoSections(
      '## 性格の大分類\nbody\n\n## Personality category\nmore body',
    );
    expect(result.sections.map((section) => section.id)).toEqual([
      '性格の大分類',
      'personality-category',
    ]);
  });
});
