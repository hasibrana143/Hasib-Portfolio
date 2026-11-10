# Architecture: CodeMaster-Inspired Portfolio

## Technology Stack

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| Framework | Next.js | 14+ (App Router) | React Server Components, static export, image optimization, font optimization |
| Language | TypeScript | 5+ | Type safety, better DX, refactoring confidence |
| Styling | Tailwind CSS | 3.4+ | Utility-first, small bundle, design tokens, dark mode ready |
| Animation | Framer Motion | 11+ | Declarative animations, scroll-triggered, layout animations |
| Parallax | Custom + Framer Motion | - | Lightweight, performant scroll effects |
| Icons | Lucide React | 0.4+ | Consistent, tree-shakeable, accessible |
| Images | Next/Image + Sharp | - | Automatic optimization, WebP/AVIF, responsive |
| Fonts | Next/Font (Google Fonts) | - | Self-hosted, zero layout shift, preloaded |
| Linting | ESLint + Prettier | - | Code consistency, catch errors early |
| Testing | Vitest + Playwright | - | Unit + E2E testing |
| Deploy | Vercel | - | Native Next.js support, edge network, preview deployments |

## Project Structure

```
portfolio/
├── .ai/                    # State management (this directory)
├── public/                 # Static assets
│   ├── images/             # Project images, forest layers
│   ├── fonts/              # Self-hosted fonts (if any)
│   └── robots.txt
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (main)/         # Route group for main pages
│   │   │   ├── page.tsx    # Home page
│   │   │   ├── discover/   # Discover page
│   │   │   ├── explore/    # Explore page + project detail routes
│   │   │   └── contact/    # Contact page
│   │   ├── layout.tsx      # Root layout
│   │   ├── globals.css     # Global styles + Tailwind
│   │   └── sitemap.ts      # Sitemap generation
│   ├── components/
│   │   ├── ui/             # Reusable UI primitives (Button, Card, etc.)
│   │   ├── layout/         # Header, Footer, Navigation
│   │   ├── sections/       # Page sections (Hero, About, Process, Projects)
│   │   ├── parallax/       # Parallax forest components
│   │   └── animations/     # Reusable animation variants
│   ├── lib/
│   │   ├── utils.ts        # Utility functions (cn, etc.)
│   │   ├── constants.ts    # Site config, navigation, social links
│   │   └── animations.ts   # Framer Motion variants
│   ├── data/
│   │   ├── projects.ts     # Project data (type-safe)
│   │   ├── process.ts      # Process steps data
│   │   └── site.ts         # Site metadata, SEO config
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces
│   └── hooks/
│       └── useScroll.ts    # Scroll position hook for parallax
├── tailwind.config.ts      # Tailwind config with design tokens
├── tsconfig.json           # TypeScript config
├── next.config.js          # Next.js config
├── package.json
└── README.md
```

## Key Architectural Decisions

### ADR-001: Next.js App Router with Static Export
- **Decision**: Use `output: 'export'` for fully static site
- **Rationale**: No server needed, free hosting on Vercel/Netlify/GitHub Pages, maximum performance
- **Trade-off**: No dynamic routes at runtime, but project detail pages can be pre-generated

### ADR-002: Framer Motion for All Animations
- **Decision**: Single animation library for parallax, scroll-triggered, and UI animations
- **Rationale**: Consistent API, performant, supports reduced motion, layout animations
- **Trade-off**: Bundle size (~50KB), but tree-shaking helps

### ADR-003: Custom Parallax Implementation
- **Decision**: Build custom parallax using `useScroll` hook + Framer Motion `useTransform`
- **Rationale**: Full control over layer speeds, directions, and responsiveness
- **Alternative considered**: react-parallax-tilt, simple-parallax (too limited)

### ADR-004: Content as TypeScript Modules (Not CMS)
- **Decision**: Project/process data in `.ts` files with strict types
- **Rationale**: Type safety, version controlled, no external dependency, fast builds
- **Trade-off**: Content updates require code deployment

### ADR-005: Tailwind CSS with Design Tokens
- **Decision**: Custom theme extending Tailwind with forest/nature color palette
- **Rationale**: Consistent design system, easy theming, small production CSS

## Component Architecture

### ParallaxForest (Hero)
```typescript
// Layers (back to front):
// 1. Sun (slowest, scale on scroll)
// 2. Mountains (slow, translateY)
// 3. Clouds ×3 (medium, translateX alternating)
// 4. Forest layers ×4 (fast, translateY + opacity)
// 5. Foreground trees (fastest, scale + rotate)
// 6. Headline (pin on scroll, then fade)
```

### Section Components
Each section is a self-contained component with:
- Own animation variants
- IntersectionObserver triggers
- Responsive breakpoints
- Accessibility attributes

### Data Flow
```
src/data/projects.ts → ProjectsSection → ProjectCard[] → ProjectDetail page
src/data/process.ts  → ProcessSection → ProcessStep[]
src/data/site.ts     → Layout (Header, Footer) + SEO metadata
```

## Performance Strategy

1. **Images**: Next/Image with `priority` for hero, lazy for others, WebP/AVIF
2. **Fonts**: `next/font` with `display: swap`, preload critical
3. **Code Splitting**: Automatic via App Router, dynamic imports for heavy components
4. **CSS**: Tailwind JIT → minimal CSS (~10KB gzipped)
5. **JS**: Framer Motion tree-shaken, only import used features
6. **Caching**: Static export → immutable assets, long-term caching

## Accessibility Architecture

- Semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- Heading hierarchy: h1 (hero) → h2 (section titles) → h3/h4 (subsections)
- Focus management: visible focus rings, skip links
- ARIA: `aria-label` on icon buttons, `role="img"` on decorative images
- Reduced motion: `prefers-reduced-motion` disables parallax/animations
- Color contrast: Forest palette tested for 4.5:1 minimum

## SEO Architecture

- Dynamic metadata per page via `generateMetadata`
- Open Graph + Twitter cards
- JSON-LD structured data (Person, WebSite, Portfolio)
- Sitemap.xml auto-generated
- Robots.txt
- Canonical URLs

## Security Considerations

- No user input processing (static site)
- Contact form → Formspree/EmailJS (client-side only)
- No authentication, no secrets in client bundle
- CSP headers via `next.config.js`
- External links: `rel="noopener noreferrer"`

## Deployment Pipeline

```
push to main
  → GitHub Actions (CI)
      → npm ci
      → npm run lint
      → npm run typecheck
      → npm run test
      → npm run build
  → Vercel Preview Deploy
  → Manual promotion to Production
  → Canary monitoring (health checks)
```

## Monitoring & Observability

- Vercel Analytics (Web Vitals)
- Sentry (error tracking) - optional for static site
- Lighthouse CI in PR checks
- Bundle size tracking