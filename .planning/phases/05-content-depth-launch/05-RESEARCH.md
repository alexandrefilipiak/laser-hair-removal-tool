# Phase 5: Content Depth & Launch - Research

**Researched:** 2026-02-13
**Domain:** Static content generation, SEO content depth, equipment index UI
**Confidence:** HIGH

## Summary

Phase 5 completes the content layer by addressing three main areas: (1) ensuring technology terms are searchable and have dedicated pages with clarification content, (2) expanding machine pages to 300+ words of unique SEO content, and (3) creating the homepage and browseable equipment index.

The existing implementation already has technology term pages at `/is-it-a-real-laser/[slug]` (e.g., `/is-it-a-real-laser/shr`) with `TechnologyTermDetails` component and `DefinedTerm` JSON-LD schema. Technology terms are already searchable via Fuse.js since they're in the equipment data array. The primary work for this phase is: (a) verifying technology term searchability works correctly, (b) adding rich content sections to machine pages to reach 300+ words, (c) enhancing the homepage with proper descriptive text, and (d) adding a browseable equipment index to the tool page.

**Primary recommendation:** Extend `EquipmentDetails` component with additional content sections (overview, technology explanation, typical use cases, how it works) pulled from expanded data fields, and create an `EquipmentIndex` component for the tool page using a responsive Tailwind grid.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Static site generation | Already in use, `output: 'export'` enabled |
| React | 19.2.4 | UI components | Already in use |
| TypeScript | 5.9.3 | Type safety | Already in use |
| Tailwind CSS | 4.1.18 | Styling | Already in use, v4 syntax |
| Fuse.js | 7.1.0 | Search (already includes technology terms) | Already in use |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none additional) | - | All functionality covered by existing stack | - |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Hand-written content | AI-generated content | Hand-written preferred for quality/accuracy; content is domain-specific |
| Separate content JSON | Extended equipment.json | Single source of truth is simpler; keep content in equipment.json |
| Paginated index | Single grid | ~38 entries fits on one page; pagination adds unnecessary complexity |

**Installation:**
```bash
# No new packages needed - all functionality covered by existing stack
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── page.tsx                          # Homepage (enhance with descriptive content)
│   └── is-it-a-real-laser/
│       ├── page.tsx                      # Tool page (add EquipmentIndex)
│       └── [slug]/page.tsx               # Detail pages (already exists)
├── components/
│   ├── EquipmentDetails.tsx              # Extend with rich content sections
│   ├── TechnologyTermDetails.tsx         # Already complete
│   ├── EquipmentIndex.tsx                # NEW: browseable grid of all equipment
│   └── EquipmentCard.tsx                 # NEW: card component for index grid
├── lib/
│   └── equipment.ts                      # Add utility functions for grouping
└── data/
    └── equipment.json                    # Extend with richContent field
```

### Pattern 1: Rich Content Extension
**What:** Add structured content fields to equipment.json for 300+ word pages
**When to use:** When machine pages need unique, SEO-valuable content
**Example:**
```typescript
// Extended MachineEntry type (add to equipment.ts)
export interface MachineEntry {
  // ... existing fields ...

  /** Rich content for SEO (300+ words total when combined) */
  richContent: {
    /** 2-3 sentence overview */
    overview: string;
    /** How the technology works */
    howItWorks: string;
    /** Typical clinical applications */
    typicalUses: string;
    /** What sets this apart */
    keyFeatures: string;
  } | null;
}
```

