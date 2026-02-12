# Phase 1: Data Foundation - Context

**Gathered:** 2026-02-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the complete equipment database — JSON file with classification data for ~38 machines, technology terms, wavelength entries, and type-safe access utilities. Users can look up any entry by slug.

</domain>

<decisions>
## Implementation Decisions

### Data structure
- Flat array with `type` field to distinguish machines vs technology terms — Claude decides organization
- camelCase field naming (TypeScript friendly)
- Slug stored explicitly on each entry (manually set)
- Slug serves as unique identifier — no separate numeric ID

### Classification fields
- **No effectiveness rating field** — removed from scope
- **Skin types:** Store both Fitzpatrick range (e.g., "I-VI") and display text (e.g., "Commonly used for lighter skin tones") — informational only, no recommendations
- **Brand tier:** 4 levels — `premium-clinical` (Gold Standard: Candela, Cynosure, Lumenis), `standard-clinical` (Established: Alma, InMode, Lutronic), `consumer` (Tria), `unknown` (unverified brands)
- **Real laser classification:** Store `technologyType` field ('laser', 'ipl', 'led', 'rf'), derive `isRealLaser` boolean from it

### Technology terms
- Same structure as machines — unified lookup with `type: 'technology-term'`
- Structured fields: `whatItIs` (brief 1-2 sentences), `whyItMatters` (variable length based on complexity), `isRealLaser` (boolean or null for ambiguous terms), `askYourClinic` (guidance text)
- Related machines derived at runtime from machine entries — not stored as explicit links
- **Wavelength entries included:** 755nm, 808nm/810nm, 1064nm, dual wavelength (755+1064nm) — searchable as technology terms
- Text length matches consumer confusion level: brief for simple answers, detailed for challenging assumptions

### Aliases & synonyms
- Stored on each entry as `aliases` array
- Official variations only — fuzzy search handles typos
- All aliases lowercase — name field preserves proper case for display
- Model variants are separate entries (GentleMax vs GentleMax Pro)
- Model variants linked via `family` field (e.g., `family: "candela-gentlemax"`)

### Claude's Discretion
- Whether to use flat array or categorized objects
- Exact compression/organization of entries
- Additional fields as needed for implementation

</decisions>

<specifics>
## Specific Ideas

- 808nm entry is critical — explains $3,000 Alibaba machine vs $100,000 LightSheer using same wavelength
- SHR entry explains it's a delivery method, not a light source — depends on underlying machine
- whatItIs as headline, whyItMatters as expandable "learn more" section
- Machine entries include `deliveryMethod` field for runtime linking (e.g., "shr")
- Machine entries include `wavelengths` array for runtime linking (e.g., ["755nm", "810nm", "1064nm"])

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-data-foundation*
*Context gathered: 2026-02-12*
