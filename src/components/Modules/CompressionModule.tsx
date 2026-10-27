'use client';

import type { Module } from '@/lib/data';
import { at, totals, type Night } from '@/lib/night';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { useModContent, useT } from '../LangProvider';
import { NightAxisRow, NightKey, NightRow, NightTrack, useNightFormat } from '../Night';
import { CompressionCalc } from '../Widgets/CompressionCalc';
import { fill, fillText } from '../fill';
import { Article, ModuleShell, type ModuleItem } from './Shell';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;

const WAKE = at(6, 30);

// Bob's window: in bed 9.5 h but asleep 5, so he starts at 1:00 AM and moves
// bedtime 30 minutes earlier each time his sleep fills the window.
const BOB: { key: string; night: Night }[] = [
  { key: 'mod_bob_before', night: { bed: [at(21), WAKE], sleep: [[at(23, 30), at(2, 30)], [at(3, 15), at(5, 15)]] } },
  ...(
    [
      ['mod_bob_first', at(1)],
      ['mod_bob_few', at(0, 30)],
      ['mod_bob_next', at(0)],
      ['mod_bob_weeks', at(23)],
    ] as const
  ).map(([key, bed]) => ({ key, night: { bed: [bed, WAKE], sleep: [[bed + 15, at(6, 15)]] } as Night })),
];

function BobChart() {
  const t = useT();
  const { clock, dur } = useNightFormat();
  return (
    <div className="nights">
      <NightAxisRow />
      {BOB.map(({ key, night }) => {
        const tot = totals(night);
        return (
          <NightRow
            key={key}
            label={
              <>
                <b>{t(key)}</b>
                <span className="t">{fillText(t('mod_bob_bed'), { time: clock(night.bed[0]) })}</span>
              </>
            }
            value={fill(t('mod_bob_val'), { sleep: <b>{dur(tot.sleep)}</b>, bed: dur(tot.bed) })}
          >
            <NightTrack
              night={night}
              label={fillText(t('mod_night_aria'), {
                bed: clock(night.bed[0]),
                wake: clock(night.bed[1]),
                sleep: dur(tot.sleep),
              })}
            />
          </NightRow>
        );
      })}
    </div>
  );
}

export function CompressionModule({ mod }: { mod: Module }) {
  const t = useT();
  const c = useModContent(6) as Content;
  const { clock, dur } = useNightFormat();
  const steps = (c.steps as string[] | undefined) ?? [];
  const before = totals(BOB[0].night);

  const items: ModuleItem[] = [
    {
      id: 'article',
      kind: 'article',
      title: c.h1,
      content: (
        <Article title={c.h1}>
          <HostCard
            quote={c.hostQuote}
            caption={fillText(t('mod_host_by_6'), { start: clock(at(1)), from: clock(at(23)), to: clock(at(23, 30)) })}
          />
          <p>{c.p1a}</p>
          <p>{c.p1b}</p>
          <Callout label={c.pair_label}>{c.pair}</Callout>
        </Article>
      ),
    },
    {
      id: 'bob',
      kind: 'example',
      title: t('mod_bob_h'),
      content: (
        <Article title={t('mod_bob_h')}>
          <p>
            {fillText(t('mod_bob_p'), {
              bed: clock(at(21)),
              wake: clock(WAKE),
              tib: dur(before.bed),
              sleep: dur(before.sleep),
              start: clock(at(1)),
            })}
          </p>
          <BobChart />
          <NightKey
            items={[
              { kind: 'sleep', label: t('mod_key_asleep') },
              { kind: 'bed', label: t('mod_key_bed') },
            ]}
          />
        </Article>
      ),
    },
    {
      id: 'steps',
      kind: 'article',
      title: c.steps_h,
      content: (
        <Article title={c.steps_h}>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={i}>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <p className="muted">{c.steps_p}</p>
        </Article>
      ),
    },
    { id: 'calc', kind: 'tool', title: t('w_calc_title'), content: <CompressionCalc /> },
  ];

  // Compression makes people sleepier by design, so the driving warning stays on the page.
  const notice = (
    <Callout tone="warn" label={t('mod_warn_h')}>
      <p>{t('mod_warn_p1')}</p>
      <p>
        <strong>{t('mod_warn_b')}</strong> {t('mod_warn_p2')}
      </p>
    </Callout>
  );

  return <ModuleShell mod={mod} items={items} notice={notice} />;
}
