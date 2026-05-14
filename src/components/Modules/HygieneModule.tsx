'use client';

import type { Module } from '@/lib/data';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { MarkComplete } from '../MarkComplete';
import { ModuleHero } from '../ModuleHero';
import { ModuleNav } from '../ModuleNav';
import { PullQuote } from '../PullQuote';
import { useDict, useModContent, useT } from '../LangProvider';
import { VideoPlayer } from '../VideoPlayer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;

export function HygieneModule({ mod }: { mod: Module }) {
  const t = useT();
  const c = useModContent(3) as Content;
  const hyg = useDict().hygiene;

  return (
    <>
      <ModuleHero mod={mod} />
      <div className="container container-narrow mod-body">
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration} />
        <HostCard quote={c.hostQuote} />

        <div className="do-dont" style={{ marginTop: 24 }}>
          <div className="do-col">
            <h4>{hyg.do_label}</h4>
            <ul>
              {hyg.dos.map((d, i) => (
                <li key={i}>
                  <span className="ic">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="dont-col">
            <h4>{hyg.dont_label}</h4>
            <ul>
              {hyg.donts.map((d, i) => (
                <li key={i}>
                  <span className="ic">✕</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lesson-block" style={{ marginTop: 24 }}>
          <h4>{c.blue_h}</h4>
          <p>{c.blue_p1}</p>
          <p>{c.blue_p2}</p>
          <p>{c.blue_p3}</p>
        </div>

        <PullQuote>{c.pull}</PullQuote>

        <Callout label={c.rule_label}>{c.rule}</Callout>

        <MarkComplete moduleId={mod.id} />
        <ModuleNav current={mod.id} />
      </div>
    </>
  );
}
