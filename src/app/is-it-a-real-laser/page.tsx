import { SearchBar } from '@/components/SearchBar';
import { EquipmentIndex } from '@/components/EquipmentIndex';
import equipmentData from '@/data/equipment.json';
import type { EquipmentEntry } from '@/lib/equipment';
import Link from 'next/link';

const equipment = equipmentData as EquipmentEntry[];
const machineCount = equipment.filter(e => e.type === 'machine').length;

export const metadata = {
  title: 'Is It a Real Laser? - Equipment Checker',
  description:
    'Search and verify laser hair removal equipment. Find out if a device is a real laser or IPL.',
};

const popularSearches = [
  { name: 'GentleMax Pro', slug: 'gentlemax-pro' },
  { name: 'Soprano ICE', slug: 'soprano-ice' },
  { name: 'LightSheer', slug: 'lightsheer-duet' },
  { name: 'SHR', slug: 'shr' },
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
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#5E8B7E',
              marginBottom: '1rem',
            }}
          >
            Equipment Database
          </p>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#2D2D2D',
              marginBottom: '1rem',
            }}
          >
            Is It a Real Laser?
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
            Search {machineCount}+ machines from Candela, Cynosure, Lumenis, and more.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-5">
            <SearchBar equipment={equipment} />
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-3" style={{ marginTop: '1.5rem' }}>
            <span
              style={{
                color: '#6B6560',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Popular
            </span>
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
                }}
                className="hover:border-[#5E8B7E] hover:text-[#5E8B7E]"
              >
                {item.name}
              </Link>
            ))}
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

      {/* Footer */}
      <footer
        style={{
          paddingTop: '1.5rem',
          paddingBottom: '1.5rem',
          borderTop: '1px solid #E8E4DF',
        }}
      >
        <p
          className="text-center"
          style={{
            fontSize: '0.75rem',
            color: '#6B6560',
            letterSpacing: '0.02em',
          }}
        >
          Informational content only — not medical advice
        </p>
      </footer>
    </main>
  );
}
