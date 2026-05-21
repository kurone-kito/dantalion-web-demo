import { createMemo } from 'solid-js';
import { useWebCopy } from '../../i18n/web-copy';
import { renderMarkdownToHtml } from '../../lib/dantalion';

export function PrefaceSection() {
  const copy = useWebCopy();
  const introHtml = createMemo(() =>
    renderMarkdownToHtml(copy().landing.preface.intro),
  );
  const purposeHtml = createMemo(() =>
    renderMarkdownToHtml(copy().landing.preface.purpose),
  );
  return (
    <section
      aria-labelledby="preface-heading"
      class="card bg-base-100 shadow-xl"
    >
      <div class="card-body gap-3">
        <h2 class="card-title text-2xl" id="preface-heading">
          {copy().demoPage.title}
        </h2>
        <div
          class="prose max-w-none text-base-content"
          innerHTML={introHtml()}
        />
        <div
          class="prose max-w-none text-base-content"
          innerHTML={purposeHtml()}
        />
      </div>
    </section>
  );
}
