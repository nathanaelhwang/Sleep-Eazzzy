import type { Metadata } from 'next';
import { PrivacyPage } from '@/components/PrivacyPage';
import { getDictionary, isLocale } from '@/lib/i18n/getDictionary';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildPageMetadata({
    lang,
    path: '/privacy',
    title: (dict.t.privacy as string) ?? 'Privacy',
    description: 'How Sleep Eazzzy handles your information. We collect as little as possible — and we never sell it.',
  });
}

export default function Page() {
  return <PrivacyPage />;
}
