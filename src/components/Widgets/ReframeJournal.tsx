'use client';

import { useState } from 'react';
import { useStored } from '@/lib/useStored';
import { useDict, useT } from '../LangProvider';
import type { ReframePair } from '@/lib/data';

type Entry = ReframePair & { id: number };

export function ReframeJournal() {
  const t = useT();
  const SUGS = useDict().reframe;

  const [entries, setEntries] = useStored<Entry[]>('reframe', []);
  const [neg, setNeg] = useState('');
  const [pos, setPos] = useState('');

  const add = () => {
    if (!neg.trim() || !pos.trim()) return;
    setEntries([...entries, { neg: neg.trim(), pos: pos.trim(), id: Date.now() }]);
    setNeg('');
    setPos('');
  };

  const useSuggestion = (s: ReframePair) => {
    setNeg(s.neg);
    setPos(s.pos);
  };

  const remove = (id: number) => setEntries(entries.filter((e) => e.id !== id));

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
          <textarea
            className="journal-input"
            placeholder={t('reframe_neg_ph')}
            value={neg}
            onChange={(e) => setNeg(e.target.value)}
          />
        </div>
        <div className="journal-col positive">
          <h4>{t('reframe_pos_h')}</h4>
          <textarea
            className="journal-input"
            placeholder={t('reframe_pos_ph')}
            value={pos}
            onChange={(e) => setPos(e.target.value)}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 12,
          marginTop: 16,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={add}
          disabled={!neg.trim() || !pos.trim()}
        >
          {t('reframe_save')}
        </button>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>{t('reframe_starter')}</span>
      </div>

      <div className="suggestions">
        {SUGS.slice(0, 4).map((s, i) => (
          <button
            key={i}
            type="button"
            className="suggestion-pill"
            onClick={() => useSuggestion(s)}
          >
            {s.neg} → {s.pos}
          </button>
        ))}
      </div>

      {entries.length > 0 && (
        <div className="journal-entries">
          <h4
            style={{
              fontFamily: 'Inter',
              fontSize: 13,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 12,
            }}
          >
            {t('reframe_yours')} ({entries.length})
          </h4>
          {entries.map((e) => (
            <div key={e.id} className="journal-entry">
              <div className="journal-neg">{e.neg}</div>
              <div className="journal-arrow">→</div>
              <div className="journal-pos">{e.pos}</div>
              <button
                type="button"
                className="journal-del"
                onClick={() => remove(e.id)}
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
