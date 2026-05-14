'use client';

import { useState } from 'react';
import { useT } from './LangProvider';

export function LessonBlock({
  title,
  summary,
  full,
  defaultOpen,
}: {
  title?: string;
  summary?: React.ReactNode;
  full?: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const t = useT();
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="lesson-block">
      {title && <h4>{title}</h4>}
      {summary}
      {full && (
        <>
          <div className="expand-toggle" onClick={() => setOpen(!open)}>
            {open ? t('lesson_hide') : t('lesson_show')}
          </div>
          {open && <div className="expand-content">{full}</div>}
        </>
      )}
    </div>
  );
}
