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
      <div style={{ marginBottom: '3.5rem' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: '1.25rem' }}>
          <h2
            id="machines"
            style={{
              color: '#2D2D2D',
              fontSize: '1.125rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
            }}
          >
            Machines
          </h2>
          <span
            style={{
              backgroundColor: 'rgba(94, 139, 126, 0.1)',
              color: '#5E8B7E',
              fontSize: '0.7rem',
              fontWeight: 500,
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              border: '1px solid rgba(94, 139, 126, 0.2)',
            }}
          >
            {machines.length}
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {machines.map((machine) => (
            <EquipmentCard key={machine.slug} equipment={machine} />
          ))}
        </div>
      </div>

      {/* Technology Terms Section */}
      <div>
        <div className="flex items-center gap-3" style={{ marginBottom: '1.25rem' }}>
          <h2
            style={{
              color: '#2D2D2D',
              fontSize: '1.125rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
            }}
          >
            Technology Terms
          </h2>
          <span
            style={{
              backgroundColor: 'rgba(94, 139, 126, 0.1)',
              color: '#5E8B7E',
              fontSize: '0.7rem',
              fontWeight: 500,
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              border: '1px solid rgba(94, 139, 126, 0.2)',
            }}
          >
            {terms.length}
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {terms.map((term) => (
            <EquipmentCard key={term.slug} equipment={term} />
          ))}
        </div>
      </div>
    </div>
  );
}
