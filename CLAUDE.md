# CLAUDE.md - Project Configuration

This file contains project-specific configuration for the gstack autonomous workflow.

## Project Overview
- **Name**: Hasib Rana — Full-Stack Developer Portfolio
- **Type**: Next.js 16 Web Application
- **Stack**: Next.js 16.4.6 (Turbopack, `cacheComponents`), TypeScript 5, Tailwind CSS v4, Radix/shadcn-style primitives, Framer Motion 11 (`LazyMotion` + `domAnimation`)
- **Package Manager**: npm
- **Node Version**: 20.x (Next 16 requires Node >= 20.9)

## Design System
- **Direction**: Editorial Swiss — paper `#FBF9F4`, warm ink, vermillion accent
- **Type**: Instrument Serif (display) + Geist (body) + Geist Mono (labels)
- **Tokens**: `src/app/globals.css` custom properties; do not hard-code colors in components
- **Motion**: transform/opacity only; hero entrance is transform-only so it never delays LCP
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` safety net in `globals.css`

## Commands
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`
- **TypeCheck**: `npx tsc --noEmit`
- **Test**: `npm run test`
- **Test:E2E**: `npm run test:e2e`
- **Test:A11y**: `npm run test:a11y`
- **Audit**: `npm audit` (must report 0 vulnerabilities)

## Deploy Configuration (configured by /setup-deploy)
- Platform: vercel
- Production URL: set via `NEXT_PUBLIC_SITE_URL` (placeholder: https://your-portfolio.vercel.app)
- Deploy workflow: automatic on push to main
- Deploy status command: vercel ls --prod
- Merge method: squash
- Project type: web app
- Post-deploy health check: production URL

### Custom deploy hooks
- Pre-merge: npm run build
- Deploy trigger: automatic on push to main
- Deploy status: vercel ls --prod
- Health check: production URL

## Content
All copy and data live in data files — never hard-code content inside components:
- `src/data/constants.ts` — name, role, description, canonical URL, social profile links
- `src/data/projects.ts` — project index (one object per project)
- `src/data/skills.ts` — skill groups
- `src/components/HomeContent.tsx` — bio paragraphs and experience timeline

The contact email is deliberately **not published**. The form is the only channel; `CONTACT_EMAIL` is a server-only env var.

## Environment Variables Required
- `RESEND_API_KEY` - Resend API key for contact form emails
- `CONTACT_EMAIL` - Email address to receive contact form submissions (server-only, never rendered)
- `NEXT_PUBLIC_SITE_URL` - Production URL (drives metadata, sitemap, robots, canonical, JSON-LD)

## Environment Variables Optional
- `RESEND_FROM_EMAIL` - Verified sender address (defaults to `onboarding@resend.dev`)

## Quality Gates
- Build must pass
- TypeScript strict mode must pass
- ESLint must pass (0 errors, 0 warnings)
- Unit tests must pass
- Accessibility tests must pass (0 critical/high violations, 35/35 axe checks)
- Lighthouse Performance >= 90, Accessibility = 100, SEO = 100 (production build)
- No console errors in production
- `npm audit` reports 0 vulnerabilities

## Git Workflow
- Main branch: main
- Feature branches: feature/*
- Merge method: squash
- Deploy on merge to main

## Vercel Configuration
- Framework: Next.js
- Build Command: npm run build
- Output Directory: .next
- Install Command: npm install
- Dev Command: npm run dev

## CI
GitHub Actions (`.github/workflows/ci.yml`) runs on every push and PR: typecheck, lint, unit tests, build, and the Playwright accessibility suite. The accessibility job installs Chromium/Firefox/WebKit and boots the production build.

## Security Notes
- `/api/contact` is the only public write endpoint. It enforces JSON content type, a 16 KB body cap, shared Zod validation, a honeypot, per-IP rate limiting, and HTML-escapes all user input.
- The endpoint returns `503` when `RESEND_API_KEY` or `CONTACT_EMAIL` is missing — it never sends to a placeholder address.
- The in-memory rate limiter is per-instance on serverless — pair it with a Vercel WAF rate limit in production (see `.ai/DEPLOYMENT.md`).
- CSP is set in `next.config.ts`; `unsafe-eval` is only allowed in development.
- Zod runs with `z.config({ jitless: true })` so it never calls `new Function` — a CSP violation is logged even when the throw is swallowed.
