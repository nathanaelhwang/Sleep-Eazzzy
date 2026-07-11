import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { LangProvider } from '@/components/LangProvider';
import { Nav } from '@/components/Nav';
import { getDictionary, isLocale } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/types';
import { buildPageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams(): { lang: Locale }[] {
  return [{ lang: 'en' }, { lang: 'es' }, { lang: 'zh-Hant' }, { lang: 'zh-Hans' }, { lang: 'ko' }, { lang: 'fa' }, { lang: 'vi' }, { lang: 'hi' }];
}

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
    path: '',
    title: dict.t.eyebrow_program as string,
    description: dict.t.hero_sub as string,
    isHome: true,
  });
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <LangProvider lang={lang} dict={dict}>
      <Nav />
      {children}
      <Footer />
    </LangProvider>
  );
}
