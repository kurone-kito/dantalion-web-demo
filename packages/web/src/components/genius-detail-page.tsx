import { createAsync } from '@solidjs/router';
import { createMemo, Show } from 'solid-js';
import {
  type Genius,
  getGeniusPath,
  getLocalizedDetailHtml,
  type SupportedLanguage,
} from '../lib/dantalion';
import { getGeniusPageCopy } from '../lib/genius-page';
import { getLocalePath } from '../lib/locale';

export type GeniusDetailPageProps = {
  genius: Genius;
  language: SupportedLanguage;
};

export function GeniusDetailPage(props: GeniusDetailPageProps) {
  const copy = createMemo(() =>
    getGeniusPageCopy(props.language, props.genius),
  );
  const detailHtml = createAsync(() =>
    getLocalizedDetailHtml(props.genius, props.language),
  );

  return (
    <article class="card bg-base-100 shadow-xl">
      <div class="card-body gap-6">
        <nav aria-label="Breadcrumb" class="breadcrumbs text-sm">
          <ul>
            <li>
              <a href={getLocalePath(props.language)}>
                {copy().breadcrumbHomeLabel}
              </a>
            </li>
            <li>{copy().title}</li>
          </ul>
        </nav>

        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-3">
            <span class="badge badge-outline">{copy().title}</span>
            <div class="space-y-2">
              <h2 class="text-3xl font-bold">{copy().title}</h2>
              <p class="max-w-3xl text-base-content/70">{copy().summary}</p>
            </div>
          </div>
          <a
            class="btn btn-primary self-start lg:self-auto"
            href={getLocalePath(props.language)}
          >
            {copy().ctaLabel}
          </a>
        </div>

        <Show
          fallback={
            <div
              class="flex items-center gap-3 text-base-content/70"
              role="status"
            >
              <span
                aria-hidden="true"
                class="loading loading-spinner loading-md"
              />
              <span>{copy().loadingLabel}</span>
            </div>
          }
          when={detailHtml()}
        >
          {(html) => (
            <div class="prose max-w-none rounded-box border border-base-300 bg-base-200 p-6">
              <div innerHTML={html()} />
            </div>
          )}
        </Show>

        <div class="flex flex-wrap gap-3">
          <a
            class="btn btn-outline btn-sm"
            href={getGeniusPath('en', props.genius)}
          >
            English
          </a>
          <a
            class="btn btn-outline btn-sm"
            href={getGeniusPath('ja', props.genius)}
          >
            日本語
          </a>
        </div>
      </div>
    </article>
  );
}
