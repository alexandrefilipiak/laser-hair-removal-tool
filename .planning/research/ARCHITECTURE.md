# Architecture Research

**Domain:** Consumer-facing search/lookup tool with SEO requirements (laser equipment checker)
**Researched:** 2026-02-12
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
+---------------------------------------------------------------------+
|                           Presentation Layer                         |
+---------------------------------------------------------------------+
|  +----------------+  +------------------+  +----------------------+  |
|  | Homepage       |  | Tool Page        |  | Machine Pages        |  |
|  | (/)            |  | (/is-it-a-real-  |  | (/is-it-a-real-      |  |
|  |                |  |  laser)          |  |  laser/[slug])       |  |
|  +-------+--------+  +--------+---------+  +-----------+----------+  |
|          |                    |                        |             |
+----------+--------------------+------------------------+-------------+
|                           Component Layer                            |
+---------------------------------------------------------------------+
|  +----------------+  +------------------+  +----------------------+  |
|  | SearchBar      |  | ResultCard       |  | SchemaMarkup         |  |
|  | (Client)       |  | (Server)         |  | (Server)             |  |
|  +-------+--------+  +------------------+  +----------------------+  |
|          |                                                           |
|  +----------------+  +------------------+  +----------------------+  |
|  | Autocomplete   |  | NotFoundFlow     |  | SEOMetadata          |  |
|  | (Client)       |  | (Server)         |  | (Server)             |  |
|  +-------+--------+  +--------+---------+  +----------------------+  |
|          |                    |                                      |
+----------+--------------------+--------------------------------------+
|                           Data Layer                                 |
+---------------------------------------------------------------------+
|  +-------------------------------------------------------------+    |
|  |                     equipment.json                           |    |
|  |  (~38 entries: devices, technologies, classifications)       |    |
|  +-------------------------------------------------------------+    |
+---------------------------------------------------------------------+
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **SearchBar** | User input, fuzzy matching, autocomplete display | Client Component with `useState`, Fuse.js |
| **Autocomplete** | Suggestion list, keyboard navigation, selection | Client Component, receives filtered results |
| **ResultCard** | Display classification results (Layer 1-4) | Server Component, receives equipment data |
| **NotFoundFlow** | Handle unknown machines, email capture | Server Component with form action |
| **SchemaMarkup** | JSON-LD structured data injection | Server Component, script tag in page |
| **SEOMetadata** | generateMetadata for dynamic routes | Next.js Metadata API export |

## Recommended Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout (global styles, fonts)
│   ├── page.tsx                   # Homepage (/)
│   ├── is-it-a-real-laser/
│   │   ├── page.tsx               # Main tool page (search interface)
│   │   ├── [slug]/
│   │   │   ├── page.tsx           # Individual machine pages (SSG)
│   │   │   └── not-found.tsx      # Custom 404 for invalid slugs
│   │   └── layout.tsx             # Shared layout for tool section
│   ├── guides/                    # Future guides section
│   │   └── page.tsx
│   ├── robots.ts                  # Dynamic robots.txt
│   └── sitemap.ts                 # Dynamic sitemap.xml
├── components/
│   ├── search/
│   │   ├── SearchBar.tsx          # 'use client' - main input component
│   │   ├── Autocomplete.tsx       # 'use client' - dropdown suggestions
│   │   └── SearchResult.tsx       # Server - result display
│   ├── equipment/
│   │   ├── ResultCard.tsx         # Server - full classification display
│   │   ├── ClassificationBadge.tsx # Server - Layer badges (real/not real)
│   │   └── SkinTypeInfo.tsx       # Server - Layer 4 informational text
│   ├── seo/
│   │   ├── EquipmentSchema.tsx    # Server - JSON-LD for equipment
│   │   └── FAQSchema.tsx          # Server - JSON-LD for FAQs
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── data/
│   └── equipment.json             # Static equipment database (~38 entries)
├── lib/
│   ├── equipment.ts               # Data access functions
│   ├── search.ts                  # Fuse.js configuration and helpers
│   └── seo.ts                     # Schema markup generators
└── types/
    └── equipment.ts               # TypeScript interfaces
