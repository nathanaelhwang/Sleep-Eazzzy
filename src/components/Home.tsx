'use client';

import Link from 'next/link';
import { Fragment, useState, type ReactNode } from 'react';
import { MODULE_MINUTES, PROGRAM_MINUTES } from '@/lib/data';
import { ROBERT, SARAH } from '@/lib/cases';
import { NIGHT_AXIS, at, pct, span, totals, type Night } from '@/lib/night';
import type { Progress } from '@/lib/useProgress';
import { fillText } from './fill';
import { useLang, useModules, useNum, useT } from './LangProvider';
import { NightAxis, NightAxisRow, NightRow, NightTrack, useNightFormat } from './Night';
import { ProgramList, useLiveProgress } from './ProgramList';

type When = 'before' | 'after';

/** Render a dictionary string with `{name}` placeholders and `<b>…</b>` spans as nodes. */
function rich(s: string, vars: Record<string, ReactNode> = {}): ReactNode {
  return s.split(/(<b>.*?<\/b>|\{\w+\})/).map((part, i) => {
    const b = /^<b>(.*)<\/b>$/.exec(part);
    if (b) return <b key={i}>{rich(b[1], vars)}</b>;
    const v = /^\{(\w+)\}$/.exec(part);
    if (v && v[1] in vars) return <Fragment key={i}>{vars[v[1]]}</Fragment>;
    return part;
  });
}

/** Start or continue: points at the first core module not yet marked complete. */
function NextButton({ progress }: { progress: Progress }) {
  const lang = useLang();
  const t = useT();
  const num = useNum();
  const core = useModules().filter((m) => !m.bonus);
  const idx = core.findIndex((m) => !progress[m.id]);
  const target = idx === -1 ? core[core.length - 1] : core[idx];
  const started = core.some((m) => progress[m.id]);
  const label =
    idx === -1
      ? t('home_cta_review')
      : fillText(t(started ? 'home_cta_continue' : 'home_cta_start'), { n: num(idx + 1) });
  return (
    <Link className="btn btn-primary" href={`/${lang}/module/${target.slug}`}>
      {label} <span className="t">{fillText(t('home_min_paren'), { n: num(MODULE_MINUTES[target.id]) })}</span>
    </Link>
  );
}

function HeroNight() {
  const t = useT();
  const { clock, dur } = useNightFormat();
  const [when, setWhen] = useState<When>('before');
  const n = ROBERT[when];
  const tot = totals(n);
  const s = n.sleep[0];
  const asleepMid = pct(NIGHT_AXIS, s[0]) + (span(s[0], s[1]) / NIGHT_AXIS.span) * 50;

  return (
    <figure className="night-hero" aria-labelledby="hero-who">
      <figcaption className="top">
        <span id="hero-who" className="who">
          {t(when === 'before' ? 'home_fig_before' : 'home_fig_after')}
        </span>
        <span className="seg" role="group" aria-label={t('home_seg_label')}>
          {(['before', 'after'] as const).map((k) => (
            <button key={k} type="button" aria-pressed={when === k} onClick={() => setWhen(k)}>
              {t(k === 'before' ? 'home_before' : 'home_after')}
            </button>
          ))}
        </span>
      </figcaption>
      <div className="stage" dir="ltr">
        <span className="flag up start" dir="auto" aria-hidden="true" style={{ left: `${pct(NIGHT_AXIS, n.bed[0])}%` }}>
          <span className="k">{t('home_flag_bed')}</span> <span className="t">{clock(n.bed[0])}</span>
        </span>
        <span className="flag up end" dir="auto" aria-hidden="true" style={{ left: `${pct(NIGHT_AXIS, n.bed[1])}%` }}>
          <span className="k">{t('home_flag_up')}</span> <span className="t">{clock(n.bed[1])}</span>
        </span>
        <NightTrack
          night={n}
          segments={1}
          label={fillText(t('home_track_label'), {
            bedFrom: clock(n.bed[0]),
            bedTo: clock(n.bed[1]),
            from: clock(s[0]),
            to: clock(s[1]),
          })}
        />
        <span className="flag down" dir="auto" aria-hidden="true" style={{ left: `${asleepMid}%` }}>
          {fillText(t('home_flag_asleep'), { from: clock(s[0]), to: clock(s[1]) })}
        </span>
      </div>
      <NightAxis />
      <ul className="totals" aria-live="polite">
        <li>
          <span className="n">{dur(tot.bed)}</span>
          <span className="d">{t('home_total_bed')}</span>
        </li>
        <li>
          <span className="n sleep">{dur(tot.sleep)}</span>
          <span className="d">
            <span className="sw sleep" aria-hidden="true" />
            {t('home_total_sleep')}
          </span>
        </li>
        <li>
          <span className="n awake">{dur(tot.awake)}</span>
          <span className="d">
            <span className="sw bed" aria-hidden="true" />
            {t('home_total_awake')}
          </span>
        </li>
      </ul>
    </figure>
  );
}

