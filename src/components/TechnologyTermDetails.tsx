/**
 * Technology term details component
 *
 * Layout for displaying technology term information including
 * classification, explanation, and guidance.
 */

import Link from 'next/link';
import type { TechnologyTermEntry } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { Disclaimer } from './Disclaimer';

interface TechnologyTermDetailsProps {
  term: TechnologyTermEntry;
}

/**
 * Full technology term detail layout
 */
export function TechnologyTermDetails({ term }: TechnologyTermDetailsProps) {
  const { name, isRealLaser, whatItIs, whyItMatters, askYourClinic } = term;

  return (
    <main
      style={{
        backgroundColor: '#FAF9F7',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <article className="mx-auto max-w-2xl px-4 py-8 md:py-12" style={{ position: 'relative', zIndex: 1 }}>
        {/* Back to search link */}
        <nav style={{ marginBottom: '2.5rem' }}>
          <Link
            href="/is-it-a-real-laser"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#5E8B7E]"
            style={{ color: '#6B6560' }}
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
            <span style={{ letterSpacing: '0.02em' }}>
              Back to Search
            </span>
          </Link>
        </nav>

        {/* Classification Badge - prominent, centered */}
        <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
          <ClassificationBadge isRealLaser={isRealLaser} />
        </div>

        {/* Term Name */}
        <header className="text-center" style={{ marginBottom: '1.25rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#2D2D2D',
              lineHeight: 1.1,
            }}
          >
            {name}
          </h1>
        </header>

        {/* Disclaimer - subtle inline notice */}
        <div className="flex justify-center" style={{ marginBottom: '3rem' }}>
          <Disclaimer />
        </div>

        {/* What It Is - prominent section */}
        <section
          className="rounded-xl"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E4DF',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              color: '#5E8B7E',
              fontSize: '0.7rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            What It Is
          </h2>
          <p className="leading-relaxed" style={{ color: '#2D2D2D', fontSize: '1.0625rem', lineHeight: 1.7 }}>
            {whatItIs}
          </p>
        </section>

        {/* Why It Matters */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.125rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Why It Matters
          </h2>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7 }}>
            {whyItMatters}
          </p>
        </section>

        {/* Ask Your Clinic - highlight box if present */}
        {askYourClinic && (
          <section
            className="rounded-xl"
            style={{
              backgroundColor: 'rgba(94, 139, 126, 0.06)',
              border: '1px solid rgba(94, 139, 126, 0.15)',
              padding: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <h2
              className="flex items-center gap-2"
              style={{
                color: '#5E8B7E',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}
            >
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
              Ask Your Clinic
            </h2>
            <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7 }}>
              {askYourClinic}
            </p>
          </section>
        )}

        {/* Footer */}
        <footer
          className="text-center"
          style={{
            borderTop: '1px solid #E8E4DF',
            paddingTop: '2rem',
            marginTop: '3rem',
          }}
        >
          <p style={{ color: '#6B6560', fontSize: '0.75rem', letterSpacing: '0.02em' }}>
            Informational content only — not medical advice
          </p>
        </footer>
      </article>
    </main>
  );
}
