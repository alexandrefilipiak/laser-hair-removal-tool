/**
 * Technology term details component
 *
 * Layout for displaying technology term information including
 * classification, explanation, and guidance.
 */

import Link from 'next/link';
import type { TechnologyTermEntry } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { Disclaimer } from './Disclaimer';

interface TechnologyTermDetailsProps {
  term: TechnologyTermEntry;
}

/**
 * Full technology term detail layout
 *
 * Different from machine details - focuses on explanation
 * rather than specifications.
 */
export function TechnologyTermDetails({ term }: TechnologyTermDetailsProps) {
  const { name, isRealLaser, whatItIs, whyItMatters, askYourClinic } = term;

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
        <ClassificationBadge isRealLaser={isRealLaser} />
      </div>

      {/* Term Name */}
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{name}</h1>
      </header>

      {/* Disclaimer - subtle inline notice */}
      <div className="mb-8 flex justify-center">
        <Disclaimer />
      </div>

      {/* What It Is - prominent paragraph */}
      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-800 md:text-xl">
          What It Is
        </h2>
        <p className="text-base leading-relaxed text-gray-700 md:text-lg">
          {whatItIs}
        </p>
      </section>

      {/* Why It Matters - explanatory section */}
      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-800 md:text-xl">
          Why It Matters
        </h2>
        <p className="text-sm leading-relaxed text-gray-600 md:text-base">
          {whyItMatters}
        </p>
      </section>

      {/* Ask Your Clinic - highlight box if present */}
      {askYourClinic && (
        <section className="rounded-lg border border-blue-200 bg-blue-50 p-4 md:p-6">
          <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-blue-800 md:text-lg">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Ask Your Clinic
          </h2>
          <p className="text-sm text-blue-700 md:text-base">{askYourClinic}</p>
        </section>
      )}
    </article>
  );
}
