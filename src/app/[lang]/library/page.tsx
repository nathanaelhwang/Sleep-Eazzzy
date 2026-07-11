import type { Metadata } from 'next';
import { LibraryPage } from '@/components/LibraryPage';
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
    path: '/library',
    title: dict.t.library_title as string,
    description: dict.t.library_sub as string,
  });
}

export default function Page() {
  return <LibraryPage />;
}
