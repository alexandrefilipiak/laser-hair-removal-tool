'use client';

import Link from 'next/link';
import type { FuseResult } from 'fuse.js';
import type { EquipmentEntry } from '@/lib/equipment';
import { isMachine, getBadgeType } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { HighlightMatch } from './HighlightMatch';

interface SearchResultItemProps {
  /** Fuse.js result with item and match data */
  result: FuseResult<EquipmentEntry>;
  /** Whether this item is currently highlighted via keyboard navigation */
  isActive: boolean;
  /** Index for ARIA activedescendant reference */
  index: number;
}

/**
 * Individual search result row with highlighted name and classification badge
 */
export function SearchResultItem({
  result,
  isActive,
  index,
}: SearchResultItemProps) {
  const item = result.item;
  const machine = isMachine(item);

  return (
    <li
      id={`result-${index}`}
      role="option"
      aria-selected={isActive}
      style={{
        borderBottom: '1px solid #E8E4DF',
        backgroundColor: isActive ? 'rgba(94, 139, 126, 0.08)' : 'transparent',
        transition: 'background-color 0.15s',
      }}
      className="last:border-b-0"
    >
      <Link
        href={`/is-it-a-real-laser/${item.slug}`}
        className="flex items-center justify-between gap-3 hover:bg-[rgba(94,139,126,0.05)]"
        style={{ padding: '0.875rem 1.25rem', textAlign: 'left' }}
      >
        <div className="flex-1 min-w-0">
          {/* Equipment name with match highlighting */}
          <div
            className="font-medium truncate"
            style={{ color: isActive ? '#5E8B7E' : '#2D2D2D' }}
          >
            <HighlightMatch
              text={item.name}
              matches={result.matches}
              fieldKey="name"
            />
          </div>

          {/* Manufacturer for machines */}
          {machine && (
            <div
              className="text-sm truncate"
              style={{
                color: '#6B6560',
                fontSize: '0.7rem',
                marginTop: '0.125rem',
              }}
            >
              {item.brandTier === 'premium-clinical' && '🥇 '}
              <HighlightMatch
                text={item.manufacturer}
                matches={result.matches}
                fieldKey="manufacturer"
              />
            </div>
          )}
        </div>

        {/* Classification badge */}
        <div className="flex-shrink-0">
          <ClassificationBadge badgeType={getBadgeType(item)} />
        </div>
      </Link>
    </li>
  );
}
