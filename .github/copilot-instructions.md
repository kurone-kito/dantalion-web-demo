# Guidelines for AI Agents

This project is **dantalion-web-demo** — the standalone repository for
the modern web playground of `@kurone-kito/dantalion-core` and
`@kurone-kito/dantalion-i18n`. The target stack is a pnpm workspace
with Solid Start, and the published static build is expected to serve
from `https://kurone-kito.github.io/dantalion/`.

When contributing to this repository using AI agents, adhere to the
following guidelines.

## Tooling priority and compatibility

This repository is optimized for GitHub-native Issue-Driven Development
and keeps GitHub Copilot instruction files as the canonical source of
truth.

`AGENTS.md`, `CLAUDE.md`, and `GEMINI.md` exist as lightweight
compatibility entry points for Codex, Claude Code, and Gemini CLI.
Keep this file as the canonical detailed guide.

Per-phase IDD conventions live in `.github/instructions/` and should be
treated as authoritative during autonomous execution.

## Conversation

- Match the conversational language to the user's language.
- Write comments and documentation in English unless there is a clear
  project-specific reason otherwise.
- Keep changes small, reviewable, and atomic.
- If uncertainty or hidden risk blocks a safe change, switch to a
  planning posture and ask a concise question.

## Boundaries

### Always do

- Follow Conventional Commits.
- Use LF line endings and keep a final newline.
- Keep commits atomic and user-facing.
- Record local IDD policy changes in [`docs/idd-policy.md`](../docs/idd-policy.md).

### Ask first

- Adding or removing runtime dependencies.
- Changing the project architecture or package layout.
- Modifying CI/CD workflows after they are established.
- Changing the recorded IDD merge or approval policy.

### Never do

- Commit secrets, credentials, API keys, or tokens.
- Modify community documents without explicit approval.
- Disable or bypass lint/test gates without justification.

## Current state

The workspace scaffold is present and the root command set below is
available. Application packages will land incrementally under
`packages/`:

- Install dependencies: `corepack enable && pnpm install --frozen-lockfile`
- Lint and auto-fix: `pnpm run lint:fix`
- Lint: `pnpm run lint`
- Test: `pnpm run test`
- Build: `pnpm run build`

## IDD workflow

This repository runs Issue-Driven Development from
[`kurone-kito/idd-skill`](https://github.com/kurone-kito/idd-skill).

- Marker prefix: `dantalion-web-demo`
- Merge policy: `fully_autonomous_merge`
- Review policy: `copilot-advisory`
- Thread resolution policy: `fast-agent-resolve`
- Trusted marker actor: `kurone-kito`

Use [`docs/idd-workflow.md`](../docs/idd-workflow.md) for phase routing
and [`docs/idd-policy.md`](../docs/idd-policy.md) for the local policy
record.

For pre-execution issue drafting, use the source copy of the
issue-authoring companion at
[`skills/issue-authoring/SKILL.md`](../skills/issue-authoring/SKILL.md).
