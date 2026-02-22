// Laser Hair Removal Glossary - Drop-in page component for LaserHairRemovalMap.com
// Route: /glossary or /laser-terms

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Laser Hair Removal Glossary — Technical Terms Explained | Laser Hair Removal Map",
  description:
    "Plain-language definitions of laser hair removal terms: fluence, Fitzpatrick scale, selective photothermolysis, IPL, Nd:YAG, and more. Understand what your clinic is talking about.",
};

// Equipment name to slug mapping for machines mentioned in definitions
const equipmentLinks: Record<string, string> = {
  "GentleLase": "gentlelase",
  "GentleMax Pro": "gentlemax-pro",
  "GentleMax": "gentlemax",
  "GentleYAG": "gentleyag",
  "LightSheer": "lightsheer",
  "Soprano": "soprano-titanium",
  "Alma Soprano": "soprano-titanium",
  "Clarity II": "clarity-ii",
  "Lumenis M22": "nordlys", // M22 redirects to Nordlys as similar platform
  "Forever Bare BBL": "forever-bare-bbl",
};

const glossaryTerms = [
  {
    term: "Alexandrite Laser",
    aka: "755nm laser",
    definition:
      "A laser that emits light at 755nm wavelength. Highly effective for hair removal on lighter skin tones (Fitzpatrick I–IV). Found in machines like the Candela GentleLase and GentleMax Pro.",
    category: "technology",
  },
  {
    term: "Anagen",
    aka: "growth phase",
    definition:
      "The active growth phase of the hair cycle. This is the only phase during which laser hair removal is effective, because the follicle contains the most melanin and is connected to the dermal papilla. At any given time, only 20–30% of hair follicles are in anagen, which is why multiple sessions are needed.",
    category: "biology",
  },
  {
    term: "BBL",
    aka: "BroadBand Light",
    definition:
      "Sciton's branded clinical IPL technology. Used in devices like the BBL HERO and BBL HEROic. Not a laser, but a clinical-grade light-based system capable of effective hair removal. The 'Forever Bare BBL' mode uses multiple low-fluence pulses at high repetition rates.",
    category: "technology",
  },
  {
    term: "Catagen",
    aka: "regression phase",
    definition:
      "The transitional phase where the hair follicle shrinks and detaches from the dermal papilla. Home devices with low fluence tend to push follicles into catagen rather than destroying them, which is why results from home devices are temporary and require ongoing maintenance.",
    category: "biology",
  },
  {
    term: "Chromophore",
    definition:
      "A molecule that absorbs specific wavelengths of light. In laser hair removal, the target chromophore is melanin in the hair follicle. Different chromophores (melanin, hemoglobin, water) absorb different wavelengths, which is why laser selection matters for each treatment type.",
    category: "science",
  },
  {
    term: "Clinical-Grade",
    definition:
      "Equipment designed for use by trained professionals in medical or aesthetic settings. Clinical-grade devices operate at significantly higher fluences (typically 15–60+ J/cm²) compared to home devices (3–10 J/cm²). This power difference is what enables permanent follicular destruction rather than temporary hair reduction.",
    category: "equipment",
  },
  {
    term: "Dermal Papilla",
    definition:
      "A small, nipple-like structure at the base of the hair follicle containing blood vessels and specialized cells that regulate hair growth. During anagen, the follicle is connected to the dermal papilla, which supplies nutrients for hair production. Laser hair removal aims to damage the dermal papilla to prevent future hair regrowth. During catagen and telogen, the follicle detaches from the dermal papilla, which is why laser treatment is less effective during these phases.",
    category: "biology",
  },
  {
    term: "Diode Laser",
    aka: "810nm laser",
    definition:
      "A semiconductor laser typically emitting at 808–810nm. The most common laser type for hair removal worldwide. Works across a wide range of skin tones. Found in machines like the Lumenis LightSheer, Alma Soprano, and many others.",
    category: "technology",
  },
  {
    term: "DPL",
    aka: "Dynamic Pulse Light",
    definition:
      "A generic IPL marketing term with no standardized technical specification. Often associated with unbranded or low-cost IPL machines. If a clinic says they use 'DPL', ask which specific machine brand and model they have.",
    category: "technology",
  },
  {
    term: "E-Light",
    definition:
      "A technology combining IPL with radiofrequency (RF) energy. Often found in inexpensive, unbranded machines. The term has no standardized specification and is frequently associated with low-cost devices. Ask your clinic for the specific brand and model.",
    category: "technology",
  },
  {
    term: "Fitzpatrick Scale",
    aka: "skin phototype",
    definition:
      "A six-level classification system (I–VI) for skin color and its response to UV exposure. Type I is very fair skin that always burns under the sun; Type VI is deeply pigmented skin that never burns under the sun. Your Fitzpatrick type determines which laser wavelength is safest and most effective for you. Alexandrite (755nm) works best for I–IV; Nd:YAG (1064nm) is safest for V–VI.",
    category: "science",
  },
  {
    term: "Fluence",
    aka: "energy density",
    definition:
      "The amount of laser energy delivered per unit area, measured in joules per square centimeter (J/cm²). Higher fluence generally means more effective treatment but also more risk if used incorrectly. Clinical lasers typically operate at 15–60+ J/cm²; home devices at 3–10 J/cm². This is the single biggest difference between professional and home treatments.",
    category: "science",
  },
  {
    term: "Folliculitis",
    definition:
      "Inflammation or infection of hair follicles that can occur after laser treatment. Appears as red, bumpy, itchy spots days after treatment. Caused by bacteria entering compromised follicles, often triggered by hot showers, sweating, or tight clothing too soon after treatment. Not the same as perifollicular edema.",
    category: "side-effects",
  },
  {
    term: "Hair Follicle",
    definition:
      "The small tunnel-shaped structure in the skin from which hair grows. Each follicle contains a hair shaft, sebaceous gland, and the dermal papilla at its base. Laser hair removal targets the melanin within the follicle, heating it to damage the structures responsible for hair growth. The follicle cycles through three phases: anagen (growth), catagen (transition), and telogen (rest). Laser treatment is only effective during anagen when the follicle is active and contains the most melanin.",
    category: "biology",
  },
  {
    term: "IPL",
    aka: "Intense Pulsed Light",
    definition:
      "A broad-spectrum light technology (typically 400–1200nm) that is not a laser. Clinical IPL systems from established manufacturers (like Forever Bare BBL, Lumenis M22) can be effective for hair removal, though comparative studies generally show lower reduction rates than diode lasers. The term 'IPL' alone doesn't indicate quality: there's a massive gap between a premium Forever Bare BBL and an unbranded device.",
    category: "technology",
  },
  {
    term: "Joule (J)",
    definition:
      "The standard unit of energy. In laser hair removal, energy is typically expressed as fluence: joules per square centimeter (J/cm²). A higher number means more energy is being delivered to the treatment area.",
    category: "science",
  },
  {
    term: "Melanin",
    definition:
      "The natural pigment in skin and hair that absorbs laser energy. Laser hair removal works by targeting melanin in the hair follicle: the laser heats the melanin, which damages the follicle. This is why the treatment works best on dark hair (more melanin to absorb energy) and why darker skin tones require specific wavelengths to avoid heating the melanin in the skin itself.",
    category: "biology",
  },
  {
    term: "Nd:YAG Laser",
    aka: "1064nm laser",
    definition:
      "A neodymium-doped yttrium aluminum garnet laser emitting at 1064nm. The safest wavelength for darker skin tones (Fitzpatrick V–VI) because 1064nm penetrates deeper and is absorbed less by epidermal melanin. Requires higher fluence (50–80 J/cm²) to be effective. Found in machines like the Candela GentleYAG and Lutronic Clarity II.",
    category: "technology",
  },
  {
    term: "OPT",
    aka: "Optimal Pulse Technology",
    definition:
      "Lumenis's proprietary technology for controlling IPL pulse shape, ensuring even energy distribution throughout each pulse. Used in the Lumenis M22 platform. A clinical-grade IPL technology. Not a laser, but a professional system.",
    category: "technology",
  },
  {
    term: "Paradoxical Hypertrichosis",
    aka: "paradoxical hair growth",
    definition:
      "A rare side effect where laser treatment stimulates new hair growth in adjacent areas rather than reducing it. More common on the face and neck, and in patients with darker skin or hormonal conditions. The exact mechanism is not fully understood but may involve sub-therapeutic energy levels stimulating dormant follicles rather than destroying them.",
    category: "side-effects",
  },
  {
    term: "Perifollicular Edema",
    definition:
      "Small red bumps that appear around individual hair follicles immediately after laser treatment, typically resolving within hours to a day. This is actually a desired treatment endpoint. It indicates that the follicle absorbed enough energy for thermal destruction. Not to be confused with folliculitis, which is an infection that develops days later.",
    category: "side-effects",
  },
  {
    term: "Pulse Duration",
    aka: "pulse width",
    definition:
      "How long each laser pulse lasts, measured in milliseconds (ms). Must be matched to the target's thermal relaxation time for safe, effective treatment. Shorter pulses (2–10ms) target smaller structures; longer pulses (20–100ms+) heat larger volumes more gradually and are generally safer for darker skin tones.",
    category: "science",
  },
  {
    term: "Selective Photothermolysis",
    aka: "SPTL",
    definition:
      "The scientific principle behind laser hair removal. By selecting the right wavelength, pulse duration, and fluence, laser energy can selectively heat and destroy a specific target (melanin in the hair follicle) without damaging surrounding tissue. Introduced by Anderson and Parrish in 1983, this concept underlies all modern laser dermatology.",
    category: "science",
  },
  {
    term: "SHR",
    aka: "Super Hair Removal",
    definition:
      "A treatment delivery method (not a specific device). SHR uses rapid low-fluence pulses with a sweeping motion across the skin, gradually heating the follicle. Marketed as more comfortable than traditional single-shot methods. If a clinic says they use 'SHR', ask which machine brand and model they actually have. SHR is how the treatment is delivered, not what delivers it.",
    category: "technology",
  },
  {
    term: "Spot Size",
    definition:
      "The diameter of the laser beam where it contacts the skin, measured in millimeters. Larger spot sizes (12–18mm+) allow deeper penetration and faster treatment of large areas. Smaller spot sizes (6–10mm) are used for precision work on smaller areas like the upper lip. Generally, larger spot sizes are more effective for hair removal.",
    category: "science",
  },
  {
    term: "Telogen",
    aka: "resting phase",
    definition:
      "The resting phase of the hair cycle where the follicle is dormant and the hair eventually sheds. Laser treatment is ineffective during telogen because the follicle lacks sufficient melanin and is disconnected from the structures that need to be destroyed. This is why treatments are spaced 4–8 weeks apart: to catch follicles as they cycle back into anagen.",
    category: "biology",
  },
  {
    term: "Thermal Relaxation Time",
    aka: "TRT",
    definition:
      "The time it takes for a heated target to cool to half its peak temperature. For hair follicles, TRT is approximately 10–100 milliseconds depending on diameter. Effective treatment requires pulse duration matched to or shorter than the target's TRT: long enough to heat the follicle, short enough that heat doesn't spread to surrounding skin.",
    category: "science",
  },
];

