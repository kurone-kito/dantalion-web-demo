import { createMemo, createSignal, onMount } from 'solid-js';
import { DemoShell } from '../components/demo-shell';
import { RouteMeta } from '../components/route-meta';
import { defaultLanguage, type SupportedLanguage } from '../lib/dantalion';
import { getNotFoundPageCopy } from '../lib/genius-page';
import { getLocalePath, resolveWindowLanguage } from '../lib/locale';
import { LocaleProvider } from '../lib/locale-context';

export default function NotFoundPage() {
  const [language, setLanguage] =
    createSignal<SupportedLanguage>(defaultLanguage);
  const copy = createMemo(() => getNotFoundPageCopy(language()));

  onMount(() => {
    setLanguage(resolveWindowLanguage());
  });

  return (
    <LocaleProvider language={language()}>
      <DemoShell>
        <RouteMeta
          description={getNotFoundPageCopy(defaultLanguage).body}
          includeAlternates={false}
          locale={defaultLanguage}
          noIndex={true}
          path="/404.html"
          title={getNotFoundPageCopy(defaultLanguage).metaTitle}
        />
        <article class="card bg-base-100 shadow-xl">
          <div class="card-body gap-4">
            <h2 class="text-3xl font-bold">{copy().title}</h2>
            <p class="max-w-2xl text-base-content/70">{copy().body}</p>
            <div>
              <a class="btn btn-primary" href={getLocalePath(language())}>
                {copy().actionLabel}
              </a>
            </div>
          </div>
        </article>
      </DemoShell>
    </LocaleProvider>
  );
}
