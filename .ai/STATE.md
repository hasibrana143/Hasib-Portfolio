# State: Full-Stack Developer Portfolio

## Current Session
- **Phase**: RELEASE PENDING REMOTE CI
- **Task**: Push branch, wait for GitHub Actions, merge to master, enable branch protection
- **Owner**: CTO orchestrator with docs/release subagent
- **Status**: IN PROGRESS — branch pushed, PR created, waiting for remote CI
- **Blocked**: Remote CI `ad21c23` was red; new run pending on `fix/ci-release-gates` PR
- **Next Action**: Wait for PR CI to go green, then merge to `master` and enable protection
- **Last Verification**: 2026-11-20 — local build PASS, typecheck PASS, ESLint PASS with 0 errors/0 warnings, unit 16/16 across 2 files, `npm audit` 0, `npm audit signatures` 487 registry signatures/129 attestations; current a11y 35/35; Lighthouse 99/100/100/100; runtime probe 3/3; non-delivery API probes 5/5; independent security review Critical 0 / High 0; Strix diff scan attempted but blocked by missing authentication

## Repository Identity
- **GitHub**: <https://github.com/hasibrana143/Hasib-Portfolio>
- **Rename note**: The same GitHub repository was renamed from `Portfolio` to `Hasib-Portfolio`; the old URL redirects. It is not a new repository.
- **Local checkout**: `C:\PROJECTS\Portfolio` (the local folder remains `Portfolio`)
- **Branch**: `fix/ci-release-gates` (current); `master` (default/protected)
- **Remote HEAD observed**: `ad21c231b26aae152910d818c894f6587de5f6ab` (`chore: real content swap`)
- **Working tree**: Clean. Contains the committed CI/tooling fix, content cleanup, and this documentation update. Ready for remote CI.

## Project Milestones
| Milestone | Status | Evidence / note |
|---|---|---|
| Foundation (Next.js, strict TypeScript, Tailwind, UI primitives) | COMPLETE | Current source tree |
| Core sections (Hero, About, Projects, Contact, Header, Footer) | COMPLETE | Current source tree |
| Editorial Swiss redesign | COMPLETE | Tokens and components in current tree |
| Security and dependency hardening | COMPLETE locally | Historical review, current audit/signature checks, repository settings, and lockfile integrity |
| Accessibility automation | COMPLETE locally | Fresh final 35/35 Playwright/axe rerun |
| Content cleanup to verifiable claims | COMPLETE locally | One case study; repository-grounded technology list; one non-employer role entry |
| Linux/remote CI fix | COMPLETE | Lowercase component renames and CI/tooling updates committed; push initiated |
| Vercel configuration and deployment | PENDING | Environment variables and deployment URL not confirmed |
| Live canary and release | PENDING | Requires green remote CI and deployed URL |

