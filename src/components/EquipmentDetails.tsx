/**
 * Equipment details component
 *
 * Full layout for displaying machine information including
 * classification badge, specifications, rich content, and disclaimer.
 */

import Link from 'next/link';
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
 * Displays all classification layers, specifications, and rich content
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
    richContent,
  } = equipment;

  return (
    <article className="mx-auto max-w-2xl px-4 py-6 md:py-8">
      {/* Back to search link */}
      <nav className="mb-6">
        <Link
          href="/is-it-a-real-laser"
          className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Search Equipment
        </Link>
      </nav>

      {/* Classification Badge - prominent, centered */}
      <div className="mb-6 flex justify-center">
        <ClassificationBadge technologyType={technologyType} isRealLaser={null} />
      </div>

      {/* Machine Name and Manufacturer */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{name}</h1>
        <p className="mt-1 text-base text-gray-600 md:text-lg">{manufacturer}</p>
      </header>

      {/* Rich Content - Overview */}
      {richContent && (
        <section className="mb-8 space-y-6">
          {/* Overview */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
            <p className="mt-2 text-gray-700 leading-relaxed">{richContent.overview}</p>
          </div>

          {/* How It Works */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">How It Works</h2>
            <p className="mt-2 text-gray-700 leading-relaxed">{richContent.howItWorks}</p>
          </div>

          {/* Typical Uses */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Typical Uses</h2>
            <p className="mt-2 text-gray-700 leading-relaxed">{richContent.typicalUses}</p>
          </div>

          {/* Key Features */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
            <p className="mt-2 text-gray-700 leading-relaxed">{richContent.keyFeatures}</p>
          </div>
        </section>
      )}

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
