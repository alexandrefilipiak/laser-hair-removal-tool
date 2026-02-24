/**
 * Classification badge component
 *
 * Displays one of 6 classification badges based on equipment type:
 * - Clinical Laser (sage green) - verified, established, purpose-built laser
 * - Clinical IPL (blue) - premium IPL devices (AFT, BBL, OPT)
 * - Clinical Hybrid (soft teal) - premium brand, multi-purpose platform
 * - Home Laser (amber) - consumer-grade laser device
 * - Ask Your Clinic (muted rose) - need more information
 * - Limited Results (soft coral) - E-light, DPL, generic IPL
 */

import type { BadgeType } from '@/lib/equipment';

interface ClassificationBadgeProps {
  /** Badge type to display */
  badgeType: BadgeType;
  /** Size variant for different contexts */
  size?: 'default' | 'small';
}

/** Color configurations for each badge type */
const colorConfig: Record<BadgeType, { backgroundColor: string; color: string; borderColor: string }> = {
  'clinical-laser': {
    backgroundColor: 'rgba(94, 139, 126, 0.12)',
    color: '#5E8B7E',
    borderColor: 'rgba(94, 139, 126, 0.25)',
  },
  'clinical-ipl': {
    backgroundColor: 'rgba(74, 124, 176, 0.12)',
    color: '#4A7CB0',
    borderColor: 'rgba(74, 124, 176, 0.25)',
  },
  'clinical-hybrid': {
    backgroundColor: 'rgba(74, 158, 148, 0.12)',
    color: '#4A9E94',
    borderColor: 'rgba(74, 158, 148, 0.25)',
  },
  'home-laser': {
    backgroundColor: 'rgba(196, 145, 62, 0.12)',
    color: '#C4913E',
    borderColor: 'rgba(196, 145, 62, 0.25)',
  },
  'ask-clinic': {
    backgroundColor: 'rgba(176, 122, 122, 0.12)',
    color: '#B07A7A',
    borderColor: 'rgba(176, 122, 122, 0.25)',
  },
  'limited-results': {
    backgroundColor: 'rgba(196, 107, 92, 0.12)',
    color: '#C46B5C',
    borderColor: 'rgba(196, 107, 92, 0.25)',
  },
};

/** Badge labels and icons for each type */
const badgeContent: Record<BadgeType, { label: string; icon: 'check' | 'tilde' | 'plus' | 'warning' | 'question' | 'x' }> = {
  'clinical-laser': { label: 'Clinical Laser', icon: 'check' },
  'clinical-ipl': { label: 'Clinical IPL', icon: 'tilde' },
  'clinical-hybrid': { label: 'Clinical Hybrid', icon: 'plus' },
  'home-laser': { label: 'Home Laser', icon: 'warning' },
  'ask-clinic': { label: 'Ask Your Clinic', icon: 'question' },
  'limited-results': { label: 'Limited Results', icon: 'x' },
};

/** SVG icons for each badge type */
function BadgeIcon({ type, className }: { type: 'check' | 'tilde' | 'plus' | 'warning' | 'question' | 'x'; className: string }) {
  switch (type) {
    case 'check':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'tilde':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 10c0-1.5 1.5-3 3.5-3 1.5 0 2.5.75 3.5 1.5s2 1.5 3.5 1.5c2 0 3.5-1.5 3.5-3v1c0 1.5-1.5 3-3.5 3-1.5 0-2.5-.75-3.5-1.5S9 8 7.5 8C5.5 8 4 9.5 4 11v-1z" />
        </svg>
      );
    case 'plus':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'warning':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'question':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'x':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
  }
}

/**
 * Badge showing laser classification status
 */
export function ClassificationBadge({ badgeType, size = 'default' }: ClassificationBadgeProps) {
  const colors = colorConfig[badgeType];
  const content = badgeContent[badgeType];

  // Size-based styling
  const isSmall = size === 'small';
  const sizeClasses = isSmall
    ? 'px-1.5 py-0.5 gap-0.5'
    : 'px-3 py-1.5 text-sm gap-1.5 md:px-4 md:py-2 md:text-base';

  const iconSize = isSmall ? 'h-2.5 w-2.5 flex-shrink-0' : 'h-4 w-4 md:h-5 md:w-5 flex-shrink-0';

  // Small badges use rounded corners; large badges are pills
  const borderRadius = isSmall ? 'rounded' : 'rounded-full';

  return (
    <span
      role="status"
      className={`inline-flex items-center justify-center font-medium ${borderRadius} ${sizeClasses}`}
      style={{
        backgroundColor: colors.backgroundColor,
        color: colors.color,
        border: `1px solid ${colors.borderColor}`,
        fontSize: isSmall ? '0.625rem' : '0.8125rem',
        lineHeight: isSmall ? 1.3 : undefined,
        maxWidth: isSmall ? '5.5rem' : undefined,
        textAlign: isSmall ? 'center' : undefined,
      }}
    >
      <BadgeIcon type={content.icon} className={iconSize} />
      <span>{content.label}</span>
    </span>
  );
}
