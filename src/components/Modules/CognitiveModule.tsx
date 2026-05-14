'use client';

import type { Module } from '@/lib/data';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { MarkComplete } from '../MarkComplete';
import { ModuleHero } from '../ModuleHero';
import { ModuleNav } from '../ModuleNav';
import { PullQuote } from '../PullQuote';
import { useModContent, useT } from '../LangProvider';
import { VideoPlayer } from '../VideoPlayer';
import { ReframeJournal } from '../Widgets/ReframeJournal';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;

export function CognitiveModule({ mod }: { mod: Module }) {
  const t = useT();
  const c = useModContent(2) as Content;
  const thoughts = (c.thoughts as string[] | undefined) ?? [];

  return (
    <>
      <ModuleHero mod={mod} />
      <div className="container container-narrow mod-body">
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration} />
        <HostCard quote={c.hostQuote} />

        <div className="lesson-block" style={{ marginTop: 24 }}>
          <h4>{c.h1}</h4>
          <p>{c.p1a}</p>
          <p>{c.p1b}</p>
        </div>

        <div className="lesson-block">
          <h4>{c.h2}</h4>
          <ul>
            <li>{c.li1}</li>
            <li>{c.li2}</li>
          </ul>
          <p>{c.p2}</p>
        </div>

        <PullQuote>{c.pull}</PullQuote>

        <div className="lesson-block">
          <h4>{c.h3}</h4>
          <p>{c.p3}</p>
          <ul style={{ marginTop: 8 }}>
            {thoughts.map((th, i) => (
              <li key={i}>{th}</li>
            ))}
          </ul>
          <p style={{ marginTop: 14 }}>{c.p3b}</p>
        </div>

        <div id="tool-reframe" style={{ scrollMarginTop: 80 }}>
          <ReframeJournal />
        </div>

        <Callout label={c.assignment_label}>{c.assignment}</Callout>

        <MarkComplete moduleId={mod.id} />
        <ModuleNav current={mod.id} />
      </div>
    </>
  );
}
