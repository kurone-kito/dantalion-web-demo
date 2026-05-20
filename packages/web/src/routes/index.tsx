import packageJson from '../../package.json';
import { PersonalityForm } from '../components/personality-form';
import { defaultLanguage } from '../lib/dantalion';

export default function Home() {
  return (
    <main class="min-h-screen bg-base-200 px-4 py-10">
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <article class="card bg-base-100 shadow-xl">
          <div class="card-body gap-5">
            <span class="badge badge-primary badge-lg">/dantalion/ demo</span>
            <h1 class="text-4xl font-bold">{packageJson.name}</h1>
            <p class="max-w-3xl text-base-content/80">
              Enter a birthday to render the localized personality result with
              the published dantalion packages. Until locale-aware routing
              lands, the interactive route defaults to English at the root URL.
            </p>
          </div>
        </article>
        <PersonalityForm language={defaultLanguage} />
      </div>
    </main>
  );
}
