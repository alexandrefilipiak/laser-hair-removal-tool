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
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Section - centered */}
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Is It a Real Laser?
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Search for any laser hair removal device to find out if it&apos;s a
          real laser or an IPL device.
        </p>

        {/* Search bar with equipment data */}
        <div className="mb-8">
          <SearchBar equipment={equipment} />
        </div>

        <p className="text-sm text-gray-500">
          Search by device name, brand, or technology type
        </p>
      </div>

      {/* Equipment Index - full width with max-w-6xl */}
      <div className="w-full max-w-6xl mx-auto">
        <EquipmentIndex equipment={equipment} />
      </div>
    </main>
  );
}
