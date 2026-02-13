'use client';

import Link from 'next/link';
import { useNotFoundSuggestions } from '@/hooks/useNotFoundSuggestions';
import { isMachine } from '@/lib/equipment';
import type { EquipmentEntry } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';

interface NotFoundSuggestionsProps {
  /** User's search query */
  query: string;
  /** Full equipment list for loose search */
  equipment: EquipmentEntry[];
  /** Optional callback when suggestion clicked */
  onSelect?: (slug: string) => void;
  /** Active index for keyboard navigation (-1 = none) */
  activeIndex?: number;
}

/**
 * "Did you mean?" suggestions component for empty search states
 *
 * Shows:
 * 1. Partial matches from loose fuzzy search (threshold 0.5)
 * 2. Related machines from detected manufacturer (if query contains a known brand)
 * 3. Always shows "Browse all equipment" fallback link
 *
 * Supports keyboard navigation via activeIndex prop.
 *
 * Used in:
 * - SearchBar empty state (no exact matches)
 *
 * @example
 * <NotFoundSuggestions
 *   query="genle max"
 *   equipment={allEquipment}
 *   onSelect={(slug) => router.push(`/is-it-a-real-laser/${slug}`)}
 *   activeIndex={0}
 * />
 */
export function NotFoundSuggestions({
  query,
  equipment,
  onSelect,
  activeIndex = -1,
}: NotFoundSuggestionsProps) {
  // Get flat list of suggestions
  const suggestions = useNotFoundSuggestions(equipment, query);

  // Group suggestions by type for display
  const partialMatches = suggestions.filter((s) => s.type === 'partial');
  const relatedMachines = suggestions.filter((s) => s.type === 'related');

  // Check if we have any suggestions to show
  const hasPartialMatches = partialMatches.length > 0;
  const hasRelated = relatedMachines.length > 0;

  // Get detected manufacturer for display
  const detectedManufacturer = relatedMachines.length > 0
    ? relatedMachines[0].manufacturer
    : null;

  // Calculate index offset for related machines
  const relatedIndexOffset = partialMatches.length;

  return (
    <div className="text-left" role="listbox" aria-label="Suggestions">
      {/* Partial matches - "Did you mean?" */}
      {hasPartialMatches && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-2" style={{ color: '#cbd5e1' }}>Did you mean?</p>
          <ul className="space-y-1">
            {partialMatches.map((suggestion, index) => {
              const item = suggestion.item;
              const machine = isMachine(item);
              const isActive = index === activeIndex;

              return (
                <li
                  key={suggestion.slug}
                  id={`suggestion-${index}`}
                  role="option"
                  aria-selected={isActive}
                >
                  <Link
                    href={`/is-it-a-real-laser/${suggestion.slug}`}
                    onClick={(e) => {
                      if (onSelect) {
                        e.preventDefault();
                        onSelect(suggestion.slug);
                      }
                    }}
                    className="flex items-center justify-between gap-3 py-1.5 px-2 rounded-lg font-medium transition-colors"
                    style={{
                      backgroundColor: isActive ? '#334155' : 'transparent',
                      color: isActive ? '#93c5fd' : '#60a5fa',
                    }}
                  >
                    <span className="truncate">
                      <span className="font-semibold">{suggestion.name}</span>
                      {machine && suggestion.manufacturer && (
                        <span style={{ color: '#94a3b8' }}>
                          {' '}
                          by {suggestion.manufacturer}
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
          <p className="text-sm font-medium mb-2" style={{ color: '#cbd5e1' }}>
            Related {detectedManufacturer} machines:
          </p>
          <ul className="space-y-1">
            {relatedMachines.map((suggestion, index) => {
              const globalIndex = relatedIndexOffset + index;
              const isActive = globalIndex === activeIndex;

              return (
                <li
                  key={suggestion.slug}
                  id={`suggestion-${globalIndex}`}
                  role="option"
                  aria-selected={isActive}
                >
                  <Link
                    href={`/is-it-a-real-laser/${suggestion.slug}`}
                    onClick={(e) => {
                      if (onSelect) {
                        e.preventDefault();
                        onSelect(suggestion.slug);
                      }
                    }}
                    className="flex items-center justify-between gap-3 py-1.5 px-2 rounded-lg font-medium transition-colors"
                    style={{
                      backgroundColor: isActive ? '#334155' : 'transparent',
                      color: isActive ? '#93c5fd' : '#60a5fa',
                    }}
                  >
                    <span className="truncate">
                      <span className="font-semibold">{suggestion.name}</span>
                      <span style={{ color: '#94a3b8' }}>
                        {' '}
                        by {suggestion.manufacturer}
                      </span>
                    </span>
                    <span className="flex-shrink-0">
                      <ClassificationBadge technologyType={suggestion.item.technologyType} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Always show fallback */}
      <Link
        href="/is-it-a-real-laser"
        className="font-medium"
        style={{ color: '#60a5fa' }}
      >
        Browse all equipment
      </Link>
    </div>
  );
}
