import { type RouteSectionProps, useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';
import { DemoShell } from '../components/demo-shell';
import { GeniusDetailPage } from '../components/genius-detail-page';
import {
  defaultLanguage,
  getGeniusPath,
  normalizeGenius,
} from '../lib/dantalion';
import { resolveWindowLanguage } from '../lib/locale';
import { LocaleProvider } from '../lib/locale-context';

export default function LegacyGeniusAlias(props: RouteSectionProps) {
  const navigate = useNavigate();
  const genius = normalizeGenius(
    (props.params['genius'] ?? props.params['genius.html'])?.replace(
      /\.html$/u,
      '',
    ),
  );

  if (!genius) {
    throw new Error('Unsupported genius legacy route parameter.');
  }

  onMount(() => {
    navigate(getGeniusPath(resolveWindowLanguage(), genius), { replace: true });
  });

  return (
    <LocaleProvider language={defaultLanguage}>
      <DemoShell>
        <GeniusDetailPage genius={genius} language={defaultLanguage} />
      </DemoShell>
    </LocaleProvider>
  );
}
