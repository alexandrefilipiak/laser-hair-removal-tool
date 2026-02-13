import { SearchBar } from '@/components/SearchBar';
import equipmentData from '@/data/equipment.json';
import type { EquipmentEntry } from '@/lib/equipment';

// Cast imported JSON to typed array
const equipment = equipmentData as EquipmentEntry[];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Laser Hair Removal Equipment Checker
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Instantly verify if a laser hair removal machine is a real laser or an
          IPL device. Look up any equipment by name and get clear, trustworthy
          classification to make informed decisions about your treatment.
        </p>

        {/* Search bar with equipment data */}
        <div className="mb-8">
          <SearchBar equipment={equipment} />
        </div>

        <p className="text-sm text-gray-500">
          Search by device name, brand, or technology type
        </p>
      </div>
    </main>
  );
}
