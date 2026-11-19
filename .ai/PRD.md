# Product Requirements Document: Full-Stack Developer Portfolio

## Vision
A concise, fast, and accessible portfolio that demonstrates engineering practice through verifiable work rather than invented employers, clients, projects, or credentials.

## User Stories

### US-001: Visitor understands the profile
**As a** visitor
**I want to** quickly understand the developer's role, technical focus, and working approach
**So that** I can decide whether to continue reading or contact them

### US-002: Visitor reviews verifiable work
**As a** visitor
**I want to** inspect project details and the repository evidence behind them
**So that** I can assess the work without relying on fabricated case studies

### US-003: Visitor sends a message
**As a** visitor
**I want to** submit a message from the site
**So that** I do not need to publish or copy a contact address

### US-004: Owner maintains content
**As the** portfolio owner
**I want to** update typed content files and project assets
**So that** changes remain reviewable and consistent with the codebase
**Note**: Updates require source edits; the current product does not include a CMS.

## MVP Scope

- [x] Hero section with motion
- [x] About section with a concise bio and repository-grounded technology groups
- [x] Editorial project index with one verifiable case study
- [x] Contact form using a Next.js Route Handler and Resend
- [x] Footer with in-page navigation and owner-confirmed social links
- [x] Dark/light/system theme handling
- [x] Automated accessibility gate across five Playwright browser profiles
- [x] SEO metadata, JSON-LD, Open Graph image, sitemap, and robots rules
- [x] Conditional project-category filtering when more than one category exists
- [x] Owner confirmation of the three social profile URLs
- [ ] Remote CI green on `master` after the Linux import-casing fix
- [ ] Vercel environment variables configured
- [ ] Vercel deployment, live health check, and contact-delivery test

## Deferred / Not Shipped

- [ ] Additional case studies with owner-provided evidence
- [ ] Project detail pages
- [ ] Blog or MDX articles
- [ ] CMS integration (Contentful, Sanity, or similar)
- [ ] Analytics
- [ ] Multi-language support
- [ ] Public contact address or `mailto:` link

## Success Measures

| Measure | Target | Evidence status |
|---|---|---|
| Lighthouse Performance | >= 90 | Current local production run: 99 |
| Lighthouse Accessibility | 100 | Current local production run: 100 |
| Lighthouse Best Practices | 100 | Current local production run: 100 |
| Lighthouse SEO | 100 | Current local production run: 100 |
| Automated accessibility checks | 0 critical/serious; current suite 35/35 | Fresh final local rerun passed |
| Production console/CSP errors | 0 | Current local production probe passed for desktop light/dark and mobile; live checks pending |
| Unit tests | All pass | Current local run: 7 tests across 2 files |
| Dependency audit | 0 vulnerabilities | Current local run: 0 |
| Remote CI | Green on `master` | **Failed at `ad21c23`; newer green run pending** |
| Contact delivery | Successful controlled submission | **Production verification pending** |
| Deployment health | Live `/` returns 200 and canary passes | **Not deployed/confirmed** |

## Content and Release Guardrails

- Do not add projects, employers, clients, skills, dates, licenses, or credentials without owner-provided evidence.
- Keep the owner-confirmed social URLs synchronized with `src/data/constants.ts`.
- Do not describe Vercel as deployed until a deployment URL and health evidence exist.
- Do not describe remote CI as green until a newer successful GitHub Actions run is confirmed.
- Keep the portfolio address private unless the owner explicitly chooses otherwise.
