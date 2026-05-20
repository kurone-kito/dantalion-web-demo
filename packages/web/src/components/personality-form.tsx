import { createMemo, createResource, createSignal, Show } from 'solid-js';
import { getLocalizedPersonalityHtml } from '../lib/dantalion';
import { useLocale } from '../lib/locale-context';
import {
  defaultBirthdayValue,
  getPersonalityFormCopy,
  isBirthdayInSupportedRange,
  maxBirthdayValue,
  minBirthdayValue,
  parseBirthdayValue,
} from '../lib/personality-form';

const minimumLoadingMs = 150;

export type PersonalityFormProps = {
  loadPersonality?: PersonalityLoader;
};

type Submission = {
  nonce: number;
  value: string;
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export type PersonalityLoader = (birthday: Date) => Promise<string>;

export function PersonalityForm(props: PersonalityFormProps) {
  const { language } = useLocale();
  const copy = createMemo(() => getPersonalityFormCopy(language()));
  const loadPersonality = () =>
    props.loadPersonality ??
    ((birthday: Date) => getLocalizedPersonalityHtml(birthday, language()));

  const [dateValue, setDateValue] = createSignal(defaultBirthdayValue);
  const [submission, setSubmission] = createSignal<Submission>();
  const [result, { mutate }] = createResource(submission, async (request) => {
    const birthday = parseBirthdayValue(request.value);

    if (!birthday) {
      throw new RangeError(copy().invalidRangeMessage);
    }

    const [html] = await Promise.all([
      loadPersonality()(birthday),
      sleep(minimumLoadingMs),
    ]);

    return html;
  });

  const validationMessage = createMemo(() =>
    isBirthdayInSupportedRange(dateValue()) ? null : copy().invalidRangeMessage,
  );

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    if (validationMessage()) {
      return;
    }

    setSubmission({ nonce: Date.now(), value: dateValue() });
  };

  const handleReset = () => {
    setDateValue(defaultBirthdayValue);
    setSubmission(undefined);
    mutate(undefined);
  };

  return (
    <section class="grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
      <article class="card bg-base-100 shadow-xl">
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
              <h2 class="card-title text-2xl">{copy().resultTitle}</h2>
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
            {(html) => (
              <div class="prose max-w-none rounded-box border border-base-300 bg-base-200 p-6">
                <div innerHTML={html()} />
              </div>
            )}
          </Show>
        </div>
      </article>
    </section>
  );
}
