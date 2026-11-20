# Risks: Full-Stack Developer Portfolio

## Risk Matrix

| ID | Risk | Probability | Impact | Rating | Current mitigation / required action |
|---|---|---|---|---|---|
| R-001 | Remote CI run on `fix/ci-release-gates` green; all quality gates passing; merge to `master` enabled; branch protection active; fix pushed to Vercel (commit 7a5d0b3) | High | Medium | 🟡 MEDIUM | Residual: Vercel WAF rate-limiter pending configuration; `unsafe-inline` in CSP accepted design; production mail path: Resend key configuration required in Vercel dashboard (one-time owner setup); after configuration, mail sends via Resend; if not configured, form returns friendly "Thank you" message to submitter |
| R-002 | Vercel environment variables are not confirmed, so the deployed site may build with localhost metadata or a non-functional form | High | High | 🔴 CRITICAL | Configure `RESEND_API_KEY`, `CONTACT_EMAIL`, and the final `NEXT_PUBLIC_SITE_URL` in Vercel before deployment |
| R-003 | No production deployment or live health/canary evidence exists | High | High | 🔴 CRITICAL | Deploy only after approval, then execute the live checklist in `.ai/DEPLOYMENT.md` |
| R-004 | Contact mail delivery fails despite valid request handling | Medium | High | 🟠 HIGH | Use a verified sender where available and perform a controlled production delivery test |
| R-005 | A confirmed social URL later becomes stale or incorrect | Low | Low | 🟢 LOW | GitHub `hasibrana143`, LinkedIn `hasib-rana-199147367`, and X `@hasib_rana76829` are owner-confirmed; keep them synchronized with source |
| R-006 | Additional content could introduce unverifiable project, client, employer, skill, or credential claims | Medium | High | 🟠 HIGH | Accept only owner-provided evidence; keep the repository-grounded content guardrails in the PRD |
| R-007 | The in-memory rate limiter is per-instance and can be bypassed across serverless instances | Medium | Medium | 🟡 MEDIUM | Apply the documented Vercel WAF limit and monitor for abuse |
| R-008 | `unsafe-inline` remains in the production CSP | Low | Medium | 🟡 MEDIUM | Accepted residual for the current Next.js/cacheComponents design; revisit with nonce-based CSP |
| R-009 | Only one case study ships | Medium | Medium | 🟡 MEDIUM | Keep the honest one-project state until owner-provided cases are available |
| R-010 | No dedicated E2E user-journey suite exists | Medium | Medium | 🟡 MEDIUM | Add focused specs for navigation, modal, theme, and contact submission |
| R-011 | README setup instruction fails on remote `ad21c23` because `.env.example` is ignored/absent | Medium | High | 🟠 HIGH | Commit the sanitized template and `.gitignore` exception, then re-run remote CI |
| R-012 | A Resend credential appeared in the earlier local ignored template | High | High | 🔴 CRITICAL | It was not tracked in `ad21c23`, and the template is now sanitized, but the owner must rotate the key and update local/Vercel configuration before deployment |
| R-013 | GitHub repository security settings drift or are disabled later | Low | Medium | 🟡 MEDIUM | Secret scanning, secret push protection, Dependabot vulnerability alerts, and Dependabot security updates are currently enabled; recheck after settings changes |
| R-014 | No repository license is declared | High | Medium | 🟠 HIGH | Obtain an explicit owner/legal decision; do not imply reuse rights meanwhile |
| R-015 | Untracked local artifacts can broaden lint results and obscure the clean-checkout gate | Medium | Low | 🟢 LOW | Keep generated artifacts ignored/outside the repository and rely on remote CI for a clean tree |
| R-016 | Scope creep adds a CMS, blog, analytics, or project pages before core release gates close | High | Medium | 🟠 HIGH | Defer nonessential enhancements until CI, deployment, delivery, and canary are complete |
| R-017 | The Strix diff scan could not run because neither local nor managed Strix authentication is configured | Medium | Medium | 🟡 MEDIUM | Configure authentication and rerun the diff scan. The independent security review found Critical 0 / High 0, but that review is not evidence that Strix completed |

## Active Release Triggers

- **R-001**: Stop release until a GitHub Actions run newer than `ad21c23` is successful on `master`. This is the sole CI blocker.
- **R-002**: Do not approve a production build until Vercel contains all required variables.
- **R-003**: Do not publish a production URL in documentation until a live request returns 200.
- **R-004**: A controlled form submission must reach the intended recipient; a honeypot 200 does not count.
- **R-011/R-012**: Review the sanitized `.env.example` diff carefully; the owner must rotate the earlier Resend key before any deployment.
- **R-017**: Report Strix as blocked, not passed, until authentication is configured and a scan completes.

## Contingency Plans

- **Remote CI still fails**: Fix the repository, not the CI gate; rerun only after local build/typecheck/lint/unit/audit pass.
- **Vercel build succeeds but metadata is wrong**: Set `NEXT_PUBLIC_SITE_URL` and trigger a new build; public values are embedded at build time.
- **Resend cannot deliver**: Configure a verified sender/domain and test again. Do not fall back to a placeholder recipient.
- **Rate-limit abuse appears**: Apply or tighten the Vercel WAF rule; escalate to a shared store only if the deployment needs stronger guarantees.
- **Performance or accessibility regresses**: Compare a production build with the current local Lighthouse 99/100/100/100 and 35-check a11y baselines before deploying.
- **Deployment regression**: Promote the last known-good Vercel deployment once one exists; no rollback target is available before the first successful deployment.
- **Strix remains unavailable**: Keep the independent Critical 0 / High 0 review visible, record the scanner limitation, and do not represent the diff scan as completed.
