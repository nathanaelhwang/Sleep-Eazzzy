'use client';

import { useEffect, useMemo } from 'react';
import { useStored } from '@/lib/useStored';
import { PrintBtn } from '../PrintBtn';
import { useDict, useLang, useT } from '../LangProvider';
import type { RoutineItem, RoutineSlot } from '@/lib/data';

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
    setRoutine([
      ...routine,
      { ...item, time: nextTime, id: Date.now() + Math.random() },
    ]);
  };

  const updateTime = (origIdx: number, time: string) => {
    const copy = routine.slice();
    copy[origIdx] = { ...copy[origIdx], time };
    setRoutine(copy);
  };

  const removeItem = (origIdx: number) =>
    setRoutine(routine.filter((_, i) => i !== origIdx));

  const reset = () => setRoutine(DEFAULT);

  const findOrigIdx = (item: StoredSlot): number =>
    routine.findIndex(
      (r) =>
        r === item ||
        (r.time === item.time && r.name === item.name && r.id === item.id)
    );

  return (
    <div className="widget">
      <div
        className="widget-head"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div className="widget-label">{t('routine_label')}</div>
          <h3>{t('routine_title')}</h3>
          <p className="widget-sub">{t('routine_sub')}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="btn btn-ghost" onClick={reset}>
            {t('routine_reset')}
          </button>
          <PrintBtn />
        </div>
      </div>

      <div className="routine-grid">
        <div className="routine-pool">
          <h4>{t('routine_add')}</h4>
          {LIBRARY.map((item, i) => (
            <button
              key={i}
              type="button"
              className="routine-item"
              onClick={() => addItem(item)}
            >
              <span className="routine-icon">{item.icon}</span>
              <span>{item.name}</span>
              <span className="routine-add">+</span>
            </button>
          ))}
        </div>
        <div className="routine-schedule">
          <h4
            style={{
              fontSize: 13,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 12,
              fontFamily: 'Inter',
            }}
          >
            {t('routine_yours')}
          </h4>
          {sorted.length === 0 ? (
            <div className="routine-empty">{t('routine_empty')}</div>
          ) : (
            sorted.map((item, i) => {
              const origIdx = findOrigIdx(item);
              return (
                <div key={i} className="routine-row">
                  <input
                    type="time"
                    className="routine-time-input"
                    value={item.time}
                    onChange={(e) => updateTime(origIdx, e.target.value)}
                  />
                  <div className="routine-name">
                    <span style={{ color: 'var(--sand)', marginRight: 8 }}>{item.icon}</span>
                    {item.name}
                  </div>
                  <button
                    type="button"
                    className="routine-remove"
                    onClick={() => removeItem(origIdx)}
                  >
                    ×
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
