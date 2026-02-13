'use client';

import { useMemo } from 'react';
import { useLooseSearch } from './useLooseSearch';
import { getRelatedByManufacturer, isMachine } from '@/lib/equipment';
import type { EquipmentEntry, MachineEntry } from '@/lib/equipment';

/**
 * Known manufacturers for detection in search queries
 */
const KNOWN_MANUFACTURERS = [
  'Candela',
  'Cynosure',
  'Lumenis',
  'Alma',
  'Cutera',
  'Quanta',
  'InMode',
  'Lutronic',
];

export interface NotFoundSuggestion {
  slug: string;
  name: string;
  manufacturer?: string;
  item: EquipmentEntry | MachineEntry;
  type: 'partial' | 'related';
}

/**
 * Hook to compute "Did you mean?" suggestions for empty search states
 *
 * Returns a flat list of suggestions (partial matches + related machines)
 * for keyboard navigation support.
 *
 * @param equipment - Full equipment list
 * @param query - User's search query
 * @returns Flat list of suggestions with metadata
 */
export function useNotFoundSuggestions(
  equipment: EquipmentEntry[],
  query: string
): NotFoundSuggestion[] {
  // Get partial matches using loose search
  const partialMatches = useLooseSearch(equipment, query);

  return useMemo(() => {
    const suggestions: NotFoundSuggestion[] = [];

    // Add partial matches (up to 3)
    partialMatches.slice(0, 3).forEach((result) => {
      const item = result.item;
      suggestions.push({
        slug: item.slug,
        name: item.name,
        manufacturer: isMachine(item) ? item.manufacturer : undefined,
        item,
        type: 'partial',
      });
    });

    // Detect manufacturer in query (case-insensitive)
    const normalizedQuery = query.toLowerCase();
    const detectedManufacturer = KNOWN_MANUFACTURERS.find((m) =>
      normalizedQuery.includes(m.toLowerCase())
    );

    // Get related machines by manufacturer (if detected)
    if (detectedManufacturer) {
      const relatedMachines = getRelatedByManufacturer(detectedManufacturer, undefined, 3);

      // Deduplicate: filter out related machines already in partial matches
      const partialMatchSlugs = new Set(suggestions.map((s) => s.slug));

      relatedMachines
        .filter((m) => !partialMatchSlugs.has(m.slug))
        .forEach((machine) => {
          suggestions.push({
            slug: machine.slug,
            name: machine.name,
            manufacturer: machine.manufacturer,
            item: machine,
            type: 'related',
          });
        });
    }

    return suggestions;
  }, [partialMatches, query]);
}