function Story({ name, photo, line, nights, summary }: { name: string; photo: string; line: string; nights: Record<When, Night>; summary: string }) {
  const t = useT();
  const { clock, dur } = useNightFormat();
  return (
    <article className="case">
      <div className="case-id">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" width={56} height={56} />
        <div>
          <h3 className="nm">{name}</h3>
          <p className="muted small">{line}</p>
        </div>
      </div>
      <div className="nights">
        <NightAxisRow />
        {(['before', 'after'] as const).map((k) => {
          const n = nights[k];
          const asleep = dur(totals(n).sleep);
          return (
            <NightRow
              key={k}
              label={<b>{t(k === 'before' ? 'home_before' : 'home_after')}</b>}
              value={rich(t('home_val_asleep'), { d: asleep })}
            >
              <NightTrack
                night={n}
                label={fillText(t('home_row_label'), { a: clock(n.bed[0]), b: clock(n.bed[1]), d: asleep })}
              />
            </NightRow>
          );
        })}
      </div>
      <p className="case-sum">{summary}</p>
    </article>
  );
}

export function Home() {
  const lang = useLang();
  const t = useT();
  const num = useNum();
  const { clock } = useNightFormat();
  const mods = useModules();
  const progress = useLiveProgress();
  const prefix = `/${lang}`;

  const core = mods.filter((m) => !m.bonus);
  const total = PROGRAM_MINUTES;
  const doneCore = core.filter((m) => progress[m.id]);
  // Finishing everything reads as the rounded total, not "69 of 70".
  const watched =
    doneCore.length === core.length ? total : doneCore.reduce((acc, m) => acc + MODULE_MINUTES[m.id], 0);

  const zh = lang === 'zh-Hant' || lang === 'zh-Hans';
  const robertSrc = zh ? '/assets/robert-zh.jpg' : '/assets/robert.jpg';
  const sarahSrc = zh ? '/assets/sarah-zh.jpg' : '/assets/sarah.jpg';

  const tools = [
    { name: 'home_tool_quiz', href: '/module/intro?tool=quiz', where: fillText(t('home_module_n'), { n: num(1) }) },
    { name: 'home_tool_journal', href: '/module/cognitive?tool=reframe', where: fillText(t('home_module_n'), { n: num(2) }) },
    { name: 'home_tool_breath', href: '/module/relaxation?tool=breathing', where: fillText(t('home_module_n'), { n: num(4) }) },
    { name: 'home_tool_pmr', href: '/module/relaxation?tool=pmr', where: fillText(t('home_tool_pmr_where'), { n: num(4) }) },
    { name: 'home_tool_calc', href: '/module/compression?tool=calc', where: fillText(t('home_module_n'), { n: num(6) }) },
    { name: 'home_tool_routine', href: '/module/sleep-plan?tool=routine', where: fillText(t('home_module_n'), { n: num(7) }) },
  ];

  const music = (artist: string) => rich(t('home_snd_music'), { artist, min: <span className="t">{fillText(t('home_min'), { n: num(10) })}</span> });
  const sounds: { name: string; where: ReactNode }[] = [
    { name: 'home_snd_brook', where: t('home_snd_nature') },
    { name: 'home_snd_waves', where: t('home_snd_nature') },
    { name: 'home_snd_rain', where: t('home_snd_nature') },
    { name: 'home_snd_fire', where: t('home_snd_white') },
    { name: 'home_snd_rem', where: music('Ookean') },
    { name: 'home_snd_cryo', where: music('Joseph Beg') },
    { name: 'home_snd_autumn', where: music('Chaxti') },
    { name: 'home_snd_soft', where: t('home_snd_guided') },
  ];

  return (
    <div className="home wrap">
      <section className="hero" aria-labelledby="h-home">
        <h1 id="h-home">{t('home_h1')}</h1>
        <p className="sub">{rich(t('home_sub'))}</p>
        <HeroNight />
        <div className="cta-row">
          <NextButton progress={progress} />
          <a className="btn btn-quiet" href="#program">
            {t('home_cta_all')}
          </a>
        </div>
        <p className="cta-note">{t('home_cta_note')}</p>
      </section>

      <section id="program" className="section" aria-labelledby="h-program">
        <div className="program-head">
          <div>
            <h2 id="h-program">{t('home_prog_h')}</h2>
            <p className="lede">{t('home_prog_lede')}</p>
          </div>
          <div className="program-next">
            <NextButton progress={progress} />
          </div>
        </div>

        {doneCore.length > 0 && (
          <p className="progress-line">
            <strong>{fillText(t('home_progress_done'), { x: num(doneCore.length), n: num(core.length) })}</strong>{' '}
            <span className="muted">{fillText(t('home_progress_min'), { w: num(watched), total: num(total) })}</span>
          </p>
        )}

        <ProgramList progress={progress} />
      </section>

      <section id="stories" className="section" aria-labelledby="h-stories">
        <div className="sec-head">
          <h2 id="h-stories">{t('home_stories_h')}</h2>
          <p>{t('home_stories_p')}</p>
        </div>
        <div className="cases">
          <Story
            name={t('home_robert_nm')}
            photo={robertSrc}
            line={fillText(t('home_robert_line'), { a: clock(at(21)), b: clock(at(1)), c: clock(at(4)) })}
            nights={ROBERT}
            summary={fillText(t('home_robert_sum'), { t: clock(at(22, 30)) })}
          />
          <Story
            name={t('home_sarah_nm')}
            photo={sarahSrc}
            line={t('home_sarah_line')}
            nights={SARAH}
            summary={t('home_sarah_sum')}
          />
        </div>
      </section>

      <section id="tools" className="section" aria-labelledby="h-tools">
        <div className="split">
          <div>
            <h2 id="h-tools">{t('tools')}</h2>
            <p className="split-note">{t('home_tools_note')}</p>
            <p className="more">
              <Link href={`${prefix}/tools`}>{t('home_tools_all')}</Link>
            </p>
          </div>
          <ul className="list2">
            {tools.map((x) => (
              <li key={x.name}>
                <Link href={`${prefix}${x.href}`}>{t(x.name)}</Link>
                <span className="where">{x.where}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="sounds" className="section" aria-labelledby="h-sounds">
        <div className="split">
          <div>
            <h2 id="h-sounds">{t('nav_sounds')}</h2>
            <p className="split-note">{t('home_sounds_note')}</p>
            <p className="more">
              <Link href={`${prefix}/library`}>{t('home_sounds_all')}</Link>
            </p>
          </div>
          <ul className="list2">
            {sounds.map((x) => (
              <li key={x.name}>
                <Link href={`${prefix}/library`}>{t(x.name)}</Link>
                <span className="where">{x.where}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="about" className="section" aria-labelledby="h-about">
        <div className="about-grid">
          <div>
            <h2 id="h-about">{t('home_about_h')}</h2>
            <div className="measure about-text">
              <p>{t('home_about_p1')}</p>
              <p>{t('home_about_p2')}</p>
            </div>
            <p className="more">
              <Link href={`${prefix}/about`}>{t('home_about_more')}</Link>
            </p>
          </div>
          <div className="doctor">
            <h3>{t('home_doctor_h')}</h3>
            <ul>
              <li>{t('home_doctor_1')}</li>
              <li>{t('home_doctor_2')}</li>
              <li>{t('home_doctor_3')}</li>
            </ul>
            <p className="small muted">{t('home_doctor_note')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
