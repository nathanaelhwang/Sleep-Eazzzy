'use client';

import { useState } from 'react';
import { useL, useT } from './LangProvider';

type Track = { id: string; title: string; sub: string };
type Section = { key: string; eyebrow: string; title: string; sub: string; tag: string; tracks: Track[] };

export function LibraryPage() {
  const t = useT();
  const L = useL();
  const [open, setOpen] = useState<string | null>(null);

  const sections: Section[] = [
    {
      key: 'white',
      eyebrow: L('Section 01 · Long-form', 'Sección 01 · Larga duración', '第一節 · 長時段', '第一节 · 长时段'),
      title: L('White Noise & Nature Sounds', 'Ruido Blanco y Sonidos de la Naturaleza', '白噪音與自然音', '白噪音与自然音'),
      sub: L(
        'Over an hour each. Loop one all night as a steady bedtime cue — your brain will start to link the sound with sleep.',
        'Cada uno dura más de una hora. Ponlos en bucle toda la noche como una señal de dormir constante — tu cerebro empezará a asociar el sonido con el sueño.',
        '每段超過一小時。整夜循環播放，作為穩定的就寢提示——你的大腦會開始把這聲音和睡眠連結起來。',
        '每段超过一小时。整夜循环播放，作为稳定的就寝提示——你的大脑会开始把这声音和睡眠连结起来。'
      ),
      tag: L('60+ min · Loop all night', '60+ min · Reproducir toda la noche', '60+ 分鐘 · 整夜循環', '60+ 分钟 · 整夜循环'),
      tracks: [
        { id: 'V303hdgB0MI', title: L('Whispering Woodland Brook', 'Arroyo Susurrante del Bosque', '林間低語溪流', '林间低语溪流'), sub: L('Stream over mossy stones', 'Arroyo sobre piedras musgosas', '流過青苔石的溪水', '流过青苔石的溪水') },
        { id: 'WT0pSLD63W0', title: L('Santorini Midnight Waves', 'Olas de Medianoche en Santorini', '聖托里尼午夜浪聲', '圣托里尼午夜浪声'), sub: L('Mediterranean shoreline', 'Orilla mediterránea', '地中海海岸線', '地中海海岸线') },
        { id: 'H3upsuC_FcU', title: L('Himalayan Rainfall', 'Lluvia del Himalaya', '喜馬拉雅雨聲', '喜马拉雅雨声'), sub: L('Steady mountain rain', 'Lluvia constante de montaña', '綿延的山間雨聲', '绵延的山间雨声') },
        { id: 'k6mmuOrl3eY', title: L('Fireplace Tranquility', 'Tranquilidad de Chimenea', '寧靜壁爐', '宁静壁炉'), sub: L('Crackling hearth', 'Hogar crepitante', '柴火爆裂的壁爐', '柴火爆裂的壁炉') },
      ],
    },
    {
      key: 'relax',
      eyebrow: L('Section 02 · 10-minute', 'Sección 02 · 10 minutos', '第二節 · 十分鐘', '第二节 · 十分钟'),
      title: L('Relaxing Music for Wind-Down', 'Música Relajante para Antes de Dormir', '放鬆音樂', '放松音乐'),
      sub: L(
        'Short tracks to play while getting into bed, doing 4-7-8 breathing, or running through Progressive Muscle Relaxation.',
        'Pistas cortas para escuchar al meterte a la cama, durante la respiración 4-7-8 o la Relajación Muscular Progresiva.',
        '上床、做 4-7-8 深呼吸或漸進式肌肉放鬆時播放的短曲。',
        '上床、做 4-7-8 深呼吸或渐进式肌肉放松时播放的短曲。'
      ),
      tag: L('~10 min · For breathing & PMR', '~10 min · Para respiración y RMP', '約 10 分鐘 · 配合呼吸與 PMR', '约 10 分钟 · 配合呼吸与 PMR'),
      tracks: [
        { id: 'iDMhd1VupaA', title: L('REM Ember Delta Waves', 'Ondas Delta REM Ember', 'REM Ember 德爾塔波', 'REM Ember 德尔塔波'), sub: L('by Ookean', 'por Ookean', '作者：Ookean', '作者：Ookean') },
        { id: 'c8-lX-K0eVs', title: L('Into Cryosleep', 'Hacia el Criosueño', '進入冷凍沉睡', '进入冷冻沉睡'), sub: L('by Joseph Beg', 'por Joseph Beg', '作者：Joseph Beg', '作者：Joseph Beg') },
        { id: 'rQws7fTVmPI', title: L('Autumn Fields', 'Campos de Otoño', '秋日原野', '秋日原野'), sub: L('by Chaxti', 'por Chaxti', '作者：Chaxti', '作者：Chaxti') },
      ],
    },
    {
      key: 'guided',
      eyebrow: L('Section 03 · Guided', 'Sección 03 · Guiada', '第三節 · 引導冥想', '第三节 · 引导冥想'),
      title: L('Guided Sleep Meditation', 'Meditación Guiada para Dormir', '引導式睡眠冥想', '引导式睡眠冥想'),
      sub: L(
        'A full guided session combining deep breathing and progressive muscle relaxation — press play, lie down, and follow the voice.',
        'Una sesión guiada completa que combina respiración profunda y relajación muscular progresiva — dale play, acuéstate y sigue la voz.',
        '結合深呼吸與漸進式肌肉放鬆的完整引導課程——按下播放、躺下，跟著聲音走。',
        '结合深呼吸与渐进式肌肉放松的完整引导课程——按下播放、躺下，跟着声音走。'
      ),
      tag: L('Voice-led · Breathing + PMR', 'Con voz guía · Respiración + RMP', '人聲引導 · 呼吸 + PMR', '人声引导 · 呼吸 + PMR'),
      tracks: [
        { id: 'j4ZtuyeLrTk', title: L('Soft Landing: A Sleep Meditation', 'Aterrizaje Suave: Una Meditación para Dormir', '輕柔降落：睡眠冥想', '轻柔降落：睡眠冥想'), sub: L('Deep breathing & PMR combined', 'Respiración profunda y RMP combinadas', '深呼吸與 PMR 結合', '深呼吸与 PMR 结合') },
      ],
    },
  ];

  const labels = {
    play: L('Play on YouTube', 'Reproducir en YouTube', '在 YouTube 播放', '在 YouTube 播放'),
    preview: L('Tap to play', 'Toca para reproducir', '點擊播放', '点击播放'),
    tip: L('Tap thumbnail to play', 'Toca la miniatura para reproducir', '點縮圖播放', '点缩略图播放'),
    note: L('How to use this library', 'Cómo usar esta biblioteca', '如何使用本資料庫', '如何使用本资料库'),
    noteBody: L(
      'Tap any thumbnail to play the audio inline. Pair Section 01 with bedtime; Section 02 with the breathing or PMR tools; Section 03 as a stand-alone wind-down.',
      'Toca cualquier miniatura para reproducir el audio aquí mismo. Empareja la Sección 01 con la hora de dormir; la Sección 02 con las herramientas de respiración o RMP; la Sección 03 como una sesión independiente.',
      '點任一縮圖即可在頁面內播放音訊。第一節搭配就寢；第二節配合呼吸或 PMR 工具；第三節可作為獨立的睡前放鬆。',
      '点任一缩略图即可在页面内播放音频。第一节搭配就寝；第二节配合呼吸或 PMR 工具；第三节可作为独立的睡前放松。'
    ),
  };

  return (
    <>
      <header className="mod-hero">
        <div className="container">
          <div className="mod-eyebrow">{t('library_eyebrow')}</div>
          <h1>{t('library_title')}</h1>
          <p className="mod-hero-sub">{t('library_sub')}</p>
        </div>
      </header>
      <div className="container mod-body">
        <div className="callout" style={{ marginBottom: 32 }}>
          <div className="callout-label">{labels.note}</div>
          <p>{labels.noteBody}</p>
        </div>
        {sections.map((sec) => (
          <section key={sec.key} style={{ marginBottom: 56 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
                marginBottom: 6,
              }}
            >
              <div className="module-num" style={{ color: 'var(--sand)' }}>
                {sec.eyebrow}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.06em' }}>
                {sec.tag}
              </div>
            </div>
            <h2 style={{ marginTop: 4 }}>{sec.title}</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 720, marginTop: 10, marginBottom: 22 }}>
              {sec.sub}
            </p>
            <div className="modules">
              {sec.tracks.map((tr) => {
                const isOpen = open === tr.id;
                return (
                  <div key={tr.id} className="module-card" style={{ cursor: 'default' }}>
                    <div className="module-card-head">
                      <div className="module-num">
                        ▶ {isOpen ? labels.play : labels.preview}
                      </div>
                    </div>
                    <h3 style={{ fontSize: 22, marginTop: 4 }}>{tr.title}</h3>
                    <p className="module-card-desc">{tr.sub}</p>
                    <div
                      style={{
                        borderRadius: 12,
                        overflow: 'hidden',
                        marginTop: 14,
                        background: 'var(--night)',
                        aspectRatio: '16/9',
                        position: 'relative',
                      }}
                    >
                      {isOpen ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${tr.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                          title={tr.title}
                          referrerPolicy="strict-origin-when-cross-origin"
                          style={{ width: '100%', height: '100%', border: 0, position: 'absolute', inset: 0 }}
                          allow="autoplay; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setOpen(tr.id)}
                          aria-label={`${labels.preview}: ${tr.title}`}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            border: 0,
                            cursor: 'pointer',
                            color: 'var(--cream)',
                            backgroundImage: `linear-gradient(135deg, rgba(15,30,58,0.45), rgba(45,74,115,0.45)), url(https://i.ytimg.com/vi/${tr.id}/hqdefault.jpg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <span
                            style={{
                              width: 64,
                              height: 64,
                              borderRadius: '50%',
                              background: 'var(--sand)',
                              color: 'var(--night)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 22,
                              paddingLeft: 4,
                              boxShadow: '0 6px 24px rgba(15,30,58,0.5)',
                            }}
                          >
                            ▶
                          </span>
                        </button>
                      )}
                    </div>
                    <div
                      className="module-card-foot"
                      style={{ marginTop: 14, justifyContent: 'flex-start' }}
                    >
                      <span
                        className="tag"
                        style={{ background: 'transparent', color: 'var(--muted)', padding: '4px 0' }}
                      >
                        {labels.tip}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
