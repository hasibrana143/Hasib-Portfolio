# Deployment Configuration

## Target Platform
- **Platform**: Vercel
- **Project Name**: codemaster-portfolio (TBD)
- **Framework Preset**: Next.js (Static Export)
- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Install Command**: `npm ci`

## Environment Variables

| Variable | Preview | Production | Description |
|----------|---------|------------|-------------|
| NEXT_PUBLIC_SITE_URL | `https://preview-xxx.vercel.app` | `https://codemaster.be` | Canonical site URL |
| FORMSPREE_ENDPOINT | `https://formspree.io/f/xxx` | `https://formspree.io/f/xxx` | Contact form endpoint |
| NEXT_PUBLIC_GA_ID | - | `G-XXXXXXXXXX` | Google Analytics (optional) |

## Vercel Configuration

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": "nextjs",
  "installCommand": "npm ci",
  "devCommand": "npm run dev",
  "regions": ["iad1"],
  "functions": {},
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/sitemap.xml", "destination": "/sitemap.xml" },
    { "source": "/robots.txt", "destination": "/robots.txt" }
  ]
}
```

## Deployment Pipeline

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: out/

  deploy-preview:
    needs: ci
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: build-output
          path: out/
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod=false'

  deploy-production:
    needs: ci
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: build-output
          path: out/
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod=true'
```

## Health Checks

| Check | Endpoint | Expected | Frequency |
|-------|----------|----------|-----------|
| Homepage | `/` | 200 OK, < 2s | Every deploy |
| Contact | `/contact` | 200 OK | Every deploy |
| Explore | `/explore` | 200 OK | Every deploy |
| Sitemap | `/sitemap.xml` | 200 OK, valid XML | Every deploy |
| Robots | `/robots.txt` | 200 OK | Every deploy |

## Rollback Procedure
1. Vercel Dashboard → Deployments
2. Select previous successful deployment
3. Click "Promote to Production"
4. Verify health checks pass
5. Update DNS if custom domain changed

## Custom Domain Setup (When Ready)
1. Add domain in Vercel Project Settings → Domains
2. Configure DNS:
   - A record: `@` → `76.76.21.21` (Vercel Anycast)
   - CNAME: `www` → `cname.vercel-dns.com`
3. Verify SSL certificate (auto-provisioned)
4. Update `NEXT_PUBLIC_SITE_URL` env variable