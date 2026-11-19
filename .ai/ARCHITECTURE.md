# Architecture: Full-Stack Developer Portfolio

## System Overview

A single-page Next.js 16.4.6 App Router application. The home page is prerendered with Cache Components; client components hydrate for theme switching, motion, project dialogs, and the contact form. The only write endpoint is a dynamic Next.js Route Handler that validates submissions and sends mail through Resend.

Vercel is the intended deployment target, but the current repository does not prove a production deployment.

## Technology Decisions

| Layer | Shipped choice | Rationale / boundary |
|---|---|---|
| Framework | Next.js 16.4.6 App Router, Turbopack | Server-rendered App Router output with Cache Components |
| Caching | `cacheComponents: true`, `partialPrefetching: true` | Static shells and request-time behavior; there is no explicit `revalidate` setting |
| Language | TypeScript 5, strict mode | Shared contracts for data and the contact API |
| Styling | Tailwind CSS 4 + CSS custom properties | Utility styling with project tokens in `src/app/globals.css` |
| Components | Local Radix/shadcn-style primitives | Small owned component set; the repository does not depend on the shadcn CLI/runtime |
| Animation | Framer Motion 11 with `LazyMotion` + `domAnimation` | Tree-shaken animation features and reduced-motion handling |
| Icons | Lucide React | Consistent icon components |
| Forms | React Hook Form 7 + Zod 4 | Shared client/server validation contract |
| Email | Resend 6 through a Route Handler | Server-side delivery; no Server Action is implemented |
| Testing | Vitest 5, Playwright 1.65, axe-core | Seven unit tests across two files, including the oversized `Content-Length` guard, plus automated accessibility checks |
| Package management | npm `11.21.3` | Declared by `packageManager`; CI installs the same version explicitly |
| Deployment | Vercel (intended) | Zero-config target for Next.js; deployment status unconfirmed |

There is no database, authentication layer, CMS, Server Action, middleware, or analytics integration in the current application.

## Runtime Flow

```text
Browser
  ├─ GET /, /_not-found, /opengraph-image, /robots.txt
  │    └─ Prerendered Next.js output -> HTML/CSS/JS -> hydration
  └─ POST /api/contact (application/json)
       ├─ Content-Type check
       ├─ Content-Length rejection before body buffering
       ├─ Per-IP rate-limit check
       ├─ Post-read byte cap
       ├─ Shared Zod schema
       ├─ Honeypot branch
       └─ Resend API -> CONTACT_EMAIL recipient
```

The contact endpoint is request-time by design. `RESEND_API_KEY` and `CONTACT_EMAIL` are server-only variables. `NEXT_PUBLIC_SITE_URL` is embedded into the browser-visible bundle at build time and drives the canonical URL, sitemap, robots metadata, and JSON-LD URL.

## Verified Build Output

The current local `next build` produced:

| Route | Rendering |
|---|---|
| `/` | Static |
| `/_not-found` | Static |
| `/opengraph-image` | Static |
| `/robots.txt` | Static |
| `/api/contact` | Dynamic |
| `/sitemap.xml` | Dynamic |

## Project Structure

```text
src/
├── app/
│   ├── api/contact/route.ts   # Resend-backed contact endpoint
│   ├── globals.css            # Tailwind entry and design tokens
│   ├── layout.tsx             # Metadata, fonts, providers, JSON-LD, shell
│   ├── page.tsx               # Home route
│   ├── opengraph-image.tsx    # Generated 1200x630 PNG
│   ├── robots.ts              # Robots metadata route
│   └── sitemap.ts             # Sitemap metadata route
├── components/
│   ├── HomeContent.tsx        # Bio and experience source
│   ├── layout/                # Header and Footer
│   ├── providers/             # Theme and LazyMotion providers
│   ├── sections/              # Hero, About, Projects, Contact
│   └── ui/                    # Local UI primitives
├── data/
│   ├── constants.ts           # Site configuration and social URLs
│   ├── projects.ts            # Project index
│   └── skills.ts              # Technology groups
├── lib/
│   ├── contact-schema.ts      # Shared Zod contract
│   └── utils.ts               # Class-name helper
└── types/index.ts             # Shared TypeScript types
```

