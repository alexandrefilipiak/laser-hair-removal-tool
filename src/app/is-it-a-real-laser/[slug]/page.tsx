/**
 * Equipment detail page
 *
 * Dynamic route for individual equipment pages at /is-it-a-real-laser/[slug].
 * Uses static generation with generateStaticParams for all known equipment.
 * Returns 404 for unknown slugs via dynamicParams = false.
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getEquipmentBySlug,
  getAllEquipmentSlugs,
  isMachine,
  isTechnologyTerm,
} from '@/lib/equipment';
import { EquipmentDetails } from '@/components/EquipmentDetails';
import { TechnologyTermDetails } from '@/components/TechnologyTermDetails';
import { JsonLd } from '@/components/JsonLd';
import { generateProductSchema, generateTechTermSchema } from '@/lib/schema';

// For static export: only pre-rendered slugs are valid, unknown slugs return 404
export const dynamicParams = false;

/**
 * Generate static params for all equipment entries
 *
 * Called at build time to pre-render all equipment pages.
 */
export async function generateStaticParams() {
  const slugs = getAllEquipmentSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for equipment pages
 *
 * Different metadata patterns for machines vs technology terms.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const equipment = getEquipmentBySlug(slug);

  if (!equipment) {
    return { title: 'Equipment Not Found' };
  }

  // Machine metadata
  if (isMachine(equipment)) {
    const isRealLaser = equipment.technologyType === 'laser';
    const classification = isRealLaser ? 'Real Laser' : 'Not a Laser';
    return {
      title: `${equipment.name} - ${classification}`,
      description: `Is ${equipment.name} by ${equipment.manufacturer} a real laser? ${classification}. Brand tier: ${equipment.brandTier}. ${equipment.notes || ''}`.slice(
        0,
        160
      ),
      openGraph: {
        title: `${equipment.name} - ${classification}`,
        description: `${equipment.manufacturer} ${equipment.name}: ${classification}`,
      },
    };
  }

  // Technology term metadata
  return {
    title: `${equipment.name} - Is it a Real Laser?`,
    description: equipment.whatItIs.slice(0, 160),
  };
}

/**
 * Equipment page component
 *
 * Renders machine details or technology term details based on entry type.
 * Includes JSON-LD structured data for SEO.
 */
export default async function EquipmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const equipment = getEquipmentBySlug(slug);

  if (!equipment) {
    notFound();
  }

  // Machine entry
  if (isMachine(equipment)) {
    return (
      <>
        <JsonLd data={generateProductSchema(equipment)} />
        <EquipmentDetails equipment={equipment} />
      </>
    );
  }

  // Technology term entry
  if (isTechnologyTerm(equipment)) {
    return (
      <>
        <JsonLd data={generateTechTermSchema(equipment)} />
        <TechnologyTermDetails term={equipment} />
      </>
    );
  }

  // Fallback (should never reach here due to type exhaustiveness)
  notFound();
}
