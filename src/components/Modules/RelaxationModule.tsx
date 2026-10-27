'use client';

import Link from 'next/link';
import type { Module } from '@/lib/data';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { useLang, useModContent, useT } from '../LangProvider';
import { BreathingTimer } from '../Widgets/BreathingTimer';
import { PMRWalkthrough } from '../Widgets/PMRWalkthrough';
import { Article, ModuleShell, type ModuleItem } from './Shell';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;

/** A muted line pointing to the sounds page. */
function LibraryLine({ hint }: { hint: string }) {
  const t = useT();
  const lang = useLang();
  return (
    <p className="mod-libline small muted">
      {hint} <Link href={`/${lang}/library`}>{t('mod_library_open')}</Link>
    </p>
  );
}

export function RelaxationModule({ mod }: { mod: Module }) {
  const t = useT();
  const c = useModContent(4) as Content;
  const tools = (c.tools as string[] | undefined) ?? [];

  const items: ModuleItem[] = [
    {
      id: 'article',
      kind: 'article',
      title: c.h1,
      content: (
        <Article title={c.h1}>
          <HostCard quote={c.hostQuote} />
          <ul className="rows">
            {tools.map((tool, i) => (
              <li key={i}>{tool}</li>
            ))}
          </ul>
        </Article>
      ),
    },
    {
      id: 'breathing',
      kind: 'tool',
      title: t('w_breath_title'),
      content: (
        <>
          <BreathingTimer />
          <LibraryLine hint={t('library_breathing_hint')} />
        </>
      ),
    },
    {
      id: 'pmr',
      kind: 'tool',
      title: c.pmr_h,
      content: (
        <>
          <Article title={c.pmr_h}>
            <p>{c.pmr_p}</p>
          </Article>
          <PMRWalkthrough />
          <LibraryLine hint={t('library_pmr_hint')} />
        </>
      ),
    },
    {
      id: 'imagery',
      kind: 'article',
      title: c.gi_h,
      content: (
        <Article title={c.gi_h}>
          <p>{c.gi_p}</p>
          <LibraryLine hint={t('library_relaxation_hint')} />
        </Article>
      ),
    },
    {
      id: 'journaling',
      kind: 'article',
      title: c.jr_h,
      content: (
        <Article title={c.jr_h}>
          <p>{c.jr_p}</p>
          <Callout label={c.tonight_label}>{c.tonight}</Callout>
        </Article>
      ),
    },
  ];

  return <ModuleShell mod={mod} items={items} />;
}
