import { describe, expect, it } from 'vitest';
import { buildMeta, defaultOgImagePath, defaultSiteOrigin } from './meta';

describe('buildMeta', () => {
  it('matches the english home route snapshot', () => {
    expect(
      buildMeta({
        description:
          'Enter a birthday to render the localized personality result with the published dantalion packages.',
        locale: 'en',
        path: '/en/',
        title: 'Dantalion - birthday personality demo',
      }),
    ).toMatchInlineSnapshot(`
      {
        "links": [
          {
            "href": "https://kurone-kito.github.io/dantalion/en/",
            "rel": "canonical",
          },
          {
            "href": "https://kurone-kito.github.io/dantalion/en/",
            "hreflang": "en",
            "rel": "alternate",
          },
          {
            "href": "https://kurone-kito.github.io/dantalion/ja/",
            "hreflang": "ja",
            "rel": "alternate",
          },
          {
            "href": "https://kurone-kito.github.io/dantalion/en/",
            "hreflang": "x-default",
            "rel": "alternate",
          },
        ],
        "metaTags": [
          {
            "content": "Enter a birthday to render the localized personality result with the published dantalion packages.",
            "name": "description",
          },
          {
            "content": "Dantalion - birthday personality demo",
            "property": "og:title",
          },
          {
            "content": "Enter a birthday to render the localized personality result with the published dantalion packages.",
            "property": "og:description",
          },
          {
            "content": "website",
            "property": "og:type",
          },
          {
            "content": "https://kurone-kito.github.io/dantalion/en/",
            "property": "og:url",
          },
          {
            "content": "https://kurone-kito.github.io/dantalion/og.png",
            "property": "og:image",
          },
          {
            "content": "en_US",
            "property": "og:locale",
          },
          {
            "content": "summary_large_image",
            "name": "twitter:card",
          },
          {
            "content": "Dantalion - birthday personality demo",
            "name": "twitter:title",
          },
          {
            "content": "Enter a birthday to render the localized personality result with the published dantalion packages.",
            "name": "twitter:description",
          },
          {
            "content": "https://kurone-kito.github.io/dantalion/og.png",
            "name": "twitter:image",
          },
        ],
        "title": "Dantalion - birthday personality demo",
      }
    `);
  });

  it('matches the japanese home route snapshot', () => {
    expect(
      buildMeta({
        description:
          '誕生日を入力すると、公開済みの dantalion パッケージでローカライズされた性格結果を表示します。',
        locale: 'ja',
        path: '/ja/',
        title: 'Dantalion - 誕生日性格診断デモ',
      }),
    ).toMatchInlineSnapshot(`
      {
        "links": [
          {
            "href": "https://kurone-kito.github.io/dantalion/ja/",
            "rel": "canonical",
          },
          {
            "href": "https://kurone-kito.github.io/dantalion/en/",
            "hreflang": "en",
            "rel": "alternate",
          },
          {
            "href": "https://kurone-kito.github.io/dantalion/ja/",
            "hreflang": "ja",
            "rel": "alternate",
          },
          {
            "href": "https://kurone-kito.github.io/dantalion/en/",
            "hreflang": "x-default",
            "rel": "alternate",
          },
        ],
        "metaTags": [
          {
            "content": "誕生日を入力すると、公開済みの dantalion パッケージでローカライズされた性格結果を表示します。",
            "name": "description",
          },
          {
            "content": "Dantalion - 誕生日性格診断デモ",
            "property": "og:title",
          },
          {
            "content": "誕生日を入力すると、公開済みの dantalion パッケージでローカライズされた性格結果を表示します。",
            "property": "og:description",
          },
          {
            "content": "website",
            "property": "og:type",
          },
          {
            "content": "https://kurone-kito.github.io/dantalion/ja/",
            "property": "og:url",
          },
          {
            "content": "https://kurone-kito.github.io/dantalion/og.png",
            "property": "og:image",
          },
          {
            "content": "ja_JP",
            "property": "og:locale",
          },
          {
            "content": "summary_large_image",
            "name": "twitter:card",
          },
          {
            "content": "Dantalion - 誕生日性格診断デモ",
            "name": "twitter:title",
          },
          {
            "content": "誕生日を入力すると、公開済みの dantalion パッケージでローカライズされた性格結果を表示します。",
            "name": "twitter:description",
          },
          {
            "content": "https://kurone-kito.github.io/dantalion/og.png",
            "name": "twitter:image",
          },
        ],
        "title": "Dantalion - 誕生日性格診断デモ",
      }
    `);
  });

  it('uses the default site origin and OGP image path', () => {
    const meta = buildMeta({
      description: 'placeholder',
      locale: 'en',
      path: '/en/',
      title: 'placeholder',
    });

    expect(defaultSiteOrigin).toContain('kurone-kito.github.io');
    expect(defaultOgImagePath).toBe('/og.png');
    expect(meta.links[0]).toMatchObject({
      href: `${defaultSiteOrigin}/en/`,
      rel: 'canonical',
    });
  });
});
