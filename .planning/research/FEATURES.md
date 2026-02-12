# Feature Research

**Domain:** Consumer-facing lookup/verification tools
**Researched:** 2026-02-12
**Confidence:** MEDIUM (based on WebSearch analysis of comparable tools: drug interaction checkers, skincare ingredient analyzers, product lookup databases)

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Instant search results** | Drug.com, EWG Skin Deep, INCIDecoder all return results in <200ms. Users abandon slow searches. | MEDIUM | Requires optimized search index. Pre-load data for client-side search or use fast backend (Typesense, Meilisearch). |
| **Clear yes/no classification** | Users come with a binary question ("Is this a real laser?"). Ambiguity defeats the purpose. | LOW | UI design challenge, not technical. Use visual hierarchy: big checkmark/X first, details second. |
| **Typo tolerance (fuzzy search)** | Industry standard. Algolia research: 2-character typo tolerance is baseline. "Gentlemax" must find "GentleMax Pro". | MEDIUM | Use Levenshtein distance or dedicated search engine. Most fuzzy libraries handle this out of box. |
| **Mobile-friendly interface** | 60%+ traffic is mobile. Ingredient checker apps (OnSkin, Think Dirty) are mobile-first. | LOW | Standard responsive design. Search box at top, results below. |
| **Disclaimer/legal protection** | EWG Skin Deep, drug interaction checkers all display disclaimers. Users expect them for health-adjacent tools. | LOW | Static text. Place prominently but don't obstruct results. |
| **Severity/rating visualization** | Drug checkers use color-coded severity (red/yellow/green). EWG uses 1-10 scores with color bands. Users expect visual hierarchy. | LOW | Use consistent visual language: green checkmark = good, red X = bad, yellow warning = nuanced. |
| **Autocomplete suggestions** | Baymard research: 81% of top e-commerce sites have autocomplete. Users expect to see suggestions as they type. | MEDIUM | Show 6-8 suggestions max. Highlight matching portion of text. Include product images if available. |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Individual SEO pages per machine** | EWG Skin Deep creates pages for each product. Captures long-tail search traffic ("is GentleMax Pro a real laser"). | MEDIUM | Generate static pages for each machine. ~38 pages in Phase 1. Schema markup (FAQPage, Product) for rich snippets. |
| **"Not found" email capture** | Turns dead-end searches into leads and database expansion opportunities. Most lookup tools just say "not found" — this monetizes the gap. | LOW | Simple form: "We don't have this yet. Enter email to be notified when we add it." Collect machine name + email. |
| **Technology term clarification** | Nobody else explains that "SHR" can be laser OR IPL depending on device. This addresses real consumer confusion from Reddit/RealSelf threads. | LOW | Create ~6 technology entries that explain the nuance and tell users what to ask their clinic. |
| **Multi-layer classification** | Goes beyond binary (laser/IPL) to include purpose-built vs multi-purpose and effectiveness ratings. EWG does similar with health/environment scores. | LOW | Data modeling complexity, not technical. Already designed in LASER_EQUIPMENT_TOOL.md. |
| **Skin type information (informational)** | INCIDecoder shows ingredient suitability. Our tool can show wavelength-to-Fitzpatrick relationships without medical advice. | LOW | Static text per machine. Clear disclaimer that it's informational only. |
| **Manufacturer/brand search** | Search "Candela" and see all their machines. Drug checkers allow manufacturer filtering. | LOW | Simple filter/search expansion. Low effort, high convenience. |
| **Comparison mode** | Drug interaction checkers let you compare multiple drugs. "Compare GentleMax Pro vs Soprano ICE" would be valuable. | MEDIUM | Requires side-by-side UI. Defer to v1.x — adds complexity without validating core value. |
| **Empty state suggestions** | Show popular searches or recent lookups before user types anything. Algolia calls this "federated search" — reduces friction for first-time users. | LOW | Show "Popular searches: GentleMax Pro, Soprano ICE, Forever Bare BBL" before typing starts. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **User reviews/ratings of machines** | Seems like natural extension — let users rate equipment | Creates moderation burden, potential legal issues with negative reviews, dilutes the core "is it a laser?" value | Keep ratings objective (gold standard/effective/adequate based on clinical data, not user opinion) |
| **Clinic equipment verification** | Users want to know what THEIR clinic uses | Requires clinic cooperation, data freshness problems, legal issues if clinic equipment changes | Phase 2: Let clinics claim listings. Phase 1: Tool educates consumers to ASK their clinic. |
| **Medical advice / "safe for you"** | Users want personalized recommendations | Liability nightmare. If we say "safe for your skin" and someone gets burned, we're liable. | Informational only: "This wavelength is commonly used for Fitzpatrick I-III. Discuss with your provider." |
| **Real-time price comparison** | Natural consumer desire | Prices vary wildly, require constant maintenance, clinics would object to price transparency | Out of scope. Tool focuses on equipment quality, not price. |
| **User accounts / saved searches** | Standard SaaS pattern | Unnecessary friction for a lookup tool. No ongoing relationship needed. | Cookie-based recent searches at most. No login required. |
| **Full clinic directory in v1** | Natural extension of equipment tool | Different product, different SEO strategy, massive scope expansion | Build equipment tool first. Validate. Then add directory as separate milestone. |
| **Consumer IPL device database** | Users search for home devices | These users aren't looking for clinics (directory goal). Different audience, different intent. | Phase 3 at earliest. Brand-level entries only ("All Braun devices = IPL"), not model-level. |
| **Chat support / AI assistant** | Trendy feature | Overkill for simple lookup. Adds complexity, hosting costs, maintenance. | Clear, well-written result pages eliminate need for support. |

