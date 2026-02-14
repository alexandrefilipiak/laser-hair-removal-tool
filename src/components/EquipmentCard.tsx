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
      className="group block p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E8E4DF',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4
            className="font-semibold transition-colors group-hover:text-[#5E8B7E]"
            style={{ color: '#2D2D2D', lineHeight: 1.3 }}
          >
            {equipment.name}
          </h4>
          {isMachine(equipment) && (
            <p
              className="text-sm mt-0.5"
              style={{
                color: '#6B6560',
                fontSize: '0.75rem',
              }}
            >
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
