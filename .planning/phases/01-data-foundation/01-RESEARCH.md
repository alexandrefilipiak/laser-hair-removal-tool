# Phase 1: Data Foundation - Research

**Researched:** 2026-02-12
**Domain:** TypeScript static JSON data with type-safe access utilities
**Confidence:** HIGH

## Summary

Phase 1 establishes the equipment database as a static JSON file with TypeScript types and utility functions. The domain is well-understood: static JSON data with type discriminators, slug-based lookup, and type-safe filtering. No external runtime dependencies are required - this is pure TypeScript with JSON imports.

The key architectural decisions are already locked in CONTEXT.md: flat array with `type` field discriminator, camelCase fields, explicit slugs, unified lookup for machines and technology terms. Research confirms these are standard patterns with excellent TypeScript support. The primary technical challenge is ensuring type narrowing works correctly when filtering by entry type.

**Primary recommendation:** Use TypeScript discriminated unions with type guards for filtering, `as const` assertions for literal inference, and a simple Map-based lookup index built at module load time.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Data structure:**
- Flat array with `type` field to distinguish machines vs technology terms - Claude decides organization
- camelCase field naming (TypeScript friendly)
- Slug stored explicitly on each entry (manually set)
- Slug serves as unique identifier - no separate numeric ID

**Classification fields:**
- **No effectiveness rating field** - removed from scope
- **Skin types:** Store both Fitzpatrick range (e.g., "I-VI") and display text (e.g., "Commonly used for lighter skin tones") - informational only, no recommendations
- **Brand tier:** 4 levels - `premium-clinical` (Gold Standard: Candela, Cynosure, Lumenis), `standard-clinical` (Established: Alma, InMode, Lutronic), `consumer` (Tria), `unknown` (unverified brands)
- **Real laser classification:** Store `technologyType` field ('laser', 'ipl', 'led', 'rf'), derive `isRealLaser` boolean from it

**Technology terms:**
- Same structure as machines - unified lookup with `type: 'technology-term'`
- Structured fields: `whatItIs` (brief 1-2 sentences), `whyItMatters` (variable length based on complexity), `isRealLaser` (boolean or null for ambiguous terms), `askYourClinic` (guidance text)
- Related machines derived at runtime from machine entries - not stored as explicit links
- **Wavelength entries included:** 755nm, 808nm/810nm, 1064nm, dual wavelength (755+1064nm) - searchable as technology terms
- Text length matches consumer confusion level: brief for simple answers, detailed for challenging assumptions

**Aliases & synonyms:**
- Stored on each entry as `aliases` array
- Official variations only - fuzzy search handles typos
- All aliases lowercase - name field preserves proper case for display
- Model variants are separate entries (GentleMax vs GentleMax Pro)
- Model variants linked via `family` field (e.g., `family: "candela-gentlemax"`)

### Claude's Discretion

- Whether to use flat array or categorized objects
- Exact compression/organization of entries
- Additional fields as needed for implementation

### Deferred Ideas (OUT OF SCOPE)

None - discussion stayed within phase scope

</user_constraints>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| TypeScript | 5.5+ | Type system and compilation | Discriminated union narrowing in `.filter()` requires 5.5+ |
| Node.js | 20+ | Runtime (for any scripts) | LTS with native TypeScript support in development |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| None | - | - | Phase 1 requires no external dependencies |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| JSON file | SQLite/database | Overkill for ~38 static entries, adds complexity |
| Manual type definitions | Zod schema | Runtime validation unnecessary for static local data |
| Custom slug generation | slugify library | Slugs are manually set per CONTEXT.md |

**Installation:**
```bash
# No additional packages needed for Phase 1
# Assumes TypeScript already configured in project
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── data/
│   └── equipment.json       # All entries in flat array
├── lib/
│   ├── equipment.ts         # Type definitions and utility functions
│   └── types.ts             # Shared types (if needed)
└── ...
```

### Pattern 1: Discriminated Union with Type Field
**What:** Use `type` field as discriminator to distinguish entry types
**When to use:** Any union type where entries have different shapes
**Example:**
```typescript
// Source: TypeScript Handbook - Narrowing
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html

interface MachineEntry {
  type: 'machine';
  slug: string;
  name: string;
  manufacturer: string;
  technologyType: 'laser' | 'ipl' | 'led' | 'rf';
  wavelengths: string[];
  brandTier: 'premium-clinical' | 'standard-clinical' | 'consumer' | 'unknown';
  skinTypes: {
    fitzpatrickRange: string;
    displayText: string;
  };
  purposeBuilt: boolean;
  coolingMethod: string | null;
  notes: string | null;
  aliases: string[];
  family: string | null;
  deliveryMethod: string | null;
}

interface TechnologyTermEntry {
  type: 'technology-term';
  slug: string;
  name: string;
  technologyType: 'laser' | 'ipl' | 'led' | 'rf' | 'delivery-method' | 'wavelength';
  isRealLaser: boolean | null;  // null for ambiguous (SHR)
  whatItIs: string;
  whyItMatters: string;
  askYourClinic: string | null;
  aliases: string[];
}

type EquipmentEntry = MachineEntry | TechnologyTermEntry;
```

