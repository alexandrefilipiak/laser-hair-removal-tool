# Project Research Summary

**Project:** Laser Hair Removal Equipment Checker
**Domain:** Consumer-facing SEO-optimized search/lookup tool
**Researched:** 2026-02-12
**Confidence:** HIGH

## Executive Summary

This is a consumer-facing lookup tool designed to help patients verify whether a laser hair removal device is a real laser or IPL. The research reveals that this tool fits a well-established pattern: SEO-optimized search databases similar to EWG Skin Deep (cosmetics), Drugs.com interaction checker, and INCIDecoder (ingredients). The winning approach combines static generation for SEO with client-side fuzzy search for instant user feedback.

The recommended stack is Next.js 15.5+ with App Router for SSG/SSR, Fuse.js for client-side fuzzy search, and JSON file storage for the ~38 equipment entries. This approach prioritizes SEO excellence through pre-rendered pages with JSON-LD schema markup while maintaining instant search responsiveness. The architecture is deliberately simple: bundle equipment data with the client, search in-memory, route to pre-generated static pages. For this dataset size (38-100 entries), complexity beyond this is premature optimization.

The critical risk is SEO thin content penalty. Individual machine pages must contain 300+ words of unique, substantive content per machine—not just templated specs. Secondary risks include fuzzy search misconfiguration (making valid machines unfindable) and medical liability creep (informational language drifting into advisory language). Both are preventable through disciplined implementation: comprehensive typo testing and strict content guidelines with prohibited phrases.

## Key Findings

### Recommended Stack

The stack research achieved HIGH confidence across all core technologies. Next.js 15.5+ with App Router provides the foundation for SEO-critical static generation while React 19 Server Components keep the JavaScript bundle minimal. TypeScript 5.7+ adds type safety for both application code and SEO schema via schema-dts. Tailwind CSS 4 brings 5x faster builds with CSS-first configuration.

**Core technologies:**
- **Next.js 15.5+**: SSR/SSG for SEO, generateMetadata API for dynamic meta tags, generateStaticParams for pre-rendering all machine pages. Vercel deployment provides best-in-class optimization.
- **Fuse.js 7.x**: Zero-dependency fuzzy search handling typos ("gentlemax" finds "GentleMax Pro"), weighted field search for name/manufacturer priority, perfect for <1000 items.
- **JSON file storage**: For ~38 entries growing to ~100, JSON is ideal. Version-controlled, trivial to edit, imported at build time for SSG, zero runtime overhead. No database needed until 500+ entries.
- **schema-dts**: Google's official TypeScript types for JSON-LD structured data. Type-safe Product and FAQPage schemas critical for rich search results.
- **shadcn/ui Command component**: Pre-built accessible autocomplete with keyboard navigation, powered by cmdk. Handles fuzzy search UI out of the box.

**What NOT to use:** next-seo for meta tags (redundant with generateMetadata), styled-components (hydration overhead), MongoDB/Postgres (overkill), Redux (no complex state), next/head (deprecated in App Router).

### Expected Features

Feature research achieved MEDIUM confidence based on comparable tool analysis (drug checkers, ingredient analyzers). Users expect instant results (<200ms), clear yes/no classification, typo tolerance, and mobile-friendly interface—these are table stakes. Missing any of these makes the product feel incomplete.

**Must have (table stakes):**
- **Fuzzy search with autocomplete** — Algolia research shows 2-character typo tolerance is baseline. "Gentlemax" must find "GentleMax Pro".
- **Clear yes/no classification** — Users come with binary question. Big checkmark/X first, details second.
- **Mobile-friendly responsive** — 60%+ traffic. Search box at top, large touch targets.
- **Disclaimer/legal protection** — Health-adjacent tools always display disclaimers prominently.

