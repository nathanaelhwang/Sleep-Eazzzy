'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProgress, type Progress } from '@/lib/useProgress';
import { HostCard } from './HostCard';
import { useLang, useModules, useT } from './LangProvider';

export function Home() {
  const lang = useLang();
  const t = useT();
  const mods = useModules();
  const prefix = `/${lang}`;

  const { progress } = useProgress();

  // Avoid hydration mismatch — only reflect progress after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live: Progress = mounted ? progress : {};

  const core = mods.filter((m) => !m.bonus);
  const bonus = mods.filter((m) => m.bonus);
  const completedCount = Object.values(live).filter(Boolean).length;
  const nextMod = mods.find((m) => !live[m.id]) || mods[0];

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">{t('eyebrow_program')}</div>
              <h1>
                {t('hero_title_a')}
                <em>{t('hero_title_em')}</em>
                {t('hero_title_b')}
                <br />
                {t('hero_title_c')}
              </h1>
              <p className="hero-sub">{t('hero_sub')}</p>
              <div className="hero-cta">
                <Link href={`${prefix}/module/${nextMod.slug}`} className="btn btn-primary">
                  {completedCount > 0
                    ? `${t('hero_continue')} · ${t('module_label')} ${nextMod.num}`
                    : t('hero_start')}
                </Link>
                <Link href={`${prefix}/about`} className="btn btn-ghost">
                  {t('how_it_works')}
                </Link>
              </div>
            </div>
            <HostCard />
          </div>

          <div className="stats">
            <div>
              <div className="stat-num">7</div>
              <div className="stat-label">{t('stat_modules')}</div>
            </div>
            <div>
              <div className="stat-num">2–4 wk</div>
              <div className="stat-label">{t('stat_results')}</div>
            </div>
            <div>
              <div className="stat-num">
                {completedCount}/{mods.length}
              </div>
              <div className="stat-label">{t('stat_progress')}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t('section_program_eyebrow')}</div>
              <h2>
                {t('section_program_title_a')}
                <br />
                {t('section_program_title_b')}
              </h2>
              <p>{t('section_program_sub')}</p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Link href={`${prefix}/tools`} className="btn btn-ghost">
                {t('skip_to_tools')}
              </Link>
            </div>
          </div>

          <div className="modules">
            {core.map((m) => {
              const status = live[m.id] ? 'done' : '';
              return (
                <Link
                  key={m.id}
                  href={`${prefix}/module/${m.slug}`}
                  className="module-card"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="module-card-head">
                    <div className="module-num">
                      {t('module_label')} {m.num}
                    </div>
                    <div className="module-time">{m.duration}</div>
                  </div>
                  <h3>{m.title}</h3>
                  <p className="module-card-desc">{m.subtitle}</p>
                  <div className="module-card-foot">
                    <div className="module-tags">
                      {m.tags.map((tg, i) => (
                        <span key={i} className="tag">
                          {tg}
                        </span>
                      ))}
                    </div>
                    <div className="module-status">
                      <span className={'status-dot ' + status} />
                      {status === 'done' ? t('complete') : t('not_started')}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t('section_bonus_eyebrow')}</div>
              <h2>{t('section_bonus_title')}</h2>
              <p>{t('section_bonus_sub')}</p>
            </div>
          </div>
          <div className="modules">
            {bonus.map((m) => (
              <Link
                key={m.id}
                href={`${prefix}/module/${m.slug}`}
                className="module-card"
                style={{ textDecoration: 'none' }}
              >
                <div className="module-card-head">
                  <div className="module-num">
                    {t('bonus_label')} · {m.num}
                  </div>
                  <div className="module-time">{m.duration}</div>
                </div>
                <h3>{m.title}</h3>
                <p className="module-card-desc">{m.subtitle}</p>
                <div className="module-card-foot">
                  <div className="module-tags">
                    {m.tags.map((tg, i) => (
                      <span key={i} className={'tag' + (tg === 'Bonus' ? ' bonus' : '')}>
                        {tg}
                      </span>
                    ))}
                  </div>
                  <div className="module-status">
                    <span className={'status-dot ' + (live[m.id] ? 'done' : '')} />
                    {live[m.id] ? t('complete') : t('optional')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section"
        style={{
          background: 'var(--cream-2)',
          borderTop: '1px solid var(--line-2)',
          borderBottom: '1px solid var(--line-2)',
        }}
      >
        <div className="container container-narrow" style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            {t('cases_eyebrow')}
          </div>
          <h2 style={{ marginTop: 8 }}>{t('cases_title')}</h2>
          <p style={{ maxWidth: 620, margin: '20px auto 0', color: 'var(--muted)' }}>
            {t('cases_body')}
          </p>
          <Link
            href={`${prefix}/module/intro`}
            className="btn btn-primary"
            style={{ marginTop: 28, textDecoration: 'none' }}
          >
            {t('cases_cta')}
          </Link>
        </div>
      </section>
    </>
  );
}