### Pattern 2: Type Guard Functions for Array Filtering
**What:** Use type predicates to narrow union types when filtering
**When to use:** Filtering arrays of discriminated unions
**Example:**
```typescript
// Source: TypeScript filter narrowing
// https://www.skovy.dev/blog/typescript-filter-array-with-type-guard

function isMachine(entry: EquipmentEntry): entry is MachineEntry {
  return entry.type === 'machine';
}

function isTechnologyTerm(entry: EquipmentEntry): entry is TechnologyTermEntry {
  return entry.type === 'technology-term';
}

// Usage - TypeScript knows result is MachineEntry[]
const machines = allEntries.filter(isMachine);
```

### Pattern 3: Map-Based Lookup Index
**What:** Build a Map from slugs to entries at module load time
**When to use:** O(1) lookups by key with any key type
**Example:**
```typescript
// Source: Map vs Object for lookup tables
// https://www.seanmcp.com/articles/compairing-objects-maps-and-weakmaps-for-lookup-tables-in-javascript/

import equipmentData from '../data/equipment.json';

const entries = equipmentData as EquipmentEntry[];

// Build index once at module load
const slugIndex = new Map<string, EquipmentEntry>(
  entries.map(entry => [entry.slug, entry])
);

// Also index by aliases
entries.forEach(entry => {
  entry.aliases.forEach(alias => {
    slugIndex.set(alias, entry);
  });
});

export function getEquipmentBySlug(slug: string): EquipmentEntry | undefined {
  return slugIndex.get(slug.toLowerCase());
}

export function getAllEquipmentSlugs(): string[] {
  return entries.map(entry => entry.slug);
}
```

### Pattern 4: Derived Boolean from Technology Type
**What:** Compute `isRealLaser` from `technologyType` rather than storing it
**When to use:** When a field can be deterministically derived
**Example:**
```typescript
// For machines, derive from technologyType
function isRealLaser(entry: MachineEntry): boolean {
  return entry.technologyType === 'laser';
}

// For technology terms, use stored value (can be null for ambiguous)
// e.g., SHR has isRealLaser: null because it depends on the device
```

### Anti-Patterns to Avoid
- **Storing derived data:** Don't store `isRealLaser` on machines when it can be derived from `technologyType`
- **Deep nesting:** Don't nest beyond 2 levels; flat is better for this use case
- **Numeric IDs alongside slugs:** Slug is the identifier per CONTEXT.md
- **Runtime JSON validation:** Data is static and local; compile-time types are sufficient

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Type inference from JSON | Manual interface sync | `resolveJsonModule` + assertions | TypeScript handles it |
| Slug normalization | Custom normalizer | Simple `.toLowerCase()` | Slugs are pre-normalized |
| Union type filtering | Manual type casts | Type guard functions | Compiler-verified narrowing |
| Lookup performance | Linear array search | Map index | O(1) vs O(n) lookups |

**Key insight:** This phase is about data structure and types, not runtime logic. TypeScript's type system handles the complexity; keep the runtime code minimal.

## Common Pitfalls

### Pitfall 1: JSON Import Type Widening
**What goes wrong:** TypeScript infers overly broad types from JSON (e.g., `string` instead of `'laser' | 'ipl'`)
**Why it happens:** JSON has no type literals; TypeScript conservatively widens
**How to avoid:** Define explicit interface types and assert: `const data = jsonData as EquipmentEntry[]`
**Warning signs:** Autocomplete shows `string` where you expect specific values

### Pitfall 2: Filter Not Narrowing Types
**What goes wrong:** `entries.filter(e => e.type === 'machine')` returns `EquipmentEntry[]`, not `MachineEntry[]`
**Why it happens:** TypeScript < 5.5 doesn't infer type narrowing in callbacks; even 5.5+ can miss complex cases
**How to avoid:** Always use explicit type guard functions with type predicates
**Warning signs:** Need to cast after filtering; type errors when accessing type-specific fields

### Pitfall 3: Alias Collisions
**What goes wrong:** Two entries have overlapping aliases, lookup returns wrong entry
**Why it happens:** No uniqueness enforcement on aliases
**How to avoid:** Add a build-time check that all slugs and aliases are unique across the dataset
**Warning signs:** Tests passing but wrong entry returned

