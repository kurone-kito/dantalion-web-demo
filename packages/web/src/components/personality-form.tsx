import { A } from '@solidjs/router';
import {
  createMemo,
  createResource,
  createSignal,
  For,
  onMount,
  Show,
} from 'solid-js';
import { useWebCopy } from '../i18n/web-copy';
import {
  getGeniusPath,
  getLocalizedPersonalityPreview,
  type LocalizedPersonalityPreview,
} from '../lib/dantalion';
import { formatHeading, normalizeNickname } from '../lib/heading';
import { useLocale } from '../lib/locale-context';
import { decodePermalink, encodePermalink } from '../lib/permalink';
import {
  defaultBirthdayValue,
  getPersonalityFormCopy,
  isBirthdayInSupportedRange,
  maxBirthdayValue,
  minBirthdayValue,
  parseBirthdayValue,
} from '../lib/personality-form';
import { FileIdBadge } from './result/file-id-badge';
import { GeniusAxesPanel } from './result/genius-axes-panel';
import { PrintButton } from './result/print-button';
import { SectionCard } from './result/section-card';
import { ShareMenu } from './result/share-menu';

const minimumLoadingMs = 150;
const nicknameMaxLength = 32;

export type PersonalityFormProps = {
  loadPersonality?: PersonalityLoader;
};

