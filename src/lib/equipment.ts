/**
 * Equipment data access module
 *
 * Provides type definitions and utility functions for accessing
 * laser hair removal equipment data. Uses a discriminated union
 * pattern to distinguish between machine entries and technology terms.
 */

import equipmentData from '../data/equipment.json';

// =============================================================================
// Type Definitions
// =============================================================================

/**
 * Brand tier classification for clinical equipment
 * - premium-clinical: Gold Standard (Candela, Cynosure, Lumenis)
 * - standard-clinical: Established (Alma, InMode, Lutronic)
 * - consumer: Home devices (Tria)
 * - unknown: Unverified brands
 */
export type BrandTier = 'premium-clinical' | 'standard-clinical' | 'consumer' | 'unknown';

/**
 * Core technology type - what the device fundamentally is
 */
export type TechnologyType = 'laser' | 'ipl' | 'led' | 'rf';

/**
 * Extended technology type for technology terms (includes delivery methods, wavelengths)
 */
export type TermTechnologyType = TechnologyType | 'delivery-method' | 'wavelength';

/**
 * Skin type information (informational only, no medical advice)
 */
export interface SkinTypeInfo {
  /** Fitzpatrick scale range, e.g., "I-VI", "I-III", "IV-VI" */
  fitzpatrickRange: string;
  /** Human-readable description, e.g., "Commonly used for lighter skin tones" */
  displayText: string;
}

/**
 * Rich content for SEO - detailed machine descriptions
 *
 * Each field provides unique content for search engines.
 * Total content should exceed 100 words per machine.
 */
export interface RichContent {
  /** 2-3 sentence general overview of the machine */
  overview: string;
  /** Technical explanation of device operation (wavelength, energy delivery, cooling) */
  howItWorks: string;
  /** Common clinical applications and treatment areas */
  typicalUses: string;
  /** Distinguishing characteristics and features */
  keyFeatures: string;
}

/**
 * Machine entry - clinical lasers, home devices, multi-purpose equipment
 *
 * Discriminated by `type: 'machine'`
 */
export interface MachineEntry {
  type: 'machine';
  /** URL-safe identifier, e.g., "gentlemax-pro" */
  slug: string;
  /** Display name with proper casing, e.g., "GentleMax Pro" */
  name: string;
  /** Manufacturer name, e.g., "Candela" */
  manufacturer: string;
  /** Core technology type */
  technologyType: TechnologyType;
  /** Wavelengths supported, e.g., ["755nm", "1064nm"] */
  wavelengths: string[];
  /** Brand quality tier */
  brandTier: BrandTier;
  /** Skin type information */
  skinTypes: SkinTypeInfo;
  /** True if purpose-built for hair removal */
  purposeBuilt: boolean;
  /** Cooling method, e.g., "cryogen", "contact", "air", or null */
  coolingMethod: string | null;
  /** Additional notes about the machine */
  notes: string | null;
  /** Lowercase aliases for search, e.g., ["gentle max pro"] */
  aliases: string[];
  /** Family identifier for linking variants, e.g., "candela-gentlemax" */
  family: string | null;
  /** Delivery method slug for runtime linking, e.g., "shr" */
  deliveryMethod: string | null;
  /** Rich content for SEO (optional for backwards compatibility) */
  richContent: RichContent | null;
}

/**
 * Technology term entry - SHR, AFT, BBL, wavelengths
 *
 * Discriminated by `type: 'technology-term'`
 */
export interface TechnologyTermEntry {
  type: 'technology-term';
  /** URL-safe identifier, e.g., "shr" */
  slug: string;
  /** Display name, e.g., "SHR" */
  name: string;
  /** Technology category */
  technologyType: TermTechnologyType;
  /** Whether this is a real laser - null for ambiguous terms like SHR */
  isRealLaser: boolean | null;
  /** Brief 1-2 sentence explanation */
  whatItIs: string;
  /** Detailed explanation of why this matters */
  whyItMatters: string;
  /** Guidance text for clinic questions, or null */
  askYourClinic: string | null;
  /** Lowercase aliases for search */
  aliases: string[];
}

/**
 * Discriminated union of all equipment entry types
 *
 * Use type guards (isMachine, isTechnologyTerm) to narrow the type
 */
