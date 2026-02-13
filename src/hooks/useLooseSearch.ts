'use client';

import { useMemo } from 'react';
import Fuse, { FuseResult, IFuseOptions } from 'fuse.js';
import type { EquipmentEntry } from '@/lib/equipment';

/**
 * Fuse.js configuration for loose equipment search
 *
 * Loose threshold (0.5) for "Did you mean?" suggestions when strict search (0.3) returns nothing.
 * This allows for more partial matches with typos or incomplete queries.
 *
 * - Keys are weighted: name (2), aliases (1.5), manufacturer (1), slug (0.5)
 * - Threshold 0.5 is more permissive than useSearch's 0.3 for partial matches
 * - ignoreLocation: true matches anywhere in string
 * - includeMatches: true enables highlighting functionality
 */
const fuseOptions: IFuseOptions<EquipmentEntry> = {
  // Search fields with weights (higher = more important)
  keys: [
    { name: 'name', weight: 2 },
    { name: 'aliases', weight: 1.5 },
    { name: 'manufacturer', weight: 1 },
    { name: 'slug', weight: 0.5 },
  ],
  // Fuzzy matching configuration
  threshold: 0.5, // Looser than useSearch's 0.3 for partial matches
  ignoreLocation: true, // Match anywhere in string, not just beginning
  includeScore: true, // For potential ranking adjustments
  includeMatches: true, // Enable highlight functionality
  minMatchCharLength: 2, // Don't match single characters
  // Performance
  shouldSort: true, // Sort by score
  findAllMatches: false, // Stop at first match per field (faster)
};

/**
 * Loose fuzzy search hook for equipment suggestions
 *
 * Uses a higher threshold (0.5) than useSearch (0.3) to find partial matches.
 * Intended for "Did you mean?" suggestions when strict search returns no results.
 *
 * @param equipment - Array of equipment entries to search
 * @param query - Search query string
 * @returns Array of Fuse results with scores and match indices (max 5 results)
 *
 * @example
 * // When useSearch('genle') returns nothing
 * const suggestions = useLooseSearch(equipment, 'genle');
 * // Returns matches for GentleMax Pro, GentleLase, etc.
 *
 * @note Only MachineEntry has manufacturer field. Fuse.js handles undefined
 * fields gracefully by skipping that key for entries without it.
 */
export function useLooseSearch(
  equipment: EquipmentEntry[],
  query: string
): FuseResult<EquipmentEntry>[] {
  // Memoize Fuse instance to avoid re-creating on every render
  const fuse = useMemo(
    () => new Fuse(equipment, fuseOptions),
    [equipment]
  );

  // Memoize search results to prevent unnecessary re-renders
  const results = useMemo(() => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      return [];
    }
    // Limit to 5 results (fewer than strict search's 8, since these are suggestions)
    return fuse.search(normalizedQuery, { limit: 5 });
  }, [fuse, query]);

  return results;
}
