'use client';

import Link from 'next/link';
import { useLooseSearch } from '@/hooks/useLooseSearch';
import { getRelatedByManufacturer, isMachine } from '@/lib/equipment';
import type { EquipmentEntry, MachineEntry } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';

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

interface NotFoundSuggestionsProps {
  /** User's search query */
  query: string;
  /** Full equipment list for loose search */
  equipment: EquipmentEntry[];
  /** Optional callback when suggestion clicked */
  onSelect?: (slug: string) => void;
}

/**
 * "Did you mean?" suggestions component for empty search states
 *
 * Shows:
 * 1. Partial matches from loose fuzzy search (threshold 0.5)
 * 2. Related machines from detected manufacturer (if query contains a known brand)
 * 3. Always shows "Browse all equipment" fallback link
 *
 * Used in:
 * - SearchBar empty state (no exact matches)
 * - Could be used in 404 pages with client-side rendering
 *
 * @example
 * <NotFoundSuggestions
 *   query="genle max"
 *   equipment={allEquipment}
 *   onSelect={(slug) => router.push(`/is-it-a-real-laser/${slug}`)}
 * />
 */
export function NotFoundSuggestions({
  query,
  equipment,
  onSelect,
}: NotFoundSuggestionsProps) {
  // Get partial matches using loose search
  const partialMatches = useLooseSearch(equipment, query);

  // Detect manufacturer in query (case-insensitive)
  const normalizedQuery = query.toLowerCase();
  const detectedManufacturer = KNOWN_MANUFACTURERS.find((m) =>
    normalizedQuery.includes(m.toLowerCase())
  );

  // Get related machines by manufacturer (if detected)
  const relatedMachines: MachineEntry[] = detectedManufacturer
    ? getRelatedByManufacturer(detectedManufacturer, undefined, 3)
    : [];

  // Deduplicate: filter out related machines already in partial matches
  const partialMatchSlugs = new Set(partialMatches.map((r) => r.item.slug));
  const uniqueRelated = relatedMachines.filter(
    (m) => !partialMatchSlugs.has(m.slug)
  );

  // Check if we have any suggestions to show
  const hasPartialMatches = partialMatches.length > 0;
  const hasRelated = uniqueRelated.length > 0;

  return (
    <div className="text-left" role="status" aria-live="polite">
      {/* Partial matches - "Did you mean?" */}
      {hasPartialMatches && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Did you mean?</p>
          <ul className="space-y-1">
            {partialMatches.slice(0, 3).map((result) => {
              const item = result.item;
              const machine = isMachine(item);

              return (
                <li key={item.slug}>
                  <Link
                    href={`/is-it-a-real-laser/${item.slug}`}
                    onClick={(e) => {
                      if (onSelect) {
                        e.preventDefault();
                        onSelect(item.slug);
                      }
                    }}
                    className="flex items-center justify-between gap-3 py-1.5 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <span className="truncate">
                      <span className="font-semibold">{item.name}</span>
                      {machine && (
                        <span className="text-gray-500 font-normal">
                          {' '}
                          by {item.manufacturer}
                        </span>
                      )}
                    </span>
                    <span className="flex-shrink-0">
                      {machine ? (
                        <ClassificationBadge technologyType={item.technologyType} />
                      ) : (
                        <ClassificationBadge isRealLaser={item.isRealLaser} />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Related machines by manufacturer */}
      {hasRelated && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Related {detectedManufacturer} machines:
          </p>
          <ul className="space-y-1">
            {uniqueRelated.map((machine) => (
              <li key={machine.slug}>
                <Link
                  href={`/is-it-a-real-laser/${machine.slug}`}
                  onClick={(e) => {
                    if (onSelect) {
                      e.preventDefault();
                      onSelect(machine.slug);
                    }
                  }}
                  className="flex items-center justify-between gap-3 py-1.5 text-blue-600 hover:text-blue-800 font-medium"
                >
                  <span className="truncate">
                    <span className="font-semibold">{machine.name}</span>
                    <span className="text-gray-500 font-normal">
                      {' '}
                      by {machine.manufacturer}
                    </span>
                  </span>
                  <span className="flex-shrink-0">
                    <ClassificationBadge technologyType={machine.technologyType} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Always show fallback */}
      <Link
        href="/is-it-a-real-laser"
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        Browse all equipment
      </Link>
    </div>
  );
}
