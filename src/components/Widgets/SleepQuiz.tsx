'use client';

import { useState } from 'react';
import { useDict, useT, useTArr } from '../LangProvider';
import type { LocalizedQuizQuestion, RichQuizOption } from '@/lib/i18n/types';

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
  const tArr = useTArr();
  const Q = useDict().quiz;

  const [tapped, setTapped] = useState<Revealed[]>(() => Q.map(() => new Set<number>()));

  const tap = (qi: number, oi: number) => {
    setTapped((prev) => {
      const next = prev.slice();
      const s = new Set(next[qi]);
      s.add(oi);
      next[qi] = s;
      return next;
    });
  };

  const reset = () => setTapped(Q.map(() => new Set<number>()));

  const qWords = tArr('quiz_q_words');

  return (
    <div className="quiz-block">
      <div className="quiz-intro">
        <div className="quiz-intro-eyebrow">{t('quiz_intro_eyebrow')}</div>
        <h3>
          {t('quiz_intro_h')} <em>{t('quiz_intro_h_em')}</em>
        </h3>
        <p>{t('quiz_intro_p')}</p>
      </div>

      {Q.map((q, qi) => {
        const revealedSet = tapped[qi];
        const allRevealed = revealedSet && revealedSet.size === q.options.length;
        return (
          <div key={qi} className="quiz-card">
            <div className="quiz-q-num">
              {t('quiz_q_label')} {qWords[qi] ?? qi + 1}
            </div>
            <h4 className="quiz-q">{q.q}</h4>
            <div className="quiz-options">
              {q.options.map((rawOpt, oi) => {
                const opt = normalizeOption(rawOpt, q, oi);
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
                    type="button"
                    className={cls}
                    onClick={() => tap(qi, oi)}
                    aria-expanded={isRevealed}
                  >
                    <span className="quiz-option-letter">{String.fromCharCode(65 + oi)}</span>
                    <span className="quiz-option-body">
                      <span className="quiz-option-text">
                        {isRevealed && (
                          <span className={'quiz-badge ' + (isCorrect ? 'right' : 'wrong')}>
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
        <button type="button" className="btn btn-ghost" onClick={reset}>
          {t('quiz_reset')}
        </button>
      </div>
    </div>
  );
}
