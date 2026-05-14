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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;
type Step = { t: string; b: string };

export function StimulusModule({ mod }: { mod: Module }) {
  const t = useT();
  const c = useModContent(5) as Content;
  const steps = (c.steps as Step[] | undefined) ?? [];

  return (
    <>
      <ModuleHero mod={mod} />
      <div className="container container-narrow mod-body">
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration} />
        <HostCard quote={c.hostQuote} />

        <div className="lesson-block" style={{ marginTop: 24 }}>
          <h4>{c.why_h}</h4>
          <p>{c.why_p1}</p>
          <p>{c.why_p2}</p>
        </div>

        <PullQuote>{c.pull}</PullQuote>

        <h3 style={{ marginTop: 36, marginBottom: 16 }}>{c.rule_h}</h3>
        {steps.map((s, i) => (
          <div key={i} className="flow-step">
            <div className="flow-num">{i + 1}</div>
            <div>
              <h4>{s.t}</h4>
              <p>{s.b}</p>
            </div>
          </div>
        ))}

        <Callout label={c.feels_label}>{c.feels}</Callout>

        <MarkComplete moduleId={mod.id} />
        <ModuleNav current={mod.id} />
      </div>
    </>
  );
}
