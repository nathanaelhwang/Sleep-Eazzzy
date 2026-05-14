'use client';

import type { Module } from '@/lib/data';
import { useModules, useT } from './LangProvider';

export function ModuleHero({ mod }: { mod: Module }) {
  const t = useT();
  const mods = useModules();
  const label = mod.bonus ? t('bonus_label') : t('module_label');
  return (
    <header className="mod-hero">
      <div className="container">
        <div className="mod-eyebrow">
          {label} {mod.num} · {mod.duration}
        </div>
        <h1>{mod.title}</h1>
        <p className="mod-hero-sub">{mod.subtitle}</p>
        <div className="mod-progress-bar">
          {mods
            .filter((m) => !m.bonus)
            .map((m) => (
              <div
                key={m.id}
                className={m.id < mod.id ? 'done' : m.id === mod.id ? 'active' : ''}
              />
            ))}
        </div>
      </div>
    </header>
  );
}
