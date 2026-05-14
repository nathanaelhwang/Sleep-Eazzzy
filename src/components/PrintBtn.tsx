'use client';

import { useT } from './LangProvider';

export function PrintBtn() {
  const t = useT();
  return (
    <button type="button" className="print-btn" onClick={() => window.print()}>
      {t('routine_print')}
    </button>
  );
}
