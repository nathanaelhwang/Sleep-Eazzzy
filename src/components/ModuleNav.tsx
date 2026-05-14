'use client';

import Link from 'next/link';
import { useLang, useModules, useT } from './LangProvider';

export function ModuleNav({ current }: { current: number }) {
  const lang = useLang();
  const t = useT();
  const mods = useModules();
  const prefix = `/${lang}`;
  const idx = mods.findIndex((m) => m.id === current);
  const prev = idx > 0 ? mods[idx - 1] : null;
  const next = idx < mods.length - 1 ? mods[idx + 1] : null;

  return (
    <div className="bottom-nav">
      {prev ? (
        <Link
          href={`${prefix}/module/${prev.slug}`}
          className="bn-btn"
          style={{ textDecoration: 'none' }}
        >
          <div className="bn-label">
            ← {t('prev_label')} {prev.num}
          </div>
          <div className="bn-title">{prev.title}</div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`${prefix}/module/${next.slug}`}
          className="bn-btn next"
          style={{ textDecoration: 'none' }}
        >
          <div className="bn-label">
            {t('next_label')} {next.num} →
          </div>
          <div className="bn-title">{next.title}</div>
        </Link>
      ) : (
        <Link
          href={prefix}
          className="bn-btn next"
          style={{ textDecoration: 'none' }}
        >
          <div className="bn-label">{t('done_label')} →</div>
          <div className="bn-title">{t('done_back')}</div>
        </Link>
      )}
    </div>
  );
}
