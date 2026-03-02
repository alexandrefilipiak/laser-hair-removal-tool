/**
 * Section divider component
 *
 * Decorative separator used between sections with optional dots.
 */

import { colors } from '@/lib/theme';

interface SectionDividerProps {
  /** Display style - 'dots' shows three dots, 'line' shows simple line */
  style?: 'dots' | 'line';
  /** Maximum width of the divider */
  maxWidth?: string;
  /** Top margin */
  marginTop?: string;
  /** Bottom margin */
  marginBottom?: string;
}

/**
 * Decorative section separator
 */
export function SectionDivider({
  style = 'dots',
  maxWidth = '560px',
  marginTop = '2.5rem',
  marginBottom = '0.5rem',
}: SectionDividerProps) {
  if (style === 'line') {
    return (
      <div
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: colors.border.default,
          marginTop,
          marginBottom,
          maxWidth,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginTop,
        marginBottom,
        maxWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div style={{ flex: 1, height: '1px', backgroundColor: colors.border.default }} />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: colors.border.light }} />
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: colors.border.light }} />
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: colors.border.light }} />
      </div>
      <div style={{ flex: 1, height: '1px', backgroundColor: colors.border.default }} />
    </div>
  );
}
