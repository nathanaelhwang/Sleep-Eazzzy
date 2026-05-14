import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { LangProvider } from '@/components/LangProvider';
import { Nav } from '@/components/Nav';
import { getDictionary, isLocale } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/types';

export const dynamicParams = false;

export function generateStaticParams(): { lang: Locale }[] {
  return [{ lang: 'en' }, { lang: 'es' }, { lang: 'zh-Hant' }, { lang: 'zh-Hans' }];
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
