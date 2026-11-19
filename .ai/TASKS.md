# Tasks: Full-Stack Developer Portfolio

## Phase 1: Foundation (Week 1) ✅ COMPLETE
- [x] **TASK-001**: Initialize Next.js project with TypeScript, Tailwind v4, ESLint
  - Acceptance: `npm run build` passes, typecheck clean, lint clean
  - Owner: frontend
  - **VERIFIED**: 2026-11-12

- [x] **TASK-002**: Set up shadcn/ui component library
  - Acceptance: Button, Card, Input, Textarea, Label, Badge components work
  - Owner: frontend
  - **VERIFIED**: 2026-11-12

- [x] **TASK-003**: Configure project structure, aliases, constants
  - Acceptance: `@/` imports work, `siteConfig` exported
  - Owner: frontend
  - **VERIFIED**: 2026-11-12

- [x] **TASK-004**: Create data files (projects, skills, constants)
  - Acceptance: Type-safe exports, sample data populated
  - Owner: frontend
  - **VERIFIED**: 2026-11-12

## Phase 2: Core Sections (Week 1-2) ✅ COMPLETE
- [x] **TASK-005**: Build Hero section with animation
  - Acceptance: Loads <1s, accessible, reduced-motion respected
  - Owner: frontend
  - **VERIFIED**: 2026-11-12

- [x] **TASK-006**: Build About section with skills
  - Acceptance: Semantic HTML, responsive grid, skill categories
  - Owner: frontend
  - **VERIFIED**: 2026-11-12

- [x] **TASK-007**: Build Projects showcase
  - Acceptance: Filterable index, modal detail, keyboard nav
  - Owner: frontend
  - **VERIFIED**: 2026-11-12

- [x] **TASK-008**: Build Contact form + API route
  - Acceptance: Validation, spam protection, success/error feedback, Resend integration
  - Owner: backend
  - **VERIFIED**: 2026-11-19 (route hardened — 6/6 probes pass)

- [x] **TASK-009**: Build Header/Footer layout components
  - Acceptance: Responsive nav, theme toggle, social links, accessible
  - Owner: frontend
  - **VERIFIED**: 2026-11-12

## Phase 3: Polish & Quality ✅ COMPLETE
- [x] **TASK-010**: Dark/Light theme with next-themes
  - Acceptance: No flash, persists, respects system preference
  - Owner: frontend
  - **VERIFIED**: 2026-11-12

- [x] **TASK-011**: SEO metadata, JSON-LD, OG tags, sitemap
  - Acceptance: Lighthouse SEO 100, valid schema
  - Owner: frontend
  - **VERIFIED**: 2026-11-19 (Lighthouse SEO 100; real 1200x630 PNG OG image)

- [x] **TASK-012**: Accessibility audit + fixes
  - Acceptance: axe-core 0 violations, WCAG AA, keyboard flow
  - Owner: accessibility-engineer
  - **VERIFIED**: 2026-11-19 — 35/35 across chromium, firefox, webkit, mobile chrome, mobile safari

- [x] **TASK-013**: Performance optimization
  - Acceptance: Lighthouse Perf ≥ 90, bundle reduced
  - Owner: performance-engineer
  - **VERIFIED**: 2026-11-19 — Perf 98, LCP 0.8s, CLS 0, first-load JS 235 KB → 225 KB gzip

- [x] **TASK-014**: Security headers, CSP configuration
  - Acceptance: no prod `unsafe-eval`, HSTS, 0 browser CSP violations
  - Owner: security-engineer
  - **VERIFIED**: 2026-11-19 — 0 CSP violations, Best Practices 100, `npm audit` 0

## Phase 4: Hardening Backlog (2026-11-19) ✅ COMPLETE
- [x] **TASK-018**: Dependency remediation
  - Acceptance: `npm audit` → 0 vulnerabilities
  - **VERIFIED**: 2026-11-19 — zod 4.6.7, resend 6.39.0, resolvers 5.9.2, next-themes 0.4.6, lockfile regenerated
- [x] **TASK-019**: Contact API hardening
  - Acceptance: content-type, body cap, per-field caps, honeypot, rate limit, HTML escaping
  - **VERIFIED**: 2026-11-19 — 6/6 probes pass
- [x] **TASK-020**: CSP hardening
  - Acceptance: prod `unsafe-eval` removed, `object-src 'none'`, `upgrade-insecure-requests`, 0 violations
  - **VERIFIED**: 2026-11-19 — Lighthouse Best Practices 96 → 100
- [x] **TASK-021**: Real PNG OG image
  - Acceptance: 1200x630 PNG served from `/opengraph-image`
  - **VERIFIED**: 2026-11-19 — `image/png`, 44 KB
