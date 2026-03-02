/**
 * Link chip grid component
 *
 * Grid of clickable link chips/tags used for displaying
 * related links, popular searches, etc.
 */

import Link from 'next/link';
import { colors } from '@/lib/theme';

interface LinkItem {
  /** Display text */
  label: string;
  /** Link URL or slug */
  href: string;
}

interface LinkChipGridProps {
  /** Array of link items */
  links: LinkItem[];
  /** Visual variant */
  variant?: 'default' | 'amber' | 'coral';
  /** Optional section title */
  title?: string;
  /** Show arrow icon on each chip */
  showArrow?: boolean;
}

const variantStyles = {
  default: {
    bg: colors.background.card,
    border: colors.border.default,
    color: colors.text.primary,
    hoverBorder: colors.primary,
    hoverColor: colors.primary,
  },
  amber: {
    bg: 'rgba(180, 140, 60, 0.12)',
    border: 'transparent',
    color: colors.accent.amber,
    hoverBorder: 'transparent',
    hoverColor: colors.accent.amber,
  },
  coral: {
    bg: 'rgba(196, 107, 92, 0.12)',
    border: 'transparent',
    color: colors.accent.coral,
    hoverBorder: 'transparent',
    hoverColor: colors.accent.coral,
  },
};

/**
 * Grid of clickable link chips
 */
export function LinkChipGrid({
  links,
  variant = 'default',
  title,
  showArrow = false,
}: LinkChipGridProps) {
  const styles = variantStyles[variant];

  return (
    <div>
      {title && (
        <span
          style={{
            display: 'block',
            color: colors.text.secondary,
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          {title}
        </span>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              backgroundColor: styles.bg,
              color: styles.color,
              fontSize: '0.9375rem',
              fontWeight: variant !== 'default' ? 500 : 400,
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              border: styles.border !== 'transparent' ? `1px solid ${styles.border}` : 'none',
              textDecoration: 'none',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            className={`hover:border-[${styles.hoverBorder}] hover:text-[${styles.hoverColor}]`}
          >
            <span>{item.label}</span>
            {showArrow && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
