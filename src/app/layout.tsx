import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body className="antialiased min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
