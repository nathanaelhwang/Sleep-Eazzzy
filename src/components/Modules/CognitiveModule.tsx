'use client';

import type { Module } from '@/lib/data';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { useModContent, useT } from '../LangProvider';
import { PullQuote } from '../PullQuote';
import { ReframeJournal } from '../Widgets/ReframeJournal';
import { Article, ModuleShell, type ModuleItem } from './Shell';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;

export function CognitiveModule({ mod }: { mod: Module }) {
  const t = useT();
  const c = useModContent(2) as Content;
  const thoughts = (c.thoughts as string[] | undefined) ?? [];

  const items: ModuleItem[] = [
    {
      id: 'article',
      kind: 'article',
      title: c.h1,
      content: (
        <Article title={c.h1}>
          <HostCard quote={c.hostQuote} />
          <p>{c.p1a}</p>
          <p>{c.p1b}</p>
          <h3>{c.h2}</h3>
          <ul>
            <li>{c.li1}</li>
            <li>{c.li2}</li>
          </ul>
          <p>{c.p2}</p>
          <PullQuote>{c.pull}</PullQuote>
        </Article>
      ),
    },
    {
      id: 'thoughts',
      kind: 'example',
      title: c.h3,
      content: (
        <Article title={c.h3}>
          <p className="muted">{c.p3}</p>
          <ul className="rows mod-thoughts">
            {thoughts.map((th, i) => (
              <li key={i}>{th}</li>
            ))}
          </ul>
          <p className="muted">{c.p3b}</p>
          <Callout label={c.assignment_label}>{c.assignment}</Callout>
        </Article>
      ),
    },
    { id: 'reframe', kind: 'tool', title: t('reframe_title'), content: <ReframeJournal /> },
  ];

  return <ModuleShell mod={mod} items={items} />;
}
