/**
 * Home Devices vs Clinical Lasers Guide page
 *
 * Educational page explaining the power difference between
 * home laser devices and professional clinical lasers.
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import { Disclaimer } from '@/components/Disclaimer';
import { Footer } from '@/components/Footer';
import { ShareButtons } from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Home Lasers vs Clinical Lasers | LaserHairRemovalMap',
  description:
    'At-home lasers like the Tria 4X are real lasers. But they\'re not playing in the same league. Learn why clinical lasers deliver up to 100x more energy per pulse and what that means for your results.',
  openGraph: {
    title: 'Home Lasers vs Clinical Lasers | LaserHairRemovalMap',
    description:
      'At-home lasers like the Tria 4X are real lasers. They\'re just not playing in the same league. Learn why clinical lasers deliver up to 100x more energy per pulse and what that means for your results.',
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
            Same wavelength, different league
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
          <a href="#the-power-gap" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">The Power Gap</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#why-the-gap-exists" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Why the Gap Exists</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#what-it-means" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">What It Means for Results</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#where-home-devices-fit" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Where Home Devices Fit</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#how-we-classify" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">How We Classify</a>
        </nav>

        {/* Opening section */}
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
              color: '#B8860B',
              fontSize: '0.7rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            The Surprise
          </h2>
          <p className="leading-relaxed" style={{ color: '#2D2D2D', fontSize: '1.0625rem', lineHeight: 1.7 }}>
            At-home devices Tria 4X and Tria Precision are real lasers. But they are not playing in the same league as clinical lasers.
          </p>
          <p className="leading-relaxed" style={{ color: '#2D2D2D', fontSize: '1.0625rem', lineHeight: 1.7, marginTop: '1rem' }}>
            The Tria Hair Removal Laser 4X, the most powerful home laser available, uses a real 810nm diode laser: the same wavelength used by professional clinical devices like the Lumenis LightSheer and Venus Velocity. It is FDA-cleared as an OTC (over-the-counter) device under product code OHT, a completely different regulatory category from the professional lasers used in clinics.
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
              alt="Home device vs clinical laser comparison: Tria Hair Removal Laser 4X (home device, Class 1) next to Candela GentleMax Pro (clinical laser, Class IV). Both are real lasers, but the clinical device delivers roughly 100 times more energy per pulse."
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
            Left: Tria Hair Removal Laser 4X, a home diode laser you can buy for around $300. Right: Candela GentleMax Pro, a clinical laser costing $80,000–$150,000. Both use real laser technology. The difference is power: the GentleMax Pro delivers enough energy to permanently damage a hair follicle in a single pulse. The Tria cannot.
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
            The difference comes down to power, and the gap is larger than most people realize.
          </p>

          {/* Power comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: '1.5rem' }}>
            {/* Tria card */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: 'rgba(196, 158, 92, 0.08)',
                border: '1px solid rgba(196, 158, 92, 0.2)',
              }}
            >
              <div style={{ color: '#B8860B', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Tria Hair Removal Laser 4X
              </div>
              <div style={{ color: '#5A5550', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Home device · ~$300</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Fluence</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Up to 20 J/cm²</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Energy per pulse</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>~0.5 joules</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Treatment window</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>1 cm²</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Classification</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Class 1 / OTC</span>
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
              <div style={{ color: '#5A5550', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Clinical laser · $80,000–$150,000</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Fluence</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Up to 100+ J/cm²</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Energy per pulse</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Up to 80 joules</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Spot sizes</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Up to 24mm</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>Classification</span>
                  <span style={{ color: '#2D2D2D', fontSize: '0.9375rem', fontWeight: 500 }}>Class IV medical</span>
                </div>
              </div>
            </div>
          </div>

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
              <strong style={{ color: '#2D2D2D' }}>Two ways to measure the gap.</strong> Energy per pulse (joules) measures total power output. Here the clinical laser wins by ~100x. Fluence (J/cm²) measures energy concentration at the skin surface. Here the clinical laser wins by 5-20x depending on spot size. Both metrics matter. The clinical device delivers dramatically more energy, across a dramatically larger treatment area, in a single pulse.
            </p>
          </div>
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
            That power gap isn&apos;t a design flaw in the home device. It&apos;s a legal requirement.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            Professional lasers are classified as Class IV medical devices, meaning they can cause immediate tissue damage and require trained operators, protective eyewear, and controlled clinical environments. These machines don't plug into a standard wall socket. A device like the Candela GentleMax Pro requires a dedicated electrical circuit and professional installation by an electrician.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            Home devices are Class 1 or Class 2, limited by regulation to energy levels safe for unsupervised use, and they charge over USB or plug into a normal outlet.
          </p>

          {/* Regulation callout */}
          <div
            className="rounded-xl"
            style={{
              backgroundColor: 'rgba(196, 158, 92, 0.08)',
              border: '1px solid rgba(196, 158, 92, 0.2)',
              padding: '1.5rem',
            }}
          >
            <p className="leading-relaxed" style={{ color: '#2D2D2D', lineHeight: 1.8 }}>
              <strong>The Tria uses the same 810nm diode wavelength as professional devices like the Lumenis LightSheer.</strong> Same wavelength. Same type of laser. The main difference is how much power the device is legally allowed to deliver.
              
              Clinical devices also deliver energy through larger spot sizes, advanced cooling systems, and adjustable pulse durations that home devices simply don't have room for.
            </p>
          </div>
        </section>

        {/* What It Means for Results */}
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
            Destroying a hair follicle permanently requires delivering enough thermal energy to the follicle&apos;s stem cells in a single pulse or rapid pulse sequence. Clinical lasers can do this. Home devices deliver energy below that threshold.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            This is why home devices can slow regrowth and thin hair with consistent long-term use, but don&apos;t achieve the permanent hair reduction that clinical lasers provide in 6-8 sessions.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
            The FDA clearance language reflects this difference: professional devices are cleared for &ldquo;permanent hair reduction&rdquo; with rigorous clinical evidence thresholds, while home devices go through a different regulatory path entirely.
          </p>
        </section>

        {/* Where Home Devices Fit */}
        <section id="where-home-devices-fit" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Where Home Devices Fit
          </h2>
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
            {' '}with a &ldquo;Limited Use&rdquo; badge. This doesn&apos;t mean they&apos;re bad products. It means they operate under fundamentally different power constraints than the clinical devices your provider uses, and comparing them directly would be misleading.
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
                Class IV medical devices. Require trained operators and controlled environments. Capable of permanent hair reduction in 6-8 sessions.
              </p>
              <p style={{ color: '#2D2D2D', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Examples:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <Link
                  href="/is-it-a-real-laser/gentlemax-pro"
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
                  GentleMax Pro
                </Link>
                <Link
                  href="/is-it-a-real-laser/lightsheer"
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
                  LightSheer
                </Link>
                <Link
                  href="/is-it-a-real-laser/soprano-titanium"
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
                  Soprano Titanium
                </Link>
                <Link
                  href="/is-it-a-real-laser/vectus"
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
                  Vectus
                </Link>
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
                Home Devices · Limited Use
              </div>
              <p style={{ color: '#5A5550', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Class 1-2 OTC devices. Safe for unsupervised use. Effective for maintenance and hair thinning, not for permanent hair reduction.
              </p>
              <p style={{ color: '#2D2D2D', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Examples:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <Link
                  href="/is-it-a-real-laser/tria-4x"
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
                  Tria 4X
                </Link>
                <Link
                  href="/is-it-a-real-laser/tria-precision"
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
                  Tria Precision
                </Link>
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
            Know someone using a home laser? Share this article so others understand what they&apos;re getting.
          </p>
          <ShareButtons
            url="https://laserhairremovalmap.com/is-it-a-real-laser/home-laser-vs-clinical-laser"
            title="Home Lasers vs Clinical Lasers: Same Wavelength, Different League"
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
