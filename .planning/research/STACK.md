# Stack Research

**Domain:** Consumer-facing SEO-optimized search/lookup tool (laser equipment checker)
**Researched:** 2026-02-12
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| Next.js | 15.5.x | Framework | SSR/SSG for SEO, App Router with generateMetadata API, streaming metadata (15.2+), Turbopack dev stable. Vercel's framework = best-in-class deployment path. | HIGH |
| React | 19.x | UI Library | Required by Next.js 15, Server Components for SEO, improved hydration. | HIGH |
| TypeScript | 5.7.x | Type Safety | Next.js 15.5 typed routes, schema-dts integration, autocomplete type safety. | HIGH |
| Tailwind CSS | 4.x | Styling | CSS-first config, no tailwind.config.js needed, 5x faster builds, auto content detection. Shadcn/ui compatibility. | HIGH |

### Database / Data Layer

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| JSON file | N/A | Equipment data | ~38 entries Phase 1. JSON is appropriate for static lookup data that changes rarely. No database overhead, version-controlled, trivial to edit. | HIGH |
| Static JSON import | N/A | Data loading | Import at build time for SSG. Type-safe with TypeScript interfaces. Zero runtime fetching for lookup data. | HIGH |

**Note:** For 38 entries growing to ~100, JSON is ideal. If data exceeds 500+ entries or needs user-submitted content, consider: Turso (SQLite edge), Supabase, or Vercel Postgres.

### Search Library

| Library | Version | Purpose | Why Recommended | Confidence |
|---------|---------|---------|-----------------|------------|
| Fuse.js | 7.1.0 | Fuzzy search | Zero dependencies, handles typos ("Gentlemax" -> "GentleMax Pro"), weighted fields for name/manufacturer priority, 5.3M weekly downloads. Perfect for <1000 items. | HIGH |

**Why Fuse.js over alternatives:**
- FlexSearch: Faster but overkill for 38-100 items, more complex API
- MiniSearch: Good but Fuse.js has 10x community adoption
- Microfuzz: Too minimal, no weighted search

### SEO / Structured Data

| Library | Version | Purpose | Why Recommended | Confidence |
|---------|---------|---------|-----------------|------------|
| schema-dts | 1.1.x | JSON-LD types | Google's official TypeScript types for Schema.org. Type-safe structured data, 334K weekly downloads. | HIGH |
| generateMetadata | built-in | Meta tags | Next.js 15 native. No external package needed. Streaming metadata in 15.2+. | HIGH |

**What NOT to use:** next-seo for meta tags. It was essential for Pages Router but is redundant with App Router's generateMetadata. Use next-seo ONLY if you need its JSON-LD component helpers.

### UI Components

| Library | Version | Purpose | When to Use | Confidence |
|---------|---------|---------|-------------|------------|
| shadcn/ui | latest | Component library | Pre-built accessible components with Tailwind. Copy-paste, not dependency. Use Command component for search autocomplete. | HIGH |
| cmdk | 1.0.x | Command palette | Powers shadcn/ui Command. Fuzzy search built-in, keyboard navigation, accessible. | HIGH |
| lucide-react | latest | Icons | Shadcn's default icon set. Consistent, tree-shakeable. | MEDIUM |

**Search UI approach:** Use shadcn/ui Command component (built on cmdk) for the autocomplete search bar. It handles keyboard navigation, accessibility, and styling out of the box.

### Analytics

| Library | Version | Purpose | When to Use | Confidence |
|---------|---------|---------|-------------|------------|
| Vercel Analytics | @vercel/analytics | Traffic analytics | Privacy-first, no cookie banner needed, not blocked by ad blockers (25-35% more accurate), 2-min setup on Vercel. | MEDIUM |
| Google Analytics 4 | gtag | Deep analytics | Only if you need conversion funnels, audience demographics, or advertising integration. Requires cookie consent. | MEDIUM |

**Recommendation:** Start with Vercel Analytics. Add GA4 later only if you need advanced user behavior tracking.

### Hosting / Deployment

| Service | Purpose | Why Recommended | Confidence |
|---------|---------|-----------------|------------|
| Vercel | Hosting | Native Next.js support, automatic SSG/SSR optimization, global edge network, free tier sufficient for launch. | HIGH |

**Why NOT other hosts:**
- Netlify: Good but Next.js features lag behind Vercel
- AWS Amplify: More complex, less Next.js optimization
- Self-hosted: Unnecessary complexity for this project scope

### Development Tools

| Tool | Purpose | Notes | Confidence |
|------|---------|-------|------------|
| ESLint 9.x | Linting | Next.js 15.5 deprecates `next lint` in favor of explicit ESLint config. Use flat config format. | MEDIUM |
| Biome | Alt linter | Fast alternative to ESLint+Prettier. Next.js 15.5 mentions it as option. Consider if ESLint setup feels heavy. | LOW |
| pnpm | Package manager | Faster, disk-efficient. Optional but recommended over npm. | MEDIUM |

