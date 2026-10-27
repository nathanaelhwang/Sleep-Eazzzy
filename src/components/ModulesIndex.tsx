'use client';

import { PROGRAM_MINUTES } from '@/lib/data';
import { fillText } from './fill';
import { useNum, useT } from './LangProvider';
import { ProgramList, useLiveProgress } from './ProgramList';

export function ModulesIndex() {
  const t = useT();
  const num = useNum();
  const progress = useLiveProgress();
  const total = PROGRAM_MINUTES;

  return (
    <div className="wrap">
      <header className="page-head">
        <h1>{t('home_modules_h1')}</h1>
        <p>{fillText(t('home_modules_lede'), { n: num(total) })}</p>
      </header>
      <div className="modules-page">
        <ProgramList progress={progress} extrasHeading="h2" />
      </div>
    </div>
  );
}
