'use client';

import { useEffect, useState } from 'react';
import { useT } from '../LangProvider';

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale';

const NEXT: Record<Exclude<Phase, 'idle'>, { phase: Exclude<Phase, 'idle'>; count: number }> = {
  inhale: { phase: 'hold',   count: 7 },
  hold:   { phase: 'exhale', count: 8 },
  exhale: { phase: 'inhale', count: 4 },
};

type State = { phase: Phase; count: number; cycle: number };

const IDLE: State = { phase: 'idle', count: 0, cycle: 0 };

/** One second of the 4-7-8 cycle: count down, then move to the next phase. */
function tick(s: State): State {
  if (s.phase === 'idle') return s;
  if (s.count > 1) return { ...s, count: s.count - 1 };
  const next = NEXT[s.phase];
  return { phase: next.phase, count: next.count, cycle: s.phase === 'exhale' ? s.cycle + 1 : s.cycle };
}

export function BreathingTimer() {
  const t = useT();
  const [{ phase, count, cycle }, setState] = useState<State>(IDLE);
  const running = phase !== 'idle';

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setState(tick), 1000);
    return () => clearInterval(id);
  }, [running]);

  const start = () => setState({ phase: 'inhale', count: 4, cycle: 0 });
  const stop = () => setState(IDLE);

  const phaseLabels: Record<Phase, string> = {
    idle:   t('breath_idle'),
    inhale: t('breath_in'),
    hold:   t('breath_hold'),
    exhale: t('breath_out'),
  };

  return (
    <div className="panel breath">
      <h3>{t('w_breath_title')}</h3>
      <p className="muted measure">{t('breath_sub')}</p>

      <div className="breath-stage">
        <div className={'breath-circle ' + phase} aria-hidden="true" />
        <div className="breath-read">
          <span className="breath-phase" aria-live="polite">
            {phaseLabels[phase]}
          </span>
          {running && count > 0 && (
            <span className="breath-count t" aria-hidden="true">
              {count}
            </span>
          )}
        </div>
      </div>
      <div className="breath-foot">
        {!running ? (
          <button type="button" className="btn btn-primary" onClick={start}>
            {t('breath_begin')}
          </button>
        ) : (
          <button type="button" className="btn btn-quiet" onClick={stop}>
            {t('breath_stop')}
          </button>
        )}
        <span className="muted small t">
          {running ? `${t('breath_cycle')} ${cycle + 1}` : t('breath_try')}
        </span>
      </div>
    </div>
  );
}
