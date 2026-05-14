'use client';

import { useEffect, useState } from 'react';
import { useT } from '../LangProvider';

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale';

const NEXT: Record<Exclude<Phase, 'idle'>, { phase: Exclude<Phase, 'idle'>; count: number }> = {
  inhale: { phase: 'hold',   count: 7 },
  hold:   { phase: 'exhale', count: 8 },
  exhale: { phase: 'inhale', count: 4 },
};

export function BreathingTimer() {
  const t = useT();
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!running) return;
    if (phase === 'idle') {
      setPhase('inhale');
      setCount(4);
      return;
    }
    const id = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          const transition = NEXT[phase as Exclude<Phase, 'idle'>];
          setPhase(transition.phase);
          if (phase === 'exhale') setCycle((cy) => cy + 1);
          return transition.count;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, phase]);

  const start = () => {
    setRunning(true);
    setCycle(0);
  };
  const stop = () => {
    setRunning(false);
    setPhase('idle');
    setCount(0);
    setCycle(0);
  };

  const phaseLabels: Record<Phase, string> = {
    idle:   t('breath_idle'),
    inhale: t('breath_in'),
    hold:   t('breath_hold'),
    exhale: t('breath_out'),
  };

  return (
    <div className="widget">
      <div className="widget-head">
        <div className="widget-label">{t('breath_label')}</div>
        <h3>{t('breath_title')}</h3>
        <p className="widget-sub">{t('breath_sub')}</p>
      </div>

      <div className="breath-stage">
        <div className={'breath-circle ' + phase}>
          <div style={{ textAlign: 'center' }}>
            <div className="breath-phase">{phaseLabels[phase]}</div>
            <div className="breath-count">{running && count > 0 ? count : '—'}</div>
          </div>
        </div>
        <div className="breath-cycle">
          {running ? `${t('breath_cycle')} ${cycle + 1}` : t('breath_try')}
        </div>
        <div className="breath-controls">
          {!running ? (
            <button type="button" className="btn btn-primary" onClick={start}>
              {t('breath_begin')}
            </button>
          ) : (
            <button type="button" className="btn btn-ghost" onClick={stop}>
              {t('breath_stop')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