Other shipped areas:

```text
tests/
├── a11y/accessibility.spec.ts   # Playwright + axe suite
└── unit/
    ├── contact-route.test.ts    # Oversized Content-Length guard
    └── utils.test.ts            # Vitest unit suite
public/images/projects/         # Project preview assets
.github/workflows/ci.yml        # Quality and accessibility jobs
.ai/                             # Project governance and release state
```

## Content Architecture

- Site configuration, projects, and skills are typed TypeScript data files.
- Bio and experience copy are constants in `src/components/HomeContent.tsx`.
- The project index currently contains one case study: this repository.
- Category filters are derived from the project data and are hidden when only one category exists.
- Project previews are stored under `public/images/projects/`; the current preview is SVG.
- There is no CMS. Content changes are source changes and require review.

Social URLs are owner-confirmed: GitHub `hasibrana143`, LinkedIn `hasib-rana-199147367`, and X `@hasib_rana76829`. The technology list is limited to technologies used by this project, with Vercel labelled as a deployment target.

## Contact API Contract

**Endpoint**: `POST /api/contact`

**Request body**:

```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "website": "optional honeypot string"
}
```

**Responses**:

| Status | Condition |
|---|---|
| `200` | Resend accepted the message, or honeypot submission silently accepted without delivery |
| `400` | Invalid JSON or schema validation failure |
| `413` | Declared `Content-Length` exceeds 16 KiB, or the buffered body exceeds the post-read byte cap |
| `415` | Content-Type is not `application/json` |
| `429` | Per-IP in-memory rate limit exceeded |
| `500` | Resend or unexpected server error |
| `503` | `RESEND_API_KEY` or `CONTACT_EMAIL` is not configured |

The in-memory limiter is per runtime instance, not a globally shared limit.

## Security Architecture

- CSP and standard response headers are configured in `next.config.ts`.
- Production CSP excludes `unsafe-eval`; `unsafe-inline` remains because Next.js emits inline hydration/bootstrap code.
- Client and server share `src/lib/contact-schema.ts`.
- The route enforces content type, rejects an oversized declared `Content-Length` before reading the body, and retains a byte-length check after reading.
- The honeypot accepts a bot submission without sending mail.
- User-supplied values are HTML-escaped before interpolation into the email body.
- The route uses a per-IP in-memory limiter (5 requests / 10 minutes); a Vercel WAF limit is recommended but not confirmed as applied.
- Server-only Resend variables are not imported by client components.

## CI and Dependency Boundaries

- GitHub Actions are pinned to reviewed commit SHAs.
- Both jobs use Node.js 22 and install `npm@11.21.3` explicitly.
- Workflow permissions are limited to `contents: read`, and checkout uses `persist-credentials: false`.
- The lockfile contains 591 registry packages, all 591 with both `resolved` metadata and `integrity` metadata.
- Six bundled WASM transitive entries intentionally have no separate registry metadata.
- Linux `lightningcss` gnu/musl variants and Linux Next.js SWC variants are present in the lockfile.
- Lighthouse is not a saved project dependency. Use the manually pinned `npx --yes lighthouse@13.6.0` command in `README.md` for an ad hoc production audit.

## Performance, Accessibility, and SEO

- Static imports are intentional: page content appears in the initial HTML and does not wait for a lazy section chunk.
- `next/font` downloads and self-hosts optimized font files during the build.
- The hero entrance uses transforms rather than an initial opacity fade.
- A CSS `@media (scripting: none)` safety net exposes content when JavaScript is unavailable.
- The project dialog uses native `<dialog>` for focus containment and Escape handling.
- Current automated accessibility evidence is 35/35 Playwright/axe checks across five browser profiles; this is not a claim of complete manual WCAG conformance.
- Current local production Lighthouse evidence is 99 Performance / 100 Accessibility / 100 Best Practices / 100 SEO. The ignored report is `.gstack/lh-final-audit.json`.

## Deployment Boundary

The application is deployable as a standard Next.js build (`npm run build`, output `.next`). Deployment-specific steps and the current release blocker are documented in `.ai/DEPLOYMENT.md`.
