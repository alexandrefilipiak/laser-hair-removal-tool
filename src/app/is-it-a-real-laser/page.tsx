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
    <main style={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ borderBottom: '1px solid #1e293b' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          {/* Title */}
          <h1 className="font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1.1, color: '#f8fafc' }}>
            Is It a <span style={{ color: '#3b82f6' }}>Real Laser</span>?
          </h1>

          {/* Subtitle */}
          <p className="mb-8 max-w-2xl mx-auto" style={{ fontSize: '1.125rem', color: '#94a3b8' }}>
            Verify any hair removal device instantly. Search {machineCount}+ machines from Candela, Cynosure, Lumenis, and more.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-6">
            <SearchBar equipment={equipment} />
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Try:</span>
            {popularSearches.map((item) => (
              <Link
                key={item.slug}
                href={`/is-it-a-real-laser/${item.slug}`}
                style={{
                  backgroundColor: '#1e293b',
                  color: '#cbd5e1',
                  fontSize: '0.875rem',
                  padding: '0.375rem 0.875rem',
                  borderRadius: '9999px',
                  border: '1px solid #334155',
                  transition: 'all 0.15s'
                }}
                className="hover:bg-[#334155] hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Database */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <EquipmentIndex equipment={equipment} />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e293b', padding: '1.5rem 0' }}>
        <p className="text-center" style={{ fontSize: '0.75rem', color: '#64748b' }}>
          Informational content only — not medical advice
        </p>
      </footer>
    </main>
  );
}
