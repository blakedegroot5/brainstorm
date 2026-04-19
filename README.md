# Pivot Strategy Planning Repo

Private planning repo for finding and validating the next software business.

## How to use this repo with Claude Code

1. `CLAUDE.md` at the root is auto-loaded by Claude Code every session. That's the persistent context — working style, constraints, strategic decisions already made.
2. Folders are organized by phase: strategy → ideas → discovery → planning → build.
3. Every project has a dedicated subfolder within each phase (e.g., `03-discovery/mls-listing-automation`).
4. When new decisions or artifacts come out of a session, Claude should write them to the appropriate file. Chat memory is ephemeral; the repo is the source of truth.

## Starting a new Claude Code session

From inside the repo:

```bash
claude
```

Then paste:

> Read CLAUDE.md. Then ask me where we're picking up.

That's it. Everything else lives in the repo.

## Folder map

- **`01-strategy/`** — background, constraints, framing principles, decisions log
- **`02-ideas/[project]/`** — initial hypotheses, research, and candidates (e.g., `funeral-tech`)
- **`03-discovery/[project]/`** — market research, call scripts, and interview notes
- **`04-planning/[project]/`** — architecture, technical planning, and task lists
- **`05-build/[project]/`** — source code and execution artifacts

## Conventions

- Every decision gets a line in `01-strategy/decisions-log.md` with a date.
- Every killed idea gets an entry in `02-ideas/killed-ideas.md` with *why* — future-me will re-surface these and I want to remember why they were ruled out.
- Interview notes use `03-discovery/[project]/interviews/YYYY-MM-DD-firstname-lastname.md`.
- Keep docs short and scannable. If a file is getting long, split it.
