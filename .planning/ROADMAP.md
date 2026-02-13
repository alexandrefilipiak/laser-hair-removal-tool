# Roadmap: Laser Equipment Checker Tool

## Overview

This roadmap delivers a consumer-facing equipment verification tool in 5 phases. The journey progresses from data foundation (establishing the equipment database and type system) through static pages for SEO, interactive search, robust "not found" handling, and finally content depth with launch preparation. Each phase builds on the previous, with static pages working before search is added, ensuring the tool functions via direct URL access even before interactive features are complete.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Data Foundation** - Equipment database and TypeScript type system
- [x] **Phase 2: Static Pages & SEO** - Individual machine pages with SSG and schema markup
- [x] **Phase 3: Search & Autocomplete** - Fuzzy search with real-time suggestions
- [x] **Phase 4: Not Found Flow** - Partial matches and related machine suggestions
- [x] **Phase 5: Content Depth & Launch** - Technology clarification, skin type info, and homepage

## Phase Details

### Phase 1: Data Foundation
**Goal**: Establish the complete equipment database with all classification data and type-safe access utilities
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06, DATA-07
**Success Criteria** (what must be TRUE):
  1. Equipment JSON file contains all ~38 Phase 1 entries (clinical lasers, home lasers, technologies, multi-purpose)
  2. Each entry includes all classification fields: name, manufacturer, technology type, wavelengths, purpose, skin type info, brand tier, cooling method, notes, aliases
  3. Technology term entries (SHR, AFT, BBL, E-Light, OPT, DPL) include clarification text explaining what each term means
  4. Data access utilities (getEquipmentBySlug, getAllEquipmentSlugs) return correctly typed data
  5. Alias/synonym dictionary resolves multiple search variations to the same machine
**Plans:** 2 plans

Plans:
- [x] 01-01-PLAN.md - TypeScript types and TDD-driven lookup utilities
- [x] 01-02-PLAN.md - Complete equipment data population (~38 entries)

### Phase 2: Static Pages & SEO
**Goal**: Individual machine pages exist at SEO-friendly URLs with proper metadata and schema markup
**Depends on**: Phase 1
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-07, SEO-08, SEO-09, CLAS-01, CLAS-02, CLAS-03, CLAS-04, CLAS-07, CLAS-09
**Success Criteria** (what must be TRUE):
  1. User can visit /is-it-a-real-laser/[slug] for any equipment entry and see its classification
  2. Each machine page displays clear "Real Laser" or "Not a Laser" classification prominently
  3. Each machine page shows brand tier, purpose-built/multi-purpose distinction
  4. Permanent disclaimer appears on every result page
  5. Each page has unique meta title, description, and JSON-LD Product schema visible to crawlers
  6. sitemap.xml lists all machine pages and robots.txt allows crawler access
  7. Pages render correctly on mobile devices (responsive layout)
  8. Unknown brand searches (if user navigates to non-existent slug) show "ask your clinic what brand" messaging
**Plans:** 3 plans

Plans:
- [x] 02-01-PLAN.md - Bootstrap Next.js 15 with Tailwind CSS and root layout
- [x] 02-02-PLAN.md - Create UI components (classification badges, details, disclaimer)
- [x] 02-03-PLAN.md - Dynamic [slug] route, SEO infrastructure, and verification

### Phase 3: Search & Autocomplete
**Goal**: Users can search by typing and see instant fuzzy-matched suggestions
**Depends on**: Phase 2
**Requirements**: SRCH-01, SRCH-02, SRCH-03, SRCH-04, SRCH-06, SRCH-07, UX-03, UX-04
**Success Criteria** (what must be TRUE):
  1. Main tool page has prominent search bar that responds to user input
  2. Autocomplete suggestions appear as user types, within 200ms
  3. Search handles typos (e.g., "gentlemax" finds "GentleMax Pro")
  4. Search normalizes input (case-insensitive, ignores extra whitespace and punctuation)
  5. Brand aliases resolve correctly (multiple ways to find same machine)
  6. Results display classification layers in clear visual hierarchy before user clicks through
**Plans:** 2 plans

Plans:
- [x] 03-01-PLAN.md - Search hooks (useDebounce, useSearch with Fuse.js)
- [x] 03-02-PLAN.md - Search UI components and homepage integration

### Phase 4: Not Found Flow
**Goal**: Unknown machine searches provide helpful suggestions instead of dead ends
**Depends on**: Phase 3
**Requirements**: UX-05, UX-06, UX-07
**Success Criteria** (what must be TRUE):
  1. When search returns no exact match, user sees "Did you mean...?" partial match suggestions
  2. User sees related machines from the same manufacturer when available
  3. Search results link to relevant machine pages for easy navigation
**Plans:** 2 plans

Plans:
- [x] 04-01-PLAN.md - Data utilities and loose search hook
- [x] 04-02-PLAN.md - Not found UI components and integration

### Phase 5: Content Depth & Launch
**Goal**: Complete content layer with technology clarification, skin type info, and homepage
**Depends on**: Phase 4
**Requirements**: SRCH-05, CLAS-05, CLAS-06, CLAS-08, SEO-05, SEO-06, UX-01, UX-02, UX-08
**Success Criteria** (what must be TRUE):
  1. User can search for technology terms (SHR, AFT, BBL) and see clarification that explains what the term means
  2. Technology term pages exist at their own URLs (/is-it-a-real-laser/shr, etc.)
  3. Each machine page displays skin type informational content (informational only, no safety recommendations)
  4. Each machine page has 300+ words of unique content (not just templated specs)
  5. Homepage exists with link to equipment checker tool and descriptive text explaining purpose
  6. Tool page displays browseable index of all equipment at bottom for discovery
**Plans:** 3 plans

Plans:
- [x] 05-01-PLAN.md - Data enrichment with richContent for 300+ word machine pages
- [x] 05-02-PLAN.md - Browseable equipment index for tool page discovery
- [x] 05-03-PLAN.md - Homepage enhancement with value proposition and CTA

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Data Foundation | 2/2 | Complete | 2026-02-12 |
| 2. Static Pages & SEO | 3/3 | Complete | 2026-02-13 |
| 3. Search & Autocomplete | 2/2 | Complete | 2026-02-13 |
| 4. Not Found Flow | 2/2 | Complete | 2026-02-13 |
| 5. Content Depth & Launch | 3/3 | Complete | 2026-02-13 |

---
*Roadmap created: 2026-02-12*
*Total v1 requirements: 37 | Phases: 5 | Coverage: 100%*
