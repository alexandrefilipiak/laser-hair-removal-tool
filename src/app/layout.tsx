import type { Metadata } from 'next';
import { Inter, DM_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://laserhairremovalmap.com'),
  title: {
    template: '%s | Laser Hair Removal Map',
    default: 'Is It A Real Laser? | Laser Hair Removal Map',
  },
  description:
    'Verify if your clinic uses a real laser or IPL device. Look up any laser hair removal machine and get instant classification.',
  openGraph: {
    type: 'website',
    siteName: 'Laser Hair Removal Map',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body
        className="antialiased min-h-screen"
        style={{
          backgroundColor: '#FAF9F7',
          color: '#2D2D2D',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
