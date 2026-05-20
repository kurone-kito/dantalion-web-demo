# dantalion-web-demo

The standalone pnpm workspace for the modernized dantalion web demo.
This repository will consume `@kurone-kito/dantalion-core` and
`@kurone-kito/dantalion-i18n`, then publish a static build to
`https://kurone-kito.github.io/dantalion/`.

## Development

```sh
corepack enable
pnpm install
pnpm run dev
pnpm run build
pnpm run lint
pnpm run test
```

The web package will eventually build for the `/dantalion/` base path
used by GitHub Pages.

## IDD

This repository runs Issue-Driven Development from
[`kurone-kito/idd-skill`](https://github.com/kurone-kito/idd-skill).
Start with [AGENTS.md](./AGENTS.md) or
[`.github/copilot-instructions.md`](./.github/copilot-instructions.md),
then follow [`docs/idd-workflow.md`](./docs/idd-workflow.md).

## License

[MIT](./LICENSE)
