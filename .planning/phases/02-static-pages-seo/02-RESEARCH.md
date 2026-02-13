# Phase 2: Static Pages & SEO - Research

**Researched:** 2026-02-13
**Domain:** Next.js App Router, Static Generation, SEO Metadata, JSON-LD Schema
**Confidence:** HIGH

## Summary

This phase creates individual equipment pages at SEO-friendly URLs (`/is-it-a-real-laser/[slug]`) with proper metadata and structured data. Next.js 15+ App Router with `generateStaticParams` enables pre-rendering all ~38 equipment entries at build time, while `generateMetadata` provides dynamic per-page SEO metadata. JSON-LD schema markup (Product schema) embeds machine-readable data for search engines.

The project currently has TypeScript/Vitest but no Next.js installation. Phase 2 will bootstrap the Next.js App Router structure, create the dynamic route, and implement all SEO infrastructure (metadata, JSON-LD, sitemap, robots.txt). Tailwind CSS v4 provides mobile-first responsive design with utility classes.

**Primary recommendation:** Use Next.js 16 App Router with `generateStaticParams` for static generation, `generateMetadata` for dynamic SEO metadata, and Product JSON-LD schema for structured data. Use `dynamicParams = false` to return 404 for unknown slugs.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | ^16.0 | React framework with App Router, SSG, metadata API | Industry standard for React SEO, built-in static generation |
| react | ^19.0 | UI library | Required by Next.js 15+ |
| react-dom | ^19.0 | React DOM bindings | Required by Next.js 15+ |
| tailwindcss | ^4.0 | Utility-first CSS framework | Mobile-first responsive design, optimal for server components |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @types/react | ^19.0 | TypeScript types for React | Development |
| @types/node | ^22.0 | TypeScript types for Node | Development |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind CSS | CSS Modules | CSS Modules require more code, less utility-first, but zero runtime |
| Product schema | SoftwareApplication schema | Product is correct for physical equipment; SoftwareApplication is for software |
| Static JSON data | Database | Database adds complexity; JSON is version-controlled and sufficient for ~38 entries |

**Installation:**
```bash
npm install next@latest react@latest react-dom@latest
npm install -D tailwindcss@latest @tailwindcss/postcss postcss
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with metadata base
│   ├── page.tsx                  # Homepage (future)
│   ├── is-it-a-real-laser/
│   │   └── [slug]/
│   │       └── page.tsx          # Equipment detail page
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── robots.ts                 # robots.txt configuration
│   └── globals.css               # Tailwind imports
├── components/
│   ├── ClassificationBadge.tsx   # "Real Laser" / "Not a Laser" display
│   ├── BrandTierBadge.tsx        # Gold Standard / Established / Unknown
│   ├── EquipmentDetails.tsx      # Full equipment info display
│   ├── Disclaimer.tsx            # Permanent disclaimer component
│   └── JsonLd.tsx                # JSON-LD schema helper
├── lib/
│   ├── equipment.ts              # Existing: types and lookup functions
│   └── metadata.ts               # Metadata generation helpers
└── data/
    └── equipment.json            # Existing: equipment database
```

### Pattern 1: Static Generation with generateStaticParams
**What:** Pre-render all equipment pages at build time
**When to use:** When you have a known set of slugs from data
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// app/is-it-a-real-laser/[slug]/page.tsx

import { getAllEquipmentSlugs, getEquipmentBySlug } from '@/lib/equipment';
import { notFound } from 'next/navigation';

