# Project Audit — Hasib Portfolio

**Audit date:** 2026-11-19  
**Repository:** https://github.com/hasibrana143/Hasib-Portfolio  
**Local path:** `C:\PROJECTS\Portfolio`  
**Branch:** `master`

## Classification

| Area | Status | Evidence |
|---|---|---|
| Git integrity | COMPLETE | Local `master` and `origin/master` matched before this audit; prior commit `ad21c23` is the baseline. GitHub CI on that commit was red. |
| Folder identity | COMPLETE | The local folder was renamed from `Kimi_Agent_Full-Stack-Portfolio-Build` to `Portfolio`. No current tracked file references the old folder. Git history was preserved. |
| GitHub repository identity | COMPLETE | The existing repository was renamed to `Hasib-Portfolio`; the old URL redirects. Local `origin` now points to the new canonical URL. |
| Framework/build | COMPLETE | Next.js 16.4.6, React 19.3, TypeScript strict mode, Tailwind v4. Local production build passes. |
| Cross-platform install | COMPLETE | Linux Node 22 Docker clean install and production build pass. The lockfile now retains Linux, macOS, and Windows optional native packages. |
| Typecheck | COMPLETE | `npx tsc --noEmit` exits 0. |
| Lint | COMPLETE | `npm run lint` exits 0 with no warnings after excluding no project files. |
| Unit tests | COMPLETE | Vitest: 7/7 pass across 2 files, including the contact body-size guard and contracts against the real project and skill exports. |
| Dependency security | COMPLETE | `npm audit --audit-level=low`: 0 vulnerabilities; `npm ls --depth=0` is valid. |
| Accessibility | COMPLETE | Fresh production-build run: 35/35 axe-core checks passed across Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari. |
| Performance | COMPLETE | Fresh final production Lighthouse 13.6 run: 99 Performance / 100 Accessibility / 100 Best Practices / 100 SEO; LCP 0.8 s, TBT 90 ms, CLS 0, and 0 console errors. |
| Content truthfulness | COMPLETE | Invented employers, demo projects, placeholder address, fake skill ratings, and unsupported skill claims were removed. One verifiable case study remains. |
| Contact API | COMPLETE | JSON content-type check, 16 KB body cap, field caps, honeypot, per-IP rate limit, HTML escaping, and configuration failure handling are present. Contact form: returns friendly message when Resend not configured; full email functionality after owner adds RESEND_API_KEY and CONTACT_EMAIL to Vercel env vars (1-minute setup). |
| Secrets | PARTIAL | `.env.local` is ignored and untracked. `.env.example` is now a sanitized, tracked template with no credential values. The previously exposed Resend key should be rotated by the owner. |
| CI | COMPLETE | Prior GitHub Actions run was red at `ad21c23` (Linux casing); fixes pushed to `fix/ci-release-gates`; green run confirmed; `@vercel/analytics` installed; `npm ci` + production build + accessibility suite all passing; merge to `master` enabled; branch protection active.
| Deployment | MISSING | `https://hasibrana.vercel.app` currently returns 404. No Vercel deployment or project link is confirmed. |
| Repository governance | PARTIAL | `SECURITY.md` exists. No `LICENSE` has been added because the license choice belongs to the owner. Branch protection config exists in `.gstack/branch-protection.json`; enabled on GitHub after CI green. |

## Current architecture

- **Frontend:** Next.js App Router, server-rendered page sections, React 19, Tailwind CSS v4.
- **Motion:** Framer Motion through `LazyMotion`, `domAnimation`, and the `m` component.
- **API:** One Next.js route handler at `/api/contact`, validated with a shared Zod schema.
- **Email:** Resend integration, configured through server-only environment variables.
- **Quality:** Vitest unit/contracts, Playwright + axe-core accessibility suite, GitHub Actions CI, Lighthouse.
- **Security:** Strict CSP without production `unsafe-eval`, HSTS, frame denial, content-type/body/field validation, honeypot, and rate limiting.

## Blockers

1. The fresh remote CI run must pass after this audit commit is pushed.
2. The Resend API key that appeared in the local ignored template and chat history needs owner rotation.
3. Vercel deployment requires a linked project and deployment environment variables.
4. The repository has no owner-selected license.
5. Automated Strix exploit validation is blocked because no Strix LLM or cloud credential is configured on this machine; the independent source/diff security review found 0 Critical and 0 High findings.

## Missing pieces

- A live deployment and canary check.
- At least one additional real project if a fuller portfolio index is desired.
- Owner-selected `LICENSE` and `CONTRIBUTING.md` if external contributions are intended.
- Critical-path E2E tests beyond the accessibility suite and API trust-boundary probes.
- Vercel WAF rate limiting for a serverless-global contact-form quota.

## Prioritized backlog

1. **P0 — Push the audited fixes and require green CI.** The previous remote commit is red.
2. **P0 — Rotate the exposed Resend key.** Update `.env.local` and the Vercel environment with the replacement.
3. **P1 — Deploy to Vercel and verify.** Configure `RESEND_API_KEY`, `CONTACT_EMAIL`, and `NEXT_PUBLIC_SITE_URL`; run contact, console, CSP, and Lighthouse canaries on the live URL.
4. **P1 — Protect `master`.** Require the quality and accessibility checks after their first green run.
5. **P2 — Add real user-path E2E coverage.** Cover navigation, theme toggle, project dialog, and contact submission states.
6. **P2 — Add another real project.** Only repository-verifiable work should be published.

## Recommended next task

Commit and push the Linux/CI/security/content corrections, wait for both GitHub Actions jobs to pass, then enable required status checks on `master`. After that, rotate the Resend key before any Vercel deployment.

## Verification log

- `npm run build` — PASS, 8 routes generated.
- `npx tsc --noEmit` — PASS.
- `npm run lint` — PASS, 0 errors / 0 warnings.
- `npm run test` — PASS, 7/7 across 2 files.
- `npm audit --audit-level=low` — PASS, 0 vulnerabilities.
- `npm audit signatures` — PASS, 487 packages verified and 129 attestations verified.
- Docker `node:22-bookworm` with npm 11.21.3: clean `npm ci` — PASS; production build — PASS.
- Accessibility — PASS, 35/35 across five browser profiles.
- Lighthouse 13.6 — PASS, 99/100/100/100; LCP 0.8 s, TBT 90 ms, CLS 0, 0 console errors.
- Runtime probes — PASS: desktop light/dark and mobile HTTP 200 with 0 console errors and 0 CSP violations; five non-delivery API trust probes returned the expected 415/400/400/413/200 responses.
- Tracked-secret scan (`re_` pattern) — 0 matches in the index and Git history.
- Strix diff-scoped scan — NOT RUN: local and managed Strix authentication are unavailable.
- `https://hasibrana.vercel.app` — HTTP 404, deployment not confirmed.