## Feature Dependencies

```
[Fuzzy Search]
    |
    v
[Autocomplete] ---- requires fuzzy matching to work well
    |
    v
[Search Results Display]
    |
    +---> [Individual Machine Pages] ---- requires search to identify popular machines
    |
    +---> ["Not Found" Flow] ---- handles search misses
              |
              v
           [Email Capture] ---- converts misses to leads

[Multi-Layer Classification (Data Model)]
    |
    +---> [Clear Yes/No UI]
    |
    +---> [Severity Visualization]
    |
    +---> [Skin Type Info]

[Technology Term Entries]
    |
    v
[Device Entries] ---- technology entries explain concepts, device entries are specific

[Individual SEO Pages]
    |
    +---> requires [Schema Markup]
    +---> requires [Clear Yes/No UI] ---- reuse components

[Comparison Mode] ---- conflicts with ---- [Simple Single-Result UI]
(Keep simple for v1, add comparison later if validated)
```

### Dependency Notes

- **Fuzzy Search requires Autocomplete:** Autocomplete without fuzzy matching shows no results for typos, frustrating users. These must ship together.
- **Individual SEO Pages require Search:** Need search analytics to identify which machines deserve dedicated pages (start with known high-volume: GentleMax Pro, Soprano ICE, Forever Bare BBL).
- **"Not Found" Flow requires Email Capture:** The flow is pointless without capturing the lead. Ship together.
- **Comparison Mode conflicts with Simple UI:** Adding comparison in v1 complicates the interface. Users come for binary yes/no. Defer comparison to v1.x after validating core use case.

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [x] **Fuzzy search with autocomplete** — Core functionality. Users type, see suggestions, get results.
- [x] **Clear yes/no classification display** — The one thing the tool must do well.
- [x] **~38 equipment entries** — All clinical lasers + technologies + multi-purpose platforms.
- [x] **Mobile-friendly responsive design** — Majority of traffic.
- [x] **Permanent disclaimer** — Legal protection.
- [x] **"Not found" email capture** — Monetize dead-ends, inform database expansion.
- [x] **Individual pages for top 10 machines** — SEO foundation for long-tail traffic.

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] **Comparison mode** — Trigger: Users requesting "X vs Y" in search queries or feedback.
- [ ] **Empty state popular searches** — Trigger: Analytics showing users staring at empty search box.
- [ ] **Expanded SEO pages** — Trigger: Individual pages ranking well, driving traffic.
- [ ] **Professional IPL entries (Phase 2)** — Trigger: High volume of "not found" for IPL devices.

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] **Clinic directory integration** — Why defer: Different product, different milestone. Tool must validate independently.
- [ ] **Consumer IPL database** — Why defer: Different user intent. These users aren't clinic shoppers.
- [ ] **API for third parties** — Why defer: No demand signal yet. Build if clinics want to embed.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Fuzzy search | HIGH | MEDIUM | P1 |
| Autocomplete | HIGH | MEDIUM | P1 |
| Clear yes/no display | HIGH | LOW | P1 |
| Mobile-friendly | HIGH | LOW | P1 |
| Disclaimer | MEDIUM | LOW | P1 |
| "Not found" email capture | MEDIUM | LOW | P1 |
| Individual SEO pages (top 10) | HIGH | MEDIUM | P1 |
| Schema markup | MEDIUM | LOW | P1 |
| Technology term clarification | MEDIUM | LOW | P1 |
| Multi-layer classification display | MEDIUM | LOW | P1 |
| Skin type info (informational) | MEDIUM | LOW | P1 |
| Empty state suggestions | LOW | LOW | P2 |
| Manufacturer search | LOW | LOW | P2 |
| Comparison mode | MEDIUM | MEDIUM | P2 |
| Expanded SEO pages (all 38) | MEDIUM | MEDIUM | P2 |
| Professional IPL entries | LOW | LOW | P3 |
| Consumer IPL (by brand) | LOW | LOW | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | EWG Skin Deep | INCIDecoder | Drug.com Interaction Checker | Our Approach |
|---------|---------------|-------------|------------------------------|--------------|
| **Search speed** | <200ms | <200ms | <200ms | Match — client-side search or fast backend |
| **Result clarity** | 1-10 score with color | Good/bad icons per ingredient | Severity levels (major/moderate/minor) | Binary (Real Laser / Not Laser) + layers |
| **Fuzzy search** | Yes | Yes | Yes | Yes — table stakes |
| **Autocomplete** | Yes | Yes | Yes | Yes — table stakes |
| **Individual pages** | Yes (per product) | Yes (per product and ingredient) | No | Yes (per machine) — SEO strategy |
| **"Not found" capture** | No — just "not found" | No | No | **Yes — differentiator** |
| **Technology explanations** | Ingredient function explanations | Detailed ingredient breakdowns | Mechanism explanations | Technology terms (SHR, AFT) — **differentiator** |
| **Comparison mode** | No | Yes (compare products) | Yes (check multiple drugs) | v1.x — defer |
| **Mobile app** | Yes | No | No | No — web-first, mobile-responsive |
| **User accounts** | Optional | No | No | No — unnecessary friction |
| **Disclaimer** | Yes | Yes | Yes | Yes — table stakes |

