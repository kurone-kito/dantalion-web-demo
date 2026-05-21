import { useWebCopy } from '../../i18n/web-copy';
import type { LocalizedPersonalitySection } from '../../lib/dantalion';

export type SectionCardProps = {
  bodyHtml: string;
  section: Pick<LocalizedPersonalitySection, 'heading' | 'id'>;
};

export function SectionCard(props: SectionCardProps) {
  const copy = useWebCopy();
  return (
    <article
      aria-labelledby={`section-${props.section.id}`}
      class="card bg-base-100 shadow-xl"
    >
      <div class="card-body gap-3">
        <h3 class="card-title text-xl" id={`section-${props.section.id}`}>
          {props.section.heading}
        </h3>
        <details class="collapse collapse-arrow rounded-box bg-base-200">
          <summary class="collapse-title text-sm font-semibold">
            <span class="when-closed">{copy().result.showDetails}</span>
            <span class="when-open">{copy().result.hideDetails}</span>
          </summary>
          <div class="collapse-content">
            <div class="prose max-w-none" innerHTML={props.bodyHtml} />
          </div>
        </details>
      </div>
    </article>
  );
}
