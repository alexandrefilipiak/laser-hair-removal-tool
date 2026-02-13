/**
 * Brand tier badge component
 *
 * Displays brand quality tier with human-readable labels
 */

import type { BrandTier } from '@/lib/equipment';

interface BrandTierBadgeProps {
  tier: BrandTier;
}

/** Tier configuration with display names and styling */
const tierConfig: Record<
  BrandTier,
  { label: string; className: string }
> = {
  'premium-clinical': {
    label: 'Gold Standard',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  'standard-clinical': {
    label: 'Established',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  consumer: {
    label: 'Home Device',
    className: 'bg-gray-50 text-gray-700 border-gray-200',
  },
  unknown: {
    label: 'Unknown Brand',
    className: 'bg-gray-100 text-gray-500 border-gray-200',
  },
};

/**
 * Badge showing brand tier classification
 *
 * Smaller than ClassificationBadge as it's secondary information
 */
export function BrandTierBadge({ tier }: BrandTierBadgeProps) {
  const config = tierConfig[tier];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium md:px-2.5 md:py-1 md:text-sm ${config.className}`}
    >
      {config.label}
    </span>
  );
}
