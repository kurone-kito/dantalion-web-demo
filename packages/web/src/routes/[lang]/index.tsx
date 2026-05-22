import { useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';
import { FeatureSection } from '../../components/landing/feature-section';
import { HeroSection } from '../../components/landing/hero-section';
import { InstallSection } from '../../components/landing/install-section';
import { PrefaceSection } from '../../components/landing/preface-section';
import { PrivacyCallout } from '../../components/landing/privacy-callout';
import { RepoCta } from '../../components/landing/repo-cta';
import { PersonalityForm } from '../../components/personality-form';
import { RouteMeta } from '../../components/route-meta';
import { getDemoPageCopy } from '../../lib/demo-page';
import { useLocale } from '../../lib/locale-context';

const SPA_FALLBACK_STORAGE_KEY = '__dantalion_spa_path';

export default function LocalizedHome() {
  const { language } = useLocale();
  const copy = () => getDemoPageCopy(language());
  const navigate = useNavigate();

  // 404.html's bridge script stashes the original cold-load URL in
  // sessionStorage and hard-redirects to this locale home so hydration has a
  // matching SSR shell. Once hydration is done, navigate via Solid Router to
  // the original URL so the `[lang]/result/[triple].tsx` route renders in
  // place. See #72 and `scripts/postbuild.mjs`.
  onMount(() => {
    let pending: string | null = null;
    try {
      pending = sessionStorage.getItem(SPA_FALLBACK_STORAGE_KEY);
      if (pending) {
        sessionStorage.removeItem(SPA_FALLBACK_STORAGE_KEY);
      }
    } catch {
      // sessionStorage may be unavailable (private mode, sandboxed iframe).
    }
    if (pending) {
      navigate(pending, { replace: true });
    }
  });

  return (
    <>
      <RouteMeta
        description={copy().summary}
        locale={language()}
        path={`/${language()}/`}
        title={copy().metaTitle}
      />
      <HeroSection />
      <PrivacyCallout />
      <PersonalityForm />
      <PrefaceSection />
      <FeatureSection />
      <InstallSection />
      <RepoCta />
    </>
  );
}
