# Deployment: Full-Stack Developer Portfolio

## Current Status

- **Production deployment**: Not confirmed
- **Production URL / domain**: Unknown. The candidate URL `https://hasibrana.vercel.app` currently returns HTTP 404 and is not a usable deployment.
- **Deployment target**: Vercel
- **GitHub repository**: <https://github.com/hasibrana143/Hasib-Portfolio>
- **Repository rename**: The same GitHub repository was renamed from `Portfolio` to `Hasib-Portfolio`; the old URL redirects. It is not a new repository.
- **Local checkout**: `C:\PROJECTS\Portfolio` (the local folder was not moved)
- **Active branch**: `master`
- **CI workflow triggers**: pushes and pull requests targeting `main` or `master`; the repository's active branch is `master`

Do not mark deployment complete until a Vercel URL, environment configuration, live health check, and contact-delivery check are recorded.

## Release Blocker: Remote CI

The latest confirmed remote run is for commit `ad21c23` and is **failed**:

- Run: <https://github.com/hasibrana143/Hasib-Portfolio/actions/runs/44557145778>
- Quality job: typecheck failed; lint, unit tests, and build were skipped
- Accessibility job: production build failed; the accessibility suite was skipped
- Verified root cause: Linux could not resolve imports such as `@/components/ui/button` because the tracked UI files used different filename casing

A local fix renames the affected component files and updates CI/tooling. The current fixes are not pushed, and no newer green remote run is confirmed. This old failed run is the sole CI blocker until a newer run succeeds. **Do not describe remote CI as green until that run is explicitly confirmed.**

The current workflow hardens its supply-chain boundary:

- Actions are pinned to reviewed commit SHAs.
- Node.js 22 is used, and npm is pinned to `11.21.3`.
- Workflow permissions are limited to `contents: read`.
- Checkout uses `persist-credentials: false`.

The lockfile contains 591 registry packages, all with `resolved` and `integrity` metadata. Six bundled WASM transitive entries intentionally lack separate registry metadata. Linux `lightningcss` gnu/musl and Linux Next.js SWC entries are present.

## Environment Variables

Local `.env.local` configuration exists and is ignored by Git. Its values are intentionally not documented. The same variables must be configured in Vercel; local files do not transfer to the deployment environment.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes for working contact delivery | Server-only Resend API key |
| `CONTACT_EMAIL` | Yes for working contact delivery | Server-only recipient address; never rendered |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Canonical origin for metadata, sitemap, robots, and JSON-LD; embedded at build time |
| `RESEND_FROM_EMAIL` | No | Verified Resend sender; code falls back to `Portfolio Contact <onboarding@resend.dev>` |

Do not use the fallback sender as a production deliverability guarantee. Do not commit real values.

### `.env.example` Status

At remote commit `ad21c23`, `.env.example` is absent because `.gitignore` matched `.env*`; the README's `cp .env.example .env.local` instruction therefore fails on that checkout. A sanitized `.env.example` and a `!.env.example` exception exist in the local in-progress fix. After that fix is committed, copy the template and fill it locally. If the template is still absent, create `.env.local` manually with the variable names above.

## Build Configuration

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Package manager | npm `11.21.3` |
| Install | `npm install` (CI uses `npm ci`) |
| Build command | `npm run build` |
| Start command | `npm run start` |
| Output | `.next` |
| Node.js | 22.x, `>=22.12.0` |

The application is not configured for `output: "export"`; the contact Route Handler requires a server-capable deployment.

## Vercel Setup (Not Yet Confirmed)

1. Connect the existing GitHub repository <https://github.com/hasibrana143/Hasib-Portfolio> to a Vercel project.
2. Keep the production branch as `master`.
3. Use the build settings above and Node.js 22.x.
4. Rotate the Resend key that appeared in the earlier local ignored template, then add the replacement `RESEND_API_KEY`, `CONTACT_EMAIL`, and the final `NEXT_PUBLIC_SITE_URL` to the Vercel project variables. Add `RESEND_FROM_EMAIL` if a verified sender is available.
5. Deploy and record the resulting production URL.
6. Rebuild after changing `NEXT_PUBLIC_SITE_URL`; public environment values are embedded during the build.

A Vercel connection may be configured outside the repository, but no such configuration or successful deployment has been confirmed here.

## Post-Deploy Operator Steps

The in-memory contact limiter is per-instance on serverless. Apply a Vercel WAF rate limit for the deployed URL as the authoritative global limit. Example:

```bash
vercel firewall rules add "Rate limit contact" \
  --condition '{"type":"path","op":"eq","value":"/api/contact"}' \
  --condition '{"type":"method","op":"eq","value":"POST"}' \
  --action rate_limit \
  --rate-limit-window 600 \
  --rate-limit-requests 5 \
  --rate-limit-keys ip \
  --yes
```

GitHub secret scanning, secret push protection, Dependabot vulnerability alerts, and Dependabot security updates are enabled for this repository. Dependabot currently reports 0 alerts.

## Live Verification Checklist

After a new remote CI run is green and a Vercel deployment exists:

- [ ] `GET /` returns HTTP 200 over HTTPS
- [ ] Canonical URL and JSON-LD `url` use the production origin, not `http://localhost:3000`
- [ ] `/sitemap.xml` and `/robots.txt` use the production origin
- [ ] Security headers include CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`
- [ ] Light and dark themes render without console errors
- [ ] Mobile navigation and native project dialog work by keyboard
- [ ] A controlled contact submission returns 200 and reaches the intended recipient
- [ ] WAF rate limit is active
- [ ] Canary monitoring records no console errors, failed critical requests, or CWV regression

## Rollback

After the first successful deployment, use the Vercel dashboard's deployment promotion/recovery controls to restore the last known-good deployment. A rollback target and recovery time cannot be claimed until at least one deployment and one prior good deployment exist.

## Troubleshooting

### Build or typecheck fails on Linux with `Cannot find module '@/components/ui/button'`
The checkout contains files whose names differ in case from their imports. Use the lowercase component filenames from the current fix and verify the imports match exactly. This was the verified `ad21c23` CI failure.

### `cp .env.example .env.local` says the source file is missing
The remote commit predates the sanitized-template fix. Create `.env.local` manually with the variables in this document, or pull a commit that includes `.env.example`.

### Contact endpoint returns 503
`RESEND_API_KEY` or `CONTACT_EMAIL` is missing in the active environment. Confirm both values in Vercel, rebuild if needed, and repeat a controlled delivery test.

### Contact endpoint returns 429
The per-IP limiter or WAF rule rejected the request. Confirm the client IP headers and wait for the 10-minute window; do not disable the protection to make a test pass.

### Production metadata points to localhost
`NEXT_PUBLIC_SITE_URL` was absent or wrong at build time. Set it in Vercel and trigger a new build.

### Deployment succeeds but the form cannot send
Confirm the Resend sender/domain, `RESEND_FROM_EMAIL`, recipient address, and Resend account status. A 200 from the honeypot branch proves request handling, not mail delivery.
