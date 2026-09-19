# IDD Policy Configuration

This repository uses the following IDD policies.

## Imported Template Baseline

The IDD core template was re-imported from `kurone-kito/idd-skill` at
reviewed commit `5c2704a1b50901f29d87865002047b1eb491865e` (the
`v0.12.0` release commit is `11105d705820e50be0a14fcc174587abbaf62b30`).
The manifest comparison against the previous local baseline `3d4bdc8`
reported 23 new files, 39 overwrites, and 2 unchanged files before the
apply. The import used the instructions-only profile and preserved the
repository's pnpm command table, marker prefix, trusted actor, main
branch, approval gate, and autonomous-merge choice.

The legacy overview redirect is intentionally removed. Package-manager
helper adoption, native companion skills, and
worktree hook wiring remain in their dedicated roadmap tracks. The
imported dogfooding policy fields are retained as the v0.12 baseline;
live advisory/check identity evidence and the reserved-label guard remain
the explicit follow-up work in #109 and #110.

## Merge Policy

**Policy**: `fully_autonomous_merge`

## PR Review Policy

**Profile**: `copilot-advisory` (copilot advisory default)

## Review-Thread Resolution Policy

**Policy**: `fast-agent-resolve`

## Critique-Loop Profile

**Profile**: upstream dogfooding overrides

- `deferAfterRounds`: 5
- `telemetryHook.command`: `idd-critique-telemetry`

The telemetry hook is fire-and-forget. This repository remains on the
`instructions-only` helper profile, so the hook is advisory until the
package-manager runtime track is adopted.

## Advisory-Wait Profile

**Profile**: upstream dogfooding overrides

- `convergenceScope`: `idd-claimed`
- `convergenceDeadline`: `PT9H`
- `secondaryBotLogin`: `coderabbitai[bot]`
- `secondaryQuietWindow`: `PT1H`

These values keep advisory convergence scoped to claimed IDD work and
give the configured secondary reviewer a bounded quiet window. The
repository still requires live actor and check-identity evidence before
enabling any external-check waiver; that evidence remains in #109.

The imported post-merge cleanup workflow also fails closed for runnable
profiles that lack an immutable helper pin, and it refuses an npm
fallback without a lockfile. The active repository profile remains
`instructions-only` until #81 adopts the pinned package-manager runtime.

## Discovery Profile

- `issueScope`: `roadmap-first`
- `orphanFirstPolicy`: `none`
- `discover.selectionDesync`: `session-offset`

The imported `roadmap-first` scope permits the orphan fallback only when
the roadmap has no eligible work; this repository keeps that fallback
disabled through `orphanFirstPolicy: none`.

## Worktree Guard Profile

The upstream `.githooks/` guard files are imported, but
`worktreeGuard.enabled` remains `false` until #83 chains them through
the existing Husky hooks. This prevents the policy from claiming
protection while direct `core.hooksPath` activation would bypass the
repository's `lint-staged` and commitlint hooks.

## Claim Timing

- **claim-stale-age**: 24 h
- **claim-heartbeat-interval**: 12 h

## CI Wait Policy

- **running timeout**: `PT30M`
- **generation timeout**: `PT10M`
- **rerun policy**: `rerun-once`

## Credential Scope

**Worker credentials**: repo-scoped PAT for worker execution

**Merge-capable credentials**: repo-scoped PAT for merge execution

## Approval Gates

- **issue-author approval gate**: enabled
- **maintainer approval actor policy**:
  `owners-and-maintainers-only`

## Companion and Runtime

- **issue-authoring companion**: installed at
  [`skills/issue-authoring/`](../skills/issue-authoring/)
- **helper runtime profile**: `instructions-only`

## Marker Trust

- **marker prefix**: `dantalion-web-demo`
- **trusted marker actors**: `kurone-kito`
- **iddVersion**: `0.12.0`
