# Requirements: Full-Stack Developer Portfolio

Status legend: **Shipped** means implemented in the current worktree; **Verified** means the listed evidence exists. A checked implementation does not imply that deployment, live delivery, or a green remote CI run has been confirmed.

## Functional Requirements

### FR-001: Hero Section
- **Status**: Shipped and currently performance-verified
- **Description**: Name, role, description, status panel, and calls to action to Projects and Contact
- **Acceptance**: Responsive; keyboard-operable; content present in the initial HTML; no LCP-delaying opacity animation
- **Evidence**: `src/components/sections/HeroSection.tsx`; current local production Lighthouse report

### FR-002: About Section
- **Status**: Shipped
- **Description**: Short bio, categorized technology list, and one non-employer experience entry
- **Acceptance**: Semantic headings; scannable layout; no invented employer, client, date, or project claims
- **Evidence**: `src/components/sections/AboutSection.tsx`, `src/components/HomeContent.tsx`, `src/data/skills.ts`

### FR-003: Projects Showcase
- **Status**: Shipped with one case study
- **Description**: Editorial project index with one verifiable case study, technology tags, preview asset, and native dialog detail view
- **Acceptance**: Each project has an image and stack; category filters appear only for categories represented by data; optional live/code links are rendered only when present; dialog supports Escape and contains focus
- **Evidence**: `src/components/sections/ProjectsSection.tsx`, `src/data/projects.ts`, `public/images/projects/portfolio.svg`

### FR-004: Skills / Technology Inventory
- **Status**: Shipped
- **Description**: Frontend, backend, DevOps, and tools groups rendered as badges
- **Acceptance**: No proficiency scores; Vercel is labelled as a deployment target rather than a proven production deployment
- **Evidence**: `src/data/skills.ts`

### FR-005: Contact Form
- **Status**: Shipped; production delivery not confirmed
- **Description**: Name, email, subject, and message submitted as JSON to `POST /api/contact`
- **Acceptance**: Shared client/server Zod schema; request content-type and size enforcement before and after body buffering; field limits; honeypot; per-IP in-memory limiter; escaped email body; explicit success and error states
- **Evidence**: `src/components/sections/ContactSection.tsx`, `src/lib/contact-schema.ts`, `src/app/api/contact/route.ts`, `tests/unit/contact-route.test.ts`; current 5/5 non-delivery probes

### FR-006: Footer and Navigation
- **Status**: Shipped; social URLs owner-confirmed
- **Description**: Footer colophon, in-page navigation, contact action, copyright, and external social links
- **Acceptance**: Descriptive navigation labels; external links use `target="_blank"` with `rel="noopener noreferrer"`; links remain keyboard-operable
- **Evidence**: `src/components/layout/Footer.tsx`, `src/components/layout/Header.tsx`; owner-confirmed GitHub, LinkedIn, and X handles

## Non-Functional Requirements

### NFR-001: Performance
- **Status**: Currently verified on a local production build
- **Targets**: Lighthouse Performance >= 90; LCP < 2.5 s; INP < 200 ms; CLS < 0.1
- **Evidence**: Current Lighthouse 13.6 production report scored 99 Performance / 100 Accessibility / 100 Best Practices / 100 SEO; FCP/LCP 0.8 s, TBT 90 ms, CLS 0
- **Constraint**: Scores are current local evidence, not a live-deployment guarantee

### NFR-002: Accessibility
- **Status**: Current automated suite verified; manual WCAG conformance is not claimed
- **Targets**: Zero axe critical/serious findings; full keyboard path; semantic landmarks and labels; reduced-motion support
- **Evidence**: The fresh final Playwright + axe rerun passed 35/35 checks across Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari

### NFR-003: SEO
- **Status**: Shipped and currently verified
- **Requirements**: Canonical metadata, Open Graph/Twitter metadata, generated Open Graph image, JSON-LD `Person`, sitemap, and robots rules
- **Evidence**: `src/app/layout.tsx`, `src/app/opengraph-image.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`; current Lighthouse SEO 100

### NFR-004: Security
- **Status**: Core controls shipped
- **Requirements**: CSP and standard security headers; server-side validation; request/field limits; escaped output; honeypot; rate-limit floor; no server secret referenced by client code; dependency integrity verification
- **Constraint**: The in-memory limiter is per-instance on serverless; no global Vercel WAF limit or production delivery test is confirmed
- **Evidence**: `next.config.ts`, `src/app/api/contact/route.ts`, `src/lib/contact-schema.ts`; `npm audit` 0 vulnerabilities; 487 packages with verified registry signatures and 129 packages with verified attestations; GitHub secret scanning and push protection enabled

### NFR-005: Maintainability
- **Status**: Shipped for the current scope
- **Requirements**: Typed data files for site configuration, projects, and skills; typed contact contract; strict TypeScript; version-controlled content
- **Constraint**: Content updates require TypeScript/source edits; there is no CMS or non-code editing workflow

### NFR-006: Release and Deployment
- **Status**: Not complete
- **Requirements**: Remote CI green on `master`; Node 22.12+; environment variables configured in Vercel; production contact test; live health and canary checks
- **Evidence required**: A successful GitHub Actions run newer than failed commit `ad21c23`, a Vercel deployment URL, and recorded live checks

## Acceptance Criteria Summary

| ID | Requirement | Current status | Verification |
|---|---|---|---|
| FR-001 | Responsive, accessible hero | Shipped | Code + current Lighthouse |
| FR-002 | Honest, scannable about content | Shipped | Code review |
| FR-003 | Project index with one case study | Shipped | Unit test + code review |
| FR-004 | Technology groups without invented proficiency | Shipped | Unit test + code review |
| FR-005 | Validated contact submission | Shipped; live delivery unverified | Current 5/5 non-delivery API probes |
| FR-006 | Accessible footer/navigation | Shipped; social URLs confirmed | Current axe run + owner confirmation |
| NFR-001 | Performance >= 90 | Currently verified at 99 | Current local production Lighthouse report |
| NFR-002 | Automated accessibility gate | Currently verified at 35/35 | Current Playwright + axe report |
| NFR-003 | SEO metadata and schema | Shipped | Code review; current Lighthouse SEO 100 |
| NFR-004 | Security controls | Shipped with documented residuals | Code review, dependency audit, lockfile integrity, repository settings |
| NFR-005 | Typed, version-controlled content | Shipped | Code review |
| NFR-006 | Remote CI green and deployed | **Pending** | New GitHub Actions run + Vercel evidence |
