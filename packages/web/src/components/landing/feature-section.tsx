import { For } from 'solid-js';
import { useWebCopy } from '../../i18n/web-copy';
import { renderMarkdownToHtml } from '../../lib/dantalion';

export function FeatureSection() {
  const copy = useWebCopy();
  return (
    <section
      aria-labelledby="feature-heading"
      class="card bg-base-100 shadow-xl"
    >
      <div class="card-body gap-4">
        <h2 class="card-title text-2xl" id="feature-heading">
          {copy().landing.feature.title}
        </h2>
        <ul class="grid gap-2 text-base-content">
          <For each={copy().landing.feature.items}>
            {(item) => (
              <li class="flex items-start gap-2">
                <span aria-hidden="true" class="mt-1 text-primary">
                  ✓
                </span>
                <span
                  class="prose max-w-none flex-1"
                  innerHTML={renderMarkdownToHtml(item)}
                />
              </li>
            )}
          </For>
        </ul>
      </div>
    </section>
  );
}
