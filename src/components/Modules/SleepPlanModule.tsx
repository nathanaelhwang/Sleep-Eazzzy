'use client';

import type { Module } from '@/lib/data';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { useModContent, useT } from '../LangProvider';
import { PullQuote } from '../PullQuote';
import { RoutineBuilder } from '../Widgets/RoutineBuilder';
import { Article, ModuleShell, type ModuleItem } from './Shell';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;

export function SleepPlanModule({ mod }: { mod: Module }) {
  const t = useT();
  const c = useModContent(7) as Content;
  const routine = (c.items as string[] | undefined) ?? [];

  const items: ModuleItem[] = [
    {
      id: 'article',
      kind: 'example',
      title: c.h1,
      content: (
        <Article title={c.h1}>
          <HostCard quote={c.hostQuote} />
          <p>{c.p1}</p>
          <ul className="rows">
            {routine.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </Article>
      ),
    },
    { id: 'routine', kind: 'tool', title: t('routine_title'), content: <RoutineBuilder /> },
    {
      id: 'rules',
      kind: 'article',
      title: c.h2,
      content: (
        <Article title={c.h2}>
          <p>
            <strong>{c.p2a_b}</strong> {c.p2a}
          </p>
          <p>
            <strong>{c.p2b_b}</strong> {c.p2b}
          </p>
          <PullQuote>{c.pull}</PullQuote>
          <Callout label={c.next_label}>{c.next}</Callout>
        </Article>
      ),
    },
  ];

  return <ModuleShell mod={mod} items={items} />;
}
