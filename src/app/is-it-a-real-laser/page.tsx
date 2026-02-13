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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section style={{ backgroundColor: '#1e293b' }} className="text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full text-sm border" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.1)', color: '#93c5fd' }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4ade80' }} />
            Free verification tool
          </div>

          {/* Title */}
          <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1 }} className="sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-white">
            Is It a <span style={{ color: '#60a5fa' }}>Real Laser</span>?
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto" style={{ color: '#cbd5e1' }}>
            Many clinics use IPL devices marketed as &ldquo;lasers.&rdquo;
            Search any device to find out the truth.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar equipment={equipment} />
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span style={{ color: '#94a3b8' }}>Try:</span>
            {popularSearches.map((item) => (
              <Link
                key={item.slug}
                href={`/is-it-a-real-laser/${item.slug}`}
                className="px-3 py-1.5 rounded-full transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#e2e8f0' }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ backgroundColor: '#334155', borderTopColor: '#475569' }} className="border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-sm" style={{ color: '#cbd5e1' }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: '#4ade80' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span><strong className="text-white">{machineCount}+</strong> devices</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: '#60a5fa' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
              </svg>
              <span>Candela, Cynosure, Lumenis & more</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: '#facc15' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span>Instant results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            What You&apos;ll Learn
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div style={{ width: '56px', height: '56px' }} className="bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg style={{ width: '28px', height: '28px' }} className="text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Laser or IPL?</h3>
              <p className="text-gray-600">
                Instantly see if a device uses true laser technology or intense pulsed light.
              </p>
            </div>
            <div className="text-center">
              <div style={{ width: '56px', height: '56px' }} className="bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg style={{ width: '28px', height: '28px' }} className="text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Brand & Specs</h3>
              <p className="text-gray-600">
                View manufacturer details, wavelengths, and technology specifications.
              </p>
            </div>
            <div className="text-center">
              <div style={{ width: '56px', height: '56px' }} className="bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg style={{ width: '28px', height: '28px' }} className="text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Skin Type Info</h3>
              <p className="text-gray-600">
                Learn which Fitzpatrick skin types each device is designed for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Index */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <EquipmentIndex equipment={equipment} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            This tool provides informational content only and is not medical advice.
          </p>
        </div>
      </footer>
    </main>
  );
}
