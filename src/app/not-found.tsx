/**
 * Global 404 page
 *
 * Handles all not-found routes. Shows equipment-specific messaging
 * with popular equipment suggestions when the path is under /equipment-verification-tool/.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAllEquipment, isMachine } from '@/lib/equipment';

// Get popular machines for suggestions (computed once at module load)
const allEquipment = getAllEquipment();
const popularMachines = allEquipment.filter(isMachine).slice(0, 4);

export default function NotFound() {
  const pathname = usePathname();
  const isEquipmentRoute = pathname?.startsWith('/equipment-verification-tool/');

  if (isEquipmentRoute) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Equipment Not Found
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mb-6">
            We don&apos;t have this equipment in our database yet.
          </p>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 sm:p-6">
            <p className="text-base sm:text-lg font-semibold text-blue-800">
              Ask your clinic what brand and model they use
            </p>
            <p className="mt-2 text-sm sm:text-base text-blue-700">
              Reputable clinics will tell you the exact equipment brand (like
              Candela, Lumenis, or Cynosure). If they can&apos;t or won&apos;t
              tell you, that&apos;s a red flag.
            </p>
          </div>

          {/* Popular equipment suggestions */}
          {popularMachines.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Browse popular equipment:
              </p>
              <ul className="space-y-2">
                {popularMachines.map((machine) => (
                  <li key={machine.slug}>
                    <Link
                      href={`/equipment-verification-tool/${machine.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {machine.name}
                      <span className="text-gray-500 font-normal">
                        {' '}
                        by {machine.manufacturer}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href="/equipment-verification-tool"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm sm:text-base font-medium text-white transition-colors hover:bg-gray-700"
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
      </main>
    );
  }

  // Generic 404 for other routes
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>

        <p className="text-base sm:text-lg text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm sm:text-base font-medium text-white transition-colors hover:bg-gray-700"
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
          Back to Home
        </Link>
      </div>
    </main>
  );
}
