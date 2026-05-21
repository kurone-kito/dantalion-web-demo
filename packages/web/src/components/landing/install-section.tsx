import { createSignal, Show } from 'solid-js';
import { useWebCopy } from '../../i18n/web-copy';

type CopyableCodeBlockProps = {
  buttonLabel: string;
  code: string;
  confirmationLabel: string;
  heading: string;
};

function CopyableCodeBlock(props: CopyableCodeBlockProps) {
  const [copied, setCopied] = createSignal(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore clipboard write failures — the code block stays selectable
    }
  };
  return (
    <article class="rounded-box border border-base-300 bg-base-200 p-4">
      <header class="mb-3 flex items-center justify-between gap-3">
        <h3 class="font-semibold">{props.heading}</h3>
        <button
          class="btn btn-outline btn-sm"
          onClick={handleCopy}
          type="button"
        >
          {props.buttonLabel}
        </button>
      </header>
      <pre class="overflow-x-auto rounded-box bg-base-300 p-3 text-sm leading-relaxed text-base-content">
        <code>{props.code}</code>
      </pre>
      <Show when={copied()}>
        <p aria-live="polite" class="mt-2 text-xs text-success">
          {props.confirmationLabel}
        </p>
      </Show>
    </article>
  );
}

export function InstallSection() {
  const copy = useWebCopy();
  return (
    <section
      aria-labelledby="install-heading"
      class="card bg-base-100 shadow-xl"
    >
      <div class="card-body gap-4">
        <div class="space-y-1">
          <h2 class="card-title text-2xl" id="install-heading">
            {copy().landing.install.title}
          </h2>
          <p class="text-sm text-base-content/70">
            {copy().landing.install.subtitle}
          </p>
        </div>
        <div class="grid gap-4 lg:grid-cols-2">
          <CopyableCodeBlock
            buttonLabel={copy().landing.install.copyButtonLabel}
            code={copy().landing.install.cliCode}
            confirmationLabel={copy().landing.install.copyConfirmation}
            heading={copy().landing.install.cliHeading}
          />
          <CopyableCodeBlock
            buttonLabel={copy().landing.install.copyButtonLabel}
            code={copy().landing.install.libraryCode}
            confirmationLabel={copy().landing.install.copyConfirmation}
            heading={copy().landing.install.libraryHeading}
          />
        </div>
      </div>
    </section>
  );
}
