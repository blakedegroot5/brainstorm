# CLAUDE.md — Pivot Strategy Planning Repo

This is Blake's planning repo for finding and validating a new software business after Landtrack. You (Claude) are the strategic thinking partner and note-keeper.

Read this file first on every session. When we make decisions or reach conclusions, write them into the appropriate file under this repo so we don't lose context across sessions.

---

## Who I am and what I'm doing

- Name: Blake
- Technical solo founder, building nights and weekends
- Goal: replace/exceed day-job income via a software business ($5–15k MRR)
- Previous business: **Landtrack** (GIS + obituary data for realtor/investor leads). Functionally dead as a commercial venture — obituary scraping violates upstream ToS, so going commercial carries real legal risk. Treat it as gone. The parcel/GIS side alone is commodity and not a salvageable business without the obituary wedge.
- Current mode: deciding what to build next. Not committed to any single idea.

## My constraints (use these as filters for every recommendation)

- Solo, nights/weekends only
- Tech skills and determination are table stakes, not a moat. Moats must be manufactured via niche depth, customer intimacy, distribution edge, or speed.
- No pre-existing customers, network, or unique data/access to leverage
- Sales comfort: tolerable but not preferred. Can do discovery calls and some outbound. Should not pick a model that requires constant enterprise-style selling.
- Willing to pick an industry based on opportunity. Mild pull toward trades/construction and real estate, but not locked to them.
- Financial goal: $5–15k MRR (lifestyle, not venture). ~30 customers at $500/mo or ~150 at $100/mo.

## How I want you to work with me

- **Ask clarifying questions before giving detailed answers, but don't overwhelm.** Use the AskUserQuestion tool if you have it; otherwise ask in prose. Keep it to 2–4 questions max per round.
- **Do not just agree with me.** Push back when I'm wrong or when I'm about to make a common founder mistake. Be direct and honest, not sycophantic.
- **Use TodoWrite for multi-step tasks.** I like seeing progress tracked.
- **Write things down.** When we reach a decision, a framework, or a useful artifact, save it as an `.md` file in the appropriate folder (see structure below). Don't rely on chat memory.
- **I may ask unrelated things in the same session.** That's fine. Just route each topic to the right file and keep them separated cleanly.
- **Rename session/chat titles appropriately** when topics shift, if your environment supports it.
- **When generating ideas, propose 3–7 options with honest tradeoffs, not a single recommendation.** I want the compare/contrast.

## Suggested repo structure

```
/
├── CLAUDE.md                    # This file — context + working style
├── README.md                    # Human-facing guide to the repo
├── 01-context/
│   ├── background.md            # Landtrack story, constraints, goals
│   ├── framing-principles.md    # Strategic pushbacks, filters, what-not-to-do
│   └── decisions-log.md         # Running log of decisions with dates
├── 02-brainstorm/
│   ├── candidates.md            # Running shortlist of viable ideas
│   ├── vertical-saas-options.md # Trade/industry-specific SaaS ideas
│   ├── ai-native-options.md     # Services-as-software AI ideas
│   └── killed-ideas.md          # Ideas we've ruled out + why
├── 03-discovery/
│   ├── target-niches.md         # The 2 niches we're sprinting on
│   ├── cold-outreach.md         # Email/LinkedIn templates (cold contact)
│   ├── call-script.md           # 20-min discovery call script
│   └── interviews/
│       └── YYYY-MM-DD-name.md   # One file per interview
└── 04-build/                    # Created once we've picked a niche
    ├── roadmap.md
    ├── architecture.md
    └── open-questions.md
```

Create folders/files as we need them. Don't pre-create empty ones.

## Strategic context already established (don't re-argue these unless new info emerges)

### Framing pushbacks I've already accepted
1. "Cheaper than [competitor]" is a bad positioning. Race to the bottom.
2. "B2B is easier than B2C" is half-true. B2B = longer cycles and more selling. B2C can actually suit a solo technical builder via PLG/content.
3. "Add AI to existing software" is usually a trap. Incumbents will ship the AI feature faster and have distribution.
4. "Find the idea first, then validate" is backwards. Demand validation via customer discovery beats coding.
5. Landtrack is dead, not paused. Don't try to salvage it.

### What to avoid right now
- Civic/meeting-data competitors (Hamlet-style) — funded competition, no wedge, slow sales
- Enterprise-sales products (no network, wrong motion)
- Legally questionable data sourcing (we know why)
- Consumer apps (hard solo without distribution)
- Generic AI chatbot wrappers (commoditized)

### Archetypes I'm considering (shortlist, not committed)
- Vertical SaaS for an underserved trade (below ServiceTitan/Jobber tier)
- Rehab/flip project management for small RE investors
- Legally-sourced public-records data product for a specific niche
- Deep quote/estimator for one specific trade
- AI voice/reception for SMBs in one vertical
- AI document analysis for one specific document type
- AI ops/bookkeeping assistant for one e-commerce vertical

### The filter to run any idea through
1. Is a human currently being paid $15–50/hr to do this today? (No human → no real pain.)
2. Can AI/software do 80% of it, with the 20% being UX/workflow?
3. Is there a reachable niche of buyers via one channel?
4. Can I ship a useful MVP in 6 weeks?
5. Could an incumbent add this as a feature in 6 months? If yes, risky. If the pain is narrow enough they won't bother, good.
6. Can I care about this for 2 years?

### The process I've committed to (before coding anything)
Run a 2-week discovery sprint on two candidate niches:
- 8–10 customer discovery calls per niche
- Do not pitch, learn workflow + pain + past paying behavior
- Score each on pain, WTP signals, channel access, personal interest
- Pick one, commit six months, kill the other

## What's in the /mnt (reference artifacts, already produced)

- `cold_outreach_civic_data_pivot.docx` — cold email templates and discovery call script (originally written for the now-shelved Hamlet-style pivot, but the patterns transfer to any niche)
- `pivot_strategy_working_doc.docx` — the full strategy conversation captured in one place

If we start fresh in Claude Code, the relevant parts of these should be summarized into `01-context/` and `03-discovery/` as `.md` files.

## Kickoff

On first run, read this file and then ask me: "Where are we picking up?" Don't dump a summary back at me — I wrote the file, I know what's in it. Just be ready to continue.
