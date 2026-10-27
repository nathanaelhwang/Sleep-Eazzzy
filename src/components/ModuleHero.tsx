'use client';

import Link from 'next/link';
import { MODULE_MINUTES, type Module } from '@/lib/data';
import { fill, fillText } from './fill';
import { useLang, useModules, useNum, useT } from './LangProvider';
import { useModuleProgress } from './Modules/progress';

export function ModuleHero({ mod }: { mod: Module }) {
  const t = useT();
  const lang = useLang();
  const core = useModules().filter((m) => !m.bonus);
  const { progress } = useModuleProgress();
  const num = useNum();
  const minutes = <span className="t">{fillText(t('mod_minutes'), { n: num(MODULE_MINUTES[mod.id]) })}</span>;

  return (
    <div className="mod-top">
      <p className="crumb">
        <Link href={`/${lang}/modules`}>{t('mod_crumb')}</Link>
      </p>
      <nav className="mod-strip" aria-label={t('mod_strip_label')}>
        <ol className="strip">
          {core.map((m) => {
            const cur = m.id === mod.id;
            const state = progress[m.id] ? 'done' : cur ? 'cur' : undefined;
            return (
              <li key={m.id} className={state} style={{ flex: `${MODULE_MINUTES[m.id]} 1 0` }}>
                <Link href={`/${lang}/module/${m.slug}`} aria-current={cur ? 'page' : undefined}>
                  <i aria-hidden="true" />
                  <span className="num-only" aria-hidden="true">{num(m.id)}</span>
                  <span className="full">
                    {num(m.id)} {t(`mod_short_${m.id}`)}
                  </span>
                  <span className="sr">
                    , {t(state === 'done' ? 'mod_state_done' : cur ? 'mod_state_cur' : 'mod_state_todo')}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mod-title">
        <h1>{mod.title}</h1>
        <p className="meta">
          {mod.bonus
            ? fill(t('mod_meta_bonus'), { time: minutes })
            : fill(t('mod_meta'), { n: num(mod.id), total: num(core.length), time: minutes })}
        </p>
        <p className="sub">{mod.subtitle}</p>
      </div>
    </div>
  );
}
