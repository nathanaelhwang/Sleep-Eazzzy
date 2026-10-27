'use client';

import type { Module } from '@/lib/data';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { useModContent } from '../LangProvider';
import { PullQuote } from '../PullQuote';
import { Article, ModuleShell, type ModuleItem } from './Shell';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;
type Step = { t: string; b: string };

export function StimulusModule({ mod }: { mod: Module }) {
  const c = useModContent(5) as Content;
  const steps = (c.steps as Step[] | undefined) ?? [];

  const items: ModuleItem[] = [
    {
      id: 'article',
      kind: 'article',
      title: c.why_h,
      content: (
        <Article title={c.why_h}>
          <HostCard quote={c.hostQuote} />
          <p>{c.why_p1}</p>
          <p>{c.why_p2}</p>
          <PullQuote>{c.pull}</PullQuote>
        </Article>
      ),
    },
    {
      id: 'rule',
      kind: 'article',
      title: c.rule_h,
      content: (
        <Article title={c.rule_h}>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={i}>
                <span>
                  <b>{s.t}</b>
                  <span className="step-body">{s.b}</span>
                </span>
              </li>
            ))}
          </ol>
          <Callout label={c.feels_label}>{c.feels}</Callout>
        </Article>
      ),
    },
  ];

  return <ModuleShell mod={mod} items={items} />;
}
