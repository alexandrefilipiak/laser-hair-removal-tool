/**
 * Brand tier badge component
 *
 * Displays brand quality tier with human-readable labels
 * Styled with warm, premium wellness colors
 */

import type { BrandTier } from '@/lib/equipment';

interface BrandTierBadgeProps {
  tier: BrandTier;
}

/** Tier configuration with display names and warm wellness styling */
const tierConfig: Record<
  BrandTier,
  { label: string; backgroundColor: string; color: string; borderColor: string }
> = {
  'premium-clinical': {
    label: 'Gold Standard',
    backgroundColor: 'rgba(184, 150, 78, 0.12)',
    color: '#B8964E',
    borderColor: 'rgba(184, 150, 78, 0.25)',
  },
  'standard-clinical': {
    label: 'Established',
    backgroundColor: 'rgba(106, 156, 165, 0.12)',
    color: '#6A9CA5',
    borderColor: 'rgba(106, 156, 165, 0.25)',
  },
  consumer: {
    label: 'Home Device',
    backgroundColor: 'rgba(107, 101, 96, 0.08)',
    color: '#6B6560',
    borderColor: 'rgba(107, 101, 96, 0.15)',
  },
  unknown: {
    label: 'Unknown Brand',
    backgroundColor: 'rgba(176, 122, 122, 0.12)',
    color: '#B07A7A',
    borderColor: 'rgba(176, 122, 122, 0.25)',
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
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium md:px-2.5 md:py-1 md:text-sm"
      style={{
        backgroundColor: config.backgroundColor,
        color: config.color,
        border: `1px solid ${config.borderColor}`,
      }}
    >
      {config.label}
    </span>
  );
}
