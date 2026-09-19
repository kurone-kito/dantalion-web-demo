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
