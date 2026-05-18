# No-Calls Market Scan (Initial) — PDF/Report Automation Concept

Date: 2026-05-18

## Goal

Find viable markets/users for a Chrome-extension-led "webpage -> standardized report/PDF" product using desk research (without relying on cold discovery calls first).

## Constraints used

- Software-first (not services)
- 4-6 week MVP feasibility
- Legal clarity required
- Prefer roles currently paid to do manual reporting/admin work

## Quick market data (national proxies)

## 1) Bookkeeping / accounting clerks (documentation-heavy workflows)

Signals:
- BLS OOH quick facts:
  - Median pay: $49,210
  - Number of jobs (2024): 1,613,400
  - Job outlook (2024-34): -6%
  - ~170,000 openings/year despite decline (replacement demand)

Why this matters:
- Massive role count and recurring documentation/reporting tasks.
- High replacement openings indicate persistent operational workload.

Risk:
- Many firms already use accounting software with built-in exports; wedge must target systems/pages where exports are weak.

## 2) Property / real-estate / community association managers

Signals:
- BLS OOH quick facts:
  - Median pay: $66,700
  - Number of jobs (2024): 466,100
  - Job outlook (2024-34): +4%
  - ~39,000 openings/year

Why this matters:
- Role sits at intersection of owners/tenants/vendors and frequently sends status/report packets.
- Growth + decent wage profile supports willingness-to-pay for time-saving tools.

Risk:
- Highly fragmented tooling; need one specific workflow (e.g., owner packet, maintenance evidence packet).

## 3) Insurance/claims workflows (incl. auto damage contexts)

Signals:
- BLS OOH (Claims Adjusters, Appraisers, Examiners, Investigators):
  - Median pay: $76,790
  - Number of jobs (2024): 365,300
  - Job outlook (2024-34): -5%
  - ~21,600 openings/year
  - Work context includes damaged automobiles and buildings

Why this matters:
- Higher-value roles and strict documentation patterns.
- Strong value if output can be made "claim-file ready".

Risk:
- Compliance/privacy sensitivity; legal/policy controls mandatory from day 1.

## 4) Generic "web to PDF" utility market (for comparison)

Signals:
- Established extension competition (GoFullPage, FireShot, PrintFriendly, Adobe extension workflows).
- Market already has very large installed products (millions-level user claims in public listings/linked profiles).

Why this matters:
- Competing as a general utility is likely a commodity trap.
- Must position as workflow product, not capture utility.

## Competitive take

## What incumbents already cover well
- Full-page capture
- Print cleanup
- Simple PDF export
- Basic annotations/sharing

## What is still under-served
- Role-specific packet standards
- Source-aware field extraction
- Audit trail (who captured what, when, from where)
- Policy controls (retention/redaction/approval)

## Recommended niche ranking (initial)

1. Property management reporting packets
- Best balance of growth, role count, and moderate compliance burden.

2. Bookkeeping evidence packets for weak-export portals
- Largest TAM-style role count; likely fast validation if source system pain is real.

3. Insurance/collision packeting
- High value per user but more legal/compliance complexity.

## No-call validation plan (7 days)

1. Collect 30 target pages (10 per niche) from:
- public demos/help docs
- user-shared screenshots/videos
- your own contacts where available

2. Build "pain proxy" dataset:
- how many steps to produce shareable report now
- whether users mention copy/paste/manual cleanup
- whether they mention compliance/client formatting requirements

3. Competitive teardown matrix (10 tools):
- one-click capture quality
- structured data extraction
- template locking
- audit logs
- email/scheduled packeting

4. Test fake-door landing pages (3 niche variants):
- property packet
- bookkeeping packet
- claims packet
- Measure signups/click intent before coding full product.

## Decision gate after desk research

Proceed only if one niche has all three:
- repeatable manual workflow pain
- weak incumbent fit on structured packet output
- clear legal path for user-authorized capture + storage + delivery

## Sources

- Bookkeeping clerks (BLS OOH):
  https://www.bls.gov/ooh/office-and-administrative-support/bookkeeping-accounting-and-auditing-clerks.htm
- Property managers (BLS OOH):
  https://www.bls.gov/ooh/management/property-real-estate-and-community-association-managers.htm
- Claims adjusters/appraisers (BLS OOH):
  https://www.bls.gov/ooh/business-and-financial/claims-adjusters-appraisers-examiners-and-investigators.htm
- Chrome Web Store listing references:
  https://chromewebstore.google.com/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl
  https://chromewebstore.google.com/detail/take-webpage-screenshots/mcbpblocgmgfnpjjppndjkmgjaogfceg
- PrintFriendly extension page:
  https://www.printfriendly.com/extensions/chrome
- Chrome extension ecosystem analytics reference:
  https://chrome-stats.com/
