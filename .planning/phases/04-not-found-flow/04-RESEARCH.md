# Phase 4: Not Found Flow - Research

**Researched:** 2026-02-13
**Domain:** Search UX / Fuzzy matching fallback patterns
**Confidence:** HIGH

## Summary

Phase 4 transforms the "no results" state from a dead-end into a helpful discovery opportunity. The existing Fuse.js implementation (threshold 0.3) provides exact-enough matches, but when users search for unknown equipment, they currently see only a generic "No equipment found" message with a link to browse all equipment. This phase adds partial match suggestions ("Did you mean...?") and related machines from the same manufacturer.

The key insight is that Fuse.js already returns scored results - we can leverage a higher threshold (0.5) for "low confidence" partial matches when the stricter search (0.3) returns nothing. For manufacturer-related suggestions, the existing `manufacturer` field on MachineEntry enables simple array filtering - no additional Fuse.js queries needed.

**Primary recommendation:** Extend existing useSearch hook with a secondary "loose search" mode (threshold 0.5), and add a `getRelatedByManufacturer()` utility function to equipment.ts for manufacturer-based suggestions.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Fuse.js | ^7.1.0 | Fuzzy search with scoring | Already installed; threshold adjustment enables partial matches |
| React | ^19.2.4 | UI components | Already in use |
| Next.js | ^16.1.6 | Static generation | Already in use |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none needed) | - | - | Phase 4 requires no additional dependencies |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Threshold 0.5 for loose search | Threshold 0.6 (Fuse default) | 0.5 provides better balance - not too loose, catches typos |
| Array.filter for manufacturer | Fuse.js logical query | Array.filter is simpler, more readable, equally fast for small dataset |

**Installation:**
```bash
# No new packages needed - all dependencies already installed
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── hooks/
│   └── useSearch.ts          # Extend: add useLooseSearch or mode param
├── lib/
│   └── equipment.ts          # Add: getRelatedByManufacturer()
│                             # Add: getAllEquipment() for filtering
├── components/
│   ├── SearchBar.tsx         # Modify: render NotFoundSuggestions
│   ├── NotFoundSuggestions.tsx  # NEW: "Did you mean?" + related
│   └── SuggestionItem.tsx    # NEW: reusable suggestion row
└── app/
    └── is-it-a-real-laser/
        └── [slug]/
            └── not-found.tsx # Modify: add related machines section
```

### Pattern 1: Two-Tier Search Strategy
**What:** Use strict search (threshold 0.3) as primary, fall back to loose search (threshold 0.5) when no results
**When to use:** Autocomplete dropdown shows "No results" state
**Example:**
```typescript
// Source: Fuse.js official docs - https://www.fusejs.io/api/options.html
// When strict search returns nothing, try loose search for suggestions
const strictResults = useSearch(equipment, query); // threshold 0.3
const looseResults = useLooseSearch(equipment, query); // threshold 0.5

// Only show "Did you mean?" when strict fails but loose succeeds
const showSuggestions = strictResults.length === 0 && looseResults.length > 0;
```

### Pattern 2: Manufacturer-Based Related Items
**What:** Filter equipment array by manufacturer field for "Related machines" section
**When to use:** User navigates to unknown slug or no exact search match
**Example:**
```typescript
// Simple array filter - no need for Fuse.js here
export function getRelatedByManufacturer(
  manufacturer: string,
  excludeSlug?: string,
  limit = 3
): MachineEntry[] {
  return entries
    .filter((e): e is MachineEntry =>
      isMachine(e) &&
      e.manufacturer === manufacturer &&
      e.slug !== excludeSlug
    )
    .slice(0, limit);
}
```

### Pattern 3: Progressive Disclosure in Not Found UI
**What:** Show suggestions in priority order: partial matches first, then related by manufacturer
**When to use:** Rendering NotFoundSuggestions component
**Example:**
```typescript
// Priority: exact-ish matches > same manufacturer > browse all
{partialMatches.length > 0 && (
  <DidYouMean suggestions={partialMatches} query={query} />
)}
{relatedMachines.length > 0 && (
  <RelatedMachines machines={relatedMachines} />
)}
<BrowseAllLink />
```

