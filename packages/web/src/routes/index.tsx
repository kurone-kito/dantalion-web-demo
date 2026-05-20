import { createResource, createSignal, For, onMount, Show } from 'solid-js';
import packageJson from '../../package.json';
import {
  defaultLanguage,
  getLocalizedPersonalityHtml,
  getLocalizedPersonalityMarkdown,
  getPersonalityFor,
  type SupportedLanguage,
  supportedLanguages,
} from '../lib/dantalion';

const smokeBirthday = new Date(2000, 0, 1);

type SmokeLocaleContent = {
  html: string;
  markdown: string;
};

type SmokeContent = Record<SupportedLanguage, SmokeLocaleContent>;

const loadSmokeContent = async (): Promise<SmokeContent> => {
  const entries: Array<[SupportedLanguage, SmokeLocaleContent]> = [];

  for (const language of supportedLanguages) {
    entries.push([
      language,
      {
        html: await getLocalizedPersonalityHtml(smokeBirthday, language),
        markdown: await getLocalizedPersonalityMarkdown(
          smokeBirthday,
          language,
        ),
      },
    ]);
  }

  return Object.fromEntries(entries) as SmokeContent;
};

export default function Home() {
  const [smoke, { refetch }] = createResource(loadSmokeContent);
  const [hydratedInBrowser, setHydratedInBrowser] = createSignal(false);
  const personality = getPersonalityFor(smokeBirthday);

  onMount(async () => {
    await refetch();
    setHydratedInBrowser(true);
  });

  return (
    <main class="min-h-screen bg-base-200 px-4 py-10">
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <article class="card bg-base-100 shadow-xl">
          <div class="card-body gap-5">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="space-y-2">
                <span class="badge badge-primary badge-lg">
                  /dantalion/ integration smoke
                </span>
                <h1 class="text-4xl font-bold">{packageJson.name}</h1>
                <p class="max-w-3xl text-base-content/80">
                  The published dantalion runtime packages are now loaded from
                  npm, localized markdown is rendered through a sanitized
                  pipeline, and the smoke route verifies both SSG output and
                  browser hydration.
                </p>
              </div>
              <div class="stats stats-vertical border border-base-300 bg-base-200 shadow-sm sm:stats-horizontal">
                <div class="stat">
                  <div class="stat-title">Smoke birthday</div>
                  <div class="stat-value text-2xl">2000-01-01</div>
                  <div class="stat-desc">
                    inner {personality.inner} / outer {personality.outer}
                  </div>
                </div>
                <div class="stat">
                  <div class="stat-title">Browser pass</div>
                  <div class="stat-value text-2xl">
                    {hydratedInBrowser() ? 'Yes' : 'Pending'}
                  </div>
                  <div class="stat-desc">Client refetch after hydration</div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <Show when={smoke()} keyed>
          {(content) => (
            <div class="grid gap-6 lg:grid-cols-2">
              <For each={supportedLanguages}>
                {(language) => (
                  <article class="card bg-base-100 shadow-xl">
                    <div class="card-body gap-5">
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <h2 class="card-title text-2xl uppercase">
                            {language}
                          </h2>
                          <p class="text-sm text-base-content/70">
                            Localized markdown rendered from the published
                            dantalion packages.
                          </p>
                        </div>
                        <span
                          class={`badge ${
                            language === defaultLanguage
                              ? 'badge-secondary'
                              : 'badge-accent'
                          }`}
                        >
                          {language === defaultLanguage
                            ? 'fallback locale'
                            : 'alternate locale'}
                        </span>
                      </div>

                      <div class="prose max-w-none rounded-box border border-base-300 bg-base-200 p-4">
                        <div innerHTML={content[language].html} />
                      </div>

                      <details class="collapse-arrow collapse border border-base-300 bg-base-100">
                        <summary class="collapse-title font-semibold">
                          Raw markdown payload
                        </summary>
                        <div class="collapse-content">
                          <pre class="overflow-x-auto whitespace-pre-wrap rounded-box bg-base-200 p-4 text-sm">
                            {content[language].markdown}
                          </pre>
                        </div>
                      </details>
                    </div>
                  </article>
                )}
              </For>
            </div>
          )}
        </Show>
      </div>
    </main>
  );
}
