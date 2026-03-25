# Voicify Website Rebuild — Product Requirements Document

## Overview

**Project:** Complete website rebuild for Voicify, a Voice AI platform serving restaurants, healthcare, hotels, and automotive industries.

**Problem:** The current WordPress/Divi website is technically outdated, compromised with spam link injections, and does not reflect the premium, cutting-edge nature of Voicify's Voice AI products.

**Solution:** A modern, high-performance marketing website built with Next.js 16, Sanity CMS, and Tailwind CSS 4, deployed on Vercel. The rebuild preserves all existing content and information architecture while dramatically elevating the visual design, code quality, and developer experience.

**Scope:** This is a design and development exercise, not a content rewrite. All page content, CTAs, and navigation structure from voicify.com are preserved.

---

## Tech Stack

| Layer             | Technology                       | Version               |
| ----------------- | -------------------------------- | --------------------- |
| Framework         | Next.js (App Router)             | 16.x                  |
| Runtime           | React                            | 19.x                  |
| Language          | TypeScript                       | 5.9+                  |
| Styling           | Tailwind CSS                     | 4.x                   |
| Bundler           | Turbopack                        | Default in Next.js 16 |
| Component Library | shadcn/ui (custom dark theme)    | Latest                |
| Animation         | Framer Motion                    | 12.x                  |
| Icons             | Lucide React                     | Latest                |
| CMS               | Sanity Studio                    | 3.x                   |
| Monorepo          | Turborepo                        | 2.x                   |
| Unit Testing      | Vitest + React Testing Library   | Latest                |
| Accessibility     | axe-core + vitest-axe            | Latest                |
| Analytics         | GA4 (via next/script)            | —                     |
| Linting           | ESLint (flat config) + Prettier  | Latest                |
| Git Hooks         | Husky + lint-staged + commitlint | Latest                |
| CI/CD             | GitHub Actions                   | —                     |
| Deployment        | Vercel                           | —                     |
| Font              | Geist Sans + Geist Mono          | Latest                |

---

## Pages & Content Inventory

### Homepage

- Hero: "It's time we reimagine the phone call"
- Industry showcase grid (5 verticals)
- Compliance badges (SOC 2, PCI, ISO 27001, HIPAA)
- CTA: "Let's talk." → Schedule a Meeting

### Product Pages

1. **Voice AI Answering** (`/answering`) — Call handling, FAQ automation, staff relief
2. **Voice AI Ordering** (`/ordering`) — Complex order management, multi-channel, POS integration
3. **Voice AI Reservations** (`/reservations`) — 24/7 booking, scheduling, guest notifications

### Industry Pages

1. **Automotive** (`/industries/automotive`) — Appointment scheduling, service updates, payments
2. **Dental** (`/industries/healthcare/dental`) — Patient call management, HIPAA compliance
3. **Medical** (`/industries/healthcare/medical`) — EHR integration, automated reminders
4. **Hotels** (`/industries/hotels`) — Guest assistance, bookings, concierge services
5. **Restaurants** (`/industries/restaurants`) — Ordering, reservations, answering, POS

### Other Pages

- **Integrations & Partnerships** (`/integrations`) — Chowly, PAR, Olo, QikServe + restaurant partners
- **Contact** (`/contact`) — Contact form + company info
- **Schedule a Meeting** (`/schedule`) — Detailed booking form with GDPR consent
- **About** (`/company/about`) — Company overview
- **Privacy Policy** (`/company/privacy`) — Privacy policy with last-updated date
- **Articles** (`/resources/articles`) — Blog listing + detail views (Sanity-managed)
- **Events** (`/resources/events`) — Event listing + detail views (Sanity-managed)
- **404 Not Found** — Custom error page with gradient styling

---

## Design System — "Dark Premium Tech"

### Color Palette

