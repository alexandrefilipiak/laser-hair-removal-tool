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
import { IPLDetails } from '@/components/IPLDetails';
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
 * Uses richContent.overview for richer SEO descriptions when available.
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

    // Use richContent.overview if available, fallback to notes
    const contentDescription = equipment.richContent?.overview || equipment.notes || '';

    return {
      title: `${equipment.name} - ${classification}`,
      description: `Is ${equipment.name} by ${equipment.manufacturer} a real laser? ${classification}. ${contentDescription}`.slice(
        0,
        160
      ),
      openGraph: {
        title: `${equipment.name} - ${classification}`,
        description: `${equipment.manufacturer} ${equipment.name}: ${classification}. ${contentDescription}`.slice(
          0,
          200
        ),
      },
    };
  }

  // Special metadata for IPL page (the definitive "is IPL a laser" resource)
  if (slug === 'ipl') {
    return {
      title: 'IPL vs Laser Hair Removal — Is IPL a Real Laser?',
      description:
        'IPL is not a laser. Learn the difference between IPL and real laser hair removal, which branded IPL devices to watch for, and what to ask your clinic.',
      openGraph: {
        title: 'IPL vs Laser Hair Removal — Is IPL a Real Laser?',
        description:
          'IPL is not a laser. Learn the difference between IPL and real laser hair removal, which branded IPL devices to watch for, and what to ask your clinic.',
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
    // Special custom page for IPL
    if (slug === 'ipl') {
      return (
        <>
          <JsonLd data={generateTechTermSchema(equipment)} />
          <IPLDetails term={equipment} />
        </>
      );
    }

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