**Should have (competitive advantages):**
- **Individual SEO pages per machine** — Captures long-tail traffic ("is GentleMax Pro a real laser"). EWG Skin Deep proves this pattern.
- **"Not found" email capture** — Turns dead-end searches into leads and database expansion signals. Most tools miss this opportunity.
- **Technology term clarification** — Unique insight: "SHR" can be laser OR IPL depending on device. Addresses real consumer confusion.
- **Multi-layer classification** — Beyond binary: includes purpose-built vs multi-purpose, effectiveness ratings.

**Defer (v2+):**
- **Comparison mode** — Adds complexity. Validate core yes/no use case first, then add "X vs Y" if users request it.
- **Clinic directory integration** — Different product, different milestone. Equipment tool must validate independently.
- **User reviews/ratings** — Creates moderation burden, potential legal issues with negative reviews. Keep ratings objective based on clinical data.

### Architecture Approach

Architecture research achieved HIGH confidence. The pattern is well-established for this class of tool: static generation with client-side search. All 38+ machine pages pre-render at build time for SEO. The equipment.json file bundles with the client for instant in-memory fuzzy search. Navigation routes to pre-built static pages, eliminating any server round-trips.

**Major components:**
1. **SearchBar (client component)** — User input with Fuse.js fuzzy matching, autocomplete display. Small client island for interactivity.
2. **Machine pages (SSG)** — Individual pages for each device generated via generateStaticParams. Includes JSON-LD Product schema, generateMetadata for dynamic SEO.
3. **ResultCard (server component)** — Displays 4-layer classification (real laser/not, purpose-built/multi, effectiveness, skin type info). Renders server-side for SEO.
4. **NotFoundFlow (server component)** — Handles unknown machines with email capture form, educational content, partial match suggestions.
5. **Equipment data layer** — Single JSON file imported at build time. Type-safe with TypeScript interfaces. No database, no API routes needed.

**Key architectural patterns:** Static generation for all known pages (SEO), client island for search (UX), JSON-LD injection in server components (structured data), URL state for search queries (shareability).

**Build order:** Types first → Data model → SSG pages → Search → SEO → Polish. This dependency order ensures the tool works without search (direct URL access), then enhances with search UI, then optimizes for discovery.

### Critical Pitfalls

Pitfall research achieved HIGH confidence based on domain-specific patterns and search UX research.

1. **Fuzzy search threshold misconfiguration** — Too restrictive fails to find valid machines; too loose drowns results in irrelevant matches. Prevention: Test with 50+ realistic typo variations per major machine, not just exact names. Include brand-first searches ("Candela GentleMax" vs "GentleMax"), abbreviations, common misspellings. Track "no results" from day one and tune.

2. **SEO thin content penalty** — Template-based generation produces identical pages except machine names. Google de-indexes as "doorway pages." Prevention: Each machine page needs 300+ unique words—manufacturer context, common comparisons, user-relevant details specific to that machine. Launch with fewer high-quality pages rather than many thin pages.

3. **Medical liability creep** — Well-intentioned copywriting makes language more "helpful" but crosses from informational to advisory. "Commonly used for lighter skin" evolves to "not recommended for darker skin." Prevention: Strict language guidelines with APPROVED ("commonly used for," "discuss with provider") and PROHIBITED ("safe for," "not safe for," "recommended") phrases. Require review for content changes.

4. **"Not found" UX dead end** — User searches unknown machine, sees "Not Found," leaves. No value delivered, no engagement captured. Prevention: Design "Not Found" as first-class experience with email capture, educational content, partial matches, related machines. Track as product intelligence.

5. **Data accuracy erosion** — Initial data accurate, but manufacturers release new models or rebrand. Database goes stale, user trust erodes. Prevention: "Not found" tracking with email capture (planned), quarterly data audits against manufacturer pages, "last verified" metadata field.

6. **Brand name normalization failures** — "GentleMax" vs "Gentle Max" vs "GentleMax Pro" vs "Candela GentleMax" all need to resolve correctly. Prevention: Alias/synonym dictionary for each machine (5+ variations per top machine), input normalization (case, whitespace, punctuation).

