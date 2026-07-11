'use client';

import type { Module } from '@/lib/data';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { MarkComplete } from '../MarkComplete';
import { ModuleDisclaimer } from '../ModuleDisclaimer';
import { ModuleHero } from '../ModuleHero';
import { ModuleNav } from '../ModuleNav';
import { PullQuote } from '../PullQuote';
import { useModContent, useT } from '../LangProvider';
import { VideoPlayer } from '../VideoPlayer';
import { RoutineBuilder } from '../Widgets/RoutineBuilder';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;

export function SleepPlanModule({ mod }: { mod: Module }) {
  const t = useT();
  const c = useModContent(7) as Content;
  const items = (c.items as string[] | undefined) ?? [];

  return (
    <>
      <ModuleHero mod={mod} />
      <div className="container container-narrow mod-body">
        <ModuleDisclaimer />
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration} />
        <HostCard quote={c.hostQuote} />

        <div className="lesson-block" style={{ marginTop: 24 }}>
          <h4>{c.h1}</h4>
          <p>{c.p1}</p>
          <ul style={{ marginTop: 10 }}>
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>

        <RoutineBuilder />

        <div className="lesson-block">
          <h4>{c.h2}</h4>
          <p>
            <strong>{c.p2a_b}</strong> {c.p2a}
          </p>
          <p>
            <strong>{c.p2b_b}</strong> {c.p2b}
          </p>
        </div>

        <PullQuote>{c.pull}</PullQuote>

        <Callout label={c.next_label}>{c.next}</Callout>

        <MarkComplete moduleId={mod.id} />
        <ModuleNav current={mod.id} />
      </div>
    </>
  );
}
