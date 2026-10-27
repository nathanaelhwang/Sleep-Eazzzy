'use client';

// The program as a list of rows: each module's video length drawn as a bar on
// one cumulative minute axis, so the whole course reads like a single night.

import Link from 'next/link';
import { MODULE_MINUTES, PROGRAM_MINUTES } from '@/lib/data';
import { useMounted } from '@/lib/useMounted';
import { useProgress, type Progress } from '@/lib/useProgress';
import { fillText } from './fill';
import { useLang, useModules, useNum, useT } from './LangProvider';

/** Saved progress, empty until mounted so the server and first client render match. */
export function useLiveProgress(): Progress {
  const { progress } = useProgress();
  return useMounted() ? progress : {};
}

export function ProgramList({ progress, extrasHeading = 'h3' }: { progress: Progress; extrasHeading?: 'h2' | 'h3' }) {
  const lang = useLang();
  const t = useT();
  const num = useNum();
  const mods = useModules();
  const core = mods.filter((m) => !m.bonus);
  const bonus = mods.filter((m) => m.bonus);
  const total = PROGRAM_MINUTES;
  const longest = Math.max(...core.map((m) => MODULE_MINUTES[m.id]));
  const next = core.find((m) => !progress[m.id]);
  const minutes = (n: number) => fillText(t('home_min'), { n: num(n) });
  // Quarter-hour ticks, dropping any that would crowd the total at the end.
  const ticks = [0, 15, 30, 45, 60, 75, 90].filter((m) => m <= total - 12);
  const ExtrasH = extrasHeading;

  const rows = core.map((m, i) => ({
    m,
    i,
    min: MODULE_MINUTES[m.id],
    start: core.slice(0, i).reduce((acc, p) => acc + MODULE_MINUTES[p.id], 0),
  }));

  return (
    <div className="program-list">
      <div className="minute-axis" aria-hidden="true">
        <div className="axis">
          {[...ticks, total].map((m, i, arr) => (
            <span key={m} style={{ left: `${(m / total) * 100}%` }}>
              {i === 0 || i === arr.length - 1 ? minutes(m) : num(m)}
            </span>
          ))}
        </div>
      </div>
      <ol className="modules">
        {rows.map(({ m, i, min, start }) => {
          const st = progress[m.id] ? 'done' : m === next ? 'next' : 'todo';
          return (
            <li key={m.id}>
              <Link className={`mrow ${st}`} href={`/${lang}/module/${m.slug}`}>
                <span className="no">{num(i + 1)}</span>
                <span>
                  <span className="mt">{m.title}</span>
                  <span className="md">{m.subtitle}</span>
                </span>
                <span className="mb" dir="ltr" aria-hidden="true">
                  <span className="rail" />
                  <span className="b" style={{ left: `${(start / total) * 100}%`, width: `${(min / total) * 100}%` }} />
                </span>
                <span className="st">
                  {t(`home_status_${st}`)}
                  <span className="min">{minutes(min)}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="extras">
        <div>
          <ExtrasH className="extras-h">{t('home_extras_h')}</ExtrasH>
          <p className="extras-note">{t('home_extras_note')}</p>
        </div>
        <ul className="xlist">
          {bonus.map((m) => {
            const min = MODULE_MINUTES[m.id];
            const done = !!progress[m.id];
            return (
              <li key={m.id}>
                <Link className={'xrow' + (done ? ' done' : '')} href={`/${lang}/module/${m.slug}`}>
                  <span>
                    <span className="xt">{m.title}</span>
                    <span className="xd">{m.subtitle}</span>
                  </span>
                  <span className="xbar">
                    <i aria-hidden="true" style={{ width: `${(min / longest) * 60}%` }} />
                    <span className="t">{minutes(min)}</span>
                    <span className="xst">{t(done ? 'home_status_done' : 'home_status_optional')}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
