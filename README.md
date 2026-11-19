# Hasib Rana — Portfolio

Personal portfolio built with **Next.js 16 (App Router)**, TypeScript, Tailwind CSS v4 and Framer Motion. Single-page site with an Editorial Swiss visual system: paper background, warm ink, vermillion accent, hairline rules and numbered section eyebrows.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.4.6 (Turbopack, `cacheComponents`) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + CSS custom properties in `src/app/globals.css` |
| Animation | Framer Motion 11 (`LazyMotion` + `domAnimation` for tree-shaking) |
| Forms | React Hook Form 7 + Zod 4 |
| Email | Resend 6 |
| Testing | Vitest (unit), Playwright + axe-core (accessibility) |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY / CONTACT_EMAIL
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Typecheck |
| `npm run test` | Unit tests (Vitest) |
| `npm run test:a11y` | Accessibility suite (Playwright + axe-core, 5 browser engines) |
| `npm run test:e2e` | Full Playwright suite |

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Production | Resend API key used by `/api/contact` |
| `CONTACT_EMAIL` | Production | Recipient for contact form submissions — **never shown on the site** |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical site URL — drives metadata, sitemap, robots and the JSON-LD `url` |
| `RESEND_FROM_EMAIL` | Optional | Verified sender address, defaults to `onboarding@resend.dev` |

Without `RESEND_API_KEY` **or** `CONTACT_EMAIL` the contact endpoint returns `503` with a clear message — it never sends to a placeholder address.

## Where to edit the content

All copy and data live in four files. Nothing is hard-coded inside components.

| File | Holds |
|---|---|
| `src/data/constants.ts` | Name, role, description, canonical URL, **social profile links** |
| `src/data/projects.ts` | The project index — one entry per project, same shape as the existing one |
| `src/data/skills.ts` | Skill groups (frontend / backend / data / devops / tools) |
| `src/components/HomeContent.tsx` | The bio paragraphs and the experience timeline |

**Two things are still waiting on the owner:**

1. **Social handles** — `src/data/constants.ts` currently uses `hasibrana` for GitHub, LinkedIn and X. Change the three URLs if the real handles differ.
2. **More projects** — the index currently ships one entry (this site, with verifiable detail). Add the next one by copying the existing object in `src/data/projects.ts`; the category filter appears automatically once a second category exists.

Project preview images live in `public/images/projects/` as 1280×720 SVGs, styled to match the site.

## Contact form

The address is deliberately not published — the form is the only channel.

`src/app/api/contact/route.ts` treats every request as untrusted:

- `Content-Type: application/json` required (blocks blind cross-origin `text/plain` POSTs)
- 16 KB request body cap, per-field length caps
- Shared Zod schema re-validated server-side (`src/lib/contact-schema.ts`)
- Honeypot field — submissions that fill it return success but send nothing
- In-memory per-IP rate limit (5 requests / 10 min)
- All user input HTML-escaped before it reaches the email body
- `503` instead of a silent send when the email service is not configured

The in-memory limiter is per-instance on serverless. Add a Vercel WAF rate limit for the deployed URL (see `.ai/DEPLOYMENT.md`).

## Deploy

Vercel is the intended target — connect the repo and set the environment variables above. The build command is `npm run build`, output directory `.next`.

## Accessibility & performance

- axe-core: 35/35 checks pass across Chromium, Firefox, WebKit, Mobile Chrome and Mobile Safari
- Lighthouse (production build): Performance 98, Accessibility 100, Best Practices 100, SEO 100
- Content is server-rendered, so it is readable by crawlers and without JavaScript
- JSON-LD `Person` schema with `sameAs` links to the social profiles
