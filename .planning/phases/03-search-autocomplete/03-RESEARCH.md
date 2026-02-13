# Phase 3: Search & Autocomplete - Research

**Researched:** 2026-02-13
**Domain:** Client-side Fuzzy Search, Accessible Autocomplete UI, React Client Components
**Confidence:** HIGH

## Summary

This phase implements a prominent search bar on the homepage with instant fuzzy-matched autocomplete suggestions. Since the site uses Next.js static export (`output: 'export'`), all search functionality must run client-side in the browser. The ~38 equipment entries are small enough to load entirely in the client bundle, enabling sub-200ms search response times without network latency.

Fuse.js 7.x is the recommended fuzzy search library. It handles typo tolerance, alias resolution, and weighted field searching with minimal configuration. The library is lightweight (~6KB gzipped), has zero dependencies, and is well-documented. For the autocomplete UI, a custom accessible combobox following WAI-ARIA 1.2 patterns is preferred over heavy component libraries, given the project's simple requirements and existing Tailwind setup.

The search component must be a Client Component (`'use client'`) since it requires user interaction and browser APIs. Equipment data can be passed from a Server Component parent to minimize client bundle impact. Debouncing user input at 150-200ms prevents excessive re-renders while maintaining perceived instant response.

**Primary recommendation:** Use Fuse.js 7.x with `ignoreLocation: true` and `threshold: 0.3` for fuzzy search. Build a custom accessible autocomplete component using ARIA combobox pattern. Debounce input at 150ms. Display classification badges directly in search results for immediate visual hierarchy.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| fuse.js | ^7.1.0 | Client-side fuzzy search with typo tolerance | 19k+ GitHub stars, zero dependencies, well-documented, ~6KB gzipped |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| use-debounce | ^10.0 | Debounce hook for search input | Optional - can implement custom hook in 10 lines |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Fuse.js | FlexSearch | FlexSearch is faster but doesn't support weighted field search; Fuse.js has better typo handling |
| Fuse.js | MiniSearch | MiniSearch requires explicit indexing; Fuse.js works directly with JSON arrays |
| Custom combobox | Headless UI Combobox | Headless UI adds ~20KB; our needs are simple enough for ~100 lines of custom code |
| Custom combobox | cmdk | cmdk is designed for command palettes, overkill for simple autocomplete |

**Installation:**
```bash
npm install fuse.js
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── page.tsx                  # Homepage with search (Server Component wrapper)
│   └── ...
├── components/
│   ├── SearchBar.tsx             # 'use client' - Main search input + autocomplete
│   ├── SearchResults.tsx         # Dropdown with results list
│   ├── SearchResultItem.tsx      # Individual result with badges
│   ├── HighlightMatch.tsx        # Highlight matched characters
│   └── ...existing components
├── hooks/
│   ├── useSearch.ts              # Fuse.js search hook
│   └── useDebounce.ts            # Debounce value hook
└── lib/
    ├── equipment.ts              # Existing data module
    └── search-config.ts          # Fuse.js configuration
```

### Pattern 1: Client Component Search Bar
**What:** Interactive search input with autocomplete dropdown
**When to use:** Homepage main search functionality
**Example:**
```typescript
// Source: Next.js Client Components + WAI-ARIA Combobox pattern
// components/SearchBar.tsx
'use client';

import { useState, useRef, useId } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { useDebounce } from '@/hooks/useDebounce';
import type { EquipmentEntry } from '@/lib/equipment';

interface SearchBarProps {
  equipment: EquipmentEntry[];
}

export function SearchBar({ equipment }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const debouncedQuery = useDebounce(query, 150);
  const results = useSearch(equipment, debouncedQuery);

  // Keyboard navigation and selection handlers...

  return (
    <div className="relative w-full max-w-xl">
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : undefined}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder="Search equipment..."
        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {isOpen && results.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-auto"
        >
          {/* Results rendered here */}
        </ul>
      )}
    </div>
  );
}
```

