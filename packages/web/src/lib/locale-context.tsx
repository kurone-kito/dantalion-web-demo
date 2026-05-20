import type { Accessor, JSX } from 'solid-js';
import { createContext, useContext } from 'solid-js';
import type { SupportedLanguage } from './dantalion';
import { getLocalePath, persistLanguageSelection } from './locale';

export type LocaleContextValue = {
  language: Accessor<SupportedLanguage>;
  persistLanguage: (language: SupportedLanguage) => SupportedLanguage;
  toPath: (language: SupportedLanguage) => string;
};

const LocaleContext = createContext<LocaleContextValue>();

export type LocaleProviderProps = {
  children: JSX.Element;
  language: SupportedLanguage;
};

export function LocaleProvider(props: LocaleProviderProps) {
  const language = () => props.language;

  return (
    <LocaleContext.Provider
      value={{
        language,
        persistLanguage: persistLanguageSelection,
        toPath: getLocalePath,
      }}
    >
      {props.children}
    </LocaleContext.Provider>
  );
}

export const useLocale = (): LocaleContextValue => {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('Locale context is unavailable for the current route.');
  }

  return context;
};
