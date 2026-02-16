/**
 * Equipment Costs Guide page
 *
 * Educational page about the price differences between
 * clinical-grade and budget laser hair removal equipment.
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import { Disclaimer } from '@/components/Disclaimer';
import { Footer } from '@/components/Footer';
import { ShareButtons } from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'The $3,000 Machine vs the $100,000 Machine | LaserHairRemovalMap',
  description:
    'Both call it "laser hair removal". Learn the difference between premium clinical-grade equipment and budget imports, and how to protect yourself.',
  openGraph: {
    title: 'The $3,000 Machine vs the $100,000 Machine | LaserHairRemovalMap',
    description:
      'Both call it "laser hair removal". Learn the difference between premium clinical-grade equipment and budget imports, and how to protect yourself.',
  },
};

export default function EquipmentCostsPage() {
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
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
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
            The $3,000 Machine vs the $100,000 Machine
          </h1>
          <p
            style={{
              marginTop: '0.75rem',
              color: '#6B6560',
              fontSize: '1.0625rem',
            }}
          >
            Both call it "laser hair removal"
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
            gap: '0.5rem 1rem',
            marginBottom: '2.5rem',
            fontSize: '0.8125rem',
          }}
        >
          <a href="#the-price-gap" style={{ color: '#5E8B7E', textDecoration: 'none' }} className="hover:underline">The Price Gap</a>
          <span style={{ color: '#E8E4DF' }}>·</span>
          <a href="#what-the-money-buys" style={{ color: '#5E8B7E', textDecoration: 'none' }} className="hover:underline">What the Money Buys</a>
          <span style={{ color: '#E8E4DF' }}>·</span>
          <a href="#combo-machines" style={{ color: '#5E8B7E', textDecoration: 'none' }} className="hover:underline">The Combo Machine Red Flag</a>
          <span style={{ color: '#E8E4DF' }}>·</span>
          <a href="#white-label" style={{ color: '#5E8B7E', textDecoration: 'none' }} className="hover:underline">The White-Label Machine</a>
          <span style={{ color: '#E8E4DF' }}>·</span>
          <a href="#american-laser" style={{ color: '#5E8B7E', textDecoration: 'none' }} className="hover:underline">The "American Laser" Claim</a>
          <span style={{ color: '#E8E4DF' }}>·</span>
          <a href="#how-to-protect-yourself" style={{ color: '#5E8B7E', textDecoration: 'none' }} className="hover:underline">How to Protect Yourself</a>
        </nav>

        {/* The Reality Section */}
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
            The Reality
          </h2>
          <p className="leading-relaxed" style={{ color: '#2D2D2D', fontSize: '1.0625rem', lineHeight: 1.7 }}>
            Your clinic says they use "advanced laser technology." It could be a $100,000 Candela GentleMax Pro. It could be a $3,000 import from Alibaba. Both statements are technically true. The difference is in what you can't see, and what your clinic probably won't tell you.
          </p>
        </section>

        {/* Alibaba vs Candela Comparison Image */}
        <figure style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <img
            src="/laser-hair-removal-alibaba-and-candela.png"
            alt="Comparison of budget Alibaba laser machine vs premium Candela equipment"
            style={{
              width: '80%',
              height: 'auto',
              display: 'block',
            }}
          />
        </figure>

        {/* The Price Gap */}
        <section id="the-price-gap" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            What Laser Hair Removal Machines Actually Cost
          </h2>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1rem' }}>
            Most consumers assume all "laser hair removal" uses similar equipment. The price range across machines tells a different story.
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Here are the price ranges for cheap Chinese brands you can find on Alibaba:
          </p>

          {/* Budget Machines Table */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: '1px solid #E8E4DF',
              marginBottom: '2rem',
            }}
          >
            {/* Table Header */}
            <div
              className="grid grid-cols-4 gap-4 p-4"
              style={{
                backgroundColor: 'rgba(94, 139, 126, 0.08)',
                borderBottom: '1px solid #E8E4DF',
              }}
            >
              <div style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.875rem' }}>Wavelength</div>
              <div style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.875rem' }}>Cheap versions?</div>
              <div style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.875rem' }}>Price range</div>
              <div style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.875rem' }}>In US clinics</div>
            </div>

            {/* 810nm Diode Row */}
            <div
              className="grid grid-cols-4 gap-4 p-4"
              style={{ borderBottom: '1px solid #E8E4DF', backgroundColor: '#FFFFFF' }}
            >
              <div style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.875rem' }}>810nm Diode</div>
              <div style={{ color: '#5E8B7E', fontSize: '0.875rem' }}>Extremely common</div>
              <div style={{ color: '#2D2D2D', fontSize: '0.875rem' }}>$2,000–$5,000</div>
              <div style={{ color: '#6B6560', fontSize: '0.875rem' }}>High: the #1 budget import</div>
            </div>

            {/* 755nm Alexandrite Row */}
            <div
              className="grid grid-cols-4 gap-4 p-4"
              style={{ borderBottom: '1px solid #E8E4DF', backgroundColor: '#FFFFFF' }}
            >
              <div style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.875rem' }}>755nm Alexandrite</div>
              <div style={{ color: '#5E8B7E', fontSize: '0.875rem' }}>Exists but less common</div>
              <div style={{ color: '#2D2D2D', fontSize: '0.875rem' }}>$2,500–$8,000</div>
              <div style={{ color: '#6B6560', fontSize: '0.875rem' }}>Lower: crystal is harder to clone</div>
            </div>

            {/* 1064nm Nd:YAG Row */}
            <div
              className="grid grid-cols-4 gap-4 p-4"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <div style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.875rem' }}>1064nm Nd:YAG</div>
              <div style={{ color: '#5E8B7E', fontSize: '0.875rem' }}>Common, usually as combo machines</div>
              <div style={{ color: '#2D2D2D', fontSize: '0.875rem' }}>$2,500–$10,000</div>
              <div style={{ color: '#6B6560', fontSize: '0.875rem' }}>Medium: often bundled with 755nm + 808nm</div>
            </div>
          </div>

          {/* Established Manufacturers */}
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1rem' }}>
            Compare that to what established manufacturers charge:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Candela GentleMax Pro */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E4DF',
              }}
            >
              <div style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                Candela GentleMax Pro
              </div>
              <div style={{ color: '#5E8B7E', fontWeight: 500, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                $80,000–$150,000
              </div>
              <div style={{ color: '#6B6560', fontSize: '0.8125rem' }}>
                Dual wavelength (755nm + 1064nm)
              </div>
            </div>

            {/* Lumenis LightSheer Duet */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E4DF',
              }}
            >
              <div style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                Lumenis LightSheer Duet
              </div>
              <div style={{ color: '#5E8B7E', fontWeight: 500, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                $60,000–$100,000
              </div>
              <div style={{ color: '#6B6560', fontSize: '0.8125rem' }}>
                810nm diode with vacuum-assist
              </div>
            </div>

            {/* Cynosure Elite iQ */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E4DF',
              }}
            >
              <div style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                Cynosure Elite iQ
              </div>
              <div style={{ color: '#5E8B7E', fontWeight: 500, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                $70,000–$120,000
              </div>
              <div style={{ color: '#6B6560', fontSize: '0.8125rem' }}>
                Dual wavelength (755nm + 1064nm)
              </div>
            </div>

            {/* Alma Soprano Titanium */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E4DF',
              }}
            >
              <div style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                Alma Soprano Titanium
              </div>
              <div style={{ color: '#5E8B7E', fontWeight: 500, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                $50,000–$90,000
              </div>
              <div style={{ color: '#6B6560', fontSize: '0.8125rem' }}>
                Tri-wavelength (755 + 810 + 1064nm)
              </div>
            </div>
          </div>
        </section>

        {/* What the Money Buys */}
        <section id="what-the-money-buys" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}
          >
            What the Money Buys
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Power output and consistency */}
            <div>
              <h3 style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Power output and consistency
              </h3>
              <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8 }}>
                Premium machines deliver higher, more consistent energy per pulse. A cheap machine might advertise the same peak power but can't sustain it across a full treatment session. The result: some follicles get enough energy to be destroyed, others don't. That's why you come back for more sessions.
              </p>
            </div>

            {/* Cooling systems */}
            <div>
              <h3 style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Cooling systems
              </h3>
              <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8 }}>
                Candela's Dynamic Cooling Device (DCD) sprays cryogen milliseconds before each pulse, precisely timed to protect your skin while the laser reaches the follicle. Budget machines use basic contact cooling or nothing at all. Better cooling means higher safe energy levels and less pain.
              </p>
            </div>

            {/* Spot size and treatment speed */}
            <div>
              <h3 style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Spot size and treatment speed
              </h3>
              <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8 }}>
                Premium machines offer larger spot sizes (up to 24mm) for faster coverage. A LightSheer Duet can treat a full back in under 15 minutes. A budget machine with a small handpiece could take over an hour for the same area and miss spots.
              </p>
            </div>

            {/* FDA clearance vs CE marking */}
            <div>
              <h3 style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                FDA clearance vs CE marking
              </h3>
              <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8 }}>
                Most premium devices hold FDA 510(k) clearance, which requires clinical evidence of safety and efficacy. Many imports carry only a CE mark, which in some cases is a self-declared conformity mark, not an independent safety review.
              </p>
            </div>

            {/* Calibration and manufacturer support */}
            <div>
              <h3 style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Calibration and manufacturer support
              </h3>
              <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8 }}>
                Premium manufacturers provide ongoing calibration, software updates, and certified service technicians. When a budget machine drifts out of calibration, there's no manufacturer to call. The clinic may not even know it's delivering inconsistent energy.
              </p>
            </div>

            {/* Practitioner training */}
            <div>
              <h3 style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Practitioner training
              </h3>
              <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8 }}>
                Candela, Lumenis, and Cynosure provide clinical training with their machines. Budget importers ship a device and a manual. The operator's skill matters as much as the equipment and training is part of what that $100,000 buys.
              </p>
            </div>
          </div>
        </section>

        {/* Combo Machines */}
        <section id="combo-machines" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            The Combo Machine Red Flag
          </h2>

          {/* Alibaba Screenshot */}
          <figure style={{ marginBottom: '1.5rem' }}>
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: '1px solid #E8E4DF',
              }}
            >
              <img
                src="/alibaba-combo-machine.png"
                alt="Tri-wavelength hair removal machine listing on Alibaba showing price of $850 to $3,300"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
            <figcaption
              style={{
                marginTop: '0.5rem',
                color: '#6B6560',
                fontSize: '0.8125rem',
                textAlign: 'center',
              }}
            >
              Tri-wavelength hair removal machine on Alibaba: $850–$3,300. 28 sold. The manufacturer offers free custom branding, any logo, any name.
            </figcaption>
          </figure>

          {/* Used Candela Screenshot */}
          <figure style={{ marginBottom: '1.5rem' }}>
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: '1px solid #E8E4DF',
              }}
            >
              <img
                src="/used_candela.png"
                alt="Used Candela GentleMax Pro listing showing price of $97,500"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
            <figcaption
              style={{
                marginTop: '0.5rem',
                color: '#6B6560',
                fontSize: '0.8125rem',
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              Used Candela GentleMax Pro Plus on Bimedis: $97,500. This is a used machine. New ones cost even more.
            </figcaption>
          </figure>

          {/* Red Flag Card */}
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
              <strong>The combo machines are the biggest red flag.</strong> A machine starting at $850 claims three wavelengths (755nm + 808nm + 1064nm). The $97,500 Candela has two. When a machine costing less than 1% of the price claims to do more, that tells you everything. A clinic can truthfully say "we use all three wavelengths" while using a machine that costs less than a month's rent with their own brand printed on it.
            </p>
          </div>

          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1rem' }}>
            Legitimate tri-wavelength machines exist: the Alma Soprano Titanium and InMode Triton both cost $50,000–$90,000 and come with clinical training and service contracts.
          </p>
          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8 }}>
            When a clinic advertises "triple wavelength laser" at prices well below competitors, the question isn't whether they have three wavelengths. It's whether those wavelengths are delivered by a machine built to clinical standards.
          </p>
        </section>

        {/* The White-Label Machine */}
        <section id="white-label" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            The White-Label Machine
          </h2>

          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1rem' }}>
            This isn't just a cheap machine. It's designed to be untraceable. The manufacturer explicitly offers as standard services:
          </p>

          {/* White-label services card */}
          <div
            className="rounded-xl"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E4DF',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="flex items-start gap-3">
                <span style={{ color: '#B8860B', fontWeight: 700, fontSize: '1rem', lineHeight: '1.5rem', flexShrink: 0 }}>→</span>
                <p style={{ color: '#2D2D2D', lineHeight: 1.6 }}>
                  <strong>Custom logo</strong>: any brand name printed on the machine body and screen
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: '#B8860B', fontWeight: 700, fontSize: '1rem', lineHeight: '1.5rem', flexShrink: 0 }}>→</span>
                <p style={{ color: '#2D2D2D', lineHeight: 1.6 }}>
                  <strong>Custom software</strong>: your own program interface, in any language
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: '#B8860B', fontWeight: 700, fontSize: '1rem', lineHeight: '1.5rem', flexShrink: 0 }}>→</span>
                <p style={{ color: '#2D2D2D', lineHeight: 1.6 }}>
                  <strong>Custom colors</strong>: choose the look of the machine
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: '#B8860B', fontWeight: 700, fontSize: '1rem', lineHeight: '1.5rem', flexShrink: 0 }}>→</span>
                <p style={{ color: '#2D2D2D', lineHeight: 1.6 }}>
                  <strong>Custom packaging</strong>: no trace of the original manufacturer
                </p>
              </div>
            </div>
          </div>

          {/* Brand Might Not Exist Screenshot */}
          <figure style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <a
              href="/brand_might_not_exist.png"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl overflow-hidden transition-opacity hover:opacity-90"
              style={{
                border: '1px solid #E8E4DF',
                width: '85%',
                display: 'block',
                cursor: 'zoom-in',
              }}
            >
              <img
                src="/brand_might_not_exist.png"
                alt="Alibaba listing showing custom branding options for laser machines"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </a>
          </figure>

          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            The manufacturer behind the $850 machine we found operates a 6,000m² factory with 145 staff. They already run six private label brands. They have over 3,200 store reviews and $2.3 million in annual online revenue. This isn't a back-room operation, it's industrial-scale white-labeling.
          </p>

          {/* Leading Chinese Factory Screenshot */}
          <figure style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <a
              href="/leading_chinese_factory.png"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl overflow-hidden transition-opacity hover:opacity-90"
              style={{
                border: '1px solid #E8E4DF',
                width: '85%',
                display: 'block',
                cursor: 'zoom-in',
              }}
            >
              <img
                src="/leading_chinese_factory.png"
                alt="Alibaba manufacturer profile showing factory size and production capacity"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </a>
          </figure>

          {/* Damning detail callout */}
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
              <strong>A clinic buys this machine for $850, puts their own name on it, and the patient sees what looks like a proprietary branded device.</strong> There is no way to tell from the outside. The machine even comes with a "4K touch screen" and customizable language settings. It looks professional in the treatment room.
            </p>
          </div>

          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Verified reviews on the listing include repeat buyers from the United States and France, all from late 2025. These machines are actively entering clinics right now.
          </p>

          {/* Repeat Buyer From USA Screenshot */}
          <figure style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <a
              href="/repeat_buyer_from_usa.png"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl overflow-hidden transition-opacity hover:opacity-90"
              style={{
                border: '1px solid #E8E4DF',
                width: '70%',
                display: 'block',
                cursor: 'zoom-in',
              }}
            >
              <img
                src="/repeat_buyer_from_usa.png"
                alt="Alibaba review showing repeat buyer from United States"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </a>
          </figure>
        </section>

        {/* The "American Laser" Claim */}
        <section id="american-laser" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            The "American Laser" Claim
          </h2>

          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1rem' }}>
            Some of these manufacturers display test sheets from Coherent, a legitimate American laser component supplier, to suggest their machines use premium parts. The listing we found includes a magnified photo of a Coherent manufacturing test data sheet as a marketing image:
          </p>

          {/* Unverifiable Claims Screenshot */}
          <figure style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <a
              href="/unverifiable_claims.png"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl overflow-hidden transition-opacity hover:opacity-90"
              style={{
                border: '1px solid #E8E4DF',
                width: '70%',
                display: 'block',
                cursor: 'zoom-in',
              }}
            >
              <img
                src="/unverifiable_claims.png"
                alt="Alibaba listing showing Coherent test sheet and FDA 510K claims"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </a>
          </figure>

          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1rem' }}>
            Even if the diode bar inside is genuine, it's a single component. A laser diode bar doesn't make a clinical-grade machine any more than a German engine makes a kit car a Mercedes. The power supply stability, cooling system, beam delivery, calibration software, and safety interlocks are what separate an $850 machine from a $97,500 one.
          </p>

          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            The same manufacturer also lists a version advertising "OEM ODM USA 510K CE", implying they can provide FDA 510(k) documentation for their white-label machines. Legitimate manufacturers spend years and millions of dollars obtaining FDA clearance for each device.
          </p>

          {/* Alibaba FDA Clearance Screenshot */}
          <figure style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <a
              href="/alibaba_fda_clearance.png"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl overflow-hidden transition-opacity hover:opacity-90"
              style={{
                border: '1px solid #E8E4DF',
                width: '70%',
                display: 'block',
                cursor: 'zoom-in',
              }}
            >
              <img
                src="/alibaba_fda_clearance.png"
                alt="Alibaba listing advertising OEM ODM USA 510K CE certification"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </a>
          </figure>
        </section>

        {/* How to Protect Yourself */}
        <section
          id="how-to-protect-yourself"
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
            How to Protect Yourself
          </h2>

          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7, marginBottom: '1rem' }}>
            Ask your clinic directly: <strong style={{ color: '#2D2D2D' }}>"What brand and model of laser do you use?"</strong>
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7 }}>
              <strong style={{ color: '#2D2D2D' }}>If they name a brand you can't find anywhere online:</strong> that's a red flag. White-labeled machines are designed to be unsearchable.
            </p>
            <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7 }}>
              <strong style={{ color: '#2D2D2D' }}>If they can't or won't answer:</strong> that's a bigger red flag. Reputable clinics are proud of their equipment investment.
            </p>
            <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7 }}>
              <strong style={{ color: '#2D2D2D' }}>If they say "we use our own proprietary technology":</strong> be skeptical. Clinics don't manufacture lasers. Candela, Lumenis, Alma, and Cynosure do.
            </p>
          </div>

          <p className="leading-relaxed" style={{ color: '#6B6560', lineHeight: 1.7 }}>
            Once you have the answer,{' '}
            <Link
              href="/is-it-a-real-laser"
              style={{ color: '#5E8B7E', fontWeight: 500, textDecoration: 'underline' }}
            >
              check how it's rated in our equipment database →
            </Link>
          </p>
        </section>

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
            Know a clinic using premium equipment? Share this article: it helps them explain why quality matters.
          </p>
          <ShareButtons
            url="https://laserhairremovalmap.com/is-it-a-real-laser/equipment-costs"
            title="The $3,000 Machine vs the $100,000 Machine - Why Laser Hair Removal Equipment Costs Matter"
          />
        </div>

        <Footer />
      </article>
    </main>
  );
}