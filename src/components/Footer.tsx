/**
 * Shared footer component
 *
 * Displays the informational disclaimer and contact link at the bottom of pages.
 */

import Link from 'next/link';

export function Footer() {
  return (
    <footer
      className="text-center"
      style={{
        borderTop: '1px solid #E8E4DF',
        paddingTop: '2rem',
        marginTop: '3rem',
        paddingBottom: '1rem',
      }}
    >
      <p style={{ color: '#5A5550', fontSize: '0.75rem', letterSpacing: '0.02em', marginBottom: '0.75rem' }}>
        For informational purposes only. Not medical advice.
      </p>
      <Link
        href="/contact"
        style={{
          color: '#5E8B7E',
          fontSize: '0.8125rem',
          textDecoration: 'none',
        }}
        className="hover:underline"
      >
        Contact Us
      </Link>
    </footer>
  );
}
