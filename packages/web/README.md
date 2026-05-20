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

Until locale-aware routing lands, the interactive form route defaults to
English at `/dantalion/` and uses the published dantalion runtime
packages directly from npm.
