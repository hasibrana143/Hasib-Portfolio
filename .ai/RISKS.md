# Risks: Full-Stack Developer Portfolio

## Risk Matrix

| ID | Risk | Probability | Impact | Rating | Mitigation |
|----|------|-------------|--------|--------|------------|
| R-001 | Content not ready (projects, bio, images) | High | High | 🔴 CRITICAL | Request content upfront; use placeholders |
| R-002 | Contact form email delivery fails | Medium | High | 🟠 HIGH | Test Resend thoroughly; fallback to Formspree |
| R-003 | Vercel deployment issues (build failures) | Low | High | 🟡 MEDIUM | Test build locally first; check Node version |
| R-004 | Accessibility regressions during development | Medium | Medium | 🟡 MEDIUM | axe-core in CI; manual keyboard testing |
| R-005 | Performance budget exceeded | Medium | Medium | 🟡 MEDIUM | Bundle analyzer; Lighthouse CI on PRs |
| R-006 | Images not optimized / large bundle | Medium | Medium | 🟡 MEDIUM | next/image config; WebP/AVIF; lazy loading |
| R-007 | SEO issues (missing meta, schema) | Low | Medium | 🟢 LOW | Automated meta generation; schema validation |
| R-008 | Theme flash on load | Low | Low | 🟢 LOW | next-themes with `attribute="class"`; inline script |
| R-009 | Browser compatibility issues | Low | Medium | 🟢 LOW | Test in Chrome, Firefox, Safari; polyfills if needed |
| R-010 | Scope creep (adding blog, CMS, etc.) | High | Medium | 🟠 HIGH | Strict MVP scope; Phase 2 backlog |

## Risk Triggers
- **R-001**: No project data provided by 2026-11-13 → Use placeholder data, flag for owner
- **R-002**: Resend test email fails → Switch to Formspree immediately
- **R-003**: Local build fails → Fix before push; don't rely on CI to catch

## Contingency Plans
- If Vercel fails: Deploy to Netlify/Cloudflare Pages as backup
- If Resend fails: Formspree free tier (50 submissions/month)
- If performance fails: Remove animations, reduce images, code-split more