// Build glossary term anchors map (term -> anchor id)
const glossaryAnchors: Record<string, string> = {};
glossaryTerms.forEach((item) => {
  const anchor = item.term.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  glossaryAnchors[item.term] = anchor;
  // Also add common variations
  if (item.term === "Fitzpatrick Scale") {
    glossaryAnchors["Fitzpatrick"] = anchor;
  }
  if (item.term === "Thermal Relaxation Time") {
    glossaryAnchors["thermal relaxation time"] = anchor;
  }
});

// Category display config
const categoryConfig: Record<string, { label: string; color: string }> = {
  technology: { label: "Technology", color: "#3B82F6" },
  biology: { label: "Biology", color: "#10B981" },
  science: { label: "Physics", color: "#8B5CF6" },
  equipment: { label: "Equipment", color: "#F59E0B" },
  "side-effects": { label: "Side Effects", color: "#EF4444" },
};

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
    allLinks.push({ term: name, type: 'equipment', href: `/is-it-a-real-laser/${slug}` });
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
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-3xl px-3 py-8 text-center sm:px-6 sm:py-16">
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
          {Array.from(new Set(glossaryTerms.map((t) => t.term[0].toUpperCase())))
            .sort()
            .map((letter) => (
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
          {Array.from(new Set(glossaryTerms.map((t) => t.term[0].toUpperCase())))
            .sort()
            .map((letter) => (
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
