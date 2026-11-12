# Tasks: Full-Stack Developer Portfolio

## Phase 1: Foundation (Week 1)
- [ ] **TASK-001**: Initialize Next.js 15 project with TypeScript, Tailwind v4, ESLint
  - Acceptance: `npm run build` passes, typecheck clean, lint clean
  - Owner: frontend
  
- [ ] **TASK-002**: Set up shadcn/ui component library
  - Acceptance: Button, Card, Input, Textarea, Label components work
  - Owner: frontend
  
- [ ] **TASK-003**: Configure project structure, aliases, constants
  - Acceptance: `@/` imports work, `siteConfig` exported
  - Owner: frontend

- [ ] **TASK-004**: Create data files (projects, skills, constants)
  - Acceptance: Type-safe exports, sample data populated
  - Owner: frontend

## Phase 2: Core Sections (Week 1-2)
- [ ] **TASK-005**: Build Hero section with animation
  - Acceptance: Loads <1s, accessible, reduced-motion respected
  - Owner: frontend

- [ ] **TASK-006**: Build About section with skills
  - Acceptance: Semantic HTML, responsive grid, skill categories
  - Owner: frontend

- [ ] **TASK-007**: Build Projects showcase grid
  - Acceptance: Filterable, modal detail, images optimized, keyboard nav
  - Owner: frontend

- [ ] **TASK-008**: Build Contact form with Server Action
  - Acceptance: Validation, spam protection, success/error toast, Resend integration
  - Owner: backend

- [ ] **TASK-009**: Build Header/Footer layout components
  - Acceptance: Responsive nav, theme toggle, social links, accessible
  - Owner: frontend

## Phase 3: Polish & Quality (Week 2)
- [ ] **TASK-010**: Dark/Light theme with next-themes
  - Acceptance: No flash, persists, respects system preference
  - Owner: frontend

- [ ] **TASK-011**: SEO metadata, JSON-LD, OG tags, sitemap
  - Acceptance: Lighthouse SEO 100, valid schema
  - Owner: frontend

- [ ] **TASK-012**: Accessibility audit + fixes
  - Acceptance: axe-core 0 violations, WCAG AA, keyboard flow
  - Owner: accessibility-engineer

- [ ] **TASK-013**: Performance optimization
  - Acceptance: Lighthouse Perf > 90, bundle < 100KB JS
  - Owner: performance-engineer

- [ ] **TASK-014**: Security headers, CSP configuration
  - Acceptance: securityheaders.com A+, no console errors
  - Owner: security-engineer

## Phase 4: Deploy & Verify (Week 2)
- [ ] **TASK-015**: Vercel deployment + custom domain
  - Acceptance: Live URL, preview deploys work, analytics enabled
  - Owner: devops

- [ ] **TASK-016**: E2E tests with Playwright
  - Acceptance: Critical paths covered, CI passes
  - Owner: qa-engineer

- [ ] **TASK-017**: Final audit + documentation
  - Acceptance: All quality gates pass, README updated
  - Owner: cto