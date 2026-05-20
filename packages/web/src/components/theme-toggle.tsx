import { createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import { getDemoPageCopy } from '../lib/demo-page';
import { useLocale } from '../lib/locale-context';
import {
  applyTheme,
  defaultTheme,
  persistThemeSelection,
  readStoredTheme,
  resolvePreferredTheme,
  type Theme,
  themeMediaQuery,
} from '../lib/theme';

export function ThemeToggle() {
  const { language } = useLocale();
  const copy = createMemo(() => getDemoPageCopy(language()));
  const [theme, setTheme] = createSignal<Theme>(defaultTheme);

  onMount(() => {
    const media = window.matchMedia(themeMediaQuery);
    const syncTheme = () => {
      const nextTheme = resolvePreferredTheme({
        persistedTheme: readStoredTheme(window.localStorage),
        systemPrefersDark: media.matches,
      });

      setTheme(nextTheme);
      applyTheme(nextTheme);
    };

    syncTheme();

    const handleChange = () => {
      if (readStoredTheme(window.localStorage)) {
        return;
      }

      syncTheme();
    };

    media.addEventListener('change', handleChange);

    onCleanup(() => {
      media.removeEventListener('change', handleChange);
    });
  });

  const handleToggle = () => {
    const nextTheme = theme() === 'dark' ? 'light' : 'dark';

    persistThemeSelection(nextTheme);
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      aria-label={copy().themeToggleLabel}
      class="btn btn-outline btn-square"
      onClick={handleToggle}
      type="button"
    >
      <svg
        aria-hidden="true"
        classList={{ hidden: theme() === 'dark', 'size-5': true }}
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 3v2.25M12 18.75V21M4.97 4.97l1.59 1.59M17.44 17.44l1.59 1.59M3 12h2.25M18.75 12H21M4.97 19.03l1.59-1.59M17.44 6.56l1.59-1.59M15.75 12A3.75 3.75 0 1 1 8.25 12a3.75 3.75 0 0 1 7.5 0Z"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        aria-hidden="true"
        classList={{ hidden: theme() !== 'dark', 'size-5': true }}
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
      >
        <path
          d="M21.75 15.5A9.75 9.75 0 0 1 8.5 2.25a9.75 9.75 0 1 0 13.25 13.25Z"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}
