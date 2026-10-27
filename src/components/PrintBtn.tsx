'use client';

import { useT } from './LangProvider';

export function PrintBtn() {
  const t = useT();
  return (
    <button type="button" className="btn btn-quiet btn-small no-print" onClick={() => window.print()}>
      {t('mod_print')}
    </button>
  );
}
