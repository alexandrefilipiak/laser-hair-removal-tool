/**
 * Shared footer component
 *
 * Displays the informational disclaimer at the bottom of pages.
 */

export function Footer() {
  return (
    <footer
      className="text-center"
      style={{
        borderTop: '1px solid #E8E4DF',
        paddingTop: '2rem',
        marginTop: '3rem',
        paddingBottom: '1rem',
      }}
    >
      <p style={{ color: '#6B6560', fontSize: '0.75rem', letterSpacing: '0.02em' }}>
        Informational content only. Not medical advice
      </p>
    </footer>
  );
}
