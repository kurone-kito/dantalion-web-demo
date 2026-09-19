# AI tooling strategy

This repository supports Codex CLI, Claude Code, GitHub Copilot, Gemini
CLI, and other compatible agent tools. The layout gives all of them one
shared source of project policy while retaining the small entry-point
adapters required by tools with different discovery behavior.

## Canonical guidance

- [`AGENTS.md`](../AGENTS.md) is the canonical, fully detailed,
  tool-neutral guide. It contains the project description, setup and
  validation commands, branch and commit rules, security guidance, and
  the local IDD policy.
- [`CLAUDE.md`](../CLAUDE.md) and [`GEMINI.md`](../GEMINI.md) are thin
  adapters for tools that may not discover `AGENTS.md` by default. Each
  imports `AGENTS.md` through a standalone `@AGENTS.md` directive.
- [`.github/copilot-instructions.md`](../.github/copilot-instructions.md)
  is a thin Copilot adapter. Copilot can discover `AGENTS.md` directly,
  so this file contains only Copilot's Plan-mode mapping and the entry
  point to the IDD workflow.
- [`docs/idd-workflow.md`](idd-workflow.md) explains the workflow's
  routing and file topology; the phase instruction files under
  `.github/instructions/` remain the operational authority.

## Change policy

`AGENTS.md` is the source of truth for shared rules. Adapters make that
content discoverable across tool entry points and provide tool-specific
vocabulary or mode mapping — do not duplicate project guidance into
them. When a rule needs tool-specific vocabulary, keep the neutral rule
in `AGENTS.md` and put the vocabulary mapping in that tool's adapter.

When IDD policy changes, update `.github/idd/config.json`, the owning
phase instructions, and `docs/idd-policy.md` as required by the policy
constants. Then check this document and the adapters for stale claims.

## Onboarding and maintenance

This is a specialized derivative repository, not a blank copy of the
upstream pnpm template. Preserve its Solid/web-playground context,
workspace commands, and IDD customizations when importing upstream
guidance. Review `AGENTS.md` first, then the adapters and any scoped
instruction files when adding a new agent surface.

Keep this file as a short human-facing explanation of the canonical
source decision. It should not become a second policy source.

## History

The repository previously kept near-duplicate guidance in
`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and
`.github/copilot-instructions.md`, while treating the Copilot file as the
primary guidance entry point. That layout made each policy change drift
across entry files.
The current structure follows the upstream template's dogfooding
pattern: one canonical `AGENTS.md` with thin adapters, while retaining
the project-specific IDD and workspace rules in the canonical file.
