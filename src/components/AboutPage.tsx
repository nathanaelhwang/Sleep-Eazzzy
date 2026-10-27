'use client';

import { useT } from './LangProvider';

export function AboutPage() {
  const t = useT();
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>{t('about_h1')}</h1>
        <p>{t('about_sub')}</p>
      </header>

      <div className="about-cols pg-body">
        <div className="about-text measure">
          <section aria-labelledby="about-what">
            <h2 id="about-what">{t('about_what_h')}</h2>
            <p>{t('about_what_p')}</p>
          </section>
          <section aria-labelledby="about-who">
            <h2 id="about-who">{t('about_who_h')}</h2>
            <p>{t('about_who_p')}</p>
          </section>
        </div>

        <section className="about-isnt" aria-labelledby="about-isnt">
          <h2 id="about-isnt">{t('about_isnt_h')}</h2>
          <p>{t('about_doc_note')}</p>
          <div className="about-doctor">
            <h3>{t('about_doc_h')}</h3>
            <ul>
              <li>{t('about_doc_1')}</li>
              <li>{t('about_doc_2')}</li>
              <li>{t('about_doc_3')}</li>
            </ul>
          </div>
        </section>
      </div>

      <section className="section" aria-label={t('footer_disclaimer')}>
        <div className="note measure">
          <p>{t('disclaimer')}</p>
        </div>
      </section>
    </div>
  );
}
