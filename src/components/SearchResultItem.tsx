'use client';

import Link from 'next/link';
import type { FuseResult } from 'fuse.js';
import type { EquipmentEntry } from '@/lib/equipment';
import { isMachine } from '@/lib/equipment';
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
 *
 * Renders as an li element with proper ARIA attributes for combobox pattern.
 * Shows equipment name (highlighted), manufacturer for machines, and
 * classification badge on the right.
 *
 * @example
 * <SearchResultItem
 *   result={fuseResults[0]}
 *   isActive={activeIndex === 0}
 *   index={0}
 * />
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
        borderBottom: '1px solid #334155',
        backgroundColor: isActive ? '#334155' : 'transparent',
      }}
      className="last:border-b-0 transition-colors hover:bg-[#334155]"
    >
      <Link
        href={`/is-it-a-real-laser/${item.slug}`}
        className="flex items-center justify-between gap-3"
        style={{ padding: '0.75rem 1rem', textAlign: 'left' }}
      >
        <div className="flex-1 min-w-0">
          {/* Equipment name with match highlighting */}
          <div className="font-medium truncate" style={{ color: '#f1f5f9' }}>
            <HighlightMatch
              text={item.name}
              matches={result.matches}
              fieldKey="name"
            />
          </div>

          {/* Manufacturer for machines */}
          {machine && (
            <div className="text-sm truncate" style={{ color: '#94a3b8' }}>
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
          {machine ? (
            <ClassificationBadge technologyType={item.technologyType} />
          ) : (
            <ClassificationBadge isRealLaser={item.isRealLaser} />
          )}
        </div>
      </Link>
    </li>
  );
}
