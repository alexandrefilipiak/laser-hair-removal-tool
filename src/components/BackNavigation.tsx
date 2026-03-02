/**
 * Back navigation link component
 *
 * Reusable back link with arrow icon used throughout the application
 * for navigating to parent pages.
 */

import Link from 'next/link';
import { colors } from '@/lib/theme';

interface BackNavigationProps {
  /** The URL to navigate to */
  href: string;
  /** The text label for the link */
  label: string;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Back navigation link with arrow icon
 */
export function BackNavigation({ href, label, className = '' }: BackNavigationProps) {
  return (
    <nav style={{ marginBottom: '2.5rem' }} className={className}>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#5E8B7E]"
        style={{ color: colors.text.secondary }}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span style={{ letterSpacing: '0.02em' }}>{label}</span>
      </Link>
    </nav>
  );
}
