'use client';

import Link from 'next/link';
import { useLang, useT } from './LangProvider';

export function Footer() {
  const lang = useLang();
  const t = useT();
  const prefix = `/${lang}`;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>
          © {year} OWND LLC. {t('footer_line')}
        </p>
        <nav aria-label={t('nav_legal')}>
          <Link href={`${prefix}/about`}>{t('footer_about')}</Link>
          <Link href={`${prefix}/privacy`}>{t('privacy')}</Link>
          <Link href={`${prefix}/terms`}>{t('terms')}</Link>
          <Link href={`${prefix}/privacy#disclaimer`}>{t('footer_disclaimer')}</Link>
        </nav>
      </div>
    </footer>
  );
}
