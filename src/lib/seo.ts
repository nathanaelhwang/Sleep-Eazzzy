import type { Metadata } from 'next';
import type { Locale } from './i18n/types';

export const SITE_URL = 'https://sleepeazzzy.org';
export const SITE_NAME = 'Sleep Eazzzy';

// Open Graph wants BCP-47 with underscores. Match each Locale to a representative region.
const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  'zh-Hant': 'zh_TW',
  'zh-Hans': 'zh_CN',
};

const ALL_LOCALES: Locale[] = ['en', 'es', 'zh-Hant', 'zh-Hans'];

function languagesFor(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const loc of ALL_LOCALES) {
    langs[loc] = `/${loc}${path}`;
  }
  langs['x-default'] = `/en${path}`;
  return langs;
}

/**
 * Build per-page metadata with localized title, description, OG card, and the
 * proper canonical + alternates.languages for SEO. `path` is the suffix after
 * the locale prefix (e.g. '/about', '/module/intro'); pass '' for the home.
 */
export function buildPageMetadata(opts: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  isHome?: boolean;
}): Metadata {
  const { lang, path, title, description, isHome } = opts;
  const url = `/${lang}${path}`;
  const fullTitle = isHome ? `${SITE_NAME} — ${title}` : `${title} · ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: languagesFor(path),
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      locale: OG_LOCALE[lang],
      alternateLocale: ALL_LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
