# State: Full-Stack Developer Portfolio

## Current Session
- **Phase**: RELEASE READINESS — CURRENT FIXES NOT PUSHED
- **Task**: Reconcile documentation and project state with the shipped repository, current local verification, GitHub security settings, and the still-unconfirmed deployment details
- **Owner**: CTO orchestrator with docs/release subagent
- **Status**: NOT READY FOR RELEASE (current local quality gates pass; the old remote CI run is red; deployment is unconfirmed)
- **Blocked**: A newer green GitHub Actions run on `master`; owner rotation of the earlier Resend key; Vercel environment variables; approved/confirmed production deployment; production email-delivery and canary verification
- **Next Action**: Push the current Linux import-casing/tooling fix, confirm a new remote CI run is green, configure Vercel variables, then deploy only with explicit approval and run the live checklist
- **Last Verification**: 2026-11-20 — local build PASS, typecheck PASS, ESLint PASS with 0 errors/0 warnings, unit 7 tests across 2 files, `npm audit` 0, `npm audit signatures` 487 registry signatures/129 attestations; current a11y 35/35; Lighthouse 99/100/100/100; runtime probe 3/3; non-delivery API probes 5/5; independent security review Critical 0 / High 0; Strix diff scan attempted but blocked by missing authentication; remote CI `ad21c23` remains FAILED

## Repository Identity
- **GitHub**: <https://github.com/hasibrana143/Hasib-Portfolio>
- **Rename note**: The same GitHub repository was renamed from `Portfolio` to `Hasib-Portfolio`; the old URL redirects. It is not a new repository.
- **Local checkout**: `C:\PROJECTS\Portfolio` (the local folder remains `Portfolio`)
- **Default branch**: `master`; current release branch: `fix/ci-release-gates`
- **Remote HEAD observed**: `ad21c231b26aae152910d818c894f6587de5f6ab` (`chore: real content swap`)
- **Working tree**: Dirty. It contains the in-progress CI/tooling fix, content cleanup, and this documentation update. It is not a release commit.

## Project Milestones

| Milestone | Status | Evidence / note |
|---|---|---|
| Foundation (Next.js, strict TypeScript, Tailwind, UI primitives) | COMPLETE | Current source tree |
| Core sections (Hero, About, Projects, Contact, Header, Footer) | COMPLETE | Current source tree |
| Editorial Swiss redesign | COMPLETE | Tokens and components in current tree |
| Security and dependency hardening | COMPLETE locally | Historical review, current audit/signature checks, repository settings, and lockfile integrity |
| Accessibility automation | COMPLETE locally | Fresh final 35/35 Playwright/axe rerun |
| Content cleanup to verifiable claims | COMPLETE locally | One case study; repository-grounded technology list; one non-employer role entry |
| Linux/remote CI fix | IN PROGRESS | Local lowercase component renames and CI/tooling updates; current fixes are not pushed and no newer green remote run exists |
| Vercel configuration and deployment | PENDING | Environment variables and deployment URL not confirmed |
| Live canary and release | PENDING | Requires green remote CI and deployed URL |

## Completed Work (Preserved History)

