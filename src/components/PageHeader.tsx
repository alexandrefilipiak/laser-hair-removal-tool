/**
 * Page header component
 *
 * Reusable header layout with optional badge, title, subtitle,
 * and disclaimer for guide and detail pages.
 */

import { ReactNode } from 'react';
import { Disclaimer } from './Disclaimer';
import { colors, typography } from '@/lib/theme';

interface BadgeConfig {
  /** Badge text */
  label: string;
  /** Badge color variant */
  variant?: 'amber' | 'primary' | 'coral';
}

interface TocItem {
  /** Section ID (without #) */
  id: string;
  /** Display label */
  label: string;
}

interface PageHeaderProps {
  /** Optional badge displayed above title */
  badge?: BadgeConfig;
  /** Page title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Show the disclaimer component */
  showDisclaimer?: boolean;
  /** Table of contents items */
  toc?: TocItem[];
  /** Custom content to render after the header */
  children?: ReactNode;
}

const badgeVariants = {
  amber: {
    bg: 'rgba(196, 158, 92, 0.12)',
    border: 'rgba(196, 158, 92, 0.3)',
    color: '#B8860B',
  },
  primary: {
    bg: colors.primaryLight,
    border: colors.primaryBorder,
    color: colors.primary,
  },
  coral: {
    bg: colors.accent.coralLight,
    border: colors.accent.coralBorder,
    color: colors.accent.coral,
  },
};

/**
 * Page header with badge, title, subtitle, and disclaimer
 */
export function PageHeader({
  badge,
  title,
  subtitle,
  showDisclaimer = true,
  toc,
  children,
}: PageHeaderProps) {
  const badgeStyle = badge ? badgeVariants[badge.variant || 'amber'] : null;

  return (
    <>
      {/* Badge */}
      {badge && badgeStyle && (
        <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5"
            style={{
              backgroundColor: badgeStyle.bg,
              border: `1px solid ${badgeStyle.border}`,
              color: badgeStyle.color,
              fontSize: '0.8125rem',
              fontWeight: 500,
            }}
          >
            {badge.label}
          </span>
        </div>
      )}

      {/* Title */}
      <header className="text-center" style={{ marginBottom: subtitle ? '1rem' : '1.25rem' }}>
        <h1
          style={{
            fontFamily: typography.fontFamily.heading,
            fontSize: typography.fontSize['3xl'],
            fontWeight: 600,
            letterSpacing: typography.letterSpacing.tight,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.tight,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              marginTop: '0.75rem',
              color: colors.text.secondary,
              fontSize: typography.fontSize.lg,
            }}
          >
            {subtitle}
          </p>
        )}
      </header>

      {/* Disclaimer */}
      {showDisclaimer && (
        <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
          <Disclaimer />
        </div>
      )}

      {/* Table of Contents */}
      {toc && toc.length > 0 && (
        <nav
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.25rem 0.5rem',
            marginBottom: '2.5rem',
            fontSize: '0.875rem',
          }}
        >
          {toc.map((item, index) => (
            <span key={item.id} style={{ display: 'contents' }}>
              <a
                href={`#${item.id}`}
                style={{ color: colors.primary, textDecoration: 'none', padding: '0.5rem 0.25rem' }}
                className="hover:underline"
              >
                {item.label}
              </a>
              {index < toc.length - 1 && (
                <span style={{ color: colors.border.default, padding: '0.5rem 0' }}>·</span>
              )}
            </span>
          ))}
        </nav>
      )}

      {children}
    </>
  );
}
