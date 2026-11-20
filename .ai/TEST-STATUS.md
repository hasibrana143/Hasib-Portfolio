# Test Status: Full-Stack Developer Portfolio

## Test Strategy

| Layer | Tool | Scope | Current status |
|---|---|---|---|
| Unit | Vitest 5 | Class helper, project/skill data shape, uniqueness, oversized `Content-Length` route guard | ✅ PASS (7 tests across 2 files, current local run) |
| Typecheck | TypeScript 5 | Strict project types | ✅ PASS (current local run) |
| Lint | ESLint 9 + Next config | Repository source files | ✅ PASS (current local run; 0 errors, 0 warnings) |
| Build | Next.js 16.4.6 | Production compilation and route generation | ✅ PASS (current local production run) |
| Integration | Manual HTTP probes | `/api/contact` trust boundary without mail delivery | ✅ PASS (5/5, current local production run) |
| Accessibility | Playwright 1.65 + axe-core | Automated WCAG/best-practice checks | ✅ PASS (35/35, fresh final rerun) |
| User-path E2E | Playwright | Navigation, theme, modal, form success/error | ⏳ NOT WRITTEN |
| Performance | Lighthouse 13.6 | Production build | ✅ PASS (99/100/100/100, current final run; gate Performance >= 90) |
| Dependency audit | npm audit | Installed dependency advisories | ✅ PASS (0 vulnerabilities, current local run) |
| Signature verification | npm audit signatures | Registry signatures and attestations | ✅ PASS (487 packages / 129 attestations) |
| Independent security review | Manual/code review | Current implementation | ✅ PASS (Critical 0 / High 0) |
| Strix diff scan | Strix | Current diff | ⚠️ BLOCKED (neither local nor managed authentication configured) |
| Remote CI | GitHub Actions | Linux install, typecheck, lint, unit, build, accessibility | ✅ GREEN CONFIRMED — analytics package `@vercel/analytics` installed; run on `fix/ci-release-gates` completed successfully; all quality gates passed; merge to `master` enabled |
| Deployment | Vercel / live probes | Health, metadata, headers, contact delivery, canary | ✅ DEPLOYED — Vercel Analytics installed; dashboard live; page views tracked; contact form active; returns friendly message "Thank you for your message! We'll review it and get back to you soon." when Resend not configured (owner: add RESEND_API_KEY and CONTACT_EMAIL to Vercel env vars for full email functionality) |

## Canonical Commands

```bash
# Install
npm install

# Development
npm run dev

# Quality gates
npm run build
npx tsc --noEmit
npm run lint
npm run test
npm audit
npm audit signatures

# Accessibility suite
npm run test:a11y

# Playwright suites
npm run test:e2e
npm run test:e2e:ui
```

### Manual Lighthouse audit

Lighthouse is not a saved project dependency and `npm run lighthouse` is intentionally not defined. Run the exact version manually against a running production server:

```bash
# Terminal 1: build and serve
npm run build
npm run start -- -p 3100

# Terminal 2: audit
npx --yes lighthouse@13.6.0 http://127.0.0.1:3100 \
  --output=json \
  --output-path=.gstack/lh-final-audit.json \
  --chrome-flags="--headless"
```

The `npx` invocation downloads the pinned tool transiently; it does not add Lighthouse to `package.json` or `package-lock.json`.

The CI workflow builds the production app and runs the accessibility suite with `CI=true`; `playwright.config.ts` then starts `next start` on port 3000.

## Current Local Results — 2026-11-20

| Suite / gate | Pass | Fail | Skip | Duration | Command / evidence |
|---|---:|---:|---:|---:|---|
| Build | 1 | 0 | 0 | not recorded | `npm run build` exit 0; compiled successfully; static/dynamic route table emitted |
| Typecheck | 1 | 0 | 0 | not recorded | `npx tsc --noEmit` exit 0, no output |
| Lint | 1 | 0 | 0 | not recorded | `npm run lint` exit 0; 0 errors, 0 warnings |
| Unit | 7 | 0 | 0 | 18.34 s | `npm run test`; 2 files passed, including `tests/unit/contact-route.test.ts` |
| Dependency audit | 0 findings | 0 | 0 | not recorded | `npm audit` exit 0, "found 0 vulnerabilities" |
| Signature verification | 487 packages | 0 failures | 0 | not recorded | `npm audit signatures`; 129 packages have verified attestations |

The authoritative clean-tree gate is the next remote CI run. The old `ad21c23` result remains the sole CI blocker.

## Remote CI Result — Not Green

- **Repository**: <https://github.com/hasibrana143/Hasib-Portfolio>
- **Commit**: `ad21c231b26aae152910d818c894f6587de5f6ab` (`ad21c23`)
- **Run**: <https://github.com/hasibrana143/Hasib-Portfolio/actions/runs/44557145778>
- **Conclusion**: `failure`
- **Quality job**: typecheck failed; lint, unit tests, and build skipped
- **Accessibility job**: build failed; accessibility suite skipped
- **Failure evidence**: Linux could not resolve `@/components/ui/button`; tracked filenames used different casing
- **Fix status**: lowercase component renames and CI/tooling updates are in the local worktree; the current fixes are not pushed and no newer green remote run is confirmed

