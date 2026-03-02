/**
 * Technology term details component
 *
 * Layout for displaying technology term information including
 * classification, explanation, and guidance.
 */

import Link from 'next/link';
import type { TechnologyTermEntry } from '@/lib/equipment';
import { getTermBadgeType } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { BackNavigation } from './BackNavigation';
import { AlertBox } from './AlertBox';
import { Disclaimer } from './Disclaimer';
import { Footer } from './Footer';
import { colors, typography } from '@/lib/theme';

interface TechnologyTermDetailsProps {
  term: TechnologyTermEntry;
}

/**
 * Full technology term detail layout
 */
export function TechnologyTermDetails({ term }: TechnologyTermDetailsProps) {
  const { name, whatItIs, whyItMatters, askYourClinic } = term;

  return (
    <main
      style={{
        backgroundColor: colors.background.page,
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <article className="mx-auto max-w-2xl px-4 py-8 md:py-12" style={{ position: 'relative', zIndex: 1 }}>
        {/* Back to search link */}
        <BackNavigation href="/equipment-verification-tool" label="Back to Search" />

        {/* Classification Badge - prominent, centered */}
        <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
          <ClassificationBadge badgeType={getTermBadgeType(term)} />
        </div>

        {/* Term Name */}
        <header className="text-center" style={{ marginBottom: '1.25rem' }}>
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
            backgroundColor: colors.background.card,
            border: `1px solid ${colors.border.default}`,
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              color: colors.primary,
              fontSize: typography.fontSize.xs,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: typography.letterSpacing.wider,
              marginBottom: '1rem',
            }}
          >
            What It Is
          </h2>
          <p
            className="leading-relaxed"
            style={{
              color: colors.text.primary,
              fontSize: typography.fontSize.lg,
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            {whatItIs}
          </p>
        </section>

        {/* Why It Matters */}
        <section style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontFamily: typography.fontFamily.heading,
              color: colors.text.primary,
              fontSize: typography.fontSize.xl,
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Why It Matters
          </h2>
          <p
            className="leading-relaxed"
            style={{ color: colors.text.secondary, lineHeight: typography.lineHeight.relaxed }}
          >
            {whyItMatters}
          </p>
        </section>

        {/* Ask Your Clinic - highlight box if present */}
        {askYourClinic && (
          <section style={{ marginBottom: '2rem' }}>
            <AlertBox variant="info" title="Ask Your Clinic">
              <p>{askYourClinic}</p>
            </AlertBox>
          </section>
        )}

        <Footer />
      </article>
    </main>
  );
}
