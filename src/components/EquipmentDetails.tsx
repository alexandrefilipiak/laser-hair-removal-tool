/**
 * Equipment details component
 *
 * Full layout for displaying machine information including
 * classification badge, specifications, rich content, and disclaimer.
 */

import Link from 'next/link';
import type { MachineEntry } from '@/lib/equipment';
import { getRelatedByManufacturer } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { BrandTierBadge } from './BrandTierBadge';
import { Disclaimer } from './Disclaimer';

/**
 * Expand cooling method abbreviations for clarity
 */
function formatCoolingMethod(method: string | null): string {
  if (!method) return 'Not specified';

  const expansions: Record<string, string> = {
    'DCD': 'DCD (Dynamic Cooling Device)',
    'dcd': 'DCD (Dynamic Cooling Device)',
  };

  const expanded = expansions[method];
  if (expanded) return expanded;

  // Capitalize first letter for other methods
  return method.charAt(0).toUpperCase() + method.slice(1);
}

/**
 * Split text into sentences for bullet list display
 */
function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

interface EquipmentDetailsProps {
  equipment: MachineEntry;
}

/**
 * Full machine detail layout
 */
export function EquipmentDetails({ equipment }: EquipmentDetailsProps) {
  const {
    slug,
    name,
    manufacturer,
    technologyType,
    wavelengths,
    brandTier,
    skinTypes,
    purposeBuilt,
    coolingMethod,
    notes,
    richContent,
  } = equipment;

  // Get related machines from the same manufacturer
  const relatedMachines = getRelatedByManufacturer(manufacturer, slug, 3);

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
        <nav className="mb-8">
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
        <div className="mb-6 flex justify-center">
          <ClassificationBadge technologyType={technologyType} isRealLaser={null} />
        </div>

        {/* Machine Name and Manufacturer */}
        <header className="mb-4 text-center">
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
          <p
            className="mt-2"
            style={{
              color: '#6B6560',
              fontSize: '0.875rem',
              letterSpacing: '0.02em',
            }}
          >
            {manufacturer}
          </p>
        </header>

        {/* Disclaimer - subtle inline notice */}
        <div className="flex justify-center" style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>
          <Disclaimer />
        </div>

        {/* Info Grid */}
        <dl className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {/* Brand Tier */}
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E4DF',
            }}
          >
            <dt
              style={{
                color: '#6B6560',
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Brand Tier
            </dt>
            <dd className="mt-2">
              <BrandTierBadge tier={brandTier} />
            </dd>
          </div>

          {/* Purpose */}
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E4DF',
            }}
          >
            <dt
              style={{
                color: '#6B6560',
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Purpose
            </dt>
            <dd className="mt-2 text-sm" style={{ color: '#2D2D2D' }}>
              {purposeBuilt ? 'Purpose-built for hair removal' : 'Multi-purpose platform'}
            </dd>
          </div>

          {/* Technology */}
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E4DF',
            }}
          >
            <dt
              style={{
                color: '#6B6560',
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Technology
            </dt>
            <dd className="mt-2 text-sm" style={{ color: '#5E8B7E', fontWeight: 500 }}>
              {technologyType.charAt(0).toUpperCase() + technologyType.slice(1)}
            </dd>
          </div>

          {/* Wavelengths */}
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E4DF',
            }}
          >
            <dt
              style={{
                color: '#6B6560',
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Wavelengths
            </dt>
            <dd
              className="mt-2 text-sm"
              style={{
                color: '#2D2D2D',
              }}
            >
              {wavelengths.length > 0 ? wavelengths.join(' · ') : 'Not specified'}
            </dd>
          </div>

          {/* Skin Types */}
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E4DF',
            }}
          >
            <dt
              style={{
                color: '#6B6560',
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Skin Types
            </dt>
            <dd className="mt-2 text-sm" style={{ color: '#2D2D2D' }}>
              {skinTypes.displayText}
            </dd>
          </div>

          {/* Cooling */}
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E4DF',
            }}
          >
            <dt
              style={{
                color: '#6B6560',
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Cooling
            </dt>
            <dd className="mt-2 text-sm" style={{ color: '#2D2D2D' }}>
              {formatCoolingMethod(coolingMethod)}
            </dd>
          </div>
        </dl>

        {/* Notes section */}
        {notes && (
          <section
            className="mt-6 rounded-xl p-4"
            style={{
              backgroundColor: 'rgba(94, 139, 126, 0.06)',
              border: '1px solid rgba(94, 139, 126, 0.15)',
            }}
          >
            <h2
              style={{
                color: '#5E8B7E',
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}
            >
              Notes
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#6B6560' }}>
              {notes}
            </p>
          </section>
        )}

        {/* Rich Content - at bottom for SEO */}
        {richContent && (
          <section className="mt-12">
            {/* Divider */}
            <div
              style={{
                height: '1px',
                backgroundColor: '#E8E4DF',
                marginBottom: '2.5rem',
              }}
            />

            {/* Overview */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                  color: '#2D2D2D',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                }}
              >
                Overview
              </h2>
              <p className="leading-relaxed" style={{ color: '#6B6560' }}>
                {richContent.overview}
              </p>
            </div>

            {/* How It Works */}
            <div className="mt-8">
              <h2
                style={{
                  fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                  color: '#2D2D2D',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                }}
              >
                How It Works
              </h2>
              <p className="leading-relaxed" style={{ color: '#6B6560' }}>
                {richContent.howItWorks}
              </p>
            </div>

            {/* Typical Uses */}
            <div className="mt-8">
              <h2
                style={{
                  fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                  color: '#2D2D2D',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                }}
              >
                Typical Uses
              </h2>
              <ul style={{ color: '#6B6560', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                {splitIntoSentences(richContent.typicalUses).map((sentence, index) => (
                  <li
                    key={index}
                    className="leading-relaxed"
                    style={{ marginBottom: '0.5rem', paddingLeft: '0.25rem' }}
                  >
                    {sentence}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Features */}
            <div className="mt-8">
              <h2
                style={{
                  fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                  color: '#2D2D2D',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                }}
              >
                Key Features
              </h2>
              <p className="leading-relaxed" style={{ color: '#6B6560' }}>
                {richContent.keyFeatures}
              </p>
            </div>
          </section>
        )}

        {/* Related Machines */}
        {relatedMachines.length > 0 && (
          <section className="mt-12">
            <div
              style={{
                height: '1px',
                backgroundColor: '#E8E4DF',
                marginBottom: '2rem',
              }}
            />
            <h2
              style={{
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                color: '#2D2D2D',
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              More from {manufacturer}
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedMachines.map((machine) => (
                <Link
                  key={machine.slug}
                  href={`/is-it-a-real-laser/${machine.slug}`}
                  className="inline-flex items-center gap-2 transition-all hover:border-[#5E8B7E]"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8E4DF',
                    borderRadius: '9999px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    color: '#2D2D2D',
                    textDecoration: 'none',
                  }}
                >
                  <span>{machine.name}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6B6560"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer
          className="text-center"
          style={{
            borderTop: '1px solid #E8E4DF',
            paddingTop: '2rem',
            marginTop: '3rem',
            paddingBottom: '1rem',
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
