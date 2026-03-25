# Voicify — Voice AI Platform Website

Modern marketing website for [Voicify](https://voicify.com), built with Next.js 16, Sanity CMS, Tailwind CSS 4, and TypeScript. Deployed on Vercel.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Language:** TypeScript 5.9+
- **Styling:** Tailwind CSS 4 with custom dark theme
- **Animation:** Framer Motion 12
- **CMS:** Sanity Studio 3
- **Monorepo:** Turborepo 2
- **Testing:** Vitest + React Testing Library
- **CI/CD:** GitHub Actions → Vercel
- **Fonts:** Geist Sans + Geist Mono

## Getting Started

### Prerequisites

- Node.js 22+ and npm 11+
- A [Sanity](https://www.sanity.io/) account (free tier works)

### Setup

```bash
# Clone the repository
git clone https://github.com/TYLANDER/voicify-web.git
cd voicify-web

# Install dependencies
npm install

# Create environment variables
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with your Sanity project ID and dataset

# Start development server
npm run dev
```

The web app runs at `http://localhost:3000` and Sanity Studio at `http://localhost:3333`.

### Environment Variables

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FORM_ACTION_URL=https://your-form-endpoint.com/submit
```

Create `apps/studio/.env`:

```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

## Project Structure

```
voicify-web/
├── apps/
│   ├── web/                    # Next.js 16 marketing site
│   │   ├── src/
│   │   │   ├── app/            # App Router pages (17+ routes)
│   │   │   ├── components/
│   │   │   │   ├── analytics/  # GA4 tracking
│   │   │   │   ├── layout/     # Header, Footer, MobileNav, Breadcrumb
│   │   │   │   ├── motion/     # Framer Motion wrappers
│   │   │   │   └── sections/   # Reusable page sections
│   │   │   ├── lib/
│   │   │   │   ├── sanity/     # CMS client, queries, types
│   │   │   │   ├── constants.ts
│   │   │   │   ├── schemas.ts  # Zod form validation
│   │   │   │   └── utils.ts
│   │   │   └── styles/
│   │   │       └── globals.css # Design system tokens
│   │   └── vitest.config.ts
│   │
│   └── studio/                 # Sanity CMS Studio
│       └── schemas/            # 7 document + 6 object schemas
│
├── packages/
│   └── config/                 # Shared configs
│
├── .github/workflows/          # CI/CD pipelines
├── turbo.json                  # Turborepo task config
└── PRD.md                      # Product requirements
```

## Available Scripts

```bash
# Development
npm run dev           # Start all apps in dev mode
npm run build         # Build all apps
npm run lint          # Lint all packages
npm run type-check    # TypeScript type checking
npm run test          # Run all tests
npm run test:coverage # Run tests with coverage report
npm run format        # Format all files with Prettier

# Individual apps (via Turborepo filters)
npx turbo run dev --filter=@voicify/web
npx turbo run dev --filter=@voicify/studio
```

## Design System

The site uses a **"Dark Premium Tech"** design language inspired by Linear, Vercel, and Raycast:

- **Background:** Deep navy (#0a0f1e) with layered surfaces
- **Accents:** Electric blue (#3b82f6) → Teal (#14b8a6) gradients
- **Cards:** Glassmorphic with backdrop-blur and subtle borders
- **Typography:** Geist Sans for UI, fluid scaling via `clamp()`
- **Motion:** Scroll-reveal, hover glow, staggered animations
- **Accessibility:** `prefers-reduced-motion` support, WCAG 2.1 AA

CSS custom properties are defined in `apps/web/src/styles/globals.css`.

## CMS (Sanity)

The Sanity Studio manages all website content:

- **Products:** Voice AI Answering, Ordering, Reservations
- **Industries:** Automotive, Dental, Hotels, Medical, Restaurants
- **Resources:** Blog articles and events
- **Settings:** Navigation, footer, contact info, compliance badges
- **Partners:** Technology and restaurant integration partners

Access Sanity Studio locally at `http://localhost:3333` or deploy it separately.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Set Framework Preset to **Next.js**
4. Configure environment variables
5. Deploy

The CI/CD pipeline handles:

- **PR:** Lint → Type Check → Test → Build → Preview Deploy
- **Merge to main:** Full CI → Production Deploy

### Manual

```bash
npm run build
npm start
```

## Testing

```bash
# Run all tests
npm run test

# Watch mode
npx turbo run test:watch --filter=@voicify/web

# Coverage report
npm run test:coverage
```

**75+ unit tests** covering:

- Component rendering and interaction
- Form validation (Zod schemas)
- Navigation and routing
- Accessibility (vitest-axe)
- Analytics event tracking

## Analytics (GA4)

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in your environment to enable Google Analytics 4. The integration:

- Auto-tracks page views
- Provides custom event helpers for form submissions, CTA clicks, and video plays
- Only loads in production (when the env var is set)
- Uses `next/script` with `strategy="afterInteractive"` for performance

## License

Proprietary — Voicify, LLC © 2024. All rights reserved.
