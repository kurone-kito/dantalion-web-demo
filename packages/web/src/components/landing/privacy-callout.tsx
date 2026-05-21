import { useWebCopy } from '../../i18n/web-copy';

export function PrivacyCallout() {
  const copy = useWebCopy();
  return (
    <aside
      aria-labelledby="privacy-callout-heading"
      class="alert alert-info"
      role="note"
    >
      <div class="flex flex-col items-start gap-1 text-left">
        <h3
          class="text-base font-semibold uppercase"
          id="privacy-callout-heading"
        >
          {copy().landing.privacy.title}
        </h3>
        <p class="text-sm">{copy().landing.privacy.body}</p>
      </div>
    </aside>
  );
}
