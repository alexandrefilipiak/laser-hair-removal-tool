import Link from 'next/link';

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#FAF9F7',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Content */}
      <div style={{ textAlign: 'center', maxWidth: '720px', position: 'relative', zIndex: 1 }}>
        {/* Eyebrow text */}
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#5E8B7E',
            marginBottom: '1.5rem',
          }}
        >
          Equipment Verification Tool
        </p>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#2D2D2D',
            marginBottom: '1.5rem',
          }}
        >
          Know Your Laser
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            lineHeight: 1.6,
            color: '#6B6560',
            marginBottom: '2.5rem',
            maxWidth: '540px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Instantly verify if your clinic&apos;s hair removal device is a real laser,
          IPL, or something else. Search 30+ machines from leading manufacturers.
        </p>

        {/* CTA Button */}
        <Link
          href="/is-it-a-real-laser"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2rem',
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#FFFFFF',
            backgroundColor: '#5E8B7E',
            borderRadius: '9999px',
            textDecoration: 'none',
            transition: 'background-color 0.2s',
          }}
          className="hover:bg-[#4A7466]"
        >
          Is Your Clinic Using a Real Laser?
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Trust indicators */}
        <div
          style={{
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '30+', label: 'Devices' },
            { value: '6', label: 'Brands' },
            { value: 'Free', label: 'Forever' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#2D2D2D',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#6B6560',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          fontSize: '0.75rem',
          color: '#6B6560',
          letterSpacing: '0.02em',
        }}
      >
        Informational only — not medical advice
      </p>
    </main>
  );
}
