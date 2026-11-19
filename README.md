# Hasib Rana — Portfolio

A single-page personal portfolio built with **Next.js 16.4.6 (App Router)**, React 19, TypeScript, Tailwind CSS 4, and Framer Motion. It uses an Editorial Swiss visual system: paper background, warm ink, vermillion accent, hairline rules, and numbered section labels.

Repository: <https://github.com/hasibrana143/Hasib-Portfolio>

> The same GitHub repository was renamed from `Portfolio` to `Hasib-Portfolio`; the old URL redirects. The local checkout in this environment remains `C:\PROJECTS\Portfolio`; the default branch is `master`.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.4.6 (App Router, Turbopack, Cache Components) |
| Language | TypeScript 5, strict mode |
| Styling | Tailwind CSS 4 + CSS custom properties in `src/app/globals.css` |
| Animation | Framer Motion 11 (`LazyMotion` + `domAnimation`) |
| Forms | React Hook Form 7 + Zod 4 |
| Email | Resend 6 through a Next.js Route Handler |
| Unit tests | Vitest 5 |
| Accessibility tests | Playwright 1.65 + axe-core |
| Node.js | 22.x, `>=22.12.0` |

## Getting started

### Clone

```bash
git clone https://github.com/hasibrana143/Hasib-Portfolio.git
cd Hasib-Portfolio
```

An existing local checkout may keep a different folder name; that does not indicate a different repository.

### Install and run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Environment file

A sanitized `.env.example` is tracked. Copy it to create the local environment file:

```bash
cp .env.example .env.local
```

On Windows Command Prompt, use `copy .env.example .env.local`. If an older checkout predates the tracked template, create `.env.local` manually:

```dotenv
RESEND_API_KEY=
CONTACT_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Optional verified sender:
# RESEND_FROM_EMAIL=
```

Do not commit real values. Local environment variables do not transfer to Vercel; configure them again in the deployment environment.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | For working contact delivery | Server-only Resend key used by `/api/contact` |
| `CONTACT_EMAIL` | For working contact delivery | Server-only recipient address; never rendered |
| `NEXT_PUBLIC_SITE_URL` | In production | Canonical origin for metadata, sitemap, robots, and JSON-LD; embedded at build time |
| `RESEND_FROM_EMAIL` | Optional | Verified sender address; defaults to `Portfolio Contact <onboarding@resend.dev>` |

Without `RESEND_API_KEY` or `CONTACT_EMAIL`, the contact endpoint returns `503` with a clear message. It never sends to a placeholder recipient.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Typecheck |
| `npm run test` | Unit tests (Vitest) |
| `npm run test:unit` | Unit-only alias |
| `npm run test:coverage` | Vitest coverage |
| `npm run test:a11y` | Accessibility suite (Playwright + axe-core) |
| `npm run test:e2e` | Playwright suite |
| `npm run test:e2e:ui` | Playwright UI mode |

Lighthouse is not a project dependency or script. Run the pinned audit manually against a running production server:

```bash
npx --yes lighthouse@13.6.0 http://127.0.0.1:3100 --output=json --output-path=.gstack/lh-final-audit.json --chrome-flags="--headless"
```

## Content

Content is stored in typed source files and updated through code review:

| File | Holds |
|---|---|
| `src/data/constants.ts` | Name, role, description, canonical URL, social profile URLs |
| `src/data/projects.ts` | Project index; currently one case study |
| `src/data/skills.ts` | Technologies used by this project, grouped by category |
| `src/components/HomeContent.tsx` | Bio and the single independent role entry |

Current content boundaries:

- The project index contains one case study: this portfolio.
- The technology list is limited to technologies used in this repository; Vercel is labelled as a deployment target.
- The GitHub, LinkedIn, and X URLs are owner-confirmed.
- The contact address is deliberately unpublished; the form is the intended channel.

Project previews live in `public/images/projects/` as 1280×720 SVGs. Add another project by following the existing `Project` shape in `src/types/index.ts` and `src/data/projects.ts`.

## Contact API

`POST /api/contact` accepts JSON with `name`, `email`, `subject`, `message`, and an optional honeypot field named `website`.

```json
{
  "name": "Example Visitor",
  "email": "visitor@example.com",
  "subject": "Project enquiry",
  "message": "A message long enough to satisfy the validation contract."
}
```

The route treats the request as untrusted:

- `Content-Type: application/json` is required
- Request bodies are capped at 16 KiB, with per-field length limits
- The shared Zod schema is revalidated server-side
- The honeypot branch returns success without sending mail
- An in-memory per-IP limiter allows 5 requests per 10 minutes
- User input is HTML-escaped before it reaches the email body
- Missing email configuration returns `503`; delivery failure returns `500`

Expected statuses: `200`, `400`, `413`, `415`, `429`, `500`, and `503`.

The in-memory limiter is per runtime instance on serverless. Apply a Vercel WAF rate limit for the deployed URL; see `.ai/DEPLOYMENT.md`.

## Deploy

Vercel is the intended target, but **no production deployment is currently confirmed**. The candidate URL `https://hasibrana.vercel.app` currently returns HTTP 404.

1. Connect <https://github.com/hasibrana143/Hasib-Portfolio> to a Vercel project.
2. Use `npm run build`, output `.next`, and Node.js 22.x.
3. Rotate the earlier local Resend key, then configure the replacement `RESEND_API_KEY`, `CONTACT_EMAIL`, and the final `NEXT_PUBLIC_SITE_URL` in Vercel.
4. Deploy, then verify `/`, metadata, security headers, and a controlled contact delivery.

### CI status

The remote run for commit `ad21c23` is **failed** because Linux could not resolve case-mismatched UI component imports. The current release branch contains the lowercase filename fix and CI/tooling updates. Check the [GitHub Actions history](https://github.com/hasibrana143/Hasib-Portfolio/actions) for a newer successful run on `master` before treating the branch as releasable.

## Accessibility and performance

Prior local production-build evidence:

- Playwright + axe: **35/35** checks across Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari
- Lighthouse 13.6: **99 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**
- 0 console errors and 0 CSP violations in the prior production probe

These are local historical measurements, not a live-deployment guarantee. Automated axe checks do not replace manual WCAG review.

The home page content is present in the initial HTML, so crawlers and users without JavaScript can read it. Metadata includes canonical/Open Graph/Twitter tags and a JSON-LD `Person` record whose `sameAs` URLs use the owner-confirmed social links.

## Troubleshooting

### `cp .env.example .env.local` fails

The checkout may predate the tracked sanitized template. Update the branch or create `.env.local` manually using the variables above.

### Typecheck/build fails on Linux with `Cannot find module '@/components/ui/button'`

The filename casing does not match the import. Use the lowercase component filenames from the current fix on every platform.

### Contact form returns 503

`RESEND_API_KEY` or `CONTACT_EMAIL` is missing in the active environment. Check Vercel variables and perform a controlled delivery test.

### Production metadata points to localhost

Set `NEXT_PUBLIC_SITE_URL` in Vercel and trigger a new build. Public environment values are embedded at build time.

### `npm run lint` reports generated-code errors locally

Ensure generated or copied build artifacts are outside the repository/ignored path and lint from a clean checkout. The authoritative gate is a clean remote CI run.

## License

No repository license is currently declared. Do not assume permission to copy, modify, or redistribute this project until the owner adds an explicit license.
