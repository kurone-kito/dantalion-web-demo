import { A } from '@solidjs/router';
import packageJson from '../../package.json';

export default function Home() {
  return (
    <main class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <article class="card w-full max-w-2xl bg-base-100 shadow-xl">
          <div class="card-body items-center text-center gap-6">
            <span class="badge badge-primary badge-lg">
              /dantalion/ smoke route
            </span>
            <h1 class="text-4xl font-bold">{packageJson.name}</h1>
            <p class="text-base-content/80">
              Solid Start, Tailwind CSS 4, and daisyUI are wired into the
              workspace.
            </p>
            <div class="flex flex-wrap justify-center gap-3">
              <button class="btn btn-primary" type="button">
                Build pipeline ready
              </button>
              <A class="btn btn-outline" href="/">
                Reload this route
              </A>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
