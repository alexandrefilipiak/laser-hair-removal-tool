---
phase: 02-static-pages-seo
plan: 03
subsystem: seo
tags: [next.js, ssg, json-ld, sitemap, robots.txt, seo, metadata]

# Dependency graph
requires:
  - phase: 02-01
    provides: Next.js app shell and layout
  - phase: 02-02
    provides: EquipmentDetails and TechnologyTermDetails components
provides:
  - Dynamic [slug] routes with SSG
  - JSON-LD Product and DefinedTerm schemas
  - sitemap.xml generation
  - robots.txt configuration
  - Custom 404 with "ask your clinic" guidance
affects: [03-search-filtering, deployment]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Next.js 16 async params pattern (await params)
    - dynamicParams: false for SSG-only routes
    - JSON-LD via script tag injection
    - MetadataRoute for sitemap/robots

key-files:
  created:
    - src/app/is-it-a-real-laser/[slug]/page.tsx
    - src/app/is-it-a-real-laser/[slug]/not-found.tsx
    - src/app/not-found.tsx
    - src/app/sitemap.ts
    - src/app/robots.ts
    - src/lib/schema.ts
  modified:
    - src/components/EquipmentDetails.tsx
    - src/components/TechnologyTermDetails.tsx

key-decisions:
  - "Used dynamicParams: false to serve 404 for unknown slugs without server"
  - "JSON-LD uses Product schema for machines, DefinedTerm for technology terms"
  - "Hardcoded BASE_URL in sitemap (laserhairremovalmap.com) per research recommendation"
  - "Added 'Search Equipment' navigation on all detail pages for UX consistency"

patterns-established:
  - "Next.js 16 async params: always await params before use"
  - "SSG route pattern: generateStaticParams + dynamicParams: false"
  - "JSON-LD injection via JsonLd component with script tag"

# Metrics
duration: ~15min
completed: 2026-02-13
---

# Phase 2 Plan 3: Dynamic Routes & SEO Summary

**Dynamic [slug] routes with SSG, JSON-LD schema markup, sitemap.xml, robots.txt, and custom 404 handling for complete SEO infrastructure**

## Performance

- **Duration:** ~15 min (including checkpoint verification)
- **Started:** 2026-02-13
- **Completed:** 2026-02-13
- **Tasks:** 4
- **Files modified:** 8

## Accomplishments

- Dynamic equipment pages at /is-it-a-real-laser/[slug] with full SSG
- JSON-LD Product schema for machines, DefinedTerm schema for technology terms
- sitemap.xml listing all equipment pages with proper priorities
- robots.txt allowing all crawlers with sitemap reference
- Custom 404 with "ask your clinic what brand they use" guidance
- Consistent "Search Equipment" navigation across all detail pages

## Task Commits

Each task was committed atomically:

1. **Task 1: Create JSON-LD schema generators** - `98fe537` (feat)
2. **Task 2: Create dynamic [slug] route with SSG and metadata** - `ed2cad4` (feat)
3. **Task 3: Create sitemap and robots.txt** - `fc6ca78` (feat)
4. **Task 4: Verify complete implementation** - `5313005` (fix - navigation improvements)

**Additional fix during implementation:** `d6da127` (fix - force-static export and display text)

## Files Created/Modified

- `src/lib/schema.ts` - JSON-LD schema generators for Product and DefinedTerm
- `src/app/is-it-a-real-laser/[slug]/page.tsx` - Dynamic route with SSG, metadata, JSON-LD
- `src/app/is-it-a-real-laser/[slug]/not-found.tsx` - Slug-specific 404 with clinic guidance
- `src/app/not-found.tsx` - Global 404 handling all routes
- `src/app/sitemap.ts` - Dynamic sitemap generation from equipment data
- `src/app/robots.ts` - Crawler access configuration
- `src/components/EquipmentDetails.tsx` - Added Search Equipment navigation
- `src/components/TechnologyTermDetails.tsx` - Added Search Equipment navigation

## Decisions Made

1. **dynamicParams: false** - Ensures unknown slugs get 404 without needing a server, fully static
2. **JSON-LD schema types** - Product for machines (has manufacturer, brand), DefinedTerm for technology terms (more semantically accurate than Product)
3. **Hardcoded BASE_URL** - Using laserhairremovalmap.com directly in sitemap rather than env var (can change later if needed)
4. **Search Equipment navigation** - Added consistent back navigation to /is-it-a-real-laser on all detail pages and 404

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed force-static export configuration**
- **Found during:** Task 2 (Dynamic route implementation)
- **Issue:** Build was attempting dynamic rendering despite SSG intent
- **Fix:** Added `export const dynamic = 'force-static'` to page.tsx
- **Files modified:** src/app/is-it-a-real-laser/[slug]/page.tsx
- **Verification:** Build completes with all static pages generated
- **Committed in:** d6da127

**2. [Rule 2 - Missing Critical] Added navigation consistency**
- **Found during:** Task 4 (Verification checkpoint)
- **Issue:** Detail pages had no way to navigate back to search
- **Fix:** Added "Search Equipment" link to EquipmentDetails, TechnologyTermDetails, and 404 pages
- **Files modified:** src/components/EquipmentDetails.tsx, src/components/TechnologyTermDetails.tsx, src/app/is-it-a-real-laser/[slug]/not-found.tsx
- **Verification:** All detail pages now have consistent navigation
- **Committed in:** 5313005

**3. [Rule 2 - Missing Critical] Added global 404 handler**
- **Found during:** Task 4 (Verification checkpoint)
- **Issue:** Only slug-specific 404 existed; other routes had no custom 404
- **Fix:** Created src/app/not-found.tsx with equipment-aware messaging
- **Files modified:** src/app/not-found.tsx (created)
- **Verification:** Non-equipment routes now show appropriate 404
- **Committed in:** 5313005

---

**Total deviations:** 3 auto-fixed (1 blocking, 2 missing critical)
**Impact on plan:** All fixes necessary for complete UX and correct static generation. No scope creep.

## Issues Encountered

None - all checks passed during verification.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 2 complete. All 8 success criteria from ROADMAP met:
1. User can visit /is-it-a-real-laser/[slug] for any equipment entry
2. Clear "Real Laser" or "Not a Laser" classification displayed
3. Brand tier and purpose-built distinction shown
4. Disclaimer appears on every result page
5. Unique meta title, description, and JSON-LD schema on each page
6. sitemap.xml lists all pages, robots.txt allows crawlers
7. Pages render correctly on mobile
8. Unknown slugs show "ask your clinic" messaging

Ready for Phase 3: Search & Filtering.

---
*Phase: 02-static-pages-seo*
*Completed: 2026-02-13*