// Only serve known slugs - return 404 for unknown
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllEquipmentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function EquipmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const equipment = getEquipmentBySlug(slug);

  if (!equipment) {
    notFound();
  }

  return <EquipmentDetails equipment={equipment} />;
}
```

### Pattern 2: Dynamic Metadata with generateMetadata
**What:** Generate unique title, description, and Open Graph tags per page
**When to use:** Every equipment page needs unique SEO metadata
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// app/is-it-a-real-laser/[slug]/page.tsx

import type { Metadata } from 'next';
import { getEquipmentBySlug, isMachine } from '@/lib/equipment';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const equipment = getEquipmentBySlug(slug);

  if (!equipment) {
    return { title: 'Equipment Not Found' };
  }

  if (isMachine(equipment)) {
    const classification = equipment.technologyType === 'laser'
      ? 'Real Laser'
      : 'Not a Laser';

    return {
      title: `${equipment.name} - ${classification}`,
      description: `Is ${equipment.name} by ${equipment.manufacturer} a real laser? Find out the classification, brand tier, and effectiveness rating.`,
      openGraph: {
        title: `${equipment.name} - ${classification}`,
        description: `${equipment.manufacturer} ${equipment.name}: ${classification}. ${equipment.notes || ''}`,
        type: 'website',
      },
    };
  }

  // Technology term
  return {
    title: `${equipment.name} - Is it a Real Laser?`,
    description: equipment.whatItIs,
  };
}
```

### Pattern 3: JSON-LD Schema Markup
**What:** Embed machine-readable structured data for search engines
**When to use:** Every equipment page for Product schema
**Example:**
```typescript
// Source: https://schema.org/Product + https://developers.google.com/search/docs/appearance/structured-data/product-snippet
// components/JsonLd.tsx

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Usage in page.tsx
function generateProductSchema(machine: MachineEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: machine.name,
    description: machine.notes || `${machine.manufacturer} ${machine.name} laser hair removal device`,
    brand: {
      '@type': 'Brand',
      name: machine.manufacturer,
    },
    category: 'Medical Equipment > Laser Hair Removal',
    manufacturer: {
      '@type': 'Organization',
      name: machine.manufacturer,
    },
    // Custom properties in additionalProperty
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Technology Type',
        value: machine.technologyType,
      },
      {
        '@type': 'PropertyValue',
        name: 'Wavelengths',
        value: machine.wavelengths.join(', '),
      },
    ],
  };
}
```

### Pattern 4: Dynamic Sitemap Generation
**What:** Generate sitemap.xml from equipment data
**When to use:** App-level sitemap at /sitemap.xml
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// app/sitemap.ts

import type { MetadataRoute } from 'next';
import { getAllEquipmentSlugs } from '@/lib/equipment';

