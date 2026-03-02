/**
 * Unified wavelength details component
 *
 * A data-driven component that renders wavelength pages (755nm, 810nm, 1064nm,
 * dual-wavelength, tri-wavelength) with consistent structure but wavelength-specific content.
 * Consolidates 5 nearly identical components into one.
 */

import Link from 'next/link';
import type { TechnologyTermEntry, EquipmentEntry, MachineEntry } from '@/lib/equipment';
import { getTermBadgeType, isMachine } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { BackNavigation } from './BackNavigation';
import { AlertBox } from './AlertBox';
import { SectionDivider } from './SectionDivider';
import { Footer } from './Footer';
import { Disclaimer } from './Disclaimer';
import { colors, typography } from '@/lib/theme';
import equipmentData from '@/data/equipment.json';

const equipment = equipmentData as EquipmentEntry[];

// =============================================================================
// Wavelength Configuration Types
// =============================================================================

interface TocItem {
  id: string;
  label: string;
}

interface BrandMattersContent {
  paragraphs: string[];
}

interface AskClinicContent {
  question: string;
  additionalText?: string;
}

interface WavelengthConfig {
  /** Filter function to get related machines */
  getMachines: (equipment: EquipmentEntry[]) => MachineEntry[];
  /** Table of contents items */
  toc: TocItem[];
  /** "The Brand Matters" section content */
  brandMatters: BrandMattersContent;
  /** "Ask Your Clinic" section content */
  askClinic: AskClinicContent;
  /** Additional content after "What It Is" */
  whatItIsExtra?: string[];
  /** Whether to show the examples section */
  showExamples?: boolean;
  /** Custom examples section title */
  examplesSectionTitle?: string;
  /** Max number of machines to show */
  machineLimit?: number;
}

// =============================================================================
// Wavelength Configurations
// =============================================================================

