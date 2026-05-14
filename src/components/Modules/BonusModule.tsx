'use client';

import type { Module } from '@/lib/data';
import { HostCard } from '../HostCard';
import { MarkComplete } from '../MarkComplete';
import { ModuleHero } from '../ModuleHero';
import { ModuleNav } from '../ModuleNav';
import { useModContent, useT } from '../LangProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;
type Section = { h: string; p: string };

export function BonusModule({ mod }: { mod: Module }) {
  const t = useT();
  const c = useModContent(mod.id) as Content;
  const sections = (c.sections as Section[] | undefined) ?? [];

  return (
    <>
      <ModuleHero mod={mod} />
      <div className="container container-narrow mod-body">
        <HostCard quote={c.hostQuote} />
        <div className="lesson-block" style={{ marginTop: 24 }}>
          <p style={{ fontSize: 17 }}>{c.summary}</p>
        </div>
        {mod.id === 9 && (
          <div className="lesson-block">
            <h4>{t('pos_examples_h')}</h4>
            <p>{t('pos_examples_p')}</p>
            <div className="pos-grid">
              <figure className="pos-fig">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/sleep-supine.webp" alt={t('pos_supine_cap')} />
                <figcaption>{t('pos_supine_cap')}</figcaption>
              </figure>
              <figure className="pos-fig">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/sleep-side.webp" alt={t('pos_side_cap')} />
                <figcaption>{t('pos_side_cap')}</figcaption>
              </figure>
            </div>
          </div>
        )}
        {sections.map((s, i) => (
          <div key={i} className="lesson-block">
            <h4>{s.h}</h4>
            <p dangerouslySetInnerHTML={{ __html: s.p }} />
          </div>
        ))}
        <MarkComplete moduleId={mod.id} />
        <ModuleNav current={mod.id} />
      </div>
    </>
  );
}
