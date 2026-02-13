---
phase: 04-not-found-flow
plan: 01
subsystem: search
tags: [fuse.js, fuzzy-search, data-access]

# Dependency graph
requires:
  - phase: 01-data-foundation
    provides: equipment data module with entries array
  - phase: 03-search-autocomplete
    provides: useSearch hook pattern for Fuse.js integration
provides:
  - getAllEquipment function for data access
  - getRelatedByManufacturer function for manufacturer filtering
  - useLooseSearch hook for partial match suggestions
affects: [04-02, 04-03, not-found-page]

# Tech tracking
tech-stack:
  added: []
  patterns: [loose-threshold-search, manufacturer-filtering]

key-files:
  created: [src/hooks/useLooseSearch.ts]
  modified: [src/lib/equipment.ts]

key-decisions:
  - "Threshold 0.5 for loose search vs 0.3 for strict - provides wider net for suggestions"
  - "Limit loose search to 5 results vs 8 for strict - suggestions should be concise"
  - "Case-insensitive manufacturer matching for flexibility"

patterns-established:
  - "Dual search strategy: strict search first, loose search for suggestions"
  - "Manufacturer-based related machines for alternative suggestions"

# Metrics
duration: 6min
completed: 2026-02-13
---

# Phase 04 Plan 01: Data Utilities Summary

**Added getAllEquipment, getRelatedByManufacturer, and useLooseSearch for not-found suggestions**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-13T17:40:45Z
- **Completed:** 2026-02-13T17:46:38Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Added getAllEquipment() for exposing full equipment dataset
- Added getRelatedByManufacturer() for finding similar machines by manufacturer
- Created useLooseSearch hook with threshold 0.5 for partial match suggestions

## Task Commits

Each task was committed atomically:

1. **Task 1: Add getAllEquipment and getRelatedByManufacturer** - `0eab748` (feat)
2. **Task 2: Create useLooseSearch hook** - `0326331` (feat)

## Files Created/Modified
- `src/lib/equipment.ts` - Added getAllEquipment() and getRelatedByManufacturer() functions
- `src/hooks/useLooseSearch.ts` - New hook for loose fuzzy search with threshold 0.5

## Decisions Made
- Threshold 0.5 chosen for loose search - provides wider net than strict 0.3 while still being relevant
- Limit 5 results for suggestions - more concise than search autocomplete's 8
- Default limit 3 for related machines - sufficient for UI suggestions

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - TypeScript compiled successfully and build passed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Data utilities ready for not-found page implementation (04-02)
- useLooseSearch ready for "Did you mean?" suggestions

## Self-Check: PASSED
- FOUND: src/lib/equipment.ts
- FOUND: src/hooks/useLooseSearch.ts
- FOUND: commit 0eab748
- FOUND: commit 0326331

---
*Phase: 04-not-found-flow*
*Completed: 2026-02-13*
