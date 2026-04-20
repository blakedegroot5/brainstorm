# Hosting Provider Options (Local Web Redesign)

Date: 2026-04-20
Status: Decision support

## Recommendation summary

For current stage, avoid putting multiple client sites on one shared VPS.
Default to managed platforms (or low-code hosting) to reduce operational burden.

## Option A: Single Shared VPS (e.g., DigitalOcean Droplet)

### Pros
- Low raw hosting cost.
- Full control over stack and deployment.

### Cons
- You own security patching, backups, uptime, SSL, monitoring.
- Shared blast radius (one server issue can affect multiple clients).
- Higher support overhead than expected for a solo operator.

### Cost notes
- DigitalOcean basic droplet starts at around $4/month.
- Bandwidth overages can apply (for example, outbound transfer above included allotment).

## Option B: Managed Static/Serverless Platforms (Netlify/Vercel/Cloudflare)

### Pros
- Fast deployment and lower ops load.
- Built-in SSL/CDN and rollback workflows.
- Better isolation per client site.

### Cons
- Usage-based costs can rise on dynamic workloads.
- Platform-specific limits and pricing models require monitoring.

### Cost notes
- Netlify: free tier plus paid plans (e.g., Personal/Pro tiers).
- Vercel: Pro plan pricing plus usage (Hobby is non-commercial).
- Cloudflare Workers/Pages: low-cost paid entry plus usage model.

## Option C: Low-Code Managed Platform (Webflow)

### Pros
- Fastest path for brochure sites.
- Client-friendly editing workflow.
- Minimal engineering maintenance.

### Cons
- Less flexibility than code-first stack.
- Per-site plan pricing can add up.

### Cost notes
- Webflow has free/starter options and paid site plans (CMS/Business tiers).

## Practical platform strategy

1. Default for speed and low code:
- Webflow for straightforward brochure sites.

2. Default for custom code with low ops:
- Next.js/Astro static builds on Cloudflare Pages or Netlify/Vercel.
- Keep each client isolated per project/site.

3. Defer shared VPS model until:
- Standardized infra automation exists.
- Operational runbooks are in place.
- MRR is stable enough to justify ops risk.

## Pricing and policy references

- DigitalOcean Droplet pricing: https://www.digitalocean.com/pricing/droplets
- DigitalOcean pricing details: https://docs.digitalocean.com/products/droplets/details/pricing/
- Netlify pricing: https://www.netlify.com/pricing/
- Vercel pricing: https://vercel.com/pricing
- Cloudflare Workers pricing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare Pages pricing: https://developers.cloudflare.com/pages/functions/pricing/
- Webflow pricing: https://webflow.com/pricing
