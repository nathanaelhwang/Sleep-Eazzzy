'use client';

import { useEffect, useState } from 'react';
import { useDict, useT } from '../LangProvider';
import { fill } from '../fill';

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
  const reset = () => {
    setRunning(false);
    setStep(0);
    setPhase('tense');
    setCount(5);
  };

  const cur = STEPS[step];
  const phaseText = phase === 'tense' ? t('pmr_tense') : t('pmr_release');
  // Paused part-way through (not at the start, not finished).
  const paused = !running && count > 0 && (step > 0 || phase !== 'tense' || count < 5);

  return (
    <div className="panel pmr">
      <h3>{t('w_pmr_title')}</h3>
      <p className="muted measure">{t('w_pmr_sub')}</p>

      <div className="pmr-stage">
        <ol className="strip pmr-strip" aria-hidden="true">
          {STEPS.map((_, i) => (
            <li key={i} className={i < step ? 'done' : i === step ? 'cur' : undefined}>
              <i />
            </li>
          ))}
        </ol>
        <p className="pmr-meta muted small t">
          {fill(t('w_pmr_step'), { n: step + 1, total: STEPS.length })}
        </p>
        <h4 className="pmr-name">{cur.name}</h4>
        <p className="pmr-instruction measure">{cur.instruction}</p>
        <div className="pmr-now">
          <span className={'pmr-timer t' + (running ? '' : ' idle')} aria-hidden="true">
            {running ? count : 5}
          </span>
          <span className={'pmr-phase ' + phase} aria-live="polite">
            {running ? phaseText : ''}
          </span>
        </div>
        <div className="pmr-controls">
          {running ? (
            <button type="button" className="btn btn-quiet" onClick={() => setRunning(false)}>
              {t('pmr_pause')}
            </button>
          ) : paused ? (
            <button type="button" className="btn btn-primary" onClick={() => setRunning(true)}>
              {t('pmr_resume')}
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={start}>
              {t('pmr_begin')}
            </button>
          )}
          <button type="button" className="btn btn-quiet" onClick={reset}>
            {t('pmr_reset')}
          </button>
        </div>
      </div>
    </div>
  );
}
