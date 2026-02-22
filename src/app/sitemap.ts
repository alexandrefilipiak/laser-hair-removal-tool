/**
 * Dynamic sitemap generation
 *
 * Generates sitemap.xml with all equipment pages for SEO.
 * Served at /sitemap.xml automatically by Next.js.
 */

import type { MetadataRoute } from 'next';
import { getAllEquipmentSlugs } from '@/lib/equipment';

// Required for static export
export const dynamic = 'force-static';

const BASE_URL = 'https://laserhairremovalmap.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllEquipmentSlugs();

  const equipmentPages = slugs.map((slug) => ({
    url: `${BASE_URL}/equipment-verification-tool/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/equipment-verification-tool`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/equipment-verification-tool/equipment-costs`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/equipment-verification-tool/purpose-built-vs-multi-purpose`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/equipment-verification-tool/home-laser-vs-clinical-laser`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/equipment-verification-tool/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/glossary/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    ...equipmentPages,
  ];
}
