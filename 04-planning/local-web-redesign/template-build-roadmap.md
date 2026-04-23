# Web Template Build Roadmap

**Objective:** Build a reusable, production-ready template website for local service businesses, then customize for Quantum Concrete as first pitch/mockup.

**Timeline:** 1 week (template) + iterative customization per customer

---

## Phase 1: Template Foundation (2–3 days)

### Design Phase (Claude Code)
- [ ] Create wireframe/layout structure
- [ ] Choose color palette (professional, neutral, modern)
- [ ] Define typography (fonts, sizes, weights)
- [ ] Plan responsive breakpoints (mobile, tablet, desktop)

### Development Phase (Claude Code)
- [ ] Build HTML structure (semantic, clean)
- [ ] CSS styling (mobile-first, responsive)
- [ ] JavaScript (smooth scrolling, gallery, form handling)
- [ ] Asset optimization (images, icons, fonts)

### Testing Phase
- [ ] Mobile responsiveness (iOS, Android, landscape)
- [ ] Browser compatibility (Chrome, Firefox, Safari)
- [ ] Lighthouse performance audit
- [ ] Accessibility check (headings, contrast, ARIA)

**Deliverable:** `/home/blake/web-template-builder/template/` ready for customization

---

## Phase 2: Quantum Concrete Mockup (1–2 days)

### Customization
- [ ] Extract photos from quantumconcrete.com current site
- [ ] Update HTML with Quantum's info (name, phone, address, hours)
- [ ] Add services list (concrete installation, walls, footings, etc.)
- [ ] Insert photos into gallery
- [ ] Customize colors (optional: match their current branding or upgrade)

### Content
- [ ] Write compelling "About" section (30+ years, licensed, local)
- [ ] List all services offered
- [ ] Add any testimonials or trust signals (if available on current site)
- [ ] Contact/CTA sections (phone prominently)

### Deployment
- [ ] Deploy to Vercel or Netlify (free tier)
- [ ] Configure custom domain or use temp URL
- [ ] Test live (mobile, desktop, forms)
- [ ] Screenshot for pitch/demo

**Deliverable:** Live mockup URL + screenshots for Quantum Concrete pitch

---

## Phase 3: Iterate & Scale (After first customer)

### If Quantum says YES
- [ ] Gather feedback on design/layout
- [ ] Refine template based on feedback
- [ ] Add customer-specific tweaks
- [ ] Finalize and launch

### For next customers
- [ ] Repeat Phase 2 with new customer data
- [ ] Build library of variations (by trade type)
- [ ] Optimize customization workflow to &lt;1 hour per customer

---

## Tech Stack (Final Decision)

**Chosen: Static HTML/CSS/JS + Vercel/Netlify**

Rationale:
- Build time: 2–3 hours (fast with Claude Code)
- Customization: 30–60 min per customer
- Hosting: Free/cheap ($0–5/mo)
- Performance: Fast (&lt;3s load time)
- Maintenance: Minimal (no backend, no database)

---

## Build Checklist

### HTML Structure
- [ ] Semantic HTML5 (header, nav, section, footer)
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Meta tags (title, description, viewport)
- [ ] Open Graph / Twitter cards (social sharing)
- [ ] Schema.org structured data (for SEO)

### CSS & Styling
- [ ] Mobile-first responsive design
- [ ] CSS Grid or Flexbox (modern layout)
- [ ] Color variables (easy to customize)
- [ ] Typography system (consistent sizing)
- [ ] Animations/transitions (smooth, not distracting)

### JavaScript (Minimal)
- [ ] Mobile menu toggle (hamburger)
- [ ] Smooth scroll anchors
- [ ] Photo gallery/lightbox (optional)
- [ ] Contact form validation (optional)
- [ ] No jQuery or heavy dependencies (keep it light)

### Performance
- [ ] Minified CSS/JS
- [ ] Optimized/compressed images
- [ ] Lazy loading for images (if many)
- [ ] Fast Time to Interactive (TTI)
- [ ] Lighthouse score &gt;90

### Accessibility
- [ ] Color contrast ≥ 4.5:1
- [ ] Keyboard navigation (tab order)
- [ ] Alt text on all images
- [ ] ARIA labels where needed
- [ ] Form labels properly associated

---

## File Structure

```
/home/blake/web-template-builder/
├── template/
│   ├── index.html
│   ├── css/
│   │   ├── style.css
│   │   └── reset.css
│   ├── js/
│   │   └── main.js
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero-bg.jpg
│   │   │   ├── service-1.jpg
│   │   │   └── service-2.jpg
│   │   ├── icons/
│   │   ├── fonts/
│   │   └── logo.svg
│   └── README.md (how to customize)
├── customers/
│   ├── quantum-concrete/
│   │   ├── index.html
│   │   ├── css/ (overrides if needed)
│   │   ├── assets/
│   │   │   └── images/
│   │   └── config.json (customer data)
│   └── [future customers]/
├── docs/
│   ├── build-guide.md
│   ├── customization-guide.md
│   └── deployment-guide.md
└── .gitignore
```

---

## Next Steps

1. **Day 1–2:** Build template foundation (HTML/CSS/JS)
2. **Day 3:** Customize for Quantum Concrete
3. **Day 4:** Deploy and screenshot
4. **Day 5:** Pitch to Quantum Concrete (email + phone call)

---

## Deployment Notes

**Build folder:** `/home/blake/web-template-builder`

**Port Requirements:**
- Cannot use ports 80 or 443 (behind reverse proxy)
- Use alternate ports for local dev/testing (e.g., 3000, 8000, 8080, 5000)
- Production deployment: Use managed hosting (Vercel, Netlify) — no port management needed

**For local testing:**
- Test site on alternate port during build phase
- Example: `python -m http.server 8000` or `npx http-server -p 8000`

## Notes for Claude Code

- Use semantic HTML5 for structure
- Leverage CSS Grid/Flexbox (no Bootstrap needed)
- Keep JavaScript minimal (vanilla JS, no frameworks)
- Optimize images before committing
- Test on multiple devices/browsers before deployment
- Use system fonts or minimal font-faces (performance)
- Test locally on alternate port (not 80/443)
