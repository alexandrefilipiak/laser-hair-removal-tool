/**
 * Purpose-Built vs Multi-Purpose Lasers Guide page
 *
 * Educational page explaining the difference between
 * purpose-built hair removal lasers and multi-purpose platforms.
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import { Disclaimer } from '@/components/Disclaimer';
import { Footer } from '@/components/Footer';
import { ShareButtons } from '@/components/ShareButtons';

export const metadata: Metadata = {
  title: 'Purpose-Built vs. Multi-Purpose Lasers | LaserHairRemovalMap',
  description:
    'Not all professional lasers were designed for hair removal. Learn the difference between purpose-built and multi-purpose devices, and what it means for your results.',
  openGraph: {
    title: 'Purpose-Built vs. Multi-Purpose Lasers | LaserHairRemovalMap',
    description:
      'Not all professional lasers were designed for hair removal. Learn the difference between purpose-built and multi-purpose devices, and what it means for your results.',
  },
};

export default function PurposeBuiltVsMultiPurposePage() {
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
            Purpose-Built vs. Multi-Purpose Lasers
          </h1>
          <p
            style={{
              marginTop: '0.75rem',
              color: '#5A5550',
              fontSize: '1.0625rem',
            }}
          >
            What it means for your results
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
          <a href="#purpose-built" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Purpose-Built</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#multi-purpose" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Multi-Purpose</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#why-it-matters" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Why It Matters</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#why-clinics-choose" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Why Clinics Choose</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#how-we-classify" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">How We Classify</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#what-to-ask" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">What to Ask</a>
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
            The Question Nobody Asks
          </h2>
          <p className="leading-relaxed" style={{ color: '#2D2D2D', fontSize: '1.0625rem', lineHeight: 1.7 }}>
            You asked your clinic what laser they use. They told you the brand name. Maybe they even showed you a brochure. But there&apos;s a question most people never think to ask: <strong>was this machine designed specifically for hair removal?</strong>
          </p>
          <p className="leading-relaxed" style={{ color: '#2D2D2D', fontSize: '1.0625rem', lineHeight: 1.7, marginTop: '1rem' }}>
            Not all professional lasers are. And the difference matters more than you might expect.
          </p>
        </section>

        {/* Purpose-built vs multi-purpose comparison image */}
        <figure style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <a
            href="/laser-hair-removal-single-vs-multi-purpose.png"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full md:w-[50%]"
          >
            <img
              src="/laser-hair-removal-single-vs-multi-purpose.png"
              alt="Purpose-built vs multi-purpose laser comparison: Candela GentleMax Pro (designed for laser hair removal) next to Candela Nordlys (designed for versatility). Both are professional devices from the same manufacturer, but with different design priorities."
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
            Left: Candela GentleMax Pro, purpose-built for hair removal. Right: Candela Nordlys, a multi-purpose platform handling hair removal, vascular, pigmentation, and more. Same manufacturer, different design priorities.
          </figcaption>
        </figure>

        {/* What "purpose-built" actually means */}
        <section id="purpose-built" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            What &ldquo;Purpose-Built&rdquo; Actually Means
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            A purpose-built hair removal laser is a device where the primary engineering decisions, wavelength selection, spot sizes, cooling system, repetition rate, pulse control, were optimized for one job: destroying hair follicles.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            Devices like the Alma Soprano Titanium, Lumenis LightSheer family, Cynosure Vectus, and DEKA Motus were designed around hair removal from the ground up. Every component was chosen to make that specific treatment faster, more comfortable, and more effective.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            That doesn&apos;t mean they can <em>only</em> do hair removal. Most professional lasers are FDA-cleared for multiple indications. Even the Candela GentleMax Pro, arguably the most recognized name in laser hair removal, is also used for vascular lesions, pigmented lesions, and skin rejuvenation. The LightSheer treats skin rejuvenation. The Soprano platform handles skin treatments too.
          </p>

          {/* Callout */}
          <div
            className="rounded-xl"
            style={{
              backgroundColor: 'rgba(196, 158, 92, 0.08)',
              border: '1px solid rgba(196, 158, 92, 0.2)',
              padding: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            <p className="leading-relaxed" style={{ color: '#2D2D2D', lineHeight: 1.8 }}>
              <strong>Pure single-purpose devices are rare.</strong> When we classify a device as &ldquo;purpose-built for hair removal,&rdquo; we mean that hair removal was the primary design goal. The engineering trade-offs favor hair removal performance. Other capabilities exist, but they&apos;re secondary.
            </p>
          </div>
        </section>

        {/* What "multi-purpose" means */}
        <section id="multi-purpose" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            What &ldquo;Multi-Purpose&rdquo; Means
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            Multi-purpose platforms take the opposite approach. They were designed to be versatile, a single investment that lets a clinic offer many different treatments. Hair removal is one option among several equals.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            The Candela Nordlys, for example, handles hair removal, vascular lesions, pigmented lesions, acne, rosacea, and skin rejuvenation through interchangeable handpiece modules. The Alma Harmony XL Pro offers a similar breadth. Cynosure&apos;s Icon platform, Fotona&apos;s SP Dynamis, and Aerolase&apos;s Neo Elite (cleared for 36+ indications) are all designed with versatility as the primary goal.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            These are legitimate, FDA-cleared devices from established manufacturers. They work. Many clinics get good results with them for hair removal.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
            But the design priority is breadth, not depth.
          </p>
        </section>

        {/* Why the distinction matters */}
        <section id="why-it-matters" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Why the Distinction Matters for Your Results
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Think of it like kitchen knives. A chef&apos;s knife is purpose-built for chopping, slicing, and dicing. A Swiss Army knife has a blade too, and it works, but nobody would choose it over a chef&apos;s knife to prepare dinner. Both cut. One was designed to cut well.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            The practical differences between purpose-built and multi-purpose tend to show up in a few ways:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Treatment speed */}
            <div>
              <h3 style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Treatment speed
              </h3>
              <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
                Purpose-built devices typically have larger spot sizes and higher repetition rates optimized for covering skin quickly. A full-back treatment on a Soprano Titanium with its large applicator is meaningfully faster than the same treatment on a multi-purpose platform using a hair removal handpiece attachment.
              </p>
            </div>

            {/* Consistency across sessions */}
            <div>
              <h3 style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Consistency across sessions
              </h3>
              <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
                Purpose-built systems tend to deliver more uniform energy distribution because the beam delivery was engineered for the specific demands of hair follicle targeting. Multi-purpose platforms need to be more general in their energy delivery to accommodate different treatment types.
              </p>
            </div>

            {/* Cooling precision */}
            <div>
              <h3 style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Cooling precision
              </h3>
              <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
                Hair removal requires very specific cooling to protect the epidermis while the laser heats the follicle beneath it. Purpose-built systems like the LightSheer (with its vacuum-assisted compression) or the MeDioStar (with 360° Peltier cooling) have cooling systems designed specifically for the thermal profile of hair removal. Multi-purpose devices use more generalized cooling that serves multiple treatment types adequately.
              </p>
            </div>

            {/* Number of sessions */}
            <div>
              <h3 style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Number of sessions
              </h3>
              <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
                This is where the difference is most visible to consumers. An experienced practitioner with a purpose-built device will typically achieve satisfactory hair reduction in fewer sessions than the same practitioner using a multi-purpose platform. Fewer sessions means less time, less money, and less inconvenience.
              </p>
            </div>
          </div>

          {/* Important note */}
          <div
            className="rounded-xl"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E4DF',
              padding: '1.5rem',
              marginTop: '1.5rem',
            }}
          >
            <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
              None of this means multi-purpose devices <em>can&apos;t</em> remove hair effectively. They can. An experienced operator with a Nordlys or Harmony XL Pro will get results. The question is whether those results come as efficiently as they would with a device engineered specifically for the task.
            </p>
          </div>
        </section>

        {/* Why clinics choose multi-purpose devices */}
        <section id="why-clinics-choose" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Why Clinics Choose Multi-Purpose Devices
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            This isn&apos;t about clinics cutting corners. There are legitimate business reasons to invest in a multi-purpose platform:
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            A single Harmony XL Pro or Nordlys lets a clinic offer hair removal, vascular treatments, pigmentation correction, skin rejuvenation, and acne treatment, all from one device. That&apos;s five revenue streams from one purchase, one training investment, and one footprint in the treatment room.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            A clinic that bought a dedicated Soprano Titanium for hair removal, a dedicated Vbeam for vascular, and a dedicated PicoWay for pigmentation would have better-optimized tools for each job, but also three devices to purchase, maintain, insure, and train staff on. Not every practice can justify that investment.
          </p>

          {/* Reddit quote */}
          <div
            className="rounded-xl"
            style={{
              backgroundColor: 'rgba(196, 158, 92, 0.08)',
              border: '1px solid rgba(196, 158, 92, 0.2)',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <p className="leading-relaxed" style={{ color: '#2D2D2D', lineHeight: 1.8, fontStyle: 'italic' }}>
              &ldquo;Most [lasers] do multiple things and a lot of practices try to buy one that they can get the biggest variety of treatments from. This means that they may not be the best for laser hair removal, but if they&apos;ve spent the money for that machine, they are going to use it for laser hair removal also.&rdquo;
            </p>
            <p style={{ color: '#5A5550', fontSize: '0.875rem', marginTop: '0.75rem' }}>
              — Laser technician with 20+ years experience and 100,000+ sessions, via{' '}
              <a
                href="https://www.reddit.com/r/laserhairremoval/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#5E8B7E' }}
                className="hover:underline"
              >
                r/laserhairremoval
              </a>
            </p>
          </div>

          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
            To summarize: it&apos;s a practical business decision. The question for you as a consumer is whether you understand which kind of decision shaped the equipment being used on your skin.
          </p>
        </section>

        {/* How we classify devices */}
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
            How We Classify Devices on This Site
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            On every machine page in our{' '}
            <Link href="/equipment-verification-tool" style={{ color: '#5E8B7E', fontWeight: 500 }} className="hover:underline">
              equipment database
            </Link>
            , you&apos;ll see whether we&apos;ve classified the device as purpose-built for hair removal or multi-purpose.
          </p>

          {/* Classification cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: '1.5rem' }}>
            {/* Purpose-built card */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: 'rgba(94, 139, 126, 0.06)',
                border: '1px solid rgba(94, 139, 126, 0.15)',
              }}
            >
              <div style={{ color: '#5E8B7E', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Purpose-Built
              </div>
              <p style={{ color: '#5A5550', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Hair removal was the primary design goal. The device may have secondary capabilities, but the engineering priorities favor hair removal.
              </p>
              <p style={{ color: '#2D2D2D', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Examples:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <Link
                  href="/equipment-verification-tool/soprano-titanium"
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
                  href="/equipment-verification-tool/lightsheer"
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
                  href="/equipment-verification-tool/vectus"
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
                <Link
                  href="/equipment-verification-tool/motus-ax"
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
                  Motus
                </Link>
                <Link
                  href="/equipment-verification-tool/mediostar"
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
                  MeDioStar
                </Link>
                <Link
                  href="/equipment-verification-tool/diolaze-xl"
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
                  Diolaze XL
                </Link>
                <Link
                  href="/equipment-verification-tool/gentlemax-pro"
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
              </div>
            </div>

            {/* Multi-purpose card */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: 'rgba(196, 158, 92, 0.08)',
                border: '1px solid rgba(196, 158, 92, 0.2)',
              }}
            >
              <div style={{ color: '#B8860B', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                Multi-Purpose
              </div>
              <p style={{ color: '#5A5550', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                The device was designed as a versatile platform where hair removal is one of several equal applications.
              </p>
              <p style={{ color: '#2D2D2D', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Examples:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <Link
                  href="/equipment-verification-tool/nordlys"
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
                  Nordlys
                </Link>
                <Link
                  href="/equipment-verification-tool/harmony-xl-pro"
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
                  Harmony XL Pro
                </Link>
                <Link
                  href="/equipment-verification-tool/icon"
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
                  Icon
                </Link>
                <Link
                  href="/equipment-verification-tool/fotona-dynamis"
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
                  SP Dynamis
                </Link>
                <Link
                  href="/equipment-verification-tool/aerolase-neo-elite"
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
                  Neo Elite
                </Link>
                <Link
                  href="/equipment-verification-tool/thunder-mt"
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
                  Thunder MT
                </Link>
              </div>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
            Both categories include devices from reputable, FDA-cleared manufacturers. Both can deliver results. The distinction is about design priority, not quality.
          </p>
        </section>

        {/* What to ask your clinic */}
        <section
          id="what-to-ask"
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
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            What to Ask Your Clinic
          </h2>

          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.7, marginBottom: '1rem' }}>
            You don&apos;t need to interrogate your provider. But if you&apos;re choosing between clinics, or if you&apos;re not seeing the results you expected, these questions can help:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <p className="leading-relaxed" style={{ color: '#2D2D2D', fontWeight: 600, lineHeight: 1.7 }}>
                &ldquo;What specific device do you use for hair removal?&rdquo;
              </p>
              <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.7 }}>
                A confident clinic will name the brand and model without hesitation. If they give a vague answer like &ldquo;we use a medical-grade laser,&rdquo; that&apos;s worth noting.
              </p>
            </div>
            <div>
              <p className="leading-relaxed" style={{ color: '#2D2D2D', fontWeight: 600, lineHeight: 1.7 }}>
                &ldquo;Was it designed primarily for hair removal, or is it a multi-purpose system?&rdquo;
              </p>
              <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.7 }}>
                Most clinics won&apos;t be offended by this. If they use a purpose-built device, they&apos;ll be happy to explain why. If they use a multi-purpose platform, the good ones will be upfront about that too, and explain how their expertise compensates.
              </p>
            </div>
            <div>
              <p className="leading-relaxed" style={{ color: '#2D2D2D', fontWeight: 600, lineHeight: 1.7 }}>
                &ldquo;How many sessions should I expect?&rdquo;
              </p>
              <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.7 }}>
                This is where the rubber meets the road. Compare the answer across clinics. If one clinic estimates 6 sessions and another estimates 10 for the same area on the same skin type, the equipment difference might be part of the reason.
              </p>
            </div>
          </div>

          {/* Final callout */}
          <div
            className="rounded-lg"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(94, 139, 126, 0.2)',
              padding: '1rem',
            }}
          >
            <p className="leading-relaxed" style={{ color: '#2D2D2D', lineHeight: 1.7 }}>
              <strong>The best clinics combine good equipment with experienced operators.</strong> A skilled practitioner with a multi-purpose platform can outperform a novice with a purpose-built device. But all else being equal, purpose-built matters.
            </p>
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
            For more on how equipment cost and origin affect treatment quality, see our{' '}
            <Link href="/equipment-verification-tool/equipment-costs" style={{ color: '#5E8B7E', fontWeight: 500 }} className="hover:underline">
              equipment cost analysis
            </Link>
            . To verify what equipment your clinic uses, try our{' '}
            <Link href="/equipment-verification-tool" style={{ color: '#5E8B7E', fontWeight: 500 }} className="hover:underline">
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
            Choosing between clinics? Share this article to help others ask the right questions.
          </p>
          <ShareButtons
            url="https://laserhairremovalmap.com/equipment-verification-tool/purpose-built-vs-multi-purpose"
            title="Purpose-Built vs. Multi-Purpose Lasers: What It Means for Your Results"
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
            href="/equipment-verification-tool/contact"
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
