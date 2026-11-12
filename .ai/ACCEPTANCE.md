# Acceptance Criteria: Full-Stack Developer Portfolio

## Definition of Done (Per Task)
- [ ] Code compiles (TypeScript strict)
- [ ] Lint passes (ESLint 0 errors, 0 warnings)
- [ ] Build succeeds (`npm run build`)
- [ ] Unit tests pass (if applicable)
- [ ] Integration tests pass (if applicable)
- [ ] Accessibility: axe-core 0 critical/high violations
- [ ] Performance: Meets budget (LCP, INP, CLS)
- [ ] Security: No new vulnerabilities introduced
- [ ] Documentation updated (README, component docs)

## MVP Acceptance Gates

### Gate 1: Foundation Complete
- [ ] Next.js 15 + TS + Tailwind v4 initialized
- [ ] shadcn/ui components installed and working
- [ ] Project structure matches ARCHITECTURE.md
- [ ] Data files typed and exported
- [ ] `npm run build` passes locally

### Gate 2: Core Sections Complete
- [ ] Hero: Loads <1s, animated, accessible, responsive
- [ ] About: Semantic, scannable, skills categorized
- [ ] Projects: Grid, filterable, modal, optimized images, keyboard nav
- [ ] Contact: Form validates, submits via Server Action, Resend works, toast feedback
- [ ] Header/Footer: Responsive, theme toggle, social links, accessible

### Gate 3: Polish Complete
- [ ] Dark/Light theme: No flash, persists, system preference respected
- [ ] SEO: Dynamic metadata, JSON-LD Person, OG/Twitter, sitemap.xml, robots.txt
- [ ] Accessibility: axe-core 0 violations, WCAG AA, full keyboard flow, reduced motion
- [ ] Performance: Lighthouse Perf ≥ 90, JS < 100KB gzipped, images optimized
- [ ] Security: CSP + security headers A+, Server Action CSRF, input validation

### Gate 4: Deploy & Verify Complete
- [ ] Vercel production deploy successful
- [ ] Custom domain configured (if applicable)
- [ ] Preview deploys work on PRs
- [ ] E2E tests pass in CI (critical paths)
- [ ] Canary monitoring: 0 errors, no regressions (10 min)
- [ ] Analytics enabled (optional)

## Final Sign-Off
| Role | Name | Date | Signature |
|------|------|------|-----------|
| CTO (Orchestrator) | - | - | - |
| Frontend Lead | - | - | - |
| Backend Lead | - | - | - |
| QA Lead | - | - | - |
| Security Lead | - | - | - |
| Product Owner | - | - | - |

**All gates must pass before production release.**