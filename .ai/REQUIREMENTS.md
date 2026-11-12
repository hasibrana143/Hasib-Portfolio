# Requirements: Full-Stack Developer Portfolio

## Functional Requirements

### FR-001: Hero Section
- **Description**: Eye-catching hero with name, title, tagline, CTA buttons
- **Acceptance**: Loads in <1s, accessible, responsive

### FR-002: About Section
- **Description**: Brief bio, skills, tech stack, experience timeline
- **Acceptance**: Scannable, keyword-rich for SEO

### FR-003: Projects Showcase
- **Description**: Grid of 4-6 featured projects with images, descriptions, tech tags, live/demo links, GitHub links
- **Acceptance**: Filterable by tech, modal/detail view, accessible images

### FR-004: Skills/Tech Stack
- **Description**: Categorized skills (Frontend, Backend, Database, DevOps, Tools)
- **Acceptance**: Visual icons, proficiency indicators

### FR-005: Contact Form
- **Description**: Name, email, subject, message with validation
- **Acceptance**: Server-side validation, spam protection, success/error states

### FR-006: Footer
- **Description**: Social links, copyright, navigation
- **Acceptance**: Accessible links, responsive

## Non-Functional Requirements

### NFR-001: Performance
- **Target**: LCP < 2.5s, INP < 200ms, CLS < 0.1
- **Bundle**: < 100KB JS gzipped

### NFR-002: Accessibility
- **Target**: WCAG 2.1 AA compliant
- **Keyboard**: Full navigation
- **Screen reader**: Semantic HTML, ARIA where needed

### NFR-003: SEO
- **Target**: 100/100 Lighthouse SEO
- **Meta**: Open Graph, Twitter Cards, JSON-LD schema

### NFR-004: Security
- **Headers**: CSP, HSTS, X-Frame-Options
- **Forms**: Rate limiting, CSRF protection

### NFR-005: Maintainability
- **Content**: Data-driven (JSON/MDX), not hardcoded
- **Images**: Optimized, WebP/AVIF, responsive

## Acceptance Criteria Summary
| ID | Requirement | Verification |
|----|-------------|--------------|
| FR-001 | Hero loads <1s | Lighthouse/Playwright |
| FR-002 | About scannable | Manual review |
| FR-003 | Projects filterable | E2E test |
| FR-004 | Skills categorized | Visual check |
| FR-005 | Contact validates | Unit + E2E test |
| FR-006 | Footer accessible | axe-core |
| NFR-001 | Core Web Vitals pass | Lighthouse CI |
| NFR-002 | WCAG AA | axe-core + manual |
| NFR-003 | SEO 100 | Lighthouse |
| NFR-004 | Security headers | securityheaders.com |
| NFR-005 | Data-driven | Code review |