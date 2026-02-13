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
    <section className="mt-16 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Browse All Equipment
      </h2>

      {/* Machines Section */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Machines ({machines.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {machines.map((machine) => (
            <EquipmentCard key={machine.slug} equipment={machine} />
          ))}
        </div>
      </div>

      {/* Technology Terms Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Technology Terms ({terms.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {terms.map((term) => (
            <EquipmentCard key={term.slug} equipment={term} />
          ))}
        </div>
      </div>
    </section>
  );
}
