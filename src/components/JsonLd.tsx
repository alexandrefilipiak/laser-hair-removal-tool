/**
 * JSON-LD structured data component
 *
 * Renders a script tag with JSON-LD structured data for SEO.
 * Simple passthrough component - caller provides the data object.
 */

interface JsonLdProps {
  /** JSON-LD data object (will be stringified) */
  data: Record<string, unknown>;
}

/**
 * Render JSON-LD structured data in a script tag
 *
 * Usage:
 * ```tsx
 * <JsonLd data={{
 *   "@context": "https://schema.org",
 *   "@type": "Product",
 *   "name": "GentleMax Pro"
 * }} />
 * ```
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