const wavelengthConfigs: Record<string, WavelengthConfig> = {
  '755nm': {
    getMachines: (equip) =>
      equip
        .filter(isMachine)
        .filter((m) => m.wavelengths.includes('755nm'))
        .filter((m) => m.brandTier !== 'consumer')
        .sort((a, b) => {
          if (a.brandTier === 'premium-clinical' && b.brandTier !== 'premium-clinical') return -1;
          if (b.brandTier === 'premium-clinical' && a.brandTier !== 'premium-clinical') return 1;
          return 0;
        })
        .slice(0, 8),
    toc: [
      { id: 'what-it-is', label: 'What It Is' },
      { id: 'the-brand-matters', label: 'The Brand Matters' },
      { id: 'ask-your-clinic', label: 'Ask Your Clinic' },
      { id: 'examples', label: 'Examples' },
    ],
    brandMatters: {
      paragraphs: [
        'Not all 755nm Alexandrite lasers are equal. A Candela GentleLase costs $60,000–$100,000. Unbranded 755nm machines from Chinese manufacturers start at $2,500 on Alibaba. Same wavelength, vastly different quality.',
      ],
    },
    askClinic: {
      question: '',
      additionalText:
        'Most 755nm Alexandrite lasers in US clinics are from established manufacturers like Candela and Cynosure. However, budget alternatives do exist. If your clinic\'s pricing seems significantly below market rate, it\'s worth asking about the specific device.',
    },
    showExamples: true,
  },

  '810nm': {
    getMachines: (equip) =>
      equip
        .filter(isMachine)
        .filter((m) => m.wavelengths.includes('810nm'))
        .filter((m) => m.brandTier !== 'consumer')
        .sort((a, b) => {
          if (a.brandTier === 'premium-clinical' && b.brandTier !== 'premium-clinical') return -1;
          if (b.brandTier === 'premium-clinical' && a.brandTier !== 'premium-clinical') return 1;
          return 0;
        })
        .slice(0, 8),
    toc: [
      { id: 'what-it-is', label: 'What It Is' },
      { id: 'the-brand-matters', label: 'The Brand Matters' },
      { id: 'ask-your-clinic', label: 'Ask Your Clinic' },
    ],
    brandMatters: {
      paragraphs: [
        'Not all 810nm diode lasers are equal. The wavelength is just physics. What determines your results is the machine behind it.',
        'A clinical-grade LightSheer Duet costs $60,000–$100,000. An unbranded import can cost as little as $3,000. Same wavelength, vastly different power output, cooling systems, and engineering quality.',
      ],
    },
    askClinic: {
      question: '"What brand and model of 810nm diode laser do you use?"',
    },
    showExamples: true,
  },

  '1064nm': {
    getMachines: (equip) =>
      equip
        .filter(isMachine)
        .filter((m) => m.wavelengths.includes('1064nm'))
        .filter((m) => m.brandTier !== 'consumer')
        .sort((a, b) => {
          if (a.brandTier === 'premium-clinical' && b.brandTier !== 'premium-clinical') return -1;
          if (b.brandTier === 'premium-clinical' && a.brandTier !== 'premium-clinical') return 1;
          return 0;
        })
        .slice(0, 8),
    toc: [
      { id: 'what-it-is', label: 'What It Is' },
      { id: 'the-brand-matters', label: 'The Brand Matters' },
      { id: 'ask-your-clinic', label: 'Ask Your Clinic' },
      { id: 'examples', label: 'Examples' },
    ],
    brandMatters: {
      paragraphs: [
        'Not all 1064nm Nd:YAG lasers are equal. Premium devices like the Candela GentleYAG cost $60,000+. Budget alternatives from Chinese manufacturers start at $2,500, often as multi-wavelength combo machines that bundle 755nm, 808nm, and 1064nm into one device for under $5,000.',
        "If your clinic claims to treat all skin types with a single device at significantly below-market pricing, it's worth asking about the specific brand and model.",
        "This matters especially for 1064nm. Patients with darker skin tones specifically seek Nd:YAG because it's the safest wavelength for their skin type. A poorly calibrated device increases the risk of burns and the consequences are more visible and more serious on darker skin.",
      ],
    },
    askClinic: {
      question: '"What brand and model of Nd:YAG laser do you use?"',
    },
    showExamples: true,
  },

  'dual-wavelength': {
    getMachines: (equip) =>
      equip
        .filter(isMachine)
        .filter(
          (m) =>
            m.wavelengths.includes('755nm') &&
            m.wavelengths.includes('1064nm') &&
            !m.wavelengths.includes('810nm')
        )
        .filter((m) => m.brandTier !== 'consumer')
        .sort((a, b) => {
          if (a.brandTier === 'premium-clinical' && b.brandTier !== 'premium-clinical') return -1;
          if (b.brandTier === 'premium-clinical' && a.brandTier !== 'premium-clinical') return 1;
          return 0;
        })
        .slice(0, 10),
    toc: [
      { id: 'what-it-is', label: 'What It Is' },
      { id: 'the-brand-matters', label: 'The Brand Matters' },
      { id: 'ask-your-clinic', label: 'Ask Your Clinic' },
      { id: 'examples', label: 'Examples' },
    ],
    whatItIsExtra: [
      'The 755nm Alexandrite wavelength is highly effective for lighter skin tones (Fitzpatrick I-IV), while the 1064nm Nd:YAG wavelength safely treats darker skin tones (Fitzpatrick V-VI). Together, they allow practitioners to treat virtually any patient with a single machine.',
    ],
    brandMatters: {
      paragraphs: [
        'Dual wavelength technology is available from premium brands like Candela (GentleMax Pro) and Cynosure (Elite+). These are clinical-grade systems costing $80,000–$150,000.',
        'Budget alternatives exist—tri-wavelength machines bundling 755nm, 808nm, and 1064nm are sold on Alibaba for under $5,000. These are often marketed as "dual wavelength" or "multi-wavelength" systems.',
        "If your clinic advertises dual wavelength treatment at significantly below-market rates, it's worth asking about the specific equipment.",
      ],
    },
    askClinic: {
      question: '"What brand and model of dual wavelength laser do you use?"',
    },
    showExamples: true,
    machineLimit: 10,
  },

  'tri-wavelength': {
    getMachines: (equip) =>
      equip
        .filter(isMachine)
        .filter(
          (m) =>
            m.wavelengths.includes('755nm') &&
            m.wavelengths.includes('810nm') &&
            m.wavelengths.includes('1064nm')
        )
        .filter((m) => m.brandTier !== 'consumer')
        .sort((a, b) => {
          if (a.brandTier === 'premium-clinical' && b.brandTier !== 'premium-clinical') return -1;
          if (b.brandTier === 'premium-clinical' && a.brandTier !== 'premium-clinical') return 1;
          return 0;
        })
        .slice(0, 10),
    toc: [
      { id: 'what-it-is', label: 'What It Is' },
      { id: 'the-brand-matters', label: 'The Brand Matters' },
      { id: 'ask-your-clinic', label: 'Ask Your Clinic' },
      { id: 'examples', label: 'Examples' },
    ],
    whatItIsExtra: [
      'Tri-wavelength systems combine three key wavelengths: 755nm Alexandrite for lighter skin, 808nm/810nm Diode for versatility, and 1064nm Nd:YAG for darker skin tones. This allows maximum treatment flexibility.',
    ],
    brandMatters: {
      paragraphs: [
        'The tri-wavelength category spans a huge quality and price range. Premium systems from established manufacturers exist, but this space is also dominated by budget imports.',
        'Many tri-wavelength machines sold on Alibaba cost $2,500–$5,000 and promise to do everything. Clinical-grade multi-wavelength platforms from brands like Candela, Cynosure, or Alma cost $50,000–$150,000.',
        'If your clinic uses a tri-wavelength system and charges significantly below-market rates, ask about the specific brand and model.',
      ],
    },
    askClinic: {
      question: '"What brand and model of tri-wavelength laser do you use?"',
    },
    showExamples: true,
    machineLimit: 10,
  },
};

