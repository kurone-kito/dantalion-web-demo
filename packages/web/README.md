# @kurone-kito/dantalion-web-demo-web

The Solid Start application package for the dantalion web demo.

## Commands

```sh
pnpm --filter @kurone-kito/dantalion-web-demo-web run dev
pnpm --filter @kurone-kito/dantalion-web-demo-web run build
pnpm --filter @kurone-kito/dantalion-web-demo-web run preview
```

The app is configured to serve from the `/dantalion/` base path so the
static build can be published to
`https://kurone-kito.github.io/dantalion/`.

The static build prerenders `/dantalion/`, `/dantalion/en/`, and
`/dantalion/ja/`. The root route renders the English fallback for SSG,
then redirects after hydration to the preferred locale resolved from
`localStorage["dantalion-web-demo:locale"]` or `navigator.language`.

Theme switching uses a tiny inline bootstrap script in the document
head. It resolves `localStorage["dantalion-web-demo:theme"]` first,
falls back to `prefers-color-scheme`, and sets
`document.documentElement.dataset.theme` before the client bundle
hydrates to avoid a flash of the wrong DaisyUI theme.

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
