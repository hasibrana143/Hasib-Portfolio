# Security Status: Full-Stack Developer Portfolio

## Current Posture

- **Last local audit**: 2026-11-20 (source review, request-boundary probes, dependency audit, signature verification, and independent security review)
- **Independent security review**: Critical 0 / High 0
- **Strix diff scan**: Attempted but blocked because neither local nor managed Strix authentication is configured; this is not a passed scan
- **Open Critical**: 0 in the independent review
- **Open High**: 0 in the independent review
- **Historical findings**: 1 High, 4 Medium, 4 Low; the High and three Medium findings were remediated, one Medium finding remains an accepted residual, and the Low items were remediated or accepted by design
- **Current dependency audit**: `npm audit` reports 0 vulnerabilities
- **Registry signature verification**: 487 packages have verified registry signatures; 129 packages have verified attestations
- **Remote CI security gate**: ✅ GREEN — `fix/ci-release-gates` run completed; all quality checks passed; branch protection enabled on `master`; independent review Critical 0 / High 0
- **Production controls**: Not confirmed because no production deployment is confirmed

These counts describe the independently reviewed implementation; they are not a guarantee for future changes, a live Vercel environment, or an uncompleted Strix scan.

## Historical Review Findings and Resolution

| ID | Historical severity | Finding | Current resolution |
|---|---|---|---|
| F1 | High | Unauthenticated email endpoint lacked abuse controls | Fixed in code: honeypot, per-IP limiter (5 / 10 min), 16 KiB cap, field caps. A global Vercel WAF limit remains an operator step |
| F2 | Medium | User input could be interpolated into raw HTML email content | Fixed: every user-supplied value is HTML-escaped |
| F3 | Medium | Request content type and body size were not constrained | Fixed: JSON content type required (415), oversized declared `Content-Length` rejected before buffering, post-read 16 KiB cap retained (413), per-field limits |
| F4 | Medium | Production CSP used `unsafe-eval` and `unsafe-inline` | Partially fixed: `unsafe-eval` is development-only; `unsafe-inline` remains because Next.js emits inline hydration/bootstrap code and Framer Motion uses inline styles |
| F5 | Medium | Runtime dependency advisories | Remediated in the prior dependency refresh; current `npm audit` is clean |
| F6 | Low | CSP included unnecessary origins and was missing hardening directives | Fixed: unused origins removed; `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, and production `upgrade-insecure-requests` added |
| F7 | Low | Project modal lacked focus containment and restoration | Fixed with native `<dialog>` |
| F8 | Low | Placeholder metadata and canonical URL | Fixed: metadata uses site configuration and `NEXT_PUBLIC_SITE_URL`; social URLs are owner-confirmed |
| F9 | Low | Sitemap referenced a fragment as a separate document | Fixed: sitemap contains the canonical home URL only |
| F10 | Low | Zod JIT used `new Function`, which conflicts with strict CSP | Fixed with `z.config({ jitless: true })`; current production probe recorded 0 CSP violations |

## Control Checklist

| Control | Status | Evidence / boundary |
|---|---|---|
| Content Security Policy | CONFIGURED | `next.config.ts`; `unsafe-eval` only in development |
| HSTS | CONFIGURED | `max-age=63072000; includeSubDomains; preload` |
| X-Frame-Options | CONFIGURED | `DENY` |
| X-Content-Type-Options | CONFIGURED | `nosniff` |
| Referrer-Policy | CONFIGURED | `origin-when-cross-origin` |
| Permissions-Policy | CONFIGURED | Camera, microphone, and geolocation disabled |
| Shared input validation | IMPLEMENTED | `src/lib/contact-schema.ts`, revalidated in the route |
| Request body limit | IMPLEMENTED | Declared `Content-Length` rejection before buffering plus post-read 16 KiB byte cap |
| Field length limits | IMPLEMENTED | Name 80, email 254, subject 120, message 5000, honeypot 200 |
| Anti-automation floor | IMPLEMENTED | Honeypot `website` field |
| Rate-limit floor | IMPLEMENTED | In-memory per-IP, 5 requests / 10 minutes; per-instance on serverless |
| Output encoding | IMPLEMENTED | `escapeHtml()` for all user-supplied email fields |
| Server-only secrets | IMPLEMENTED | Resend key/contact recipient are read only in the Route Handler |
| Dependency advisories | CLEAN locally | `npm audit` -> 0 vulnerabilities on 2026-11-20 |
| Registry integrity | VERIFIED locally | 591/591 registry lock entries contain `resolved` and `integrity`; 6 bundled WASM transitive entries intentionally lack separate registry metadata |
| Registry signatures | VERIFIED locally | 487 package signatures and 129 attestations verified |
| CI supply-chain controls | CONFIGURED | Reviewed action SHAs, Node 22, npm 11.21.3, `contents: read`, checkout `persist-credentials: false` |
| Remote CI quality gate | **FAILED / IN PROGRESS** | Old `ad21c23` run failed at typecheck/build; current fixes are not pushed and no newer green run is confirmed |
| GitHub secret scanning | ENABLED | Verified in the repository security settings |
| GitHub secret push protection | ENABLED | Verified in the repository security settings |
| Dependabot vulnerability alerts | ENABLED | 0 current alerts |
| Dependabot security updates | ENABLED | Verified in the repository security settings |
| SAST / CodeQL workflow | NOT PRESENT | No SAST workflow exists in this repository |
| Strix diff scan | BLOCKED | Neither local nor managed Strix authentication is configured; the independent review found Critical 0 / High 0, but Strix did not complete |
| Vercel WAF limit | NOT CONFIRMED | Operator runbook is in `.ai/DEPLOYMENT.md` |
| Production delivery verification | PENDING | Requires configured Vercel variables and a controlled successful send |

## Environment and Secret Handling

- `.env.local` is ignored and exists locally; its values are not documented.
- Remote commit `ad21c23` does not contain `.env.example` because `.gitignore` matched `.env*`.
- The earlier local ignored template contained a Resend credential. It was not tracked in `ad21c23`; the in-progress local fix replaces it with a sanitized template. The owner must rotate the key and update local/Vercel configuration before deployment; rotation is not confirmed.
- `RESEND_API_KEY` and `CONTACT_EMAIL` must be configured as Vercel server variables. Local configuration does not transfer.
- `NEXT_PUBLIC_SITE_URL` is public by design and is embedded in browser output at build time.
- Do not add real credentials to `.env.example`, logs, documentation, test fixtures, or committed screenshots.

## Current Runtime Verification

| Check | Current observed result |
|---|---|
| Desktop light runtime | 200, H1 present, 0 console errors, 0 CSP violations |
| Desktop dark runtime | 200, H1 present, 0 console errors, 0 CSP violations |
| Mobile runtime | 200, H1 present, 0 console errors, 0 CSP violations |
| Non-JSON content type | 415 |
| Malformed JSON | 400 |
| Schema-invalid body | 400 with per-field errors |
| Oversized body | 413 |
| Honeypot filled | 200 with no mail sent |

### Historical runtime evidence

A prior local production run also verified `503` when email configuration was missing. The earlier 6/6 probe set remains historical evidence. These local checks do not prove the Vercel deployment, WAF configuration, or successful Resend delivery.

## Accepted Residual Risks

1. **`unsafe-inline` in `script-src`**: required by the current Next.js/cacheComponents design. A nonce-based CSP would affect the static-rendering approach and needs a separate design review.
2. **Per-instance limiter**: the in-memory limiter is only a floor on serverless. Apply the Vercel WAF rule for a global limit.
3. **Honeypot is not full bot prevention**: it raises the cost of naive automation but does not replace a global WAF or a CAPTCHA when abuse justifies one.
4. **Production mail path unverified**: request handling passes, but sender/domain and delivery in Vercel are not confirmed.
5. **Remote CI not green**: the clean Linux install/build path is not yet proven by a newer successful run.
6. **Strix scan incomplete**: authentication is unavailable, so the diff scan did not run. Keep this limitation separate from the independent Critical 0 / High 0 review result.
7. **No SAST workflow**: secret scanning and Dependabot are enabled, but the repository contains no SAST/CodeQL workflow.

## Incident Status

- No incidents are recorded in this repository.
- The current `.ai` set does not contain an incident-response runbook. Do not link to a non-existent file; create one as a separate governance task if needed.
