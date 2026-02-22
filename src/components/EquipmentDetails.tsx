/**
 * Equipment details component
 *
 * Full layout for displaying machine information including
 * classification badge, specifications, rich content, and disclaimer.
 */

import Link from 'next/link';
import type { MachineEntry } from '@/lib/equipment';
import { getRelatedByManufacturer, getMachineBadgeType } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { BrandTierBadge } from './BrandTierBadge';
import { Disclaimer } from './Disclaimer';
import { Footer } from './Footer';

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
 * Get laser class based on brand tier
 */
function getLaserClass(brandTier: string): string {
  if (brandTier === 'consumer') return 'Class 1 Consumer';
  return 'Class IV Medical';
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
            href="/equipment-verification-tool"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#5E8B7E]"
            style={{ color: '#5A5550' }}
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
          <ClassificationBadge badgeType={getMachineBadgeType(equipment)} />
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
              color: '#5A5550',
              fontSize: '0.9375rem',
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
                color: '#5A5550',
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
                color: '#5A5550',
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Purpose
            </dt>
            <dd className="mt-2 text-sm" style={{ color: '#2D2D2D', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span>{purposeBuilt ? 'Purpose-built for hair removal' : 'Multi-purpose platform'}</span>
              {brandTier !== 'consumer' && (
                <Link
                  href="/equipment-verification-tool/purpose-built-vs-multi-purpose"
                  title="Learn about purpose-built vs multi-purpose lasers"
                  style={{ color: '#5A5550', display: 'inline-flex' }}
                  className="hover:text-[#5E8B7E] transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </Link>
              )}
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
                color: '#5A5550',
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Technology
            </dt>
            <dd className="mt-2 text-sm" style={{ color: '#5E8B7E', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span>
                {technologyType === 'laser'
                  ? `Laser · ${getLaserClass(brandTier)}`
                  : technologyType.charAt(0).toUpperCase() + technologyType.slice(1)}
              </span>
              {brandTier === 'consumer' && (
                <Link
                  href="/equipment-verification-tool/home-laser-vs-clinical-laser"
                  title="Learn about home lasers vs clinical lasers"
                  style={{ color: '#5A5550', display: 'inline-flex' }}
                  className="hover:text-[#5E8B7E] transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </Link>
              )}
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
                color: '#5A5550',
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
                color: '#5A5550',
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
                color: '#5A5550',
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
            <p className="text-sm leading-relaxed" style={{ color: '#5A5550' }}>
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
              <p className="leading-relaxed" style={{ color: '#5A5550' }}>
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
              <p className="leading-relaxed" style={{ color: '#5A5550' }}>
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
              <ul style={{ color: '#5A5550', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                {richContent.typicalUses.map((use, index) => (
                  <li
                    key={index}
                    className="leading-relaxed"
                    style={{ marginBottom: '0.5rem', paddingLeft: '0.25rem' }}
                  >
                    {use}
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
              <p className="leading-relaxed" style={{ color: '#5A5550' }}>
                {richContent.keyFeatures}
              </p>
            </div>
          </section>
        )}

        {/* Related Machines */}
        {relatedMachines.length > 0 && (
          <section style={{ marginTop: '3rem' }}>
            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: '#E8E4DF',
                marginBottom: '1.5rem',
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
                  href={`/equipment-verification-tool/${machine.slug}`}
                  className="inline-flex items-center gap-2 transition-all hover:border-[#5E8B7E]"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8E4DF',
                    borderRadius: '9999px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.9375rem',
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
                    stroke="#5A5550"
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

        <Footer />
      </article>
    </main>
  );
}
