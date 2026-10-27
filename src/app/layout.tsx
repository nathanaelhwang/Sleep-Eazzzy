import type { Metadata, Viewport } from 'next';
import { Archivo, Hanken_Grotesk } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next';
import './styles/base.css';
import './styles/home.css';
import './styles/module.css';
import './styles/widgets.css';
import './styles/pages.css';
import { isAuthEnabled } from '@/lib/auth/config';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

const hanken = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-hanken',
  display: 'swap',
});

// Headings: Archivo, set semi-expanded (wdth axis) so titles read as a different voice from body text.
const archivo = Archivo({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

// Runs before first paint so the saved (or system) theme never flashes.
// Keep the storage key in sync with components/ThemeToggle.tsx.
const THEME_SCRIPT = `(function(){var t=null;try{t=localStorage.getItem('se_theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: a free CBT-I program for insomnia`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'A free, self-paced course in cognitive behavioral therapy for insomnia (CBT-I). Seven short video modules; most people see their sleep change within 2 to 4 weeks.',
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef0f3' },
    { media: '(prefers-color-scheme: dark)', color: '#161b26' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const tree = (
    // data-theme is set by THEME_SCRIPT before hydration, hence suppressHydrationWarning.
    <html lang="en" className={`${hanken.variable} ${archivo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        {children}
        {/* Vercel Web Analytics — cookieless, no PII. Injects a tiny tracker
            only on production deploys; no-ops during local dev. */}
        <Analytics />
      </body>
    </html>
  );
  // Only mount <ClerkProvider> when auth env vars are configured; otherwise
  // the site renders without the auth context (and <AuthNav /> short-circuits).
  return isAuthEnabled ? <ClerkProvider>{tree}</ClerkProvider> : tree;
}
