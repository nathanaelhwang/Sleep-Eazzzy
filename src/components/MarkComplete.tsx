'use client';

import { useStored } from '@/lib/useStored';
import { useT } from './LangProvider';

type Progress = Record<number, boolean>;

export function MarkComplete({ moduleId }: { moduleId: number }) {
  const t = useT();
  const [progress, setProgress] = useStored<Progress>('progress', {});
  const done = !!progress[moduleId];
  const toggle = () =>
    setProgress({ ...progress, [moduleId]: !done });
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
        onClick={toggle}
      >
        {done ? t('mark_uncomplete') : t('mark_complete')}
      </button>
    </div>
  );
}
