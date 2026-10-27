'use client';

import { useId, useState } from 'react';
import { useStored } from '@/lib/useStored';
import { useDict, useT } from '../LangProvider';
import type { ReframePair } from '@/lib/data';

type Entry = ReframePair & { id: number };

export function ReframeJournal() {
  const t = useT();
  const SUGS = useDict().reframe;
  const id = useId();

  const [entries, setEntries] = useStored<Entry[]>('reframe', []);
  const [neg, setNeg] = useState('');
  const [pos, setPos] = useState('');

  const add = () => {
    if (!neg.trim() || !pos.trim()) return;
    setEntries([...entries, { neg: neg.trim(), pos: pos.trim(), id: Date.now() }]);
    setNeg('');
    setPos('');
  };

  return (
    <div className="panel reframe">
      <h3>{t('reframe_title')}</h3>
      <p className="muted measure">{t('reframe_sub')}</p>

      <div className="reframe-grid">
        <div className="field">
          <label htmlFor={`${id}-neg`}>{t('reframe_neg_h')}</label>
          <textarea
            className="inp"
            id={`${id}-neg`}
            placeholder={t('reframe_neg_ph')}
            value={neg}
            onChange={(e) => setNeg(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={`${id}-pos`}>{t('reframe_pos_h')}</label>
          <textarea
            className="inp"
            id={`${id}-pos`}
            placeholder={t('reframe_pos_ph')}
            value={pos}
            onChange={(e) => setPos(e.target.value)}
          />
        </div>
      </div>

      <div className="reframe-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={add}
          disabled={!neg.trim() || !pos.trim()}
        >
          {t('w_reframe_save')}
        </button>
      </div>

      <h4 className="reframe-sub">{t('w_reframe_examples')}</h4>
      <div className="reframe-suggestions">
        {SUGS.slice(0, 4).map((s, i) => (
          <button
            key={i}
            type="button"
            className="btn btn-quiet btn-small"
            onClick={() => {
              setNeg(s.neg);
              setPos(s.pos);
            }}
          >
            {s.neg}
          </button>
        ))}
      </div>

      {entries.length > 0 && (
        <>
          <h4 className="reframe-sub">
            {t('reframe_yours')} <span className="muted t">({entries.length})</span>
          </h4>
          <ul className="rows reframe-entries">
            {entries.map((e) => (
              <li key={e.id}>
                <div className="reframe-pair">
                  <p className="muted">
                    <span className="sr">{t('reframe_neg_h')}: </span>
                    {e.neg}
                  </p>
                  <p>
                    <span className="sr">{t('reframe_pos_h')}: </span>
                    {e.pos}
                  </p>
                </div>
                <button
                  type="button"
                  className="link-btn small"
                  onClick={() => setEntries(entries.filter((x) => x.id !== e.id))}
                >
                  {t('w_remove')}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
