'use client';

import { useRouter, usePathname } from 'next/navigation';
import { LOCALES } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/types';
import { useLang } from './LangProvider';

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
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (loc: Locale): string => {
    const segments = pathname.split('/');
    if (segments.length < 2) return `/${loc}`;
    segments[1] = loc;
    return segments.join('/') || `/${loc}`;
  };

  return (
    <select
      value={current}
      onChange={(e) => router.push(switchTo(e.target.value as Locale))}
      aria-label="Language"
      style={{
        marginLeft: 8,
        padding: '6px 28px 6px 12px',
        borderRadius: 999,
        border: 'none',
        background:
          "var(--cream-2) url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' fill='none' stroke='%2316243f' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\") no-repeat right 10px center",
        color: 'var(--ink)',
        fontSize: 13,
        fontWeight: 500,
        cursor: 'pointer',
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        fontFamily: 'inherit',
      }}
    >
      {LOCALES.map((loc) => (
        <option key={loc} value={loc}>
          {LABELS[loc]}
        </option>
      ))}
    </select>
  );
}