```

### Structure Rationale

- **app/**: App Router for SSG, generateStaticParams, and metadata API. All tool pages can be statically generated at build time.
- **components/search/**: Isolated client components. Only SearchBar and Autocomplete need client-side JavaScript; results render server-side.
- **components/seo/**: Dedicated schema markup components keep SEO logic out of page files.
- **data/**: JSON file imported directly. No database needed for ~38 entries.
- **lib/**: Business logic separated from UI. Equipment lookup, search configuration, and schema generation.

## Architectural Patterns

### Pattern 1: Static Generation with Client-Side Search

**What:** Pre-render all known pages at build time; search happens entirely in-browser.
**When to use:** Small, stable dataset (under 1000 items), no personalization needed.
**Trade-offs:**
- Pros: Instant search response, zero server load, excellent SEO (all pages pre-rendered)
- Cons: JSON data downloaded to client, limited to exact matches in pre-built pages

**Example:**
```typescript
// app/is-it-a-real-laser/[slug]/page.tsx
import { getEquipmentBySlug, getAllEquipmentSlugs } from '@/lib/equipment';
import { notFound } from 'next/navigation';

// Pre-render all known machine pages at build time
export async function generateStaticParams() {
  const slugs = getAllEquipmentSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Disable dynamic params - return 404 for unknown slugs
export const dynamicParams = false;

export default async function MachinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const equipment = getEquipmentBySlug(slug);

  if (!equipment) {
    notFound();
  }

  return <ResultCard equipment={equipment} />;
}
```

### Pattern 2: Client Island for Search

**What:** Keep the search bar as a small client component; everything else renders server-side.
**When to use:** Interactive features (autocomplete, fuzzy matching) within otherwise static pages.
**Trade-offs:**
- Pros: Minimal JavaScript bundle, server components for SEO-critical content
- Cons: Search cannot be server-rendered (but that's fine for this use case)

**Example:**
```typescript
// components/search/SearchBar.tsx
'use client';

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import equipmentData from '@/data/equipment.json';

const fuse = new Fuse(equipmentData, {
  keys: ['name', 'manufacturer', 'aliases'],
  threshold: 0.3,  // Fuzzy tolerance
  includeScore: true,
});

export function SearchBar() {
  const [query, setQuery] = useState('');
  const results = useMemo(() =>
    query.length > 1 ? fuse.search(query).slice(0, 8) : [],
    [query]
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter machine name (e.g., GentleMax Pro)"
      />
      <Autocomplete results={results} />
    </div>
  );
}
```

### Pattern 3: JSON-LD Injection in Page Components

**What:** Render JSON-LD schema as a script tag within Server Components.
**When to use:** Every page that needs structured data for SEO.
**Trade-offs:**
- Pros: Validated by Rich Results Test, helps search engine understanding
- Cons: Must sanitize content to prevent XSS

**Example:**
```typescript
// components/seo/EquipmentSchema.tsx
import type { Equipment } from '@/types/equipment';

function sanitizeJsonLd(obj: object): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

export function EquipmentSchema({ equipment }: { equipment: Equipment }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: equipment.name,
    manufacturer: {
      '@type': 'Organization',
      name: equipment.manufacturer,
    },
    description: equipment.description,
    category: equipment.isRealLaser ? 'Laser Hair Removal Device' : 'IPL Device',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(schema) }}
    />
  );
}
```

## Data Flow

### Request Flow (Static Page Load)

```
[User visits /is-it-a-real-laser/gentlemax-pro]
    |
    v
[CDN serves pre-rendered HTML] <-- No server computation
    |
    v
[Browser hydrates SearchBar client component]
    |
    v
[JSON-LD in HTML already parsed by crawler]
```

### Search Flow (Client-Side)

```
[User types in SearchBar]
    |
    v (onChange)
[Fuse.js searches equipment.json in memory]
    |
    v (useMemo)
[Autocomplete renders matching suggestions]
    |
    v (onClick/Enter)
[Router.push to /is-it-a-real-laser/[slug]]
    |
    v
