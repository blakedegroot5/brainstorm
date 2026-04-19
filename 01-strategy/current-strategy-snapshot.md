# Current Strategy Snapshot (2026-04-17)

## Objective

Find a fast-cashflow business path, then evolve toward recurring MRR.

## Core Operating Principle

**Feasibility first, validation second.** Do not validate pain around a solution you can't actually execute. Before discovery calls, map out the rough operational process so you know the wedge is real.

## Decisions made this session (2026-04-19)

- Validated "actual rage" around FlexMLS photo management (resizing/ordering) via Reddit/forum research.
- Refined "Trojan Horse" to the "Collaboration Hook"—realtor sends upload link, photographer uploads raw files, platform "cleans" them for MLS.
- Prioritized "Chrome Side Panel API" for the Sidecar UI to ensure a native, stable gutter next to FlexMLS.
- **Cost-Optimized AI Model**: Implement "Thumbnail-First" vision and "One-Pass" extraction to keep API costs <$1 per listing.
- **JPEG-Only Pipeline**: Focus on high-res JPEGs (photographer standard) to solve the resizing/ordering "rage" without the complexity of RAW.
- Pivot to **Hybrid Integration Strategy**: Build both Spark API (Official) and Chrome Extension (Universal) sequentially. This bypasses broker "red tape" while offering a premium stable path for partners.

## Current status (as of 2026-04-19)

**Active exploration:** Real Estate MLS Listing Automation + Workflow Expansion

We are in a **"ready-to-validate"** state with a high-conviction product hypothesis:
- **The Problem:** Manual data entry and media management (resizing/ordering) are massive bottlenecks for realtors and admins.
- **The Solution:** A "Cost-Light" unified platform that stages "Incomplete" listings via Hybrid Sidecar.
- **The Wedge:** Using the "Wildlife Realty" (Broker-Owned) connection to build the official API path while using the extension as the universal entry point.

**Research complete:**
- ✅ MLS ToS/Licensing (cleared)
- ✅ Competitor Analysis (gaps identified)
- ✅ Realtor Pain Points (validated)
- ✅ System Architecture (Hybrid API + Extension defined)

**Next immediate actions:**

1. **Friend Discovery Call (Realtor):** Validate the "media rage" and "Sidecar UI" value prop.
2. **Admin Discovery Interview:** Validate the full "Prep-to-Post" workflow (scheduling + payments + MLS entry).
3. **Spark API Technical Check:** Await response from `api-support@sparkplatform.com` to confirm write capabilities (determines "Gold Standard" vs "Silver Standard" auto-fill).
4. **Feasibility Stop-Gaps:** Investigate Stripe Connect setup complexity for V1 payments.
