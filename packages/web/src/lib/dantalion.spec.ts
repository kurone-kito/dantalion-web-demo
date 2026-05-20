import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  type DescriptionsType,
  defaultLanguage,
  geniusTypes,
  getDescriptionsFor,
  getLocalizedPersonalityMarkdown,
  getPersonalityFor,
  renderMarkdownToHtml,
} from './dantalion';

const smokeBirthday = new Date(2000, 0, 1);

describe('dantalion integration', () => {
  it('returns a personality whose genius fields match the exported type list', () => {
    const personality = getPersonalityFor(smokeBirthday);

    expect(geniusTypes).toContain(personality.inner);
    expect(geniusTypes).toContain(personality.outer);
    expect(geniusTypes).toContain(personality.workStyle);
  });

  it('loads localized markdown for both supported languages', async () => {
    const jaMarkdown = await getLocalizedPersonalityMarkdown(
      smokeBirthday,
      'ja',
    );
    const enMarkdown = await getLocalizedPersonalityMarkdown(
      smokeBirthday,
      defaultLanguage,
    );

    expect(jaMarkdown).toContain('#');
    expect(enMarkdown).toContain('#');
    expect(jaMarkdown).not.toEqual(enMarkdown);
    expect(jaMarkdown).toMatch(/性格|思考|戦略/u);
    expect(enMarkdown).toMatch(/Personality|Brain|Strategy/u);
  });

  it('keeps the renamed DescriptionsType import working', async () => {
    const descriptions: DescriptionsType = await getDescriptionsFor(
      defaultLanguage,
      '2000-01-01',
    );

    expectTypeOf(descriptions).toEqualTypeOf<DescriptionsType>();
    expect(descriptions.invalid).not.toHaveLength(0);
    expect(descriptions.personality).not.toHaveLength(0);
  });

  it('sanitizes rendered markdown html', () => {
    const html = renderMarkdownToHtml('## Safe\n\n<script>alert(1)</script>');

    expect(html).toContain('<h2');
    expect(html).not.toContain('<script');
  });
});
