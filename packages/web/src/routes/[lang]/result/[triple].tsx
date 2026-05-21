import type { RouteSectionProps } from '@solidjs/router';
import { createResource, For, Show } from 'solid-js';
import { GeniusAxesPanel } from '../../../components/result/genius-axes-panel';
import { SectionCard } from '../../../components/result/section-card';
import { RouteMeta } from '../../../components/route-meta';
import { useWebCopy } from '../../../i18n/web-copy';
import {
  type Genius,
  getLocalizedDetailHtml,
  type SupportedLanguage,
} from '../../../lib/dantalion';
import { useLocale } from '../../../lib/locale-context';
import { decodeShareTriple, type GeniusTriple } from '../../../lib/share-url';

type ResolvedTripleResult = {
  innerHtml: string;
  outerHtml: string;
  workStyleHtml: string;
};

const loadTripleHtml = async (
  triple: GeniusTriple,
  language: SupportedLanguage,
): Promise<ResolvedTripleResult> => {
  const [innerHtml, outerHtml, workStyleHtml] = await Promise.all([
    getLocalizedDetailHtml(triple[0], language),
    getLocalizedDetailHtml(triple[1], language),
    getLocalizedDetailHtml(triple[2], language),
  ]);
  return { innerHtml, outerHtml, workStyleHtml };
};

export default function LocalizedTripleResult(props: RouteSectionProps) {
  const { language } = useLocale();
  const webCopy = useWebCopy();
  const triple = (): GeniusTriple | null =>
    decodeShareTriple(props.params['triple'] ?? '');
  const nickname = (): string | undefined => {
    const value = props.location.query['n'];
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed.slice(0, 32) : undefined;
  };

  const [content] = createResource(
    () => {
      const t = triple();
      return t ? ({ language: language(), triple: t } as const) : null;
    },
    async (input) => loadTripleHtml(input.triple, input.language),
  );

  const path = (): string => {
    const t = triple();
    return t ? `/${language()}/result/${t.join('-')}/` : `/${language()}/`;
  };

  const headingFor = (axisLabel: string, value: Genius): string =>
    `${axisLabel}: ${value}`;

  return (
    <>
      <RouteMeta
        description={webCopy().demoPage.summary}
        locale={language()}
        path={path()}
        title={webCopy().demoPage.metaTitle}
        type="article"
      />
      <Show
        fallback={
          <article class="card bg-base-100 shadow-xl">
            <div class="card-body gap-3">
              <h2 class="card-title text-xl">{webCopy().notFoundPage.title}</h2>
              <p class="text-sm text-base-content/70">
                {webCopy().notFoundPage.body}
              </p>
              <a class="btn btn-primary self-start" href={`/${language()}/`}>
                {webCopy().notFoundPage.actionLabel}
              </a>
            </div>
          </article>
        }
        when={triple()}
      >
        {(safeTriple) => (
          <section
            aria-live="polite"
            class="grid gap-6"
            data-nickname={nickname() ?? ''}
          >
            <GeniusAxesPanel
              innerGenius={safeTriple()[0]}
              language={language()}
              outerGenius={safeTriple()[1]}
              workStyleGenius={safeTriple()[2]}
            />
            <Show when={content.loading}>
              <p class="text-sm text-base-content/70">
                {webCopy().geniusPage.loadingLabel}
              </p>
            </Show>
            <Show when={content()}>
              {(detail) => (
                <For
                  each={[
                    {
                      bodyHtml: detail().innerHtml,
                      heading: headingFor(
                        webCopy().geniusAxes.inner,
                        safeTriple()[0],
                      ),
                      id: `inner-${safeTriple()[0]}`,
                    },
                    {
                      bodyHtml: detail().outerHtml,
                      heading: headingFor(
                        webCopy().geniusAxes.outer,
                        safeTriple()[1],
                      ),
                      id: `outer-${safeTriple()[1]}`,
                    },
                    {
                      bodyHtml: detail().workStyleHtml,
                      heading: headingFor(
                        webCopy().geniusAxes.workStyle,
                        safeTriple()[2],
                      ),
                      id: `work-style-${safeTriple()[2]}`,
                    },
                  ]}
                >
                  {(section) => (
                    <SectionCard
                      bodyHtml={section.bodyHtml}
                      section={{ heading: section.heading, id: section.id }}
                    />
                  )}
                </For>
              )}
            </Show>
          </section>
        )}
      </Show>
    </>
  );
}
