import type { Metadata } from 'next';
import { ModulesIndex } from '@/components/ModulesIndex';
import { fillText } from '@/components/fill';
import { PROGRAM_MINUTES } from '@/lib/data';
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
    path: '/modules',
    title: dict.t.home_modules_h1 as string,
    description: fillText(dict.t.home_modules_lede as string, { n: new Intl.NumberFormat(lang).format(PROGRAM_MINUTES) }),
  });
}

export default function Page() {
  return <ModulesIndex />;
}