## Installation

```bash
# Create Next.js 15 project with Tailwind 4
npx create-next-app@latest laser-equipment-checker --typescript --tailwind --eslint --app --src-dir

# Force Tailwind 4 (create-next-app may install v3)
npm install tailwindcss@latest @tailwindcss/postcss@latest postcss@latest

# Search
npm install fuse.js

# Structured data types
npm install schema-dts

# Shadcn/ui setup (interactive CLI)
npx shadcn@latest init
npx shadcn@latest add command input

# Analytics (if deploying to Vercel)
npm install @vercel/analytics
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Fuse.js | FlexSearch | If you have 10,000+ items and need maximum search speed |
| Fuse.js | Algolia | If you need hosted search with typo-tolerance at scale (paid) |
| JSON file | SQLite/Turso | If data exceeds 500 entries or needs user-generated content |
| JSON file | Supabase | If you need real-time updates or user authentication |
| Vercel | Cloudflare Pages | If you need more edge compute control or lower costs at scale |
| Tailwind 4 | Tailwind 3 | If you need IE11/older browser support (unlikely in 2026) |
| shadcn/ui | Radix UI direct | If you want unstyled primitives and custom design system |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| next-seo (for meta tags) | Redundant with Next.js 15 generateMetadata API | Built-in generateMetadata |
| react-helmet | Pages Router era, replaced by Metadata API | Built-in generateMetadata |
| styled-components / emotion | Runtime CSS-in-JS has hydration overhead, worse for SSR | Tailwind CSS 4 |
| MongoDB / Postgres | Massive overkill for 38-100 static entries | JSON file |
| Algolia / Typesense | Hosted search overkill for small dataset | Fuse.js client-side |
| Redux / Zustand | No complex state needed for lookup tool | React state / URL params |
| tRPC | No API needed, data is static at build time | Direct JSON import |
| Prisma | No database, no ORM needed | TypeScript interfaces |
| next/head | Deprecated in App Router | generateMetadata |

## Stack Patterns

**Pattern 1: Static Generation for Machine Pages**

Each machine (GentleMax Pro, Soprano ICE, etc.) gets a static page at build time:

```typescript
// app/is-it-a-real-laser/[slug]/page.tsx
export async function generateStaticParams() {
  return machines.map((machine) => ({ slug: machine.slug }));
}

export async function generateMetadata({ params }) {
  const machine = getMachine(params.slug);
  return {
    title: `Is ${machine.name} a Real Laser? | Equipment Checker`,
    description: machine.metaDescription,
  };
}
```

**Pattern 2: JSON-LD Structured Data**

```typescript
import { Product, WithContext } from 'schema-dts';

const jsonLd: WithContext<Product> = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: machine.name,
  manufacturer: { '@type': 'Organization', name: machine.manufacturer },
  // ... additional structured data
};

// Render as script tag in page component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

**Pattern 3: Search with URL State**

Persist search query in URL for shareability and SEO:

```typescript
// app/is-it-a-real-laser/page.tsx
export default function Page({ searchParams }) {
  const query = searchParams.q ?? '';
  // Use Fuse.js to search with query
}
```

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Next.js 15.5.x | React 19.x | Required pairing |
| Next.js 15.5.x | TypeScript 5.x | Typed routes require TS 5.x |
| Tailwind CSS 4.x | Next.js 15.x | Requires @tailwindcss/postcss plugin |
| shadcn/ui | Tailwind 4.x | Confirmed compatible |
| Fuse.js 7.x | Any | Zero dependencies |
| schema-dts 1.x | TypeScript 4.7+ | Type-only package |

## Security Notes

**Next.js Security (December 2025):**
CVE-2025-66478 and related vulnerabilities were patched. Use Next.js 15.5.9+ to ensure patches are applied.

**JSON-LD XSS Prevention:**
When using `JSON.stringify` for structured data, sanitize by replacing `<` with `\u003c`:

```typescript
const safeJson = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
```

## Sources

- [Next.js 15.5 Release](https://nextjs.org/blog/next-15-5) - Turbopack builds, Node.js middleware stable, TypeScript improvements
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - generateMetadata documentation
- [Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4) - CSS-first configuration, performance improvements
- [Fuse.js](https://www.fusejs.io/) - Fuzzy search library documentation
- [schema-dts GitHub](https://github.com/google/schema-dts) - Google's JSON-LD TypeScript types
- [npm trends comparison](https://npmtrends.com/flexsearch-vs-fuse.js-vs-fuzzysort-vs-match-sorter-vs-minisearch) - Search library popularity
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) - Official structured data guidance
- [Vercel Analytics vs GA comparison](https://www.mikul.me/blog/vercel-analytics-vs-google-analytics-which-to-choose) - Analytics comparison

---
*Stack research for: Consumer-facing laser equipment checker with SEO requirements*
*Researched: 2026-02-12*
