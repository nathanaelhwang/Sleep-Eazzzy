'use client';

import { useId, useState } from 'react';
import { useStored } from '@/lib/useStored';
import { NIGHT_AXIS, at, span, wrap, type Axis } from '@/lib/night';
import { Bar, NightAxisRow, NightKey, NightRow, NightTrack, useNightFormat } from '../Night';
import { useLang, useT } from '../LangProvider';
import { fill } from '../fill';

const MIN_DUR = 5;
const MAX_DUR = 9;
/** 7.5 h of sleep plus the 30-minute buffer. */
const GOAL_TIB = 8;

function clampDur(v: number): number {
  if (Number.isNaN(v)) return MIN_DUR;
  return Math.min(MAX_DUR, Math.max(MIN_DUR, Math.round(v * 2) / 2));
}

function wakeMinutes(s: string): number {
  const [h, m] = s.split(':').map((x) => parseInt(x, 10));
  return Number.isNaN(h) || Number.isNaN(m) ? at(6, 30) : at(h, m);
}

export function CompressionCalc() {
  const t = useT();
  const lang = useLang();
  const { clock, dur: fmtDur } = useNightFormat();
  const id = useId();
  const [wake, setWake] = useStored<string>('calc_wake', '06:30');
  const [stored, setDuration] = useStored<number>('calc_dur', 5);
  // What the user is typing; null shows the stored (clamped) value.
  const [draft, setDraft] = useState<string | null>(null);

  const d = clampDur(draft == null ? stored : parseFloat(draft));
  const wm = wakeMinutes(wake);
  const tib = d + 0.5;
  // Formula: bed = wake − (hours asleep + 30 min).
  const bed = wrap(wm - tib * 60);
  const goalBed = wrap(wm - GOAL_TIB * 60);
  const keep = d >= 7.5;
  const steps = Math.round((GOAL_TIB - tib) * 2);

  const num = new Intl.NumberFormat(lang, { maximumFractionDigits: 1 });

  // Axis: 6 PM to noon when the window fits, otherwise an 18-hour axis that does.
  const earliest = keep ? bed : goalBed;
  const evening = at(18);
  const fits = span(evening, wm) <= NIGHT_AXIS.span && span(evening, earliest) <= span(evening, wm);
  const axis: Axis = fits
    ? NIGHT_AXIS
    : { start: wrap(Math.floor((earliest - 120) / 180) * 180), span: NIGHT_AXIS.span };

  const setDur = (v: number) => {
    setDraft(null);
    setDuration(clampDur(v));
  };
  const onDurInput = (raw: string) => {
    setDraft(raw);
    const v = parseFloat(raw);
    if (!Number.isNaN(v)) setDuration(clampDur(v));
  };

  const ghosts: number[] = [];
  for (let i = 1; i * 30 <= (GOAL_TIB - tib) * 60; i++) ghosts.push(i);

  return (
    <div className="panel calc">
      <h3>{t('w_calc_title')}</h3>
      <p className="muted measure">{t('w_calc_sub')}</p>

      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor={`${id}-wake`}>{t('w_calc_wake')}</label>
          <input
            className="inp"
            type="time"
            id={`${id}-wake`}
            required
            value={wake}
            onChange={(e) => setWake(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={`${id}-dur`}>{t('w_calc_dur')}</label>
          <div className="stepper">
            <button
              type="button"
              aria-label={t('w_calc_less')}
              onClick={() => setDur(d - 0.5)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <input
              className="inp"
              type="number"
              id={`${id}-dur`}
              min={MIN_DUR}
              max={MAX_DUR}
              step={0.5}
              inputMode="decimal"
              aria-describedby={`${id}-hint`}
              value={draft ?? String(d)}
              onChange={(e) => onDurInput(e.target.value)}
              onBlur={() => setDur(d)}
            />
            <button
              type="button"
              aria-label={t('w_calc_more')}
              onClick={() => setDur(d + 0.5)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <span className="hint" id={`${id}-hint`}>
            {t('w_calc_dur_hint')}
          </span>
        </div>
      </form>

      <div className="calc-out" aria-live="polite">
        <div className="bedtime">
          <div className="lbl">{t('w_calc_bed')}</div>
          <div className="big">{clock(bed)}</div>
        </div>
        <div className="calc-facts">
          <p>
            {fill(t('w_calc_tib'), {
              tib: <b className="t">{fill(t('w_calc_hours'), { n: num.format(tib) })}</b>,
              wake: <span className="t">{clock(wm)}</span>,
            })}
          </p>
          <p>
            {keep
              ? t('w_calc_keep')
              : fill(t('w_calc_next'), {
                  next: <b className="t">{clock(bed - 30)}</b>,
                  steps:
                    steps === 1 ? t('w_calc_step_one') : fill(t('w_calc_steps'), { n: num.format(steps) }),
                  goal: <b className="t">{clock(goalBed)}</b>,
                })}
          </p>
        </div>
      </div>

      <div className="calc-chart nights" aria-hidden="true">
        <NightAxisRow axis={axis} />
        <NightRow
          label={
            <>
              <b>{t('w_calc_start')}</b>
              <span className="t">{clock(bed)}</span>
            </>
          }
          value={fill(t('w_calc_in_bed'), { h: <b className="t">{fmtDur(tib * 60)}</b> })}
        >
          <NightTrack axis={axis} night={null}>
            <Bar axis={axis} from={bed} to={wm} kind="sleep" />
          </NightTrack>
        </NightRow>
        {!keep && (
          <NightRow
            label={
              <>
                <b>{t('w_calc_goal')}</b>
                <span className="t">{clock(goalBed)}</span>
              </>
            }
            value={fill(t('w_calc_in_bed'), { h: <b className="t">{fmtDur(GOAL_TIB * 60)}</b> })}
          >
            <NightTrack axis={axis} night={null}>
              {ghosts.map((i) => (
                <Bar key={i} axis={axis} from={bed - i * 30} to={bed - (i - 1) * 30} kind="ghost" />
              ))}
              <Bar axis={axis} from={bed} to={wm} kind="sleep" />
            </NightTrack>
          </NightRow>
        )}
      </div>
      <div className="calc-key">
        <NightKey
          items={[
            { kind: 'sleep', label: t('w_calc_key_start') },
            { kind: 'ghost', label: t('w_calc_key_step') },
          ]}
        />
      </div>

      <div className="warn calc-warn" role="note" aria-labelledby={`${id}-warn`}>
        <h4 id={`${id}-warn`}>{t('w_calc_warn_h')}</h4>
        <p>{t('w_calc_warn_p')}</p>
        <p>
          <strong>{t('w_calc_warn_b')}</strong> {t('w_calc_warn_p2')}
        </p>
      </div>
    </div>
  );
}
