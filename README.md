# Pivot Strategy Planning Repo

Private planning repo for finding and validating the next software business.

## How to use this repo with Claude Code

1. `CLAUDE.md` at the root is auto-loaded by Claude Code every session. That's the persistent context — working style, constraints, strategic decisions already made.
2. Folders are organized by phase: context → brainstorm → discovery → build.
3. When new decisions or artifacts come out of a session, Claude should write them to the appropriate file. Chat memory is ephemeral; the repo is the source of truth.

## Starting a new Claude Code session

From inside the repo:

```bash
claude
```

Then paste:

> Read CLAUDE.md. Then ask me where we're picking up.

That's it. Everything else lives in the repo.

## Folder map

- `01-context/` — background, constraints, framing principles, decisions log
- `02-brainstorm/` — candidate ideas, archetypes, killed ideas with reasoning
- `03-discovery/` — outreach, call scripts, interview notes (one MD per call)
- `04-build/` — only created after committing to a niche

## Conventions

- Every decision gets a line in `01-context/decisions-log.md` with a date.
- Every killed idea gets an entry in `02-brainstorm/killed-ideas.md` with *why* — future-me will re-surface these and I want to remember why they were ruled out.
- Interview notes use `03-discovery/interviews/YYYY-MM-DD-firstname-lastname.md`.
- Keep docs short and scannable. If a file is getting long, split it.

## Related artifacts

- `cold_outreach_civic_data_pivot.docx` — initial cold outreach templates (adapt for new niches)
- `pivot_strategy_working_doc.docx` — full strategy conversation captured