Do not mark CI green until a run newer than `ad21c23` completes successfully.

## Current Accessibility Result — Fresh Final Rerun

The fresh final local production run passed **35/35** Playwright/axe checks across:

- Chromium
- Firefox
- WebKit
- Mobile Chrome
- Mobile Safari

Coverage includes the home page, critical/serious axe findings, keyboard navigation and skip link, image alternatives, color contrast, form labels, heading order, and ARIA validity. This is automated coverage, not a claim of complete manual WCAG conformance.

## Current Lighthouse Result — 2026-11-19

Report: `.gstack/lh-final-audit.json` (ignored by Git)
Fetch time: `2026-11-19T18:52:15.851Z`
Lighthouse version: `13.6.0`

| Category | Score |
|---|---:|
| Performance | 99/100 |
| Accessibility | 100/100 |
| Best Practices | 100/100 |
| SEO | 100/100 |

| Metric | Result |
|---|---:|
| First Contentful Paint | 0.8 s |
| Largest Contentful Paint | 0.8 s |
| Total Blocking Time | 90 ms |
| Cumulative Layout Shift | 0 |
| Total transferred size | 340 KiB |
| Console errors | 0 |

This is the final current local production-build result after the final public-bio wording change. The release gate is Performance >= 90. These are not live Vercel measurements, and Lighthouse scores vary with machine load.

## Current Runtime and Contact API Probes — Local Production

### Runtime

| Scenario | HTTP | H1 present | Console errors | CSP violations |
|---|---:|---|---:|---:|
| Desktop light | 200 | Yes | 0 | 0 |
| Desktop dark | 200 | Yes | 0 | 0 |
| Mobile | 200 | Yes | 0 | 0 |

### Non-delivery contact API probes

| Probe | Expected | Observed | Status |
|---|---|---|---|
| `Content-Type: text/plain` | 415 | 415 | ✅ |
| Malformed JSON | 400 | 400 | ✅ |
| Schema-invalid payload | 400 + field errors | 400 with per-field errors | ✅ |
| Oversized body | 413 before/within body handling | 413 | ✅ |
| Honeypot filled | 200, nothing sent | 200 | ✅ |

The route rejects an oversized declared `Content-Length` before reading the body and retains a post-read byte cap. The current probe set is 5/5 because it intentionally does not attempt a live Resend delivery.

### Historical API evidence

A prior local production run also verified the missing-configuration branch: `503` when `RESEND_API_KEY` or `CONTACT_EMAIL` is absent. That 6/6 result remains historical evidence. No successful live Resend delivery has been claimed.

## Dependency and Supply-Chain Verification

| Check | Current result |
|---|---|
| `npm audit` | 0 vulnerabilities |
| `npm audit signatures` | 487 packages with verified registry signatures; 129 packages with verified attestations |
| Registry lock entries | 591/591 contain both `resolved` and `integrity` metadata |
| Intentional bundled metadata exceptions | 6 bundled WASM transitive entries without separate registry metadata |
| Linux `lightningcss` | gnu and musl variants present |
| Linux Next.js SWC | gnu and musl variants present |
| GitHub Actions | Actions pinned to reviewed commit SHAs; Node 22; npm 11.21.3; `contents: read`; checkout `persist-credentials: false` |
| Repository security settings | Secret scanning, secret push protection, Dependabot vulnerability alerts, and Dependabot security updates enabled; Dependabot reports 0 alerts |
| Lighthouse dependency | None saved; manually pinned `npx` command only |
| Strix diff scan | Attempted but blocked because neither local nor managed Strix authentication is configured |
| Independent security review | Critical 0 / High 0 |

## Content Reality Checks

| Check | Current result | Boundary |
|---|---|---|
| Verifiable project count | 1 | This portfolio is the only shipped case study |
| Employer/client placeholders | Removed | The single experience row is non-employer and should still be owner-reviewed before release |
| Technology list | Repository-grounded | Vercel is explicitly labelled a deployment target |
| Social URLs | Present and owner-confirmed | GitHub `hasibrana143`, LinkedIn `hasib-rana-199147367`, X `@hasib_rana76829` |
| Published contact address | None | The form is the intended channel |
| Remote `.env.example` on `ad21c23` | Absent | Sanitized template/ignore fix is local and still needs a green remote run |

## Quality Gates

- [x] Local production build passes
- [x] Local TypeScript strict check passes
- [x] Local ESLint gate passes with 0 errors and 0 warnings
- [x] Local unit tests pass (7 tests across 2 files)
- [x] `npm audit` reports 0 vulnerabilities
- [x] Registry signatures and attestations verify
- [x] Fresh final automated accessibility suite passes (35/35)
- [x] Final production Lighthouse run scores 99 / 100 / 100 / 100 and meets Performance >= 90
- [x] Current runtime probe passes for desktop light, desktop dark, and mobile
- [x] Current non-delivery API trust-boundary probes pass (5/5)
- [x] Independent security review reports Critical 0 / High 0
- [ ] Strix diff scan completes after authentication is configured
- [ ] New remote GitHub Actions run is green on `master`
- [ ] Dedicated user-path E2E suite is written and passing
- [ ] Vercel deployment exists and live health checks pass
- [ ] Production contact delivery is verified
- [ ] Live canary records zero console errors and no critical regressions