- Next.js App Router project upgraded and currently pinned to Next.js 16.4.6 with TypeScript strict mode and Tailwind CSS 4
- Node target raised to 22.x with `>=22.12.0` for the current test toolchain; npm is pinned to `11.21.3`
- Local UI primitives and accessible form controls implemented
- Hero, About, Projects, Contact, Header, Footer, theme provider, and `LazyMotion` provider implemented
- Server-rendered initial HTML restored by using static section imports
- Navigation anchor and mobile-menu behaviour corrected
- Dark/light/system theme handling implemented with `next-themes`
- Project detail implemented with native `<dialog>` for focus containment and Escape handling
- Category filters derived from project data so empty filters are not rendered
- Metadata, canonical URL, Open Graph/Twitter tags, generated 1200x630 PNG, JSON-LD `Person`, sitemap, and robots route implemented
- CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` configured
- Contact route hardened with JSON content-type enforcement, pre-buffer `Content-Length` rejection, post-read byte cap, per-field limits, shared Zod validation, honeypot, per-IP limiter, and HTML escaping
- Zod configured with `jitless: true` to avoid `new Function` under the CSP
- Dependency tree remediated; current `npm audit` reports 0 vulnerabilities
- Registry-signature verification reports 487 packages with verified signatures and 129 packages with verified attestations
- All 591 registry lockfile packages contain `resolved` and `integrity` metadata; six bundled WASM transitive entries intentionally lack separate registry metadata
- Framer Motion changed to `LazyMotion` + `domAnimation` + `m` for a smaller animation bundle
- GitHub Actions workflow added for typecheck, lint, unit tests, build, and the Playwright accessibility suite; actions are SHA-pinned, permissions are `contents: read`, and checkout does not persist credentials
- GitHub secret scanning, secret push protection, Dependabot vulnerability alerts, and Dependabot security updates enabled; Dependabot reports 0 alerts
- Current local production verification: accessibility 35/35, Lighthouse 99/100/100/100, runtime 3/3, and non-delivery API probes 5/5
- Demo projects, fictional employers, unsupported technologies, proficiency scores, and placeholder contact destinations removed
- One verifiable case study remains: this portfolio
- Social links are owner-confirmed: GitHub `hasibrana143`, LinkedIn `hasib-rana-199147367`, and X `@hasib_rana76829`
- A sanitized `.env.example` and `.gitignore` exception are part of the local in-progress fix; remote `ad21c23` still has the broken copy instruction

## Active Owner / Operator Decisions

1. **Additional work**: Add only owner-provided, verifiable case studies; do not synthesize projects, clients, or employers.
2. **Production environment**: Configure `RESEND_API_KEY`, `CONTACT_EMAIL`, and the final `NEXT_PUBLIC_SITE_URL` in Vercel. Local values are configured but do not transfer.
3. **Resend key**: Rotate the earlier local credential and update local/Vercel configuration.
4. **Sender**: Decide whether to provide a verified `RESEND_FROM_EMAIL` rather than relying on the onboarding fallback.
5. **Domain**: Choose a Vercel or custom production domain; no domain is confirmed.
6. **Analytics**: Optional and not implemented; decide only after deployment.
7. **WAF**: Apply the global contact rate-limit rule after deployment.
8. **License**: No repository license is declared; an explicit owner/legal decision is required before implying reuse rights.
9. **Deployment approval**: Production deployment requires explicit approval.

## Verification Results

### Current local run — 2026-11-20

| Gate | Result | Evidence |
|---|---|---|
| Production build | PASS | `npm run build` exit 0; Next.js 16.4.6; compiled successfully; static/dynamic route table generated |
| TypeScript | PASS | `npx tsc --noEmit` exit 0, no output |
| ESLint | PASS | `npm run lint` exit 0; 0 errors and 0 warnings |
| Unit tests | PASS | `npm run test`: 2 files, 7/7 tests, including the oversized `Content-Length` route guard |
| Dependency audit | PASS | `npm audit`: 0 vulnerabilities |
| Registry signatures | PASS | `npm audit signatures`: 487 packages with verified registry signatures; 129 packages with verified attestations |
| Remote GitHub Actions | **FAIL** | Old `ad21c23` run 44557145778: typecheck and build failed; downstream jobs skipped; current fixes are not pushed |

The old remote run remains the sole CI blocker. A newer successful run on `master` is required to prove the clean Linux checkout.

### Current local production evidence — 2026-11-19/20

| Check | Result | Evidence boundary |
|---|---|---|
| Accessibility | 35/35 PASS | Fresh final Playwright + axe rerun across Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari |
| Lighthouse | 100 / 100 / 100 / 100 | Lighthouse 13.6 production report at ignored path `.gstack/lh-final-audit.json`; FCP/LCP 0.8 s, TBT 90 ms, CLS 0, 340 KiB, 0 console errors |
| Runtime probe | 3/3 PASS | Desktop light, desktop dark, and mobile each returned 200 with an H1, 0 console errors, and 0 CSP violations |
| Contact API non-delivery probes | 5/5 PASS | 415 content type, 400 malformed JSON, 400 schema, 413 oversized, 200 honeypot/no delivery |
| Historical API probe | 6/6 PASS | Prior local run also verified 503 for missing email configuration; this remains historical evidence |

These are current or explicitly historical local results. They are not live Vercel measurements and do not prove successful Resend delivery.

## Known Gaps / Next Opportunities

- The only confirmed remote CI run is the failed `ad21c23` run; the current fixes are not pushed and no newer green run is confirmed
- The `.env.example` copy instruction is broken on remote `ad21c23`; the local template/ignore fix must be committed
- Vercel variables, deployment URL, domain, live health check, and canary are unconfirmed; `https://hasibrana.vercel.app` currently returns 404
- Production Resend delivery is unverified
- The Resend key that appeared in the earlier local ignored template requires owner rotation before deployment
- Only one case study ships; additional work must be owner-provided and verifiable
- No dedicated user-journey E2E suite exists; the automated accessibility suite and API probes cover only part of the surface
- The contact rate limiter is per-instance; the recommended global Vercel WAF limit is not confirmed as applied
- `unsafe-inline` remains in `script-src`; a nonce-based CSP would affect the current static-rendering design
- Analytics, CMS, blog, project detail pages, multi-language support, and a published contact address are not implemented
- No repository license is declared
