import { type RouteSectionProps, useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';
import { DemoShell } from '../components/demo-shell';
import { GeniusDetailPage } from '../components/genius-detail-page';
import { RouteMeta } from '../components/route-meta';
import {
  defaultLanguage,
  getGeniusPath,
  normalizeGenius,
} from '../lib/dantalion';
import { getGeniusPageCopy } from '../lib/genius-page';
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

  const canonicalPath = getGeniusPath(defaultLanguage, genius);
  const copy = getGeniusPageCopy(defaultLanguage, genius);

  onMount(() => {
    navigate(getGeniusPath(resolveWindowLanguage(), genius), { replace: true });
  });

  return (
    <LocaleProvider language={defaultLanguage}>
      <DemoShell>
        <RouteMeta
          description={copy.summary}
          locale={defaultLanguage}
          path={canonicalPath}
          title={copy.metaTitle}
          type="article"
        />
        <GeniusDetailPage genius={genius} language={defaultLanguage} />
      </DemoShell>
    </LocaleProvider>
  );
}
