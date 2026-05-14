'use client';

import { useEffect, useState } from 'react';
import { useDict, useT } from '../LangProvider';

type PMRPhase = 'tense' | 'release';

export function PMRWalkthrough() {
  const t = useT();
  const STEPS = useDict().pmr;
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<PMRPhase>('tense');
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          if (phase === 'tense') {
            setPhase('release');
            return 5;
          }
          // phase === 'release'
          setPhase('tense');
          if (step < STEPS.length - 1) {
            setStep((s) => s + 1);
            return 5;
          }
          setRunning(false);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, phase, step, STEPS.length]);

  const start = () => {
    setRunning(true);
    setStep(0);
    setPhase('tense');
    setCount(5);
  };
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setStep(0);
    setPhase('tense');
    setCount(5);
  };

  const cur = STEPS[step];
  const phaseText = phase === 'tense' ? t('pmr_tense') : t('pmr_release');

  return (
    <div
      className="widget"
      style={{ padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}
    >
      <div className="pmr-stage">
        <div className="pmr-progress">
          {STEPS.map((_, i) => (
            <div key={i} className={i < step ? 'done' : i === step ? 'active' : ''} />
          ))}
        </div>
        <div className="pmr-step-label">
          {t('pmr_step_of')} {step + 1} / {STEPS.length} · {phaseText}
        </div>
        <div className="pmr-step-name">{cur.name}</div>
        <div className="pmr-instruction">{cur.instruction}</div>
        <div className="pmr-timer">{running ? count : '—'}</div>
        <div className="pmr-controls">
          {!running ? (
            <button type="button" className="btn btn-primary" onClick={start}>
              {step > 0 ? t('pmr_resume') : t('pmr_begin')}
            </button>
          ) : (
            <button type="button" className="btn btn-ghost" onClick={pause}>
              {t('pmr_pause')}
            </button>
          )}
          <button type="button" className="btn btn-ghost" onClick={reset}>
            {t('pmr_reset')}
          </button>
        </div>
      </div>
    </div>
  );
}
