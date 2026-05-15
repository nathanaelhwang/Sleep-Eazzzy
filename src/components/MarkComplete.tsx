'use client';

import { useProgress } from '@/lib/useProgress';
import { useT } from './LangProvider';

export function MarkComplete({ moduleId }: { moduleId: number }) {
  const t = useT();
  const { progress, setComplete } = useProgress();
  const done = !!progress[moduleId];

  return (
    <div
      className="widget"
      style={{ textAlign: 'center', background: done ? 'var(--cream-2)' : 'white' }}
    >
      <h3 style={{ fontSize: 22, marginBottom: 8 }}>
        {done ? t('module_done') : t('finished_q')}
      </h3>
      <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
        {done ? t('module_done_sub') : t('finished_sub')}
      </p>
      <button
        type="button"
        className={'btn ' + (done ? 'btn-ghost' : 'btn-primary')}
        onClick={() => setComplete(moduleId, !done)}
      >
        {done ? t('mark_uncomplete') : t('mark_complete')}
      </button>
    </div>
  );
}
