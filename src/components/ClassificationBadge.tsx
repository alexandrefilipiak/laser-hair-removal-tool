/**
 * Classification badge component
 *
 * Displays "Real Laser", "Not a Laser", or "Ask Your Clinic" status
 * based on the equipment classification.
 * Styled with warm, premium wellness colors.
 */

interface ClassificationBadgeProps {
  /** Whether this is a real laser - null for ambiguous terms */
  isRealLaser?: boolean | null;
  /** Technology type for machines (derives isRealLaser if provided) */
  technologyType?: string;
  /** Size variant for different contexts */
  size?: 'default' | 'small';
}

/** Warm wellness color configurations for each classification */
const colorConfig = {
  realLaser: {
    backgroundColor: 'rgba(94, 139, 126, 0.12)',
    color: '#5E8B7E',
    borderColor: 'rgba(94, 139, 126, 0.25)',
  },
  notLaser: {
    backgroundColor: 'rgba(196, 107, 92, 0.12)',
    color: '#C46B5C',
    borderColor: 'rgba(196, 107, 92, 0.25)',
  },
  askClinic: {
    backgroundColor: 'rgba(196, 145, 62, 0.12)',
    color: '#C4913E',
    borderColor: 'rgba(196, 145, 62, 0.25)',
  },
};

/**
 * Badge showing laser classification status
 *
 * Three states:
 * - true: "Real Laser" (sage green)
 * - false: "Not a Laser" (soft coral)
 * - null: "Ask Your Clinic" (warm amber)
 */
export function ClassificationBadge({
  isRealLaser,
  technologyType,
  size = 'default',
}: ClassificationBadgeProps) {
  // For machines, derive classification from technology type
  const classification =
    technologyType !== undefined ? technologyType === 'laser' : isRealLaser;

  // Size-based styling
  const sizeClasses =
    size === 'small'
      ? 'px-3 py-1 text-xs gap-1'
      : 'px-3 py-1.5 text-sm gap-1.5 md:px-4 md:py-2 md:text-base';

  const iconSize = size === 'small' ? 'h-3 w-3' : 'h-4 w-4 md:h-5 md:w-5';

  // Small badges allow text wrapping for longer labels
  const smallBadgeStyle = size === 'small' ? { maxWidth: '5.5rem', textAlign: 'center' as const, lineHeight: 1.3 } : {};

  // Determine badge content and styling based on classification
  if (classification === true) {
    const colors = colorConfig.realLaser;
    return (
      <span
        role="status"
        className={`inline-flex items-center flex-wrap justify-center rounded-full font-semibold ${sizeClasses}`}
        style={{
          backgroundColor: colors.backgroundColor,
          color: colors.color,
          border: `1px solid ${colors.borderColor}`,
          ...smallBadgeStyle,
        }}
      >
        <svg
          className={iconSize}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Real Laser
      </span>
    );
  }

  if (classification === false) {
    const colors = colorConfig.notLaser;
    return (
      <span
        role="status"
        className={`inline-flex items-center flex-wrap justify-center rounded-full font-semibold ${sizeClasses}`}
        style={{
          backgroundColor: colors.backgroundColor,
          color: colors.color,
          border: `1px solid ${colors.borderColor}`,
          ...smallBadgeStyle,
        }}
      >
        <svg
          className={iconSize}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Not a Laser
      </span>
    );
  }

  // null case: ambiguous classification
  const colors = colorConfig.askClinic;
  return (
    <span
      role="status"
      className={`inline-flex items-center flex-wrap justify-center rounded-full font-semibold ${sizeClasses}`}
      style={{
        backgroundColor: colors.backgroundColor,
        color: colors.color,
        border: `1px solid ${colors.borderColor}`,
        ...smallBadgeStyle,
      }}
    >
      <svg
        className={iconSize}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      Ask Your Clinic
    </span>
  );
}
