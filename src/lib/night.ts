// Time math for the sleep-window charts: nights drawn as bars on a clock axis.
// All times are minutes after midnight (0–1439); spans wrap past midnight.

export const DAY = 1440;

/** Minutes after midnight for a clock time. */
export const at = (h: number, m = 0): number => h * 60 + m;

/** Wrap any minute value into 0–1439. */
export const wrap = (m: number): number => ((m % DAY) + DAY) % DAY;

/** Minutes from `a` forward to `b`, wrapping past midnight. */
export const span = (a: number, b: number): number => wrap(b - a);

export type Range = readonly [number, number];

/** One night: time in bed, and the stretches actually asleep inside it. */
export type Night = { bed: Range; sleep: readonly Range[] };

/** A clock axis: `start` minute and how many minutes it covers. */
export type Axis = { start: number; span: number };

/** 6 PM to noon: the default axis for every chart. */
export const NIGHT_AXIS: Axis = { start: at(18), span: 18 * 60 };

/** Position of minute `m` on the axis, as a percentage (clamped to the axis ends). */
export function pct(axis: Axis, m: number): number {
  let d = wrap(m - axis.start);
  if (d > axis.span) d = d > (axis.span + DAY) / 2 ? 0 : axis.span;
  return (d / axis.span) * 100;
}

/** Left/width percentages for a bar from `a` to `b`, clipped to the axis. */
export function place(axis: Axis, a: number, b: number): { left: string; width: string } {
  const l = pct(axis, a);
  const w = (span(a, b) / axis.span) * 100;
  return { left: `${l}%`, width: `${Math.max(0, Math.min(w, 100 - l))}%` };
}

/** Tick minutes every `every` minutes from the axis start to its end. */
export function ticks(axis: Axis, every: number): number[] {
  const out: number[] = [];
  for (let d = 0; d <= axis.span; d += every) out.push(axis.start + d);
  return out;
}

export function totals(n: Night): { bed: number; sleep: number; awake: number } {
  const bed = span(n.bed[0], n.bed[1]);
  const sleep = n.sleep.reduce((acc, s) => acc + span(s[0], s[1]), 0);
  return { bed, sleep, awake: bed - sleep };
}

/** Localized clock time, e.g. "1:00 AM" (en) or "1:00" (es). Timezone-independent. */
export function formatClock(m: number, locale: string): string {
  const mm = wrap(m);
  const d = new Date(Date.UTC(2000, 0, 1, Math.floor(mm / 60), mm % 60));
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(d);
}

/** Localized hour-only label for axis ticks, e.g. "9 PM". */
export function formatHour(m: number, locale: string): string {
  const mm = wrap(m);
  const d = new Date(Date.UTC(2000, 0, 1, Math.floor(mm / 60), mm % 60));
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', timeZone: 'UTC' }).format(d);
}
