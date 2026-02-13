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
      className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{equipment.name}</h4>
          {isMachine(equipment) && (
            <p className="text-sm text-gray-500">{equipment.manufacturer}</p>
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
