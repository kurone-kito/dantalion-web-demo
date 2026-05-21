import { createSignal, onMount, Show } from 'solid-js';
import { useWebCopy } from '../../i18n/web-copy';
import type { Genius, SupportedLanguage } from '../../lib/dantalion';
import { formatHeading } from '../../lib/heading';
import { canShareFiles, renderOgCard } from '../../lib/og-card';
import { encodeShareUrl } from '../../lib/share-url';

const SITE_ORIGIN_FALLBACK = 'https://kurone-kito.github.io/dantalion';

const resolveSiteOrigin = (): string => {
  if (typeof window === 'undefined') {
    return SITE_ORIGIN_FALLBACK;
  }
  const origin = window.location.origin;
  const base = window.location.pathname.split('/').slice(0, 2).join('/');
  return `${origin}${base}`.replace(/\/+$/u, '');
};

export type ShareMenuProps = {
  genius: Genius;
  innerGenius?: Genius | undefined;
  language: SupportedLanguage;
  nickname?: string | undefined;
  outerGenius?: Genius | undefined;
  workStyleGenius?: Genius | undefined;
};

export function ShareMenu(props: ShareMenuProps) {
  const copy = useWebCopy();
  const [copied, setCopied] = createSignal(false);
  const [canShareWithFiles, setCanShareWithFiles] = createSignal(false);
  const canShare = typeof navigator !== 'undefined' && 'share' in navigator;

  onMount(() => {
    setCanShareWithFiles(canShareFiles());
  });

  const buildShareUrl = (): string => {
    const path = encodeShareUrl({
      innerGenius: props.innerGenius ?? props.genius,
      language: props.language,
      nickname: props.nickname,
      outerGenius: props.outerGenius ?? props.genius,
      workStyleGenius: props.workStyleGenius ?? props.genius,
    });
    return `${resolveSiteOrigin()}${path}`;
  };

  const buildShareText = (): string =>
    copy().share.hookTemplate.replaceAll('{{genius}}', props.genius);

  const handleWebShare = async () => {
    if (!canShare) return;
    try {
      await navigator.share({
        url: buildShareUrl(),
        text: buildShareText(),
        title: copy().demoPage.metaTitle,
      });
    } catch {
      // User cancelled or share failed — ignore silently
    }
  };

  const handleWebShareWithPreview = async () => {
    if (!canShareWithFiles()) return;
    try {
      const blob = await renderOgCard({
        fileIdLabel: copy().result.fileId,
        footerUrl: 'kurone-kito.github.io/dantalion',
        innerGenius: props.innerGenius ?? props.genius,
        language: props.language,
        nickname: props.nickname,
        outerGenius: props.outerGenius ?? props.genius,
        resultHeading: formatHeading(
          copy().result.headingTemplate,
          props.nickname,
          copy().result.nicknameFallback,
        ),
        workStyleGenius: props.workStyleGenius ?? props.genius,
      });
      const file = new File([blob], `dantalion-${props.genius}.png`, {
        type: 'image/png',
      });
      await navigator.share({
        files: [file],
        text: buildShareText(),
        title: copy().demoPage.metaTitle,
        url: buildShareUrl(),
      });
    } catch {
      // share failed or user cancelled
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(buildShareUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard unavailable
    }
  };

  const composeIntent = (base: string): string => {
    const params = new URLSearchParams({
      text: buildShareText(),
      url: buildShareUrl(),
      hashtags: copy().share.hashtag,
    });
    return `${base}?${params.toString()}`;
  };

  return (
    <div class="dropdown dropdown-end" data-print-hidden="true">
      <button class="btn btn-primary btn-sm" tabindex="0" type="button">
        {copy().share.trigger}
      </button>
      <ul class="menu dropdown-content z-10 mt-2 w-64 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
        <Show when={canShareWithFiles()}>
          <li>
            <button onClick={handleWebShareWithPreview} type="button">
              {copy().share.items.webShareWithPreview}
            </button>
          </li>
        </Show>
        <Show when={canShare}>
          <li>
            <button onClick={handleWebShare} type="button">
              {copy().share.items.webShare}
            </button>
          </li>
        </Show>
        <li>
          <button onClick={handleCopyLink} type="button">
            {copy().share.items.copyLink}
          </button>
        </li>
        <li>
          <a
            href={composeIntent('https://x.com/intent/post')}
            rel="noreferrer noopener"
            target="_blank"
          >
            {copy().share.items.x}
          </a>
        </li>
        <li>
          <a
            href={`https://bsky.app/intent/compose?text=${encodeURIComponent(
              `${buildShareText()} ${buildShareUrl()}`,
            )}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            {copy().share.items.bluesky}
          </a>
        </li>
      </ul>
      <Show when={copied()}>
        <span aria-live="polite" class="ml-2 text-xs text-success">
          {copy().share.copiedToast}
        </span>
      </Show>
    </div>
  );
}