const BASE_URL = 'https://laserhairremovalmap.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllEquipmentSlugs();

  const equipmentPages = slugs.map((slug) => ({
    url: `${BASE_URL}/is-it-a-real-laser/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/is-it-a-real-laser`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...equipmentPages,
  ];
}
```

### Pattern 5: robots.txt Configuration
**What:** Control crawler access
**When to use:** App-level robots.txt at /robots.txt
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// app/robots.ts

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://laserhairremovalmap.com/sitemap.xml',
  };
}
```

### Anti-Patterns to Avoid
- **Client-side only rendering for SEO content:** Use Server Components for all equipment data display
- **Hardcoded metadata:** Always use `generateMetadata` for dynamic pages
- **Missing `dynamicParams = false`:** Without this, unknown slugs render as loading states instead of 404
- **JSON-LD in head via metadata API:** JSON-LD should be in page body with script tag, not in metadata object
- **Ignoring mobile-first:** Always write unprefixed Tailwind classes for mobile, add breakpoint prefixes for larger screens

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Static page generation | Custom build script | `generateStaticParams` | Next.js handles caching, incremental builds, dev experience |
| SEO metadata | Manual `<head>` manipulation | `generateMetadata` / `Metadata` export | Automatic merging, deduplication, streaming |
| Sitemap generation | Manual XML file | `sitemap.ts` convention | Type-safe, auto-served, integrates with build |
| robots.txt | Static file | `robots.ts` convention | Type-safe, can be dynamic if needed |
| Mobile responsive | Media queries | Tailwind breakpoint utilities | Consistent, mobile-first, utility-based |
| JSON-LD validation | Manual testing | Google Rich Results Test | Catches schema errors before deployment |

**Key insight:** Next.js App Router has built-in conventions for every SEO concern. Using custom solutions loses automatic optimizations, streaming, and caching benefits.

## Common Pitfalls

### Pitfall 1: Params as Promise in Next.js 15+
**What goes wrong:** Type errors or runtime issues accessing route params
**Why it happens:** Next.js 15 changed `params` to be a Promise that must be awaited
**How to avoid:** Always `await params` before accessing properties
**Warning signs:** TypeScript errors about params.slug being undefined

```typescript
// WRONG (Next.js 14 pattern)
export default function Page({ params }: { params: { slug: string } }) {
  const equipment = getEquipmentBySlug(params.slug);
}

// CORRECT (Next.js 15+)
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const equipment = getEquipmentBySlug(slug);
}
```

### Pitfall 2: FAQPage Schema Restrictions
**What goes wrong:** Expecting FAQ rich results that never appear
**Why it happens:** Google restricted FAQ rich results to government/health sites in August 2023
**How to avoid:** Implement FAQPage schema anyway for AI search visibility (Perplexity, ChatGPT) and potential featured snippets, but don't expect traditional FAQ dropdowns
**Warning signs:** FAQ schema validates but never shows in search results

### Pitfall 3: Missing Mobile-First Approach
**What goes wrong:** Layout breaks on mobile, excessive CSS
**Why it happens:** Writing desktop-first styles then adding `sm:` overrides
**How to avoid:** Write base styles for mobile (no prefix), add `md:`, `lg:` for larger screens
**Warning signs:** Using `sm:` to "target mobile" (it doesn't - it targets 640px+)

```typescript
// WRONG - desktop-first
<div className="grid-cols-3 sm:grid-cols-1">

// CORRECT - mobile-first
<div className="grid-cols-1 md:grid-cols-3">
```

### Pitfall 4: dynamicParams Inheritance
**What goes wrong:** All child routes return 404
**Why it happens:** `dynamicParams = false` in parent layout inherits to children
**How to avoid:** Only set `dynamicParams = false` in the specific `[slug]/page.tsx`, not in parent layouts
**Warning signs:** "Error: Internal: NoFallbackError" in console

### Pitfall 5: JSON-LD Not in Component Body
**What goes wrong:** Schema markup not visible to crawlers
**Why it happens:** Attempting to add JSON-LD via metadata object instead of script tag
**How to avoid:** Render JSON-LD as a `<script type="application/ld+json">` in the page component body
**Warning signs:** Google Rich Results Test shows no structured data

## Code Examples

Verified patterns from official sources:

### Root Layout with Metadata Base
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
// app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://laserhairremovalmap.com'),
  title: {
    template: '%s | Laser Hair Removal Map',
    default: 'Is It A Real Laser? | Laser Hair Removal Map',
  },
  description: 'Verify if your clinic uses a real laser or IPL device. Look up any laser hair removal machine and get instant classification.',
  openGraph: {
    type: 'website',
    siteName: 'Laser Hair Removal Map',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Mobile-Responsive Equipment Card
```typescript
// Source: Tailwind CSS mobile-first patterns
// components/ClassificationBadge.tsx

interface ClassificationBadgeProps {
  isRealLaser: boolean | null;
}

export function ClassificationBadge({ isRealLaser }: ClassificationBadgeProps) {
  if (isRealLaser === null) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
        Ask Your Clinic
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        md:px-4 md:py-2 md:text-base
        ${isRealLaser
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
        }`}
    >
      {isRealLaser ? 'Real Laser' : 'Not a Laser'}
    </span>
  );
}
```

### Permanent Disclaimer Component
```typescript
// components/Disclaimer.tsx

