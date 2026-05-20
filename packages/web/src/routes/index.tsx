import { useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';
import { DemoShell } from '../components/demo-shell';
import { PersonalityForm } from '../components/personality-form';
import { RouteMeta } from '../components/route-meta';
import { defaultLanguage } from '../lib/dantalion';
import { getDemoPageCopy } from '../lib/demo-page';
import { getLocalePath, resolveWindowLanguage } from '../lib/locale';
import { LocaleProvider } from '../lib/locale-context';

export default function Home() {
  const navigate = useNavigate();

  onMount(() => {
    navigate(getLocalePath(resolveWindowLanguage()), { replace: true });
  });

  return (
    <LocaleProvider language={defaultLanguage}>
      <DemoShell>
        <RouteMeta
          description={getDemoPageCopy(defaultLanguage).summary}
          locale={defaultLanguage}
          path="/"
          title={getDemoPageCopy(defaultLanguage).metaTitle}
        />
        <PersonalityForm />
      </DemoShell>
    </LocaleProvider>
  );
}
