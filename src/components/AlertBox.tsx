/**
 * Alert box component
 *
 * Colored info/warning/error boxes used throughout the application
 * for highlighting important information.
 */

import { ReactNode } from 'react';
import { colors } from '@/lib/theme';

type AlertVariant = 'info' | 'warning' | 'error' | 'success' | 'amber';

interface AlertBoxProps {
  /** The visual style variant */
  variant: AlertVariant;
  /** Optional title text */
  title?: string;
  /** Alert content */
  children: ReactNode;
  /** Optional custom icon */
  icon?: ReactNode;
  /** Center the content */
  centered?: boolean;
}

const variantStyles: Record<AlertVariant, { bg: string; border: string; color: string }> = {
  info: {
    bg: colors.primaryLight,
    border: colors.primaryBorder,
    color: colors.primary,
  },
  warning: {
    bg: colors.accent.amberLight,
    border: colors.accent.amberBorder,
    color: colors.accent.amber,
  },
  error: {
    bg: colors.accent.coralLight,
    border: colors.accent.coralBorder,
    color: colors.accent.coral,
  },
  success: {
    bg: colors.accent.tealLight,
    border: colors.accent.tealBorder,
    color: colors.accent.teal,
  },
  amber: {
    bg: colors.accent.amberLight,
    border: colors.accent.amberBorder,
    color: colors.accent.amber,
  },
};

const defaultIcons: Record<AlertVariant, ReactNode> = {
  info: (
    <svg
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  error: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  success: (
    <svg
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  amber: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

/**
 * Colored alert box for highlighting information
 */
export function AlertBox({
  variant,
  title,
  children,
  icon,
  centered = false,
}: AlertBoxProps) {
  const styles = variantStyles[variant];
  const displayIcon = icon ?? defaultIcons[variant];

  return (
    <div
      className="rounded-xl"
      style={{
        backgroundColor: styles.bg,
        border: `1px solid ${styles.border}`,
        padding: '1.5rem',
      }}
    >
      {title && (
        <h2
          className="flex items-center gap-2"
          style={{
            color: styles.color,
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
            justifyContent: centered ? 'center' : 'flex-start',
          }}
        >
          {displayIcon}
          {title}
        </h2>
      )}
      <div
        style={{
          color: colors.text.secondary,
          lineHeight: 1.7,
          textAlign: centered ? 'center' : 'left',
        }}
      >
        {children}
      </div>
    </div>
  );
}
