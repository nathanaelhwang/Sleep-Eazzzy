'use client';

// The site's one visual device: a night drawn as bars on a clock axis.
// Amber (`bed`) is time in bed lying awake; slate (`sleep`) is time asleep;
// `ghost` is a planned-but-not-yet window. Styles live in styles/base.css.

import type { ReactNode } from 'react';
import { NIGHT_AXIS, formatClock, formatHour, place, pct, ticks, wrap, type Axis, type Night } from '@/lib/night';
import { useLang, useNum, useT } from './LangProvider';

export type BarKind = 'bed' | 'sleep' | 'ghost';

/** Localized formatters for chart labels. */
export function useNightFormat() {
  const lang = useLang();
  const t = useT();
  const num = useNum();
  return {
    clock: (m: number) => formatClock(m, lang),
    tick: (m: number) => {
      const w = wrap(m);
      if (w === 0) return t('night_midnight');
      if (w === 720) return t('night_noon');
      return formatHour(w, lang);
    },
    /** "7h 30m" style duration from minutes, in locale digits. */
    dur: (min: number) => {
      const h = Math.floor(min / 60);
      const m = Math.round(min % 60);
      if (!h) return `${num(m)}${t('unit_m')}`;
      if (!m) return `${num(h)}${t('unit_h')}`;
      return `${num(h)}${t('unit_h')} ${num(m)}${t('unit_m')}`;
    },
  };
}

export function NightAxis({ axis = NIGHT_AXIS, every = 180 }: { axis?: Axis; every?: number }) {
  const { tick } = useNightFormat();
  const marks = ticks(axis, every);
  return (
    <div className="axis" aria-hidden="true">
      {marks.map((m, i) => (
        <span
          key={m}
          className={i % 2 === 1 && i !== marks.length - 1 ? 'odd' : undefined}
          style={{ left: `${pct(axis, m)}%` }}
        >
          {tick(m)}
        </span>
      ))}
    </div>
  );
}

function Grid({ axis, every }: { axis: Axis; every: number }) {
  return (
    <div className="grid" aria-hidden="true">
      {ticks(axis, every).map((m) => (
        <i key={m} style={{ left: `${pct(axis, m)}%` }} />
      ))}
    </div>
  );
}

export function Bar({ axis = NIGHT_AXIS, from, to, kind }: { axis?: Axis; from: number; to: number; kind: BarKind }) {
  return <div className={`bar ${kind}`} style={place(axis, from, to)} />;
}

/**
 * A track with a time-in-bed bar and asleep segments laid over it.
 * `segments` fixes how many asleep bars render so the track can animate
 * between nights with different segment counts (extras collapse to zero).
 * Pass `night={null}` to draw only `children` bars on the grid.
 */
export function NightTrack({
  axis = NIGHT_AXIS,
  night,
  segments,
  label,
  every = 180,
  className,
  children,
}: {
  axis?: Axis;
  night: Night | null;
  segments?: number;
  /** Accessible description of the night; omit for decorative tracks. */
  label?: string;
  every?: number;
  className?: string;
  children?: ReactNode;
}) {
  const count = night ? Math.max(segments ?? night.sleep.length, night.sleep.length) : 0;
  const last = night?.sleep[night.sleep.length - 1];
  return (
    <div
      className={'track' + (className ? ` ${className}` : '')}
      dir="ltr"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Grid axis={axis} every={every} />
      {night && <Bar axis={axis} from={night.bed[0]} to={night.bed[1]} kind="bed" />}
      {night &&
        Array.from({ length: count }, (_, i) => {
          const seg = night.sleep[i];
          if (seg) return <Bar key={i} axis={axis} from={seg[0]} to={seg[1]} kind="sleep" />;
          return (
            <div key={i} className="bar sleep" style={{ left: `${last ? pct(axis, last[1]) : 0}%`, width: '0%' }} />
          );
        })}
      {children}
    </div>
  );
}

/** One labelled row in a stack of nights sharing an axis. */
export function NightRow({ label, value, children }: { label: ReactNode; value?: ReactNode; children: ReactNode }) {
  return (
    <div className="nrow">
      <span className="lab">{label}</span>
      {children}
      <span className="val">{value}</span>
    </div>
  );
}

/** The axis row that sits above a stack of NightRows. */
export function NightAxisRow({ axis = NIGHT_AXIS, every = 180 }: { axis?: Axis; every?: number }) {
  return (
    <div className="nrow axis-row" aria-hidden="true">
      <span />
      <NightAxis axis={axis} every={every} />
      <span />
    </div>
  );
}

export function NightKey({ items }: { items: { kind: BarKind; label: string }[] }) {
  return (
    <ul className="key">
      {items.map((it) => (
        <li key={it.kind + it.label}>
          <span className={`sw ${it.kind}`} aria-hidden="true" />
          {it.label}
        </li>
      ))}
    </ul>
  );
}
