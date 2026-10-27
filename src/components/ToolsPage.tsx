'use client';

import Link from 'next/link';
import { useLang, useModules, useT } from './LangProvider';

const TOOLS = [
  { key: 'quiz', mod: 'intro', tool: 'quiz' },
  { key: 'reframe', mod: 'cognitive', tool: 'reframe' },
  { key: 'breath', mod: 'relaxation', tool: 'breathing' },
  { key: 'pmr', mod: 'relaxation', tool: 'pmr' },
  { key: 'calc', mod: 'compression', tool: 'calc' },
  { key: 'routine', mod: 'sleep-plan', tool: 'routine' },
] as const;

export function ToolsPage() {
  const lang = useLang();
  const t = useT();
  const modules = useModules();
  const num = new Intl.NumberFormat(lang);

  return (
    <div className="wrap">
      <header className="page-head">
        <h1>{t('tools_title')}</h1>
        <p>{t('tools_lede')}</p>
      </header>

      <ul className="tools-index pg-body">
        {TOOLS.map((tool) => {
          const mod = modules.find((m) => m.slug === tool.mod);
          const where = mod
            ? t('tool_module').replace('{n}', num.format(mod.id)).replace('{title}', mod.title)
            : '';
          return (
            <li key={tool.key}>
              <Link href={`/${lang}/module/${tool.mod}${tool.tool ? `?tool=${tool.tool}` : ''}`}>
                <span className="tools-name">{t(`tool_${tool.key}_t`)}</span>
                <span className="tools-desc">{t(`tool_${tool.key}_d`)}</span>
                {where && <span className="tools-where">{where}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
