import type { Metadata } from 'next';
import { TermsPage } from '@/components/TermsPage';
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
    path: '/terms',
    title: (dict.t.terms as string) ?? 'Terms',
    description: 'Plain-language ground rules for using Sleep Eazzzy.',
  });
}

export default function Page() {
  return <TermsPage />;
}
