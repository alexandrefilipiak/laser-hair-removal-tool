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
      className="group block p-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
      style={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4
            className="font-semibold truncate transition-colors"
            style={{ color: '#f1f5f9' }}
          >
            {equipment.name}
          </h4>
          {isMachine(equipment) && (
            <p className="text-sm mt-0.5" style={{ color: '#94a3b8' }}>
              {equipment.manufacturer}
            </p>
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
