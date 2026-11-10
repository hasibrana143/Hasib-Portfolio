# Tasks: CodeMaster-Inspired Portfolio

## Phase 0: Project Setup
- [ ] TASK-001: Initialize Next.js project with TypeScript, Tailwind, ESLint
- [ ] TASK-002: Configure Tailwind theme (colors, fonts, spacing) matching forest aesthetic
- [ ] TASK-003: Set up project structure (components, lib, data, types, hooks)
- [ ] TASK-004: Configure next.config.js (static export, images, fonts)
- [ ] TASK-005: Set up GitHub Actions CI pipeline (lint, typecheck, test, build)

## Phase 1: Core Layout & Navigation
- [ ] TASK-101: Create RootLayout with metadata, fonts, global styles
- [ ] TASK-102: Build Header/Navigation component (logo, links, mobile menu)
- [ ] TASK-103: Build Footer component (CTA, nav, languages, social, copyright)
- [ ] TASK-104: Implement skip link and focus management
- [ ] TASK-105: Add navigation constants and types

## Phase 2: Hero Section (Parallax Forest)
- [ ] TASK-201: Create ParallaxForest component with layer system
- [ ] TASK-202: Source/create forest layer images (sun, mountains, clouds ×3, forest ×4, foreground trees)
- [ ] TASK-203: Implement scroll-based parallax with Framer Motion useTransform
- [ ] TASK-204: Add entrance animations for layers
- [ ] TASK-205: Implement headline pin/fade animation
- [ ] TASK-206: Add reduced motion support (disable parallax)
- [ ] TASK-207: Optimize images (WebP, responsive sizes, priority loading)

## Phase 3: About/CTA Section
- [ ] TASK-301: Create AboutSection component with headline and description
- [ ] TASK-302: Add workspace imagery with forest elements
- [ ] TASK-303: Implement CTA button with scroll-to-contact or link to contact page
- [ ] TASK-304: Add scroll-triggered entrance animation

## Phase 4: Process Section (3 Steps)
- [ ] TASK-401: Create ProcessSection component with data-driven steps
- [ ] TASK-402: Build ProcessStep component (number, title, description, highlights)
- [ ] TASK-403: Add forest decorative elements between steps
- [ ] TASK-404: Implement staggered scroll animations (IntersectionObserver)
- [ ] TASK-405: Create process data file (src/data/process.ts)

## Phase 5: Projects Showcase
- [ ] TASK-501: Create ProjectsSection component
- [ ] TASK-502: Build ProjectCard component (image, title, description, link)
- [ ] TASK-503: Add "Explore more projects" link
- [ ] TASK-504: Create project data file (src/data/projects.ts) with 3 featured projects
- [ ] TASK-505: Implement project image optimization
- [ ] TASK-506: Add hover/tap animations on cards

## Phase 6: Additional Pages
- [ ] TASK-601: Create Discover page (services detail)
- [ ] TASK-602: Create Explore page (project gallery with filtering)
- [ ] TASK-603: Create Contact page (form + info)
- [ ] TASK-604: Create Project Detail pages (dynamic routes for each project)
- [ ] TASK-605: Implement contact form with Formspree integration

## Phase 7: Polish & Quality
- [ ] TASK-701: Run Lighthouse audit, optimize to ≥ 90 all categories
- [ ] TASK-702: Run accessibility audit (axe-core), fix all violations
- [ ] TASK-703: Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] TASK-704: Mobile device testing (iOS Safari, Chrome Android)
- [ ] TASK-705: Add SEO metadata, structured data, sitemap, robots.txt
- [ ] TASK-706: Final code review (lint, typecheck, test all pass)

## Phase 8: Deploy
- [ ] TASK-801: Deploy to Vercel preview
- [ ] TASK-802: Configure custom domain (if applicable)
- [ ] TASK-803: Verify production deployment
- [ ] TASK-804: Set up monitoring (Vercel Analytics)