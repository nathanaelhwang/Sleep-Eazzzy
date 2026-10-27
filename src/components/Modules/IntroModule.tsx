'use client';

import type { Module } from '@/lib/data';
import { ROBERT, SARAH, type CaseNights } from '@/lib/cases';
import { totals } from '@/lib/night';
import { Callout } from '../Callout';
import { HostCard } from '../HostCard';
import { useLang, useModContent, useT } from '../LangProvider';
import { NightAxisRow, NightKey, NightRow, NightTrack, useNightFormat } from '../Night';
import { ArousalThreshold } from '../Widgets/ArousalThreshold';
import { SleepQuiz } from '../Widgets/SleepQuiz';
import { fill, fillText } from '../fill';
import { Article, ModuleShell, type ModuleItem } from './Shell';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;
type Story = CaseNights;

function CaseStudy({
  name,
  meta,
  story,
  photo,
  nights,
  summary,
}: {
  name: string;
  meta: string;
  story: string;
  photo: string;
  nights: Story;
  summary: React.ReactNode;
}) {
  const t = useT();
  const { clock, dur } = useNightFormat();
  return (
    <article className="case">
      <div className="case-id">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" width={56} height={56} />
        <div>
          <h3>{name}</h3>
          <p className="small muted">{meta}</p>
        </div>
      </div>
      <p className="case-story">{story}</p>
      <div className="nights">
        <NightAxisRow />
        {(['before', 'after'] as const).map((k) => {
          const n = nights[k];
          const sleep = dur(totals(n).sleep);
          return (
            <NightRow
              key={k}
              label={<b>{t(k === 'before' ? 'mod_case_before' : 'mod_case_after')}</b>}
              value={fill(t('mod_case_asleep'), { d: <b>{sleep}</b> })}
            >
              <NightTrack
                night={n}
                label={fillText(t('mod_night_aria'), { bed: clock(n.bed[0]), wake: clock(n.bed[1]), sleep })}
              />
            </NightRow>
          );
        })}
      </div>
      <p className="case-sum">{summary}</p>
    </article>
  );
}

export function IntroModule({ mod }: { mod: Module }) {
  const t = useT();
  const lang = useLang();
  const c = useModContent(1) as Content;
  const isZh = lang === 'zh-Hant' || lang === 'zh-Hans';
  const overview = (c.overview_items as string[] | undefined) ?? [];

  const items: ModuleItem[] = [
    { id: 'quiz', kind: 'quiz', title: t('w_quiz_title'), content: <SleepQuiz /> },
    {
      id: 'article',
      kind: 'article',
      title: t('item_intro_read'),
      content: (
        <Article title={c.hi_h}>
          <HostCard quote={c.hostQuote} photo />
          <p>{c.welcome_text}</p>
          <p className="mod-lede">{c.lede_questions}</p>
          <p>{c.lede_body}</p>
          <Callout label={c.metaphor_eyebrow}>{c.metaphor_text}</Callout>
        </Article>
      ),
    },
    { id: 'arousal', kind: 'chart', title: t('w_arousal_title'), content: <ArousalThreshold /> },
    {
      id: 'cases',
      kind: 'example',
      title: c.cases_h,
      content: (
        <Article title={c.cases_h}>
          <p>{c.cases_p}</p>
          <div className="cases">
            <CaseStudy
              name={c.robert_h}
              meta={t('mod_robert_meta')}
              story={c.robert_p}
              photo={isZh ? '/assets/robert-zh.jpg' : '/assets/robert.jpg'}
              nights={ROBERT}
              summary={
                <>
                  {c.robert_after} <strong>{c.robert_after_b}</strong>
                </>
              }
            />
            <CaseStudy
              name={c.sarah_h}
              meta={t('mod_sarah_meta')}
              story={c.sarah_p}
              photo={isZh ? '/assets/sarah-zh.jpg' : '/assets/sarah.jpg'}
              nights={SARAH}
              summary={
                <>
                  {c.sarah_after} <strong>{c.sarah_after_b}</strong>
                </>
              }
            />
          </div>
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
      id: 'overview',
      kind: 'article',
      title: c.overview_title,
      content: (
        <Article title={c.overview_title}>
          <p className="muted">{c.overview_sub}</p>
          <ol className="steps">
            {overview.map((item, i) => (
              <li key={i}>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <Callout label={c.disclaimer_label}>{c.disclaimer_body}</Callout>
          <Callout label={c.next_label}>{c.next_p}</Callout>
        </Article>
      ),
    },
  ];

  return <ModuleShell mod={mod} items={items} />;
}
