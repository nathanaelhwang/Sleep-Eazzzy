'use client';

import Link from 'next/link';
import { useLang, useT } from './LangProvider';

/** One quiet line on every module page: educational only, with a link to the full disclaimer. */
export function ModuleDisclaimer() {
  const t = useT();
  const lang = useLang();
  return (
    <p className="mod-disclaimer small muted">
      {t('mod_disclaimer')} <Link href={`/${lang}/privacy`}>{t('footer_disclaimer')}</Link>
    </p>
  );
}
