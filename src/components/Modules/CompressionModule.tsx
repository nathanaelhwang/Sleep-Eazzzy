'use client';

import type { Module } from '@/lib/data';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { MarkComplete } from '../MarkComplete';
import { ModuleDisclaimer } from '../ModuleDisclaimer';
import { ModuleHero } from '../ModuleHero';
import { ModuleNav } from '../ModuleNav';
import { useModContent, useT } from '../LangProvider';
import { VideoPlayer } from '../VideoPlayer';
import { CompressionCalc } from '../Widgets/CompressionCalc';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;

export function CompressionModule({ mod }: { mod: Module }) {
  const t = useT();
  const c = useModContent(6) as Content;
  const steps = (c.steps as string[] | undefined) ?? [];

  return (
    <>
      <ModuleHero mod={mod} />
      <div className="container container-narrow mod-body">
        <ModuleDisclaimer />
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration} />
        <HostCard quote={c.hostQuote} />

        <div className="lesson-block" style={{ marginTop: 24 }}>
          <h4>{c.h1}</h4>
          <p>{c.p1a}</p>
          <p>{c.p1b}</p>
        </div>

        <div className="lesson-block">
          <h4>{c.bob_h}</h4>
          <p>{c.bob_p}</p>
        </div>

        <div id="tool-calc" style={{ scrollMarginTop: 80 }}>
          <CompressionCalc />
        </div>

        <div className="lesson-block">
          <h4>{c.steps_h}</h4>
          <ol>
            {steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          <p>{c.steps_p}</p>
        </div>

        <Callout label={c.pair_label}>{c.pair}</Callout>

        <MarkComplete moduleId={mod.id} />
        <ModuleNav current={mod.id} />
      </div>
    </>
  );
}
