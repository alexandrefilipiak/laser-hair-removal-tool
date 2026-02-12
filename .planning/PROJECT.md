# Laser Equipment Checker Tool

## What This Is

A consumer-facing web tool that lets people verify if a clinic's hair removal equipment is a "real laser" or IPL/BBL. Users type a machine name and get a clear classification with effectiveness ratings and skin type information. Lives at laserhairremovalmap.com as the foundation for a future clinic directory.

## Core Value

Consumers can instantly determine if a machine is a real laser or not — the one thing that must work before anything else matters.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] User can search for equipment by name
- [ ] User sees clear "Real Laser" or "Not a Laser" classification
- [ ] User sees purpose-built vs multi-purpose distinction (Layer 2)
- [ ] User sees effectiveness rating (Layer 3)
- [ ] User sees skin type information (informational, not advisory)
- [ ] User can search for technology terms (SHR, AFT, BBL) and get clarification
- [ ] User sees permanent disclaimer on all results
- [ ] Search handles typos and partial matches (fuzzy search)
- [ ] Search shows autocomplete suggestions
- [ ] Homepage links to tool and guide articles
- [ ] Individual machine pages for SEO (/is-it-a-real-laser/[slug])
- [ ] "Not found" flow captures email for database expansion
- [ ] Schema markup for SEO (FAQPage, Product)

### Out of Scope

- Clinic directory — future milestone, not v1
- User accounts or authentication — not needed for tool
- Real-time clinic equipment verification — manual database only
- Medical advice or safety recommendations — informational only
- Phase 2/3 equipment (professional IPL, consumer IPL) — expand after launch

## Context

**Market gap:** No single searchable database exists where consumers can type a machine name and get a clear laser vs IPL classification. FDA has technical data, RealSelf has fragmented Q&A, but nobody offers simple consumer lookup.

**The problem:** Clinics can buy a $2,800 Alibaba IPL and market it the same as a $100,000 Candela laser. Consumers have no way to verify.

**Classification system:**
- Layer 1: Is it a real laser? (Yes/No)
- Layer 2: Is it purpose-built for hair removal? (Purpose-built/Multi-purpose/Not for hair removal)
- Layer 3: How effective? (Gold standard/Excellent/Effective/Adequate)
- Layer 4: Skin type info (informational — Fitzpatrick scale guidance without recommendations)

**Phase 1 data scope:** ~38 entries
- ~25 clinical real lasers (Candela, Lumenis, Cynosure, Alma, etc.)
- 2 home lasers (Tria 4X, Tria Precision)
- ~6 technology terms (SHR, AFT, BBL, E-Light, OPT, DPL)
- ~5 multi-purpose platforms (Harmony XL Pro, Nordlys, Icon, etc.)

**Site structure:**
```
laserhairremovalmap.com/              → Homepage
laserhairremovalmap.com/is-it-a-real-laser  → Main tool
laserhairremovalmap.com/is-it-a-real-laser/[slug]  → Individual machine pages
laserhairremovalmap.com/guides/       → Educational articles (future)
```

## Constraints

- **Tech stack**: Next.js with TypeScript — SSR for SEO
- **Data storage**: JSON file — version-controlled, easy to update
- **No medical advice**: All skin type info must be informational with disclaimers
- **SEO-first**: Schema markup, individual machine pages, proper meta tags

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over static HTML | Need SSR for SEO, dynamic search, and future directory expansion | — Pending |
| JSON file over database | Simple, version-controlled, easy for Phase 1 scope | — Pending |
| Informational skin type info only | Avoid medical advice liability | — Pending |
| Phase 1 limited to ~38 entries | Launch fast with core real lasers, expand based on search data | — Pending |

---
*Last updated: 2026-02-12 after initialization*
