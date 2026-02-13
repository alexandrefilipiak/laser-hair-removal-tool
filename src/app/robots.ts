/**
 * robots.txt configuration
 *
 * Controls crawler access to the site.
 * Served at /robots.txt automatically by Next.js.
 */

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://laserhairremovalmap.com/sitemap.xml',
  };
}
