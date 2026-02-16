/**
 * Custom Tri-Wavelength Laser details page
 *
 * A personalized page for the tri-wavelength entry with
 * educational content about 755nm + 808nm + 1064nm combo systems,
 * red flags around budget imports, and quality variations.
 */

import Link from 'next/link';
import type { TechnologyTermEntry, EquipmentEntry } from '@/lib/equipment';
import { getTermBadgeType, isMachine } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { Disclaimer } from './Disclaimer';
import { Footer } from './Footer';
import equipmentData from '@/data/equipment.json';

const equipment = equipmentData as EquipmentEntry[];

// Get clinical grade machines that use all three wavelengths (755nm, 808nm/810nm, and 1064nm)
const triWavelengthMachines = equipment
  .filter(isMachine)
  .filter((m) => {
    const has755 = m.wavelengths.includes('755nm');
    const has808or810 = m.wavelengths.includes('808nm') || m.wavelengths.includes('810nm');
    const has1064 = m.wavelengths.includes('1064nm');
    return has755 && has808or810 && has1064;
  })
  .filter((m) => m.brandTier !== 'consumer') // Exclude home devices
  .sort((a, b) => {
    // Premium-clinical (gold standard) first
    if (a.brandTier === 'premium-clinical' && b.brandTier !== 'premium-clinical') return -1;
    if (b.brandTier === 'premium-clinical' && a.brandTier !== 'premium-clinical') return 1;
    return 0;
  })
  .slice(0, 10); // Limit to 10 machines

interface TriWavelengthLaserDetailsProps {
  term: TechnologyTermEntry;
}

/**
 * Custom Tri-Wavelength Laser page layout
 */
export function TriWavelengthLaserDetails({ term }: TriWavelengthLaserDetailsProps) {
  const { name } = term;

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
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#2D2D2D',
              lineHeight: 1.15,
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
            gap: '0.5rem 1rem',
            marginBottom: '2.5rem',
            fontSize: '0.8125rem',
          }}
        >
          <a href="#what-it-is" style={{ color: '#5E8B7E', textDecoration: 'none' }} className="hover:underline">What It Is</a>
          <span style={{ color: '#E8E4DF' }}>·</span>
          <a href="#the-brand-matters" style={{ color: '#5E8B7E', textDecoration: 'none' }} className="hover:underline">The Brand Matters</a>
          <span style={{ color: '#E8E4DF' }}>·</span>
          <a href="#the-red-flag" style={{ color: '#5E8B7E', textDecoration: 'none' }} className="hover:underline">The Red Flag</a>
          <span style={{ color: '#E8E4DF' }}>·</span>
          <a href="#ask-your-clinic" style={{ color: '#5E8B7E', textDecoration: 'none' }} className="hover:underline">Ask Your Clinic</a>
          <span style={{ color: '#E8E4DF' }}>·</span>
          <a href="#examples" style={{ color: '#5E8B7E', textDecoration: 'none' }} className="hover:underline">Examples</a>
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
          <p className="leading-relaxed" style={{ color: '#2D2D2D', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Tri-wavelength systems combine three laser wavelengths in a single device: 755nm Alexandrite, 808nm Diode, and 1064nm Nd:YAG.
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            The 755nm Alexandrite wavelength targets melanin strongly and is most effective for lighter skin tones (Fitzpatrick I-IV). The 808nm Diode wavelength offers deep penetration and works well across a wide range of skin tones (Fitzpatrick I-V). The 1064nm Nd:YAG wavelength penetrates deepest with the least melanin absorption, making it the safest option for darker skin tones (Fitzpatrick V-VI).
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', fontSize: '1rem', lineHeight: 1.7 }}>
            Together, the three wavelengths allow practitioners to treat virtually any patient, any hair type, and any body area with a single machine, adjusting wavelength selection based on the individual's skin tone and hair characteristics.
          </p>
        </section>

        {/* The Brand Matters */}
        <section id="the-brand-matters" style={{ marginBottom: '2rem' }}>
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
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1rem' }}>
            Tri-wavelength is a technology description, not a quality guarantee. The machines that deliver those three wavelengths range from $850 to over $90,000. The difference is everything the patient can't see.
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1rem' }}>
            An Alma Soprano Titanium costs $50,000-$90,000. An InMode Triton runs $50,000-$80,000. These machines feature advanced cooling systems, consistent power output across full treatment sessions, and come with manufacturer training, calibration, and service contracts.
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8 }}>
            Budget tri-wavelength machines from Alibaba start at $850. They advertise the same three wavelengths, but the quality of the laser source, power consistency, cooling system, and calibration are fundamentally different. Same wavelengths, vastly different results.
          </p>
        </section>

        {/* The Red Flag */}
        <section id="the-red-flag" style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            The Red Flag
          </h2>

          <div
            className="rounded-xl"
            style={{
              backgroundColor: 'rgba(196, 158, 92, 0.08)',
              border: '1px solid rgba(196, 158, 92, 0.2)',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <p className="leading-relaxed" style={{ color: '#2D2D2D', lineHeight: 1.8 }}>
              <strong>Tri-wavelength is the most common claim on budget imports.</strong> Because "triple wavelength" sounds advanced, it's the go-to marketing term for machines that cost less than a month's rent. Many of these manufacturers offer white-labeling (custom logos, custom software, custom packaging) so your clinic's machine brand may not exist outside that one treatment room.
            </p>
          </div>

          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1rem' }}>
            A Candela GentleMax Pro costs $80,000-$150,000 and only offers two wavelengths. When a machine costing less than 1% of that price claims to do more, the question isn't about wavelength count: it's about what's behind the spec sheet.
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8 }}>
            <Link
              href="/is-it-a-real-laser/equipment-costs"
              style={{ color: '#5E8B7E', fontWeight: 500, textDecoration: 'underline' }}
            >
              Read the full investigation: The $3,000 Machine vs the $100,000 Machine →
            </Link>
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
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7, marginBottom: '1rem' }}>
            If your clinic says they use a "tri-wavelength," "triple wavelength," or "755 + 808 + 1064nm" laser, ask for the specific brand and model. Reputable clinics using premium equipment are typically proud to share this information. Names like Soprano Titanium and Triton are good signs.
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7, marginBottom: '1rem' }}>
            If they name a brand you can't find anywhere online, that may be a white-labeled device: a generic machine with a custom logo.
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7 }}>
            <Link
              href="/is-it-a-real-laser"
              style={{ color: '#5E8B7E', fontWeight: 500, textDecoration: 'underline' }}
            >
              Check how it's rated in our equipment database →
            </Link>
          </p>
        </section>

        {/* Examples Of Clinical Grade Machines Using Tri-Wavelength */}
        {triWavelengthMachines.length > 0 && (
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
              Examples Of Clinical Grade Machines Using Tri-Wavelength
            </h2>
            <div className="flex flex-wrap gap-2">
              {triWavelengthMachines.map((machine) => (
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

        <Footer />
      </article>
    </main>
  );
}
