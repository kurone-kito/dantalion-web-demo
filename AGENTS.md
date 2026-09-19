# Guidelines for AI Agents

This project is **dantalion-web-demo** — the standalone repository for
the modern Solid Start web playground of `@kurone-kito/dantalion-core` and
`@kurone-kito/dantalion-i18n`. Its end state is a pnpm workspace that
publishes a static demo to
`https://kurone-kito.github.io/dantalion/`.

This file is the canonical, tool-neutral instruction source for AI
agents. `CLAUDE.md`, `GEMINI.md`, and
`.github/copilot-instructions.md` are entry-point adapters for tools with
different discovery behavior or tool-specific vocabulary and mode
mapping; keep shared guidance here first. The reason for this layout is
recorded in [`docs/ai-strategy.md`](docs/ai-strategy.md).

When contributing to this repository with an AI agent, preserve the
project's IDD workflow and established repository policy. Read the
routed `.github/instructions/idd-*.instructions.md` phase file before
performing that phase's work.

## Conversation

- Match the conversational language to the user's language.
- Write comments and documentation in English unless there is a clear
  project-specific reason otherwise.
- Continue autonomously for low-risk work, but pause and ask a concise
  question when uncertainty or hidden risk makes the next step unsafe.

## Branch strategy

This repository follows a main-only GitHub Flow. `main` is the only
long-lived development branch and changes reach it through a pull
request. The repository records `fully_autonomous_merge` as its IDD
merge policy, but that policy does not bypass CI, review, freshness,
claim, ruleset, or human-decision safety gates.

### Rules

- Never push directly to `main`. Inspect the active repository rulesets
  with `gh api repos/<owner>/<repo>/rulesets`; do not infer protection
  from the legacy `branches/main/protection` endpoint alone.
- Before the first push of an unpublished feature branch, follow the IDD
  submit instructions and synchronize with `origin/main` using the
  repository's pre-publication rebase rule.
- Once a PR branch is published, preserve its review history. If it needs
  the latest `main`, merge `origin/main` into the branch, rerun validation,
  push normally, and return through the E-phase review loop. Do not
  rebase or force-push a published branch unless an explicit repository
  exception authorizes it.
- PRs use merge commits at the PR boundary; do not assume squash or
  rebase merge is available.
- Keep branches and worktrees issue-scoped. Claim an issue before work,
  and revalidate the active claim immediately before every GitHub or git
  mutation made while holding it.

## Boundaries

### Always do

- Keep changes small, reviewable, and atomic.
- Follow Conventional Commits for every commit.
- Use LF line endings, two-space indentation, trimmed trailing
  whitespace, and a final newline.
- Run the repository validation commands appropriate to the change.
- Preserve intentional local IDD customizations and record policy changes
  in [`docs/idd-policy.md`](docs/idd-policy.md).
- Treat issue claims, review markers, CI evidence, and merge gates as
  machine-facing state; do not rewrite or delete them casually.

### Ask first

- Add or remove runtime or development dependencies.
- Change the project architecture or workspace/package layout.
- Modify established CI/CD workflows when no accepted IDD issue scopes
  the change.
- Change shared `@kurone-kito/*-config` packages.
- Change the recorded IDD merge, review, approval, or marker policy.
- Modify community documents such as `CODE_OF_CONDUCT*` or
  `CONTRIBUTING*` without explicit user approval.

An accepted issue, an explicit user request, or a routed IDD phase is the
authorization boundary for work within that scope; it does not authorize
unrelated changes.

### Never do

- Commit secrets, credentials, API keys, or tokens.
- Disable or bypass lint, test, review, claim, or merge gates without a
  documented policy decision.
- Treat generated or AI-suggested code as trusted without reviewing it
  for correctness, security, and project conventions.
- Claim that a command passed unless it was actually run.

## Commit rules

Use Conventional Commits. A `.gitmessage` template is available at the
repository root; opt in with `git config commit.template .gitmessage` if
useful.

### Format

```txt
<type>[optional scope]: <user-facing description>

<body: why, context, and what changed>

<optional trailers>
```

- Use a lowercase, imperative subject under 72 characters with no final
  period.
- Common types include `feat`, `fix`, `docs`, `style`, `refactor`,
  `test`, `chore`, `ci`, `build`, and `perf`.
- Use a short lowercase scope such as `docs(security)` when it improves
  clarity.
- Add a body when the subject does not explain why the change is needed.
- Use `BREAKING CHANGE:` for breaking changes and include migration
  guidance.
- Keep each commit focused on one logical change. Use fixup/autosquash
  only on an unpublished branch when that keeps the history atomic.
