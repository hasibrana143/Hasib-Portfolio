# Architecture: Full-Stack Developer Portfolio

## System Overview
Static-first Next.js 15 App Router site deployed to Vercel Edge Network.

## Technology Decisions

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | RSC, streaming, Edge runtime, optimal performance |
| Language | TypeScript (strict) | Type safety, refactoring confidence |
| Styling | Tailwind CSS v4 | Utility-first, small bundle, design tokens |
| UI Components | shadcn/ui + custom | Accessible, customizable, no runtime overhead |
| Animations | Framer Motion | Performant, gesture support, reduced-motion respect |
| Icons | Lucide React | Tree-shakeable, consistent |
| Forms | React Hook Form + Zod | Validation, minimal bundle |
| Email | Resend (Server Action) | Developer experience, deliverability |
| Deployment | Vercel | Zero-config, Edge, preview deployments |
| Analytics | Vercel Analytics (optional) | Privacy-friendly, no cookies |

## Data Flow
```
User Request → Vercel Edge → Next.js App Router
    ├─ Static pages (ISR/SSG) → CDN cache
    ├─ Server Actions (contact form) → Resend API
    └─ API Routes (if needed) → Edge Functions
```

## Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout, providers, metadata
│   ├── page.tsx            # Home page (server component)
│   ├── globals.css         # Tailwind + custom CSS
│   ├── components/         # Page-specific components
│   ├── actions/            # Server Actions
│   └── lib/                # Utilities, constants
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── sections/           # Page sections (Hero, About, Projects, Contact)
│   └── layout/             # Header, Footer
├── data/
│   ├── projects.ts         # Project data
│   ├── skills.ts           # Skills data
│   └── constants.ts        # Site config
├── hooks/                  # Custom hooks
├── lib/                    # Shared utilities
└── types/                  # TypeScript types
```

## Rendering Strategy
- **Home page**: Static (SSG) with `revalidate: 3600`
- **Contact form**: Server Action (Edge runtime)
- **Images**: `next/image` with remote patterns, WebP/AVIF

## Security
- CSP headers via `next.config.ts`
- Server Action CSRF protection (same-origin)
- Rate limiting via Vercel Edge Middleware (future)
- No secrets in client bundle

## Performance Budget
- JS bundle: < 100KB gzipped
- CSS: < 20KB gzipped
- Images: Optimized, lazy-loaded, priority for hero
- Fonts: `next/font` with `display: swap`, preload

## Accessibility
- Semantic HTML5 landmarks
- Focus management
- ARIA labels where needed
- Reduced motion via `prefers-reduced-motion`
- Color contrast AA minimum

## SEO
- Dynamic metadata per page
- JSON-LD Person schema
- Open Graph / Twitter Cards
- Sitemap.xml + robots.txt (auto-generated)