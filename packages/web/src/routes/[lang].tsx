import type { RouteDefinition, RouteSectionProps } from '@solidjs/router';
import { createEffect } from 'solid-js';
import { DemoShell } from '../components/demo-shell';
import { type SupportedLanguage, supportedLanguages } from '../lib/dantalion';
import { persistLanguageSelection } from '../lib/locale';
import { LocaleProvider } from '../lib/locale-context';

export const route = {
  matchFilters: {
    lang: supportedLanguages,
  },
} satisfies RouteDefinition<'/:lang'>;

export default function LocalizedLayout(props: RouteSectionProps) {
  const language = () => props.params['lang'] as SupportedLanguage;

  createEffect(() => {
    persistLanguageSelection(language());
  });

  return (
    <LocaleProvider language={language()}>
      <DemoShell>{props.children}</DemoShell>
    </LocaleProvider>
  );
}
