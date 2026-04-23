# Web Redesign Template Architecture

**Purpose:** Build a reusable, customizable website template that can be deployed for local trade/service businesses (concrete, welding, auto body, etc.). Use as mockup/pitch tool and foundation for actual client sites.

**Status:** Planning phase

---

## Core Requirements

### Build Speed
- Template build: 2–3 hours with Claude Code
- Customization per customer: 30–60 minutes (swap name, photos, phone, services)
- Deploy ready (SSL, mobile-optimized, fast)

### Visual/UX
- Mobile-first responsive design
- Modern, professional look (not dated)
- Clear CTAs (phone, quote request)
- Photo gallery section (for showcasing work)
- Services list
- Contact/hours section

### Technical
- Static site or lightweight framework
- No CMS overhead (RegisteredSite competitor problem)
- Easy to host and update
- SSL certificate included
- Fast load times (no bloat)

### Customization Points (per customer)
- Business name and logo
- Services list (concrete, welding, auto body, etc.)
- Photos (pulled from their current site or provided)
- Phone number and address
- Email/contact form
- Business hours
- Color scheme (optional: use template colors or custom)

---

## Tech Stack Decision

### Options:

**Option A: HTML/CSS/JS (static site)**
- Pros: Fast, simple, easy to deploy, minimal hosting costs
- Cons: No dynamic content, updates require code changes
- Good for: Trades that don't update often

**Option B: Next.js + Vercel (React)**
- Pros: Modern, easy to customize, can add features later, fast
- Cons: Overkill for static sites, hosting costs higher
- Good for: Future-proofing, adding features

**Option C: Astro (modern static)**
- Pros: Fast, component-based, easy to customize, great for static sites
- Cons: Learning curve
- Good for: Balance of power and simplicity

### Recommendation:
**Start with HTML/CSS/JS static site.** Fastest to build, easiest to host (cheap), easiest to customize. If we need dynamic features later, we can migrate.

---

## Template Structure

```
web-template-builder/
├── template/
│   ├── index.html
│   ├── css/
│   │   ├── style.css
│   │   └── mobile.css
│   ├── js/
│   │   └── main.js
│   ├── assets/
│   │   ├── images/
│   │   ├── logo.png
│   │   └── favicon.ico
│   └── README.md (customization guide)
├── customers/
│   ├── quantum-concrete/
│   │   ├── index.html (customized)
│   │   ├── assets/ (customized)
│   │   └── config.json (customer data)
│   └── [more customers]
└── build-guide.md
```

---

## Design Sections (Template)

1. **Hero/Header**
   - Business name, tagline
   - Call-to-action (Call now / Get quote)
   - Background: photo or gradient

2. **About/Intro**
   - 1–2 paragraph description
   - Years in business, credibility signals

3. **Services**
   - List of services offered
   - Icon or photo per service
   - Brief description

4. **Portfolio/Gallery**
   - Photo grid of previous work
   - Lightbox or simple gallery
   - Captions (optional)

5. **Testimonials/Trust**
   - 2–3 testimonials (if available)
   - Google rating badge (if available)

6. **Contact Section**
   - Phone number (clickable/prominent)
   - Address with map
   - Hours
   - Contact form (optional: simple email form)

7. **Footer**
   - Quick links
   - Social media (if applicable)
   - Copyright, contact info

---

## Customization Workflow

**For each new customer:**

1. Copy `/template/` → `/customers/[company-name]/`
2. Edit HTML:
   - Replace business name, phone, address
   - Update services list
   - Replace photos
   - Update colors (optional)
3. Add customer photos to `/assets/images/`
4. Test on mobile
5. Deploy (host on Vercel, Netlify, or simple shared hosting)

---

## First Customer (Quantum Concrete)

**Goal:** Build mockup quickly, pitch it, close the deal, iterate with feedback

**Tasks:**
1. Build template (base: 2–3 hours)
2. Customize for Quantum Concrete (1 hour)
3. Screenshot/demo the mockup
4. Pitch on call with mockup link
5. If they say yes → iterate on feedback, finalize

---

## Open Questions

- [ ] Hosting plan: Vercel, Netlify, or traditional hosting? (Cost, simplicity)
- [ ] Domain management: Keep on RegisteredSite or move to custom domain?
- [ ] Contact form: Simple email or more robust solution?
- [ ] SEO/Meta tags: How much optimization before launch?
- [ ] Analytics: Include GA or other tracking?
- [ ] Accessibility: WCAG AA compliance required?

---

## Success Metrics

- Template built and tested: ✓
- Quantum mockup ready for pitch: ✓
- Pitch and booking result: (TBD after call)
- Customization time per customer: &lt;1 hour (goal)
- Site load time: &lt;3 seconds on 4G (goal)
- Mobile score: &gt;90 on Lighthouse (goal)
