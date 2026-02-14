/**
 * Medical disclaimer component
 *
 * Subtle inline notice for equipment detail pages.
 * Designed to inform without dominating - visually subtle but accessible.
 */

interface DisclaimerProps {
  /** Compact variant for prominent placement near header */
  variant?: 'compact' | 'full';
}

/**
 * Disclaimer showing informational notice
 *
 * Two variants:
 * - compact: Single-line inline notice with icon (for header placement)
 * - full: Expanded version with more detail (for bottom of page)
 */
export function Disclaimer({ variant = 'compact' }: DisclaimerProps) {
  if (variant === 'compact') {
    return (
      <div
        role="note"
        aria-label="Content disclaimer"
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
        style={{
          backgroundColor: 'rgba(107, 101, 96, 0.06)',
          border: '1px solid rgba(107, 101, 96, 0.12)',
          color: '#6B6560',
        }}
      >
        <svg
          className="h-4 w-4 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ color: '#6B6560' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          Informational only — not medical advice.{' '}
          <span className="hidden sm:inline">Consult a qualified practitioner.</span>
        </span>
      </div>
    );
  }

  // Full variant - more detailed, for page bottom if needed
  return (
    <aside
      role="complementary"
      aria-label="Medical disclaimer"
      className="rounded-lg px-4 py-3 text-center"
      style={{
        backgroundColor: 'rgba(107, 101, 96, 0.04)',
        border: '1px solid rgba(107, 101, 96, 0.1)',
      }}
    >
      <p className="text-xs leading-relaxed" style={{ color: '#6B6560' }}>
        This tool provides general information about laser hair removal equipment
        for educational purposes only. Individual results vary based on skin type,
        hair color, and other factors. Always consult with a qualified practitioner
        before undergoing any cosmetic procedure.
      </p>
    </aside>
  );
}
