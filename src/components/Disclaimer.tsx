/**
 * Medical disclaimer component
 *
 * Static disclaimer text required on all equipment detail pages.
 * Uses semantic HTML with proper accessibility attributes.
 */

/**
 * Disclaimer showing medical/legal notice
 *
 * No props needed - content is static
 */
export function Disclaimer() {
  return (
    <aside
      role="complementary"
      aria-label="Medical disclaimer"
      className="mx-auto mt-8 max-w-2xl rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-6"
    >
      <h2 className="mb-2 text-sm font-semibold text-gray-700 md:text-base">
        Important Disclaimer
      </h2>
      <p className="text-xs leading-relaxed text-gray-600 md:text-sm">
        This tool provides general information about laser hair removal equipment
        for educational purposes only. It is not medical advice. Individual results
        vary based on skin type, hair color, and other factors. Always consult with
        a qualified practitioner before undergoing any cosmetic procedure.
      </p>
    </aside>
  );
}
