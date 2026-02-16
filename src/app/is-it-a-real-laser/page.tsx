import { SearchBar } from '@/components/SearchBar';
import { EquipmentIndex } from '@/components/EquipmentIndex';
import { Footer } from '@/components/Footer';
import equipmentData from '@/data/equipment.json';
import type { EquipmentEntry } from '@/lib/equipment';
import Link from 'next/link';
import { ShareButtons } from '@/components/ShareButtons';

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
              color: '#5A5550',
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
                color: '#5A5550',
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
                    fontSize: '0.9375rem',
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
            <p style={{ color: '#5A5550', fontSize: '0.9375rem', lineHeight: 1.7 }}>
              Not sure?{' '}
              <span style={{ color: '#2D2D2D' }}>
                Ask your clinic: "What brand and model of laser do you use?"
              </span>
            </p>
          </div>

          {/* IPL vs Laser Comparison Image */}
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <Link href="/is-it-a-real-laser/ipl">
              <img
                src="/ipl-vs-laser.png"
                alt="IPL vs Real Laser comparison"
                style={{
                  width: '420px',
                  maxWidth: '90%',
                  height: 'auto',
                  cursor: 'pointer',
                }}
              />
            </Link>
          </div>

          {/* Three Types of Hair Removal Laser */}
          <div
            style={{
              marginTop: '2.5rem',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#2D2D2D',
                marginBottom: '1.25rem',
                textAlign: 'center',
              }}
            >
              Three Types of Hair Removal Laser
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 755nm Alexandrite */}
              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E4DF',
                  textAlign: 'left',
                }}
              >
                <Link href="/is-it-a-real-laser/755nm" style={{ color: '#5E8B7E', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }} className="hover:underline">
                  755nm Alexandrite
                </Link>
                <p style={{ color: '#5A5550', fontSize: '0.9375rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
                  Most effective for lighter skin tones (Fitzpatrick I-IV). Found in machines like GentleLase and GentleMax Pro.
                </p>
              </div>

              {/* 810nm Diode */}
              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E4DF',
                  textAlign: 'left',
                }}
              >
                <Link href="/is-it-a-real-laser/810nm" style={{ color: '#5E8B7E', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }} className="hover:underline">
                  810nm Diode
                </Link>
                <p style={{ color: '#5A5550', fontSize: '0.9375rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
                  The most common type. Works across a range of skin tones. Found in machines like LightSheer and Soprano.
                </p>
              </div>

              {/* 1064nm Nd:YAG */}
              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E4DF',
                  textAlign: 'left',
                }}
              >
                <Link href="/is-it-a-real-laser/1064nm" style={{ color: '#5E8B7E', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }} className="hover:underline">
                  1064nm Nd:YAG
                </Link>
                <p style={{ color: '#5A5550', fontSize: '0.9375rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
                  Safest for darker skin tones (Fitzpatrick V-VI). Found in machines like GentleYAG and Clarity II.
                </p>
              </div>
            </div>
            <p
              style={{
                marginTop: '1rem',
                color: '#5A5550',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                textAlign: 'center',
              }}
            >
              Many premium machines combine two or three wavelengths in one device for maximum versatility.
            </p>
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
                color: '#5A5550',
                fontSize: '0.9375rem',
                textAlign: 'center',
                marginBottom: '0.75rem',
                lineHeight: 1.7,
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
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    padding: '0.4rem 0.9rem',
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
                color: '#5A5550',
                fontSize: '0.75rem',
                textAlign: 'center',
                marginBottom: '0.75rem',
              }}
            >
            </p>

            <div style={{ textAlign: 'center' }}>
              <Link
                href="/is-it-a-real-laser/ipl"
                style={{
                  color: '#C46B5C',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
                className="hover:underline"
              >
                IPL vs Laser: Learn the difference
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

          {/* Not All Lasers Are Equal */}
          <div
            style={{
              marginTop: '2.5rem',
              maxWidth: '560px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#2D2D2D',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              Watch the Brand: Not All Laser Machines Are Equal
            </h2>
            <div
              style={{
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Link href="/is-it-a-real-laser/equipment-costs" style={{ display: 'block', width: '84%', margin: '0 auto' }}>
                <img
                  src="/laser-hair-removal-alibaba-and-candela.png"
                  alt="Chinese model from Alibaba: $2,799-2,899 | Used Candela model: $97,500 | Both offer 'laser hair removal'"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    cursor: 'pointer',
                  }}
                />
              </Link>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link
                href="/is-it-a-real-laser/equipment-costs"
                style={{
                  color: '#5E8B7E',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
                className="hover:underline"
              >
                Why is laser hair removal so expensive?
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

      {/* Share CTA */}
      <section className="px-4 sm:px-6 lg:px-8" style={{ paddingBottom: '3rem' }}>
        <div
          className="rounded-xl text-center mx-auto"
          style={{
            backgroundColor: 'rgba(94, 139, 126, 0.08)',
            border: '1px solid rgba(94, 139, 126, 0.2)',
            padding: '1.25rem 1.5rem',
            maxWidth: '600px',
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
            Own a clinic with premium equipment? Share this tool with your clients: it helps them understand why your investment matters.
          </p>
          <ShareButtons
            url="https://laserhairremovalmap.com/is-it-a-real-laser"
            title="Is It a Real Hair Removal Laser? - Equipment Checker"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
