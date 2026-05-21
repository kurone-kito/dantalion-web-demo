import type { LocalizedPersonalitySection } from '../../lib/dantalion';

export type SectionCardProps = {
  bodyHtml: string;
  section: Pick<LocalizedPersonalitySection, 'heading' | 'id'>;
};

export function SectionCard(props: SectionCardProps) {
  return (
    <article
      aria-labelledby={`section-${props.section.id}`}
      class="card bg-base-100 shadow-xl"
    >
      <div class="card-body gap-3">
        <h3 class="card-title text-xl" id={`section-${props.section.id}`}>
          {props.section.heading}
        </h3>
        <div class="prose max-w-none" innerHTML={props.bodyHtml} />
      </div>
    </article>
  );
}