### Pattern 2: Equipment Index Grid
**What:** Responsive card grid showing all equipment for discovery
**When to use:** Bottom of tool page for browsing without search
**Example:**
```tsx
// Source: Tailwind CSS grid-template-columns docs
// https://tailwindcss.com/docs/grid-template-columns

function EquipmentIndex({ equipment }: { equipment: EquipmentEntry[] }) {
  const machines = equipment.filter(isMachine);
  const terms = equipment.filter(isTechnologyTerm);

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Browse All Equipment
      </h2>

      {/* Machines grid */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Machines ({machines.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {machines.map((machine) => (
            <EquipmentCard key={machine.slug} equipment={machine} />
          ))}
        </div>
      </div>

      {/* Technology terms grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Technology Terms ({terms.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {terms.map((term) => (
            <EquipmentCard key={term.slug} equipment={term} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Pattern 3: Homepage Hero with Tool Link
**What:** Clear value proposition and prominent CTA to equipment checker
**When to use:** Root page to explain tool purpose and drive usage
**Example:**
```tsx
// Homepage structure
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Is Your Clinic Using a Real Laser?
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {/* Descriptive text explaining tool purpose - UX-02 */}
          Not all laser hair removal machines are actually lasers.
          Many clinics use IPL devices marketed as lasers.
          Our free tool lets you verify any equipment in seconds.
        </p>
        <Link
          href="/is-it-a-real-laser"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Check Equipment Now
        </Link>
      </section>

      {/* Value proposition sections */}
      <section className="py-12 bg-gray-50">
        {/* Why it matters, how it works, etc. */}
      </section>
    </main>
  );
}
```

### Anti-Patterns to Avoid
- **Duplicate content across machine pages:** Each machine needs UNIQUE content, not templated boilerplate. Write specific content for each device.
- **Over-engineering the index:** With ~38 items, don't add filtering/pagination complexity. Simple grid is sufficient.
- **Hardcoding content in components:** Keep all content in equipment.json to maintain single source of truth.
- **Making homepage a second search page:** Homepage explains PURPOSE and links to tool. Don't duplicate the search interface.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Content management | Custom CMS | equipment.json with richContent field | Project is content-simple; ~38 static entries |
| Technology term search | Separate search logic | Existing Fuse.js search | Terms already in equipment array, searchable |
| Grid layout | Custom CSS grid | Tailwind grid-cols classes | Well-tested, responsive patterns |
| JSON-LD for terms | Manual schema | Existing generateTechTermSchema | Already implemented correctly |

**Key insight:** The existing implementation is complete for technology terms. The main work is content creation (300+ words per machine) and UI components (index grid, enhanced homepage).

## Common Pitfalls

### Pitfall 1: Thin Content Penalty
**What goes wrong:** Machine pages have only specs, failing 300+ word requirement
**Why it happens:** Easy to template specs, hard to write unique content for 25+ machines
**How to avoid:** Create richContent structure in data, write unique overview/howItWorks/typicalUses for each machine
**Warning signs:** Word count under 300, pages look identical except for name/specs

### Pitfall 2: Technology Terms Not Found in Search
**What goes wrong:** User searches "SHR" but no result appears
**Why it happens:** Search threshold too strict, or term not in aliases
**How to avoid:** Verify Fuse.js finds all technology terms; they're already in data with aliases
**Warning signs:** Manual test of "SHR", "BBL", "AFT" searches returns empty

### Pitfall 3: Homepage Duplicates Tool Page
**What goes wrong:** Homepage becomes redundant copy of /is-it-a-real-laser
**Why it happens:** Unclear distinction between entry point and tool
**How to avoid:** Homepage = landing page explaining VALUE. Tool page = the actual search interface.
**Warning signs:** Both pages have identical search bars and content

### Pitfall 4: Equipment Index Performance
**What goes wrong:** Rendering 38+ cards causes layout shift or slow initial paint
**Why it happens:** All cards render immediately, images if any not optimized
**How to avoid:** Use CSS grid (handled by browser), no images in cards, simple text content
**Warning signs:** Cumulative Layout Shift (CLS) in Lighthouse, slow First Contentful Paint

### Pitfall 5: Content Accuracy for Medical Domain
**What goes wrong:** Content contains medical advice or inaccurate claims
**Why it happens:** Writing content without domain expertise
**How to avoid:** Focus on factual technical specs, use informational disclaimers, avoid safety claims
**Warning signs:** Phrases like "safe for", "will work on", "recommended for"

## Code Examples

Verified patterns from existing codebase and official sources:

### Extended Equipment Type with Rich Content
```typescript
// Source: Existing equipment.ts pattern
export interface RichContent {
  /** 2-3 sentence general overview */
  overview: string;
  /** Technical explanation of how device works */
  howItWorks: string;
  /** Common clinical applications */
  typicalUses: string;
  /** Distinguishing features */
  keyFeatures: string;
}

export interface MachineEntry {
  type: 'machine';
  slug: string;
  name: string;
  manufacturer: string;
  technologyType: TechnologyType;
  wavelengths: string[];
  brandTier: BrandTier;
  skinTypes: SkinTypeInfo;
  purposeBuilt: boolean;
  coolingMethod: string | null;
  notes: string | null;
  aliases: string[];
  family: string | null;
  deliveryMethod: string | null;
  /** Rich content for SEO - optional for backwards compatibility */
  richContent: RichContent | null;
}
```

### Equipment Card Component
```tsx
// Source: Tailwind CSS card patterns
// https://flowbite.com/docs/components/card/

