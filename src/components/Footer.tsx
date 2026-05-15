'use client';

import Link from 'next/link';
import { useLang, useT } from './LangProvider';
import { BrandMark } from './BrandMark';

export function Footer() {
  const lang = useLang();
  const t = useT();
  const prefix = `/${lang}`;
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link
              href={prefix}
              className="brand"
              style={{ color: 'var(--cream)', textDecoration: 'none' }}
            >
              <BrandMark />
              <span style={{ color: 'var(--cream)' }}>
                Sleep Ea<span style={{ color: 'var(--sand)' }}>zzz</span>y
              </span>
            </Link>
            <p>{t('footer_tag')}</p>
          </div>
          <div>
            <h4>{t('footer_program')}</h4>
            <Link href={prefix}>{t('home')}</Link>
            <Link href={`${prefix}/modules`}>{t('modules')}</Link>
            <Link href={`${prefix}/tools`}>{t('tools')}</Link>
            <Link href={`${prefix}/library`}>{t('library')}</Link>
          </div>
          <div>
            <h4>{t('footer_resources')}</h4>
            <Link href={`${prefix}/about`}>{t('footer_about')}</Link>
            <Link href={`${prefix}/privacy`}>{t('privacy')}</Link>
            <Link href={`${prefix}/terms`}>{t('terms')}</Link>
            <Link href={`${prefix}/privacy`}>{t('footer_disclaimer')}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            © {year} OWND LLC. {t('footer_copy')}
          </div>
          <div>{t('footer_consult')}</div>
        </div>
      </div>
    </footer>
  );
}
