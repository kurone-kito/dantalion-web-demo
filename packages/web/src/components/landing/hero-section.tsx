import { useWebCopy } from '../../i18n/web-copy';

export function HeroSection() {
  const copy = useWebCopy();
  return (
    <section
      aria-label={copy().demoPage.title}
      class="hero rounded-box bg-base-100 shadow-xl"
    >
      <div class="hero-content flex-col items-start gap-3 text-left">
        <span class="badge badge-primary badge-lg">
          {copy().demoPage.badgeLabel}
        </span>
        <h1 class="text-4xl font-bold">{copy().demoPage.title}</h1>
        <p class="max-w-3xl text-lg text-base-content/80">
          {copy().landing.hero.tagline}
        </p>
        <p class="max-w-3xl text-sm text-base-content/70">
          {copy().landing.hero.subtitle}
        </p>
      </div>
    </section>
  );
}