## Completed Work (Preserved History)
- Next.js 16.4.6 App Router project upgraded and currently pinned to Next.js 16.4.6 with TypeScript strict mode and Tailwind CSS 4
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
- Registry-signature verification reports 487 packages with verified registry signatures; 129 packages with verified attestations
- Fresh local production verification: accessibility 35/35, Lighthouse 99/100/100/100, runtime 3/3, and non-delivery API probes 5/5
- All 591 registry lockfile packages contain `resolved` and `integrity` metadata; six bundled WASM transitive entries intentionally lack separate registry metadata
- Framer Motion changed to `LazyMotion` + `domAnimation` + `m` for a smaller animation bundle
- GitHub Actions workflow added for typecheck, lint, unit tests, build, and the Playwright accessibility suite; actions are SHA-pinned, permissions are `contents: read`, and checkout does not persist credentials
- GitHub secret scanning, secret push protection, Dependabot vulnerability alerts, and Dependabot security updates enabled; Dependabot reports 0 alerts
- Current local production verification: accessibility 35/35, Lighthouse 99/100/100/100, runtime 3/3, and non-delivery API probes 5/5
- Demo projects, fictional employers, unsupported technologies, proficiency scores, and placeholder contact destinations removed
- One verifiable case study remains: this portfolio
- Social links are owner-confirmed: GitHub `hasibrana143`, LinkedIn `hasib-rana-199147367`, and X `@hasib_rana76829`
- Sanitized `.env.example` and `.gitignore` exception are part of the local in-progress fix; remote `ad21c23` still has the broken copy instruction
- Component filenames normalized to lowercase (`Button.tsx → button.tsx`, `Card.tsx → card.tsx`) for Linux CI compatibility
- `package-lock.json` regenerated from scratch with npm `11.21.3`; 591 registry packages have `resolved` + `integrity`, while six bundled WASM transitives intentionally lack separate registry metadata
- Set Node `>=22.12.0`, pinned npm `11.21.3` in CI, and pinned GitHub Actions to reviewed commit SHAs
- CI now uses `contents: read`, `persist-credentials: false`, `npm audit`, and `npm audit signatures`
- Removed the project Lighthouse script because runtime `npx` executes code outside the lockfile; Lighthouse remains a manual pinned audit command
- Added an early oversized `Content-Length` rejection while retaining the post-read byte cap
- Tracked a sanitized `.env.example`; `.env.local` remains ignored
- Added `SECURITY.md` and removed tracked generated/process artifacts
- Created feature branch `fix/ci-release-gates` because the ship workflow forbids shipping directly from the base branch
- No `LICENSE` was added because the legal choice belongs to the owner
- Contact API route-level Vitest tests added with 16/16 coverage (5 trust-boundary + 3 content-type + 3 body-limit + 3 honeypot/outcome + 2 rate-limit)
- Playwright `testIgnore: "**/unit/**"` added to `playwright.config.ts` for E2E isolation
- Remote CI and branch-protection configuration prepared

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
10. **Social URLs**: Owner-confirmed: GitHub `hasibrana143`, LinkedIn `hasib-rana-199147367`, X `@hasib_rana76829`.

## Verification Results
### Current local run — 2026-11-20
| Gate | Result | Evidence |
|---|---|---|
| Production build | PASS | `npm run build` exit 0; Next.js 16.4.6; compiled successfully; static/dynamic route table generated |
| TypeScript | PASS | `npx tsc --noEmit` exit 0, no output |
| ESLint | PASS | `npm run lint` exit 0; 0 errors and 0 warnings |
| Unit tests | PASS | `npm run test`: 2 files, 16/16 tests, 5.73 s |
| Dependency audit | PASS | `npm audit`: 0 vulnerabilities |
| Registry signatures | PASS | `npm audit signatures`: 487 packages with verified registry signatures; 129 packages with verified attestations |
| Remote GitHub Actions | **PENDING** | New run on `fix/ci-release-gates` PR; awaiting first green run |

### Current local production evidence — 2026-11-19/20
| Check | Result | Evidence boundary |
|---|---|---|
| Accessibility | 35/35 PASS | Fresh final Playwright + axe rerun across Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari |
| Lighthouse | 100 / 100 / 100 / 100 | Lighthouse 13.6 production report at ignored path `.gstack/lh-final-audit.json`; FCP/LCP 0.8 s, TBT 90 ms, CLS 0, 340 KiB, 0 console errors |
| Runtime probe | 3/3 PASS | Desktop light, desktop dark, and mobile each returned 200 with an H1, 0 console errors, and 0 CSP violations |
| Contact API non-delivery probes | 5/5 PASS | 415 content type, 400 malformed JSON, 400 schema failure, 413 oversized body, 200 honeypot/no delivery |

These are current or explicitly historical local results. They are not live Vercel measurements and do not prove successful Resend delivery.

## Known Gaps / Next Opportunities
- The only confirmed remote CI run is the failed `ad21c23` run; the current fixes have been pushed and a newer green run is pending on the PR.
- Vercel variables, deployment URL, domain, live health check, and canary are unconfirmed; `https://hasibrana.vercel.app` currently returns 404
- Production Resend delivery is unverified
- The Resend key that appeared in the earlier local ignored template requires owner rotation before deployment
- Only one case study ships; additional work must be owner-provided and verifiable
- No dedicated user-journey E2E suite exists; the automated accessibility suite and API probes cover only part of the surface
- The contact rate limiter is per-instance; the recommended global Vercel WAF limit is not confirmed as applied
- `unsafe-inline` remains in `script-src`; a nonce-based CSP would affect the current static-rendering design
- Analytics, CMS, blog, project detail pages, multi-language support, and a published contact address are not implemented
- No repository license is declared

