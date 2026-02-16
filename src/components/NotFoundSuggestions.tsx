'use client';

import Link from 'next/link';
import { useNotFoundSuggestions } from '@/hooks/useNotFoundSuggestions';
import { isMachine, getBadgeType } from '@/lib/equipment';
import type { EquipmentEntry } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';

interface NotFoundSuggestionsProps {
  /** User's search query */
  query: string;
  /** Full equipment list for loose search */
  equipment: EquipmentEntry[];
  /** Optional callback when suggestion clicked */
  onSelect?: (slug: string) => void;
  /** Callback when "Browse all" is selected */
  onBrowseAll?: () => void;
  /** Active index for keyboard navigation (-1 = none) */
  activeIndex?: number;
}

/**
 * "Did you mean?" suggestions component for empty search states
 */
export function NotFoundSuggestions({
  query,
  equipment,
  onSelect,
  onBrowseAll,
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

  // "Browse all" is the last item
  const browseAllIndex = suggestions.length;
  const isBrowseAllActive = activeIndex === browseAllIndex;

  return (
    <div className="text-left" role="listbox" aria-label="Suggestions">
      {/* Partial matches - "Did you mean?" */}
      {hasPartialMatches && (
        <div className="mb-4">
          <p
            className="text-sm font-medium mb-2"
            style={{
              color: '#5A5550',
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Did you mean?
          </p>
          <ul className="space-y-1">
            {partialMatches.map((suggestion, index) => {
              const item = suggestion.item;
              const machine = isMachine(item);
              const isActive = index === activeIndex;

              return (
                <li
                  key={suggestion.slug}
                  id={`result-${index}`}
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
                    className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor: isActive ? 'rgba(94, 139, 126, 0.08)' : 'transparent',
                      color: isActive ? '#5E8B7E' : '#2D2D2D',
                    }}
                  >
                    <span className="truncate">
                      <span className="font-semibold">{suggestion.name}</span>
                      {machine && suggestion.manufacturer && (
                        <span
                          style={{
                            color: '#5A5550',
                            fontSize: '0.7rem',
                            marginLeft: '0.5rem',
                          }}
                        >
                          {item.brandTier === 'premium-clinical' && '🥇 '}
                          {suggestion.manufacturer}
                        </span>
                      )}
                    </span>
                    <span className="flex-shrink-0">
                      <ClassificationBadge badgeType={getBadgeType(item)} />
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
          <p
            className="text-sm font-medium mb-2"
            style={{
              color: '#5A5550',
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Related {detectedManufacturer} machines:
          </p>
          <ul className="space-y-1">
            {relatedMachines.map((suggestion, index) => {
              const globalIndex = relatedIndexOffset + index;
              const isActive = globalIndex === activeIndex;

              return (
                <li
                  key={suggestion.slug}
                  id={`result-${globalIndex}`}
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
                    className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor: isActive ? 'rgba(94, 139, 126, 0.08)' : 'transparent',
                      color: isActive ? '#5E8B7E' : '#2D2D2D',
                    }}
                  >
                    <span className="truncate">
                      <span className="font-semibold">{suggestion.name}</span>
                      <span
                        style={{
                          color: '#5A5550',
                          fontSize: '0.7rem',
                          marginLeft: '0.5rem',
                        }}
                      >
                        {isMachine(suggestion.item) && suggestion.item.brandTier === 'premium-clinical' && '🥇 '}
                        {suggestion.manufacturer}
                      </span>
                    </span>
                    <span className="flex-shrink-0">
                      <ClassificationBadge badgeType={getBadgeType(suggestion.item)} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Always show fallback - keyboard navigable */}
      <div
        id={`result-${browseAllIndex}`}
        role="option"
        aria-selected={isBrowseAllActive}
        style={{
          paddingTop: '0.75rem',
          borderTop: '1px solid #E8E4DF',
        }}
      >
        <Link
          href="#machines"
          onClick={(e) => {
            if (onBrowseAll) {
              e.preventDefault();
              onBrowseAll();
            }
          }}
          className="inline-flex items-center gap-2 font-medium transition-colors py-2 px-3 -mx-3 rounded-lg"
          style={{
            color: isBrowseAllActive ? '#4A7466' : '#5E8B7E',
            fontSize: '0.9375rem',
            backgroundColor: isBrowseAllActive ? 'rgba(94, 139, 126, 0.08)' : 'transparent',
          }}
        >
          <span>Browse all equipment</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
