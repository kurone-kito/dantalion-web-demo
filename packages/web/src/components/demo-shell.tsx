import type { JSX } from 'solid-js';
import { createMemo } from 'solid-js';
import { getDemoPageCopy } from '../lib/demo-page';
import { useLocale } from '../lib/locale-context';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from './theme-toggle';

export type DemoShellProps = {
  children: JSX.Element;
};

export function DemoShell(props: DemoShellProps) {
  const { language } = useLocale();
  const copy = createMemo(() => getDemoPageCopy(language()));

  return (
    <main class="min-h-screen bg-base-200 px-4 py-10">
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <article class="card bg-base-100 shadow-xl">
          <div class="card-body gap-5">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div class="space-y-3">
                <span class="badge badge-primary badge-lg">
                  {copy().badgeLabel}
                </span>
                <h1 class="text-4xl font-bold">{copy().title}</h1>
                <p class="max-w-3xl text-base-content/80">{copy().summary}</p>
              </div>
              <div class="flex items-center gap-3 self-start">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </article>
        {props.children}
      </div>
    </main>
  );
}
