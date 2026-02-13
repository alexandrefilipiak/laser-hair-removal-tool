/**
 * Equipment not found page
 *
 * Custom 404 page for unknown equipment slugs.
 * Provides helpful guidance to ask clinics about their equipment
 * and shows popular equipment suggestions to help users discover
 * known machines in our database.
 */

import Link from 'next/link';
import { getAllEquipment, isMachine } from '@/lib/equipment';

export default function EquipmentNotFound() {
  // Get popular machines for suggestions
  // We use a static list since we can't access the slug in not-found.tsx
  const allEquipment = getAllEquipment();
  const machines = allEquipment.filter(isMachine);
  // Get a diverse sample - first 4 machines (sorted by manufacturer in JSON)
  const suggestions = machines.slice(0, 4);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
        Equipment Not Found
      </h1>

      <p className="mb-6 text-base text-gray-600 md:text-lg">
        We don&apos;t have this equipment in our database yet.
      </p>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-6">
        <p className="text-base font-semibold text-blue-800 md:text-lg">
          Ask your clinic what brand and model they use
        </p>
        <p className="mt-2 text-sm text-blue-700 md:text-base">
          Reputable clinics will tell you the exact equipment brand (like Candela,
          Lumenis, or Cynosure). If they can&apos;t or won&apos;t tell you, that&apos;s a red
          flag.
        </p>
      </div>

      {/* Popular equipment suggestions */}
      {suggestions.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Browse popular equipment:
          </p>
          <ul className="space-y-2">
            {suggestions.map((machine) => (
              <li key={machine.slug}>
                <Link
                  href={`/is-it-a-real-laser/${machine.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {machine.name}
                  <span className="text-gray-500 font-normal"> by {machine.manufacturer}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href="/is-it-a-real-laser"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 md:text-base"
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
    </div>
  );
}
