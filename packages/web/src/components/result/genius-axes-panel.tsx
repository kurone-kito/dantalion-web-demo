import { For } from 'solid-js';
import { useWebCopy } from '../../i18n/web-copy';
import type { Genius, SupportedLanguage } from '../../lib/dantalion';
import { getGeniusPath } from '../../lib/dantalion';
import { type GeniusAxisId, geniusAxes } from '../../lib/genius-axis';

export type GeniusAxesPanelProps = {
  innerGenius: Genius;
  language: SupportedLanguage;
  outerGenius: Genius;
  workStyleGenius: Genius;
};

export function GeniusAxesPanel(props: GeniusAxesPanelProps) {
  const copy = useWebCopy();

  const axesData = (): readonly {
    id: GeniusAxisId;
    label: string;
    genius: Genius;
  }[] => [
    {
      genius: props.innerGenius,
      id: 'inner',
      label: copy().geniusAxes.inner,
    },
    {
      genius: props.outerGenius,
      id: 'outer',
      label: copy().geniusAxes.outer,
    },
    {
      genius: props.workStyleGenius,
      id: 'workStyle',
      label: copy().geniusAxes.workStyle,
    },
  ];

  return (
    <article
      aria-labelledby="genius-axes-heading"
      class="card bg-base-100 shadow-xl"
    >
      <div class="card-body gap-3">
        <div class="space-y-1">
          <h3 class="card-title text-xl" id="genius-axes-heading">
            {copy().geniusAxes.title}
          </h3>
          <p class="text-sm text-base-content/70">
            {copy().geniusAxes.subtitle}
          </p>
        </div>
        <div class="grid gap-3 sm:grid-cols-3">
          <For each={axesData()}>
            {(axis) => {
              const token = geniusAxes[axis.id];
              const Icon = token.Icon;
              return (
                <a
                  class={`flex flex-col items-start gap-2 rounded-box border border-base-300 p-3 transition hover:border-current ${token.textTone}`}
                  href={getGeniusPath(props.language, axis.genius)}
                >
                  <span class={`badge badge-lg gap-1.5 ${token.badgeTone}`}>
                    <Icon class="size-4" />
                    <span class="font-semibold">{axis.label}</span>
                  </span>
                  <span class="font-mono text-lg font-bold text-base-content">
                    {axis.genius}
                  </span>
                </a>
              );
            }}
          </For>
        </div>
      </div>
    </article>
  );
}
