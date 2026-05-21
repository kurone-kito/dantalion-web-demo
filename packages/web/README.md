# @kurone-kito/dantalion-web-demo-web

The Solid Start application package for the dantalion web demo.

## Commands

```sh
pnpm --filter @kurone-kito/dantalion-web-demo-web run dev
pnpm --filter @kurone-kito/dantalion-web-demo-web run build
pnpm --filter @kurone-kito/dantalion-web-demo-web run preview
pnpm --filter @kurone-kito/dantalion-web-demo-web run story:dev
pnpm --filter @kurone-kito/dantalion-web-demo-web run story:build
```

The app is configured to serve from the `/dantalion/` base path so the
static build can be published to
`https://kurone-kito.github.io/dantalion/`.

The static build prerenders `/dantalion/`, `/dantalion/en/`, and
`/dantalion/ja/`. The root route renders the English fallback for SSG,
then redirects after hydration to the preferred locale resolved from
`localStorage["dantalion-web-demo:locale"]` or `navigator.language`.

Per-genius detail pages are prerendered under
`/dantalion/<locale>/<genius>/`, and legacy root aliases such as
`/dantalion/100.html` redirect to the locale-aware detail routes after
hydration. The current `@kurone-kito/dantalion-core@0.19.2` release
exposes 12 genius values (`000`, `001`, `012`, `024`, `025`, `100`,
`108`, `125`, `555`, `789`, `888`, `919`) and does not include `404`,
so this app reserves `/dantalion/404.html` for the static not-found
page.

Theme switching uses a tiny inline bootstrap script in the document
head. It resolves `localStorage["dantalion-web-demo:theme"]` first,
falls back to `prefers-color-scheme`, and sets
`document.documentElement.dataset.theme` before the client bundle
hydrates to avoid a flash of the wrong DaisyUI theme.

SEO metadata is emitted per route with canonical URLs, `hreflang`
alternates, Open Graph tags, and Twitter card tags. Production builds
resolve those absolute URLs from `SITE_ORIGIN` first, then
`VITE_SITE_ORIGIN`, and finally fall back to
`https://kurone-kito.github.io/dantalion`.

## End-to-end tests

End-to-end smoke is driven by [Playwright](https://playwright.dev/).
On a clean clone run once:

```sh
pnpm install
pnpm exec playwright install chromium
```

Then:

```sh
pnpm --filter @kurone-kito/dantalion-web-demo-web run test:e2e         # headless
pnpm --filter @kurone-kito/dantalion-web-demo-web run test:e2e:headed  # watch in a window
pnpm --filter @kurone-kito/dantalion-web-demo-web run test:e2e:ui      # Playwright UI
pnpm --filter @kurone-kito/dantalion-web-demo-web run test:e2e:report  # open the last HTML report
```

The runner builds the static artefact and boots `scripts/preview.mjs`
on `127.0.0.1:4173/dantalion/` before each invocation. Specs live in
`packages/web/e2e/` and target the deploy-shaped base path so the
checks mirror what `gh-pages` serves.

## Component catalog

`pnpm --filter @kurone-kito/dantalion-web-demo-web run story:dev` boots
[Storybook 10](https://storybook.js.org/) on port 6006 via the
[`storybook-solidjs-vite`](https://www.npmjs.com/package/storybook-solidjs-vite)
framework adapter. Stories live next to the components they cover
(`src/**/*.stories.tsx`) and load the same Tailwind 4 + DaisyUI styles
as the runtime app through `src/app.css`.

`pnpm --filter @kurone-kito/dantalion-web-demo-web run story:build`
produces a static catalog under `storybook-static/`. The CI workflow
runs this build on every PR so missing stories or broken decorators
fail fast.

Static assets for search and social previews live under `public/`:
`favicons/favicon.svg`, PNG favicon fallbacks, `og.png`, and the source
artwork `og-card.svg`. The build finishes with `scripts/postbuild.mjs`,
which emits `robots.txt` and `sitemap.xml` into `.output/public/` using
the same site origin and all prerendered locale detail routes.

## Deployment

`BASE_PATH=/dantalion/` controls the router and asset base used by the
GitHub Pages build. The deploy workflow keeps that value fixed so the
generated output matches `https://kurone-kito.github.io/dantalion/`.

The cross-repo deploy workflow reads the secret
`DANTALION_GH_PAGES_DEPLOY_KEY` and checks out
`kurone-kito/dantalion@gh-pages` over SSH. Provisioning that deploy key
is tracked separately in issue `#14`; until the secret exists, the
workflow still runs the build and then fails fast before the deploy
checkout.

You can smoke-test the workflow locally with `act` by providing the same
secret contract, for example:

```sh
act -j deploy --secret-file .secrets
```

Where `.secrets` contains:

```sh
DANTALION_GH_PAGES_DEPLOY_KEY='-----BEGIN OPENSSH PRIVATE KEY-----...'
```

Rollback is revert-first: revert the offending push to `main`, then
re-run `Deploy Pages`. The workflow syncs the current build output into
`gh-pages` without force-pushing over the branch history.
