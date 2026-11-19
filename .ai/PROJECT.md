# Project: Full-Stack Developer Portfolio

## Repository Identity
- **Project**: Hasib Rana — Full-Stack Developer Portfolio
- **GitHub**: <https://github.com/hasibrana143/Hasib-Portfolio>
- **Repository history**: The same GitHub repository was renamed from `Portfolio` to `Hasib-Portfolio`; the old URL redirects. This is not a new repository.
- **Local checkout**: `C:\PROJECTS\Portfolio` (the local folder name did not change)
- **Active branch**: `master`
- **Package manager**: npm, pinned by `packageManager` to `npm@11.21.3`

## Classification
- **Type**: Public, single-page personal portfolio
- **Framework**: Next.js 16.4.6 App Router with Turbopack, `cacheComponents`, and partial prefetching
- **Language**: TypeScript 5 in strict mode
- **UI**: React 19.3, Tailwind CSS 4, local Radix/shadcn-style primitives, Framer Motion 11 (`LazyMotion`)
- **Backend**: One Next.js Route Handler at `POST /api/contact`, backed by Resend
- **Data**: Typed TypeScript content files; no database and no CMS
- **Authentication**: None
- **Testing**: Vitest 5 unit tests (7 tests across 2 files, including the oversized `Content-Length` guard); Playwright 1.65 + axe-core accessibility suite
- **Deployment target**: Vercel is the intended target; no production deployment is confirmed

## Runtime and Toolchain
- **Node.js**: 22.x, `>=22.12.0` (`package.json` engine target)
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Typecheck**: `npx tsc --noEmit`
- **Lint**: `npm run lint`
- **Unit tests**: `npm run test`
- **Accessibility tests**: `npm run test:a11y`
- **Dependency audit**: `npm audit` and `npm audit signatures`
- **Lighthouse**: No project script or dependency is saved. Use the manually pinned `npx --yes lighthouse@13.6.0` command documented in `README.md` against a running production server.

## Goals
- Present a fast, accessible, server-rendered portfolio
- Show work that can be verified in this repository rather than invented case studies
- Provide a validated contact path without publishing a contact address
- Keep content edits small, typed, and version-controlled
- Gate releases with typecheck, lint, unit tests, build, accessibility checks, and remote CI

## Audience
- Visitors evaluating the developer's work
- Recruiters and collaborators looking for a concise technical profile
- The repository owner, who maintains content and release settings

## Current Shipped Content
- One case study: this portfolio, with implementation details verifiable in the repository
- One non-employer experience entry: Full-Stack Developer / Independent / Current
- A skills list limited to technologies used by this project, plus Vercel explicitly labelled as a deployment target
- Owner-confirmed social links: GitHub `hasibrana143`, LinkedIn `hasib-rana-199147367`, and X `@hasib_rana76829`
- A contact form that sends through Resend only when server-side environment variables are configured

## Constraints
- Node.js 22.12 or newer is required by the test toolchain
- Production environment variables must be configured in Vercel; local `.env.local` configuration does not carry over automatically
- The only confirmed remote CI run is the failed `ad21c23` run; the current fixes are local and not pushed, so a newer green remote run is required before release
- Contact delivery has not been verified against the intended production configuration
- The Resend key that appeared in the earlier local ignored template requires owner rotation before deployment
- No repository license has been declared; do not imply reuse rights without an explicit owner/legal decision
