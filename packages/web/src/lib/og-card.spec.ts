// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { canShareFiles, renderOgCard } from './og-card';

describe('canShareFiles', () => {
  it('returns false when navigator.canShare is unavailable', () => {
    expect(canShareFiles()).toBe(false);
  });
});

describe('renderOgCard', () => {
  it('throws a descriptive error when 2D context cannot be acquired (jsdom path)', async () => {
    // jsdom does not implement canvas drawing surfaces. The renderer
    // surfaces a clear error in that case so consumers can fall back to
    // the no-files share path. A real browser supplies a 2D context and
    // the renderer produces a PNG blob — that path is exercised manually.
    await expect(
      renderOgCard({
        fileIdLabel: 'Personality file',
        footerUrl: 'kurone-kito.github.io/dantalion',
        innerGenius: '100',
        language: 'en',
        nickname: 'Alice',
        outerGenius: '108',
        resultHeading: "Alice's personality",
        workStyleGenius: '125',
      }),
    ).rejects.toThrow(/2D drawing context/u);
  });
});
