// Laser Hair Removal Glossary - Drop-in page component for LaserHairRemovalMap.com
// Route: /glossary or /laser-terms

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  getAllGlossaryTerms,
  getEquipmentLinks,
  getCategoryConfig,
  buildGlossaryAnchors,
  getAvailableLetters,
} from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Laser Hair Removal Glossary — Technical Terms Explained | Laser Hair Removal Map",
  description:
    "Plain-language definitions of laser hair removal terms: fluence, Fitzpatrick scale, selective photothermolysis, IPL, Nd:YAG, and more. Understand what your clinic is talking about.",
};

// Load data from JSON
const glossaryTerms = getAllGlossaryTerms();
const equipmentLinks = getEquipmentLinks();
const categoryConfig = getCategoryConfig();
const glossaryAnchors = buildGlossaryAnchors();
const availableLetters = getAvailableLetters();

/**
 * Process definition text and add links to glossary terms and equipment pages
 * Only links first occurrence of each term
 */
function LinkedDefinition({ text, currentTerm }: { text: string; currentTerm: string }) {
  // Track which terms we've already linked
  const linkedTerms = new Set<string>();

  // Build all linkable terms with their metadata
  type LinkInfo = {
    term: string;
    type: 'glossary' | 'equipment';
    href: string;
  };

  const allLinks: LinkInfo[] = [];

  // Get the anchor for the current term to avoid self-linking (including variations)
  const currentAnchor = glossaryAnchors[currentTerm];

  // Add glossary terms (excluding current term AND any variations that point to the same anchor)
  Object.entries(glossaryAnchors).forEach(([term, anchor]) => {
    if (anchor !== currentAnchor) {
      allLinks.push({ term, type: 'glossary', href: `#${anchor}` });
    }
  });

  // Add equipment links
  Object.entries(equipmentLinks).forEach(([name, slug]) => {
    allLinks.push({ term: name, type: 'equipment', href: `/equipment-verification-tool/${slug}` });
  });

  // Sort by term length (longest first) to match longer terms before shorter ones
  // e.g., "GentleMax Pro" before "GentleMax"
  allLinks.sort((a, b) => b.term.length - a.term.length);

  // Process the text
  const parts: ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    let earliestMatch: { index: number; link: LinkInfo; matchedText: string } | null = null;

    // Find the earliest match in the remaining text
    for (const link of allLinks) {
      // Skip if we've already linked this term
      const termKey = link.term.toLowerCase();
      if (linkedTerms.has(termKey)) continue;

      // Case-insensitive search
      const regex = new RegExp(`\\b${link.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      const match = remaining.match(regex);

      if (match && match.index !== undefined) {
        if (!earliestMatch || match.index < earliestMatch.index) {
          earliestMatch = {
            index: match.index,
            link,
            matchedText: match[0],
          };
        }
      }
    }

    if (earliestMatch) {
      // Add text before the match
      if (earliestMatch.index > 0) {
        parts.push(remaining.slice(0, earliestMatch.index));
      }

      // Add the linked term
      const { link, matchedText } = earliestMatch;
      linkedTerms.add(link.term.toLowerCase());

      if (link.type === 'glossary') {
        parts.push(
          <a
            key={keyIndex++}
            href={link.href}
            className="text-gray-900 underline decoration-gray-300 decoration-dotted underline-offset-2 transition-colors hover:decoration-gray-500"
          >
            {matchedText}
          </a>
        );
      } else {
        parts.push(
          <Link
            key={keyIndex++}
            href={link.href}
            className="text-[#5E8B7E] underline decoration-[#5E8B7E]/40 underline-offset-2 transition-colors hover:decoration-[#5E8B7E]"
          >
            {matchedText}
          </Link>
        );
      }

      // Continue with the rest of the text
      remaining = remaining.slice(earliestMatch.index + matchedText.length);
    } else {
      // No more matches, add the rest of the text
      parts.push(remaining);
      break;
    }
  }

  return <>{parts}</>;
}

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Back to Home */}
      <nav className="mx-auto max-w-3xl px-3 pt-8 sm:px-6 sm:pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base transition-colors hover:text-[#5E8B7E]"
          style={{ color: '#5A5550' }}
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
          <span style={{ letterSpacing: '0.02em' }}>
            Back to Home
          </span>
        </Link>
      </nav>

      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-3xl px-3 py-8 text-center sm:px-6 sm:py-12">
          <p className="mb-2 text-base font-medium uppercase tracking-widest text-gray-400 sm:mb-3">
            Reference
          </p>
          <h1 className="mb-3 text-xl font-bold tracking-tight text-gray-900 sm:mb-4 sm:text-4xl md:text-5xl">
            Laser Hair Removal Glossary
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-500 sm:text-lg">
            Technical terms explained in plain language. Know what your clinic
            is talking about.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:mt-8 sm:gap-2">
            {Object.entries(categoryConfig).map(([key, { label, color }]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2 py-0.5 text-base font-medium text-gray-600 sm:gap-1.5 sm:px-3 sm:py-1"
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
                  style={{ backgroundColor: color }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary List */}
      <section className="mx-auto max-w-3xl px-3 py-6 sm:px-6 sm:py-12">
        {/* Alphabet quick nav */}
        <nav className="mb-6 flex flex-wrap justify-center gap-0.5 border-b border-gray-100 pb-4 sm:mb-10 sm:justify-start sm:gap-1 sm:pb-6">
          {availableLetters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="flex h-8 w-8 items-center justify-center rounded-md text-base font-medium text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:h-10 sm:w-10"
            >
              {letter}
            </a>
          ))}
        </nav>

        {/* Terms grouped by letter */}
        <div className="space-y-2">
          {availableLetters.map((letter) => (
            <div key={letter} id={`letter-${letter}`}>
              <div className="sticky top-0 z-10 -mx-2 mb-3 bg-white/95 px-2 py-2 backdrop-blur-sm">
                <span className="text-2xl font-bold text-gray-900">
                  {letter}
                </span>
              </div>
              <div className="mb-8 space-y-6">
                {glossaryTerms
                  .filter((t) => t.term[0].toUpperCase() === letter)
                  .map((item) => {
                    const cat = categoryConfig[item.category];
                    return (
                      <article
                        key={item.term}
                        id={item.term
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")}
                        className="group rounded-xl border border-gray-100 bg-white px-3 py-3 transition-shadow hover:shadow-md sm:px-6 sm:py-5"
                      >
                        <div className="mb-2 flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                          <div className="order-2 sm:order-1">
                            <h2 className="text-base font-semibold text-gray-900 sm:text-xl">
                              {item.term}
                            </h2>
                            {item.aka && (
                              <p className="mt-0.5 text-base text-gray-500">
                                Also known as: {item.aka}
                              </p>
                            )}
                          </div>
                          {cat && (
                            <span
                              className="order-1 w-fit shrink-0 rounded-full px-2 py-0.5 text-base font-medium text-white sm:order-2 sm:mt-1 sm:px-2.5"
                              style={{ backgroundColor: cat.color }}
                            >
                              {cat.label}
                            </span>
                          )}
                        </div>
                        <p className="text-base leading-relaxed text-gray-600">
                          <LinkedDefinition text={item.definition} currentTerm={item.term} />
                        </p>
                      </article>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-3xl px-3 py-6 text-center sm:px-6 sm:py-12">
          <p className="text-base text-gray-500">
            Missing a term?{" "}
            <a href="/glossary/contact" className="font-medium text-gray-900 underline underline-offset-2">
              Let us know
            </a>{" "}
            and we&apos;ll add it.
          </p>
          <p className="mt-6 text-base text-gray-400">
            For informational purposes only. Not medical advice.
          </p>
        </div>
      </section>
    </main>
  );
}
