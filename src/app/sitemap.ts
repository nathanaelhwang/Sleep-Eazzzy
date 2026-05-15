import type { MetadataRoute } from 'next';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { SITE_URL } from '@/lib/seo';
import type { Locale } from '@/lib/i18n/types';

const STATIC_PATHS: { path: string; priority: number }[] = [
  { path: '',          priority: 1.0 },
  { path: '/about',    priority: 0.6 },
  { path: '/modules',  priority: 0.8 },
  { path: '/tools',    priority: 0.7 },
  { path: '/library',  priority: 0.6 },
  { path: '/privacy',  priority: 0.3 },
  { path: '/terms',    priority: 0.3 },
];

const LOCALES: Locale[] = ['en', 'es', 'zh-Hant', 'zh-Hans'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];

  for (const lang of LOCALES) {
    const dict = await getDictionary(lang);

    for (const { path, priority } of STATIC_PATHS) {
      out.push({
        url: `${SITE_URL}/${lang}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority,
      });
    }

    for (const m of dict.modules) {
      out.push({
        url: `${SITE_URL}/${lang}/module/${m.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: m.bonus ? 0.5 : 0.7,
      });
    }
  }

  return out;
}