- Prefer signed commits when interactive signing is available. In
  non-interactive agent or CI environments where GPG pinentry cannot be
  presented, use `--no-gpg-sign` for `git commit` and `git merge`
  instead of blocking on signing. If configured GPG signing is
  unavailable because of an interactive pinentry/TTY failure, make one
  bounded attempt with the optional local `git commit-ssh` alias, when
  configured, before considering an unsigned fallback. If that alias is
  unavailable, use a per-command SSH signing configuration with a usable
  public signing key, for example:

  ```sh
  git -c gpg.format=ssh -c user.signingkey="<ssh-public-key>" commit -S
  ```

  Discover the key from the configured SSH key command or `ssh-add -L`; do
  not invent a key path or permanently alter the user's signing
  configuration.

## Coding standards

- **Indentation**: 2 spaces, as enforced by `.editorconfig`.
- **Line endings**: LF only, as enforced by `.editorconfig` and
  `.gitattributes`.
- **Trailing whitespace**: trimmed, except where Markdown uses it
  intentionally.
- **Final newline**: always present.
- **File naming**: lowercase with hyphens unless a platform convention
  requires another name, such as `Makefile` or `Dockerfile`.
- Write comments and documentation in English unless a project-specific
  user-facing translation requires otherwise.

## Development

### Install dependencies

```sh
corepack enable
pnpm install --frozen-lockfile
```

### Linting

```sh
pnpm run lint:fix
pnpm run lint
```

### Testing and build

```sh
pnpm run test
pnpm run build
```

### Cleaning

```sh
pnpm run clean
```

The current repository is a pnpm workspace scaffold. Application
packages land incrementally under `packages/`; use the package-specific
scripts and scoped pnpm commands when a change is limited to one package.

## Testing strategy

- Run `pnpm run lint` for every change and run `pnpm run test` for runtime,
  dependency, CI, and behavior changes unless the routed issue gives a
  narrower justified validation plan.
- Keep tests next to the relevant source or in the package's established
  test directories.
- Use descriptive test names that state the expected behavior.
- Keep CI validation aligned with the commands in
  `.github/idd/config.json` and `.github/workflows/`.
- Do not report issue-only or documentation-only checks as proof that
  unrelated runtime behavior was tested.

## Monorepo guidance

- Prefer `pnpm --filter <package>` for package-scoped commands.
- Read the nearest package-level instructions before editing a nested
  package if such instructions exist.
- Confirm package names from each package's `package.json`.
- Respect workspace dependency boundaries and avoid circular imports.
- Keep generated build output and package-local caches out of commits.

## Security

These rules follow the
[OpenSSF Security-Focused Guide for AI Code Assistant Instructions](https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions.html):

- Store credentials in environment variables or a secrets manager; never
  hard-code secrets.
- Treat AI output as untrusted and review it for correctness,
  vulnerabilities, and adherence to repository policy.
- Validate and sanitize external data at trust boundaries.
- Verify recommended dependencies are reputable, maintained, and suitable
  for the project before adding them.
- For security-sensitive code, perform a recursive self-review before
  accepting the generated implementation.

## IDD workflow

This repository runs Issue-Driven Development from
[`kurone-kito/idd-skill`](https://github.com/kurone-kito/idd-skill).

- Phase rules live under `.github/instructions/idd-*.instructions.md`.
- Machine-readable policy lives in `.github/idd/config.json`.
- Marker prefix: `dantalion-web-demo`.
- Merge policy: `fully_autonomous_merge`.
- Review policy: `copilot-advisory`.
- Thread resolution policy: `fast-agent-resolve`.
- Trusted marker actor: `kurone-kito`.
- The helper runtime profile is `instructions-only`.

Before starting IDD work, manually open
`.github/instructions/idd-overview.instructions.md`. Open the routed phase
file manually when the current phase changes; non-Copilot tools must not
rely on automatic loading of repository instruction files.

To start an IDD-driven session, say:

> Start the IDD workflow in this repository.

Read [`docs/idd-workflow.md`](docs/idd-workflow.md) for phase routing
and [`docs/idd-policy.md`](docs/idd-policy.md) for recorded local policy
decisions. For decomposing large requests into IDD-ready issues, use the
source copy of the issue-authoring companion at
[`skills/issue-authoring/SKILL.md`](skills/issue-authoring/SKILL.md).

During autonomous execution:

- Discover and claim a viable issue before editing it.
- Use a dedicated worktree and preserve other sessions' worktrees.
- Revalidate the active claim before issue comments, PR actions, pushes,
  commits, merges, and other mutating operations.
- Keep planning, publication, hold release, and execution approvals
  separate. A published PR or passed CI is not permission to bypass a
  human blocker.
- Follow the current E/F review and advisory-wait protocol, including
  fresh same-claim review snapshots after new activity.

## Onboarding and maintenance

This repository is already a specialized derivative of the upstream pnpm
template. Do not replace its project-specific guidance with generic
template text. When the workspace, CI, IDD policy, or AI tooling changes,
update this canonical file first, then review the three adapters and
[`docs/ai-strategy.md`](docs/ai-strategy.md) for stale duplicated claims.

The adapters should remain thin. Tool-specific vocabulary belongs in the
corresponding adapter; shared rules, setup commands, project policy, and
security guidance belong here.
