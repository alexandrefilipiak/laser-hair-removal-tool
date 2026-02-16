'use client';

import { useState } from 'react';
import type { EquipmentEntry } from '@/lib/equipment';
import { getBadgeType, isMachine } from '@/lib/equipment';
import { EquipmentCard } from './EquipmentCard';

type FilterType = 'all' | 'gold-standard' | 'established' | 'multi-purpose' | 'verify-brand' | 'ask-clinic' | 'not-laser' | 'home-devices';

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'gold-standard', label: 'Gold Standard' },
  { key: 'established', label: 'Established' },
  { key: 'multi-purpose', label: 'Multi-Purpose' },
  { key: 'verify-brand', label: 'Verify the Brand' },
  { key: 'ask-clinic', label: 'Ask Your Clinic' },
  { key: 'not-laser', label: 'Not a Laser' },
  { key: 'home-devices', label: 'Home Devices' },
];

interface EquipmentIndexProps {
  equipment: EquipmentEntry[];
}

export function EquipmentIndex({ equipment }: EquipmentIndexProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredEquipment = equipment.filter((item) => {
    if (activeFilter === 'all') return true;

    if (activeFilter === 'gold-standard') {
      return isMachine(item) && item.brandTier === 'premium-clinical';
    }

    if (activeFilter === 'established') {
      return isMachine(item) && item.brandTier === 'standard-clinical';
    }

    if (activeFilter === 'multi-purpose') {
      return getBadgeType(item) === 'multi-purpose';
    }

    if (activeFilter === 'verify-brand') {
      return getBadgeType(item) === 'verify-brand';
    }

    if (activeFilter === 'ask-clinic') {
      return getBadgeType(item) === 'ask-clinic';
    }

    if (activeFilter === 'not-laser') {
      return getBadgeType(item) === 'not-laser';
    }

    if (activeFilter === 'home-devices') {
      return getBadgeType(item) === 'home-device';
    }

    return true;
  });

  return (
    <div>
      {/* Equipment Database Section */}
      <div id="machines">
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h2
            style={{
              color: '#2D2D2D',
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              marginBottom: '0.5rem',
            }}
          >
            Equipment Database
          </h2>
          <p
            style={{
              color: '#5A5550',
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              letterSpacing: '0.01em',
            }}
          >
            Covering the most common devices used in US clinics
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: isActive ? '#5E8B7E' : '#E8E4DF',
                  backgroundColor: isActive ? '#5E8B7E' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#5A5550',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#5E8B7E';
                    e.currentTarget.style.color = '#5E8B7E';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#E8E4DF';
                    e.currentTarget.style.color = '#5A5550';
                  }
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {filteredEquipment.map((item) => (
            <EquipmentCard key={item.slug} equipment={item} />
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              color: '#5A5550',
              fontSize: '0.9rem',
              padding: '2rem',
            }}
          >
            No devices found for this filter.
          </p>
        )}
      </div>
    </div>
  );
}
