'use client';

import Link from 'next/link';
import type { Module } from '@/lib/data';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { MarkComplete } from '../MarkComplete';
import { ModuleDisclaimer } from '../ModuleDisclaimer';
import { ModuleHero } from '../ModuleHero';
import { ModuleNav } from '../ModuleNav';
import { useLang, useModContent, useT } from '../LangProvider';
import { VideoPlayer } from '../VideoPlayer';
import { BreathingTimer } from '../Widgets/BreathingTimer';
import { PMRWalkthrough } from '../Widgets/PMRWalkthrough';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;

export function RelaxationModule({ mod }: { mod: Module }) {
  const t = useT();
  const lang = useLang();
  const c = useModContent(4) as Content;
  const tools = (c.tools as string[] | undefined) ?? [];
  const libraryHref = `/${lang}/library`;

  return (
    <>
      <ModuleHero mod={mod} />
      <div className="container container-narrow mod-body">
        <ModuleDisclaimer />
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration} />
        <HostCard quote={c.hostQuote} />

        <div className="lesson-block" style={{ marginTop: 24 }}>
          <h4>{c.h1}</h4>
          <ol>
            {tools.map((tool, i) => (
              <li key={i}>{tool}</li>
            ))}
          </ol>
        </div>

        <div id="tool-breathing" style={{ scrollMarginTop: 80 }}>
          <BreathingTimer />
        </div>
        <p style={{ margin: '12px 4px 0', fontSize: 14, color: 'var(--muted)' }}>
          <Link
            href={libraryHref}
            style={{ color: 'var(--denim)', textDecoration: 'underline', fontWeight: 600 }}
          >
            {t('library_see')}
          </Link>{' '}
          {t('library_breathing_hint')}
        </p>

        <div className="lesson-block">
          <h4>{c.pmr_h}</h4>
          <p>{c.pmr_p}</p>
        </div>

        <div id="tool-pmr" style={{ scrollMarginTop: 80 }}>
          <PMRWalkthrough />
        </div>
        <p style={{ margin: '12px 4px 0', fontSize: 14, color: 'var(--muted)' }}>
          <Link
            href={libraryHref}
            style={{ color: 'var(--denim)', textDecoration: 'underline', fontWeight: 600 }}
          >
            {t('library_see')}
          </Link>{' '}
          {t('library_pmr_hint')}
        </p>

        <div className="lesson-block">
          <h4>{c.gi_h}</h4>
          <p>{c.gi_p}</p>
          <p style={{ marginTop: 10 }}>
            <Link
              href={libraryHref}
              style={{ color: 'var(--denim)', textDecoration: 'underline', fontWeight: 600 }}
            >
              {t('library_see')}
            </Link>{' '}
            <span style={{ color: 'var(--muted)' }}>{t('library_relaxation_hint')}</span>
          </p>
        </div>

        <div className="lesson-block">
          <h4>{c.jr_h}</h4>
          <p>{c.jr_p}</p>
        </div>

        <Callout label={c.tonight_label}>{c.tonight}</Callout>

        <MarkComplete moduleId={mod.id} />
        <ModuleNav current={mod.id} />
      </div>
    </>
  );
}
