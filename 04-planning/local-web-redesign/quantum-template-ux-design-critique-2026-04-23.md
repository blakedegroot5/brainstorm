# Quantum Template UX/Design Critique (Major)

Date: 2026-04-23  
Scope reviewed:
- `/home/blake/web-template-builder/index.html`
- `/home/blake/web-template-builder/styles.css`
- `/home/blake/web-template-builder/script.js`
- Screenshot: `/home/blake/brainstorm/.telegram-inbox/1776978474_photo_AQADkQ1rG_YMWEd-.jpg`

## Top Findings (Ordered by Severity)

### 1) Mobile conversion path is weak for a phone-first trade business (High)
- Header CTA is hidden on small screens (`styles.css:651-653`).
- Hero/button CTAs always scroll to contact form instead of calling (`script.js:117-123`).
- Phone number is plain text, not tap-to-call (`index.html:149`).
- Impact: highest-intent mobile users cannot convert in 1 tap.

### 2) Lead form is non-functional in production terms (High)
- Form has no real endpoint/action (`index.html:164-178`).
- JS blocks submit, shows alert, and resets (`script.js:90-110`).
- Inputs are missing `name` attributes, so payload is not submission-ready (`index.html:166-175`).
- Impact: false conversion signal and guaranteed lead loss after launch.

### 3) Credibility content looks placeholder/generic (High)
- Testimonials use generic names and non-specific quotes (`index.html:124-135`).
- Portfolio alt text is generic (`Project 1`, etc.) and proof lacks context (`index.html:102-105`).
- Hero copy is broad and interchangeable (`index.html:41-43`).
- Impact: owner may feel the mockup is "templatey" rather than crafted for Quantum.

### 4) Hero and header composition feels cramped on mobile (Medium)
- Hero is short with fixed height (`styles.css:668-670`) while content stack is large.
- Top margin compensation + sticky header creates tight visual rhythm (`styles.css:220`, `595-598`, `668-670`).
- Screenshot confirms headline crowding and weak breathing room.
- Impact: first impression quality drops; trust and polish perception suffer.

### 5) Information architecture misses key decision questions above fold (Medium)
- Missing immediate proof blocks such as service area list, process steps, and project-type qualifiers near hero.
- Services/testimonials are present but do not reduce estimate-call uncertainty fast.
- Impact: fewer qualified calls; more price-shopping behavior.

### 6) Accessibility and semantics are below production baseline (Medium)
- Form fields rely on placeholders without explicit labels (`index.html:166-175`).
- Carousel buttons lack accessible labels (`index.html:107-108`).
- Image alt text is non-descriptive (`index.html:102-105`).
- Impact: lower usability, weaker SEO semantics, and avoidable accessibility risk.

### 7) Brand voice and visual language are too generic for local-trade trust building (Medium)
- System font stack + neutral layout reads generic SaaS template (`styles.css:21`).
- Proof elements are text-heavy and iconless in trust section (`styles.css:295-299` hides badge icons).
- Impact: reduced differentiation in a crowded local-contractor SERP.

### 8) Carousel emphasizes interaction over proof density (Low)
- One-image-at-a-time hides project breadth unless user clicks (`index.html:100-115`, `script.js:5-45`).
- No captions (location, scope, material, timeline) to support buyer confidence.
- Impact: weaker project credibility vs. a scannable project grid.

## What To Change First (v2 for Pitch)

1. Add persistent mobile call CTA (`Call (616) 530-2444`) fixed to bottom on phones.
2. Convert all primary CTAs to dual action: `Call Now` + `Request Estimate`.
3. Make phone number clickable (`tel:`) and duplicate near hero.
4. Replace fake testimonials with either:
   - real testimonials from Quantum sources, or
   - clearly marked "placeholder example" content in internal-only mockups.
5. Replace generic hero copy with concrete-specific promise:
   - service types + area + response time in one line.
6. Replace carousel with proof-first 2x2 project grid + short captions.
7. Implement real form handling (Formspree/Netlify/server) with success/error states.
8. Add semantic/a11y baseline: labels, descriptive alt text, `aria-label` on controls.

## Pitch Framing Guidance

When presenting to Quantum, emphasize:
- "We removed friction for mobile callers" (1-tap call path).
- "We moved trust proof above fold" (real testimonials + project specifics).
- "We made the estimate flow real" (submissions actually deliver).

Avoid pitching it as a "design refresh" only. Pitch it as a conversion and trust upgrade.