type Submission = {
  nickname: string | undefined;
  nonce: number;
  value: string;
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export type PersonalityLoader = (
  birthday: Date,
) => Promise<LocalizedPersonalityPreview>;

export function PersonalityForm(props: PersonalityFormProps) {
  const { language } = useLocale();
  const copy = createMemo(() => getPersonalityFormCopy(language()));
  const webCopy = useWebCopy();
  const loadPersonality = () =>
    props.loadPersonality ??
    ((birthday: Date) => getLocalizedPersonalityPreview(birthday, language()));

  const [dateValue, setDateValue] = createSignal(defaultBirthdayValue);
  const [nicknameValue, setNicknameValue] = createSignal('');
  const [submission, setSubmission] = createSignal<Submission>();
  const [result, { mutate }] = createResource(submission, async (request) => {
    const birthday = parseBirthdayValue(request.value);

    if (!birthday) {
      throw new RangeError(copy().invalidRangeMessage);
    }

    const [preview] = await Promise.all([
      loadPersonality()(birthday),
      sleep(minimumLoadingMs),
    ]);

    return preview;
  });

  const validationMessage = createMemo(() =>
    isBirthdayInSupportedRange(dateValue()) ? null : copy().invalidRangeMessage,
  );

  const submit = (request: { value: string; nickname: string | undefined }) => {
    setSubmission({
      nickname: request.nickname,
      nonce: Date.now(),
      value: request.value,
    });
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      const next = encodePermalink({
        birthday: request.value,
        language: language(),
        nickname: request.nickname,
      });
      window.history.replaceState(window.history.state, '', next);
    }
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    if (validationMessage()) {
      return;
    }

    submit({
      nickname: normalizeNickname(nicknameValue(), nicknameMaxLength),
      value: dateValue(),
    });
  };

  onMount(() => {
    if (typeof window === 'undefined' || props.loadPersonality) {
      return;
    }
    const { birthday, nickname } = decodePermalink(window.location.search);
    if (!birthday) {
      return;
    }
    setDateValue(birthday);
    if (nickname) {
      setNicknameValue(nickname);
    }
    submit({ nickname, value: birthday });
  });

  const handleReset = () => {
    setDateValue(defaultBirthdayValue);
    setNicknameValue('');
    setSubmission(undefined);
    mutate(undefined);
  };

  const personalizedHeading = createMemo(() => {
    const current = submission();
    if (!current) {
      return copy().resultTitle;
    }
    return formatHeading(
      webCopy().result.headingTemplate,
      current.nickname,
      webCopy().result.nicknameFallback,
    );
  });

  return (
    <section class="grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
      <article class="card bg-base-100 shadow-xl" data-print-hidden="true">
        <div class="card-body gap-5">
          <form class="grid gap-4" onSubmit={handleSubmit}>
            <label class="form-control gap-2" for="birthday">
              <span class="label-text text-sm font-medium">
                {copy().birthdayLabel}
              </span>
              <input
                aria-describedby="birthday-help"
                class="input input-bordered w-full"
                id="birthday"
                max={maxBirthdayValue}
                min={minBirthdayValue}
                name="birthday"
                onInput={(event) => {
                  setDateValue(event.currentTarget.value);
                }}
                type="date"
                value={dateValue()}
              />
            </label>
            <p class="text-sm text-base-content/70" id="birthday-help">
              {copy().supportedRangeLabel}
            </p>

            <label class="form-control gap-2" for="nickname">
              <span class="label-text text-sm font-medium">
                {copy().nicknameLabel}
              </span>
              <input
                aria-describedby="nickname-help"
                autocomplete="nickname"
                class="input input-bordered w-full"
                id="nickname"
                maxlength={nicknameMaxLength}
                name="nickname"
                onInput={(event) => {
                  setNicknameValue(event.currentTarget.value);
                }}
                placeholder={copy().nicknamePlaceholder}
                type="text"
                value={nicknameValue()}
              />
            </label>
            <p class="text-sm text-base-content/70" id="nickname-help">
              {copy().nicknameHelp}
            </p>

            <Show when={validationMessage()}>
              {(message) => (
                <div class="alert alert-warning" role="alert">
                  <span>{message()}</span>
                </div>
              )}
            </Show>

            <div class="flex flex-wrap gap-3">
              <button
                aria-disabled={validationMessage() ? 'true' : 'false'}
                class="btn btn-primary"
                disabled={Boolean(validationMessage())}
                type="submit"
              >
                {copy().submitLabel}
              </button>
              <button class="btn btn-ghost" onClick={handleReset} type="button">
                {copy().resetLabel}
              </button>
            </div>
          </form>
        </div>
      </article>

      <article class="card bg-base-100 shadow-xl">
        <div aria-live="polite" class="card-body gap-5">
          <div class="flex items-center justify-between gap-3">
            <div>
              <h2 class="card-title text-2xl">{personalizedHeading()}</h2>
              <p class="text-sm text-base-content/70">
                {copy().emptyStateBody}
              </p>
            </div>
            <span class="badge badge-outline uppercase">{language()}</span>
          </div>

          <Show when={result.loading}>
            <div
              class="flex items-center gap-3 text-base-content/70"
              role="status"
            >
              <span
                aria-hidden="true"
                class="loading loading-spinner loading-md"
              />
              <span>{copy().loadingLabel}</span>
            </div>
          </Show>

          <Show
            fallback={
              <Show when={!result.loading}>
                <div class="rounded-box border border-dashed border-base-300 bg-base-200 p-6">
                  <h3 class="font-semibold">{copy().emptyStateTitle}</h3>
                  <p class="mt-2 text-sm text-base-content/70">
                    {copy().emptyStateBody}
                  </p>
                </div>
              </Show>
            }
            when={result()}
          >
            {(preview) => (
              <div class="grid gap-4">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <FileIdBadge
                    genius={preview().genius}
                    language={language()}
                  />
                  <div
                    class="flex flex-wrap items-center gap-2"
                    data-print-hidden="true"
                  >
                    <ShareMenu
                      genius={preview().genius}
                      innerGenius={preview().innerGenius}
                      language={language()}
                      nickname={submission()?.nickname}
                      outerGenius={preview().outerGenius}
                      workStyleGenius={preview().workStyleGenius}
                    />
                    <PrintButton />
                  </div>
                </div>
                <GeniusAxesPanel
                  innerGenius={preview().innerGenius}
                  language={language()}
                  outerGenius={preview().outerGenius}
                  workStyleGenius={preview().workStyleGenius}
                />
                <Show when={preview().introHtml}>
                  {(introHtml) => (
                    <div
                      class="prose max-w-none rounded-box border border-base-300 bg-base-200 p-4"
                      innerHTML={introHtml()}
                    />
                  )}
                </Show>
                <For each={preview().sections}>
                  {(section) => (
                    <SectionCard
                      bodyHtml={section.bodyHtml}
                      section={section}
                    />
                  )}
                </For>
                <div class="flex justify-end" data-print-hidden="true">
                  <A
                    class="btn btn-outline btn-sm"
                    href={getGeniusPath(language(), preview().genius)}
                  >
                    {copy().detailLinkLabel}
                  </A>
                </div>
              </div>
            )}
          </Show>
        </div>
      </article>
    </section>
  );
}