export type EquipmentEntry = MachineEntry | TechnologyTermEntry;

// =============================================================================
// Data Loading and Index Building
// =============================================================================

// Assert types on import
const entries: EquipmentEntry[] = equipmentData as EquipmentEntry[];

// Build slug -> entry index (includes aliases) at module load time
const slugIndex = new Map<string, EquipmentEntry>();

for (const entry of entries) {
  slugIndex.set(entry.slug, entry);
  for (const alias of entry.aliases) {
    slugIndex.set(alias, entry);
  }
}

// =============================================================================
// Type Guards
// =============================================================================

/**
 * Type guard to check if an entry is a machine
 *
 * @example
 * const entry = getEquipmentBySlug('gentlemax-pro');
 * if (entry && isMachine(entry)) {
 *   console.log(entry.manufacturer); // TypeScript knows this is MachineEntry
 * }
 */
export function isMachine(entry: EquipmentEntry): entry is MachineEntry {
  return entry.type === 'machine';
}

/**
 * Type guard to check if an entry is a technology term
 *
 * @example
 * const entry = getEquipmentBySlug('shr');
 * if (entry && isTechnologyTerm(entry)) {
 *   console.log(entry.whatItIs); // TypeScript knows this is TechnologyTermEntry
 * }
 */
export function isTechnologyTerm(entry: EquipmentEntry): entry is TechnologyTermEntry {
  return entry.type === 'technology-term';
}

// =============================================================================
// Lookup Functions
// =============================================================================

/**
 * Look up an equipment entry by slug or alias
 *
 * @param slug - The slug or alias to look up (case-insensitive)
 * @returns The equipment entry if found, undefined otherwise
 *
 * @example
 * getEquipmentBySlug('gentlemax-pro');      // Returns GentleMax Pro entry
 * getEquipmentBySlug('gentle max pro');     // Also returns GentleMax Pro (alias)
 * getEquipmentBySlug('GentleMax-Pro');      // Case-insensitive
 * getEquipmentBySlug('unknown-machine');    // Returns undefined
 */
export function getEquipmentBySlug(slug: string): EquipmentEntry | undefined {
  return slugIndex.get(slug.toLowerCase());
}

/**
 * Get all primary equipment slugs (excludes aliases)
 *
 * @returns Array of all primary slugs
 *
 * @example
 * const slugs = getAllEquipmentSlugs();
 * // ['gentlemax-pro', 'shr', '755nm', ...]
 */
export function getAllEquipmentSlugs(): string[] {
  return entries.map((entry) => entry.slug);
}

/**
 * Get all equipment entries
 *
 * Provides access to the full equipment dataset for filtering and display.
 *
 * @returns Array of all equipment entries (machines and technology terms)
 *
 * @example
 * const allEquipment = getAllEquipment();
 * const machines = allEquipment.filter(isMachine);
 */
export function getAllEquipment(): EquipmentEntry[] {
  return entries;
}

/**
 * Get related machines from the same manufacturer
 *
 * Useful for "Related Machines" sections and "Did you mean?" suggestions.
 *
 * @param manufacturer - The manufacturer name to filter by (case-insensitive)
 * @param excludeSlug - Optional slug to exclude from results (e.g., current machine)
 * @param limit - Maximum number of results to return (default: 3)
 * @returns Array of machine entries from the same manufacturer
 *
 * @example
 * // Get other Candela machines excluding GentleMax Pro
 * getRelatedByManufacturer('Candela', 'gentlemax-pro');
 * // Returns: [GentleLase Pro, VelaShape, ...]
 *
 * @example
 * // Get up to 5 Cynosure machines
 * getRelatedByManufacturer('Cynosure', undefined, 5);
 */
export function getRelatedByManufacturer(
  manufacturer: string,
  excludeSlug?: string,
  limit: number = 3
): MachineEntry[] {
  const normalizedManufacturer = manufacturer.toLowerCase();

  return entries
    .filter(isMachine)
    .filter((m) => m.manufacturer.toLowerCase() === normalizedManufacturer)
    .filter((m) => !excludeSlug || m.slug !== excludeSlug)
    .slice(0, limit);
}