### Pattern 2: Fuse.js Search Hook
**What:** Encapsulate Fuse.js initialization and search logic
**When to use:** All fuzzy search operations
**Example:**
```typescript
// Source: Fuse.js documentation https://www.fusejs.io/api/options.html
// hooks/useSearch.ts
'use client';

import { useMemo } from 'react';
import Fuse from 'fuse.js';
import type { EquipmentEntry } from '@/lib/equipment';

const fuseOptions: Fuse.IFuseOptions<EquipmentEntry> = {
  // Search these fields with weights
  keys: [
    { name: 'name', weight: 2 },           // Primary: machine name
    { name: 'aliases', weight: 1.5 },      // Important: alternative names
    { name: 'manufacturer', weight: 1 },   // Secondary: brand name
    { name: 'slug', weight: 0.5 },         // Fallback: URL slug
  ],
  // Fuzzy matching configuration
  threshold: 0.3,          // Lower = stricter matching (0.6 is default, too loose)
  ignoreLocation: true,    // Match anywhere in string, not just beginning
  includeScore: true,      // For debugging and potential ranking adjustments
  includeMatches: true,    // Enable highlight functionality
  minMatchCharLength: 2,   // Don't match single characters
  // Performance
  shouldSort: true,        // Sort by score
  findAllMatches: false,   // Stop at first match per field (faster)
};

export function useSearch(equipment: EquipmentEntry[], query: string) {
  // Memoize Fuse instance to avoid re-creating on every render
  const fuse = useMemo(
    () => new Fuse(equipment, fuseOptions),
    [equipment]
  );

  // Return empty array for empty/whitespace queries
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    return [];
  }

  // Perform search and return results
  const results = fuse.search(normalizedQuery, { limit: 8 });
  return results;
}
```

### Pattern 3: Debounce Hook
**What:** Delay value updates to reduce unnecessary computations
**When to use:** Search input to avoid searching on every keystroke
**Example:**
```typescript
// Source: Standard React debounce pattern
// hooks/useDebounce.ts
'use client';

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### Pattern 4: Highlight Matched Characters
**What:** Visually indicate which characters matched the search query
**When to use:** Search result items
**Example:**
```typescript
// Source: Fuse.js includeMatches option
// components/HighlightMatch.tsx
'use client';

import type { FuseResultMatch } from 'fuse.js';

interface HighlightMatchProps {
  text: string;
  matches?: readonly FuseResultMatch[];
  fieldKey: string;
}

export function HighlightMatch({ text, matches, fieldKey }: HighlightMatchProps) {
  // Find matches for this specific field
  const fieldMatches = matches?.find(m => m.key === fieldKey);

  if (!fieldMatches?.indices?.length) {
    return <span>{text}</span>;
  }

  // Build highlighted segments
  const segments: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const [start, end] of fieldMatches.indices) {
    // Add non-matched text before this match
    if (start > lastIndex) {
      segments.push(text.slice(lastIndex, start));
    }
    // Add highlighted match
    segments.push(
      <mark key={start} className="bg-yellow-200 rounded">
        {text.slice(start, end + 1)}
      </mark>
    );
    lastIndex = end + 1;
  }

  // Add remaining text after last match
  if (lastIndex < text.length) {
    segments.push(text.slice(lastIndex));
  }

  return <span>{segments}</span>;
}
```

### Pattern 5: Server Component Data Passing
**What:** Pass equipment data from Server Component to Client Component
**When to use:** Homepage to keep data loading server-side
**Example:**
```typescript
// Source: Next.js Server/Client Component patterns
// app/page.tsx (Server Component)

import { SearchBar } from '@/components/SearchBar';
import equipmentData from '@/data/equipment.json';
import type { EquipmentEntry } from '@/lib/equipment';

