import { useWebCopy } from '../../i18n/web-copy';

export function RepoCta() {
  const copy = useWebCopy();
  return (
    <section
      aria-labelledby="repo-cta-heading"
      class="card bg-base-100 shadow-xl"
    >
      <div class="card-body items-start gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div class="space-y-1">
          <h2 class="card-title text-2xl" id="repo-cta-heading">
            {copy().landing.repo.cta}
          </h2>
          <p class="text-sm text-base-content/70">
            {copy().landing.repo.subtitle}
          </p>
        </div>
        <a
          class="btn btn-secondary btn-lg"
          href={copy().landing.repo.href}
          rel="noreferrer noopener"
          target="_blank"
        >
          GitHub →
        </a>
      </div>
    </section>
  );
}
