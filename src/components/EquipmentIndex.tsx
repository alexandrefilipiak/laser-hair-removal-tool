import type { EquipmentEntry } from '@/lib/equipment';
import { isMachine, isTechnologyTerm } from '@/lib/equipment';
import { EquipmentCard } from './EquipmentCard';

interface EquipmentIndexProps {
  equipment: EquipmentEntry[];
}

export function EquipmentIndex({ equipment }: EquipmentIndexProps) {
  const machines = equipment.filter(isMachine);
  const terms = equipment.filter(isTechnologyTerm);

  return (
    <section className="pt-8">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Browse All Equipment
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore our database of verified laser and IPL devices
        </p>
      </div>

      {/* Machines Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Machines
          </h3>
          <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
            {machines.length}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {machines.map((machine) => (
            <EquipmentCard key={machine.slug} equipment={machine} />
          ))}
        </div>
      </div>

      {/* Technology Terms Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Technology Terms
          </h3>
          <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
            {terms.length}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {terms.map((term) => (
            <EquipmentCard key={term.slug} equipment={term} />
          ))}
        </div>
      </div>
    </section>
  );
}
