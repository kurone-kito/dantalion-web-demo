# IDD Policy Configuration

This repository uses the following IDD policies.

## Merge Policy

**Policy**: `fully_autonomous_merge`

## PR Review Policy

**Profile**: `copilot-advisory` (copilot advisory default)

## Review-Thread Resolution Policy

**Policy**: `fast-agent-resolve`

## Critique-Loop Profile

**Profile**: distributed defaults

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
- **iddVersion**: `0.1.0`