const equipment = equipmentData as EquipmentEntry[];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-8">
        Laser Hair Removal Equipment Checker
      </h1>
      {/* Pass data as prop - serialized during build */}
      <SearchBar equipment={equipment} />
    </main>
  );
}
```

### Anti-Patterns to Avoid
- **Fetching data in Client Component:** Import equipment.json in Client Component adds to client bundle; pass as prop instead
- **Creating Fuse instance on every render:** Memoize with `useMemo` to avoid performance issues
- **No debouncing:** Searching on every keystroke causes jank; debounce at 150-200ms
- **Default Fuse threshold (0.6):** Too loose; use 0.3-0.4 for better relevance
- **Missing ignoreLocation:** Default only searches first 60 chars; set `ignoreLocation: true`
- **Rendering all results:** Limit to 6-8 results for performance and UX
- **Focus management without ARIA:** Must use `aria-activedescendant` pattern for keyboard navigation

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Fuzzy matching algorithm | Levenshtein distance function | Fuse.js | Edge cases: Unicode, scoring, field weighting, partial matches |
| Typo tolerance | Simple string includes | Fuse.js threshold | Handles transpositions, insertions, deletions with scoring |
| Debouncing | Inline setTimeout | Hook or lodash.debounce | Cleanup on unmount, proper memoization, edge cases |
| Keyboard navigation | Manual index tracking | Proper ARIA pattern | Screen reader compatibility, focus management, Home/End keys |

**Key insight:** Fuzzy search is deceptively complex. Fuse.js handles Unicode normalization, scoring algorithms, field weighting, and match indices. A custom implementation would take weeks and still have edge cases.

## Common Pitfalls

### Pitfall 1: Default Threshold Too Loose
**What goes wrong:** Search for "gentle" returns unrelated results with low match quality
**Why it happens:** Fuse.js default threshold of 0.6 matches almost anything
**How to avoid:** Set `threshold: 0.3` for stricter matching; test with real queries
**Warning signs:** Results include items that don't visually match the query

### Pitfall 2: Location-Based Matching
**What goes wrong:** Search for "titanium" doesn't find "Soprano Titanium" if threshold/distance too strict
**Why it happens:** Default Fuse.js only searches first 60 characters
**How to avoid:** Set `ignoreLocation: true` to match anywhere in string
**Warning signs:** Known items don't appear in results when they should

### Pitfall 3: Fuse Instance Re-creation
**What goes wrong:** Search becomes slow, especially on mobile
**Why it happens:** Creating new Fuse instance on every keystroke rebuilds index
**How to avoid:** Memoize Fuse instance with `useMemo`, only recreate when data changes
**Warning signs:** Performance degrades as user types, lag between keystrokes

### Pitfall 4: Missing Accessibility for Keyboard Users
**What goes wrong:** Users can't navigate results with arrow keys, screen readers don't announce options
**Why it happens:** Using simple div/ul without ARIA attributes
**How to avoid:** Implement full WAI-ARIA combobox pattern with `role="combobox"`, `aria-activedescendant`, `role="listbox"`
**Warning signs:** No keyboard navigation, screen reader doesn't announce results

### Pitfall 5: Search Without Input Normalization
**What goes wrong:** "GentleMax Pro" doesn't match "gentlemax pro" or "GENTLEMAX PRO"
**Why it happens:** Not normalizing user input before search
**How to avoid:** Fuse.js handles case-insensitivity by default; also trim whitespace before searching
**Warning signs:** Exact matches fail with different capitalization

### Pitfall 6: Prop Drilling Equipment Data
**What goes wrong:** Large equipment array serialized multiple times in client bundle
**Why it happens:** Importing equipment.json in multiple Client Components
**How to avoid:** Import once in Server Component parent, pass as prop to single SearchBar
**Warning signs:** Bundle analyzer shows equipment data duplicated

## Code Examples

Verified patterns from official sources:

### Complete SearchResultItem with Badges
```typescript
// components/SearchResultItem.tsx
'use client';

import Link from 'next/link';
import type { FuseResult } from 'fuse.js';
import type { EquipmentEntry, MachineEntry, TechnologyTermEntry } from '@/lib/equipment';
import { isMachine } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { HighlightMatch } from './HighlightMatch';

interface SearchResultItemProps {
  result: FuseResult<EquipmentEntry>;
  isActive: boolean;
  index: number;
}