export function Disclaimer() {
  return (
    <aside
      className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600"
      role="complementary"
      aria-label="Medical disclaimer"
    >
      <p className="font-semibold mb-2">Important Disclaimer</p>
      <p>
        This tool provides general information about laser hair removal equipment
        for educational purposes only. It is not medical advice. Individual results
        vary based on skin type, hair color, and other factors. Always consult with
        a qualified practitioner before undergoing any cosmetic procedure.
      </p>
    </aside>
  );
}
```

### Unknown Equipment "Not Found" Handler
```typescript
// app/is-it-a-real-laser/[slug]/not-found.tsx

export default function EquipmentNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Equipment Not Found</h1>
      <p className="text-gray-600 mb-6">
        We don't have this equipment in our database yet.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="font-medium text-blue-800">
          Ask your clinic what brand and model they use
        </p>
        <p className="text-blue-600 mt-2">
          Reputable clinics will tell you the exact equipment brand (like Candela,
          Lumenis, or Cynosure). If they can't or won't tell you, that's a red flag.
        </p>
      </div>
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `getStaticPaths` / `getStaticProps` | `generateStaticParams` / Server Components | Next.js 13 (2022) | Simpler API, automatic caching |
| `params` as sync object | `params` as Promise | Next.js 15 (2024) | Must await params in all page components |
| Manual `<head>` tags | `generateMetadata` / `Metadata` export | Next.js 13 (2022) | Type-safe, automatic merging |
| Tailwind v3 config | Tailwind v4 CSS-first config | Tailwind 4.0 (Jan 2025) | `@config` directive, CSS variables |
| FAQ rich results for all | FAQ restricted to gov/health sites | Google (Aug 2023) | Still valuable for AI search |

**Deprecated/outdated:**
- `getStaticPaths`: Replaced by `generateStaticParams` in App Router
- `viewport` in metadata object: Use `generateViewport` export instead (Next.js 14+)
- `themeColor` in metadata: Use viewport configuration
- Synchronous params access: Deprecated in Next.js 15, will error in future

## Open Questions

1. **Base URL Configuration**
   - What we know: Site will be at laserhairremovalmap.com
   - What's unclear: Whether to use environment variables for base URL or hardcode
   - Recommendation: Use environment variable `NEXT_PUBLIC_BASE_URL` for flexibility

2. **Technology Term Pages vs Machine Pages**
   - What we know: Both types exist in equipment.json with different structures
   - What's unclear: Should technology terms use same URL structure or separate?
   - Recommendation: Same `/is-it-a-real-laser/[slug]` for both, component renders differently based on type

3. **Image Assets**
   - What we know: Requirements don't mention equipment images
   - What's unclear: Whether to include product images in v1
   - Recommendation: Defer to future phase; current scope is text-only

## Sources

### Primary (HIGH confidence)
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) - Static generation patterns
- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - SEO metadata API
- [Next.js sitemap.xml](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - Sitemap generation
- [Next.js robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - robots.txt configuration
- [Schema.org Product](https://schema.org/Product) - Product schema properties
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design) - Mobile-first breakpoints

### Secondary (MEDIUM confidence)
- [Google Product Structured Data](https://developers.google.com/search/docs/appearance/structured-data/product-snippet) - Product rich results requirements
- [Google FAQPage Structured Data](https://developers.google.com/search/docs/appearance/structured-data/faqpage) - FAQ schema guidelines (restricted)
- [Next.js 15 Blog](https://nextjs.org/blog/next-15) - Next.js 15 breaking changes

### Tertiary (LOW confidence)
- Various Medium articles on Next.js 15 patterns (used for verification only)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Next.js docs, verified versions
- Architecture: HIGH - Official patterns from Next.js documentation
- Pitfalls: HIGH - Documented issues in Next.js GitHub, official upgrade guides

**Research date:** 2026-02-13
**Valid until:** 2026-03-15 (30 days - stable framework versions)
