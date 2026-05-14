'use client';

import { useEffect, useRef, useState } from 'react';
import { useDict } from '../LangProvider';

type SegKey = 'baseline' | 'stress' | 'habits';
type SegHeights = Record<SegKey, number>;

type Stage = {
  label: string;
  title: string;
  desc: string;
  seg: SegHeights;
  thresholdY: number;
};

const STAGES_EN: Stage[] = [
  {
    label: 'Baseline',
    title: 'Your baseline arousal',
    desc:
      'Each person has a natural level of "arousal intensity," shaped by age, genetics, and temperament. Some people sit closer to the insomnia threshold than others — even on a typical day.',
    seg: { baseline: 100, stress: 0,   habits: 0   },
    thresholdY: 120,
  },
  {
    label: 'Stress hits',
    title: 'A stressful event — acute insomnia',
    desc:
      "A precipitating event pushes arousal above the threshold. The trigger doesn't have to be negative — even joyful events like a new baby can do it. Sleep becomes difficult. This is acute insomnia.",
    seg: { baseline: 100, stress: 110, habits: 0   },
    thresholdY: 120,
  },
  {
    label: 'Habits form',
    title: 'Habits set in — chronic insomnia',
    desc:
      "After the original stress fades, unhealthy habits and a loss of confidence in your ability to sleep keep arousal elevated. The threshold hasn't moved — but you can't get back below it.",
    seg: { baseline: 100, stress: 0,   habits: 110 },
    thresholdY: 120,
  },
  {
    label: 'Medication',
    title: 'Medication enters the picture',
    desc:
      'Sleep medications work by raising the threshold itself. Your underlying arousal is still high — but the medication makes it possible to sleep through it.',
    seg: { baseline: 100, stress: 0,   habits: 110 },
    thresholdY: 60,
  },
  {
    label: 'Tolerance',
    title: 'Tolerance builds — insomnia returns',
    desc:
      'Over weeks or months, the brain adapts. The threshold settles back down. The same dose stops working, and the underlying arousal was never addressed.',
    seg: { baseline: 100, stress: 0,   habits: 110 },
    thresholdY: 120,
  },
  {
    label: 'CBT',
    title: 'CBT changes the underlying arousal',
    desc:
      'CBT works on the perpetuating factors directly — the habits, the thoughts, the fears. Slowly, your arousal lowers. Sleep returns naturally — and stays.',
    seg: { baseline: 100, stress: 0,   habits: 0   },
    thresholdY: 120,
  },
];

const EN_LABELS = {
  eyebrow: 'The Arousal Threshold Model',
  heading: 'How insomnia takes hold,',
  headingEm: 'and how it’s undone.',
  awake: 'Awake',
  asleep: 'Asleep',
  threshold: 'Insomnia threshold',
  arousal: 'Your arousal',
  hint: 'Click through each stage in order to see how insomnia develops — and how CBT undoes it.',
  legend: {
    baseline: 'Baseline arousal',
    stress: 'Acute stress',
    habits: 'Chronic habits & worry',
  },
  cbtPress: 'CBT',
};

