import type { RouteDefinition, RouteSectionProps } from '@solidjs/router';
import { GeniusDetailPage } from '../../components/genius-detail-page';
import { RouteMeta } from '../../components/route-meta';
import {
  geniusTypeValues,
  getGeniusPath,
  normalizeGenius,
} from '../../lib/dantalion';
import { getGeniusPageCopy } from '../../lib/genius-page';
import { useLocale } from '../../lib/locale-context';

export const route = {
  matchFilters: {
    genius: geniusTypeValues,
  },
} satisfies RouteDefinition<'/:lang/:genius'>;

export default function LocalizedGeniusDetail(props: RouteSectionProps) {
  const { language } = useLocale();
  const genius = normalizeGenius(props.params['genius']);

  if (!genius) {
    throw new Error('Unsupported genius route parameter.');
  }

  const copy = getGeniusPageCopy(language(), genius);

  return (
    <>
      <RouteMeta
        description={copy.summary}
        locale={language()}
        path={getGeniusPath(language(), genius)}
        title={copy.metaTitle}
        type="article"
      />
      <GeniusDetailPage genius={genius} language={language()} />
    </>
  );
}
