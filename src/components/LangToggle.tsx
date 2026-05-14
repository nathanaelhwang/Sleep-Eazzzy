'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/types';
import { useLang } from './LangProvider';

const LABELS: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  'zh-Hant': '繁',
  'zh-Hans': '简',
};

export function LangToggle() {
  const current = useLang();
  const pathname = usePathname();

  const switchTo = (loc: Locale): string => {
    const segments = pathname.split('/');
    if (segments.length < 2) return `/${loc}`;
    segments[1] = loc;
    return segments.join('/') || `/${loc}`;
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        marginLeft: 8,
        padding: 3,
        borderRadius: 999,
        background: 'var(--cream-2)',
      }}
    >
      {LOCALES.map((loc) => {
        const active = current === loc;
        return (
          <Link
            key={loc}
            href={switchTo(loc)}
            style={{
              padding: '5px 11px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              textDecoration: 'none',
              background: active ? 'var(--night)' : 'transparent',
              color: active ? 'var(--cream)' : 'var(--ink)',
            }}
          >
            {LABELS[loc]}
          </Link>
        );
      })}
    </div>
  );
}
