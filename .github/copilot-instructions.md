# Guidelines for GitHub Copilot

This file is the GitHub Copilot entry-point adapter. Copilot surfaces
should read the canonical, tool-neutral [`AGENTS.md`](../AGENTS.md)
first; shared repository rules are maintained there rather than copied
into this file.

## Copilot-specific notes

- Map the shared "continue autonomously for low-risk work, but pause and
  ask when a step is risky or uncertain" guidance onto Copilot's actual
  UI: switch to Plan mode and ask the user when that pause condition
  applies while working in Agent mode, providing one or more recommended
  response options.
- Apply the IDD phase routing from
  [`docs/idd-workflow.md`](../docs/idd-workflow.md) and the current phase
  file under `.github/instructions/` when Copilot starts or resumes work.

## Canonical policy redirect

Branch strategy, synchronization, and merge rules live in the canonical
[`AGENTS.md`](../AGENTS.md). This adapter intentionally does not duplicate
those rules; follow that file when a repository document links here for
the Copilot entry point.

See [`docs/ai-strategy.md`](../docs/ai-strategy.md) for the canonical
source and adapter policy.