### Pitfall 4: Missing tsconfig Settings
**What goes wrong:** JSON imports fail or types are `any`
**Why it happens:** `resolveJsonModule` and `esModuleInterop` not enabled
**How to avoid:** Verify tsconfig.json has both settings enabled
**Warning signs:** Import errors or `any` types on JSON imports

### Pitfall 5: Case Sensitivity in Lookups
**What goes wrong:** `getEquipmentBySlug('GentleMax-Pro')` returns undefined
**Why it happens:** Slugs stored lowercase, lookup case-sensitive
**How to avoid:** Always normalize to lowercase in lookup function
**Warning signs:** Lookups work in tests but fail with user input

## Code Examples

Verified patterns from official sources:

### Complete Type Definitions
```typescript
// src/lib/equipment.ts

// Brand tier as literal union
type BrandTier = 'premium-clinical' | 'standard-clinical' | 'consumer' | 'unknown';

// Technology type - what the device fundamentally is
type TechnologyType = 'laser' | 'ipl' | 'led' | 'rf';

// Extended technology type for terms (includes delivery methods, wavelengths)
type TermTechnologyType = TechnologyType | 'delivery-method' | 'wavelength';

// Skin type information (informational only)
interface SkinTypeInfo {
  fitzpatrickRange: string;  // e.g., "I-VI", "I-III", "IV-VI"
  displayText: string;       // e.g., "Commonly used for lighter skin tones"
}

// Machine entry (clinical lasers, home devices, multi-purpose)
interface MachineEntry {
  type: 'machine';
  slug: string;
  name: string;
  manufacturer: string;
  technologyType: TechnologyType;
  wavelengths: string[];           // e.g., ["755nm", "1064nm"]
  brandTier: BrandTier;
  skinTypes: SkinTypeInfo;
  purposeBuilt: boolean;           // true = hair removal dedicated
  coolingMethod: string | null;    // e.g., "cryogen", "contact", "air"
  notes: string | null;
  aliases: string[];               // lowercase official variations
  family: string | null;           // e.g., "candela-gentlemax"
  deliveryMethod: string | null;   // e.g., "shr" for runtime linking
}

// Technology term entry (SHR, AFT, BBL, wavelengths)
interface TechnologyTermEntry {
  type: 'technology-term';
  slug: string;
  name: string;
  technologyType: TermTechnologyType;
  isRealLaser: boolean | null;     // null = depends on device (SHR)
  whatItIs: string;                // 1-2 sentence headline
  whyItMatters: string;            // Variable length explanation
  askYourClinic: string | null;    // Guidance text
  aliases: string[];
}

// Union type for all entries
type EquipmentEntry = MachineEntry | TechnologyTermEntry;

// Export types for consumers
export type {
  MachineEntry,
  TechnologyTermEntry,
  EquipmentEntry,
  BrandTier,
  TechnologyType,
  SkinTypeInfo
};
```

### Data Access Utilities
```typescript
// src/lib/equipment.ts (continued)

import equipmentData from '../data/equipment.json';

// Assert types on import
const entries: EquipmentEntry[] = equipmentData as EquipmentEntry[];

// Build slug -> entry index (includes aliases)
const slugIndex = new Map<string, EquipmentEntry>();

for (const entry of entries) {
  slugIndex.set(entry.slug, entry);
  for (const alias of entry.aliases) {
    slugIndex.set(alias, entry);
  }
}

// Type guard functions
export function isMachine(entry: EquipmentEntry): entry is MachineEntry {
  return entry.type === 'machine';
}

export function isTechnologyTerm(entry: EquipmentEntry): entry is TechnologyTermEntry {
  return entry.type === 'technology-term';
}

// Derived property helper
export function isRealLaser(entry: EquipmentEntry): boolean | null {
  if (isTechnologyTerm(entry)) {
    return entry.isRealLaser;  // Use stored value (can be null)
  }
  return entry.technologyType === 'laser';
}

// Primary lookup function
export function getEquipmentBySlug(slug: string): EquipmentEntry | undefined {
  return slugIndex.get(slug.toLowerCase());
}

// Get all primary slugs (not aliases)
export function getAllEquipmentSlugs(): string[] {
  return entries.map(entry => entry.slug);
}

// Filtered accessors
export function getAllMachines(): MachineEntry[] {
  return entries.filter(isMachine);
}

export function getAllTechnologyTerms(): TechnologyTermEntry[] {
  return entries.filter(isTechnologyTerm);
}

// Get machines by family (for variant linking)
export function getMachinesByFamily(family: string): MachineEntry[] {
  return entries
    .filter(isMachine)
    .filter(m => m.family === family);
}

// Get machines using a specific delivery method (for runtime linking)
export function getMachinesByDeliveryMethod(method: string): MachineEntry[] {
  return entries
    .filter(isMachine)
    .filter(m => m.deliveryMethod === method.toLowerCase());
}

// Get machines using a specific wavelength (for runtime linking)
export function getMachinesByWavelength(wavelength: string): MachineEntry[] {
  return entries
    .filter(isMachine)
    .filter(m => m.wavelengths.includes(wavelength));
}
```

