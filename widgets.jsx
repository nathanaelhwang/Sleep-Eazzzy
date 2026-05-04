// Interactive widgets

// ----- Sleep Quiz (Module 1) -----
// "Tap any answer to reveal its explanation" format. Each option exposes its own
// inline explanation when clicked — patients can tap through every answer to read
// the full breakdown for each one. (Backwards compatible with options as plain
// strings — used by the legacy es/zh translations.)
function SleepQuiz() {
  // Pull questions for the current language; fall back to English data shape.
  const { lang } = useLang ? useLang() : { lang: 'en' };
  const t = useT ? useT() : (k => k);
  const I = window.SE_I18N && window.SE_I18N.QUIZ_I18N ? window.SE_I18N.QUIZ_I18N[lang] : null;
  const Q = (I && I.length) ? I : window.SE_DATA.QUIZ_QUESTIONS;

  // tapped[qIdx] -> Set of option indices the user has revealed
  const [tapped, setTapped] = useState(() => Q.map(() => new Set()));

  const tap = (qi, oi) => {
    setTapped(prev => {
      const next = prev.slice();
      const s = new Set(next[qi]);
      s.add(oi);
      next[qi] = s;
      return next;
    });
  };

  const reset = () => setTapped(Q.map(() => new Set()));

  // Normalize an option to { text, explanation } regardless of source shape.
  const norm = (opt, q, oi) => {
    if (typeof opt === 'string') {
      // Legacy translations: only the correct answer has feedback prose.
      return {
        text: opt,
        explanation: oi === q.correct ? q.feedback : ''
      };
    }
    return opt;
  };

  return (
    <div className="quiz-block">
      <div className="quiz-intro">
        <div className="quiz-intro-eyebrow">{t('quiz_intro_eyebrow')}</div>
        <h3>{t('quiz_intro_h')} <em>{t('quiz_intro_h_em')}</em></h3>
        <p>{t('quiz_intro_p')}</p>
      </div>

      {Q.map((q, qi) => {
        const revealedSet = tapped[qi];
        const allRevealed = revealedSet && revealedSet.size === q.options.length;
        return (
          <div key={qi} className="quiz-card">
            <div className="quiz-q-num">{t('quiz_q_label')} {(t('quiz_q_words') || [])[qi] || qi + 1}</div>
            <h4 className="quiz-q">{q.q}</h4>
            <div className="quiz-options">
              {q.options.map((rawOpt, oi) => {
                const opt = norm(rawOpt, q, oi);
                const isRevealed = revealedSet.has(oi);
                const isCorrect = oi === q.correct;
                let cls = 'quiz-option';
                if (isRevealed) {
                  cls += ' revealed';
                  cls += isCorrect ? ' correct' : ' incorrect';
                }
                return (
                  <button
                    key={oi}
                    className={cls}
                    onClick={() => tap(qi, oi)}
                    aria-expanded={isRevealed}
                  >
                    <span className="quiz-option-letter">{String.fromCharCode(65 + oi)}</span>
                    <span className="quiz-option-body">
                      <span className="quiz-option-text">
                        {isRevealed && (
                          <span className={"quiz-badge " + (isCorrect ? 'right' : 'wrong')}>
                            {isCorrect ? t('quiz_correct_short') : t('quiz_wrong_short')}
                          </span>
                        )}
                        {opt.text}
                      </span>
                      {isRevealed && opt.explanation && (
                        <span className="quiz-option-explanation">{opt.explanation}</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            {!allRevealed && revealedSet.size > 0 && (
              <div className="quiz-hint">{t('quiz_hint')}</div>
            )}
          </div>
        );
      })}

      <div className="quiz-foot">
        <button className="btn btn-ghost" onClick={reset}>{t('quiz_reset')}</button>
      </div>
    </div>
  );
}

// ----- Reframe Journal (Module 2) -----
function ReframeJournal() {
  const t = useT ? useT() : (k => k);
  const { lang } = useLang ? useLang() : { lang: 'en' };
  const ref_I = window.SE_I18N && window.SE_I18N.REFRAME_I18N ? window.SE_I18N.REFRAME_I18N[lang] : null;
  const SUGS = (ref_I && ref_I.length) ? ref_I : window.SE_DATA.REFRAME_SUGGESTIONS;
  const [entries, setEntries] = useStored('reframe', []);
  const [neg, setNeg] = useState('');
  const [pos, setPos] = useState('');

  const add = () => {
    if (!neg.trim() || !pos.trim()) return;
    setEntries([...entries, { neg: neg.trim(), pos: pos.trim(), id: Date.now() }]);
    setNeg(''); setPos('');
  };

  const useSuggestion = (s) => { setNeg(s.neg); setPos(s.pos); };
  const remove = (id) => setEntries(entries.filter(e => e.id !== id));

  return (
    <div className="widget">
      <div className="widget-head">
        <div className="widget-label">{t('reframe_label')}</div>
        <h3>{t('reframe_title')}</h3>
        <p className="widget-sub">{t('reframe_sub')}</p>
      </div>

      <div className="journal-grid">
        <div className="journal-col negative">
          <h4>{t('reframe_neg_h')}</h4>
          <textarea className="journal-input" placeholder={t('reframe_neg_ph')}
            value={neg} onChange={e => setNeg(e.target.value)}/>
        </div>
        <div className="journal-col positive">
          <h4>{t('reframe_pos_h')}</h4>
          <textarea className="journal-input" placeholder={t('reframe_pos_ph')}
            value={pos} onChange={e => setPos(e.target.value)}/>
        </div>
      </div>

      <div style={{display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap', alignItems: 'center'}}>
        <button className="btn btn-primary" onClick={add} disabled={!neg.trim() || !pos.trim()}>{t('reframe_save')}</button>
        <span style={{fontSize: 13, color: 'var(--muted)'}}>{t('reframe_starter')}</span>
      </div>

      <div className="suggestions">
        {SUGS.slice(0, 4).map((s, i) => (
          <button key={i} className="suggestion-pill" onClick={() => useSuggestion(s)}>
            {s.neg} → {s.pos}
          </button>
        ))}
      </div>

      {entries.length > 0 && (
        <div className="journal-entries">
          <h4 style={{fontFamily: 'Inter', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12}}>{t('reframe_yours')} ({entries.length})</h4>
          {entries.map(e => (
            <div key={e.id} className="journal-entry">
              <div className="journal-neg">{e.neg}</div>
              <div className="journal-arrow">→</div>
              <div className="journal-pos">{e.pos}</div>
              <button className="journal-del" onClick={() => remove(e.id)} title="Remove">×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ----- 4-7-8 Breathing Timer (Module 4) -----
function BreathingTimer() {
  const t = useT ? useT() : (k => k);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle, inhale, hold, exhale
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!running) return;
    if (phase === 'idle') { setPhase('inhale'); setCount(4); return; }

    const id = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          // transition
          if (phase === 'inhale') { setPhase('hold'); return 7; }
          if (phase === 'hold') { setPhase('exhale'); return 8; }
          if (phase === 'exhale') {
            setPhase('inhale');
            setCycle(cy => cy + 1);
            return 4;
          }
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, phase]);

  const start = () => { setRunning(true); setCycle(0); };
  const stop = () => { setRunning(false); setPhase('idle'); setCount(0); setCycle(0); };

  const phaseLabel = { idle: t('breath_idle'), inhale: t('breath_in'), hold: t('breath_hold'), exhale: t('breath_out') }[phase];

  return (
    <div className="widget">
      <div className="widget-head">
        <div className="widget-label">{t('breath_label')}</div>
        <h3>{t('breath_title')}</h3>
        <p className="widget-sub">{t('breath_sub')}</p>
      </div>

      <div className="breath-stage">
        <div className={"breath-circle " + phase}>
          <div style={{textAlign: 'center'}}>
            <div className="breath-phase">{phaseLabel}</div>
            <div className="breath-count">{running && count > 0 ? count : '—'}</div>
          </div>
        </div>
        <div className="breath-cycle">{running ? `${t('breath_cycle')} ${cycle + 1}` : t('breath_try')}</div>
        <div className="breath-controls">
          {!running ? (
            <button className="btn btn-primary" onClick={start}>{t('breath_begin')}</button>
          ) : (
            <button className="btn btn-ghost" onClick={stop}>{t('breath_stop')}</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ----- PMR Walkthrough (Module 4) -----
function PMRWalkthrough() {
  const t = useT ? useT() : (k => k);
  const { lang } = useLang ? useLang() : { lang: 'en' };
  const PMR_I = window.SE_I18N && window.SE_I18N.PMR_I18N ? window.SE_I18N.PMR_I18N[lang] : null;
  const STEPS = (PMR_I && PMR_I.length) ? PMR_I : window.SE_DATA.PMR_STEPS;
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState('tense'); // tense, release
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          if (phase === 'tense') { setPhase('release'); return 5; }
          if (phase === 'release') {
            // next step
            setPhase('tense');
            if (step < STEPS.length - 1) {
              setStep(s => s + 1);
              return 5;
            } else {
              setRunning(false);
              return 0;
            }
          }
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, phase, step, STEPS.length]);

  const start = () => { setRunning(true); setStep(0); setPhase('tense'); setCount(5); };
  const pause = () => setRunning(false);
  const reset = () => { setRunning(false); setStep(0); setPhase('tense'); setCount(5); };

  const cur = STEPS[step];
  const phaseText = phase === 'tense' ? t('pmr_tense') : t('pmr_release');

  return (
    <div className="widget" style={{padding: 0, background: 'transparent', border: 'none', boxShadow: 'none'}}>
      <div className="pmr-stage">
        <div className="pmr-progress">
          {STEPS.map((_, i) => (
            <div key={i} className={i < step ? 'done' : (i === step ? 'active' : '')}/>
          ))}
        </div>
        <div className="pmr-step-label">{t('pmr_step_of')} {step + 1} / {STEPS.length} · {phaseText}</div>
        <div className="pmr-step-name">{cur.name}</div>
        <div className="pmr-instruction">{cur.instruction}</div>
        <div className="pmr-timer">{running ? count : '—'}</div>
        <div className="pmr-controls">
          {!running ? (
            <button className="btn btn-primary" onClick={start}>{step > 0 ? t('pmr_resume') : t('pmr_begin')}</button>
          ) : (
            <button className="btn btn-ghost" onClick={pause}>{t('pmr_pause')}</button>
          )}
          <button className="btn btn-ghost" onClick={reset}>{t('pmr_reset')}</button>
        </div>
      </div>
    </div>
  );
}

// ----- Sleep Compression Calculator (Module 6) -----
function CompressionCalc() {
  const t = useT ? useT() : (k => k);
  const [wake, setWake] = useStored('calc_wake', '06:30');
  const [duration, setDuration] = useStored('calc_dur', 5);

  const dur = Math.max(5, Math.min(9, duration));

  const computeBedtime = (wakeStr, hours) => {
    const [h, m] = wakeStr.split(':').map(Number);
    const wakeMin = h * 60 + m;
    // bedtime = wake - hours - 0.5 (add 30 min flexibility)
    let bedMin = wakeMin - (hours + 0.5) * 60;
    bedMin = ((bedMin % 1440) + 1440) % 1440;
    const bh = Math.floor(bedMin / 60);
    const bm = Math.round(bedMin % 60);
    return `${String(bh).padStart(2, '0')}:${String(bm).padStart(2, '0')}`;
  };

  const fmt12 = (s) => {
    const [h, m] = s.split(':').map(Number);
    const ap = h < 12 ? 'AM' : 'PM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, '0')} ${ap}`;
  };

  const bed = computeBedtime(wake, dur);
  const window2Hr = Math.min(dur + 0.5, 7.5);
  const bed2 = computeBedtime(wake, window2Hr - 0.5);

  return (
    <div className="widget">
      <div className="widget-head">
        <div className="widget-label">{t('calc_label')}</div>
        <h3>{t('calc_title')}</h3>
        <p className="widget-sub">{t('calc_sub')}</p>
      </div>

      <div className="calc-grid">
        <div>
          <div className="calc-input-row">
            <label className="calc-label">{t('calc_wake')}</label>
            <input className="calc-time" type="time" value={wake} onChange={e => setWake(e.target.value)}/>
          </div>
          <div className="calc-input-row">
            <label className="calc-label">{t('calc_dur')}: <strong style={{color: 'var(--night)'}}>{dur} hrs</strong></label>
            <input type="range" min="5" max="9" step="0.5" value={dur} onChange={e => setDuration(parseFloat(e.target.value))} style={{width: '100%'}}/>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginTop: 4}}>
              <span>{t('calc_min')}</span><span>{t('calc_max')}</span>
            </div>
          </div>
          <Callout label={t('calc_how_label')}>
            {t('calc_how')}
          </Callout>
        </div>

        <div className="calc-result">
          <div className="calc-result-label">{t('calc_starting')}</div>
          <div className="calc-result-time">{fmt12(bed)}</div>
          <div className="calc-result-sub">{t('calc_wake_at_a')} <strong style={{color: 'var(--cream)'}}>{fmt12(wake)}</strong> {t('calc_wake_at_b')}</div>

          <div className="calc-step">
            <div className="calc-step-label">{t('calc_step1')}</div>
            <div className="calc-step-val">{fmt12(bed)} → {fmt12(wake)}</div>
            <div style={{fontSize: 13, color: 'rgba(244,241,236,0.7)', marginTop: 6}}>{t('calc_step1_sub_a')} {dur} {t('calc_step1_sub_b')}</div>
          </div>
          <div className="calc-step">
            <div className="calc-step-label">{t('calc_step2')}</div>
            <div className="calc-step-val">{fmt12(bed2)} → {fmt12(wake)}</div>
            <div style={{fontSize: 13, color: 'rgba(244,241,236,0.7)', marginTop: 6}}>{t('calc_step2_sub_a')} {fmt12(computeBedtime(wake, 7))} {t('calc_step2_sub_b')}</div>
          </div>
        </div>
      </div>

      <Callout label={t('calc_warn_label')}>
        {t('calc_warn')}
      </Callout>
    </div>
  );
}

// ----- Routine Builder (Module 7) -----
function RoutineBuilder() {
  const t = useT ? useT() : (k => k);
  const { lang } = useLang ? useLang() : { lang: 'en' };
  const LIB_I = window.SE_I18N && window.SE_I18N.ROUTINE_LIB_I18N ? window.SE_I18N.ROUTINE_LIB_I18N[lang] : null;
  const DEF_I = window.SE_I18N && window.SE_I18N.DEFAULT_ROUTINE_I18N ? window.SE_I18N.DEFAULT_ROUTINE_I18N[lang] : null;
  const LIBRARY = (LIB_I && LIB_I.length) ? LIB_I : window.SE_DATA.ROUTINE_LIBRARY;
  const DEFAULT = (DEF_I && DEF_I.length) ? DEF_I : window.SE_DATA.DEFAULT_ROUTINE;
  const [routine, setRoutine] = useStored('routine', DEFAULT);

  // If the stored routine matches a different language's default, auto-replace
  // with the current language's default. Detected by comparing item count + times.
  useEffect(() => {
    const ALL_DEFAULTS = (window.SE_I18N && window.SE_I18N.DEFAULT_ROUTINE_I18N) || {};
    const matchesDefault = (routine, def) => {
      if (!def || routine.length !== def.length) return false;
      return routine.every((r, i) => r.time === def[i].time && r.icon === def[i].icon);
    };
    // If current routine matches *another* language's default (not this one), swap.
    const matchesCurrent = matchesDefault(routine, DEFAULT);
    if (matchesCurrent) return;
    for (const [otherLang, otherDef] of Object.entries(ALL_DEFAULTS)) {
      if (otherLang === lang) continue;
      if (matchesDefault(routine, otherDef)) {
        setRoutine(DEFAULT);
        return;
      }
    }
  }, [lang]);

  const sorted = useMemo(() => [...routine].sort((a, b) => a.time.localeCompare(b.time)), [routine]);

  const addItem = (item) => {
    const last = sorted[sorted.length - 1];
    let nextTime = '21:30';
    if (last) {
      const [h, m] = last.time.split(':').map(Number);
      const t = h * 60 + m + 15;
      nextTime = `${String(Math.floor(t/60) % 24).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;
    }
    setRoutine([...routine, { ...item, time: nextTime, id: Date.now() + Math.random() }]);
  };

  const updateTime = (idx, time) => {
    const copy = [...routine];
    copy[idx] = { ...copy[idx], time };
    setRoutine(copy);
  };

  const removeItem = (idx) => setRoutine(routine.filter((_, i) => i !== idx));
  const reset = () => setRoutine(DEFAULT);

  // Need to map sorted indices back to original
  const findOrigIdx = (item) => routine.findIndex(r => r === item || (r.time === item.time && r.name === item.name && r.id === item.id));

  return (
    <div className="widget">
      <div className="widget-head" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 12}}>
        <div>
          <div className="widget-label">{t('routine_label')}</div>
          <h3>{t('routine_title')}</h3>
          <p className="widget-sub">{t('routine_sub')}</p>
        </div>
        <div style={{display: 'flex', gap: 8}}>
          <button className="btn btn-ghost" onClick={reset}>{t('routine_reset')}</button>
          <PrintBtn/>
        </div>
      </div>

      <div className="routine-grid">
        <div className="routine-pool">
          <h4>{t('routine_add')}</h4>
          {LIBRARY.map((item, i) => (
            <button key={i} className="routine-item" onClick={() => addItem(item)}>
              <span className="routine-icon">{item.icon}</span>
              <span>{item.name}</span>
              <span className="routine-add">+</span>
            </button>
          ))}
        </div>
        <div className="routine-schedule">
          <h4 style={{fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'Inter'}}>{t('routine_yours')}</h4>
          {sorted.length === 0 ? (
            <div className="routine-empty">{t('routine_empty')}</div>
          ) : (
            sorted.map((item, i) => {
              const origIdx = findOrigIdx(item);
              return (
                <div key={i} className="routine-row">
                  <input type="time" className="routine-time-input" value={item.time}
                    onChange={e => updateTime(origIdx, e.target.value)}/>
                  <div className="routine-name">
                    <span style={{color: 'var(--sand)', marginRight: 8}}>{item.icon}</span>
                    {item.name}
                  </div>
                  <button className="routine-remove" onClick={() => removeItem(origIdx)}>×</button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ----- Arousal Threshold visualization (Module 1) -----
// 6-stage interactive: shows how arousal interacts with the insomnia threshold,
// from baseline → stress → chronic insomnia → medication → tolerance → CBT.
function ArousalThreshold() {
  const t = useT ? useT() : (k => k);
  const { lang } = useLang ? useLang() : { lang: 'en' };
  // Stage data — pulls localized text from i18n with English fallbacks.
  // Each stage declares heights for the three segment kinds. Stacked bottom-up:
  //   baseline → stress → habits. Heights of 0 hide that segment.
  const STAGES_EN = [
    { label: 'Baseline', title: 'Your baseline arousal',
      desc: 'Each person has a natural level of "arousal intensity," shaped by age, genetics, and temperament. Some people sit closer to the insomnia threshold than others — even on a typical day.',
      seg: { baseline: 100, stress: 0,   habits: 0   },
      thresholdY: 120 },
    { label: 'Stress hits', title: 'A stressful event — acute insomnia',
      desc: "A precipitating event pushes arousal above the threshold. The trigger doesn't have to be negative — even joyful events like a new baby can do it. Sleep becomes difficult. This is acute insomnia.",
      seg: { baseline: 100, stress: 110, habits: 0   },
      thresholdY: 120 },
    { label: 'Habits form', title: 'Habits set in — chronic insomnia',
      desc: "After the original stress fades, unhealthy habits and a loss of confidence in your ability to sleep keep arousal elevated. The threshold hasn't moved — but you can't get back below it.",
      seg: { baseline: 100, stress: 0,   habits: 110 },
      thresholdY: 120 },
    { label: 'Medication', title: 'Medication enters the picture',
      desc: 'Sleep medications work by raising the threshold itself. Your underlying arousal is still high — but the medication makes it possible to sleep through it.',
      seg: { baseline: 100, stress: 0,   habits: 110 },
      thresholdY: 60 },
    { label: 'Tolerance', title: 'Tolerance builds — insomnia returns',
      desc: 'Over weeks or months, the brain adapts. The threshold settles back down. The same dose stops working, and the underlying arousal was never addressed.',
      seg: { baseline: 100, stress: 0,   habits: 110 },
      thresholdY: 120 },
    { label: 'CBT', title: 'CBT changes the underlying arousal',
      desc: 'CBT works on the perpetuating factors directly — the habits, the thoughts, the fears. Slowly, your arousal lowers. Sleep returns naturally — and stays.',
      seg: { baseline: 100, stress: 0,   habits: 0   },
      thresholdY: 120 },
  ];
  const I18N = (window.SE_I18N && window.SE_I18N.AROUSAL_I18N) ? window.SE_I18N.AROUSAL_I18N[lang] : null;
  const STAGES = STAGES_EN.map((s, i) => ({
    ...s,
    label: (I18N && I18N.stages && I18N.stages[i] && I18N.stages[i].label) || s.label,
    title: (I18N && I18N.stages && I18N.stages[i] && I18N.stages[i].title) || s.title,
    desc:  (I18N && I18N.stages && I18N.stages[i] && I18N.stages[i].desc)  || s.desc,
  }));
  const labels = {
    eyebrow: (I18N && I18N.eyebrow) || 'The Arousal Threshold Model',
    heading: (I18N && I18N.heading) || 'How insomnia takes hold,',
    headingEm: (I18N && I18N.headingEm) || 'and how it\u2019s undone.',
    awake: (I18N && I18N.awake) || 'Awake',
    asleep: (I18N && I18N.asleep) || 'Asleep',
    threshold: (I18N && I18N.threshold) || 'Insomnia threshold',
    arousal: (I18N && I18N.arousal) || 'Your arousal',
    hint: (I18N && I18N.hint) || 'Click through each stage in order to see how insomnia develops — and how CBT undoes it.',
    legend: {
      baseline: (I18N && I18N.legend && I18N.legend.baseline) || 'Baseline arousal',
      stress:   (I18N && I18N.legend && I18N.legend.stress)   || 'Acute stress',
      habits:   (I18N && I18N.legend && I18N.legend.habits)   || 'Chronic habits & worry',
    },
    cbtPress: (I18N && I18N.cbtPress) || 'CBT',
  };

  const [idx, setIdx] = useState(0);
  // Animated state: threshold line Y + the three segment heights.
  const [animThreshold, setAnimThreshold] = useState(STAGES[0].thresholdY);
  const [animSeg, setAnimSeg] = useState(STAGES[0].seg);
  // Force-mount the CBT indicator only after a real transition into stage 6,
  // so its press-down animation plays. Hidden on initial click of CBT? Still want
  // to show it — gate purely on idx === 5.
  const prevIdxRef = useRef(0);

  useEffect(() => {
    const targetT = STAGES[idx].thresholdY;
    const startT  = STAGES[prevIdxRef.current].thresholdY;
    const targetSeg = STAGES[idx].seg;
    const startSeg  = STAGES[prevIdxRef.current].seg;
    const fromIdx = prevIdxRef.current;
    prevIdxRef.current = idx;

    // Identify transitions that should play a long, gradual animation:
    //   • Threshold line: into Medication (idx 3) or Tolerance (idx 4).
    //   • Bar height: into Stress hits (idx 2) — stress rises gradually.
    //                 into CBT (idx 5) — bar drops gradually as CBT presses down.
    const slowThreshold = (idx === 3) || (idx === 4);
    const slowBar = (idx === 1) || (idx === 5);
    const duration = 2800; // ms

    if (!slowThreshold && !slowBar) {
      // Snap immediately for fast transitions (CSS handles the 0.6s smoothing).
      setAnimThreshold(targetT);
      setAnimSeg(targetSeg);
      return;
    }

    const t0 = performance.now();
    let raf;
    const ease = (p) => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const e = ease(p);
      setAnimThreshold(slowThreshold ? startT + (targetT - startT) * e : targetT);
      if (slowBar) {
        setAnimSeg({
          baseline: startSeg.baseline + (targetSeg.baseline - startSeg.baseline) * e,
          stress:   startSeg.stress   + (targetSeg.stress   - startSeg.stress)   * e,
          habits:   startSeg.habits   + (targetSeg.habits   - startSeg.habits)   * e,
        });
      } else {
        setAnimSeg(targetSeg);
      }
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [idx]);

  const s = STAGES[idx];
  const tY = animThreshold;
  // Snap-only stages bypass the CSS transition so quick clicks don't lag.
  const slowStage = (idx === 1) || (idx === 3) || (idx === 4) || (idx === 5);

  // Compute the rendered segment list (omit zero-height ones).
  const segOrder = ['baseline', 'stress', 'habits'];
  const visibleSegs = segOrder
    .map(kind => ({ kind, h: animSeg[kind] || 0 }))
    .filter(seg => seg.h > 0.5);
  // Top of bar (for CBT press arrow positioning).
  const barTopY = 300 - visibleSegs.reduce((a, b) => a + b.h, 0);
  // Legend: kinds present in the *target* stage (not mid-animation).
  const legendKinds = segOrder.filter(k => s.seg[k] > 0);

  return (
    <div className="threshold-viz">
      <div className="threshold-header">
        <div className="threshold-eyebrow">{labels.eyebrow}</div>
        <h3>{labels.heading} <em>{labels.headingEm}</em></h3>
        <div className="threshold-hint">{labels.hint}</div>
      </div>

      <div className="threshold-stages" role="tablist">
        {STAGES.map((stg, i) => (
          <button key={i} className={"threshold-stage-btn" + (i === idx ? ' active' : '')}
                  onClick={() => setIdx(i)} role="tab" aria-selected={i === idx}>
            <span className="threshold-stage-num">{String(i + 1).padStart(2, '0')}</span>
            <span>{stg.label}</span>
          </button>
        ))}
      </div>

      <svg className={"threshold-svg" + (slowStage ? ' slow' : '')} viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" aria-label="Arousal threshold diagram">
        {/* Zones */}
        <rect className="zone-awake" x="0" y="0" width="600" height={tY}/>
        <rect className="zone-asleep" x="0" y={tY} width="600" height={300 - tY}/>
        <text className="zone-label" x="20" y="22">{labels.awake}</text>
        <text className="zone-label" x="20" y={300 - 8}>{labels.asleep}</text>

        {/* Threshold line */}
        <line className="threshold-line" x1="40" y1={tY} x2="560" y2={tY}/>
        <text className="threshold-text" x="558" y={tY - 8} textAnchor="end">{labels.threshold}</text>

        {/* Stacked arousal segments — drawn from bottom up, animated heights */}
        {(() => {
          const barX = 270, barW = 60, bottomY = 300;
          let cursor = bottomY;
          return visibleSegs.map((seg, i) => {
            cursor -= seg.h;
            const isTop = i === visibleSegs.length - 1;
            return (
              <rect key={seg.kind}
                    className={"arousal-seg arousal-seg--" + seg.kind}
                    x={barX} y={cursor} width={barW} height={seg.h}
                    rx={isTop ? 3 : 0} ry={isTop ? 3 : 0}/>
            );
          });
        })()}
        <text className="arousal-label" x="300" y="318">{labels.arousal}</text>

        {/* CBT press-down indicator — only on stage 6 (CBT). A label + arrow
            sit just above the bar, visually pressing it down. */}
        {idx === 5 && (
          <g className="cbt-press" transform={`translate(300, ${barTopY - 14})`}>
            <text className="cbt-press-label" x="0" y="-14" textAnchor="middle">{labels.cbtPress}</text>
            <path className="cbt-press-arrow" d="M -7 -6 L 0 4 L 7 -6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        )}
      </svg>

      {/* Legend — only shows segment kinds present in this stage */}
      <div className="threshold-legend">
        {legendKinds.map(kind => (
          <div key={kind} className="threshold-legend-item">
            <span className={"threshold-legend-swatch threshold-legend-swatch--" + kind}/>
            <span>{labels.legend[kind]}</span>
          </div>
        ))}
      </div>

      <div className="threshold-stage-info">
        <div className="threshold-stage-title">{s.title}</div>
        <p className="threshold-stage-desc">{s.desc}</p>
      </div>
    </div>
  );
}

Object.assign(window, {
  SleepQuiz, ReframeJournal, BreathingTimer, PMRWalkthrough, CompressionCalc, RoutineBuilder, ArousalThreshold
});
