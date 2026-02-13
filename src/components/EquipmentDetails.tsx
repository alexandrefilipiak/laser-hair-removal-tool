/**
 * Equipment details component
 *
 * Full layout for displaying machine information including
 * classification badge, specifications, and disclaimer.
 */

import type { MachineEntry } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { BrandTierBadge } from './BrandTierBadge';
import { Disclaimer } from './Disclaimer';

interface EquipmentDetailsProps {
  equipment: MachineEntry;
}

/**
 * Full machine detail layout
 *
 * Displays all classification layers and specifications
 * in a mobile-first responsive design.
 */
export function EquipmentDetails({ equipment }: EquipmentDetailsProps) {
  const {
    name,
    manufacturer,
    technologyType,
    wavelengths,
    brandTier,
    skinTypes,
    purposeBuilt,
    coolingMethod,
    notes,
  } = equipment;

  return (
    <article className="mx-auto max-w-2xl px-4 py-6 md:py-8">
      {/* Classification Badge - prominent, centered */}
      <div className="mb-6 flex justify-center">
        <ClassificationBadge technologyType={technologyType} isRealLaser={null} />
      </div>

      {/* Machine Name and Manufacturer */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{name}</h1>
        <p className="mt-1 text-base text-gray-600 md:text-lg">{manufacturer}</p>
      </header>

      {/* Info Grid */}
      <dl className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {/* Brand Tier */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <dt className="text-sm font-medium text-gray-500">Brand Tier</dt>
          <dd className="mt-1">
            <BrandTierBadge tier={brandTier} />
          </dd>
        </div>

        {/* Purpose */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <dt className="text-sm font-medium text-gray-500">Purpose</dt>
          <dd className="mt-1 text-sm text-gray-900 md:text-base">
            {purposeBuilt ? 'Purpose-built for hair removal' : 'Multi-purpose platform'}
          </dd>
        </div>

        {/* Technology */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <dt className="text-sm font-medium text-gray-500">Technology</dt>
          <dd className="mt-1 text-sm text-gray-900 md:text-base">
            {technologyType.charAt(0).toUpperCase() + technologyType.slice(1)}
            {technologyType === 'laser' ? ' laser' : ''}
          </dd>
        </div>

        {/* Wavelengths */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <dt className="text-sm font-medium text-gray-500">Wavelengths</dt>
          <dd className="mt-1 text-sm text-gray-900 md:text-base">
            {wavelengths.length > 0 ? wavelengths.join(', ') : 'Not specified'}
          </dd>
        </div>

        {/* Skin Types */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <dt className="text-sm font-medium text-gray-500">Skin Types</dt>
          <dd className="mt-1 text-sm text-gray-900 md:text-base">
            {skinTypes.displayText}
          </dd>
        </div>

        {/* Cooling */}
        <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <dt className="text-sm font-medium text-gray-500">Cooling</dt>
          <dd className="mt-1 text-sm text-gray-900 md:text-base">
            {coolingMethod
              ? coolingMethod.charAt(0).toUpperCase() + coolingMethod.slice(1)
              : 'Not specified'}
          </dd>
        </div>
      </dl>

      {/* Notes section */}
      {notes && (
        <section className="mt-6">
          <h2 className="text-sm font-medium text-gray-500">Notes</h2>
          <p className="mt-2 text-sm text-gray-700 md:text-base">{notes}</p>
        </section>
      )}

      {/* Disclaimer */}
      <Disclaimer />
    </article>
  );
}
