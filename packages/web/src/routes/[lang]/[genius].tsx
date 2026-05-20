import type { RouteDefinition, RouteSectionProps } from '@solidjs/router';
import { GeniusDetailPage } from '../../components/genius-detail-page';
import { geniusTypeValues, normalizeGenius } from '../../lib/dantalion';
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

  return <GeniusDetailPage genius={genius} language={language()} />;
}
