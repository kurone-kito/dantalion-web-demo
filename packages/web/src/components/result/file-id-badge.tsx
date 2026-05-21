import { createSignal, Show } from 'solid-js';
import { useWebCopy } from '../../i18n/web-copy';
import {
  type Genius,
  getGeniusPath,
  type SupportedLanguage,
} from '../../lib/dantalion';

export type FileIdBadgeProps = {
  genius: Genius;
  language: SupportedLanguage;
};

export function FileIdBadge(props: FileIdBadgeProps) {
  const copy = useWebCopy();
  const [copied, setCopied] = createSignal(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.genius);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard might be unavailable (e.g. test envs); badge stays usable
    }
  };

  return (
    <div class="flex flex-wrap items-center gap-3">
      <a
        aria-describedby="file-id-hint"
        class="badge badge-outline badge-lg gap-2 hover:badge-primary"
        href={getGeniusPath(props.language, props.genius)}
      >
        <span class="text-xs uppercase tracking-wide opacity-70">
          {copy().result.fileId}
        </span>
        <span class="font-mono text-base font-semibold">{props.genius}</span>
      </a>
      <button class="btn btn-ghost btn-xs" onClick={handleCopy} type="button">
        {copy().result.fileIdCopy}
      </button>
      <Show when={copied()}>
        <span aria-live="polite" class="text-xs text-success">
          {copy().result.fileIdCopyConfirmation}
        </span>
      </Show>
      <p class="sr-only" id="file-id-hint">
        {copy().result.fileIdHint}
      </p>
    </div>
  );
}
