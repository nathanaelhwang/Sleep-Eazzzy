'use client';

import { fillText } from './fill';
import { useModules, useNum, useT } from './LangProvider';
import { useModuleProgress } from './Modules/progress';

export function MarkComplete({ moduleId }: { moduleId: number }) {
  const t = useT();
  const mod = useModules().find((m) => m.id === moduleId);
  const num = useNum();
  const { progress, setComplete } = useModuleProgress();
  const done = !!progress[moduleId];
  const bonus = !!mod?.bonus;
  const label = bonus
    ? t(done ? 'mod_done_on_bonus' : 'mod_done_off_bonus')
    : fillText(t(done ? 'mod_done_on' : 'mod_done_off'), { n: num(moduleId) });

  return (
    <div className="mod-done">
      <button
        type="button"
        className="btn btn-primary done-btn"
        aria-pressed={done}
        onClick={() => setComplete(moduleId, !done)}
      >
        {label}
      </button>
      <p className="small muted" role="status">
        {t(done ? 'mod_done_saved' : 'mod_done_hint')}
      </p>
    </div>
  );
}
