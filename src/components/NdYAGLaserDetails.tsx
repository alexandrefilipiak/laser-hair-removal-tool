/**
 * Custom 1064nm Nd:YAG Laser details page
 *
 * A personalized page for the 1064nm wavelength entry with
 * educational content about Nd:YAG lasers and quality variations.
 */

import Link from 'next/link';
import type { TechnologyTermEntry, EquipmentEntry } from '@/lib/equipment';
import { getTermBadgeType, isMachine } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { Disclaimer } from './Disclaimer';
import { Footer } from './Footer';
import equipmentData from '@/data/equipment.json';

const equipment = equipmentData as EquipmentEntry[];

// Get clinical grade machines that use 1064nm wavelength, sorted by brand tier (gold standard first)
const machines1064nm = equipment
  .filter(isMachine)
  .filter((m) => m.wavelengths.includes('1064nm'))
  .filter((m) => m.brandTier !== 'consumer') // Exclude home devices
  .sort((a, b) => {
    // Premium-clinical (gold standard) first
    if (a.brandTier === 'premium-clinical' && b.brandTier !== 'premium-clinical') return -1;
    if (b.brandTier === 'premium-clinical' && a.brandTier !== 'premium-clinical') return 1;
    return 0;
  })
  .slice(0, 8); // Limit to 8 machines

interface NdYAGLaserDetailsProps {
  term: TechnologyTermEntry;
}

/**
 * Custom 1064nm Nd:YAG Laser page layout
 */
export function NdYAGLaserDetails({ term }: NdYAGLaserDetailsProps) {
  const { name, whatItIs } = term;

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
            <span style={{ letterSpacing: '0.02em' }}>Back to Search</span>
          </Link>
        </nav>

        {/* Classification Badge - prominent, centered */}
        <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
          <ClassificationBadge badgeType={getTermBadgeType(term)} />
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
        <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
          <Disclaimer />
        </div>

        {/* Table of Contents */}
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
          <a href="#what-it-is" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">What It Is</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#the-brand-matters" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">The Brand Matters</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#ask-your-clinic" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Ask Your Clinic</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#examples" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Examples</a>
        </nav>

        {/* What It Is */}
        <section
          id="what-it-is"
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

        {/* The Brand Matters */}
        <section id="the-brand-matters" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            The Brand Matters
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            Not all 1064nm Nd:YAG lasers are equal. Premium devices like the Candela GentleYAG cost
            $60,000+. Budget alternatives from Chinese manufacturers start at $2,500, often as
            multi-wavelength combo machines that bundle 755nm, 808nm, and 1064nm into one device
            for under $5,000.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            If your clinic claims to treat all skin types with a single device at significantly
            below-market pricing, it's worth asking about the specific brand and model.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
            This matters especially for 1064nm. Patients with darker skin tones specifically seek
            Nd:YAG because it's the safest wavelength for their skin type. A poorly calibrated
            device increases the risk of burns and the consequences are more visible and more
            serious on darker skin.
          </p>
        </section>

        {/* Ask Your Clinic */}
        <section
          id="ask-your-clinic"
          className="rounded-xl"
          style={{
            backgroundColor: 'rgba(94, 139, 126, 0.06)',
            border: '1px solid rgba(94, 139, 126, 0.15)',
            padding: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <h2
            className="flex items-center gap-2"
            style={{
              color: '#5E8B7E',
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '1rem',
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
          <p
            className="leading-relaxed"
            style={{
              color: '#2D2D2D',
              lineHeight: 1.7,
              fontWeight: 500,
              fontStyle: 'italic',
              marginBottom: '1rem',
            }}
          >
            "What brand and model of Nd:YAG laser do you use?"
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.7 }}>
            Once you have the answer,{' '}
            <Link
              href="/is-it-a-real-laser"
              style={{ color: '#5E8B7E', fontWeight: 500, textDecoration: 'underline' }}
            >
              check how it's rated in our equipment database →
            </Link>
          </p>
        </section>

        {/* Examples Of Clinical Grade Machines Using This Wavelength */}
        {machines1064nm.length > 0 && (
          <section id="examples" style={{ marginBottom: '2.5rem' }}>
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
              Examples Of Clinical Grade Machines Using This Wavelength
            </h2>
            <div className="flex flex-wrap gap-2">
              {machines1064nm.map((machine) => (
                <Link
                  key={machine.slug}
                  href={`/is-it-a-real-laser/${machine.slug}`}
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
