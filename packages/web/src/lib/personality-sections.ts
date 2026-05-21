export type PersonalitySection = {
  body: string;
  heading: string;
  id: string;
};

export type PersonalitySplit = {
  intro: string;
  sections: readonly PersonalitySection[];
};

const slugify = (heading: string): string =>
  heading
    .toLowerCase()
    .normalize('NFKD')
    .replaceAll(/[^a-z0-9\p{Letter}\p{Number}]+/gu, '-')
    .replaceAll(/^-+|-+$/gu, '');

export const splitMarkdownIntoSections = (
  markdown: string,
): PersonalitySplit => {
  const lines = markdown.split('\n');
  let intro = '';
  const sections: PersonalitySection[] = [];

  let current: { heading: string; body: string[] } | null = null;
  const introLines: string[] = [];

  for (const line of lines) {
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (match?.[1]) {
      if (current) {
        sections.push({
          body: current.body.join('\n').trim(),
          heading: current.heading,
          id: slugify(current.heading),
        });
      }
      current = { body: [], heading: match[1].trim() };
      continue;
    }

    if (current) {
      current.body.push(line);
      continue;
    }

    if (/^#\s+/.test(line)) {
      // skip the top-level title — the wrapper supplies its own heading
      continue;
    }
    introLines.push(line);
  }

  if (current) {
    sections.push({
      body: current.body.join('\n').trim(),
      heading: current.heading,
      id: slugify(current.heading),
    });
  }

  intro = introLines.join('\n').trim();

  return { intro, sections };
};
