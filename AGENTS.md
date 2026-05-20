# Guidelines for AI Agents

This project is **dantalion-web-demo** — the standalone repository for
the modern web playground of `@kurone-kito/dantalion-core` and
`@kurone-kito/dantalion-i18n`. Its end state is a pnpm workspace that
publishes a static demo to
`https://kurone-kito.github.io/dantalion/`.

This file gives Codex and other `AGENTS.md`-aware tools the minimum
rules immediately. The canonical detailed guide lives in
[`.github/copilot-instructions.md`](.github/copilot-instructions.md).

## Setup commands

- Install dependencies: `corepack enable && pnpm install --frozen-lockfile`
- Lint and auto-fix: `pnpm run lint:fix`
- Lint: `pnpm run lint`
- Test: `pnpm run test`
- Build: `pnpm run build`
- Clean: `pnpm run clean`

> **Bootstrap caveat**: until the workspace scaffold lands, the command
> set above is the recorded steady-state plan and may fail on a fresh
> clone.

## Immediate rules

- Match the conversational language to the user's language.
- Write comments and documentation in English unless there is a clear
  project-specific reason otherwise.
- Keep changes small and reviewable, and keep each commit atomic.
- Follow Conventional Commits for every commit.
- If uncertainty or hidden risk blocks a safe change, stop and ask a
  concise question before proceeding.

## IDD workflow

This repository runs Issue-Driven Development from
[`kurone-kito/idd-skill`](https://github.com/kurone-kito/idd-skill).
The phase rules live under `.github/instructions/idd-*.instructions.md`
and the machine-readable policy in `.github/idd/config.json`.

- Marker prefix: `dantalion-web-demo`
- Merge policy: `fully_autonomous_merge`
- Trusted marker actor: `kurone-kito`

To start an IDD-driven session, say:

> Start the IDD workflow in this repository.

See [`docs/idd-workflow.md`](docs/idd-workflow.md) for phase routing
and [`docs/idd-policy.md`](docs/idd-policy.md) for the recorded local
policy decisions.

For decomposing large requests into IDD-ready issues, use the source
copy of the issue-authoring companion at
[`skills/issue-authoring/SKILL.md`](skills/issue-authoring/SKILL.md).

## Canonical reference

The full project guidance lives in
[`.github/copilot-instructions.md`](.github/copilot-instructions.md).
When that file uses Copilot-specific workflow names, apply the intent in
your runtime's own interaction model rather than following the product
terms literally.
