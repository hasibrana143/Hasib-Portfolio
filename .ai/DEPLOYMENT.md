# Deployment: Full-Stack Developer Portfolio

## Target Platform
- **Primary**: Vercel (Edge Network)
- **Domain**: TBD (custom or `*.vercel.app`)
- **Region**: Auto (Vercel selects closest)

## Environments
| Environment | URL | Branch | Purpose |
|-------------|-----|--------|---------|
| Production | TBD | `main` | Live site |
| Preview | `*.vercel.app` | PR branches | Review/QA |
| Development | `localhost:3000` | Local | Development |

## Build Configuration
```bash
# Build command
npm run build

# Output directory
.next

# Node version
20.x (Vercel default)
```

## Environment Variables
| Variable | Description | Required | Scope |
|----------|-------------|----------|-------|
| `RESEND_API_KEY` | Email sending | Yes | Production, Preview |
| `CONTACT_EMAIL` | Recipient email | Yes | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL | Yes | All |
| `RESEND_FROM_EMAIL` | Verified sender address | No | Production, Preview |
| `NEXT_PUBLIC_GA_ID` | Analytics (optional) | No | Production |

## Post-Deploy Operator Steps
The application rate limiter is in-memory and therefore per-instance on serverless. Apply the Vercel WAF rate limit for the deployed URL — this is the authoritative global limit:

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

Vercel counts these per region, so a distributed flood can exceed the aggregate. If that matters, add the Vercel Firewall SDK or a shared store later.

Also enable GitHub secret scanning and Dependabot on the repository.

## Deployment Pipeline
1. Push to GitHub → Vercel auto-detects
2. Preview deploy on every PR
3. Merge to `main` → Production deploy
4. Canary monitoring (10 min post-deploy)
5. Health checks: `GET /` returns 200

## Rollback
- Vercel Dashboard → Deployments → Promote previous
- Or: `vercel rollback` CLI
- Target: < 5 min recovery

## Health Checks
- **Liveness**: `GET /` returns 200
- **Readiness**: `GET /api/health` returns 200 (future)
- **Canary**: 0 console errors, CWV within budget

## DNS / Domain (When Ready)
- A record → `76.76.21.21` (Vercel)
- CNAME `www` → `cname.vercel-dns.com`
- SSL: Automatic (Let's Encrypt via Vercel)