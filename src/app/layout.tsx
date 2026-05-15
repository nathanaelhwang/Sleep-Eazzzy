import type { Metadata, Viewport } from 'next';
import './globals.css';
import './styles.css';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — A free CBT-I patient program`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    'A free, self-paced Cognitive Behavioral Therapy for Insomnia program. Seven short modules — most people see real change in 2 to 4 weeks. No prescription required.',
  applicationName: SITE_NAME,
  authors: [{ name: 'OWND LLC' }],
  generator: 'Next.js',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: '#0f1e3a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
