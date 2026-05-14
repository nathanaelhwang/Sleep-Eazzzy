'use client';

import Link from 'next/link';
import { useL, useLang, useT } from './LangProvider';

export function ToolsPage() {
  const lang = useLang();
  const t = useT();
  const L = useL();
  const prefix = `/${lang}`;

  const tools = [
    { title: t('quiz_label'),       desc: L('Test what you already know about sleep.', 'Pon a prueba lo que ya sabes sobre el sueño.', '測試你對睡眠的了解。', '测试你对睡眠的了解。'), mod: 'intro',           tool: '' },
    { title: t('reframe_title'),    desc: t('reframe_sub'), mod: 'cognitive', tool: 'reframe' },
    { title: L('Deep Breathing Relaxation', 'Relajación con Respiración Profunda', '深呼吸放鬆法', '深呼吸放松法'),
      desc: t('breath_sub'),        mod: 'relaxation',     tool: 'breathing' },
    { title: L('Progressive Muscle Relaxation', 'Relajación Muscular Progresiva', '漸進式肌肉放鬆', '渐进式肌肉放松'),
      desc: t('pmr_step_of'),       mod: 'relaxation',     tool: 'pmr' },
    { title: L(
        'Build your Sleep Compression Therapy Schedule',
        'Crea tu horario de Terapia de Compresión del Sueño',
        '建立你的睡眠壓縮療法時程',
        '建立你的睡眠压缩疗法时间表'
      ),
      desc: t('calc_sub'),          mod: 'compression',    tool: 'calc' },
    { title: t('routine_title'),    desc: t('routine_sub'), mod: 'sleep-plan',     tool: '' },
  ];

  return (
    <>
      <header className="mod-hero">
        <div className="container">
          <div className="mod-eyebrow">{t('tools_eyebrow')}</div>
          <h1>{t('tools_title')}</h1>
          <p className="mod-hero-sub">{t('tools_sub')}</p>
        </div>
      </header>
      <div className="container mod-body">
        <div className="modules">
          {tools.map((tool, i) => (
            <Link
              key={i}
              href={`${prefix}/module/${tool.mod}${tool.tool ? `?tool=${tool.tool}` : ''}`}
              className="module-card"
              style={{ textDecoration: 'none' }}
            >
              <div className="module-card-head">
                <div className="module-num">
                  {t('tool_label')} {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <h3>{tool.title}</h3>
              <p className="module-card-desc">{tool.desc}</p>
              <div className="module-card-foot">
                <div className="module-tags">
                  <span className="tag">{t('interactive')}</span>
                </div>
                <div className="module-status">{t('tool_open')}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
