import type { Metadata } from 'next';
import { ToolsPage } from '@/components/ToolsPage';
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
    path: '/tools',
    title: dict.t.tools_title as string,
    description: dict.t.tools_sub as string,
  });
}

export default function Page() {
  return <ToolsPage />;
}