- **Background:** Deep navy (#0a0f1e) → Charcoal (#111827) → Slate (#1e293b)
- **Accent gradient:** Electric blue (#3b82f6) → Teal (#14b8a6)
- **Hero gradient:** Electric blue (#3b82f6) → Violet (#8b5cf6)
- **Text:** White (#f8fafc), Light gray (#cbd5e1), Muted (#64748b)
- **Borders:** Subtle rgba, blue glow on hover

### Typography

- Geist Sans (headings + body), Geist Mono (code/data)
- Fluid type scale using CSS `clamp()` functions

### Visual Language

- Glassmorphic cards (backdrop-blur + subtle borders)
- Gradient CTA buttons with glow effects
- Grain texture overlay for depth
- Scroll-reveal animations via Framer Motion
- Reduced-motion support throughout

---

## CMS Schema (Sanity)

### Document Types

- `siteSettings` — Global navigation, footer, contact info (singleton)
- `productPage` — Voice AI Answering, Ordering, Reservations
- `industryPage` — Automotive, Dental, Hotels, Medical, Restaurants
- `page` — Generic pages (About, Privacy, Contact, Schedule)
- `article` — Blog articles with rich text, categories, SEO
- `event` — Events with dates, location, external links
- `partner` — Integration partners with logos, quotes, categories

### Object Types

- `hero` — Section headings with background variants
- `featureBlock` — Feature cards with icons
- `ctaBlock` — Call-to-action sections
- `testimonial` — Customer quotes
- `videoEmbed` — YouTube/Vimeo embeds
- `seo` — Meta title, description, OG image, noIndex

---

## Forms

### Schedule a Meeting Form

- Fields: Company Name*, Email*, First Name*, Last Name*, Job Title\*
- Consent: Communication opt-in, Data processing agreement (required)
- Zod validation with animated error states
- Configurable backend via `NEXT_PUBLIC_FORM_ACTION_URL`

### Contact Form

- Fields: Name*, Email*, Subject dropdown, Message\*
- Same validation and styling patterns

---

## Analytics

- GA4 via `next/script` with `strategy="afterInteractive"`
- Measurement ID via `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var
- Custom event tracking for form submissions, CTA clicks, video plays
- No tracking in development mode

---

## Success Criteria

### Code Quality

- [ ] TypeScript strict mode, no `any` types in production code
- [ ] ESLint clean (zero errors)
- [ ] Prettier-formatted codebase
- [ ] Conventional commits enforced via commitlint

### Testing

- [ ] 75+ unit tests passing
- [ ] 80%+ code coverage on components and utilities
- [ ] Accessibility tests (vitest-axe) on all interactive components
- [ ] Form validation tests (valid + invalid scenarios)

### Performance

- [ ] Lighthouse Performance score 95+
- [ ] Lighthouse Accessibility score 95+
- [ ] Core Web Vitals within "Good" thresholds
- [ ] Static generation (SSG + ISR) for all marketing pages

### Accessibility (ADA/WCAG 2.1 AA)

- [ ] All interactive elements keyboard-navigable
- [ ] Proper focus management and visible focus indicators
- [ ] ARIA labels on all icons and interactive elements
- [ ] Color contrast ratios meet WCAG AA standards
- [ ] Screen reader compatible navigation
- [ ] `prefers-reduced-motion` respected in all animations

### Design

- [ ] Consistent dark premium tech aesthetic across all pages
- [ ] Responsive design: mobile, tablet, desktop breakpoints
- [ ] Microinteractions: scroll reveal, hover effects, form animations
- [ ] Gradient mesh hero backgrounds
- [ ] Glassmorphic card treatments
- [ ] Professional typography with fluid scaling

### Infrastructure

- [ ] CI/CD pipeline: lint → type-check → test → build → deploy
- [ ] Preview deployments on PRs
- [ ] Production deployment on merge to main
- [ ] Environment variables documented and configurable

### Deliverables

- [ ] Public GitHub repository with clean commit history
- [ ] Comprehensive README with setup instructions
- [ ] CONTRIBUTING.md with development guidelines
- [ ] Sanity CMS with all schemas deployed
- [ ] Vercel-ready deployment configuration

---

## Environment Variables

| Variable                        | Purpose                              | Required     |
| ------------------------------- | ------------------------------------ | ------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier            | Yes          |
| `NEXT_PUBLIC_SANITY_DATASET`    | Sanity dataset (default: production) | Yes          |
| `SANITY_API_TOKEN`              | Sanity API token for preview mode    | No           |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID    | No           |
| `NEXT_PUBLIC_FORM_ACTION_URL`   | Form submission endpoint URL         | No           |
| `SANITY_STUDIO_PROJECT_ID`      | Sanity Studio project ID             | Yes (studio) |
| `SANITY_STUDIO_DATASET`         | Sanity Studio dataset                | Yes (studio) |

---

## Deployment Guide

1. Fork or clone the repository
2. Run `npm install` to install all dependencies
3. Create a Sanity project at sanity.io and update env vars
4. Run `npm run dev` to start local development
5. Connect to Vercel: `vercel link`
6. Set environment variables in Vercel dashboard
7. Push to `main` to trigger production deployment

---

_Generated: March 24, 2026_
_Voicify, LLC © 2024_
