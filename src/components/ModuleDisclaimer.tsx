'use client';

import Link from 'next/link';
import { useLang, useT } from './LangProvider';

/**
 * Subtle "educational only" banner shown above the fold on every module page.
 * Renders the localized short disclaimer (`disclaimer_short`) plus a link to
 * the full privacy / disclaimer page.
 */
export function ModuleDisclaimer() {
  const t = useT();
  const lang = useLang();
  return (
    <div
      role="note"
      style={{
        marginTop: 0,
        marginBottom: 24,
        padding: '10px 16px',
        borderRadius: 8,
        background: 'rgba(15, 30, 58, 0.04)',
        border: '1px solid var(--line)',
        fontSize: 13,
        lineHeight: 1.5,
        color: 'var(--muted)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'baseline',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 14 }}>ⓘ</span>
      <span style={{ color: 'var(--ink)' }}>{t('disclaimer_short')}</span>
      <Link
        href={`/${lang}/privacy`}
        style={{ color: 'var(--denim)', textDecoration: 'underline', marginLeft: 'auto' }}
      >
        {t('footer_disclaimer')}
      </Link>
    </div>
  );
}
