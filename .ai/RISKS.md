# Risk Assessment

| Probability | Impact | Rating | Risk | Mitigation | Action |
|-------------|--------|--------|------|------------|--------|
| High | High | 🔴 CRITICAL | Parallax performance on mobile | Test early, implement reduced motion, optimize layer count | Prototype parallax in Phase 2, test on low-end devices |
| High | Medium | 🟠 HIGH | Forest images not available/licensed | Use AI-generated or royalty-free assets, create custom SVG alternatives | Source assets in Phase 2, have fallback plan |
| Medium | High | 🟠 HIGH | Framer Motion bundle size impact | Tree-shake imports, use only needed features, measure bundle | Audit bundle after Phase 2, consider lighter alternatives |
| Medium | Medium | 🟡 MEDIUM | Scroll animations cause motion sickness | Respect `prefers-reduced-motion`, provide disable toggle | Implement in Phase 2, test with accessibility users |
| Low | High | 🟡 MEDIUM | Next.js static export limitations | Verify all routes pre-generate, avoid dynamic APIs | Test build early in Phase 0 |
| Medium | Low | 🟢 LOW | Design doesn't match reference exactly | Iterative design review, reference screenshots comparison | Design review gate in Phase 7 |
| Low | Medium | 🟢 LOW | Contact form spam | Use Formspree honeypot, rate limiting | Configure in Phase 6 |
| Low | Low | 🟢 LOW | Browser compatibility issues | Test in CI with Playwright across browsers | Add to Phase 7 |

## Risk Triggers & Escalation

| Trigger | Escalation |
|---------|------------|
| Parallax FPS < 30 on mobile | Simplify layers, switch to CSS-only parallax |
| Bundle size > 250KB | Remove Framer Motion, use CSS animations |
| Lighthouse < 80 | Audit and optimize images, fonts, third-party |
| Accessibility violations > 0 | Fix before merge, block PR |