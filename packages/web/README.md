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
