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
      <PersonalityForm />
    </>
  );
}
