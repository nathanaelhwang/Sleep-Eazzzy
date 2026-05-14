'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useStored } from '@/lib/useStored';
import { useLang, useModules, useT } from './LangProvider';

type Progress = Record<number, boolean>;

export function ModulesIndex() {
  const lang = useLang();
  const t = useT();
  const mods = useModules();
  const prefix = `/${lang}`;

  const [progress] = useStored<Progress>('progress', {});
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live: Progress = mounted ? progress : {};

  return (
    <>
      <header className="mod-hero">
        <div className="container">
          <div className="mod-eyebrow">{t('all_eyebrow')}</div>
          <h1>{t('all_title')}</h1>
          <p className="mod-hero-sub">{t('all_sub')}</p>
        </div>
      </header>
      <div className="container mod-body">
        <div className="modules">
          {mods.map((m) => (
            <Link
              key={m.id}
              href={`${prefix}/module/${m.slug}`}
              className="module-card"
              style={{ textDecoration: 'none' }}
            >
              <div className="module-card-head">
                <div className="module-num">
                  {m.bonus ? `${t('bonus_label')} · ` : `${t('module_label')} `}
                  {m.num}
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
                  {live[m.id] ? t('complete') : t('open_label')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