## Sources

- [Baymard Institute: Autocomplete Design Patterns](https://baymard.com/blog/autocomplete-design) — 9 UX best practices, only 19% of sites get everything right
- [Algolia: Fuzzy Search 101](https://www.algolia.com/blog/engineering/fuzzy-search-101) — Typo tolerance is essential, 2-character threshold standard
- [EWG Skin Deep Database](https://www.ewg.org/skindeep/) — Product lookup with 1-10 rating, individual product pages
- [INCIDecoder](https://incidecoder.com/) — Ingredient analyzer with detailed breakdowns, comparison feature
- [Drugs.com Interaction Checker](https://www.drugs.com/drug_interactions.html) — Severity classification, mechanism explanations
- [Design Monks: Search UX Best Practices 2026](https://www.designmonks.co/blog/search-ux-best-practices) — Comprehensive search UX guide
- [Meilisearch: Fuzzy Search Implementation](https://www.meilisearch.com/blog/fuzzy-search) — Technical implementation guidance
- [SkinSort Ingredient Analyzer](https://skinsort.com/ingredient-analyzer) — Paste ingredient list, get analysis
- [Paula's Choice Beautypedia](https://www.paulaschoice.com/beautypedia-ingredient-checker) — Research-backed ingredient ratings

---
*Feature research for: Consumer-facing lookup/verification tools*
*Researched: 2026-02-12*
