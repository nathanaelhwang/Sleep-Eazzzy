'use client';

import type { Module } from '@/lib/data';
import { Callout } from '../Callout';
import { MarkComplete } from '../MarkComplete';
import { ModuleHero } from '../ModuleHero';
import { ModuleNav } from '../ModuleNav';
import { useLang, useModContent, useT } from '../LangProvider';
import { VideoPlayer } from '../VideoPlayer';
import { ArousalThreshold } from '../Widgets/ArousalThreshold';
import { SleepQuiz } from '../Widgets/SleepQuiz';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = Record<string, any>;

export function IntroModule({ mod }: { mod: Module }) {
  const t = useT();
  const lang = useLang();
  const c = useModContent(1) as Content;
  const isZh = lang === 'zh-Hant' || lang === 'zh-Hans';
  const robertSrc = isZh ? '/assets/robert-zh.jpg' : '/assets/robert.jpg';
  const sarahSrc = isZh ? '/assets/sarah-zh.jpg' : '/assets/sarah.jpg';

  return (
    <>
      <ModuleHero mod={mod} />
      <div className="container container-narrow mod-body">
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration} />

        <div className="welcome-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/wendy.png" alt="Wendy" className="welcome-avatar" />
          <div className="welcome-body">
            <div className="welcome-eyebrow">{c.welcome_eyebrow}</div>
            <div className="welcome-name">{c.welcome_name}</div>
            <div className="welcome-role">{c.welcome_role}</div>
            <p className="welcome-text">{c.welcome_text}</p>
          </div>
        </div>

        <div className="intro-prose">
          <p className="intro-lede">{c.lede_questions}</p>
          <p className="intro-dropcap">{c.lede_body}</p>
        </div>

        <div className="metaphor-block">
          <div className="metaphor-eyebrow">{c.metaphor_eyebrow}</div>
          <p className="metaphor-text">{c.metaphor_text}</p>
        </div>

        <ArousalThreshold />

        <div className="program-overview">
          <div className="overview-title">{c.overview_title}</div>
          <div className="overview-sub">{c.overview_sub}</div>
          <div className="overview-grid">
            {(c.overview_items as string[] | undefined)?.map((item, i) => (
              <div key={i} className="overview-item">
                <span className="overview-item-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="overview-item-text">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="intro-disclaimer">
          <div className="intro-disclaimer-icon">i</div>
          <div className="intro-disclaimer-content">
            <h4>{c.disclaimer_label}</h4>
            <p>{c.disclaimer_body}</p>
          </div>
        </div>

        <SleepQuiz />

        <div className="lesson-block">
          <h4>{c.cases_h}</h4>
          <p>{c.cases_p}</p>
          <div className="case-grid" style={{ marginTop: 16 }}>
            <div className="case-card">
              <div className="case-head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={robertSrc} alt="Robert" className="case-photo" />
                <div>
                  <div className="case-name">{c.robert_h}</div>
                  <div className="case-age">{c.robert_age}</div>
                </div>
              </div>
              <p style={{ fontSize: 14 }}>{c.robert_p}</p>
              <div className="case-stat">
                <span>{c.robert_before}</span>
                <span>{c.robert_hrs}</span>
              </div>
              <div className="case-bar">
                <div className="case-bar-fill" style={{ width: '38%' }} />
              </div>
              <div className="case-after">
                {c.robert_after} <strong>{c.robert_after_b}</strong>
              </div>
            </div>
            <div className="case-card">
              <div className="case-head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sarahSrc} alt="Sarah" className="case-photo" />
                <div>
                  <div className="case-name">{c.sarah_h}</div>
                  <div className="case-age">{c.sarah_age}</div>
                </div>
              </div>
              <p style={{ fontSize: 14 }}>{c.sarah_p}</p>
              <div className="case-stat">
                <span>{c.sarah_before}</span>
                <span>{c.sarah_hrs}</span>
              </div>
              <div className="case-bar">
                <div className="case-bar-fill" style={{ width: '25%' }} />
              </div>
              <div className="case-after">
                {c.sarah_after} <strong>{c.sarah_after_b}</strong>
              </div>
            </div>
          </div>
        </div>

        <Callout label={c.next_label}>{c.next_p}</Callout>

        <MarkComplete moduleId={mod.id} />
        <ModuleNav current={mod.id} />
      </div>
    </>
  );
}
