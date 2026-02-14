import { SearchBar } from '@/components/SearchBar';
import { EquipmentIndex } from '@/components/EquipmentIndex';
import { Footer } from '@/components/Footer';
import equipmentData from '@/data/equipment.json';
import type { EquipmentEntry } from '@/lib/equipment';
import Link from 'next/link';

const equipment = equipmentData as EquipmentEntry[];
const machineCount = equipment.filter(e => e.type === 'machine').length;

export const metadata = {
  title: 'Is It a Real Hair Removal Laser? - Equipment Checker',
  description:
    'Search and verify laser hair removal equipment. Find out if a device is a real laser or IPL.',
};

const popularSearches = [
  { name: 'GentleMax Pro', slug: 'gentlemax-pro' },
  { name: 'Soprano ICE', slug: 'soprano-ice-platinum' },
  { name: 'LightSheer', slug: 'lightsheer-duet' },
  { name: 'SHR', slug: 'shr' },
  { name: 'IPL', slug: 'ipl' },
];

export default function IsItARealLaserPage() {
  return (
    <main
      style={{
        backgroundColor: '#FAF9F7',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Hero Section */}
      <section style={{ position: 'relative', paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ position: 'relative', zIndex: 1 }}>
          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#2D2D2D',
              marginBottom: '1rem',
            }}
          >
            Is It a Real Hair Removal Laser?
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
              lineHeight: 1.6,
              color: '#6B6560',
              marginBottom: '2.5rem',
              maxWidth: '520px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Your clinic says they use "advanced laser technology." But is it actually a laser?
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-5">
            <SearchBar equipment={equipment} />
          </div>

          {/* Popular Searches */}
          <div style={{ marginTop: '1.5rem' }}>
            <span
              style={{
                display: 'block',
                color: '#6B6560',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              Popular
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map((item) => (
                <Link
                  key={item.slug}
                  href={`/is-it-a-real-laser/${item.slug}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#2D2D2D',
                    fontSize: '0.8rem',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '9999px',
                    border: '1px solid #E8E4DF',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  className="hover:border-[#5E8B7E] hover:text-[#5E8B7E]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Not Sure Hint */}
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5E8B7E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p style={{ color: '#6B6560', fontSize: '0.875rem' }}>
              Not sure?{' '}
              <span style={{ color: '#2D2D2D' }}>
                Ask your clinic: "What brand and model of laser do you use?"
              </span>
            </p>
          </div>

          {/* IPL vs Laser Comparison Image */}
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <img
              src="/ipl-vs-laser.png"
              alt="IPL vs Real Laser comparison"
              style={{
                width: '420px',
                maxWidth: '90%',
                height: 'auto',
              }}
            />
          </div>

          {/* Not Lasers Warning Section */}
          <div
            style={{
              marginTop: '2.5rem',
              padding: '1.25rem 1.5rem',
              backgroundColor: 'rgba(196, 107, 92, 0.08)',
              borderRadius: '0.75rem',
              border: '1px solid rgba(196, 107, 92, 0.15)',
              maxWidth: '480px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C46B5C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span
                style={{
                  color: '#C46B5C',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '-0.01em',
                }}
              >
                These Are NOT Lasers
              </span>
            </div>

            <p
              style={{
                color: '#6B6560',
                fontSize: '0.8rem',
                textAlign: 'center',
                marginBottom: '0.75rem',
                lineHeight: 1.5,
              }}
            >
              Despite how they&apos;re marketed, these technologies use Intense Pulsed Light, not laser:
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}
            >
              {[
                { name: 'BBL', slug: 'bbl' },
                { name: 'AFT', slug: 'aft' },
                { name: 'E-Light', slug: 'e-light' },
                { name: 'OPT', slug: 'opt' },
                { name: 'DPL', slug: 'dpl' },
                { name: 'IPL', slug: 'ipl' },
              ].map((tech) => (
                <Link
                  key={tech.slug}
                  href={`/is-it-a-real-laser/${tech.slug}`}
                  style={{
                    backgroundColor: 'rgba(196, 107, 92, 0.12)',
                    color: '#C46B5C',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    padding: '0.3rem 0.7rem',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  className="hover:bg-[rgba(196,107,92,0.2)]"
                >
                  {tech.name}
                </Link>
              ))}
            </div>

            <p
              style={{
                color: '#6B6560',
                fontSize: '0.75rem',
                textAlign: 'center',
                marginBottom: '0.75rem',
              }}
            >
              Many clinics advertise &ldquo;laser hair removal&rdquo; while using these devices.
            </p>

            <div style={{ textAlign: 'center' }}>
              <Link
                href="/is-it-a-real-laser/ipl"
                style={{
                  color: '#C46B5C',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
                className="hover:underline"
              >
                Learn why it matters
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
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider line */}
      <div
        style={{
          maxWidth: '64rem',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        <div
          style={{
            height: '1px',
            backgroundColor: '#E8E4DF',
          }}
        />
      </div>

      {/* Equipment Database */}
      <section
        className="px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: '3rem', paddingBottom: '4rem' }}
      >
        <div className="max-w-6xl mx-auto">
          <EquipmentIndex equipment={equipment} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
