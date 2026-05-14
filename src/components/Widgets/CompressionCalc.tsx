'use client';

import { useStored } from '@/lib/useStored';
import { Callout } from '../Callout';
import { useT } from '../LangProvider';

function computeBedtime(wakeStr: string, hours: number): string {
  const [h, m] = wakeStr.split(':').map(Number);
  const wakeMin = h * 60 + m;
  let bedMin = wakeMin - (hours + 0.5) * 60;
  bedMin = ((bedMin % 1440) + 1440) % 1440;
  const bh = Math.floor(bedMin / 60);
  const bm = Math.round(bedMin % 60);
  return `${String(bh).padStart(2, '0')}:${String(bm).padStart(2, '0')}`;
}

function fmt12(s: string): string {
  const [h, m] = s.split(':').map(Number);
  const ap = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ap}`;
}

export function CompressionCalc() {
  const t = useT();
  const [wake, setWake] = useStored<string>('calc_wake', '06:30');
  const [duration, setDuration] = useStored<number>('calc_dur', 5);

  const dur = Math.max(5, Math.min(9, duration));
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
            <input
              className="calc-time"
              type="time"
              value={wake}
              onChange={(e) => setWake(e.target.value)}
            />
          </div>
          <div className="calc-input-row">
            <label className="calc-label">
              {t('calc_dur')}: <strong style={{ color: 'var(--night)' }}>{dur} hrs</strong>
            </label>
            <input
              type="range"
              min="5"
              max="9"
              step="0.5"
              value={dur}
              onChange={(e) => setDuration(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 12,
                color: 'var(--muted)',
                marginTop: 4,
              }}
            >
              <span>{t('calc_min')}</span>
              <span>{t('calc_max')}</span>
            </div>
          </div>
          <Callout label={t('calc_how_label')}>{t('calc_how')}</Callout>
        </div>

        <div className="calc-result">
          <div className="calc-result-label">{t('calc_starting')}</div>
          <div className="calc-result-time">{fmt12(bed)}</div>
          <div className="calc-result-sub">
            {t('calc_wake_at_a')}{' '}
            <strong style={{ color: 'var(--cream)' }}>{fmt12(wake)}</strong>{' '}
            {t('calc_wake_at_b')}
          </div>

          <div className="calc-step">
            <div className="calc-step-label">{t('calc_step1')}</div>
            <div className="calc-step-val">
              {fmt12(bed)} → {fmt12(wake)}
            </div>
            <div style={{ fontSize: 13, color: 'rgba(244,241,236,0.7)', marginTop: 6 }}>
              {t('calc_step1_sub_a')} {dur} {t('calc_step1_sub_b')}
            </div>
          </div>
          <div className="calc-step">
            <div className="calc-step-label">{t('calc_step2')}</div>
            <div className="calc-step-val">
              {fmt12(bed2)} → {fmt12(wake)}
            </div>
            <div style={{ fontSize: 13, color: 'rgba(244,241,236,0.7)', marginTop: 6 }}>
              {t('calc_step2_sub_a')} {fmt12(computeBedtime(wake, 7))} {t('calc_step2_sub_b')}
            </div>
          </div>
        </div>
      </div>

      <Callout label={t('calc_warn_label')}>{t('calc_warn')}</Callout>
    </div>
  );
}
