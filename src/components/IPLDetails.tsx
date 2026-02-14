/**
 * Custom IPL (Intense Pulsed Light) details page
 *
 * This is a special page designed to be the definitive "is IPL a laser" resource.
 * It has a custom structure different from other technology term pages.
 */

import Link from 'next/link';
import type { TechnologyTermEntry } from '@/lib/equipment';
import { getTermBadgeType } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { Disclaimer } from './Disclaimer';
import { Footer } from './Footer';
import { SearchBar } from './SearchBar';
import equipmentData from '@/data/equipment.json';
import type { EquipmentEntry } from '@/lib/equipment';

const equipment = equipmentData as EquipmentEntry[];

interface IPLDetailsProps {
  term: TechnologyTermEntry;
}

/** Branded IPL technologies with links */
const brandedIPL = [
  { name: 'BBL (BroadBand Light)', slug: 'bbl', description: "Sciton's premium IPL system" },
  { name: 'AFT (Advanced Fluorescence Technology)', slug: 'aft', description: "Alma's enhanced IPL" },
  { name: 'E-Light', slug: 'e-light', description: 'IPL combined with radiofrequency energy' },
  { name: 'OPT (Optimal Pulse Technology)', slug: 'opt', description: 'A pulse delivery method used in IPL machines' },
  { name: 'DPL (Dynamic Pulse Light)', slug: 'dpl', description: 'Another marketing name for IPL' },
];

/**
 * Custom IPL detail page layout
 */
export function IPLDetails({ term }: IPLDetailsProps) {
  const { name, whatItIs, askYourClinic } = term;

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

        {/* What It Is - keep from original */}
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
            Quick Answer
          </h2>
          <p className="leading-relaxed" style={{ color: '#2D2D2D', fontSize: '1.0625rem', lineHeight: 1.7 }}>
            IPL is not a laser. Many clinics call it "laser hair removal," but IPL is a completely different technology. 
            It uses broad-spectrum light. Think of a flashlight shining many wavelengths at once. 
            A real laser focuses a single wavelength directly into the hair follicle.
          </p>
        </section>


        {/* Section 2: How IPL Differs from Laser - prose format */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            How IPL Differs from Laser
          </h2>

          {/* Diagram */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <img
              src="/ipl-vs-laser.png"
              alt="Diagram comparing IPL broad spectrum light versus real laser single wavelength for hair removal"
              style={{
                width: '100%',
                maxWidth: '420px',
                height: 'auto',
                borderRadius: '0.75rem',
              }}
            />
          </div>

          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1rem' }}>
            IPL emits multiple wavelengths (typically 500–1200nm) at once in a broad flash. The energy scatters across the skin rather than focusing on the follicle.
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8 }}>
            A real laser concentrates a single wavelength (e.g. 755nm or 810nm) into one beam that penetrates directly to the hair follicle. The energy is precise and consistent.
          </p>




        </section>

        {/* Section 3: Why This Matters for Hair Removal - prose format */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Why This Matters for Hair Removal
          </h2>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1rem' }}>
            The difference isn't just technical. It affects your results. IPL typically
            requires 8–12+ sessions compared to 6–8 for laser. Because IPL energy disperses,
            some follicles receive insufficient energy and survive.
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1rem' }}>
            Laser wavelengths can be selected specifically for your skin type (755nm for lighter
            skin, 1064nm for darker skin). IPL's broad spectrum makes it riskier for darker skin
            tones. The scattered light can be absorbed by skin pigment rather than hair pigment.
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8 }}>
            Laser delivers more consistent long-term hair reduction. IPL often requires ongoing
            maintenance sessions.
          </p>
        </section>

        {/* Section 4: Branded IPL You Might Not Recognize */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Branded IPL You Might Not Recognize
          </h2>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            These are all IPL technology, despite their marketing names:
          </p>

          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            style={{ marginBottom: '1.25rem' }}
          >
            {brandedIPL.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/is-it-a-real-laser/${item.slug}`}
                  className="block rounded-xl transition-all hover:border-[#5E8B7E]"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8E4DF',
                    padding: '0.875rem 1rem',
                    textDecoration: 'none',
                    height: '100%',
                  }}
                >
                  <span style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.875rem', display: 'block' }}>
                    {item.name}
                  </span>
                  <span style={{ color: '#6B6560', fontSize: '0.8125rem' }}>{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>

          <p
            className="rounded-xl"
            style={{
              backgroundColor: 'rgba(196, 107, 92, 0.08)',
              border: '1px solid rgba(196, 107, 92, 0.15)',
              padding: '1rem 1.25rem',
              color: '#C46B5C',
              fontWeight: 500,
              lineHeight: 1.6,
              fontSize: '0.9375rem',
            }}
          >
            If your clinic uses any of these, you are receiving IPL treatment — not laser.
          </p>
        </section>

        {/* Section 5: Is IPL Bad? */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Should You Avoid IPL?
          </h2>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7, marginBottom: '1rem' }}>
            No. IPL is a legitimate light-based technology with real uses. It can reduce hair growth,
            and premium IPL devices like Sciton BBL are well-engineered machines.
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7, marginBottom: '1rem' }}>
            But IPL is not a laser, and should not be marketed as one. The issue isn't that IPL
            exists. It's that consumers deserve to know what technology is being used on their skin.
          </p>
          <p
            className="leading-relaxed"
            style={{
              color: '#2D2D2D',
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            If your clinic offers IPL and is transparent about it, that's fine. If they call it
            "laser hair removal", that's misleading.
          </p>
        </section>

        {/* Section 6: What to Ask Your Clinic (Ask Your Clinic section) */}
        {askYourClinic && (
          <section
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
              What to Ask Your Clinic
            </h2>
            <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7, marginBottom: '1rem' }}>
              If you're unsure what your clinic uses, ask these two questions:
            </p>
            <ol
              style={{
                color: '#2D2D2D',
                paddingLeft: '1.5rem',
                listStyleType: 'decimal',
                marginBottom: '1.25rem',
              }}
            >
              <li style={{ marginBottom: '0.5rem', lineHeight: 1.6, fontWeight: 500 }}>
                "Do you use a laser or an IPL device?"
              </li>
              <li style={{ lineHeight: 1.6, fontWeight: 500 }}>
                "What is the specific brand and model?"
              </li>
            </ol>
            <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7 }}>
              Then search for that device here:
            </p>
            <div style={{ marginTop: '1rem' }}>
              <SearchBar equipment={equipment} />
            </div>
          </section>
        )}

        <Footer />
      </article>
    </main>
  );
}
