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
| `NEXT_PUBLIC_GA_ID` | Analytics (optional) | No | Production |

## Deployment Pipeline
1. Push to GitHub → Vercel auto-detects
2. Preview deploy on every PR
3. Merge to `main` → Production deploy
4. Canary monitoring (10 min post-deploy)
5. Health checks: `/`, `/api/health` (if added)

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