## Implications for Roadmap

Based on research, suggested 5-phase structure prioritizing SEO foundation, then search UX, then content depth:

### Phase 1: Data Foundation & Type System
**Rationale:** All components depend on the Equipment interface and data model. Build this first to establish the classification schema (4 layers: real laser/not, purpose-built/multi, effectiveness, skin type). Architecture research shows types-first dependency.

**Delivers:**
- TypeScript interfaces for Equipment with all 4 classification layers
- equipment.json with ~38 initial entries (clinical lasers, IPL devices, technologies, multi-purpose platforms)
- Data access utilities (getEquipmentBySlug, getAllEquipmentSlugs)
- Alias/synonym dictionary for brand name normalization
- "last verified" metadata field for maintenance

**Addresses:**
- Data accuracy erosion (metadata field)
- Brand name normalization (alias dictionary)

**Avoids:**
- Technical debt from schema changes later
- Rework when adding classification layers incrementally

### Phase 2: Static Pages & SEO Foundation
**Rationale:** Proves the core build works before adding search complexity. Establishes URL structure and SEO patterns. Individual machine pages are the primary traffic driver per feature research (long-tail "is X a real laser" queries). Architecture research prioritizes SSG pages before client features.

**Delivers:**
- generateStaticParams for all machine slugs
- Individual machine pages at /is-it-a-real-laser/[slug]
- ResultCard component showing 4-layer classification
- generateMetadata for dynamic title/description per machine
- JSON-LD Product schema with schema-dts
- Custom not-found.tsx for invalid slugs (dynamicParams = false)
- robots.ts and sitemap.ts for crawler optimization

**Addresses:**
- SEO thin content risk (300+ unique words per page required)
- Individual SEO pages (table stakes feature)
- Schema markup (table stakes for rich results)

**Uses:**
- Next.js generateStaticParams, generateMetadata APIs
- schema-dts for type-safe JSON-LD
- Server Components for SEO-critical content

**Avoids:**
- Thin content penalty (content guidelines enforced from start)
- SSR for static content anti-pattern

### Phase 3: Search & Autocomplete
**Rationale:** After static pages work, add discovery mechanism. Search enhances UX but isn't critical path—tool works via direct URL. Feature research shows fuzzy search + autocomplete must ship together (autocomplete without typo tolerance frustrates users). Architecture research demonstrates client island pattern.

**Delivers:**
- Fuse.js configuration with weighted fields (name/manufacturer priority)
- SearchBar client component with state management
- Autocomplete dropdown with keyboard navigation (shadcn/ui Command)
- Fuzzy match threshold tuning (comprehensive typo test suite)
- Search input normalization (case, whitespace, punctuation)
- URL state for search queries (shareability)
- Analytics event tracking for queries (including failures)

**Addresses:**
- Fuzzy search with autocomplete (table stakes features)
- Typo tolerance (table stakes)
- Autocomplete suggestions (table stakes)
- Fuzzy search misconfiguration (critical pitfall)

**Uses:**
- Fuse.js 7.x for client-side fuzzy matching
- shadcn/ui Command component for autocomplete UI
- Client island pattern (small client component, server-rendered results)

**Avoids:**
- Fuzzy search misconfiguration (50+ typo test cases required)
- Fat client components anti-pattern (search only, not entire page)
- API-based search anti-pattern (in-memory faster for 38 items)

### Phase 4: "Not Found" Flow & Email Capture
**Rationale:** Critical for monetizing dead-end searches and informing database expansion. Feature research shows most lookup tools fail here—"Not Found" is engagement opportunity, not error state. Quick to implement (low complexity per feature research) with high user value.

