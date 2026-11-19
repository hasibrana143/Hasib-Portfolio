# CLAUDE.md - Project Instructions

## Project Overview
- **Name**: Hasib Rana — Full-Stack Developer Portfolio
- **Type**: Next.js 16 single-page web application
- **Stack**: Next.js 16.4.6 (App Router, Turbopack, Cache Components), React 19.3, TypeScript 5 strict, Tailwind CSS 4, local Radix/shadcn-style primitives, Framer Motion 11 (`LazyMotion` + `domAnimation`)
- **Package manager**: npm
- **Node.js**: 22.x, `>=22.12.0`
- **Backend**: One Next.js Route Handler at `POST /api/contact`, backed by Resend
- **Data**: Typed TypeScript files; no database, auth, CMS, Server Action, middleware, or analytics integration

## Repository Identity
- **GitHub**: <https://github.com/hasibrana143/Hasib-Portfolio>
- The same GitHub repository was renamed from `Portfolio` to `Hasib-Portfolio`; the old URL redirects. Do not describe it as a new repository.
- **Local checkout in this environment**: `C:\PROJECTS\Portfolio` (the local folder remains `Portfolio`)
- **Default branch**: `master`; use a feature branch for release work.
- The CI workflow listens to both `main` and `master`, but `master` is the actual branch.

## Design System
- **Direction**: Editorial Swiss — paper `#FBF9F4`, warm ink, vermillion accent
- **Type**: Instrument Serif (display) + Geist (body) + Geist Mono (labels)
- **Tokens**: `src/app/globals.css` custom properties; do not hard-code colors in components
- **Motion**: transform/opacity only; hero entrance is transform-only so it never delays LCP
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` safety net in `globals.css`
- **Content without JavaScript**: keep primary content in the server-rendered HTML

## Commands
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`
- **Typecheck**: `npx tsc --noEmit`
- **Test**: `npm run test`
- **Test:Unit**: `npm run test:unit`
- **Test:Coverage**: `npm run test:coverage`
- **Test:E2E**: `npm run test:e2e`
- **Test:A11y**: `npm run test:a11y`
- **Audit**: `npm audit` (must report 0 vulnerabilities)

## Deployment Target
- **Platform**: Vercel is the intended target; **no deployment is confirmed**
- **Production URL**: Unknown; set it through Vercel's `NEXT_PUBLIC_SITE_URL`
- **Build command**: `npm run build`
- **Output directory**: `.next`
- **Install command**: `npm install` (CI uses `npm ci`)
- **Start command**: `npm run start`
- **Node.js**: 22.x, at least 22.12
- A Vercel project may be configured outside the repository, but do not claim automatic deployment, a production URL, or a successful health check without evidence.

### Release Checklist
1. `npm run build`, `npx tsc --noEmit`, `npm run lint`, `npm run test`, and `npm audit` pass locally.
2. A new GitHub Actions run on `master` is confirmed green.
3. Required variables are configured in Vercel.
4. Deployment is explicitly approved and the resulting URL is recorded.
5. Live health, metadata, headers, keyboard path, contact delivery, WAF, and canary checks pass.

## CI
GitHub Actions (`.github/workflows/ci.yml`) runs on pushes and pull requests targeting `main` or `master`. It performs typecheck, lint, unit tests, build, and the Playwright accessibility suite; the accessibility job builds the production app and starts it with `CI=true`.

**Current remote status**: the run for `ad21c23` failed at typecheck/build because Linux could not resolve case-mismatched UI component imports. A local fix is in progress. Do not state that CI is green until a newer remote run is explicitly confirmed.

## Content
Content is stored in typed source files and updated through code review:
- `src/data/constants.ts` — name, role, description, canonical URL, social profile URLs
- `src/data/projects.ts` — project index (currently one verifiable case study)
- `src/data/skills.ts` — technologies used by this project, grouped by category
- `src/components/HomeContent.tsx` — bio and one non-employer role entry

Guardrails:
- Never invent projects, employers, clients, skills, dates, licenses, or credentials.
- The current social URLs are owner-confirmed.
- The contact address is deliberately **not published**. The form is the intended channel; `CONTACT_EMAIL` is server-only.
- Do not describe Vercel as deployed until a deployment URL and live evidence exist.

## Environment Variables Required
- `RESEND_API_KEY` — Resend key for contact form emails (server-only)
- `CONTACT_EMAIL` — recipient address (server-only, never rendered)
- `NEXT_PUBLIC_SITE_URL` — production origin for metadata, sitemap, robots, canonical, and JSON-LD; embedded at build time

## Environment Variables Optional
- `RESEND_FROM_EMAIL` — verified sender address; defaults to `Portfolio Contact <onboarding@resend.dev>`

Local `.env.local` is configured and ignored. The variables must be configured separately in Vercel. Remote `ad21c23` lacks a usable `.env.example` because `.gitignore` matched `.env*`; a sanitized template/ignore exception is part of the local in-progress fix. Never put a real credential in the template.

## Quality Gates
- Production build passes
- TypeScript strict mode passes
- ESLint passes with 0 errors and 0 warnings
- Unit tests pass (current local run: 16 tests across 2 files)
- `npm audit` reports 0 vulnerabilities
- Automated accessibility suite has 0 critical/serious violations (prior local result: 35/35 across five browser profiles)
- Prior local production Lighthouse result: Performance 99, Accessibility 100, Best Practices 100, SEO 100
- No console errors or CSP violations in the prior local production probe
- A newer remote CI run on `master` is green
- A production deployment and live canary are verified

## Git Workflow
- **Primary branch**: `master`
- **Feature branches**: `feature/*`
- Do not assume a repository-hosted squash/merge policy; no merge workflow is encoded in the source tree.
- Do not deploy or merge to `master` without the required gates and explicit approval where production is involved.

## Vercel Configuration
- Framework: Next.js
- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install`
- Start command: `npm run start`
- Node version: 22.x (`>=22.12.0`)

## Security Notes
- `/api/contact` is the only public write endpoint. It enforces JSON content type, a 16 KiB body cap, shared Zod validation, a honeypot, per-IP rate limiting, and HTML-escapes all user input.
- The endpoint returns `503` when `RESEND_API_KEY` or `CONTACT_EMAIL` is missing; it never sends to a placeholder recipient.
- The in-memory limiter is per-instance on serverless. Pair it with a Vercel WAF rate limit in production (see `.ai/DEPLOYMENT.md`).
- CSP is set in `next.config.ts`; `unsafe-eval` is allowed only in development.
- Zod runs with `z.config({ jitless: true })` so it does not use `new Function` under the CSP.
- GitHub secret scanning, secret push protection, Dependabot vulnerability alerts, and Dependabot security updates are enabled; no SAST/CodeQL workflow is present.
- The Resend key that appeared in the earlier local ignored template must be rotated by the owner before deployment; never log or document the value.
- No repository license is declared. Do not imply reuse rights without an explicit owner/legal decision.
