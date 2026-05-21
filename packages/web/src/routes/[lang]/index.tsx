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

export default function LocalizedHome() {
  const { language } = useLocale();
  const copy = () => getDemoPageCopy(language());

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
