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
