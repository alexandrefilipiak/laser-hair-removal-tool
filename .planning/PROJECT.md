# Laser Equipment Checker Tool

## What This Is

A consumer-facing web tool that lets people verify if a clinic's hair removal equipment is a "real laser" or IPL/BBL. Users search by machine name and get a clear classification with effectiveness ratings and skin type information. Includes fuzzy search with autocomplete, technology term clarifications, and 33 equipment entries. Lives at laserhairremovalmap.com as the foundation for a future clinic directory.

## Core Value

Consumers can instantly determine if a machine is a real laser or not — the one thing that must work before anything else matters.

## Requirements

### Validated

- ✓ User can search for equipment by name — v1.0
- ✓ User sees clear "Real Laser" or "Not a Laser" classification — v1.0
- ✓ User sees purpose-built vs multi-purpose distinction (Layer 2) — v1.0
- ✓ User sees effectiveness rating (Layer 3) — v1.0
- ✓ User sees skin type information (informational, not advisory) — v1.0
- ✓ User can search for technology terms (SHR, AFT, BBL) and get clarification — v1.0
- ✓ User sees permanent disclaimer on all results — v1.0
- ✓ Search handles typos and partial matches (fuzzy search) — v1.0
- ✓ Search shows autocomplete suggestions — v1.0
- ✓ Homepage links to tool with clear value proposition — v1.0
- ✓ Individual machine pages for SEO (/is-it-a-real-laser/[slug]) — v1.0
- ✓ Schema markup for SEO (Product, DefinedTerm schemas) — v1.0
- ✓ "Not found" flow shows partial matches and related machines — v1.0

### Active

- [ ] "Not found" flow captures email for database expansion (ENG-01, deferred from v1.0)
- [ ] Professional IPL devices (~15 entries) (CONT-01)
- [ ] Consumer IPL by brand (CONT-02)
- [ ] Blog articles in /guides/ section (CONT-03)

### Out of Scope

- Clinic directory — future milestone, not v1
- User accounts or authentication — not needed for tool
- Real-time clinic equipment verification — manual database only
- Medical advice or safety recommendations — informational only, per liability policy

## Context

**Shipped v1.0** with 2,519 LOC TypeScript/TSX across 5 phases, 12 plans in 2 days.

**Tech stack:** Next.js 15, TypeScript, Tailwind CSS v4, Fuse.js for search. Static export (no server required).

**Data scope (v1.0):** 33 entries
- 23 clinical machines (Candela, Lumenis, Cynosure, Alma, etc.)
- 2 home lasers (Tria 4X, Tria Precision)
- 10 technology terms (SHR, AFT, BBL, E-Light, OPT, DPL, etc.)

**Site structure:**
```
laserhairremovalmap.com/              → Homepage (landing page with value prop)
laserhairremovalmap.com/is-it-a-real-laser  → Main tool (search + equipment index)
laserhairremovalmap.com/is-it-a-real-laser/[slug]  → Individual machine pages (33 pages)
laserhairremovalmap.com/guides/       → Educational articles (future)
```

**Market position:** Only searchable database where consumers can type a machine name and get a clear laser vs IPL classification. FDA has technical data, RealSelf has fragmented Q&A, but nobody offers simple consumer lookup.

## Constraints

- **Tech stack**: Next.js with TypeScript — static export for SEO
- **Data storage**: JSON file — version-controlled, easy to update
- **No medical advice**: All skin type info must be informational with disclaimers
- **SEO-first**: Schema markup, individual machine pages, proper meta tags
- **No "safe/not safe" language**: Liability word policy

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over static HTML | Need SSR for SEO, dynamic search, and future directory expansion | ✓ Good — static export works well |
| JSON file over database | Simple, version-controlled, easy for Phase 1 scope | ✓ Good — 33 entries manageable |
| Informational skin type info only | Avoid medical advice liability | ✓ Good — no safety language |
| Phase 1 limited to 33 entries | Launch fast with core real lasers, expand based on search data | ✓ Good — shipped in 2 days |
| Map-based O(1) lookup | Fast slug resolution for SSG | ✓ Good |
| Fuse.js threshold 0.3 | Stricter than default for better relevance | ✓ Good |
| dynamicParams: false | 404 for unknown slugs without server | ✓ Good |
| Discriminated union types | Type-safe machine vs technology term handling | ✓ Good |
| Disclaimer as subtle amber pill | Visible but not intrusive | ✓ Good |

---
*Last updated: 2026-02-13 after v1.0 milestone*