### Sample JSON Structure
```json
[
  {
    "type": "machine",
    "slug": "gentlemax-pro",
    "name": "GentleMax Pro",
    "manufacturer": "Candela",
    "technologyType": "laser",
    "wavelengths": ["755nm", "1064nm"],
    "brandTier": "premium-clinical",
    "skinTypes": {
      "fitzpatrickRange": "I-VI",
      "displayText": "All skin tones (dual wavelength system)"
    },
    "purposeBuilt": true,
    "coolingMethod": "cryogen",
    "notes": "Dual-wavelength Alexandrite + Nd:YAG. Gold standard for versatility.",
    "aliases": ["gentle max pro", "gentlemaxpro", "candela gentlemax pro"],
    "family": "candela-gentlemax",
    "deliveryMethod": null
  },
  {
    "type": "technology-term",
    "slug": "shr",
    "name": "SHR",
    "technologyType": "delivery-method",
    "isRealLaser": null,
    "whatItIs": "Super Hair Removal - a delivery method using gradual heating with rapid pulses.",
    "whyItMatters": "SHR is NOT a device type. It can be applied to real lasers (Soprano) or IPL machines. Always ask what device your clinic uses for SHR.",
    "askYourClinic": "What device do you use for SHR? Is it a Soprano (laser) or an IPL applicator?",
    "aliases": ["super hair removal"]
  },
  {
    "type": "technology-term",
    "slug": "808nm",
    "name": "808nm Diode",
    "technologyType": "wavelength",
    "isRealLaser": true,
    "whatItIs": "A wavelength commonly used in diode lasers for hair removal.",
    "whyItMatters": "The wavelength alone doesn't determine quality. A $3,000 Alibaba machine and a $100,000 LightSheer both use 808nm. Brand, power, and build quality matter.",
    "askYourClinic": "What brand is your 808nm diode laser? How long have you had it?",
    "aliases": ["810nm", "808nm diode", "810nm diode", "diode laser"]
  }
]
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual type guards needed for `.filter()` | TypeScript 5.5 infers simple predicates | TypeScript 5.5 (2024) | Less boilerplate, but explicit guards still recommended |
| `any` on JSON.parse | `resolveJsonModule` with type inference | Long established | Type safety from import |
| Object literals for lookup | Map for dynamic keys | Modern JS | Better performance, cleaner API |

**Deprecated/outdated:**
- None relevant to this phase

## Open Questions

1. **tsconfig.json setup**
   - What we know: Need `resolveJsonModule` and `esModuleInterop`
   - What's unclear: Project may not have TypeScript configured yet
   - Recommendation: Phase 1 task should include tsconfig verification/setup

2. **Test framework**
   - What we know: Need to verify types and lookups work
   - What's unclear: What test framework project uses
   - Recommendation: Defer to later phases; can validate manually in Phase 1

## Sources

### Primary (HIGH confidence)
- [TypeScript Handbook - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) - Discriminated unions, type guards
- [TypeScript TSConfig - resolveJsonModule](https://www.typescriptlang.org/tsconfig/resolveJsonModule.html) - JSON import configuration
- [TypeScript Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) - Type utilities

### Secondary (MEDIUM confidence)
- [Better Stack - Type-Safe JSON in TypeScript](https://betterstack.com/community/guides/scaling-nodejs/typescript-json-type-safety/) - Best practices for JSON handling
- [LogRocket - Const Assertions Guide](https://blog.logrocket.com/complete-guide-const-assertions-typescript/) - `as const` usage patterns
- [Convex TypeScript Guide - Discriminated Unions](https://www.convex.dev/typescript/advanced/type-operators-manipulation/typescript-discriminated-union) - Union patterns
- [skovy.dev - Filtering arrays with type guards](https://www.skovy.dev/blog/typescript-filter-array-with-type-guard) - Type predicate patterns
- [seanmcp.com - Map vs Object for lookup tables](https://www.seanmcp.com/articles/compairing-objects-maps-and-weakmaps-for-lookup-tables-in-javascript/) - Data structure choice

### Tertiary (LOW confidence)
- None - all findings verified with official documentation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - No external dependencies, pure TypeScript patterns
- Architecture: HIGH - Discriminated unions and type guards are well-documented
- Pitfalls: HIGH - Based on TypeScript documentation and common issues

**Research date:** 2026-02-12
**Valid until:** 90+ days (stable TypeScript patterns, no fast-moving dependencies)
