import Link from 'next/link';
import type { EquipmentEntry } from '@/lib/equipment';
import { isMachine, getBadgeType } from '@/lib/equipment';
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
      <div className="flex flex-col gap-3">
        <div>
          <h4
            className="font-semibold transition-colors group-hover:text-[#5E8B7E]"
            style={{ color: '#2D2D2D', lineHeight: 1.3 }}
          >
            {equipment.name}
          </h4>
          {isMachine(equipment) && (
            <p
              className="mt-0.5"
              style={{
                color: '#5A5550',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
              }}
            >
              {equipment.brandTier === 'premium-clinical' && '🥇 '}
              {equipment.manufacturer}
            </p>
          )}
        </div>
        <div>
          <ClassificationBadge badgeType={getBadgeType(equipment)} />
        </div>
      </div>
    </Link>
  );
}
