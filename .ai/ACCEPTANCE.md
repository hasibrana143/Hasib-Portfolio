# Acceptance Criteria & Definition of Done

## Definition of Done (Per Task)
- [ ] Code written and self-reviewed
- [ ] TypeScript compiles (`npm run typecheck` → 0 errors)
- [ ] Linting passes (`npm run lint` → 0 errors)
- [ ] Unit tests pass (`npm run test` → 100% pass)
- [ ] Component renders without console errors
- [ ] Responsive at all breakpoints (320px, 768px, 1024px, 1440px)
- [ ] Accessibility: keyboard navigable, screen reader tested, contrast verified
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Documentation updated (if applicable)

## Definition of Done (Per Phase)
- [ ] All tasks in phase complete per Task DoD
- [ ] Integration tests pass for phase features
- [ ] Visual review against reference screenshots
- [ ] Performance budget met (no regressions)
- [ ] No critical/high security findings
- [ ] Stakeholder demo/approval (if applicable)

## MVP Acceptance Criteria (Launch Gate)

### Functional
| ID | Criteria | Verification Method | Status |
|----|----------|---------------------|--------|
| AC-F1 | Home page loads with all 6 sections | Manual + Playwright | ⏳ |
| AC-F2 | Navigation works (all links, mobile menu) | Manual + Playwright | ⏳ |
| AC-F3 | Hero parallax animates smoothly | Visual + Performance | ⏳ |
| AC-F4 | Process section shows 3 steps with animations | Visual + Playwright | ⏳ |
| AC-F5 | Projects section displays 3 project cards | Visual + Playwright | ⏳ |
| AC-F6 | Footer has all links, social, copyright | Manual + Link checker | ⏳ |
| AC-F7 | Contact form submits successfully | Manual + Playwright | ⏳ |
| AC-F8 | Discover, Explore, Project Detail pages work | Manual + Playwright | ⏳ |

### Non-Functional
| ID | Criteria | Target | Verification Method | Status |
|----|----------|--------|---------------------|--------|
| AC-NF1 | Lighthouse Performance | ≥ 90 | Lighthouse CI | ⏳ |
| AC-NF2 | Lighthouse Accessibility | ≥ 90 | Lighthouse CI | ⏳ |
| AC-NF3 | Lighthouse Best Practices | ≥ 90 | Lighthouse CI | ⏳ |
| AC-NF4 | Lighthouse SEO | ≥ 90 | Lighthouse CI | ⏳ |
| AC-NF5 | Axe-core Critical violations | 0 | Automated a11y test | ⏳ |
| AC-NF6 | Axe-core Serious violations | 0 | Automated a11y test | ⏳ |
| AC-NF7 | TypeScript errors | 0 | `tsc --noEmit` | ⏳ |
| AC-NF8 | ESLint errors | 0 | `npm run lint` | ⏳ |
| AC-NF9 | Bundle size (gzipped) | < 200KB | `npm run build` analysis | ⏳ |
| AC-NF10 | LCP (mobile) | < 2.5s | Lighthouse / Web Vitals | ⏳ |
| AC-NF11 | CLS | < 0.1 | Lighthouse / Web Vitals | ⏳ |
| AC-NF12 | INP | < 200ms | Lighthouse / Web Vitals | ⏳ |

### Visual/Design
| ID | Criteria | Verification Method | Status |
|----|----------|---------------------|--------|
| AC-V1 | Forest theme consistent across all pages | Visual comparison to reference | ⏳ |
| AC-V2 | Parallax layers match reference behavior | Side-by-side comparison | ⏳ |
| AC-V3 | Typography hierarchy matches reference | Visual comparison | ⏳ |
| AC-V4 | Color palette matches forest aesthetic | Design token audit | ⏳ |
| AC-V5 | Spacing/system consistent | Design system audit | ⏳ |
| AC-V6 | No "AI slop" patterns (generic layouts) | Design review | ⏳ |

## Sign-Off Checklist

### Pre-Launch
- [ ] All MVP Acceptance Criteria: PASS
- [ ] Security scan: 0 Critical/High
- [ ] Accessibility audit: 0 Critical/Serious
- [ ] Performance budget: MET
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge ✓
- [ ] Mobile devices: iOS Safari, Chrome Android ✓
- [ ] Content review: Copy, images, links verified
- [ ] SEO: Metadata, structured data, sitemap ✓
- [ ] Analytics: Vercel Analytics connected
- [ ] Domain: Configured and SSL verified

### Post-Launch (Week 1)
- [ ] Monitor Core Web Vitals (Vercel Analytics)
- [ ] Check for console errors in production
- [ ] Verify contact form submissions work
- [ ] Monitor 404s (sitemap coverage)
- [ ] Collect initial user feedback

## Go/No-Go Decision Matrix

| Condition | Decision |
|-----------|----------|
| Any AC-Fx = FAIL | **NO-GO** - Block launch |
| Any AC-NFx (1-4) < 90 | **NO-GO** - Block launch |
| Any AC-NFx (5-6) > 0 | **NO-GO** - Block launch |
| AC-NF7 or NF8 > 0 | **NO-GO** - Block launch |
| AC-NF9 > 200KB | **CONDITIONAL** - Optimize first |
| AC-NF10 > 2.5s | **CONDITIONAL** - Optimize first |
| All MVP criteria PASS | **GO** - Launch approved |