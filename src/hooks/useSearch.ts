'use client';

import { useMemo } from 'react';
import Fuse, { FuseResult, IFuseOptions } from 'fuse.js';
import type { EquipmentEntry } from '@/lib/equipment';

/**
 * Fuse.js configuration for equipment search
 *
 * - Keys are weighted: name (2), aliases (1.5), manufacturer (1), slug (0.5)
 * - Threshold 0.3 is stricter than default 0.6 for better relevance
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
  threshold: 0.3, // Stricter than default 0.6 for better relevance
  ignoreLocation: true, // Match anywhere in string, not just beginning
  includeScore: true, // For potential ranking adjustments
  includeMatches: true, // Enable highlight functionality
  minMatchCharLength: 2, // Don't match single characters
  // Performance
  shouldSort: true, // Sort by score
  findAllMatches: false, // Stop at first match per field (faster)
};

/**
 * Fuzzy search hook for equipment data using Fuse.js
 *
 * @param equipment - Array of equipment entries to search
 * @param query - Search query string
 * @returns Array of Fuse results with scores and match indices
 *
 * @example
 * const results = useSearch(equipment, 'gentlemax');
 * // Returns matches for GentleMax Pro, GentleMax (aliases), etc.
 *
 * @note Only MachineEntry has manufacturer field. Fuse.js handles undefined
 * fields gracefully by skipping that key for entries without it.
 */
export function useSearch(
  equipment: EquipmentEntry[],
  query: string
): FuseResult<EquipmentEntry>[] {
  // Memoize Fuse instance to avoid re-creating on every render
  const fuse = useMemo(
    () => new Fuse(equipment, fuseOptions),
    [equipment]
  );

  // Normalize query: trim whitespace, return empty array if empty
  const normalizedQuery = query.trim();
  if (!normalizedQuery) {
    return [];
  }

  // Perform search with limit of 8 results
  const results = fuse.search(normalizedQuery, { limit: 8 });
  return results;
}
