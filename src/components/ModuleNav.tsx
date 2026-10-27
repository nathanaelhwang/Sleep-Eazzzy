'use client';

import Link from 'next/link';
import type { Module } from '@/lib/data';
import { fillText } from './fill';
import { useLang, useModules, useNum, useT } from './LangProvider';

export function ModuleNav({ current }: { current: number }) {
  const lang = useLang();
  const t = useT();
  const mods = useModules();
  const prefix = `/${lang}`;
  const num = useNum();
  const idx = mods.findIndex((m) => m.id === current);
  const prev = idx > 0 ? mods[idx - 1] : null;
  const next = idx < mods.length - 1 ? mods[idx + 1] : null;
  const kicker = (m: Module, key: 'prev' | 'next') =>
    m.bonus ? t(`mod_${key}_bonus`) : fillText(t(`mod_${key}`), { n: num(m.id) });

  return (
    <nav className="pn" aria-label={t('mod_nav_label')}>
      {prev ? (
        <Link href={`${prefix}/module/${prev.slug}`} className="prev">
          <span className="pk">{kicker(prev, 'prev')}</span>
          <span className="pt">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`${prefix}/module/${next.slug}`} className="next">
          <span className="pk">{kicker(next, 'next')}</span>
          <span className="pt">{next.title}</span>
        </Link>
      ) : (
        <Link href={prefix} className="next">
          <span className="pk">{t('mod_nav_end')}</span>
          <span className="pt">{t('done_back')}</span>
        </Link>
      )}
    </nav>
  );
}