export function SearchResultItem({ result, isActive, index }: SearchResultItemProps) {
  const { item, matches } = result;

  return (
    <li
      id={`result-${index}`}
      role="option"
      aria-selected={isActive}
      className={`px-4 py-3 cursor-pointer ${
        isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
    >
      <Link href={`/is-it-a-real-laser/${item.slug}`} className="block">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">
              <HighlightMatch
                text={item.name}
                matches={matches}
                fieldKey="name"
              />
            </div>
            {isMachine(item) && (
              <div className="text-sm text-gray-500">
                <HighlightMatch
                  text={item.manufacturer}
                  matches={matches}
                  fieldKey="manufacturer"
                />
              </div>
            )}
          </div>
          <ClassificationBadge
            isRealLaser={isMachine(item) ? null : (item as TechnologyTermEntry).isRealLaser}
            technologyType={isMachine(item) ? (item as MachineEntry).technologyType : undefined}
          />
        </div>
      </Link>
    </li>
  );
}
```

### Keyboard Navigation Handler
```typescript
// Source: WAI-ARIA Combobox pattern
// Inside SearchBar.tsx

const handleKeyDown = (e: React.KeyboardEvent) => {
  const resultCount = results.length;

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      setActiveIndex(prev =>
        prev < resultCount - 1 ? prev + 1 : 0
      );
      break;
    case 'ArrowUp':
      e.preventDefault();
      setActiveIndex(prev =>
        prev > 0 ? prev - 1 : resultCount - 1
      );
      break;
    case 'Enter':
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        // Navigate to selected result
        router.push(`/is-it-a-real-laser/${results[activeIndex].item.slug}`);
        setIsOpen(false);
      }
      break;
    case 'Escape':
      e.preventDefault();
      setIsOpen(false);
      setActiveIndex(-1);
      break;
    case 'Home':
      e.preventDefault();
      setActiveIndex(0);
      break;
    case 'End':
      e.preventDefault();
      setActiveIndex(resultCount - 1);
      break;
  }
};
```

### Click Outside Handler
```typescript
// Source: Standard React pattern
// Inside SearchBar.tsx

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Server-side search API | Client-side Fuse.js | When data small enough (<100KB) | No network latency, instant results |
| jQuery autocomplete | React controlled components | React ecosystem maturity | Better state management, accessibility |
| Simple string matching | Fuzzy search with scoring | Modern UX expectations | Handles typos, partial matches |
| `onChange` search | Debounced input | Performance awareness | Prevents excessive renders |
| `div` dropdowns | ARIA combobox pattern | WCAG 2.1 requirements | Screen reader compatibility |

**Deprecated/outdated:**
- Synchronous Fuse.js API: Still works but async recommended for large datasets
- `componentWillReceiveProps` debouncing: Use hooks or external library
- Manual DOM manipulation for focus: Use `aria-activedescendant` pattern

## Open Questions

1. **Empty State Behavior**
   - What we know: User may type query with no matches
   - What's unclear: Show "No results" vs "Try a different search" vs suggest similar?
   - Recommendation: Show "No equipment found. Try searching by brand name or model." with link to browse all

2. **Mobile Touch Behavior**
   - What we know: Touch triggers `onFocus` which opens dropdown
   - What's unclear: Should dropdown close on scroll? On touch outside?
   - Recommendation: Close on touch outside, keep open on scroll within dropdown

3. **Result Count Limit**
   - What we know: UX best practice suggests 5-10 results maximum
   - What's unclear: Exact number for this use case
   - Recommendation: Start with 8 results, adjust based on testing

4. **Analytics Integration**
   - What we know: Search queries are valuable for understanding user intent
   - What's unclear: Privacy implications, what analytics platform
   - Recommendation: Defer to future phase; can add localStorage search history first

## Sources

### Primary (HIGH confidence)
- [Fuse.js Options Documentation](https://www.fusejs.io/api/options.html) - Configuration and API
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) - Component boundaries
- [WAI-ARIA Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) - Accessibility requirements
- [MDN aria-autocomplete](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-autocomplete) - ARIA attributes

### Secondary (MEDIUM confidence)
- [React Aria useComboBox](https://react-spectrum.adobe.com/react-aria/useComboBox.html) - Accessibility implementation patterns
- [NPM Compare: fuse.js vs alternatives](https://npm-compare.com/elasticlunr,flexsearch,fuse.js,minisearch) - Library comparison
- [useHooks useDebounce](https://usehooks.com/usedebounce) - Debounce hook patterns
- [react-fuzzy-highlighter](https://github.com/metonym/react-fuzzy-highlighter) - Match highlighting patterns

### Tertiary (LOW confidence)
- Various Medium articles on Fuse.js implementation (used for verification only)
- npm-compare benchmark claims (self-reported, may not reflect real-world usage)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Fuse.js is well-documented, stable, widely used
- Architecture: HIGH - Standard React/Next.js patterns, verified with official docs
- Pitfalls: HIGH - Common issues documented in Fuse.js GitHub issues and community posts

**Research date:** 2026-02-13
**Valid until:** 2026-03-15 (30 days - stable library versions)
