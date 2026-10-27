'use client';

import { useEffect, useId, useMemo } from 'react';
import { useStored } from '@/lib/useStored';
import { PrintBtn } from '../PrintBtn';
import { useDict, useLang, useT } from '../LangProvider';
import type { RoutineItem, RoutineSlot } from '@/lib/data';
import { fillText } from '../fill';

type StoredSlot = RoutineSlot & { id?: number };

// Detect "stale default" — same time + icon shape as the current locale's default
// but at least one name differs. Indicates the user has the prior locale's default
// stored and we should reset to the current locale's translated default.
function isStaleDefault(routine: StoredSlot[], def: RoutineSlot[]): boolean {
  if (routine.length !== def.length) return false;
  const sameShape = routine.every(
    (r, i) => r.time === def[i].time && r.icon === def[i].icon
  );
  if (!sameShape) return false;
  return routine.some((r, i) => r.name !== def[i].name);
}

export function RoutineBuilder() {
  const t = useT();
  const lang = useLang();
  const uid = useId();
  const { routineLib: LIBRARY, defaultRoutine: DEFAULT } = useDict();

  const [routine, setRoutine] = useStored<StoredSlot[]>('routine', DEFAULT);

  // If the stored routine has the canonical shape but stale names (e.g. user
  // had the English default stored and just switched to Spanish), refresh to
  // the current locale's default. Untouched user customizations are preserved.
  useEffect(() => {
    if (isStaleDefault(routine, DEFAULT)) {
      setRoutine(DEFAULT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const sorted = useMemo(
    () => [...routine].sort((a, b) => a.time.localeCompare(b.time)),
    [routine]
  );

  const addItem = (item: RoutineItem) => {
    const last = sorted[sorted.length - 1];
    let nextTime = '21:30';
    if (last) {
      const [h, m] = last.time.split(':').map(Number);
      const mins = h * 60 + m + 15;
      nextTime = `${String(Math.floor(mins / 60) % 24).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
    }
    // Next id is one past the largest stored id: unique without reading the clock.
    const id = routine.reduce((max, r) => Math.max(max, r.id ?? 0), 0) + 1;
    setRoutine([...routine, { ...item, time: nextTime, id }]);
  };

  const updateTime = (origIdx: number, time: string) => {
    const copy = routine.slice();
    copy[origIdx] = { ...copy[origIdx], time };
    setRoutine(copy);
  };

  const findOrigIdx = (item: StoredSlot): number =>
    routine.findIndex(
      (r) =>
        r === item ||
        (r.time === item.time && r.name === item.name && r.id === item.id)
    );

  return (
    <div className="panel routine">
      <div className="routine-head">
        <div>
          <h3>{t('routine_title')}</h3>
          <p className="muted measure">{t('routine_sub')}</p>
        </div>
        <div className="routine-tools no-print">
          <button type="button" className="btn btn-quiet btn-small" onClick={() => setRoutine(DEFAULT)}>
            {t('routine_reset')}
          </button>
          <PrintBtn />
        </div>
      </div>

      <div className="routine-grid">
        <section className="routine-lib no-print" aria-labelledby={`${uid}-lib`}>
          <h4 id={`${uid}-lib`}>{t('routine_add')}</h4>
          <ul className="rows">
            {LIBRARY.map((item, i) => (
              <li key={i}>
                <button type="button" className="routine-add" onClick={() => addItem(item)}>
                  <span>{item.name}</span>
                  <span className="routine-add-label" aria-hidden="true">
                    {t('w_add')}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className="routine-plan" aria-labelledby={`${uid}-plan`}>
          <h4 id={`${uid}-plan`}>{t('routine_yours')}</h4>
          {sorted.length === 0 ? (
            <p className="muted routine-empty">{t('routine_empty')}</p>
          ) : (
            <ul className="rows">
              {sorted.map((item, i) => {
                const origIdx = findOrigIdx(item);
                return (
                  <li key={item.id ?? `d${i}`} className="routine-row">
                    <input
                      type="time"
                      className="inp routine-time"
                      aria-label={fillText(t('w_routine_time'), { name: item.name })}
                      value={item.time}
                      onChange={(e) => updateTime(origIdx, e.target.value)}
                    />
                    <span className="routine-name">{item.name}</span>
                    <button
                      type="button"
                      className="link-btn small no-print"
                      onClick={() => setRoutine(routine.filter((_, j) => j !== origIdx))}
                    >
                      {t('w_remove')}
                      <span className="sr">: {item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
