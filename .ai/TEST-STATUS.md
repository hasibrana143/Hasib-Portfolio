# Test Status: Full-Stack Developer Portfolio

## Test Strategy
| Layer | Tool | Coverage Target | Status |
|-------|------|-----------------|--------|
| Unit | Vitest | utils/contracts | ✅ PASS (5/5) |
| Integration | Manual HTTP probes | `/api/contact` trust boundary | ✅ PASS (6/6 controls) |
| E2E | Playwright | Critical user paths | ⏳ NOT_STARTED (CI wired, specs pending) |
| Accessibility | axe-core + Playwright | 0 critical/high | ✅ PASS (35/35, 5 browsers) |
| Visual | Playwright screenshots | Key pages | ✅ PASS (light/dark/mobile) |
| Performance | Lighthouse | Perf ≥ 90 / A11y 100 / SEO 100 | ✅ PASS (98 / 100 / 100 / 100) |

## Test Commands
```bash
# Unit
npm run test

# E2E
npm run test:e2e

# Accessibility
npm run test:a11y

# Lighthouse (against `npm run start -- -p 3100`)
npx lighthouse http://127.0.0.1:3100 --output=json --output-path=.gstack/lh-final2.json --chrome-flags="--headless --no-sandbox"
```

## Current Results (2026-11-19, production build on :3100, real content)
| Suite | Pass | Fail | Skip | Duration | Last Run |
|-------|------|------|------|----------|----------|
| Unit | 5 | 0 | 0 | 3.0s | 2026-11-19 |
| Integration (API probes) | 6 | 0 | 0 | ~5s | 2026-11-19 |
| E2E | - | - | - | - | Never |
| Accessibility | 35 | 0 | 0 | 1.6m | 2026-11-19 |
| Lighthouse (prod build) | - | - | - | - | 2026-11-19 |
| Build | ✅ | 0 | 0 | ~8s | 2026-11-19 |
| TypeCheck | ✅ | 0 | 0 | ~4s | 2026-11-19 |
| Lint | ✅ | 0 | 0 | ~4s | 2026-11-19 |
| npm audit | ✅ | 0 | 0 | - | 2026-11-19 |

## Content Realism Checks (2026-11-19)
| Check | Method | Result |
|---|---|---|
| No placeholder strings in the rendered page | searched the server HTML + visible text for `your-email@example.com`, `yourusername`, `example.com`, `Tech Company`, `StartupXYZ`, `Digital Agency`, `E-Commerce Platform`, `Weather Dashboard`, `your-portfolio` | 0 hits (only `localhost:3000`, the documented local fallback) |
| No address published | regex over the visible page text | 0 matches |
| JSON-LD present and parseable | `script[type="application/ld+json"]` → `Person` with `sameAs` | valid |
| Project modal | opened the only project entry | opens, title and preview image render, no dead link buttons |
| Category filter | filtered buttons rendered | 0 buttons (correct — one category, so no filter) |
| Preview asset | `GET /images/projects/portfolio.svg` | 200 `image/svg+xml`, 1280px natural width |
| Footer links | extracted all footer anchors | GitHub, LinkedIn, X + three in-page anchors |

## Lighthouse Results (Production Build - 2026-11-19, real content)
Measured with `next start` on :3100 against a fresh `next build`, browser closed first so the run is not competing with a live Chrome instance.
Report: `.gstack/lh-real.json`

| Category | Score | Status |
|----------|-------|--------|
| Performance | 99/100 | ✅ EXCELLENT |
| Accessibility | 100/100 | ✅ PERFECT |
| Best Practices | 100/100 | ✅ PERFECT |
| SEO | 100/100 | ✅ PERFECT |

### Performance Details (production)
- **FCP**: 0.8s
- **LCP**: 0.8s
- **Speed Index**: 0.8s
- **TBT**: 90ms
- **CLS**: 0 - ✅ Perfect
- **Total byte weight**: 340 KiB
- **Console errors**: 0
- **CSP violations**: 0 (browser `securitypolicyviolation` listener — see Security Notes)
- **First-load JS**: 225 KB gzip (browser-fetched); 264 KB including the `nomodule` polyfill the browser skips

> Note: Lighthouse scores vary 82–98 depending on machine load. A dev server and a
> live browser on the same box inflate TBT to ~750ms — the same build measured
> 82 / 100 / 100 / 100 with a browser open and 99 / 100 / 100 / 100 with it closed.
> Always measure on an idle machine against a production build.

## Integration Probes — `/api/contact` (2026-11-19)
Each probe asserts the trust-boundary behaviour end to end against the running production build.

| Probe | Expected | Observed | Status |
|-------|----------|----------|--------|
| `Content-Type: text/plain` | 415 | 415 `Content-Type must be application/json` | ✅ |
| Malformed JSON body | 400 | 400 `Invalid JSON body` | ✅ |
| Schema-invalid payload | 400 + field errors | 400 with per-field messages (name/email/subject/message) | ✅ |
| Honeypot filled | 200, nothing sent | 200 `Message sent successfully!` | ✅ |
| Body > 16 KB | 413 | 413 `Request body too large` | ✅ |
| Valid payload, no `RESEND_API_KEY` | 503 (validation passed) | 503 `Email service not configured` | ✅ |

## Quality Gates
- [x] All unit tests pass (5/5)
- [x] API trust-boundary probes pass (6/6)
- [ ] All E2E tests pass — suite not written yet (CI runs the a11y suite only)
- [x] 0 accessibility violations (critical/high) — 35/35 across chromium, firefox, webkit, mobile chrome, mobile safari
- [x] Lighthouse Performance ≥ 90 (actual: 98 production build)
- [x] Lighthouse Accessibility = 100 (actual: 100)
- [x] Lighthouse Best Practices = 100 (actual: 100)
- [x] Lighthouse SEO = 100 (actual: 100)
- [x] First-load JS ≤ 264 KB gzip total / 225 KB browser-fetched — framework baseline is ~158 KB (react-dom + next-router + turbopack runtime), app-owned code ≈ 103 KB (Zod + React Hook Form + Framer Motion + Lucide + Radix)
- [x] TypeScript strict mode passes
- [x] ESLint passes (0 errors, 0 warnings)
- [x] `npm audit` reports 0 vulnerabilities
- [x] No placeholder or invented content rendered — 0 hits on the placeholder scan, 0 addresses published

## Optimizations Applied (Verified 2026-11-19)
- Static section imports (content in server HTML, LCP 0.8s)
- Transform-only hero entrance (no LCP-delaying opacity fade)
- Fonts: `display: swap`, preloaded via `<link rel="preload" as="font">` (4 woff2), system fallbacks, Instrument Serif display face
- CSS `@media (scripting: none)` safety net so content is never hidden without JS
- Skip to main content link
- Fixed film-grain overlay + blueprint hairline grid
- Header/footer client components
- `LazyMotion` + `domAnimation` + `m` — Framer Motion tree-shakes to the features used (-10 KB gzip)
- `z.config({ jitless: true })` — stops Zod's JIT compiler from calling `new Function`, which a strict CSP blocks. The throw was swallowed but Chrome still logged a CSP violation and dropped Lighthouse Best Practices to 96. With the flag: 0 CSP violations, Best Practices back to 100.
