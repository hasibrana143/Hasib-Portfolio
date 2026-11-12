# Decisions Log

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|-------------------------|
| 2026-11-12 | Next.js 15 App Router | RSC, streaming, Edge runtime, best perf | Astro (less RSC), Remix (no Edge yet) |
| 2026-11-12 | Tailwind CSS v4 | Native CSS cascade, smaller bundle, design tokens | CSS Modules, Styled Components, UnoCSS |
| 2026-11-12 | shadcn/ui for components | Accessible, copy-paste ownership, no runtime | Radix UI directly, Headless UI, MUI |
| 2026-11-12 | Framer Motion for animations | Performant, gestures, reduced-motion support | CSS animations, GSAP (heavier) |
| 2026-11-12 | Resend for contact form | DevEx, deliverability, React Email templates | Formspree, EmailJS, Nodemailer |
| 2026-11-12 | Vercel deployment | Zero-config Edge, preview deploys, analytics | Netlify, Cloudflare Pages, AWS Amplify |
| 2026-11-12 | Data-driven content (TS files) | Type-safe, version-controlled, no CMS needed | MDX, Contentful, Sanity, Notion API |
| 2026-11-12 | Lucide React icons | Tree-shakeable, consistent, lightweight | React Icons (larger), Heroicons |
| 2026-11-12 | React Hook Form + Zod | Type-safe validation, minimal bundle | Formik + Yup, native HTML validation |