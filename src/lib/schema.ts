/**
 * JSON-LD Schema generators
 *
 * Generates structured data for search engines following Schema.org specifications.
 * Product schema for machines, DefinedTerm schema for technology terms.
 */

import type { MachineEntry, TechnologyTermEntry } from './equipment';

/**
 * Generate Product schema for machine entries
 *
 * @see https://schema.org/Product
 * @see https://developers.google.com/search/docs/appearance/structured-data/product-snippet
 */
export function generateProductSchema(machine: MachineEntry): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: machine.name,
    description:
      machine.notes ||
      `${machine.manufacturer} ${machine.name} laser hair removal device`,
    brand: {
      '@type': 'Brand',
      name: machine.manufacturer,
    },
    manufacturer: {
      '@type': 'Organization',
      name: machine.manufacturer,
    },
    category: 'Medical Equipment > Laser Hair Removal',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Technology Type',
        value: machine.technologyType,
      },
      {
        '@type': 'PropertyValue',
        name: 'Wavelengths',
        value: machine.wavelengths.join(', '),
      },
      {
        '@type': 'PropertyValue',
        name: 'Brand Tier',
        value: machine.brandTier,
      },
      {
        '@type': 'PropertyValue',
        name: 'Purpose',
        value: machine.purposeBuilt
          ? 'Purpose-built for hair removal'
          : 'Multi-purpose platform',
      },
    ],
  };
}

/**
 * Generate DefinedTerm schema for technology term entries
 *
 * @see https://schema.org/DefinedTerm
 */
export function generateTechTermSchema(
  term: TechnologyTermEntry
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.name,
    description: term.whatItIs,
    inDefinedTermSet: 'Laser Hair Removal Technology Terms',
  };
}