### Anti-Patterns to Avoid
- **Running Fuse.js multiple times with different thresholds on every keystroke:** Create separate hooks with memoized Fuse instances
- **Showing too many suggestions:** Limit to 3-5 items to avoid choice paralysis (Baymard research)
- **Hiding the search input after no results:** Keep search visible so users can refine their query
- **Showing duplicate suggestions:** If a partial match and a related-by-manufacturer are the same, deduplicate

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Fuzzy string matching | Custom Levenshtein implementation | Fuse.js threshold adjustment | Fuse.js is already installed and optimized |
| Partial match scoring | Custom scoring algorithm | Fuse.js includeScore option | Fuse.js score is 0-1, lower = better match |
| "Did you mean" detection | Edit distance calculation | Fuse.js loose threshold results | Threshold 0.5 catches most typos/partials |

**Key insight:** The existing Fuse.js configuration does 90% of the work. Phase 4 is primarily about leveraging existing scored results differently and adding manufacturer filtering.

## Common Pitfalls

### Pitfall 1: Threshold Confusion
**What goes wrong:** Developers assume higher threshold = stricter matching (opposite is true)
**Why it happens:** Intuition says "higher standard = higher threshold" but Fuse.js uses 0 = perfect, 1 = anything
**How to avoid:** Document in code comments: `threshold: 0.3 // Lower = stricter, 0 = exact match only`
**Warning signs:** Loose search returning fewer results than strict search

### Pitfall 2: Showing Suggestions Before User Finishes Typing
**What goes wrong:** "Did you mean?" flickers as user types each character
**Why it happens:** Debounce not applied or too short
**How to avoid:** Use same 150ms debounce for loose search as for strict search
**Warning signs:** UI flickers, suggestions appear/disappear rapidly

### Pitfall 3: No Results in Both Searches
**What goes wrong:** User types complete gibberish, both strict and loose return empty
**Why it happens:** No equipment matches even at 0.5 threshold
**How to avoid:** Always provide a fallback - "Browse all equipment" link
**Warning signs:** User sees only empty state with no action items

### Pitfall 4: Duplicate Results in Suggestions
**What goes wrong:** Same machine appears in both "Did you mean?" and "Related machines"
**Why it happens:** Partial match is also from same manufacturer as something user might be looking for
**How to avoid:** Deduplicate by slug before rendering
**Warning signs:** User sees "GentleMax Pro" in both sections

### Pitfall 5: Server/Client Mismatch for Not Found Page
**What goes wrong:** Related machines section flickers or hydration error
**Why it happens:** Not Found page is a Server Component but filtering requires client state
**How to avoid:** Pass related machines from server via searchParams or context, or make NotFoundSuggestions a Client Component that receives manufacturer as prop
**Warning signs:** Hydration warnings in console, content flash

## Code Examples

Verified patterns from official sources:

### Fuse.js Threshold Adjustment for Loose Search
```typescript
// Source: https://www.fusejs.io/api/options.html
// Strict search (existing)
const strictOptions: IFuseOptions<EquipmentEntry> = {
  threshold: 0.3, // Lower = stricter
  // ... other options
};

// Loose search for "Did you mean?"
const looseOptions: IFuseOptions<EquipmentEntry> = {
  threshold: 0.5, // Higher = more permissive
  // ... same other options
};
```

### Using Fuse.js Score to Filter Low-Confidence Results
```typescript
// Source: https://www.fusejs.io/concepts/scoring-theory.html
// Score is 0-1 where 0 = perfect match
// Filter out results with score > 0.4 even in loose search
const suggestions = looseResults
  .filter(r => r.score !== undefined && r.score < 0.4)
  .slice(0, 3);
```

### Manufacturer-Based Filtering
```typescript
// No external library needed - simple array operations
export function getRelatedByManufacturer(
  manufacturer: string,
  excludeSlug?: string,
  limit = 3
): MachineEntry[] {
  const machines = entries.filter(
    (entry): entry is MachineEntry => entry.type === 'machine'
  );

  return machines
    .filter(m => m.manufacturer === manufacturer && m.slug !== excludeSlug)
    .slice(0, limit);
}
```

