# Contributing to Voicify Web

## Development Setup

1. Clone and install: `git clone && npm install`
2. Copy env files: `cp apps/web/.env.example apps/web/.env.local`
3. Start dev: `npm run dev`

## Code Style

- **TypeScript strict mode** — no `any` types in production code
- **Prettier** — runs on save and pre-commit (100 char line width, single quotes, ES5 trailing commas)
- **Tailwind CSS** — utility-first, use design tokens from `globals.css`
- **Component naming** — PascalCase files and exports
- **Imports** — use `@/` path alias for all src imports

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix a bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add or update tests
chore: maintenance tasks
perf: performance improvements
ci: CI/CD changes
```

Enforced via commitlint. Scopes should be kebab-case.

## Testing

- Write tests for all new components
- Maintain 80%+ code coverage
- Use `vitest-axe` for accessibility testing
- Run `npm run test` before pushing

## Pull Requests

1. Create a feature branch from `main`
2. Write code + tests
3. Ensure all checks pass: `npm run lint && npm run type-check && npm run test`
4. Open PR — preview deployment auto-generates
5. Get review and merge

## Project Architecture

- **Server Components** by default — only add `'use client'` when needed
- **Sanity CMS** for all content — avoid hardcoding copy
- **Design tokens** in `globals.css` — don't use raw hex colors
- **Framer Motion** for animations — always check `prefers-reduced-motion`
- **Zod** for form validation — schemas in `lib/schemas.ts`