export function ArousalThreshold() {
  const arousal = useDict().arousal;

  // Merge English defaults with any locale-specific overrides.
  const STAGES: Stage[] = STAGES_EN.map((s, i) => ({
    ...s,
    label: arousal?.stages?.[i]?.label ?? s.label,
    title: arousal?.stages?.[i]?.title ?? s.title,
    desc:  arousal?.stages?.[i]?.desc  ?? s.desc,
  }));

  const labels = {
    eyebrow:   arousal?.eyebrow   ?? EN_LABELS.eyebrow,
    heading:   arousal?.heading   ?? EN_LABELS.heading,
    headingEm: arousal?.headingEm ?? EN_LABELS.headingEm,
    awake:     arousal?.awake     ?? EN_LABELS.awake,
    asleep:    arousal?.asleep    ?? EN_LABELS.asleep,
    threshold: arousal?.threshold ?? EN_LABELS.threshold,
    arousal:   arousal?.arousal   ?? EN_LABELS.arousal,
    hint:      arousal?.hint      ?? EN_LABELS.hint,
    cbtPress:  arousal?.cbtPress  ?? EN_LABELS.cbtPress,
    legend: {
      baseline: arousal?.legend?.baseline ?? EN_LABELS.legend.baseline,
      stress:   arousal?.legend?.stress   ?? EN_LABELS.legend.stress,
      habits:   arousal?.legend?.habits   ?? EN_LABELS.legend.habits,
    },
  };

  const [idx, setIdx] = useState(0);
  const [animThreshold, setAnimThreshold] = useState(STAGES[0].thresholdY);
  const [animSeg, setAnimSeg] = useState<SegHeights>(STAGES[0].seg);
  const prevIdxRef = useRef(0);

  useEffect(() => {
    const targetT = STAGES[idx].thresholdY;
    const startT = STAGES[prevIdxRef.current].thresholdY;
    const targetSeg = STAGES[idx].seg;
    const startSeg = STAGES[prevIdxRef.current].seg;
    prevIdxRef.current = idx;

    const slowThreshold = idx === 3 || idx === 4;
    const slowBar = idx === 1 || idx === 5;
    const duration = 2800;

    if (!slowThreshold && !slowBar) {
      setAnimThreshold(targetT);
      setAnimSeg(targetSeg);
      return;
    }

    const t0 = performance.now();
    let raf = 0;
    const ease = (p: number) =>
      p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    const step = (now: number) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const s = STAGES[idx];
  const tY = animThreshold;
  const slowStage = idx === 1 || idx === 3 || idx === 4 || idx === 5;

  const segOrder: SegKey[] = ['baseline', 'stress', 'habits'];
  const visibleSegs = segOrder
    .map((kind) => ({ kind, h: animSeg[kind] || 0 }))
    .filter((seg) => seg.h > 0.5);
  const barTopY = 300 - visibleSegs.reduce((a, b) => a + b.h, 0);
  const legendKinds = segOrder.filter((k) => s.seg[k] > 0);

  return (
    <div className="threshold-viz">
      <div className="threshold-header">
        <div className="threshold-eyebrow">{labels.eyebrow}</div>
        <h3>
          {labels.heading} <em>{labels.headingEm}</em>
        </h3>
        <div className="threshold-hint">{labels.hint}</div>
      </div>

      <div className="threshold-stages" role="tablist">
        {STAGES.map((stg, i) => (
          <button
            key={i}
            type="button"
            className={'threshold-stage-btn' + (i === idx ? ' active' : '')}
            onClick={() => setIdx(i)}
            role="tab"
            aria-selected={i === idx}
          >
            <span className="threshold-stage-num">{String(i + 1).padStart(2, '0')}</span>
            <span>{stg.label}</span>
          </button>
        ))}
      </div>

      <svg
        className={'threshold-svg' + (slowStage ? ' slow' : '')}
        viewBox="0 0 600 320"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Arousal threshold diagram"
      >
        <rect className="zone-awake" x="0" y="0" width="600" height={tY} />
        <rect className="zone-asleep" x="0" y={tY} width="600" height={300 - tY} />
        <text className="zone-label" x="20" y="22">
          {labels.awake}
        </text>
        <text className="zone-label" x="20" y={300 - 8}>
          {labels.asleep}
        </text>

        <line className="threshold-line" x1="40" y1={tY} x2="560" y2={tY} />
        <text className="threshold-text" x="558" y={tY - 8} textAnchor="end">
          {labels.threshold}
        </text>

        {(() => {
          const barX = 270;
          const barW = 60;
          const bottomY = 300;
          let cursor = bottomY;
          return visibleSegs.map((seg, i) => {
            cursor -= seg.h;
            const isTop = i === visibleSegs.length - 1;
            return (
              <rect
                key={seg.kind}
                className={'arousal-seg arousal-seg--' + seg.kind}
                x={barX}
                y={cursor}
                width={barW}
                height={seg.h}
                rx={isTop ? 3 : 0}
                ry={isTop ? 3 : 0}
              />
            );
          });
        })()}
        <text className="arousal-label" x="300" y="318">
          {labels.arousal}
        </text>

        {idx === 5 && (
          <g className="cbt-press" transform={`translate(300, ${barTopY - 14})`}>
            <text className="cbt-press-label" x="0" y="-14" textAnchor="middle">
              {labels.cbtPress}
            </text>
            <path
              className="cbt-press-arrow"
              d="M -7 -6 L 0 4 L 7 -6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}
      </svg>

      <div className="threshold-legend">
        {legendKinds.map((kind) => (
          <div key={kind} className="threshold-legend-item">
            <span className={'threshold-legend-swatch threshold-legend-swatch--' + kind} />
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