import Link from 'next/link';
import type { EquipmentEntry } from '@/lib/equipment';
import { isMachine } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';

interface EquipmentCardProps {
  equipment: EquipmentEntry;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  const isLaser = isMachine(equipment)
    ? equipment.technologyType === 'laser'
    : equipment.isRealLaser;

  return (
    <Link
      href={`/is-it-a-real-laser/${equipment.slug}`}
      className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-medium text-gray-900">{equipment.name}</h4>
          {isMachine(equipment) && (
            <p className="text-sm text-gray-500">{equipment.manufacturer}</p>
          )}
        </div>
        <ClassificationBadge
          technologyType={isMachine(equipment) ? equipment.technologyType : undefined}
          isRealLaser={!isMachine(equipment) ? equipment.isRealLaser : null}
          size="small"
        />
      </div>
    </Link>
  );
}
```

### Rich Content Display in EquipmentDetails
```tsx
// Source: SEO content best practices
// https://firstpagesage.com/seo-blog/seo-content-best-practices/

{/* Rich content sections for SEO */}
{equipment.richContent && (
  <>
    {/* Overview */}
    <section className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Overview</h2>
      <p className="text-gray-700 leading-relaxed">
        {equipment.richContent.overview}
      </p>
    </section>

    {/* How It Works */}
    <section className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">How It Works</h2>
      <p className="text-gray-700 leading-relaxed">
        {equipment.richContent.howItWorks}
      </p>
    </section>

    {/* Typical Uses */}
    <section className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Typical Uses</h2>
      <p className="text-gray-700 leading-relaxed">
        {equipment.richContent.typicalUses}
      </p>
    </section>

    {/* Key Features */}
    <section className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Key Features
      </h2>
      <p className="text-gray-700 leading-relaxed">
        {equipment.richContent.keyFeatures}
      </p>
    </section>
  </>
)}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Keywords-focused content | User intent + semantic content | 2024-2025 | Write for humans, search engines follow |
| 300 words minimum | Quality over quantity | 2025 | 300 is floor, but substance matters more |
| Separate pages for each term | Terms as first-class searchable entities | Already implemented | Technology terms share search with machines |

**Deprecated/outdated:**
- Keyword stuffing: Modern SEO penalizes unnatural keyword density
- Thin template pages: Google specifically devalues pages with near-identical content
- Homepage as landing splash only: Users expect value on homepage, not just branding

## Open Questions

1. **Content source for 300+ words**
   - What we know: Need unique content for ~25 machines
   - What's unclear: How to efficiently create accurate technical content
   - Recommendation: Create structured richContent template; user provides or approves content for each machine

2. **Index organization**
   - What we know: ~38 entries total, ~25 machines + ~13 technology terms
   - What's unclear: Whether to group machines by manufacturer, tier, or technology type
   - Recommendation: Two sections (Machines, Technology Terms), alphabetical within each. Can enhance later with filtering if needed.

3. **Homepage content scope**
   - What we know: UX-01 (link to tool) and UX-02 (descriptive text)
   - What's unclear: How much additional content beyond hero section
   - Recommendation: Keep minimal for v1 - hero with value prop, link to tool, brief explanation. No guides section yet.

## Sources

### Primary (HIGH confidence)
- Existing codebase analysis (equipment.ts, components, data/equipment.json)
- [Next.js Static Exports Guide](https://nextjs.org/docs/app/guides/static-exports) - static generation patterns
- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns) - responsive grid patterns

### Secondary (MEDIUM confidence)
- [SEO Content Best Practices 2026](https://firstpagesage.com/seo-blog/seo-content-best-practices/) - content depth guidelines
- [Ecommerce Product Pages SEO](https://wedevs.com/blog/400055/ecommerce-product-pages-seo/) - 300+ word minimum, unique content importance
- [Tailwind Responsive Card Grid](https://tailwindflex.com/@amit/responsive-card-grid) - card layout patterns

### Tertiary (LOW confidence)
- None - all findings verified with primary/secondary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - using existing stack, no new dependencies
- Architecture: HIGH - patterns verified against existing codebase and official docs
- Pitfalls: HIGH - based on SEO best practices and existing implementation analysis
- Content requirements: MEDIUM - 300 word requirement clear, content creation process requires user input

**Research date:** 2026-02-13
**Valid until:** 2026-03-15 (30 days - stable domain, minimal technology churn)
