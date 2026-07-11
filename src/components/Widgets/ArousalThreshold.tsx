'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useDict } from '../LangProvider';

gsap.registerPlugin(useGSAP);

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

const SEG_ORDER: SegKey[] = ['baseline', 'stress', 'habits'];
const BAR_X = 270;
const BAR_W = 60;
const BAR_BOTTOM = 300;
// Stages whose change is the lesson get the long, deliberate tween.
const SLOW_STAGES = new Set([1, 3, 4, 5]);

type SegRect = { y: number; height: number };

function stackSegs(seg: SegHeights): Record<SegKey, SegRect> {
  let cursor = BAR_BOTTOM;
  const out = {} as Record<SegKey, SegRect>;
  for (const kind of SEG_ORDER) {
    cursor -= seg[kind];
    out[kind] = { y: cursor, height: seg[kind] };
  }
  return out;
}

function barTopY(seg: SegHeights): number {
  return BAR_BOTTOM - SEG_ORDER.reduce((sum, k) => sum + seg[k], 0);
}

function topSegKind(seg: SegHeights): SegKey {
  for (let i = SEG_ORDER.length - 1; i >= 0; i--) {
    if (seg[SEG_ORDER[i]] > 0) return SEG_ORDER[i];
  }
  return 'baseline';
}

// Stage-0 geometry for the server-rendered SVG; GSAP owns these attributes
// after mount, and React never writes them again (they are constants, so
// re-renders skip them).
const INIT_TY = STAGES_EN[0].thresholdY;
const INIT_STACK = stackSegs(STAGES_EN[0].seg);
const INIT_TOP = topSegKind(STAGES_EN[0].seg);

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
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      // Geometry is locale-independent, so read it from the English source.
      const stage = STAGES_EN[idx];
      // Read the preference per interaction rather than holding a
      // gsap.matchMedia() listener — the timeline is rebuilt on every click
      // anyway, so listeners would only accumulate.
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const slow = SLOW_STAGES.has(idx);

      // Kill the previous timeline so a rapid click interrupts cleanly and
      // the new tweens pick up from wherever the attributes currently are.
      tlRef.current?.kill();
      const tl = gsap.timeline({
        defaults: { duration: slow ? 2.8 : 0.6, ease: slow ? 'power2.inOut' : 'power2.out' },
      });
      tlRef.current = tl;

      const tY = stage.thresholdY;
      tl.to('.zone-awake', { attr: { height: tY } }, 0)
        .to('.zone-asleep', { attr: { y: tY, height: BAR_BOTTOM - tY } }, 0)
        .to('.threshold-line', { attr: { y1: tY, y2: tY } }, 0)
        .to('.threshold-text', { attr: { y: tY - 8 } }, 0);

      const stacked = stackSegs(stage.seg);
      const top = topSegKind(stage.seg);
      for (const kind of SEG_ORDER) {
        tl.to(`.arousal-seg--${kind}`, { attr: { ...stacked[kind] } }, 0).set(
          `.arousal-seg--${kind}`,
          { attr: { rx: kind === top ? 3 : 0, ry: kind === top ? 3 : 0 } },
          0,
        );
      }

      if (idx === 5) {
        // The CBT marker starts where the bar peaked in stage 5 and rides
        // the bar top down as CBT presses arousal below the threshold.
        const fromY = barTopY(STAGES_EN[4].seg) - 14;
        const toY = barTopY(stage.seg) - 14;
        tl.set('.cbt-press', { x: 300, y: fromY, opacity: 0 }, 0)
          .to('.cbt-press', { opacity: 1, duration: 0.7, ease: 'power1.out' }, 0)
          .to('.cbt-press', { y: toY }, 0);
        if (!reduce) {
          // Infinite bob stays out of the reduced build: it would make the
          // timeline endless, and progress(1) below couldn't skip past it.
          tl.to(
            '.cbt-press-arrow',
            { y: 3, duration: 0.8, ease: 'sine.inOut', repeat: -1, yoyo: true },
            0.7,
          );
        }
      }

      tl.fromTo(
        '.threshold-stage-info',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power1.out' },
        0,
      );

      // Reduced motion: same timeline, rendered at its end state. Jumping
      // (rather than building duration-0 tweens) sidesteps GSAP's
      // zero-duration render ambiguity at position 0.
      if (reduce) tl.progress(1);
    },
    { dependencies: [idx], scope: rootRef },
  );

  const s = STAGES[idx];
  const legendKinds = SEG_ORDER.filter((k) => s.seg[k] > 0);

  return (
    <div className="threshold-viz" ref={rootRef}>
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
        className="threshold-svg"
        viewBox="0 0 600 320"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Arousal threshold diagram"
      >
        <rect className="zone-awake" x="0" y="0" width="600" height={INIT_TY} />
        <rect
          className="zone-asleep"
          x="0"
          y={INIT_TY}
          width="600"
          height={BAR_BOTTOM - INIT_TY}
        />
        <text className="zone-label" x="20" y="22">
          {labels.awake}
        </text>
        <text className="zone-label" x="20" y={BAR_BOTTOM - 8}>
          {labels.asleep}
        </text>

        <line className="threshold-line" x1="40" y1={INIT_TY} x2="560" y2={INIT_TY} />
        <text className="threshold-text" x="558" y={INIT_TY - 8} textAnchor="end">
          {labels.threshold}
        </text>

        {SEG_ORDER.map((kind) => (
          <rect
            key={kind}
            className={'arousal-seg arousal-seg--' + kind}
            x={BAR_X}
            y={INIT_STACK[kind].y}
            width={BAR_W}
            height={INIT_STACK[kind].height}
            rx={kind === INIT_TOP ? 3 : 0}
            ry={kind === INIT_TOP ? 3 : 0}
          />
        ))}
        <text className="arousal-label" x="300" y="318">
          {labels.arousal}
        </text>

        {idx === 5 && (
          <g className="cbt-press" opacity={0}>
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

      <div className="threshold-stage-info" aria-live="polite">
        <div className="threshold-stage-title">{s.title}</div>
        <p className="threshold-stage-desc">{s.desc}</p>
      </div>
    </div>
  );
}