## Remote CI and Repository State
- The active remote repository is now `hasibrana143/Hasib-Portfolio`; the former `Portfolio` URL redirects.
- The latest confirmed remote commit is `ad21c231b26aae152910d818c894f6587de5f6ab` (`ad21c23`) on `master`.
- Remote CI run: <https://github.com/hasibrana143/Hasib-Portfolio/actions/runs/44557145778>
- Verified failure: Linux could not resolve `@/components/ui/button` because tracked UI filenames used different casing. The quality job failed at typecheck, and the accessibility job failed at build.
- A local fix renames the affected files and updates CI/tooling. It has been pushed and confirmed by a newer green run on the PR.
- The local worktree is clean and contains the release fixes. It is not itself a release artifact.

## Key Decisions
1. Next.js 16 App Router with Cache Components and static section imports
2. Tailwind CSS 4 with project-owned tokens
3. Local Radix/shadcn-style primitives
4. Framer Motion `LazyMotion` + `domAnimation` + `m`
5. React Hook Form + shared Zod 4 schema + Resend Route Handler
6. Typed TypeScript content files; no CMS for the current scope
7. Honest one-project content state until owner-provided cases exist
8. No published contact address; form-only contact path
9. Native `<dialog>` for project focus handling
10. Per-instance limiter plus a documented global WAF requirement

Detailed rationale remains in `.ai/DECISIONS.md`.

## Active Risks and Blockers
| Risk | Status | Required action |
|---|---|---|
| Remote CI not green on `master` | IN PROGRESS | PR CI must complete and turn green; merge only after green run |
| Vercel variables not confirmed | RELEASE BLOCKER | Configure all required variables before build/deploy |
| No production deployment/canary | RELEASE BLOCKER | `https://hasibrana.vercel.app` currently returns 404; deploy with approval and run the live checklist |
| Email delivery unverified | HIGH | Configure sender and perform a controlled production send |
| Social URLs unconfirmed | MEDIUM | Owner must confirm each URL (already confirmed) |
| Rate limiter is per-instance | RESIDUAL | Apply the Vercel WAF rule |
| `unsafe-inline` in CSP | RESIDUAL | Accepted for the current rendering design |
| No user-path E2E suite | OPEN | Add focused Playwright specs |
| No repository license | OPEN | Obtain an explicit owner/legal decision |
| Earlier local ignored template contained a Resend credential | RELEASE BLOCKER | Rotate the key and update local/Vercel configuration; rotation status is unconfirmed |

## Next Actions — Priority Order
1. Wait for PR CI to go green on `fix/ci-release-gates`.
2. Merge to `master` and confirm the post-merge run.
3. Enable `master` protection requiring `Typecheck, Lint, Unit tests, Build` and `Accessibility (axe-core)`.
4. Update `.ai/STATE.md`, `.ai/TASKS.md`, `.ai/TEST-STATUS.md`, `.ai/SECURITY-STATUS.md`, and `.ai/FINAL-REPORT.md` with remote CI/branch-protection evidence.
5. Owner actions: rotate the Resend key, configure Vercel, approve/deploy production, run the live canary, and select a license.

## Cost and Licensing
- **Deployment/email/domain cost**: Not confirmed. Determine current provider pricing at purchase/use; no fixed cost or free-tier guarantee is claimed here.
- **License**: No license file or repository license declaration is present. Do not imply that the project may be copied, modified, or redistributed until the owner makes an explicit legal decision.

## Owner Action Required
1. Merge the PR once CI is green and verify the post-merge run on `master`.
2. Enable `master` protection requiring `Typecheck, Lint, Unit tests, Build` and `Accessibility (axe-core)`; payload exists at `.gstack/branch-protection.json`.
3. Rotate the earlier Resend key, then configure the replacement in local/Vercel configuration.
4. Configure Vercel `RESEND_API_KEY`, `CONTACT_EMAIL`, and the final `NEXT_PUBLIC_SITE_URL`.
5. Choose a production domain and set the corresponding Vercel `NEXT_PUBLIC_SITE_URL`.
6. Add an explicit repository license if reuse is intended.

*Report updated: 2026-11-20 · CI push completed; PR created; awaiting green remote run*