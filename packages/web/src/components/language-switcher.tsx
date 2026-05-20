import { A } from '@solidjs/router';
import { createMemo, For, Show } from 'solid-js';
import { supportedLanguages } from '../lib/dantalion';
import { getDemoPageCopy } from '../lib/demo-page';
import { localeDisplayNames } from '../lib/locale';
import { useLocale } from '../lib/locale-context';

export function LanguageSwitcher() {
  const { language, persistLanguage, toPath } = useLocale();
  const copy = createMemo(() => getDemoPageCopy(language()));

  return (
    <div class="dropdown dropdown-end">
      <button
        aria-label={copy().localeMenuLabel}
        class="btn btn-outline gap-2"
        tabIndex={0}
        type="button"
      >
        <span class="text-sm font-medium">
          {localeDisplayNames[language()]}
        </span>
        <svg
          aria-hidden="true"
          class="size-4"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
        >
          <path
            d="m6 9 6 6 6-6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <ul class="menu dropdown-content z-10 mt-3 w-44 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
        <For each={supportedLanguages}>
          {(candidate) => (
            <li>
              <A
                aria-current={candidate === language() ? 'page' : undefined}
                class="flex items-center justify-between gap-3"
                href={toPath(candidate)}
                onClick={() => {
                  persistLanguage(candidate);
                }}
              >
                <span>{localeDisplayNames[candidate]}</span>
                <Show when={candidate === language()}>
                  <span class="badge badge-primary badge-sm">
                    {copy().localeCurrentBadge}
                  </span>
                </Show>
              </A>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
