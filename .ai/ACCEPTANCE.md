# Acceptance Criteria: Full-Stack Developer Portfolio

## Definition of Done (Per Task)
- [x] Code compiles (TypeScript strict)
- [x] Lint passes (ESLint 0 errors, 0 warnings)
- [x] Build succeeds (`npm run build`)
- [x] Unit tests pass (if applicable)
- [x] Integration tests pass (if applicable)
- [x] Accessibility: axe-core 0 critical/high violations
- [x] Performance: Meets budget (LCP, INP, CLS)
- [x] Security: No new vulnerabilities introduced
- [x] Documentation updated (README, CLAUDE.md, `.ai/` state files)

## MVP Acceptance Gates

### Gate 1: Foundation Complete
- [x] Next.js + TS + Tailwind v4 initialized (now Next.js 16.4.6)
- [x] shadcn/ui-style components installed and working
- [x] Project structure matches ARCHITECTURE.md
- [x] Data files typed and exported
- [x] `npm run build` passes locally

### Gate 2: Core Sections Complete
- [x] Hero: Renders <1s, animated, accessible, responsive (LCP 0.8s)
- [x] About: Semantic, scannable, skills categorized
- [x] Projects: Editorial index, filterable, native `<dialog>` modal, keyboard nav + focus containment
- [x] Contact: Form validates, submits via `/api/contact`, Resend integration, spam protection
- [x] Header/Footer: Responsive, theme toggle, social links, accessible, skip link

### Gate 3: Polish Complete
- [x] Dark/Light theme: No flash, persists, system preference respected
- [x] SEO: Dynamic metadata, JSON-LD Person, OG image (real 1200x630 PNG), sitemap.xml, robots.txt — Lighthouse SEO 100
- [x] Accessibility: axe-core 0 violations, WCAG AA, full keyboard flow, reduced motion — 35/35 across 5 browsers
- [x] Performance: Lighthouse Perf 98, LCP 0.8s, CLS 0 — first-load JS 225 KB gzip (framework baseline ~158 KB, app-owned ~103 KB)
- [x] Security: CSP + HSTS + X-Frame-Options + nosniff + referrer + permissions, API input validation, HTML escaping, honeypot, rate limit, `npm audit` 0

### Gate 4: Deploy & Verify Complete
- [ ] Vercel production deploy successful — **owner deferred ("not now")**
- [ ] Custom domain configured (if applicable)
- [ ] Preview deploys work on PRs
- [x] CI wired (`.github/workflows/ci.yml`: typecheck, lint, unit, build, Playwright a11y) — runs on push/PR
- [ ] E2E specs for critical paths — suite not written yet
- [ ] Canary monitoring: 0 errors, no regressions (10 min) — requires a live deploy
- [ ] Analytics enabled (optional)

## Hardening Backlog Acceptance (2026-11-19)
| Item | Acceptance | Status |
|---|---|---|
| Dependency remediation | `npm audit` reports 0 vulnerabilities | ✅ |
| Contact API hardening | content-type, body cap, per-field caps, honeypot, rate limit, HTML escaping — 6/6 probes pass | ✅ |
| CSP hardening | no `unsafe-eval` in prod, `object-src 'none'`, `upgrade-insecure-requests`, 0 browser CSP violations | ✅ |
| OG image | real PNG, 1200x630, served as `image/png` | ✅ |
| CI | typecheck + lint + unit + build + a11y workflow committed | ✅ |
| Bundle | first-load JS reduced 235 KB → 225 KB gzip | ✅ |
| Docs | README + CLAUDE.md match the shipped code | ✅ |
| State files | `.ai/` evidence refreshed with dated results | ✅ |

## Content Realism Acceptance (2026-11-19)
| Item | Acceptance | Status |
|---|---|---|
| No invented employers | no "Tech Company Inc." / "StartupXYZ" / "Digital Agency" anywhere | ✅ |
| No invented projects | project index contains only work that can be verified | ✅ (1 entry — this site) |
| No invented claims | no "5+ years", no unverifiable open-source/article claims, no skill proficiency ratings | ✅ |
| No placeholder contact address | no `your-email@example.com` rendered or mailed | ✅ (form-only, `CONTACT_EMAIL` is server-only) |
| No placeholder links | no `yourusername` / `example.com` URLs in the source | ✅ (GitHub, LinkedIn, and X handles are owner-confirmed) |
| No boilerplate assets | unused create-next-app SVGs removed | ✅ |
| Structured data | JSON-LD `Person` with `sameAs` present and valid | ✅ |
| Every string owner-editable | content lives in `src/data/*` and `HomeContent.tsx`, not in components | ✅ |
| Live social links | the three profile URLs resolve to the owner's real accounts | ✅ owner-confirmed |

## Final Sign-Off
| Role | Name | Date | Signature |
|------|------|------|-----------|
| CTO (Orchestrator) | - | - | - |
| Frontend Lead | - | - | - |
| Backend Lead | - | - | - |
| QA Lead | - | - | - |
| Security Lead | - | - | - |
| Product Owner | - | - | - |

**Gates 1–3 pass. Gate 4 is blocked on owner content, env vars and an explicit deploy decision.**
