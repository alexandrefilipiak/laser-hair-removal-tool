/**
 * Home Lasers vs Clinical Lasers Guide page
 *
 * Comprehensive comparison of home laser hair removal devices
 * vs professional clinical lasers, covering DermRays, Epilaser,
 * CurrentBody, and Tria against clinical devices.
 *
 * Updated February 2026 with full competitive landscape.
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import { Disclaimer } from '@/components/Disclaimer';
import { Footer } from '@/components/Footer';
import { ShareButtons } from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Home Lasers vs Clinical Lasers | LaserHairRemovalMap',
  description:
    'Home laser devices use the same wavelengths as clinical lasers but deliver 3-10x less fluence. We compared every FDA-cleared home laser to clinical devices. Here is what the power gap means for your results.',
  openGraph: {
    title: 'Home Lasers vs Clinical Lasers | LaserHairRemovalMap',
    description:
      'Home laser devices use the same wavelengths as clinical lasers but deliver 3-10x less fluence. We compared every FDA-cleared home laser to clinical devices. Here is what the power gap means for your results.',
  },
};

export default function HomeVsClinicalLasersPage() {
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

        {/* Equipment Guide Badge */}
        <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5"
            style={{
              backgroundColor: 'rgba(196, 158, 92, 0.12)',
              border: '1px solid rgba(196, 158, 92, 0.3)',
              color: '#B8860B',
              fontSize: '0.8125rem',
              fontWeight: 500,
            }}
          >
            Equipment Guide
          </span>
        </div>

        {/* Title */}
        <header className="text-center" style={{ marginBottom: '1rem' }}>
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
            Home Lasers vs Clinical Lasers
          </h1>
          <p
            style={{
              marginTop: '0.75rem',
              color: '#5A5550',
              fontSize: '1.0625rem',
            }}
          >
            Real lasers, real gap
          </p>
        </header>

        {/* Disclaimer */}
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
          <a href="#they-are-real-lasers" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">They&apos;re Real Lasers</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>&middot;</span>
          <a href="#the-power-gap" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">The Power Gap</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>&middot;</span>
          <a href="#what-about-epilaser" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">The Epilaser</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>&middot;</span>
          <a href="#why-the-gap-exists" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Why the Gap Exists</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>&middot;</span>
          <a href="#what-it-means" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">What It Means</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>&middot;</span>
          <a href="#how-we-classify" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">How We Classify</a>
        </nav>

        {/* Opening section */}
        <section
          id="they-are-real-lasers"
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
              color: '#B8860B',
              fontSize: '0.7rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            Yes, They&apos;re Real Lasers
          </h2>
          <p className="leading-relaxed" style={{ color: '#2D2D2D', fontSize: '1.0625rem', lineHeight: 1.7 }}>
            The home devices you can buy on Amazon from brands like DermRays, CurrentBody, and Epilaser are real diode lasers, not IPL. They use the same 808 to 810nm wavelength found in professional clinical devices like the Lumenis LightSheer and Cynosure Vectus.
          </p>
          <p className="leading-relaxed" style={{ color: '#2D2D2D', fontSize: '1.0625rem', lineHeight: 1.7, marginTop: '1rem' }}>
            The difference isn&apos;t whether they work. It&apos;s how much power they deliver, and the gap is larger than most people realize.
          </p>
        </section>

        {/* Home vs clinical comparison image */}
        <figure style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <a
            href="/laser-hair-removal-home-vs-clinical.png"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full md:w-[50%]"
          >
            <img
              src="/laser-hair-removal-home-vs-clinical.png"
              alt="Home laser device next to a clinical laser system. Both use real laser technology, but the clinical device delivers dramatically more energy per pulse across a much larger treatment area."
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '0.75rem',
                cursor: 'pointer',
              }}
            />
          </a>
          <figcaption
            style={{
              marginTop: '0.75rem',
              fontSize: '0.8125rem',
              color: '#5A5550',
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: '90%',
            }}
          >
            A home diode laser you can buy for $400-$999 vs. a clinical laser costing $80,000-$150,000. Both use real laser technology. The difference is power: clinical devices deliver enough energy to permanently damage a hair follicle in a single pulse.
          </figcaption>
        </figure>

        {/* The Power Gap */}
        <section id="the-power-gap" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            The Power Gap
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            The DermRays V8S is the most powerful home laser by total energy output: an 810nm diode laser with up to 9 J/cm&sup2; fluence and 27 joules per pulse across a 3 cm&sup2; treatment window. It&apos;s FDA-cleared (510(k) K230090) and available on Amazon for around $599.
          </p>

          {/* Power comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: '1.5rem' }}>
            {/* DermRays V8S card */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: 'rgba(196, 158, 92, 0.08)',
                border: '1px solid rgba(196, 158, 92, 0.2)',
              }}
            >
              <div style={{ color: '#B8860B', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                DermRays V8S
              </div>
              <div style={{ color: '#5A5550', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Most powerful home laser &middot; ~$599</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Fluence</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Up to 9 J/cm&sup2;</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Energy per pulse</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>27 joules</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Spot area</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>3 cm&sup2;</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Repetition rate</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Single shot</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Classification</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Class II</span>
                </div>
              </div>
            </div>

            {/* GentleMax Pro card */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: 'rgba(94, 139, 126, 0.06)',
                border: '1px solid rgba(94, 139, 126, 0.15)',
              }}
            >
              <div style={{ color: '#5E8B7E', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Candela GentleMax Pro
              </div>
              <div style={{ color: '#5A5550', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Clinical laser &middot; $80,000-$150,000</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Fluence</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Up to 100+ J/cm&sup2;</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Energy per pulse</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Up to 80 joules</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Spot area</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Up to 4.5 cm&sup2;</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Repetition rate</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>2-3 pulses/sec</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Classification</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Class IV medical</span>
                </div>
              </div>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            In fluence (the energy concentration your skin actually experiences), the clinical device delivers 3 to 11 times more depending on the spot size and settings the practitioner selects. In total energy per pulse, the clinical device delivers about 3 times more across a similar spot area.
          </p>

          {/* Two metrics callout */}
          <div
            className="rounded-xl"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E4DF',
              padding: '1.5rem',
            }}
          >
            <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
              <strong style={{ color: '#2D2D2D' }}>What matters is energy concentration at the skin, not total energy output.</strong> A home device spreads its energy across a wider area at lower intensity. A clinical device concentrates enough energy at each point to permanently destroy the follicle. That threshold is what separates the two.
            </p>
          </div>
        </section>

        {/* What about the Epilaser */}
        <section id="what-about-epilaser" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            What About the Epilaser?
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            The Epilaser Pro by Epilady (the company that invented the mechanical epilator in 1986) takes a fundamentally different approach. Instead of flooding the skin surface with light, a camera identifies individual follicles and four diode lasers target them one at a time.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            It claims 24 J/cm&sup2; at each follicle, approaching clinical fluence levels. The technology is legitimate and has three generations of FDA clearance ({''}
            <a href="https://www.accessdata.fda.gov/cdrh_docs/pdf17/K170970.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#5E8B7E' }} className="hover:underline">2017</a>,{' '}
            <a href="https://www.accessdata.fda.gov/cdrh_docs/pdf21/K213105.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#5E8B7E' }} className="hover:underline">2022</a>,{' '}
            <a href="https://www.accessdata.fda.gov/cdrh_docs/pdf23/K233224.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#5E8B7E' }} className="hover:underline">2024</a>).
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            However, all performance data (70% reduction in 3 months) comes from the manufacturer only. There are no independent clinical studies as of early 2026. We classify it as &ldquo;Limited Results&rdquo; until independent data is available.
          </p>
        </section>

        {/* Why the Gap Exists */}
        <section id="why-the-gap-exists" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Why the Gap Exists
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            The power gap isn&apos;t a design flaw. It&apos;s a legal requirement.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            Professional lasers are Class IV medical devices: they can cause immediate tissue damage and require trained operators, protective eyewear, and controlled clinical environments. A clinic also needs dedicated 220V electrical service and often a water cooling system just to run one.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            Home devices are classified for over-the-counter use. They must be safe enough for anyone to operate without training, in a bathroom, plugged into a regular outlet. That safety requirement caps their power output well below the threshold needed to permanently destroy a hair follicle in a single pulse.
          </p>

          {/* FDA callout */}
          <div
            className="rounded-xl"
            style={{
              backgroundColor: 'rgba(196, 158, 92, 0.08)',
              border: '1px solid rgba(196, 158, 92, 0.2)',
              padding: '1.5rem',
            }}
          >
            <p className="leading-relaxed" style={{ color: '#2D2D2D', lineHeight: 1.8 }}>
              <strong>FDA-cleared doesn&apos;t mean clinically equivalent.</strong> The FDA clearance on home devices confirms they are safe for unsupervised use. It does not mean they deliver the same results as the clinical lasers used by your provider.
            </p>
          </div>
        </section>

        {/* What It Means for Your Results */}
        <section id="what-it-means" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            What It Means for Your Results
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            Permanently destroying a hair follicle requires delivering enough thermal energy to its stem cells in a single pulse or rapid pulse sequence. Clinical lasers at 25-60+ J/cm&sup2; do this. Home devices at 7-9 J/cm&sup2; do not.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            This is why home devices can slow regrowth and thin hair with consistent long-term use (typically 2-3 sessions per week over months), but don&apos;t achieve the permanent hair reduction that clinical lasers provide in 6-8 sessions spaced 6-8 weeks apart.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            Home devices work best as maintenance between professional sessions, or for people who can&apos;t access or afford clinical treatment and accept slower, more limited results.
          </p>

          {/* Amazon callout */}
          <div
            className="rounded-xl"
            style={{
              backgroundColor: 'rgba(196, 158, 92, 0.08)',
              border: '1px solid rgba(196, 158, 92, 0.2)',
              padding: '1.5rem',
            }}
          >
            <p className="leading-relaxed" style={{ color: '#2D2D2D', lineHeight: 1.8 }}>
              <strong>If your clinic uses a device you can buy on Amazon, that&apos;s worth knowing.</strong>
            </p>
          </div>
        </section>

        {/* How We Classify */}
        <section id="how-we-classify" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            How We Classify Home Devices
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            We classify home devices separately in our{' '}
            <Link href="/is-it-a-real-laser" style={{ color: '#5E8B7E', fontWeight: 500 }} className="hover:underline">
              equipment database
            </Link>
            {' '}with a &ldquo;Limited Results&rdquo; badge. This doesn&apos;t mean they&apos;re bad products. It means they operate under fundamentally different power constraints than the clinical devices your provider uses, and comparing them directly would be misleading.
          </p>

          {/* Classification cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Clinical card */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: 'rgba(94, 139, 126, 0.06)',
                border: '1px solid rgba(94, 139, 126, 0.15)',
              }}
            >
              <div style={{ color: '#5E8B7E', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Clinical Lasers
              </div>
              <p style={{ color: '#5A5550', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Class IV medical devices. Require trained operators, controlled environments, and dedicated electrical service. Capable of permanent hair reduction in 6-8 sessions.
              </p>
              <p style={{ color: '#2D2D2D', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Examples:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {[
                  { href: '/is-it-a-real-laser/gentlemax-pro', label: 'GentleMax Pro' },
                  { href: '/is-it-a-real-laser/lightsheer', label: 'LightSheer' },
                  { href: '/is-it-a-real-laser/soprano-titanium', label: 'Soprano Titanium' },
                  { href: '/is-it-a-real-laser/vectus', label: 'Vectus' },
                ].map((device) => (
                  <Link
                    key={device.href}
                    href={device.href}
                    className="transition-all hover:border-[#5E8B7E]"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8E4DF',
                      borderRadius: '9999px',
                      padding: '0.375rem 0.75rem',
                      fontSize: '0.8125rem',
                      color: '#2D2D2D',
                      textDecoration: 'none',
                    }}
                  >
                    {device.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Home device card */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: 'rgba(196, 158, 92, 0.08)',
                border: '1px solid rgba(196, 158, 92, 0.2)',
              }}
            >
              <div style={{ color: '#B8860B', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Home Devices &middot; Limited Results
              </div>
              <p style={{ color: '#5A5550', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Class II home devices. Safe for unsupervised use. Effective for hair thinning and maintenance. Limited evidence for permanent hair reduction.
              </p>
              <p style={{ color: '#2D2D2D', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Examples:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {[
                  { href: '/is-it-a-real-laser/dermrays-v8s', label: 'DermRays V8S' },
                  { href: '/is-it-a-real-laser/currentbody-skin-laser', label: 'CurrentBody' },
                  { href: '/is-it-a-real-laser/epilaser-pro-808', label: 'Epilaser Pro' },
                  { href: '/is-it-a-real-laser/tria-4x', label: 'Tria 4X' },
                ].map((device) => (
                  <Link
                    key={device.href}
                    href={device.href}
                    className="transition-all hover:border-[#B8860B]"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8E4DF',
                      borderRadius: '9999px',
                      padding: '0.375rem 0.75rem',
                      fontSize: '0.8125rem',
                      color: '#2D2D2D',
                      textDecoration: 'none',
                    }}
                  >
                    {device.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related links */}
        <div
          className="rounded-xl"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E4DF',
            padding: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
            For more on how equipment cost and brand affect treatment quality, see our{' '}
            <Link href="/is-it-a-real-laser/equipment-costs" style={{ color: '#5E8B7E', fontWeight: 500 }} className="hover:underline">
              equipment cost analysis
            </Link>
            . To learn the difference between purpose-built and multi-purpose clinical lasers, see our{' '}
            <Link href="/is-it-a-real-laser/purpose-built-vs-multi-purpose" style={{ color: '#5E8B7E', fontWeight: 500 }} className="hover:underline">
              purpose-built vs multi-purpose guide
            </Link>
            . To verify what equipment your clinic uses, try our{' '}
            <Link href="/is-it-a-real-laser" style={{ color: '#5E8B7E', fontWeight: 500 }} className="hover:underline">
              equipment verification tool
            </Link>
            .
          </p>
        </div>

        {/* Share CTA */}
        <div
          className="rounded-xl text-center"
          style={{
            backgroundColor: 'rgba(94, 139, 126, 0.08)',
            border: '1px solid rgba(94, 139, 126, 0.2)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <p
            style={{
              color: '#2D2D2D',
              fontSize: '1rem',
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            Know someone using a home laser? Share this so they understand what they&apos;re getting.
          </p>
          <ShareButtons
            url="https://laserhairremovalmap.com/is-it-a-real-laser/home-laser-vs-clinical-laser"
            title="Home Lasers vs Clinical Lasers: Real Lasers, Real Gap"
          />
        </div>

        {/* Contact CTA */}
        <p
          className="text-center"
          style={{
            color: '#5A5550',
            fontSize: '0.9375rem',
            marginTop: '2rem',
          }}
        >
          Have information about equipment we should investigate?{' '}
          <Link
            href="/is-it-a-real-laser/contact"
            style={{ color: '#5E8B7E', fontWeight: 500 }}
            className="hover:underline"
          >
            Get in touch
          </Link>
          .
        </p>

        <Footer />
      </article>
    </main>
  );
}