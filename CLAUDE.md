# CLAUDE.md - Project Configuration

This file contains project-specific configuration for the gstack autonomous workflow.

## Project Overview
- **Name**: Full-Stack Developer Portfolio
- **Type**: Next.js 15 Web Application
- **Stack**: Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion
- **Package Manager**: npm
- **Node Version**: 20.x

## Commands
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`
- **TypeCheck**: `npx tsc --noEmit`
- **Test**: `npm run test`
- **Test:E2E**: `npm run test:e2e`
- **Test:A11y**: `npm run test:a11y`

## Deploy Configuration (configured by /setup-deploy)
- Platform: vercel
- Production URL: https://your-portfolio.vercel.app
- Deploy workflow: automatic on push to main
- Deploy status command: vercel ls --prod
- Merge method: squash
- Project type: web app
- Post-deploy health check: https://your-portfolio.vercel.app

### Custom deploy hooks
- Pre-merge: npm run build
- Deploy trigger: automatic on push to main
- Deploy status: vercel ls --prod
- Health check: https://your-portfolio.vercel.app

## Environment Variables Required
- `RESEND_API_KEY` - Resend API key for contact form emails
- `CONTACT_EMAIL` - Email address to receive contact form submissions
- `NEXT_PUBLIC_SITE_URL` - Production URL (e.g., https://your-portfolio.vercel.app)

## Quality Gates
- Build must pass
- TypeScript strict mode must pass
- ESLint must pass (0 errors)
- Unit tests must pass
- Accessibility tests must pass (0 critical/high violations)
- Lighthouse Performance >= 90 (production)
- Lighthouse Accessibility = 100
- Lighthouse SEO = 100
- No console errors in production

## Git Workflow
- Main branch: main
- Feature branches: feature/*
- Merge method: squash
- Deploy on merge to main

## Vercel Configuration
- Framework: Next.js
- Build Command: npm run build
- Output Directory: .next
- Install Command: npm install
- Dev Command: npm run dev