- [x] **TASK-022**: GitHub Actions CI
  - Acceptance: typecheck, lint, unit, build, Playwright a11y on push/PR
  - **VERIFIED**: 2026-11-19 — `.github/workflows/ci.yml`
- [x] **TASK-023**: Bundle reduction
  - Acceptance: measurable first-load JS reduction
  - **VERIFIED**: 2026-11-19 — `LazyMotion` tree-shaking, 235 KB → 225 KB gzip
- [x] **TASK-024**: Docs + state file refresh
  - Acceptance: README/CLAUDE.md match shipped code; `.ai/` evidence dated
  - **VERIFIED**: 2026-11-19

## Phase 5: Deploy & Verify ⏳ BLOCKED ON OWNER
- [ ] **TASK-015**: Vercel deployment + domain
  - Acceptance: Live URL, preview deploys work
  - Owner: devops
  - **BLOCKED**: owner said "not now"; Vercel CLI not installed, no `.vercel` project linked
- [ ] **TASK-016**: E2E specs for critical paths
  - Acceptance: navigation, theme toggle, project modal, contact submit covered
  - Owner: qa-engineer
  - **NEXT**: a11y suite and API probes cover the current surface; user-path specs still to write
- [ ] **TASK-017**: Final audit + deployment verification
  - Acceptance: all quality gates pass on the live URL, canary clean
  - Owner: cto
  - **BLOCKED**: needs TASK-015
- [ ] **TASK-025**: Owner content swap
  - Acceptance: no invented content on the site — real bio, real projects, real links
  - Owner: product owner
  - **PARTIAL** 2026-11-19 — all demo content replaced: fake employers → honest independent entry, six invented projects → one verifiable case study, placeholder address → form-only contact, boilerplate assets deleted, JSON-LD `Person` added. Remaining: add the next real project if desired

## Phase 6: Repository Audit & CI Repair (2026-11-19) — IN PROGRESS
- [x] **TASK-026**: Repair Linux case-sensitivity failure
  - Acceptance: tracked component filenames match imports on a case-sensitive filesystem
  - Owner: devops
  - **VERIFIED** 2026-11-19 — `Button.tsx` → `button.tsx`, `Card.tsx` → `card.tsx`; Linux Docker build passes
- [x] **TASK-027**: Repair cross-platform lockfile
  - Acceptance: clean Linux `npm ci` installs the required native CSS binary and builds without ad hoc packages
  - Owner: devops
  - **VERIFIED** 2026-11-19 — npm 11.21.3-generated lock retains Linux/macOS/Windows optional packages and 591 registry packages with `resolved` + `integrity`; a clean Linux Node 22 Docker `npm ci` and production build pass
- [x] **TASK-028**: Align CI and local toolchain on Node 22.12+
  - Acceptance: CI uses a supported Node version and npm audit remains 0
  - Owner: devops
  - **VERIFIED** 2026-11-19 — CI Node 22; local Node 22.23.2; audit 0
- [x] **TASK-029**: Sanitize and track `.env.example`
  - Acceptance: setup template contains no credentials and `.env.local` remains ignored/untracked
  - Owner: security
  - **VERIFIED** 2026-11-19 — placeholders only; tracked-secret scan 0
- [x] **TASK-030**: Remove generated/process artifacts from Git
  - Acceptance: only source, configuration, tests, and durable documentation are tracked
  - Owner: cto
  - **VERIFIED** 2026-11-19 — removed Playwright report, last-run metadata, completion marker, and stale summary
- [ ] **TASK-031**: Push audit fixes and make remote CI green
  - Acceptance: GitHub Actions quality and accessibility jobs both pass on `master`
  - Owner: cto
  - **NEXT**: commit, push to `Hasib-Portfolio`, and inspect the remote run
- [ ] **TASK-032**: Protect `master`
  - Acceptance: required quality/accessibility checks cannot be bypassed
  - Owner: devops
  - **NEXT**: enable branch protection after TASK-031 passes
- [ ] **TASK-033**: Rotate the exposed Resend API key
  - Acceptance: a new key replaces the key that appeared in the local template/chat history
  - Owner: product owner
  - **BLOCKED**: credential rotation requires owner access; do not log the value
- [ ] **TASK-034**: Deploy and verify on Vercel
  - Acceptance: live URL returns 200; contact delivery, console, CSP, a11y, and Lighthouse canaries pass
  - Owner: devops
  - **BLOCKED**: Vercel project/link and deployment environment variables are not confirmed; current configured URL returns 404
- [ ] **TASK-035**: Run Strix diff-scoped exploit validation
  - Acceptance: Strix completes a diff-scoped scan with Critical/High findings proven and reviewed
  - Owner: security
  - **BLOCKED**: Strix 1.6.2 is installed, but neither local LLM authentication nor managed-cloud authentication is configured; the independent source/diff review still reports Critical 0 / High 0
