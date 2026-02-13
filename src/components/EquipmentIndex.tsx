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
    <div>
      {/* Machines Section */}
      <div style={{ marginBottom: '3rem' }}>
        <div className="flex items-center gap-3 mb-5">
          <h2 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 600 }}>
            Machines
          </h2>
          <span style={{
            backgroundColor: '#1e293b',
            color: '#94a3b8',
            fontSize: '0.75rem',
            padding: '0.25rem 0.625rem',
            borderRadius: '9999px'
          }}>
            {machines.length}
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '0.75rem'
        }}>
          {machines.map((machine) => (
            <EquipmentCard key={machine.slug} equipment={machine} />
          ))}
        </div>
      </div>

      {/* Technology Terms Section */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <h2 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 600 }}>
            Technology Terms
          </h2>
          <span style={{
            backgroundColor: '#1e293b',
            color: '#94a3b8',
            fontSize: '0.75rem',
            padding: '0.25rem 0.625rem',
            borderRadius: '9999px'
          }}>
            {terms.length}
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '0.75rem'
        }}>
          {terms.map((term) => (
            <EquipmentCard key={term.slug} equipment={term} />
          ))}
        </div>
      </div>
    </div>
  );
}