// =============================================================================
// Component Props
// =============================================================================

interface WavelengthDetailsProps {
  term: TechnologyTermEntry;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Unified wavelength details page layout
 */
export function WavelengthDetails({ term }: WavelengthDetailsProps) {
  const { slug, name, whatItIs } = term;
  const config = wavelengthConfigs[slug];

  // Fallback if no config exists (shouldn't happen if used correctly)
  if (!config) {
    return null;
  }

  const machines = config.getMachines(equipment);

  return (
    <main
      style={{
        backgroundColor: colors.background.page,
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <article
        className="mx-auto max-w-2xl px-4 py-8 md:py-12"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Back Navigation */}
        <BackNavigation href="/equipment-verification-tool" label="Back to Search" />

        {/* Classification Badge */}
        <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
          <ClassificationBadge badgeType={getTermBadgeType(term)} />
        </div>

        {/* Term Name */}
        <header className="text-center" style={{ marginBottom: '1.25rem' }}>
          <h1
            style={{
              fontFamily: typography.fontFamily.heading,
              fontSize: typography.fontSize['3xl'],
              fontWeight: 600,
              letterSpacing: typography.letterSpacing.tight,
              color: colors.text.primary,
              lineHeight: typography.lineHeight.tight,
            }}
          >
            {name}
          </h1>
        </header>

        {/* Disclaimer */}
        <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
          <Disclaimer />
        </div>

        {/* Table of Contents */}
        <nav
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.25rem 0.5rem',
            marginBottom: '2.5rem',
            fontSize: '0.875rem',
          }}
        >
          {config.toc.map((item, index) => (
            <span key={item.id} style={{ display: 'contents' }}>
              <a
                href={`#${item.id}`}
                style={{ color: colors.primary, textDecoration: 'none', padding: '0.5rem 0.25rem' }}
                className="hover:underline"
              >
                {item.label}
              </a>
              {index < config.toc.length - 1 && (
                <span style={{ color: colors.border.default, padding: '0.5rem 0' }}>·</span>
              )}
            </span>
          ))}
        </nav>

        {/* What It Is */}
        <section
          id="what-it-is"
          className="rounded-xl"
          style={{
            backgroundColor: colors.background.card,
            border: `1px solid ${colors.border.default}`,
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              color: colors.primary,
              fontSize: typography.fontSize.xs,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: typography.letterSpacing.wider,
              marginBottom: '1rem',
            }}
          >
            What It Is
          </h2>
          <p
            className="leading-relaxed"
            style={{
              color: colors.text.primary,
              fontSize: typography.fontSize.lg,
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            {whatItIs}
          </p>
          {config.whatItIsExtra?.map((text, index) => (
            <p
              key={index}
              className="leading-relaxed"
              style={{
                color: colors.text.secondary,
                fontSize: typography.fontSize.md,
                lineHeight: typography.lineHeight.relaxed,
                marginTop: '1rem',
              }}
            >
              {text}
            </p>
          ))}
        </section>

        {/* The Brand Matters */}
        <section id="the-brand-matters" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: typography.fontFamily.heading,
              color: colors.text.primary,
              fontSize: typography.fontSize['2xl'],
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            The Brand Matters
          </h2>
          {config.brandMatters.paragraphs.map((text, index) => (
            <p
              key={index}
              className="leading-relaxed"
              style={{
                color: colors.text.secondary,
                lineHeight: typography.lineHeight.loose,
                marginBottom: index < config.brandMatters.paragraphs.length - 1 ? '1rem' : 0,
              }}
            >
              {text}
            </p>
          ))}
        </section>

        {/* Ask Your Clinic */}
        <section id="ask-your-clinic" style={{ marginBottom: '2.5rem' }}>
          <AlertBox variant="info" title="Ask Your Clinic">
            {config.askClinic.question && (
              <p
                style={{
                  color: colors.text.primary,
                  fontWeight: 500,
                  fontStyle: 'italic',
                  marginBottom: '1rem',
                }}
              >
                {config.askClinic.question}
              </p>
            )}
            {config.askClinic.additionalText && (
              <p style={{ marginBottom: '1rem' }}>{config.askClinic.additionalText}</p>
            )}
            <p>
              {config.askClinic.question ? 'Once you have the answer, ' : ''}
              <Link
                href="/equipment-verification-tool"
                style={{ color: colors.primary, fontWeight: 500, textDecoration: 'underline' }}
              >
                check how it's rated in our equipment database →
              </Link>
            </p>
          </AlertBox>
        </section>

        {/* Examples Section */}
        {config.showExamples && machines.length > 0 && (
          <section id="examples" style={{ marginBottom: '2.5rem' }}>
            <SectionDivider style="line" marginTop="0" marginBottom="1.5rem" />
            <h2
              style={{
                fontFamily: typography.fontFamily.heading,
                color: colors.text.primary,
                fontSize: typography.fontSize.md,
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              {config.examplesSectionTitle || 'Examples Of Clinical Grade Machines Using This Wavelength'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {machines.map((machine) => (
                <Link
                  key={machine.slug}
                  href={`/equipment-verification-tool/${machine.slug}`}
                  className="inline-flex items-center gap-2 transition-all hover:border-[#5E8B7E]"
                  style={{
                    backgroundColor: colors.background.card,
                    border: `1px solid ${colors.border.default}`,
                    borderRadius: '9999px',
                    padding: '0.5rem 1rem',
                    fontSize: typography.fontSize.base,
                    color: colors.text.primary,
                    textDecoration: 'none',
                  }}
                >
                  <span>{machine.name}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.text.secondary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </article>
    </main>
  );
}

/**
 * Check if a slug has a wavelength configuration
 */
export function hasWavelengthConfig(slug: string): boolean {
  return slug in wavelengthConfigs;
}
