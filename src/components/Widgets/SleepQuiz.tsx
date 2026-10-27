'use client';

import { useId, useState } from 'react';
import { useDict, useT } from '../LangProvider';
import type { LocalizedQuizQuestion, RichQuizOption } from '@/lib/i18n/types';
import { fill } from '../fill';

type Revealed = ReadonlySet<number>;

function normalizeOption(
  raw: string | RichQuizOption,
  q: LocalizedQuizQuestion,
  oi: number
): RichQuizOption {
  if (typeof raw === 'string') {
    return { text: raw, explanation: oi === q.correct ? q.feedback : '' };
  }
  return raw;
}

export function SleepQuiz() {
  const t = useT();
  const Q = useDict().quiz;
  const uid = useId();

  const [tapped, setTapped] = useState<Revealed[]>(() => Q.map(() => new Set<number>()));

  // Checking an answer reveals whether it's right and why; unchecking hides it again.
  const toggle = (qi: number, oi: number) => {
    setTapped((prev) => {
      const next = prev.slice();
      const s = new Set(next[qi]);
      if (s.has(oi)) s.delete(oi);
      else s.add(oi);
      next[qi] = s;
      return next;
    });
  };

  return (
    <div className="panel quiz">
      <h3>{t('w_quiz_title')}</h3>
      {Q.map((q, qi) => {
        const revealedSet = tapped[qi];
        const allRevealed = revealedSet.size === q.options.length;
        return (
          <section key={qi} className="quiz-q" aria-labelledby={`${uid}-${qi}`}>
            <p className="muted small t">{fill(t('w_quiz_q'), { n: qi + 1, total: Q.length })}</p>
            <h4 id={`${uid}-${qi}`}>{q.q}</h4>
            <ul className="rows quiz-options">
              {q.options.map((rawOpt, oi) => {
                const opt = normalizeOption(rawOpt, q, oi);
                const isRevealed = revealedSet.has(oi);
                const isCorrect = oi === q.correct;
                const state = isRevealed ? (isCorrect ? ' correct' : ' incorrect') : '';
                return (
                  <li key={oi} className={'quiz-option' + state}>
                    <label className="quiz-check">
                      <input
                        type="checkbox"
                        checked={isRevealed}
                        onChange={() => toggle(qi, oi)}
                        aria-describedby={isRevealed && opt.explanation ? `${uid}-${qi}-${oi}` : undefined}
                      />
                      <span className="quiz-option-text">{opt.text}</span>
                      {isRevealed && (
                        <span className="quiz-verdict">
                          {isCorrect ? t('w_quiz_correct') : t('quiz_wrong_short')}
                        </span>
                      )}
                    </label>
                    {isRevealed && opt.explanation && (
                      <p id={`${uid}-${qi}-${oi}`} className="quiz-explanation">
                        {opt.explanation}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
            {!allRevealed && revealedSet.size > 0 && (
              <p className="quiz-hint muted small">{t('quiz_hint')}</p>
            )}
          </section>
        );
      })}

      <div className="quiz-foot">
        <button
          type="button"
          className="btn btn-quiet btn-small"
          onClick={() => setTapped(Q.map(() => new Set<number>()))}
        >
          {t('quiz_reset')}
        </button>
      </div>
    </div>
  );
}
