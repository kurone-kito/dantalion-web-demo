import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  type DescriptionsType,
  defaultLanguage,
  geniusTypes,
  getDescriptionsFor,
  getLocalizedDetailMarkdown,
  getLocalizedPersonalityMarkdown,
  getLocalizedPersonalityPreview,
  getPersonalityFor,
  normalizeGenius,
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

  it('loads localized genius detail markdown for both supported languages', async () => {
    const genius = geniusTypes[0];

    expect(genius).toBeDefined();

    if (!genius) {
      throw new Error('Expected at least one supported genius value.');
    }

    const jaMarkdown = await getLocalizedDetailMarkdown(genius, 'ja');
    const enMarkdown = await getLocalizedDetailMarkdown(
      genius,
      defaultLanguage,
    );

    expect(jaMarkdown).toContain('#');
    expect(enMarkdown).toContain('#');
    expect(jaMarkdown).toContain('Dantalion');
    expect(enMarkdown).toContain('Dantalion');
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

  it('returns the computed genius alongside the localized preview html', async () => {
    const preview = await getLocalizedPersonalityPreview(
      smokeBirthday,
      defaultLanguage,
    );

    expect(preview.html).toContain('<h');
    expect(geniusTypes).toContain(preview.genius);
  });

  it('normalizes only supported genius route params', () => {
    expect(normalizeGenius('100')).toBe('100');
    expect(normalizeGenius(' 100 ')).toBe('100');
    expect(normalizeGenius('404')).toBeNull();
    expect(normalizeGenius('unknown')).toBeNull();
  });
});