[Pre-rendered page loads instantly]
```

### Key Data Flows

1. **Build-time generation:** `equipment.json` --> `generateStaticParams()` --> Pre-rendered HTML pages for all slugs
2. **Client-side search:** `equipment.json` bundled into client --> Fuse.js instance --> Fuzzy match results --> Navigation to pre-built page
3. **SEO metadata:** `equipment.json` --> `generateMetadata()` --> Dynamic title/description per page

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-100 entries | Current architecture. JSON file, client-side search, SSG. |
| 100-1000 entries | Consider splitting JSON by category, lazy-load search index. |
| 1000+ entries | Move to server-side search (API route), consider Algolia or Meilisearch. |

### Scaling Priorities

1. **First bottleneck:** Client bundle size. When JSON exceeds ~100KB, consider lazy-loading the search index after initial page render.
2. **Second bottleneck:** Build time. When pages exceed ~500, consider ISR with revalidate instead of full SSG rebuild.

## Anti-Patterns

### Anti-Pattern 1: SSR for Static Content

**What people do:** Use `fetch` with no caching or force dynamic rendering for equipment data.
**Why it's wrong:** Adds server load and latency for data that changes once per deployment.
**Do this instead:** Use `generateStaticParams` and pre-render all equipment pages at build. The data comes from a JSON file that changes only at build time.

### Anti-Pattern 2: Fat Client Components

**What people do:** Mark the entire page as `'use client'` to use the search bar.
**Why it's wrong:** Ships unnecessary JavaScript, loses Server Component benefits for SEO-critical content.
**Do this instead:** Keep client components as small leaves (SearchBar only). Results, schema markup, and metadata all render server-side.

### Anti-Pattern 3: Fetching Search Results from API

**What people do:** Create an API route for search, call it on every keystroke.
**Why it's wrong:** For ~38 items, network round-trips are slower than in-memory search.
**Do this instead:** Bundle equipment data with the client. Fuse.js searches in-memory with sub-millisecond response.

### Anti-Pattern 4: Missing notFound() Handling

**What people do:** Let invalid slugs render empty pages or crash.
**Why it's wrong:** Bad UX, wastes crawl budget on 200 status for non-existent pages.
**Do this instead:** Set `dynamicParams = false` to return 404 for unknown slugs, create custom `not-found.tsx` with helpful messaging.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Google Search Console | robots.ts, sitemap.ts | Submit sitemap after deploy |
| Rich Results Test | JSON-LD in page | Validate schema markup |
| Analytics | Client component or script | Track search queries, not-found events |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Search --> Pages | Next.js router push | Client navigation to pre-built pages |
| Data --> Components | Direct import | JSON imported at build time |
| SEO --> Pages | Component composition | Schema components embedded in page |

## Build Order (Dependencies)

Based on the architecture, implement in this order:

```
Phase 1: Foundation
├── types/equipment.ts          # Define interfaces first
├── data/equipment.json         # Create data file
└── lib/equipment.ts            # Data access utilities

Phase 2: Core Pages (SSG)
├── app/layout.tsx              # Root layout
├── app/is-it-a-real-laser/
│   ├── [slug]/page.tsx         # Individual machine pages (generateStaticParams)
│   └── [slug]/not-found.tsx    # Custom 404
└── components/equipment/
    └── ResultCard.tsx          # Display classification

Phase 3: Search (Client)
├── lib/search.ts               # Fuse.js configuration
└── components/search/
    ├── SearchBar.tsx           # Main input ('use client')
    └── Autocomplete.tsx        # Suggestions dropdown

Phase 4: Tool Page
└── app/is-it-a-real-laser/page.tsx  # Assembles SearchBar + intro content

Phase 5: SEO
├── components/seo/             # JSON-LD components
├── app/robots.ts               # Robots.txt generation
├── app/sitemap.ts              # Sitemap generation
└── Update all pages with generateMetadata

Phase 6: Polish
├── app/page.tsx                # Homepage with link to tool
└── Not-found flow enhancements
```

### Why This Order

1. **Types first:** All components depend on the Equipment interface.
2. **Data before pages:** Pages import data; data must exist.
3. **SSG pages before search:** Proves the build works, establishes URL structure.
4. **Search last in MVP:** The tool works without search (direct URL access). Search enhances UX but is not critical path.
5. **SEO can be incremental:** Start with basic metadata, add JSON-LD after pages work.

## Sources

- [Next.js Official SEO Documentation](https://nextjs.org/learn/seo)
- [Next.js generateStaticParams API Reference](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld)
- [Next.js not-found.js Conventions](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
- [Fuse.js Documentation](https://www.fusejs.io/)
- [Next.js SEO Optimization Guide (2026)](https://www.djamware.com/post/697a19b07c935b6bb054313e/next-js-seo-optimization-guide--2026-edition)
- [Next.js Architecture in 2026 - Server-First Patterns](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Next.js 15 Advanced Patterns](https://johal.in/next-js-15-advanced-patterns-app-router-server-actions-and-caching-strategies-for-2026/)

---
*Architecture research for: Laser Equipment Checker Tool*
*Researched: 2026-02-12*
