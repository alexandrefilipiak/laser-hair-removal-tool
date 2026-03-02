/**
 * Comparison card component
 *
 * Card for displaying comparison specs side by side,
 * commonly used in guide pages for comparing devices.
 */

import { colors } from '@/lib/theme';

interface SpecRow {
  /** Spec label */
  label: string;
  /** Spec value */
  value: string;
  /** Mark as italic/undisclosed */
  italic?: boolean;
}

interface ComparisonCardProps {
  /** Card title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Visual variant */
  variant: 'amber' | 'primary';
  /** List of spec rows */
  specs: SpecRow[];
}

const variantStyles = {
  amber: {
    bg: 'rgba(196, 158, 92, 0.08)',
    border: 'rgba(196, 158, 92, 0.2)',
    titleColor: '#B8860B',
  },
  primary: {
    bg: colors.primaryLight,
    border: colors.primaryBorder,
    titleColor: colors.primary,
  },
};

/**
 * Comparison card with title and spec rows
 */
export function ComparisonCard({ title, subtitle, variant, specs }: ComparisonCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className="rounded-xl p-4"
      style={{
        backgroundColor: styles.bg,
        border: `1px solid ${styles.border}`,
      }}
    >
      <div style={{ color: styles.titleColor, fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ color: colors.text.secondary, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
          {subtitle}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
        {specs.map((spec, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ color: colors.text.secondary, fontSize: '0.875rem' }}>{spec.label}</span>
            <span
              style={{
                color: spec.italic ? colors.text.secondary : colors.text.primary,
                fontSize: '0.9375rem',
                fontWeight: spec.italic ? 400 : 500,
                fontStyle: spec.italic ? 'italic' : 'normal',
              }}
            >
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ComparisonCardGridProps {
  /** Child ComparisonCard components */
  children: React.ReactNode;
}

/**
 * Grid wrapper for comparison cards
 */
export function ComparisonCardGrid({ children }: ComparisonCardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  );
}
