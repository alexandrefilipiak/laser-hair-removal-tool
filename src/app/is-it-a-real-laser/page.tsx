import { SearchBar } from '@/components/SearchBar';
import { EquipmentIndex } from '@/components/EquipmentIndex';
import equipmentData from '@/data/equipment.json';
import type { EquipmentEntry } from '@/lib/equipment';

// Cast imported JSON to typed array
const equipment = equipmentData as EquipmentEntry[];

export const metadata = {
  title: 'Is It a Real Laser? - Equipment Checker',
  description:
    'Search and verify laser hair removal equipment. Find out if a device is a real laser or IPL.',
};

export default function IsItARealLaserPage() {
  return (
    <main className="min-h-screen">
      {/* Search Section - centered */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Is It a Real Laser?
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Not all &ldquo;laser&rdquo; hair removal machines are actually lasers.
            Many clinics use IPL devices marketed as lasers.
            Search any device to verify.
          </p>

          {/* Search bar with equipment data */}
          <div className="mb-8">
            <SearchBar equipment={equipment} />
          </div>

          <p className="text-sm text-gray-500">
            Search by device name, brand, or technology type
          </p>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Why Equipment Verification Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Know What You&apos;re Getting</h3>
              <p className="text-gray-600">
                True lasers and IPL devices work differently. Understanding the equipment helps you make informed treatment decisions.
              </p>
            </div>
            {/* Card 2 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Classifications</h3>
              <p className="text-gray-600">
                Our database covers clinical-grade lasers, IPL devices, and emerging technologies with verified manufacturer information.
              </p>
            </div>
            {/* Card 3 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Lookup</h3>
              <p className="text-gray-600">
                Search by device name, brand, or technology. Get immediate classification results with detailed equipment information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="flex flex-col items-center">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">1</span>
              <p className="text-gray-700">Enter the device name</p>
            </div>
            <div className="hidden md:block text-gray-300 text-2xl">&rarr;</div>
            <div className="flex flex-col items-center">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">2</span>
              <p className="text-gray-700">See instant classification</p>
            </div>
            <div className="hidden md:block text-gray-300 text-2xl">&rarr;</div>
            <div className="flex flex-col items-center">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">3</span>
              <p className="text-gray-700">Make informed decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Index - full width with max-w-6xl */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <div className="w-full max-w-6xl mx-auto">
          <EquipmentIndex equipment={equipment} />
        </div>
      </section>

      {/* Footer info */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            Covering 30+ clinical devices from leading manufacturers including Candela, Cynosure, Lumenis, Alma, and more.
          </p>
          <p className="text-sm text-gray-500">
            This tool provides informational content only and is not medical advice.
          </p>
        </div>
      </section>
    </main>
  );
}
