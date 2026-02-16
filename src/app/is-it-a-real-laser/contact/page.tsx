import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://laserhairremovalmap.com';

export const metadata: Metadata = {
  title: 'Contact | LaserHairRemovalMap',
  description: 'Get in touch with us. Share tips about equipment, report issues, or ask questions about laser hair removal technology.',
  alternates: {
    canonical: `${siteUrl}/is-it-a-real-laser/contact`,
  },
  openGraph: {
    title: 'Contact | LaserHairRemovalMap',
    description: 'Get in touch with us. Share tips about equipment, report issues, or ask questions about laser hair removal technology.',
    url: `${siteUrl}/is-it-a-real-laser/contact`,
    siteName: 'LaserHairRemovalMap',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main
      style={{
        backgroundColor: '#FAF9F7',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <article
        className="mx-auto max-w-2xl px-4 py-8 md:py-12"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Back to search link */}
        <nav style={{ marginBottom: '2.5rem' }}>
          <Link
            href="/is-it-a-real-laser"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#5E8B7E]"
            style={{ color: '#5A5550' }}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span style={{ letterSpacing: '0.02em' }}>Back to Search</span>
          </Link>
        </nav>

        {/* Header */}
        <header className="text-center" style={{ marginBottom: '2.5rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#2D2D2D',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Have Information About Equipment We Should Investigate?
          </h1>
          <p
            style={{
              color: '#5A5550',
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              maxWidth: '420px',
              margin: '0 auto',
            }}
          >
            Have a tip about equipment we should know about? Found an error? We&apos;d love to hear from you.
          </p>
        </header>

        {/* Contact Form */}
        <div className="flex justify-center" style={{ marginBottom: '3rem' }}>
          <ContactForm />
        </div>

        {/* What we're looking for */}
        <section
          className="rounded-xl"
          style={{
            backgroundColor: 'rgba(94, 139, 126, 0.06)',
            border: '1px solid rgba(94, 139, 126, 0.15)',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              color: '#5E8B7E',
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            What we&apos;re especially interested in
          </h2>
          <ul
            style={{
              color: '#5A5550',
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              paddingLeft: '1.25rem',
              margin: 0,
            }}
          >
            <li style={{ marginBottom: '0.5rem' }}>
              Equipment not yet in our database
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              Corrections to existing equipment information
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              Industry insights about machine quality and sourcing
            </li>
            <li>
              Information about white-labeled or rebranded devices
            </li>
          </ul>
        </section>

        {/* Privacy note */}
        <p
          className="text-center"
          style={{
            color: '#5A5550',
            fontSize: '0.8125rem',
            marginBottom: '2rem',
          }}
        >
          Your information stays private. We never share contact details.
        </p>

        <Footer />
      </article>
    </main>
  );
}
