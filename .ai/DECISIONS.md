# Decisions Log

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|-------------------------|
| 2026-11-10 | Next.js 14 App Router with static export | Best performance, free hosting, native image/font optimization | Astro, Vite+React, Remix |
| 2026-11-10 | Framer Motion for animations | Declarative, scroll-triggered, layout animations, reduced motion support | GSAP, CSS animations, react-spring |
| 2026-11-10 | Custom parallax implementation | Full control over layer behavior, performance tuning | react-parallax, simple-parallax, CSS-only |
| 2026-11-10 | Content as TypeScript modules | Type safety, version control, zero dependencies | Headless CMS (Contentful, Sanity), MDX |
| 2026-11-10 | Tailwind CSS with custom theme | Design tokens, consistency, minimal CSS | CSS Modules, Styled Components, vanilla CSS |
| 2026-11-10 | Vercel for deployment | Native Next.js support, edge network, preview deployments | Netlify, Cloudflare Pages, AWS Amplify |
| 2026-11-10 | No backend/database | Portfolio is static content, no user accounts needed | Supabase, Firebase, custom API |
| 2026-11-10 | Contact form via Formspree | No server needed, spam protection, email delivery | EmailJS, Netlify Forms, custom API |
| 2026-11-10 | Lucide React for icons | Tree-shakeable, consistent style, accessible | Heroicons, Phosphor, custom SVG |
| 2026-11-10 | Vitest + Playwright for testing | Fast unit tests, real browser E2E | Jest + Cypress, pure Playwright |