### ARIA Pattern for Suggestion Region
```typescript
// Source: WAI-ARIA practices for live regions
// Announce suggestions to screen readers
<div role="status" aria-live="polite" aria-atomic="true">
  {suggestions.length > 0 && (
    <span className="sr-only">
      {suggestions.length} suggestions available
    </span>
  )}
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Generic "No results" message | Contextual suggestions (partial matches + related) | ~2020-present | Reduces abandonment by 20-40% per Baymard |
| Single threshold fuzzy search | Multi-threshold with fallback | Standard practice | Better UX for edge cases |
| Server-side "did you mean" | Client-side instant suggestions | SPA era | Faster feedback loop |

**Deprecated/outdated:**
- Spell-check APIs for "did you mean" (Fuse.js handles typos natively with threshold)
- Manual Levenshtein distance calculation (use Fuse.js scoring)

## Integration with Existing Code

### SearchBar.tsx Modifications
The existing empty state (lines 205-218) currently shows:
```tsx
{showEmptyState && (
  <div className="...">
    <p>No equipment found for "{debouncedQuery}"</p>
    <a href="/is-it-a-real-laser">Browse all equipment</a>
  </div>
)}
```

Phase 4 replaces this with NotFoundSuggestions component that:
1. Calls loose search for partial matches
2. Optionally shows related-by-manufacturer (if query looks like a brand)
3. Falls back to "Browse all equipment"

### equipment.ts Additions
Add these exports:
- `getAllEquipment(): EquipmentEntry[]` - exposes entries array
- `getRelatedByManufacturer(manufacturer: string, excludeSlug?: string): MachineEntry[]`
- `getUniqueManufacturers(): string[]` - for detecting manufacturer names in queries

### not-found.tsx Modifications
The existing 404 page can show related machines if the slug contains a known manufacturer name. Server Component can call `getRelatedByManufacturer()` directly.

## Open Questions

1. **Manufacturer Detection in Query**
   - What we know: We have a list of manufacturers (Candela, Cynosure, Lumenis, etc.)
   - What's unclear: Should we detect "candela xyz" and suggest Candela machines?
   - Recommendation: Yes, use simple string.includes() check on known manufacturers

2. **Score Threshold for "Did You Mean"**
   - What we know: Fuse.js score 0 = perfect, 1 = no match. Our strict threshold is 0.3.
   - What's unclear: What score cutoff for "Did you mean?" - 0.4? 0.5?
   - Recommendation: Start with 0.45 (between strict 0.3 and loose 0.5), iterate based on testing

3. **Technology Terms in Suggestions**
   - What we know: TechnologyTermEntry has no manufacturer field
   - What's unclear: Should "Did you mean?" include technology terms?
   - Recommendation: Yes for partial matches, no for manufacturer-related (no manufacturer field)

## Sources

### Primary (HIGH confidence)
- Fuse.js Official Docs - https://www.fusejs.io/api/options.html - threshold, scoring
- Fuse.js Scoring Theory - https://www.fusejs.io/concepts/scoring-theory.html - score meaning
- Fuse.js Query API - https://www.fusejs.io/api/query.html - logical operators

### Secondary (MEDIUM confidence)
- Baymard Institute "No Results" UX - https://baymard.com/blog/no-results-page - 5 strategies verified
- Baymard Autocomplete Design - https://baymard.com/blog/autocomplete-design - best practices
- Meilisearch Fuzzy Guide - https://www.meilisearch.com/blog/fuzzy-search - implementation patterns

### Tertiary (LOW confidence)
- (none - all findings verified with primary sources)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - no new dependencies, Fuse.js capabilities verified
- Architecture: HIGH - patterns follow existing codebase conventions
- Pitfalls: MEDIUM - based on general UX research and Fuse.js documentation
- Integration: HIGH - based on direct code review of existing implementation

**Research date:** 2026-02-13
**Valid until:** 2026-03-15 (30 days - stable domain, existing Fuse.js version)
