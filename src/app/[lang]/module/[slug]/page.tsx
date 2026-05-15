import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ModulePage } from '@/components/ModulePage';
import { getDictionary, isLocale } from '@/lib/i18n/getDictionary';
import { buildPageMetadata } from '@/lib/seo';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const mod = dict.modules.find((m) => m.slug === slug);
  if (!mod) return {};
  const labelKey = mod.bonus ? 'bonus_label' : 'module_label';
  const label = (dict.t[labelKey] as string) ?? '';
  return buildPageMetadata({
    lang,
    path: `/module/${slug}`,
    title: `${label} ${mod.num}: ${mod.title}`,
    description: mod.subtitle,
  });
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
  return (
    <Suspense fallback={null}>
      <ModulePage mod={mod} />
    </Suspense>
  );
}
