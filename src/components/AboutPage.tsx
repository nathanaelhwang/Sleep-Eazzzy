'use client';

import { HostCard } from './HostCard';
import { useT } from './LangProvider';

export function AboutPage() {
  const t = useT();
  return (
    <>
      <header className="mod-hero">
        <div className="container">
          <div className="mod-eyebrow">{t('about_eyebrow')}</div>
          <h1>{t('about_title')}</h1>
          <p className="mod-hero-sub">{t('about_sub')}</p>
        </div>
      </header>
      <div className="container container-narrow mod-body">
        <HostCard />
        <div className="lesson-block" style={{ marginTop: 24 }}>
          <h4>{t('about_what_h')}</h4>
          <p>{t('about_what_p')}</p>
        </div>
        <div className="lesson-block">
          <h4>{t('about_who_h')}</h4>
          <p>{t('about_who_p')}</p>
        </div>
        <div className="lesson-block">
          <h4>{t('about_isnt_h')}</h4>
          <p>{t('about_isnt_p')}</p>
        </div>
        <div className="disclaimer-box" style={{ marginTop: 24 }}>
          {t('disclaimer')}
        </div>
      </div>
    </>
  );
}