**Delivers:**
- NotFoundFlow component with contextual messaging
- Email capture form with domain-specific copy ("We'll add it and notify you")
- Partial match suggestions ("Did you mean Soprano ICE?")
- Educational content links ("How to identify a real laser")
- Related machines from same manufacturer
- Analytics tracking for "not found" queries (product intelligence)

**Addresses:**
- "Not found" email capture (competitive advantage feature)
- "Not found" UX dead end (critical pitfall)
- Empty state suggestions (low-priority feature, partial implementation)

**Avoids:**
- Generic "Not Found" messaging
- Lost engagement opportunities

### Phase 5: Content Depth & Launch Preparation
**Rationale:** Final content polish to avoid thin content penalty and establish medical liability protections. Feature research prioritizes unique content per page. Pitfall research requires strict language guidelines. This phase ensures SEO quality and legal safety.

**Delivers:**
- 300+ unique words per machine page (manufacturer context, comparisons, user-relevant details)
- Technology term clarification entries (SHR, AFT, etc.) explaining nuance
- Skin type informational content (Layer 4) with strict language guidelines
- Permanent disclaimer component (prominent, not just footer)
- Content style guide with APPROVED/PROHIBITED phrases documented
- Content review process established
- Launch checklist validation (schema testing, mobile UX, analytics)

**Addresses:**
- Technology term clarification (competitive advantage feature)
- Multi-layer classification display (competitive advantage)
- Skin type info (competitive advantage)
- Disclaimer/legal protection (table stakes)
- Medical liability creep (critical pitfall)
- SEO thin content penalty (critical pitfall)

**Avoids:**
- Thin content penalty (300+ word minimum enforced)
- Medical liability exposure (language guidelines prevent advice creep)
- Generic template content

### Phase Ordering Rationale

This structure follows dependency chains identified in research:

**Types → Pages → Search → Polish** follows architecture research build order. Types establish the data contract. Pages prove the build works and establish SEO. Search adds discovery but isn't required for core function (direct URL access works). Polish prevents penalties.

**SSG before client components** follows architecture pattern for SEO-first tools. All machine pages pre-render for crawlers before adding interactive search. This validates URL structure and metadata generation independent of JavaScript.

**Email capture after search** follows feature dependency research. "Not found" flow requires search to identify misses. No point capturing emails before search drives traffic.

**Content depth last** allows iteration on content quality after core mechanics work. Can launch with fewer high-quality pages, expand based on search analytics showing which machines get traffic.

**Pitfall prevention integrated throughout** rather than separate phase. Phase 1 addresses brand normalization, Phase 2 addresses thin content, Phase 3 addresses fuzzy search, Phase 4 addresses dead ends, Phase 5 addresses liability. Each phase prevents its relevant pitfalls immediately.

### Research Flags

Phases with standard patterns (skip `/gsd:research-phase`):
- **Phase 1**: Data modeling and TypeScript interfaces—standard patterns, no research needed
- **Phase 2**: Next.js SSG with generateStaticParams—well-documented official patterns
- **Phase 3**: Fuse.js fuzzy search—library docs sufficient, standard integration
- **Phase 4**: Form handling and email capture—standard patterns
- **Phase 5**: Content writing—domain-specific but not technical research

**No phases require deep research.** All patterns are well-established and documented in the research files. Implementation can proceed directly to requirements definition.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core technologies verified with official docs, version compatibility confirmed, alternatives evaluated |
| Features | MEDIUM | Based on comparable tools (drug checkers, ingredient analyzers) rather than direct user research for this domain |
| Architecture | HIGH | Pattern is well-established for SEO-optimized lookup tools, confirmed with multiple sources |
| Pitfalls | HIGH | Domain-specific pitfalls identified from search UX research, programmatic SEO mistakes documented, fuzzy search best practices established |

**Overall confidence:** HIGH

Stack and architecture confidence is HIGH because these are well-documented technical patterns with official sources. Feature confidence is MEDIUM because it's inferred from comparable domains rather than direct laser equipment tool precedent. Pitfall confidence is HIGH because the failure modes are well-documented across similar tools.

