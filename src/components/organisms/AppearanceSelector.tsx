import type { ChangeEventHandler, VFC } from 'react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from 'usehooks-ts/dist/esm/useDarkMode';
import { useIsSsr } from '../../hooks/useIsSsr';
import { Select } from '../atoms/Select';

/** The type definition of the source. */
type Source = readonly (readonly [string, string])[];

type ThemeValues = 'dark' | 'light';

/** Constant keys. */
const keys = Object.freeze<ThemeValues>(['light', 'dark']);

/**
 * Create the callback on changed control by the user.
 *
 * @returns The callback.
 */
const useOnChange = (): [
  ThemeValues,
  ChangeEventHandler<HTMLSelectElement>
] => {
  const { isDarkMode, toggle } = useDarkMode();
  return [
    isDarkMode ? 'dark' : 'light',
    useCallback(
      (e) => {
        toggle();
        const root = window.document.getElementsByTagName('html')[0];
        (isDarkMode ? root?.classList.add : root?.classList.remove)?.('dark');
        e.preventDefault();
      },
      [isDarkMode, toggle]
    ),
  ];
};

/**
 * The appearance select component.
 *
 * @returns The component.
 */
export const AppearanceSelector: VFC = () => {
  const { t } = useTranslation();
  const isSsr = useIsSsr();
  const [theme, onChange] = useOnChange();
  const source = useMemo<Source>(
    () => keys.map((key) => [key, t(`web.appearance.${key}`)]),
    [t]
  );
  return isSsr() ? null : (
    <Select
      defaultValue={theme}
      id="appearance"
      label={t('web.appearance.name')}
      onChange={onChange}
      source={source}
    />
  );
};
AppearanceSelector.displayName = 'AppearanceSelector';
