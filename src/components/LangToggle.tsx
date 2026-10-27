'use client';

import { useRouter, usePathname } from 'next/navigation';
import { LOCALES } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/types';
import { useLang, useT } from './LangProvider';

const LABELS: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  'zh-Hant': '繁體中文',
  'zh-Hans': '简体中文',
  ko: '한국어',
  fa: 'فارسی',
  vi: 'Tiếng Việt',
  hi: 'हिन्दी',
};

export function LangToggle() {
  const current = useLang();
  const t = useT();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (loc: Locale): string => {
    const segments = pathname.split('/');
    if (segments.length < 2) return `/${loc}`;
    segments[1] = loc;
    return segments.join('/') || `/${loc}`;
  };

  return (
    <>
      <label className="sr" htmlFor="lang-select">
        {t('language')}
      </label>
      <select
        id="lang-select"
        className="select"
        value={current}
        onChange={(e) => router.push(switchTo(e.target.value as Locale))}
      >
        {LOCALES.map((loc) => (
          <option key={loc} value={loc} lang={loc} dir={loc === 'fa' ? 'rtl' : undefined}>
            {LABELS[loc]}
          </option>
        ))}
      </select>
    </>
  );
}
