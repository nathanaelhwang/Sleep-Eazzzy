import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ModulePage } from '@/components/ModulePage';
import { getDictionary, isLocale } from '@/lib/i18n/getDictionary';

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ lang: string; slug: string }[]> {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of ['en', 'es', 'zh-Hant', 'zh-Hans'] as const) {
    const dict = await getDictionary(lang);
    for (const m of dict.modules) {
      out.push({ lang, slug: m.slug });
    }
  }
  return out;
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const mod = dict.modules.find((m) => m.slug === slug);
  if (!mod) notFound();
  // Suspense boundary required because ModulePage uses useSearchParams,
  // which must opt into client-side hydration when the rest of the page is SSG.
  return (
    <Suspense fallback={null}>
      <ModulePage mod={mod} />
    </Suspense>
  );
}
