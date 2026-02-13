import { SearchBar } from '@/components/SearchBar';
import { EquipmentIndex } from '@/components/EquipmentIndex';
import equipmentData from '@/data/equipment.json';
import type { EquipmentEntry } from '@/lib/equipment';
import Link from 'next/link';

// Cast imported JSON to typed array
const equipment = equipmentData as EquipmentEntry[];

// Get machine count for stats
const machineCount = equipment.filter(e => e.type === 'machine').length;

export const metadata = {
  title: 'Is It a Real Laser? - Equipment Checker',
  description:
    'Search and verify laser hair removal equipment. Find out if a device is a real laser or IPL.',
};

// Popular searches for quick access
const popularSearches = [
  { name: 'GentleMax Pro', slug: 'gentlemax-pro' },
  { name: 'Soprano ICE', slug: 'soprano-ice' },
  { name: 'LightSheer', slug: 'lightsheer-duet' },
  { name: 'SHR', slug: 'shr' },
];

export default function IsItARealLaserPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Search Section */}
      <section className="relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]" />

        <div className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="max-w-3xl mx-auto">
            {/* Eyebrow */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Free equipment verification tool
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Is It a Real Laser?
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 text-center mb-10 max-w-2xl mx-auto leading-relaxed">
              Many clinics use IPL devices marketed as &ldquo;lasers.&rdquo;
              <br className="hidden sm:block" />
              <span className="text-gray-900 font-medium">Search any device to verify instantly.</span>
            </p>

            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar equipment={equipment} />
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-gray-500">Popular:</span>
              {popularSearches.map((item) => (
                <Link
                  key={item.slug}
                  href={`/is-it-a-real-laser/${item.slug}`}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-gray-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong className="text-gray-900">{machineCount}+</strong> devices verified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Candela, Cynosure, Lumenis, Alma & more</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Instant results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props - Compact Cards */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Classification</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Instantly see if a device is a real laser, IPL, or hybrid technology. No guesswork.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Data</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Manufacturer specs, wavelengths, and technology types from official sources.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Skin Type Info</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Learn which Fitzpatrick skin types each device is designed to treat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Index */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <EquipmentIndex equipment={equipment} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-sm text-gray-500">
            This tool provides informational content only and is not medical advice.
            <br />
            Always consult with a qualified professional for treatment decisions.
          </p>
        </div>
      </footer>
    </main>
  );
}
