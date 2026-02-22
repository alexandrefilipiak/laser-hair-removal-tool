import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { getEquipmentStats } from '@/lib/equipment';
import { getGlossaryStats } from '@/lib/glossary';

export default function Home() {
  const equipmentStats = getEquipmentStats();
  const glossaryStats = getGlossaryStats();

  return (
    <main className="min-h-screen bg-[#FAF9F7]">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <p className="mb-4 mt-4 text-base font-medium uppercase tracking-[0.2em] text-[#5E8B7E] sm:mb-6 sm:mt-0">
            Independent Consumer Resource
          </p>

          {/* Main headline */}
          <h1 className="mb-4 font-[family-name:var(--font-dm-sans)] text-3xl font-semibold leading-tight tracking-tight text-[#2D2D2D] sm:mb-6 sm:text-5xl md:text-6xl">
            Make Informed Decisions About
            <br className="hidden sm:block" />{' '}
            <span className="text-[#5E8B7E]">Laser Hair Removal</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-[#5A5550] sm:mb-12 sm:text-lg md:text-xl">
            Free tools to help you verify clinic equipment, understand technical
            terms, and know what questions to ask before your treatment.
          </p>

        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 md:pb-32">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 sm:gap-8">
          {/* Equipment Verification Card */}
          <Link
            href="/equipment-verification-tool"
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#5E8B7E]/30 hover:shadow-lg sm:p-8"
          >
            {/* Icon */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#5E8B7E]/10 sm:mb-6 sm:h-14 sm:w-14">
              <svg
                className="h-6 w-6 text-[#5E8B7E] sm:h-7 sm:w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>

            {/* Content */}
            <h2 className="mb-2 font-[family-name:var(--font-dm-sans)] text-xl font-semibold text-[#2D2D2D] sm:mb-3 sm:text-2xl">
              Equipment Verification
            </h2>
            <p className="mb-4 text-base leading-relaxed text-[#5A5550] sm:mb-6">
              Is your clinic using a real laser or IPL? Search{' '}
              {equipmentStats.machineCount} machines from{' '}
              {equipmentStats.manufacturerCount} manufacturers to verify their
              equipment.
            </p>

            {/* CTA */}
            <span className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#5E8B7E] px-4 text-sm font-semibold text-white shadow-md shadow-[#5E8B7E]/25 transition-all duration-200 group-hover:bg-[#4A7566] group-hover:shadow-lg group-hover:shadow-[#5E8B7E]/30 sm:h-11 sm:px-5 sm:text-base">
              Verify Equipment
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>

            {/* Hover gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5E8B7E]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>

          {/* Glossary Card */}
          <Link
            href="/glossary"
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#5E8B7E]/30 hover:shadow-lg sm:p-8"
          >
            {/* Icon */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#5E8B7E]/10 sm:mb-6 sm:h-14 sm:w-14">
              <svg
                className="h-6 w-6 text-[#5E8B7E] sm:h-7 sm:w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>

            {/* Content */}
            <h2 className="mb-2 font-[family-name:var(--font-dm-sans)] text-xl font-semibold text-[#2D2D2D] sm:mb-3 sm:text-2xl">
              Technical Glossary
            </h2>
            <p className="mb-4 text-base leading-relaxed text-[#5A5550] sm:mb-6">
              Understand what your clinic is talking about.{' '}
              {glossaryStats.termCount} terms explained in plain language, from
              fluence to Fitzpatrick scale.
            </p>

            {/* CTA */}
            <span className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#5E8B7E] px-4 text-sm font-semibold text-white shadow-md shadow-[#5E8B7E]/25 transition-all duration-200 group-hover:bg-[#4A7566] group-hover:shadow-lg group-hover:shadow-[#5E8B7E]/30 sm:h-11 sm:px-5 sm:text-base">
              Browse Glossary
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>

            {/* Hover gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5E8B7E]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>

        {/* Trust badge */}
        <div className="mx-auto mt-12 max-w-md text-center sm:mt-16">
          <p className="text-base text-[#5A5550]">
            <span className="font-medium text-[#2D2D2D]">100% free</span> — no
            sign-up required. We don&apos;t sell treatments or recommend
            clinics.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
