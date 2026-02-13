import Link from 'next/link';
import type { EquipmentEntry } from '@/lib/equipment';
import { isMachine } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';

interface EquipmentCardProps {
  equipment: EquipmentEntry;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <Link
      href={`/is-it-a-real-laser/${equipment.slug}`}
      className="group block p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {equipment.name}
          </h4>
          {isMachine(equipment) && (
            <p className="text-sm text-gray-500 mt-0.5">{equipment.manufacturer}</p>
          )}
        </div>
        <div className="flex-shrink-0">
          <ClassificationBadge
            technologyType={isMachine(equipment) ? equipment.technologyType : undefined}
            isRealLaser={!isMachine(equipment) ? equipment.isRealLaser : null}
            size="small"
          />
        </div>
      </div>
    </Link>
  );
}