### Gaps to Address

**User search query patterns:** Research assumes typo patterns based on fuzzy search best practices, but actual user queries for laser equipment may have domain-specific variations. **Mitigation:** Build comprehensive test suite with realistic variations (brand-first, abbreviations, misspellings) and instrument analytics from day one to tune based on real data.

**Machine page content uniqueness at scale:** Research recommends 300+ unique words per machine but with 38+ machines this is substantial content work. **Mitigation:** Launch with 10-15 high-quality pages for most-searched machines (GentleMax Pro, Soprano ICE, Forever Bare BBL), expand based on traffic analytics. Quality over quantity prevents thin content penalty.

**Email capture integration specifics:** Research recommends email capture but doesn't specify provider (Mailchimp, ConvertKit, custom). **Mitigation:** Simple HTML form POST to serverless function initially, integrate with email provider in Phase 4 based on volume. Don't over-engineer before validating demand.

**Analytics event taxonomy:** Research requires search query tracking but doesn't define exact event schema. **Mitigation:** Define during Phase 3 implementation. Minimum events: search_query (query, results_count), search_not_found (query), machine_page_view (slug, source).

**Content style guide completeness:** Research identifies APPROVED/PROHIBITED phrases for liability protection but doesn't provide comprehensive style guide. **Mitigation:** Create during Phase 5 with legal review. Document rationale so future editors understand the why, not just the what.

## Sources

### Primary (HIGH confidence)

**Stack:**
- [Next.js 15.5 Release Notes](https://nextjs.org/blog/next-15-5) — Turbopack, typed routes, metadata improvements
- [Next.js Metadata API Reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — generateMetadata patterns
- [Tailwind CSS v4.0 Announcement](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first config, performance
- [Fuse.js Official Docs](https://www.fusejs.io/) — Fuzzy search configuration
- [schema-dts GitHub](https://github.com/google/schema-dts) — Google's JSON-LD types

**Features:**
- [Baymard Institute: Autocomplete Design](https://baymard.com/blog/autocomplete-design) — 9 UX best practices
- [Algolia: Fuzzy Search 101](https://www.algolia.com/blog/engineering/fuzzy-search-101) — Typo tolerance standards
- [EWG Skin Deep](https://www.ewg.org/skindeep/) — Comparable lookup tool analysis
- [Drugs.com Interaction Checker](https://www.drugs.com/drug_interactions.html) — Severity classification patterns

**Architecture:**
- [Next.js Official SEO Documentation](https://nextjs.org/learn/seo) — SEO patterns and best practices
- [Next.js generateStaticParams Reference](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — Static generation patterns
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) — Structured data implementation

**Pitfalls:**
- [Meilisearch: Fuzzy Search Guide](https://www.meilisearch.com/blog/fuzzy-search) — Search misconfiguration prevention
- [Baymard: No Results Page UX](https://baymard.com/blog/no-results-page) — "Not found" best practices
- [Seomatic: Programmatic SEO Mistakes](https://seomatic.ai/blog/programmatic-seo-mistakes) — Thin content prevention
- [Termly: Medical Disclaimer Examples](https://termly.io/resources/articles/medical-disclaimer-examples/) — Liability protection

### Secondary (MEDIUM confidence)

- [Vercel Analytics vs GA comparison](https://www.mikul.me/blog/vercel-analytics-vs-google-analytics-which-to-choose) — Analytics selection
- [Design Monks: Search UX 2026](https://www.designmonks.co/blog/search-ux-best-practices) — Search UX patterns
- [npm trends: Search library comparison](https://npmtrends.com/flexsearch-vs-fuse.js-vs-fuzzysort-vs-match-sorter-vs-minisearch) — Library popularity
- [Next.js Architecture 2026](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router) — Project structure patterns

---
*Research completed: 2026-02-12*
*Ready for roadmap: Yes*
